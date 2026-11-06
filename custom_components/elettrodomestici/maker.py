"""Integrazioni dei costruttori da cui prendere stato, fase, programma e tempo rimanente (per ora solo Electrolux)."""
from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr, entity_registry as er

# tipo -> piattaforma di Home Assistant e ruoli che ci servono (chiave di traduzione dell'entità -> ruolo)
MAKERS: dict[str, dict[str, Any]] = {
    "electrolux": {
        "label": "Electrolux",
        "platform": "electrolux",
        "roles": {
            "appliancestate": "stato",
            "cyclephase": "fase",
            "timetoend": "rimanente",
            "programuid": "programma",
            "doorstate": "porta",
            "connectivitystate": "connessione",
            "totalcyclecounter": "cicli",
        },
    },
}


def _role(maker: str, entry: er.RegistryEntry) -> str | None:
    roles = MAKERS[maker]["roles"]
    key = entry.translation_key
    if not key and entry.unique_id:
        parts = entry.unique_id.split("-")
        key = parts[1] if len(parts) > 2 else None        # "<account>-<attributo>-<sezione>-<apparecchio>"
    return roles.get(str(key or "").lower())


def entities_of(hass: HomeAssistant, maker: str | None, device_id: str | None) -> dict[str, str]:
    """Ruolo -> entità del dispositivo del costruttore (vuoto se non c'è o non è scelto)."""
    if maker not in MAKERS or not device_id:
        return {}
    reg = er.async_get(hass)
    out: dict[str, str] = {}
    for entry in er.async_entries_for_device(reg, device_id):
        if entry.platform != MAKERS[maker]["platform"] or entry.disabled:
            continue
        role = _role(maker, entry)
        if role and role not in out:
            out[role] = entry.entity_id
    return out


def discover(hass: HomeAssistant) -> list[dict[str, str]]:
    """Dispositivi dei costruttori supportati già presenti in Home Assistant, per sceglierli nelle preferenze."""
    reg = er.async_get(hass)
    devs = dr.async_get(hass)
    found: list[dict[str, str]] = []
    for maker, spec in MAKERS.items():
        seen: set[str] = set()
        for entry in reg.entities.values():
            if entry.platform != spec["platform"] or not entry.device_id or entry.device_id in seen:
                continue
            seen.add(entry.device_id)
            dev = devs.async_get(entry.device_id)
            name = (dev.name_by_user or dev.name) if dev else None
            found.append({"maker": maker, "label": spec["label"], "device_id": entry.device_id, "name": name or entry.device_id})
    return sorted(found, key=lambda x: (x["maker"], x["name"].lower()))
