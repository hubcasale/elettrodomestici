"""Il motore degli elettrodomestici: dalla potenza di una presa intelligente deduce lo stato (spento, in funzione con la sua
fase, terminato), conta i cicli e prepara le statistiche. Codice puro, senza Home Assistant: si prova con pytest."""
from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass
from datetime import date, datetime, timedelta
from statistics import median
from typing import Any

STATE_OFF = "spento"
STATE_RUN = "in_funzione"
STATE_DONE = "terminato"
STATE_NA = "non_disponibile"
STATES = (STATE_OFF, STATE_RUN, STATE_DONE, STATE_NA)

BURST_MIN = 45                 # secondi sopra la soglia "riscaldamento" perché conti come fase di riscaldamento
UNAVAIL_GRACE = 900            # secondi di presa non disponibile dopo i quali un ciclo in corso si chiude
DONE_TTL = 12 * 3600           # "terminato" resta finché non lo si conferma; dopo questo tempo torna "spento"
KEEP_CYCLES = 300
KEEP_DAYS = 800

ENTITY_RE = re.compile(r"^[a-z_]+\.[a-z0-9_]+$")


# ---------------------------------------------------------------------- profili
@dataclass(frozen=True)
class Step:
    """Una fase del ciclo; `advance` dice quando si passa alla successiva: burst_end, above:W:S, quiet:S."""

    name: str
    advance: str | None = None


@dataclass(frozen=True)
class Profile:
    type: str
    label: str
    icon: str
    off_label: str
    done_label: str
    has_finished: bool
    start_w: float
    stop_w: float
    start_delay: int
    end_delay: int
    min_cycle: int
    heat_w: float
    phase_gap: int
    merge_gap: int
    maint_cycles: int
    alert_minutes: int
    notify: bool
    maint_label: str
    steps: tuple[Step, ...]


PROFILES: dict[str, Profile] = {
    "lavatrice": Profile(
        "lavatrice", "Lavatrice", "mdi:washing-machine", "Spenta", "Da svuotare", True,
        start_w=10, stop_w=4, start_delay=30, end_delay=420, min_cycle=600, heat_w=900, phase_gap=90, merge_gap=1200,
        maint_cycles=30, alert_minutes=0, notify=True, maint_label="Pulizia guarnizione e cestello",
        steps=(Step("Lavaggio", "burst_end"), Step("Risciacquo", "above:300:90"), Step("Centrifuga")),
    ),
    "lavastoviglie": Profile(
        "lavastoviglie", "Lavastoviglie", "mdi:dishwasher", "Spenta", "Da svuotare", True,
        start_w=5, stop_w=3, start_delay=30, end_delay=600, min_cycle=900, heat_w=900, phase_gap=90, merge_gap=1200,
        maint_cycles=40, alert_minutes=0, notify=True, maint_label="Pulizia filtri e sale",
        steps=(Step("Lavaggio", "burst_end"), Step("Risciacquo", "burst_end"), Step("Asciugatura")),
    ),
    "asciugatrice": Profile(
        "asciugatrice", "Asciugatrice", "mdi:tumble-dryer", "Spenta", "Da svuotare", True,
        start_w=10, stop_w=4, start_delay=30, end_delay=300, min_cycle=600, heat_w=400, phase_gap=300, merge_gap=900,
        maint_cycles=10, alert_minutes=0, notify=True, maint_label="Pulizia filtro e condensatore",
        steps=(Step("Asciugatura", "burst_end"), Step("Raffreddamento / antipiega")),
    ),
    "forno": Profile(
        "forno", "Forno", "mdi:stove", "Spento", "", False,
        start_w=100, stop_w=6, start_delay=10, end_delay=90, min_cycle=120, heat_w=800, phase_gap=60, merge_gap=0,
        maint_cycles=0, alert_minutes=180, notify=True, maint_label="Pulizia",
        steps=(Step("Riscaldamento", "burst_end"), Step("Mantenimento", "quiet:900"), Step("Raffreddamento")),
    ),
    "frigorifero": Profile(
        "frigorifero", "Frigorifero", "mdi:fridge", "Compressore fermo", "", False,
        start_w=25, stop_w=12, start_delay=30, end_delay=60, min_cycle=0, heat_w=100000, phase_gap=60, merge_gap=0,
        maint_cycles=0, alert_minutes=480, notify=True, maint_label="Pulizia",
        steps=(Step("Compressore acceso"),),
    ),
    "microonde": Profile(
        "microonde", "Microonde", "mdi:microwave", "Spento", "", False,
        start_w=80, stop_w=30, start_delay=3, end_delay=8, min_cycle=5, heat_w=100000, phase_gap=60, merge_gap=0,
        maint_cycles=0, alert_minutes=20, notify=True, maint_label="Pulizia",
        steps=(Step("In funzione"),),
    ),
}

