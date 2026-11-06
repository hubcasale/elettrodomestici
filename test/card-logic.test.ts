import test from "node:test";
import assert from "node:assert/strict";
import {
  appliancesError, energySensors, extraValue, fmt, fmtEur, fmtKwh, formatDuration, formatHours, liveSnapshot, metricText, newAppliance,
  counters, gridColumns, gridTemplate, guessOldPackage, makerView, notifyServices, parseNumeric, powerSensors, readPower, resample, slug, stateSegments, summaryText, sumSeries, tileModel,
} from "../src/card-logic";
import { applianceSvg } from "../src/appliance-svg";
import type { ApplianceInfo, HassState, TypeDefaults } from "../src/types";

const DEF: TypeDefaults = {
  label: "Lavatrice", icon: "mdi:washing-machine", off_label: "Spenta", done_label: "Da svuotare", has_finished: true, notify: true,
  maint_label: "Pulizia", phases: ["Lavaggio", "Risciacquo", "Centrifuga"], start_w: 10, stop_w: 4, start_delay: 30, end_delay: 420,
  min_cycle: 600, heat_w: 900, maint_cycles: 30, alert_minutes: 0,
};
const BASE = {
  tipo: "lavatrice", fase: "Spenta", fase_indice: null, fasi: ["Lavaggio", "Risciacquo", "Centrifuga"], inizio: null, fine: null, trascorso_s: null,
  energia_ciclo: null, costo_ciclo: null, picco_ciclo: null, stima_rimanente_s: null, oggi_kwh: 1.234, oggi_eur: 0.37, oggi_cicli: 2,
  oggi_secondi: 3600, manutenzione_cicli: 28, manutenzione_soglia: 30, manutenzione_pct: 93, ultimo_ciclo: null,
};
function app(over: Partial<ApplianceInfo> = {}): ApplianceInfo {
  return {
    ...BASE, id: "lavatrice", key: "lavatrice", type: "lavatrice", name: "Lavatrice", entity: "sensor.p", energy_entity: null, start_w: 10, stop_w: 4,
    start_delay: 30, end_delay: 420, min_cycle: 600, heat_w: 900, maint_cycles: 30, alert_minutes: 0, notify: true, extras: [], state: "spento",
    entities: { stato: "sensor.lavatrice_stato" }, ...over,
  } as ApplianceInfo;
}
const st = (state: string, attributes: Record<string, unknown> = {}): HassState => ({ state, attributes });

test("formati", () => {
  assert.equal(fmt(1.5, 1), "1,5");
  assert.equal(fmt(null), "–");
  assert.equal(fmtKwh(1.234), "1,23 kWh");
  assert.equal(fmtKwh(12.34), "12,3 kWh");
  assert.equal(fmtEur(0.375), "0,38 €");
  assert.equal(formatDuration(45), "45 s");
  assert.equal(formatDuration(5400), "1 h 30 min");
  assert.equal(formatHours(1800), "30 min");
  assert.equal(formatHours(7200), "2,0 h");
  assert.equal(metricText("cycles", 1), "1 ciclo");
  assert.equal(metricText("cycles", 3), "3 cicli");
});

test("potenza in kW diventa W", () => {
  assert.equal(readPower(st("0.5", { unit_of_measurement: "kW" })), 500);
  assert.equal(readPower(st("120", { unit_of_measurement: "W" })), 120);
  assert.equal(readPower(st("unavailable")), null);
  assert.equal(readPower(undefined), null);
});

test("gli attributi del sensore di stato sono più freschi dei dati caricati", () => {
  const states = { "sensor.lavatrice_stato": st("in_funzione", { fase: "Risciacquo", oggi_kwh: 2.5 }) };
  const { snap, state } = liveSnapshot(app(), states);
  assert.equal(state, "in_funzione");
  assert.equal(snap.fase, "Risciacquo");
  assert.equal(snap.oggi_kwh, 2.5);
  assert.equal(liveSnapshot(app({ state: "terminato" }), {}).state, "terminato");
  assert.equal(liveSnapshot(app(), { "sensor.lavatrice_stato": st("unavailable") }).state, "non_disponibile");
});

