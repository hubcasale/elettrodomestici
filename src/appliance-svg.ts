// Illustrazioni degli elettrodomestici (viewBox 120x140). Funzioni pure che restituiscono il testo SVG:
// si provano con node:test e si usano dentro Lit con unsafeSVG. Le animazioni sono CSS dentro l'SVG e si fermano
// con prefers-reduced-motion.
import type { ApplianceType, MachineState } from "./types";

const BODY = "#e4e7ec";
const BODY_DARK = "#c3c9d3";
const PANEL = "#9aa3b2";
const GLASS = "#1d2b3b";

const STYLE = `<style>
.sp{transform-box:fill-box;transform-origin:center;animation:sp 2.6s linear infinite}
.spf{transform-box:fill-box;transform-origin:center;animation:sp 1.3s linear infinite}
.bl{animation:bl 1.4s ease-in-out infinite}
.fl{animation:fl 1.1s ease-in-out infinite alternate}
.dr{animation:dr 1.2s linear infinite}
.sw{transform-box:fill-box;transform-origin:center;animation:sw 2.2s ease-in-out infinite alternate}
@keyframes sp{to{transform:rotate(360deg)}}
@keyframes bl{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes fl{from{opacity:.55}to{opacity:1}}
@keyframes dr{from{transform:translateY(-4px);opacity:0}30%{opacity:1}to{transform:translateY(8px);opacity:0}}
@keyframes sw{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
@media (prefers-reduced-motion:reduce){.sp,.spf,.bl,.fl,.dr,.sw{animation:none}}
</style>`;

function led(state: MachineState, cx: number, cy: number): string {
  const c = state === "in_funzione" ? "#f59e0b" : state === "terminato" ? "#16a34a" : state === "non_disponibile" ? "#dc2626" : "#7b8494";
  const blink = state === "in_funzione" ? ' class="bl"' : "";
  return `<circle cx="${cx}" cy="${cy}" r="3" fill="${c}"${blink}/>`;
}

function display(state: MachineState, x: number, y: number, w: number): string {
  const on = state === "in_funzione" || state === "terminato";
  const col = state === "terminato" ? "#4ade80" : "#fbbf24";
  return `<rect x="${x}" y="${y}" width="${w}" height="9" rx="2" fill="${on ? "#10161d" : "#2a3340"}"/>` +
    (on ? `<rect x="${x + 3}" y="${y + 3.5}" width="${w * (state === "terminato" ? 0.7 : 0.45)}" height="2" rx="1" fill="${col}"${state === "in_funzione" ? ' class="bl"' : ""}/>` : "");
}

function frameFront(state: MachineState, tall = 120): string {
  return `<rect x="12" y="8" width="96" height="${tall}" rx="9" fill="${BODY}" stroke="${BODY_DARK}" stroke-width="2"/>
  <rect x="12" y="8" width="96" height="22" rx="9" fill="${PANEL}" opacity=".35"/>
  ${display(state, 20, 14, 38)}${led(state, 70, 18)}
  <circle cx="86" cy="18" r="6" fill="#f4f5f7" stroke="${BODY_DARK}"/><line x1="86" y1="18" x2="86" y2="13.5" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round"/>`;
}

function washer(state: MachineState, dryer: boolean): string {
  const on = state === "in_funzione";
  const water = dryer ? "#fb923c" : "#60a5fa";
  const cloth = dryer ? "#f9a8d4" : "#93c5fd";
  const fill = on ? water : state === "terminato" ? "#86efac" : "#3b4a5c";
  const drum = `<g class="${on ? "sp" : ""}"><circle cx="60" cy="82" r="24" fill="${GLASS}"/>
    <path d="M44 82 a16 16 0 0 1 32 0 z" fill="${fill}" opacity=".55"/>
    <circle cx="52" cy="76" r="6" fill="${cloth}" opacity="${on ? 0.95 : 0.55}"/><circle cx="68" cy="86" r="7" fill="${dryer ? "#fde68a" : "#bfdbfe"}" opacity="${on ? 0.95 : 0.5}"/><circle cx="58" cy="92" r="4" fill="${cloth}" opacity="${on ? 0.9 : 0.5}"/></g>`;
  const heat = dryer && on ? `<g class="fl" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round"><path d="M44 52c-3 3 3 4 0 8"/><path d="M60 52c-3 3 3 4 0 8"/><path d="M76 52c-3 3 3 4 0 8"/></g>` : "";
  const bubbles = !dryer && on ? `<g fill="#fff" opacity=".7"><circle class="bl" cx="50" cy="94" r="2"/><circle class="bl" cx="64" cy="98" r="1.6"/><circle class="bl" cx="72" cy="90" r="2"/></g>` : "";
  return `${frameFront(state)}
  <circle cx="60" cy="82" r="32" fill="#f4f5f7" stroke="${BODY_DARK}" stroke-width="3"/><circle cx="60" cy="82" r="28" fill="#aeb6c3"/>
  ${drum}${bubbles}${heat}
  <path d="M40 66 a28 28 0 0 1 28 -9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
  ${state === "terminato" ? `<circle cx="60" cy="82" r="14" fill="#16a34a" opacity=".92"/><path d="M53 82l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>` : ""}`;
}

