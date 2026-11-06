# Elettrodomestici

Integrazione per Home Assistant (HACS) e scheda Lovelace per **lavatrice, lavastoviglie, asciugatrice, forno, frigorifero e microonde**.
Sostituisce i vecchi pacchetti `elettrodomestici_2023` (non più aggiornati): l'elettrodomestico non va acceso né spento da Home Assistant,
la presa intelligente serve **solo a misurare la potenza**.

## Come funziona

Dalla potenza (W) della presa l'integrazione ricava lo stato:

| Stato | Significato |
| --- | --- |
| **Spento** | consumo a riposo |
| **In funzione** | con la **fase** (es. Lavaggio → Risciacquo → Centrifuga) |
| **Terminato** | ciclo finito, "Da svuotare" finché non tocchi *Ho svuotato* (lavatrice, lavastoviglie, asciugatrice) |
| **Non disponibile** | la presa non risponde |

Per ogni tipo ci sono soglie e tempi predefiniti (modificabili): avvio, fine, durata minima del ciclo (i picchi brevi non contano),
pause del programma (se riparte entro pochi minuti è lo stesso ciclo), fasi dedotte dalle fasi di riscaldamento.
Il frigorifero conta i cicli del compressore, il forno avvisa se resta acceso a lungo, il microonde conta gli usi.

## La scheda

* Tessera per elettrodomestico: **immagine animata**, stato e fase, **potenza**, energia e costo del ciclo / di oggi, cicli di oggi,
  avanzamento e fine stimata, valori collegati (programma, tempo rimanente…).
* Tocco sulla tessera → **statistiche**: oggi, ieri, settimana, mese, anno, totale (energia, costo, cicli, ore), ciclo medio, ultimi cicli,
  manutenzione (es. "pulizia filtro ogni 10 cicli"), come viene riconosciuto.
* Pulsante **Grafici**: potenza della presa con le soglie e le fasce dello stato (dal recorder), e consumi giorno per giorno
  (energia, costo, cicli, ore; 7/30/90 giorni). I consumi giornalieri sono salvati dall'integrazione: restano anche con un recorder corto.
* Ingranaggio → **Preferenze**: si aggiunge un elettrodomestico scegliendo il **tipo** (soglie e fasce si adattano da sole) e il sensore di potenza.

```yaml
type: custom:elettrodomestici-card
# facoltativi:
title: Elettrodomestici
appliances: [lavatrice, forno]   # solo questi (id); senza l'elenco si vedono tutti
header: false                    # senza titolo e ingranaggio
```

## Installazione

1. HACS → Integrazioni → menu ⋮ → *Repository personalizzati* → `https://github.com/hubcasale/elettrodomestici` (Integrazione).
2. Scarica, riavvia Home Assistant.
3. Impostazioni → Dispositivi e servizi → *Aggiungi integrazione* → **Elettrodomestici**.
4. Aggiungi la scheda alla dashboard (viene caricata dall'integrazione, nessuna risorsa da registrare) e, dall'ingranaggio, i tuoi elettrodomestici.
   Su Fully Kiosk svuota la cache dopo ogni aggiornamento.

Ogni presa deve avere un sensore di **potenza** (W o kW). Se ha anche un contatore di **energia** (kWh) indicalo: i consumi saranno più precisi;
altrimenti l'energia si ricava dalla potenza. Per l'asciugatrice con l'integrazione del costruttore (es. Electrolux) aggiungi le sue entità
come *dispositivi collegati*: programma, tempo rimanente e stato si vedono sulla tessera.

## Entità, eventi, notifiche

Per ogni elettrodomestico: sensore **Stato** (attributi: fase, inizio, energia del ciclo, stima…), **Energia / Costo / Cicli di oggi**,
**Manutenzione** (%), sensore binario **In funzione**, pulsanti **Ho svuotato** e **Manutenzione fatta**.

* Evento `elettrodomestici_ciclo_terminato` (id, name, type, duration_minutes, energy_kwh, cost_eur) a ogni ciclo concluso.
* Evento `elettrodomestici_avviso` se un elettrodomestico resta in funzione oltre il tempo impostato (forno dimenticato).
* Notifiche: nelle Preferenze scegli i servizi `notify.*`; l'avviso di fine ciclo arriva anche senza automazioni.
* Prezzo: €/kWh fisso o un sensore con il prezzo attuale.

## Sviluppo

```bash
npm install            # oppure collegare node_modules da un altro progetto
npm run build          # scheda -> custom_components/elettrodomestici/frontend (il bundle è committato, la CI lo verifica)
npm test && npm run typecheck
pip install pytest-homeassistant-custom-component home-assistant-frontend && python -m pytest tests
npm run build:dev      # poi aprire dev/index.html con un server statico (stati finti di tutti e sei gli elettrodomestici)
```

Parametri della pagina di prova: `?theme=dark`, `?only=lavatrice,forno`, `?open=elettro-stats-dialog|elettro-charts-dialog|elettro-settings-dialog&key=lavatrice`.

Licenza MIT. Ispirato al progetto `elettrodomestici_2023` di jumping2000 (idea della macchina a stati dalla potenza); il codice è nuovo.
