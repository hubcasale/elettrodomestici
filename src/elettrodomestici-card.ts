import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { applianceSvg } from "./appliance-svg";
import { fmt, fmtEur, fmtKwh, fmtWatt, gridTemplate, summaryText, tileModel, type TileModel } from "./card-logic";
import "./settings-dialog";
import "./stats-dialog";
import "./charts-dialog";
import type { ElettroInfo, HomeAssistant } from "./types";

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

type DialogTag = "elettro-settings-dialog" | "elettro-stats-dialog" | "elettro-charts-dialog";

/** Scheda degli elettrodomestici: una tessera per ognuno con immagine, stato, potenza e consumi; tocco = statistiche, pulsante = grafici. */
export class ElettrodomesticiCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: CardConfig = { type: "custom:elettrodomestici-card" };
  @state() private _info: ElettroInfo | null = null;
  @state() private _error = "";
  @state() private _now = Date.now();
  private _loadedAt = 0;
  private _loading = false;
  private _tick?: number;
  private _syncers = new Set<() => void>();

  setConfig(config: CardConfig): void {
    this._config = { ...config };
    this._info = null;
    this._loadedAt = 0;
  }
  getCardSize(): number {
    return 4;
  }
  getGridOptions(): Record<string, number> {
    return { columns: 12, min_columns: 4 };
  }
  static getStubConfig(): CardConfig {
    return { type: "custom:elettrodomestici-card" };
  }

  /** Editor visuale della scheda (titolo e colonne). */
  static getConfigForm() {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        { name: "columns", selector: { number: { min: 0, max: 8, step: 1, mode: "box" } } },
      ],
      computeLabel: (s: { name: string }) => (s.name === "title" ? "Titolo" : s.name === "columns" ? "Colonne (0 = automatico)" : s.name),
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._tick = window.setInterval(() => (this._now = Date.now()), 1000);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._tick) window.clearInterval(this._tick);
  }

  protected willUpdate(): void {
    for (const s of this._syncers) s();
  }
  protected updated(): void {
    if (this.hass && !this._loading && (!this._info || Date.now() - this._loadedAt > 5 * 60000)) void this._loadInfo();
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
    const grid = html`<div class="grid" style=${`grid-template-columns:${gridTemplate(this._config.columns)}`}>${tiles.map((t) => this._tile(t))}</div>`;
    if (this._config.header === false) return html`<ha-card><div class="pad compact">${grid}</div></ha-card>`;
    return html`
      <ha-card>
        <div class="pad">
          <div class="head">
            <div>
              <div class="title">${title}</div>
              <div class="sum">${summaryText(tiles)}</div>
            </div>
            <button class="ib" aria-label="Preferenze" @click=${() => void this._open("elettro-settings-dialog")}><ha-icon icon="mdi:cog"></ha-icon></button>
          </div>
          ${tiles.length === 0
            ? html`<button class="empty" @click=${() => void this._open("elettro-settings-dialog")}><ha-icon icon="mdi:plus-circle-outline"></ha-icon>Aggiungi il primo elettrodomestico</button>`
            : grid}
        </div>
      </ha-card>`;
  }

  static styles = css`
    :host { display: block; color: var(--primary-text-color, #212121); }
    ha-card { overflow: hidden; }
    .pad { padding: 14px 16px 16px; }
    .pad.compact { padding: 8px; }
    .head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
    .title { font-size: 1.15rem; font-weight: 600; }
    .sum { font-size: 0.85rem; color: var(--secondary-text-color, #727272); margin-top: 2px; }
    .muted { color: var(--secondary-text-color, #727272); font-size: 0.85rem; }
    .errbox { margin-top: 8px; padding: 10px; border-radius: 10px; background: rgba(220, 38, 38, 0.1); color: #b91c1c; font-size: 0.9rem; }
    .ib { flex: none; width: 44px; height: 44px; border-radius: 22px; border: 1px solid var(--divider-color, #ccc); background: var(--secondary-background-color, #f4f4f4); color: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
    ha-icon { --mdc-icon-size: 20px; }
    .empty { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 64px; justify-content: center; border: 2px dashed var(--divider-color, #ccc); border-radius: 14px; background: transparent; color: var(--secondary-text-color, #727272); cursor: pointer; font-size: 0.95rem; }
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
  description: "Lavatrice, lavastoviglie, asciugatrice, forno, frigorifero e microonde: stato, fasi, consumi, costi, statistiche e grafici.",
});

// eslint-disable-next-line no-console
console.info("%c ELETTRODOMESTICI %c v0.2.0 ", "color: white; background: #0f766e; font-weight: 700;", "color: #0f766e; background: white; font-weight: 700;");
