// Logica pura della scheda: etichette, tessere, frasi, statistiche, assi e campionamento dei grafici.
// Nessuna dipendenza da Lit o da Home Assistant: si prova con node:test.
import type {
  ApplianceCfg, ApplianceInfo, ApplianceType, DayRec, HassState, MachineState, RawState, Snapshot, TypeDefaults,
} from "./types";

export const TYPES: ApplianceType[] = ["lavatrice", "lavastoviglie", "asciugatrice", "forno", "frigorifero", "microonde"];

export const TYPE_ICON: Record<ApplianceType, string> = {
  lavatrice: "mdi:washing-machine",
  lavastoviglie: "mdi:dishwasher",
  asciugatrice: "mdi:tumble-dryer",
  forno: "mdi:stove",
  frigorifero: "mdi:fridge",
  microonde: "mdi:microwave",
};
export const TYPE_LABEL: Record<ApplianceType, string> = {
  lavatrice: "Lavatrice",
  lavastoviglie: "Lavastoviglie",
  asciugatrice: "Asciugatrice",
  forno: "Forno",
  frigorifero: "Frigorifero",
  microonde: "Microonde",
};

export const STATES: MachineState[] = ["spento", "in_funzione", "terminato", "non_disponibile"];
export const STATE_LABEL: Record<MachineState, string> = {
  spento: "Spento",
  in_funzione: "In funzione",
  terminato: "Terminato",
  non_disponibile: "Non disponibile",
};
export const STATE_COLOR: Record<MachineState, string> = {
  spento: "#6b7280",
  in_funzione: "#f59e0b",
  terminato: "#16a34a",
  non_disponibile: "transparent",
};
export type Tone = "off" | "run" | "done" | "bad";
export const STATE_TONE: Record<MachineState, Tone> = { spento: "off", in_funzione: "run", terminato: "done", non_disponibile: "bad" };

export function asState(v: unknown): MachineState {
  return (STATES as string[]).includes(String(v)) ? (v as MachineState) : "non_disponibile";
}

export function toNumber(v: unknown): number | null {
  if (v === null || v === undefined || v === "" || v === "unknown" || v === "unavailable") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function fmt(n: number | null | undefined, decimals = 0): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return "–";
  return n.toFixed(decimals).replace(".", ",");
}
export const fmtKwh = (n: number | null | undefined): string => (n === null || n === undefined ? "–" : `${fmt(n, n < 10 ? 2 : 1)} kWh`);
export const fmtEur = (n: number | null | undefined): string => (n === null || n === undefined ? "–" : `${fmt(n, 2)} €`);
export const fmtWatt = (n: number | null | undefined): string => (n === null || n === undefined ? "–" : `${fmt(n, n % 1 && n < 100 ? 1 : 0)} W`);

export function formatDuration(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  if (total < 60) return `${total} s`;
  const minutes = Math.round(total / 60);
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, "0")} min`;
}
export function formatHours(seconds: number): string {
  return seconds < 3600 ? `${Math.round(seconds / 60)} min` : `${fmt(seconds / 3600, 1)} h`;
}

const DAYS = ["dom", "lun", "mar", "mer", "gio", "ven", "sab"];
const MONTHS = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
const hhmm = (d: Date) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

export function formatMoment(t: number): string {
  const d = new Date(t);
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}, ${hhmm(d)}`;
}
export function formatDay(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}
export function formatClock(iso: string | null): string {
  const t = iso ? Date.parse(iso) : NaN;
  return Number.isNaN(t) ? "–" : hhmm(new Date(t));
}

// ---- snapshot e tessere
/** Gli attributi del sensore di stato si aggiornano di continuo: sono più freschi dei dati letti all'apertura. */
export function liveSnapshot(app: ApplianceInfo, states: Record<string, HassState>): { snap: Snapshot; state: MachineState } {
  const st = states[app.entities.stato ?? ""];
  if (!st) return { snap: app, state: app.state };
  const a = st.attributes as unknown as Partial<Snapshot>;
  const merged = { ...app } as Snapshot;
  for (const k of Object.keys(a) as (keyof Snapshot)[]) if (k in app && a[k] !== undefined) (merged as unknown as Record<string, unknown>)[k] = a[k];
  const state = st.state === "unavailable" || st.state === "unknown" ? "non_disponibile" : asState(st.state);
  return { snap: merged, state };
}

