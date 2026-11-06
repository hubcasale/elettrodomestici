"""Prove del motore puro: dalla potenza si ricavano stato, fasi, cicli e statistiche."""
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "custom_components" / "elettrodomestici"))

import engine as e  # noqa: E402

T0 = datetime(2030, 10, 21, 20, 0, tzinfo=timezone.utc)


def cfg(typ="lavatrice", **kw):
    d = {"type": typ, "name": typ.title(), "entity": f"sensor.presa_{typ}_potenza", **kw}
    c = e.ApplianceConfig.from_dict(d)
    assert c is not None
    return c


class Sim:
    """Fa scorrere il tempo secondo per secondo con una potenza costante per tratti."""

    def __init__(self, machine: e.Machine, start=T0):
        self.m = machine
        self.t = start
        self.events: list[tuple[str, object]] = []

    def run(self, power, seconds, step=5):
        end = self.t + timedelta(seconds=seconds)
        self.events += self.m.feed(self.t, power)
        while self.t < end:
            self.t += timedelta(seconds=step)
            self.events += self.m.tick(self.t)

    def kinds(self):
        return [k for k, _ in self.events]


def washing_cycle(sim: Sim):
    sim.run(2, 60)            # standby
    sim.run(150, 600)         # carico acqua e lavaggio
    sim.run(2000, 900)        # riscaldamento
    sim.run(180, 900)         # lavaggio e risciacquo
    sim.run(450, 400)         # centrifuga
    sim.run(2, 600)           # fine


def test_washing_machine_full_cycle():
    m = e.Machine(cfg())
    sim = Sim(m)
    sim.run(2, 60)
    assert m.state == e.STATE_OFF
    sim.run(150, 600)
    assert m.state == e.STATE_RUN and m.phase == "Lavaggio"
    sim.run(2000, 900)
    assert m.phase == "Lavaggio"
    sim.run(180, 200)
    assert m.phase == "Risciacquo"
    sim.run(450, 200)
    assert m.phase == "Centrifuga"
    sim.run(2, 600)
    assert m.state == e.STATE_DONE and m.phase == "Da svuotare"
    kinds = sim.kinds()
    assert kinds.count("started") == 1 and kinds.count("finished") == 1 and kinds.count("phase") == 2
    cycle = next(v for k, v in sim.events if k == "finished")
    assert 1850 < cycle.seconds < 2000 and cycle.peak == 2000


def test_acknowledge_returns_to_off():
    m = e.Machine(cfg())
    sim = Sim(m)
    washing_cycle(sim)
    assert m.state == e.STATE_DONE
    assert m.acknowledge() is True and m.state == e.STATE_OFF
    assert m.acknowledge() is False


def test_short_blip_is_discarded_and_not_counted():
    m = e.Machine(cfg())
    sim = Sim(m)
    sim.run(2, 30)
    sim.run(300, 120)             # acceso a vuoto per due minuti: meno del minimo del ciclo
    sim.run(2, 600)
    assert m.state == e.STATE_OFF
    assert sim.kinds().count("discarded") == 1 and "finished" not in sim.kinds()


def test_spike_below_start_delay_does_not_start():
    m = e.Machine(cfg())
    sim = Sim(m)
    sim.run(2, 30)
    sim.run(500, 10)
    sim.run(2, 60)
    assert m.state == e.STATE_OFF and sim.kinds() == []


def test_pause_inside_program_resumes_the_same_cycle():
    m = e.Machine(cfg())
    sim = Sim(m)
    washing_cycle(sim)
    assert m.state == e.STATE_DONE
    first = m.last_cycle
    sim.run(200, 600)             # il programma riparte dopo una pausa breve (meno di 20 minuti)
    assert m.state == e.STATE_RUN
    assert ("resumed", first) in sim.events
    assert m.started == first.start and m.energy == first.kwh


def test_new_cycle_after_long_pause_is_a_new_one():
    m = e.Machine(cfg())
    sim = Sim(m)
    washing_cycle(sim)
    sim.run(2, 3 * 3600)
    sim.run(200, 120)
    assert m.state == e.STATE_RUN
    assert sim.kinds().count("started") == 2 and "resumed" not in sim.kinds()


