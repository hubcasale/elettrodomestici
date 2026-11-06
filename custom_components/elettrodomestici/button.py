"""Pulsanti: "ho svuotato" (conferma il fine ciclo) e "manutenzione fatta" (azzera il contatore)."""
from __future__ import annotations

from homeassistant.components.button import ButtonEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .controller import ElettroController
from .entity import ElettroEntity


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    controller: ElettroController = hass.data[DOMAIN][entry.entry_id]
    entities: list[ElettroEntity] = []
    for key, machine in controller.machines.items():
        if machine.profile.has_finished:
            entities.append(ActionButton(controller, key, "svuotata", "acknowledge"))
        if machine.cfg.maint_cycles > 0:
            entities.append(ActionButton(controller, key, "manutenzione_fatta", "reset_maintenance"))
    async_add_entities(entities)


class ActionButton(ElettroEntity, ButtonEntity):
    def __init__(self, controller: ElettroController, key: str, suffix: str, action: str) -> None:
        super().__init__(controller, key, suffix, suffix)
        self._action = action

    async def async_press(self) -> None:
        self.controller.action(self.key, self._action)
