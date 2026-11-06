"""Il "cervello": segue le prese, alimenta il motore di ogni elettrodomestico, conta energia e costi, avvisa a fine ciclo."""
from __future__ import annotations

import logging
from datetime import date, datetime, timedelta
from typing import Any

from homeassistant.components.recorder import get_instance, history, statistics
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_state_change_event, async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from . import engine as eng
from .const import (
    CONF_APPLIANCES, CONF_NOTIFY, CONF_PRICE, CONF_PRICE_ENTITY, DEFAULT_PRICE, DOMAIN, EVENT_ALERT, EVENT_FINISHED, MAX_GAP,
    SAVE_EVERY, SIGNAL_UPDATE, STORAGE_VERSION, TICK_SECONDS,
)

_LOGGER = logging.getLogger(__name__)
_BAD = ("unknown", "unavailable", "none", "")


def signature(items: list[eng.ApplianceConfig]) -> tuple:
    """Ciò che richiede di ricreare le entità: quali elettrodomestici, di che tipo e con quale nome."""
    return tuple((c.id, c.type, c.name) for c in items)


def _to_float(state: Any) -> float | None:
    if state is None or state.state in _BAD:
        return None
    try:
        return float(state.state)
    except ValueError:
        return None


def read_power(state: Any) -> float | None:
    """Watt dalla lettura di un sensore (accetta anche kW)."""
    v = _to_float(state)
    if v is None:
        return None
    unit = str(state.attributes.get("unit_of_measurement", "W")).lower()
    return v * 1000 if unit == "kw" else v


def read_energy(state: Any) -> float | None:
    """kWh dalla lettura di un contatore (accetta Wh, kWh, MWh)."""
    v = _to_float(state)
    if v is None:
        return None
    unit = str(state.attributes.get("unit_of_measurement", "kWh")).lower()
    return v / 1000 if unit == "wh" else v * 1000 if unit == "mwh" else v