def test_dishwasher_phases_follow_the_heating_bursts():
    m = e.Machine(cfg("lavastoviglie"))
    sim = Sim(m)
    sim.run(100, 300)
    assert m.phase == "Lavaggio"
    sim.run(2000, 600)
    sim.run(100, 300)
    assert m.phase == "Risciacquo"
    sim.run(2000, 300)
    sim.run(10, 400)
    assert m.phase == "Asciugatura"
    sim.run(1, 1000)
    assert m.state == e.STATE_DONE


def test_dryer_goes_to_cooling_after_heating():
    m = e.Machine(cfg("asciugatrice"))
    sim = Sim(m)
    sim.run(800, 2400)
    assert m.phase == "Asciugatura"
    sim.run(120, 400)
    assert m.phase.startswith("Raffreddamento")


def test_oven_phases_and_forgotten_alert():
    m = e.Machine(cfg("forno", alert_minutes=60))
    sim = Sim(m)
    sim.run(2000, 600)
    sim.run(60, 100)
    assert m.phase == "Riscaldamento" or m.phase == "Mantenimento"
    sim.run(40, 1000)             # solo la ventola: si passa a mantenimento/raffreddamento
    assert m.phase in ("Mantenimento", "Raffreddamento")
    sim.run(2000, 3000)
    assert "alert" in sim.kinds() and sim.kinds().count("alert") == 1
    sim.run(2, 300)
    assert m.state == e.STATE_OFF and sim.kinds().count("finished") == 1


def test_fridge_cycles_have_no_finished_state():
    m = e.Machine(cfg("frigorifero"))
    sim = Sim(m)
    for _ in range(3):
        sim.run(80, 900)
        sim.run(3, 1200)
    assert m.state == e.STATE_OFF
    assert sim.kinds().count("finished") == 3


def test_microwave_short_use():
    m = e.Machine(cfg("microonde"))
    sim = Sim(m)
    sim.run(3, 20)
    sim.run(1100, 60, step=1)
    sim.run(3, 30, step=1)
    assert sim.kinds().count("finished") == 1
    cycle = next(v for k, v in sim.events if k == "finished")
    assert 55 <= cycle.seconds <= 65


def test_unavailable_plug_keeps_cycle_then_closes_it():
    m = e.Machine(cfg())
    sim = Sim(m)
    sim.run(150, 900)
    sim.run(None, 300)
    assert m.state == e.STATE_RUN
    sim.run(None, 1000)
    assert m.state == e.STATE_DONE and sim.kinds().count("finished") == 1      # chiuso all'ora in cui la presa è sparita


def test_unavailable_at_start_then_available():
    m = e.Machine(cfg())
    assert m.feed(T0, None) == [] and m.state == e.STATE_NA
    m.feed(T0 + timedelta(seconds=5), 2)
    assert m.state == e.STATE_OFF


def test_save_and_restore_a_running_cycle():
    m = e.Machine(cfg())
    sim = Sim(m)
    sim.run(150, 900)
    m.add_energy(0.2, 0.06)
    saved = m.to_saved()
    n = e.Machine(cfg())
    n.load_saved(saved)
    assert n.state == e.STATE_RUN and n.started == m.started and abs(n.energy - 0.2) < 1e-9 and n.step == m.step


def test_energy_only_counts_while_running():
    m = e.Machine(cfg())
    m.add_energy(1, 1)
    assert m.energy == 0


def test_config_parsing_and_clamping():
    assert e.ApplianceConfig.from_dict({"type": "tostapane", "entity": "sensor.x"}) is None
    assert e.ApplianceConfig.from_dict({"type": "forno", "entity": "x"}) is None
    c = e.ApplianceConfig.from_dict({"type": "forno", "entity": "sensor.f", "start_w": 1, "stop_w": 50, "end_delay": 999999, "extras": [{"entity": "sensor.a", "label": "Programma"}, {"entity": "bad"}, {"entity": "sensor.a"}]})
    assert c.start_w >= c.stop_w == 50 and c.end_delay == 7200 and c.extras == (("sensor.a", "Programma"),)
    assert c.name == "Forno" and c.id == "forno"


