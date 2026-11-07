# Elettrodomestici

Integrazione per Home Assistant (HACS) e scheda Lovelace per **lavatrice, lavastoviglie, asciugatrice, forno, frigorifero, microonde** e per il **robot aspirapolvere**.
L'elettrodomestico non va acceso né spento da Home Assistant: la presa intelligente serve **solo a misurare la potenza**.

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
columns: 2                       # colonne delle tessere (1-8); 0 o assente = automatico
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
altrimenti l'energia si ricava dalla potenza.

### Integrazione del costruttore (Electrolux)
Nelle Preferenze dell'elettrodomestico c'è la spunta **Usa l'integrazione del costruttore**: si sceglie il dispositivo dell'integrazione
[Electrolux](https://github.com/TTLucian/ha-electrolux) già presente in Home Assistant. Da lì arrivano **stato, fase, programma, sportello e tempo
rimanente** (la barra di avanzamento si calcola sul tempo che resta), mentre **consumi, costi e cicli restano quelli della presa**.
Gli apparecchi Electrolux si scollegano dal cloud quando sono spenti: in quel caso i loro sensori sono "sconosciuti" e la tessera
mostra una riga "apparecchio spento o non collegato", continuando a funzionare con la sola potenza della presa.
Per altre entità (programma di un'altra marca, ecc.) restano i *dispositivi collegati*.

## Robot aspirapolvere
Dalle Preferenze si aggiunge **Aspirapolvere** scegliendo l'entità `vacuum.…` del robot (non serve nessuna presa). Sulla scheda compare con stato,
batteria, stanza e area della pulizia in corso, e pulsanti rapidi (Avvia/Pausa, Base). Toccandolo si apre la **gestione completa**, a schede:

* **Controllo**: Avvia/Riprendi, Pausa, Stop, Alla base, Trovalo; scorciatoie; modalità, aspirazione, umidità del panno, percorso, temperatura dell'acqua; mappa.
* **Stanze**: scegli una o più stanze e il numero di passate, poi "Pulisci".
* **Base**: stato di serbatoi, sacchetto e panno; svuota la polvere, lava e asciuga i panni; impostazioni della base.
* **Manutenzione**: spazzole, filtro, sensori e ruote con la percentuale che resta e "Segna come sostituito".
* **Altro**: interruttori (non disturbare, blocco bambini, tappeti, ostacoli...), volume e statistiche (pulizie, superficie, tempo).

Le entità del robot (batteria, selezioni, consumabili, base) si trovano da sole dal suo dispositivo: oggi sono riconosciute quelle dell'integrazione
[Dreame](https://github.com/Tasshack/dreame-vacuum); con un'altra marca restano comunque i comandi base e lo stato.

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

Licenza MIT.
