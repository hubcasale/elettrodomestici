"""Umidostato: dall'umidità di un sensore decide quando accendere e spegnere un ventilatore (con soglie, ritardi di conferma, tempo
minimo e massimo di funzionamento). Codice puro, senza Home Assistant: si prova con pytest."""
from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

CMD_GUARD = 30           # secondi: dopo un comando non se ne dà un altro uguale (il ventilatore ha il tempo di cambiare stato)

# Tempi in minuti (come si impostano nelle preferenze), umidità in %.
DEFAULTS: dict[str, Any] = {
    "enabled": True,     # regolazione automatica attiva
    "on_above": 70.0,    # accende quando l'umidità supera questo valore...
    "on_delay": 2,       # ...per almeno questi minuti
    "off_below": 60.0,   # spegne quando l'umidità scende sotto questo valore...
    "off_delay": 3,      # ...per almeno questi minuti
    "min_on": 5,         # resta acceso almeno questi minuti (anche se l'umidità scende subito)
    "max_on": 60,        # si spegne comunque dopo questi minuti (0 = nessun limite)
    "min_off": 0,        # dopo lo spegnimento aspetta almeno questi minuti prima di riaccendere
    "light_max": 10,     # con la luce del bagno: acceso al massimo questi minuti (poi decide l'umidità)
}


def _num(value: Any, default: float, lo: float, hi: float) -> float:
    try:
        n = float(value)
    except (TypeError, ValueError):
        return default
    if n != n:
        return default
    return min(max(n, lo), hi)


def normalize(raw: Any) -> dict[str, Any]:
    """Impostazioni valide: valori mancanti o fuori scala sostituiti, la soglia di spegnimento sempre sotto quella di accensione."""
    d = raw if isinstance(raw, dict) else {}
    on_above = round(_num(d.get("on_above"), DEFAULTS["on_above"], 1, 100), 1)
    off_below = round(_num(d.get("off_below"), DEFAULTS["off_below"], 0, 99), 1)
    if off_below >= on_above:
        off_below = max(0.0, round(on_above - 1, 1))
    return {
        "enabled": d.get("enabled", DEFAULTS["enabled"]) is not False,
        "on_above": on_above,
        "on_delay": int(_num(d.get("on_delay"), DEFAULTS["on_delay"], 0, 600)),
        "off_below": off_below,
        "off_delay": int(_num(d.get("off_delay"), DEFAULTS["off_delay"], 0, 600)),
        "min_on": int(_num(d.get("min_on"), DEFAULTS["min_on"], 0, 600)),
        "max_on": int(_num(d.get("max_on"), DEFAULTS["max_on"], 0, 1440)),
        "min_off": int(_num(d.get("min_off"), DEFAULTS["min_off"], 0, 600)),
        "light_max": int(_num(d.get("light_max"), DEFAULTS["light_max"], 1, 600)),
    }


