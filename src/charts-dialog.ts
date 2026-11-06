import { LitElement, html, css, svg, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { dialogStyles } from "./dialog-style";
import {
  METRIC_LABEL, STATE_COLOR, STATE_LABEL, fmt, fmtEur, fmtKwh, formatDay, formatMoment, linePath, metricText, niceAxis, parseNumeric,
  readPower, resample, stateAt, stateSegments, sumSeries, timeTicks, type Metric, type Pt, type Seg,
} from "./card-logic";
import type { ApplianceInfo, ElettroInfo, HomeAssistant, RawState, Stats } from "./types";

const RANGES = [
  { id: "6h", label: "6 ore", ms: 6 * 3600000 },
  { id: "24h", label: "24 ore", ms: 24 * 3600000 },
  { id: "3d", label: "3 giorni", ms: 3 * 86400000 },
  { id: "7d", label: "7 giorni", ms: 7 * 86400000 },
];
const DAY_RANGES = [
  { id: 7, label: "7 giorni" },
  { id: 30, label: "30 giorni" },
  { id: 90, label: "90 giorni" },
];
const PLOT_H = 220;
const MT = 10;
const ML = 44;
const LABELS_H = 22;
const STRIP_H = 12;

/** Finestra "Grafici": potenza della presa con le soglie e le fasce dello stato (recorder), poi i consumi giorno per giorno. */
export class ElettroChartsDialog extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) info!: ElettroInfo;
  @property() openKey = "";
  @state() private _tab: "potenza" | "consumi" = "potenza";
  @state() private _range = "24h";
  @state() private _days = 30;
  @state() private _metric: Metric = "kwh";
  @state() private _loading = false;
  @state() private _error = "";
  @state() private _w = 640;
  @state() private _hover: number | null = null;
  @state() private _values: (number | null)[] = [];
  @state() private _segs: Seg[] = [];
  @state() private _stats: Stats | null = null;
  private _t0 = 0;
  private _t1 = 0;
  private _n = 240;
  private _raw: Pt[] = [];
  private _rawStates: RawState[] = [];
  private _ro?: ResizeObserver;
  private _wrapEl: Element | null = null;
  private _timer?: number;
  private _seq = 0;
  private _onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") this._close();
  };

  private get _app(): ApplianceInfo | undefined {
    return this.info.appliances.find((a) => a.key === this.openKey);
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
    // cambiando scheda il contenitore del grafico viene ricreato: si osserva quello nuovo
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
  private _go(tag: string): void {
    this.dispatchEvent(new CustomEvent("open-dialog", { detail: { tag, key: this.openKey } }));
    this._close();
  }

  private async _history(ids: string[], start: number, end: number): Promise<Record<string, RawState[]>> {
    return this.hass.callWS<Record<string, RawState[]>>({
      type: "history/history_during_period",
      start_time: new Date(start).toISOString(),
      end_time: new Date(end).toISOString(),
      entity_ids: ids,
      include_start_time_state: true,
      significant_changes_only: false,
      minimal_response: true,
      no_attributes: true,
    });
  }

  private async _load(): Promise<void> {
    const app = this._app;
    if (!this.hass || !app) return;
    const seq = ++this._seq;
    this._loading = true;
    try {
      if (this._tab === "consumi") {
        const all = await this.hass.callWS<Record<string, Stats>>({ type: "elettrodomestici/stats", entry_id: this.info.entry_id, key: app.key });
        if (seq !== this._seq) return;
        this._stats = all[app.key] ?? null;
      } else {
        const range = RANGES.find((r) => r.id === this._range) ?? RANGES[1];
        const t1 = Date.now();
        const t0 = t1 - range.ms;
        const stato = app.entities.stato;
        const res = await this._history(stato ? [app.entity, stato] : [app.entity], t0, t1);
        if (seq !== this._seq) return;
        this._t0 = t0;
        this._t1 = t1;
        this._raw = parseNumeric(res[app.entity]);
        this._rawStates = stato ? res[stato] ?? [] : [];
        this._recompute();
      }
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
    this._values = resample(this._raw, this._t0, this._t1, this._n, 30 * 60000);
    this._segs = stateSegments(this._rawStates, this._t0, this._t1);
  }

  private _setTab(tab: "potenza" | "consumi"): void {
    this._tab = tab;
    this._hover = null;
    void this._load();
  }
  private _setRange(id: string): void {
    this._range = id;
    this._hover = null;
    void this._load();
  }

  /** Posizione del dito o del mouse sul grafico a linea: indice del campione più vicino. */
  private _move(ev: PointerEvent, count: number, left: number, width: number): void {
    const box = (ev.currentTarget as SVGSVGElement).getBoundingClientRect();
    const i = Math.round(((ev.clientX - box.left - left) / width) * (count - 1));
    this._hover = i >= 0 && i < count ? i : null;
  }
  /** Idem per le barre: indice della barra sotto il dito. */
  private _moveBar(ev: PointerEvent, count: number, left: number, width: number): void {
    const box = (ev.currentTarget as SVGSVGElement).getBoundingClientRect();
    const i = Math.floor(((ev.clientX - box.left - left) / width) * count);
    this._hover = i >= 0 && i < count ? i : null;
  }

  // ------------------------------------------------------------------ potenza
  private _power(app: ApplianceInfo) {
    const vals = this._values.filter((v): v is number => v !== null);
    const live = readPower(this.hass.states[app.entity]);
    const top = Math.max(app.start_w * 1.5, ...(vals.length ? vals : [0]), live ?? 0);
    const ax = niceAxis(0, top, 5);
    const W = this._w;
    const pw = W - ML - 8;
    const H = MT + PLOT_H + STRIP_H + LABELS_H + 6;
    const xOf = (i: number) => ML + (this._n <= 1 ? 0 : (i / (this._n - 1)) * pw);
    const yOf = (v: number) => MT + PLOT_H - ((v - ax.min) / (ax.max - ax.min || 1)) * PLOT_H;
    const tx = (t: number) => ML + ((t - this._t0) / (this._t1 - this._t0 || 1)) * pw;
    const lines = [
      { v: app.start_w, c: STATE_COLOR.in_funzione, l: "avvio" },
      ...(app.stop_w !== app.start_w ? [{ v: app.stop_w, c: STATE_COLOR.spento, l: "fine" }] : []),
      ...(app.heat_w < ax.max ? [{ v: app.heat_w, c: "#ef4444", l: "riscaldamento" }] : []),
    ];
    const hover = this._hover;
    const hoverT = hover !== null && this._n > 1 ? this._t0 + (hover / (this._n - 1)) * (this._t1 - this._t0) : null;
    const hoverV = hover !== null ? this._values[hover] : null;
    const hoverS = hoverT !== null ? stateAt(this._segs, hoverT) : null;
    return html`
      <div class="ranges">
        ${RANGES.map((r) => html`<button class=${r.id === this._range ? "chip on" : "chip"} @click=${() => this._setRange(r.id)}>${r.label}</button>`)}
        ${this._loading ? html`<span class="load">aggiorno…</span>` : nothing}
      </div>
      <div class="chartwrap">
        <div class="tip">
          ${hoverT !== null
            ? html`<b>${formatMoment(hoverT)}</b> · ${hoverV !== null ? `${fmt(hoverV, 0)} W` : "nessun dato"}${hoverS ? html` · <span style="color:${STATE_COLOR[hoverS] === "transparent" ? "inherit" : STATE_COLOR[hoverS]}">${STATE_LABEL[hoverS]}</span>` : nothing}`
            : html`<span class="muted">Tocca il grafico per leggere i valori</span>`}
        </div>
        <svg width=${W} height=${H} viewBox="0 0 ${W} ${H}" @pointermove=${(e: PointerEvent) => this._move(e, this._n, ML, pw)} @pointerdown=${(e: PointerEvent) => this._move(e, this._n, ML, pw)} @pointerleave=${() => (this._hover = null)}>
          ${ax.ticks.map((t) => svg`
            <line x1=${ML} x2=${W - 8} y1=${yOf(t)} y2=${yOf(t)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
            <text x=${ML - 6} y=${yOf(t) + 4} text-anchor="end" class="ax">${fmt(t)}</text>`)}
          ${lines.map((t, i) => svg`<line x1=${ML} x2=${W - 8} y1=${yOf(t.v)} y2=${yOf(t.v)} stroke=${t.c} stroke-width="1.2" stroke-dasharray="5 4" opacity="0.9" />
            ${i === 0 || Math.abs(yOf(lines[i - 1].v) - yOf(t.v)) >= 13 ? svg`<text x=${W - 10} y=${yOf(t.v) - 3} text-anchor="end" class="th" fill=${t.c}>${t.l} ${fmt(t.v, t.v % 1 ? 1 : 0)} W${i < lines.length - 1 && Math.abs(yOf(lines[i + 1].v) - yOf(t.v)) < 13 ? ` · ${lines[i + 1].l} ${fmt(lines[i + 1].v, lines[i + 1].v % 1 ? 1 : 0)} W` : ""}</text>` : nothing}`)}
          <path d=${linePath(this._values, xOf, yOf)} fill="none" stroke="var(--primary-color,#03a9f4)" stroke-width="1.8" stroke-linejoin="round" />
          ${hover !== null && hoverV !== null ? svg`<line x1=${xOf(hover)} x2=${xOf(hover)} y1=${MT} y2=${MT + PLOT_H} stroke="var(--secondary-text-color,#888)" stroke-width="1" /><circle cx=${xOf(hover)} cy=${yOf(hoverV)} r="4" fill="var(--primary-color,#03a9f4)" />` : nothing}
          ${this._segs.map((g) => svg`<rect x=${tx(g.from)} y=${MT + PLOT_H + 4} width=${Math.max(1, tx(g.to) - tx(g.from))} height=${STRIP_H} fill=${STATE_COLOR[g.state] === "transparent" ? "#9aa1ad" : STATE_COLOR[g.state]} opacity=${g.state === "non_disponibile" ? 0.35 : 0.9} />`)}
          ${timeTicks(this._t0, this._t1).map((t) => svg`
            <line x1=${tx(t.t)} x2=${tx(t.t)} y1=${MT + PLOT_H + STRIP_H + 4} y2=${MT + PLOT_H + STRIP_H + 8} stroke="var(--secondary-text-color,#888)" />
            <text x=${tx(t.t)} y=${H - 4} text-anchor="middle" class=${t.major ? "ax maj" : "ax"}>${t.label}</text>`)}
        </svg>
        <div class="legend">
          ${(["spento", "in_funzione", "terminato"] as const).map((k) => html`<span><i style="background:${STATE_COLOR[k]}"></i>${STATE_LABEL[k]}</span>`)}
        </div>
      </div>
      ${!this._loading && !this._error && this._values.every((v) => v === null) ? html`<div class="empty">Nessun dato di potenza nel periodo.</div>` : nothing}`;
  }

  // ------------------------------------------------------------------ consumi
  private _consumi() {
    const st = this._stats;
    if (!st) return html`<div class="empty">${this._loading ? "Carico…" : "Nessun dato."}</div>`;
    const series = st.series.slice(-this._days);
    const m = this._metric;
    const vals = series.map((d) => d[m]);
    const top = Math.max(...vals, m === "cycles" ? 1 : 0.01);
    const ax = niceAxis(0, top, 5);
    const W = this._w;
    const pw = W - ML - 8;
    const H = MT + PLOT_H + LABELS_H + 6;
    const n = series.length;
    const slot = pw / n;
    const bw = Math.max(2, Math.min(28, slot - (slot > 6 ? 2 : 0)));
    const yOf = (v: number) => MT + PLOT_H - ((v - ax.min) / (ax.max - ax.min || 1)) * PLOT_H;
    const xOf = (i: number) => ML + i * slot + (slot - bw) / 2;
    const hover = this._hover;
    const tot = sumSeries(series, this._days);
    const labelEvery = Math.max(1, Math.ceil(n / 7));
    return html`
      <div class="ranges">
        ${DAY_RANGES.map((r) => html`<button class=${r.id === this._days ? "chip on" : "chip"} @click=${() => ((this._days = r.id), (this._hover = null))}>${r.label}</button>`)}
        <span class="sep"></span>
        ${(Object.keys(METRIC_LABEL) as Metric[]).map((k) => html`<button class=${k === m ? "chip on" : "chip"} @click=${() => ((this._metric = k), (this._hover = null))}>${METRIC_LABEL[k]}</button>`)}
        ${this._loading ? html`<span class="load">aggiorno…</span>` : nothing}
      </div>
      <div class="totals"><span>Totale nel periodo</span><b>${fmtKwh(tot.kwh)}</b><b>${fmtEur(tot.eur)}</b><b>${metricText("cycles", tot.cycles)}</b></div>
      <div class="chartwrap">
        <div class="tip">
          ${hover !== null && series[hover]
            ? html`<b>${formatDay(series[hover].date)}</b> · ${metricText(m, series[hover][m])}${m !== "kwh" ? html` · ${fmtKwh(series[hover].kwh)}` : nothing}${m !== "eur" ? html` · ${fmtEur(series[hover].eur)}` : nothing}`
            : html`<span class="muted">Tocca una barra per leggere il giorno</span>`}
        </div>
        <svg width=${W} height=${H} viewBox="0 0 ${W} ${H}" @pointermove=${(e: PointerEvent) => this._moveBar(e, n, ML, pw)} @pointerdown=${(e: PointerEvent) => this._moveBar(e, n, ML, pw)} @pointerleave=${() => (this._hover = null)}>
          ${ax.ticks.map((t) => svg`
            <line x1=${ML} x2=${W - 8} y1=${yOf(t)} y2=${yOf(t)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
            <text x=${ML - 6} y=${yOf(t) + 4} text-anchor="end" class="ax">${fmt(t, m === "kwh" || m === "eur" ? (ax.max < 5 ? 1 : 0) : 0)}</text>`)}
          ${series.map((d, i) => svg`<rect x=${xOf(i)} y=${yOf(d[m])} width=${bw} height=${Math.max(0, MT + PLOT_H - yOf(d[m]))} rx=${bw > 6 ? 3 : 1} fill=${hover === i ? "var(--primary-color,#03a9f4)" : "#f59e0b"} opacity=${hover === null || hover === i ? 1 : 0.55} />`)}
          ${series.map((d, i) => (i % labelEvery === 0 ? svg`<text x=${xOf(i) + bw / 2} y=${H - 4} text-anchor="middle" class="ax">${formatDay(d.date).replace(/^\w+ /, "")}</text>` : nothing))}
        </svg>
      </div>`;
  }

  render() {
    const app = this._app;
    if (!app) return nothing;
    return html`
      <div class="backdrop" @click=${(e: Event) => e.target === e.currentTarget && this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Grafici ${app.name}`}>
          <div class="head">
            <div class="title">Grafici · ${app.name}</div>
            <button class="x" aria-label="Chiudi" @click=${() => this._close()}>✕</button>
          </div>
          <div class="body">
            <div class="tabs" role="tablist">
              <button role="tab" aria-selected=${this._tab === "potenza"} class=${this._tab === "potenza" ? "tab on" : "tab"} @click=${() => this._setTab("potenza")}>Potenza</button>
              <button role="tab" aria-selected=${this._tab === "consumi"} class=${this._tab === "consumi" ? "tab on" : "tab"} @click=${() => this._setTab("consumi")}>Consumi</button>
            </div>
            ${this._tab === "potenza" ? this._power(app) : this._consumi()}
            ${this._error ? html`<div class="err">${this._error}</div>` : nothing}
          </div>
          <div class="foot">
            <button class="btn" @click=${() => this._go("elettro-stats-dialog")}><ha-icon icon="mdi:information-outline"></ha-icon>Dettagli</button>
          </div>
        </div>
      </div>`;
  }

  static styles = [
    dialogStyles,
    css`
      .tabs { display: flex; gap: 4px; margin-bottom: 10px; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
      .tab { border: 0; background: transparent; color: var(--secondary-text-color, #727272); padding: 10px 16px; font-size: 0.95rem; cursor: pointer; border-bottom: 3px solid transparent; min-height: 44px; }
      .tab.on { color: var(--primary-text-color, #212121); border-bottom-color: var(--primary-color, #03a9f4); font-weight: 600; }
      .ranges { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 8px; }
      .sep { width: 10px; }
      .chip { min-height: 40px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; border-radius: 999px; padding: 5px 14px; font-size: 0.85rem; cursor: pointer; }
      .chip.on { background: var(--primary-color, #03a9f4); color: #fff; border-color: transparent; }
      .load { font-size: 0.8rem; color: var(--secondary-text-color, #727272); }
      .totals { display: flex; gap: 14px; flex-wrap: wrap; align-items: baseline; font-size: 0.9rem; margin: 4px 0 8px; }
      .totals span { color: var(--secondary-text-color, #727272); }
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

if (!customElements.get("elettro-charts-dialog")) customElements.define("elettro-charts-dialog", ElettroChartsDialog);
