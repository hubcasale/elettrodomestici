"""Base comune delle entità: un dispositivo per ogni elettrodomestico, più uno generale."""
from __future__ import annotations

from homeassistant.core import callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity import DeviceInfo

from .const import DOMAIN
from .controller import ElettroController
from .engine import Machine


class ElettroEntity:
    _attr_has_entity_name = True
    _attr_should_poll = False

    def __init__(self, controller: ElettroController, key: str, suffix: str, translation_key: str) -> None:
        self.controller = controller
        self.key = key
        self._attr_unique_id = f"{controller.entry.entry_id}_{key}_{suffix}"
        self._attr_translation_key = translation_key
        self._attr_device_info = appliance_device(controller, controller.machines[key])

    @property
    def machine(self) -> Machine:
        return self.controller.machines[self.key]

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(async_dispatcher_connect(self.hass, self.controller.signal, self._refresh))

    @callback
    def _refresh(self) -> None:
        self.async_write_ha_state()


def general_device(controller: ElettroController) -> DeviceInfo:
    return DeviceInfo(identifiers={(DOMAIN, controller.entry.entry_id)}, name=controller.entry.title, manufacturer="Elettrodomestici", model="Riepilogo")


def appliance_device(controller: ElettroController, machine: Machine) -> DeviceInfo:
    info = DeviceInfo(
        identifiers={(DOMAIN, f"{controller.entry.entry_id}_{machine.cfg.id}")},
        name=machine.cfg.name,
        manufacturer="Elettrodomestici",
        model=machine.profile.label,
    )
    # le versioni recenti di Home Assistant vogliono l'id del dispositivo padre (via_device è in dismissione)
    if "via_device_id" in DeviceInfo.__annotations__ and controller.general_device_id:
        info["via_device_id"] = controller.general_device_id  # type: ignore[typeddict-unknown-key]
    else:
        info["via_device"] = (DOMAIN, controller.entry.entry_id)
    return info