test("tessera di un ciclo in corso: fase, avanzamento, stima", () => {
  const now = Date.parse("2030-10-21T20:30:00Z");
  const states = {
    "sensor.p": st("1850", { unit_of_measurement: "W" }),
    "sensor.lavatrice_stato": st("in_funzione", {
      fase: "Lavaggio", fase_indice: 0, inizio: "2030-10-21T20:00:00Z", energia_ciclo: 0.42, costo_ciclo: 0.13, stima_rimanente_s: 1500,
    }),
  };
  const t = tileModel(app(), states, { lavatrice: DEF }, now);
  assert.equal(t.state, "in_funzione");
  assert.equal(t.power, 1850);
  assert.match(t.statusLine, /Lavaggio · da 30 min/);
  assert.ok(t.progress !== null && t.progress > 0.1 && t.progress < 0.3);
  assert.equal(t.progressLabel, "Fase 1 di 3");
  assert.match(t.remainingText, /25 min/);
  assert.equal(t.cycleKwh, 0.42);
  assert.equal(t.maintDue, false);
});

test("tessera terminata: pulsante 'ho svuotato' e ora di fine", () => {
  const states = { "sensor.lavatrice_stato": st("terminato", { fase: "Da svuotare", fine: "2030-10-21T21:15:00Z" }) };
  const t = tileModel(app({ state: "terminato" }), states, { lavatrice: DEF }, Date.now());
  assert.equal(t.canAck, true);
  assert.match(t.statusLine, /Da svuotare · finito alle \d\d:\d\d/);
});

test("tessera spenta con etichetta del tipo e manutenzione scaduta", () => {
  const t = tileModel(app({ manutenzione_pct: 100 }), {}, { lavatrice: DEF }, Date.now());
  assert.equal(t.statusLine, "Spenta");
  assert.equal(t.maintDue, true);
  assert.equal(t.progress, null);
});

test("valori dei dispositivi collegati", () => {
  const now = Date.parse("2030-10-21T20:00:00Z");
  assert.equal(extraValue(undefined, now), "non disponibile");
  assert.equal(extraValue(st("unavailable"), now), "non disponibile");
  assert.equal(extraValue(st("on"), now), "sì");
  assert.equal(extraValue(st("45", { unit_of_measurement: "min" }), now), "45 min");
  assert.equal(extraValue(st("cotone_40"), now), "cotone 40");
  assert.match(extraValue(st("2030-10-21T20:45:00Z", { device_class: "timestamp" }), now), /tra 45 min/);
});

test("riepilogo", () => {
  assert.match(summaryText([]), /Nessun elettrodomestico/);
  const a = tileModel(app(), { "sensor.p": st("2"), "sensor.lavatrice_stato": st("in_funzione", { fase: "Lavaggio" }) }, { lavatrice: DEF }, Date.now());
  const b = tileModel(app({ name: "Forno", key: "forno", entities: { stato: "sensor.forno_stato" } }), {}, { lavatrice: DEF }, Date.now());
  assert.match(summaryText([a, b]), /1 in funzione \(Lavatrice\)/);
  assert.match(summaryText([b]), /tutto fermo/);
});

test("serie: somma degli ultimi giorni", () => {
  const series = [
    { date: "2030-10-19", kwh: 1, eur: 0.3, cycles: 1, sec: 100 },
    { date: "2030-10-20", kwh: 2, eur: 0.6, cycles: 2, sec: 200 },
    { date: "2030-10-21", kwh: 3, eur: 0.9, cycles: 3, sec: 300 },
  ];
  assert.deepEqual(sumSeries(series, 2), { kwh: 5, eur: 1.5, cycles: 5, sec: 500 });
});