def test_parse_appliances_dedupes_ids_and_entities():
    raw = [
        {"type": "lavatrice", "name": "Bucato", "entity": "sensor.a"},
        {"type": "lavatrice", "name": "Bucato", "entity": "sensor.b"},
        {"type": "lavatrice", "name": "Doppia", "entity": "sensor.a"},
        "x",
    ]
    out = e.parse_appliances(raw)
    assert [c.id for c in out] == ["bucato", "bucato_2"]


def test_stats_periods_and_series():
    days: dict = {}
    today = date(2030, 10, 23)  # mercoledì
    e.add_to_day(days, today, kwh=1.0, eur=0.3, cycles=1, sec=3600)
    e.add_to_day(days, today - timedelta(days=1), kwh=2.0, eur=0.6, cycles=2)
    e.add_to_day(days, today - timedelta(days=5), kwh=4.0, eur=1.2, cycles=1)   # domenica scorsa
    e.add_to_day(days, today - timedelta(days=400), kwh=9.0, eur=2.7, cycles=3)
    p = e.period_totals(days, today)
    assert p["oggi"]["kwh"] == 1.0 and p["ieri"]["cycles"] == 2
    assert p["settimana"]["kwh"] == 3.0                      # lunedì 21 -> oggi
    assert p["mese"]["kwh"] == 7.0 and p["anno"]["kwh"] == 7.0
    assert p["totale"]["kwh"] == 16.0
    s = e.daily_series(days, today, 7)
    assert len(s) == 7 and s[-1]["kwh"] == 1.0 and s[1]["kwh"] == 4.0 and s[0]["date"] == "2030-10-17"
    e.prune_days(days, today, 365)
    assert len(days) == 3


def test_estimate_and_summary_and_maintenance():
    cycles = [e.Cycle(T0, T0 + timedelta(minutes=m), kwh=1.0, eur=0.3) for m in (100, 110, 120)]
    assert e.estimate_remaining(cycles, 30 * 60) == 110 * 60 - 30 * 60
    assert e.estimate_remaining(cycles, 200 * 60) is None
    assert e.estimate_remaining(cycles[:2], 10) is None
    s = e.cycle_summary(cycles)
    assert s["count"] == 3 and s["median_seconds"] == 110 * 60 and s["avg_kwh"] == 1.0
    assert e.cycle_summary([]) is None
    assert e.maintenance(15, 30) == {"count": 15, "threshold": 30, "pct": 50, "due": False}
    assert e.maintenance(30, 30)["due"] is True and e.maintenance(5, 0)["pct"] is None


def test_cycle_roundtrip():
    c = e.Cycle(T0, T0 + timedelta(minutes=5), 0.5, 0.15, 1800)
    assert e.Cycle.from_dict(c.to_dict()).seconds == 300
    assert e.Cycle.from_dict({"s": "x"}) is None


def test_profile_defaults_cover_all_types():
    d = e.profile_defaults()
    assert set(d) == {"lavatrice", "lavastoviglie", "asciugatrice", "forno", "frigorifero", "microonde"}
    assert d["lavatrice"]["phases"] == ["Lavaggio", "Risciacquo", "Centrifuga"] and d["frigorifero"]["has_finished"] is False


def test_unavailable_when_idle_shows_unavailable_and_recovers():
    m = e.Machine(cfg())
    m.feed(T0, 2)
    assert m.state == e.STATE_OFF
    m.feed(T0 + timedelta(seconds=5), None)
    assert m.state == e.STATE_NA
    m.feed(T0 + timedelta(seconds=10), 2)
    assert m.state == e.STATE_OFF


LOCAL = timezone(timedelta(hours=1))


