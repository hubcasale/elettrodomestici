import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { dialogStyles } from "./dialog-style";
import {
  TYPES, TYPE_ICON, TYPE_LABEL, appliancesError, energySensors, extraSensors, vacuumEntities, fmt, formatDuration, friendlyName, newAppliance, notifyServices,
  powerSensors, priceSensors, counters, statusSensors, guessOldPackage,
} from "./card-logic";
import type { ApplianceCfg, ApplianceType, ElettroInfo, HomeAssistant } from "./types";

type NumKey = "start_w" | "stop_w" | "start_delay" | "end_delay" | "min_cycle" | "heat_w" | "maint_cycles" | "alert_minutes";
const ADVANCED: { key: NumKey; label: string; unit: string; hint: string }[] = [
  { key: "start_w", label: "Si accende sopra", unit: "W", hint: "Potenza oltre la quale l'elettrodomestico risulta in funzione (più del consumo a riposo)." },
  { key: "stop_w", label: "Si spegne sotto", unit: "W", hint: "Potenza sotto la quale il ciclo può finire." },
  { key: "start_delay", label: "Conferma avvio dopo", unit: "s", hint: "Per ignorare i picchi brevi, per esempio quando si preme un tasto." },
  { key: "end_delay", label: "Conferma fine dopo", unit: "s", hint: "Quanto deve restare sotto la soglia: più lungo di qualsiasi pausa del programma." },
  { key: "min_cycle", label: "Ignora cicli più brevi di", unit: "s", hint: "I cicli più corti non si contano e non avvisano." },
  { key: "heat_w", label: "Riscaldamento sopra", unit: "W", hint: "Potenza della resistenza: serve a distinguere le fasi (lavaggio, risciacquo, asciugatura)." },
];