export function readPower(st: HassState | undefined): number | null {
  if (!st) return null;
  const v = toNumber(st.state);
  if (v === null) return null;
  return String(st.attributes.unit_of_measurement ?? "W").toLowerCase() === "kw" ? v * 1000 : v;
}

export interface ExtraRow {
  label: string;
  value: string;
  entity: string;
}

/** Valore leggibile di un'entità collegata (programma, tempo rimanente, stato del costruttore...). */
export function extraValue(st: HassState | undefined, nowMs: number): string {
  if (!st || st.state === "unavailable" || st.state === "unknown" || st.state === "") return "non disponibile";
  if (st.attributes.device_class === "timestamp") {
    const t = Date.parse(st.state);
    if (!Number.isNaN(t)) {
      const left = (t - nowMs) / 1000;
      return left > 0 ? `alle ${hhmm(new Date(t))} (tra ${formatDuration(left)})` : `alle ${hhmm(new Date(t))}`;
    }
  }
  if (st.state === "on") return "sì";
  if (st.state === "off") return "no";
  const unit = st.attributes.unit_of_measurement;
  const n = toNumber(st.state);
  if (n !== null && typeof unit === "string" && unit) {
    if (unit === "min" || unit === "s" || unit === "h") return `${fmt(n, n % 1 ? 1 : 0)} ${unit}`;
    return `${fmt(n, n % 1 ? 2 : 0)} ${unit}`;
  }
  return st.state.replace(/_/g, " ");
}

export function extraRows(app: ApplianceCfg, states: Record<string, HassState>, nowMs: number): ExtraRow[] {
  return app.extras.map((x) => {
    const st = states[x.entity];
    const friendly = typeof st?.attributes.friendly_name === "string" ? (st.attributes.friendly_name as string) : x.entity;
    return { label: x.label || friendly, value: extraValue(st, nowMs), entity: x.entity };
  });
}

export interface TileModel {
  key: string;
  name: string;
  type: ApplianceType;
  state: MachineState;
  tone: Tone;
  statusLine: string;
  phase: string;
  power: number | null;
  /** barra di avanzamento 0..1 (fase del ciclo o tempo stimato); null = nessuna */
  progress: number | null;
  progressLabel: string;
  todayKwh: number;
  todayEur: number;
  todayCycles: number;
  cycleKwh: number | null;
  cycleEur: number | null;
  maintPct: number | null;
  maintDue: boolean;
  extras: ExtraRow[];
  canAck: boolean;
  remainingText: string;
}

export function tileModel(app: ApplianceInfo, states: Record<string, HassState>, defaults: Partial<Record<ApplianceType, TypeDefaults>> | undefined, nowMs: number): TileModel {
  const { snap, state } = liveSnapshot(app, states);
  const power = readPower(states[app.entity]);
  const def = defaults?.[app.type];
  const hasFinished = def?.has_finished ?? ["lavatrice", "lavastoviglie", "asciugatrice"].includes(app.type);
  const started = snap.inizio ? Date.parse(snap.inizio) : NaN;
  const elapsed = state === "in_funzione" && !Number.isNaN(started) ? Math.max(0, (nowMs - started) / 1000) : null;
  let statusLine = STATE_LABEL[state];
  let phase = snap.fase;
  if (state === "spento") {
    phase = def?.off_label ?? "Spento";
    statusLine = phase;
  } else if (state === "in_funzione") {
    statusLine = elapsed !== null ? `${snap.fase} · da ${formatDuration(elapsed)}` : snap.fase;
  } else if (state === "terminato") {
    const since = snap.fine ? Date.parse(snap.fine) : NaN;
    statusLine = `${snap.fase}${Number.isNaN(since) ? "" : ` · finito alle ${hhmm(new Date(since))}`}`;
  }
  let progress: number | null = null;
  let progressLabel = "";
  let remainingText = "";
  if (state === "in_funzione" && hasFinished && snap.fasi.length > 1 && snap.fase_indice !== null) {
    progress = Math.min(1, (snap.fase_indice + 0.5) / snap.fasi.length);
    progressLabel = `Fase ${snap.fase_indice + 1} di ${snap.fasi.length}`;
  }
  if (state === "in_funzione" && snap.stima_rimanente_s !== null) remainingText = `fine stimata fra circa ${formatDuration(snap.stima_rimanente_s)}`;
  return {
    key: app.key,
    name: app.name,
    type: app.type,
    state,
    tone: STATE_TONE[state],
    statusLine,
    phase,
    power,
    progress,
    progressLabel,
    todayKwh: snap.oggi_kwh,
    todayEur: snap.oggi_eur,
    todayCycles: snap.oggi_cicli,
    cycleKwh: snap.energia_ciclo,
    cycleEur: snap.costo_ciclo,
    maintPct: snap.manutenzione_pct,
    maintDue: snap.manutenzione_pct !== null && snap.manutenzione_pct >= 100,
    extras: extraRows(app, states, nowMs),
    canAck: state === "terminato",
    remainingText,
  };
}

