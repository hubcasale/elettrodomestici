"""Prove dell'umidostato: soglie con ritardo, tempo minimo e massimo, blocco dopo il tempo massimo, preferenze valide."""
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "custom_components" / "elettrodomestici"))

import engine as e  # noqa: E402
import humidistat as h  # noqa: E402

T0 = datetime(2030, 10, 21, 7, 0, tzinfo=timezone.utc)


def at(minutes: float) -> datetime:
    return T0 + timedelta(minutes=minutes)


def run(hs: h.Humidistat, samples, fan_on=False):
    """samples: (minuto, umidità). Applica i comandi come farebbe Home Assistant e restituisce l'elenco (minuto, azione, motivo)."""
    out = []
    for minute, hum in samples:
        action, reason = hs.step(at(minute), hum, fan_on)
        if action:
            out.append((minute, action, reason))
            fan_on = action == "on"
            hs.step(at(minute), hum, fan_on)            # il ventilatore cambia stato subito: il motore lo vede nello stesso istante
    return out


def test_defaults_are_valid_and_off_below_on():
    n = h.normalize({})
    assert n == {**h.DEFAULTS, "enabled": True}
    assert h.normalize({"on_above": 65, "off_below": 80})["off_below"] == 64.0       # la soglia di spegnimento resta sotto
    assert h.normalize({"on_above": "x", "max_on": -5, "on_delay": 9999})["on_above"] == 70.0
    assert h.normalize({"on_delay": 9999})["on_delay"] == 600
    assert h.normalize({"enabled": False})["enabled"] is False


def test_turns_on_only_after_the_delay():
    hs = h.Humidistat({"on_above": 70, "on_delay": 2})
    r = run(hs, [(m, 75) for m in range(0, 5)])
    assert r == [(2, "on", "umidita_alta")]


def test_short_spike_does_not_turn_on():
    hs = h.Humidistat({"on_above": 70, "on_delay": 2})
    assert run(hs, [(0, 75), (1, 75), (1.5, 65), (3, 75), (4, 75)]) == []          # scende sotto prima dei 2 minuti: il conto riparte


def test_turns_off_after_delay_and_min_on():
    hs = h.Humidistat({"on_above": 70, "on_delay": 1, "off_below": 60, "off_delay": 3, "min_on": 10})
    r = run(hs, [(m, 80) for m in range(0, 3)] + [(m, 50) for m in range(3, 20)])
    assert r[0] == (1, "on", "umidita_alta")
    assert r[1] == (11, "off", "umidita_bassa")         # acceso da 10 minuti, sotto soglia da più di 3 minuti


def test_hysteresis_band_keeps_fan_on():
    hs = h.Humidistat({"on_above": 70, "on_delay": 0, "off_below": 60, "off_delay": 0, "min_on": 0})
    r = run(hs, [(0, 80), (1, 65), (2, 62), (3, 61), (4, 59)])
    assert [x[1] for x in r] == ["on", "off"] and r[1][0] == 4


def test_max_on_stops_and_locks_until_humidity_drops():
    hs = h.Humidistat({"on_above": 70, "on_delay": 0, "off_below": 60, "off_delay": 5, "max_on": 10})
    r = run(hs, [(m, 85) for m in range(0, 25)])
    assert r == [(0, "on", "umidita_alta"), (10, "off", "tempo_massimo")]            # non riparte finché resta alta
    assert hs.locked
    r2 = run(hs, [(30, 68), (31, 80), (32, 80)], fan_on=False)                        # scende sotto la soglia di accensione: si riarma
    assert [x[1] for x in r2] == ["on"] and not hs.locked


def test_max_on_zero_means_no_limit():
    hs = h.Humidistat({"on_above": 70, "on_delay": 0, "max_on": 0})
    assert run(hs, [(m, 90) for m in range(0, 400, 20)]) == [(0, "on", "umidita_alta")]


