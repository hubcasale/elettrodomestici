"""Costanti dell'integrazione Elettrodomestici."""
from homeassistant.const import Platform

DOMAIN = "elettrodomestici"
PLATFORMS = [Platform.SENSOR, Platform.BINARY_SENSOR, Platform.BUTTON]

CONF_APPLIANCES = "appliances"
CONF_PRICE = "price_kwh"
CONF_PRICE_ENTITY = "price_entity"
CONF_NOTIFY = "notify_services"
DEFAULT_PRICE = 0.30

STORAGE_VERSION = 1
CARD_URL = "/elettrodomestici_static/elettrodomestici-card.js"
CARD_FILE = "frontend/elettrodomestici-card.js"

SIGNAL_UPDATE = f"{DOMAIN}_update_{{}}"   # formato con l'id della voce di configurazione
TICK_SECONDS = 10
SAVE_EVERY = 300
MAX_GAP = 600                             # secondi: oltre, l'intervallo senza letture non si integra (Home Assistant fermo)

EVENT_FINISHED = f"{DOMAIN}_ciclo_terminato"
EVENT_ALERT = f"{DOMAIN}_avviso"