test("nuovo elettrodomestico con i valori del tipo e id unico", () => {
  const a = newAppliance("lavatrice", "sensor.x", "", DEF, []);
  assert.equal(a.id, "lavatrice");
  assert.equal(a.start_w, 10);
  assert.equal(a.maint_cycles, 30);
  assert.equal(newAppliance("lavatrice", "sensor.y", "Lavatrice", DEF, ["lavatrice"]).id, "lavatrice_2");
  assert.equal(slug("Caffè già pronto!"), "caffe_gia_pronto");
});

test("controlli sull'elenco", () => {
  const a = newAppliance("lavatrice", "sensor.x", "", DEF, []);
  assert.equal(appliancesError([a]), null);
  assert.match(appliancesError([{ ...a, entity: "" }]) ?? "", /sensore di potenza/);
  assert.match(appliancesError([a, { ...a, id: "b", name: "B" }]) ?? "", /già usato/);
  assert.match(appliancesError([{ ...a, stop_w: 50 }]) ?? "", /soglia di spegnimento/);
});

test("elenchi per le scelte", () => {
  const states = {
    "sensor.presa_w": st("5", { unit_of_measurement: "W", friendly_name: "Presa lavatrice" }),
    "sensor.presa_e": st("5", { unit_of_measurement: "kWh", device_class: "energy" }),
    "sensor.temp": st("20", { unit_of_measurement: "°C" }),
    "light.x": st("on"),
  };
  assert.deepEqual(powerSensors(states).map((c) => c.id), ["sensor.presa_w"]);
  assert.deepEqual(powerSensors(states, ["sensor.presa_w"]), []);
  assert.deepEqual(energySensors(states).map((c) => c.id), ["sensor.presa_e"]);
  assert.deepEqual(notifyServices({ notify: { mobile_app_x: {}, send_message: {}, casa: {} } }), ["notify.casa", "notify.mobile_app_x"]);
});

test("storico: numeri, tratti dello stato, campionamento", () => {
  const raw = [
    { s: "10", lu: 1000 }, { s: "unavailable", lu: 2000 }, { s: "30", lu: 3000 }, { s: "x", lu: 4000 },
  ];
  assert.deepEqual(parseNumeric(raw).map((p) => p.v), [10, 30]);
  const B = 1_700_000_000_000;
  const segs = stateSegments([{ s: "spento", lu: B }, { s: "in_funzione", lu: B + 40000 }, { s: "terminato", lu: B + 80000 }], B + 20000, B + 100000);
  assert.deepEqual(segs.map((s) => [s.state, s.from - B, s.to - B]), [["spento", 20000, 40000], ["in_funzione", 40000, 80000], ["terminato", 80000, 100000]]);
  const vals = resample([{ t: 0, v: 10 }, { t: 5000, v: 20 }], 0, 10000, 2);
  assert.deepEqual(vals, [10, 20]);
});

test("le illustrazioni esistono per tutti i tipi e gli stati", () => {
  for (const type of ["lavatrice", "lavastoviglie", "asciugatrice", "forno", "frigorifero", "microonde"] as const) {
    for (const state of ["spento", "in_funzione", "terminato", "non_disponibile"] as const) {
      const svg = applianceSvg(type, state);
      assert.ok(svg.startsWith("<svg") && svg.endsWith("</svg>"), `${type} ${state}`);
      assert.ok(svg.length > 400);
    }
  }
  assert.ok(applianceSvg("lavatrice", "in_funzione").includes('class="sp"'));
  assert.ok(!applianceSvg("lavatrice", "spento").includes('class="sp"'));
});

