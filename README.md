# Elettrodomestici

Integrazione per Home Assistant (HACS) e scheda Lovelace per **lavatrice, lavastoviglie, asciugatrice, forno, frigorifero, microonde** per il **robot aspirapolvere** e per l'**umidostato** del bagno (accende e spegne un ventilatore in base all'umidità).
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
* **Configurazione della scheda** (Modifica scheda): titolo, colonne e quali elettrodomestici mostrare, e sotto le **preferenze**: si aggiunge un elettrodomestico scegliendo il **tipo** (soglie e fasce si adattano da sole) e il sensore di potenza; prezzo dell'energia e notifiche. Le preferenze restano salvate nell'integrazione (valgono per tutte le schede e il motore lavora anche a dashboard chiusa) e si salvano col pulsante «Salva preferenze».

```yaml
type: custom:elettrodomestici-card
# facoltativi:
title: Elettrodomestici
columns: 2                       # colonne delle tessere (1-8); 0 o assente = automatico
appliances: [lavatrice, forno]   # solo questi (id); senza l'elenco si vedono tutti
header: false                    # senza titolo e riepilogo (per inserire la scheda dentro un'altra)
color: orange                    # colore proprio della scheda: sfondo tinto e bordo, tessere come sono (nome di Home Assistant o colore CSS)
grid_options: { rows: 4 }        # vista a sezioni: righe e colonne si regolano dalla scheda «Layout» (qui un esempio)
```

**Griglia e comportamento nella dashboard**

