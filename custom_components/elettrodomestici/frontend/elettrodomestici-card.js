var Ve=Object.defineProperty;var Ge=Object.getOwnPropertyDescriptor;var m=(s,e,t,i)=>{for(var n=i>1?void 0:i?Ge(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&Ve(e,t,n),n};var ut=globalThis,mt=ut.ShadowRoot&&(ut.ShadyCSS===void 0||ut.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ct=Symbol(),re=new WeakMap,st=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ct)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(mt&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=re.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&re.set(t,e))}return e}toString(){return this.cssText}},oe=s=>new st(typeof s=="string"?s:s+"",void 0,Ct),R=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((i,n,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[r+1],s[0]);return new st(t,s,Ct)},ae=(s,e)=>{if(mt)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),n=ut.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,s.appendChild(i)}},Pt=mt?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return oe(t)})(s):s;var{is:Ye,defineProperty:Qe,getOwnPropertyDescriptor:Xe,getOwnPropertyNames:Je,getOwnPropertySymbols:Ze,getPrototypeOf:ti}=Object,ft=globalThis,le=ft.trustedTypes,ei=le?le.emptyScript:"",ii=ft.reactiveElementPolyfillSupport,nt=(s,e)=>s,rt={toAttribute(s,e){switch(e){case Boolean:s=s?ei:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},gt=(s,e)=>!Ye(s,e),ce={attribute:!0,type:String,converter:rt,reflect:!1,useDefault:!1,hasChanged:gt};Symbol.metadata??=Symbol("metadata"),ft.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ce){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&Qe(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){let{get:n,set:r}=Xe(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:n,set(o){let a=n?.call(this);r?.call(this,o),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ce}static _$Ei(){if(this.hasOwnProperty(nt("elementProperties")))return;let e=ti(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(nt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(nt("properties"))){let t=this.properties,i=[...Je(t),...Ze(t)];for(let n of i)this.createProperty(n,t[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let n of i)t.unshift(Pt(n))}else e!==void 0&&t.push(Pt(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ae(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:rt).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let r=i.getPropertyOptions(n),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:rt;this._$Em=n;let a=o.fromAttribute(t,r.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(e,t,i,n=!1,r){if(e!==void 0){let o=this.constructor;if(n===!1&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??gt)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[n,r]of i){let{wrapped:o}=r,a=this[n];o!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,r,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[nt("elementProperties")]=new Map,O[nt("finalized")]=new Map,ii?.({ReactiveElement:O}),(ft.reactiveElementVersions??=[]).push("2.1.2");var Ut=globalThis,de=s=>s,vt=Ut.trustedTypes,pe=vt?vt.createPolicy("lit-html",{createHTML:s=>s}):void 0,ve="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,be="?"+j,si=`<${be}>`,G=document,at=()=>G.createComment(""),lt=s=>s===null||typeof s!="object"&&typeof s!="function",Wt=Array.isArray,ni=s=>Wt(s)||typeof s?.[Symbol.iterator]=="function",Nt=`[ 	
\f\r]`,ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ue=/>/g,F=RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),me=/'/g,fe=/"/g,ye=/^(?:script|style|textarea|title)$/i,Dt=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),l=Dt(1),H=Dt(2),Pi=Dt(3),U=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),ge=new WeakMap,V=G.createTreeWalker(G,129);function _e(s,e){if(!Wt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return pe!==void 0?pe.createHTML(e):e}var ri=(s,e)=>{let t=s.length-1,i=[],n,r=e===2?"<svg>":e===3?"<math>":"",o=ot;for(let a=0;a<t;a++){let c=s[a],u,g,h=-1,b=0;for(;b<c.length&&(o.lastIndex=b,g=o.exec(c),g!==null);)b=o.lastIndex,o===ot?g[1]==="!--"?o=he:g[1]!==void 0?o=ue:g[2]!==void 0?(ye.test(g[2])&&(n=RegExp("</"+g[2],"g")),o=F):g[3]!==void 0&&(o=F):o===F?g[0]===">"?(o=n??ot,h=-1):g[1]===void 0?h=-2:(h=o.lastIndex-g[2].length,u=g[1],o=g[3]===void 0?F:g[3]==='"'?fe:me):o===fe||o===me?o=F:o===he||o===ue?o=ot:(o=F,n=void 0);let y=o===F&&s[a+1].startsWith("/>")?" ":"";r+=o===ot?c+si:h>=0?(i.push(u),c.slice(0,h)+ve+c.slice(h)+j+y):c+j+(h===-2?a:y)}return[_e(s,r+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},ct=class s{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let r=0,o=0,a=e.length-1,c=this.parts,[u,g]=ri(e,t);if(this.el=s.createElement(u,i),V.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=V.nextNode())!==null&&c.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(ve)){let b=g[o++],y=n.getAttribute(h).split(j),_=/([.?@])?(.*)/.exec(b);c.push({type:1,index:r,name:_[2],strings:y,ctor:_[1]==="."?Lt:_[1]==="?"?Ht:_[1]==="@"?It:J}),n.removeAttribute(h)}else h.startsWith(j)&&(c.push({type:6,index:r}),n.removeAttribute(h));if(ye.test(n.tagName)){let h=n.textContent.split(j),b=h.length-1;if(b>0){n.textContent=vt?vt.emptyScript:"";for(let y=0;y<b;y++)n.append(h[y],at()),V.nextNode(),c.push({type:2,index:++r});n.append(h[b],at())}}}else if(n.nodeType===8)if(n.data===be)c.push({type:2,index:r});else{let h=-1;for(;(h=n.data.indexOf(j,h+1))!==-1;)c.push({type:7,index:r}),h+=j.length-1}r++}}static createElement(e,t){let i=G.createElement("template");return i.innerHTML=e,i}};function X(s,e,t=s,i){if(e===U)return e;let n=i!==void 0?t._$Co?.[i]:t._$Cl,r=lt(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(s),n._$AT(s,t,i)),i!==void 0?(t._$Co??=[])[i]=n:t._$Cl=n),n!==void 0&&(e=X(s,n._$AS(s,e.values),n,i)),e}var Rt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??G).importNode(t,!0);V.currentNode=n;let r=V.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let u;c.type===2?u=new dt(r,r.nextSibling,this,e):c.type===1?u=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(u=new Ot(r,this,e)),this._$AV.push(u),c=i[++a]}o!==c?.index&&(r=V.nextNode(),o++)}return V.currentNode=G,n}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},dt=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),lt(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==U&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ni(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&lt(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ct.createElement(_e(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{let r=new Rt(n,this),o=r.u(this.options);r.p(t),this.T(o),this._$AH=r}}_$AC(e){let t=ge.get(e.strings);return t===void 0&&ge.set(e.strings,t=new ct(e)),t}k(e){Wt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,n=0;for(let r of e)n===t.length?t.push(i=new s(this.O(at()),this.O(at()),this,this.options)):i=t[n],i._$AI(r),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=de(e).nextSibling;de(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,n){let r=this.strings,o=!1;if(r===void 0)e=X(this,e,t,0),o=!lt(e)||e!==this._$AH&&e!==U,o&&(this._$AH=e);else{let a=e,c,u;for(e=r[0],c=0;c<r.length-1;c++)u=X(this,a[i+c],t,c),u===U&&(u=this._$AH[c]),o||=!lt(u)||u!==this._$AH[c],u===d?e=d:e!==d&&(e+=(u??"")+r[c+1]),this._$AH[c]=u}o&&!n&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Lt=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},Ht=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},It=class extends J{constructor(e,t,i,n,r){super(e,t,i,n,r),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??d)===U)return;let i=this._$AH,n=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==d&&(i===d||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ot=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}};var oi=Ut.litHtmlPolyfillSupport;oi?.(ct,dt),(Ut.litHtmlVersions??=[]).push("3.3.3");var $e=(s,e,t)=>{let i=t?.renderBefore??e,n=i._$litPart$;if(n===void 0){let r=t?.renderBefore??null;i._$litPart$=n=new dt(e.insertBefore(at(),r),r,void 0,t??{})}return n._$AI(s),n};var jt=globalThis,z=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=$e(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};z._$litElement$=!0,z.finalized=!0,jt.litElementHydrateSupport?.({LitElement:z});var ai=jt.litElementPolyfillSupport;ai?.({LitElement:z});(jt.litElementVersions??=[]).push("4.2.2");var li={attribute:!0,type:String,converter:rt,reflect:!1,hasChanged:gt},ci=(s=li,e,t)=>{let{kind:i,metadata:n}=t,r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(t.name,s),i==="accessor"){let{name:o}=t;return{set(a){let c=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,c,s,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,s,a),a}}}if(i==="setter"){let{name:o}=t;return function(a){let c=this[o];e.call(this,a),this.requestUpdate(o,c,s,!0,a)}}throw Error("Unsupported decorator location: "+i)};function S(s){return(e,t)=>typeof t=="object"?ci(s,e,t):((i,n,r)=>{let o=n.hasOwnProperty(r);return n.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(n,r):void 0})(s,e,t)}function v(s){return S({...s,state:!0,attribute:!1})}var xe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},_t=s=>(...e)=>({_$litDirective$:s,values:e}),yt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var Y=class extends yt{constructor(e){if(super(e),this.it=d,e.type!==xe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===d||e==null)return this._t=void 0,this.it=e;if(e===U)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Y.directiveName="unsafeHTML",Y.resultType=1;var $s=_t(Y);var pt=class extends Y{};pt.directiveName="unsafeSVG",pt.resultType=2;var $t=_t(pt);var xt="#e4e7ec",A="#c3c9d3",wt="#9aa3b2",Kt="#1d2b3b",di=`<style>
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
</style>`;function kt(s,e,t){return`<circle cx="${e}" cy="${t}" r="3" fill="${s==="in_funzione"?"#f59e0b":s==="terminato"?"#16a34a":s==="non_disponibile"?"#dc2626":"#7b8494"}"${s==="in_funzione"?' class="bl"':""}/>`}function St(s,e,t,i){let n=s==="in_funzione"||s==="terminato",r=s==="terminato"?"#4ade80":"#fbbf24";return`<rect x="${e}" y="${t}" width="${i}" height="9" rx="2" fill="${n?"#10161d":"#2a3340"}"/>`+(n?`<rect x="${e+3}" y="${t+3.5}" width="${i*(s==="terminato"?.7:.45)}" height="2" rx="1" fill="${r}"${s==="in_funzione"?' class="bl"':""}/>`:"")}function ke(s,e=120){return`<rect x="12" y="8" width="96" height="${e}" rx="9" fill="${xt}" stroke="${A}" stroke-width="2"/>
  <rect x="12" y="8" width="96" height="22" rx="9" fill="${wt}" opacity=".35"/>
  ${St(s,20,14,38)}${kt(s,70,18)}
  <circle cx="86" cy="18" r="6" fill="#f4f5f7" stroke="${A}"/><line x1="86" y1="18" x2="86" y2="13.5" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round"/>`}function we(s,e){let t=s==="in_funzione",i=e?"#fb923c":"#60a5fa",n=e?"#f9a8d4":"#93c5fd",o=`<g class="${t?"sp":""}"><circle cx="60" cy="82" r="24" fill="${Kt}"/>
    <path d="M44 82 a16 16 0 0 1 32 0 z" fill="${t?i:s==="terminato"?"#86efac":"#3b4a5c"}" opacity=".55"/>
    <circle cx="52" cy="76" r="6" fill="${n}" opacity="${t?.95:.55}"/><circle cx="68" cy="86" r="7" fill="${e?"#fde68a":"#bfdbfe"}" opacity="${t?.95:.5}"/><circle cx="58" cy="92" r="4" fill="${n}" opacity="${t?.9:.5}"/></g>`,a=e&&t?'<g class="fl" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round"><path d="M44 52c-3 3 3 4 0 8"/><path d="M60 52c-3 3 3 4 0 8"/><path d="M76 52c-3 3 3 4 0 8"/></g>':"",c=!e&&t?'<g fill="#fff" opacity=".7"><circle class="bl" cx="50" cy="94" r="2"/><circle class="bl" cx="64" cy="98" r="1.6"/><circle class="bl" cx="72" cy="90" r="2"/></g>':"";return`${ke(s)}
  <circle cx="60" cy="82" r="32" fill="#f4f5f7" stroke="${A}" stroke-width="3"/><circle cx="60" cy="82" r="28" fill="#aeb6c3"/>
  ${o}${c}${a}
  <path d="M40 66 a28 28 0 0 1 28 -9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
  ${s==="terminato"?'<circle cx="60" cy="82" r="14" fill="#16a34a" opacity=".92"/><path d="M53 82l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>':""}`}function pi(s){let e=s==="in_funzione",t=e?'<g fill="#7dd3fc"><circle class="dr" cx="40" cy="62" r="2"/><circle class="dr" cx="56" cy="60" r="2" style="animation-delay:.3s"/><circle class="dr" cx="72" cy="62" r="2" style="animation-delay:.6s"/><circle class="dr" cx="86" cy="60" r="2" style="animation-delay:.9s"/></g>':"";return`${ke(s)}
  <rect x="22" y="40" width="76" height="70" rx="5" fill="${e?"#1a3b57":Kt}" stroke="${A}" stroke-width="2"/>
  <g stroke="#7b8ba0" stroke-width="2" opacity=".85"><line x1="30" y1="58" x2="90" y2="58"/><line x1="30" y1="80" x2="90" y2="80"/></g>
  <g fill="#cbd5e1" opacity=".9"><rect x="34" y="62" width="9" height="16" rx="2"/><rect x="50" y="62" width="9" height="16" rx="2"/><rect x="66" y="62" width="9" height="16" rx="2"/><rect x="42" y="84" width="14" height="16" rx="3"/><rect x="62" y="84" width="14" height="16" rx="3"/></g>
  ${t}
  <rect x="38" y="112" width="44" height="6" rx="3" fill="#f4f5f7" stroke="${A}"/>
  ${e?'<g class="fl" opacity=".35"><rect x="22" y="40" width="76" height="70" rx="5" fill="#7dd3fc"/></g>':""}
  ${s==="terminato"?'<circle cx="60" cy="75" r="14" fill="#16a34a" opacity=".92"/><path d="M53 75l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>':""}`}function hi(s){let e=s==="in_funzione",t=e?'<rect x="24" y="50" width="72" height="50" rx="4" fill="#f97316" opacity=".3" class="fl"/>':"",i=e?"#fb923c":"#4b5563";return`<rect x="12" y="8" width="96" height="124" rx="9" fill="${xt}" stroke="${A}" stroke-width="2"/>
  <rect x="12" y="8" width="96" height="30" rx="9" fill="${wt}" opacity=".35"/>
  ${St(s,46,13,28)}${kt(s,82,18)}
  <g fill="#f4f5f7" stroke="${A}"><circle cx="26" cy="22" r="6"/><circle cx="94" cy="22" r="6"/></g>
  <rect x="20" y="44" width="80" height="64" rx="5" fill="#2a3340" stroke="${A}" stroke-width="2"/>
  <rect x="24" y="50" width="72" height="50" rx="4" fill="#161d26"/>${t}
  <g stroke="${i}" stroke-width="2.2" stroke-linecap="round" ${e?'class="fl"':""}><path d="M30 56h60"/><path d="M30 94h60"/></g>
  <g stroke="#7b8ba0" stroke-width="1.6" opacity=".9"><line x1="30" y1="70" x2="90" y2="70"/><line x1="30" y1="82" x2="90" y2="82"/></g>
  <rect x="26" y="114" width="68" height="6" rx="3" fill="#f4f5f7" stroke="${A}"/>
  ${s==="in_funzione"?'<g fill="none" stroke="#fb923c" stroke-width="1.6" stroke-linecap="round" class="fl"><path d="M44 36c-3 3 3 4 0 8"/><path d="M60 36c-3 3 3 4 0 8"/><path d="M76 36c-3 3 3 4 0 8"/></g>':""}`}function ui(s){let e=s==="in_funzione";return`<rect x="26" y="6" width="68" height="128" rx="8" fill="${xt}" stroke="${A}" stroke-width="2"/>
  <line x1="26" y1="50" x2="94" y2="50" stroke="${A}" stroke-width="2.4"/>
  ${e?'<g class="sw" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"><path d="M60 24v22M49 30l22 10M71 30L49 40"/><circle cx="60" cy="35" r="2.4" fill="#38bdf8" stroke="none"/></g>':'<g stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity=".6"><path d="M60 26v18M51 31l18 8M69 31L51 39"/></g>'}
  <rect x="32" y="22" width="6" height="22" rx="3" fill="#8b95a3"/><rect x="32" y="58" width="6" height="40" rx="3" fill="#8b95a3"/>
  ${St(s,52,60,34)}${kt(s,80,80)}
  <rect x="48" y="94" width="38" height="32" rx="4" fill="${wt}" opacity=".22"/>
  ${e?'<g fill="#38bdf8" opacity=".9"><circle class="bl" cx="56" cy="104" r="1.8"/><circle class="bl" cx="70" cy="112" r="1.8" style="animation-delay:.4s"/><circle class="bl" cx="78" cy="102" r="1.8" style="animation-delay:.8s"/></g>':""}
  <rect x="34" y="132" width="52" height="3" rx="1.5" fill="${A}"/>`}function mi(s){let e=s==="in_funzione";return`<rect x="8" y="34" width="104" height="72" rx="8" fill="${xt}" stroke="${A}" stroke-width="2"/>
  <rect x="16" y="42" width="62" height="56" rx="5" fill="${e?"#3b2f12":Kt}" stroke="${A}" stroke-width="2"/>
  ${e?'<rect x="18" y="44" width="58" height="52" rx="4" fill="#fbbf24" opacity=".42" class="fl"/>':""}
  <g class="${e?"sp":""}"><ellipse cx="47" cy="88" rx="22" ry="5" fill="#cbd5e1" opacity=".9"/><rect x="38" y="74" width="18" height="12" rx="3" fill="${e?"#fcd34d":"#94a3b8"}"/></g>
  <rect x="84" y="42" width="20" height="56" rx="4" fill="${wt}" opacity=".35"/>
  ${St(s,86,46,16)}${kt(s,94,64)}
  <circle cx="94" cy="80" r="7" fill="#f4f5f7" stroke="${A}"/><line x1="94" y1="80" x2="94" y2="75" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="14" y="106" width="8" height="5" rx="2" fill="#7b8494"/><rect x="98" y="106" width="8" height="5" rx="2" fill="#7b8494"/>
  `}function At(s,e){let t=s==="lavatrice"?we(e,!1):s==="asciugatrice"?we(e,!0):s==="lavastoviglie"?pi(e):s==="forno"?hi(e):s==="frigorifero"?ui(e):mi(e),i=e==="non_disponibile"?' opacity=".45"':"";return`<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${s} ${e.replace("_"," ")}">${di}<g${i}>${t}</g></svg>`}var Se=["lavatrice","lavastoviglie","asciugatrice","forno","frigorifero","microonde"],Bt={lavatrice:"mdi:washing-machine",lavastoviglie:"mdi:dishwasher",asciugatrice:"mdi:tumble-dryer",forno:"mdi:stove",frigorifero:"mdi:fridge",microonde:"mdi:microwave"},Z={lavatrice:"Lavatrice",lavastoviglie:"Lavastoviglie",asciugatrice:"Asciugatrice",forno:"Forno",frigorifero:"Frigorifero",microonde:"Microonde"},fi=["spento","in_funzione","terminato","non_disponibile"],tt={spento:"Spento",in_funzione:"In funzione",terminato:"Terminato",non_disponibile:"Non disponibile"},K={spento:"#6b7280",in_funzione:"#f59e0b",terminato:"#16a34a",non_disponibile:"transparent"},gi={spento:"off",in_funzione:"run",terminato:"done",non_disponibile:"bad"};function Ae(s){return fi.includes(String(s))?s:"non_disponibile"}function Ee(s){if(s==null||s===""||s==="unknown"||s==="unavailable")return null;let e=Number(s);return Number.isFinite(e)?e:null}function $(s,e=0){return s==null||!Number.isFinite(s)?"\u2013":s.toFixed(e).replace(".",",")}var T=s=>s==null?"\u2013":`${$(s,s<10?2:1)} kWh`,P=s=>s==null?"\u2013":`${$(s,2)} \u20AC`,q=s=>s==null?"\u2013":`${$(s,s%1&&s<100?1:0)} W`;function C(s){let e=Math.max(0,Math.round(s));if(e<60)return`${e} s`;let t=Math.round(e/60);return t<60?`${t} min`:`${Math.floor(t/60)} h ${String(t%60).padStart(2,"0")} min`}function Ft(s){return s<3600?`${Math.round(s/60)} min`:`${$(s/3600,1)} h`}var Vt=["dom","lun","mar","mer","gio","ven","sab"],ze=["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],Q=s=>`${String(s.getHours()).padStart(2,"0")}:${String(s.getMinutes()).padStart(2,"0")}`;function Et(s){let e=new Date(s);return`${Vt[e.getDay()]} ${e.getDate()} ${ze[e.getMonth()]}, ${Q(e)}`}function Gt(s){let e=new Date(`${s}T12:00:00`);return`${Vt[e.getDay()]} ${e.getDate()} ${ze[e.getMonth()]}`}function Yt(s){let e=s?Date.parse(s):NaN;return Number.isNaN(e)?"\u2013":Q(new Date(e))}function vi(s,e){let t=e[s.entities.stato??""];if(!t)return{snap:s,state:s.state};let i=t.attributes,n={...s};for(let o of Object.keys(i))o in s&&i[o]!==void 0&&(n[o]=i[o]);let r=t.state==="unavailable"||t.state==="unknown"?"non_disponibile":Ae(t.state);return{snap:n,state:r}}function Qt(s){if(!s)return null;let e=Ee(s.state);return e===null?null:String(s.attributes.unit_of_measurement??"W").toLowerCase()==="kw"?e*1e3:e}function bi(s,e){if(!s||s.state==="unavailable"||s.state==="unknown"||s.state==="")return"non disponibile";if(s.attributes.device_class==="timestamp"){let n=Date.parse(s.state);if(!Number.isNaN(n)){let r=(n-e)/1e3;return r>0?`alle ${Q(new Date(n))} (tra ${C(r)})`:`alle ${Q(new Date(n))}`}}if(s.state==="on")return"s\xEC";if(s.state==="off")return"no";let t=s.attributes.unit_of_measurement,i=Ee(s.state);return i!==null&&typeof t=="string"&&t?t==="min"||t==="s"||t==="h"?`${$(i,i%1?1:0)} ${t}`:`${$(i,i%1?2:0)} ${t}`:s.state.replace(/_/g," ")}function yi(s,e,t){return s.extras.map(i=>{let n=e[i.entity],r=typeof n?.attributes.friendly_name=="string"?n.attributes.friendly_name:i.entity;return{label:i.label||r,value:bi(n,t),entity:i.entity}})}function zt(s,e,t,i){let{snap:n,state:r}=vi(s,e),o=Qt(e[s.entity]),a=t?.[s.type],c=a?.has_finished??["lavatrice","lavastoviglie","asciugatrice"].includes(s.type),u=n.inizio?Date.parse(n.inizio):NaN,g=r==="in_funzione"&&!Number.isNaN(u)?Math.max(0,(i-u)/1e3):null,h=tt[r],b=n.fase;if(r==="spento")b=a?.off_label??"Spento",h=b;else if(r==="in_funzione")h=g!==null?`${n.fase} \xB7 da ${C(g)}`:n.fase;else if(r==="terminato"){let x=n.fine?Date.parse(n.fine):NaN;h=`${n.fase}${Number.isNaN(x)?"":` \xB7 finito alle ${Q(new Date(x))}`}`}let y=null,_="",M="";return r==="in_funzione"&&c&&n.fasi.length>1&&n.fase_indice!==null&&(y=Math.min(1,(n.fase_indice+.5)/n.fasi.length),_=`Fase ${n.fase_indice+1} di ${n.fasi.length}`),r==="in_funzione"&&n.stima_rimanente_s!==null&&(M=`fine stimata fra circa ${C(n.stima_rimanente_s)}`),{key:s.key,name:s.name,type:s.type,state:r,tone:gi[r],statusLine:h,phase:b,power:o,progress:y,progressLabel:_,todayKwh:n.oggi_kwh,todayEur:n.oggi_eur,todayCycles:n.oggi_cicli,cycleKwh:n.energia_ciclo,cycleEur:n.costo_ciclo,maintPct:n.manutenzione_pct,maintDue:n.manutenzione_pct!==null&&n.manutenzione_pct>=100,extras:yi(s,e,i),canAck:r==="terminato",remainingText:M}}function _i(s){let e=Math.round(Number(s));return Number.isFinite(e)&&e>=1?Math.min(e,8):null}function Te(s){let e=_i(s);return e===null?"repeat(auto-fill, minmax(min(300px, 100%), 1fr))":`repeat(${e}, minmax(0, 1fr))`}function Me(s){if(s.length===0)return"Nessun elettrodomestico: aggiungine uno dalle preferenze.";let e=s.filter(r=>r.state==="in_funzione"),t=s.filter(r=>r.state==="terminato"),i=s.reduce((r,o)=>r+(o.power??0),0),n=[];return e.length&&n.push(`${e.length} in funzione (${e.map(r=>r.name).join(", ")})`),t.length&&n.push(`${t.map(r=>r.name).join(", ")} da svuotare`),n.length||n.push("tutto fermo"),`${n.join(" \xB7 ")} \xB7 ${q(i)} in totale`}function Ce(s,e){return s.slice(-e).reduce((i,n)=>({kwh:i.kwh+n.kwh,eur:i.eur+n.eur,cycles:i.cycles+n.cycles,sec:i.sec+n.sec}),{kwh:0,eur:0,cycles:0,sec:0})}var Xt={kwh:"Energia",eur:"Costo",cycles:"Cicli",sec:"Funzionamento"};function Jt(s,e){return s==="kwh"?T(e):s==="eur"?P(e):s==="cycles"?`${$(e,0)} ${e===1?"ciclo":"cicli"}`:Ft(e)}function Pe(s,e,t,i,n){let r=$i(t||i.label),o=r;for(let a=2;n.includes(o);a++)o=`${r}_${a}`;return{id:o,type:s,name:t||i.label,entity:e,energy_entity:null,start_w:i.start_w,stop_w:i.stop_w,start_delay:i.start_delay,end_delay:i.end_delay,min_cycle:i.min_cycle,heat_w:i.heat_w,maint_cycles:i.maint_cycles,alert_minutes:i.alert_minutes,notify:i.notify,extras:[]}}function $i(s){return s.normalize("NFKD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"elettrodomestico"}var xi=/^[a-z_]+\.[a-z0-9_]+$/;function Zt(s){let e=new Set;for(let t of s){if(!xi.test(t.entity))return`${t.name}: scegli il sensore di potenza della presa.`;if(e.has(t.entity))return`${t.name}: questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.`;if(e.add(t.entity),t.stop_w>t.start_w)return`${t.name}: la soglia di spegnimento non pu\xF2 superare quella di avvio.`}return null}function et(s,e,t=[]){let i=[];for(let[n,r]of Object.entries(s)){if(t.includes(n)||!e(n,r))continue;let o=r.attributes.friendly_name;i.push({id:n,name:typeof o=="string"?o:n})}return i.sort((n,r)=>n.name.localeCompare(r.name,"it")).slice(0,1500)}var te=(s,e=[])=>et(s,(t,i)=>t.startsWith("sensor.")&&(i.attributes.device_class==="power"||["W","kW"].includes(String(i.attributes.unit_of_measurement))),e),ee=s=>et(s,(e,t)=>e.startsWith("sensor.")&&(t.attributes.device_class==="energy"||["Wh","kWh","MWh"].includes(String(t.attributes.unit_of_measurement)))),Ne=(s,e=[])=>et(s,t=>/^(sensor|binary_sensor|select|input_select|input_text|number|text|climate)\./.test(t),e),Re=s=>et(s,e=>e.startsWith("counter.")),Le=s=>et(s,e=>e.startsWith("binary_sensor.")),qt={lavatrice:/lavatrice|lavaggio|washing/,lavastoviglie:/lavastov|dishwasher/,asciugatrice:/asciugatr|dryer/,forno:/forno|oven/,frigorifero:/frigo|fridge/,microonde:/micro/};function He(s,e){let t=Object.keys(s),i=t.find(r=>r.startsWith("counter.")&&qt[e].test(r)&&/cicl/.test(r))??t.find(r=>r.startsWith("counter.")&&qt[e].test(r))??"",n=t.find(r=>r.startsWith("binary_sensor.")&&/_status$/.test(r)&&qt[e].test(r))??"";return{counter:i,status:n}}var Ie=s=>et(s,e=>e.startsWith("sensor."));function ie(s,e){let t=s[e]?.attributes.friendly_name;return typeof t=="string"?t:e}function Oe(s){return Object.keys(s?.notify??{}).filter(e=>e!=="send_message"&&e!=="persistent_notification").sort().map(e=>`notify.${e}`)}function wi(s){if(s==null)return null;if(typeof s=="number")return s<1e11?s*1e3:s;let e=Date.parse(s);return Number.isNaN(e)?null:e}function Ue(s){return wi(s.lu??s.last_updated??s.lc??s.last_changed)}function We(s){let e=[];for(let t of s??[]){let i=Ue(t),n=t.s??t.state;if(i===null||n===void 0||n===""||n==="unavailable"||n==="unknown")continue;let r=Number(n);Number.isFinite(r)&&e.push({t:i,v:r})}return e.sort((t,i)=>t.t-i.t)}function De(s,e,t){let i=[];for(let c of s??[]){let u=Ue(c),g=c.s??c.state;u!==null&&g!==void 0&&i.push({t:u,s:Ae(g)})}i.sort((c,u)=>c.t-u.t);let n=null;for(let c of i)if(c.t<=e)n=c.s;else break;let r=[],o=e;for(let c of i)c.t<=e||c.t>=t||(n!==null&&r.push({from:o,to:c.t,state:n}),o=c.t,n=c.s);n!==null&&o<t&&r.push({from:o,to:t,state:n});let a=[];for(let c of r){let u=a[a.length-1];u&&u.state===c.state&&u.to===c.from?u.to=c.to:a.push({...c})}return a}function je(s,e){for(let t of s)if(e>=t.from&&e<t.to)return t.state;return null}function Ke(s,e,t,i,n=3*3600*1e3){let r=new Array(i).fill(null);if(i<=0||t<=e)return r;let o=(t-e)/i,a=0,c=null,u=0;for(let g=0;g<i;g++){let h=e+g*o,b=h+o;for(;a<s.length&&s[a].t<=h;)c=s[a].v,u=s[a].t,a++;let y=0,_=0,M=h,x=c,N=u,p=D=>{if(x===null)return;let Mt=Math.min(D,N+n)-M;Mt>0&&(y+=x*Mt,_+=Mt)},f=a;for(;f<s.length&&s[f].t<b;)p(s[f].t),M=s[f].t,x=s[f].v,N=s[f].t,f++;p(b),r[g]=_>0?y/_:null}return r}function ki(s){let e=Math.pow(10,Math.floor(Math.log10(s))),t=s/e;return(t<=1?1:t<=2?2:t<=2.5?2.5:t<=5?5:10)*e}function se(s,e,t=5){if(!Number.isFinite(s)||!Number.isFinite(e))return{min:0,max:1,ticks:[0,1]};e-s<1e-9&&(s-=1,e+=1);let i=ki((e-s)/Math.max(1,t-1)),n=Math.floor(s/i+1e-9)*i,r=Math.ceil(e/i-1e-9)*i,o=[];for(let a=n;a<=r+i*1e-6;a+=i)o.push(Math.round(a/i)*i);return{min:n,max:r,ticks:o}}function qe(s,e,t=6){let i=(e-s)/36e5,n=[1,2,3,6,12,24,48].find(a=>i/a<=t)??48,r=new Date(s);r.setMinutes(0,0,0),n>=24?r.setHours(0):r.setHours(Math.ceil(r.getHours()/n)*n);let o=[];for(let a=r.getTime();a<=e;a+=n*36e5){if(a<s)continue;let c=new Date(a),u=c.getHours()===0;o.push({t:a,major:u,label:i>30&&u?`${Vt[c.getDay()]} ${c.getDate()}`:Q(c)})}return o}function Be(s,e,t){let i="",n=!1;for(let r=0;r<s.length;r++){let o=s[r];if(o===null){n=!1;continue}i+=`${n?"L":"M"}${e(r).toFixed(1)} ${t(o).toFixed(1)}`,n=!0}return i}var it=R`
  :host {
    position: fixed;
    inset: 0;
    z-index: 10000;
    color: var(--primary-text-color, #212121);
    font-family: var(--paper-font-body1_-_font-family, Roboto, Helvetica, Arial, sans-serif);
  }
  .backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    box-sizing: border-box;
  }
  .panel {
    background: var(--card-background-color, #fff);
    border-radius: 16px;
    width: 100%;
    max-width: 560px;
    max-height: min(88vh, 780px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
  .panel.wide {
    max-width: 760px;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }
  .title {
    font-size: 1.1rem;
    font-weight: 600;
  }
  .x {
    border: 0;
    background: transparent;
    color: inherit;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 8px;
  }
  .x:hover {
    background: var(--secondary-background-color, #f0f0f0);
  }
  .body {
    overflow: auto;
    padding: 12px 16px 16px;
  }
  .foot {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    padding: 10px 16px;
    border-top: 1px solid var(--divider-color, #e0e0e0);
  }
  .btn {
    border: 1px solid var(--divider-color, #ccc);
    background: var(--secondary-background-color, #f4f4f4);
    color: inherit;
    border-radius: 10px;
    padding: 8px 14px;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .btn.primary {
    background: var(--primary-color, #03a9f4);
    color: #fff;
    border-color: transparent;
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .err {
    margin-top: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    background: rgba(220, 38, 38, 0.12);
    color: #b91c1c;
    font-size: 0.85rem;
  }
  .ok {
    margin-top: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    background: rgba(22, 163, 74, 0.12);
    color: #166534;
    font-size: 0.85rem;
  }
  .empty {
    padding: 24px 8px;
    text-align: center;
    color: var(--secondary-text-color, #727272);
  }
`;var Si=[{key:"start_w",label:"Si accende sopra",unit:"W",hint:"Potenza oltre la quale l'elettrodomestico risulta in funzione (pi\xF9 del consumo a riposo)."},{key:"stop_w",label:"Si spegne sotto",unit:"W",hint:"Potenza sotto la quale il ciclo pu\xF2 finire."},{key:"start_delay",label:"Conferma avvio dopo",unit:"s",hint:"Per ignorare i picchi brevi, per esempio quando si preme un tasto."},{key:"end_delay",label:"Conferma fine dopo",unit:"s",hint:"Quanto deve restare sotto la soglia: pi\xF9 lungo di qualsiasi pausa del programma."},{key:"min_cycle",label:"Ignora cicli pi\xF9 brevi di",unit:"s",hint:"I cicli pi\xF9 corti non si contano e non avvisano."},{key:"heat_w",label:"Riscaldamento sopra",unit:"W",hint:"Potenza della resistenza: serve a distinguere le fasi (lavaggio, risciacquo, asciugatura)."}],w=class extends z{constructor(){super(...arguments);this.openKey="";this._list=[];this._price="0.30";this._priceEntity="";this._notify=[];this._open="";this._addType="";this._addEntity="";this._addName="";this._extra="";this._svc="";this._advanced="";this._imp={};this._busy=!1;this._error="";this._onKey=t=>{t.key==="Escape"&&this._close()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._list=this.info.appliances.map(t=>({id:t.id,type:t.type,name:t.name,entity:t.entity,energy_entity:t.energy_entity,start_w:t.start_w,stop_w:t.stop_w,start_delay:t.start_delay,end_delay:t.end_delay,min_cycle:t.min_cycle,heat_w:t.heat_w,maint_cycles:t.maint_cycles,alert_minutes:t.alert_minutes,notify:t.notify,extras:t.extras.map(i=>({...i}))})),this._price=String(this.info.price_kwh),this._priceEntity=this.info.price_entity,this._notify=[...this.info.notify_services],this._open=this.openKey,this._list.length===0&&(this._addType="lavatrice")}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey)}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_patch(t,i){this._list=this._list.map(n=>n.id===t?{...n,...i}:n)}_remove(t){this._list=this._list.filter(i=>i.id!==t),this._open===t&&(this._open="")}_reset(t){let i=this.info.types[t.type];this._patch(t.id,{start_w:i.start_w,stop_w:i.stop_w,start_delay:i.start_delay,end_delay:i.end_delay,min_cycle:i.min_cycle,heat_w:i.heat_w})}_add(){let t=this._addType,i=this._addEntity.trim();if(!t)return;if(!/^[a-z_]+\.[a-z0-9_]+$/.test(i)){this._error="Scegli dall'elenco il sensore di potenza della presa.";return}if(this._list.some(r=>r.entity===i)){this._error="Questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.";return}let n=Pe(t,i,this._addName.trim(),this.info.types[t],this._list.map(r=>r.id));this._list=[...this._list,n],this._open=n.id,this._addType="",this._addEntity="",this._addName="",this._error=""}async _save(){let t=Zt(this._list);if(t){this._error=t;return}let i=Number(this._price.replace(",","."));if(!Number.isFinite(i)||i<0||i>10){this._error="Il prezzo dell'energia deve essere un numero tra 0 e 10 \u20AC/kWh.";return}this._busy=!0,this._error="";try{await this.hass.callWS({type:"elettrodomestici/update",entry_id:this.info.entry_id,appliances:this._list,price_kwh:i,price_entity:this._priceEntity.trim(),notify_services:this._notify}),this.dispatchEvent(new CustomEvent("saved")),this._close()}catch(n){let r=n instanceof Error?n.message:n?.message??String(n);this._error=`Impossibile salvare: ${r}`}finally{this._busy=!1}}_impState(t){if(!this._imp[t.id]){let i=He(this.hass.states,t.type);this._imp[t.id]={energy:t.energy_entity??"",counter:i.counter,status:i.status,days:"730",price:"",busy:!1,msg:"",err:!1}}return this._imp[t.id]}_setImp(t,i){this._imp={...this._imp,[t]:{...this._imp[t],...i}}}async _import(t){let i=this._impState(t),n=Number(i.days.replace(",",".")),r=i.price.trim()?Number(i.price.replace(",",".")):void 0;if(!Number.isFinite(n)||n<1||n>3650||r!==void 0&&(!Number.isFinite(r)||r<0||r>10)){this._setImp(t.id,{msg:"Controlla i giorni (1-3650) e il prezzo.",err:!0});return}this._setImp(t.id,{busy:!0,msg:"",err:!1});try{let o=await this.hass.callWS({type:"elettrodomestici/import_history",entry_id:this.info.entry_id,key:t.id,days:n,...i.energy.trim()?{energy_entity:i.energy.trim()}:{},...i.counter.trim()?{counter_entity:i.counter.trim()}:{},...i.status.trim()?{status_entity:i.status.trim()}:{},...r!==void 0?{price:r}:{}}),a=[`${o.days_written} giorni importati`];o.energy_days&&a.push(`${$(o.kwh,1)} kWh`),(o.cycles||o.baseline)&&a.push(`${$(o.cycles+(o.baseline??0))} cicli (${$(o.baseline??0)} precedenti al recorder, solo nel totale)`),o.runtime_days&&a.push(`funzionamento di ${o.runtime_days} giorni`),this._setImp(t.id,{busy:!1,msg:`${a.join(" \xB7 ")}.`,err:!1}),this.dispatchEvent(new CustomEvent("saved"))}catch(o){let a=o instanceof Error?o.message:o?.message??String(o);this._setImp(t.id,{busy:!1,msg:`Importazione non riuscita: ${a}`,err:!0})}}_importBox(t){let i=this._impState(t),n=this.info.appliances.some(r=>r.id===t.id);return l`
      <button class="adv" aria-expanded=${this._advanced===`imp-${t.id}`?"true":"false"} @click=${()=>this._advanced=this._advanced===`imp-${t.id}`?"":`imp-${t.id}`}>${this._advanced===`imp-${t.id}`?"\u25BE":"\u25B8"} Importa lo storico del vecchio pacchetto</button>
      ${this._advanced===`imp-${t.id}`?l`<div class="impbox">
            ${n?d:l`<div class="hint">Salva prima le preferenze: l'importazione si fa su un elettrodomestico già salvato.</div>`}
            <label class="f">Contatore di energia della presa (kWh)
              <input class="txt" list=${`dl-ie-${t.id}`} placeholder="sensor.…_energia" .value=${i.energy} @input=${r=>this._setImp(t.id,{energy:r.target.value})} />
              <datalist id=${`dl-ie-${t.id}`}>${ee(this.hass.states).map(r=>l`<option value=${r.id}>${r.name}</option>`)}</datalist>
              <span class="hint">È quello che usava il vecchio pacchetto: le sue statistiche a lungo termine danno l'energia giorno per giorno, anche di anni fa.</span></label>
            <label class="f">Contatore dei cicli (facoltativo)
              <input class="txt" list=${`dl-ic-${t.id}`} placeholder="counter.cicli_…" .value=${i.counter} @input=${r=>this._setImp(t.id,{counter:r.target.value})} />
              <datalist id=${`dl-ic-${t.id}`}>${Re(this.hass.states).map(r=>l`<option value=${r.id}>${r.name}</option>`)}</datalist>
              <span class="hint">I cicli per giorno si ricostruiscono per quanto il recorder conserva; il resto entra nel totale. Vale anche come punto di partenza della manutenzione.</span></label>
            <label class="f">Sensore di stato on/off (facoltativo)
              <input class="txt" list=${`dl-is-${t.id}`} placeholder="binary_sensor.washing_machine_status" .value=${i.status} @input=${r=>this._setImp(t.id,{status:r.target.value})} />
              <datalist id=${`dl-is-${t.id}`}>${Le(this.hass.states).map(r=>l`<option value=${r.id}>${r.name}</option>`)}</datalist>
              <span class="hint">Per le ore di funzionamento, sempre per quanto conserva il recorder.</span></label>
            <div class="two">
              <label class="f">Quanti giorni indietro<span class="numrow"><input class="num" inputmode="numeric" .value=${i.days} @input=${r=>this._setImp(t.id,{days:r.target.value})} /><span class="u">giorni</span></span></label>
              <label class="f">Prezzo per il costo (€/kWh)<span class="numrow"><input class="num" inputmode="decimal" placeholder=${this._price} .value=${i.price} @input=${r=>this._setImp(t.id,{price:r.target.value})} /></span>
                <span class="hint">Vuoto = il prezzo attuale. Il vecchio pacchetto non salvava il costo: si ricalcola.</span></label>
            </div>
            <div class="hint">I giorni già misurati da questa integrazione non vengono toccati. Si può ripetere senza doppioni.</div>
            <button class="btn primary" ?disabled=${!n||i.busy||!i.energy.trim()&&!i.counter.trim()&&!i.status.trim()} @click=${()=>void this._import(t)}>${i.busy?"Importo\u2026":"Importa lo storico"}</button>
            ${i.msg?l`<div class=${i.err?"err":"ok"}>${i.msg}</div>`:d}
          </div>`:d}`}_num(t,i,n,r,o){return l`<label class="f">${n}
      <span class="numrow"><input class="num" inputmode="decimal" .value=${String(t[i])} @change=${a=>{let c=Number(a.target.value.replace(",","."));Number.isFinite(c)&&c>=0?this._patch(t.id,{[i]:c}):a.target.value=String(t[i])}} /><span class="u">${r}</span></span>
      <span class="hint">${o}</span></label>`}_editor(t){let i=this.info.types[t.type],n=this.hass.states[t.entity],r=this._list.filter(o=>o.id!==t.id).map(o=>o.entity);return l`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:power-plug"></ha-icon>Presa: <b>${ie(this.hass.states,t.entity)}</b> <code>${t.entity}</code> · ora ${n?`${n.state} ${String(n.attributes.unit_of_measurement??"")}`.trim():"non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${t.name} @change=${o=>this._patch(t.id,{name:o.target.value.trim()||t.name})} /></label>
        <label class="f">Sensore di potenza della presa (W)
          <input class="txt" list=${`dl-pw-${t.id}`} .value=${t.entity} @change=${o=>this._patch(t.id,{entity:o.target.value.trim()})} />
          <datalist id=${`dl-pw-${t.id}`}>${te(this.hass.states,r).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>
        <label class="f">Contatore di energia della presa (facoltativo)
          <input class="txt" list=${`dl-en-${t.id}`} placeholder="sensor.…_energia" .value=${t.energy_entity??""} @change=${o=>this._patch(t.id,{energy_entity:o.target.value.trim()||null})} />
          <datalist id=${`dl-en-${t.id}`}>${ee(this.hass.states).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
          <span class="hint">Se manca, l'energia si ricava dalla potenza. Con il contatore della presa è più precisa.</span></label>

        <div class="f">Dispositivi collegati (facoltativi)
          <div class="chips">
            ${t.extras.map(o=>l`<span class="tag"><span>${o.label||ie(this.hass.states,o.entity)}</span><button aria-label=${`Togli ${o.entity}`} @click=${()=>this._patch(t.id,{extras:t.extras.filter(a=>a.entity!==o.entity)})}>✕</button></span>`)}
            ${t.extras.length===0?l`<span class="hint">Nessuno</span>`:d}
          </div>
          <div class="addrow">
            <input class="txt" list=${`dl-ex-${t.id}`} placeholder="sensor.programma_asciugatrice" .value=${this._extra} @input=${o=>this._extra=o.target.value} />
            <datalist id=${`dl-ex-${t.id}`}>${Ne(this.hass.states,t.extras.map(o=>o.entity)).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
            <button class="btn" ?disabled=${!this._extra.trim()} @click=${()=>{let o=this._extra.trim();/^[a-z_]+\.[a-z0-9_]+$/.test(o)&&!t.extras.some(a=>a.entity===o)&&this._patch(t.id,{extras:[...t.extras,{entity:o,label:""}]}),this._extra=""}}>Aggiungi</button>
          </div>
          <span class="hint">Per esempio programma, tempo rimanente o stato dell'integrazione del costruttore: si vedono sulla scheda e nelle statistiche.</span>
        </div>

        ${i.has_finished?l`<div class="row"><div class="t"><div class="lab">Avvisa a fine ciclo</div><div class="hint">Manda la notifica ai servizi scelti qui sotto e genera l'evento <code>elettrodomestici_ciclo_terminato</code>.</div></div>
              <button class=${t.notify?"sw on":"sw"} role="switch" aria-checked=${t.notify?"true":"false"} aria-label="Avvisa a fine ciclo" @click=${()=>this._patch(t.id,{notify:!t.notify})}><span class="knob"></span></button></div>`:l`<div class="row"><div class="t"><div class="lab">Avvisa se resta acceso a lungo</div><div class="hint">Notifica e evento <code>elettrodomestici_avviso</code>.</div></div>
              <button class=${t.notify?"sw on":"sw"} role="switch" aria-checked=${t.notify?"true":"false"} aria-label="Avvisa se resta acceso" @click=${()=>this._patch(t.id,{notify:!t.notify})}><span class="knob"></span></button></div>`}
        <div class="two">
          ${this._num(t,"alert_minutes","Avviso se in funzione da pi\xF9 di","min","0 = nessun avviso.")}
          ${i.maint_label&&i.has_finished?this._num(t,"maint_cycles","Manutenzione ogni","cicli",`${i.maint_label}. 0 = non seguirla.`):d}
        </div>

        <button class="adv" aria-expanded=${this._advanced===t.id?"true":"false"} @click=${()=>this._advanced=this._advanced===t.id?"":t.id}>${this._advanced===t.id?"\u25BE":"\u25B8"} Soglie e tempi (avanzate)</button>
        ${this._advanced===t.id?l`<div class="two">${Si.filter(o=>o.key!=="heat_w"||i.phases.length>1).map(o=>this._num(t,o.key,o.label,o.unit,o.hint))}</div>
              <button class="btn" @click=${()=>this._reset(t)}>Ripristina i valori predefiniti</button>`:d}
        ${this._importBox(t)}
        <button class="btn del" @click=${()=>this._remove(t.id)}>Togli dall'elenco</button>
      </div>`}render(){if(!this.info)return d;let t=Zt(this._list),i=Oe(this.hass.services).filter(o=>!this._notify.includes(o)),n=this._list.map(o=>o.entity),r=this._addType?this.info.types[this._addType]:null;return l`
      <div class="backdrop" @click=${o=>o.target===o.currentTarget&&this._close()}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Preferenze elettrodomestici">
          <div class="head"><div class="title">Preferenze degli elettrodomestici</div><button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button></div>
          <div class="body">
            <div class="sec">Elettrodomestici</div>
            ${this._list.length===0?l`<div class="empty">Nessun elettrodomestico: aggiungine uno qui sotto.</div>`:d}
            ${this._list.map(o=>l`
                <div class="item">
                  <button class="head2" aria-expanded=${this._open===o.id?"true":"false"} @click=${()=>this._open=this._open===o.id?"":o.id}>
                    <ha-icon icon=${Bt[o.type]}></ha-icon>
                    <span class="nm">${o.name}<span class="eid">${o.entity}</span></span>
                    <span class="meta">${Z[o.type]}</span>
                    <span class="chev">${this._open===o.id?"\u25BE":"\u25B8"}</span>
                  </button>
                  ${this._open===o.id?this._editor(o):d}
                </div>`)}

            <div class="sec">Aggiungi un elettrodomestico</div>
            <div class="types">
              ${Se.map(o=>l`<button class=${this._addType===o?"type on":"type"} aria-pressed=${this._addType===o?"true":"false"} @click=${()=>this._addType=this._addType===o?"":o}><ha-icon icon=${Bt[o]}></ha-icon>${Z[o]}</button>`)}
            </div>
            ${r?l`<div class="addbox">
                  <label class="f">Sensore di potenza della presa (W)
                    <input class="txt" list="dl-add" placeholder="sensor.presa_…_potenza" .value=${this._addEntity} @input=${o=>this._addEntity=o.target.value} />
                    <datalist id="dl-add">${te(this.hass.states,n).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>
                  <label class="f">Nome (facoltativo)<input class="txt" placeholder=${r.label} .value=${this._addName} @input=${o=>this._addName=o.target.value} /></label>
                  <div class="hint">Parte oltre ${r.start_w} W${r.phases.length>1?`, fasi: ${r.phases.join(" \u2192 ")}`:""}${r.has_finished?`, finisce dopo ${C(r.end_delay)} sotto ${r.stop_w} W`:""}. Le soglie si possono cambiare dopo.</div>
                  <button class="btn primary" ?disabled=${!this._addEntity.trim()} @click=${()=>this._add()}>Aggiungi ${r.label.toLowerCase()}</button>
                </div>`:d}

            <div class="sec">Costo dell'energia</div>
            <label class="f">Prezzo (€/kWh)
              <input class="num wide" inputmode="decimal" .value=${this._price} @input=${o=>this._price=o.target.value} /></label>
            <label class="f">Oppure un sensore con il prezzo attuale (facoltativo)
              <input class="txt" list="dl-price" placeholder="sensor.prezzo_energia" .value=${this._priceEntity} @input=${o=>this._priceEntity=o.target.value} />
              <datalist id="dl-price">${Ie(this.hass.states).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
              <span class="hint">Se c'è e ha un valore, vale al posto del prezzo fisso.</span></label>

            <div class="sec">Notifiche</div>
            <div class="chips">
              ${this._notify.map(o=>l`<span class="tag"><span>${o}</span><button aria-label=${`Togli ${o}`} @click=${()=>this._notify=this._notify.filter(a=>a!==o)}>✕</button></span>`)}
              ${this._notify.length===0?l`<span class="hint">Nessun servizio: si genera solo l'evento nel bus di Home Assistant.</span>`:d}
            </div>
            <div class="addrow">
              <input class="txt" list="dl-svc" placeholder="notify.mobile_app_telefono" .value=${this._svc} @input=${o=>this._svc=o.target.value} />
              <datalist id="dl-svc">${i.map(o=>l`<option value=${o}></option>`)}</datalist>
              <button class="btn" ?disabled=${!/^notify\.[a-z0-9_]+$/.test(this._svc.trim())} @click=${()=>{let o=this._svc.trim();this._notify.includes(o)||(this._notify=[...this._notify,o]),this._svc=""}}>Aggiungi</button>
            </div>

            ${t?l`<div class="err">${t}</div>`:d}
            ${this._error?l`<div class="err">${this._error}</div>`:d}
          </div>
          <div class="foot">
            <button class="btn" @click=${()=>this._close()}>Annulla</button>
            <button class="btn primary" ?disabled=${this._busy||!!t} @click=${()=>void this._save()}>Salva</button>
          </div>
        </div>
      </div>`}static{this.styles=[it,R`
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
    `]}};m([S({attribute:!1})],w.prototype,"hass",2),m([S({attribute:!1})],w.prototype,"info",2),m([S()],w.prototype,"openKey",2),m([v()],w.prototype,"_list",2),m([v()],w.prototype,"_price",2),m([v()],w.prototype,"_priceEntity",2),m([v()],w.prototype,"_notify",2),m([v()],w.prototype,"_open",2),m([v()],w.prototype,"_addType",2),m([v()],w.prototype,"_addEntity",2),m([v()],w.prototype,"_addName",2),m([v()],w.prototype,"_extra",2),m([v()],w.prototype,"_svc",2),m([v()],w.prototype,"_advanced",2),m([v()],w.prototype,"_imp",2),m([v()],w.prototype,"_busy",2),m([v()],w.prototype,"_error",2);customElements.get("elettro-settings-dialog")||customElements.define("elettro-settings-dialog",w);var ht=[{key:"oggi",label:"Oggi"},{key:"ieri",label:"Ieri"},{key:"settimana",label:"Settimana"},{key:"mese",label:"Mese"},{key:"anno",label:"Anno"},{key:"totale",label:"Totale"}],W=class extends z{constructor(){super(...arguments);this.openKey="";this._stats=null;this._error="";this._now=Date.now();this._onKey=t=>{t.key==="Escape"&&this._close()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._tick=window.setInterval(()=>this._now=Date.now(),1e3),this._poll=window.setInterval(()=>void this._load(),6e4),this._load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey),this._tick&&window.clearInterval(this._tick),this._poll&&window.clearInterval(this._poll)}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_go(t){this.dispatchEvent(new CustomEvent("open-dialog",{detail:{tag:t,key:this.openKey}})),this._close()}get _app(){return this.info.appliances.find(t=>t.key===this.openKey)}async _load(){try{let t=await this.hass.callWS({type:"elettrodomestici/stats",entry_id:this.info.entry_id,key:this.openKey});this._stats=t[this.openKey]??null,this._error=""}catch(t){this._error=`Impossibile leggere le statistiche: ${t instanceof Error?t.message:t?.message??String(t)}`}}async _maintDone(){await this.hass.callWS({type:"elettrodomestici/action",entry_id:this.info.entry_id,key:this.openKey,action:"reset_maintenance"}),await this._load()}render(){let t=this._app;if(!t)return d;let i=zt(t,this.hass.states,this.info.types,this._now),n=this.info.types[t.type],r=this._stats,o=!n?.has_finished&&t.type==="frigorifero";return l`
      <div class="backdrop" @click=${a=>a.target===a.currentTarget&&this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Statistiche ${t.name}`}>
          <div class="head">
            <div class="title">${t.name}${t.name!==Z[t.type]?l` <span class="sub">${Z[t.type]}</span>`:d}</div>
            <button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button>
          </div>
          <div class="body">
            <div class="now ${i.tone}">
              <span class="img">${$t(At(t.type,i.state))}</span>
              <div class="nowtxt">
                <div class="st">${tt[i.state]}${i.state==="in_funzione"?l` · <b>${i.phase}</b>`:i.state==="terminato"?l` · <b>${i.phase}</b>`:d}</div>
                <div class="big">${q(i.power)}</div>
                ${i.state==="in_funzione"&&i.cycleKwh!==null?l`<div class="line">Questo ciclo: <b>${T(i.cycleKwh)}</b> · ${P(i.cycleEur)}${i.remainingText?l` · ${i.remainingText}`:d}</div>`:d}
                ${i.state==="in_funzione"&&t.inizio?l`<div class="line">Partita alle ${Yt(t.inizio)}</div>`:d}
                ${i.state==="terminato"?l`<div class="line">Finita alle ${Yt(t.fine)}.</div>`:d}
              </div>
            </div>

            ${i.extras.length?l`<div class="sec">Collegato al dispositivo</div><div class="kv">${i.extras.map(a=>l`<span>${a.label}</span><b>${a.value}</b>`)}</div>`:d}

            <div class="sec">Consumi</div>
            ${r?l`<div class="tblwrap"><table>
                  <thead><tr><th></th>${ht.map(a=>l`<th>${a.label}</th>`)}</tr></thead>
                  <tbody>
                    <tr><th>Energia</th>${ht.map(a=>l`<td>${T(r.periods[a.key].kwh)}</td>`)}</tr>
                    <tr><th>Costo</th>${ht.map(a=>l`<td>${P(r.periods[a.key].eur)}</td>`)}</tr>
                    <tr><th>${o?"Avvii compressore":"Cicli"}</th>${ht.map(a=>l`<td>${$(r.periods[a.key].cycles)}</td>`)}</tr>
                    <tr><th>Funzionamento</th>${ht.map(a=>l`<td>${Ft(r.periods[a.key].sec)}</td>`)}</tr>
                  </tbody></table></div>
                <div class="hint">Costo calcolato a ${$(r.price_kwh,3)} €/kWh. L'energia comprende anche i consumi a riposo.</div>`:this._error?d:l`<div class="muted">Carico…</div>`}

            ${r?.summary?l`<div class="sec">${o?"Compressore":"Ciclo medio"} <span class="sub">(ultimi ${r.summary.count})</span></div>
                <div class="kv">
                  <span>Durata media</span><b>${C(r.summary.avg_seconds)}</b>
                  <span>Più corto / più lungo</span><b>${C(r.summary.min_seconds)} / ${C(r.summary.max_seconds)}</b>
                  <span>Energia media</span><b>${T(r.summary.avg_kwh)} · ${P(r.summary.avg_eur)}</b>
                  <span>Energia massima</span><b>${T(r.summary.max_kwh)}</b>
                </div>`:d}

            ${n&&t.maint_cycles>0&&r?l`<div class="sec">Manutenzione</div>
                <div class="maint ${r.maintenance.due?"due":""}">
                  <div class="mrow"><span>${n.maint_label}</span><b>${r.maintenance.count} / ${r.maintenance.threshold} cicli</b></div>
                  <div class="bar"><i style="width:${r.maintenance.pct??0}%"></i></div>
                  <button class="btn" @click=${()=>void this._maintDone()}><ha-icon icon="mdi:check"></ha-icon>Manutenzione fatta</button>
                </div>`:d}

            ${r&&r.cycles.length?l`<div class="sec">Ultimi cicli</div>
                <div class="tblwrap"><table class="cyc">
                  <thead><tr><th>Quando</th><th>Durata</th><th>Energia</th><th>Costo</th><th>Picco</th></tr></thead>
                  <tbody>${r.cycles.slice(0,15).map(a=>l`<tr><td>${Et(Date.parse(a.s))}</td><td>${C((Date.parse(a.e)-Date.parse(a.s))/1e3)}</td><td>${T(a.kwh)}</td><td>${P(a.eur)}</td><td>${q(a.pk)}</td></tr>`)}</tbody>
                </table></div>`:r?l`<div class="sec">Ultimi cicli</div><div class="muted">Nessun ciclo registrato.</div>`:d}

            <div class="sec">Come lo riconosco</div>
            <div class="kv small">
              <span>Presa (potenza)</span><b>${t.entity}</b>
              ${t.energy_entity?l`<span>Presa (energia)</span><b>${t.energy_entity}</b>`:d}
              <span>Parte sopra</span><b>${q(t.start_w)} per ${t.start_delay} s</b>
              <span>Finisce sotto</span><b>${q(t.stop_w)} per ${C(t.end_delay)}</b>
              ${n?.phases.length&&n.phases.length>1?l`<span>Fasi</span><b>${n.phases.join(" \u2192 ")}</b>`:d}
              <span>Cicli più brevi di</span><b>${C(t.min_cycle)} non contano</b>
            </div>
            ${this._error?l`<div class="err">${this._error}</div>`:d}
          </div>
          <div class="foot">
            <button class="btn" @click=${()=>this._go("elettro-settings-dialog")}><ha-icon icon="mdi:cog"></ha-icon>Preferenze</button>
            <button class="btn primary" @click=${()=>this._go("elettro-charts-dialog")}><ha-icon icon="mdi:chart-line"></ha-icon>Grafici</button>
          </div>
        </div>
      </div>`}static{this.styles=[it,R`
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
    `]}};m([S({attribute:!1})],W.prototype,"hass",2),m([S({attribute:!1})],W.prototype,"info",2),m([S()],W.prototype,"openKey",2),m([v()],W.prototype,"_stats",2),m([v()],W.prototype,"_error",2),m([v()],W.prototype,"_now",2);customElements.get("elettro-stats-dialog")||customElements.define("elettro-stats-dialog",W);var ne=[{id:"6h",label:"6 ore",ms:6*36e5},{id:"24h",label:"24 ore",ms:24*36e5},{id:"3d",label:"3 giorni",ms:3*864e5},{id:"7d",label:"7 giorni",ms:7*864e5}],Ai=[{id:7,label:"7 giorni"},{id:30,label:"30 giorni"},{id:90,label:"90 giorni"}],L=220,I=10,E=44,Fe=22,Tt=12,k=class extends z{constructor(){super(...arguments);this.openKey="";this._tab="potenza";this._range="24h";this._days=30;this._metric="kwh";this._loading=!1;this._error="";this._w=640;this._hover=null;this._values=[];this._segs=[];this._stats=null;this._t0=0;this._t1=0;this._n=240;this._raw=[];this._rawStates=[];this._wrapEl=null;this._seq=0;this._onKey=t=>{t.key==="Escape"&&this._close()}}get _app(){return this.info.appliances.find(t=>t.key===this.openKey)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._timer=window.setInterval(()=>void this._load(),6e4),this._load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey),this._ro?.disconnect(),this._timer&&window.clearInterval(this._timer)}updated(){let t=this.renderRoot.querySelector(".chartwrap");t&&t!==this._wrapEl&&(this._ro?.disconnect(),this._wrapEl=t,this._ro=new ResizeObserver(i=>{let n=Math.floor(i[0]?.contentRect.width??640);n>100&&Math.abs(n-this._w)>2&&(this._w=n,this._recompute())}),this._ro.observe(t))}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_go(t){this.dispatchEvent(new CustomEvent("open-dialog",{detail:{tag:t,key:this.openKey}})),this._close()}async _history(t,i,n){return this.hass.callWS({type:"history/history_during_period",start_time:new Date(i).toISOString(),end_time:new Date(n).toISOString(),entity_ids:t,include_start_time_state:!0,significant_changes_only:!1,minimal_response:!0,no_attributes:!0})}async _load(){let t=this._app;if(!this.hass||!t)return;let i=++this._seq;this._loading=!0;try{if(this._tab==="consumi"){let n=await this.hass.callWS({type:"elettrodomestici/stats",entry_id:this.info.entry_id,key:t.key});if(i!==this._seq)return;this._stats=n[t.key]??null}else{let n=ne.find(u=>u.id===this._range)??ne[1],r=Date.now(),o=r-n.ms,a=t.entities.stato,c=await this._history(a?[t.entity,a]:[t.entity],o,r);if(i!==this._seq)return;this._t0=o,this._t1=r,this._raw=We(c[t.entity]),this._rawStates=a?c[a]??[]:[],this._recompute()}this._error=""}catch(n){i===this._seq&&(this._error=`Impossibile leggere i dati: ${n instanceof Error?n.message:n?.message??String(n)}`)}finally{i===this._seq&&(this._loading=!1)}}_recompute(){this._t1&&(this._n=Math.max(60,Math.min(480,Math.floor((this._w-E-8)/2))),this._values=Ke(this._raw,this._t0,this._t1,this._n,30*6e4),this._segs=De(this._rawStates,this._t0,this._t1))}_setTab(t){this._tab=t,this._hover=null,this._load()}_setRange(t){this._range=t,this._hover=null,this._load()}_move(t,i,n,r){let o=t.currentTarget.getBoundingClientRect(),a=Math.round((t.clientX-o.left-n)/r*(i-1));this._hover=a>=0&&a<i?a:null}_moveBar(t,i,n,r){let o=t.currentTarget.getBoundingClientRect(),a=Math.floor((t.clientX-o.left-n)/r*i);this._hover=a>=0&&a<i?a:null}_power(t){let i=this._values.filter(p=>p!==null),n=Qt(this.hass.states[t.entity]),r=Math.max(t.start_w*1.5,...i.length?i:[0],n??0),o=se(0,r,5),a=this._w,c=a-E-8,u=I+L+Tt+Fe+6,g=p=>E+(this._n<=1?0:p/(this._n-1)*c),h=p=>I+L-(p-o.min)/(o.max-o.min||1)*L,b=p=>E+(p-this._t0)/(this._t1-this._t0||1)*c,y=[{v:t.start_w,c:K.in_funzione,l:"avvio"},...t.stop_w!==t.start_w?[{v:t.stop_w,c:K.spento,l:"fine"}]:[],...t.heat_w<o.max?[{v:t.heat_w,c:"#ef4444",l:"riscaldamento"}]:[]],_=this._hover,M=_!==null&&this._n>1?this._t0+_/(this._n-1)*(this._t1-this._t0):null,x=_!==null?this._values[_]:null,N=M!==null?je(this._segs,M):null;return l`
      <div class="ranges">
        ${ne.map(p=>l`<button class=${p.id===this._range?"chip on":"chip"} @click=${()=>this._setRange(p.id)}>${p.label}</button>`)}
        ${this._loading?l`<span class="load">aggiorno…</span>`:d}
      </div>
      <div class="chartwrap">
        <div class="tip">
          ${M!==null?l`<b>${Et(M)}</b> · ${x!==null?`${$(x,0)} W`:"nessun dato"}${N?l` · <span style="color:${K[N]==="transparent"?"inherit":K[N]}">${tt[N]}</span>`:d}`:l`<span class="muted">Tocca il grafico per leggere i valori</span>`}
        </div>
        <svg width=${a} height=${u} viewBox="0 0 ${a} ${u}" @pointermove=${p=>this._move(p,this._n,E,c)} @pointerdown=${p=>this._move(p,this._n,E,c)} @pointerleave=${()=>this._hover=null}>
          ${o.ticks.map(p=>H`
            <line x1=${E} x2=${a-8} y1=${h(p)} y2=${h(p)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
            <text x=${E-6} y=${h(p)+4} text-anchor="end" class="ax">${$(p)}</text>`)}
          ${y.map((p,f)=>H`<line x1=${E} x2=${a-8} y1=${h(p.v)} y2=${h(p.v)} stroke=${p.c} stroke-width="1.2" stroke-dasharray="5 4" opacity="0.9" />
            ${f===0||Math.abs(h(y[f-1].v)-h(p.v))>=13?H`<text x=${a-10} y=${h(p.v)-3} text-anchor="end" class="th" fill=${p.c}>${p.l} ${$(p.v,p.v%1?1:0)} W${f<y.length-1&&Math.abs(h(y[f+1].v)-h(p.v))<13?` \xB7 ${y[f+1].l} ${$(y[f+1].v,y[f+1].v%1?1:0)} W`:""}</text>`:d}`)}
          <path d=${Be(this._values,g,h)} fill="none" stroke="var(--primary-color,#03a9f4)" stroke-width="1.8" stroke-linejoin="round" />
          ${_!==null&&x!==null?H`<line x1=${g(_)} x2=${g(_)} y1=${I} y2=${I+L} stroke="var(--secondary-text-color,#888)" stroke-width="1" /><circle cx=${g(_)} cy=${h(x)} r="4" fill="var(--primary-color,#03a9f4)" />`:d}
          ${this._segs.map(p=>H`<rect x=${b(p.from)} y=${I+L+4} width=${Math.max(1,b(p.to)-b(p.from))} height=${Tt} fill=${K[p.state]==="transparent"?"#9aa1ad":K[p.state]} opacity=${p.state==="non_disponibile"?.35:.9} />`)}
          ${qe(this._t0,this._t1).map(p=>H`
            <line x1=${b(p.t)} x2=${b(p.t)} y1=${I+L+Tt+4} y2=${I+L+Tt+8} stroke="var(--secondary-text-color,#888)" />
            <text x=${b(p.t)} y=${u-4} text-anchor="middle" class=${p.major?"ax maj":"ax"}>${p.label}</text>`)}
        </svg>
        <div class="legend">
          ${["spento","in_funzione","terminato"].map(p=>l`<span><i style="background:${K[p]}"></i>${tt[p]}</span>`)}
        </div>
      </div>
      ${!this._loading&&!this._error&&this._values.every(p=>p===null)?l`<div class="empty">Nessun dato di potenza nel periodo.</div>`:d}`}_consumi(){let t=this._stats;if(!t)return l`<div class="empty">${this._loading?"Carico\u2026":"Nessun dato."}</div>`;let i=t.series.slice(-this._days),n=this._metric,r=i.map(f=>f[n]),o=Math.max(...r,n==="cycles"?1:.01),a=se(0,o,5),c=this._w,u=c-E-8,g=I+L+Fe+6,h=i.length,b=u/h,y=Math.max(2,Math.min(28,b-(b>6?2:0))),_=f=>I+L-(f-a.min)/(a.max-a.min||1)*L,M=f=>E+f*b+(b-y)/2,x=this._hover,N=Ce(i,this._days),p=Math.max(1,Math.ceil(h/7));return l`
      <div class="ranges">
        ${Ai.map(f=>l`<button class=${f.id===this._days?"chip on":"chip"} @click=${()=>(this._days=f.id,this._hover=null)}>${f.label}</button>`)}
        <span class="sep"></span>
        ${Object.keys(Xt).map(f=>l`<button class=${f===n?"chip on":"chip"} @click=${()=>(this._metric=f,this._hover=null)}>${Xt[f]}</button>`)}
        ${this._loading?l`<span class="load">aggiorno…</span>`:d}
      </div>
      <div class="totals"><span>Totale nel periodo</span><b>${T(N.kwh)}</b><b>${P(N.eur)}</b><b>${Jt("cycles",N.cycles)}</b></div>
      <div class="chartwrap">
        <div class="tip">
          ${x!==null&&i[x]?l`<b>${Gt(i[x].date)}</b> · ${Jt(n,i[x][n])}${n!=="kwh"?l` · ${T(i[x].kwh)}`:d}${n!=="eur"?l` · ${P(i[x].eur)}`:d}`:l`<span class="muted">Tocca una barra per leggere il giorno</span>`}
        </div>
        <svg width=${c} height=${g} viewBox="0 0 ${c} ${g}" @pointermove=${f=>this._moveBar(f,h,E,u)} @pointerdown=${f=>this._moveBar(f,h,E,u)} @pointerleave=${()=>this._hover=null}>
          ${a.ticks.map(f=>H`
            <line x1=${E} x2=${c-8} y1=${_(f)} y2=${_(f)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
            <text x=${E-6} y=${_(f)+4} text-anchor="end" class="ax">${$(f,(n==="kwh"||n==="eur")&&a.max<5?1:0)}</text>`)}
          ${i.map((f,D)=>H`<rect x=${M(D)} y=${_(f[n])} width=${y} height=${Math.max(0,I+L-_(f[n]))} rx=${y>6?3:1} fill=${x===D?"var(--primary-color,#03a9f4)":"#f59e0b"} opacity=${x===null||x===D?1:.55} />`)}
          ${i.map((f,D)=>D%p===0?H`<text x=${M(D)+y/2} y=${g-4} text-anchor="middle" class="ax">${Gt(f.date).replace(/^\w+ /,"")}</text>`:d)}
        </svg>
      </div>`}render(){let t=this._app;return t?l`
      <div class="backdrop" @click=${i=>i.target===i.currentTarget&&this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Grafici ${t.name}`}>
          <div class="head">
            <div class="title">Grafici · ${t.name}</div>
            <button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button>
          </div>
          <div class="body">
            <div class="tabs" role="tablist">
              <button role="tab" aria-selected=${this._tab==="potenza"} class=${this._tab==="potenza"?"tab on":"tab"} @click=${()=>this._setTab("potenza")}>Potenza</button>
              <button role="tab" aria-selected=${this._tab==="consumi"} class=${this._tab==="consumi"?"tab on":"tab"} @click=${()=>this._setTab("consumi")}>Consumi</button>
            </div>
            ${this._tab==="potenza"?this._power(t):this._consumi()}
            ${this._error?l`<div class="err">${this._error}</div>`:d}
          </div>
          <div class="foot">
            <button class="btn" @click=${()=>this._go("elettro-stats-dialog")}><ha-icon icon="mdi:information-outline"></ha-icon>Dettagli</button>
          </div>
        </div>
      </div>`:d}static{this.styles=[it,R`
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
    `]}};m([S({attribute:!1})],k.prototype,"hass",2),m([S({attribute:!1})],k.prototype,"info",2),m([S()],k.prototype,"openKey",2),m([v()],k.prototype,"_tab",2),m([v()],k.prototype,"_range",2),m([v()],k.prototype,"_days",2),m([v()],k.prototype,"_metric",2),m([v()],k.prototype,"_loading",2),m([v()],k.prototype,"_error",2),m([v()],k.prototype,"_w",2),m([v()],k.prototype,"_hover",2),m([v()],k.prototype,"_values",2),m([v()],k.prototype,"_segs",2),m([v()],k.prototype,"_stats",2);customElements.get("elettro-charts-dialog")||customElements.define("elettro-charts-dialog",k);var B=class extends z{constructor(){super(...arguments);this._config={type:"custom:elettrodomestici-card"};this._info=null;this._error="";this._now=Date.now();this._loadedAt=0;this._loading=!1;this._syncers=new Set}setConfig(t){this._config={...t},this._info=null,this._loadedAt=0}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:4}}static getStubConfig(){return{type:"custom:elettrodomestici-card"}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}},{name:"columns",selector:{number:{min:0,max:8,step:1,mode:"box"}}}],computeLabel:t=>t.name==="title"?"Titolo":t.name==="columns"?"Colonne (0 = automatico)":t.name}}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>this._now=Date.now(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._tick&&window.clearInterval(this._tick)}willUpdate(){for(let t of this._syncers)t()}updated(){this.hass&&!this._loading&&(!this._info||Date.now()-this._loadedAt>5*6e4)&&this._loadInfo()}async _loadInfo(){this._loading=!0;try{let t={type:"elettrodomestici/info"};this._config.entry_id&&(t.entry_id=this._config.entry_id),this._info=await this.hass.callWS(t),this._error=""}catch(t){let i=t instanceof Error?t.message:t?.message??String(t);this._error=`Elettrodomestici non configurato o integrazione non caricata (${i}).`}finally{this._loadedAt=Date.now(),this._loading=!1}}async _open(t,i=""){if(!this._info)return;for(;this._loading;)await new Promise(o=>setTimeout(o,50));if(await this._loadInfo(),!this._info)return;let n=document.createElement(t);n.hass=this.hass,n.info=this._info,n.openKey=i,n.addEventListener("open-dialog",o=>{let a=o.detail;this._open(a.tag,a.key)}),n.addEventListener("saved",()=>{this._loadedAt=0,this._loadInfo()}),document.body.appendChild(n);let r=()=>{n.isConnected&&(n.hass=this.hass)};this._syncers.add(r),n.addEventListener("closed",()=>this._syncers.delete(r))}_ack(t){this.hass.callWS({type:"elettrodomestici/action",entry_id:this._info?.entry_id,key:t,action:"acknowledge"})}_tile(t){return l`
      <div class="tile ${t.tone}">
        <button class="main" aria-label=${`Statistiche di ${t.name}`} @click=${()=>void this._open("elettro-stats-dialog",t.key)}>
          <span class="img">${$t(At(t.type,t.state))}</span>
          <span class="info">
            <span class="n">${t.name}</span>
            <span class="badge ${t.tone}">${t.statusLine}</span>
            <span class="pw ${t.state==="in_funzione"?"on":""}">${q(t.power)}</span>
            <span class="row">${t.state==="in_funzione"&&t.cycleKwh!==null?l`Questo ciclo <b>${T(t.cycleKwh)}</b> · ${P(t.cycleEur)}`:l`Oggi <b>${T(t.todayKwh)}</b> · ${P(t.todayEur)}`}</span>
            <span class="row">${t.todayCycles===1?"1 ciclo oggi":`${$(t.todayCycles)} cicli oggi`}${t.state==="in_funzione"&&t.cycleKwh!==null?l` · oggi ${T(t.todayKwh)}`:d}</span>
          </span>
        </button>
        ${t.progress!==null?l`<div class="bar" title=${t.progressLabel}><i style="width:${(t.progress*100).toFixed(0)}%"></i></div><div class="barlab">${t.progressLabel}${t.remainingText?` \xB7 ${t.remainingText}`:""}</div>`:t.remainingText?l`<div class="barlab">${t.remainingText}</div>`:d}
        ${t.extras.length?l`<div class="extras">${t.extras.slice(0,3).map(i=>l`<span><i>${i.label}</i> ${i.value}</span>`)}</div>`:d}
        ${t.maintDue?l`<div class="warn"><ha-icon icon="mdi:wrench-clock"></ha-icon>Manutenzione consigliata</div>`:d}
        <div class="acts">
          ${t.canAck?l`<button class="a ok" @click=${()=>this._ack(t.key)}><ha-icon icon="mdi:check"></ha-icon>Ho svuotato</button>`:d}
          <button class="a" aria-label=${`Grafici di ${t.name}`} @click=${()=>void this._open("elettro-charts-dialog",t.key)}><ha-icon icon="mdi:chart-line"></ha-icon>Grafici</button>
          <button class="a" aria-label=${`Statistiche di ${t.name}`} @click=${()=>void this._open("elettro-stats-dialog",t.key)}><ha-icon icon="mdi:information-outline"></ha-icon>Dettagli</button>
        </div>
      </div>`}render(){if(!this.hass)return d;let t=this._config.title??this._info?.title??"Elettrodomestici";if(this._error&&!this._info)return l`<ha-card><div class="pad"><div class="title">${t}</div><div class="errbox">${this._error}</div></div></ha-card>`;if(!this._info)return l`<ha-card><div class="pad"><div class="title">${t}</div><div class="muted">Carico…</div></div></ha-card>`;let i=Array.isArray(this._config.appliances)?this._config.appliances:null,r=(i?this._info.appliances.filter(a=>i.includes(a.key)):this._info.appliances).map(a=>zt(a,this.hass.states,this._info?.types,this._now)),o=l`<div class="grid" style=${`grid-template-columns:${Te(this._config.columns)}`}>${r.map(a=>this._tile(a))}</div>`;return this._config.header===!1?l`<ha-card><div class="pad compact">${o}</div></ha-card>`:l`
      <ha-card>
        <div class="pad">
          <div class="head">
            <div>
              <div class="title">${t}</div>
              <div class="sum">${Me(r)}</div>
            </div>
            <button class="ib" aria-label="Preferenze" @click=${()=>void this._open("elettro-settings-dialog")}><ha-icon icon="mdi:cog"></ha-icon></button>
          </div>
          ${r.length===0?l`<button class="empty" @click=${()=>void this._open("elettro-settings-dialog")}><ha-icon icon="mdi:plus-circle-outline"></ha-icon>Aggiungi il primo elettrodomestico</button>`:o}
        </div>
      </ha-card>`}static{this.styles=R`
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
  `}};m([S({attribute:!1})],B.prototype,"hass",2),m([v()],B.prototype,"_config",2),m([v()],B.prototype,"_info",2),m([v()],B.prototype,"_error",2),m([v()],B.prototype,"_now",2);customElements.get("elettrodomestici-card")||customElements.define("elettrodomestici-card",B);window.customCards=window.customCards||[];window.customCards.push({type:"elettrodomestici-card",name:"Elettrodomestici",description:"Lavatrice, lavastoviglie, asciugatrice, forno, frigorifero e microonde: stato, fasi, consumi, costi, statistiche e grafici."});console.info("%c ELETTRODOMESTICI %c v0.2.0 ","color: white; background: #0f766e; font-weight: 700;","color: #0f766e; background: white; font-weight: 700;");export{B as ElettrodomesticiCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-svg.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
