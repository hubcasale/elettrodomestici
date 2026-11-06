"""Prove dentro un Home Assistant vero (pytest-homeassistant-custom-component)."""
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_time_changed

from custom_components.elettrodomestici.const import DOMAIN, EVENT_FINISHED

LAV = "sensor.presa_lavatrice_potenza"
LAV_E = "sensor.presa_lavatrice_energia"
FRI = "sensor.presa_frigo_potenza"
ROME = ZoneInfo("Europe/Rome")
T0 = datetime(2030, 10, 21, 20, 0, tzinfo=ROME)

APPLIANCES = [
    {"type": "lavatrice", "name": "Lavatrice", "entity": LAV, "energy_entity": LAV_E},
    {"type": "frigorifero", "name": "Frigorifero", "entity": FRI},
]


async def _setup(hass: HomeAssistant, appliances=None, **options) -> MockConfigEntry:
    hass.states.async_set(LAV, "2", {"unit_of_measurement": "W"})
    hass.states.async_set(LAV_E, "10.000", {"unit_of_measurement": "kWh"})
    hass.states.async_set(FRI, "3", {"unit_of_measurement": "W"})
    entry = MockConfigEntry(
        domain=DOMAIN, title="Elettrodomestici", data={}, unique_id=DOMAIN,
        options={"appliances": appliances if appliances is not None else APPLIANCES, "price_kwh": 0.5, "notify_services": [], **options},
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


def _eid(hass: HomeAssistant, entry, domain: str, key: str, suffix: str) -> str:
    eid = er.async_get(hass).async_get_entity_id(domain, DOMAIN, f"{entry.entry_id}_{key}_{suffix}")
    assert eid, (domain, key, suffix)
    return eid


async def _tick(hass: HomeAssistant, freezer, when: datetime) -> None:
    freezer.move_to(when)
    async_fire_time_changed(hass, when)
    await hass.async_block_till_done()


async def _run_cycle(hass: HomeAssistant, freezer, start: datetime, minutes=40) -> datetime:
    """Una lavatrice che lavora per `minutes` minuti: 500 W, con il contatore di energia che sale."""
    await hass.config.async_set_time_zone("Europe/Rome")
    freezer.move_to(start)
    hass.states.async_set(LAV, "500", {"unit_of_measurement": "W"})
    await hass.async_block_till_done()
    t = start
    energy = 10.0
    for i in range(minutes):
        t += timedelta(minutes=1)
        energy += 0.01
        hass.states.async_set(LAV_E, f"{energy:.3f}", {"unit_of_measurement": "kWh"})
        await _tick(hass, freezer, t)
    return t


async def test_entities_are_created(hass: HomeAssistant) -> None:
    entry = await _setup(hass)
    assert hass.states.get(_eid(hass, entry, "sensor", "lavatrice", "stato")).state == "spento"
    assert hass.states.get(_eid(hass, entry, "binary_sensor", "lavatrice", "in_funzione")).state == "off"
    assert hass.states.get(_eid(hass, entry, "sensor", "frigorifero", "oggi_cicli")).state == "0"
    assert er.async_get(hass).async_get_entity_id("button", DOMAIN, f"{entry.entry_id}_frigorifero_svuotata") is None   # il frigo non "termina"
    assert er.async_get(hass).async_get_entity_id("sensor", DOMAIN, f"{entry.entry_id}_frigorifero_manutenzione") is None


async def test_full_cycle_counts_energy_cost_and_fires_event(hass: HomeAssistant, freezer) -> None:
    entry = await _setup(hass, notify_services=[])
    fired = []
    hass.bus.async_listen(EVENT_FINISHED, lambda e: fired.append(e.data))
    stato = _eid(hass, entry, "sensor", "lavatrice", "stato")
    t = await _run_cycle(hass, freezer, T0)
    assert hass.states.get(stato).state == "in_funzione"
    assert hass.states.get(stato).attributes["energia_ciclo"] > 0.3
    hass.states.async_set(LAV, "2", {"unit_of_measurement": "W"})
    await hass.async_block_till_done()
    await _tick(hass, freezer, t + timedelta(minutes=10))
    assert hass.states.get(stato).state == "terminato"
    assert hass.states.get(stato).attributes["fase"] == "Da svuotare"
    assert len(fired) == 1 and fired[0]["name"] == "Lavatrice" and fired[0]["energy_kwh"] > 0.3
    assert hass.states.get(_eid(hass, entry, "sensor", "lavatrice", "oggi_cicli")).state == "1"
    kwh = float(hass.states.get(_eid(hass, entry, "sensor", "lavatrice", "oggi_energia")).state)
    eur = float(hass.states.get(_eid(hass, entry, "sensor", "lavatrice", "oggi_costo")).state)
    assert 0.35 < kwh < 0.5 and abs(eur - kwh * 0.5) < 0.01
    await hass.services.async_call("button", "press", {"entity_id": _eid(hass, entry, "button", "lavatrice", "svuotata")}, blocking=True)
    assert hass.states.get(stato).state == "spento"


async def test_notify_service_is_called_at_the_end(hass: HomeAssistant, freezer) -> None:
    calls = []

    async def _notify(call):
        calls.append(dict(call.data))

    hass.services.async_register("notify", "casa", _notify)
    entry = await _setup(hass, notify_services=["notify.casa"])
    t = await _run_cycle(hass, freezer, T0)
    hass.states.async_set(LAV, "2", {"unit_of_measurement": "W"})
    await hass.async_block_till_done()
    await _tick(hass, freezer, t + timedelta(minutes=10))
    assert len(calls) == 1 and "Lavatrice" in calls[0]["title"] and "kWh" in calls[0]["message"]
    del entry


async def test_without_energy_sensor_power_is_integrated(hass: HomeAssistant, freezer) -> None:
    await hass.config.async_set_time_zone("Europe/Rome")
    freezer.move_to(T0)
    entry = await _setup(hass)
    hass.states.async_set(FRI, "100", {"unit_of_measurement": "W"})
    await hass.async_block_till_done()
    for i in range(1, 13):                                          # un'ora, a passi di 5 minuti (come i controlli periodici)
        await _tick(hass, freezer, T0 + timedelta(minutes=5 * i))
    hass.states.async_set(FRI, "3", {"unit_of_measurement": "W"})
    await hass.async_block_till_done()
    kwh = float(hass.states.get(_eid(hass, entry, "sensor", "frigorifero", "oggi_energia")).state)
    assert 0.09 < kwh < 0.12


async def test_kilowatt_and_unavailable_readings(hass: HomeAssistant) -> None:
    entry = await _setup(hass)
    stato = _eid(hass, entry, "sensor", "frigorifero", "stato")
    hass.states.async_set(FRI, "unavailable")
    await hass.async_block_till_done()
    assert hass.states.get(stato).state == "non_disponibile"
    hass.states.async_set(FRI, "0.003", {"unit_of_measurement": "kW"})
    await hass.async_block_till_done()
    assert hass.states.get(stato).state == "spento"


async def test_state_survives_reload(hass: HomeAssistant, freezer) -> None:
    entry = await _setup(hass)
    await _run_cycle(hass, freezer, T0, minutes=5)
    started = hass.data[DOMAIN][entry.entry_id].machines["lavatrice"].started
    await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    m = hass.data[DOMAIN][entry.entry_id].machines["lavatrice"]
    assert m.running and m.started == started
    assert hass.data[DOMAIN][entry.entry_id].days["lavatrice"]


async def test_websocket_info_update_action_stats(hass: HomeAssistant, hass_ws_client) -> None:
    entry = await _setup(hass)
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "elettrodomestici/info"})
    res = await client.receive_json()
    assert res["success"]
    r = res["result"]
    assert [a["key"] for a in r["appliances"]] == ["lavatrice", "frigorifero"]
    assert r["appliances"][0]["entities"]["stato"].startswith("sensor.")
    assert r["appliances"][0]["entities"]["svuotata"].startswith("button.")
    assert set(r["types"]) == {"lavatrice", "lavastoviglie", "asciugatrice", "forno", "frigorifero", "microonde"}

    new = APPLIANCES[:1] + [
        {"type": "forno", "name": "Forno", "entity": "sensor.presa_forno_potenza"},
        {"type": "tostapane", "name": "Tostapane", "entity": "sensor.x"},
        {"type": "forno", "name": "Forno doppio", "entity": "sensor.presa_forno_potenza"},
    ]
    await client.send_json({"id": 2, "type": "elettrodomestici/update", "appliances": new, "price_kwh": 0.21, "notify_services": ["notify.casa", "light.no"]})
    res = await client.receive_json()
    assert res["success"] and [a["id"] for a in res["result"]["appliances"]] == ["lavatrice", "forno"]
    assert res["result"]["notify_services"] == ["notify.casa"] and res["result"]["price_kwh"] == 0.21
    await hass.async_block_till_done()
    reg = er.async_get(hass)
    assert reg.async_get_entity_id("sensor", DOMAIN, f"{entry.entry_id}_forno_stato")
    assert reg.async_get_entity_id("sensor", DOMAIN, f"{entry.entry_id}_frigorifero_stato") is None   # tolto dall'elenco

    await client.send_json({"id": 3, "type": "elettrodomestici/stats"})
    res = await client.receive_json()
    assert res["success"] and set(res["result"]) == {"lavatrice", "forno"}
    assert res["result"]["lavatrice"]["periods"]["oggi"]["cycles"] == 0 and len(res["result"]["lavatrice"]["series"]) == 90
    await client.send_json({"id": 4, "type": "elettrodomestici/action", "key": "lavatrice", "action": "acknowledge"})
    assert (await client.receive_json())["result"]["ok"] is False
    await client.send_json({"id": 5, "type": "elettrodomestici/action", "key": "lavatrice", "action": "reset_maintenance"})
    assert (await client.receive_json())["result"]["ok"] is True
    await client.send_json({"id": 6, "type": "elettrodomestici/action", "key": "lavatrice", "action": "boh"})
    assert not (await client.receive_json())["success"]


