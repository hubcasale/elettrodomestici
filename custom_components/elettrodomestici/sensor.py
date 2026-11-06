"""Sensori di ogni elettrodomestico: stato (con tutti i dati per la scheda), energia e costo di oggi, cicli di oggi, manutenzione."""
from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity, SensorStateClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import PERCENTAGE, UnitOfEnergy
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .controller import ElettroController
from .engine import STATES
from .entity import ElettroEntity

# gli attributi cambiano a ogni aggiornamento mentre l'elettrodomestico lavora: non vanno nel database
_VOLATILE = frozenset(
    {
        "tipo", "fase", "fase_indice", "fasi", "inizio", "fine", "trascorso_s", "energia_ciclo", "costo_ciclo", "picco_ciclo",
        "stima_rimanente_s", "oggi_kwh", "oggi_eur", "oggi_cicli", "oggi_secondi", "manutenzione_cicli", "manutenzione_soglia",
        "manutenzione_pct", "ultimo_ciclo",
    }
)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    controller: ElettroController = hass.data[DOMAIN][entry.entry_id]
    entities: list[ElettroEntity] = []
    for key, machine in controller.machines.items():
        entities.append(StateSensor(controller, key))
        entities.append(TodaySensor(controller, key, "oggi_energia", "oggi_kwh", SensorDeviceClass.ENERGY, UnitOfEnergy.KILO_WATT_HOUR, 3))
        entities.append(TodaySensor(controller, key, "oggi_costo", "oggi_eur", SensorDeviceClass.MONETARY, "EUR", 2))
        entities.append(TodaySensor(controller, key, "oggi_cicli", "oggi_cicli", None, None, 0))
        if machine.cfg.maint_cycles > 0:
            entities.append(TodaySensor(controller, key, "manutenzione", "manutenzione_pct", None, PERCENTAGE, 0))
    async_add_entities(entities)


class StateSensor(ElettroEntity, SensorEntity):
    _attr_device_class = SensorDeviceClass.ENUM
    _attr_options = list(STATES)
    _unrecorded_attributes = _VOLATILE

    def __init__(self, controller: ElettroController, key: str) -> None:
        super().__init__(controller, key, "stato", "stato")

    @property
    def native_value(self) -> str:
        return self.machine.state

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return self.controller.snapshot(self.key)

    @property
    def icon(self) -> str:
        return self.machine.profile.icon


class TodaySensor(ElettroEntity, SensorEntity):
    """Un valore tratto dalle statistiche di oggi (o dalla manutenzione)."""

    def __init__(self, controller: ElettroController, key: str, suffix: str, field: str, device_class, unit, precision: int) -> None:
        super().__init__(controller, key, suffix, suffix)
        self._field = field
        self._attr_device_class = device_class
        self._attr_native_unit_of_measurement = unit
        self._attr_suggested_display_precision = precision
        if device_class == SensorDeviceClass.ENERGY:
            self._attr_state_class = SensorStateClass.TOTAL_INCREASING   # riparte da zero a mezzanotte
        elif suffix == "oggi_cicli":
            self._attr_state_class = SensorStateClass.TOTAL_INCREASING

    @property
    def native_value(self) -> float | int | None:
        v = self.controller.snapshot(self.key).get(self._field)
        if v is None:
            return None
        return round(v, 3) if isinstance(v, float) else v
