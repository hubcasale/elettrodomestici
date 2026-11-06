"""Configurazione guidata: una sola voce; gli elettrodomestici si aggiungono dalla scheda (o dal comando elettrodomestici/update)."""
from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import CONF_APPLIANCES, CONF_NOTIFY, CONF_PRICE, DEFAULT_PRICE, DOMAIN


class ElettrodomesticiConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()
        if user_input is not None:
            return self.async_create_entry(
                title="Elettrodomestici", data={}, options={CONF_APPLIANCES: [], CONF_PRICE: DEFAULT_PRICE, CONF_NOTIFY: []}
            )
        return self.async_show_form(step_id="user")