class Humidistat:
    """Una regolazione. `step` si chiama a ogni lettura o a ogni tick con umidità e stato del ventilatore e dice se comandarlo."""

    def __init__(self, cfg: Any) -> None:
        self.cfg = normalize(cfg)
        self.above_since: datetime | None = None     # da quando l'umidità è sopra la soglia di accensione
        self.below_since: datetime | None = None     # da quando è sotto quella di spegnimento
        self.on_since: datetime | None = None        # da quando il ventilatore è acceso (anche se acceso a mano)
        self.off_since: datetime | None = None       # da quando è spento
        self.locked = False                          # fermato dal tempo massimo: riparte solo dopo che l'umidità è scesa sotto la soglia di accensione
        self.light_until: datetime | None = None     # acceso per la luce del bagno: fino a quando (poi decide l'umidità)
        self._light_prev: bool | None = None
        self._cmd: tuple[str, datetime] | None = None

    def reconfigure(self, cfg: Any) -> None:
        self.cfg = normalize(cfg)

    # ------------------------------------------------------------------ motore
    def step(self, now: datetime, humidity: float | None, fan_on: bool | None, light_on: bool | None = None) -> tuple[str | None, str]:
        """Restituisce (azione, motivo): azione "on", "off" oppure None. Motivi: umidita_alta, umidita_bassa, tempo_massimo, luce, timer_luce.

        `light_on` è lo stato della luce del bagno (None = non c'è o non è disponibile): quando si accende, il ventilatore parte e resta acceso
        per `light_max` minuti; alla scadenza, se l'umidità è ancora sopra la soglia di spegnimento, decide la regola dell'umidità."""
        c = self.cfg
        if fan_on is True and self.on_since is None:
            self.on_since, self.off_since = now, None
        elif fan_on is False and self.on_since is not None:        # visto spegnersi: da qui conta il riposo minimo (non all'avvio)
            self.off_since, self.on_since = now, None
            self.light_until = None
        light_edge = light_on is True and self._light_prev is False       # la luce si è appena accesa (non all'avvio)
        self._light_prev = light_on
        if fan_on is None:
            return None, ""                                       # ventilatore non disponibile: non si comanda
        if humidity is None:
            self.above_since = self.below_since = None
        else:
            self.above_since = (self.above_since or now) if humidity > c["on_above"] else None
            self.below_since = (self.below_since or now) if humidity < c["off_below"] else None
            if humidity <= c["on_above"]:
                self.locked = False
        if not c["enabled"]:
            self.light_until = None
            return None, ""
        action, reason = None, ""
        if light_edge:
            self.light_until = now + timedelta(minutes=c["light_max"])
        if not fan_on and light_edge:
            action, reason = "on", "luce"
        elif not fan_on:
            if self.light_until is not None and now >= self.light_until:
                self.light_until = None                          # il comando per la luce non è andato a buon fine: non resta in sospeso
            ok_since = self.above_since is not None and (now - self.above_since).total_seconds() >= c["on_delay"] * 60
            rested = self.off_since is None or (now - self.off_since).total_seconds() >= c["min_off"] * 60
            if ok_since and rested and not self.locked:
                action, reason = "on", "umidita_alta"
        else:
            on_for = (now - self.on_since).total_seconds() if self.on_since else 0
            if self.light_until is not None and now >= self.light_until:
                self.light_until = None                          # scaduto il tempo della luce: da qui vale solo l'umidità
                if humidity is None or humidity < c["off_below"]:
                    action, reason = "off", "timer_luce"
            if action:
                pass
            elif c["max_on"] > 0 and on_for >= c["max_on"] * 60:
                action, reason = "off", "tempo_massimo"
            elif self.light_until is not None:
                pass                                              # acceso per la luce: l'umidità bassa non lo spegne prima del timer
            elif self.below_since is not None and (now - self.below_since).total_seconds() >= c["off_delay"] * 60 and on_for >= c["min_on"] * 60:
                action, reason = "off", "umidita_bassa"
        if action is None:
            return None, ""
        if self._cmd and self._cmd[0] == action and (now - self._cmd[1]).total_seconds() < CMD_GUARD:
            return None, ""
        self._cmd = (action, now)
        if reason == "tempo_massimo":
            self.locked = True
            self.light_until = None
        return action, reason

    # ------------------------------------------------------------------ per la scheda
    def status(self, now: datetime, humidity: float | None, fan_on: bool | None) -> dict[str, Any]:
        """Che cosa sta facendo e quanto manca alla prossima mossa (secondi), per la scheda."""
        c = self.cfg
        out: dict[str, Any] = {"phase": "off", "wait_s": None, "on_for_s": None}
        if fan_on is None or humidity is None:
            out["phase"] = "unavailable"
            return out
        if fan_on:
            on_for = (now - self.on_since).total_seconds() if self.on_since else 0
            out["on_for_s"] = int(on_for)
            out["phase"] = "on"
            if not c["enabled"]:
                return out
            if self.light_until is not None:
                out["phase"] = "light"
                out["wait_s"], out["until"] = max(0, int((self.light_until - now).total_seconds())), "timer_luce"
                return out
            if c["max_on"] > 0:
                out["wait_s"] = max(0, int(c["max_on"] * 60 - on_for))
                out["until"] = "tempo_massimo"
            if self.below_since is not None:
                need = max(c["off_delay"] * 60 - (now - self.below_since).total_seconds(), c["min_on"] * 60 - on_for, 0)
                out["phase"] = "closing"
                out["wait_s"], out["until"] = int(need), "umidita_bassa"
            return out
        if not c["enabled"]:
            return out
        if self.locked:
            out["phase"] = "locked"
            return out
        if self.above_since is not None:
            wait = c["on_delay"] * 60 - (now - self.above_since).total_seconds()
            if self.off_since is not None:
                wait = max(wait, c["min_off"] * 60 - (now - self.off_since).total_seconds())
            out["phase"], out["wait_s"] = "opening", max(0, int(wait))
        return out
