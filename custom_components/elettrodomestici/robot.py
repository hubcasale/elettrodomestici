"""Robot aspirapolvere: l'entità `vacuum.*` e quelle del suo dispositivo (batteria, stanze, consumabili, base...)."""
from __future__ import annotations

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er


def entities_of(hass: HomeAssistant, vacuum_entity: str) -> dict[str, str]:
    """Entità dello stesso dispositivo e della stessa integrazione del robot, per "dominio.chiave" (es. "sensor.battery_level").

    La chiave è quella di traduzione dell'entità, uguale per ogni robot della stessa marca (per Dreame: battery_level, cleaning_mode...).
    Le entità di una singola stanza e delle mappe salvate si lasciano fuori."""
    reg = er.async_get(hass)
    main = reg.async_get(vacuum_entity)
    out: dict[str, str] = {}
    if main is None or not main.device_id:
        return out
    for entry in er.async_entries_for_device(reg, main.device_id):
        if entry.platform != main.platform or entry.disabled or entry.entity_id == vacuum_entity:
            continue
        key = entry.translation_key
        if not key or "_room_" in (entry.unique_id or "") or key.endswith("_map") or key in ("saved_map", "wifi_map", "map_data"):
            continue
        out.setdefault(f"{entry.domain}.{key}", entry.entity_id)
    return out