async def test_threshold_change_applies_without_reload(hass: HomeAssistant, hass_ws_client) -> None:
    entry = await _setup(hass)
    client = await hass_ws_client(hass)
    changed = [{**APPLIANCES[0], "start_w": 40, "stop_w": 9}, APPLIANCES[1]]
    first = hass.data[DOMAIN][entry.entry_id]
    await client.send_json({"id": 1, "type": "elettrodomestici/update", "appliances": changed})
    assert (await client.receive_json())["success"]
    await hass.async_block_till_done()
    assert hass.data[DOMAIN][entry.entry_id] is first
    assert first.machines["lavatrice"].cfg.start_w == 40


async def test_config_flow_single_instance(hass: HomeAssistant) -> None:
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] == "form"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] == "create_entry"
    assert result["options"]["appliances"] == []
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] == "abort"


async def test_card_is_served(hass: HomeAssistant, hass_client) -> None:
    await _setup(hass)
    client = await hass_client()
    resp = await client.get("/elettrodomestici_static/elettrodomestici-card.js")
    assert resp.status == 200


async def test_import_history_from_old_package(hass: HomeAssistant, hass_ws_client, monkeypatch) -> None:
    from types import SimpleNamespace

    from homeassistant.components.recorder import history, statistics
    from homeassistant.util import dt as dt_util

    import custom_components.elettrodomestici.controller as ctrl

    await hass.config.async_set_time_zone("Europe/Rome")
    entry = await _setup(hass, [{**APPLIANCES[0], "maint_cycles": 30}, APPLIANCES[1]])
    today = dt_util.now().replace(hour=0, minute=0, second=0, microsecond=0)
    d0, d1, d2 = today - timedelta(days=3), today - timedelta(days=2), today - timedelta(days=1)

    class FakeRecorder:
        async def async_add_executor_job(self, func, *args):
            return func(*args)

    monkeypatch.setattr(ctrl, "get_instance", lambda hass: FakeRecorder())
    asked = {}

    def fake_stats(hass_, start, end, ids, period, units, types):
        asked.update(ids=ids, period=period, units=units, types=types)
        return {"sensor.vecchio_contatore": [{"start": dt_util.as_utc(d0).timestamp(), "change": 845019.2}, {"start": dt_util.as_utc(d1).timestamp(), "change": 1.5}, {"start": dt_util.as_utc(d2).timestamp(), "change": 0.8}]}

    def fake_states(hass_, start, end, ids, *a):
        def st(when, value):
            return SimpleNamespace(last_changed=dt_util.as_utc(when), state=value)

        if ids == ["counter.cicli_lavaggio_lavatrice"]:
            return {ids[0]: [st(d1 + timedelta(hours=1), "40"), st(d1 + timedelta(hours=9), "41"), st(d2 + timedelta(hours=9), "42")]}
        return {ids[0]: [st(d2 + timedelta(hours=10), "on"), st(d2 + timedelta(hours=12), "off")]}

    monkeypatch.setattr(statistics, "statistics_during_period", fake_stats)
    monkeypatch.setattr(history, "get_significant_states", fake_states)
    hass.states.async_set("counter.cicli_lavaggio_lavatrice", "45")

    client = await hass_ws_client(hass)
    await client.send_json({
        "id": 1, "type": "elettrodomestici/import_history", "key": "lavatrice", "energy_entity": "sensor.vecchio_contatore",
        "counter_entity": "counter.cicli_lavaggio_lavatrice", "status_entity": "binary_sensor.washing_machine_status", "days": 60, "price": 0.2,
    })
    res = await client.receive_json()
    assert res["success"], res
    r = res["result"]
    assert r["days_written"] == 3 and r["energy_days"] == 3 and r["skipped_days"] == 1 and r["kwh"] == 2.3 and r["cycles"] == 2 and r["baseline"] == 43
    assert asked["period"] == "day" and asked["units"] == {"energy": "kWh"} and asked["ids"] == {"sensor.vecchio_contatore"}

    ctl = hass.data[DOMAIN][entry.entry_id]
    assert ctl.maint["lavatrice"] == 45                                    # il contatore dei cicli era anche quello della manutenzione
    stats = ctl.stats("lavatrice")["lavatrice"]
    assert abs(stats["periods"]["totale"]["kwh"] - 2.3) < 1e-6
    assert stats["periods"]["totale"]["cycles"] == 2 + 43                  # trovati + quelli di prima del recorder
    assert abs(stats["periods"]["ieri"]["eur"] - 0.8 * 0.2) < 1e-6 and stats["periods"]["ieri"]["sec"] == 7200 and stats["periods"]["ieri"]["cycles"] == 1
    assert abs(stats["series"][-3]["kwh"] - 1.5) < 1e-6 and abs(stats["series"][-3]["kwh"] - 1.5) < 1e-6

    await client.send_json({"id": 2, "type": "elettrodomestici/import_history", "key": "lavatrice", "energy_entity": "sensor.vecchio_contatore", "days": 60})
    assert (await client.receive_json())["success"]
    assert abs(ctl.stats("lavatrice")["lavatrice"]["periods"]["totale"]["kwh"] - 2.3) < 1e-6      # nessun raddoppio

    await client.send_json({"id": 3, "type": "elettrodomestici/import_history", "key": "nonesiste", "days": 5})
    assert not (await client.receive_json())["success"]