/** Preferenze: elenco degli elettrodomestici con sensori, soglie e avvisi; aggiunta guidata dal tipo; prezzo dell'energia e notifiche. */
export class ElettroSettingsDialog extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) info!: ElettroInfo;
  @property() openKey = "";
  @state() private _list: ApplianceCfg[] = [];
  @state() private _price = "0.30";
  @state() private _priceEntity = "";
  @state() private _notify: string[] = [];
  @state() private _open = "";
  @state() private _addType: ApplianceType | "" = "";
  @state() private _addEntity = "";
  @state() private _addName = "";
  @state() private _extra = "";
  @state() private _svc = "";
  @state() private _advanced = "";
  @state() private _imp: Record<string, { energy: string; counter: string; status: string; days: string; price: string; busy: boolean; msg: string; err: boolean }> = {};
  @state() private _busy = false;
  @state() private _error = "";
  private _onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") this._close();
  };

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("keydown", this._onKey);
    this._list = [...this.info.appliances, ...(this.info.robots ?? [])].map((a) => ({
      id: a.id, type: a.type, name: a.name, entity: a.entity, energy_entity: a.energy_entity, start_w: a.start_w, stop_w: a.stop_w,
      start_delay: a.start_delay, end_delay: a.end_delay, min_cycle: a.min_cycle, heat_w: a.heat_w, maint_cycles: a.maint_cycles,
      alert_minutes: a.alert_minutes, notify: a.notify, extras: a.extras.map((x) => ({ ...x })), maker: a.maker ?? null, maker_device: a.maker_device ?? null,
    }));
    this._price = String(this.info.price_kwh);
    this._priceEntity = this.info.price_entity;
    this._notify = [...this.info.notify_services];
    this._open = this.openKey;
    if (this._list.length === 0) this._addType = "lavatrice";
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._onKey);
  }
  private _close(): void {
    this.dispatchEvent(new CustomEvent("closed"));
    this.remove();
  }

  private _patch(id: string, p: Partial<ApplianceCfg>): void {
    this._list = this._list.map((a) => (a.id === id ? { ...a, ...p } : a));
  }
  private _remove(id: string): void {
    this._list = this._list.filter((a) => a.id !== id);
    if (this._open === id) this._open = "";
  }
  private _reset(a: ApplianceCfg): void {
    const d = this.info.types[a.type];
    this._patch(a.id, { start_w: d.start_w, stop_w: d.stop_w, start_delay: d.start_delay, end_delay: d.end_delay, min_cycle: d.min_cycle, heat_w: d.heat_w });
  }

  private _add(): void {
    const type = this._addType;
    const entity = this._addEntity.trim();
    if (!type) return;
    const robot = this.info.types[type]?.robot === true;
    if (!/^[a-z_]+\.[a-z0-9_]+$/.test(entity) || (robot && !entity.startsWith("vacuum."))) {
      this._error = robot ? "Scegli dall'elenco il robot (un'entità vacuum.…)." : "Scegli dall'elenco il sensore di potenza della presa.";
      return;
    }
    if (this._list.some((a) => a.entity === entity)) {
      this._error = "Questo sensore è già usato da un altro elettrodomestico.";
      return;
    }
    const a = newAppliance(type, entity, this._addName.trim(), this.info.types[type], this._list.map((x) => x.id));
    this._list = [...this._list, a];
    this._open = a.id;
    this._addType = "";
    this._addEntity = "";
    this._addName = "";
    this._error = "";
  }

  private async _save(): Promise<void> {
    const err = appliancesError(this._list);
    if (err) {
      this._error = err;
      return;
    }
    const price = Number(this._price.replace(",", "."));
    if (!Number.isFinite(price) || price < 0 || price > 10) {
      this._error = "Il prezzo dell'energia deve essere un numero tra 0 e 10 €/kWh.";
      return;
    }
    this._busy = true;
    this._error = "";
    try {
      await this.hass.callWS({
        type: "elettrodomestici/update", entry_id: this.info.entry_id, appliances: this._list, price_kwh: price,
        price_entity: this._priceEntity.trim(), notify_services: this._notify,
      });
      this.dispatchEvent(new CustomEvent("saved"));
      this._close();
    } catch (e) {
      const m = e instanceof Error ? e.message : (e as { message?: string })?.message ?? String(e);
      this._error = `Impossibile salvare: ${m}`;
    } finally {
      this._busy = false;
    }
  }

  private _impState(a: ApplianceCfg) {
    if (!this._imp[a.id]) {
      const g = guessOldPackage(this.hass.states, a.type);
      this._imp[a.id] = { energy: a.energy_entity ?? "", counter: g.counter, status: g.status, days: "730", price: "", busy: false, msg: "", err: false };
    }
    return this._imp[a.id];
  }
  private _setImp(id: string, p: Partial<{ energy: string; counter: string; status: string; days: string; price: string; busy: boolean; msg: string; err: boolean }>): void {
    this._imp = { ...this._imp, [id]: { ...this._imp[id], ...p } };
  }

  /** Porta nelle statistiche il passato di un vecchio pacchetto (si può fare solo per un elettrodomestico già salvato). */
  private async _import(a: ApplianceCfg): Promise<void> {
    const s = this._impState(a);
    const days = Number(s.days.replace(",", "."));
    const price = s.price.trim() ? Number(s.price.replace(",", ".")) : undefined;
    if (!Number.isFinite(days) || days < 1 || days > 3650 || (price !== undefined && (!Number.isFinite(price) || price < 0 || price > 10))) {
      this._setImp(a.id, { msg: "Controlla i giorni (1-3650) e il prezzo.", err: true });
      return;
    }
    this._setImp(a.id, { busy: true, msg: "", err: false });
    try {
      const r = await this.hass.callWS<{ days_written: number; energy_days: number; kwh: number; cycles: number; baseline: number | null; runtime_days: number; skipped_days?: number }>({
        type: "elettrodomestici/import_history", entry_id: this.info.entry_id, key: a.id, days,
        ...(s.energy.trim() ? { energy_entity: s.energy.trim() } : {}), ...(s.counter.trim() ? { counter_entity: s.counter.trim() } : {}),
        ...(s.status.trim() ? { status_entity: s.status.trim() } : {}), ...(price !== undefined ? { price } : {}),
      });
      const parts = [`${r.days_written} giorni importati`];
      if (r.energy_days) parts.push(`${fmt(r.kwh, 1)} kWh`);
      if (r.cycles || r.baseline) parts.push(`${fmt(r.cycles + (r.baseline ?? 0))} cicli (${fmt(r.baseline ?? 0)} precedenti al recorder, solo nel totale)`);
      if (r.runtime_days) parts.push(`funzionamento di ${r.runtime_days} giorni`);
      if (r.skipped_days) parts.push(`${r.skipped_days} giorni scartati (valori impossibili del contatore)`);
      this._setImp(a.id, { busy: false, msg: `${parts.join(" · ")}.`, err: false });
      this.dispatchEvent(new CustomEvent("saved"));
    } catch (e) {
      const m = e instanceof Error ? e.message : (e as { message?: string })?.message ?? String(e);
      this._setImp(a.id, { busy: false, msg: `Importazione non riuscita: ${m}`, err: true });
    }
  }

  private _importBox(a: ApplianceCfg) {
    const s = this._impState(a);
    const saved = this.info.appliances.some((x) => x.id === a.id);
    return html`
      <button class="adv" aria-expanded=${this._advanced === `imp-${a.id}` ? "true" : "false"} @click=${() => (this._advanced = this._advanced === `imp-${a.id}` ? "" : `imp-${a.id}`)}>${this._advanced === `imp-${a.id}` ? "▾" : "▸"} Importa lo storico del vecchio pacchetto</button>
      ${this._advanced === `imp-${a.id}`
        ? html`<div class="impbox">
            ${saved ? nothing : html`<div class="hint">Salva prima le preferenze: l'importazione si fa su un elettrodomestico già salvato.</div>`}
            <label class="f">Contatore di energia della presa (kWh)
              <input class="txt" list=${`dl-ie-${a.id}`} placeholder="sensor.…_energia" .value=${s.energy} @input=${(e: Event) => this._setImp(a.id, { energy: (e.target as HTMLInputElement).value })} />
              <datalist id=${`dl-ie-${a.id}`}>${energySensors(this.hass.states).map((c) => html`<option value=${c.id}>${c.name}</option>`)}</datalist>
              <span class="hint">È quello che usava il vecchio pacchetto: le sue statistiche a lungo termine danno l'energia giorno per giorno, anche di anni fa.</span></label>
            <label class="f">Contatore dei cicli (facoltativo)
              <input class="txt" list=${`dl-ic-${a.id}`} placeholder="counter.cicli_…" .value=${s.counter} @input=${(e: Event) => this._setImp(a.id, { counter: (e.target as HTMLInputElement).value })} />
              <datalist id=${`dl-ic-${a.id}`}>${counters(this.hass.states).map((c) => html`<option value=${c.id}>${c.name}</option>`)}</datalist>
              <span class="hint">I cicli per giorno si ricostruiscono per quanto il recorder conserva; il resto entra nel totale. Vale anche come punto di partenza della manutenzione.</span></label>
            <label class="f">Sensore di stato on/off (facoltativo)
              <input class="txt" list=${`dl-is-${a.id}`} placeholder="binary_sensor.washing_machine_status" .value=${s.status} @input=${(e: Event) => this._setImp(a.id, { status: (e.target as HTMLInputElement).value })} />
              <datalist id=${`dl-is-${a.id}`}>${statusSensors(this.hass.states).map((c) => html`<option value=${c.id}>${c.name}</option>`)}</datalist>
              <span class="hint">Per le ore di funzionamento, sempre per quanto conserva il recorder.</span></label>
            <div class="two">
              <label class="f">Quanti giorni indietro<span class="numrow"><input class="num" inputmode="numeric" .value=${s.days} @input=${(e: Event) => this._setImp(a.id, { days: (e.target as HTMLInputElement).value })} /><span class="u">giorni</span></span></label>
              <label class="f">Prezzo per il costo (€/kWh)<span class="numrow"><input class="num" inputmode="decimal" placeholder=${this._price} .value=${s.price} @input=${(e: Event) => this._setImp(a.id, { price: (e.target as HTMLInputElement).value })} /></span>
                <span class="hint">Vuoto = il prezzo attuale. Il vecchio pacchetto non salvava il costo: si ricalcola.</span></label>
            </div>
            <div class="hint">I giorni già misurati da questa integrazione non vengono toccati. Si può ripetere senza doppioni.</div>
            <button class="btn primary" ?disabled=${!saved || s.busy || (!s.energy.trim() && !s.counter.trim() && !s.status.trim())} @click=${() => void this._import(a)}>${s.busy ? "Importo…" : "Importa lo storico"}</button>
            ${s.msg ? html`<div class=${s.err ? "err" : "ok"}>${s.msg}</div>` : nothing}
          </div>`
        : nothing}`;
  }

  private _num(a: ApplianceCfg, key: NumKey, label: string, unit: string, hint: string) {
    return html`<label class="f">${label}
      <span class="numrow"><input class="num" inputmode="decimal" .value=${String(a[key])} @change=${(e: Event) => {
        const n = Number((e.target as HTMLInputElement).value.replace(",", "."));
        if (Number.isFinite(n) && n >= 0) this._patch(a.id, { [key]: n } as Partial<ApplianceCfg>);
        else (e.target as HTMLInputElement).value = String(a[key]);
      }} /><span class="u">${unit}</span></span>
      <span class="hint">${hint}</span></label>`;
  }

  /** Spunta per prendere stato, fase, programma e tempo rimanente dall'integrazione del costruttore (per ora Electrolux); i consumi restano quelli della presa. */
  private _makerBox(a: ApplianceCfg) {
    const devices = this.info.makers ?? [];
    const on = !!a.maker && !!a.maker_device;
    const current = devices.find((x) => x.device_id === a.maker_device);
    return html`<div class="row"><div class="t"><div class="lab">Usa l'integrazione del costruttore</div>
        <div class="hint">${devices.length === 0
          ? "Nessun dispositivo Electrolux trovato in Home Assistant (installa e configura l'integrazione Electrolux)."
          : "Stato, fase, programma e tempo rimanente arrivano dall'integrazione Electrolux (solo mentre l'apparecchio è acceso); consumi e cicli restano quelli della presa."}</div></div>
        <button class=${on ? "sw on" : "sw"} role="switch" aria-checked=${on ? "true" : "false"} aria-label="Usa l'integrazione del costruttore" ?disabled=${devices.length === 0 && !on}
          @click=${() => (on ? this._patch(a.id, { maker: null, maker_device: null }) : devices[0] && this._patch(a.id, { maker: devices[0].maker, maker_device: devices[0].device_id }))}><span class="knob"></span></button></div>
      ${on
        ? html`<label class="f">Dispositivo
            <select class="txt" @change=${(e: Event) => {
              const d = devices.find((x) => x.device_id === (e.target as HTMLSelectElement).value);
              if (d) this._patch(a.id, { maker: d.maker, maker_device: d.device_id });
            }}>
              ${devices.map((d) => html`<option value=${d.device_id} ?selected=${d.device_id === a.maker_device}>${d.label} · ${d.name}</option>`)}
              ${current ? nothing : html`<option value=${a.maker_device ?? ""} selected>${a.maker_device} (non trovato)</option>`}
            </select></label>`
        : nothing}`;
  }

  private _robotEditor(a: ApplianceCfg) {
    const live = this.hass.states[a.entity];
    const exclude = this._list.filter((x) => x.id !== a.id).map((x) => x.entity);
    return html`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:robot-vacuum"></ha-icon>Robot: <b>${friendlyName(this.hass.states, a.entity)}</b> <code>${a.entity}</code> · ora ${live ? live.state : "non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${a.name} @change=${(e: Event) => this._patch(a.id, { name: (e.target as HTMLInputElement).value.trim() || a.name })} /></label>
        <label class="f">Entità del robot
          <input class="txt" list=${`dl-rb-${a.id}`} .value=${a.entity} @change=${(e: Event) => this._patch(a.id, { entity: (e.target as HTMLInputElement).value.trim() })} />
          <datalist id=${`dl-rb-${a.id}`}>${vacuumEntities(this.hass.states, exclude).map((c) => html`<option value=${c.id}>${c.name}</option>`)}</datalist>
          <span class="hint">Comandi, mappa, stanze, consumabili e base si ricavano da sole dall'integrazione del robot (per ora provata con Dreame).</span></label>
        <button class="btn del" @click=${() => this._remove(a.id)}>Togli dall'elenco</button>
      </div>`;
  }

  private _editor(a: ApplianceCfg) {
    if (this.info.types[a.type]?.robot) return this._robotEditor(a);
    const d = this.info.types[a.type];
    const live = this.hass.states[a.entity];
    const exclude = this._list.filter((x) => x.id !== a.id).map((x) => x.entity);
    return html`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:power-plug"></ha-icon>Presa: <b>${friendlyName(this.hass.states, a.entity)}</b> <code>${a.entity}</code> · ora ${live ? `${live.state} ${String(live.attributes.unit_of_measurement ?? "")}`.trim() : "non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${a.name} @change=${(e: Event) => this._patch(a.id, { name: (e.target as HTMLInputElement).value.trim() || a.name })} /></label>
        <label class="f">Sensore di potenza della presa (W)
          <input class="txt" list=${`dl-pw-${a.id}`} .value=${a.entity} @change=${(e: Event) => this._patch(a.id, { entity: (e.target as HTMLInputElement).value.trim() })} />
          <datalist id=${`dl-pw-${a.id}`}>${powerSensors(this.hass.states, exclude).map((c) => html`<option value=${c.id}>${c.name}</option>`)}</datalist></label>
        <label class="f">Contatore di energia della presa (facoltativo)
          <input class="txt" list=${`dl-en-${a.id}`} placeholder="sensor.…_energia" .value=${a.energy_entity ?? ""} @change=${(e: Event) => this._patch(a.id, { energy_entity: (e.target as HTMLInputElement).value.trim() || null })} />
          <datalist id=${`dl-en-${a.id}`}>${energySensors(this.hass.states).map((c) => html`<option value=${c.id}>${c.name}</option>`)}</datalist>
          <span class="hint">Se manca, l'energia si ricava dalla potenza. Con il contatore della presa è più precisa.</span></label>

        ${this._makerBox(a)}

        <div class="f">Dispositivi collegati (facoltativi)
          <div class="chips">
            ${a.extras.map((x) => html`<span class="tag"><span>${x.label || friendlyName(this.hass.states, x.entity)}</span><button aria-label=${`Togli ${x.entity}`} @click=${() => this._patch(a.id, { extras: a.extras.filter((y) => y.entity !== x.entity) })}>✕</button></span>`)}
            ${a.extras.length === 0 ? html`<span class="hint">Nessuno</span>` : nothing}
          </div>
          <div class="addrow">
            <input class="txt" list=${`dl-ex-${a.id}`} placeholder="sensor.programma_asciugatrice" .value=${this._extra} @input=${(e: Event) => (this._extra = (e.target as HTMLInputElement).value)} />
            <datalist id=${`dl-ex-${a.id}`}>${extraSensors(this.hass.states, a.extras.map((x) => x.entity)).map((c) => html`<option value=${c.id}>${c.name}</option>`)}</datalist>
            <button class="btn" ?disabled=${!this._extra.trim()} @click=${() => {
              const id = this._extra.trim();
              if (/^[a-z_]+\.[a-z0-9_]+$/.test(id) && !a.extras.some((y) => y.entity === id)) this._patch(a.id, { extras: [...a.extras, { entity: id, label: "" }] });
              this._extra = "";
            }}>Aggiungi</button>
          </div>
          <span class="hint">Per esempio programma, tempo rimanente o stato dell'integrazione del costruttore: si vedono sulla scheda e nelle statistiche.</span>
        </div>

        ${d.has_finished
          ? html`<div class="row"><div class="t"><div class="lab">Avvisa a fine ciclo</div><div class="hint">Manda la notifica ai servizi scelti qui sotto e genera l'evento <code>elettrodomestici_ciclo_terminato</code>.</div></div>
              <button class=${a.notify ? "sw on" : "sw"} role="switch" aria-checked=${a.notify ? "true" : "false"} aria-label="Avvisa a fine ciclo" @click=${() => this._patch(a.id, { notify: !a.notify })}><span class="knob"></span></button></div>`
          : html`<div class="row"><div class="t"><div class="lab">Avvisa se resta acceso a lungo</div><div class="hint">Notifica e evento <code>elettrodomestici_avviso</code>.</div></div>
              <button class=${a.notify ? "sw on" : "sw"} role="switch" aria-checked=${a.notify ? "true" : "false"} aria-label="Avvisa se resta acceso" @click=${() => this._patch(a.id, { notify: !a.notify })}><span class="knob"></span></button></div>`}
        <div class="two">
          ${this._num(a, "alert_minutes", "Avviso se in funzione da più di", "min", "0 = nessun avviso.")}
          ${d.maint_label && d.has_finished ? this._num(a, "maint_cycles", `Manutenzione ogni`, "cicli", `${d.maint_label}. 0 = non seguirla.`) : nothing}
        </div>

        <button class="adv" aria-expanded=${this._advanced === a.id ? "true" : "false"} @click=${() => (this._advanced = this._advanced === a.id ? "" : a.id)}>${this._advanced === a.id ? "▾" : "▸"} Soglie e tempi (avanzate)</button>
        ${this._advanced === a.id
          ? html`<div class="two">${ADVANCED.filter((x) => x.key !== "heat_w" || d.phases.length > 1).map((x) => this._num(a, x.key, x.label, x.unit, x.hint))}</div>
              <button class="btn" @click=${() => this._reset(a)}>Ripristina i valori predefiniti</button>`
          : nothing}
        ${this._importBox(a)}
        <button class="btn del" @click=${() => this._remove(a.id)}>Togli dall'elenco</button>
      </div>`;
  }

  render() {
    if (!this.info) return nothing;
    const err = appliancesError(this._list);
    const services = notifyServices(this.hass.services).filter((s) => !this._notify.includes(s));
    const used = this._list.map((a) => a.entity);
    const def = this._addType ? this.info.types[this._addType] : null;
    return html`
      <div class="backdrop" @click=${(e: Event) => e.target === e.currentTarget && this._close()}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Preferenze elettrodomestici">
          <div class="head"><div class="title">Preferenze degli elettrodomestici</div><button class="x" aria-label="Chiudi" @click=${() => this._close()}>✕</button></div>
          <div class="body">
            <div class="sec">Elettrodomestici</div>
            ${this._list.length === 0 ? html`<div class="empty">Nessun elettrodomestico: aggiungine uno qui sotto.</div>` : nothing}
            ${this._list.map(
              (a) => html`
                <div class="item">
                  <button class="head2" aria-expanded=${this._open === a.id ? "true" : "false"} @click=${() => (this._open = this._open === a.id ? "" : a.id)}>
                    <ha-icon icon=${TYPE_ICON[a.type]}></ha-icon>
                    <span class="nm">${a.name}<span class="eid">${a.entity}</span></span>
                    <span class="meta">${TYPE_LABEL[a.type]}</span>
                    <span class="chev">${this._open === a.id ? "▾" : "▸"}</span>
                  </button>
                  ${this._open === a.id ? this._editor(a) : nothing}
                </div>`,
            )}

            <div class="sec">Aggiungi un elettrodomestico</div>
            <div class="types">
              ${TYPES.map((t) => html`<button class=${this._addType === t ? "type on" : "type"} aria-pressed=${this._addType === t ? "true" : "false"} @click=${() => (this._addType = this._addType === t ? "" : t)}><ha-icon icon=${TYPE_ICON[t]}></ha-icon>${TYPE_LABEL[t]}</button>`)}
            </div>
            ${def
              ? html`<div class="addbox">
                  ${def.robot
                    ? html`<label class="f">Robot (entità vacuum)
                        <input class="txt" list="dl-add" placeholder="vacuum.…" .value=${this._addEntity} @input=${(e: Event) => (this._addEntity = (e.target as HTMLInputElement).value)} />
                        <datalist id="dl-add">${vacuumEntities(this.hass.states, used).map((c) => html`<option value=${c.id}>${c.name}</option>`)}</datalist></label>`
                    : html`<label class="f">Sensore di potenza della presa (W)
                        <input class="txt" list="dl-add" placeholder="sensor.presa_…_potenza" .value=${this._addEntity} @input=${(e: Event) => (this._addEntity = (e.target as HTMLInputElement).value)} />
                        <datalist id="dl-add">${powerSensors(this.hass.states, used).map((c) => html`<option value=${c.id}>${c.name}</option>`)}</datalist></label>`}
                  <label class="f">Nome (facoltativo)<input class="txt" placeholder=${def.label} .value=${this._addName} @input=${(e: Event) => (this._addName = (e.target as HTMLInputElement).value)} /></label>
                  ${def.robot
                    ? html`<div class="hint">Sulla scheda compare con stato, batteria e comandi rapidi; toccandolo si apre la gestione completa (stanze, impostazioni, base, consumabili).</div>`
                    : html`<div class="hint">Parte oltre ${def.start_w} W${def.phases.length > 1 ? `, fasi: ${def.phases.join(" → ")}` : ""}${def.has_finished ? `, finisce dopo ${formatDuration(def.end_delay)} sotto ${def.stop_w} W` : ""}. Le soglie si possono cambiare dopo.</div>`}
                  <button class="btn primary" ?disabled=${!this._addEntity.trim()} @click=${() => this._add()}>Aggiungi ${def.label.toLowerCase()}</button>
                </div>`
              : nothing}

            <div class="sec">Costo dell'energia</div>
            <label class="f">Prezzo (€/kWh)
              <input class="num wide" inputmode="decimal" .value=${this._price} @input=${(e: Event) => (this._price = (e.target as HTMLInputElement).value)} /></label>
            <label class="f">Oppure un sensore con il prezzo attuale (facoltativo)
              <input class="txt" list="dl-price" placeholder="sensor.prezzo_energia" .value=${this._priceEntity} @input=${(e: Event) => (this._priceEntity = (e.target as HTMLInputElement).value)} />
              <datalist id="dl-price">${priceSensors(this.hass.states).map((c) => html`<option value=${c.id}>${c.name}</option>`)}</datalist>
              <span class="hint">Se c'è e ha un valore, vale al posto del prezzo fisso.</span></label>

            <div class="sec">Notifiche</div>
            <div class="chips">
              ${this._notify.map((s) => html`<span class="tag"><span>${s}</span><button aria-label=${`Togli ${s}`} @click=${() => (this._notify = this._notify.filter((x) => x !== s))}>✕</button></span>`)}
              ${this._notify.length === 0 ? html`<span class="hint">Nessun servizio: si genera solo l'evento nel bus di Home Assistant.</span>` : nothing}
            </div>
            <div class="addrow">
              <input class="txt" list="dl-svc" placeholder="notify.mobile_app_telefono" .value=${this._svc} @input=${(e: Event) => (this._svc = (e.target as HTMLInputElement).value)} />
              <datalist id="dl-svc">${services.map((s) => html`<option value=${s}></option>`)}</datalist>
              <button class="btn" ?disabled=${!/^notify\.[a-z0-9_]+$/.test(this._svc.trim())} @click=${() => {
                const s = this._svc.trim();
                if (!this._notify.includes(s)) this._notify = [...this._notify, s];
                this._svc = "";
              }}>Aggiungi</button>
            </div>

            ${err ? html`<div class="err">${err}</div>` : nothing}
            ${this._error ? html`<div class="err">${this._error}</div>` : nothing}
          </div>
          <div class="foot">
            <button class="btn" @click=${() => this._close()}>Annulla</button>
            <button class="btn primary" ?disabled=${this._busy || !!err} @click=${() => void this._save()}>Salva</button>
          </div>
        </div>
      </div>`;
  }

  static styles = [
    dialogStyles,
    css`
      .sec { font-weight: 600; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--secondary-text-color, #727272); margin: 16px 0 6px; }
      .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 0; }
      .t { flex: 1; min-width: 0; } .lab { font-size: 0.95rem; }
      .hint { font-size: 0.78rem; color: var(--secondary-text-color, #727272); margin-top: 2px; line-height: 1.3; }
      .hint code, .lab code { font-size: 0.74rem; }
      .sw { flex: none; width: 52px; height: 30px; border-radius: 15px; border: 0; background: var(--disabled-color, #bdbdbd); position: relative; cursor: pointer; transition: background 0.2s; }
      .sw.on { background: var(--primary-color, #03a9f4); }
      .sw .knob { position: absolute; top: 3px; left: 3px; width: 24px; height: 24px; border-radius: 50%; background: #fff; transition: transform 0.2s; }
      .sw.on .knob { transform: translateX(22px); }
      .item { border: 1px solid var(--divider-color, #ddd); border-radius: 12px; margin-bottom: 8px; overflow: hidden; }
      .head2 { width: 100%; display: flex; align-items: center; gap: 10px; padding: 12px 14px; min-height: 48px; background: transparent; border: 0; color: inherit; cursor: pointer; text-align: left; font-size: 0.95rem; }
      .nm { flex: 1; font-weight: 500; display: flex; flex-direction: column; min-width: 0; }
      .eid { font-weight: 400; font-size: 0.75rem; color: var(--secondary-text-color, #727272); overflow: hidden; text-overflow: ellipsis; }
      .meta, .chev { color: var(--secondary-text-color, #727272); font-size: 0.85rem; }
      .link { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-top: 12px; padding: 10px 12px; border-radius: 10px; background: var(--secondary-background-color, #f2f2f2); font-size: 0.85rem; }
      .link code { font-size: 0.78rem; color: var(--secondary-text-color, #727272); }
      .ed { padding: 4px 14px 14px; border-top: 1px solid var(--divider-color, #eee); }
      .f { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; font-size: 0.85rem; color: var(--secondary-text-color, #727272); }
      .two { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0 14px; }
      .txt { box-sizing: border-box; width: 100%; padding: 11px 12px; border-radius: 10px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color, #212121); font-size: 0.95rem; min-height: 44px; }
      .numrow { display: flex; align-items: center; gap: 8px; }
      .num { width: 96px; text-align: center; padding: 11px 6px; border-radius: 10px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color, #212121); font-size: 1rem; min-height: 44px; box-sizing: border-box; }
      .num.wide { width: 140px; }
      .u { color: var(--secondary-text-color, #727272); }
      .chips { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
      .tag { display: inline-flex; align-items: center; gap: 6px; min-height: 36px; padding: 0 6px 0 12px; border-radius: 18px; background: var(--secondary-background-color, #eee); color: var(--primary-text-color, #212121); font-size: 0.85rem; }
      .tag button { border: 0; background: transparent; color: inherit; width: 30px; height: 30px; border-radius: 15px; cursor: pointer; }
      .addrow { display: flex; gap: 8px; } .addrow .txt { flex: 1; }
      .adv { margin-top: 12px; border: 0; background: transparent; color: var(--primary-color, #03a9f4); font-size: 0.9rem; cursor: pointer; padding: 10px 0; min-height: 44px; text-align: left; }
      .del { margin-top: 14px; color: #b91c1c; }
      .types { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
      .type { display: flex; align-items: center; gap: 8px; min-height: 52px; padding: 0 14px; border-radius: 12px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; font-size: 0.92rem; cursor: pointer; }
      .type.on { background: var(--primary-color, #03a9f4); color: #fff; border-color: transparent; }
      .impbox { padding: 0 12px 12px; border-radius: 12px; background: var(--secondary-background-color, #f2f2f2); margin-bottom: 6px; }
      .impbox .btn { margin-top: 12px; min-height: 44px; }
      .addbox { margin-top: 10px; padding: 4px 14px 14px; border-radius: 12px; background: var(--secondary-background-color, #f2f2f2); }
      .addbox .btn { margin-top: 12px; min-height: 44px; }
      ha-icon { --mdc-icon-size: 22px; }
    `,
  ];
}

if (!customElements.get("elettro-settings-dialog")) customElements.define("elettro-settings-dialog", ElettroSettingsDialog);
