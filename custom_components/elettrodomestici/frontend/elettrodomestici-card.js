var mi=Object.defineProperty;var fi=Object.getOwnPropertyDescriptor;var g=(n,i,t,e)=>{for(var a=e>1?void 0:e?fi(i,t):i,s=n.length-1,o;s>=0;s--)(o=n[s])&&(a=(e?o(i,t,a):o(a))||a);return e&&a&&mi(i,t,a),a};var At=globalThis,Et=At.ShadowRoot&&(At.ShadyCSS===void 0||At.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Dt=Symbol(),$e=new WeakMap,mt=class{constructor(i,t,e){if(this._$cssResult$=!0,e!==Dt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=t}get styleSheet(){let i=this.o,t=this.t;if(Et&&i===void 0){let e=t!==void 0&&t.length===1;e&&(i=$e.get(t)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),e&&$e.set(t,i))}return i}toString(){return this.cssText}},xe=n=>new mt(typeof n=="string"?n:n+"",void 0,Dt),I=(n,...i)=>{let t=n.length===1?n[0]:i.reduce((e,a,s)=>e+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+n[s+1],n[0]);return new mt(t,n,Dt)},we=(n,i)=>{if(Et)n.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of i){let e=document.createElement("style"),a=At.litNonce;a!==void 0&&e.setAttribute("nonce",a),e.textContent=t.cssText,n.appendChild(e)}},Bt=Et?n=>n:n=>n instanceof CSSStyleSheet?(i=>{let t="";for(let e of i.cssRules)t+=e.cssText;return xe(t)})(n):n;var{is:gi,defineProperty:bi,getOwnPropertyDescriptor:vi,getOwnPropertyNames:_i,getOwnPropertySymbols:yi,getPrototypeOf:$i}=Object,zt=globalThis,ke=zt.trustedTypes,xi=ke?ke.emptyScript:"",wi=zt.reactiveElementPolyfillSupport,ft=(n,i)=>n,gt={toAttribute(n,i){switch(i){case Boolean:n=n?xi:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,i){let t=n;switch(i){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Tt=(n,i)=>!gi(n,i),Se={attribute:!0,type:String,converter:gt,reflect:!1,useDefault:!1,hasChanged:Tt};Symbol.metadata??=Symbol("metadata"),zt.litPropertyMetadata??=new WeakMap;var j=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,t=Se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(i,t),!t.noAccessor){let e=Symbol(),a=this.getPropertyDescriptor(i,e,t);a!==void 0&&bi(this.prototype,i,a)}}static getPropertyDescriptor(i,t,e){let{get:a,set:s}=vi(this.prototype,i)??{get(){return this[t]},set(o){this[t]=o}};return{get:a,set(o){let r=a?.call(this);s?.call(this,o),this.requestUpdate(i,r,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Se}static _$Ei(){if(this.hasOwnProperty(ft("elementProperties")))return;let i=$i(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(ft("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ft("properties"))){let t=this.properties,e=[..._i(t),...yi(t)];for(let a of e)this.createProperty(a,t[a])}let i=this[Symbol.metadata];if(i!==null){let t=litPropertyMetadata.get(i);if(t!==void 0)for(let[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let a=this._$Eu(t,e);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let t=[];if(Array.isArray(i)){let e=new Set(i.flat(1/0).reverse());for(let a of e)t.unshift(Bt(a))}else i!==void 0&&t.push(Bt(i));return t}static _$Eu(i,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(i.set(e,this[e]),delete this[e]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return we(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,t,e){this._$AK(i,e)}_$ET(i,t){let e=this.constructor.elementProperties.get(i),a=this.constructor._$Eu(i,e);if(a!==void 0&&e.reflect===!0){let s=(e.converter?.toAttribute!==void 0?e.converter:gt).toAttribute(t,e.type);this._$Em=i,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(i,t){let e=this.constructor,a=e._$Eh.get(i);if(a!==void 0&&this._$Em!==a){let s=e.getPropertyOptions(a),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:gt;this._$Em=a;let r=o.fromAttribute(t,s.type);this[a]=r??this._$Ej?.get(a)??r,this._$Em=null}}requestUpdate(i,t,e,a=!1,s){if(i!==void 0){let o=this.constructor;if(a===!1&&(s=this[i]),e??=o.getPropertyOptions(i),!((e.hasChanged??Tt)(s,t)||e.useDefault&&e.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,e))))return;this.C(i,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,t,{useDefault:e,reflect:a,wrapped:s},o){e&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,o??t??this[i]),s!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||e||(t=void 0),this._$AL.set(i,t)),a===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[a,s]of e){let{wrapped:o}=s,r=this[a];o!==!0||this._$AL.has(a)||r===void 0||this.C(a,void 0,s,r)}}let i=!1,t=this._$AL;try{i=this.shouldUpdate(t),i?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw i=!1,this._$EM(),e}i&&this._$AE(t)}willUpdate(i){}_$AE(i){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(i){}firstUpdated(i){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[ft("elementProperties")]=new Map,j[ft("finalized")]=new Map,wi?.({ReactiveElement:j}),(zt.reactiveElementVersions??=[]).push("2.1.2");var Qt=globalThis,Ae=n=>n,Mt=Qt.trustedTypes,Ee=Mt?Mt.createPolicy("lit-html",{createHTML:n=>n}):void 0,Pe="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,Ie="?"+V,ki=`<${Ie}>`,it=document,vt=()=>it.createComment(""),_t=n=>n===null||typeof n!="object"&&typeof n!="function",Jt=Array.isArray,Si=n=>Jt(n)||typeof n?.[Symbol.iterator]=="function",Wt=`[ 	
\f\r]`,bt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ze=/-->/g,Te=/>/g,tt=RegExp(`>|${Wt}(?:([^\\s"'>=/]+)(${Wt}*=${Wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Ce=/"/g,He=/^(?:script|style|textarea|title)$/i,Xt=n=>(i,...t)=>({_$litType$:n,strings:i,values:t}),l=Xt(1),O=Xt(2),vn=Xt(3),D=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Re=new WeakMap,et=it.createTreeWalker(it,129);function Le(n,i){if(!Jt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(i):i}var Ai=(n,i)=>{let t=n.length-1,e=[],a,s=i===2?"<svg>":i===3?"<math>":"",o=bt;for(let r=0;r<t;r++){let c=n[r],p,u,h=-1,b=0;for(;b<c.length&&(o.lastIndex=b,u=o.exec(c),u!==null);)b=o.lastIndex,o===bt?u[1]==="!--"?o=ze:u[1]!==void 0?o=Te:u[2]!==void 0?(He.test(u[2])&&(a=RegExp("</"+u[2],"g")),o=tt):u[3]!==void 0&&(o=tt):o===tt?u[0]===">"?(o=a??bt,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,p=u[1],o=u[3]===void 0?tt:u[3]==='"'?Ce:Me):o===Ce||o===Me?o=tt:o===ze||o===Te?o=bt:(o=tt,a=void 0);let f=o===tt&&n[r+1].startsWith("/>")?" ":"";s+=o===bt?c+ki:h>=0?(e.push(p),c.slice(0,h)+Pe+c.slice(h)+V+f):c+V+(h===-2?r:f)}return[Le(n,s+(n[t]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),e]},yt=class n{constructor({strings:i,_$litType$:t},e){let a;this.parts=[];let s=0,o=0,r=i.length-1,c=this.parts,[p,u]=Ai(i,t);if(this.el=n.createElement(p,e),et.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(a=et.nextNode())!==null&&c.length<r;){if(a.nodeType===1){if(a.hasAttributes())for(let h of a.getAttributeNames())if(h.endsWith(Pe)){let b=u[o++],f=a.getAttribute(h).split(V),y=/([.?@])?(.*)/.exec(b);c.push({type:1,index:s,name:y[2],strings:f,ctor:y[1]==="."?Ft:y[1]==="?"?Vt:y[1]==="@"?Gt:ct}),a.removeAttribute(h)}else h.startsWith(V)&&(c.push({type:6,index:s}),a.removeAttribute(h));if(He.test(a.tagName)){let h=a.textContent.split(V),b=h.length-1;if(b>0){a.textContent=Mt?Mt.emptyScript:"";for(let f=0;f<b;f++)a.append(h[f],vt()),et.nextNode(),c.push({type:2,index:++s});a.append(h[b],vt())}}}else if(a.nodeType===8)if(a.data===Ie)c.push({type:2,index:s});else{let h=-1;for(;(h=a.data.indexOf(V,h+1))!==-1;)c.push({type:7,index:s}),h+=V.length-1}s++}}static createElement(i,t){let e=it.createElement("template");return e.innerHTML=i,e}};function lt(n,i,t=n,e){if(i===D)return i;let a=e!==void 0?t._$Co?.[e]:t._$Cl,s=_t(i)?void 0:i._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(n),a._$AT(n,t,e)),e!==void 0?(t._$Co??=[])[e]=a:t._$Cl=a),a!==void 0&&(i=lt(n,a._$AS(n,i.values),a,e)),i}var Kt=class{constructor(i,t){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:t},parts:e}=this._$AD,a=(i?.creationScope??it).importNode(t,!0);et.currentNode=a;let s=et.nextNode(),o=0,r=0,c=e[0];for(;c!==void 0;){if(o===c.index){let p;c.type===2?p=new $t(s,s.nextSibling,this,i):c.type===1?p=new c.ctor(s,c.name,c.strings,this,i):c.type===6&&(p=new Yt(s,this,i)),this._$AV.push(p),c=e[++r]}o!==c?.index&&(s=et.nextNode(),o++)}return et.currentNode=it,a}p(i){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(i,e,t),t+=e.strings.length-2):e._$AI(i[t])),t++}},$t=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,t,e,a){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=i,this._$AB=t,this._$AM=e,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,t=this._$AM;return t!==void 0&&i?.nodeType===11&&(i=t.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,t=this){i=lt(this,i,t),_t(i)?i===d||i==null||i===""?(this._$AH!==d&&this._$AR(),this._$AH=d):i!==this._$AH&&i!==D&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Si(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==d&&_t(this._$AH)?this._$AA.nextSibling.data=i:this.T(it.createTextNode(i)),this._$AH=i}$(i){let{values:t,_$litType$:e}=i,a=typeof e=="number"?this._$AC(i):(e.el===void 0&&(e.el=yt.createElement(Le(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===a)this._$AH.p(t);else{let s=new Kt(a,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(i){let t=Re.get(i.strings);return t===void 0&&Re.set(i.strings,t=new yt(i)),t}k(i){Jt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,a=0;for(let s of i)a===t.length?t.push(e=new n(this.O(vt()),this.O(vt()),this,this.options)):e=t[a],e._$AI(s),a++;a<t.length&&(this._$AR(e&&e._$AB.nextSibling,a),t.length=a)}_$AR(i=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);i!==this._$AB;){let e=Ae(i).nextSibling;Ae(i).remove(),i=e}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},ct=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,t,e,a,s){this.type=1,this._$AH=d,this._$AN=void 0,this.element=i,this.name=t,this._$AM=a,this.options=s,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=d}_$AI(i,t=this,e,a){let s=this.strings,o=!1;if(s===void 0)i=lt(this,i,t,0),o=!_t(i)||i!==this._$AH&&i!==D,o&&(this._$AH=i);else{let r=i,c,p;for(i=s[0],c=0;c<s.length-1;c++)p=lt(this,r[e+c],t,c),p===D&&(p=this._$AH[c]),o||=!_t(p)||p!==this._$AH[c],p===d?i=d:i!==d&&(i+=(p??"")+s[c+1]),this._$AH[c]=p}o&&!a&&this.j(i)}j(i){i===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Ft=class extends ct{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===d?void 0:i}},Vt=class extends ct{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==d)}},Gt=class extends ct{constructor(i,t,e,a,s){super(i,t,e,a,s),this.type=5}_$AI(i,t=this){if((i=lt(this,i,t,0)??d)===D)return;let e=this._$AH,a=i===d&&e!==d||i.capture!==e.capture||i.once!==e.once||i.passive!==e.passive,s=i!==d&&(e===d||a);a&&this.element.removeEventListener(this.name,this,e),s&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},Yt=class{constructor(i,t,e){this.element=i,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(i){lt(this,i)}};var Ei=Qt.litHtmlPolyfillSupport;Ei?.(yt,$t),(Qt.litHtmlVersions??=[]).push("3.3.3");var Ne=(n,i,t)=>{let e=t?.renderBefore??i,a=e._$litPart$;if(a===void 0){let s=t?.renderBefore??null;e._$litPart$=a=new $t(i.insertBefore(vt(),s),s,void 0,t??{})}return a._$AI(n),a};var Zt=globalThis,T=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}};T._$litElement$=!0,T.finalized=!0,Zt.litElementHydrateSupport?.({LitElement:T});var zi=Zt.litElementPolyfillSupport;zi?.({LitElement:T});(Zt.litElementVersions??=[]).push("4.2.2");var Ti={attribute:!0,type:String,converter:gt,reflect:!1,hasChanged:Tt},Mi=(n=Ti,i,t)=>{let{kind:e,metadata:a}=t,s=globalThis.litPropertyMetadata.get(a);if(s===void 0&&globalThis.litPropertyMetadata.set(a,s=new Map),e==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(t.name,n),e==="accessor"){let{name:o}=t;return{set(r){let c=i.get.call(this);i.set.call(this,r),this.requestUpdate(o,c,n,!0,r)},init(r){return r!==void 0&&this.C(o,void 0,n,r),r}}}if(e==="setter"){let{name:o}=t;return function(r){let c=this[o];i.call(this,r),this.requestUpdate(o,c,n,!0,r)}}throw Error("Unsupported decorator location: "+e)};function E(n){return(i,t)=>typeof t=="object"?Mi(n,i,t):((e,a,s)=>{let o=a.hasOwnProperty(s);return a.constructor.createProperty(s,e),o?Object.getOwnPropertyDescriptor(a,s):void 0})(n,i,t)}function v(n){return E({...n,state:!0,attribute:!1})}var Oe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Pt=n=>(...i)=>({_$litDirective$:n,values:i}),Rt=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,t,e){this._$Ct=i,this._$AM=t,this._$Ci=e}_$AS(i,t){return this.update(i,t)}update(i,t){return this.render(...t)}};var nt=class extends Rt{constructor(i){if(super(i),this.it=d,i.type!==Oe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(i){if(i===d||i==null)return this._t=void 0,this.it=i;if(i===D)return i;if(typeof i!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(i===this.it)return this._t;this.it=i;let t=[i];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};nt.directiveName="unsafeHTML",nt.resultType=1;var rs=Pt(nt);var xt=class extends nt{};xt.directiveName="unsafeSVG",xt.resultType=2;var G=Pt(xt);var st="#e4e7ec",S="#c3c9d3",at="#9aa3b2",It="#1d2b3b",Ci=`<style>
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
</style>`;function wt(n,i,t){return`<circle cx="${i}" cy="${t}" r="3" fill="${n==="in_funzione"?"#f59e0b":n==="terminato"?"#16a34a":n==="non_disponibile"?"#dc2626":"#7b8494"}"${n==="in_funzione"?' class="bl"':""}/>`}function Ht(n,i,t,e){let a=n==="in_funzione"||n==="terminato",s=n==="terminato"?"#4ade80":"#fbbf24";return`<rect x="${i}" y="${t}" width="${e}" height="9" rx="2" fill="${a?"#10161d":"#2a3340"}"/>`+(a?`<rect x="${i+3}" y="${t+3.5}" width="${e*(n==="terminato"?.7:.45)}" height="2" rx="1" fill="${s}"${n==="in_funzione"?' class="bl"':""}/>`:"")}function qe(n,i=120){return`<rect x="12" y="8" width="96" height="${i}" rx="9" fill="${st}" stroke="${S}" stroke-width="2"/>
  <rect x="12" y="8" width="96" height="22" rx="9" fill="${at}" opacity=".35"/>
  ${Ht(n,20,14,38)}${wt(n,70,18)}
  <circle cx="86" cy="18" r="6" fill="#f4f5f7" stroke="${S}"/><line x1="86" y1="18" x2="86" y2="13.5" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round"/>`}function Ue(n,i){let t=n==="in_funzione",e=i?"#fb923c":"#60a5fa",a=i?"#f9a8d4":"#93c5fd",o=`<g class="${t?"sp":""}"><circle cx="60" cy="82" r="24" fill="${It}"/>
    <path d="M44 82 a16 16 0 0 1 32 0 z" fill="${t?e:n==="terminato"?"#86efac":"#3b4a5c"}" opacity=".55"/>
    <circle cx="52" cy="76" r="6" fill="${a}" opacity="${t?.95:.55}"/><circle cx="68" cy="86" r="7" fill="${i?"#fde68a":"#bfdbfe"}" opacity="${t?.95:.5}"/><circle cx="58" cy="92" r="4" fill="${a}" opacity="${t?.9:.5}"/></g>`,r=i&&t?'<g class="fl" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round"><path d="M44 52c-3 3 3 4 0 8"/><path d="M60 52c-3 3 3 4 0 8"/><path d="M76 52c-3 3 3 4 0 8"/></g>':"",c=!i&&t?'<g fill="#fff" opacity=".7"><circle class="bl" cx="50" cy="94" r="2"/><circle class="bl" cx="64" cy="98" r="1.6"/><circle class="bl" cx="72" cy="90" r="2"/></g>':"";return`${qe(n)}
  <circle cx="60" cy="82" r="32" fill="#f4f5f7" stroke="${S}" stroke-width="3"/><circle cx="60" cy="82" r="28" fill="#aeb6c3"/>
  ${o}${c}${r}
  <path d="M40 66 a28 28 0 0 1 28 -9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
  ${n==="terminato"?'<circle cx="60" cy="82" r="14" fill="#16a34a" opacity=".92"/><path d="M53 82l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>':""}`}function Ri(n){let i=n==="in_funzione",t=i?'<g fill="#7dd3fc"><circle class="dr" cx="40" cy="62" r="2"/><circle class="dr" cx="56" cy="60" r="2" style="animation-delay:.3s"/><circle class="dr" cx="72" cy="62" r="2" style="animation-delay:.6s"/><circle class="dr" cx="86" cy="60" r="2" style="animation-delay:.9s"/></g>':"";return`${qe(n)}
  <rect x="22" y="40" width="76" height="70" rx="5" fill="${i?"#1a3b57":It}" stroke="${S}" stroke-width="2"/>
  <g stroke="#7b8ba0" stroke-width="2" opacity=".85"><line x1="30" y1="58" x2="90" y2="58"/><line x1="30" y1="80" x2="90" y2="80"/></g>
  <g fill="#cbd5e1" opacity=".9"><rect x="34" y="62" width="9" height="16" rx="2"/><rect x="50" y="62" width="9" height="16" rx="2"/><rect x="66" y="62" width="9" height="16" rx="2"/><rect x="42" y="84" width="14" height="16" rx="3"/><rect x="62" y="84" width="14" height="16" rx="3"/></g>
  ${t}
  <rect x="38" y="112" width="44" height="6" rx="3" fill="#f4f5f7" stroke="${S}"/>
  ${i?'<g class="fl" opacity=".35"><rect x="22" y="40" width="76" height="70" rx="5" fill="#7dd3fc"/></g>':""}
  ${n==="terminato"?'<circle cx="60" cy="75" r="14" fill="#16a34a" opacity=".92"/><path d="M53 75l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>':""}`}function Pi(n){let i=n==="in_funzione",t=i?'<rect x="24" y="50" width="72" height="50" rx="4" fill="#f97316" opacity=".3" class="fl"/>':"",e=i?"#fb923c":"#4b5563";return`<rect x="12" y="8" width="96" height="124" rx="9" fill="${st}" stroke="${S}" stroke-width="2"/>
  <rect x="12" y="8" width="96" height="30" rx="9" fill="${at}" opacity=".35"/>
  ${Ht(n,46,13,28)}${wt(n,82,18)}
  <g fill="#f4f5f7" stroke="${S}"><circle cx="26" cy="22" r="6"/><circle cx="94" cy="22" r="6"/></g>
  <rect x="20" y="44" width="80" height="64" rx="5" fill="#2a3340" stroke="${S}" stroke-width="2"/>
  <rect x="24" y="50" width="72" height="50" rx="4" fill="#161d26"/>${t}
  <g stroke="${e}" stroke-width="2.2" stroke-linecap="round" ${i?'class="fl"':""}><path d="M30 56h60"/><path d="M30 94h60"/></g>
  <g stroke="#7b8ba0" stroke-width="1.6" opacity=".9"><line x1="30" y1="70" x2="90" y2="70"/><line x1="30" y1="82" x2="90" y2="82"/></g>
  <rect x="26" y="114" width="68" height="6" rx="3" fill="#f4f5f7" stroke="${S}"/>
  ${n==="in_funzione"?'<g fill="none" stroke="#fb923c" stroke-width="1.6" stroke-linecap="round" class="fl"><path d="M44 36c-3 3 3 4 0 8"/><path d="M60 36c-3 3 3 4 0 8"/><path d="M76 36c-3 3 3 4 0 8"/></g>':""}`}function Ii(n){let i=n==="in_funzione";return`<rect x="26" y="6" width="68" height="128" rx="8" fill="${st}" stroke="${S}" stroke-width="2"/>
  <line x1="26" y1="50" x2="94" y2="50" stroke="${S}" stroke-width="2.4"/>
  ${i?'<g class="sw" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"><path d="M60 24v22M49 30l22 10M71 30L49 40"/><circle cx="60" cy="35" r="2.4" fill="#38bdf8" stroke="none"/></g>':'<g stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity=".6"><path d="M60 26v18M51 31l18 8M69 31L51 39"/></g>'}
  <rect x="32" y="22" width="6" height="22" rx="3" fill="#8b95a3"/><rect x="32" y="58" width="6" height="40" rx="3" fill="#8b95a3"/>
  ${Ht(n,52,60,34)}${wt(n,80,80)}
  <rect x="48" y="94" width="38" height="32" rx="4" fill="${at}" opacity=".22"/>
  ${i?'<g fill="#38bdf8" opacity=".9"><circle class="bl" cx="56" cy="104" r="1.8"/><circle class="bl" cx="70" cy="112" r="1.8" style="animation-delay:.4s"/><circle class="bl" cx="78" cy="102" r="1.8" style="animation-delay:.8s"/></g>':""}
  <rect x="34" y="132" width="52" height="3" rx="1.5" fill="${S}"/>`}function Hi(n){let i=n==="in_funzione";return`<rect x="8" y="34" width="104" height="72" rx="8" fill="${st}" stroke="${S}" stroke-width="2"/>
  <rect x="16" y="42" width="62" height="56" rx="5" fill="${i?"#3b2f12":It}" stroke="${S}" stroke-width="2"/>
  ${i?'<rect x="18" y="44" width="58" height="52" rx="4" fill="#fbbf24" opacity=".42" class="fl"/>':""}
  <g class="${i?"sp":""}"><ellipse cx="47" cy="88" rx="22" ry="5" fill="#cbd5e1" opacity=".9"/><rect x="38" y="74" width="18" height="12" rx="3" fill="${i?"#fcd34d":"#94a3b8"}"/></g>
  <rect x="84" y="42" width="20" height="56" rx="4" fill="${at}" opacity=".35"/>
  ${Ht(n,86,46,16)}${wt(n,94,64)}
  <circle cx="94" cy="80" r="7" fill="#f4f5f7" stroke="${S}"/><line x1="94" y1="80" x2="94" y2="75" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="14" y="106" width="8" height="5" rx="2" fill="#7b8494"/><rect x="98" y="106" width="8" height="5" rx="2" fill="#7b8494"/>
  `}function Li(n){let i=n==="in_funzione",t=n==="non_disponibile"?"#dc2626":i?"#f59e0b":"#7b8494";return`<rect x="14" y="96" width="92" height="30" rx="10" fill="${st}" stroke="${S}" stroke-width="2"/>
  <rect x="22" y="104" width="76" height="8" rx="4" fill="${at}" opacity=".3"/>
  <circle cx="30" cy="119" r="3" fill="${t}"${i?' class="bl"':""}/>
  <g class="${i?"sw":""}">
    <circle cx="60" cy="56" r="40" fill="${st}" stroke="${S}" stroke-width="2.4"/>
    <circle cx="60" cy="56" r="33" fill="#f4f5f7" stroke="${S}" stroke-width="1.4"/>
    <circle cx="60" cy="42" r="9" fill="${It}" stroke="${S}" stroke-width="2"/>
    <circle cx="60" cy="42" r="3.2" fill="${t}"${i?' class="bl"':""}/>
    <path d="M40 66q20 12 40 0" fill="none" stroke="${at}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    <rect x="52" y="73" width="16" height="5" rx="2.5" fill="${t}" opacity=".85"/>
  </g>
  <g class="${i?"sp":""}" stroke="#8b95a3" stroke-width="2.2" stroke-linecap="round"><path d="M22 92l-8 8M22 92l-9-4M22 92l1-10"/></g>
  ${i?'<g fill="#38bdf8" opacity=".8"><circle class="bl" cx="98" cy="86" r="2"/><circle class="bl" cx="104" cy="74" r="2" style="animation-delay:.5s"/><circle class="bl" cx="94" cy="68" r="2" style="animation-delay:1s"/></g>':""}`}function Ni(n){let i=n==="in_funzione";return`<rect x="14" y="14" width="92" height="92" rx="16" fill="${st}" stroke="${S}" stroke-width="2.4"/>
  <circle cx="60" cy="60" r="38" fill="#f4f5f7" stroke="${S}" stroke-width="1.6"/>
  <g class="${i?"sp":""}" fill="${i?"#38bdf8":"#94a3b8"}" opacity=".95">
    <path d="M60 60C52 44 56 30 60 24c4 6 8 20 0 36z"/><path d="M60 60c16-8 30-4 36 0-6 4-20 8-36 0z"/>
    <path d="M60 60c8 16 4 30 0 36-4-6-8-20 0-36z"/><path d="M60 60C44 68 30 64 24 60c6-4 20-8 36 0z"/>
  </g>
  <circle cx="60" cy="60" r="6" fill="${S}"/>
  <rect x="24" y="112" width="72" height="14" rx="7" fill="${at}" opacity=".3"/>
  ${wt(n,96,118)}`}function Y(n,i){let t=n==="lavatrice"?Ue(i,!1):n==="asciugatrice"?Ue(i,!0):n==="lavastoviglie"?Ri(i):n==="forno"?Pi(i):n==="frigorifero"?Ii(i):n==="aspirapolvere"?Li(i):n==="umidostato"?Ni(i):Hi(i),e=i==="non_disponibile"?' opacity=".45"':"";return`<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${n} ${i.replace("_"," ")}">${Ci}<g${e}>${t}</g></svg>`}var De=["lavatrice","lavastoviglie","asciugatrice","forno","frigorifero","microonde","aspirapolvere","umidostato"],ee={lavatrice:"mdi:washing-machine",lavastoviglie:"mdi:dishwasher",asciugatrice:"mdi:tumble-dryer",forno:"mdi:stove",frigorifero:"mdi:fridge",microonde:"mdi:microwave",aspirapolvere:"mdi:robot-vacuum",umidostato:"mdi:fan"},dt={lavatrice:"Lavatrice",lavastoviglie:"Lavastoviglie",asciugatrice:"Asciugatrice",forno:"Forno",frigorifero:"Frigorifero",microonde:"Microonde",aspirapolvere:"Aspirapolvere",umidostato:"Umidostato"},Oi=["spento","in_funzione","terminato","non_disponibile"],pt={spento:"Spento",in_funzione:"In funzione",terminato:"Terminato",non_disponibile:"Non disponibile"},Q={spento:"#6b7280",in_funzione:"#f59e0b",terminato:"#16a34a",non_disponibile:"transparent"},Ui={spento:"off",in_funzione:"run",terminato:"done",non_disponibile:"bad"};function Be(n){return Oi.includes(String(n))?n:"non_disponibile"}function kt(n){if(n==null||n===""||n==="unknown"||n==="unavailable")return null;let i=Number(n);return Number.isFinite(i)?i:null}function $(n,i=0){return n==null||!Number.isFinite(n)?"\u2013":n.toFixed(i).replace(".",",")}var P=n=>n==null?"\u2013":`${$(n,n<10?2:1)} kWh`,H=n=>n==null?"\u2013":`${$(n,2)} \u20AC`,J=n=>n==null?"\u2013":`${$(n,n%1&&n<100?1:0)} W`;function C(n){let i=Math.max(0,Math.round(n));if(i<60)return`${i} s`;let t=Math.round(i/60);return t<60?`${t} min`:`${Math.floor(t/60)} h ${String(t%60).padStart(2,"0")} min`}function ie(n){return n<3600?`${Math.round(n/60)} min`:`${$(n/3600,1)} h`}var ne=["dom","lun","mar","mer","gio","ven","sab"],We=["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],rt=n=>`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}`;function Ot(n){let i=new Date(n);return`${ne[i.getDay()]} ${i.getDate()} ${We[i.getMonth()]}, ${rt(i)}`}function se(n){let i=new Date(`${n}T12:00:00`);return`${ne[i.getDay()]} ${i.getDate()} ${We[i.getMonth()]}`}function ae(n){let i=n?Date.parse(n):NaN;return Number.isNaN(i)?"\u2013":rt(new Date(i))}function qi(n,i){let t=i[n.entities.stato??""];if(!t)return{snap:n,state:n.state};let e=t.attributes,a={...n};for(let o of Object.keys(e))o in n&&e[o]!==void 0&&(a[o]=e[o]);let s=t.state==="unavailable"||t.state==="unknown"?"non_disponibile":Be(t.state);return{snap:a,state:s}}function oe(n){if(!n)return null;let i=kt(n.state);return i===null?null:String(n.attributes.unit_of_measurement??"W").toLowerCase()==="kw"?i*1e3:i}function ji(n,i){if(!n||n.state==="unavailable"||n.state==="unknown"||n.state==="")return"non disponibile";if(n.attributes.device_class==="timestamp"){let a=Date.parse(n.state);if(!Number.isNaN(a)){let s=(a-i)/1e3;return s>0?`alle ${rt(new Date(a))} (tra ${C(s)})`:`alle ${rt(new Date(a))}`}}if(n.state==="on")return"s\xEC";if(n.state==="off")return"no";let t=n.attributes.unit_of_measurement,e=kt(n.state);return e!==null&&typeof t=="string"&&t?t==="min"||t==="s"||t==="h"?`${$(e,e%1?1:0)} ${t}`:`${$(e,e%1?2:0)} ${t}`:n.state.replace(/_/g," ")}function Di(n,i,t){return n.extras.map(e=>{let a=i[e.entity],s=typeof a?.attributes.friendly_name=="string"?a.attributes.friendly_name:e.entity;return{label:e.label||s,value:ji(a,t),entity:e.entity}})}var Bi={running:"In funzione",paused:"In pausa","delayed start":"Avvio ritardato","end of cycle":"Ciclo terminato",off:"Spenta",idle:"Pronta","ready to start":"Pronta",alarm:"Allarme"},Wi={dry:"Asciugatura",cool:"Raffreddamento",anticrease:"Antipiega",unavailable:""},Ki={cottons:"Cotone",synthetics:"Sintetici",delicates:"Delicati",wool:"Lana",silk:"Seta",outdoor:"Outdoor",eco:"Cotone Eco","rapid 3kg":"Rapido 3 kg",sportwear:"Sportivo",traininggear:"Abbigliamento sportivo","soccer rugby":"Calcio e rugby",skiinggear:"Sci",duvet:"Piumone",curtains:"Tende",pillow:"Cuscini",towels:"Asciugamani",pethair:"Cuccia animali","easyiron td":"Facile stiratura",allergen:"Anti-allergie",jeans:"Jeans",baby:"Baby",linen:"Lino",dryingrack:"A tempo",mixcare:"Misti",hygiene:"Igiene","down jacket":"Piumino",bedlinenplus:"Biancheria letto",oneitemfast:"Un capo veloce"},Lt=["","unknown","unavailable","none"],ot=n=>n.trim().toLowerCase().replace(/_/g," ");function Fi(n){let i=ot(n),t=i.includes(" pr ")?i.slice(i.lastIndexOf(" pr ")+4):i;return Ki[t]??t.replace(/^./,e=>e.toUpperCase())}function Vi(n,i){let t=n.maker_entities;if(!n.maker||!t||!t.stato)return null;let e=w=>t[w]?i[t[w]]:void 0,a=e("stato"),s=e("connessione"),o=!!a&&!Lt.includes(ot(a.state))&&s?.state!=="off",r={connected:!1,active:!1,paused:!1,stato:"",fase:"",programma:"",rimanenteS:null,porta:""};if(!o||!a)return r;let c=ot(a.state),p=w=>{let x=e(w);return x&&!Lt.includes(ot(x.state))?x.state:""},u=p("fase"),h=e("rimanente"),b=null;if(h&&!Lt.includes(ot(h.state))){let w=kt(h.state);if(w!==null&&w>0){let x=String(h.attributes.unit_of_measurement??"min").toLowerCase();b=x==="s"?w:x==="h"?w*3600:w*60}}let f=e("porta"),y=["running","paused","delayed start"].includes(c);return{connected:!0,active:y,paused:c==="paused",stato:Bi[c]??a.state,fase:u?Wi[ot(u)]??u:"",programma:p("programma")?Fi(p("programma")):"",rimanenteS:y?b:null,porta:f&&!Lt.includes(ot(f.state))?f.state==="on"?"aperto":"chiuso":""}}function Gi(n,i){if(!i)return[];let t=n.maker?n.maker.charAt(0).toUpperCase()+n.maker.slice(1):"Costruttore";if(!i.connected)return[{label:t,value:"apparecchio spento o non collegato",entity:""}];let e=[{label:"Stato",value:i.stato,entity:""}];return i.programma&&e.push({label:"Programma",value:i.programma,entity:""}),i.porta&&e.push({label:"Sportello",value:i.porta,entity:""}),e}function Ut(n,i,t,e){let a=qi(n,i),s=a.snap,o=Vi(n,i),r=a.state;o?.active&&r==="spento"&&(r="in_funzione");let c=oe(i[n.entity]),p=t?.[n.type],u=p?.has_finished??["lavatrice","lavastoviglie","asciugatrice"].includes(n.type),h=s.inizio?Date.parse(s.inizio):NaN,b=r==="in_funzione"&&!Number.isNaN(h)?Math.max(0,(e-h)/1e3):null,f=pt[r],y=s.fase;if(r==="spento")y=p?.off_label??"Spento",f=y;else if(r==="in_funzione"){let m=o?.active?[o.paused?"In pausa":o.fase||s.fase,o.programma].filter(Boolean).join(" \xB7 "):s.fase;f=b!==null?`${m} \xB7 da ${C(b)}`:m}else if(r==="terminato"){let m=s.fine?Date.parse(s.fine):NaN;f=`${s.fase}${Number.isNaN(m)?"":` \xB7 finito alle ${rt(new Date(m))}`}`}let w=null,x="",M="";return r==="in_funzione"&&u&&s.fasi.length>1&&s.fase_indice!==null&&(w=Math.min(1,(s.fase_indice+.5)/s.fasi.length),x=`Fase ${s.fase_indice+1} di ${s.fasi.length}`),r==="in_funzione"&&s.stima_rimanente_s!==null&&(M=`fine stimata fra circa ${C(s.stima_rimanente_s)}`),r==="in_funzione"&&o?.active&&o.rimanenteS!==null&&(M=`fine fra ${C(o.rimanenteS)}`,b!==null&&(w=Math.min(1,b/(b+o.rimanenteS)),x=o.fase||x)),{key:n.key,name:n.name,type:n.type,state:r,tone:Ui[r],statusLine:f,phase:y,power:c,progress:w,progressLabel:x,todayKwh:s.oggi_kwh,todayEur:s.oggi_eur,todayCycles:s.oggi_cicli,cycleKwh:s.energia_ciclo,cycleEur:s.costo_ciclo,maintPct:s.manutenzione_pct,maintDue:s.manutenzione_pct!==null&&s.manutenzione_pct>=100,extras:[...Gi(n,o),...Di(n,i,e)],canAck:r==="terminato",remainingText:M}}function Yi(n){let i=Math.round(Number(n));return Number.isFinite(i)&&i>=1?Math.min(i,8):null}function Ke(n){let i=Yi(n);return i===null?"repeat(auto-fill, minmax(min(300px, 100%), 1fr))":`repeat(${i}, minmax(0, 1fr))`}function Fe(n){if(n.length===0)return"Nessun elettrodomestico: aggiungine uno dalle preferenze.";let i=n.filter(s=>s.state==="in_funzione"),t=n.filter(s=>s.state==="terminato"),e=n.reduce((s,o)=>s+(o.power??0),0),a=[];return i.length&&a.push(`${i.length} in funzione (${i.map(s=>s.name).join(", ")})`),t.length&&a.push(`${t.map(s=>s.name).join(", ")} da svuotare`),a.length||a.push("tutto fermo"),`${a.join(" \xB7 ")} \xB7 ${J(e)} in totale`}function Ve(n,i){return n.slice(-i).reduce((e,a)=>({kwh:e.kwh+a.kwh,eur:e.eur+a.eur,cycles:e.cycles+a.cycles,sec:e.sec+a.sec}),{kwh:0,eur:0,cycles:0,sec:0})}var re={kwh:"Energia",eur:"Costo",cycles:"Cicli",sec:"Funzionamento"};function le(n,i){return n==="kwh"?P(i):n==="eur"?H(i):n==="cycles"?`${$(i,0)} ${i===1?"ciclo":"cicli"}`:ie(i)}function ce(n,i,t,e,a){let s=Qi(t||e.label),o=s;for(let r=2;a.includes(o);r++)o=`${s}_${r}`;return{id:o,type:n,name:t||e.label,entity:i,energy_entity:null,start_w:e.start_w,stop_w:e.stop_w,start_delay:e.start_delay,end_delay:e.end_delay,min_cycle:e.min_cycle,heat_w:e.heat_w,maint_cycles:e.maint_cycles,alert_minutes:e.alert_minutes,notify:e.notify,extras:[],maker:null,maker_device:null,...e.humidistat?{fan_entity:null,hum:{...e.hum}}:{}}}function Qi(n){return n.normalize("NFKD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"elettrodomestico"}var Ge=/^[a-z_]+\.[a-z0-9_]+$/;function Ji(n){let i=n.hum;return!n.entity.startsWith("sensor.")||!Ge.test(n.entity)?`${n.name}: scegli il sensore di umidit\xE0 (un'entit\xE0 sensor.\u2026).`:!n.fan_entity||!/^(switch|fan|light|input_boolean)\.[a-z0-9_]+$/.test(n.fan_entity)?`${n.name}: scegli il ventilatore (switch, fan, light o input_boolean).`:i?n.light_entity&&!/^(light|switch|input_boolean|binary_sensor)\.[a-z0-9_]+$/.test(n.light_entity)?`${n.name}: la luce del bagno non \xE8 valida (light, switch, input_boolean o binary_sensor).`:n.light_entity&&n.light_entity===n.fan_entity?`${n.name}: la luce e il ventilatore devono essere diversi.`:n.light_entity&&!(i.light_max>=1)?`${n.name}: il tempo massimo con la luce deve essere di almeno 1 minuto.`:i.on_above>i.off_below?i.max_on>0&&i.min_on>i.max_on?`${n.name}: il tempo minimo di accensione non pu\xF2 superare quello massimo.`:null:`${n.name}: la soglia di accensione deve essere pi\xF9 alta di quella di spegnimento.`:null}function de(n){let i=new Set;for(let t of n){if(t.type==="umidostato"){let a=Ji(t);if(a)return a;if(i.has(t.entity))return`${t.name}: questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.`;i.add(t.entity);continue}let e=t.type==="aspirapolvere";if(!Ge.test(t.entity)||e&&!t.entity.startsWith("vacuum."))return e?`${t.name}: scegli il robot (un'entit\xE0 vacuum.\u2026).`:`${t.name}: scegli il sensore di potenza della presa.`;if(i.has(t.entity))return`${t.name}: questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.`;if(i.add(t.entity),t.stop_w>t.start_w)return`${t.name}: la soglia di spegnimento non pu\xF2 superare quella di avvio.`}return null}function U(n,i,t=[]){let e=[];for(let[a,s]of Object.entries(n)){if(t.includes(a)||!i(a,s))continue;let o=s.attributes.friendly_name;e.push({id:a,name:typeof o=="string"?o:a})}return e.sort((a,s)=>a.name.localeCompare(s.name,"it")).slice(0,1500)}var pe=(n,i=[])=>U(n,(t,e)=>t.startsWith("sensor.")&&(e.attributes.device_class==="power"||["W","kW"].includes(String(e.attributes.unit_of_measurement))),i),ue=n=>U(n,(i,t)=>i.startsWith("sensor.")&&(t.attributes.device_class==="energy"||["Wh","kWh","MWh"].includes(String(t.attributes.unit_of_measurement)))),he=(n,i=[])=>U(n,t=>t.startsWith("vacuum."),i),Ye=(n,i=[])=>U(n,t=>/^(sensor|binary_sensor|select|input_select|input_text|number|text|climate)\./.test(t),i),me=(n,i=[])=>U(n,(t,e)=>t.startsWith("sensor.")&&(e.attributes.device_class==="humidity"||/umid|humid/.test(t)),i),Qe=(n,i=[])=>U(n,t=>/^(light|switch|input_boolean|binary_sensor)\./.test(t),i),fe=n=>U(n,i=>/^(switch|fan|light|input_boolean)\./.test(i)),Je=n=>U(n,i=>i.startsWith("counter.")),Xe=n=>U(n,i=>i.startsWith("binary_sensor.")),te={lavatrice:/lavatrice|lavaggio|washing/,lavastoviglie:/lavastov|dishwasher/,asciugatrice:/asciugatr|dryer/,forno:/forno|oven/,frigorifero:/frigo|fridge/,microonde:/micro/,aspirapolvere:/^$/,umidostato:/^$/};function Ze(n,i){let t=Object.keys(n),e=t.find(s=>s.startsWith("counter.")&&te[i].test(s)&&/cicl/.test(s))??t.find(s=>s.startsWith("counter.")&&te[i].test(s))??"",a=t.find(s=>s.startsWith("binary_sensor.")&&/_status$/.test(s)&&te[i].test(s))??"";return{counter:e,status:a}}var ti=n=>U(n,i=>i.startsWith("sensor."));function ut(n,i){let t=n[i]?.attributes.friendly_name;return typeof t=="string"?t:i}function ei(n){return Object.keys(n?.notify??{}).filter(i=>i!=="send_message"&&i!=="persistent_notification").sort().map(i=>`notify.${i}`)}function Xi(n){if(n==null)return null;if(typeof n=="number")return n<1e11?n*1e3:n;let i=Date.parse(n);return Number.isNaN(i)?null:i}function ii(n){return Xi(n.lu??n.last_updated??n.lc??n.last_changed)}function ni(n){let i=[];for(let t of n??[]){let e=ii(t),a=t.s??t.state;if(e===null||a===void 0||a===""||a==="unavailable"||a==="unknown")continue;let s=Number(a);Number.isFinite(s)&&i.push({t:e,v:s})}return i.sort((t,e)=>t.t-e.t)}function si(n,i,t){let e=[];for(let c of n??[]){let p=ii(c),u=c.s??c.state;p!==null&&u!==void 0&&e.push({t:p,s:Be(u)})}e.sort((c,p)=>c.t-p.t);let a=null;for(let c of e)if(c.t<=i)a=c.s;else break;let s=[],o=i;for(let c of e)c.t<=i||c.t>=t||(a!==null&&s.push({from:o,to:c.t,state:a}),o=c.t,a=c.s);a!==null&&o<t&&s.push({from:o,to:t,state:a});let r=[];for(let c of s){let p=r[r.length-1];p&&p.state===c.state&&p.to===c.from?p.to=c.to:r.push({...c})}return r}function ai(n,i){for(let t of n)if(i>=t.from&&i<t.to)return t.state;return null}function oi(n,i,t,e,a=3*3600*1e3){let s=new Array(e).fill(null);if(e<=0||t<=i)return s;let o=(t-i)/e,r=0,c=null,p=0;for(let u=0;u<e;u++){let h=i+u*o,b=h+o;for(;r<n.length&&n[r].t<=h;)c=n[r].v,p=n[r].t,r++;let f=0,y=0,w=h,x=c,M=p,m=F=>{if(x===null)return;let jt=Math.min(F,M+a)-w;jt>0&&(f+=x*jt,y+=jt)},_=r;for(;_<n.length&&n[_].t<b;)m(n[_].t),w=n[_].t,x=n[_].v,M=n[_].t,_++;m(b),s[u]=y>0?f/y:null}return s}function Zi(n){let i=Math.pow(10,Math.floor(Math.log10(n))),t=n/i;return(t<=1?1:t<=2?2:t<=2.5?2.5:t<=5?5:10)*i}function ge(n,i,t=5){if(!Number.isFinite(n)||!Number.isFinite(i))return{min:0,max:1,ticks:[0,1]};i-n<1e-9&&(n-=1,i+=1);let e=Zi((i-n)/Math.max(1,t-1)),a=Math.floor(n/e+1e-9)*e,s=Math.ceil(i/e-1e-9)*e,o=[];for(let r=a;r<=s+e*1e-6;r+=e)o.push(Math.round(r/e)*e);return{min:a,max:s,ticks:o}}function ri(n,i,t=6){let e=(i-n)/36e5,a=[1,2,3,6,12,24,48].find(r=>e/r<=t)??48,s=new Date(n);s.setMinutes(0,0,0),a>=24?s.setHours(0):s.setHours(Math.ceil(s.getHours()/a)*a);let o=[];for(let r=s.getTime();r<=i;r+=a*36e5){if(r<n)continue;let c=new Date(r),p=c.getHours()===0;o.push({t:r,major:p,label:e>30&&p?`${ne[c.getDay()]} ${c.getDate()}`:rt(c)})}return o}function li(n,i,t){let e="",a=!1;for(let s=0;s<n.length;s++){let o=n[s];if(o===null){a=!1;continue}e+=`${a?"L":"M"}${i(s).toFixed(1)} ${t(o).toFixed(1)}`,a=!0}return e}var tn=["cleaning","docked","idle","paused","returning","error"],je={cleaning:"In pulizia",docked:"Alla base",idle:"Fermo",paused:"In pausa",returning:"Torna alla base",error:"Errore",unavailable:"Non disponibile"};function k(n,i){return n.robot_entities?.[i]??""}function be(n){let i=n.replace(/_/g," ").trim();return i.charAt(0).toUpperCase()+i.slice(1)}function W(n,i,t){let e=i?n?.states[i]:void 0;if(!e||["unknown","unavailable",""].includes(e.state))return"";let a=t??e.state;if(n?.formatEntityState)try{return n.formatEntityState(e,t)}catch{}return be(a)}function B(n,i){let t=i?n[i]:void 0;return t?kt(t.state):null}var en=[{key:"main_brush_left",label:"Spazzola principale",time:"main_brush_time_left",reset:"reset_main_brush"},{key:"side_brush_left",label:"Spazzola laterale",time:"side_brush_time_left",reset:"reset_side_brush"},{key:"filter_left",label:"Filtro",time:"filter_time_left",reset:"reset_filter"},{key:"sensor_dirty_left",label:"Sensori",time:"sensor_dirty_time_left",reset:"reset_sensor"},{key:"wheel_dirty_left",label:"Ruote",time:"wheel_dirty_time_left",reset:"reset_wheel"}];function ve(n,i){let t=[];for(let e of en){let a=k(n,`sensor.${e.key}`);if(!a)continue;let s=B(i,a);t.push({key:e.key,label:e.label,pct:s,hoursLeft:B(i,k(n,`sensor.${e.time}`)),reset:k(n,`button.${e.reset}`),low:s!==null&&s<=10})}return t}function ci(n,i){let t=n?.attributes.rooms;if(!t||typeof t!="object")return[];let e=t,a=e[i]??Object.values(e)[0];return Array.isArray(a)?a.filter(s=>!!s&&typeof s=="object"&&typeof s.id=="number").map(s=>({id:s.id,name:String(s.name??`Stanza ${s.id}`),icon:typeof s.icon=="string"?s.icon:"mdi:floor-plan"})):[]}function di(n,i,t,e){let a=Math.min(3,Math.max(1,Math.round(t)||1));if(!e||n.length===0)return{label:"Pulisci tutta la casa",segments:null,repeats:1};let s=i.filter((p,u)=>n.some(h=>h.id===p)&&i.indexOf(p)===u),o=a>1?` \xB7 ${a} passate`:"";if(s.length===0)return{label:`Pulisci tutta la casa${o}`,segments:a>1?n.map(p=>p.id):null,repeats:a};let r=s.map(p=>n.find(u=>u.id===p)?.name??"");return{label:`Pulisci ${r.length===1?r[0]:r.length===2?`${r[0]} e ${r[1]}`:`${r.length} stanze`}${o}`,segments:s,repeats:a}}function pi(n){let i=n?.attributes.shortcuts;return!i||typeof i!="object"?[]:Object.values(i).filter(t=>t&&typeof t.id=="number").map(t=>({id:t.id,name:String(t.name??`Scorciatoia ${t.id}`),running:t.running===!0}))}function ht(n,i){let t=i.states,a=t[n.entity]?.state??"unavailable",s=tn.includes(a)?a:"unavailable",o=s==="cleaning"||s==="returning"||s==="paused",r=k(n,"sensor.error"),c=r?t[r]:void 0,p=c&&c.state!=="no_error"&&!["unknown","unavailable"].includes(c.state)?typeof c.attributes.description=="string"&&c.attributes.description?c.attributes.description:W(i,r):"",u=B(t,k(n,"sensor.battery_level")),h=k(n,"binary_sensor.charging_state"),b=o?B(t,k(n,"sensor.cleaned_area")):null,f=o?B(t,k(n,"sensor.cleaning_time")):null,y=s==="error"||p?"bad":o?"run":"off";return{key:n.key,name:n.name,activity:s,tone:y,state:s==="unavailable"?"non_disponibile":o?"in_funzione":"spento",statusLine:p&&s!=="cleaning"?`${je[s]} \xB7 ${p}`:je[s],battery:u,charging:h?t[h]?.state==="on":!1,room:o?W(i,k(n,"sensor.current_room")):"",area:b,minutes:f,error:p,lowConsumables:ve(n,t).filter(w=>w.low).map(w=>w.label),canStart:s==="docked"||s==="idle"||s==="paused",canPause:s==="cleaning"||s==="returning",canStop:o,canHome:s!=="docked"&&s!=="returning"&&s!=="unavailable"}}var nn={tempo_massimo:"limite di tempo",umidita_bassa:"umidit\xE0 scesa",timer_luce:"timer della luce"};function Nt(n){let i=Math.max(0,Math.round(n));return i<60?`${i} s`:`${Math.ceil(i/60)} min`}function ui(n,i,t=0){let e=i.states[n.entity],a=n.fan_entity?i.states[n.fan_entity]:void 0,s=kt(e?.state),o=!a||["unknown","unavailable"].includes(a.state)?null:a.state==="on",r=n.hum,c=r.enabled,p=n.status,u=p.wait_s===null?null:Math.max(0,p.wait_s-Math.max(0,t)),h=s===null||o===null,b,f="";return h?b="Non disponibile":c?o?(b=p.phase==="light"?"Acceso con la luce":"Acceso",p.phase==="light"&&u!==null?f=`${u>0?`tra ${Nt(u)}`:"ora"} decide l'umidit\xE0: si spegne se \xE8 sotto ${r.off_below} %`:p.phase==="closing"&&u!==null?f=`si spegne tra ${Nt(u)} se resta sotto ${r.off_below} %`:u!==null&&p.until&&(f=`si spegne comunque tra ${Nt(u)} (${nn[p.until]??p.until})`)):p.phase==="opening"&&u!==null?(b="In attesa",f=`si accende tra ${Nt(u)} se resta sopra ${r.on_above} %`):p.phase==="locked"?(b="Fermo",f=`riparte quando scende sotto ${r.on_above} % e risale`):b="Spento":b=o?"Acceso \xB7 automatico spento":"Spento \xB7 automatico spento",{key:n.key,name:n.name,tone:h?"bad":o?"run":"off",humidity:s,fanOn:o,auto:c,statusLine:b,waitText:f,rule:`Accende sopra ${r.on_above} % \xB7 spegne sotto ${r.off_below} %`,state:h?"non_disponibile":o?"in_funzione":"spento"}}var X=I`
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
`;var sn=[{key:"on_above",label:"Accende sopra",unit:"%",hint:"Umidit\xE0 oltre la quale il ventilatore si accende."},{key:"on_delay",label:"Conferma accensione dopo",unit:"min",hint:"Deve restare sopra la soglia per tutto questo tempo: ignora i picchi brevi (la doccia che inizia). 0 = subito."},{key:"off_below",label:"Spegne sotto",unit:"%",hint:"Deve essere pi\xF9 bassa di quella di accensione: la differenza evita che si accenda e spenga di continuo."},{key:"off_delay",label:"Conferma spegnimento dopo",unit:"min",hint:"Deve restare sotto la soglia per tutto questo tempo. 0 = subito."},{key:"min_on",label:"Acceso almeno",unit:"min",hint:"Non si spegne prima di questo tempo, anche se l'umidit\xE0 scende subito."},{key:"max_on",label:"Si spegne comunque dopo",unit:"min",hint:"Limite di sicurezza. Dopo lo spegnimento riparte solo quando l'umidit\xE0 \xE8 scesa sotto la soglia di accensione e risale. 0 = nessun limite."},{key:"min_off",label:"Resta spento almeno",unit:"min",hint:"Dopo lo spegnimento aspetta questo tempo prima di riaccendersi. 0 = nessuna attesa."}],an={key:"light_max",label:"Con la luce, acceso al massimo",unit:"min",hint:"Il ventilatore parte quando si accende la luce e resta acceso per questo tempo. Alla scadenza, se l'umidit\xE0 \xE8 ancora sopra la soglia di spegnimento, decide la regola dell'umidit\xE0; altrimenti si spegne."},on=[{key:"start_w",label:"Si accende sopra",unit:"W",hint:"Potenza oltre la quale l'elettrodomestico risulta in funzione (pi\xF9 del consumo a riposo)."},{key:"stop_w",label:"Si spegne sotto",unit:"W",hint:"Potenza sotto la quale il ciclo pu\xF2 finire."},{key:"start_delay",label:"Conferma avvio dopo",unit:"s",hint:"Per ignorare i picchi brevi, per esempio quando si preme un tasto."},{key:"end_delay",label:"Conferma fine dopo",unit:"s",hint:"Quanto deve restare sotto la soglia: pi\xF9 lungo di qualsiasi pausa del programma."},{key:"min_cycle",label:"Ignora cicli pi\xF9 brevi di",unit:"s",hint:"I cicli pi\xF9 corti non si contano e non avvisano."},{key:"heat_w",label:"Riscaldamento sopra",unit:"W",hint:"Potenza della resistenza: serve a distinguere le fasi (lavaggio, risciacquo, asciugatura)."}],A=class extends T{constructor(){super(...arguments);this.openKey="";this._list=[];this._price="0.30";this._priceEntity="";this._notify=[];this._open="";this._addType="";this._addEntity="";this._addFan="";this._addName="";this._extra="";this._svc="";this._advanced="";this._imp={};this._busy=!1;this._error="";this._onKey=t=>{t.key==="Escape"&&this._close()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._list=[...this.info.appliances,...this.info.robots??[],...this.info.humidistats??[]].map(t=>({id:t.id,type:t.type,name:t.name,entity:t.entity,energy_entity:t.energy_entity,start_w:t.start_w,stop_w:t.stop_w,start_delay:t.start_delay,end_delay:t.end_delay,min_cycle:t.min_cycle,heat_w:t.heat_w,maint_cycles:t.maint_cycles,alert_minutes:t.alert_minutes,notify:t.notify,extras:t.extras.map(e=>({...e})),maker:t.maker??null,maker_device:t.maker_device??null,...t.type==="umidostato"?{fan_entity:t.fan_entity??null,light_entity:t.light_entity??null,hum:t.hum?{...t.hum}:void 0}:{}})),this._price=String(this.info.price_kwh),this._priceEntity=this.info.price_entity,this._notify=[...this.info.notify_services],this._open=this.openKey,this._list.length===0&&(this._addType="lavatrice")}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey)}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_patch(t,e){this._list=this._list.map(a=>a.id===t?{...a,...e}:a)}_remove(t){this._list=this._list.filter(e=>e.id!==t),this._open===t&&(this._open="")}_reset(t){let e=this.info.types[t.type];this._patch(t.id,{start_w:e.start_w,stop_w:e.stop_w,start_delay:e.start_delay,end_delay:e.end_delay,min_cycle:e.min_cycle,heat_w:e.heat_w})}_humPatch(t,e){this._list=this._list.map(a=>a.id===t&&a.hum?{...a,hum:{...a.hum,...e}}:a)}_add(){let t=this._addType,e=this._addEntity.trim();if(!t)return;let a=this.info.types[t]?.robot===!0;if(this.info.types[t]?.humidistat===!0){let r=this._addFan.trim();if(!/^sensor\.[a-z0-9_]+$/.test(e)){this._error="Scegli dall'elenco il sensore di umidit\xE0 (un'entit\xE0 sensor.\u2026).";return}if(!/^(switch|fan|light|input_boolean)\.[a-z0-9_]+$/.test(r)){this._error="Scegli dall'elenco il ventilatore (un interruttore, un fan, una luce o un input_boolean).";return}if(this._list.some(p=>p.entity===e)){this._error="Questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.";return}let c=ce(t,e,this._addName.trim(),this.info.types[t],this._list.map(p=>p.id));this._list=[...this._list,{...c,fan_entity:r}],this._open=c.id,this._addType="",this._addEntity="",this._addFan="",this._addName="",this._error="";return}if(!/^[a-z_]+\.[a-z0-9_]+$/.test(e)||a&&!e.startsWith("vacuum.")){this._error=a?"Scegli dall'elenco il robot (un'entit\xE0 vacuum.\u2026).":"Scegli dall'elenco il sensore di potenza della presa.";return}if(this._list.some(r=>r.entity===e)){this._error="Questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.";return}let o=ce(t,e,this._addName.trim(),this.info.types[t],this._list.map(r=>r.id));this._list=[...this._list,o],this._open=o.id,this._addType="",this._addEntity="",this._addName="",this._error=""}async _save(){let t=de(this._list);if(t){this._error=t;return}let e=Number(this._price.replace(",","."));if(!Number.isFinite(e)||e<0||e>10){this._error="Il prezzo dell'energia deve essere un numero tra 0 e 10 \u20AC/kWh.";return}this._busy=!0,this._error="";try{await this.hass.callWS({type:"elettrodomestici/update",entry_id:this.info.entry_id,appliances:this._list,price_kwh:e,price_entity:this._priceEntity.trim(),notify_services:this._notify}),this.dispatchEvent(new CustomEvent("saved")),this._close()}catch(a){let s=a instanceof Error?a.message:a?.message??String(a);this._error=`Impossibile salvare: ${s}`}finally{this._busy=!1}}_impState(t){if(!this._imp[t.id]){let e=Ze(this.hass.states,t.type);this._imp[t.id]={energy:t.energy_entity??"",counter:e.counter,status:e.status,days:"730",price:"",busy:!1,msg:"",err:!1}}return this._imp[t.id]}_setImp(t,e){this._imp={...this._imp,[t]:{...this._imp[t],...e}}}async _import(t){let e=this._impState(t),a=Number(e.days.replace(",",".")),s=e.price.trim()?Number(e.price.replace(",",".")):void 0;if(!Number.isFinite(a)||a<1||a>3650||s!==void 0&&(!Number.isFinite(s)||s<0||s>10)){this._setImp(t.id,{msg:"Controlla i giorni (1-3650) e il prezzo.",err:!0});return}this._setImp(t.id,{busy:!0,msg:"",err:!1});try{let o=await this.hass.callWS({type:"elettrodomestici/import_history",entry_id:this.info.entry_id,key:t.id,days:a,...e.energy.trim()?{energy_entity:e.energy.trim()}:{},...e.counter.trim()?{counter_entity:e.counter.trim()}:{},...e.status.trim()?{status_entity:e.status.trim()}:{},...s!==void 0?{price:s}:{}}),r=[`${o.days_written} giorni importati`];o.energy_days&&r.push(`${$(o.kwh,1)} kWh`),(o.cycles||o.baseline)&&r.push(`${$(o.cycles+(o.baseline??0))} cicli (${$(o.baseline??0)} precedenti al recorder, solo nel totale)`),o.runtime_days&&r.push(`funzionamento di ${o.runtime_days} giorni`),o.skipped_days&&r.push(`${o.skipped_days} giorni scartati (valori impossibili del contatore)`),this._setImp(t.id,{busy:!1,msg:`${r.join(" \xB7 ")}.`,err:!1}),this.dispatchEvent(new CustomEvent("saved"))}catch(o){let r=o instanceof Error?o.message:o?.message??String(o);this._setImp(t.id,{busy:!1,msg:`Importazione non riuscita: ${r}`,err:!0})}}_importBox(t){let e=this._impState(t),a=this.info.appliances.some(s=>s.id===t.id);return l`
      <button class="adv" aria-expanded=${this._advanced===`imp-${t.id}`?"true":"false"} @click=${()=>this._advanced=this._advanced===`imp-${t.id}`?"":`imp-${t.id}`}>${this._advanced===`imp-${t.id}`?"\u25BE":"\u25B8"} Importa lo storico del vecchio pacchetto</button>
      ${this._advanced===`imp-${t.id}`?l`<div class="impbox">
            ${a?d:l`<div class="hint">Salva prima le preferenze: l'importazione si fa su un elettrodomestico già salvato.</div>`}
            <label class="f">Contatore di energia della presa (kWh)
              <input class="txt" list=${`dl-ie-${t.id}`} placeholder="sensor.…_energia" .value=${e.energy} @input=${s=>this._setImp(t.id,{energy:s.target.value})} />
              <datalist id=${`dl-ie-${t.id}`}>${ue(this.hass.states).map(s=>l`<option value=${s.id}>${s.name}</option>`)}</datalist>
              <span class="hint">È quello che usava il vecchio pacchetto: le sue statistiche a lungo termine danno l'energia giorno per giorno, anche di anni fa.</span></label>
            <label class="f">Contatore dei cicli (facoltativo)
              <input class="txt" list=${`dl-ic-${t.id}`} placeholder="counter.cicli_…" .value=${e.counter} @input=${s=>this._setImp(t.id,{counter:s.target.value})} />
              <datalist id=${`dl-ic-${t.id}`}>${Je(this.hass.states).map(s=>l`<option value=${s.id}>${s.name}</option>`)}</datalist>
              <span class="hint">I cicli per giorno si ricostruiscono per quanto il recorder conserva; il resto entra nel totale. Vale anche come punto di partenza della manutenzione.</span></label>
            <label class="f">Sensore di stato on/off (facoltativo)
              <input class="txt" list=${`dl-is-${t.id}`} placeholder="binary_sensor.washing_machine_status" .value=${e.status} @input=${s=>this._setImp(t.id,{status:s.target.value})} />
              <datalist id=${`dl-is-${t.id}`}>${Xe(this.hass.states).map(s=>l`<option value=${s.id}>${s.name}</option>`)}</datalist>
              <span class="hint">Per le ore di funzionamento, sempre per quanto conserva il recorder.</span></label>
            <div class="two">
              <label class="f">Quanti giorni indietro<span class="numrow"><input class="num" inputmode="numeric" .value=${e.days} @input=${s=>this._setImp(t.id,{days:s.target.value})} /><span class="u">giorni</span></span></label>
              <label class="f">Prezzo per il costo (€/kWh)<span class="numrow"><input class="num" inputmode="decimal" placeholder=${this._price} .value=${e.price} @input=${s=>this._setImp(t.id,{price:s.target.value})} /></span>
                <span class="hint">Vuoto = il prezzo attuale. Il vecchio pacchetto non salvava il costo: si ricalcola.</span></label>
            </div>
            <div class="hint">I giorni già misurati da questa integrazione non vengono toccati. Si può ripetere senza doppioni.</div>
            <button class="btn primary" ?disabled=${!a||e.busy||!e.energy.trim()&&!e.counter.trim()&&!e.status.trim()} @click=${()=>void this._import(t)}>${e.busy?"Importo\u2026":"Importa lo storico"}</button>
            ${e.msg?l`<div class=${e.err?"err":"ok"}>${e.msg}</div>`:d}
          </div>`:d}`}_num(t,e,a,s,o){return l`<label class="f">${a}
      <span class="numrow"><input class="num" inputmode="decimal" .value=${String(t[e])} @change=${r=>{let c=Number(r.target.value.replace(",","."));Number.isFinite(c)&&c>=0?this._patch(t.id,{[e]:c}):r.target.value=String(t[e])}} /><span class="u">${s}</span></span>
      <span class="hint">${o}</span></label>`}_makerBox(t){let e=this.info.makers??[],a=!!t.maker&&!!t.maker_device,s=e.find(o=>o.device_id===t.maker_device);return l`<div class="row"><div class="t"><div class="lab">Usa l'integrazione del costruttore</div>
        <div class="hint">${e.length===0?"Nessun dispositivo Electrolux trovato in Home Assistant (installa e configura l'integrazione Electrolux).":"Stato, fase, programma e tempo rimanente arrivano dall'integrazione Electrolux (solo mentre l'apparecchio \xE8 acceso); consumi e cicli restano quelli della presa."}</div></div>
        <button class=${a?"sw on":"sw"} role="switch" aria-checked=${a?"true":"false"} aria-label="Usa l'integrazione del costruttore" ?disabled=${e.length===0&&!a}
          @click=${()=>a?this._patch(t.id,{maker:null,maker_device:null}):e[0]&&this._patch(t.id,{maker:e[0].maker,maker_device:e[0].device_id})}><span class="knob"></span></button></div>
      ${a?l`<label class="f">Dispositivo
            <select class="txt" @change=${o=>{let r=e.find(c=>c.device_id===o.target.value);r&&this._patch(t.id,{maker:r.maker,maker_device:r.device_id})}}>
              ${e.map(o=>l`<option value=${o.device_id} ?selected=${o.device_id===t.maker_device}>${o.label} · ${o.name}</option>`)}
              ${s?d:l`<option value=${t.maker_device??""} selected>${t.maker_device} (non trovato)</option>`}
            </select></label>`:d}`}_hnum(t,e){let a=t.hum;return l`<label class="f">${e.label}
      <span class="numrow"><input class="num" inputmode="decimal" .value=${String(a[e.key])} @change=${s=>{let o=Number(s.target.value.replace(",","."));Number.isFinite(o)&&o>=0?this._humPatch(t.id,{[e.key]:o}):s.target.value=String(a[e.key])}} /><span class="u">${e.unit}</span></span>
      <span class="hint">${e.hint}</span></label>`}_humEditor(t){let e=t.hum,a=this.hass.states[t.entity],s=t.fan_entity?this.hass.states[t.fan_entity]:void 0,o=this._list.filter(c=>c.id!==t.id).map(c=>c.entity),r=this.info.types[t.type]?.hum;return l`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:water-percent"></ha-icon>Umidità: <b>${ut(this.hass.states,t.entity)}</b> <code>${t.entity}</code> · ora ${a?`${a.state} ${String(a.attributes.unit_of_measurement??"")}`.trim():"non disponibile"}</div>
        <div class="link"><ha-icon icon="mdi:fan"></ha-icon>Ventilatore: <b>${t.fan_entity?ut(this.hass.states,t.fan_entity):"da scegliere"}</b> <code>${t.fan_entity??""}</code> · ora ${s?s.state:"non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${t.name} @change=${c=>this._patch(t.id,{name:c.target.value.trim()||t.name})} /></label>
        <label class="f">Sensore di umidità (%)
          <input class="txt" list=${`dl-hu-${t.id}`} .value=${t.entity} @change=${c=>this._patch(t.id,{entity:c.target.value.trim()})} />
          <datalist id=${`dl-hu-${t.id}`}>${me(this.hass.states,o).map(c=>l`<option value=${c.id}>${c.name}</option>`)}</datalist></label>
        <label class="f">Ventilatore da comandare
          <input class="txt" list=${`dl-fn-${t.id}`} .value=${t.fan_entity??""} @change=${c=>this._patch(t.id,{fan_entity:c.target.value.trim()||null})} />
          <datalist id=${`dl-fn-${t.id}`}>${fe(this.hass.states).map(c=>l`<option value=${c.id}>${c.name}</option>`)}</datalist>
          <span class="hint">L'umidostato accende e spegne questa entità da solo. Se l'hai accesa a mano, si spegne con le stesse regole.</span></label>
        <label class="f">Luce del bagno (facoltativa)
          <input class="txt" list=${`dl-lt-${t.id}`} placeholder="light.… o switch.…" .value=${t.light_entity??""} @change=${c=>this._patch(t.id,{light_entity:c.target.value.trim()||null})} />
          <datalist id=${`dl-lt-${t.id}`}>${Qe(this.hass.states,[t.fan_entity??""]).map(c=>l`<option value=${c.id}>${c.name}</option>`)}</datalist>
          <span class="hint">Accendendo questa luce il ventilatore parte anche se l'umidità è bassa. Lascia vuoto per usare solo l'umidità.</span></label>
        <div class="row"><div class="t"><div class="lab">Regolazione automatica</div><div class="hint">Spenta, il ventilatore resta com'è e si comanda solo a mano. Si cambia anche dalla scheda.</div></div>
          <button class=${e.enabled?"sw on":"sw"} role="switch" aria-checked=${e.enabled?"true":"false"} aria-label="Regolazione automatica" @click=${()=>this._humPatch(t.id,{enabled:!e.enabled})}><span class="knob"></span></button></div>
        <div class="two">${[...sn,...t.light_entity?[an]:[]].map(c=>this._hnum(t,c))}</div>
        ${r?l`<button class="btn" @click=${()=>this._humPatch(t.id,{...r,enabled:e.enabled})}>Ripristina i valori predefiniti</button>`:d}
        <button class="btn del" @click=${()=>this._remove(t.id)}>Togli dall'elenco</button>
      </div>`}_robotEditor(t){let e=this.hass.states[t.entity],a=this._list.filter(s=>s.id!==t.id).map(s=>s.entity);return l`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:robot-vacuum"></ha-icon>Robot: <b>${ut(this.hass.states,t.entity)}</b> <code>${t.entity}</code> · ora ${e?e.state:"non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${t.name} @change=${s=>this._patch(t.id,{name:s.target.value.trim()||t.name})} /></label>
        <label class="f">Entità del robot
          <input class="txt" list=${`dl-rb-${t.id}`} .value=${t.entity} @change=${s=>this._patch(t.id,{entity:s.target.value.trim()})} />
          <datalist id=${`dl-rb-${t.id}`}>${he(this.hass.states,a).map(s=>l`<option value=${s.id}>${s.name}</option>`)}</datalist>
          <span class="hint">Comandi, mappa, stanze, consumabili e base si ricavano da sole dall'integrazione del robot (per ora provata con Dreame).</span></label>
        <button class="btn del" @click=${()=>this._remove(t.id)}>Togli dall'elenco</button>
      </div>`}_editor(t){if(this.info.types[t.type]?.robot)return this._robotEditor(t);if(this.info.types[t.type]?.humidistat&&t.hum)return this._humEditor(t);let e=this.info.types[t.type],a=this.hass.states[t.entity],s=this._list.filter(o=>o.id!==t.id).map(o=>o.entity);return l`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:power-plug"></ha-icon>Presa: <b>${ut(this.hass.states,t.entity)}</b> <code>${t.entity}</code> · ora ${a?`${a.state} ${String(a.attributes.unit_of_measurement??"")}`.trim():"non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${t.name} @change=${o=>this._patch(t.id,{name:o.target.value.trim()||t.name})} /></label>
        <label class="f">Sensore di potenza della presa (W)
          <input class="txt" list=${`dl-pw-${t.id}`} .value=${t.entity} @change=${o=>this._patch(t.id,{entity:o.target.value.trim()})} />
          <datalist id=${`dl-pw-${t.id}`}>${pe(this.hass.states,s).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>
        <label class="f">Contatore di energia della presa (facoltativo)
          <input class="txt" list=${`dl-en-${t.id}`} placeholder="sensor.…_energia" .value=${t.energy_entity??""} @change=${o=>this._patch(t.id,{energy_entity:o.target.value.trim()||null})} />
          <datalist id=${`dl-en-${t.id}`}>${ue(this.hass.states).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
          <span class="hint">Se manca, l'energia si ricava dalla potenza. Con il contatore della presa è più precisa.</span></label>

        ${this._makerBox(t)}

        <div class="f">Dispositivi collegati (facoltativi)
          <div class="chips">
            ${t.extras.map(o=>l`<span class="tag"><span>${o.label||ut(this.hass.states,o.entity)}</span><button aria-label=${`Togli ${o.entity}`} @click=${()=>this._patch(t.id,{extras:t.extras.filter(r=>r.entity!==o.entity)})}>✕</button></span>`)}
            ${t.extras.length===0?l`<span class="hint">Nessuno</span>`:d}
          </div>
          <div class="addrow">
            <input class="txt" list=${`dl-ex-${t.id}`} placeholder="sensor.programma_asciugatrice" .value=${this._extra} @input=${o=>this._extra=o.target.value} />
            <datalist id=${`dl-ex-${t.id}`}>${Ye(this.hass.states,t.extras.map(o=>o.entity)).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
            <button class="btn" ?disabled=${!this._extra.trim()} @click=${()=>{let o=this._extra.trim();/^[a-z_]+\.[a-z0-9_]+$/.test(o)&&!t.extras.some(r=>r.entity===o)&&this._patch(t.id,{extras:[...t.extras,{entity:o,label:""}]}),this._extra=""}}>Aggiungi</button>
          </div>
          <span class="hint">Per esempio programma, tempo rimanente o stato dell'integrazione del costruttore: si vedono sulla scheda e nelle statistiche.</span>
        </div>

        ${e.has_finished?l`<div class="row"><div class="t"><div class="lab">Avvisa a fine ciclo</div><div class="hint">Manda la notifica ai servizi scelti qui sotto e genera l'evento <code>elettrodomestici_ciclo_terminato</code>.</div></div>
              <button class=${t.notify?"sw on":"sw"} role="switch" aria-checked=${t.notify?"true":"false"} aria-label="Avvisa a fine ciclo" @click=${()=>this._patch(t.id,{notify:!t.notify})}><span class="knob"></span></button></div>`:l`<div class="row"><div class="t"><div class="lab">Avvisa se resta acceso a lungo</div><div class="hint">Notifica e evento <code>elettrodomestici_avviso</code>.</div></div>
              <button class=${t.notify?"sw on":"sw"} role="switch" aria-checked=${t.notify?"true":"false"} aria-label="Avvisa se resta acceso" @click=${()=>this._patch(t.id,{notify:!t.notify})}><span class="knob"></span></button></div>`}
        <div class="two">
          ${this._num(t,"alert_minutes","Avviso se in funzione da pi\xF9 di","min","0 = nessun avviso.")}
          ${e.maint_label&&e.has_finished?this._num(t,"maint_cycles","Manutenzione ogni","cicli",`${e.maint_label}. 0 = non seguirla.`):d}
        </div>

        <button class="adv" aria-expanded=${this._advanced===t.id?"true":"false"} @click=${()=>this._advanced=this._advanced===t.id?"":t.id}>${this._advanced===t.id?"\u25BE":"\u25B8"} Soglie e tempi (avanzate)</button>
        ${this._advanced===t.id?l`<div class="two">${on.filter(o=>o.key!=="heat_w"||e.phases.length>1).map(o=>this._num(t,o.key,o.label,o.unit,o.hint))}</div>
              <button class="btn" @click=${()=>this._reset(t)}>Ripristina i valori predefiniti</button>`:d}
        ${this._importBox(t)}
        <button class="btn del" @click=${()=>this._remove(t.id)}>Togli dall'elenco</button>
      </div>`}render(){if(!this.info)return d;let t=de(this._list),e=ei(this.hass.services).filter(o=>!this._notify.includes(o)),a=this._list.map(o=>o.entity),s=this._addType?this.info.types[this._addType]:null;return l`
      <div class="backdrop" @click=${o=>o.target===o.currentTarget&&this._close()}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Preferenze elettrodomestici">
          <div class="head"><div class="title">Preferenze degli elettrodomestici</div><button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button></div>
          <div class="body">
            <div class="sec">Elettrodomestici</div>
            ${this._list.length===0?l`<div class="empty">Nessun elettrodomestico: aggiungine uno qui sotto.</div>`:d}
            ${this._list.map(o=>l`
                <div class="item">
                  <button class="head2" aria-expanded=${this._open===o.id?"true":"false"} @click=${()=>this._open=this._open===o.id?"":o.id}>
                    <ha-icon icon=${ee[o.type]}></ha-icon>
                    <span class="nm">${o.name}<span class="eid">${o.entity}</span></span>
                    <span class="meta">${dt[o.type]}</span>
                    <span class="chev">${this._open===o.id?"\u25BE":"\u25B8"}</span>
                  </button>
                  ${this._open===o.id?this._editor(o):d}
                </div>`)}

            <div class="sec">Aggiungi un elettrodomestico</div>
            <div class="types">
              ${De.map(o=>l`<button class=${this._addType===o?"type on":"type"} aria-pressed=${this._addType===o?"true":"false"} @click=${()=>this._addType=this._addType===o?"":o}><ha-icon icon=${ee[o]}></ha-icon>${dt[o]}</button>`)}
            </div>
            ${s?l`<div class="addbox">
                  ${s.humidistat?l`<label class="f">Sensore di umidità (%)
                        <input class="txt" list="dl-add" placeholder="sensor.…_umidita" .value=${this._addEntity} @input=${o=>this._addEntity=o.target.value} />
                        <datalist id="dl-add">${me(this.hass.states,a).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>
                      <label class="f">Ventilatore da comandare
                        <input class="txt" list="dl-add-fan" placeholder="switch.…" .value=${this._addFan} @input=${o=>this._addFan=o.target.value} />
                        <datalist id="dl-add-fan">${fe(this.hass.states).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>`:s.robot?l`<label class="f">Robot (entità vacuum)
                        <input class="txt" list="dl-add" placeholder="vacuum.…" .value=${this._addEntity} @input=${o=>this._addEntity=o.target.value} />
                        <datalist id="dl-add">${he(this.hass.states,a).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>`:l`<label class="f">Sensore di potenza della presa (W)
                        <input class="txt" list="dl-add" placeholder="sensor.presa_…_potenza" .value=${this._addEntity} @input=${o=>this._addEntity=o.target.value} />
                        <datalist id="dl-add">${pe(this.hass.states,a).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>`}
                  <label class="f">Nome (facoltativo)<input class="txt" placeholder=${s.label} .value=${this._addName} @input=${o=>this._addName=o.target.value} /></label>
                  ${s.humidistat?l`<div class="hint">Accende il ventilatore quando l'umidità resta sopra ${s.hum?.on_above} % per ${s.hum?.on_delay} min e lo spegne sotto ${s.hum?.off_below} % per ${s.hum?.off_delay} min (massimo ${s.hum?.max_on} min). Tutte le soglie si cambiano dopo.</div>`:s.robot?l`<div class="hint">Sulla scheda compare con stato, batteria e comandi rapidi; toccandolo si apre la gestione completa (stanze, impostazioni, base, consumabili).</div>`:l`<div class="hint">Parte oltre ${s.start_w} W${s.phases.length>1?`, fasi: ${s.phases.join(" \u2192 ")}`:""}${s.has_finished?`, finisce dopo ${C(s.end_delay)} sotto ${s.stop_w} W`:""}. Le soglie si possono cambiare dopo.</div>`}
                  <button class="btn primary" ?disabled=${!this._addEntity.trim()||!!s.humidistat&&!this._addFan.trim()} @click=${()=>this._add()}>Aggiungi ${s.label.toLowerCase()}</button>
                </div>`:d}

            <div class="sec">Costo dell'energia</div>
            <label class="f">Prezzo (€/kWh)
              <input class="num wide" inputmode="decimal" .value=${this._price} @input=${o=>this._price=o.target.value} /></label>
            <label class="f">Oppure un sensore con il prezzo attuale (facoltativo)
              <input class="txt" list="dl-price" placeholder="sensor.prezzo_energia" .value=${this._priceEntity} @input=${o=>this._priceEntity=o.target.value} />
              <datalist id="dl-price">${ti(this.hass.states).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
              <span class="hint">Se c'è e ha un valore, vale al posto del prezzo fisso.</span></label>

            <div class="sec">Notifiche</div>
            <div class="chips">
              ${this._notify.map(o=>l`<span class="tag"><span>${o}</span><button aria-label=${`Togli ${o}`} @click=${()=>this._notify=this._notify.filter(r=>r!==o)}>✕</button></span>`)}
              ${this._notify.length===0?l`<span class="hint">Nessun servizio: si genera solo l'evento nel bus di Home Assistant.</span>`:d}
            </div>
            <div class="addrow">
              <input class="txt" list="dl-svc" placeholder="notify.mobile_app_telefono" .value=${this._svc} @input=${o=>this._svc=o.target.value} />
              <datalist id="dl-svc">${e.map(o=>l`<option value=${o}></option>`)}</datalist>
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
      </div>`}static{this.styles=[X,I`
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
    `]}};g([E({attribute:!1})],A.prototype,"hass",2),g([E({attribute:!1})],A.prototype,"info",2),g([E()],A.prototype,"openKey",2),g([v()],A.prototype,"_list",2),g([v()],A.prototype,"_price",2),g([v()],A.prototype,"_priceEntity",2),g([v()],A.prototype,"_notify",2),g([v()],A.prototype,"_open",2),g([v()],A.prototype,"_addType",2),g([v()],A.prototype,"_addEntity",2),g([v()],A.prototype,"_addFan",2),g([v()],A.prototype,"_addName",2),g([v()],A.prototype,"_extra",2),g([v()],A.prototype,"_svc",2),g([v()],A.prototype,"_advanced",2),g([v()],A.prototype,"_imp",2),g([v()],A.prototype,"_busy",2),g([v()],A.prototype,"_error",2);customElements.get("elettro-settings-dialog")||customElements.define("elettro-settings-dialog",A);var St=[{key:"oggi",label:"Oggi"},{key:"ieri",label:"Ieri"},{key:"settimana",label:"Settimana"},{key:"mese",label:"Mese"},{key:"anno",label:"Anno"},{key:"totale",label:"Totale"}],K=class extends T{constructor(){super(...arguments);this.openKey="";this._stats=null;this._error="";this._now=Date.now();this._onKey=t=>{t.key==="Escape"&&this._close()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._tick=window.setInterval(()=>this._now=Date.now(),1e3),this._poll=window.setInterval(()=>void this._load(),6e4),this._load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey),this._tick&&window.clearInterval(this._tick),this._poll&&window.clearInterval(this._poll)}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_go(t){this.dispatchEvent(new CustomEvent("open-dialog",{detail:{tag:t,key:this.openKey}})),this._close()}get _app(){return this.info.appliances.find(t=>t.key===this.openKey)}async _load(){try{let t=await this.hass.callWS({type:"elettrodomestici/stats",entry_id:this.info.entry_id,key:this.openKey});this._stats=t[this.openKey]??null,this._error=""}catch(t){this._error=`Impossibile leggere le statistiche: ${t instanceof Error?t.message:t?.message??String(t)}`}}async _maintDone(){await this.hass.callWS({type:"elettrodomestici/action",entry_id:this.info.entry_id,key:this.openKey,action:"reset_maintenance"}),await this._load()}render(){let t=this._app;if(!t)return d;let e=Ut(t,this.hass.states,this.info.types,this._now),a=this.info.types[t.type],s=this._stats,o=!a?.has_finished&&t.type==="frigorifero";return l`
      <div class="backdrop" @click=${r=>r.target===r.currentTarget&&this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Statistiche ${t.name}`}>
          <div class="head">
            <div class="title">${t.name}${t.name!==dt[t.type]?l` <span class="sub">${dt[t.type]}</span>`:d}</div>
            <button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button>
          </div>
          <div class="body">
            <div class="now ${e.tone}">
              <span class="img">${G(Y(t.type,e.state))}</span>
              <div class="nowtxt">
                <div class="st">${pt[e.state]}${e.state==="in_funzione"?l` · <b>${e.phase}</b>`:e.state==="terminato"?l` · <b>${e.phase}</b>`:d}</div>
                <div class="big">${J(e.power)}</div>
                ${e.state==="in_funzione"&&e.cycleKwh!==null?l`<div class="line">Questo ciclo: <b>${P(e.cycleKwh)}</b> · ${H(e.cycleEur)}${e.remainingText?l` · ${e.remainingText}`:d}</div>`:d}
                ${e.state==="in_funzione"&&t.inizio?l`<div class="line">Partita alle ${ae(t.inizio)}</div>`:d}
                ${e.state==="terminato"?l`<div class="line">Finita alle ${ae(t.fine)}.</div>`:d}
              </div>
            </div>

            ${e.extras.length?l`<div class="sec">Collegato al dispositivo</div><div class="kv">${e.extras.map(r=>l`<span>${r.label}</span><b>${r.value}</b>`)}</div>`:d}

            <div class="sec">Consumi</div>
            ${s?l`<div class="tblwrap"><table>
                  <thead><tr><th></th>${St.map(r=>l`<th>${r.label}</th>`)}</tr></thead>
                  <tbody>
                    <tr><th>Energia</th>${St.map(r=>l`<td>${P(s.periods[r.key].kwh)}</td>`)}</tr>
                    <tr><th>Costo</th>${St.map(r=>l`<td>${H(s.periods[r.key].eur)}</td>`)}</tr>
                    <tr><th>${o?"Avvii compressore":"Cicli"}</th>${St.map(r=>l`<td>${$(s.periods[r.key].cycles)}</td>`)}</tr>
                    <tr><th>Funzionamento</th>${St.map(r=>l`<td>${ie(s.periods[r.key].sec)}</td>`)}</tr>
                  </tbody></table></div>
                <div class="hint">Costo calcolato a ${$(s.price_kwh,3)} €/kWh. L'energia comprende anche i consumi a riposo.</div>`:this._error?d:l`<div class="muted">Carico…</div>`}

            ${s?.summary?l`<div class="sec">${o?"Compressore":"Ciclo medio"} <span class="sub">(ultimi ${s.summary.count})</span></div>
                <div class="kv">
                  <span>Durata media</span><b>${C(s.summary.avg_seconds)}</b>
                  <span>Più corto / più lungo</span><b>${C(s.summary.min_seconds)} / ${C(s.summary.max_seconds)}</b>
                  <span>Energia media</span><b>${P(s.summary.avg_kwh)} · ${H(s.summary.avg_eur)}</b>
                  <span>Energia massima</span><b>${P(s.summary.max_kwh)}</b>
                </div>`:d}

            ${a&&t.maint_cycles>0&&s?l`<div class="sec">Manutenzione</div>
                <div class="maint ${s.maintenance.due?"due":""}">
                  <div class="mrow"><span>${a.maint_label}</span><b>${s.maintenance.count} / ${s.maintenance.threshold} cicli</b></div>
                  <div class="bar"><i style="width:${s.maintenance.pct??0}%"></i></div>
                  <button class="btn" @click=${()=>void this._maintDone()}><ha-icon icon="mdi:check"></ha-icon>Manutenzione fatta</button>
                </div>`:d}

            ${s&&s.cycles.length?l`<div class="sec">Ultimi cicli</div>
                <div class="tblwrap"><table class="cyc">
                  <thead><tr><th>Quando</th><th>Durata</th><th>Energia</th><th>Costo</th><th>Picco</th></tr></thead>
                  <tbody>${s.cycles.slice(0,15).map(r=>l`<tr><td>${Ot(Date.parse(r.s))}</td><td>${C((Date.parse(r.e)-Date.parse(r.s))/1e3)}</td><td>${P(r.kwh)}</td><td>${H(r.eur)}</td><td>${J(r.pk)}</td></tr>`)}</tbody>
                </table></div>`:s?l`<div class="sec">Ultimi cicli</div><div class="muted">Nessun ciclo registrato.</div>`:d}

            <div class="sec">Come lo riconosco</div>
            <div class="kv small">
              <span>Presa (potenza)</span><b>${t.entity}</b>
              ${t.energy_entity?l`<span>Presa (energia)</span><b>${t.energy_entity}</b>`:d}
              <span>Parte sopra</span><b>${J(t.start_w)} per ${t.start_delay} s</b>
              <span>Finisce sotto</span><b>${J(t.stop_w)} per ${C(t.end_delay)}</b>
              ${a?.phases.length&&a.phases.length>1?l`<span>Fasi</span><b>${a.phases.join(" \u2192 ")}</b>`:d}
              <span>Cicli più brevi di</span><b>${C(t.min_cycle)} non contano</b>
            </div>
            ${this._error?l`<div class="err">${this._error}</div>`:d}
          </div>
          <div class="foot">
            <button class="btn" @click=${()=>this._go("elettro-settings-dialog")}><ha-icon icon="mdi:cog"></ha-icon>Preferenze</button>
            <button class="btn primary" @click=${()=>this._go("elettro-charts-dialog")}><ha-icon icon="mdi:chart-line"></ha-icon>Grafici</button>
          </div>
        </div>
      </div>`}static{this.styles=[X,I`
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
    `]}};g([E({attribute:!1})],K.prototype,"hass",2),g([E({attribute:!1})],K.prototype,"info",2),g([E()],K.prototype,"openKey",2),g([v()],K.prototype,"_stats",2),g([v()],K.prototype,"_error",2),g([v()],K.prototype,"_now",2);customElements.get("elettro-stats-dialog")||customElements.define("elettro-stats-dialog",K);var _e=[{id:"6h",label:"6 ore",ms:6*36e5},{id:"24h",label:"24 ore",ms:24*36e5},{id:"3d",label:"3 giorni",ms:3*864e5},{id:"7d",label:"7 giorni",ms:7*864e5}],rn=[{id:7,label:"7 giorni"},{id:30,label:"30 giorni"},{id:90,label:"90 giorni"}],N=220,q=10,R=44,hi=22,qt=12,z=class extends T{constructor(){super(...arguments);this.openKey="";this._tab="potenza";this._range="24h";this._days=30;this._metric="kwh";this._loading=!1;this._error="";this._w=640;this._hover=null;this._values=[];this._segs=[];this._stats=null;this._t0=0;this._t1=0;this._n=240;this._raw=[];this._rawStates=[];this._wrapEl=null;this._seq=0;this._onKey=t=>{t.key==="Escape"&&this._close()}}get _app(){return this.info.appliances.find(t=>t.key===this.openKey)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._timer=window.setInterval(()=>void this._load(),6e4),this._load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey),this._ro?.disconnect(),this._timer&&window.clearInterval(this._timer)}updated(){let t=this.renderRoot.querySelector(".chartwrap");t&&t!==this._wrapEl&&(this._ro?.disconnect(),this._wrapEl=t,this._ro=new ResizeObserver(e=>{let a=Math.floor(e[0]?.contentRect.width??640);a>100&&Math.abs(a-this._w)>2&&(this._w=a,this._recompute())}),this._ro.observe(t))}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_go(t){this.dispatchEvent(new CustomEvent("open-dialog",{detail:{tag:t,key:this.openKey}})),this._close()}async _history(t,e,a){return this.hass.callWS({type:"history/history_during_period",start_time:new Date(e).toISOString(),end_time:new Date(a).toISOString(),entity_ids:t,include_start_time_state:!0,significant_changes_only:!1,minimal_response:!0,no_attributes:!0})}async _load(){let t=this._app;if(!this.hass||!t)return;let e=++this._seq;this._loading=!0;try{if(this._tab==="consumi"){let a=await this.hass.callWS({type:"elettrodomestici/stats",entry_id:this.info.entry_id,key:t.key});if(e!==this._seq)return;this._stats=a[t.key]??null}else{let a=_e.find(p=>p.id===this._range)??_e[1],s=Date.now(),o=s-a.ms,r=t.entities.stato,c=await this._history(r?[t.entity,r]:[t.entity],o,s);if(e!==this._seq)return;this._t0=o,this._t1=s,this._raw=ni(c[t.entity]),this._rawStates=r?c[r]??[]:[],this._recompute()}this._error=""}catch(a){e===this._seq&&(this._error=`Impossibile leggere i dati: ${a instanceof Error?a.message:a?.message??String(a)}`)}finally{e===this._seq&&(this._loading=!1)}}_recompute(){this._t1&&(this._n=Math.max(60,Math.min(480,Math.floor((this._w-R-8)/2))),this._values=oi(this._raw,this._t0,this._t1,this._n,30*6e4),this._segs=si(this._rawStates,this._t0,this._t1))}_setTab(t){this._tab=t,this._hover=null,this._load()}_setRange(t){this._range=t,this._hover=null,this._load()}_move(t,e,a,s){let o=t.currentTarget.getBoundingClientRect(),r=Math.round((t.clientX-o.left-a)/s*(e-1));this._hover=r>=0&&r<e?r:null}_moveBar(t,e,a,s){let o=t.currentTarget.getBoundingClientRect(),r=Math.floor((t.clientX-o.left-a)/s*e);this._hover=r>=0&&r<e?r:null}_power(t){let e=this._values.filter(m=>m!==null),a=oe(this.hass.states[t.entity]),s=Math.max(t.start_w*1.5,...e.length?e:[0],a??0),o=ge(0,s,5),r=this._w,c=r-R-8,p=q+N+qt+hi+6,u=m=>R+(this._n<=1?0:m/(this._n-1)*c),h=m=>q+N-(m-o.min)/(o.max-o.min||1)*N,b=m=>R+(m-this._t0)/(this._t1-this._t0||1)*c,f=[{v:t.start_w,c:Q.in_funzione,l:"avvio"},...t.stop_w!==t.start_w?[{v:t.stop_w,c:Q.spento,l:"fine"}]:[],...t.heat_w<o.max?[{v:t.heat_w,c:"#ef4444",l:"riscaldamento"}]:[]],y=this._hover,w=y!==null&&this._n>1?this._t0+y/(this._n-1)*(this._t1-this._t0):null,x=y!==null?this._values[y]:null,M=w!==null?ai(this._segs,w):null;return l`
      <div class="ranges">
        ${_e.map(m=>l`<button class=${m.id===this._range?"chip on":"chip"} @click=${()=>this._setRange(m.id)}>${m.label}</button>`)}
        ${this._loading?l`<span class="load">aggiorno…</span>`:d}
      </div>
      <div class="chartwrap">
        <div class="tip">
          ${w!==null?l`<b>${Ot(w)}</b> · ${x!==null?`${$(x,0)} W`:"nessun dato"}${M?l` · <span style="color:${Q[M]==="transparent"?"inherit":Q[M]}">${pt[M]}</span>`:d}`:l`<span class="muted">Tocca il grafico per leggere i valori</span>`}
        </div>
        <svg width=${r} height=${p} viewBox="0 0 ${r} ${p}" @pointermove=${m=>this._move(m,this._n,R,c)} @pointerdown=${m=>this._move(m,this._n,R,c)} @pointerleave=${()=>this._hover=null}>
          ${o.ticks.map(m=>O`
            <line x1=${R} x2=${r-8} y1=${h(m)} y2=${h(m)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
            <text x=${R-6} y=${h(m)+4} text-anchor="end" class="ax">${$(m)}</text>`)}
          ${f.map((m,_)=>O`<line x1=${R} x2=${r-8} y1=${h(m.v)} y2=${h(m.v)} stroke=${m.c} stroke-width="1.2" stroke-dasharray="5 4" opacity="0.9" />
            ${_===0||Math.abs(h(f[_-1].v)-h(m.v))>=13?O`<text x=${r-10} y=${h(m.v)-3} text-anchor="end" class="th" fill=${m.c}>${m.l} ${$(m.v,m.v%1?1:0)} W${_<f.length-1&&Math.abs(h(f[_+1].v)-h(m.v))<13?` \xB7 ${f[_+1].l} ${$(f[_+1].v,f[_+1].v%1?1:0)} W`:""}</text>`:d}`)}
          <path d=${li(this._values,u,h)} fill="none" stroke="var(--primary-color,#03a9f4)" stroke-width="1.8" stroke-linejoin="round" />
          ${y!==null&&x!==null?O`<line x1=${u(y)} x2=${u(y)} y1=${q} y2=${q+N} stroke="var(--secondary-text-color,#888)" stroke-width="1" /><circle cx=${u(y)} cy=${h(x)} r="4" fill="var(--primary-color,#03a9f4)" />`:d}
          ${this._segs.map(m=>O`<rect x=${b(m.from)} y=${q+N+4} width=${Math.max(1,b(m.to)-b(m.from))} height=${qt} fill=${Q[m.state]==="transparent"?"#9aa1ad":Q[m.state]} opacity=${m.state==="non_disponibile"?.35:.9} />`)}
          ${ri(this._t0,this._t1).map(m=>O`
            <line x1=${b(m.t)} x2=${b(m.t)} y1=${q+N+qt+4} y2=${q+N+qt+8} stroke="var(--secondary-text-color,#888)" />
            <text x=${b(m.t)} y=${p-4} text-anchor="middle" class=${m.major?"ax maj":"ax"}>${m.label}</text>`)}
        </svg>
        <div class="legend">
          ${["spento","in_funzione","terminato"].map(m=>l`<span><i style="background:${Q[m]}"></i>${pt[m]}</span>`)}
        </div>
      </div>
      ${!this._loading&&!this._error&&this._values.every(m=>m===null)?l`<div class="empty">Nessun dato di potenza nel periodo.</div>`:d}`}_consumi(){let t=this._stats;if(!t)return l`<div class="empty">${this._loading?"Carico\u2026":"Nessun dato."}</div>`;let e=t.series.slice(-this._days),a=this._metric,s=e.map(_=>_[a]),o=Math.max(...s,a==="cycles"?1:.01),r=ge(0,o,5),c=this._w,p=c-R-8,u=q+N+hi+6,h=e.length,b=p/h,f=Math.max(2,Math.min(28,b-(b>6?2:0))),y=_=>q+N-(_-r.min)/(r.max-r.min||1)*N,w=_=>R+_*b+(b-f)/2,x=this._hover,M=Ve(e,this._days),m=Math.max(1,Math.ceil(h/7));return l`
      <div class="ranges">
        ${rn.map(_=>l`<button class=${_.id===this._days?"chip on":"chip"} @click=${()=>(this._days=_.id,this._hover=null)}>${_.label}</button>`)}
        <span class="sep"></span>
        ${Object.keys(re).map(_=>l`<button class=${_===a?"chip on":"chip"} @click=${()=>(this._metric=_,this._hover=null)}>${re[_]}</button>`)}
        ${this._loading?l`<span class="load">aggiorno…</span>`:d}
      </div>
      <div class="totals"><span>Totale nel periodo</span><b>${P(M.kwh)}</b><b>${H(M.eur)}</b><b>${le("cycles",M.cycles)}</b></div>
      <div class="chartwrap">
        <div class="tip">
          ${x!==null&&e[x]?l`<b>${se(e[x].date)}</b> · ${le(a,e[x][a])}${a!=="kwh"?l` · ${P(e[x].kwh)}`:d}${a!=="eur"?l` · ${H(e[x].eur)}`:d}`:l`<span class="muted">Tocca una barra per leggere il giorno</span>`}
        </div>
        <svg width=${c} height=${u} viewBox="0 0 ${c} ${u}" @pointermove=${_=>this._moveBar(_,h,R,p)} @pointerdown=${_=>this._moveBar(_,h,R,p)} @pointerleave=${()=>this._hover=null}>
          ${r.ticks.map(_=>O`
            <line x1=${R} x2=${c-8} y1=${y(_)} y2=${y(_)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
            <text x=${R-6} y=${y(_)+4} text-anchor="end" class="ax">${$(_,(a==="kwh"||a==="eur")&&r.max<5?1:0)}</text>`)}
          ${e.map((_,F)=>O`<rect x=${w(F)} y=${y(_[a])} width=${f} height=${Math.max(0,q+N-y(_[a]))} rx=${f>6?3:1} fill=${x===F?"var(--primary-color,#03a9f4)":"#f59e0b"} opacity=${x===null||x===F?1:.55} />`)}
          ${e.map((_,F)=>F%m===0?O`<text x=${w(F)+f/2} y=${u-4} text-anchor="middle" class="ax">${se(_.date).replace(/^\w+ /,"")}</text>`:d)}
        </svg>
      </div>`}render(){let t=this._app;return t?l`
      <div class="backdrop" @click=${e=>e.target===e.currentTarget&&this._close()}>
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
      </div>`:d}static{this.styles=[X,I`
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
    `]}};g([E({attribute:!1})],z.prototype,"hass",2),g([E({attribute:!1})],z.prototype,"info",2),g([E()],z.prototype,"openKey",2),g([v()],z.prototype,"_tab",2),g([v()],z.prototype,"_range",2),g([v()],z.prototype,"_days",2),g([v()],z.prototype,"_metric",2),g([v()],z.prototype,"_loading",2),g([v()],z.prototype,"_error",2),g([v()],z.prototype,"_w",2),g([v()],z.prototype,"_hover",2),g([v()],z.prototype,"_values",2),g([v()],z.prototype,"_segs",2),g([v()],z.prototype,"_stats",2);customElements.get("elettro-charts-dialog")||customElements.define("elettro-charts-dialog",z);var ln=[{key:"pulisci",label:"Pulisci",icon:"mdi:robot-vacuum"},{key:"impostazioni",label:"Impostazioni",icon:"mdi:tune-variant"},{key:"base",label:"Base",icon:"mdi:home-lightning-bolt-outline"},{key:"manutenzione",label:"Manutenzione",icon:"mdi:wrench-clock"}],ye=[["cleaning_mode","Modalit\xE0"],["suction_level","Aspirazione"],["mop_pad_humidity","Umidit\xE0 del panno"],["cleaning_route","Percorso"],["water_temperature","Temperatura dell'acqua"],["carpet_cleaning","Tappeti"]],cn=[["auto_empty_mode","Svuotamento automatico"],["mop_wash_level","Lavaggio dei panni"],["drying_time","Durata dell'asciugatura"],["self_clean_frequency","Quando lavare i panni"]],dn=[["clean_water_tank_status","Serbatoio acqua pulita",["low_water","not_installed","not_available"]],["dirty_water_tank_status","Serbatoio acqua sporca",["not_installed_or_full"]],["dust_bag_status","Sacchetto della polvere",["check","not_installed"]],["mop_pad","Panno",["not_installed"]],["self_wash_base_status","Lavaggio della base",[]],["auto_empty_status","Svuotamento",[]]],pn=[["start_auto_empty","Svuota la polvere","mdi:delete-empty-outline"],["self_clean","Lava i panni","mdi:washing-machine"],["manual_drying","Asciuga i panni","mdi:hair-dryer-outline"],["clear_warning","Cancella avviso","mdi:alert-remove-outline"]],un=[["customized_cleaning","Pulizia personalizzata per stanza"],["resume_cleaning","Riprendi dopo la ricarica"],["carpet_boost","Pi\xF9 aspirazione sui tappeti"],["obstacle_avoidance","Evita gli ostacoli"],["auto_drying","Asciuga i panni da solo"],["self_clean","Lava i panni da solo"],["dnd","Non disturbare"],["child_lock","Blocco bambini"]],L=class extends T{constructor(){super(...arguments);this.openKey="";this._tab="pulisci";this._rooms=[];this._repeats=1;this._how=!1;this._confirm="";this._error="";this._onKey=t=>{t.key==="Escape"&&this._close()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey)}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}get _robot(){return this.info.robots?.find(t=>t.key===this.openKey)}_st(t){return t?this.hass.states[t]:void 0}_has(t,e){return!!this.hass.services?.[t]?.[e]}async _call(t,e,a){try{await this.hass.callService(t,e,a),this._error=""}catch(s){this._error=`Comando non riuscito: ${s instanceof Error?s.message:s?.message??String(s)}`}}_vacuum(t,e={}){let a=this._robot;a&&this._call("vacuum",t,{entity_id:a.entity,...e})}_press(t){this._call("button","press",{entity_id:t})}_selectOption(t,e){this._call("select","select_option",{entity_id:t,option:e})}_toggle(t,e){this._call("switch",e?"turn_on":"turn_off",{entity_id:t})}_chips(t,e){let a=this._st(t),s=a?.attributes.options;return!a||!Array.isArray(s)||["unavailable","unknown"].includes(a.state)?d:l`<div class="group"><div class="glab">${e}</div>
      <div class="chips">${s.map(o=>l`<button class=${a.state===o?"chip on":"chip"} aria-pressed=${a.state===o?"true":"false"} @click=${()=>this._selectOption(t,String(o))}>${W(this.hass,t,String(o))||be(String(o))}</button>`)}</div></div>`}_selects(t,e){let a=e.map(([s,o])=>this._chips(k(t,`select.${s}`),o)).filter(s=>s!==d);return a.length?l`${a}`:d}_hero(t){let e=ht(t,this.hass),a=W(this.hass,k(t,"sensor.state")),s=e.battery;return l`<div class="hero ${e.tone}">
      <span class="himg">${G(Y("aspirapolvere",e.state))}</span>
      <div class="htxt">
        <div class="hst">${e.statusLine}</div>
        ${a&&a!==e.statusLine?l`<div class="hline">${a}</div>`:d}
        <div class="hbat">${e.charging?l`<ha-icon icon="mdi:lightning-bolt"></ha-icon>`:d}<b>${s===null?"\u2013":`${$(s,0)} %`}</b>
          ${s!==null?l`<span class="bbar"><i class=${s<=20?"low":""} style=${`width:${Math.min(100,Math.max(0,s))}%`}></i></span>`:d}</div>
        ${e.room||e.area!==null||e.minutes!==null?l`<div class="hline">${[e.room,e.area!==null?`${$(e.area,0)} m\xB2`:"",e.minutes!==null?C(e.minutes*60):""].filter(Boolean).join(" \xB7 ")}</div>`:d}
      </div></div>
      ${e.error?l`<div class="err"><ha-icon icon="mdi:alert-circle-outline"></ha-icon> ${e.error}${this._has("button","press")&&k(t,"button.clear_warning")?l` <button class="btn s" @click=${()=>this._press(k(t,"button.clear_warning"))}>Cancella</button>`:d}</div>`:d}
      `}_map(t){let e=k(t,"camera.map"),a=this._st(e),s=a&&typeof a.attributes.entity_picture=="string"?a.attributes.entity_picture:"";if(!s)return d;let o=`${s}${s.includes("?")?"&":"?"}t=${encodeURIComponent(a?.state??"")}`;return l`<div class="sec">Mappa</div><div class="map"><img src=${o} alt="Mappa della casa" loading="lazy" /></div>`}_shortcuts(t){let e=pi(this._st(t.entity));return!e.length||!this._has("dreame_vacuum","vacuum_start_shortcut")?d:l`<div class="sec">Scorciatoie</div><div class="chips">${e.map(a=>l`<button class=${a.running?"chip on":"chip"} @click=${()=>void this._call("dreame_vacuum","vacuum_start_shortcut",{entity_id:t.entity,shortcut_id:a.id})}><ha-icon icon="mdi:lightning-bolt-outline"></ha-icon>${a.name}</button>`)}</div>`}_live(t){let e=ht(t,this.hass);return!e.canPause&&!(e.canStart&&e.activity==="paused")&&!e.canStop?d:l`<div class="cmds live">
      ${e.canPause?l`<button class="cmd" @click=${()=>this._vacuum("pause")}><ha-icon icon="mdi:pause"></ha-icon>Pausa</button>`:d}
      ${e.activity==="paused"?l`<button class="cmd go" @click=${()=>this._vacuum("start")}><ha-icon icon="mdi:play"></ha-icon>Riprendi</button>`:d}
      ${e.canStop?l`<button class="cmd" @click=${()=>this._vacuum("stop")}><ha-icon icon="mdi:stop"></ha-icon>Stop</button>`:d}
      ${e.canHome?l`<button class="cmd" @click=${()=>this._vacuum("return_to_base")}><ha-icon icon="mdi:home-import-outline"></ha-icon>Alla base</button>`:d}
    </div>`}_start(t,e){e.segments?this._call("dreame_vacuum","vacuum_clean_segment",{entity_id:t.entity,segments:e.segments,repeats:e.repeats}):this._vacuum("start")}_howSummary(t){return ye.slice(0,3).map(([e])=>W(this.hass,k(t,`select.${e}`))).filter(Boolean).join(" \xB7 ")}_tabClean(t){let e=ht(t,this.hass),a=this._st(k(t,"select.selected_map"))?.state??"",s=ci(this._st(t.entity),a),o=this._has("dreame_vacuum","vacuum_clean_segment")&&s.length>0,r=this._rooms.filter(f=>s.some(y=>y.id===f)),c=di(s,r,this._repeats,o),p=e.activity==="cleaning"||e.activity==="returning",u=e.activity==="unavailable",h=this._selects(t,ye.slice(0,3)),b=this._howSummary(t);return l`${this._hero(t)}${this._live(t)}
      <div class="sec">Cosa vuoi pulire</div>
      <div class="chips">
        <button class=${r.length===0?"chip on":"chip"} aria-pressed=${r.length===0?"true":"false"} @click=${()=>this._rooms=[]}><ha-icon icon="mdi:home-outline"></ha-icon>Tutta la casa</button>
        ${s.map(f=>l`<button class=${r.includes(f.id)?"chip on":"chip"} aria-pressed=${r.includes(f.id)?"true":"false"} @click=${()=>this._rooms=r.includes(f.id)?r.filter(y=>y!==f.id):[...r,f.id]}><ha-icon icon=${f.icon}></ha-icon>${f.name}</button>`)}
      </div>
      ${s.length&&!this._has("dreame_vacuum","vacuum_clean_segment")?l`<div class="hint">Questo robot non permette di scegliere le stanze da qui.</div>`:d}
      ${s.length===0&&this._has("dreame_vacuum","vacuum_clean_segment")?l`<div class="hint">Nessuna stanza trovata: creale dall'app del costruttore per pulirle una alla volta.</div>`:d}
      ${o?l`<div class="inline"><span class="glab">Passate</span><div class="chips">${[1,2,3].map(f=>l`<button class=${this._repeats===f?"chip on sq":"chip sq"} aria-pressed=${this._repeats===f?"true":"false"} @click=${()=>this._repeats=f}>${f}</button>`)}</div></div>`:d}
      ${h!==d?l`<button class="how" aria-expanded=${this._how?"true":"false"} @click=${()=>this._how=!this._how}>
          <ha-icon icon="mdi:tune-variant"></ha-icon><span class="hl">Come pulisce</span><span class="hs">${b}</span><ha-icon icon=${this._how?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon></button>
        ${this._how?l`<div class="howbox">${h}</div>`:d}`:d}
      <div class="cmds"><button class="cmd go big" ?disabled=${p||u} @click=${()=>this._start(t,c)}><ha-icon icon="mdi:play"></ha-icon>${p?"Pulizia in corso":c.label}</button></div>
      <div class="cmds">
        <button class="cmd" ?disabled=${u} @click=${()=>this._vacuum("locate")}><ha-icon icon="mdi:map-marker-radius-outline"></ha-icon>Trovalo</button>
        ${e.canHome&&!e.canStop?l`<button class="cmd" @click=${()=>this._vacuum("return_to_base")}><ha-icon icon="mdi:home-import-outline"></ha-icon>Alla base</button>`:d}
      </div>
      ${this._shortcuts(t)}${this._map(t)}`}_tabSettings(t){let e=this._selects(t,ye);return l`${e===d?d:l`<div class="sec">Come pulisce</div>${e}`}${this._tabOther(t)}`}_tabBase(t){let e=dn.map(([r,c,p])=>{let u=k(t,`sensor.${r}`),h=this._st(u);return!h||["unavailable","unknown",""].includes(h.state)?d:l`<div class="kv"><span>${c}</span><b class=${p.includes(h.state)?"bad":""}>${W(this.hass,u)}</b></div>`}).filter(r=>r!==d),a=B(this.hass.states,k(t,"sensor.drying_progress")),s=pn.filter(([r])=>k(t,`button.${r}`)&&this._st(k(t,`button.${r}`))?.state!=="unavailable"),o=this._selects(t,cn);return!e.length&&!s.length&&o===d?l`<div class="empty">Questo robot non ha una base con funzioni da gestire.</div>`:l`${e.length?l`<div class="sec">Stato della base</div>${e}${a!==null?l`<div class="kv"><span>Asciugatura</span><b>${$(a,0)} %</b></div>`:d}`:d}
      ${s.length?l`<div class="sec">Azioni</div><div class="cmds">${s.map(([r,c,p])=>l`<button class="cmd" @click=${()=>this._press(k(t,`button.${r}`))}><ha-icon icon=${p}></ha-icon>${c}</button>`)}</div>`:d}
      ${o===d?d:l`<div class="sec">Impostazioni della base</div>${o}`}`}_stats(t){let e=b=>B(this.hass.states,k(t,`sensor.${b}`)),a=e("cleaning_count"),s=e("total_cleaned_area"),o=e("total_cleaning_time"),r=k(t,"sensor.cleaning_history"),c=this._st(r),p=c&&c.state&&!["unknown","unavailable"].includes(c.state)?Date.parse(c.state):NaN,u=Date.parse(this._st(k(t,"sensor.first_cleaning_date"))?.state??""),h=b=>new Date(b).toLocaleDateString("it-IT",{day:"numeric",month:"short",year:"numeric"});return a===null&&s===null&&o===null?d:l`<div class="sec">Statistiche</div>
      ${a!==null?l`<div class="kv"><span>Pulizie fatte</span><b>${$(a,0)}</b></div>`:d}
      ${s!==null?l`<div class="kv"><span>Superficie pulita</span><b>${$(s,0)} m²</b></div>`:d}
      ${o!==null?l`<div class="kv"><span>Tempo di pulizia</span><b>${$(o/60,1)} h</b></div>`:d}
      ${Number.isNaN(p)?d:l`<div class="kv"><span>Ultima pulizia</span><b>${h(p)}</b></div>`}
      ${Number.isNaN(u)?d:l`<div class="kv"><span>Prima pulizia</span><b>${h(u)}</b></div>`}`}_tabMaint(t){let e=ve(t,this.hass.states),a=this._stats(t);return e.length?l`<div class="sec">Consumabili</div>
      ${e.map(s=>l`<div class="cons">
        <div class="ctop"><span>${s.label}</span><b class=${s.low?"bad":""}>${s.pct===null?"\u2013":`${$(s.pct,0)} %`}${s.hoursLeft!==null?l` <span class="mut">· ${$(s.hoursLeft,s.hoursLeft<10?1:0)} h</span>`:d}</b></div>
        <div class="bbar wide"><i class=${s.low?"low":""} style=${`width:${Math.min(100,Math.max(0,s.pct??0))}%`}></i></div>
        ${s.reset?l`<button class=${this._confirm===s.key?"btn s warn":"btn s"} @click=${()=>{this._confirm===s.key?(this._press(s.reset),this._confirm=""):this._confirm=s.key}}>${this._confirm===s.key?"Tocca ancora per confermare":"Segna come sostituito"}</button>`:d}
      </div>`)}
      <div class="hint">Segna come sostituito solo dopo aver cambiato o pulito il pezzo: il contatore riparte da 100 %.</div>
      ${a}`:a===d?l`<div class="empty">Questo robot non comunica lo stato dei consumabili.</div>`:a}_tabOther(t){let e=un.map(([r,c])=>{let p=k(t,`switch.${r}`),u=this._st(p);if(!u||u.state==="unavailable")return d;let h=u.state==="on";return l`<div class="row"><span class="rl">${c}</span>
        <button class=${h?"sw on":"sw"} role="switch" aria-checked=${h?"true":"false"} aria-label=${c} @click=${()=>this._toggle(p,!h)}><span class="knob"></span></button></div>`}).filter(r=>r!==d),a=k(t,"number.volume"),s=B(this.hass.states,a),o=[W(this.hass,k(t,"time.dnd_start")),W(this.hass,k(t,"time.dnd_end"))].filter(Boolean);return l`${e.length?l`<div class="sec">Opzioni</div>${e}`:d}
      ${o.length===2?l`<div class="hint">Non disturbare: dalle ${o[0]?.slice(0,5)} alle ${o[1]?.slice(0,5)}.</div>`:d}
      ${s!==null&&a?l`<div class="sec">Volume della voce</div>
        <div class="vol"><ha-icon icon="mdi:volume-low"></ha-icon><input type="range" min="0" max="100" step="5" .value=${String(s)} aria-label="Volume" @change=${r=>void this._call("number","set_value",{entity_id:a,value:Number(r.target.value)})} /><ha-icon icon="mdi:volume-high"></ha-icon><b>${$(s,0)}</b></div>`:d}
      ${e.length===0&&s===null?l`<div class="empty">Nessuna opzione disponibile per questo robot.</div>`:d}`}render(){let t=this._robot;if(!t)return d;let e=this._tab==="impostazioni"?this._tabSettings(t):this._tab==="base"?this._tabBase(t):this._tab==="manutenzione"?this._tabMaint(t):this._tabClean(t);return l`
      <div class="backdrop" @click=${a=>a.target===a.currentTarget&&this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Gestisci ${t.name}`}>
          <div class="head"><div class="title">${t.name}</div><button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button></div>
          <div class="tabs" role="tablist">${ln.map(a=>l`<button role="tab" aria-selected=${this._tab===a.key?"true":"false"} class=${this._tab===a.key?"tab on":"tab"} @click=${()=>this._tab=a.key}><ha-icon icon=${a.icon}></ha-icon>${a.label}</button>`)}</div>
          <div class="body">${this._error?l`<div class="err">${this._error}</div>`:d}${e}</div>
        </div>
      </div>`}static{this.styles=[X,I`
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
      .cmd.big { min-height: 60px; font-size: 1.05rem; }
      .cmd:disabled { opacity: 0.5; cursor: default; }
      .cmds.live { margin-top: 10px; }
      .inline { display: flex; align-items: center; gap: 12px; margin: 12px 0 4px; }
      .inline .glab { margin: 0; }
      .chip.sq { min-width: 44px; justify-content: center; padding: 0; }
      .how { width: 100%; min-height: 48px; margin-top: 8px; display: flex; align-items: center; gap: 8px; padding: 0 12px; border-radius: 14px; border: 1px solid var(--divider-color, #ccc); background: transparent; color: inherit; font-size: 0.92rem; cursor: pointer; text-align: left; }
      .how .hl { font-weight: 600; }
      .how .hs { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--secondary-text-color, #727272); }
      .howbox { padding: 6px 12px 2px; border: 1px solid var(--divider-color, #ccc); border-top: 0; border-radius: 0 0 14px 14px; margin-top: -6px; padding-top: 12px; }
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
    `]}};g([E({attribute:!1})],L.prototype,"hass",2),g([E({attribute:!1})],L.prototype,"info",2),g([E()],L.prototype,"openKey",2),g([v()],L.prototype,"_tab",2),g([v()],L.prototype,"_rooms",2),g([v()],L.prototype,"_repeats",2),g([v()],L.prototype,"_how",2),g([v()],L.prototype,"_confirm",2),g([v()],L.prototype,"_error",2);customElements.get("elettro-robot-dialog")||customElements.define("elettro-robot-dialog",L);var Z=class extends T{constructor(){super(...arguments);this._config={type:"custom:elettrodomestici-card"};this._info=null;this._error="";this._now=Date.now();this._loadedAt=0;this._loading=!1;this._syncers=new Set}setConfig(t){this._config={...t},this._info=null,this._loadedAt=0}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:4}}static getStubConfig(){return{type:"custom:elettrodomestici-card"}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}},{name:"columns",selector:{number:{min:0,max:8,step:1,mode:"box"}}}],computeLabel:t=>t.name==="title"?"Titolo":t.name==="columns"?"Colonne (0 = automatico)":t.name}}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>this._now=Date.now(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._tick&&window.clearInterval(this._tick)}willUpdate(){for(let t of this._syncers)t()}updated(){let t=(this._info?.humidistats?.length??0)>0?15e3:3e5;this.hass&&!this._loading&&(!this._info||Date.now()-this._loadedAt>t)&&this._loadInfo()}async _loadInfo(){this._loading=!0;try{let t={type:"elettrodomestici/info"};this._config.entry_id&&(t.entry_id=this._config.entry_id),this._info=await this.hass.callWS(t),this._error=""}catch(t){let e=t instanceof Error?t.message:t?.message??String(t);this._error=`Elettrodomestici non configurato o integrazione non caricata (${e}).`}finally{this._loadedAt=Date.now(),this._loading=!1}}async _open(t,e=""){if(!this._info)return;for(;this._loading;)await new Promise(o=>setTimeout(o,50));if(await this._loadInfo(),!this._info)return;let a=document.createElement(t);a.hass=this.hass,a.info=this._info,a.openKey=e,a.addEventListener("open-dialog",o=>{let r=o.detail;this._open(r.tag,r.key)}),a.addEventListener("saved",()=>{this._loadedAt=0,this._loadInfo()}),document.body.appendChild(a);let s=()=>{a.isConnected&&(a.hass=this.hass)};this._syncers.add(s),a.addEventListener("closed",()=>this._syncers.delete(s))}_ack(t){this.hass.callWS({type:"elettrodomestici/action",entry_id:this._info?.entry_id,key:t,action:"acknowledge"})}_robotCall(t,e,a){this.hass.callService(t,e,{entity_id:a})}_humCall(t,e){t.fan_entity&&this.hass.callService("homeassistant",e?"turn_on":"turn_off",{entity_id:t.fan_entity})}_humAuto(t,e){this.hass.callWS({type:"elettrodomestici/action",entry_id:this._info?.entry_id,key:t.key,action:e?"auto_on":"auto_off"}).then(()=>{this._loadedAt=0,this._loadInfo()})}_humTile(t,e){return l`
      <div class="tile ${e.tone}">
        <button class="main" aria-label=${`Preferenze di ${e.name}`} @click=${()=>void this._open("elettro-settings-dialog",t.key)}>
          <span class="img">${G(Y("umidostato",e.state))}</span>
          <span class="info">
            <span class="n">${e.name}</span>
            <span class="badge ${e.tone}">${e.statusLine}</span>
            <span class="pw ${e.fanOn?"on":""}">${e.humidity===null?"\u2013":`${$(e.humidity,0)} %`}</span>
            <span class="row">${e.rule}</span>
            ${e.waitText?l`<span class="row"><b>${e.waitText}</b></span>`:d}
          </span>
        </button>
        <div class="acts">
          ${e.fanOn===null?d:l`<button class=${e.fanOn?"a":"a ok"} @click=${()=>this._humCall(t,!e.fanOn)}><ha-icon icon=${e.fanOn?"mdi:fan-off":"mdi:fan"}></ha-icon>${e.fanOn?"Spegni":"Accendi"}</button>`}
          <button class=${e.auto?"a ok":"a"} role="switch" aria-checked=${e.auto?"true":"false"} @click=${()=>this._humAuto(t,!e.auto)}><ha-icon icon="mdi:auto-fix"></ha-icon>Automatico ${e.auto?"s\xEC":"no"}</button>
          <button class="a" aria-label=${`Soglie di ${e.name}`} @click=${()=>void this._open("elettro-settings-dialog",t.key)}><ha-icon icon="mdi:tune-variant"></ha-icon>Soglie</button>
        </div>
      </div>`}_robotTile(t,e){let a=e.room||e.area!==null||e.minutes!==null?[e.room,e.area!==null?`${$(e.area,0)} m\xB2`:"",e.minutes!==null?`${$(e.minutes,0)} min`:""].filter(Boolean).join(" \xB7 "):e.charging?"In carica":"";return l`
      <div class="tile ${e.tone}">
        <button class="main" aria-label=${`Gestisci ${e.name}`} @click=${()=>void this._open("elettro-robot-dialog",t.key)}>
          <span class="img">${G(Y("aspirapolvere",e.state))}</span>
          <span class="info">
            <span class="n">${e.name}</span>
            <span class="badge ${e.tone}">${e.statusLine}</span>
            <span class="pw ${e.activity==="cleaning"?"on":""}">${e.battery===null?"\u2013":l`${e.charging?l`<ha-icon icon="mdi:lightning-bolt"></ha-icon>`:d}${$(e.battery,0)} %`}</span>
            <span class="row">${a||"Batteria"}</span>
          </span>
        </button>
        ${e.lowConsumables.length?l`<div class="warn"><ha-icon icon="mdi:wrench-clock"></ha-icon>Da sostituire o pulire: ${e.lowConsumables.join(", ")}</div>`:d}
        <div class="acts">
          ${e.canPause?l`<button class="a" @click=${()=>this._robotCall("vacuum","pause",t.entity)}><ha-icon icon="mdi:pause"></ha-icon>Pausa</button>`:d}
          ${e.canStart?l`<button class="a ok" @click=${()=>this._robotCall("vacuum","start",t.entity)}><ha-icon icon="mdi:play"></ha-icon>${e.activity==="paused"?"Riprendi":"Avvia"}</button>`:d}
          ${e.canHome?l`<button class="a" @click=${()=>this._robotCall("vacuum","return_to_base",t.entity)}><ha-icon icon="mdi:home-import-outline"></ha-icon>Base</button>`:d}
          <button class="a" aria-label=${`Gestisci ${e.name}`} @click=${()=>void this._open("elettro-robot-dialog",t.key)}><ha-icon icon="mdi:tune-variant"></ha-icon>Gestisci</button>
        </div>
      </div>`}_tile(t){return l`
      <div class="tile ${t.tone}">
        <button class="main" aria-label=${`Statistiche di ${t.name}`} @click=${()=>void this._open("elettro-stats-dialog",t.key)}>
          <span class="img">${G(Y(t.type,t.state))}</span>
          <span class="info">
            <span class="n">${t.name}</span>
            <span class="badge ${t.tone}">${t.statusLine}</span>
            <span class="pw ${t.state==="in_funzione"?"on":""}">${J(t.power)}</span>
            <span class="row">${t.state==="in_funzione"&&t.cycleKwh!==null?l`Questo ciclo <b>${P(t.cycleKwh)}</b> · ${H(t.cycleEur)}`:l`Oggi <b>${P(t.todayKwh)}</b> · ${H(t.todayEur)}`}</span>
            <span class="row">${t.todayCycles===1?"1 ciclo oggi":`${$(t.todayCycles)} cicli oggi`}${t.state==="in_funzione"&&t.cycleKwh!==null?l` · oggi ${P(t.todayKwh)}`:d}</span>
          </span>
        </button>
        ${t.progress!==null?l`<div class="bar" title=${t.progressLabel}><i style="width:${(t.progress*100).toFixed(0)}%"></i></div><div class="barlab">${t.progressLabel}${t.remainingText?` \xB7 ${t.remainingText}`:""}</div>`:t.remainingText?l`<div class="barlab">${t.remainingText}</div>`:d}
        ${t.extras.length?l`<div class="extras">${t.extras.slice(0,3).map(e=>l`<span><i>${e.label}</i> ${e.value}</span>`)}</div>`:d}
        ${t.maintDue?l`<div class="warn"><ha-icon icon="mdi:wrench-clock"></ha-icon>Manutenzione consigliata</div>`:d}
        <div class="acts">
          ${t.canAck?l`<button class="a ok" @click=${()=>this._ack(t.key)}><ha-icon icon="mdi:check"></ha-icon>Ho svuotato</button>`:d}
          <button class="a" aria-label=${`Grafici di ${t.name}`} @click=${()=>void this._open("elettro-charts-dialog",t.key)}><ha-icon icon="mdi:chart-line"></ha-icon>Grafici</button>
          <button class="a" aria-label=${`Statistiche di ${t.name}`} @click=${()=>void this._open("elettro-stats-dialog",t.key)}><ha-icon icon="mdi:information-outline"></ha-icon>Dettagli</button>
        </div>
      </div>`}render(){if(!this.hass)return d;let t=this._config.title??this._info?.title??"Elettrodomestici";if(this._error&&!this._info)return l`<ha-card><div class="pad"><div class="title">${t}</div><div class="errbox">${this._error}</div></div></ha-card>`;if(!this._info)return l`<ha-card><div class="pad"><div class="title">${t}</div><div class="muted">Carico…</div></div></ha-card>`;let e=Array.isArray(this._config.appliances)?this._config.appliances:null,s=(e?this._info.appliances.filter(u=>e.includes(u.key)):this._info.appliances).map(u=>Ut(u,this.hass.states,this._info?.types,this._now)),o=(this._info.robots??[]).filter(u=>!e||e.includes(u.key)),r=(this._info.humidistats??[]).filter(u=>!e||e.includes(u.key)),c=(this._now-this._loadedAt)/1e3,p=l`<div class="grid" style=${`grid-template-columns:${Ke(this._config.columns)}`}>${s.map(u=>this._tile(u))}${o.map(u=>this._robotTile(u,ht(u,this.hass)))}${r.map(u=>this._humTile(u,ui(u,this.hass,c)))}</div>`;return this._config.header===!1?l`<ha-card><div class="pad compact">${p}</div></ha-card>`:l`
      <ha-card>
        <div class="pad">
          <div class="head">
            <div>
              <div class="title">${t}</div>
              <div class="sum">${Fe(s)}</div>
            </div>
            <button class="ib" aria-label="Preferenze" @click=${()=>void this._open("elettro-settings-dialog")}><ha-icon icon="mdi:cog"></ha-icon></button>
          </div>
          ${s.length+o.length+r.length===0?l`<button class="empty" @click=${()=>void this._open("elettro-settings-dialog")}><ha-icon icon="mdi:plus-circle-outline"></ha-icon>Aggiungi il primo elettrodomestico</button>`:p}
        </div>
      </ha-card>`}static{this.styles=I`
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
  `}};g([E({attribute:!1})],Z.prototype,"hass",2),g([v()],Z.prototype,"_config",2),g([v()],Z.prototype,"_info",2),g([v()],Z.prototype,"_error",2),g([v()],Z.prototype,"_now",2);customElements.get("elettrodomestici-card")||customElements.define("elettrodomestici-card",Z);window.customCards=window.customCards||[];window.customCards.push({type:"elettrodomestici-card",name:"Elettrodomestici",description:"Lavatrice, lavastoviglie, asciugatrice, forno, frigorifero, microonde, robot aspirapolvere e umidostato: stato, consumi, costi, statistiche, grafici e controllo."});console.info("%c ELETTRODOMESTICI %c v0.5.0 ","color: white; background: #0f766e; font-weight: 700;","color: #0f766e; background: white; font-weight: 700;");export{Z as ElettrodomesticiCard};
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