TUNABLE = ("start_w", "stop_w", "start_delay", "end_delay", "min_cycle", "heat_w", "maint_cycles", "alert_minutes")


def profile_defaults() -> dict[str, dict[str, Any]]:
    """Per la scheda: i valori predefiniti di ogni tipo, per precompilare l'aggiunta di un elettrodomestico."""
    out: dict[str, dict[str, Any]] = {}
    for t, p in PROFILES.items():
        out[t] = {
            "label": p.label, "icon": p.icon, "off_label": p.off_label, "done_label": p.done_label, "has_finished": p.has_finished,
            "notify": p.notify, "maint_label": p.maint_label, "phases": [s.name for s in p.steps],
            **{k: getattr(p, k) for k in TUNABLE},
        }
    return out


# ---------------------------------------------------------------------- configurazione
def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "_", text.lower()).strip("_") or "elettrodomestico"


def _num(value: Any, default: float, lo: float, hi: float) -> float:
    try:
        n = float(value)
    except (TypeError, ValueError):
        return default
    if n != n:
        return default
    return min(max(n, lo), hi)


@dataclass
class ApplianceConfig:
    id: str
    type: str
    name: str
    entity: str                              # sensore di potenza (W) della presa
    energy_entity: str | None = None         # contatore di energia della presa (facoltativo)
    start_w: float = 10
    stop_w: float = 4
    start_delay: int = 30
    end_delay: int = 300
    min_cycle: int = 0
    heat_w: float = 900
    maint_cycles: int = 0
    alert_minutes: int = 0
    notify: bool = True
    extras: tuple[tuple[str, str], ...] = ()   # (entità, etichetta): programma, tempo rimanente, stato del costruttore...

    @property
    def profile(self) -> Profile:
        return PROFILES[self.type]

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id, "type": self.type, "name": self.name, "entity": self.entity, "energy_entity": self.energy_entity,
            "start_w": self.start_w, "stop_w": self.stop_w, "start_delay": self.start_delay, "end_delay": self.end_delay,
            "min_cycle": self.min_cycle, "heat_w": self.heat_w, "maint_cycles": self.maint_cycles,
            "alert_minutes": self.alert_minutes, "notify": self.notify,
            "extras": [{"entity": e, "label": l} for e, l in self.extras],
        }

    @staticmethod
    def from_dict(d: Any) -> "ApplianceConfig | None":
        if not isinstance(d, dict):
            return None
        typ = d.get("type")
        entity = d.get("entity")
        if typ not in PROFILES or not isinstance(entity, str) or not ENTITY_RE.match(entity.strip()):
            return None
        p = PROFILES[typ]
        name = str(d.get("name") or "").strip()[:60] or p.label
        energy = d.get("energy_entity")
        energy = energy.strip() if isinstance(energy, str) and ENTITY_RE.match(energy.strip()) else None
        extras: list[tuple[str, str]] = []
        for x in (d.get("extras") or [])[:8]:
            if isinstance(x, dict) and isinstance(x.get("entity"), str) and ENTITY_RE.match(x["entity"].strip()):
                ent = x["entity"].strip()
                if all(ent != e for e, _ in extras):
                    extras.append((ent, str(x.get("label") or "").strip()[:40]))
        stop_w = _num(d.get("stop_w"), p.stop_w, 0, 5000)
        start_w = max(_num(d.get("start_w"), p.start_w, 0, 5000), stop_w)
        return ApplianceConfig(
            id=slugify(str(d.get("id") or name)),
            type=typ,
            name=name,
            entity=entity.strip(),
            energy_entity=energy,
            start_w=start_w,
            stop_w=stop_w,
            start_delay=int(_num(d.get("start_delay"), p.start_delay, 0, 3600)),
            end_delay=int(_num(d.get("end_delay"), p.end_delay, 1, 7200)),
            min_cycle=int(_num(d.get("min_cycle"), p.min_cycle, 0, 7200)),
            heat_w=_num(d.get("heat_w"), p.heat_w, 1, 100000),
            maint_cycles=int(_num(d.get("maint_cycles"), p.maint_cycles, 0, 10000)),
            alert_minutes=int(_num(d.get("alert_minutes"), p.alert_minutes, 0, 5000)),
            notify=d.get("notify", p.notify) is not False,
            extras=tuple(extras),
        )


