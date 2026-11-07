"""Elettrodomestici: dalla potenza di una presa intelligente si ricavano stato, fasi, cicli, consumi e costi; con scheda e statistiche."""
from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.components import frontend, websocket_api
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.typing import ConfigType

from .const import CARD_FILE, CARD_URL, CONF_APPLIANCES, CONF_NOTIFY, CONF_PRICE, CONF_PRICE_ENTITY, DEFAULT_PRICE, DOMAIN, PLATFORMS
from .controller import ElettroController, signature
from .engine import ENTITY_RE, parse_appliances

_LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema({DOMAIN: vol.Schema({})}, extra=vol.ALLOW_EXTRA)

# (suffisso dell'unique_id, dominio) delle entità di ogni elettrodomestico
APPLIANCE_ENTITIES = (
    ("stato", "sensor"), ("oggi_energia", "sensor"), ("oggi_costo", "sensor"), ("oggi_cicli", "sensor"), ("manutenzione", "sensor"),
    ("in_funzione", "binary_sensor"), ("svuotata", "button"), ("manutenzione_fatta", "button"),
)


def _version() -> str:
    try:
        return json.loads((Path(__file__).parent / "manifest.json").read_text())["version"]
    except (OSError, ValueError, KeyError):
        return "0"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Registra la scheda (servita dall'integrazione) e i comandi per la scheda."""
    hass.data.setdefault(DOMAIN, {})
    card_path = Path(__file__).parent / CARD_FILE
    if await hass.async_add_executor_job(card_path.is_file):
        version = await hass.async_add_executor_job(_version)
        await hass.http.async_register_static_paths([StaticPathConfig(CARD_URL, str(card_path), cache_headers=False)])
        frontend.add_extra_js_url(hass, f"{CARD_URL}?v={version}")
    else:
        _LOGGER.warning("Scheda non trovata in %s: costruiscila con npm run build", card_path)
    for command in (ws_info, ws_update, ws_action, ws_stats, ws_import):
        websocket_api.async_register_command(hass, command)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    controller = ElettroController(hass, entry)
    hass.data[DOMAIN][entry.entry_id] = controller
    await controller.async_start()
    general = dr.async_get(hass).async_get_or_create(
        config_entry_id=entry.entry_id, identifiers={(DOMAIN, entry.entry_id)}, name=entry.title, manufacturer="Elettrodomestici", model="Riepilogo"
    )
    controller.general_device_id = general.id
    _prune_registry(hass, entry, controller)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    return True


async def _async_options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Opzioni cambiate: se cambia l'elenco si ricarica la voce, altrimenti si applica subito."""
    controller: ElettroController | None = hass.data[DOMAIN].get(entry.entry_id)
    if controller is None or signature(parse_appliances(entry.options.get(CONF_APPLIANCES))) != controller.signature or _entity_sets_changed(entry, controller):
        await hass.config_entries.async_reload(entry.entry_id)
        return
    controller.apply_options()


def _entity_sets_changed(entry: ConfigEntry, controller: ElettroController) -> bool:
    """Le sorgenti (presa, contatore) e la soglia di manutenzione decidono ascolti ed entità: se cambiano si ricarica."""
    new = {c.id: (c.entity, c.energy_entity, c.maint_cycles > 0, c.profile.has_finished) for c in parse_appliances(entry.options.get(CONF_APPLIANCES)) if not c.is_robot}
    old = {k: (m.cfg.entity, m.cfg.energy_entity, m.cfg.maint_cycles > 0, m.profile.has_finished) for k, m in controller.machines.items()}
    return new != old


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if ok:
        controller: ElettroController = hass.data[DOMAIN].pop(entry.entry_id)
        await controller.async_stop()
    return ok


@callback
def _prune_registry(hass: HomeAssistant, entry: ConfigEntry, controller: ElettroController) -> None:
    """Toglie entità e dispositivi degli elettrodomestici che non ci sono più."""
    keep = {f"{entry.entry_id}_{k}_{s}" for k, m in controller.machines.items() for s, _ in APPLIANCE_ENTITIES}
    reg = er.async_get(hass)
    for ent in er.async_entries_for_config_entry(reg, entry.entry_id):
        if ent.unique_id not in keep:
            reg.async_remove(ent.entity_id)
    dev_keep = {f"{entry.entry_id}_{k}" for k in controller.machines} | {entry.entry_id}
    dreg = dr.async_get(hass)
    for dev in dr.async_entries_for_config_entry(dreg, entry.entry_id):
        if not any(i[0] == DOMAIN and i[1] in dev_keep for i in dev.identifiers):
            dreg.async_remove_device(dev.id)


# ---------------------------------------------------------------------- comandi per la scheda
def _controller(hass: HomeAssistant, entry_id: str | None) -> ElettroController | None:
    controllers = {k: v for k, v in hass.data.get(DOMAIN, {}).items() if isinstance(v, ElettroController)}
    if entry_id:
        return controllers.get(entry_id)
    return next(iter(controllers.values()), None)


def _entities_of(hass: HomeAssistant, c: ElettroController, key: str) -> dict[str, str]:
    reg = er.async_get(hass)
    out: dict[str, str] = {}
    for suffix, domain in APPLIANCE_ENTITIES:
        eid = reg.async_get_entity_id(domain, DOMAIN, f"{c.entry.entry_id}_{key}_{suffix}")
        if eid:
            out[suffix] = eid
    return out


@websocket_api.websocket_command({vol.Required("type"): "elettrodomestici/info", vol.Optional("entry_id"): str})
@callback
def ws_info(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    c = _controller(hass, msg.get("entry_id"))
    if c is None:
        connection.send_error(msg["id"], "not_found", "Elettrodomestici non configurato")
        return
    data = c.info()
    for item in data["appliances"]:
        item["entities"] = _entities_of(hass, c, item["key"])
    connection.send_result(msg["id"], data)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "elettrodomestici/update",
        vol.Optional("entry_id"): str,
        vol.Optional("appliances"): list,
        vol.Optional("price_kwh"): vol.All(vol.Coerce(float), vol.Range(min=0, max=10)),
        vol.Optional("price_entity"): str,
        vol.Optional("notify_services"): [str],
    }
)
@websocket_api.require_admin
@callback
def ws_update(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Salva l'elenco completo degli elettrodomestici e/o prezzo e avvisi (voci non valide e doppioni si scartano)."""
    c = _controller(hass, msg.get("entry_id"))
    if c is None:
        connection.send_error(msg["id"], "not_found", "Elettrodomestici non configurato")
        return
    options = dict(c.entry.options)
    if "appliances" in msg:
        options[CONF_APPLIANCES] = [a.to_dict() for a in parse_appliances(msg["appliances"])]
    if "price_kwh" in msg:
        options[CONF_PRICE] = msg["price_kwh"]
    if "price_entity" in msg:
        ent = msg["price_entity"].strip()
        options[CONF_PRICE_ENTITY] = ent if ENTITY_RE.match(ent) else ""
    if "notify_services" in msg:
        options[CONF_NOTIFY] = [s.strip() for s in msg["notify_services"] if s.strip().startswith("notify.") and ENTITY_RE.match(s.strip())]
    hass.config_entries.async_update_entry(c.entry, options=options)
    connection.send_result(
        msg["id"],
        {
            "appliances": options.get(CONF_APPLIANCES, []),
            "price_kwh": options.get(CONF_PRICE, DEFAULT_PRICE),
            "price_entity": options.get(CONF_PRICE_ENTITY, ""),
            "notify_services": options.get(CONF_NOTIFY, []),
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "elettrodomestici/action",
        vol.Optional("entry_id"): str,
        vol.Required("key"): str,
        vol.Required("action"): vol.In(["acknowledge", "reset_maintenance"]),
    }
)
@callback
def ws_action(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    c = _controller(hass, msg.get("entry_id"))
    if c is None:
        connection.send_error(msg["id"], "not_found", "Elettrodomestici non configurato")
        return
    connection.send_result(msg["id"], {"ok": c.action(msg["key"], msg["action"])})


@websocket_api.websocket_command({vol.Required("type"): "elettrodomestici/stats", vol.Optional("entry_id"): str, vol.Optional("key"): str})
@callback
def ws_stats(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    c = _controller(hass, msg.get("entry_id"))
    if c is None:
        connection.send_error(msg["id"], "not_found", "Elettrodomestici non configurato")
        return
    connection.send_result(msg["id"], c.stats(msg.get("key")))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "elettrodomestici/import_history",
        vol.Optional("entry_id"): str,
        vol.Required("key"): str,
        vol.Optional("energy_entity"): str,
        vol.Optional("counter_entity"): str,
        vol.Optional("status_entity"): str,
        vol.Optional("days", default=730): vol.All(int, vol.Range(min=1, max=3650)),
        vol.Optional("price"): vol.All(vol.Coerce(float), vol.Range(min=0, max=10)),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_import(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Importa nelle statistiche lo storico di un vecchio pacchetto (energia, cicli, funzionamento)."""
    c = _controller(hass, msg.get("entry_id"))
    if c is None:
        connection.send_error(msg["id"], "not_found", "Elettrodomestici non configurato")
        return

    def _ent(name: str) -> str | None:
        v = (msg.get(name) or "").strip()
        return v if ENTITY_RE.match(v) else None

    try:
        result = await c.async_import_history(msg["key"], _ent("energy_entity"), _ent("counter_entity"), _ent("status_entity"), msg["days"], msg.get("price"))
    except ValueError as err:
        connection.send_error(msg["id"], "not_found", str(err))
        return
    connection.send_result(msg["id"], result)