def test_merge_imported_drops_impossible_days():
    days: dict = {}
    e.merge_imported(days, {"2030-10-19": {"kwh": 845019.2, "cycles": 1}, "2030-10-18": {"kwh": 3.0}}, 0.3, date(2030, 10, 22))
    assert days["2030-10-19"]["kwh"] == 0.0 and days["2030-10-19"]["eur"] == 0.0 and days["2030-10-19"]["cycles"] == 1
    assert days["2030-10-18"]["kwh"] == 3.0


def test_merge_imported_never_touches_measured_days_and_is_idempotent():
    days: dict = {}
    e.add_to_day(days, date(2030, 10, 20), kwh=1.0, eur=0.3, cycles=1)             # misurato da qui
    imported = {
        "2030-10-19": {"kwh": 2.0, "cycles": 2, "sec": 7200},
        "2030-10-20": {"kwh": 9.0, "cycles": 9},                                    # già misurato: si salta
        "2030-10-22": {"kwh": 5.0},                                                  # oggi o dopo: si salta
        "boh": {"kwh": 1.0},
    }
    assert e.merge_imported(days, imported, 0.25, date(2030, 10, 22)) == 1
    assert days["2030-10-19"]["kwh"] == 2.0 and days["2030-10-19"]["eur"] == 0.5 and days["2030-10-19"]["cycles"] == 2
    assert days["2030-10-20"]["kwh"] == 1.0 and "2030-10-22" not in days
    assert e.merge_imported(days, {"2030-10-19": {"kwh": 3.0}}, 0.25, date(2030, 10, 22)) == 1   # reimportare sostituisce
    assert days["2030-10-19"]["kwh"] == 3.0 and days["2030-10-19"]["cycles"] == 0
    p = e.period_totals(days, date(2030, 10, 21))
    assert p["totale"]["kwh"] == 4.0


def test_counter_increments_per_day_ignoring_resets():
    rows = [
        (datetime(2030, 10, 19, 8, tzinfo=LOCAL), "10"), (datetime(2030, 10, 19, 20, tzinfo=LOCAL), "11"),
        (datetime(2030, 10, 20, 9, tzinfo=LOCAL), "12"), (datetime(2030, 10, 20, 18, tzinfo=LOCAL), "14"),
        (datetime(2030, 10, 21, 7, tzinfo=LOCAL), "0"), (datetime(2030, 10, 21, 9, tzinfo=LOCAL), "1"),
        (datetime(2030, 10, 21, 10, tzinfo=LOCAL), "unavailable"), (datetime(2030, 10, 21, 11, tzinfo=LOCAL), "2"),
    ]
    assert e.counter_increments(rows) == {"2030-10-19": 1, "2030-10-20": 3, "2030-10-21": 2}


def test_on_seconds_split_at_midnight():
    rows = [
        (datetime(2030, 10, 19, 23, 0, tzinfo=LOCAL), "on"), (datetime(2030, 10, 20, 1, 0, tzinfo=LOCAL), "off"),
        (datetime(2030, 10, 20, 10, 0, tzinfo=LOCAL), "on"), (datetime(2030, 10, 20, 10, 30, tzinfo=LOCAL), "unavailable"),
        (datetime(2030, 10, 20, 22, 0, tzinfo=LOCAL), "on"),
    ]
    out = e.on_seconds_per_day(rows, datetime(2030, 10, 21, 0, 0, tzinfo=LOCAL))
    assert out == {"2030-10-19": 3600, "2030-10-20": 3600 + 1800 + 7200}


def test_maker_config_is_validated():
    base = {"type": "asciugatrice", "name": "Asc", "entity": "sensor.p"}
    ok = e.ApplianceConfig.from_dict({**base, "maker": "electrolux", "maker_device": " abc123 "})
    assert ok.maker == "electrolux" and ok.maker_device == "abc123"
    assert ok.to_dict()["maker"] == "electrolux" and ok.to_dict()["maker_device"] == "abc123"
    assert e.ApplianceConfig.from_dict({**base, "maker": "electrolux"}).maker is None            # senza dispositivo
    assert e.ApplianceConfig.from_dict({**base, "maker": "boh", "maker_device": "x"}).maker is None
    assert e.ApplianceConfig.from_dict(base).maker_device is None