def parse_appliances(raw: Any) -> list[ApplianceConfig]:
    """Elenco valido: voci non valide scartate, id e sensori di potenza non duplicati."""
    out: list[ApplianceConfig] = []
    ids: set[str] = set()
    entities: set[str] = set()
    for item in raw if isinstance(raw, list) else []:
        cfg = ApplianceConfig.from_dict(item)
        if cfg is None or cfg.entity in entities:
            continue
        base, n = cfg.id, 2
        while cfg.id in ids:
            cfg.id = f"{base}_{n}"
            n += 1
        ids.add(cfg.id)
        entities.add(cfg.entity)
        out.append(cfg)
    return out


# ---------------------------------------------------------------------- cicli
@dataclass
class Cycle:
    start: datetime
    end: datetime
    kwh: float = 0.0
    eur: float = 0.0
    peak: float = 0.0

    @property
    def seconds(self) -> int:
        return max(0, int((self.end - self.start).total_seconds()))

    def to_dict(self) -> dict[str, Any]:
        return {"s": self.start.isoformat(), "e": self.end.isoformat(), "kwh": round(self.kwh, 4), "eur": round(self.eur, 4), "pk": round(self.peak, 1)}

    @staticmethod
    def from_dict(d: Any) -> "Cycle | None":
        try:
            return Cycle(datetime.fromisoformat(d["s"]), datetime.fromisoformat(d["e"]), float(d.get("kwh", 0)), float(d.get("eur", 0)), float(d.get("pk", 0)))
        except (KeyError, TypeError, ValueError):
            return None


Event = tuple[str, Any]