def test_min_off_delays_restart():
    hs = h.Humidistat({"on_above": 70, "on_delay": 0, "off_below": 60, "off_delay": 0, "min_on": 0, "min_off": 5})
    r = run(hs, [(0, 80), (1, 50), (2, 80), (3, 80), (6, 80), (7, 80)])
    assert [(x[0], x[1]) for x in r] == [(0, "on"), (1, "off"), (6, "on")]


def test_disabled_never_commands():
    hs = h.Humidistat({"enabled": False, "on_delay": 0})
    assert run(hs, [(m, 95) for m in range(5)]) == []


def test_unavailable_sensor_or_fan_does_nothing():
    hs = h.Humidistat({"on_delay": 0})
    assert hs.step(at(0), None, False) == (None, "")
    assert hs.step(at(1), 95, None) == (None, "")


def test_no_repeated_command_while_state_catches_up():
    hs = h.Humidistat({"on_above": 70, "on_delay": 0})
    assert hs.step(at(0), 80, False) == ("on", "umidita_alta")
    assert hs.step(at(0.1), 80, False) == (None, "")           # il ventilatore non ha ancora cambiato stato
    assert hs.step(at(1), 80, False) == ("on", "umidita_alta")  # passato il tempo di guardia, si riprova


def test_manual_on_is_followed_by_the_off_rule():
    hs = h.Humidistat({"off_below": 60, "off_delay": 2, "min_on": 0})
    r = run(hs, [(m, 50) for m in range(0, 5)], fan_on=True)
    assert r == [(2, "off", "umidita_bassa")]


def test_status_countdown():
    hs = h.Humidistat({"on_above": 70, "on_delay": 2})
    hs.step(at(0), 80, False)
    s = hs.status(at(0.5), 80, False)
    assert s["phase"] == "opening" and s["wait_s"] == 90
    hs2 = h.Humidistat({"on_delay": 0, "max_on": 30})
    hs2.step(at(0), 80, True)
    s2 = hs2.status(at(10), 80, True)
    assert s2["phase"] == "on" and s2["wait_s"] == 20 * 60 and s2["until"] == "tempo_massimo"
    assert hs2.status(at(1), None, True)["phase"] == "unavailable"


def test_config_parsing_requires_sensor_and_fan():
    ok = e.ApplianceConfig.from_dict({"type": "umidostato", "name": "Bagno verde", "entity": "sensor.umidita", "fan_entity": "switch.ventilatore",
                                      "hum": {"on_above": 72}})
    assert ok is not None and ok.is_humidistat and not ok.is_plug and ok.hum["on_above"] == 72 and ok.hum["off_below"] == 60.0
    assert e.ApplianceConfig.from_dict({"type": "umidostato", "name": "x", "entity": "sensor.umidita"}) is None                  # manca il ventilatore
    assert e.ApplianceConfig.from_dict({"type": "umidostato", "name": "x", "entity": "binary_sensor.u", "fan_entity": "switch.v"}) is None
    assert e.ApplianceConfig.from_dict({"type": "umidostato", "name": "x", "entity": "sensor.u", "fan_entity": "sensor.v"}) is None  # il ventilatore non è comandabile
    back = e.ApplianceConfig.from_dict(ok.to_dict())
    assert back is not None and back.fan_entity == "switch.ventilatore" and back.hum == ok.hum


def test_profile_defaults_carry_humidistat_settings():
    d = e.profile_defaults()["umidostato"]
    assert d["humidistat"] is True and d["hum"]["on_above"] == 70.0 and e.profile_defaults()["lavatrice"]["humidistat"] is False


# ---------------------------------------------------------------------- luce del bagno
def run_light(hs: h.Humidistat, samples, fan_on=False):
    """samples: (minuto, umidità, luce accesa). Come run(), con anche la luce del bagno."""
    out = []
    for minute, hum, light in samples:
        action, reason = hs.step(at(minute), hum, fan_on, light)
        if action:
            out.append((minute, action, reason))
            fan_on = action == "on"
            hs.step(at(minute), hum, fan_on, light)
    return out


