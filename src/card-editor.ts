import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import "./prefs-panel";
import type { ElettroInfo, HomeAssistant } from "./types";

interface CardConfig {
  type: string;
  title?: string;
  entry_id?: string;
  appliances?: string[];
  columns?: number;
  header?: boolean;
}

interface FormSchema {
  name: string;
  required?: boolean;
  selector: Record<string, unknown>;
}

/** Editor della scheda (quello di Home Assistant: "Modifica scheda"): opzioni di visualizzazione con i selettori nativi e, sotto,
 *  le preferenze degli elettrodomestici (elenco, sensori, soglie, prezzo, notifiche) che restano salvate nell'integrazione, così
 *  il motore funziona anche senza dashboard aperte. */
export class ElettrodomesticiCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: CardConfig = { type: "custom:elettrodomestici-card" };
  @state() private _info: ElettroInfo | null = null;
  @state() private _error = "";
  private _loading = false;

  setConfig(config: CardConfig): void {
    this._config = { ...config };
  }

  protected updated(): void {
    if (this.hass && !this._info && !this._loading) void this._load();
  }

  private async _load(): Promise<void> {
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
      this._loading = false;
    }
  }

  /** Dopo il salvataggio delle preferenze si rileggono le informazioni (nomi, tipi, elenco). */
  private _reloaded = async (): Promise<void> => {
    this._info = null;
    await this._load();
  };

  private _emit(config: CardConfig): void {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  private _onForm(ev: CustomEvent<{ value: Record<string, unknown> }>): void {
    ev.stopPropagation();
    const v = ev.detail.value;
    const next: CardConfig = { type: this._config.type };
    if (this._config.entry_id) next.entry_id = this._config.entry_id;
    if (typeof v.title === "string" && v.title.trim()) next.title = v.title;
    if (v.header === false) next.header = false;
    const cols = Math.round(Number(v.columns));
    if (Number.isFinite(cols) && cols >= 1) next.columns = Math.min(cols, 8);
    if (Array.isArray(v.appliances) && v.appliances.length > 0) next.appliances = v.appliances.map(String);
    this._emit(next);
  }

  private _items(): { value: string; label: string }[] {
    const i = this._info;
    if (!i) return [];
    return [...i.appliances, ...(i.robots ?? []), ...(i.humidistats ?? [])].map((a) => ({ value: a.key, label: a.name }));
  }

  private _schema(): FormSchema[] {
    const schema: FormSchema[] = [
      { name: "title", selector: { text: {} } },
      { name: "header", selector: { boolean: {} } },
      { name: "columns", selector: { number: { min: 0, max: 8, step: 1, mode: "box" } } },
    ];
    const items = this._items();
    if (items.length > 0) schema.push({ name: "appliances", selector: { select: { multiple: true, mode: "list", options: items } } });
    return schema;
  }

  private static _label(s: { name: string }): string {
    return (
      { title: "Titolo", header: "Mostra titolo e riepilogo", columns: "Colonne (0 = automatico)", appliances: "Elettrodomestici da mostrare (nessuno = tutti)" }[s.name] ?? s.name
    );
  }
  private static _help(s: { name: string }): string {
    return (
      {
        header: "Disattivalo per inserire la scheda dentro un'altra senza intestazione.",
        columns: "Numero massimo di colonne: si riduce da solo se la scheda è stretta (vista a sezioni o piccola).",
        appliances: "Per mostrare solo alcuni elettrodomestici in questa scheda; le dimensioni si regolano dalla scheda «Layout» di Home Assistant.",
      }[s.name] ?? ""
    );
  }

  render() {
    if (!this.hass) return nothing;
    const data = { title: this._config.title ?? "", header: this._config.header !== false, columns: this._config.columns ?? 0, appliances: this._config.appliances ?? [] };
    return html`
      <div class="wrap">
        <ha-form .hass=${this.hass} .data=${data} .schema=${this._schema()} .computeLabel=${ElettrodomesticiCardEditor._label} .computeHelper=${ElettrodomesticiCardEditor._help} @value-changed=${(e: CustomEvent<{ value: Record<string, unknown> }>) => this._onForm(e)}></ha-form>
        <div class="sec">Elettrodomestici e preferenze</div>
        <div class="hint">Elenco, sensori, soglie, prezzo dell'energia e notifiche. Sono salvate nell'integrazione (valgono per tutte le schede) e hanno il loro pulsante di salvataggio.</div>
        ${this._error ? html`<div class="errbox">${this._error}</div>` : nothing}
        ${this._info
          ? html`<elettro-prefs-panel .hass=${this.hass} .info=${this._info} @saved=${() => void this._reloaded()}></elettro-prefs-panel>`
          : this._error
            ? nothing
            : html`<div class="hint">Carico…</div>`}
      </div>`;
  }

  static styles = css`
    :host { display: block; }
    .wrap { display: flex; flex-direction: column; gap: 4px; color: var(--primary-text-color, #212121); }
    .sec { font-weight: 600; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--secondary-text-color, #727272); margin: 18px 0 2px; }
    .hint { font-size: 0.82rem; color: var(--secondary-text-color, #727272); margin-bottom: 8px; line-height: 1.35; }
    .errbox { margin: 6px 0; padding: 10px; border-radius: 10px; background: rgba(220, 38, 38, 0.1); color: #b91c1c; font-size: 0.88rem; }
  `;
}

if (!customElements.get("elettrodomestici-card-editor")) customElements.define("elettrodomestici-card-editor", ElettrodomesticiCardEditor);