class ElettroController:
    """Una voce di configurazione = tutti gli elettrodomestici."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self.machines: dict[str, eng.Machine] = {}
        self.days: dict[str, dict[str, dict[str, float]]] = {}
        self.cycles: dict[str, list[eng.Cycle]] = {}
        self.maint: dict[str, int] = {}
        self.baseline: dict[str, int] = {}           # cicli di prima dell'importazione, che contano solo nel totale
        self._energy_last: dict[str, float | None] = {}
        self._acct_at: dict[str, datetime] = {}
        self._store: Store = Store(hass, STORAGE_VERSION, f"{DOMAIN}.{entry.entry_id}")
        self._unsubs: list = []
        self._last_save = dt_util.utcnow()
        self.signature = signature(eng.parse_appliances(entry.options.get(CONF_APPLIANCES)))
        self.general_device_id: str | None = None

    @property
    def signal(self) -> str:
        return SIGNAL_UPDATE.format(self.entry.entry_id)

    def configs(self) -> list[eng.ApplianceConfig]:
        return eng.parse_appliances(self.entry.options.get(CONF_APPLIANCES))

    # ------------------------------------------------------------------ ciclo di vita
    async def async_start(self) -> None:
        saved = await self._store.async_load() or {}
        now = dt_util.now()
        for cfg in self.configs():
            m = eng.Machine(cfg)
            m.load_saved((saved.get("machines") or {}).get(cfg.id))
            self.machines[cfg.id] = m
            self.days[cfg.id] = {k: dict(v) for k, v in ((saved.get("days") or {}).get(cfg.id) or {}).items() if isinstance(v, dict)}
            self.cycles[cfg.id] = [c for c in (eng.Cycle.from_dict(x) for x in (saved.get("cycles") or {}).get(cfg.id, [])) if c]
            self.maint[cfg.id] = int((saved.get("maint") or {}).get(cfg.id, 0))
            self.baseline[cfg.id] = int((saved.get("baseline") or {}).get(cfg.id, 0))
            self._energy_last[cfg.id] = None
            eng.prune_days(self.days[cfg.id], now.date())
        watch = [c.entity for c in self.configs()] + [c.energy_entity for c in self.configs() if c.energy_entity]
        if watch:
            self._unsubs.append(async_track_state_change_event(self.hass, watch, self._on_source))
        self._unsubs.append(async_track_time_interval(self.hass, self._on_tick, timedelta(seconds=TICK_SECONDS)))
        for key, m in self.machines.items():
            st = self.hass.states.get(m.cfg.entity)
            self._acct_at[key] = now
            self._handle(key, m.feed(now, read_power(st)), now)
            if m.cfg.energy_entity:
                self._energy_last[key] = read_energy(self.hass.states.get(m.cfg.energy_entity))

    async def async_stop(self) -> None:
        for unsub in self._unsubs:
            unsub()
        self._unsubs.clear()
        await self._async_save()

    async def _async_save(self) -> None:
        await self._store.async_save(
            {
                "machines": {k: m.to_saved() for k, m in self.machines.items()},
                "days": self.days,
                "cycles": {k: [c.to_dict() for c in cs] for k, cs in self.cycles.items()},
                "maint": self.maint,
                "baseline": self.baseline,
            }
        )
        self._last_save = dt_util.utcnow()

    def _save_soon(self) -> None:
        self.hass.async_create_task(self._async_save())

    def _update(self) -> None:
        async_dispatcher_send(self.hass, self.signal)

    # ------------------------------------------------------------------ energia e costi
    def price(self) -> float:
        ent = self.entry.options.get(CONF_PRICE_ENTITY)
        if ent:
            v = _to_float(self.hass.states.get(ent))
            if v is not None and v > 0:
                return v
        try:
            return float(self.entry.options.get(CONF_PRICE, DEFAULT_PRICE))
        except (TypeError, ValueError):
            return DEFAULT_PRICE

    def _credit(self, key: str, kwh: float, now: datetime) -> None:
        if kwh <= 0:
            return
        eur = kwh * self.price()
        eng.add_to_day(self.days[key], now.date(), kwh=kwh, eur=eur)
        self.machines[key].add_energy(kwh, eur)

    def _account(self, key: str, now: datetime) -> None:
        """Conta il tempo di funzionamento e, senza contatore di energia, integra la potenza dall'ultima lettura."""
        m = self.machines[key]
        last = self._acct_at.get(key, now)
        dt = (now - last).total_seconds()
        self._acct_at[key] = now
        if dt <= 0 or dt > MAX_GAP:
            return
        if m.running:
            eng.add_to_day(self.days[key], now.date(), sec=int(round(dt)))
        if not m.cfg.energy_entity and m.power is not None and m.power > 0:
            self._credit(key, m.power * dt / 3_600_000, now)

    # ------------------------------------------------------------------ eventi
    @callback
    def _on_source(self, event: Event[EventStateChangedData]) -> None:
        eid = event.data["entity_id"]
        new = event.data["new_state"]
        now = dt_util.now()
        changed = False
        for key, m in self.machines.items():
            if m.cfg.energy_entity == eid:
                cur = read_energy(new)
                prev = self._energy_last.get(key)
                if cur is not None:
                    if prev is not None and 0 <= cur - prev < 100:
                        self._credit(key, cur - prev, now)
                    self._energy_last[key] = cur
            if m.cfg.entity == eid:
                self._account(key, now)
                before = (m.state, m.step)
                events = m.feed(now, read_power(new))
                self._handle(key, events, now)
                changed = changed or bool(events) or before != (m.state, m.step)
        if changed:
            self._save_soon()
            self._update()

    @callback
    def _on_tick(self, _now: datetime) -> None:
        now = dt_util.now()
        changed = False
        running = False
        for key, m in self.machines.items():
            self._account(key, now)
            before = (m.state, m.step)
            events = m.tick(now)
            self._handle(key, events, now)
            changed = changed or bool(events) or before != (m.state, m.step)
            running = running or m.running
        if changed or running:
            self._update()
        if changed or (dt_util.utcnow() - self._last_save).total_seconds() > SAVE_EVERY:
            self._save_soon()

    def _handle(self, key: str, events: list[eng.Event], now: datetime) -> None:
        m = self.machines[key]
        for kind, payload in events:
            if kind == "resumed":
                prev: eng.Cycle = payload
                cycles = self.cycles.setdefault(key, [])
                if cycles and cycles[-1].start == prev.start:
                    cycles.pop()
                eng.add_to_day(self.days[key], prev.end.astimezone(now.tzinfo).date(), cycles=-1)
                self.maint[key] = max(0, self.maint.get(key, 0) - 1)
            elif kind == "finished":
                cycle: eng.Cycle = payload
                self.cycles.setdefault(key, []).append(cycle)
                self.cycles[key] = eng.trim_cycles(self.cycles[key])
                eng.add_to_day(self.days[key], cycle.end.astimezone(now.tzinfo).date(), cycles=1)
                self.maint[key] = self.maint.get(key, 0) + 1
                self._announce_finished(m, cycle)
            elif kind == "alert":
                self._announce_alert(m, int(payload["minutes"]))

    # ------------------------------------------------------------------ avvisi
    def _notify(self, title: str, message: str) -> None:
        for svc in self.entry.options.get(CONF_NOTIFY) or []:
            if not isinstance(svc, str) or not svc.startswith("notify.") or "." not in svc:
                continue
            domain, name = svc.split(".", 1)

            async def _run(domain: str = domain, name: str = name) -> None:
                try:
                    await self.hass.services.async_call(domain, name, {"title": title, "message": message}, blocking=True)
                except HomeAssistantError as err:
                    _LOGGER.warning("Notifica %s.%s non riuscita: %s", domain, name, err)

            self.hass.async_create_task(_run())

    def _announce_finished(self, m: eng.Machine, cycle: eng.Cycle) -> None:
        data = {
            "id": m.cfg.id, "name": m.cfg.name, "type": m.cfg.type, "duration_minutes": round(cycle.seconds / 60),
            "energy_kwh": round(cycle.kwh, 3), "cost_eur": round(cycle.eur, 2),
        }
        self.hass.bus.async_fire(EVENT_FINISHED, data)
        if m.cfg.notify and m.profile.has_finished:
            self._notify(
                f"{m.cfg.name}: ciclo terminato",
                f"{m.cfg.name} ha finito: {fmt_duration(cycle.seconds)}, {cycle.kwh:.2f} kWh, {cycle.eur:.2f} €. {m.profile.done_label}.".replace(" .", "."),
            )

    def _announce_alert(self, m: eng.Machine, minutes: int) -> None:
        self.hass.bus.async_fire(EVENT_ALERT, {"id": m.cfg.id, "name": m.cfg.name, "type": m.cfg.type, "minutes": minutes})
        if m.cfg.notify:
            self._notify(f"{m.cfg.name}: acceso da molto", f"{m.cfg.name} è in funzione da oltre {fmt_duration(minutes * 60)}.")

    # ------------------------------------------------------------------ azioni
    @callback
    def action(self, key: str, action: str) -> bool:
        m = self.machines.get(key)
        if m is None:
            return False
        ok = False
        if action == "acknowledge":
            ok = m.acknowledge()
        elif action == "reset_maintenance":
            self.maint[key] = 0
            ok = True
        if ok:
            self._save_soon()
            self._update()
        return ok

    @callback
    def apply_options(self) -> None:
        """Opzioni cambiate senza cambiare l'elenco: soglie, prezzo, avvisi si applicano subito."""
        by_id = {c.id: c for c in self.configs()}
        for key, m in self.machines.items():
            cfg = by_id.get(key)
            if cfg is not None:
                m.reconfigure(cfg)
        self._save_soon()
        self._update()

    # ------------------------------------------------------------------ dati per le entità e per la scheda
    def snapshot(self, key: str) -> dict[str, Any]:
        """Tutto ciò che la scheda mostra di un elettrodomestico (anche come attributi del sensore di stato)."""
        m = self.machines[key]
        now = dt_util.now()
        cycles = self.cycles.get(key, [])
        totals = eng.period_totals(self.days[key], now.date())
        elapsed = (now - m.started).total_seconds() if m.started and m.running else 0
        last = m.last_cycle or (cycles[-1] if cycles else None)
        maint = eng.maintenance(self.maint.get(key, 0), m.cfg.maint_cycles)
        return {
            "tipo": m.cfg.type,
            "fase": m.phase,
            "fase_indice": m.step if m.running else None,
            "fasi": m.phases,
            "inizio": m.started.isoformat() if m.started and m.running else None,
            "fine": m.finished_at.isoformat() if m.finished_at and m.state == eng.STATE_DONE else None,
            "trascorso_s": int(elapsed) if m.running else None,
            "energia_ciclo": round(m.energy, 3) if m.running else None,
            "costo_ciclo": round(m.cost, 3) if m.running else None,
            "picco_ciclo": round(m.peak) if m.running else None,
            "stima_rimanente_s": eng.estimate_remaining(cycles, elapsed) if m.running and m.profile.has_finished else None,
            "oggi_kwh": totals["oggi"]["kwh"],
            "oggi_eur": totals["oggi"]["eur"],
            "oggi_cicli": totals["oggi"]["cycles"],
            "oggi_secondi": totals["oggi"]["sec"],
            "manutenzione_cicli": maint["count"],
            "manutenzione_soglia": maint["threshold"],
            "manutenzione_pct": maint["pct"],
            "ultimo_ciclo": last.to_dict() if last else None,
        }

    # ------------------------------------------------------------------ storico di un altro pacchetto
    async def async_import_history(
        self, key: str, energy_entity: str | None, counter_entity: str | None, status_entity: str | None, days: int, price: float | None
    ) -> dict[str, Any]:
        """Porta nelle statistiche il passato di un vecchio pacchetto, senza toccare i giorni già misurati da qui.

        Energia: statistiche a lungo termine del contatore della presa (giorno per giorno, anche di anni fa).
        Cicli: aumenti del contatore dei cicli, per quanto il recorder conserva; il resto va nel totale.
        Funzionamento: tempo in "on" del sensore di stato, sempre per quanto conserva il recorder."""
        m = self.machines.get(key)
        if m is None:
            raise ValueError("elettrodomestico sconosciuto")
        now = dt_util.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        start = today_start - timedelta(days=days)
        rate = price if price is not None and price > 0 else self.price()
        imported: dict[str, dict[str, float]] = {}
        try:
            recorder = get_instance(self.hass)
        except KeyError as err:
            raise ValueError("Il recorder di Home Assistant non è attivo: senza non c'è uno storico da importare") from err
        result: dict[str, Any] = {"energy_days": 0, "kwh": 0.0, "cycle_days": 0, "cycles": 0, "baseline": None, "runtime_days": 0}

        if energy_entity:
            rows = (
                await recorder.async_add_executor_job(
                    statistics.statistics_during_period, self.hass, dt_util.as_utc(start), dt_util.as_utc(today_start), {energy_entity}, "day",
                    {"energy": "kWh"}, {"change"},
                )
            ).get(energy_entity, [])
            for r in rows:
                change = r.get("change")
                if change is None or change < 0:
                    continue
                k = dt_util.as_local(dt_util.utc_from_timestamp(r["start"])).date().isoformat()
                imported.setdefault(k, {})["kwh"] = imported.get(k, {}).get("kwh", 0.0) + float(change)
                result["kwh"] += float(change)
            result["energy_days"] = len(rows)

        if counter_entity:
            hist = await recorder.async_add_executor_job(
                lambda: history.get_significant_states(
                    self.hass, dt_util.as_utc(start), dt_util.as_utc(now), [counter_entity], None, True, False, False, True
                )
            )
            series = [(dt_util.as_local(s.last_changed), s.state) for s in hist.get(counter_entity, [])]
            incs = eng.counter_increments(series)
            for k, n in incs.items():
                if k < today_start.date().isoformat():
                    imported.setdefault(k, {})["cycles"] = n
            found = sum(incs.values())
            current = _to_float(self.hass.states.get(counter_entity))
            result["cycle_days"] = len(incs)
            result["cycles"] = found
            if current is not None:
                self.baseline[key] = max(0, int(current) - found)
                result["baseline"] = self.baseline[key]
                if m.cfg.maint_cycles > 0 and self.maint.get(key, 0) == 0:
                    self.maint[key] = int(current)           # il vecchio contatore dei cicli era anche quello della manutenzione

        if status_entity:
            hist = await recorder.async_add_executor_job(
                lambda: history.get_significant_states(
                    self.hass, dt_util.as_utc(start), dt_util.as_utc(now), [status_entity], None, True, False, False, True
                )
            )
            series = [(dt_util.as_local(s.last_changed), s.state) for s in hist.get(status_entity, [])]
            secs = eng.on_seconds_per_day(series, today_start)
            for k, sec in secs.items():
                if k < today_start.date().isoformat():
                    imported.setdefault(k, {})["sec"] = sec
            result["runtime_days"] = len(secs)

        result["days_written"] = eng.merge_imported(self.days[key], imported, rate, today_start.date())
        result["kwh"] = round(result["kwh"], 3)
        self._save_soon()
        self._update()
        return result

    def stats(self, key: str | None = None) -> dict[str, Any]:
        now = dt_util.now()
        out: dict[str, Any] = {}
        for k, m in self.machines.items():
            if key and k != key:
                continue
            cycles = self.cycles.get(k, [])
            periods = eng.period_totals(self.days[k], now.date())
            periods["totale"]["cycles"] += self.baseline.get(k, 0)
            out[k] = {
                "periods": periods,
                "series": eng.daily_series(self.days[k], now.date(), 90),
                "summary": eng.cycle_summary(cycles),
                "cycles": [c.to_dict() for c in reversed(cycles[-30:])],
                "maintenance": eng.maintenance(self.maint.get(k, 0), m.cfg.maint_cycles),
                "price_kwh": round(self.price(), 4),
            }
        return out

    def info(self) -> dict[str, Any]:
        return {
            "entry_id": self.entry.entry_id,
            "title": self.entry.title,
            "price_kwh": self.entry.options.get(CONF_PRICE, DEFAULT_PRICE),
            "price_entity": self.entry.options.get(CONF_PRICE_ENTITY) or "",
            "notify_services": list(self.entry.options.get(CONF_NOTIFY) or []),
            "types": eng.profile_defaults(),
            "appliances": [
                {**m.cfg.to_dict(), "key": k, "state": m.state, **self.snapshot(k)} for k, m in self.machines.items()
            ],
        }


def fmt_duration(seconds: float) -> str:
    minutes = int(round(seconds / 60))
    if minutes < 60:
        return f"{minutes} min"
    return f"{minutes // 60} h {minutes % 60:02d} min"
