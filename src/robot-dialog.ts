import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { applianceSvg } from "./appliance-svg";
import { dialogStyles } from "./dialog-style";
import {
  consumables, fmt, formatDuration, humanize, robotEnt, robotModel, robotNumber, robotRooms, robotShortcuts, robotText,
} from "./card-logic";
import type { ElettroInfo, HassState, HomeAssistant, RobotInfo } from "./types";

type Tab = "controllo" | "stanze" | "base" | "manutenzione" | "altro";
const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "controllo", label: "Controllo", icon: "mdi:robot-vacuum" },
  { key: "stanze", label: "Stanze", icon: "mdi:floor-plan" },
  { key: "base", label: "Base", icon: "mdi:home-lightning-bolt-outline" },
  { key: "manutenzione", label: "Manutenzione", icon: "mdi:wrench-clock" },
  { key: "altro", label: "Altro", icon: "mdi:dots-horizontal" },
];

/** Impostazioni di pulizia: select del robot (chiave) con la loro etichetta. */
const CLEAN_SELECTS: [string, string][] = [
  ["cleaning_mode", "Modalità"],
  ["suction_level", "Aspirazione"],
  ["mop_pad_humidity", "Umidità del panno"],
  ["cleaning_route", "Percorso"],
  ["water_temperature", "Temperatura dell'acqua"],
  ["carpet_cleaning", "Tappeti"],
];
const BASE_SELECTS: [string, string][] = [
  ["auto_empty_mode", "Svuotamento automatico"],
  ["mop_wash_level", "Lavaggio dei panni"],
  ["drying_time", "Durata dell'asciugatura"],
  ["self_clean_frequency", "Quando lavare i panni"],
];
const BASE_STATUS: [string, string, string[]][] = [
  ["clean_water_tank_status", "Serbatoio acqua pulita", ["low_water", "not_installed", "not_available"]],
  ["dirty_water_tank_status", "Serbatoio acqua sporca", ["not_installed_or_full"]],
  ["dust_bag_status", "Sacchetto della polvere", ["check", "not_installed"]],
  ["mop_pad", "Panno", ["not_installed"]],
  ["self_wash_base_status", "Lavaggio della base", []],
  ["auto_empty_status", "Svuotamento", []],
];
const BASE_BUTTONS: [string, string, string][] = [
  ["start_auto_empty", "Svuota la polvere", "mdi:delete-empty-outline"],
  ["self_clean", "Lava i panni", "mdi:washing-machine"],
  ["manual_drying", "Asciuga i panni", "mdi:hair-dryer-outline"],
  ["clear_warning", "Cancella avviso", "mdi:alert-remove-outline"],
];
const SWITCHES: [string, string][] = [
  ["customized_cleaning", "Pulizia personalizzata per stanza"],
  ["resume_cleaning", "Riprendi dopo la ricarica"],
  ["carpet_boost", "Più aspirazione sui tappeti"],
  ["obstacle_avoidance", "Evita gli ostacoli"],
  ["auto_drying", "Asciuga i panni da solo"],
  ["self_clean", "Lava i panni da solo"],
  ["dnd", "Non disturbare"],
  ["child_lock", "Blocco bambini"],
];

