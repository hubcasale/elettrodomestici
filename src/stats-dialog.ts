import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { applianceSvg } from "./appliance-svg";
import { dialogStyles } from "./dialog-style";
import {
  STATE_LABEL, TYPE_LABEL, fmt, fmtEur, fmtKwh, fmtWatt, formatClock, formatDuration, formatHours, formatMoment, tileModel,
} from "./card-logic";
import type { ApplianceInfo, ElettroInfo, HomeAssistant, PeriodKey, Stats } from "./types";

const PERIODS: { key: PeriodKey; label: string }[] = [
  { key: "oggi", label: "Oggi" },
  { key: "ieri", label: "Ieri" },
  { key: "settimana", label: "Settimana" },
  { key: "mese", label: "Mese" },
  { key: "anno", label: "Anno" },
  { key: "totale", label: "Totale" },
];

/** Finestra con tutte le statistiche di un elettrodomestico: stato attuale, consumi per periodo, cicli, manutenzione, dispositivi collegati. */
export class ElettroStatsDialog extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) info!: ElettroInfo;
  @property() openKey = "";
  @state() private _stats: Stats | null = null;
  @state() private _error = "";
  @state() private _now = Date.now();
  private _tick?: number;
  private _poll?: number;
  private _onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") this._close();
  };

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keydown", this._onKey);
    this._tick = window.setInterval(() => (this._now = Date.now()), 1000);
    this._poll = window.setInterval(() => void this._load(), 60000);
    void this._load();
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._onKey);
    if (this._tick) window.clearInterval(this._tick);
    if (this._poll) window.clearInterval(this._poll);
  }
  private _close(): void {
    this.dispatchEvent(new CustomEvent("closed"));
    this.remove();
  }
  private _go(tag: string): void {
    this.dispatchEvent(new CustomEvent("open-dialog", { detail: { tag, key: this.openKey } }));
    this._close();
  }

  private get _app(): ApplianceInfo | undefined {
    return this.info.appliances.find((a) => a.key === this.openKey);
  }

  private async _load(): Promise<void> {
    try {
      const all = await this.hass.callWS<Record<string, Stats>>({ type: "elettrodomestici/stats", entry_id: this.info.entry_id, key: this.openKey });
      this._stats = all[this.openKey] ?? null;
      this._error = "";
    } catch (err) {
      this._error = `Impossibile leggere le statistiche: ${err instanceof Error ? err.message : (err as { message?: string })?.message ?? String(err)}`;
    }
  }

  private async _maintDone(): Promise<void> {
    await this.hass.callWS({ type: "elettrodomestici/action", entry_id: this.info.entry_id, key: this.openKey, action: "reset_maintenance" });
    await this._load();
  }

  render() {
    const app = this._app;
    if (!app) return nothing;
    const t = tileModel(app, this.hass.states, this.info.types, this._now);
    const def = this.info.types[app.type];
    const st = this._stats;
    const fridgeLike = !def?.has_finished && app.type === "frigorifero";
    return html`
      <div class="backdrop" @click=${(e: Event) => e.target === e.currentTarget && this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Statistiche ${app.name}`}>
          <div class="head">
            <div class="title">${app.name}${app.name !== TYPE_LABEL[app.type] ? html` <span class="sub">${TYPE_LABEL[app.type]}</span>` : nothing}</div>
            <button class="x" aria-label="Chiudi" @click=${() => this._close()}>✕</button>
          </div>
          <div class="body">
            <div class="now ${t.tone}">
              <span class="img">${unsafeSVG(applianceSvg(app.type, t.state))}</span>
              <div class="nowtxt">
                <div class="st">${STATE_LABEL[t.state]}${t.state === "in_funzione" ? html` · <b>${t.phase}</b>` : t.state === "terminato" ? html` · <b>${t.phase}</b>` : nothing}</div>
                <div class="big">${fmtWatt(t.power)}</div>
                ${t.state === "in_funzione" && t.cycleKwh !== null ? html`<div class="line">Questo ciclo: <b>${fmtKwh(t.cycleKwh)}</b> · ${fmtEur(t.cycleEur)}${t.remainingText ? html` · ${t.remainingText}` : nothing}</div>` : nothing}
                ${t.state === "in_funzione" && app.inizio ? html`<div class="line">Partita alle ${formatClock(app.inizio)}</div>` : nothing}
                ${t.state === "terminato" ? html`<div class="line">Finita alle ${formatClock(app.fine)}.</div>` : nothing}
              </div>
            </div>

            ${t.extras.length ? html`<div class="sec">Collegato al dispositivo</div><div class="kv">${t.extras.map((x) => html`<span>${x.label}</span><b>${x.value}</b>`)}</div>` : nothing}

            <div class="sec">Consumi</div>
            ${st
              ? html`<div class="tblwrap"><table>
                  <thead><tr><th></th>${PERIODS.map((p) => html`<th>${p.label}</th>`)}</tr></thead>
                  <tbody>
                    <tr><th>Energia</th>${PERIODS.map((p) => html`<td>${fmtKwh(st.periods[p.key].kwh)}</td>`)}</tr>
                    <tr><th>Costo</th>${PERIODS.map((p) => html`<td>${fmtEur(st.periods[p.key].eur)}</td>`)}</tr>
                    <tr><th>${fridgeLike ? "Avvii compressore" : "Cicli"}</th>${PERIODS.map((p) => html`<td>${fmt(st.periods[p.key].cycles)}</td>`)}</tr>
                    <tr><th>Funzionamento</th>${PERIODS.map((p) => html`<td>${formatHours(st.periods[p.key].sec)}</td>`)}</tr>
                  </tbody></table></div>
                <div class="hint">Costo calcolato a ${fmt(st.price_kwh, 3)} €/kWh. L'energia comprende anche i consumi a riposo.</div>`
              : this._error ? nothing : html`<div class="muted">Carico…</div>`}

            ${st?.summary
              ? html`<div class="sec">${fridgeLike ? "Compressore" : "Ciclo medio"} <span class="sub">(ultimi ${st.summary.count})</span></div>
                <div class="kv">
                  <span>Durata media</span><b>${formatDuration(st.summary.avg_seconds)}</b>
                  <span>Più corto / più lungo</span><b>${formatDuration(st.summary.min_seconds)} / ${formatDuration(st.summary.max_seconds)}</b>
                  <span>Energia media</span><b>${fmtKwh(st.summary.avg_kwh)} · ${fmtEur(st.summary.avg_eur)}</b>
                  <span>Energia massima</span><b>${fmtKwh(st.summary.max_kwh)}</b>
                </div>`
              : nothing}

            ${def && app.maint_cycles > 0 && st
              ? html`<div class="sec">Manutenzione</div>
                <div class="maint ${st.maintenance.due ? "due" : ""}">
                  <div class="mrow"><span>${def.maint_label}</span><b>${st.maintenance.count} / ${st.maintenance.threshold} cicli</b></div>
                  <div class="bar"><i style="width:${st.maintenance.pct ?? 0}%"></i></div>
                  <button class="btn" @click=${() => void this._maintDone()}><ha-icon icon="mdi:check"></ha-icon>Manutenzione fatta</button>
                </div>`
              : nothing}

            ${st && st.cycles.length
              ? html`<div class="sec">Ultimi cicli</div>
                <div class="tblwrap"><table class="cyc">
                  <thead><tr><th>Quando</th><th>Durata</th><th>Energia</th><th>Costo</th><th>Picco</th></tr></thead>
                  <tbody>${st.cycles.slice(0, 15).map((c) => html`<tr><td>${formatMoment(Date.parse(c.s))}</td><td>${formatDuration((Date.parse(c.e) - Date.parse(c.s)) / 1000)}</td><td>${fmtKwh(c.kwh)}</td><td>${fmtEur(c.eur)}</td><td>${fmtWatt(c.pk)}</td></tr>`)}</tbody>
                </table></div>`
              : st ? html`<div class="sec">Ultimi cicli</div><div class="muted">Nessun ciclo registrato.</div>` : nothing}

            <div class="sec">Come lo riconosco</div>
            <div class="kv small">
              <span>Presa (potenza)</span><b>${app.entity}</b>
              ${app.energy_entity ? html`<span>Presa (energia)</span><b>${app.energy_entity}</b>` : nothing}
              <span>Parte sopra</span><b>${fmtWatt(app.start_w)} per ${app.start_delay} s</b>
              <span>Finisce sotto</span><b>${fmtWatt(app.stop_w)} per ${formatDuration(app.end_delay)}</b>
              ${def?.phases.length && def.phases.length > 1 ? html`<span>Fasi</span><b>${def.phases.join(" → ")}</b>` : nothing}
              <span>Cicli più brevi di</span><b>${formatDuration(app.min_cycle)} non contano</b>
            </div>
            ${this._error ? html`<div class="err">${this._error}</div>` : nothing}
          </div>
          <div class="foot">
            <button class="btn" @click=${() => this._go("elettro-settings-dialog")}><ha-icon icon="mdi:cog"></ha-icon>Preferenze</button>
            <button class="btn primary" @click=${() => this._go("elettro-charts-dialog")}><ha-icon icon="mdi:chart-line"></ha-icon>Grafici</button>
          </div>
        </div>
      </div>`;
  }

  static styles = [
    dialogStyles,
    css`
      .sub { font-weight: 400; font-size: 0.85rem; color: var(--secondary-text-color, #727272); }
      .now { display: flex; gap: 14px; align-items: center; padding: 10px 12px; border-radius: 14px; background: var(--secondary-background-color, #f2f2f2); border: 1px solid transparent; }
      .now.run { border-color: rgba(245, 158, 11, 0.7); background: rgba(245, 158, 11, 0.1); }
      .now.done { border-color: rgba(22, 163, 74, 0.7); background: rgba(22, 163, 74, 0.1); }
      .img { flex: none; width: 84px; height: 98px; } .img svg { width: 100%; height: 100%; display: block; }
      .nowtxt { flex: 1; min-width: 0; }
      .st { font-size: 0.95rem; }
      .big { font-size: 2rem; font-weight: 600; font-variant-numeric: tabular-nums; line-height: 1.2; }
      .line { font-size: 0.88rem; color: var(--secondary-text-color, #727272); margin-top: 2px; } .line b { color: var(--primary-text-color, #212121); }
      .sec { font-weight: 600; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--secondary-text-color, #727272); margin: 18px 0 6px; }
      .kv { display: grid; grid-template-columns: auto 1fr; gap: 6px 14px; font-size: 0.92rem; }
      .kv span { color: var(--secondary-text-color, #727272); } .kv b { font-weight: 500; text-align: right; word-break: break-word; }
      .kv.small { font-size: 0.8rem; }
      .tblwrap { overflow-x: auto; }
      table { border-collapse: collapse; width: 100%; font-size: 0.85rem; font-variant-numeric: tabular-nums; }
      th, td { padding: 7px 8px; text-align: right; white-space: nowrap; border-bottom: 1px solid var(--divider-color, #e6e6e6); }
      thead th { color: var(--secondary-text-color, #727272); font-weight: 500; }
      tbody th { text-align: left; font-weight: 500; position: sticky; left: 0; background: var(--card-background-color, #fff); }
      table.cyc td:first-child, table.cyc th:first-child { text-align: left; }
      .hint { font-size: 0.78rem; color: var(--secondary-text-color, #727272); margin-top: 6px; }
      .muted { color: var(--secondary-text-color, #727272); font-size: 0.88rem; }
      .maint { padding: 10px 12px; border-radius: 12px; background: var(--secondary-background-color, #f2f2f2); }
      .maint.due { background: rgba(245, 158, 11, 0.18); }
      .mrow { display: flex; justify-content: space-between; gap: 10px; font-size: 0.9rem; }
      .bar { height: 8px; border-radius: 4px; background: rgba(127, 127, 127, 0.25); margin: 8px 0 10px; overflow: hidden; }
      .bar i { display: block; height: 100%; background: #f59e0b; }
      .btn { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; }
      ha-icon { --mdc-icon-size: 18px; }
    `,
  ];
}

if (!customElements.get("elettro-stats-dialog")) customElements.define("elettro-stats-dialog", ElettroStatsDialog);

