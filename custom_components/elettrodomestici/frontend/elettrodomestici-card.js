var ri=Object.defineProperty;var li=Object.getOwnPropertyDescriptor;var m=(s,e,t,i)=>{for(var n=i>1?void 0:i?li(e,t):e,a=s.length-1,o;a>=0;a--)(o=s[a])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&ri(e,t,n),n};var xt=globalThis,wt=xt.ShadowRoot&&(xt.ShadyCSS===void 0||xt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Bt=Symbol(),ge=new WeakMap,ut=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(wt&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ge.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ge.set(t,e))}return e}toString(){return this.cssText}},be=s=>new ut(typeof s=="string"?s:s+"",void 0,Bt),I=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((i,n,a)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[a+1],s[0]);return new ut(t,s,Bt)},ve=(s,e)=>{if(wt)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),n=xt.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,s.appendChild(i)}},Kt=wt?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return be(t)})(s):s;var{is:ci,defineProperty:di,getOwnPropertyDescriptor:pi,getOwnPropertyNames:ui,getOwnPropertySymbols:hi,getPrototypeOf:mi}=Object,kt=globalThis,_e=kt.trustedTypes,fi=_e?_e.emptyScript:"",gi=kt.reactiveElementPolyfillSupport,ht=(s,e)=>s,mt={toAttribute(s,e){switch(e){case Boolean:s=s?fi:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},St=(s,e)=>!ci(s,e),ye={attribute:!0,type:String,converter:mt,reflect:!1,useDefault:!1,hasChanged:St};Symbol.metadata??=Symbol("metadata"),kt.litPropertyMetadata??=new WeakMap;var B=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ye){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&di(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){let{get:n,set:a}=pi(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:n,set(o){let r=n?.call(this);a?.call(this,o),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ye}static _$Ei(){if(this.hasOwnProperty(ht("elementProperties")))return;let e=mi(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ht("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ht("properties"))){let t=this.properties,i=[...ui(t),...hi(t)];for(let n of i)this.createProperty(n,t[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let n of i)t.unshift(Kt(n))}else e!==void 0&&t.push(Kt(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ve(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:mt).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(e,t){let i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let a=i.getPropertyOptions(n),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:mt;this._$Em=n;let r=o.fromAttribute(t,a.type);this[n]=r??this._$Ej?.get(n)??r,this._$Em=null}}requestUpdate(e,t,i,n=!1,a){if(e!==void 0){let o=this.constructor;if(n===!1&&(a=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??St)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:a},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),a!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,a]of this._$Ep)this[n]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[n,a]of i){let{wrapped:o}=a,r=this[n];o!==!0||this._$AL.has(n)||r===void 0||this.C(n,void 0,a,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[ht("elementProperties")]=new Map,B[ht("finalized")]=new Map,gi?.({ReactiveElement:B}),(kt.reactiveElementVersions??=[]).push("2.1.2");var Yt=globalThis,$e=s=>s,At=Yt.trustedTypes,xe=At?At.createPolicy("lit-html",{createHTML:s=>s}):void 0,ze="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,Te="?"+q,bi=`<${Te}>`,Z=document,gt=()=>Z.createComment(""),bt=s=>s===null||typeof s!="object"&&typeof s!="function",Qt=Array.isArray,vi=s=>Qt(s)||typeof s?.[Symbol.iterator]=="function",Wt=`[ 	
\f\r]`,ft=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,we=/-->/g,ke=/>/g,J=RegExp(`>|${Wt}(?:([^\\s"'>=/]+)(${Wt}*=${Wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Se=/'/g,Ae=/"/g,Ce=/^(?:script|style|textarea|title)$/i,Jt=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),l=Jt(1),U=Jt(2),os=Jt(3),K=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ee=new WeakMap,X=Z.createTreeWalker(Z,129);function Me(s,e){if(!Qt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return xe!==void 0?xe.createHTML(e):e}var _i=(s,e)=>{let t=s.length-1,i=[],n,a=e===2?"<svg>":e===3?"<math>":"",o=ft;for(let r=0;r<t;r++){let c=s[r],p,f,u=-1,v=0;for(;v<c.length&&(o.lastIndex=v,f=o.exec(c),f!==null);)v=o.lastIndex,o===ft?f[1]==="!--"?o=we:f[1]!==void 0?o=ke:f[2]!==void 0?(Ce.test(f[2])&&(n=RegExp("</"+f[2],"g")),o=J):f[3]!==void 0&&(o=J):o===J?f[0]===">"?(o=n??ft,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?J:f[3]==='"'?Ae:Se):o===Ae||o===Se?o=J:o===we||o===ke?o=ft:(o=J,n=void 0);let y=o===J&&s[r+1].startsWith("/>")?" ":"";a+=o===ft?c+bi:u>=0?(i.push(p),c.slice(0,u)+ze+c.slice(u)+q+y):c+q+(u===-2?r:y)}return[Me(s,a+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},vt=class s{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let a=0,o=0,r=e.length-1,c=this.parts,[p,f]=_i(e,t);if(this.el=s.createElement(p,i),X.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(n=X.nextNode())!==null&&c.length<r;){if(n.nodeType===1){if(n.hasAttributes())for(let u of n.getAttributeNames())if(u.endsWith(ze)){let v=f[o++],y=n.getAttribute(u).split(q),$=/([.?@])?(.*)/.exec(v);c.push({type:1,index:a,name:$[2],strings:y,ctor:$[1]==="."?qt:$[1]==="?"?Vt:$[1]==="@"?Ft:rt}),n.removeAttribute(u)}else u.startsWith(q)&&(c.push({type:6,index:a}),n.removeAttribute(u));if(Ce.test(n.tagName)){let u=n.textContent.split(q),v=u.length-1;if(v>0){n.textContent=At?At.emptyScript:"";for(let y=0;y<v;y++)n.append(u[y],gt()),X.nextNode(),c.push({type:2,index:++a});n.append(u[v],gt())}}}else if(n.nodeType===8)if(n.data===Te)c.push({type:2,index:a});else{let u=-1;for(;(u=n.data.indexOf(q,u+1))!==-1;)c.push({type:7,index:a}),u+=q.length-1}a++}}static createElement(e,t){let i=Z.createElement("template");return i.innerHTML=e,i}};function ot(s,e,t=s,i){if(e===K)return e;let n=i!==void 0?t._$Co?.[i]:t._$Cl,a=bt(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),a===void 0?n=void 0:(n=new a(s),n._$AT(s,t,i)),i!==void 0?(t._$Co??=[])[i]=n:t._$Cl=n),n!==void 0&&(e=ot(s,n._$AS(s,e.values),n,i)),e}var Dt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??Z).importNode(t,!0);X.currentNode=n;let a=X.nextNode(),o=0,r=0,c=i[0];for(;c!==void 0;){if(o===c.index){let p;c.type===2?p=new _t(a,a.nextSibling,this,e):c.type===1?p=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(p=new Gt(a,this,e)),this._$AV.push(p),c=i[++r]}o!==c?.index&&(a=X.nextNode(),o++)}return X.currentNode=Z,n}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},_t=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ot(this,e,t),bt(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==K&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):vi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&bt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Z.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=vt.createElement(Me(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{let a=new Dt(n,this),o=a.u(this.options);a.p(t),this.T(o),this._$AH=a}}_$AC(e){let t=Ee.get(e.strings);return t===void 0&&Ee.set(e.strings,t=new vt(e)),t}k(e){Qt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,n=0;for(let a of e)n===t.length?t.push(i=new s(this.O(gt()),this.O(gt()),this,this.options)):i=t[n],i._$AI(a),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=$e(e).nextSibling;$e(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},rt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,a){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,n){let a=this.strings,o=!1;if(a===void 0)e=ot(this,e,t,0),o=!bt(e)||e!==this._$AH&&e!==K,o&&(this._$AH=e);else{let r=e,c,p;for(e=a[0],c=0;c<a.length-1;c++)p=ot(this,r[i+c],t,c),p===K&&(p=this._$AH[c]),o||=!bt(p)||p!==this._$AH[c],p===d?e=d:e!==d&&(e+=(p??"")+a[c+1]),this._$AH[c]=p}o&&!n&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},qt=class extends rt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},Vt=class extends rt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},Ft=class extends rt{constructor(e,t,i,n,a){super(e,t,i,n,a),this.type=5}_$AI(e,t=this){if((e=ot(this,e,t,0)??d)===K)return;let i=this._$AH,n=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==d&&(i===d||n);n&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Gt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ot(this,e)}};var yi=Yt.litHtmlPolyfillSupport;yi?.(vt,_t),(Yt.litHtmlVersions??=[]).push("3.3.3");var Re=(s,e,t)=>{let i=t?.renderBefore??e,n=i._$litPart$;if(n===void 0){let a=t?.renderBefore??null;i._$litPart$=n=new _t(e.insertBefore(gt(),a),a,void 0,t??{})}return n._$AI(s),n};var Xt=globalThis,C=class extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};C._$litElement$=!0,C.finalized=!0,Xt.litElementHydrateSupport?.({LitElement:C});var $i=Xt.litElementPolyfillSupport;$i?.({LitElement:C});(Xt.litElementVersions??=[]).push("4.2.2");var xi={attribute:!0,type:String,converter:mt,reflect:!1,hasChanged:St},wi=(s=xi,e,t)=>{let{kind:i,metadata:n}=t,a=globalThis.litPropertyMetadata.get(n);if(a===void 0&&globalThis.litPropertyMetadata.set(n,a=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),a.set(t.name,s),i==="accessor"){let{name:o}=t;return{set(r){let c=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,c,s,!0,r)},init(r){return r!==void 0&&this.C(o,void 0,s,r),r}}}if(i==="setter"){let{name:o}=t;return function(r){let c=this[o];e.call(this,r),this.requestUpdate(o,c,s,!0,r)}}throw Error("Unsupported decorator location: "+i)};function S(s){return(e,t)=>typeof t=="object"?wi(s,e,t):((i,n,a)=>{let o=n.hasOwnProperty(a);return n.constructor.createProperty(a,i),o?Object.getOwnPropertyDescriptor(n,a):void 0})(s,e,t)}function b(s){return S({...s,state:!0,attribute:!1})}var Pe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Tt=s=>(...e)=>({_$litDirective$:s,values:e}),zt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var tt=class extends zt{constructor(e){if(super(e),this.it=d,e.type!==Pe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===d||e==null)return this._t=void 0,this.it=e;if(e===K)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};tt.directiveName="unsafeHTML",tt.resultType=1;var Ys=Tt(tt);var yt=class extends tt{};yt.directiveName="unsafeSVG",yt.resultType=2;var et=Tt(yt);var lt="#e4e7ec",E="#c3c9d3",ct="#9aa3b2",Ct="#1d2b3b",ki=`<style>
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
</style>`;function Mt(s,e,t){return`<circle cx="${e}" cy="${t}" r="3" fill="${s==="in_funzione"?"#f59e0b":s==="terminato"?"#16a34a":s==="non_disponibile"?"#dc2626":"#7b8494"}"${s==="in_funzione"?' class="bl"':""}/>`}function Rt(s,e,t,i){let n=s==="in_funzione"||s==="terminato",a=s==="terminato"?"#4ade80":"#fbbf24";return`<rect x="${e}" y="${t}" width="${i}" height="9" rx="2" fill="${n?"#10161d":"#2a3340"}"/>`+(n?`<rect x="${e+3}" y="${t+3.5}" width="${i*(s==="terminato"?.7:.45)}" height="2" rx="1" fill="${a}"${s==="in_funzione"?' class="bl"':""}/>`:"")}function Le(s,e=120){return`<rect x="12" y="8" width="96" height="${e}" rx="9" fill="${lt}" stroke="${E}" stroke-width="2"/>
  <rect x="12" y="8" width="96" height="22" rx="9" fill="${ct}" opacity=".35"/>
  ${Rt(s,20,14,38)}${Mt(s,70,18)}
  <circle cx="86" cy="18" r="6" fill="#f4f5f7" stroke="${E}"/><line x1="86" y1="18" x2="86" y2="13.5" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round"/>`}function Ie(s,e){let t=s==="in_funzione",i=e?"#fb923c":"#60a5fa",n=e?"#f9a8d4":"#93c5fd",o=`<g class="${t?"sp":""}"><circle cx="60" cy="82" r="24" fill="${Ct}"/>
    <path d="M44 82 a16 16 0 0 1 32 0 z" fill="${t?i:s==="terminato"?"#86efac":"#3b4a5c"}" opacity=".55"/>
    <circle cx="52" cy="76" r="6" fill="${n}" opacity="${t?.95:.55}"/><circle cx="68" cy="86" r="7" fill="${e?"#fde68a":"#bfdbfe"}" opacity="${t?.95:.5}"/><circle cx="58" cy="92" r="4" fill="${n}" opacity="${t?.9:.5}"/></g>`,r=e&&t?'<g class="fl" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round"><path d="M44 52c-3 3 3 4 0 8"/><path d="M60 52c-3 3 3 4 0 8"/><path d="M76 52c-3 3 3 4 0 8"/></g>':"",c=!e&&t?'<g fill="#fff" opacity=".7"><circle class="bl" cx="50" cy="94" r="2"/><circle class="bl" cx="64" cy="98" r="1.6"/><circle class="bl" cx="72" cy="90" r="2"/></g>':"";return`${Le(s)}
  <circle cx="60" cy="82" r="32" fill="#f4f5f7" stroke="${E}" stroke-width="3"/><circle cx="60" cy="82" r="28" fill="#aeb6c3"/>
  ${o}${c}${r}
  <path d="M40 66 a28 28 0 0 1 28 -9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
  ${s==="terminato"?'<circle cx="60" cy="82" r="14" fill="#16a34a" opacity=".92"/><path d="M53 82l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>':""}`}function Si(s){let e=s==="in_funzione",t=e?'<g fill="#7dd3fc"><circle class="dr" cx="40" cy="62" r="2"/><circle class="dr" cx="56" cy="60" r="2" style="animation-delay:.3s"/><circle class="dr" cx="72" cy="62" r="2" style="animation-delay:.6s"/><circle class="dr" cx="86" cy="60" r="2" style="animation-delay:.9s"/></g>':"";return`${Le(s)}
  <rect x="22" y="40" width="76" height="70" rx="5" fill="${e?"#1a3b57":Ct}" stroke="${E}" stroke-width="2"/>
  <g stroke="#7b8ba0" stroke-width="2" opacity=".85"><line x1="30" y1="58" x2="90" y2="58"/><line x1="30" y1="80" x2="90" y2="80"/></g>
  <g fill="#cbd5e1" opacity=".9"><rect x="34" y="62" width="9" height="16" rx="2"/><rect x="50" y="62" width="9" height="16" rx="2"/><rect x="66" y="62" width="9" height="16" rx="2"/><rect x="42" y="84" width="14" height="16" rx="3"/><rect x="62" y="84" width="14" height="16" rx="3"/></g>
  ${t}
  <rect x="38" y="112" width="44" height="6" rx="3" fill="#f4f5f7" stroke="${E}"/>
  ${e?'<g class="fl" opacity=".35"><rect x="22" y="40" width="76" height="70" rx="5" fill="#7dd3fc"/></g>':""}
  ${s==="terminato"?'<circle cx="60" cy="75" r="14" fill="#16a34a" opacity=".92"/><path d="M53 75l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>':""}`}function Ai(s){let e=s==="in_funzione",t=e?'<rect x="24" y="50" width="72" height="50" rx="4" fill="#f97316" opacity=".3" class="fl"/>':"",i=e?"#fb923c":"#4b5563";return`<rect x="12" y="8" width="96" height="124" rx="9" fill="${lt}" stroke="${E}" stroke-width="2"/>
  <rect x="12" y="8" width="96" height="30" rx="9" fill="${ct}" opacity=".35"/>
  ${Rt(s,46,13,28)}${Mt(s,82,18)}
  <g fill="#f4f5f7" stroke="${E}"><circle cx="26" cy="22" r="6"/><circle cx="94" cy="22" r="6"/></g>
  <rect x="20" y="44" width="80" height="64" rx="5" fill="#2a3340" stroke="${E}" stroke-width="2"/>
  <rect x="24" y="50" width="72" height="50" rx="4" fill="#161d26"/>${t}
  <g stroke="${i}" stroke-width="2.2" stroke-linecap="round" ${e?'class="fl"':""}><path d="M30 56h60"/><path d="M30 94h60"/></g>
  <g stroke="#7b8ba0" stroke-width="1.6" opacity=".9"><line x1="30" y1="70" x2="90" y2="70"/><line x1="30" y1="82" x2="90" y2="82"/></g>
  <rect x="26" y="114" width="68" height="6" rx="3" fill="#f4f5f7" stroke="${E}"/>
  ${s==="in_funzione"?'<g fill="none" stroke="#fb923c" stroke-width="1.6" stroke-linecap="round" class="fl"><path d="M44 36c-3 3 3 4 0 8"/><path d="M60 36c-3 3 3 4 0 8"/><path d="M76 36c-3 3 3 4 0 8"/></g>':""}`}function Ei(s){let e=s==="in_funzione";return`<rect x="26" y="6" width="68" height="128" rx="8" fill="${lt}" stroke="${E}" stroke-width="2"/>
  <line x1="26" y1="50" x2="94" y2="50" stroke="${E}" stroke-width="2.4"/>
  ${e?'<g class="sw" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"><path d="M60 24v22M49 30l22 10M71 30L49 40"/><circle cx="60" cy="35" r="2.4" fill="#38bdf8" stroke="none"/></g>':'<g stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity=".6"><path d="M60 26v18M51 31l18 8M69 31L51 39"/></g>'}
  <rect x="32" y="22" width="6" height="22" rx="3" fill="#8b95a3"/><rect x="32" y="58" width="6" height="40" rx="3" fill="#8b95a3"/>
  ${Rt(s,52,60,34)}${Mt(s,80,80)}
  <rect x="48" y="94" width="38" height="32" rx="4" fill="${ct}" opacity=".22"/>
  ${e?'<g fill="#38bdf8" opacity=".9"><circle class="bl" cx="56" cy="104" r="1.8"/><circle class="bl" cx="70" cy="112" r="1.8" style="animation-delay:.4s"/><circle class="bl" cx="78" cy="102" r="1.8" style="animation-delay:.8s"/></g>':""}
  <rect x="34" y="132" width="52" height="3" rx="1.5" fill="${E}"/>`}function zi(s){let e=s==="in_funzione";return`<rect x="8" y="34" width="104" height="72" rx="8" fill="${lt}" stroke="${E}" stroke-width="2"/>
  <rect x="16" y="42" width="62" height="56" rx="5" fill="${e?"#3b2f12":Ct}" stroke="${E}" stroke-width="2"/>
  ${e?'<rect x="18" y="44" width="58" height="52" rx="4" fill="#fbbf24" opacity=".42" class="fl"/>':""}
  <g class="${e?"sp":""}"><ellipse cx="47" cy="88" rx="22" ry="5" fill="#cbd5e1" opacity=".9"/><rect x="38" y="74" width="18" height="12" rx="3" fill="${e?"#fcd34d":"#94a3b8"}"/></g>
  <rect x="84" y="42" width="20" height="56" rx="4" fill="${ct}" opacity=".35"/>
  ${Rt(s,86,46,16)}${Mt(s,94,64)}
  <circle cx="94" cy="80" r="7" fill="#f4f5f7" stroke="${E}"/><line x1="94" y1="80" x2="94" y2="75" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="14" y="106" width="8" height="5" rx="2" fill="#7b8494"/><rect x="98" y="106" width="8" height="5" rx="2" fill="#7b8494"/>
  `}function Ti(s){let e=s==="in_funzione",t=s==="non_disponibile"?"#dc2626":e?"#f59e0b":"#7b8494";return`<rect x="14" y="96" width="92" height="30" rx="10" fill="${lt}" stroke="${E}" stroke-width="2"/>
  <rect x="22" y="104" width="76" height="8" rx="4" fill="${ct}" opacity=".3"/>
  <circle cx="30" cy="119" r="3" fill="${t}"${e?' class="bl"':""}/>
  <g class="${e?"sw":""}">
    <circle cx="60" cy="56" r="40" fill="${lt}" stroke="${E}" stroke-width="2.4"/>
    <circle cx="60" cy="56" r="33" fill="#f4f5f7" stroke="${E}" stroke-width="1.4"/>
    <circle cx="60" cy="42" r="9" fill="${Ct}" stroke="${E}" stroke-width="2"/>
    <circle cx="60" cy="42" r="3.2" fill="${t}"${e?' class="bl"':""}/>
    <path d="M40 66q20 12 40 0" fill="none" stroke="${ct}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    <rect x="52" y="73" width="16" height="5" rx="2.5" fill="${t}" opacity=".85"/>
  </g>
  <g class="${e?"sp":""}" stroke="#8b95a3" stroke-width="2.2" stroke-linecap="round"><path d="M22 92l-8 8M22 92l-9-4M22 92l1-10"/></g>
  ${e?'<g fill="#38bdf8" opacity=".8"><circle class="bl" cx="98" cy="86" r="2"/><circle class="bl" cx="104" cy="74" r="2" style="animation-delay:.5s"/><circle class="bl" cx="94" cy="68" r="2" style="animation-delay:1s"/></g>':""}`}function it(s,e){let t=s==="lavatrice"?Ie(e,!1):s==="asciugatrice"?Ie(e,!0):s==="lavastoviglie"?Si(e):s==="forno"?Ai(e):s==="frigorifero"?Ei(e):s==="aspirapolvere"?Ti(e):zi(e),i=e==="non_disponibile"?' opacity=".45"':"";return`<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${s} ${e.replace("_"," ")}">${ki}<g${i}>${t}</g></svg>`}var He=["lavatrice","lavastoviglie","asciugatrice","forno","frigorifero","microonde","aspirapolvere"],te={lavatrice:"mdi:washing-machine",lavastoviglie:"mdi:dishwasher",asciugatrice:"mdi:tumble-dryer",forno:"mdi:stove",frigorifero:"mdi:fridge",microonde:"mdi:microwave",aspirapolvere:"mdi:robot-vacuum"},dt={lavatrice:"Lavatrice",lavastoviglie:"Lavastoviglie",asciugatrice:"Asciugatrice",forno:"Forno",frigorifero:"Frigorifero",microonde:"Microonde",aspirapolvere:"Aspirapolvere"},Ci=["spento","in_funzione","terminato","non_disponibile"],pt={spento:"Spento",in_funzione:"In funzione",terminato:"Terminato",non_disponibile:"Non disponibile"},F={spento:"#6b7280",in_funzione:"#f59e0b",terminato:"#16a34a",non_disponibile:"transparent"},Mi={spento:"off",in_funzione:"run",terminato:"done",non_disponibile:"bad"};function Oe(s){return Ci.includes(String(s))?s:"non_disponibile"}function It(s){if(s==null||s===""||s==="unknown"||s==="unavailable")return null;let e=Number(s);return Number.isFinite(e)?e:null}function x(s,e=0){return s==null||!Number.isFinite(s)?"\u2013":s.toFixed(e).replace(".",",")}var P=s=>s==null?"\u2013":`${x(s,s<10?2:1)} kWh`,N=s=>s==null?"\u2013":`${x(s,2)} \u20AC`,G=s=>s==null?"\u2013":`${x(s,s%1&&s<100?1:0)} W`;function M(s){let e=Math.max(0,Math.round(s));if(e<60)return`${e} s`;let t=Math.round(e/60);return t<60?`${t} min`:`${Math.floor(t/60)} h ${String(t%60).padStart(2,"0")} min`}function ee(s){return s<3600?`${Math.round(s/60)} min`:`${x(s/3600,1)} h`}var ie=["dom","lun","mar","mer","gio","ven","sab"],Ue=["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],nt=s=>`${String(s.getHours()).padStart(2,"0")}:${String(s.getMinutes()).padStart(2,"0")}`;function Lt(s){let e=new Date(s);return`${ie[e.getDay()]} ${e.getDate()} ${Ue[e.getMonth()]}, ${nt(e)}`}function se(s){let e=new Date(`${s}T12:00:00`);return`${ie[e.getDay()]} ${e.getDate()} ${Ue[e.getMonth()]}`}function ne(s){let e=s?Date.parse(s):NaN;return Number.isNaN(e)?"\u2013":nt(new Date(e))}function Ri(s,e){let t=e[s.entities.stato??""];if(!t)return{snap:s,state:s.state};let i=t.attributes,n={...s};for(let o of Object.keys(i))o in s&&i[o]!==void 0&&(n[o]=i[o]);let a=t.state==="unavailable"||t.state==="unknown"?"non_disponibile":Oe(t.state);return{snap:n,state:a}}function ae(s){if(!s)return null;let e=It(s.state);return e===null?null:String(s.attributes.unit_of_measurement??"W").toLowerCase()==="kw"?e*1e3:e}function Pi(s,e){if(!s||s.state==="unavailable"||s.state==="unknown"||s.state==="")return"non disponibile";if(s.attributes.device_class==="timestamp"){let n=Date.parse(s.state);if(!Number.isNaN(n)){let a=(n-e)/1e3;return a>0?`alle ${nt(new Date(n))} (tra ${M(a)})`:`alle ${nt(new Date(n))}`}}if(s.state==="on")return"s\xEC";if(s.state==="off")return"no";let t=s.attributes.unit_of_measurement,i=It(s.state);return i!==null&&typeof t=="string"&&t?t==="min"||t==="s"||t==="h"?`${x(i,i%1?1:0)} ${t}`:`${x(i,i%1?2:0)} ${t}`:s.state.replace(/_/g," ")}function Ii(s,e,t){return s.extras.map(i=>{let n=e[i.entity],a=typeof n?.attributes.friendly_name=="string"?n.attributes.friendly_name:i.entity;return{label:i.label||a,value:Pi(n,t),entity:i.entity}})}var Li={running:"In funzione",paused:"In pausa","delayed start":"Avvio ritardato","end of cycle":"Ciclo terminato",off:"Spenta",idle:"Pronta","ready to start":"Pronta",alarm:"Allarme"},Ni={dry:"Asciugatura",cool:"Raffreddamento",anticrease:"Antipiega",unavailable:""},Hi={cottons:"Cotone",synthetics:"Sintetici",delicates:"Delicati",wool:"Lana",silk:"Seta",outdoor:"Outdoor",eco:"Cotone Eco","rapid 3kg":"Rapido 3 kg",sportwear:"Sportivo",traininggear:"Abbigliamento sportivo","soccer rugby":"Calcio e rugby",skiinggear:"Sci",duvet:"Piumone",curtains:"Tende",pillow:"Cuscini",towels:"Asciugamani",pethair:"Cuccia animali","easyiron td":"Facile stiratura",allergen:"Anti-allergie",jeans:"Jeans",baby:"Baby",linen:"Lino",dryingrack:"A tempo",mixcare:"Misti",hygiene:"Igiene","down jacket":"Piumino",bedlinenplus:"Biancheria letto",oneitemfast:"Un capo veloce"},Pt=["","unknown","unavailable","none"],st=s=>s.trim().toLowerCase().replace(/_/g," ");function Oi(s){let e=st(s),t=e.includes(" pr ")?e.slice(e.lastIndexOf(" pr ")+4):e;return Hi[t]??t.replace(/^./,i=>i.toUpperCase())}function Ui(s,e){let t=s.maker_entities;if(!s.maker||!t||!t.stato)return null;let i=w=>t[w]?e[t[w]]:void 0,n=i("stato"),a=i("connessione"),o=!!n&&!Pt.includes(st(n.state))&&a?.state!=="off",r={connected:!1,active:!1,paused:!1,stato:"",fase:"",programma:"",rimanenteS:null,porta:""};if(!o||!n)return r;let c=st(n.state),p=w=>{let _=i(w);return _&&!Pt.includes(st(_.state))?_.state:""},f=p("fase"),u=i("rimanente"),v=null;if(u&&!Pt.includes(st(u.state))){let w=It(u.state);if(w!==null&&w>0){let _=String(u.attributes.unit_of_measurement??"min").toLowerCase();v=_==="s"?w:_==="h"?w*3600:w*60}}let y=i("porta"),$=["running","paused","delayed start"].includes(c);return{connected:!0,active:$,paused:c==="paused",stato:Li[c]??n.state,fase:f?Ni[st(f)]??f:"",programma:p("programma")?Oi(p("programma")):"",rimanenteS:$?v:null,porta:y&&!Pt.includes(st(y.state))?y.state==="on"?"aperto":"chiuso":""}}function ji(s,e){if(!e)return[];let t=s.maker?s.maker.charAt(0).toUpperCase()+s.maker.slice(1):"Costruttore";if(!e.connected)return[{label:t,value:"apparecchio spento o non collegato",entity:""}];let i=[{label:"Stato",value:e.stato,entity:""}];return e.programma&&i.push({label:"Programma",value:e.programma,entity:""}),e.porta&&i.push({label:"Sportello",value:e.porta,entity:""}),i}function Nt(s,e,t,i){let n=Ri(s,e),a=n.snap,o=Ui(s,e),r=n.state;o?.active&&r==="spento"&&(r="in_funzione");let c=ae(e[s.entity]),p=t?.[s.type],f=p?.has_finished??["lavatrice","lavastoviglie","asciugatrice"].includes(s.type),u=a.inizio?Date.parse(a.inizio):NaN,v=r==="in_funzione"&&!Number.isNaN(u)?Math.max(0,(i-u)/1e3):null,y=pt[r],$=a.fase;if(r==="spento")$=p?.off_label??"Spento",y=$;else if(r==="in_funzione"){let h=o?.active?[o.paused?"In pausa":o.fase||a.fase,o.programma].filter(Boolean).join(" \xB7 "):a.fase;y=v!==null?`${h} \xB7 da ${M(v)}`:h}else if(r==="terminato"){let h=a.fine?Date.parse(a.fine):NaN;y=`${a.fase}${Number.isNaN(h)?"":` \xB7 finito alle ${nt(new Date(h))}`}`}let w=null,_="",z="";return r==="in_funzione"&&f&&a.fasi.length>1&&a.fase_indice!==null&&(w=Math.min(1,(a.fase_indice+.5)/a.fasi.length),_=`Fase ${a.fase_indice+1} di ${a.fasi.length}`),r==="in_funzione"&&a.stima_rimanente_s!==null&&(z=`fine stimata fra circa ${M(a.stima_rimanente_s)}`),r==="in_funzione"&&o?.active&&o.rimanenteS!==null&&(z=`fine fra ${M(o.rimanenteS)}`,v!==null&&(w=Math.min(1,v/(v+o.rimanenteS)),_=o.fase||_)),{key:s.key,name:s.name,type:s.type,state:r,tone:Mi[r],statusLine:y,phase:$,power:c,progress:w,progressLabel:_,todayKwh:a.oggi_kwh,todayEur:a.oggi_eur,todayCycles:a.oggi_cicli,cycleKwh:a.energia_ciclo,cycleEur:a.costo_ciclo,maintPct:a.manutenzione_pct,maintDue:a.manutenzione_pct!==null&&a.manutenzione_pct>=100,extras:[...ji(s,o),...Ii(s,e,i)],canAck:r==="terminato",remainingText:z}}function Bi(s){let e=Math.round(Number(s));return Number.isFinite(e)&&e>=1?Math.min(e,8):null}function je(s){let e=Bi(s);return e===null?"repeat(auto-fill, minmax(min(300px, 100%), 1fr))":`repeat(${e}, minmax(0, 1fr))`}function Be(s){if(s.length===0)return"Nessun elettrodomestico: aggiungine uno dalle preferenze.";let e=s.filter(a=>a.state==="in_funzione"),t=s.filter(a=>a.state==="terminato"),i=s.reduce((a,o)=>a+(o.power??0),0),n=[];return e.length&&n.push(`${e.length} in funzione (${e.map(a=>a.name).join(", ")})`),t.length&&n.push(`${t.map(a=>a.name).join(", ")} da svuotare`),n.length||n.push("tutto fermo"),`${n.join(" \xB7 ")} \xB7 ${G(i)} in totale`}function Ke(s,e){return s.slice(-e).reduce((i,n)=>({kwh:i.kwh+n.kwh,eur:i.eur+n.eur,cycles:i.cycles+n.cycles,sec:i.sec+n.sec}),{kwh:0,eur:0,cycles:0,sec:0})}var oe={kwh:"Energia",eur:"Costo",cycles:"Cicli",sec:"Funzionamento"};function re(s,e){return s==="kwh"?P(e):s==="eur"?N(e):s==="cycles"?`${x(e,0)} ${e===1?"ciclo":"cicli"}`:ee(e)}function We(s,e,t,i,n){let a=Ki(t||i.label),o=a;for(let r=2;n.includes(o);r++)o=`${a}_${r}`;return{id:o,type:s,name:t||i.label,entity:e,energy_entity:null,start_w:i.start_w,stop_w:i.stop_w,start_delay:i.start_delay,end_delay:i.end_delay,min_cycle:i.min_cycle,heat_w:i.heat_w,maint_cycles:i.maint_cycles,alert_minutes:i.alert_minutes,notify:i.notify,extras:[],maker:null,maker_device:null}}function Ki(s){return s.normalize("NFKD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"elettrodomestico"}var Wi=/^[a-z_]+\.[a-z0-9_]+$/;function le(s){let e=new Set;for(let t of s){let i=t.type==="aspirapolvere";if(!Wi.test(t.entity)||i&&!t.entity.startsWith("vacuum."))return i?`${t.name}: scegli il robot (un'entit\xE0 vacuum.\u2026).`:`${t.name}: scegli il sensore di potenza della presa.`;if(e.has(t.entity))return`${t.name}: questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.`;if(e.add(t.entity),t.stop_w>t.start_w)return`${t.name}: la soglia di spegnimento non pu\xF2 superare quella di avvio.`}return null}function at(s,e,t=[]){let i=[];for(let[n,a]of Object.entries(s)){if(t.includes(n)||!e(n,a))continue;let o=a.attributes.friendly_name;i.push({id:n,name:typeof o=="string"?o:n})}return i.sort((n,a)=>n.name.localeCompare(a.name,"it")).slice(0,1500)}var ce=(s,e=[])=>at(s,(t,i)=>t.startsWith("sensor.")&&(i.attributes.device_class==="power"||["W","kW"].includes(String(i.attributes.unit_of_measurement))),e),de=s=>at(s,(e,t)=>e.startsWith("sensor.")&&(t.attributes.device_class==="energy"||["Wh","kWh","MWh"].includes(String(t.attributes.unit_of_measurement)))),pe=(s,e=[])=>at(s,t=>t.startsWith("vacuum."),e),De=(s,e=[])=>at(s,t=>/^(sensor|binary_sensor|select|input_select|input_text|number|text|climate)\./.test(t),e),qe=s=>at(s,e=>e.startsWith("counter.")),Ve=s=>at(s,e=>e.startsWith("binary_sensor.")),Zt={lavatrice:/lavatrice|lavaggio|washing/,lavastoviglie:/lavastov|dishwasher/,asciugatrice:/asciugatr|dryer/,forno:/forno|oven/,frigorifero:/frigo|fridge/,microonde:/micro/,aspirapolvere:/^$/};function Fe(s,e){let t=Object.keys(s),i=t.find(a=>a.startsWith("counter.")&&Zt[e].test(a)&&/cicl/.test(a))??t.find(a=>a.startsWith("counter.")&&Zt[e].test(a))??"",n=t.find(a=>a.startsWith("binary_sensor.")&&/_status$/.test(a)&&Zt[e].test(a))??"";return{counter:i,status:n}}var Ge=s=>at(s,e=>e.startsWith("sensor."));function Ht(s,e){let t=s[e]?.attributes.friendly_name;return typeof t=="string"?t:e}function Ye(s){return Object.keys(s?.notify??{}).filter(e=>e!=="send_message"&&e!=="persistent_notification").sort().map(e=>`notify.${e}`)}function Di(s){if(s==null)return null;if(typeof s=="number")return s<1e11?s*1e3:s;let e=Date.parse(s);return Number.isNaN(e)?null:e}function Qe(s){return Di(s.lu??s.last_updated??s.lc??s.last_changed)}function Je(s){let e=[];for(let t of s??[]){let i=Qe(t),n=t.s??t.state;if(i===null||n===void 0||n===""||n==="unavailable"||n==="unknown")continue;let a=Number(n);Number.isFinite(a)&&e.push({t:i,v:a})}return e.sort((t,i)=>t.t-i.t)}function Xe(s,e,t){let i=[];for(let c of s??[]){let p=Qe(c),f=c.s??c.state;p!==null&&f!==void 0&&i.push({t:p,s:Oe(f)})}i.sort((c,p)=>c.t-p.t);let n=null;for(let c of i)if(c.t<=e)n=c.s;else break;let a=[],o=e;for(let c of i)c.t<=e||c.t>=t||(n!==null&&a.push({from:o,to:c.t,state:n}),o=c.t,n=c.s);n!==null&&o<t&&a.push({from:o,to:t,state:n});let r=[];for(let c of a){let p=r[r.length-1];p&&p.state===c.state&&p.to===c.from?p.to=c.to:r.push({...c})}return r}function Ze(s,e){for(let t of s)if(e>=t.from&&e<t.to)return t.state;return null}function ti(s,e,t,i,n=3*3600*1e3){let a=new Array(i).fill(null);if(i<=0||t<=e)return a;let o=(t-e)/i,r=0,c=null,p=0;for(let f=0;f<i;f++){let u=e+f*o,v=u+o;for(;r<s.length&&s[r].t<=u;)c=s[r].v,p=s[r].t,r++;let y=0,$=0,w=u,_=c,z=p,h=L=>{if(_===null)return;let jt=Math.min(L,z+n)-w;jt>0&&(y+=_*jt,$+=jt)},g=r;for(;g<s.length&&s[g].t<v;)h(s[g].t),w=s[g].t,_=s[g].v,z=s[g].t,g++;h(v),a[f]=$>0?y/$:null}return a}function qi(s){let e=Math.pow(10,Math.floor(Math.log10(s))),t=s/e;return(t<=1?1:t<=2?2:t<=2.5?2.5:t<=5?5:10)*e}function ue(s,e,t=5){if(!Number.isFinite(s)||!Number.isFinite(e))return{min:0,max:1,ticks:[0,1]};e-s<1e-9&&(s-=1,e+=1);let i=qi((e-s)/Math.max(1,t-1)),n=Math.floor(s/i+1e-9)*i,a=Math.ceil(e/i-1e-9)*i,o=[];for(let r=n;r<=a+i*1e-6;r+=i)o.push(Math.round(r/i)*i);return{min:n,max:a,ticks:o}}function ei(s,e,t=6){let i=(e-s)/36e5,n=[1,2,3,6,12,24,48].find(r=>i/r<=t)??48,a=new Date(s);a.setMinutes(0,0,0),n>=24?a.setHours(0):a.setHours(Math.ceil(a.getHours()/n)*n);let o=[];for(let r=a.getTime();r<=e;r+=n*36e5){if(r<s)continue;let c=new Date(r),p=c.getHours()===0;o.push({t:r,major:p,label:i>30&&p?`${ie[c.getDay()]} ${c.getDate()}`:nt(c)})}return o}function ii(s,e,t){let i="",n=!1;for(let a=0;a<s.length;a++){let o=s[a];if(o===null){n=!1;continue}i+=`${n?"L":"M"}${e(a).toFixed(1)} ${t(o).toFixed(1)}`,n=!0}return i}var Vi=["cleaning","docked","idle","paused","returning","error"],Ne={cleaning:"In pulizia",docked:"Alla base",idle:"Fermo",paused:"In pausa",returning:"Torna alla base",error:"Errore",unavailable:"Non disponibile"};function k(s,e){return s.robot_entities?.[e]??""}function he(s){let e=s.replace(/_/g," ").trim();return e.charAt(0).toUpperCase()+e.slice(1)}function V(s,e,t){let i=e?s?.states[e]:void 0;if(!i||["unknown","unavailable",""].includes(i.state))return"";let n=t??i.state;if(s?.formatEntityState)try{return s.formatEntityState(i,t)}catch{}return he(n)}function W(s,e){let t=e?s[e]:void 0;return t?It(t.state):null}var Fi=[{key:"main_brush_left",label:"Spazzola principale",time:"main_brush_time_left",reset:"reset_main_brush"},{key:"side_brush_left",label:"Spazzola laterale",time:"side_brush_time_left",reset:"reset_side_brush"},{key:"filter_left",label:"Filtro",time:"filter_time_left",reset:"reset_filter"},{key:"sensor_dirty_left",label:"Sensori",time:"sensor_dirty_time_left",reset:"reset_sensor"},{key:"wheel_dirty_left",label:"Ruote",time:"wheel_dirty_time_left",reset:"reset_wheel"}];function me(s,e){let t=[];for(let i of Fi){let n=k(s,`sensor.${i.key}`);if(!n)continue;let a=W(e,n);t.push({key:i.key,label:i.label,pct:a,hoursLeft:W(e,k(s,`sensor.${i.time}`)),reset:k(s,`button.${i.reset}`),low:a!==null&&a<=10})}return t}function si(s,e){let t=s?.attributes.rooms;if(!t||typeof t!="object")return[];let i=t,n=i[e]??Object.values(i)[0];return Array.isArray(n)?n.filter(a=>!!a&&typeof a=="object"&&typeof a.id=="number").map(a=>({id:a.id,name:String(a.name??`Stanza ${a.id}`),icon:typeof a.icon=="string"?a.icon:"mdi:floor-plan"})):[]}function ni(s){let e=s?.attributes.shortcuts;return!e||typeof e!="object"?[]:Object.values(e).filter(t=>t&&typeof t.id=="number").map(t=>({id:t.id,name:String(t.name??`Scorciatoia ${t.id}`),running:t.running===!0}))}function Ot(s,e){let t=e.states,n=t[s.entity]?.state??"unavailable",a=Vi.includes(n)?n:"unavailable",o=a==="cleaning"||a==="returning"||a==="paused",r=k(s,"sensor.error"),c=r?t[r]:void 0,p=c&&c.state!=="no_error"&&!["unknown","unavailable"].includes(c.state)?typeof c.attributes.description=="string"&&c.attributes.description?c.attributes.description:V(e,r):"",f=W(t,k(s,"sensor.battery_level")),u=k(s,"binary_sensor.charging_state"),v=o?W(t,k(s,"sensor.cleaned_area")):null,y=o?W(t,k(s,"sensor.cleaning_time")):null,$=a==="error"||p?"bad":o?"run":"off";return{key:s.key,name:s.name,activity:a,tone:$,state:a==="unavailable"?"non_disponibile":o?"in_funzione":"spento",statusLine:p&&a!=="cleaning"?`${Ne[a]} \xB7 ${p}`:Ne[a],battery:f,charging:u?t[u]?.state==="on":!1,room:o?V(e,k(s,"sensor.current_room")):"",area:v,minutes:y,error:p,lowConsumables:me(s,t).filter(w=>w.low).map(w=>w.label),canStart:a==="docked"||a==="idle"||a==="paused",canPause:a==="cleaning"||a==="returning",canStop:o,canHome:a!=="docked"&&a!=="returning"&&a!=="unavailable"}}var Y=I`
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
`;var Gi=[{key:"start_w",label:"Si accende sopra",unit:"W",hint:"Potenza oltre la quale l'elettrodomestico risulta in funzione (pi\xF9 del consumo a riposo)."},{key:"stop_w",label:"Si spegne sotto",unit:"W",hint:"Potenza sotto la quale il ciclo pu\xF2 finire."},{key:"start_delay",label:"Conferma avvio dopo",unit:"s",hint:"Per ignorare i picchi brevi, per esempio quando si preme un tasto."},{key:"end_delay",label:"Conferma fine dopo",unit:"s",hint:"Quanto deve restare sotto la soglia: pi\xF9 lungo di qualsiasi pausa del programma."},{key:"min_cycle",label:"Ignora cicli pi\xF9 brevi di",unit:"s",hint:"I cicli pi\xF9 corti non si contano e non avvisano."},{key:"heat_w",label:"Riscaldamento sopra",unit:"W",hint:"Potenza della resistenza: serve a distinguere le fasi (lavaggio, risciacquo, asciugatura)."}],A=class extends C{constructor(){super(...arguments);this.openKey="";this._list=[];this._price="0.30";this._priceEntity="";this._notify=[];this._open="";this._addType="";this._addEntity="";this._addName="";this._extra="";this._svc="";this._advanced="";this._imp={};this._busy=!1;this._error="";this._onKey=t=>{t.key==="Escape"&&this._close()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._list=[...this.info.appliances,...this.info.robots??[]].map(t=>({id:t.id,type:t.type,name:t.name,entity:t.entity,energy_entity:t.energy_entity,start_w:t.start_w,stop_w:t.stop_w,start_delay:t.start_delay,end_delay:t.end_delay,min_cycle:t.min_cycle,heat_w:t.heat_w,maint_cycles:t.maint_cycles,alert_minutes:t.alert_minutes,notify:t.notify,extras:t.extras.map(i=>({...i})),maker:t.maker??null,maker_device:t.maker_device??null})),this._price=String(this.info.price_kwh),this._priceEntity=this.info.price_entity,this._notify=[...this.info.notify_services],this._open=this.openKey,this._list.length===0&&(this._addType="lavatrice")}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey)}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_patch(t,i){this._list=this._list.map(n=>n.id===t?{...n,...i}:n)}_remove(t){this._list=this._list.filter(i=>i.id!==t),this._open===t&&(this._open="")}_reset(t){let i=this.info.types[t.type];this._patch(t.id,{start_w:i.start_w,stop_w:i.stop_w,start_delay:i.start_delay,end_delay:i.end_delay,min_cycle:i.min_cycle,heat_w:i.heat_w})}_add(){let t=this._addType,i=this._addEntity.trim();if(!t)return;let n=this.info.types[t]?.robot===!0;if(!/^[a-z_]+\.[a-z0-9_]+$/.test(i)||n&&!i.startsWith("vacuum.")){this._error=n?"Scegli dall'elenco il robot (un'entit\xE0 vacuum.\u2026).":"Scegli dall'elenco il sensore di potenza della presa.";return}if(this._list.some(o=>o.entity===i)){this._error="Questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.";return}let a=We(t,i,this._addName.trim(),this.info.types[t],this._list.map(o=>o.id));this._list=[...this._list,a],this._open=a.id,this._addType="",this._addEntity="",this._addName="",this._error=""}async _save(){let t=le(this._list);if(t){this._error=t;return}let i=Number(this._price.replace(",","."));if(!Number.isFinite(i)||i<0||i>10){this._error="Il prezzo dell'energia deve essere un numero tra 0 e 10 \u20AC/kWh.";return}this._busy=!0,this._error="";try{await this.hass.callWS({type:"elettrodomestici/update",entry_id:this.info.entry_id,appliances:this._list,price_kwh:i,price_entity:this._priceEntity.trim(),notify_services:this._notify}),this.dispatchEvent(new CustomEvent("saved")),this._close()}catch(n){let a=n instanceof Error?n.message:n?.message??String(n);this._error=`Impossibile salvare: ${a}`}finally{this._busy=!1}}_impState(t){if(!this._imp[t.id]){let i=Fe(this.hass.states,t.type);this._imp[t.id]={energy:t.energy_entity??"",counter:i.counter,status:i.status,days:"730",price:"",busy:!1,msg:"",err:!1}}return this._imp[t.id]}_setImp(t,i){this._imp={...this._imp,[t]:{...this._imp[t],...i}}}async _import(t){let i=this._impState(t),n=Number(i.days.replace(",",".")),a=i.price.trim()?Number(i.price.replace(",",".")):void 0;if(!Number.isFinite(n)||n<1||n>3650||a!==void 0&&(!Number.isFinite(a)||a<0||a>10)){this._setImp(t.id,{msg:"Controlla i giorni (1-3650) e il prezzo.",err:!0});return}this._setImp(t.id,{busy:!0,msg:"",err:!1});try{let o=await this.hass.callWS({type:"elettrodomestici/import_history",entry_id:this.info.entry_id,key:t.id,days:n,...i.energy.trim()?{energy_entity:i.energy.trim()}:{},...i.counter.trim()?{counter_entity:i.counter.trim()}:{},...i.status.trim()?{status_entity:i.status.trim()}:{},...a!==void 0?{price:a}:{}}),r=[`${o.days_written} giorni importati`];o.energy_days&&r.push(`${x(o.kwh,1)} kWh`),(o.cycles||o.baseline)&&r.push(`${x(o.cycles+(o.baseline??0))} cicli (${x(o.baseline??0)} precedenti al recorder, solo nel totale)`),o.runtime_days&&r.push(`funzionamento di ${o.runtime_days} giorni`),o.skipped_days&&r.push(`${o.skipped_days} giorni scartati (valori impossibili del contatore)`),this._setImp(t.id,{busy:!1,msg:`${r.join(" \xB7 ")}.`,err:!1}),this.dispatchEvent(new CustomEvent("saved"))}catch(o){let r=o instanceof Error?o.message:o?.message??String(o);this._setImp(t.id,{busy:!1,msg:`Importazione non riuscita: ${r}`,err:!0})}}_importBox(t){let i=this._impState(t),n=this.info.appliances.some(a=>a.id===t.id);return l`
      <button class="adv" aria-expanded=${this._advanced===`imp-${t.id}`?"true":"false"} @click=${()=>this._advanced=this._advanced===`imp-${t.id}`?"":`imp-${t.id}`}>${this._advanced===`imp-${t.id}`?"\u25BE":"\u25B8"} Importa lo storico del vecchio pacchetto</button>
      ${this._advanced===`imp-${t.id}`?l`<div class="impbox">
            ${n?d:l`<div class="hint">Salva prima le preferenze: l'importazione si fa su un elettrodomestico già salvato.</div>`}
            <label class="f">Contatore di energia della presa (kWh)
              <input class="txt" list=${`dl-ie-${t.id}`} placeholder="sensor.…_energia" .value=${i.energy} @input=${a=>this._setImp(t.id,{energy:a.target.value})} />
              <datalist id=${`dl-ie-${t.id}`}>${de(this.hass.states).map(a=>l`<option value=${a.id}>${a.name}</option>`)}</datalist>
              <span class="hint">È quello che usava il vecchio pacchetto: le sue statistiche a lungo termine danno l'energia giorno per giorno, anche di anni fa.</span></label>
            <label class="f">Contatore dei cicli (facoltativo)
              <input class="txt" list=${`dl-ic-${t.id}`} placeholder="counter.cicli_…" .value=${i.counter} @input=${a=>this._setImp(t.id,{counter:a.target.value})} />
              <datalist id=${`dl-ic-${t.id}`}>${qe(this.hass.states).map(a=>l`<option value=${a.id}>${a.name}</option>`)}</datalist>
              <span class="hint">I cicli per giorno si ricostruiscono per quanto il recorder conserva; il resto entra nel totale. Vale anche come punto di partenza della manutenzione.</span></label>
            <label class="f">Sensore di stato on/off (facoltativo)
              <input class="txt" list=${`dl-is-${t.id}`} placeholder="binary_sensor.washing_machine_status" .value=${i.status} @input=${a=>this._setImp(t.id,{status:a.target.value})} />
              <datalist id=${`dl-is-${t.id}`}>${Ve(this.hass.states).map(a=>l`<option value=${a.id}>${a.name}</option>`)}</datalist>
              <span class="hint">Per le ore di funzionamento, sempre per quanto conserva il recorder.</span></label>
            <div class="two">
              <label class="f">Quanti giorni indietro<span class="numrow"><input class="num" inputmode="numeric" .value=${i.days} @input=${a=>this._setImp(t.id,{days:a.target.value})} /><span class="u">giorni</span></span></label>
              <label class="f">Prezzo per il costo (€/kWh)<span class="numrow"><input class="num" inputmode="decimal" placeholder=${this._price} .value=${i.price} @input=${a=>this._setImp(t.id,{price:a.target.value})} /></span>
                <span class="hint">Vuoto = il prezzo attuale. Il vecchio pacchetto non salvava il costo: si ricalcola.</span></label>
            </div>
            <div class="hint">I giorni già misurati da questa integrazione non vengono toccati. Si può ripetere senza doppioni.</div>
            <button class="btn primary" ?disabled=${!n||i.busy||!i.energy.trim()&&!i.counter.trim()&&!i.status.trim()} @click=${()=>void this._import(t)}>${i.busy?"Importo\u2026":"Importa lo storico"}</button>
            ${i.msg?l`<div class=${i.err?"err":"ok"}>${i.msg}</div>`:d}
          </div>`:d}`}_num(t,i,n,a,o){return l`<label class="f">${n}
      <span class="numrow"><input class="num" inputmode="decimal" .value=${String(t[i])} @change=${r=>{let c=Number(r.target.value.replace(",","."));Number.isFinite(c)&&c>=0?this._patch(t.id,{[i]:c}):r.target.value=String(t[i])}} /><span class="u">${a}</span></span>
      <span class="hint">${o}</span></label>`}_makerBox(t){let i=this.info.makers??[],n=!!t.maker&&!!t.maker_device,a=i.find(o=>o.device_id===t.maker_device);return l`<div class="row"><div class="t"><div class="lab">Usa l'integrazione del costruttore</div>
        <div class="hint">${i.length===0?"Nessun dispositivo Electrolux trovato in Home Assistant (installa e configura l'integrazione Electrolux).":"Stato, fase, programma e tempo rimanente arrivano dall'integrazione Electrolux (solo mentre l'apparecchio \xE8 acceso); consumi e cicli restano quelli della presa."}</div></div>
        <button class=${n?"sw on":"sw"} role="switch" aria-checked=${n?"true":"false"} aria-label="Usa l'integrazione del costruttore" ?disabled=${i.length===0&&!n}
          @click=${()=>n?this._patch(t.id,{maker:null,maker_device:null}):i[0]&&this._patch(t.id,{maker:i[0].maker,maker_device:i[0].device_id})}><span class="knob"></span></button></div>
      ${n?l`<label class="f">Dispositivo
            <select class="txt" @change=${o=>{let r=i.find(c=>c.device_id===o.target.value);r&&this._patch(t.id,{maker:r.maker,maker_device:r.device_id})}}>
              ${i.map(o=>l`<option value=${o.device_id} ?selected=${o.device_id===t.maker_device}>${o.label} · ${o.name}</option>`)}
              ${a?d:l`<option value=${t.maker_device??""} selected>${t.maker_device} (non trovato)</option>`}
            </select></label>`:d}`}_robotEditor(t){let i=this.hass.states[t.entity],n=this._list.filter(a=>a.id!==t.id).map(a=>a.entity);return l`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:robot-vacuum"></ha-icon>Robot: <b>${Ht(this.hass.states,t.entity)}</b> <code>${t.entity}</code> · ora ${i?i.state:"non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${t.name} @change=${a=>this._patch(t.id,{name:a.target.value.trim()||t.name})} /></label>
        <label class="f">Entità del robot
          <input class="txt" list=${`dl-rb-${t.id}`} .value=${t.entity} @change=${a=>this._patch(t.id,{entity:a.target.value.trim()})} />
          <datalist id=${`dl-rb-${t.id}`}>${pe(this.hass.states,n).map(a=>l`<option value=${a.id}>${a.name}</option>`)}</datalist>
          <span class="hint">Comandi, mappa, stanze, consumabili e base si ricavano da sole dall'integrazione del robot (per ora provata con Dreame).</span></label>
        <button class="btn del" @click=${()=>this._remove(t.id)}>Togli dall'elenco</button>
      </div>`}_editor(t){if(this.info.types[t.type]?.robot)return this._robotEditor(t);let i=this.info.types[t.type],n=this.hass.states[t.entity],a=this._list.filter(o=>o.id!==t.id).map(o=>o.entity);return l`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:power-plug"></ha-icon>Presa: <b>${Ht(this.hass.states,t.entity)}</b> <code>${t.entity}</code> · ora ${n?`${n.state} ${String(n.attributes.unit_of_measurement??"")}`.trim():"non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${t.name} @change=${o=>this._patch(t.id,{name:o.target.value.trim()||t.name})} /></label>
        <label class="f">Sensore di potenza della presa (W)
          <input class="txt" list=${`dl-pw-${t.id}`} .value=${t.entity} @change=${o=>this._patch(t.id,{entity:o.target.value.trim()})} />
          <datalist id=${`dl-pw-${t.id}`}>${ce(this.hass.states,a).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>
        <label class="f">Contatore di energia della presa (facoltativo)
          <input class="txt" list=${`dl-en-${t.id}`} placeholder="sensor.…_energia" .value=${t.energy_entity??""} @change=${o=>this._patch(t.id,{energy_entity:o.target.value.trim()||null})} />
          <datalist id=${`dl-en-${t.id}`}>${de(this.hass.states).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
          <span class="hint">Se manca, l'energia si ricava dalla potenza. Con il contatore della presa è più precisa.</span></label>

        ${this._makerBox(t)}

        <div class="f">Dispositivi collegati (facoltativi)
          <div class="chips">
            ${t.extras.map(o=>l`<span class="tag"><span>${o.label||Ht(this.hass.states,o.entity)}</span><button aria-label=${`Togli ${o.entity}`} @click=${()=>this._patch(t.id,{extras:t.extras.filter(r=>r.entity!==o.entity)})}>✕</button></span>`)}
            ${t.extras.length===0?l`<span class="hint">Nessuno</span>`:d}
          </div>
          <div class="addrow">
            <input class="txt" list=${`dl-ex-${t.id}`} placeholder="sensor.programma_asciugatrice" .value=${this._extra} @input=${o=>this._extra=o.target.value} />
            <datalist id=${`dl-ex-${t.id}`}>${De(this.hass.states,t.extras.map(o=>o.entity)).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
            <button class="btn" ?disabled=${!this._extra.trim()} @click=${()=>{let o=this._extra.trim();/^[a-z_]+\.[a-z0-9_]+$/.test(o)&&!t.extras.some(r=>r.entity===o)&&this._patch(t.id,{extras:[...t.extras,{entity:o,label:""}]}),this._extra=""}}>Aggiungi</button>
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
        ${this._advanced===t.id?l`<div class="two">${Gi.filter(o=>o.key!=="heat_w"||i.phases.length>1).map(o=>this._num(t,o.key,o.label,o.unit,o.hint))}</div>
              <button class="btn" @click=${()=>this._reset(t)}>Ripristina i valori predefiniti</button>`:d}
        ${this._importBox(t)}
        <button class="btn del" @click=${()=>this._remove(t.id)}>Togli dall'elenco</button>
      </div>`}render(){if(!this.info)return d;let t=le(this._list),i=Ye(this.hass.services).filter(o=>!this._notify.includes(o)),n=this._list.map(o=>o.entity),a=this._addType?this.info.types[this._addType]:null;return l`
      <div class="backdrop" @click=${o=>o.target===o.currentTarget&&this._close()}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Preferenze elettrodomestici">
          <div class="head"><div class="title">Preferenze degli elettrodomestici</div><button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button></div>
          <div class="body">
            <div class="sec">Elettrodomestici</div>
            ${this._list.length===0?l`<div class="empty">Nessun elettrodomestico: aggiungine uno qui sotto.</div>`:d}
            ${this._list.map(o=>l`
                <div class="item">
                  <button class="head2" aria-expanded=${this._open===o.id?"true":"false"} @click=${()=>this._open=this._open===o.id?"":o.id}>
                    <ha-icon icon=${te[o.type]}></ha-icon>
                    <span class="nm">${o.name}<span class="eid">${o.entity}</span></span>
                    <span class="meta">${dt[o.type]}</span>
                    <span class="chev">${this._open===o.id?"\u25BE":"\u25B8"}</span>
                  </button>
                  ${this._open===o.id?this._editor(o):d}
                </div>`)}

            <div class="sec">Aggiungi un elettrodomestico</div>
            <div class="types">
              ${He.map(o=>l`<button class=${this._addType===o?"type on":"type"} aria-pressed=${this._addType===o?"true":"false"} @click=${()=>this._addType=this._addType===o?"":o}><ha-icon icon=${te[o]}></ha-icon>${dt[o]}</button>`)}
            </div>
            ${a?l`<div class="addbox">
                  ${a.robot?l`<label class="f">Robot (entità vacuum)
                        <input class="txt" list="dl-add" placeholder="vacuum.…" .value=${this._addEntity} @input=${o=>this._addEntity=o.target.value} />
                        <datalist id="dl-add">${pe(this.hass.states,n).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>`:l`<label class="f">Sensore di potenza della presa (W)
                        <input class="txt" list="dl-add" placeholder="sensor.presa_…_potenza" .value=${this._addEntity} @input=${o=>this._addEntity=o.target.value} />
                        <datalist id="dl-add">${ce(this.hass.states,n).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>`}
                  <label class="f">Nome (facoltativo)<input class="txt" placeholder=${a.label} .value=${this._addName} @input=${o=>this._addName=o.target.value} /></label>
                  ${a.robot?l`<div class="hint">Sulla scheda compare con stato, batteria e comandi rapidi; toccandolo si apre la gestione completa (stanze, impostazioni, base, consumabili).</div>`:l`<div class="hint">Parte oltre ${a.start_w} W${a.phases.length>1?`, fasi: ${a.phases.join(" \u2192 ")}`:""}${a.has_finished?`, finisce dopo ${M(a.end_delay)} sotto ${a.stop_w} W`:""}. Le soglie si possono cambiare dopo.</div>`}
                  <button class="btn primary" ?disabled=${!this._addEntity.trim()} @click=${()=>this._add()}>Aggiungi ${a.label.toLowerCase()}</button>
                </div>`:d}

            <div class="sec">Costo dell'energia</div>
            <label class="f">Prezzo (€/kWh)
              <input class="num wide" inputmode="decimal" .value=${this._price} @input=${o=>this._price=o.target.value} /></label>
            <label class="f">Oppure un sensore con il prezzo attuale (facoltativo)
              <input class="txt" list="dl-price" placeholder="sensor.prezzo_energia" .value=${this._priceEntity} @input=${o=>this._priceEntity=o.target.value} />
              <datalist id="dl-price">${Ge(this.hass.states).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
              <span class="hint">Se c'è e ha un valore, vale al posto del prezzo fisso.</span></label>

            <div class="sec">Notifiche</div>
            <div class="chips">
              ${this._notify.map(o=>l`<span class="tag"><span>${o}</span><button aria-label=${`Togli ${o}`} @click=${()=>this._notify=this._notify.filter(r=>r!==o)}>✕</button></span>`)}
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
      </div>`}static{this.styles=[Y,I`
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
    `]}};m([S({attribute:!1})],A.prototype,"hass",2),m([S({attribute:!1})],A.prototype,"info",2),m([S()],A.prototype,"openKey",2),m([b()],A.prototype,"_list",2),m([b()],A.prototype,"_price",2),m([b()],A.prototype,"_priceEntity",2),m([b()],A.prototype,"_notify",2),m([b()],A.prototype,"_open",2),m([b()],A.prototype,"_addType",2),m([b()],A.prototype,"_addEntity",2),m([b()],A.prototype,"_addName",2),m([b()],A.prototype,"_extra",2),m([b()],A.prototype,"_svc",2),m([b()],A.prototype,"_advanced",2),m([b()],A.prototype,"_imp",2),m([b()],A.prototype,"_busy",2),m([b()],A.prototype,"_error",2);customElements.get("elettro-settings-dialog")||customElements.define("elettro-settings-dialog",A);var $t=[{key:"oggi",label:"Oggi"},{key:"ieri",label:"Ieri"},{key:"settimana",label:"Settimana"},{key:"mese",label:"Mese"},{key:"anno",label:"Anno"},{key:"totale",label:"Totale"}],D=class extends C{constructor(){super(...arguments);this.openKey="";this._stats=null;this._error="";this._now=Date.now();this._onKey=t=>{t.key==="Escape"&&this._close()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._tick=window.setInterval(()=>this._now=Date.now(),1e3),this._poll=window.setInterval(()=>void this._load(),6e4),this._load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey),this._tick&&window.clearInterval(this._tick),this._poll&&window.clearInterval(this._poll)}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_go(t){this.dispatchEvent(new CustomEvent("open-dialog",{detail:{tag:t,key:this.openKey}})),this._close()}get _app(){return this.info.appliances.find(t=>t.key===this.openKey)}async _load(){try{let t=await this.hass.callWS({type:"elettrodomestici/stats",entry_id:this.info.entry_id,key:this.openKey});this._stats=t[this.openKey]??null,this._error=""}catch(t){this._error=`Impossibile leggere le statistiche: ${t instanceof Error?t.message:t?.message??String(t)}`}}async _maintDone(){await this.hass.callWS({type:"elettrodomestici/action",entry_id:this.info.entry_id,key:this.openKey,action:"reset_maintenance"}),await this._load()}render(){let t=this._app;if(!t)return d;let i=Nt(t,this.hass.states,this.info.types,this._now),n=this.info.types[t.type],a=this._stats,o=!n?.has_finished&&t.type==="frigorifero";return l`
      <div class="backdrop" @click=${r=>r.target===r.currentTarget&&this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Statistiche ${t.name}`}>
          <div class="head">
            <div class="title">${t.name}${t.name!==dt[t.type]?l` <span class="sub">${dt[t.type]}</span>`:d}</div>
            <button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button>
          </div>
          <div class="body">
            <div class="now ${i.tone}">
              <span class="img">${et(it(t.type,i.state))}</span>
              <div class="nowtxt">
                <div class="st">${pt[i.state]}${i.state==="in_funzione"?l` · <b>${i.phase}</b>`:i.state==="terminato"?l` · <b>${i.phase}</b>`:d}</div>
                <div class="big">${G(i.power)}</div>
                ${i.state==="in_funzione"&&i.cycleKwh!==null?l`<div class="line">Questo ciclo: <b>${P(i.cycleKwh)}</b> · ${N(i.cycleEur)}${i.remainingText?l` · ${i.remainingText}`:d}</div>`:d}
                ${i.state==="in_funzione"&&t.inizio?l`<div class="line">Partita alle ${ne(t.inizio)}</div>`:d}
                ${i.state==="terminato"?l`<div class="line">Finita alle ${ne(t.fine)}.</div>`:d}
              </div>
            </div>

            ${i.extras.length?l`<div class="sec">Collegato al dispositivo</div><div class="kv">${i.extras.map(r=>l`<span>${r.label}</span><b>${r.value}</b>`)}</div>`:d}

            <div class="sec">Consumi</div>
            ${a?l`<div class="tblwrap"><table>
                  <thead><tr><th></th>${$t.map(r=>l`<th>${r.label}</th>`)}</tr></thead>
                  <tbody>
                    <tr><th>Energia</th>${$t.map(r=>l`<td>${P(a.periods[r.key].kwh)}</td>`)}</tr>
                    <tr><th>Costo</th>${$t.map(r=>l`<td>${N(a.periods[r.key].eur)}</td>`)}</tr>
                    <tr><th>${o?"Avvii compressore":"Cicli"}</th>${$t.map(r=>l`<td>${x(a.periods[r.key].cycles)}</td>`)}</tr>
                    <tr><th>Funzionamento</th>${$t.map(r=>l`<td>${ee(a.periods[r.key].sec)}</td>`)}</tr>
                  </tbody></table></div>
                <div class="hint">Costo calcolato a ${x(a.price_kwh,3)} €/kWh. L'energia comprende anche i consumi a riposo.</div>`:this._error?d:l`<div class="muted">Carico…</div>`}

            ${a?.summary?l`<div class="sec">${o?"Compressore":"Ciclo medio"} <span class="sub">(ultimi ${a.summary.count})</span></div>
                <div class="kv">
                  <span>Durata media</span><b>${M(a.summary.avg_seconds)}</b>
                  <span>Più corto / più lungo</span><b>${M(a.summary.min_seconds)} / ${M(a.summary.max_seconds)}</b>
                  <span>Energia media</span><b>${P(a.summary.avg_kwh)} · ${N(a.summary.avg_eur)}</b>
                  <span>Energia massima</span><b>${P(a.summary.max_kwh)}</b>
                </div>`:d}

            ${n&&t.maint_cycles>0&&a?l`<div class="sec">Manutenzione</div>
                <div class="maint ${a.maintenance.due?"due":""}">
                  <div class="mrow"><span>${n.maint_label}</span><b>${a.maintenance.count} / ${a.maintenance.threshold} cicli</b></div>
                  <div class="bar"><i style="width:${a.maintenance.pct??0}%"></i></div>
                  <button class="btn" @click=${()=>void this._maintDone()}><ha-icon icon="mdi:check"></ha-icon>Manutenzione fatta</button>
                </div>`:d}

            ${a&&a.cycles.length?l`<div class="sec">Ultimi cicli</div>
                <div class="tblwrap"><table class="cyc">
                  <thead><tr><th>Quando</th><th>Durata</th><th>Energia</th><th>Costo</th><th>Picco</th></tr></thead>
                  <tbody>${a.cycles.slice(0,15).map(r=>l`<tr><td>${Lt(Date.parse(r.s))}</td><td>${M((Date.parse(r.e)-Date.parse(r.s))/1e3)}</td><td>${P(r.kwh)}</td><td>${N(r.eur)}</td><td>${G(r.pk)}</td></tr>`)}</tbody>
                </table></div>`:a?l`<div class="sec">Ultimi cicli</div><div class="muted">Nessun ciclo registrato.</div>`:d}

            <div class="sec">Come lo riconosco</div>
            <div class="kv small">
              <span>Presa (potenza)</span><b>${t.entity}</b>
              ${t.energy_entity?l`<span>Presa (energia)</span><b>${t.energy_entity}</b>`:d}
              <span>Parte sopra</span><b>${G(t.start_w)} per ${t.start_delay} s</b>
              <span>Finisce sotto</span><b>${G(t.stop_w)} per ${M(t.end_delay)}</b>
              ${n?.phases.length&&n.phases.length>1?l`<span>Fasi</span><b>${n.phases.join(" \u2192 ")}</b>`:d}
              <span>Cicli più brevi di</span><b>${M(t.min_cycle)} non contano</b>
            </div>
            ${this._error?l`<div class="err">${this._error}</div>`:d}
          </div>
          <div class="foot">
            <button class="btn" @click=${()=>this._go("elettro-settings-dialog")}><ha-icon icon="mdi:cog"></ha-icon>Preferenze</button>
            <button class="btn primary" @click=${()=>this._go("elettro-charts-dialog")}><ha-icon icon="mdi:chart-line"></ha-icon>Grafici</button>
          </div>
        </div>
      </div>`}static{this.styles=[Y,I`
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
    `]}};m([S({attribute:!1})],D.prototype,"hass",2),m([S({attribute:!1})],D.prototype,"info",2),m([S()],D.prototype,"openKey",2),m([b()],D.prototype,"_stats",2),m([b()],D.prototype,"_error",2),m([b()],D.prototype,"_now",2);customElements.get("elettro-stats-dialog")||customElements.define("elettro-stats-dialog",D);var fe=[{id:"6h",label:"6 ore",ms:6*36e5},{id:"24h",label:"24 ore",ms:24*36e5},{id:"3d",label:"3 giorni",ms:3*864e5},{id:"7d",label:"7 giorni",ms:7*864e5}],Yi=[{id:7,label:"7 giorni"},{id:30,label:"30 giorni"},{id:90,label:"90 giorni"}],H=220,j=10,R=44,ai=22,Ut=12,T=class extends C{constructor(){super(...arguments);this.openKey="";this._tab="potenza";this._range="24h";this._days=30;this._metric="kwh";this._loading=!1;this._error="";this._w=640;this._hover=null;this._values=[];this._segs=[];this._stats=null;this._t0=0;this._t1=0;this._n=240;this._raw=[];this._rawStates=[];this._wrapEl=null;this._seq=0;this._onKey=t=>{t.key==="Escape"&&this._close()}}get _app(){return this.info.appliances.find(t=>t.key===this.openKey)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._timer=window.setInterval(()=>void this._load(),6e4),this._load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey),this._ro?.disconnect(),this._timer&&window.clearInterval(this._timer)}updated(){let t=this.renderRoot.querySelector(".chartwrap");t&&t!==this._wrapEl&&(this._ro?.disconnect(),this._wrapEl=t,this._ro=new ResizeObserver(i=>{let n=Math.floor(i[0]?.contentRect.width??640);n>100&&Math.abs(n-this._w)>2&&(this._w=n,this._recompute())}),this._ro.observe(t))}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_go(t){this.dispatchEvent(new CustomEvent("open-dialog",{detail:{tag:t,key:this.openKey}})),this._close()}async _history(t,i,n){return this.hass.callWS({type:"history/history_during_period",start_time:new Date(i).toISOString(),end_time:new Date(n).toISOString(),entity_ids:t,include_start_time_state:!0,significant_changes_only:!1,minimal_response:!0,no_attributes:!0})}async _load(){let t=this._app;if(!this.hass||!t)return;let i=++this._seq;this._loading=!0;try{if(this._tab==="consumi"){let n=await this.hass.callWS({type:"elettrodomestici/stats",entry_id:this.info.entry_id,key:t.key});if(i!==this._seq)return;this._stats=n[t.key]??null}else{let n=fe.find(p=>p.id===this._range)??fe[1],a=Date.now(),o=a-n.ms,r=t.entities.stato,c=await this._history(r?[t.entity,r]:[t.entity],o,a);if(i!==this._seq)return;this._t0=o,this._t1=a,this._raw=Je(c[t.entity]),this._rawStates=r?c[r]??[]:[],this._recompute()}this._error=""}catch(n){i===this._seq&&(this._error=`Impossibile leggere i dati: ${n instanceof Error?n.message:n?.message??String(n)}`)}finally{i===this._seq&&(this._loading=!1)}}_recompute(){this._t1&&(this._n=Math.max(60,Math.min(480,Math.floor((this._w-R-8)/2))),this._values=ti(this._raw,this._t0,this._t1,this._n,30*6e4),this._segs=Xe(this._rawStates,this._t0,this._t1))}_setTab(t){this._tab=t,this._hover=null,this._load()}_setRange(t){this._range=t,this._hover=null,this._load()}_move(t,i,n,a){let o=t.currentTarget.getBoundingClientRect(),r=Math.round((t.clientX-o.left-n)/a*(i-1));this._hover=r>=0&&r<i?r:null}_moveBar(t,i,n,a){let o=t.currentTarget.getBoundingClientRect(),r=Math.floor((t.clientX-o.left-n)/a*i);this._hover=r>=0&&r<i?r:null}_power(t){let i=this._values.filter(h=>h!==null),n=ae(this.hass.states[t.entity]),a=Math.max(t.start_w*1.5,...i.length?i:[0],n??0),o=ue(0,a,5),r=this._w,c=r-R-8,p=j+H+Ut+ai+6,f=h=>R+(this._n<=1?0:h/(this._n-1)*c),u=h=>j+H-(h-o.min)/(o.max-o.min||1)*H,v=h=>R+(h-this._t0)/(this._t1-this._t0||1)*c,y=[{v:t.start_w,c:F.in_funzione,l:"avvio"},...t.stop_w!==t.start_w?[{v:t.stop_w,c:F.spento,l:"fine"}]:[],...t.heat_w<o.max?[{v:t.heat_w,c:"#ef4444",l:"riscaldamento"}]:[]],$=this._hover,w=$!==null&&this._n>1?this._t0+$/(this._n-1)*(this._t1-this._t0):null,_=$!==null?this._values[$]:null,z=w!==null?Ze(this._segs,w):null;return l`
      <div class="ranges">
        ${fe.map(h=>l`<button class=${h.id===this._range?"chip on":"chip"} @click=${()=>this._setRange(h.id)}>${h.label}</button>`)}
        ${this._loading?l`<span class="load">aggiorno…</span>`:d}
      </div>
      <div class="chartwrap">
        <div class="tip">
          ${w!==null?l`<b>${Lt(w)}</b> · ${_!==null?`${x(_,0)} W`:"nessun dato"}${z?l` · <span style="color:${F[z]==="transparent"?"inherit":F[z]}">${pt[z]}</span>`:d}`:l`<span class="muted">Tocca il grafico per leggere i valori</span>`}
        </div>
        <svg width=${r} height=${p} viewBox="0 0 ${r} ${p}" @pointermove=${h=>this._move(h,this._n,R,c)} @pointerdown=${h=>this._move(h,this._n,R,c)} @pointerleave=${()=>this._hover=null}>
          ${o.ticks.map(h=>U`
            <line x1=${R} x2=${r-8} y1=${u(h)} y2=${u(h)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
            <text x=${R-6} y=${u(h)+4} text-anchor="end" class="ax">${x(h)}</text>`)}
          ${y.map((h,g)=>U`<line x1=${R} x2=${r-8} y1=${u(h.v)} y2=${u(h.v)} stroke=${h.c} stroke-width="1.2" stroke-dasharray="5 4" opacity="0.9" />
            ${g===0||Math.abs(u(y[g-1].v)-u(h.v))>=13?U`<text x=${r-10} y=${u(h.v)-3} text-anchor="end" class="th" fill=${h.c}>${h.l} ${x(h.v,h.v%1?1:0)} W${g<y.length-1&&Math.abs(u(y[g+1].v)-u(h.v))<13?` \xB7 ${y[g+1].l} ${x(y[g+1].v,y[g+1].v%1?1:0)} W`:""}</text>`:d}`)}
          <path d=${ii(this._values,f,u)} fill="none" stroke="var(--primary-color,#03a9f4)" stroke-width="1.8" stroke-linejoin="round" />
          ${$!==null&&_!==null?U`<line x1=${f($)} x2=${f($)} y1=${j} y2=${j+H} stroke="var(--secondary-text-color,#888)" stroke-width="1" /><circle cx=${f($)} cy=${u(_)} r="4" fill="var(--primary-color,#03a9f4)" />`:d}
          ${this._segs.map(h=>U`<rect x=${v(h.from)} y=${j+H+4} width=${Math.max(1,v(h.to)-v(h.from))} height=${Ut} fill=${F[h.state]==="transparent"?"#9aa1ad":F[h.state]} opacity=${h.state==="non_disponibile"?.35:.9} />`)}
          ${ei(this._t0,this._t1).map(h=>U`
            <line x1=${v(h.t)} x2=${v(h.t)} y1=${j+H+Ut+4} y2=${j+H+Ut+8} stroke="var(--secondary-text-color,#888)" />
            <text x=${v(h.t)} y=${p-4} text-anchor="middle" class=${h.major?"ax maj":"ax"}>${h.label}</text>`)}
        </svg>
        <div class="legend">
          ${["spento","in_funzione","terminato"].map(h=>l`<span><i style="background:${F[h]}"></i>${pt[h]}</span>`)}
        </div>
      </div>
      ${!this._loading&&!this._error&&this._values.every(h=>h===null)?l`<div class="empty">Nessun dato di potenza nel periodo.</div>`:d}`}_consumi(){let t=this._stats;if(!t)return l`<div class="empty">${this._loading?"Carico\u2026":"Nessun dato."}</div>`;let i=t.series.slice(-this._days),n=this._metric,a=i.map(g=>g[n]),o=Math.max(...a,n==="cycles"?1:.01),r=ue(0,o,5),c=this._w,p=c-R-8,f=j+H+ai+6,u=i.length,v=p/u,y=Math.max(2,Math.min(28,v-(v>6?2:0))),$=g=>j+H-(g-r.min)/(r.max-r.min||1)*H,w=g=>R+g*v+(v-y)/2,_=this._hover,z=Ke(i,this._days),h=Math.max(1,Math.ceil(u/7));return l`
      <div class="ranges">
        ${Yi.map(g=>l`<button class=${g.id===this._days?"chip on":"chip"} @click=${()=>(this._days=g.id,this._hover=null)}>${g.label}</button>`)}
        <span class="sep"></span>
        ${Object.keys(oe).map(g=>l`<button class=${g===n?"chip on":"chip"} @click=${()=>(this._metric=g,this._hover=null)}>${oe[g]}</button>`)}
        ${this._loading?l`<span class="load">aggiorno…</span>`:d}
      </div>
      <div class="totals"><span>Totale nel periodo</span><b>${P(z.kwh)}</b><b>${N(z.eur)}</b><b>${re("cycles",z.cycles)}</b></div>
      <div class="chartwrap">
        <div class="tip">
          ${_!==null&&i[_]?l`<b>${se(i[_].date)}</b> · ${re(n,i[_][n])}${n!=="kwh"?l` · ${P(i[_].kwh)}`:d}${n!=="eur"?l` · ${N(i[_].eur)}`:d}`:l`<span class="muted">Tocca una barra per leggere il giorno</span>`}
        </div>
        <svg width=${c} height=${f} viewBox="0 0 ${c} ${f}" @pointermove=${g=>this._moveBar(g,u,R,p)} @pointerdown=${g=>this._moveBar(g,u,R,p)} @pointerleave=${()=>this._hover=null}>
          ${r.ticks.map(g=>U`
            <line x1=${R} x2=${c-8} y1=${$(g)} y2=${$(g)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
            <text x=${R-6} y=${$(g)+4} text-anchor="end" class="ax">${x(g,(n==="kwh"||n==="eur")&&r.max<5?1:0)}</text>`)}
          ${i.map((g,L)=>U`<rect x=${w(L)} y=${$(g[n])} width=${y} height=${Math.max(0,j+H-$(g[n]))} rx=${y>6?3:1} fill=${_===L?"var(--primary-color,#03a9f4)":"#f59e0b"} opacity=${_===null||_===L?1:.55} />`)}
          ${i.map((g,L)=>L%h===0?U`<text x=${w(L)+y/2} y=${f-4} text-anchor="middle" class="ax">${se(g.date).replace(/^\w+ /,"")}</text>`:d)}
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
      </div>`:d}static{this.styles=[Y,I`
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
    `]}};m([S({attribute:!1})],T.prototype,"hass",2),m([S({attribute:!1})],T.prototype,"info",2),m([S()],T.prototype,"openKey",2),m([b()],T.prototype,"_tab",2),m([b()],T.prototype,"_range",2),m([b()],T.prototype,"_days",2),m([b()],T.prototype,"_metric",2),m([b()],T.prototype,"_loading",2),m([b()],T.prototype,"_error",2),m([b()],T.prototype,"_w",2),m([b()],T.prototype,"_hover",2),m([b()],T.prototype,"_values",2),m([b()],T.prototype,"_segs",2),m([b()],T.prototype,"_stats",2);customElements.get("elettro-charts-dialog")||customElements.define("elettro-charts-dialog",T);var Qi=[{key:"controllo",label:"Controllo",icon:"mdi:robot-vacuum"},{key:"stanze",label:"Stanze",icon:"mdi:floor-plan"},{key:"base",label:"Base",icon:"mdi:home-lightning-bolt-outline"},{key:"manutenzione",label:"Manutenzione",icon:"mdi:wrench-clock"},{key:"altro",label:"Altro",icon:"mdi:dots-horizontal"}],oi=[["cleaning_mode","Modalit\xE0"],["suction_level","Aspirazione"],["mop_pad_humidity","Umidit\xE0 del panno"],["cleaning_route","Percorso"],["water_temperature","Temperatura dell'acqua"],["carpet_cleaning","Tappeti"]],Ji=[["auto_empty_mode","Svuotamento automatico"],["mop_wash_level","Lavaggio dei panni"],["drying_time","Durata dell'asciugatura"],["self_clean_frequency","Quando lavare i panni"]],Xi=[["clean_water_tank_status","Serbatoio acqua pulita",["low_water","not_installed","not_available"]],["dirty_water_tank_status","Serbatoio acqua sporca",["not_installed_or_full"]],["dust_bag_status","Sacchetto della polvere",["check","not_installed"]],["mop_pad","Panno",["not_installed"]],["self_wash_base_status","Lavaggio della base",[]],["auto_empty_status","Svuotamento",[]]],Zi=[["start_auto_empty","Svuota la polvere","mdi:delete-empty-outline"],["self_clean","Lava i panni","mdi:washing-machine"],["manual_drying","Asciuga i panni","mdi:hair-dryer-outline"],["clear_warning","Cancella avviso","mdi:alert-remove-outline"]],ts=[["customized_cleaning","Pulizia personalizzata per stanza"],["resume_cleaning","Riprendi dopo la ricarica"],["carpet_boost","Pi\xF9 aspirazione sui tappeti"],["obstacle_avoidance","Evita gli ostacoli"],["auto_drying","Asciuga i panni da solo"],["self_clean","Lava i panni da solo"],["dnd","Non disturbare"],["child_lock","Blocco bambini"]],O=class extends C{constructor(){super(...arguments);this.openKey="";this._tab="controllo";this._rooms=[];this._repeats=1;this._confirm="";this._error="";this._onKey=t=>{t.key==="Escape"&&this._close()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey)}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}get _robot(){return this.info.robots?.find(t=>t.key===this.openKey)}_st(t){return t?this.hass.states[t]:void 0}_has(t,i){return!!this.hass.services?.[t]?.[i]}async _call(t,i,n){try{await this.hass.callService(t,i,n),this._error=""}catch(a){this._error=`Comando non riuscito: ${a instanceof Error?a.message:a?.message??String(a)}`}}_vacuum(t,i={}){let n=this._robot;n&&this._call("vacuum",t,{entity_id:n.entity,...i})}_press(t){this._call("button","press",{entity_id:t})}_selectOption(t,i){this._call("select","select_option",{entity_id:t,option:i})}_toggle(t,i){this._call("switch",i?"turn_on":"turn_off",{entity_id:t})}_chips(t,i){let n=this._st(t),a=n?.attributes.options;return!n||!Array.isArray(a)||["unavailable","unknown"].includes(n.state)?d:l`<div class="group"><div class="glab">${i}</div>
      <div class="chips">${a.map(o=>l`<button class=${n.state===o?"chip on":"chip"} aria-pressed=${n.state===o?"true":"false"} @click=${()=>this._selectOption(t,String(o))}>${V(this.hass,t,String(o))||he(String(o))}</button>`)}</div></div>`}_selects(t,i){let n=i.map(([a,o])=>this._chips(k(t,`select.${a}`),o)).filter(a=>a!==d);return n.length?l`${n}`:d}_hero(t){let i=Ot(t,this.hass),n=V(this.hass,k(t,"sensor.state")),a=i.battery;return l`<div class="hero ${i.tone}">
      <span class="himg">${et(it("aspirapolvere",i.state))}</span>
      <div class="htxt">
        <div class="hst">${i.statusLine}</div>
        ${n&&n!==i.statusLine?l`<div class="hline">${n}</div>`:d}
        <div class="hbat">${i.charging?l`<ha-icon icon="mdi:lightning-bolt"></ha-icon>`:d}<b>${a===null?"\u2013":`${x(a,0)} %`}</b>
          ${a!==null?l`<span class="bbar"><i class=${a<=20?"low":""} style=${`width:${Math.min(100,Math.max(0,a))}%`}></i></span>`:d}</div>
        ${i.room||i.area!==null||i.minutes!==null?l`<div class="hline">${[i.room,i.area!==null?`${x(i.area,0)} m\xB2`:"",i.minutes!==null?M(i.minutes*60):""].filter(Boolean).join(" \xB7 ")}</div>`:d}
      </div></div>
      ${i.error?l`<div class="err"><ha-icon icon="mdi:alert-circle-outline"></ha-icon> ${i.error}${this._has("button","press")&&k(t,"button.clear_warning")?l` <button class="btn s" @click=${()=>this._press(k(t,"button.clear_warning"))}>Cancella</button>`:d}</div>`:d}
      <div class="cmds">
        ${i.canStart?l`<button class="cmd go" @click=${()=>this._vacuum("start")}><ha-icon icon="mdi:play"></ha-icon>${i.activity==="paused"?"Riprendi":"Avvia"}</button>`:d}
        ${i.canPause?l`<button class="cmd" @click=${()=>this._vacuum("pause")}><ha-icon icon="mdi:pause"></ha-icon>Pausa</button>`:d}
        ${i.canStop?l`<button class="cmd" @click=${()=>this._vacuum("stop")}><ha-icon icon="mdi:stop"></ha-icon>Stop</button>`:d}
        ${i.canHome?l`<button class="cmd" @click=${()=>this._vacuum("return_to_base")}><ha-icon icon="mdi:home-import-outline"></ha-icon>Alla base</button>`:d}
        <button class="cmd" @click=${()=>this._vacuum("locate")}><ha-icon icon="mdi:map-marker-radius-outline"></ha-icon>Trovalo</button>
      </div>`}_map(t){let i=k(t,"camera.map"),n=this._st(i),a=n&&typeof n.attributes.entity_picture=="string"?n.attributes.entity_picture:"";if(!a)return d;let o=`${a}${a.includes("?")?"&":"?"}t=${encodeURIComponent(n?.state??"")}`;return l`<div class="sec">Mappa</div><div class="map"><img src=${o} alt="Mappa della casa" loading="lazy" /></div>`}_shortcuts(t){let i=ni(this._st(t.entity));return!i.length||!this._has("dreame_vacuum","vacuum_start_shortcut")?d:l`<div class="sec">Scorciatoie</div><div class="chips">${i.map(n=>l`<button class=${n.running?"chip on":"chip"} @click=${()=>void this._call("dreame_vacuum","vacuum_start_shortcut",{entity_id:t.entity,shortcut_id:n.id})}><ha-icon icon="mdi:lightning-bolt-outline"></ha-icon>${n.name}</button>`)}</div>`}_tabControl(t){return l`${this._hero(t)}${this._shortcuts(t)}
      ${(()=>{let i=this._selects(t,oi);return i===d?d:l`<div class="sec">Come pulisce</div>${i}`})()}
      ${this._map(t)}`}_tabRooms(t){let i=this._st(k(t,"select.selected_map"))?.state??"",n=si(this._st(t.entity),i),a=this._has("dreame_vacuum","vacuum_clean_segment");if(!n.length||!a)return l`<div class="empty">${a?"Il robot non ha ancora stanze: creale dall'app del costruttore.":"Questo robot non permette di scegliere le stanze da qui."}</div>`;let o=this._rooms.filter(r=>n.some(c=>c.id===r));return l`<div class="sec">Scegli le stanze da pulire</div>
      <div class="chips">${n.map(r=>l`<button class=${o.includes(r.id)?"chip on":"chip"} aria-pressed=${o.includes(r.id)?"true":"false"} @click=${()=>this._rooms=o.includes(r.id)?o.filter(c=>c!==r.id):[...o,r.id]}><ha-icon icon=${r.icon}></ha-icon>${r.name}</button>`)}</div>
      <div class="group"><div class="glab">Quante passate</div>
        <div class="chips">${[1,2,3].map(r=>l`<button class=${this._repeats===r?"chip on":"chip"} @click=${()=>this._repeats=r}>${r}</button>`)}</div></div>
      <div class="cmds"><button class="cmd go" ?disabled=${o.length===0} @click=${()=>void this._call("dreame_vacuum","vacuum_clean_segment",{entity_id:t.entity,segments:o,repeats:this._repeats})}><ha-icon icon="mdi:play"></ha-icon>${o.length===0?"Scegli almeno una stanza":o.length===1?"Pulisci la stanza":`Pulisci ${o.length} stanze`}</button></div>
      ${(()=>{let r=this._selects(t,oi.slice(0,3));return r===d?d:l`<div class="sec">Impostazioni valide per questa pulizia</div>${r}`})()}`}_tabBase(t){let i=Xi.map(([r,c,p])=>{let f=k(t,`sensor.${r}`),u=this._st(f);return!u||["unavailable","unknown",""].includes(u.state)?d:l`<div class="kv"><span>${c}</span><b class=${p.includes(u.state)?"bad":""}>${V(this.hass,f)}</b></div>`}).filter(r=>r!==d),n=W(this.hass.states,k(t,"sensor.drying_progress")),a=Zi.filter(([r])=>k(t,`button.${r}`)&&this._st(k(t,`button.${r}`))?.state!=="unavailable"),o=this._selects(t,Ji);return!i.length&&!a.length&&o===d?l`<div class="empty">Questo robot non ha una base con funzioni da gestire.</div>`:l`${i.length?l`<div class="sec">Stato della base</div>${i}${n!==null?l`<div class="kv"><span>Asciugatura</span><b>${x(n,0)} %</b></div>`:d}`:d}
      ${a.length?l`<div class="sec">Azioni</div><div class="cmds">${a.map(([r,c,p])=>l`<button class="cmd" @click=${()=>this._press(k(t,`button.${r}`))}><ha-icon icon=${p}></ha-icon>${c}</button>`)}</div>`:d}
      ${o===d?d:l`<div class="sec">Impostazioni della base</div>${o}`}`}_tabMaint(t){let i=me(t,this.hass.states);return i.length?l`<div class="sec">Consumabili</div>
      ${i.map(n=>l`<div class="cons">
        <div class="ctop"><span>${n.label}</span><b class=${n.low?"bad":""}>${n.pct===null?"\u2013":`${x(n.pct,0)} %`}${n.hoursLeft!==null?l` <span class="mut">· ${x(n.hoursLeft,n.hoursLeft<10?1:0)} h</span>`:d}</b></div>
        <div class="bbar wide"><i class=${n.low?"low":""} style=${`width:${Math.min(100,Math.max(0,n.pct??0))}%`}></i></div>
        ${n.reset?l`<button class=${this._confirm===n.key?"btn s warn":"btn s"} @click=${()=>{this._confirm===n.key?(this._press(n.reset),this._confirm=""):this._confirm=n.key}}>${this._confirm===n.key?"Tocca ancora per confermare":"Segna come sostituito"}</button>`:d}
      </div>`)}
      <div class="hint">Segna come sostituito solo dopo aver cambiato o pulito il pezzo: il contatore riparte da 100 %.</div>`:l`<div class="empty">Questo robot non comunica lo stato dei consumabili.</div>`}_tabOther(t){let i=ts.map(([_,z])=>{let h=k(t,`switch.${_}`),g=this._st(h);if(!g||g.state==="unavailable")return d;let L=g.state==="on";return l`<div class="row"><span class="rl">${z}</span>
        <button class=${L?"sw on":"sw"} role="switch" aria-checked=${L?"true":"false"} aria-label=${z} @click=${()=>this._toggle(h,!L)}><span class="knob"></span></button></div>`}).filter(_=>_!==d),n=k(t,"number.volume"),a=W(this.hass.states,n),o=[V(this.hass,k(t,"time.dnd_start")),V(this.hass,k(t,"time.dnd_end"))].filter(Boolean),r=_=>W(this.hass.states,k(t,`sensor.${_}`)),c=r("cleaning_count"),p=r("total_cleaned_area"),f=r("total_cleaning_time"),u=k(t,"sensor.cleaning_history"),v=this._st(u),y=v&&v.state&&!["unknown","unavailable"].includes(v.state)?Date.parse(v.state):NaN,$=Date.parse(this._st(k(t,"sensor.first_cleaning_date"))?.state??""),w=_=>new Date(_).toLocaleDateString("it-IT",{day:"numeric",month:"short",year:"numeric"});return l`${i.length?l`<div class="sec">Opzioni</div>${i}`:d}
      ${o.length===2?l`<div class="hint">Non disturbare: dalle ${o[0]?.slice(0,5)} alle ${o[1]?.slice(0,5)}.</div>`:d}
      ${a!==null&&n?l`<div class="sec">Volume della voce</div>
        <div class="vol"><ha-icon icon="mdi:volume-low"></ha-icon><input type="range" min="0" max="100" step="5" .value=${String(a)} aria-label="Volume" @change=${_=>void this._call("number","set_value",{entity_id:n,value:Number(_.target.value)})} /><ha-icon icon="mdi:volume-high"></ha-icon><b>${x(a,0)}</b></div>`:d}
      ${c!==null||p!==null||f!==null?l`<div class="sec">Statistiche</div>
          ${c!==null?l`<div class="kv"><span>Pulizie fatte</span><b>${x(c,0)}</b></div>`:d}
          ${p!==null?l`<div class="kv"><span>Superficie pulita</span><b>${x(p,0)} m²</b></div>`:d}
          ${f!==null?l`<div class="kv"><span>Tempo di pulizia</span><b>${x(f/60,1)} h</b></div>`:d}
          ${Number.isNaN(y)?d:l`<div class="kv"><span>Ultima pulizia</span><b>${w(y)}</b></div>`}
          ${Number.isNaN($)?d:l`<div class="kv"><span>Prima pulizia</span><b>${w($)}</b></div>`}`:d}
      ${i.length===0&&c===null&&a===null?l`<div class="empty">Nessuna opzione disponibile per questo robot.</div>`:d}`}render(){let t=this._robot;if(!t)return d;let i=this._tab==="stanze"?this._tabRooms(t):this._tab==="base"?this._tabBase(t):this._tab==="manutenzione"?this._tabMaint(t):this._tab==="altro"?this._tabOther(t):this._tabControl(t);return l`
      <div class="backdrop" @click=${n=>n.target===n.currentTarget&&this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Gestisci ${t.name}`}>
          <div class="head"><div class="title">${t.name}</div><button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button></div>
          <div class="tabs" role="tablist">${Qi.map(n=>l`<button role="tab" aria-selected=${this._tab===n.key?"true":"false"} class=${this._tab===n.key?"tab on":"tab"} @click=${()=>this._tab=n.key}><ha-icon icon=${n.icon}></ha-icon>${n.label}</button>`)}</div>
          <div class="body">${this._error?l`<div class="err">${this._error}</div>`:d}${i}</div>
        </div>
      </div>`}static{this.styles=[Y,I`
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
      .cmd:disabled { opacity: 0.5; cursor: default; }
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
    `]}};m([S({attribute:!1})],O.prototype,"hass",2),m([S({attribute:!1})],O.prototype,"info",2),m([S()],O.prototype,"openKey",2),m([b()],O.prototype,"_tab",2),m([b()],O.prototype,"_rooms",2),m([b()],O.prototype,"_repeats",2),m([b()],O.prototype,"_confirm",2),m([b()],O.prototype,"_error",2);customElements.get("elettro-robot-dialog")||customElements.define("elettro-robot-dialog",O);var Q=class extends C{constructor(){super(...arguments);this._config={type:"custom:elettrodomestici-card"};this._info=null;this._error="";this._now=Date.now();this._loadedAt=0;this._loading=!1;this._syncers=new Set}setConfig(t){this._config={...t},this._info=null,this._loadedAt=0}getCardSize(){return 4}getGridOptions(){return{columns:12,min_columns:4}}static getStubConfig(){return{type:"custom:elettrodomestici-card"}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}},{name:"columns",selector:{number:{min:0,max:8,step:1,mode:"box"}}}],computeLabel:t=>t.name==="title"?"Titolo":t.name==="columns"?"Colonne (0 = automatico)":t.name}}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>this._now=Date.now(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._tick&&window.clearInterval(this._tick)}willUpdate(){for(let t of this._syncers)t()}updated(){this.hass&&!this._loading&&(!this._info||Date.now()-this._loadedAt>5*6e4)&&this._loadInfo()}async _loadInfo(){this._loading=!0;try{let t={type:"elettrodomestici/info"};this._config.entry_id&&(t.entry_id=this._config.entry_id),this._info=await this.hass.callWS(t),this._error=""}catch(t){let i=t instanceof Error?t.message:t?.message??String(t);this._error=`Elettrodomestici non configurato o integrazione non caricata (${i}).`}finally{this._loadedAt=Date.now(),this._loading=!1}}async _open(t,i=""){if(!this._info)return;for(;this._loading;)await new Promise(o=>setTimeout(o,50));if(await this._loadInfo(),!this._info)return;let n=document.createElement(t);n.hass=this.hass,n.info=this._info,n.openKey=i,n.addEventListener("open-dialog",o=>{let r=o.detail;this._open(r.tag,r.key)}),n.addEventListener("saved",()=>{this._loadedAt=0,this._loadInfo()}),document.body.appendChild(n);let a=()=>{n.isConnected&&(n.hass=this.hass)};this._syncers.add(a),n.addEventListener("closed",()=>this._syncers.delete(a))}_ack(t){this.hass.callWS({type:"elettrodomestici/action",entry_id:this._info?.entry_id,key:t,action:"acknowledge"})}_robotCall(t,i,n){this.hass.callService(t,i,{entity_id:n})}_robotTile(t,i){let n=i.room||i.area!==null||i.minutes!==null?[i.room,i.area!==null?`${x(i.area,0)} m\xB2`:"",i.minutes!==null?`${x(i.minutes,0)} min`:""].filter(Boolean).join(" \xB7 "):i.charging?"In carica":"";return l`
      <div class="tile ${i.tone}">
        <button class="main" aria-label=${`Gestisci ${i.name}`} @click=${()=>void this._open("elettro-robot-dialog",t.key)}>
          <span class="img">${et(it("aspirapolvere",i.state))}</span>
          <span class="info">
            <span class="n">${i.name}</span>
            <span class="badge ${i.tone}">${i.statusLine}</span>
            <span class="pw ${i.activity==="cleaning"?"on":""}">${i.battery===null?"\u2013":l`${i.charging?l`<ha-icon icon="mdi:lightning-bolt"></ha-icon>`:d}${x(i.battery,0)} %`}</span>
            <span class="row">${n||"Batteria"}</span>
          </span>
        </button>
        ${i.lowConsumables.length?l`<div class="warn"><ha-icon icon="mdi:wrench-clock"></ha-icon>Da sostituire o pulire: ${i.lowConsumables.join(", ")}</div>`:d}
        <div class="acts">
          ${i.canPause?l`<button class="a" @click=${()=>this._robotCall("vacuum","pause",t.entity)}><ha-icon icon="mdi:pause"></ha-icon>Pausa</button>`:d}
          ${i.canStart?l`<button class="a ok" @click=${()=>this._robotCall("vacuum","start",t.entity)}><ha-icon icon="mdi:play"></ha-icon>${i.activity==="paused"?"Riprendi":"Avvia"}</button>`:d}
          ${i.canHome?l`<button class="a" @click=${()=>this._robotCall("vacuum","return_to_base",t.entity)}><ha-icon icon="mdi:home-import-outline"></ha-icon>Base</button>`:d}
          <button class="a" aria-label=${`Gestisci ${i.name}`} @click=${()=>void this._open("elettro-robot-dialog",t.key)}><ha-icon icon="mdi:tune-variant"></ha-icon>Gestisci</button>
        </div>
      </div>`}_tile(t){return l`
      <div class="tile ${t.tone}">
        <button class="main" aria-label=${`Statistiche di ${t.name}`} @click=${()=>void this._open("elettro-stats-dialog",t.key)}>
          <span class="img">${et(it(t.type,t.state))}</span>
          <span class="info">
            <span class="n">${t.name}</span>
            <span class="badge ${t.tone}">${t.statusLine}</span>
            <span class="pw ${t.state==="in_funzione"?"on":""}">${G(t.power)}</span>
            <span class="row">${t.state==="in_funzione"&&t.cycleKwh!==null?l`Questo ciclo <b>${P(t.cycleKwh)}</b> · ${N(t.cycleEur)}`:l`Oggi <b>${P(t.todayKwh)}</b> · ${N(t.todayEur)}`}</span>
            <span class="row">${t.todayCycles===1?"1 ciclo oggi":`${x(t.todayCycles)} cicli oggi`}${t.state==="in_funzione"&&t.cycleKwh!==null?l` · oggi ${P(t.todayKwh)}`:d}</span>
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
      </div>`}render(){if(!this.hass)return d;let t=this._config.title??this._info?.title??"Elettrodomestici";if(this._error&&!this._info)return l`<ha-card><div class="pad"><div class="title">${t}</div><div class="errbox">${this._error}</div></div></ha-card>`;if(!this._info)return l`<ha-card><div class="pad"><div class="title">${t}</div><div class="muted">Carico…</div></div></ha-card>`;let i=Array.isArray(this._config.appliances)?this._config.appliances:null,a=(i?this._info.appliances.filter(c=>i.includes(c.key)):this._info.appliances).map(c=>Nt(c,this.hass.states,this._info?.types,this._now)),o=(this._info.robots??[]).filter(c=>!i||i.includes(c.key)),r=l`<div class="grid" style=${`grid-template-columns:${je(this._config.columns)}`}>${a.map(c=>this._tile(c))}${o.map(c=>this._robotTile(c,Ot(c,this.hass)))}</div>`;return this._config.header===!1?l`<ha-card><div class="pad compact">${r}</div></ha-card>`:l`
      <ha-card>
        <div class="pad">
          <div class="head">
            <div>
              <div class="title">${t}</div>
              <div class="sum">${Be(a)}</div>
            </div>
            <button class="ib" aria-label="Preferenze" @click=${()=>void this._open("elettro-settings-dialog")}><ha-icon icon="mdi:cog"></ha-icon></button>
          </div>
          ${a.length+o.length===0?l`<button class="empty" @click=${()=>void this._open("elettro-settings-dialog")}><ha-icon icon="mdi:plus-circle-outline"></ha-icon>Aggiungi il primo elettrodomestico</button>`:r}
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
  `}};m([S({attribute:!1})],Q.prototype,"hass",2),m([b()],Q.prototype,"_config",2),m([b()],Q.prototype,"_info",2),m([b()],Q.prototype,"_error",2),m([b()],Q.prototype,"_now",2);customElements.get("elettrodomestici-card")||customElements.define("elettrodomestici-card",Q);window.customCards=window.customCards||[];window.customCards.push({type:"elettrodomestici-card",name:"Elettrodomestici",description:"Lavatrice, lavastoviglie, asciugatrice, forno, frigorifero, microonde e robot aspirapolvere: stato, consumi, costi, statistiche, grafici e controllo."});console.info("%c ELETTRODOMESTICI %c v0.4.0 ","color: white; background: #0f766e; font-weight: 700;","color: #0f766e; background: white; font-weight: 700;");export{Q as ElettrodomesticiCard};
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