/** Finestra di gestione del robot aspirapolvere: comandi, mappa, stanze, scorciatoie, impostazioni, base, consumabili, statistiche. */
export class ElettroRobotDialog extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) info!: ElettroInfo;
  @property() openKey = "";
  @state() private _tab: Tab = "controllo";
  @state() private _rooms: number[] = [];
  @state() private _repeats = 1;
  @state() private _confirm = "";
  @state() private _error = "";
  private _onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") this._close();
  };

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._onKey);
  }
  private _close(): void {
    this.dispatchEvent(new CustomEvent("closed"));
    this.remove();
  }

  private get _robot(): RobotInfo | undefined {
    return this.info.robots?.find((r) => r.key === this.openKey);
  }
  private _st(id: string): HassState | undefined {
    return id ? this.hass.states[id] : undefined;
  }
  private _has(domain: string, service: string): boolean {
    return !!this.hass.services?.[domain]?.[service];
  }

  private async _call(domain: string, service: string, data: Record<string, unknown>): Promise<void> {
    try {
      await this.hass.callService(domain, service, data);
      this._error = "";
    } catch (e) {
      this._error = `Comando non riuscito: ${e instanceof Error ? e.message : (e as { message?: string })?.message ?? String(e)}`;
    }
  }
  private _vacuum(service: string, extra: Record<string, unknown> = {}): void {
    const r = this._robot;
    if (r) void this._call("vacuum", service, { entity_id: r.entity, ...extra });
  }
  private _press(id: string): void {
    void this._call("button", "press", { entity_id: id });
  }
  private _selectOption(id: string, option: string): void {
    void this._call("select", "select_option", { entity_id: id, option });
  }
  private _toggle(id: string, on: boolean): void {
    void this._call("switch", on ? "turn_on" : "turn_off", { entity_id: id });
  }

  // ---------------------------------------------------------------- pezzi
  private _chips(id: string, label: string): TemplateResult | typeof nothing {
    const st = this._st(id);
    const options = st?.attributes.options;
    if (!st || !Array.isArray(options) || ["unavailable", "unknown"].includes(st.state)) return nothing;
    return html`<div class="group"><div class="glab">${label}</div>
      <div class="chips">${options.map((o) => html`<button class=${st.state === o ? "chip on" : "chip"} aria-pressed=${st.state === o ? "true" : "false"} @click=${() => this._selectOption(id, String(o))}>${robotText(this.hass, id, String(o)) || humanize(String(o))}</button>`)}</div></div>`;
  }

  private _selects(r: RobotInfo, list: [string, string][]) {
    const rows = list.map(([key, label]) => this._chips(robotEnt(r, `select.${key}`), label)).filter((x) => x !== nothing);
    return rows.length ? html`${rows}` : nothing;
  }

  private _hero(r: RobotInfo) {
    const m = robotModel(r, this.hass);
    const detail = robotText(this.hass, robotEnt(r, "sensor.state"));
    const bat = m.battery;
    return html`<div class="hero ${m.tone}">
      <span class="himg">${unsafeSVG(applianceSvg("aspirapolvere", m.state))}</span>
      <div class="htxt">
        <div class="hst">${m.statusLine}</div>
        ${detail && detail !== m.statusLine ? html`<div class="hline">${detail}</div>` : nothing}
        <div class="hbat">${m.charging ? html`<ha-icon icon="mdi:lightning-bolt"></ha-icon>` : nothing}<b>${bat === null ? "–" : `${fmt(bat, 0)} %`}</b>
          ${bat !== null ? html`<span class="bbar"><i class=${bat <= 20 ? "low" : ""} style=${`width:${Math.min(100, Math.max(0, bat))}%`}></i></span>` : nothing}</div>
        ${m.room || m.area !== null || m.minutes !== null
          ? html`<div class="hline">${[m.room, m.area !== null ? `${fmt(m.area, 0)} m²` : "", m.minutes !== null ? formatDuration(m.minutes * 60) : ""].filter(Boolean).join(" · ")}</div>`
          : nothing}
      </div></div>
      ${m.error ? html`<div class="err"><ha-icon icon="mdi:alert-circle-outline"></ha-icon> ${m.error}${this._has("button", "press") && robotEnt(r, "button.clear_warning") ? html` <button class="btn s" @click=${() => this._press(robotEnt(r, "button.clear_warning"))}>Cancella</button>` : nothing}</div>` : nothing}
      <div class="cmds">
        ${m.canStart ? html`<button class="cmd go" @click=${() => this._vacuum("start")}><ha-icon icon="mdi:play"></ha-icon>${m.activity === "paused" ? "Riprendi" : "Avvia"}</button>` : nothing}
        ${m.canPause ? html`<button class="cmd" @click=${() => this._vacuum("pause")}><ha-icon icon="mdi:pause"></ha-icon>Pausa</button>` : nothing}
        ${m.canStop ? html`<button class="cmd" @click=${() => this._vacuum("stop")}><ha-icon icon="mdi:stop"></ha-icon>Stop</button>` : nothing}
        ${m.canHome ? html`<button class="cmd" @click=${() => this._vacuum("return_to_base")}><ha-icon icon="mdi:home-import-outline"></ha-icon>Alla base</button>` : nothing}
        <button class="cmd" @click=${() => this._vacuum("locate")}><ha-icon icon="mdi:map-marker-radius-outline"></ha-icon>Trovalo</button>
      </div>`;
  }

  private _map(r: RobotInfo) {
    const id = robotEnt(r, "camera.map");
    const st = this._st(id);
    const pic = st && typeof st.attributes.entity_picture === "string" ? st.attributes.entity_picture : "";
    if (!pic) return nothing;
    const src = `${pic}${pic.includes("?") ? "&" : "?"}t=${encodeURIComponent(st?.state ?? "")}`;
    return html`<div class="sec">Mappa</div><div class="map"><img src=${src} alt="Mappa della casa" loading="lazy" /></div>`;
  }

  private _shortcuts(r: RobotInfo) {
    const list = robotShortcuts(this._st(r.entity));
    if (!list.length || !this._has("dreame_vacuum", "vacuum_start_shortcut")) return nothing;
    return html`<div class="sec">Scorciatoie</div><div class="chips">${list.map((s) => html`<button class=${s.running ? "chip on" : "chip"} @click=${() => void this._call("dreame_vacuum", "vacuum_start_shortcut", { entity_id: r.entity, shortcut_id: s.id })}><ha-icon icon="mdi:lightning-bolt-outline"></ha-icon>${s.name}</button>`)}</div>`;
  }

  private _tabControl(r: RobotInfo) {
    return html`${this._hero(r)}${this._shortcuts(r)}
      ${(() => {
        const sel = this._selects(r, CLEAN_SELECTS);
        return sel === nothing ? nothing : html`<div class="sec">Come pulisce</div>${sel}`;
      })()}
      ${this._map(r)}`;
  }

  private _tabRooms(r: RobotInfo) {
    const mapSel = this._st(robotEnt(r, "select.selected_map"))?.state ?? "";
    const rooms = robotRooms(this._st(r.entity), mapSel);
    const canRooms = this._has("dreame_vacuum", "vacuum_clean_segment");
    if (!rooms.length || !canRooms) {
      return html`<div class="empty">${canRooms ? "Il robot non ha ancora stanze: creale dall'app del costruttore." : "Questo robot non permette di scegliere le stanze da qui."}</div>`;
    }
    const picked = this._rooms.filter((id) => rooms.some((x) => x.id === id));
    return html`<div class="sec">Scegli le stanze da pulire</div>
      <div class="chips">${rooms.map((x) => html`<button class=${picked.includes(x.id) ? "chip on" : "chip"} aria-pressed=${picked.includes(x.id) ? "true" : "false"} @click=${() => (this._rooms = picked.includes(x.id) ? picked.filter((i) => i !== x.id) : [...picked, x.id])}><ha-icon icon=${x.icon}></ha-icon>${x.name}</button>`)}</div>
      <div class="group"><div class="glab">Quante passate</div>
        <div class="chips">${[1, 2, 3].map((n) => html`<button class=${this._repeats === n ? "chip on" : "chip"} @click=${() => (this._repeats = n)}>${n}</button>`)}</div></div>
      <div class="cmds"><button class="cmd go" ?disabled=${picked.length === 0} @click=${() => void this._call("dreame_vacuum", "vacuum_clean_segment", { entity_id: r.entity, segments: picked, repeats: this._repeats })}><ha-icon icon="mdi:play"></ha-icon>${picked.length === 0 ? "Scegli almeno una stanza" : picked.length === 1 ? "Pulisci la stanza" : `Pulisci ${picked.length} stanze`}</button></div>
      ${(() => {
        const sel = this._selects(r, CLEAN_SELECTS.slice(0, 3));
        return sel === nothing ? nothing : html`<div class="sec">Impostazioni valide per questa pulizia</div>${sel}`;
      })()}`;
  }

  private _tabBase(r: RobotInfo) {
    const status = BASE_STATUS.map(([key, label, bad]) => {
      const id = robotEnt(r, `sensor.${key}`);
      const st = this._st(id);
      if (!st || ["unavailable", "unknown", ""].includes(st.state)) return nothing;
      return html`<div class="kv"><span>${label}</span><b class=${bad.includes(st.state) ? "bad" : ""}>${robotText(this.hass, id)}</b></div>`;
    }).filter((x) => x !== nothing);
    const dry = robotNumber(this.hass.states, robotEnt(r, "sensor.drying_progress"));
    const buttons = BASE_BUTTONS.filter(([key]) => robotEnt(r, `button.${key}`) && this._st(robotEnt(r, `button.${key}`))?.state !== "unavailable");
    const sel = this._selects(r, BASE_SELECTS);
    if (!status.length && !buttons.length && sel === nothing) return html`<div class="empty">Questo robot non ha una base con funzioni da gestire.</div>`;
    return html`${status.length ? html`<div class="sec">Stato della base</div>${status}${dry !== null ? html`<div class="kv"><span>Asciugatura</span><b>${fmt(dry, 0)} %</b></div>` : nothing}` : nothing}
      ${buttons.length ? html`<div class="sec">Azioni</div><div class="cmds">${buttons.map(([key, label, icon]) => html`<button class="cmd" @click=${() => this._press(robotEnt(r, `button.${key}`))}><ha-icon icon=${icon}></ha-icon>${label}</button>`)}</div>` : nothing}
      ${sel === nothing ? nothing : html`<div class="sec">Impostazioni della base</div>${sel}`}`;
  }

  private _tabMaint(r: RobotInfo) {
    const rows = consumables(r, this.hass.states);
    if (!rows.length) return html`<div class="empty">Questo robot non comunica lo stato dei consumabili.</div>`;
    return html`<div class="sec">Consumabili</div>
      ${rows.map((c) => html`<div class="cons">
        <div class="ctop"><span>${c.label}</span><b class=${c.low ? "bad" : ""}>${c.pct === null ? "–" : `${fmt(c.pct, 0)} %`}${c.hoursLeft !== null ? html` <span class="mut">· ${fmt(c.hoursLeft, c.hoursLeft < 10 ? 1 : 0)} h</span>` : nothing}</b></div>
        <div class="bbar wide"><i class=${c.low ? "low" : ""} style=${`width:${Math.min(100, Math.max(0, c.pct ?? 0))}%`}></i></div>
        ${c.reset ? html`<button class=${this._confirm === c.key ? "btn s warn" : "btn s"} @click=${() => {
          if (this._confirm === c.key) {
            this._press(c.reset);
            this._confirm = "";
          } else this._confirm = c.key;
        }}>${this._confirm === c.key ? "Tocca ancora per confermare" : "Segna come sostituito"}</button>` : nothing}
      </div>`)}
      <div class="hint">Segna come sostituito solo dopo aver cambiato o pulito il pezzo: il contatore riparte da 100 %.</div>`;
  }

  private _tabOther(r: RobotInfo) {
    const sw = SWITCHES.map(([key, label]) => {
      const id = robotEnt(r, `switch.${key}`);
      const st = this._st(id);
      if (!st || st.state === "unavailable") return nothing;
      const on = st.state === "on";
      return html`<div class="row"><span class="rl">${label}</span>
        <button class=${on ? "sw on" : "sw"} role="switch" aria-checked=${on ? "true" : "false"} aria-label=${label} @click=${() => this._toggle(id, !on)}><span class="knob"></span></button></div>`;
    }).filter((x) => x !== nothing);
    const volId = robotEnt(r, "number.volume");
    const vol = robotNumber(this.hass.states, volId);
    const dnd = [robotText(this.hass, robotEnt(r, "time.dnd_start")), robotText(this.hass, robotEnt(r, "time.dnd_end"))].filter(Boolean);
    const s = (key: string) => robotNumber(this.hass.states, robotEnt(r, `sensor.${key}`));
    const count = s("cleaning_count");
    const area = s("total_cleaned_area");
    const time = s("total_cleaning_time");
    const lastId = robotEnt(r, "sensor.cleaning_history");
    const lastSt = this._st(lastId);
    const last = lastSt && lastSt.state && !["unknown", "unavailable"].includes(lastSt.state) ? Date.parse(lastSt.state) : NaN;
    const first = Date.parse(this._st(robotEnt(r, "sensor.first_cleaning_date"))?.state ?? "");
    const dt = (t: number) => new Date(t).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
    return html`${sw.length ? html`<div class="sec">Opzioni</div>${sw}` : nothing}
      ${dnd.length === 2 ? html`<div class="hint">Non disturbare: dalle ${dnd[0]?.slice(0, 5)} alle ${dnd[1]?.slice(0, 5)}.</div>` : nothing}
      ${vol !== null && volId ? html`<div class="sec">Volume della voce</div>
        <div class="vol"><ha-icon icon="mdi:volume-low"></ha-icon><input type="range" min="0" max="100" step="5" .value=${String(vol)} aria-label="Volume" @change=${(e: Event) => void this._call("number", "set_value", { entity_id: volId, value: Number((e.target as HTMLInputElement).value) })} /><ha-icon icon="mdi:volume-high"></ha-icon><b>${fmt(vol, 0)}</b></div>` : nothing}
      ${count !== null || area !== null || time !== null
        ? html`<div class="sec">Statistiche</div>
          ${count !== null ? html`<div class="kv"><span>Pulizie fatte</span><b>${fmt(count, 0)}</b></div>` : nothing}
          ${area !== null ? html`<div class="kv"><span>Superficie pulita</span><b>${fmt(area, 0)} m²</b></div>` : nothing}
          ${time !== null ? html`<div class="kv"><span>Tempo di pulizia</span><b>${fmt(time / 60, 1)} h</b></div>` : nothing}
          ${!Number.isNaN(last) ? html`<div class="kv"><span>Ultima pulizia</span><b>${dt(last)}</b></div>` : nothing}
          ${!Number.isNaN(first) ? html`<div class="kv"><span>Prima pulizia</span><b>${dt(first)}</b></div>` : nothing}` : nothing}
      ${sw.length === 0 && count === null && vol === null ? html`<div class="empty">Nessuna opzione disponibile per questo robot.</div>` : nothing}`;
  }

  render() {
    const r = this._robot;
    if (!r) return nothing;
    const body =
      this._tab === "stanze" ? this._tabRooms(r)
      : this._tab === "base" ? this._tabBase(r)
      : this._tab === "manutenzione" ? this._tabMaint(r)
      : this._tab === "altro" ? this._tabOther(r)
      : this._tabControl(r);
    return html`
      <div class="backdrop" @click=${(e: Event) => e.target === e.currentTarget && this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Gestisci ${r.name}`}>
          <div class="head"><div class="title">${r.name}</div><button class="x" aria-label="Chiudi" @click=${() => this._close()}>✕</button></div>
          <div class="tabs" role="tablist">${TABS.map((t) => html`<button role="tab" aria-selected=${this._tab === t.key ? "true" : "false"} class=${this._tab === t.key ? "tab on" : "tab"} @click=${() => (this._tab = t.key)}><ha-icon icon=${t.icon}></ha-icon>${t.label}</button>`)}</div>
          <div class="body">${this._error ? html`<div class="err">${this._error}</div>` : nothing}${body}</div>
        </div>
      </div>`;
  }

  static styles = [
    dialogStyles,
    css`
      ha-icon { --mdc-icon-size: 20px; }
      .tabs { display: flex; gap: 4px; padding: 8px 12px 0; overflow-x: auto; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
      .tab { flex: none; min-height: 44px; display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; border: 0; border-bottom: 3px solid transparent; background: transparent; color: var(--secondary-text-color, #727272); font-size: 0.9rem; cursor: pointer; }
      .tab.on { color: var(--primary-color, #03a9f4); border-bottom-color: var(--primary-color, #03a9f4); font-weight: 600; }
      .sec { margin: 16px 0 6px; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--secondary-text-color, #727272); }
      .hero { display: flex; gap: 14px; align-items: center; padding: 12px; border-radius: 16px; background: var(--secondary-background-color, #f2f2f2); border: 1px solid transparent; }
      .hero.run { border-color: rgba(245, 158, 11, 0.7); background: rgba(245, 158, 11, 0.1); }
      .hero.bad { border-color: rgba(220, 38, 38, 0.6); }
      .himg { flex: none; width: 96px; height: 112px; }
      .himg svg { width: 100%; height: 100%; display: block; }
      .htxt { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
      .hst { font-size: 1.2rem; font-weight: 600; }
      .hline { font-size: 0.88rem; color: var(--secondary-text-color, #727272); }
      .hbat { display: flex; align-items: center; gap: 8px; font-size: 1.3rem; }
      .bbar { flex: 1; max-width: 160px; height: 8px; border-radius: 4px; background: rgba(127, 127, 127, 0.25); overflow: hidden; }
      .bbar.wide { max-width: none; margin: 6px 0; }
      .bbar i { display: block; height: 100%; background: #16a34a; }
      .bbar i.low { background: #dc2626; }
      .cmds { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 4px; }
      .cmd { flex: 1; min-width: 110px; min-height: 52px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 14px; border: 1px solid var(--divider-color, #ccc); background: var(--secondary-background-color, #f4f4f4); color: inherit; font-size: 0.95rem; cursor: pointer; }
      .cmd.go { background: #16a34a; border-color: transparent; color: #fff; font-weight: 600; }
      .cmd:disabled { opacity: 0.5; cursor: default; }
      .group { margin: 8px 0 12px; }
      .glab { font-size: 0.85rem; margin-bottom: 4px; color: var(--secondary-text-color, #727272); }
      .chips { display: flex; flex-wrap: wrap; gap: 8px; }
      .chip { min-height: 44px; display: inline-flex; align-items: center; gap: 6px; padding: 0 14px; border-radius: 22px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: inherit; font-size: 0.9rem; cursor: pointer; }
      .chip.on { background: var(--primary-color, #03a9f4); border-color: transparent; color: #fff; font-weight: 600; }
      .map { border-radius: 14px; overflow: hidden; background: var(--secondary-background-color, #f2f2f2); }
      .map img { width: 100%; max-height: 420px; object-fit: contain; display: block; }
      .kv { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--divider-color, #e0e0e0); font-size: 0.92rem; }
      .kv span { color: var(--secondary-text-color, #727272); }
      b.bad, .kv b.bad { color: #dc2626; }
      .cons { padding: 8px 0 12px; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
      .ctop { display: flex; justify-content: space-between; font-size: 0.95rem; }
      .mut { color: var(--secondary-text-color, #727272); font-weight: 400; }
      .btn.s { min-height: 40px; padding: 4px 12px; font-size: 0.82rem; }
      .btn.warn { background: #f59e0b; border-color: transparent; color: #1f1300; }
      .hint { margin-top: 10px; font-size: 0.82rem; color: var(--secondary-text-color, #727272); }
      .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 48px; padding: 4px 0; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
      .rl { font-size: 0.92rem; }
      .sw { flex: none; width: 52px; height: 30px; border-radius: 15px; border: 0; background: rgba(127, 127, 127, 0.4); position: relative; cursor: pointer; }
      .sw .knob { position: absolute; top: 3px; left: 3px; width: 24px; height: 24px; border-radius: 12px; background: #fff; transition: left 0.15s; }
      .sw.on { background: var(--primary-color, #03a9f4); }
      .sw.on .knob { left: 25px; }
      .vol { display: flex; align-items: center; gap: 10px; }
      .vol input { flex: 1; min-height: 44px; }
      .err { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
    `,
  ];
}

if (!customElements.get("elettro-robot-dialog")) customElements.define("elettro-robot-dialog", ElettroRobotDialog);