* `color` (dall'editor: «Colore della scheda») dà alla scheda un colore proprio, come un blocco colorato della plancia: lo sfondo ne prende una tinta e il bordo lo segue, le tessere restano come le disegna il tema. Vale un nome della tavolozza di Home Assistant (`orange`, `blue`…) oppure, nello YAML, un colore CSS (`#ff9800`).
* `columns` è il **massimo** di colonne: se la scheda è stretta (una sezione piccola, il telefono) si riducono da sole, così le tessere non diventano mai più strette di circa 260 px.
* Vista **a sezioni**: la scheda occupa per default tutta la larghezza della sezione (12 colonne) e l'altezza che serve (`rows: auto`); con un numero fisso di righe il contenuto scorre dentro la scheda. Dimensioni minime 3 colonne × 2 righe; si cambiano dal pannello «Layout» o con `grid_options`.
* Vista **masonry**: l'altezza si stima da quante tessere ci sono e da quante colonne ci stanno.

## Installazione

1. HACS → Integrazioni → menu ⋮ → *Repository personalizzati* → `https://github.com/hubcasale/elettrodomestici` (Integrazione).
2. Scarica, riavvia Home Assistant.
3. Impostazioni → Dispositivi e servizi → *Aggiungi integrazione* → **Elettrodomestici**.
4. Aggiungi la scheda alla dashboard (viene caricata dall'integrazione, nessuna risorsa da registrare) e, dalla sua configurazione, i tuoi elettrodomestici.
   Su Fully Kiosk svuota la cache dopo ogni aggiornamento.

Ogni presa deve avere un sensore di **potenza** (W o kW). Se ha anche un contatore di **energia** (kWh) indicalo: i consumi saranno più precisi;
altrimenti l'energia si ricava dalla potenza.

### Integrazione del costruttore (Electrolux)
Nelle preferenze dell'elettrodomestico (configurazione della scheda) c'è la spunta **Usa l'integrazione del costruttore**: si sceglie il dispositivo dell'integrazione
[Electrolux](https://github.com/TTLucian/ha-electrolux) già presente in Home Assistant. Da lì arrivano **stato, fase, programma, sportello e tempo
rimanente** (la barra di avanzamento si calcola sul tempo che resta), mentre **consumi, costi e cicli restano quelli della presa**.
Gli apparecchi Electrolux si scollegano dal cloud quando sono spenti: in quel caso i loro sensori sono "sconosciuti" e la tessera
mostra una riga "apparecchio spento o non collegato", continuando a funzionare con la sola potenza della presa.
Per altre entità (programma di un'altra marca, ecc.) restano i *dispositivi collegati*.

## Robot aspirapolvere
Dalle preferenze (configurazione della scheda) si aggiunge **Aspirapolvere** scegliendo l'entità `vacuum.…` del robot (non serve nessuna presa). Sulla scheda compare con stato,
batteria, stanza e area della pulizia in corso, e pulsanti rapidi (Avvia/Pausa, Base). Toccandolo si apre la **gestione completa**, a schede:

* **Pulisci**: stato e batteria, poi scegli cosa pulire (**Tutta la casa**, una stanza o più stanze), le passate (1-3) e premi il pulsante di avvio, che dice cosa farà ("Pulisci Cucina e Camera · 2 passate"). Mentre lavora compaiono Pausa/Riprendi, Stop e Alla base; ci sono anche Trovalo, le scorciatoie, un riassunto di "Come pulisce" (modalità, aspirazione, panno) e la mappa.
* **Impostazioni**: modalità, aspirazione, umidità del panno, percorso, temperatura dell'acqua; interruttori (non disturbare, blocco bambini, tappeti, ostacoli...) e volume.
* **Base**: stato di serbatoi, sacchetto e panno; svuota la polvere, lava e asciuga i panni; impostazioni della base.
* **Manutenzione**: spazzole, filtro, sensori e ruote con la percentuale che resta e "Segna come sostituito"; statistiche (pulizie, superficie, tempo).

Le entità del robot (batteria, selezioni, consumabili, base) si trovano da sole dal suo dispositivo: oggi sono riconosciute quelle dell'integrazione
[Dreame](https://github.com/Tasshack/dreame-vacuum); con un'altra marca restano comunque i comandi base e lo stato.

## Umidostato

Un umidostato comanda un ventilatore (un `switch`, un `fan`, una `light` o un `input_boolean`) leggendo un sensore di umidità. Si aggiunge dalla configurazione della scheda, scegliendo "Umidostato", il sensore e il ventilatore; non servono presa né statistiche.

| Impostazione | Predefinito | Che cosa fa |
|---|---|---|
| Accende sopra | 70 % | Soglia di accensione. |
| Conferma accensione dopo | 2 min | L'umidità deve restare sopra la soglia per tutto questo tempo: ignora i picchi brevi. |
| Spegne sotto | 60 % | Soglia di spegnimento, sempre più bassa di quella di accensione (isteresi). |
| Conferma spegnimento dopo | 3 min | L'umidità deve restare sotto la soglia per tutto questo tempo. |
| Acceso almeno | 5 min | Non si spegne prima, anche se l'umidità scende subito. |
| Si spegne comunque dopo | 60 min | Limite di sicurezza (0 = nessuno). Dopo, riparte solo quando l'umidità scende sotto la soglia di accensione e risale. |
| Resta spento almeno | 0 min | Attesa prima di una nuova accensione. |
| Sensore di temperatura (facoltativo) | – | Si mostra sulla scheda e nei grafici; non influisce sulla regola. |
| Luce del bagno (facoltativa) | – | Accendendola, il ventilatore parte anche se l'umidità è bassa. |
| Con la luce, acceso al massimo | 10 min | Alla scadenza, se l'umidità è ancora sopra la soglia di spegnimento decide la regola dell'umidità; altrimenti si spegne. |

Il pulsante **Grafici** della tessera mostra l'umidità con le soglie, la temperatura (se scelta) e le fasce in cui ventilatore e luce erano accesi (6 ore, 24 ore, 3 o 7 giorni).

La regolazione automatica si attiva e disattiva dalla scheda (pulsante "Auto") o dalla configurazione della scheda; il ventilatore si accende e spegne anche a mano dalla scheda. Se il ventilatore viene acceso a mano, si spegne con le stesse regole. Ogni comando genera l'evento `elettrodomestici_umidostato` (`id`, `name`, `action`, `reason`, `humidity`).

## Entità, eventi, notifiche

Per ogni elettrodomestico: sensore **Stato** (attributi: fase, inizio, energia del ciclo, stima…), **Energia / Costo / Cicli di oggi**,
**Manutenzione** (%), sensore binario **In funzione**, pulsanti **Ho svuotato** e **Manutenzione fatta**.

* Evento `elettrodomestici_ciclo_terminato` (id, name, type, duration_minutes, energy_kwh, cost_eur) a ogni ciclo concluso.
* Evento `elettrodomestici_avviso` se un elettrodomestico resta in funzione oltre il tempo impostato (forno dimenticato).
* Notifiche: nella configurazione della scheda scegli i servizi `notify.*`; l'avviso di fine ciclo arriva anche senza automazioni.
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