export function summaryText(tiles: TileModel[]): string {
  if (tiles.length === 0) return "Nessun elettrodomestico: aggiungine uno dalle preferenze.";
  const running = tiles.filter((t) => t.state === "in_funzione");
  const done = tiles.filter((t) => t.state === "terminato");
  const watts = tiles.reduce((s, t) => s + (t.power ?? 0), 0);
  const parts: string[] = [];
  if (running.length) parts.push(`${running.length} in funzione (${running.map((t) => t.name).join(", ")})`);
  if (done.length) parts.push(`${done.map((t) => t.name).join(", ")} da svuotare`);
  if (!parts.length) parts.push("tutto fermo");
  return `${parts.join(" · ")} · ${fmtWatt(watts)} in totale`;
}

// ---- statistiche
export function sumSeries(series: DayRec[], n: number): { kwh: number; eur: number; cycles: number; sec: number } {
  const last = series.slice(-n);
  return last.reduce((a, d) => ({ kwh: a.kwh + d.kwh, eur: a.eur + d.eur, cycles: a.cycles + d.cycles, sec: a.sec + d.sec }), { kwh: 0, eur: 0, cycles: 0, sec: 0 });
}

export type Metric = "kwh" | "eur" | "cycles" | "sec";
export const METRIC_LABEL: Record<Metric, string> = { kwh: "Energia", eur: "Costo", cycles: "Cicli", sec: "Funzionamento" };
export function metricText(m: Metric, v: number): string {
  return m === "kwh" ? fmtKwh(v) : m === "eur" ? fmtEur(v) : m === "cycles" ? `${fmt(v, 0)} ${v === 1 ? "ciclo" : "cicli"}` : formatHours(v);
}

// ---- preferenze
export function newAppliance(type: ApplianceType, entity: string, name: string, def: TypeDefaults, taken: string[]): ApplianceCfg {
  const base = slug(name || def.label);
  let id = base;
  for (let n = 2; taken.includes(id); n++) id = `${base}_${n}`;
  return {
    id,
    type,
    name: name || def.label,
    entity,
    energy_entity: null,
    start_w: def.start_w,
    stop_w: def.stop_w,
    start_delay: def.start_delay,
    end_delay: def.end_delay,
    min_cycle: def.min_cycle,
    heat_w: def.heat_w,
    maint_cycles: def.maint_cycles,
    alert_minutes: def.alert_minutes,
    notify: def.notify,
    extras: [],
  };
}

export function slug(text: string): string {
  const s = text.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return s || "elettrodomestico";
}

const ENTITY_RE = /^[a-z_]+\.[a-z0-9_]+$/;
export function appliancesError(list: ApplianceCfg[]): string | null {
  const seen = new Set<string>();
  for (const a of list) {
    if (!ENTITY_RE.test(a.entity)) return `${a.name}: scegli il sensore di potenza della presa.`;
    if (seen.has(a.entity)) return `${a.name}: questo sensore è già usato da un altro elettrodomestico.`;
    seen.add(a.entity);
    if (a.stop_w > a.start_w) return `${a.name}: la soglia di spegnimento non può superare quella di avvio.`;
  }
  return null;
}