function dishwasher(state: MachineState): string {
  const on = state === "in_funzione";
  const drops = on
    ? `<g fill="#7dd3fc"><circle class="dr" cx="40" cy="62" r="2"/><circle class="dr" cx="56" cy="60" r="2" style="animation-delay:.3s"/><circle class="dr" cx="72" cy="62" r="2" style="animation-delay:.6s"/><circle class="dr" cx="86" cy="60" r="2" style="animation-delay:.9s"/></g>`
    : "";
  return `${frameFront(state)}
  <rect x="22" y="40" width="76" height="70" rx="5" fill="${on ? "#1a3b57" : GLASS}" stroke="${BODY_DARK}" stroke-width="2"/>
  <g stroke="#7b8ba0" stroke-width="2" opacity=".85"><line x1="30" y1="58" x2="90" y2="58"/><line x1="30" y1="80" x2="90" y2="80"/></g>
  <g fill="#cbd5e1" opacity=".9"><rect x="34" y="62" width="9" height="16" rx="2"/><rect x="50" y="62" width="9" height="16" rx="2"/><rect x="66" y="62" width="9" height="16" rx="2"/><rect x="42" y="84" width="14" height="16" rx="3"/><rect x="62" y="84" width="14" height="16" rx="3"/></g>
  ${drops}
  <rect x="38" y="112" width="44" height="6" rx="3" fill="#f4f5f7" stroke="${BODY_DARK}"/>
  ${on ? `<g class="fl" opacity=".35"><rect x="22" y="40" width="76" height="70" rx="5" fill="#7dd3fc"/></g>` : ""}
  ${state === "terminato" ? `<circle cx="60" cy="75" r="14" fill="#16a34a" opacity=".92"/><path d="M53 75l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>` : ""}`;
}

function oven(state: MachineState): string {
  const on = state === "in_funzione";
  const glow = on ? `<rect x="24" y="50" width="72" height="50" rx="4" fill="#f97316" opacity=".3" class="fl"/>` : "";
  const coil = on ? "#fb923c" : "#4b5563";
  return `<rect x="12" y="8" width="96" height="124" rx="9" fill="${BODY}" stroke="${BODY_DARK}" stroke-width="2"/>
  <rect x="12" y="8" width="96" height="30" rx="9" fill="${PANEL}" opacity=".35"/>
  ${display(state, 46, 13, 28)}${led(state, 82, 18)}
  <g fill="#f4f5f7" stroke="${BODY_DARK}"><circle cx="26" cy="22" r="6"/><circle cx="94" cy="22" r="6"/></g>
  <rect x="20" y="44" width="80" height="64" rx="5" fill="#2a3340" stroke="${BODY_DARK}" stroke-width="2"/>
  <rect x="24" y="50" width="72" height="50" rx="4" fill="#161d26"/>${glow}
  <g stroke="${coil}" stroke-width="2.2" stroke-linecap="round" ${on ? 'class="fl"' : ""}><path d="M30 56h60"/><path d="M30 94h60"/></g>
  <g stroke="#7b8ba0" stroke-width="1.6" opacity=".9"><line x1="30" y1="70" x2="90" y2="70"/><line x1="30" y1="82" x2="90" y2="82"/></g>
  <rect x="26" y="114" width="68" height="6" rx="3" fill="#f4f5f7" stroke="${BODY_DARK}"/>
  ${state === "in_funzione" ? `<g fill="none" stroke="#fb923c" stroke-width="1.6" stroke-linecap="round" class="fl"><path d="M44 36c-3 3 3 4 0 8"/><path d="M60 36c-3 3 3 4 0 8"/><path d="M76 36c-3 3 3 4 0 8"/></g>` : ""}`;
}

