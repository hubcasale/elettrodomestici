export type ApplianceType = "lavatrice" | "lavastoviglie" | "asciugatrice" | "forno" | "frigorifero" | "microonde";
export type MachineState = "spento" | "in_funzione" | "terminato" | "non_disponibile";

export interface HassState {
  entity_id?: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
}

export interface HomeAssistant {
  states: Record<string, HassState>;
  services?: Record<string, Record<string, unknown>>;
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
}

export interface Extra {
  entity: string;
  label: string;
}

/** Impostazioni di un elettrodomestico (quelle che si salvano). */
export interface ApplianceCfg {
  id: string;
  type: ApplianceType;
  name: string;
  entity: string;
  energy_entity: string | null;
  start_w: number;
  stop_w: number;
  start_delay: number;
  end_delay: number;
  min_cycle: number;
  heat_w: number;
  maint_cycles: number;
  alert_minutes: number;
  notify: boolean;
  extras: Extra[];
  /** integrazione del costruttore da cui prendere stato, fase, programma e tempo rimanente (per ora solo "electrolux") */
  maker: string | null;
  maker_device: string | null;
}

export interface MakerDevice {
  maker: string;
  label: string;
  device_id: string;
  name: string;
}

export interface CycleRec {
  s: string;
  e: string;
  kwh: number;
  eur: number;
  pk: number;
}

/** Quello che la scheda mostra di un elettrodomestico: arriva dagli attributi del sensore di stato. */
export interface Snapshot {
  tipo: ApplianceType;
  fase: string;
  fase_indice: number | null;
  fasi: string[];
  inizio: string | null;
  fine: string | null;
  trascorso_s: number | null;
  energia_ciclo: number | null;
  costo_ciclo: number | null;
  picco_ciclo: number | null;
  stima_rimanente_s: number | null;
  oggi_kwh: number;
  oggi_eur: number;
  oggi_cicli: number;
  oggi_secondi: number;
  manutenzione_cicli: number;
  manutenzione_soglia: number;
  manutenzione_pct: number | null;
  ultimo_ciclo: CycleRec | null;
}

export interface ApplianceInfo extends ApplianceCfg, Snapshot {
  key: string;
  state: MachineState;
  entities: Record<string, string>;
  /** entità del dispositivo del costruttore per ruolo (stato, fase, rimanente, programma, porta, connessione) */
  maker_entities?: Record<string, string>;
}

export interface TypeDefaults {
  label: string;
  icon: string;
  off_label: string;
  done_label: string;
  has_finished: boolean;
  notify: boolean;
  maint_label: string;
  phases: string[];
  start_w: number;
  stop_w: number;
  start_delay: number;
  end_delay: number;
  min_cycle: number;
  heat_w: number;
  maint_cycles: number;
  alert_minutes: number;
}

export interface ElettroInfo {
  entry_id: string;
  title: string;
  price_kwh: number;
  price_entity: string;
  notify_services: string[];
  types: Record<ApplianceType, TypeDefaults>;
  appliances: ApplianceInfo[];
  makers?: MakerDevice[];
}

export interface Totals {
  kwh: number;
  eur: number;
  cycles: number;
  sec: number;
}
export type PeriodKey = "oggi" | "ieri" | "settimana" | "mese" | "anno" | "ultimi30" | "totale";

export interface DayRec extends Totals {
  date: string;
}

export interface Stats {
  periods: Record<PeriodKey, Totals>;
  series: DayRec[];
  summary: {
    count: number;
    avg_kwh: number;
    avg_eur: number;
    avg_seconds: number;
    median_seconds: number;
    min_seconds: number;
    max_seconds: number;
    max_kwh: number;
  } | null;
  cycles: CycleRec[];
  maintenance: { count: number; threshold: number; pct: number | null; due: boolean };
  price_kwh: number;
}

export interface RawState {
  s?: string;
  state?: string;
  lu?: number | string;
  lc?: number | string;
  last_updated?: string;
  last_changed?: string;
}