class Machine:
    """Lo stato di un elettrodomestico. Si alimenta con feed() a ogni nuova lettura e con tick() a intervalli regolari."""

    def __init__(self, cfg: ApplianceConfig) -> None:
        self.cfg = cfg
        self.state = STATE_NA
        self.power: float | None = None
        self.step = 0
        self.started: datetime | None = None
        self.finished_at: datetime | None = None
        self.energy = 0.0
        self.cost = 0.0
        self.peak = 0.0
        self.last_cycle: Cycle | None = None
        self.alerted = False
        self._was_done = False                      # l'ultimo ciclo è finito in "terminato" (serve a riprenderlo se il programma ripartisce)
        self._reset_trackers()
        self._above_since: datetime | None = None
        self._below_since: datetime | None = None
        self._na_since: datetime | None = None

    # ------------------------------------------------------------------ utilità
    @property
    def profile(self) -> Profile:
        return self.cfg.profile

    @property
    def running(self) -> bool:
        return self.state == STATE_RUN

    @property
    def phases(self) -> list[str]:
        return [s.name for s in self.profile.steps]

    @property
    def phase(self) -> str:
        if self.state == STATE_RUN:
            return self.profile.steps[min(self.step, len(self.profile.steps) - 1)].name
        if self.state == STATE_DONE:
            return self.profile.done_label
        if self.state == STATE_OFF:
            return self.profile.off_label
        return "Non disponibile"

    def _reset_trackers(self) -> None:
        self._burst_since: datetime | None = None
        self._burst_ok = False
        self._gap_since: datetime | None = None
        self._quiet_since: datetime | None = None
        self._hi_since: datetime | None = None

    def reconfigure(self, cfg: ApplianceConfig) -> None:
        self.cfg = cfg
        self.step = min(self.step, len(self.profile.steps) - 1)

    # ------------------------------------------------------------------ ingressi
    def feed(self, now: datetime, power: float | None) -> list[Event]:
        self.power = power
        return self._step(now)

    def tick(self, now: datetime) -> list[Event]:
        return self._step(now)

    def add_energy(self, kwh: float, eur: float) -> None:
        if self.state == STATE_RUN:
            self.energy += kwh
            self.cost += eur

    def acknowledge(self) -> bool:
        """Conferma "ho svuotato": lo stato terminato torna spento."""
        if self.state == STATE_DONE:
            self.state = STATE_OFF
            return True
        return False

    # ------------------------------------------------------------------ logica
    def _step(self, now: datetime) -> list[Event]:
        events: list[Event] = []
        p = self.power
        cfg = self.cfg
        if p is None:
            if self._na_since is None:
                self._na_since = now
            if self.state == STATE_OFF:
                self.state = STATE_NA
                self._above_since = None
            if self.state == STATE_RUN and (now - self._na_since).total_seconds() > UNAVAIL_GRACE:
                events += self._end(self._na_since)
            return events
        self._na_since = None
        if self.state == STATE_NA:
            self.state = STATE_OFF
        if self.state != STATE_RUN:
            if p > cfg.start_w:
                if self._above_since is None:
                    self._above_since = now
                if (now - self._above_since).total_seconds() >= cfg.start_delay:
                    events += self._begin(self._above_since)
            else:
                self._above_since = None
            if self.state == STATE_DONE and self.finished_at and (now - self.finished_at).total_seconds() > DONE_TTL:
                self.state = STATE_OFF
            return events
        self._above_since = None
        self.peak = max(self.peak, p)
        events += self._advance(now, p)
        if p <= cfg.stop_w:
            if self._below_since is None:
                self._below_since = now
            if (now - self._below_since).total_seconds() >= cfg.end_delay:
                events += self._end(self._below_since)
                return events
        else:
            self._below_since = None
        if cfg.alert_minutes and not self.alerted and self.started and (now - self.started).total_seconds() > cfg.alert_minutes * 60:
            self.alerted = True
            events.append(("alert", {"minutes": cfg.alert_minutes}))
        return events

    def _begin(self, t: datetime) -> list[Event]:
        prof = self.profile
        last = self.last_cycle
        self._reset_trackers()
        self._below_since = None
        self.alerted = False
        self.state = STATE_RUN
        resumed = (
            prof.merge_gap > 0 and last is not None and self.finished_at is not None and self._was_done
            and (t - self.finished_at).total_seconds() <= prof.merge_gap
        )
        self.finished_at = None
        if resumed and last is not None:
            # una pausa a bassa potenza in mezzo al programma: si riprende lo stesso ciclo invece di contarne due
            self.started, self.energy, self.cost, self.peak = last.start, last.kwh, last.eur, last.peak
            self.last_cycle = None
            return [("resumed", last)]
        self.started, self.energy, self.cost, self.peak, self.step = t, 0.0, 0.0, 0.0, 0
        self._was_done = False
        return [("started", None)]

    def _end(self, t: datetime) -> list[Event]:
        started = self.started or t
        cycle = Cycle(started, t, self.energy, self.cost, self.peak)
        self.started = None
        self._below_since = None
        self._na_since = None
        self._reset_trackers()
        if cycle.seconds < self.cfg.min_cycle:
            self.state = STATE_OFF
            self._was_done = False
            self.step = 0
            return [("discarded", cycle)]
        self.last_cycle = cycle
        self.finished_at = t
        self.state = STATE_DONE if self.profile.has_finished else STATE_OFF
        self._was_done = self.state == STATE_DONE
        return [("finished", cycle)]

    def _advance(self, now: datetime, p: float) -> list[Event]:
        steps = self.profile.steps
        if self.step >= len(steps) - 1:
            return []
        cfg = self.cfg
        if p >= cfg.heat_w:
            self._quiet_since = None
            self._gap_since = None
            if self._burst_since is None:
                self._burst_since = now
            if (now - self._burst_since).total_seconds() >= BURST_MIN:
                self._burst_ok = True
        else:
            if self._quiet_since is None:
                self._quiet_since = now
            self._burst_since = None
            if self._burst_ok and self._gap_since is None:
                self._gap_since = now
        kind, *args = (steps[self.step].advance or "").split(":")
        go = False
        if kind == "burst_end":
            go = self._burst_ok and self._gap_since is not None and (now - self._gap_since).total_seconds() >= self.profile.phase_gap
        elif kind == "above":
            watts, secs = float(args[0]), float(args[1])
            if p > watts:
                if self._hi_since is None:
                    self._hi_since = now
            else:
                self._hi_since = None
            go = self._hi_since is not None and (now - self._hi_since).total_seconds() >= secs
        elif kind == "quiet":
            go = self._quiet_since is not None and (now - self._quiet_since).total_seconds() >= float(args[0])
        if not go:
            return []
        self.step += 1
        self._burst_ok = False
        self._gap_since = None
        self._hi_since = None
        self._burst_since = now if p >= cfg.heat_w else None
        self._quiet_since = None if p >= cfg.heat_w else now
        return [("phase", steps[self.step].name)]

    # ------------------------------------------------------------------ salvataggio
    def to_saved(self) -> dict[str, Any]:
        return {
            "state": self.state if self.state in (STATE_RUN, STATE_DONE) else STATE_OFF,
            "step": self.step,
            "started": self.started.isoformat() if self.started else None,
            "finished_at": self.finished_at.isoformat() if self.finished_at else None,
            "energy": self.energy, "cost": self.cost, "peak": self.peak, "alerted": self.alerted,
            "was_done": self._was_done,
            "last": self.last_cycle.to_dict() if self.last_cycle else None,
        }

    def load_saved(self, d: Any) -> None:
        if not isinstance(d, dict):
            return
        try:
            self.last_cycle = Cycle.from_dict(d.get("last")) if d.get("last") else None
            self.finished_at = datetime.fromisoformat(d["finished_at"]) if d.get("finished_at") else None
            self._was_done = bool(d.get("was_done"))
            if d.get("state") in (STATE_RUN, STATE_DONE):
                self.state = d["state"]
                self.step = min(int(d.get("step", 0)), len(self.profile.steps) - 1)
                self.started = datetime.fromisoformat(d["started"]) if d.get("started") else None
                self.energy, self.cost, self.peak = float(d.get("energy", 0)), float(d.get("cost", 0)), float(d.get("peak", 0))
                self.alerted = bool(d.get("alerted"))
                if self.state == STATE_RUN and self.started is None:
                    self.state = STATE_OFF
        except (KeyError, TypeError, ValueError):
            self.state = STATE_NA