export interface Candidate {
  id: string;
  name: string;
}
function candidates(states: Record<string, HassState>, test: (id: string, st: HassState) => boolean, exclude: string[] = []): Candidate[] {
  const out: Candidate[] = [];
  for (const [id, st] of Object.entries(states)) {
    if (exclude.includes(id) || !test(id, st)) continue;
    const f = st.attributes.friendly_name;
    out.push({ id, name: typeof f === "string" ? f : id });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name, "it")).slice(0, 1500);
}
export const powerSensors = (states: Record<string, HassState>, exclude: string[] = []): Candidate[] =>
  candidates(states, (id, st) => id.startsWith("sensor.") && (st.attributes.device_class === "power" || ["W", "kW"].includes(String(st.attributes.unit_of_measurement))), exclude);
export const energySensors = (states: Record<string, HassState>): Candidate[] =>
  candidates(states, (id, st) => id.startsWith("sensor.") && (st.attributes.device_class === "energy" || ["Wh", "kWh", "MWh"].includes(String(st.attributes.unit_of_measurement))));
export const extraSensors = (states: Record<string, HassState>, exclude: string[] = []): Candidate[] =>
  candidates(states, (id) => /^(sensor|binary_sensor|select|input_select|input_text|number|text|climate)\./.test(id), exclude);
export const counters = (states: Record<string, HassState>): Candidate[] => candidates(states, (id) => id.startsWith("counter."));
export const statusSensors = (states: Record<string, HassState>): Candidate[] => candidates(states, (id) => id.startsWith("binary_sensor."));

const OLD_WORDS: Record<ApplianceType, RegExp> = {
  lavatrice: /lavatrice|lavaggio|washing/,
  lavastoviglie: /lavastov|dishwasher/,
  asciugatrice: /asciugatr|dryer/,
  forno: /forno|oven/,
  frigorifero: /frigo|fridge/,
  microonde: /micro/,
};
/** Il contatore dei cicli e il sensore di stato di un vecchio pacchetto basato su contatori e sensori di stato, se ci sono (id che parlano di quel tipo). */
export function guessOldPackage(states: Record<string, HassState>, type: ApplianceType): { counter: string; status: string } {
  const ids = Object.keys(states);
  const counter = ids.find((id) => id.startsWith("counter.") && OLD_WORDS[type].test(id) && /cicl/.test(id)) ?? ids.find((id) => id.startsWith("counter.") && OLD_WORDS[type].test(id)) ?? "";
  const status = ids.find((id) => id.startsWith("binary_sensor.") && /_status$/.test(id) && OLD_WORDS[type].test(id)) ?? "";
  return { counter, status };
}

export const priceSensors = (states: Record<string, HassState>): Candidate[] => candidates(states, (id) => id.startsWith("sensor."));

export function friendlyName(states: Record<string, HassState>, id: string): string {
  const f = states[id]?.attributes.friendly_name;
  return typeof f === "string" ? f : id;
}

export function notifyServices(services: Record<string, Record<string, unknown>> | undefined): string[] {
  return Object.keys(services?.notify ?? {}).filter((s) => s !== "send_message" && s !== "persistent_notification").sort().map((s) => `notify.${s}`);
}

// ---- storico: serie, tratti dello stato, campionamento
function toMs(v: number | string | undefined): number | null {
  if (v === undefined || v === null) return null;
  if (typeof v === "number") return v < 1e11 ? v * 1000 : v;
  const d = Date.parse(v);
  return Number.isNaN(d) ? null : d;
}
function rawTime(r: RawState): number | null {
  return toMs(r.lu ?? r.last_updated ?? r.lc ?? r.last_changed);
}

export interface Pt {
  t: number;
  v: number;
}
export interface Seg {
  from: number;
  to: number;
  state: MachineState;
}

export function parseNumeric(raw: RawState[] | undefined): Pt[] {
  const out: Pt[] = [];
  for (const r of raw ?? []) {
    const t = rawTime(r);
    const s = r.s ?? r.state;
    if (t === null || s === undefined || s === "" || s === "unavailable" || s === "unknown") continue;
    const v = Number(s);
    if (Number.isFinite(v)) out.push({ t, v });
  }
  return out.sort((a, b) => a.t - b.t);
}

