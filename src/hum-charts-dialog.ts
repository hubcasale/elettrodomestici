import { LitElement, html, css, svg, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { dialogStyles } from "./dialog-style";
import { fmt, formatMoment, linePath, niceAxis, parseNumeric, resample, stateAt, stateSegments, timeTicks, type Pt, type Seg } from "./card-logic";
import type { ElettroInfo, HomeAssistant, HumInfo, RawState } from "./types";

const RANGES = [
  { id: "6h", label: "6 ore", ms: 6 * 3600000 },
  { id: "24h", label: "24 ore", ms: 24 * 3600000 },
  { id: "3d", label: "3 giorni", ms: 3 * 86400000 },
  { id: "7d", label: "7 giorni", ms: 7 * 86400000 },
];
const PLOT_H = 190;
const TEMP_H = 130;
const MT = 10;
const ML = 44;
const STRIP_H = 10;
const LABELS_H = 22;

/** Acceso/spento dei ventilatori e delle luci per le fasce: si riusa il disegno degli stati degli elettrodomestici. */
function onOff(rows: RawState[] | undefined): RawState[] {
  return (rows ?? []).map((r) => {
    const v = r.s ?? r.state ?? "";
    return { ...r, s: v === "on" ? "in_funzione" : v === "off" ? "spento" : "non_disponibile", state: undefined };
  });
}

/** Grafici dell'umidostato: umidità con le soglie di accensione e spegnimento, temperatura (se scelta) e quando erano accesi ventilatore e luce. */
export class ElettroHumChartsDialog extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) info!: ElettroInfo;
  @property() openKey = "";
  @state() private _range = "24h";
  @state() private _loading = false;
  @state() private _error = "";
  @state() private _w = 640;
  @state() private _hover: number | null = null;
  @state() private _hum: (number | null)[] = [];
  @state() private _temp: (number | null)[] = [];
  @state() private _fan: Seg[] = [];
  @state() private _light: Seg[] = [];
  private _t0 = 0;
  private _t1 = 0;
  private _n = 240;
  private _rawHum: Pt[] = [];
  private _rawTemp: Pt[] = [];
  private _rawFan: RawState[] = [];
  private _rawLight: RawState[] = [];
  private _ro?: ResizeObserver;
  private _wrapEl: Element | null = null;
  private _timer?: number;
  private _seq = 0;
  private _onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") this._close();
  };

  private get _app(): HumInfo | undefined {
    return (this.info.humidistats ?? []).find((a) => a.key === this.openKey);
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keydown", this._onKey);
    this._timer = window.setInterval(() => void this._load(), 60000);
    void this._load();
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._onKey);
    this._ro?.disconnect();
    if (this._timer) window.clearInterval(this._timer);
  }
  protected updated(): void {
    const wrap = this.renderRoot.querySelector(".chartwrap");
    if (wrap && wrap !== this._wrapEl) {
      this._ro?.disconnect();
      this._wrapEl = wrap;
      this._ro = new ResizeObserver((entries) => {
        const w = Math.floor(entries[0]?.contentRect.width ?? 640);
        if (w > 100 && Math.abs(w - this._w) > 2) {
          this._w = w;
          this._recompute();
        }
      });
      this._ro.observe(wrap);
    }
  }
  private _close(): void {
    this.dispatchEvent(new CustomEvent("closed"));
    this.remove();
  }
  private _openPrefs(): void {
    this.dispatchEvent(new CustomEvent("open-dialog", { detail: { tag: "elettro-settings-dialog", key: this.openKey } }));
    this._close();
  }

  private async _load(): Promise<void> {
    const app = this._app;
    if (!this.hass || !app) return;
    const seq = ++this._seq;
    this._loading = true;
    try {
      const range = RANGES.find((r) => r.id === this._range) ?? RANGES[1];
      const t1 = Date.now();
      const t0 = t1 - range.ms;
      const ids = [app.entity, app.temp_entity, app.fan_entity, app.light_entity].filter((x): x is string => !!x);
      const res = await this.hass.callWS<Record<string, RawState[]>>({
        type: "history/history_during_period", start_time: new Date(t0).toISOString(), end_time: new Date(t1).toISOString(), entity_ids: ids,
        include_start_time_state: true, significant_changes_only: false, minimal_response: true, no_attributes: true,
      });
      if (seq !== this._seq) return;
      this._t0 = t0;
      this._t1 = t1;
      this._rawHum = parseNumeric(res[app.entity]);
      this._rawTemp = app.temp_entity ? parseNumeric(res[app.temp_entity]) : [];
      this._rawFan = onOff(app.fan_entity ? res[app.fan_entity] : undefined);
      this._rawLight = onOff(app.light_entity ? res[app.light_entity] : undefined);
      this._recompute();
      this._error = "";
    } catch (err) {
      if (seq === this._seq) this._error = `Impossibile leggere i dati: ${err instanceof Error ? err.message : (err as { message?: string })?.message ?? String(err)}`;
    } finally {
      if (seq === this._seq) this._loading = false;
    }
  }

  private _recompute(): void {
    if (!this._t1) return;
    this._n = Math.max(60, Math.min(480, Math.floor((this._w - ML - 8) / 2)));
    this._hum = resample(this._rawHum, this._t0, this._t1, this._n, 30 * 60000);
    this._temp = resample(this._rawTemp, this._t0, this._t1, this._n, 30 * 60000);
    this._fan = stateSegments(this._rawFan, this._t0, this._t1);
    this._light = stateSegments(this._rawLight, this._t0, this._t1);
  }

  private _setRange(id: string): void {
    this._range = id;
    this._hover = null;
    void this._load();
  }

  private _move(ev: PointerEvent, left: number, width: number): void {
    const box = (ev.currentTarget as SVGSVGElement).getBoundingClientRect();
    const i = Math.round(((ev.clientX - box.left - left) / width) * (this._n - 1));
    this._hover = i >= 0 && i < this._n ? i : null;
  }

  /** Una striscia on/off (ventilatore o luce) sotto il grafico. */
  private _strip(segs: Seg[], y: number, tx: (t: number) => number, color: string) {
    return segs.map((g) => svg`<rect x=${tx(g.from)} y=${y} width=${Math.max(1, tx(g.to) - tx(g.from))} height=${STRIP_H} rx="2" fill=${g.state === "in_funzione" ? color : "var(--divider-color,#ccc)"} opacity=${g.state === "non_disponibile" ? 0.25 : g.state === "in_funzione" ? 0.95 : 0.55} />`);
  }

  render() {
    const app = this._app;
    if (!app) return nothing;
    const W = this._w;
    const pw = W - ML - 8;
    const hasTemp = !!app.temp_entity;
    const hasLight = !!app.light_entity;
    const strips = 1 + (hasLight ? 1 : 0);
    const stripsH = strips * (STRIP_H + 4);
    const H = MT + PLOT_H + stripsH + LABELS_H + 6;
    const tx = (t: number) => ML + ((t - this._t0) / (this._t1 - this._t0 || 1)) * pw;
    const xOf = (i: number) => ML + (this._n <= 1 ? 0 : (i / (this._n - 1)) * pw);
    const vals = this._hum.filter((v): v is number => v !== null);
    const ax = niceAxis(Math.max(0, Math.floor(Math.min(...vals, app.hum.off_below) - 8)), 100, 5);
    const yOf = (v: number) => MT + PLOT_H - ((v - ax.min) / (ax.max - ax.min || 1)) * PLOT_H;
    const lines = [
      { v: app.hum.on_above, c: "#f59e0b", l: `accende ${fmt(app.hum.on_above, app.hum.on_above % 1 ? 1 : 0)} %` },
      { v: app.hum.off_below, c: "#16a34a", l: `spegne ${fmt(app.hum.off_below, app.hum.off_below % 1 ? 1 : 0)} %` },
    ];
    const hover = this._hover;
    const hoverT = hover !== null && this._n > 1 ? this._t0 + (hover / (this._n - 1)) * (this._t1 - this._t0) : null;
    const hv = hover !== null ? this._hum[hover] : null;
    const ht = hover !== null ? this._temp[hover] : null;
    const fanAt = hoverT !== null ? stateAt(this._fan, hoverT) : null;
    const lightAt = hoverT !== null ? stateAt(this._light, hoverT) : null;

    const tv = this._temp.filter((v): v is number => v !== null);
    const tax = niceAxis(Math.floor(Math.min(...(tv.length ? tv : [15])) - 1), Math.ceil(Math.max(...(tv.length ? tv : [25])) + 1), 4);
    const tY = (v: number) => MT + TEMP_H - ((v - tax.min) / (tax.max - tax.min || 1)) * TEMP_H;
    const TH = MT + TEMP_H + LABELS_H + 6;
    const tunit = (app.temp_entity && String(this.hass.states[app.temp_entity]?.attributes?.unit_of_measurement)) || "°C";

    return html`
      <div class="backdrop" @click=${(e: Event) => e.target === e.currentTarget && this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Grafici ${app.name}`}>
          <div class="head">
            <div class="title">Grafici · ${app.name}</div>
            <button class="x" aria-label="Chiudi" @click=${() => this._close()}>✕</button>
          </div>
          <div class="body">
            <div class="ranges">
              ${RANGES.map((r) => html`<button class=${r.id === this._range ? "chip on" : "chip"} @click=${() => this._setRange(r.id)}>${r.label}</button>`)}
              ${this._loading ? html`<span class="load">aggiorno…</span>` : nothing}
            </div>
            <div class="sec">Umidità</div>
            <div class="chartwrap">
              <div class="tip">
                ${hoverT !== null
                  ? html`<b>${formatMoment(hoverT)}</b> · ${hv !== null ? `${fmt(hv, 1)} %` : "nessun dato"}${hasTemp && ht !== null ? ` · ${fmt(ht, 1)} ${tunit}` : ""}${fanAt ? html` · ventilatore <b>${fanAt === "in_funzione" ? "acceso" : "spento"}</b>` : nothing}${lightAt ? html` · luce ${lightAt === "in_funzione" ? "accesa" : "spenta"}` : nothing}`
                  : html`<span class="muted">Tocca il grafico per leggere i valori</span>`}
              </div>
              <svg width=${W} height=${H} viewBox="0 0 ${W} ${H}" @pointermove=${(e: PointerEvent) => this._move(e, ML, pw)} @pointerdown=${(e: PointerEvent) => this._move(e, ML, pw)} @pointerleave=${() => (this._hover = null)}>
                ${ax.ticks.map((t) => svg`
                  <line x1=${ML} x2=${W - 8} y1=${yOf(t)} y2=${yOf(t)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
                  <text x=${ML - 6} y=${yOf(t) + 4} text-anchor="end" class="ax">${fmt(t)}</text>`)}
                ${lines.map((t) => svg`<line x1=${ML} x2=${W - 8} y1=${yOf(t.v)} y2=${yOf(t.v)} stroke=${t.c} stroke-width="1.2" stroke-dasharray="5 4" opacity="0.9" />
                  <text x=${W - 10} y=${yOf(t.v) + (t.v === app.hum.off_below ? 12 : -3)} text-anchor="end" class="th" fill=${t.c}>${t.l}</text>`)}
                <path d=${linePath(this._hum, xOf, yOf)} fill="none" stroke="var(--primary-color,#03a9f4)" stroke-width="1.8" stroke-linejoin="round" />
                ${hover !== null && hv !== null ? svg`<line x1=${xOf(hover)} x2=${xOf(hover)} y1=${MT} y2=${MT + PLOT_H} stroke="var(--secondary-text-color,#888)" stroke-width="1" /><circle cx=${xOf(hover)} cy=${yOf(hv)} r="4" fill="var(--primary-color,#03a9f4)" />` : nothing}
                ${this._strip(this._fan, MT + PLOT_H + 4, tx, "#38bdf8")}
                ${hasLight ? this._strip(this._light, MT + PLOT_H + 4 + STRIP_H + 4, tx, "#fbbf24") : nothing}
                ${timeTicks(this._t0, this._t1).map((t) => svg`
                  <line x1=${tx(t.t)} x2=${tx(t.t)} y1=${MT + PLOT_H + stripsH} y2=${MT + PLOT_H + stripsH + 4} stroke="var(--secondary-text-color,#888)" />
                  <text x=${tx(t.t)} y=${H - 4} text-anchor="middle" class=${t.major ? "ax maj" : "ax"}>${t.label}</text>`)}
              </svg>
              <div class="legend">
                <span><i style="background:#38bdf8"></i>Ventilatore acceso</span>
                ${hasLight ? html`<span><i style="background:#fbbf24"></i>Luce accesa</span>` : nothing}
              </div>
            </div>
            ${!this._loading && !this._error && this._hum.every((v) => v === null) ? html`<div class="empty">Nessun dato di umidità nel periodo.</div>` : nothing}
            ${hasTemp
              ? html`<div class="sec">Temperatura</div>
                <div class="chartwrap">
                  <svg width=${W} height=${TH} viewBox="0 0 ${W} ${TH}" @pointermove=${(e: PointerEvent) => this._move(e, ML, pw)} @pointerdown=${(e: PointerEvent) => this._move(e, ML, pw)} @pointerleave=${() => (this._hover = null)}>
                    ${tax.ticks.map((t) => svg`
                      <line x1=${ML} x2=${W - 8} y1=${tY(t)} y2=${tY(t)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
                      <text x=${ML - 6} y=${tY(t) + 4} text-anchor="end" class="ax">${fmt(t, tax.max - tax.min < 6 ? 1 : 0)}</text>`)}
                    <path d=${linePath(this._temp, xOf, tY)} fill="none" stroke="#ef4444" stroke-width="1.8" stroke-linejoin="round" />
                    ${hover !== null && ht !== null ? svg`<line x1=${xOf(hover)} x2=${xOf(hover)} y1=${MT} y2=${MT + TEMP_H} stroke="var(--secondary-text-color,#888)" stroke-width="1" /><circle cx=${xOf(hover)} cy=${tY(ht)} r="4" fill="#ef4444" />` : nothing}
                    ${timeTicks(this._t0, this._t1).map((t) => svg`<text x=${tx(t.t)} y=${TH - 4} text-anchor="middle" class=${t.major ? "ax maj" : "ax"}>${t.label}</text>`)}
                  </svg>
                </div>`
              : nothing}
            ${this._error ? html`<div class="err">${this._error}</div>` : nothing}
          </div>
          <div class="foot">
            <button class="btn" @click=${() => this._openPrefs()}><ha-icon icon="mdi:tune-variant"></ha-icon>Soglie</button>
          </div>
        </div>
      </div>`;
  }

  static styles = [
    dialogStyles,
    css`
      .sec { font-weight: 600; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--secondary-text-color, #727272); margin: 12px 0 4px; }
      .ranges { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 8px; }
      .chip { min-height: 40px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; border-radius: 999px; padding: 5px 14px; font-size: 0.85rem; cursor: pointer; }
      .chip.on { background: var(--primary-color, #03a9f4); color: #fff; border-color: transparent; }
      .load { font-size: 0.8rem; color: var(--secondary-text-color, #727272); }
      .chartwrap { width: 100%; }
      svg { display: block; touch-action: pan-y; }
      .ax { font-size: 10px; fill: var(--secondary-text-color, #727272); }
      .ax.maj { font-weight: 700; }
      .th { font-size: 10px; }
      .tip { min-height: 22px; font-size: 0.88rem; margin-bottom: 4px; }
      .muted { color: var(--secondary-text-color, #727272); }
      .legend { display: flex; gap: 14px; flex-wrap: wrap; font-size: 0.8rem; margin-top: 6px; color: var(--secondary-text-color, #727272); }
      .legend i { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 5px; }
      .btn { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; }
      ha-icon { --mdc-icon-size: 18px; }
    `,
  ];
}

if (!customElements.get("elettro-hum-charts-dialog")) customElements.define("elettro-hum-charts-dialog", ElettroHumChartsDialog);