async def test_import_without_recorder_is_a_clear_error(hass: HomeAssistant, hass_ws_client) -> None:
    await _setup(hass)
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "elettrodomestici/import_history", "key": "lavatrice", "energy_entity": "sensor.x", "days": 5})
    res = await client.receive_json()
    assert not res["success"] and "recorder" in res["error"]["message"].lower()


async def test_manufacturer_device_is_discovered_and_resolved(hass: HomeAssistant, hass_ws_client) -> None:
    from homeassistant.helpers import device_registry as dr

    other = MockConfigEntry(domain="electrolux", title="Electrolux")
    other.add_to_hass(hass)
    dev = dr.async_get(hass).async_get_or_create(config_entry_id=other.entry_id, identifiers={("electrolux", "asc")}, name="Asciugatrice")
    reg = er.async_get(hass)
    for key, domain in (("appliancestate", "sensor"), ("timetoend", "sensor"), ("doorstate", "binary_sensor"), ("connectivitystate", "binary_sensor"), ("language", "select")):
        reg.async_get_or_create(domain, "electrolux", f"acc-{key}-root-asc", device_id=dev.id, config_entry=other,
                                suggested_object_id=f"asc_{key}", translation_key=key)
    appl = [{"type": "asciugatrice", "name": "Asciugatrice", "entity": "sensor.presa_asc", "maker": "electrolux", "maker_device": dev.id},
            {"type": "forno", "name": "Forno", "entity": "sensor.presa_forno", "maker": "electrolux"}]   # senza dispositivo: ignorato
    await _setup(hass, appl)
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "elettrodomestici/info"})
    r = (await client.receive_json())["result"]
    assert r["makers"] == [{"maker": "electrolux", "label": "Electrolux", "device_id": dev.id, "name": "Asciugatrice"}]
    dryer, oven = r["appliances"]
    assert dryer["maker"] == "electrolux" and dryer["maker_device"] == dev.id
    assert dryer["maker_entities"] == {
        "stato": "sensor.asc_appliancestate", "rimanente": "sensor.asc_timetoend", "porta": "binary_sensor.asc_doorstate",
        "connessione": "binary_sensor.asc_connectivitystate",
    }
    assert oven["maker"] is None and oven["maker_entities"] == {}