/** Tratti dello stato nel periodo [t0, t1]: lo stato precedente al periodo si estende dall'inizio, i tratti uguali si uniscono. */
export function stateSegments(raw: RawState[] | undefined, t0: number, t1: number): Seg[] {
  const pts: { t: number; s: MachineState }[] = [];
  for (const r of raw ?? []) {
    const t = rawTime(r);
    const s = r.s ?? r.state;
    if (t !== null && s !== undefined) pts.push({ t, s: asState(s) });
  }
  pts.sort((a, b) => a.t - b.t);
  let cur: MachineState | null = null;
  for (const p of pts) {
    if (p.t <= t0) cur = p.s;
    else break;
  }
  const out: Seg[] = [];
  let from = t0;
  for (const p of pts) {
    if (p.t <= t0 || p.t >= t1) continue;
    if (cur !== null) out.push({ from, to: p.t, state: cur });
    from = p.t;
    cur = p.s;
  }
  if (cur !== null && from < t1) out.push({ from, to: t1, state: cur });
  const merged: Seg[] = [];
  for (const s of out) {
    const last = merged[merged.length - 1];
    if (last && last.state === s.state && last.to === s.from) last.to = s.to;
    else merged.push({ ...s });
  }
  return merged;
}

export function stateAt(segs: Seg[], t: number): MachineState | null {
  for (const s of segs) if (t >= s.from && t < s.to) return s.state;
  return null;
}

/** `n` valori fra t0 e t1: media pesata nel tempo del valore tenuto fino alla lettura successiva (null prima della prima lettura). */
export function resample(pts: Pt[], t0: number, t1: number, n: number, maxGap = 3 * 3600 * 1000): (number | null)[] {
  const out: (number | null)[] = new Array(n).fill(null);
  if (n <= 0 || t1 <= t0) return out;
  const dt = (t1 - t0) / n;
  let idx = 0;
  let curV: number | null = null;
  let curT = 0;
  for (let i = 0; i < n; i++) {
    const a = t0 + i * dt;
    const b = a + dt;
    while (idx < pts.length && pts[idx].t <= a) {
      curV = pts[idx].v;
      curT = pts[idx].t;
      idx++;
    }
    let sum = 0;
    let cov = 0;
    let segStart = a;
    let v = curV;
    let vT = curT;
    const add = (end: number) => {
      if (v === null) return;
      const len = Math.min(end, vT + maxGap) - segStart;
      if (len > 0) {
        sum += v * len;
        cov += len;
      }
    };
    let k = idx;
    while (k < pts.length && pts[k].t < b) {
      add(pts[k].t);
      segStart = pts[k].t;
      v = pts[k].v;
      vT = pts[k].t;
      k++;
    }
    add(b);
    out[i] = cov > 0 ? sum / cov : null;
  }
  return out;
}

export interface Axis {
  min: number;
  max: number;
  ticks: number[];
}

function niceStep(raw: number): number {
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
}

export function niceAxis(min: number, max: number, count = 5): Axis {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return { min: 0, max: 1, ticks: [0, 1] };
  if (max - min < 1e-9) {
    min -= 1;
    max += 1;
  }
  const step = niceStep((max - min) / Math.max(1, count - 1));
  const lo = Math.floor(min / step + 1e-9) * step;
  const hi = Math.ceil(max / step - 1e-9) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi + step * 1e-6; v += step) ticks.push(Math.round(v / step) * step);
  return { min: lo, max: hi, ticks };
}

export function timeTicks(t0: number, t1: number, maxTicks = 6): { t: number; label: string; major: boolean }[] {
  const hours = (t1 - t0) / 3600000;
  const stepH = [1, 2, 3, 6, 12, 24, 48].find((s) => hours / s <= maxTicks) ?? 48;
  const first = new Date(t0);
  first.setMinutes(0, 0, 0);
  if (stepH >= 24) first.setHours(0);
  else first.setHours(Math.ceil(first.getHours() / stepH) * stepH);
  const out: { t: number; label: string; major: boolean }[] = [];
  for (let t = first.getTime(); t <= t1; t += stepH * 3600000) {
    if (t < t0) continue;
    const d = new Date(t);
    const major = d.getHours() === 0;
    out.push({ t, major, label: hours > 30 ? (major ? `${DAYS[d.getDay()]} ${d.getDate()}` : hhmm(d)) : hhmm(d) });
  }
  return out;
}

export function linePath(values: (number | null)[], xOf: (i: number) => number, yOf: (v: number) => number): string {
  let d = "";
  let pen = false;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (v === null) {
      pen = false;
      continue;
    }
    d += `${pen ? "L" : "M"}${xOf(i).toFixed(1)} ${yOf(v).toFixed(1)}`;
    pen = true;
  }
  return d;
}
