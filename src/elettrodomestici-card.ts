import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { applianceSvg } from "./appliance-svg";
import { cardSizeFor, effectiveColumns, fmt, fmtEur, fmtKwh, fmtWatt, gridTemplate, humModel, robotModel, summaryText, tileModel, type HumModel, type RobotModel, type TileModel } from "./card-logic";
import "./card-editor";
import "./stats-dialog";
import "./charts-dialog";
import "./robot-dialog";
import "./hum-charts-dialog";
import type { ElettroInfo, HomeAssistant, HumInfo, RobotInfo } from "./types";

interface CardConfig {
  type: string;
  title?: string;
  entry_id?: string;
  /** mostra solo questi elettrodomestici (id); senza l'elenco si vedono tutti */
  appliances?: string[];
  /** numero di colonne delle tessere (1-8); 0 o assente = automatico */
  columns?: number;
  /** false = senza titolo e pulsanti (per inserire un elettrodomestico dentro un'altra scheda) */
  header?: boolean;
}

type DialogTag = "elettro-stats-dialog" | "elettro-charts-dialog" | "elettro-robot-dialog" | "elettro-hum-charts-dialog";

/** Scheda degli elettrodomestici: una tessera per ognuno con immagine, stato, potenza e consumi; tocco = statistiche, pulsante = grafici. */
export class ElettrodomesticiCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: CardConfig = { type: "custom:elettrodomestici-card" };
  @state() private _info: ElettroInfo | null = null;
  @state() private _error = "";
  @state() private _now = Date.now();
  @state() private _width = 0;
  private _ro?: ResizeObserver;
  private _loadedAt = 0;
  private _loading = false;
  private _tick?: number;
  private _syncers = new Set<() => void>();

  setConfig(config: CardConfig): void {
    this._config = { ...config };
    this._info = null;
    this._loadedAt = 0;
  }
  /** Altezza per la vista masonry (unità di 50 px): dipende da quante tessere ci sono e da quante colonne ci stanno. */
  getCardSize(): number {
    const n = this._visibleCount();
    const cols = effectiveColumns(this._width, this._config.columns) ?? Math.max(1, Math.floor((this._width + 12) / 312));
    return cardSizeFor(n, cols, this._config.header !== false);
  }
  /** Dimensioni per la vista a sezioni (il pannello «Layout» di Home Assistant parte da queste): larga quanto la sezione, alta quanto serve. */
  getGridOptions(): Record<string, number | string> {
    return { columns: 12, rows: "auto", min_columns: 3, min_rows: 2 };
  }
  static getStubConfig(): CardConfig {
    return { type: "custom:elettrodomestici-card" };
  }
  /** Editor della scheda: opzioni di visualizzazione e preferenze degli elettrodomestici (vedi card-editor.ts). */
  static getConfigElement(): HTMLElement {
    return document.createElement("elettrodomestici-card-editor");
  }

  private _visibleCount(): number {
    const i = this._info;
    if (!i) return 1;
    const wanted = Array.isArray(this._config.appliances) ? this._config.appliances : null;
    const all = [...i.appliances, ...(i.robots ?? []), ...(i.humidistats ?? [])];
    return Math.max(1, wanted ? all.filter((a) => wanted.includes(a.key)).length : all.length);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._tick = window.setInterval(() => (this._now = Date.now()), 1000);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._tick) window.clearInterval(this._tick);
    this._ro?.disconnect();
    this._ro = undefined;
  }
  /** Misura la larghezza della scheda (non della finestra): in una sezione stretta le colonne scelte si riducono da sole. */
  protected firstUpdated(): void {
    this._ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0]?.contentRect.width ?? 0);
      if (w > 0 && Math.abs(w - this._width) > 1) this._width = w;
    });
    this._ro.observe(this);
  }

  protected willUpdate(): void {
    for (const s of this._syncers) s();
  }
  protected updated(): void {
    // con un umidostato le attese cambiano di continuo: si aggiornano più spesso (altrimenti ogni 5 minuti)
    const every = (this._info?.humidistats?.length ?? 0) > 0 ? 15000 : 5 * 60000;
    if (this.hass && !this._loading && (!this._info || Date.now() - this._loadedAt > every)) void this._loadInfo();
  }

  private async _loadInfo(): Promise<void> {
    this._loading = true;
    try {
      const msg: Record<string, unknown> = { type: "elettrodomestici/info" };
      if (this._config.entry_id) msg.entry_id = this._config.entry_id;
      this._info = await this.hass.callWS<ElettroInfo>(msg);
      this._error = "";
    } catch (err) {
      const m = err instanceof Error ? err.message : (err as { message?: string })?.message ?? String(err);
      this._error = `Elettrodomestici non configurato o integrazione non caricata (${m}).`;
    } finally {
      this._loadedAt = Date.now();
      this._loading = false;
    }
  }

  /** Apre una finestra attaccata al body; `key` = elettrodomestico da mostrare. */
  private async _open(tag: DialogTag, key = ""): Promise<void> {
    if (!this._info) return;
    while (this._loading) await new Promise((r) => setTimeout(r, 50));
    await this._loadInfo();
    if (!this._info) return;
    const el = document.createElement(tag) as HTMLElement & { hass: HomeAssistant; info: ElettroInfo; openKey?: string };
    el.hass = this.hass;
    el.info = this._info;
    el.openKey = key;
    el.addEventListener("open-dialog", (e) => {
      const d = (e as CustomEvent<{ tag: DialogTag; key: string }>).detail;
      void this._open(d.tag, d.key);
    });
    el.addEventListener("saved", () => {
      this._loadedAt = 0;
      void this._loadInfo();
    });
    document.body.appendChild(el);
    const sync = () => {
      if (el.isConnected) el.hass = this.hass;
    };
    this._syncers.add(sync);
    el.addEventListener("closed", () => this._syncers.delete(sync));
  }

  private _ack(key: string): void {
    void this.hass.callWS({ type: "elettrodomestici/action", entry_id: this._info?.entry_id, key, action: "acknowledge" });
  }

  private _robotCall(domain: string, service: string, entity: string): void {
    void this.hass.callService(domain, service, { entity_id: entity });
  }

  private _humCall(h: HumInfo, on: boolean): void {
    if (h.fan_entity) void this.hass.callService("homeassistant", on ? "turn_on" : "turn_off", { entity_id: h.fan_entity });
  }

  private _humAuto(h: HumInfo, on: boolean): void {
    void this.hass.callWS({ type: "elettrodomestici/action", entry_id: this._info?.entry_id, key: h.key, action: on ? "auto_on" : "auto_off" }).then(() => {
      this._loadedAt = 0;
      void this._loadInfo();
    });
  }

  private _humTile(h: HumInfo, m: HumModel) {
    return html`
      <div class="tile ${m.tone}">
        <button class="main" aria-label=${`Grafici di ${m.name}`} @click=${() => void this._open("elettro-hum-charts-dialog", h.key)}>
          <span class="img">${unsafeSVG(applianceSvg("umidostato", m.state))}</span>
          <span class="info">
            <span class="n">${m.name}</span>
            <span class="badge ${m.tone}">${m.statusLine}</span>
            <span class="pw ${m.fanOn ? "on" : ""}">${m.humidity === null ? "–" : `${fmt(m.humidity, 0)} %`}${m.temperature === null ? nothing : html`<span class="tmp">${fmt(m.temperature, 1)} ${m.tempUnit}</span>`}</span>
            <span class="row">${m.rule}</span>
            ${m.waitText ? html`<span class="row"><b>${m.waitText}</b></span>` : nothing}
          </span>
        </button>
        <div class="acts hum">
          ${m.fanOn === null ? nothing : html`<button class=${m.fanOn ? "a" : "a ok"} @click=${() => this._humCall(h, !m.fanOn)}><ha-icon icon=${m.fanOn ? "mdi:fan-off" : "mdi:fan"}></ha-icon>${m.fanOn ? "Spegni" : "Accendi"}</button>`}
          <button class=${m.auto ? "a ok" : "a"} role="switch" aria-checked=${m.auto ? "true" : "false"} @click=${() => this._humAuto(h, !m.auto)}><ha-icon icon="mdi:auto-fix"></ha-icon>Auto ${m.auto ? "sì" : "no"}</button>
          <button class="a" aria-label=${`Grafici di ${m.name}`} @click=${() => void this._open("elettro-hum-charts-dialog", h.key)}><ha-icon icon="mdi:chart-line"></ha-icon>Grafici</button>
        </div>
      </div>`;
  }

  private _robotTile(r: RobotInfo, m: RobotModel) {
    const detail = m.room || m.area !== null || m.minutes !== null
      ? [m.room, m.area !== null ? `${fmt(m.area, 0)} m²` : "", m.minutes !== null ? `${fmt(m.minutes, 0)} min` : ""].filter(Boolean).join(" · ")
      : m.charging ? "In carica" : "";
    return html`
      <div class="tile ${m.tone}">
        <button class="main" aria-label=${`Gestisci ${m.name}`} @click=${() => void this._open("elettro-robot-dialog", r.key)}>
          <span class="img">${unsafeSVG(applianceSvg("aspirapolvere", m.state))}</span>
          <span class="info">
            <span class="n">${m.name}</span>
            <span class="badge ${m.tone}">${m.statusLine}</span>
            <span class="pw ${m.activity === "cleaning" ? "on" : ""}">${m.battery === null ? "–" : html`${m.charging ? html`<ha-icon icon="mdi:lightning-bolt"></ha-icon>` : nothing}${fmt(m.battery, 0)} %`}</span>
            <span class="row">${detail || "Batteria"}</span>
          </span>
        </button>
        ${m.lowConsumables.length ? html`<div class="warn"><ha-icon icon="mdi:wrench-clock"></ha-icon>Da sostituire o pulire: ${m.lowConsumables.join(", ")}</div>` : nothing}
        <div class="acts">
          ${m.canPause ? html`<button class="a" @click=${() => this._robotCall("vacuum", "pause", r.entity)}><ha-icon icon="mdi:pause"></ha-icon>Pausa</button>` : nothing}
          ${m.canStart ? html`<button class="a ok" @click=${() => this._robotCall("vacuum", "start", r.entity)}><ha-icon icon="mdi:play"></ha-icon>${m.activity === "paused" ? "Riprendi" : "Avvia"}</button>` : nothing}
          ${m.canHome ? html`<button class="a" @click=${() => this._robotCall("vacuum", "return_to_base", r.entity)}><ha-icon icon="mdi:home-import-outline"></ha-icon>Base</button>` : nothing}
          <button class="a" aria-label=${`Gestisci ${m.name}`} @click=${() => void this._open("elettro-robot-dialog", r.key)}><ha-icon icon="mdi:tune-variant"></ha-icon>Gestisci</button>
        </div>
      </div>`;
  }

  private _tile(t: TileModel) {
    return html`
      <div class="tile ${t.tone}">
        <button class="main" aria-label=${`Statistiche di ${t.name}`} @click=${() => void this._open("elettro-stats-dialog", t.key)}>
          <span class="img">${unsafeSVG(applianceSvg(t.type, t.state))}</span>
          <span class="info">
            <span class="n">${t.name}</span>
            <span class="badge ${t.tone}">${t.statusLine}</span>
            <span class="pw ${t.state === "in_funzione" ? "on" : ""}">${fmtWatt(t.power)}</span>
            <span class="row">${t.state === "in_funzione" && t.cycleKwh !== null ? html`Questo ciclo <b>${fmtKwh(t.cycleKwh)}</b> · ${fmtEur(t.cycleEur)}` : html`Oggi <b>${fmtKwh(t.todayKwh)}</b> · ${fmtEur(t.todayEur)}`}</span>
            <span class="row">${t.todayCycles === 1 ? "1 ciclo oggi" : `${fmt(t.todayCycles)} cicli oggi`}${t.state === "in_funzione" && t.cycleKwh !== null ? html` · oggi ${fmtKwh(t.todayKwh)}` : nothing}</span>
          </span>
        </button>
        ${t.progress !== null ? html`<div class="bar" title=${t.progressLabel}><i style="width:${(t.progress * 100).toFixed(0)}%"></i></div><div class="barlab">${t.progressLabel}${t.remainingText ? ` · ${t.remainingText}` : ""}</div>` : t.remainingText ? html`<div class="barlab">${t.remainingText}</div>` : nothing}
        ${t.extras.length ? html`<div class="extras">${t.extras.slice(0, 3).map((x) => html`<span><i>${x.label}</i> ${x.value}</span>`)}</div>` : nothing}
        ${t.maintDue ? html`<div class="warn"><ha-icon icon="mdi:wrench-clock"></ha-icon>Manutenzione consigliata</div>` : nothing}
        <div class="acts">
          ${t.canAck ? html`<button class="a ok" @click=${() => this._ack(t.key)}><ha-icon icon="mdi:check"></ha-icon>Ho svuotato</button>` : nothing}
          <button class="a" aria-label=${`Grafici di ${t.name}`} @click=${() => void this._open("elettro-charts-dialog", t.key)}><ha-icon icon="mdi:chart-line"></ha-icon>Grafici</button>
          <button class="a" aria-label=${`Statistiche di ${t.name}`} @click=${() => void this._open("elettro-stats-dialog", t.key)}><ha-icon icon="mdi:information-outline"></ha-icon>Dettagli</button>
        </div>
      </div>`;
  }

  render() {
    if (!this.hass) return nothing;
    const title = this._config.title ?? this._info?.title ?? "Elettrodomestici";
    if (this._error && !this._info)
      return html`<ha-card><div class="pad"><div class="title">${title}</div><div class="errbox">${this._error}</div></div></ha-card>`;
    if (!this._info) return html`<ha-card><div class="pad"><div class="title">${title}</div><div class="muted">Carico…</div></div></ha-card>`;
    const wanted = Array.isArray(this._config.appliances) ? this._config.appliances : null;
    const shown = wanted ? this._info.appliances.filter((a) => wanted.includes(a.key)) : this._info.appliances;
    const tiles = shown.map((a) => tileModel(a, this.hass.states, this._info?.types, this._now));
    const robots = (this._info.robots ?? []).filter((r) => !wanted || wanted.includes(r.key));
    const hums = (this._info.humidistats ?? []).filter((r) => !wanted || wanted.includes(r.key));
    const elapsed = (this._now - this._loadedAt) / 1000;
    const grid = html`<div class="grid" style=${`grid-template-columns:${gridTemplate(this._config.columns, this._width)}`}>${tiles.map((t) => this._tile(t))}${robots.map((r) => this._robotTile(r, robotModel(r, this.hass)))}${hums.map((h) => this._humTile(h, humModel(h, this.hass, elapsed)))}</div>`;
    if (this._config.header === false) return html`<ha-card><div class="pad compact">${grid}</div></ha-card>`;
    return html`
      <ha-card>
        <div class="pad">
          <div class="head">
            <div>
              <div class="title">${title}</div>
              <div class="sum">${summaryText(tiles)}</div>
            </div>
          </div>
          ${tiles.length + robots.length + hums.length === 0
            ? html`<div class="empty"><ha-icon icon="mdi:cog-outline"></ha-icon>Nessun elettrodomestico: apri «Modifica scheda» e aggiungi il primo.</div>`
            : grid}
        </div>
      </ha-card>`;
  }

  static styles = css`
    :host { display: block; height: 100%; color: var(--primary-text-color, #212121); }
    ha-card { overflow: hidden; height: 100%; box-sizing: border-box; }
    .pad { height: 100%; box-sizing: border-box; overflow: auto; }
    .pad { padding: 14px 16px 16px; }
    .pad.compact { padding: 8px; }
    .head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
    .title { font-size: 1.15rem; font-weight: 600; }
    .sum { font-size: 0.85rem; color: var(--secondary-text-color, #727272); margin-top: 2px; }
    .muted { color: var(--secondary-text-color, #727272); font-size: 0.85rem; }
    .errbox { margin-top: 8px; padding: 10px; border-radius: 10px; background: rgba(220, 38, 38, 0.1); color: #b91c1c; font-size: 0.9rem; }
    .ib { flex: none; width: 44px; height: 44px; border-radius: 22px; border: 1px solid var(--divider-color, #ccc); background: var(--secondary-background-color, #f4f4f4); color: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
    ha-icon { --mdc-icon-size: 20px; }
    .empty { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 64px; justify-content: center; text-align: center; border: 2px dashed var(--divider-color, #ccc); border-radius: 14px; color: var(--secondary-text-color, #727272); font-size: 0.95rem; padding: 8px; box-sizing: border-box; }
    .grid { display: grid; gap: 12px; align-items: start; }
    .tile { padding: 10px 12px 12px; border-radius: 16px; background: var(--secondary-background-color, #f2f2f2); border: 1px solid transparent; }
    .tile.run { border-color: rgba(245, 158, 11, 0.7); background: rgba(245, 158, 11, 0.1); }
    .tile.done { border-color: rgba(22, 163, 74, 0.7); background: rgba(22, 163, 74, 0.1); }
    .tile.bad { opacity: 0.65; }
    .main { display: flex; gap: 12px; width: 100%; padding: 0; border: 0; background: transparent; color: inherit; text-align: left; cursor: pointer; align-items: center; }
    .img { flex: none; width: 96px; height: 112px; display: block; }
    .img svg { width: 100%; height: 100%; display: block; }
    .info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
    .n { font-size: 1.02rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .badge { align-self: flex-start; max-width: 100%; padding: 2px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; background: rgba(127, 127, 127, 0.2); color: var(--primary-text-color, #212121); }
    .badge.run { background: #f59e0b; color: #1f1300; }
    .badge.done { background: #16a34a; color: #fff; }
    .badge.bad { background: #dc2626; color: #fff; }
    .pw { font-size: 1.5rem; font-weight: 600; font-variant-numeric: tabular-nums; color: var(--secondary-text-color, #727272); line-height: 1.15; }
    .pw.on { color: var(--primary-text-color, #212121); }
    .tmp { margin-left: 10px; font-size: 1rem; font-weight: 500; color: var(--secondary-text-color, #727272); white-space: nowrap; }
    .row { font-size: 0.82rem; color: var(--secondary-text-color, #727272); }
    .row b { color: var(--primary-text-color, #212121); font-weight: 600; }
    .bar { height: 6px; border-radius: 3px; background: rgba(127, 127, 127, 0.25); margin: 8px 0 2px; overflow: hidden; }
    .bar i { display: block; height: 100%; background: #f59e0b; transition: width 1s linear; }
    .barlab { font-size: 0.78rem; color: var(--secondary-text-color, #727272); margin-top: 2px; }
    .extras { display: flex; flex-direction: column; gap: 2px; margin-top: 8px; font-size: 0.82rem; }
    .extras i { font-style: normal; color: var(--secondary-text-color, #727272); margin-right: 4px; }
    .warn { display: flex; align-items: center; gap: 6px; margin-top: 8px; padding: 6px 10px; border-radius: 10px; background: rgba(245, 158, 11, 0.18); font-size: 0.82rem; }
    .acts { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
    .a { flex: 1; min-width: 96px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border-radius: 12px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: inherit; font-size: 0.85rem; cursor: pointer; }
    .acts.hum .a { min-width: 72px; padding: 0 6px; font-size: 0.8rem; }
    .a.ok { background: #16a34a; border-color: transparent; color: #fff; }
  `;
}

if (!customElements.get("elettrodomestici-card")) customElements.define("elettrodomestici-card", ElettrodomesticiCard);

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}
window.customCards = window.customCards || [];
window.customCards.push({
  type: "elettrodomestici-card",
  name: "Elettrodomestici",
  description: "Lavatrice, lavastoviglie, asciugatrice, forno, frigorifero, microonde, robot aspirapolvere e umidostato: stato, consumi, costi, statistiche, grafici e controllo.",
});

// eslint-disable-next-line no-console
console.info("%c ELETTRODOMESTICI %c v0.6.0 ", "color: white; background: #0f766e; font-weight: 700;", "color: #0f766e; background: white; font-weight: 700;");