# ---------------------------------------------------------------------- statistiche
def empty_day() -> dict[str, float]:
    return {"kwh": 0.0, "eur": 0.0, "cycles": 0, "sec": 0}


def add_to_day(days: dict[str, dict[str, float]], d: date, kwh: float = 0.0, eur: float = 0.0, cycles: int = 0, sec: int = 0) -> None:
    day = days.setdefault(d.isoformat(), empty_day())
    day["kwh"] = day.get("kwh", 0.0) + kwh
    day["eur"] = day.get("eur", 0.0) + eur
    day["cycles"] = max(0, int(day.get("cycles", 0)) + cycles)
    day["sec"] = max(0, int(day.get("sec", 0)) + sec)


def prune_days(days: dict[str, dict[str, float]], today: date, keep: int = KEEP_DAYS) -> None:
    limit = (today - timedelta(days=keep)).isoformat()
    for k in [k for k in days if k < limit]:
        del days[k]


def _sum(days: dict[str, dict[str, float]], start: date, end: date) -> dict[str, float]:
    tot = empty_day()
    # i giorni salvati sono pochi: si scorre l'elenco, non il calendario
    for key, v in days.items():
        try:
            day = date.fromisoformat(key)
        except ValueError:
            continue
        if start <= day <= end:
            tot["kwh"] += v.get("kwh", 0.0)
            tot["eur"] += v.get("eur", 0.0)
            tot["cycles"] += int(v.get("cycles", 0))
            tot["sec"] += int(v.get("sec", 0))
    return {k: (round(x, 4) if isinstance(x, float) else x) for k, x in tot.items()}


def period_totals(days: dict[str, dict[str, float]], today: date) -> dict[str, dict[str, float]]:
    monday = today - timedelta(days=today.weekday())
    return {
        "oggi": _sum(days, today, today),
        "ieri": _sum(days, today - timedelta(days=1), today - timedelta(days=1)),
        "settimana": _sum(days, monday, today),
        "mese": _sum(days, today.replace(day=1), today),
        "anno": _sum(days, today.replace(month=1, day=1), today),
        "ultimi30": _sum(days, today - timedelta(days=29), today),
        "totale": _sum(days, date.min, today),
    }


def daily_series(days: dict[str, dict[str, float]], today: date, n: int) -> list[dict[str, Any]]:
    out = []
    for i in range(n - 1, -1, -1):
        d = today - timedelta(days=i)
        v = days.get(d.isoformat()) or empty_day()
        out.append({"date": d.isoformat(), "kwh": round(v.get("kwh", 0.0), 4), "eur": round(v.get("eur", 0.0), 4), "cycles": int(v.get("cycles", 0)), "sec": int(v.get("sec", 0))})
    return out