test("riconosce il contatore e il sensore di stato del vecchio pacchetto", () => {
  const states = {
    "counter.cicli_lavaggio_lavatrice": st("45"),
    "counter.cicli_lavastoviglie": st("3"),
    "counter.altro": st("1"),
    "binary_sensor.washing_machine_status": st("off"),
    "binary_sensor.dishwasher_status": st("off"),
    "binary_sensor.porta": st("off"),
  };
  assert.deepEqual(guessOldPackage(states, "lavatrice"), { counter: "counter.cicli_lavaggio_lavatrice", status: "binary_sensor.washing_machine_status" });
  assert.deepEqual(guessOldPackage(states, "lavastoviglie"), { counter: "counter.cicli_lavastoviglie", status: "binary_sensor.dishwasher_status" });
  assert.deepEqual(guessOldPackage(states, "forno"), { counter: "", status: "" });
  assert.deepEqual(counters(states).map((c) => c.id).sort(), ["counter.altro", "counter.cicli_lavaggio_lavatrice", "counter.cicli_lavastoviglie"]);
});

test("colonne della griglia: da 1 a 8, altrimenti automatico", () => {
  assert.equal(gridColumns(3), 3);
  assert.equal(gridColumns("2"), 2);
  assert.equal(gridColumns(20), 8);
  assert.equal(gridColumns(0), null);
  assert.equal(gridColumns(undefined), null);
  assert.equal(gridColumns("boh"), null);
  assert.equal(gridTemplate(2), "repeat(2, minmax(0, 1fr))");
  assert.match(gridTemplate(0), /auto-fill/);
});

test("integrazione del costruttore: stato, fase, programma e tempo rimanente al posto delle stime", () => {
  const now = Date.parse("2030-10-21T20:30:00Z");
  const ents = { stato: "sensor.d_stato", fase: "sensor.d_fase", rimanente: "sensor.d_resto", programma: "select.d_prog", porta: "binary_sensor.d_porta", connessione: "binary_sensor.d_conn" };
  const states = {
    "sensor.p": st("0.5"),
    "sensor.lavatrice_stato": st("in_funzione", { fase: "Lavaggio", inizio: "2030-10-21T20:00:00Z", stima_rimanente_s: 3000 }),
    "sensor.d_stato": st("Running"), "sensor.d_fase": st("Dry"), "sensor.d_resto": st("42", { unit_of_measurement: "min" }),
    "select.d_prog": st("Outd Proof Pr Outdoor"), "binary_sensor.d_porta": st("off"), "binary_sensor.d_conn": st("on"),
  };
  const t = tileModel(app({ maker: "electrolux", maker_device: "x", maker_entities: ents }), states, { lavatrice: DEF }, now);
  assert.equal(t.state, "in_funzione");
  assert.match(t.statusLine, /Asciugatura · Outdoor · da 30 min/);
  assert.match(t.remainingText, /fine fra 42 min/);
  assert.ok(t.progress !== null && Math.abs(t.progress - 30 / 72) < 0.01);
  assert.deepEqual(t.extras.map((x) => [x.label, x.value]), [["Stato", "In funzione"], ["Programma", "Outdoor"], ["Sportello", "chiuso"]]);
});

test("integrazione del costruttore: in pausa con la presa a riposo si vede in funzione; spenta = una riga sola", () => {
  const ents = { stato: "sensor.d_stato", connessione: "binary_sensor.d_conn" };
  const paused = { "sensor.p": st("1"), "sensor.d_stato": st("Paused"), "binary_sensor.d_conn": st("on") };
  const a = tileModel(app({ maker: "electrolux", maker_device: "x", maker_entities: ents }), paused, { lavatrice: DEF }, Date.now());
  assert.equal(a.state, "in_funzione");
  assert.match(a.statusLine, /In pausa/);
  const off = { "sensor.p": st("1"), "sensor.d_stato": st("unknown"), "binary_sensor.d_conn": st("off") };
  const b = tileModel(app({ maker: "electrolux", maker_device: "x", maker_entities: ents }), off, { lavatrice: DEF }, Date.now());
  assert.equal(b.state, "spento");
  assert.deepEqual(b.extras.map((x) => x.label), ["Electrolux"]);
  assert.equal(makerView({ maker: null, maker_entities: ents }, paused), null);
});
