"""Un sensore binario "in funzione" per ogni elettrodomestico (comodo nelle automazioni)."""
from __future__ import annotations

from homeassistant.components.binary_sensor import BinarySensorDeviceClass, BinarySensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .controller import ElettroController
from .entity import ElettroEntity


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    controller: ElettroController = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([RunningSensor(controller, key) for key in controller.machines])


class RunningSensor(ElettroEntity, BinarySensorEntity):
    _attr_device_class = BinarySensorDeviceClass.RUNNING

    def __init__(self, controller: ElettroController, key: str) -> None:
        super().__init__(controller, key, "in_funzione", "in_funzione")

    @property
    def is_on(self) -> bool:
        return self.machine.running