function fridge(state: MachineState): string {
  const on = state === "in_funzione";
  const snow = on
    ? `<g class="sw" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"><path d="M60 24v22M49 30l22 10M71 30L49 40"/><circle cx="60" cy="35" r="2.4" fill="#38bdf8" stroke="none"/></g>`
    : `<g stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity=".6"><path d="M60 26v18M51 31l18 8M69 31L51 39"/></g>`;
  return `<rect x="26" y="6" width="68" height="128" rx="8" fill="${BODY}" stroke="${BODY_DARK}" stroke-width="2"/>
  <line x1="26" y1="50" x2="94" y2="50" stroke="${BODY_DARK}" stroke-width="2.4"/>
  ${snow}
  <rect x="32" y="22" width="6" height="22" rx="3" fill="#8b95a3"/><rect x="32" y="58" width="6" height="40" rx="3" fill="#8b95a3"/>
  ${display(state, 52, 60, 34)}${led(state, 80, 80)}
  <rect x="48" y="94" width="38" height="32" rx="4" fill="${PANEL}" opacity=".22"/>
  ${on ? `<g fill="#38bdf8" opacity=".9"><circle class="bl" cx="56" cy="104" r="1.8"/><circle class="bl" cx="70" cy="112" r="1.8" style="animation-delay:.4s"/><circle class="bl" cx="78" cy="102" r="1.8" style="animation-delay:.8s"/></g>` : ""}
  <rect x="34" y="132" width="52" height="3" rx="1.5" fill="${BODY_DARK}"/>`;
}

function microwave(state: MachineState): string {
  const on = state === "in_funzione";
  return `<rect x="8" y="34" width="104" height="72" rx="8" fill="${BODY}" stroke="${BODY_DARK}" stroke-width="2"/>
  <rect x="16" y="42" width="62" height="56" rx="5" fill="${on ? "#3b2f12" : GLASS}" stroke="${BODY_DARK}" stroke-width="2"/>
  ${on ? `<rect x="18" y="44" width="58" height="52" rx="4" fill="#fbbf24" opacity=".42" class="fl"/>` : ""}
  <g class="${on ? "sp" : ""}"><ellipse cx="47" cy="88" rx="22" ry="5" fill="#cbd5e1" opacity=".9"/><rect x="38" y="74" width="18" height="12" rx="3" fill="${on ? "#fcd34d" : "#94a3b8"}"/></g>
  <rect x="84" y="42" width="20" height="56" rx="4" fill="${PANEL}" opacity=".35"/>
  ${display(state, 86, 46, 16)}${led(state, 94, 64)}
  <circle cx="94" cy="80" r="7" fill="#f4f5f7" stroke="${BODY_DARK}"/><line x1="94" y1="80" x2="94" y2="75" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="14" y="106" width="8" height="5" rx="2" fill="#7b8494"/><rect x="98" y="106" width="8" height="5" rx="2" fill="#7b8494"/>
  ${state === "terminato" ? "" : ""}`;
}

function robot(state: MachineState): string {
  const on = state === "in_funzione";
  const ring = state === "non_disponibile" ? "#dc2626" : on ? "#f59e0b" : "#7b8494";
  return `<rect x="14" y="96" width="92" height="30" rx="10" fill="${BODY}" stroke="${BODY_DARK}" stroke-width="2"/>
  <rect x="22" y="104" width="76" height="8" rx="4" fill="${PANEL}" opacity=".3"/>
  <circle cx="30" cy="119" r="3" fill="${ring}"${on ? ' class="bl"' : ""}/>
  <g class="${on ? "sw" : ""}">
    <circle cx="60" cy="56" r="40" fill="${BODY}" stroke="${BODY_DARK}" stroke-width="2.4"/>
    <circle cx="60" cy="56" r="33" fill="#f4f5f7" stroke="${BODY_DARK}" stroke-width="1.4"/>
    <circle cx="60" cy="42" r="9" fill="${GLASS}" stroke="${BODY_DARK}" stroke-width="2"/>
    <circle cx="60" cy="42" r="3.2" fill="${ring}"${on ? ' class="bl"' : ""}/>
    <path d="M40 66q20 12 40 0" fill="none" stroke="${PANEL}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    <rect x="52" y="73" width="16" height="5" rx="2.5" fill="${ring}" opacity=".85"/>
  </g>
  <g class="${on ? "sp" : ""}" stroke="#8b95a3" stroke-width="2.2" stroke-linecap="round"><path d="M22 92l-8 8M22 92l-9-4M22 92l1-10"/></g>
  ${on ? '<g fill="#38bdf8" opacity=".8"><circle class="bl" cx="98" cy="86" r="2"/><circle class="bl" cx="104" cy="74" r="2" style="animation-delay:.5s"/><circle class="bl" cx="94" cy="68" r="2" style="animation-delay:1s"/></g>' : ""}`;
}

export function applianceSvg(type: ApplianceType, state: MachineState): string {
  const body =
    type === "lavatrice" ? washer(state, false)
    : type === "asciugatrice" ? washer(state, true)
    : type === "lavastoviglie" ? dishwasher(state)
    : type === "forno" ? oven(state)
    : type === "frigorifero" ? fridge(state)
    : type === "aspirapolvere" ? robot(state)
    : microwave(state);
  const dim = state === "non_disponibile" ? ' opacity=".45"' : "";
  return `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${type} ${state.replace("_", " ")}">${STYLE}<g${dim}>${body}</g></svg>`;
}