CFG_LIGHT = {"on_above": 70, "on_delay": 2, "off_below": 60, "off_delay": 3, "min_on": 0, "max_on": 60, "light_max": 10}


def test_light_turns_fan_on_and_timer_turns_it_off_when_dry():
    hs = h.Humidistat(CFG_LIGHT)
    samples = [(0, 50, False), (1, 50, True)] + [(m, 50, True) for m in range(2, 15)]
    assert run_light(hs, samples) == [(1, "on", "luce"), (11, "off", "timer_luce")]        # umidità bassa: non lo spegne prima dei 10 minuti


def test_light_timer_hands_over_to_humidity_when_still_wet():
    hs = h.Humidistat(CFG_LIGHT)
    samples = [(0, 65, False), (1, 65, True)] + [(m, 65, True) for m in range(2, 14)] + [(m, 50, True) for m in range(14, 22)]
    r = run_light(hs, samples)
    assert r[0] == (1, "on", "luce")
    assert r[1][1:] == ("off", "umidita_bassa") and r[1][0] >= 17        # a 65% resta acceso oltre il timer; spegne solo dopo 3 minuti sotto il 60%


def test_light_does_not_trigger_at_startup_or_when_disabled():
    hs = h.Humidistat(CFG_LIGHT)
    assert run_light(hs, [(m, 50, True) for m in range(3)]) == []                      # luce già accesa all'avvio: nessuna partenza
    hs2 = h.Humidistat({**CFG_LIGHT, "enabled": False})
    assert run_light(hs2, [(0, 50, False), (1, 50, True)]) == []


def test_light_run_still_obeys_global_max_on():
    hs = h.Humidistat({**CFG_LIGHT, "light_max": 120, "max_on": 20})
    r = run_light(hs, [(0, 50, False)] + [(m, 50, True) for m in range(1, 40)])
    assert r[0] == (1, "on", "luce") and r[1][1:] == ("off", "tempo_massimo") and r[1][0] == 21


def test_light_again_extends_the_timer():
    hs = h.Humidistat(CFG_LIGHT)
    samples = [(0, 50, False), (1, 50, True), (5, 50, False), (6, 50, True)] + [(m, 50, True) for m in range(7, 25)]
    r = run_light(hs, samples)
    assert r == [(1, "on", "luce"), (16, "off", "timer_luce")]                           # riaccesa a 6: scade 10 minuti dopo


def test_light_status_countdown_and_unavailable_light():
    hs = h.Humidistat(CFG_LIGHT)
    hs.step(at(0), 50, False, False)
    assert hs.step(at(1), 50, False, True) == ("on", "luce")
    hs.step(at(1), 50, True, True)
    s = hs.status(at(4), 50, True)
    assert s["phase"] == "light" and s["wait_s"] == 7 * 60 and s["until"] == "timer_luce"
    hs2 = h.Humidistat(CFG_LIGHT)
    assert hs2.step(at(0), 50, False, None) == (None, "") and hs2.step(at(1), 50, False, None) == (None, "")     # nessuna luce scelta: ignorata


def test_config_parsing_light_entity():
    c = e.ApplianceConfig.from_dict({"type": "umidostato", "name": "B", "entity": "sensor.u", "fan_entity": "switch.v", "light_entity": "light.bagno",
                                     "hum": {"light_max": 15}})
    assert c is not None and c.light_entity == "light.bagno" and c.hum["light_max"] == 15
    same = e.ApplianceConfig.from_dict({"type": "umidostato", "name": "B", "entity": "sensor.u", "fan_entity": "switch.v", "light_entity": "switch.v"})
    assert same is not None and same.light_entity is None                                 # la luce non può essere il ventilatore stesso
    assert h.normalize({"light_max": 0})["light_max"] == 1