def cycle_summary(cycles: list[Cycle], last: int = 20) -> dict[str, Any] | None:
    recent = cycles[-last:]
    if not recent:
        return None
    secs = [c.seconds for c in recent]
    return {
        "count": len(recent),
        "avg_kwh": round(sum(c.kwh for c in recent) / len(recent), 4),
        "avg_eur": round(sum(c.eur for c in recent) / len(recent), 4),
        "avg_seconds": int(sum(secs) / len(secs)),
        "median_seconds": int(median(secs)),
        "min_seconds": min(secs),
        "max_seconds": max(secs),
        "max_kwh": round(max(c.kwh for c in recent), 4),
    }


def estimate_remaining(cycles: list[Cycle], elapsed: float, min_cycles: int = 3) -> int | None:
    """Secondi che mancano alla fine, stimati sulla durata mediana degli ultimi cicli; None se non ci sono abbastanza dati."""
    recent = [c.seconds for c in cycles[-10:] if c.seconds > 0]
    if len(recent) < min_cycles:
        return None
    left = median(recent) - elapsed
    return int(left) if left > 0 else None


def maintenance(count: int, threshold: int) -> dict[str, Any]:
    pct = None if threshold <= 0 else min(100, round(count * 100 / threshold))
    return {"count": count, "threshold": threshold, "pct": pct, "due": threshold > 0 and count >= threshold}


def trim_cycles(cycles: list[Cycle]) -> list[Cycle]:
    return cycles[-KEEP_CYCLES:]


# ---------------------------------------------------------------------- importazione dello storico
IMPORT_FLAG = "imp"
MAX_IMPORT_DAY_KWH = 100.0   # una presa da 16 A fa al massimo ~88 kWh al giorno: oltre è un'anomalia del contatore


def merge_imported(days: dict[str, dict[str, float]], imported: dict[str, dict[str, float]], price: float, before: date) -> int:
    """Scrive nei giorni salvati i dati importati (energia, cicli, secondi) per le date precedenti a `before`.

    I giorni misurati dall'integrazione non si toccano; quelli già importati si sostituiscono (importare due volte non raddoppia).
    Il costo è l'energia per il prezzo indicato. Restituisce quanti giorni sono stati scritti."""
    written = 0
    for key, v in imported.items():
        try:
            d = date.fromisoformat(key)
        except ValueError:
            continue
        if d >= before:
            continue
        cur = days.get(key)
        if cur is not None and not cur.get(IMPORT_FLAG):
            continue
        kwh = max(0.0, float(v.get("kwh", 0.0)))
        if kwh > MAX_IMPORT_DAY_KWH:
            kwh = 0.0
        days[key] = {"kwh": kwh, "eur": kwh * price, "cycles": max(0, int(v.get("cycles", 0))), "sec": max(0, int(v.get("sec", 0))), IMPORT_FLAG: 1}
        written += 1
    return written


def counter_increments(rows: list[tuple[datetime, str]]) -> dict[str, int]:
    """Da una serie (momento locale, valore) di un contatore: quanti incrementi per giorno (gli azzeramenti non contano)."""
    out: dict[str, int] = {}
    prev: float | None = None
    for when, state in rows:
        try:
            v = float(state)
        except (TypeError, ValueError):
            continue
        if prev is not None and v > prev:
            k = when.date().isoformat()
            out[k] = out.get(k, 0) + int(round(v - prev))
        prev = v
    return out


def on_seconds_per_day(rows: list[tuple[datetime, str]], end: datetime) -> dict[str, int]:
    """Da una serie (momento locale, on/off) di un sensore binario: secondi in "on" per ogni giorno, spezzando a mezzanotte."""
    out: dict[str, float] = {}
    for i, (when, state) in enumerate(rows):
        if state != "on":
            continue
        stop = rows[i + 1][0] if i + 1 < len(rows) else end
        t = when
        while t < stop:
            midnight = (t + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)
            part = min(stop, midnight)
            k = t.date().isoformat()
            out[k] = out.get(k, 0.0) + (part - t).total_seconds()
            t = part
    return {k: int(round(v)) for k, v in out.items()}
