var Li=Object.defineProperty;var Hi=Object.getOwnPropertyDescriptor;var m=(n,i,t,e)=>{for(var s=e>1?void 0:e?Hi(i,t):i,a=n.length-1,o;a>=0;a--)(o=n[a])&&(s=(e?o(i,t,s):o(s))||s);return e&&s&&Li(i,t,s),s};var Bt=globalThis,Kt=Bt.ShadowRoot&&(Bt.ShadyCSS===void 0||Bt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol(),De=new WeakMap,At=class{constructor(i,t,e){if(this._$cssResult$=!0,e!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=t}get styleSheet(){let i=this.o,t=this.t;if(Kt&&i===void 0){let e=t!==void 0&&t.length===1;e&&(i=De.get(t)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),e&&De.set(t,i))}return i}toString(){return this.cssText}},We=n=>new At(typeof n=="string"?n:n+"",void 0,oe),R=(n,...i)=>{let t=n.length===1?n[0]:i.reduce((e,s,a)=>e+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[a+1],n[0]);return new At(t,n,oe)},Be=(n,i)=>{if(Kt)n.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of i){let e=document.createElement("style"),s=Bt.litNonce;s!==void 0&&e.setAttribute("nonce",s),e.textContent=t.cssText,n.appendChild(e)}},re=Kt?n=>n:n=>n instanceof CSSStyleSheet?(i=>{let t="";for(let e of i.cssRules)t+=e.cssText;return We(t)})(n):n;var{is:Ni,defineProperty:Pi,getOwnPropertyDescriptor:Oi,getOwnPropertyNames:Ui,getOwnPropertySymbols:qi,getPrototypeOf:ji}=Object,Ft=globalThis,Ke=Ft.trustedTypes,Di=Ke?Ke.emptyScript:"",Wi=Ft.reactiveElementPolyfillSupport,Et=(n,i)=>n,zt={toAttribute(n,i){switch(i){case Boolean:n=n?Di:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,i){let t=n;switch(i){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Vt=(n,i)=>!Ni(n,i),Fe={attribute:!0,type:String,converter:zt,reflect:!1,useDefault:!1,hasChanged:Vt};Symbol.metadata??=Symbol("metadata"),Ft.litPropertyMetadata??=new WeakMap;var V=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,t=Fe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(i,t),!t.noAccessor){let e=Symbol(),s=this.getPropertyDescriptor(i,e,t);s!==void 0&&Pi(this.prototype,i,s)}}static getPropertyDescriptor(i,t,e){let{get:s,set:a}=Oi(this.prototype,i)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){let r=s?.call(this);a?.call(this,o),this.requestUpdate(i,r,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Fe}static _$Ei(){if(this.hasOwnProperty(Et("elementProperties")))return;let i=ji(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(Et("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Et("properties"))){let t=this.properties,e=[...Ui(t),...qi(t)];for(let s of e)this.createProperty(s,t[s])}let i=this[Symbol.metadata];if(i!==null){let t=litPropertyMetadata.get(i);if(t!==void 0)for(let[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let s=this._$Eu(t,e);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let t=[];if(Array.isArray(i)){let e=new Set(i.flat(1/0).reverse());for(let s of e)t.unshift(re(s))}else i!==void 0&&t.push(re(i));return t}static _$Eu(i,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(i.set(e,this[e]),delete this[e]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Be(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,t,e){this._$AK(i,e)}_$ET(i,t){let e=this.constructor.elementProperties.get(i),s=this.constructor._$Eu(i,e);if(s!==void 0&&e.reflect===!0){let a=(e.converter?.toAttribute!==void 0?e.converter:zt).toAttribute(t,e.type);this._$Em=i,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(i,t){let e=this.constructor,s=e._$Eh.get(i);if(s!==void 0&&this._$Em!==s){let a=e.getPropertyOptions(s),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:zt;this._$Em=s;let r=o.fromAttribute(t,a.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(i,t,e,s=!1,a){if(i!==void 0){let o=this.constructor;if(s===!1&&(a=this[i]),e??=o.getPropertyOptions(i),!((e.hasChanged??Vt)(a,t)||e.useDefault&&e.reflect&&a===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,e))))return;this.C(i,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,t,{useDefault:e,reflect:s,wrapped:a},o){e&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,o??t??this[i]),a!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||e||(t=void 0),this._$AL.set(i,t)),s===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[s,a]of e){let{wrapped:o}=a,r=this[s];o!==!0||this._$AL.has(s)||r===void 0||this.C(s,void 0,a,r)}}let i=!1,t=this._$AL;try{i=this.shouldUpdate(t),i?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw i=!1,this._$EM(),e}i&&this._$AE(t)}willUpdate(i){}_$AE(i){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(i){}firstUpdated(i){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[Et("elementProperties")]=new Map,V[Et("finalized")]=new Map,Wi?.({ReactiveElement:V}),(Ft.reactiveElementVersions??=[]).push("2.1.2");var me=globalThis,Ve=n=>n,Gt=me.trustedTypes,Ge=Gt?Gt.createPolicy("lit-html",{createHTML:n=>n}):void 0,ti="$lit$",Z=`lit$${Math.random().toFixed(9).slice(2)}$`,ei="?"+Z,Bi=`<${ei}>`,lt=document,Tt=()=>lt.createComment(""),Ct=n=>n===null||typeof n!="object"&&typeof n!="function",fe=Array.isArray,Ki=n=>fe(n)||typeof n?.[Symbol.iterator]=="function",le=`[ 	
\f\r]`,Mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ye=/-->/g,Qe=/>/g,ot=RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xe=/'/g,Je=/"/g,ii=/^(?:script|style|textarea|title)$/i,ge=n=>(i,...t)=>({_$litType$:n,strings:i,values:t}),l=ge(1),C=ge(2),Un=ge(3),G=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ze=new WeakMap,rt=lt.createTreeWalker(lt,129);function ni(n,i){if(!fe(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ge!==void 0?Ge.createHTML(i):i}var Fi=(n,i)=>{let t=n.length-1,e=[],s,a=i===2?"<svg>":i===3?"<math>":"",o=Mt;for(let r=0;r<t;r++){let c=n[r],p,u,h=-1,_=0;for(;_<c.length&&(o.lastIndex=_,u=o.exec(c),u!==null);)_=o.lastIndex,o===Mt?u[1]==="!--"?o=Ye:u[1]!==void 0?o=Qe:u[2]!==void 0?(ii.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=ot):u[3]!==void 0&&(o=ot):o===ot?u[0]===">"?(o=s??Mt,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,p=u[1],o=u[3]===void 0?ot:u[3]==='"'?Je:Xe):o===Je||o===Xe?o=ot:o===Ye||o===Qe?o=Mt:(o=ot,s=void 0);let g=o===ot&&n[r+1].startsWith("/>")?" ":"";a+=o===Mt?c+Bi:h>=0?(e.push(p),c.slice(0,h)+ti+c.slice(h)+Z+g):c+Z+(h===-2?r:g)}return[ni(n,a+(n[t]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),e]},Rt=class n{constructor({strings:i,_$litType$:t},e){let s;this.parts=[];let a=0,o=0,r=i.length-1,c=this.parts,[p,u]=Fi(i,t);if(this.el=n.createElement(p,e),rt.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=rt.nextNode())!==null&&c.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(ti)){let _=u[o++],g=s.getAttribute(h).split(Z),$=/([.?@])?(.*)/.exec(_);c.push({type:1,index:a,name:$[2],strings:g,ctor:$[1]==="."?de:$[1]==="?"?pe:$[1]==="@"?ue:bt}),s.removeAttribute(h)}else h.startsWith(Z)&&(c.push({type:6,index:a}),s.removeAttribute(h));if(ii.test(s.tagName)){let h=s.textContent.split(Z),_=h.length-1;if(_>0){s.textContent=Gt?Gt.emptyScript:"";for(let g=0;g<_;g++)s.append(h[g],Tt()),rt.nextNode(),c.push({type:2,index:++a});s.append(h[_],Tt())}}}else if(s.nodeType===8)if(s.data===ei)c.push({type:2,index:a});else{let h=-1;for(;(h=s.data.indexOf(Z,h+1))!==-1;)c.push({type:7,index:a}),h+=Z.length-1}a++}}static createElement(i,t){let e=lt.createElement("template");return e.innerHTML=i,e}};function gt(n,i,t=n,e){if(i===G)return i;let s=e!==void 0?t._$Co?.[e]:t._$Cl,a=Ct(i)?void 0:i._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(n),s._$AT(n,t,e)),e!==void 0?(t._$Co??=[])[e]=s:t._$Cl=s),s!==void 0&&(i=gt(n,s._$AS(n,i.values),s,e)),i}var ce=class{constructor(i,t){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:t},parts:e}=this._$AD,s=(i?.creationScope??lt).importNode(t,!0);rt.currentNode=s;let a=rt.nextNode(),o=0,r=0,c=e[0];for(;c!==void 0;){if(o===c.index){let p;c.type===2?p=new It(a,a.nextSibling,this,i):c.type===1?p=new c.ctor(a,c.name,c.strings,this,i):c.type===6&&(p=new he(a,this,i)),this._$AV.push(p),c=e[++r]}o!==c?.index&&(a=rt.nextNode(),o++)}return rt.currentNode=lt,s}p(i){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(i,e,t),t+=e.strings.length-2):e._$AI(i[t])),t++}},It=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,t,e,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=i,this._$AB=t,this._$AM=e,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,t=this._$AM;return t!==void 0&&i?.nodeType===11&&(i=t.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,t=this){i=gt(this,i,t),Ct(i)?i===d||i==null||i===""?(this._$AH!==d&&this._$AR(),this._$AH=d):i!==this._$AH&&i!==G&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Ki(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==d&&Ct(this._$AH)?this._$AA.nextSibling.data=i:this.T(lt.createTextNode(i)),this._$AH=i}$(i){let{values:t,_$litType$:e}=i,s=typeof e=="number"?this._$AC(i):(e.el===void 0&&(e.el=Rt.createElement(ni(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===s)this._$AH.p(t);else{let a=new ce(s,this),o=a.u(this.options);a.p(t),this.T(o),this._$AH=a}}_$AC(i){let t=Ze.get(i.strings);return t===void 0&&Ze.set(i.strings,t=new Rt(i)),t}k(i){fe(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,s=0;for(let a of i)s===t.length?t.push(e=new n(this.O(Tt()),this.O(Tt()),this,this.options)):e=t[s],e._$AI(a),s++;s<t.length&&(this._$AR(e&&e._$AB.nextSibling,s),t.length=s)}_$AR(i=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);i!==this._$AB;){let e=Ve(i).nextSibling;Ve(i).remove(),i=e}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},bt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,t,e,s,a){this.type=1,this._$AH=d,this._$AN=void 0,this.element=i,this.name=t,this._$AM=s,this.options=a,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=d}_$AI(i,t=this,e,s){let a=this.strings,o=!1;if(a===void 0)i=gt(this,i,t,0),o=!Ct(i)||i!==this._$AH&&i!==G,o&&(this._$AH=i);else{let r=i,c,p;for(i=a[0],c=0;c<a.length-1;c++)p=gt(this,r[e+c],t,c),p===G&&(p=this._$AH[c]),o||=!Ct(p)||p!==this._$AH[c],p===d?i=d:i!==d&&(i+=(p??"")+a[c+1]),this._$AH[c]=p}o&&!s&&this.j(i)}j(i){i===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},de=class extends bt{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===d?void 0:i}},pe=class extends bt{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==d)}},ue=class extends bt{constructor(i,t,e,s,a){super(i,t,e,s,a),this.type=5}_$AI(i,t=this){if((i=gt(this,i,t,0)??d)===G)return;let e=this._$AH,s=i===d&&e!==d||i.capture!==e.capture||i.once!==e.once||i.passive!==e.passive,a=i!==d&&(e===d||s);s&&this.element.removeEventListener(this.name,this,e),a&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},he=class{constructor(i,t,e){this.element=i,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(i){gt(this,i)}};var Vi=me.litHtmlPolyfillSupport;Vi?.(Rt,It),(me.litHtmlVersions??=[]).push("3.3.3");var si=(n,i,t)=>{let e=t?.renderBefore??i,s=e._$litPart$;if(s===void 0){let a=t?.renderBefore??null;e._$litPart$=s=new It(i.insertBefore(Tt(),a),a,void 0,t??{})}return s._$AI(n),s};var be=globalThis,T=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=si(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};T._$litElement$=!0,T.finalized=!0,be.litElementHydrateSupport?.({LitElement:T});var Gi=be.litElementPolyfillSupport;Gi?.({LitElement:T});(be.litElementVersions??=[]).push("4.2.2");var Yi={attribute:!0,type:String,converter:zt,reflect:!1,hasChanged:Vt},Qi=(n=Yi,i,t)=>{let{kind:e,metadata:s}=t,a=globalThis.litPropertyMetadata.get(s);if(a===void 0&&globalThis.litPropertyMetadata.set(s,a=new Map),e==="setter"&&((n=Object.create(n)).wrapped=!0),a.set(t.name,n),e==="accessor"){let{name:o}=t;return{set(r){let c=i.get.call(this);i.set.call(this,r),this.requestUpdate(o,c,n,!0,r)},init(r){return r!==void 0&&this.C(o,void 0,n,r),r}}}if(e==="setter"){let{name:o}=t;return function(r){let c=this[o];i.call(this,r),this.requestUpdate(o,c,n,!0,r)}}throw Error("Unsupported decorator location: "+e)};function A(n){return(i,t)=>typeof t=="object"?Qi(n,i,t):((e,s,a)=>{let o=s.hasOwnProperty(a);return s.constructor.createProperty(a,e),o?Object.getOwnPropertyDescriptor(s,a):void 0})(n,i,t)}function b(n){return A({...n,state:!0,attribute:!1})}var ai={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Xt=n=>(...i)=>({_$litDirective$:n,values:i}),Qt=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,t,e){this._$Ct=i,this._$AM=t,this._$Ci=e}_$AS(i,t){return this.update(i,t)}update(i,t){return this.render(...t)}};var ct=class extends Qt{constructor(i){if(super(i),this.it=d,i.type!==ai.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(i){if(i===d||i==null)return this._t=void 0,this.it=i;if(i===G)return i;if(typeof i!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(i===this.it)return this._t;this.it=i;let t=[i];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};ct.directiveName="unsafeHTML",ct.resultType=1;var zs=Xt(ct);var Lt=class extends ct{};Lt.directiveName="unsafeSVG",Lt.resultType=2;var tt=Xt(Lt);var dt="#e4e7ec",z="#c3c9d3",pt="#9aa3b2",Jt="#1d2b3b",Xi=`<style>
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
</style>`;function Ht(n,i,t){return`<circle cx="${i}" cy="${t}" r="3" fill="${n==="in_funzione"?"#f59e0b":n==="terminato"?"#16a34a":n==="non_disponibile"?"#dc2626":"#7b8494"}"${n==="in_funzione"?' class="bl"':""}/>`}function Zt(n,i,t,e){let s=n==="in_funzione"||n==="terminato",a=n==="terminato"?"#4ade80":"#fbbf24";return`<rect x="${i}" y="${t}" width="${e}" height="9" rx="2" fill="${s?"#10161d":"#2a3340"}"/>`+(s?`<rect x="${i+3}" y="${t+3.5}" width="${e*(n==="terminato"?.7:.45)}" height="2" rx="1" fill="${a}"${n==="in_funzione"?' class="bl"':""}/>`:"")}function ri(n,i=120){return`<rect x="12" y="8" width="96" height="${i}" rx="9" fill="${dt}" stroke="${z}" stroke-width="2"/>
  <rect x="12" y="8" width="96" height="22" rx="9" fill="${pt}" opacity=".35"/>
  ${Zt(n,20,14,38)}${Ht(n,70,18)}
  <circle cx="86" cy="18" r="6" fill="#f4f5f7" stroke="${z}"/><line x1="86" y1="18" x2="86" y2="13.5" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round"/>`}function oi(n,i){let t=n==="in_funzione",e=i?"#fb923c":"#60a5fa",s=i?"#f9a8d4":"#93c5fd",o=`<g class="${t?"sp":""}"><circle cx="60" cy="82" r="24" fill="${Jt}"/>
    <path d="M44 82 a16 16 0 0 1 32 0 z" fill="${t?e:n==="terminato"?"#86efac":"#3b4a5c"}" opacity=".55"/>
    <circle cx="52" cy="76" r="6" fill="${s}" opacity="${t?.95:.55}"/><circle cx="68" cy="86" r="7" fill="${i?"#fde68a":"#bfdbfe"}" opacity="${t?.95:.5}"/><circle cx="58" cy="92" r="4" fill="${s}" opacity="${t?.9:.5}"/></g>`,r=i&&t?'<g class="fl" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round"><path d="M44 52c-3 3 3 4 0 8"/><path d="M60 52c-3 3 3 4 0 8"/><path d="M76 52c-3 3 3 4 0 8"/></g>':"",c=!i&&t?'<g fill="#fff" opacity=".7"><circle class="bl" cx="50" cy="94" r="2"/><circle class="bl" cx="64" cy="98" r="1.6"/><circle class="bl" cx="72" cy="90" r="2"/></g>':"";return`${ri(n)}
  <circle cx="60" cy="82" r="32" fill="#f4f5f7" stroke="${z}" stroke-width="3"/><circle cx="60" cy="82" r="28" fill="#aeb6c3"/>
  ${o}${c}${r}
  <path d="M40 66 a28 28 0 0 1 28 -9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
  ${n==="terminato"?'<circle cx="60" cy="82" r="14" fill="#16a34a" opacity=".92"/><path d="M53 82l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>':""}`}function Ji(n){let i=n==="in_funzione",t=i?'<g fill="#7dd3fc"><circle class="dr" cx="40" cy="62" r="2"/><circle class="dr" cx="56" cy="60" r="2" style="animation-delay:.3s"/><circle class="dr" cx="72" cy="62" r="2" style="animation-delay:.6s"/><circle class="dr" cx="86" cy="60" r="2" style="animation-delay:.9s"/></g>':"";return`${ri(n)}
  <rect x="22" y="40" width="76" height="70" rx="5" fill="${i?"#1a3b57":Jt}" stroke="${z}" stroke-width="2"/>
  <g stroke="#7b8ba0" stroke-width="2" opacity=".85"><line x1="30" y1="58" x2="90" y2="58"/><line x1="30" y1="80" x2="90" y2="80"/></g>
  <g fill="#cbd5e1" opacity=".9"><rect x="34" y="62" width="9" height="16" rx="2"/><rect x="50" y="62" width="9" height="16" rx="2"/><rect x="66" y="62" width="9" height="16" rx="2"/><rect x="42" y="84" width="14" height="16" rx="3"/><rect x="62" y="84" width="14" height="16" rx="3"/></g>
  ${t}
  <rect x="38" y="112" width="44" height="6" rx="3" fill="#f4f5f7" stroke="${z}"/>
  ${i?'<g class="fl" opacity=".35"><rect x="22" y="40" width="76" height="70" rx="5" fill="#7dd3fc"/></g>':""}
  ${n==="terminato"?'<circle cx="60" cy="75" r="14" fill="#16a34a" opacity=".92"/><path d="M53 75l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>':""}`}function Zi(n){let i=n==="in_funzione",t=i?'<rect x="24" y="50" width="72" height="50" rx="4" fill="#f97316" opacity=".3" class="fl"/>':"",e=i?"#fb923c":"#4b5563";return`<rect x="12" y="8" width="96" height="124" rx="9" fill="${dt}" stroke="${z}" stroke-width="2"/>
  <rect x="12" y="8" width="96" height="30" rx="9" fill="${pt}" opacity=".35"/>
  ${Zt(n,46,13,28)}${Ht(n,82,18)}
  <g fill="#f4f5f7" stroke="${z}"><circle cx="26" cy="22" r="6"/><circle cx="94" cy="22" r="6"/></g>
  <rect x="20" y="44" width="80" height="64" rx="5" fill="#2a3340" stroke="${z}" stroke-width="2"/>
  <rect x="24" y="50" width="72" height="50" rx="4" fill="#161d26"/>${t}
  <g stroke="${e}" stroke-width="2.2" stroke-linecap="round" ${i?'class="fl"':""}><path d="M30 56h60"/><path d="M30 94h60"/></g>
  <g stroke="#7b8ba0" stroke-width="1.6" opacity=".9"><line x1="30" y1="70" x2="90" y2="70"/><line x1="30" y1="82" x2="90" y2="82"/></g>
  <rect x="26" y="114" width="68" height="6" rx="3" fill="#f4f5f7" stroke="${z}"/>
  ${n==="in_funzione"?'<g fill="none" stroke="#fb923c" stroke-width="1.6" stroke-linecap="round" class="fl"><path d="M44 36c-3 3 3 4 0 8"/><path d="M60 36c-3 3 3 4 0 8"/><path d="M76 36c-3 3 3 4 0 8"/></g>':""}`}function tn(n){let i=n==="in_funzione";return`<rect x="26" y="6" width="68" height="128" rx="8" fill="${dt}" stroke="${z}" stroke-width="2"/>
  <line x1="26" y1="50" x2="94" y2="50" stroke="${z}" stroke-width="2.4"/>
  ${i?'<g class="sw" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"><path d="M60 24v22M49 30l22 10M71 30L49 40"/><circle cx="60" cy="35" r="2.4" fill="#38bdf8" stroke="none"/></g>':'<g stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity=".6"><path d="M60 26v18M51 31l18 8M69 31L51 39"/></g>'}
  <rect x="32" y="22" width="6" height="22" rx="3" fill="#8b95a3"/><rect x="32" y="58" width="6" height="40" rx="3" fill="#8b95a3"/>
  ${Zt(n,52,60,34)}${Ht(n,80,80)}
  <rect x="48" y="94" width="38" height="32" rx="4" fill="${pt}" opacity=".22"/>
  ${i?'<g fill="#38bdf8" opacity=".9"><circle class="bl" cx="56" cy="104" r="1.8"/><circle class="bl" cx="70" cy="112" r="1.8" style="animation-delay:.4s"/><circle class="bl" cx="78" cy="102" r="1.8" style="animation-delay:.8s"/></g>':""}
  <rect x="34" y="132" width="52" height="3" rx="1.5" fill="${z}"/>`}function en(n){let i=n==="in_funzione";return`<rect x="8" y="34" width="104" height="72" rx="8" fill="${dt}" stroke="${z}" stroke-width="2"/>
  <rect x="16" y="42" width="62" height="56" rx="5" fill="${i?"#3b2f12":Jt}" stroke="${z}" stroke-width="2"/>
  ${i?'<rect x="18" y="44" width="58" height="52" rx="4" fill="#fbbf24" opacity=".42" class="fl"/>':""}
  <g class="${i?"sp":""}"><ellipse cx="47" cy="88" rx="22" ry="5" fill="#cbd5e1" opacity=".9"/><rect x="38" y="74" width="18" height="12" rx="3" fill="${i?"#fcd34d":"#94a3b8"}"/></g>
  <rect x="84" y="42" width="20" height="56" rx="4" fill="${pt}" opacity=".35"/>
  ${Zt(n,86,46,16)}${Ht(n,94,64)}
  <circle cx="94" cy="80" r="7" fill="#f4f5f7" stroke="${z}"/><line x1="94" y1="80" x2="94" y2="75" stroke="#6b7280" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="14" y="106" width="8" height="5" rx="2" fill="#7b8494"/><rect x="98" y="106" width="8" height="5" rx="2" fill="#7b8494"/>
  `}function nn(n){let i=n==="in_funzione",t=n==="non_disponibile"?"#dc2626":i?"#f59e0b":"#7b8494";return`<rect x="14" y="96" width="92" height="30" rx="10" fill="${dt}" stroke="${z}" stroke-width="2"/>
  <rect x="22" y="104" width="76" height="8" rx="4" fill="${pt}" opacity=".3"/>
  <circle cx="30" cy="119" r="3" fill="${t}"${i?' class="bl"':""}/>
  <g class="${i?"sw":""}">
    <circle cx="60" cy="56" r="40" fill="${dt}" stroke="${z}" stroke-width="2.4"/>
    <circle cx="60" cy="56" r="33" fill="#f4f5f7" stroke="${z}" stroke-width="1.4"/>
    <circle cx="60" cy="42" r="9" fill="${Jt}" stroke="${z}" stroke-width="2"/>
    <circle cx="60" cy="42" r="3.2" fill="${t}"${i?' class="bl"':""}/>
    <path d="M40 66q20 12 40 0" fill="none" stroke="${pt}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    <rect x="52" y="73" width="16" height="5" rx="2.5" fill="${t}" opacity=".85"/>
  </g>
  <g class="${i?"sp":""}" stroke="#8b95a3" stroke-width="2.2" stroke-linecap="round"><path d="M22 92l-8 8M22 92l-9-4M22 92l1-10"/></g>
  ${i?'<g fill="#38bdf8" opacity=".8"><circle class="bl" cx="98" cy="86" r="2"/><circle class="bl" cx="104" cy="74" r="2" style="animation-delay:.5s"/><circle class="bl" cx="94" cy="68" r="2" style="animation-delay:1s"/></g>':""}`}function sn(n){let i=n==="in_funzione";return`<rect x="14" y="14" width="92" height="92" rx="16" fill="${dt}" stroke="${z}" stroke-width="2.4"/>
  <circle cx="60" cy="60" r="38" fill="#f4f5f7" stroke="${z}" stroke-width="1.6"/>
  <g class="${i?"sp":""}" fill="${i?"#38bdf8":"#94a3b8"}" opacity=".95">
    <path d="M60 60C52 44 56 30 60 24c4 6 8 20 0 36z"/><path d="M60 60c16-8 30-4 36 0-6 4-20 8-36 0z"/>
    <path d="M60 60c8 16 4 30 0 36-4-6-8-20 0-36z"/><path d="M60 60C44 68 30 64 24 60c6-4 20-8 36 0z"/>
  </g>
  <circle cx="60" cy="60" r="6" fill="${z}"/>
  <rect x="24" y="112" width="72" height="14" rx="7" fill="${pt}" opacity=".3"/>
  ${Ht(n,96,118)}`}function et(n,i){let t=n==="lavatrice"?oi(i,!1):n==="asciugatrice"?oi(i,!0):n==="lavastoviglie"?Ji(i):n==="forno"?Zi(i):n==="frigorifero"?tn(i):n==="aspirapolvere"?nn(i):n==="umidostato"?sn(i):en(i),e=i==="non_disponibile"?' opacity=".45"':"";return`<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${n} ${i.replace("_"," ")}">${Xi}<g${e}>${t}</g></svg>`}var ci=["lavatrice","lavastoviglie","asciugatrice","forno","frigorifero","microonde","aspirapolvere","umidostato"],_e={lavatrice:"mdi:washing-machine",lavastoviglie:"mdi:dishwasher",asciugatrice:"mdi:tumble-dryer",forno:"mdi:stove",frigorifero:"mdi:fridge",microonde:"mdi:microwave",aspirapolvere:"mdi:robot-vacuum",umidostato:"mdi:fan"},_t={lavatrice:"Lavatrice",lavastoviglie:"Lavastoviglie",asciugatrice:"Asciugatrice",forno:"Forno",frigorifero:"Frigorifero",microonde:"Microonde",aspirapolvere:"Aspirapolvere",umidostato:"Umidostato"},an=["spento","in_funzione","terminato","non_disponibile"],yt={spento:"Spento",in_funzione:"In funzione",terminato:"Terminato",non_disponibile:"Non disponibile"},it={spento:"#6b7280",in_funzione:"#f59e0b",terminato:"#16a34a",non_disponibile:"transparent"},on={spento:"off",in_funzione:"run",terminato:"done",non_disponibile:"bad"};function di(n){return an.includes(String(n))?n:"non_disponibile"}function vt(n){if(n==null||n===""||n==="unknown"||n==="unavailable")return null;let i=Number(n);return Number.isFinite(i)?i:null}function w(n,i=0){return n==null||!Number.isFinite(n)?"\u2013":n.toFixed(i).replace(".",",")}var P=n=>n==null?"\u2013":`${w(n,n<10?2:1)} kWh`,U=n=>n==null?"\u2013":`${w(n,2)} \u20AC`,nt=n=>n==null?"\u2013":`${w(n,n%1&&n<100?1:0)} W`;function L(n){let i=Math.max(0,Math.round(n));if(i<60)return`${i} s`;let t=Math.round(i/60);return t<60?`${t} min`:`${Math.floor(t/60)} h ${String(t%60).padStart(2,"0")} min`}function ye(n){return n<3600?`${Math.round(n/60)} min`:`${w(n/3600,1)} h`}var $e=["dom","lun","mar","mer","gio","ven","sab"],pi=["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],ht=n=>`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}`;function $t(n){let i=new Date(n);return`${$e[i.getDay()]} ${i.getDate()} ${pi[i.getMonth()]}, ${ht(i)}`}function xe(n){let i=new Date(`${n}T12:00:00`);return`${$e[i.getDay()]} ${i.getDate()} ${pi[i.getMonth()]}`}function we(n){let i=n?Date.parse(n):NaN;return Number.isNaN(i)?"\u2013":ht(new Date(i))}function rn(n,i){let t=i[n.entities.stato??""];if(!t)return{snap:n,state:n.state};let e=t.attributes,s={...n};for(let o of Object.keys(e))o in n&&e[o]!==void 0&&(s[o]=e[o]);let a=t.state==="unavailable"||t.state==="unknown"?"non_disponibile":di(t.state);return{snap:s,state:a}}function ke(n){if(!n)return null;let i=vt(n.state);return i===null?null:String(n.attributes.unit_of_measurement??"W").toLowerCase()==="kw"?i*1e3:i}function ln(n,i){if(!n||n.state==="unavailable"||n.state==="unknown"||n.state==="")return"non disponibile";if(n.attributes.device_class==="timestamp"){let s=Date.parse(n.state);if(!Number.isNaN(s)){let a=(s-i)/1e3;return a>0?`alle ${ht(new Date(s))} (tra ${L(a)})`:`alle ${ht(new Date(s))}`}}if(n.state==="on")return"s\xEC";if(n.state==="off")return"no";let t=n.attributes.unit_of_measurement,e=vt(n.state);return e!==null&&typeof t=="string"&&t?t==="min"||t==="s"||t==="h"?`${w(e,e%1?1:0)} ${t}`:`${w(e,e%1?2:0)} ${t}`:n.state.replace(/_/g," ")}function cn(n,i,t){return n.extras.map(e=>{let s=i[e.entity],a=typeof s?.attributes.friendly_name=="string"?s.attributes.friendly_name:e.entity;return{label:e.label||a,value:ln(s,t),entity:e.entity}})}var dn={running:"In funzione",paused:"In pausa","delayed start":"Avvio ritardato","end of cycle":"Ciclo terminato",off:"Spenta",idle:"Pronta","ready to start":"Pronta",alarm:"Allarme"},pn={dry:"Asciugatura",cool:"Raffreddamento",anticrease:"Antipiega",unavailable:""},un={cottons:"Cotone",synthetics:"Sintetici",delicates:"Delicati",wool:"Lana",silk:"Seta",outdoor:"Outdoor",eco:"Cotone Eco","rapid 3kg":"Rapido 3 kg",sportwear:"Sportivo",traininggear:"Abbigliamento sportivo","soccer rugby":"Calcio e rugby",skiinggear:"Sci",duvet:"Piumone",curtains:"Tende",pillow:"Cuscini",towels:"Asciugamani",pethair:"Cuccia animali","easyiron td":"Facile stiratura",allergen:"Anti-allergie",jeans:"Jeans",baby:"Baby",linen:"Lino",dryingrack:"A tempo",mixcare:"Misti",hygiene:"Igiene","down jacket":"Piumino",bedlinenplus:"Biancheria letto",oneitemfast:"Un capo veloce"},te=["","unknown","unavailable","none"],ut=n=>n.trim().toLowerCase().replace(/_/g," ");function hn(n){let i=ut(n),t=i.includes(" pr ")?i.slice(i.lastIndexOf(" pr ")+4):i;return un[t]??t.replace(/^./,e=>e.toUpperCase())}function mn(n,i){let t=n.maker_entities;if(!n.maker||!t||!t.stato)return null;let e=k=>t[k]?i[t[k]]:void 0,s=e("stato"),a=e("connessione"),o=!!s&&!te.includes(ut(s.state))&&a?.state!=="off",r={connected:!1,active:!1,paused:!1,stato:"",fase:"",programma:"",rimanenteS:null,porta:""};if(!o||!s)return r;let c=ut(s.state),p=k=>{let x=e(k);return x&&!te.includes(ut(x.state))?x.state:""},u=p("fase"),h=e("rimanente"),_=null;if(h&&!te.includes(ut(h.state))){let k=vt(h.state);if(k!==null&&k>0){let x=String(h.attributes.unit_of_measurement??"min").toLowerCase();_=x==="s"?k:x==="h"?k*3600:k*60}}let g=e("porta"),$=["running","paused","delayed start"].includes(c);return{connected:!0,active:$,paused:c==="paused",stato:dn[c]??s.state,fase:u?pn[ut(u)]??u:"",programma:p("programma")?hn(p("programma")):"",rimanenteS:$?_:null,porta:g&&!te.includes(ut(g.state))?g.state==="on"?"aperto":"chiuso":""}}function fn(n,i){if(!i)return[];let t=n.maker?n.maker.charAt(0).toUpperCase()+n.maker.slice(1):"Costruttore";if(!i.connected)return[{label:t,value:"apparecchio spento o non collegato",entity:""}];let e=[{label:"Stato",value:i.stato,entity:""}];return i.programma&&e.push({label:"Programma",value:i.programma,entity:""}),i.porta&&e.push({label:"Sportello",value:i.porta,entity:""}),e}function ie(n,i,t,e){let s=rn(n,i),a=s.snap,o=mn(n,i),r=s.state;o?.active&&r==="spento"&&(r="in_funzione");let c=ke(i[n.entity]),p=t?.[n.type],u=p?.has_finished??["lavatrice","lavastoviglie","asciugatrice"].includes(n.type),h=a.inizio?Date.parse(a.inizio):NaN,_=r==="in_funzione"&&!Number.isNaN(h)?Math.max(0,(e-h)/1e3):null,g=yt[r],$=a.fase;if(r==="spento")$=p?.off_label??"Spento",g=$;else if(r==="in_funzione"){let f=o?.active?[o.paused?"In pausa":o.fase||a.fase,o.programma].filter(Boolean).join(" \xB7 "):a.fase;g=_!==null?`${f} \xB7 da ${L(_)}`:f}else if(r==="terminato"){let f=a.fine?Date.parse(a.fine):NaN;g=`${a.fase}${Number.isNaN(f)?"":` \xB7 finito alle ${ht(new Date(f))}`}`}let k=null,x="",E="";return r==="in_funzione"&&u&&a.fasi.length>1&&a.fase_indice!==null&&(k=Math.min(1,(a.fase_indice+.5)/a.fasi.length),x=`Fase ${a.fase_indice+1} di ${a.fasi.length}`),r==="in_funzione"&&a.stima_rimanente_s!==null&&(E=`fine stimata fra circa ${L(a.stima_rimanente_s)}`),r==="in_funzione"&&o?.active&&o.rimanenteS!==null&&(E=`fine fra ${L(o.rimanenteS)}`,_!==null&&(k=Math.min(1,_/(_+o.rimanenteS)),x=o.fase||x)),{key:n.key,name:n.name,type:n.type,state:r,tone:on[r],statusLine:g,phase:$,power:c,progress:k,progressLabel:x,todayKwh:a.oggi_kwh,todayEur:a.oggi_eur,todayCycles:a.oggi_cicli,cycleKwh:a.energia_ciclo,cycleEur:a.costo_ciclo,maintPct:a.manutenzione_pct,maintDue:a.manutenzione_pct!==null&&a.manutenzione_pct>=100,extras:[...fn(n,o),...cn(n,i,e)],canAck:r==="terminato",remainingText:E}}function gn(n){let i=Math.round(Number(n));return Number.isFinite(i)&&i>=1?Math.min(i,8):null}var bn=260;function ui(n,i=0){let t=Se(i,n);return t===null?"repeat(auto-fill, minmax(min(300px, 100%), 1fr))":`repeat(${t}, minmax(0, 1fr))`}function Se(n,i){let t=gn(i);return t===null?null:n>0?Math.max(1,Math.min(t,Math.floor((n+12)/(bn+12)))):t}function hi(n,i,t){let e=Math.max(1,i);return(t?1:0)+Math.max(1,Math.ceil(n/e))*3}function mi(n){if(n.length===0)return"Nessun elettrodomestico: aggiungine uno dalla configurazione della scheda.";let i=n.filter(a=>a.state==="in_funzione"),t=n.filter(a=>a.state==="terminato"),e=n.reduce((a,o)=>a+(o.power??0),0),s=[];return i.length&&s.push(`${i.length} in funzione (${i.map(a=>a.name).join(", ")})`),t.length&&s.push(`${t.map(a=>a.name).join(", ")} da svuotare`),s.length||s.push("tutto fermo"),`${s.join(" \xB7 ")} \xB7 ${nt(e)} in totale`}function fi(n,i){return n.slice(-i).reduce((e,s)=>({kwh:e.kwh+s.kwh,eur:e.eur+s.eur,cycles:e.cycles+s.cycles,sec:e.sec+s.sec}),{kwh:0,eur:0,cycles:0,sec:0})}var Ae={kwh:"Energia",eur:"Costo",cycles:"Cicli",sec:"Funzionamento"};function Ee(n,i){return n==="kwh"?P(i):n==="eur"?U(i):n==="cycles"?`${w(i,0)} ${i===1?"ciclo":"cicli"}`:ye(i)}function ze(n,i,t,e,s){let a=vn(t||e.label),o=a;for(let r=2;s.includes(o);r++)o=`${a}_${r}`;return{id:o,type:n,name:t||e.label,entity:i,energy_entity:null,start_w:e.start_w,stop_w:e.stop_w,start_delay:e.start_delay,end_delay:e.end_delay,min_cycle:e.min_cycle,heat_w:e.heat_w,maint_cycles:e.maint_cycles,alert_minutes:e.alert_minutes,notify:e.notify,extras:[],maker:null,maker_device:null,...e.humidistat?{fan_entity:null,hum:{...e.hum}}:{}}}function vn(n){return n.normalize("NFKD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"elettrodomestico"}var gi=/^[a-z_]+\.[a-z0-9_]+$/;function _n(n){let i=n.hum;return!n.entity.startsWith("sensor.")||!gi.test(n.entity)?`${n.name}: scegli il sensore di umidit\xE0 (un'entit\xE0 sensor.\u2026).`:!n.fan_entity||!/^(switch|fan|light|input_boolean)\.[a-z0-9_]+$/.test(n.fan_entity)?`${n.name}: scegli il ventilatore (switch, fan, light o input_boolean).`:i?n.light_entity&&!/^(light|switch|input_boolean|binary_sensor)\.[a-z0-9_]+$/.test(n.light_entity)?`${n.name}: la luce del bagno non \xE8 valida (light, switch, input_boolean o binary_sensor).`:n.light_entity&&n.light_entity===n.fan_entity?`${n.name}: la luce e il ventilatore devono essere diversi.`:n.light_entity&&!(i.light_max>=1)?`${n.name}: il tempo massimo con la luce deve essere di almeno 1 minuto.`:i.on_above>i.off_below?i.max_on>0&&i.min_on>i.max_on?`${n.name}: il tempo minimo di accensione non pu\xF2 superare quello massimo.`:null:`${n.name}: la soglia di accensione deve essere pi\xF9 alta di quella di spegnimento.`:null}function Me(n){let i=new Set;for(let t of n){if(t.type==="umidostato"){let s=_n(t);if(s)return s;if(i.has(t.entity))return`${t.name}: questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.`;i.add(t.entity);continue}let e=t.type==="aspirapolvere";if(!gi.test(t.entity)||e&&!t.entity.startsWith("vacuum."))return e?`${t.name}: scegli il robot (un'entit\xE0 vacuum.\u2026).`:`${t.name}: scegli il sensore di potenza della presa.`;if(i.has(t.entity))return`${t.name}: questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.`;if(i.add(t.entity),t.stop_w>t.start_w)return`${t.name}: la soglia di spegnimento non pu\xF2 superare quella di avvio.`}return null}function W(n,i,t=[]){let e=[];for(let[s,a]of Object.entries(n)){if(t.includes(s)||!i(s,a))continue;let o=a.attributes.friendly_name;e.push({id:s,name:typeof o=="string"?o:s})}return e.sort((s,a)=>s.name.localeCompare(a.name,"it")).slice(0,1500)}var Te=(n,i=[])=>W(n,(t,e)=>t.startsWith("sensor.")&&(e.attributes.device_class==="power"||["W","kW"].includes(String(e.attributes.unit_of_measurement))),i),Ce=n=>W(n,(i,t)=>i.startsWith("sensor.")&&(t.attributes.device_class==="energy"||["Wh","kWh","MWh"].includes(String(t.attributes.unit_of_measurement)))),Re=(n,i=[])=>W(n,t=>t.startsWith("vacuum."),i),bi=(n,i=[])=>W(n,t=>/^(sensor|binary_sensor|select|input_select|input_text|number|text|climate)\./.test(t),i),Ie=(n,i=[])=>W(n,(t,e)=>t.startsWith("sensor.")&&(e.attributes.device_class==="humidity"||/umid|humid/.test(t)),i),vi=(n,i=[])=>W(n,t=>/^(light|switch|input_boolean|binary_sensor)\./.test(t),i),_i=(n,i=[])=>W(n,(t,e)=>t.startsWith("sensor.")&&(e.attributes.device_class==="temperature"||["\xB0C","\xB0F"].includes(String(e.attributes.unit_of_measurement))),i),Le=n=>W(n,i=>/^(switch|fan|light|input_boolean)\./.test(i)),yi=n=>W(n,i=>i.startsWith("counter.")),$i=n=>W(n,i=>i.startsWith("binary_sensor.")),ve={lavatrice:/lavatrice|lavaggio|washing/,lavastoviglie:/lavastov|dishwasher/,asciugatrice:/asciugatr|dryer/,forno:/forno|oven/,frigorifero:/frigo|fridge/,microonde:/micro/,aspirapolvere:/^$/,umidostato:/^$/};function xi(n,i){let t=Object.keys(n),e=t.find(a=>a.startsWith("counter.")&&ve[i].test(a)&&/cicl/.test(a))??t.find(a=>a.startsWith("counter.")&&ve[i].test(a))??"",s=t.find(a=>a.startsWith("binary_sensor.")&&/_status$/.test(a)&&ve[i].test(a))??"";return{counter:e,status:s}}var wi=n=>W(n,i=>i.startsWith("sensor."));function xt(n,i){let t=n[i]?.attributes.friendly_name;return typeof t=="string"?t:i}function ki(n){return Object.keys(n?.notify??{}).filter(i=>i!=="send_message"&&i!=="persistent_notification").sort().map(i=>`notify.${i}`)}function yn(n){if(n==null)return null;if(typeof n=="number")return n<1e11?n*1e3:n;let i=Date.parse(n);return Number.isNaN(i)?null:i}function Si(n){return yn(n.lu??n.last_updated??n.lc??n.last_changed)}function Nt(n){let i=[];for(let t of n??[]){let e=Si(t),s=t.s??t.state;if(e===null||s===void 0||s===""||s==="unavailable"||s==="unknown")continue;let a=Number(s);Number.isFinite(a)&&i.push({t:e,v:a})}return i.sort((t,e)=>t.t-e.t)}function Pt(n,i,t){let e=[];for(let c of n??[]){let p=Si(c),u=c.s??c.state;p!==null&&u!==void 0&&e.push({t:p,s:di(u)})}e.sort((c,p)=>c.t-p.t);let s=null;for(let c of e)if(c.t<=i)s=c.s;else break;let a=[],o=i;for(let c of e)c.t<=i||c.t>=t||(s!==null&&a.push({from:o,to:c.t,state:s}),o=c.t,s=c.s);s!==null&&o<t&&a.push({from:o,to:t,state:s});let r=[];for(let c of a){let p=r[r.length-1];p&&p.state===c.state&&p.to===c.from?p.to=c.to:r.push({...c})}return r}function Ot(n,i){for(let t of n)if(i>=t.from&&i<t.to)return t.state;return null}function Ut(n,i,t,e,s=3*3600*1e3){let a=new Array(e).fill(null);if(e<=0||t<=i)return a;let o=(t-i)/e,r=0,c=null,p=0;for(let u=0;u<e;u++){let h=i+u*o,_=h+o;for(;r<n.length&&n[r].t<=h;)c=n[r].v,p=n[r].t,r++;let g=0,$=0,k=h,x=c,E=p,f=D=>{if(x===null)return;let mt=Math.min(D,E+s)-k;mt>0&&(g+=x*mt,$+=mt)},y=r;for(;y<n.length&&n[y].t<_;)f(n[y].t),k=n[y].t,x=n[y].v,E=n[y].t,y++;f(_),a[u]=$>0?g/$:null}return a}function $n(n){let i=Math.pow(10,Math.floor(Math.log10(n))),t=n/i;return(t<=1?1:t<=2?2:t<=2.5?2.5:t<=5?5:10)*i}function wt(n,i,t=5){if(!Number.isFinite(n)||!Number.isFinite(i))return{min:0,max:1,ticks:[0,1]};i-n<1e-9&&(n-=1,i+=1);let e=$n((i-n)/Math.max(1,t-1)),s=Math.floor(n/e+1e-9)*e,a=Math.ceil(i/e-1e-9)*e,o=[];for(let r=s;r<=a+e*1e-6;r+=e)o.push(Math.round(r/e)*e);return{min:s,max:a,ticks:o}}function qt(n,i,t=6){let e=(i-n)/36e5,s=[1,2,3,6,12,24,48].find(r=>e/r<=t)??48,a=new Date(n);a.setMinutes(0,0,0),s>=24?a.setHours(0):a.setHours(Math.ceil(a.getHours()/s)*s);let o=[];for(let r=a.getTime();r<=i;r+=s*36e5){if(r<n)continue;let c=new Date(r),p=c.getHours()===0;o.push({t:r,major:p,label:e>30&&p?`${$e[c.getDay()]} ${c.getDate()}`:ht(c)})}return o}function jt(n,i,t){let e="",s=!1;for(let a=0;a<n.length;a++){let o=n[a];if(o===null){s=!1;continue}e+=`${s?"L":"M"}${i(a).toFixed(1)} ${t(o).toFixed(1)}`,s=!0}return e}var xn=["cleaning","docked","idle","paused","returning","error"],li={cleaning:"In pulizia",docked:"Alla base",idle:"Fermo",paused:"In pausa",returning:"Torna alla base",error:"Errore",unavailable:"Non disponibile"};function S(n,i){return n.robot_entities?.[i]??""}function He(n){let i=n.replace(/_/g," ").trim();return i.charAt(0).toUpperCase()+i.slice(1)}function Q(n,i,t){let e=i?n?.states[i]:void 0;if(!e||["unknown","unavailable",""].includes(e.state))return"";let s=t??e.state;if(n?.formatEntityState)try{return n.formatEntityState(e,t)}catch{}return He(s)}function Y(n,i){let t=i?n[i]:void 0;return t?vt(t.state):null}var wn=[{key:"main_brush_left",label:"Spazzola principale",time:"main_brush_time_left",reset:"reset_main_brush"},{key:"side_brush_left",label:"Spazzola laterale",time:"side_brush_time_left",reset:"reset_side_brush"},{key:"filter_left",label:"Filtro",time:"filter_time_left",reset:"reset_filter"},{key:"sensor_dirty_left",label:"Sensori",time:"sensor_dirty_time_left",reset:"reset_sensor"},{key:"wheel_dirty_left",label:"Ruote",time:"wheel_dirty_time_left",reset:"reset_wheel"}];function Ne(n,i){let t=[];for(let e of wn){let s=S(n,`sensor.${e.key}`);if(!s)continue;let a=Y(i,s);t.push({key:e.key,label:e.label,pct:a,hoursLeft:Y(i,S(n,`sensor.${e.time}`)),reset:S(n,`button.${e.reset}`),low:a!==null&&a<=10})}return t}function Ai(n,i){let t=n?.attributes.rooms;if(!t||typeof t!="object")return[];let e=t,s=e[i]??Object.values(e)[0];return Array.isArray(s)?s.filter(a=>!!a&&typeof a=="object"&&typeof a.id=="number").map(a=>({id:a.id,name:String(a.name??`Stanza ${a.id}`),icon:typeof a.icon=="string"?a.icon:"mdi:floor-plan"})):[]}function Ei(n,i,t,e){let s=Math.min(3,Math.max(1,Math.round(t)||1));if(!e||n.length===0)return{label:"Pulisci tutta la casa",segments:null,repeats:1};let a=i.filter((p,u)=>n.some(h=>h.id===p)&&i.indexOf(p)===u),o=s>1?` \xB7 ${s} passate`:"";if(a.length===0)return{label:`Pulisci tutta la casa${o}`,segments:s>1?n.map(p=>p.id):null,repeats:s};let r=a.map(p=>n.find(u=>u.id===p)?.name??"");return{label:`Pulisci ${r.length===1?r[0]:r.length===2?`${r[0]} e ${r[1]}`:`${r.length} stanze`}${o}`,segments:a,repeats:s}}function zi(n){let i=n?.attributes.shortcuts;return!i||typeof i!="object"?[]:Object.values(i).filter(t=>t&&typeof t.id=="number").map(t=>({id:t.id,name:String(t.name??`Scorciatoia ${t.id}`),running:t.running===!0}))}function kt(n,i){let t=i.states,s=t[n.entity]?.state??"unavailable",a=xn.includes(s)?s:"unavailable",o=a==="cleaning"||a==="returning"||a==="paused",r=S(n,"sensor.error"),c=r?t[r]:void 0,p=c&&c.state!=="no_error"&&!["unknown","unavailable"].includes(c.state)?typeof c.attributes.description=="string"&&c.attributes.description?c.attributes.description:Q(i,r):"",u=Y(t,S(n,"sensor.battery_level")),h=S(n,"binary_sensor.charging_state"),_=o?Y(t,S(n,"sensor.cleaned_area")):null,g=o?Y(t,S(n,"sensor.cleaning_time")):null,$=a==="error"||p?"bad":o?"run":"off";return{key:n.key,name:n.name,activity:a,tone:$,state:a==="unavailable"?"non_disponibile":o?"in_funzione":"spento",statusLine:p&&a!=="cleaning"?`${li[a]} \xB7 ${p}`:li[a],battery:u,charging:h?t[h]?.state==="on":!1,room:o?Q(i,S(n,"sensor.current_room")):"",area:_,minutes:g,error:p,lowConsumables:Ne(n,t).filter(k=>k.low).map(k=>k.label),canStart:a==="docked"||a==="idle"||a==="paused",canPause:a==="cleaning"||a==="returning",canStop:o,canHome:a!=="docked"&&a!=="returning"&&a!=="unavailable"}}var kn={tempo_massimo:"limite di tempo",umidita_bassa:"umidit\xE0 scesa",timer_luce:"timer della luce"};function ee(n){let i=Math.max(0,Math.round(n));return i<60?`${i} s`:`${Math.ceil(i/60)} min`}function Mi(n,i,t=0){let e=i.states[n.entity],s=n.fan_entity?i.states[n.fan_entity]:void 0,a=vt(e?.state),o=!s||["unknown","unavailable"].includes(s.state)?null:s.state==="on",r=n.hum,c=r.enabled,p=n.status,u=p.wait_s===null?null:Math.max(0,p.wait_s-Math.max(0,t)),h=a===null||o===null,_,g="";return h?_="Non disponibile":c?o?(_=p.phase==="light"?"Acceso con la luce":"Acceso",p.phase==="light"&&u!==null?g=`${u>0?`tra ${ee(u)}`:"ora"} decide l'umidit\xE0: si spegne se \xE8 sotto ${r.off_below} %`:p.phase==="closing"&&u!==null?g=`si spegne tra ${ee(u)} se resta sotto ${r.off_below} %`:u!==null&&p.until&&(g=`si spegne comunque tra ${ee(u)} (${kn[p.until]??p.until})`)):p.phase==="opening"&&u!==null?(_="In attesa",g=`si accende tra ${ee(u)} se resta sopra ${r.on_above} %`):p.phase==="locked"?(_="Fermo",g=`riparte quando scende sotto ${r.on_above} % e risale`):_="Spento":_=o?"Acceso \xB7 automatico spento":"Spento \xB7 automatico spento",{key:n.key,name:n.name,tone:h?"bad":o?"run":"off",humidity:a,fanOn:o,auto:c,statusLine:_,waitText:g,rule:`Accende sopra ${r.on_above} % \xB7 spegne sotto ${r.off_below} %`,state:h?"non_disponibile":o?"in_funzione":"spento",temperature:n.temp_entity?vt(i.states[n.temp_entity]?.state):null,tempUnit:n.temp_entity&&String(i.states[n.temp_entity]?.attributes?.unit_of_measurement)||"\xB0C"}}var K=R`
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
`;var Sn=[{key:"on_above",label:"Accende sopra",unit:"%",hint:"Umidit\xE0 oltre la quale il ventilatore si accende."},{key:"on_delay",label:"Conferma accensione dopo",unit:"min",hint:"Deve restare sopra la soglia per tutto questo tempo: ignora i picchi brevi (la doccia che inizia). 0 = subito."},{key:"off_below",label:"Spegne sotto",unit:"%",hint:"Deve essere pi\xF9 bassa di quella di accensione: la differenza evita che si accenda e spenga di continuo."},{key:"off_delay",label:"Conferma spegnimento dopo",unit:"min",hint:"Deve restare sotto la soglia per tutto questo tempo. 0 = subito."},{key:"min_on",label:"Acceso almeno",unit:"min",hint:"Non si spegne prima di questo tempo, anche se l'umidit\xE0 scende subito."},{key:"max_on",label:"Si spegne comunque dopo",unit:"min",hint:"Limite di sicurezza. Dopo lo spegnimento riparte solo quando l'umidit\xE0 \xE8 scesa sotto la soglia di accensione e risale. 0 = nessun limite."},{key:"min_off",label:"Resta spento almeno",unit:"min",hint:"Dopo lo spegnimento aspetta questo tempo prima di riaccendersi. 0 = nessuna attesa."}],An={key:"light_max",label:"Con la luce, acceso al massimo",unit:"min",hint:"Il ventilatore parte quando si accende la luce e resta acceso per questo tempo. Alla scadenza, se l'umidit\xE0 \xE8 ancora sopra la soglia di spegnimento, decide la regola dell'umidit\xE0; altrimenti si spegne."},En=[{key:"start_w",label:"Si accende sopra",unit:"W",hint:"Potenza oltre la quale l'elettrodomestico risulta in funzione (pi\xF9 del consumo a riposo)."},{key:"stop_w",label:"Si spegne sotto",unit:"W",hint:"Potenza sotto la quale il ciclo pu\xF2 finire."},{key:"start_delay",label:"Conferma avvio dopo",unit:"s",hint:"Per ignorare i picchi brevi, per esempio quando si preme un tasto."},{key:"end_delay",label:"Conferma fine dopo",unit:"s",hint:"Quanto deve restare sotto la soglia: pi\xF9 lungo di qualsiasi pausa del programma."},{key:"min_cycle",label:"Ignora cicli pi\xF9 brevi di",unit:"s",hint:"I cicli pi\xF9 corti non si contano e non avvisano."},{key:"heat_w",label:"Riscaldamento sopra",unit:"W",hint:"Potenza della resistenza: serve a distinguere le fasi (lavaggio, risciacquo, asciugatura)."}],M=class extends T{constructor(){super(...arguments);this._list=[];this._price="0.30";this._priceEntity="";this._notify=[];this._open="";this._addType="";this._addEntity="";this._addFan="";this._addName="";this._extra="";this._svc="";this._advanced="";this._imp={};this._busy=!1;this._error="";this._okMsg=""}willUpdate(t){t.has("info")&&this.info&&this._init()}_init(){this._list=[...this.info.appliances,...this.info.robots??[],...this.info.humidistats??[]].map(t=>({id:t.id,type:t.type,name:t.name,entity:t.entity,energy_entity:t.energy_entity,start_w:t.start_w,stop_w:t.stop_w,start_delay:t.start_delay,end_delay:t.end_delay,min_cycle:t.min_cycle,heat_w:t.heat_w,maint_cycles:t.maint_cycles,alert_minutes:t.alert_minutes,notify:t.notify,extras:t.extras.map(e=>({...e})),maker:t.maker??null,maker_device:t.maker_device??null,...t.type==="umidostato"?{fan_entity:t.fan_entity??null,light_entity:t.light_entity??null,temp_entity:t.temp_entity??null,hum:t.hum?{...t.hum}:void 0}:{}})),this._price=String(this.info.price_kwh),this._priceEntity=this.info.price_entity,this._notify=[...this.info.notify_services],this._error="",this._okMsg="",this._list.length===0&&(this._addType="lavatrice")}_patch(t,e){this._list=this._list.map(s=>s.id===t?{...s,...e}:s)}_remove(t){this._list=this._list.filter(e=>e.id!==t),this._open===t&&(this._open="")}_reset(t){let e=this.info.types[t.type];this._patch(t.id,{start_w:e.start_w,stop_w:e.stop_w,start_delay:e.start_delay,end_delay:e.end_delay,min_cycle:e.min_cycle,heat_w:e.heat_w})}_humPatch(t,e){this._list=this._list.map(s=>s.id===t&&s.hum?{...s,hum:{...s.hum,...e}}:s)}_add(){let t=this._addType,e=this._addEntity.trim();if(!t)return;let s=this.info.types[t]?.robot===!0;if(this.info.types[t]?.humidistat===!0){let r=this._addFan.trim();if(!/^sensor\.[a-z0-9_]+$/.test(e)){this._error="Scegli dall'elenco il sensore di umidit\xE0 (un'entit\xE0 sensor.\u2026).";return}if(!/^(switch|fan|light|input_boolean)\.[a-z0-9_]+$/.test(r)){this._error="Scegli dall'elenco il ventilatore (un interruttore, un fan, una luce o un input_boolean).";return}if(this._list.some(p=>p.entity===e)){this._error="Questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.";return}let c=ze(t,e,this._addName.trim(),this.info.types[t],this._list.map(p=>p.id));this._list=[...this._list,{...c,fan_entity:r}],this._open=c.id,this._addType="",this._addEntity="",this._addFan="",this._addName="",this._error="";return}if(!/^[a-z_]+\.[a-z0-9_]+$/.test(e)||s&&!e.startsWith("vacuum.")){this._error=s?"Scegli dall'elenco il robot (un'entit\xE0 vacuum.\u2026).":"Scegli dall'elenco il sensore di potenza della presa.";return}if(this._list.some(r=>r.entity===e)){this._error="Questo sensore \xE8 gi\xE0 usato da un altro elettrodomestico.";return}let o=ze(t,e,this._addName.trim(),this.info.types[t],this._list.map(r=>r.id));this._list=[...this._list,o],this._open=o.id,this._addType="",this._addEntity="",this._addName="",this._error=""}async _save(){let t=Me(this._list);if(t){this._error=t;return}let e=Number(this._price.replace(",","."));if(!Number.isFinite(e)||e<0||e>10){this._error="Il prezzo dell'energia deve essere un numero tra 0 e 10 \u20AC/kWh.";return}this._busy=!0,this._error="";try{await this.hass.callWS({type:"elettrodomestici/update",entry_id:this.info.entry_id,appliances:this._list,price_kwh:e,price_entity:this._priceEntity.trim(),notify_services:this._notify}),this._okMsg="Preferenze salvate.",this.dispatchEvent(new CustomEvent("saved"))}catch(s){let a=s instanceof Error?s.message:s?.message??String(s);this._error=`Impossibile salvare: ${a}`}finally{this._busy=!1}}_impState(t){if(!this._imp[t.id]){let e=xi(this.hass.states,t.type);this._imp[t.id]={energy:t.energy_entity??"",counter:e.counter,status:e.status,days:"730",price:"",busy:!1,msg:"",err:!1}}return this._imp[t.id]}_setImp(t,e){this._imp={...this._imp,[t]:{...this._imp[t],...e}}}async _import(t){let e=this._impState(t),s=Number(e.days.replace(",",".")),a=e.price.trim()?Number(e.price.replace(",",".")):void 0;if(!Number.isFinite(s)||s<1||s>3650||a!==void 0&&(!Number.isFinite(a)||a<0||a>10)){this._setImp(t.id,{msg:"Controlla i giorni (1-3650) e il prezzo.",err:!0});return}this._setImp(t.id,{busy:!0,msg:"",err:!1});try{let o=await this.hass.callWS({type:"elettrodomestici/import_history",entry_id:this.info.entry_id,key:t.id,days:s,...e.energy.trim()?{energy_entity:e.energy.trim()}:{},...e.counter.trim()?{counter_entity:e.counter.trim()}:{},...e.status.trim()?{status_entity:e.status.trim()}:{},...a!==void 0?{price:a}:{}}),r=[`${o.days_written} giorni importati`];o.energy_days&&r.push(`${w(o.kwh,1)} kWh`),(o.cycles||o.baseline)&&r.push(`${w(o.cycles+(o.baseline??0))} cicli (${w(o.baseline??0)} precedenti al recorder, solo nel totale)`),o.runtime_days&&r.push(`funzionamento di ${o.runtime_days} giorni`),o.skipped_days&&r.push(`${o.skipped_days} giorni scartati (valori impossibili del contatore)`),this._setImp(t.id,{busy:!1,msg:`${r.join(" \xB7 ")}.`,err:!1}),this.dispatchEvent(new CustomEvent("saved"))}catch(o){let r=o instanceof Error?o.message:o?.message??String(o);this._setImp(t.id,{busy:!1,msg:`Importazione non riuscita: ${r}`,err:!0})}}_importBox(t){let e=this._impState(t),s=this.info.appliances.some(a=>a.id===t.id);return l`
      <button class="adv" aria-expanded=${this._advanced===`imp-${t.id}`?"true":"false"} @click=${()=>this._advanced=this._advanced===`imp-${t.id}`?"":`imp-${t.id}`}>${this._advanced===`imp-${t.id}`?"\u25BE":"\u25B8"} Importa lo storico del vecchio pacchetto</button>
      ${this._advanced===`imp-${t.id}`?l`<div class="impbox">
            ${s?d:l`<div class="hint">Salva prima le preferenze: l'importazione si fa su un elettrodomestico già salvato.</div>`}
            <label class="f">Contatore di energia della presa (kWh)
              <input class="txt" list=${`dl-ie-${t.id}`} placeholder="sensor.…_energia" .value=${e.energy} @input=${a=>this._setImp(t.id,{energy:a.target.value})} />
              <datalist id=${`dl-ie-${t.id}`}>${Ce(this.hass.states).map(a=>l`<option value=${a.id}>${a.name}</option>`)}</datalist>
              <span class="hint">È quello che usava il vecchio pacchetto: le sue statistiche a lungo termine danno l'energia giorno per giorno, anche di anni fa.</span></label>
            <label class="f">Contatore dei cicli (facoltativo)
              <input class="txt" list=${`dl-ic-${t.id}`} placeholder="counter.cicli_…" .value=${e.counter} @input=${a=>this._setImp(t.id,{counter:a.target.value})} />
              <datalist id=${`dl-ic-${t.id}`}>${yi(this.hass.states).map(a=>l`<option value=${a.id}>${a.name}</option>`)}</datalist>
              <span class="hint">I cicli per giorno si ricostruiscono per quanto il recorder conserva; il resto entra nel totale. Vale anche come punto di partenza della manutenzione.</span></label>
            <label class="f">Sensore di stato on/off (facoltativo)
              <input class="txt" list=${`dl-is-${t.id}`} placeholder="binary_sensor.washing_machine_status" .value=${e.status} @input=${a=>this._setImp(t.id,{status:a.target.value})} />
              <datalist id=${`dl-is-${t.id}`}>${$i(this.hass.states).map(a=>l`<option value=${a.id}>${a.name}</option>`)}</datalist>
              <span class="hint">Per le ore di funzionamento, sempre per quanto conserva il recorder.</span></label>
            <div class="two">
              <label class="f">Quanti giorni indietro<span class="numrow"><input class="num" inputmode="numeric" .value=${e.days} @input=${a=>this._setImp(t.id,{days:a.target.value})} /><span class="u">giorni</span></span></label>
              <label class="f">Prezzo per il costo (€/kWh)<span class="numrow"><input class="num" inputmode="decimal" placeholder=${this._price} .value=${e.price} @input=${a=>this._setImp(t.id,{price:a.target.value})} /></span>
                <span class="hint">Vuoto = il prezzo attuale. Il vecchio pacchetto non salvava il costo: si ricalcola.</span></label>
            </div>
            <div class="hint">I giorni già misurati da questa integrazione non vengono toccati. Si può ripetere senza doppioni.</div>
            <button class="btn primary" ?disabled=${!s||e.busy||!e.energy.trim()&&!e.counter.trim()&&!e.status.trim()} @click=${()=>void this._import(t)}>${e.busy?"Importo\u2026":"Importa lo storico"}</button>
            ${e.msg?l`<div class=${e.err?"err":"ok"}>${e.msg}</div>`:d}
          </div>`:d}`}_num(t,e,s,a,o){return l`<label class="f">${s}
      <span class="numrow"><input class="num" inputmode="decimal" .value=${String(t[e])} @change=${r=>{let c=Number(r.target.value.replace(",","."));Number.isFinite(c)&&c>=0?this._patch(t.id,{[e]:c}):r.target.value=String(t[e])}} /><span class="u">${a}</span></span>
      <span class="hint">${o}</span></label>`}_makerBox(t){let e=this.info.makers??[],s=!!t.maker&&!!t.maker_device,a=e.find(o=>o.device_id===t.maker_device);return l`<div class="row"><div class="t"><div class="lab">Usa l'integrazione del costruttore</div>
        <div class="hint">${e.length===0?"Nessun dispositivo Electrolux trovato in Home Assistant (installa e configura l'integrazione Electrolux).":"Stato, fase, programma e tempo rimanente arrivano dall'integrazione Electrolux (solo mentre l'apparecchio \xE8 acceso); consumi e cicli restano quelli della presa."}</div></div>
        <button class=${s?"sw on":"sw"} role="switch" aria-checked=${s?"true":"false"} aria-label="Usa l'integrazione del costruttore" ?disabled=${e.length===0&&!s}
          @click=${()=>s?this._patch(t.id,{maker:null,maker_device:null}):e[0]&&this._patch(t.id,{maker:e[0].maker,maker_device:e[0].device_id})}><span class="knob"></span></button></div>
      ${s?l`<label class="f">Dispositivo
            <select class="txt" @change=${o=>{let r=e.find(c=>c.device_id===o.target.value);r&&this._patch(t.id,{maker:r.maker,maker_device:r.device_id})}}>
              ${e.map(o=>l`<option value=${o.device_id} ?selected=${o.device_id===t.maker_device}>${o.label} · ${o.name}</option>`)}
              ${a?d:l`<option value=${t.maker_device??""} selected>${t.maker_device} (non trovato)</option>`}
            </select></label>`:d}`}_hnum(t,e){let s=t.hum;return l`<label class="f">${e.label}
      <span class="numrow"><input class="num" inputmode="decimal" .value=${String(s[e.key])} @change=${a=>{let o=Number(a.target.value.replace(",","."));Number.isFinite(o)&&o>=0?this._humPatch(t.id,{[e.key]:o}):a.target.value=String(s[e.key])}} /><span class="u">${e.unit}</span></span>
      <span class="hint">${e.hint}</span></label>`}_humEditor(t){let e=t.hum,s=this.hass.states[t.entity],a=t.fan_entity?this.hass.states[t.fan_entity]:void 0,o=this._list.filter(c=>c.id!==t.id).map(c=>c.entity),r=this.info.types[t.type]?.hum;return l`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:water-percent"></ha-icon>Umidità: <b>${xt(this.hass.states,t.entity)}</b> <code>${t.entity}</code> · ora ${s?`${s.state} ${String(s.attributes.unit_of_measurement??"")}`.trim():"non disponibile"}</div>
        <div class="link"><ha-icon icon="mdi:fan"></ha-icon>Ventilatore: <b>${t.fan_entity?xt(this.hass.states,t.fan_entity):"da scegliere"}</b> <code>${t.fan_entity??""}</code> · ora ${a?a.state:"non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${t.name} @change=${c=>this._patch(t.id,{name:c.target.value.trim()||t.name})} /></label>
        <label class="f">Sensore di umidità (%)
          <input class="txt" list=${`dl-hu-${t.id}`} .value=${t.entity} @change=${c=>this._patch(t.id,{entity:c.target.value.trim()})} />
          <datalist id=${`dl-hu-${t.id}`}>${Ie(this.hass.states,o).map(c=>l`<option value=${c.id}>${c.name}</option>`)}</datalist></label>
        <label class="f">Sensore di temperatura (facoltativo)
          <input class="txt" list=${`dl-tp-${t.id}`} placeholder="sensor.…_temperatura" .value=${t.temp_entity??""} @change=${c=>this._patch(t.id,{temp_entity:c.target.value.trim()||null})} />
          <datalist id=${`dl-tp-${t.id}`}>${_i(this.hass.states,[t.entity]).map(c=>l`<option value=${c.id}>${c.name}</option>`)}</datalist>
          <span class="hint">Si mostra sulla scheda e nei grafici; non influisce sulla regola dell'umidità.</span></label>
        <label class="f">Ventilatore da comandare
          <input class="txt" list=${`dl-fn-${t.id}`} .value=${t.fan_entity??""} @change=${c=>this._patch(t.id,{fan_entity:c.target.value.trim()||null})} />
          <datalist id=${`dl-fn-${t.id}`}>${Le(this.hass.states).map(c=>l`<option value=${c.id}>${c.name}</option>`)}</datalist>
          <span class="hint">L'umidostato accende e spegne questa entità da solo. Se l'hai accesa a mano, si spegne con le stesse regole.</span></label>
        <label class="f">Luce del bagno (facoltativa)
          <input class="txt" list=${`dl-lt-${t.id}`} placeholder="light.… o switch.…" .value=${t.light_entity??""} @change=${c=>this._patch(t.id,{light_entity:c.target.value.trim()||null})} />
          <datalist id=${`dl-lt-${t.id}`}>${vi(this.hass.states,[t.fan_entity??""]).map(c=>l`<option value=${c.id}>${c.name}</option>`)}</datalist>
          <span class="hint">Accendendo questa luce il ventilatore parte anche se l'umidità è bassa. Lascia vuoto per usare solo l'umidità.</span></label>
        <div class="row"><div class="t"><div class="lab">Regolazione automatica</div><div class="hint">Spenta, il ventilatore resta com'è e si comanda solo a mano. Si cambia anche dalla scheda.</div></div>
          <button class=${e.enabled?"sw on":"sw"} role="switch" aria-checked=${e.enabled?"true":"false"} aria-label="Regolazione automatica" @click=${()=>this._humPatch(t.id,{enabled:!e.enabled})}><span class="knob"></span></button></div>
        <div class="two">${[...Sn,...t.light_entity?[An]:[]].map(c=>this._hnum(t,c))}</div>
        ${r?l`<button class="btn" @click=${()=>this._humPatch(t.id,{...r,enabled:e.enabled})}>Ripristina i valori predefiniti</button>`:d}
        <button class="btn del" @click=${()=>this._remove(t.id)}>Togli dall'elenco</button>
      </div>`}_robotEditor(t){let e=this.hass.states[t.entity],s=this._list.filter(a=>a.id!==t.id).map(a=>a.entity);return l`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:robot-vacuum"></ha-icon>Robot: <b>${xt(this.hass.states,t.entity)}</b> <code>${t.entity}</code> · ora ${e?e.state:"non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${t.name} @change=${a=>this._patch(t.id,{name:a.target.value.trim()||t.name})} /></label>
        <label class="f">Entità del robot
          <input class="txt" list=${`dl-rb-${t.id}`} .value=${t.entity} @change=${a=>this._patch(t.id,{entity:a.target.value.trim()})} />
          <datalist id=${`dl-rb-${t.id}`}>${Re(this.hass.states,s).map(a=>l`<option value=${a.id}>${a.name}</option>`)}</datalist>
          <span class="hint">Comandi, mappa, stanze, consumabili e base si ricavano da sole dall'integrazione del robot (per ora provata con Dreame).</span></label>
        <button class="btn del" @click=${()=>this._remove(t.id)}>Togli dall'elenco</button>
      </div>`}_editor(t){if(this.info.types[t.type]?.robot)return this._robotEditor(t);if(this.info.types[t.type]?.humidistat&&t.hum)return this._humEditor(t);let e=this.info.types[t.type],s=this.hass.states[t.entity],a=this._list.filter(o=>o.id!==t.id).map(o=>o.entity);return l`
      <div class="ed">
        <div class="link"><ha-icon icon="mdi:power-plug"></ha-icon>Presa: <b>${xt(this.hass.states,t.entity)}</b> <code>${t.entity}</code> · ora ${s?`${s.state} ${String(s.attributes.unit_of_measurement??"")}`.trim():"non disponibile"}</div>
        <label class="f">Nome<input class="txt" .value=${t.name} @change=${o=>this._patch(t.id,{name:o.target.value.trim()||t.name})} /></label>
        <label class="f">Sensore di potenza della presa (W)
          <input class="txt" list=${`dl-pw-${t.id}`} .value=${t.entity} @change=${o=>this._patch(t.id,{entity:o.target.value.trim()})} />
          <datalist id=${`dl-pw-${t.id}`}>${Te(this.hass.states,a).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>
        <label class="f">Contatore di energia della presa (facoltativo)
          <input class="txt" list=${`dl-en-${t.id}`} placeholder="sensor.…_energia" .value=${t.energy_entity??""} @change=${o=>this._patch(t.id,{energy_entity:o.target.value.trim()||null})} />
          <datalist id=${`dl-en-${t.id}`}>${Ce(this.hass.states).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
          <span class="hint">Se manca, l'energia si ricava dalla potenza. Con il contatore della presa è più precisa.</span></label>

        ${this._makerBox(t)}

        <div class="f">Dispositivi collegati (facoltativi)
          <div class="chips">
            ${t.extras.map(o=>l`<span class="tag"><span>${o.label||xt(this.hass.states,o.entity)}</span><button aria-label=${`Togli ${o.entity}`} @click=${()=>this._patch(t.id,{extras:t.extras.filter(r=>r.entity!==o.entity)})}>✕</button></span>`)}
            ${t.extras.length===0?l`<span class="hint">Nessuno</span>`:d}
          </div>
          <div class="addrow">
            <input class="txt" list=${`dl-ex-${t.id}`} placeholder="sensor.programma_asciugatrice" .value=${this._extra} @input=${o=>this._extra=o.target.value} />
            <datalist id=${`dl-ex-${t.id}`}>${bi(this.hass.states,t.extras.map(o=>o.entity)).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
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
        ${this._advanced===t.id?l`<div class="two">${En.filter(o=>o.key!=="heat_w"||e.phases.length>1).map(o=>this._num(t,o.key,o.label,o.unit,o.hint))}</div>
              <button class="btn" @click=${()=>this._reset(t)}>Ripristina i valori predefiniti</button>`:d}
        ${this._importBox(t)}
        <button class="btn del" @click=${()=>this._remove(t.id)}>Togli dall'elenco</button>
      </div>`}render(){if(!this.info)return d;let t=Me(this._list),e=ki(this.hass.services).filter(o=>!this._notify.includes(o)),s=this._list.map(o=>o.entity),a=this._addType?this.info.types[this._addType]:null;return l`
          <div class="body">
            <div class="sec first">Elettrodomestici</div>
            ${this._list.length===0?l`<div class="empty">Nessun elettrodomestico: aggiungine uno qui sotto.</div>`:d}
            ${this._list.map(o=>l`
                <div class="item">
                  <button class="head2" aria-expanded=${this._open===o.id?"true":"false"} @click=${()=>this._open=this._open===o.id?"":o.id}>
                    <ha-icon icon=${_e[o.type]}></ha-icon>
                    <span class="nm">${o.name}<span class="eid">${o.entity}</span></span>
                    <span class="meta">${_t[o.type]}</span>
                    <span class="chev">${this._open===o.id?"\u25BE":"\u25B8"}</span>
                  </button>
                  ${this._open===o.id?this._editor(o):d}
                </div>`)}

            <div class="sec">Aggiungi un elettrodomestico</div>
            <div class="types">
              ${ci.map(o=>l`<button class=${this._addType===o?"type on":"type"} aria-pressed=${this._addType===o?"true":"false"} @click=${()=>this._addType=this._addType===o?"":o}><ha-icon icon=${_e[o]}></ha-icon>${_t[o]}</button>`)}
            </div>
            ${a?l`<div class="addbox">
                  ${a.humidistat?l`<label class="f">Sensore di umidità (%)
                        <input class="txt" list="dl-add" placeholder="sensor.…_umidita" .value=${this._addEntity} @input=${o=>this._addEntity=o.target.value} />
                        <datalist id="dl-add">${Ie(this.hass.states,s).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>
                      <label class="f">Ventilatore da comandare
                        <input class="txt" list="dl-add-fan" placeholder="switch.…" .value=${this._addFan} @input=${o=>this._addFan=o.target.value} />
                        <datalist id="dl-add-fan">${Le(this.hass.states).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>`:a.robot?l`<label class="f">Robot (entità vacuum)
                        <input class="txt" list="dl-add" placeholder="vacuum.…" .value=${this._addEntity} @input=${o=>this._addEntity=o.target.value} />
                        <datalist id="dl-add">${Re(this.hass.states,s).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>`:l`<label class="f">Sensore di potenza della presa (W)
                        <input class="txt" list="dl-add" placeholder="sensor.presa_…_potenza" .value=${this._addEntity} @input=${o=>this._addEntity=o.target.value} />
                        <datalist id="dl-add">${Te(this.hass.states,s).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist></label>`}
                  <label class="f">Nome (facoltativo)<input class="txt" placeholder=${a.label} .value=${this._addName} @input=${o=>this._addName=o.target.value} /></label>
                  ${a.humidistat?l`<div class="hint">Accende il ventilatore quando l'umidità resta sopra ${a.hum?.on_above} % per ${a.hum?.on_delay} min e lo spegne sotto ${a.hum?.off_below} % per ${a.hum?.off_delay} min (massimo ${a.hum?.max_on} min). Tutte le soglie si cambiano dopo.</div>`:a.robot?l`<div class="hint">Sulla scheda compare con stato, batteria e comandi rapidi; toccandolo si apre la gestione completa (stanze, impostazioni, base, consumabili).</div>`:l`<div class="hint">Parte oltre ${a.start_w} W${a.phases.length>1?`, fasi: ${a.phases.join(" \u2192 ")}`:""}${a.has_finished?`, finisce dopo ${L(a.end_delay)} sotto ${a.stop_w} W`:""}. Le soglie si possono cambiare dopo.</div>`}
                  <button class="btn primary" ?disabled=${!this._addEntity.trim()||!!a.humidistat&&!this._addFan.trim()} @click=${()=>this._add()}>Aggiungi ${a.label.toLowerCase()}</button>
                </div>`:d}

            <div class="sec">Costo dell'energia</div>
            <label class="f">Prezzo (€/kWh)
              <input class="num wide" inputmode="decimal" .value=${this._price} @input=${o=>this._price=o.target.value} /></label>
            <label class="f">Oppure un sensore con il prezzo attuale (facoltativo)
              <input class="txt" list="dl-price" placeholder="sensor.prezzo_energia" .value=${this._priceEntity} @input=${o=>this._priceEntity=o.target.value} />
              <datalist id="dl-price">${wi(this.hass.states).map(o=>l`<option value=${o.id}>${o.name}</option>`)}</datalist>
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
            ${this._okMsg?l`<div class="ok">${this._okMsg}</div>`:d}
          </div>
          <div class="foot">
            <button class="btn" @click=${()=>this._init()}>Annulla le modifiche</button>
            <button class="btn primary" ?disabled=${this._busy||!!t} @click=${()=>void this._save()}>Salva preferenze</button>
          </div>`}static{this.styles=[K,R`
      :host { position: static; inset: auto; z-index: auto; display: block; }
      .body { overflow: visible; padding: 0; }
      .foot { position: sticky; bottom: 0; background: var(--card-background-color, #fff); padding: 10px 0; margin-top: 12px; }
      .sec.first { margin-top: 4px; }
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
    `]}};m([A({attribute:!1})],M.prototype,"hass",2),m([A({attribute:!1})],M.prototype,"info",2),m([b()],M.prototype,"_list",2),m([b()],M.prototype,"_price",2),m([b()],M.prototype,"_priceEntity",2),m([b()],M.prototype,"_notify",2),m([b()],M.prototype,"_open",2),m([b()],M.prototype,"_addType",2),m([b()],M.prototype,"_addEntity",2),m([b()],M.prototype,"_addFan",2),m([b()],M.prototype,"_addName",2),m([b()],M.prototype,"_extra",2),m([b()],M.prototype,"_svc",2),m([b()],M.prototype,"_advanced",2),m([b()],M.prototype,"_imp",2),m([b()],M.prototype,"_busy",2),m([b()],M.prototype,"_error",2),m([b()],M.prototype,"_okMsg",2);customElements.get("elettro-prefs-panel")||customElements.define("elettro-prefs-panel",M);var st=class st extends T{constructor(){super(...arguments);this._config={type:"custom:elettrodomestici-card"};this._info=null;this._error="";this._loading=!1;this._reloaded=async()=>{this._info=null,await this._load()}}setConfig(t){this._config={...t}}updated(){this.hass&&!this._info&&!this._loading&&this._load()}async _load(){this._loading=!0;try{let t={type:"elettrodomestici/info"};this._config.entry_id&&(t.entry_id=this._config.entry_id),this._info=await this.hass.callWS(t),this._error=""}catch(t){let e=t instanceof Error?t.message:t?.message??String(t);this._error=`Elettrodomestici non configurato o integrazione non caricata (${e}).`}finally{this._loading=!1}}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_onForm(t){t.stopPropagation();let e=t.detail.value,s={type:this._config.type};this._config.entry_id&&(s.entry_id=this._config.entry_id),typeof e.title=="string"&&e.title.trim()&&(s.title=e.title),e.header===!1&&(s.header=!1);let a=Math.round(Number(e.columns));Number.isFinite(a)&&a>=1&&(s.columns=Math.min(a,8)),Array.isArray(e.appliances)&&e.appliances.length>0&&(s.appliances=e.appliances.map(String)),this._emit(s)}_items(){let t=this._info;return t?[...t.appliances,...t.robots??[],...t.humidistats??[]].map(e=>({value:e.key,label:e.name})):[]}_schema(){let t=[{name:"title",selector:{text:{}}},{name:"header",selector:{boolean:{}}},{name:"columns",selector:{number:{min:0,max:8,step:1,mode:"box"}}}],e=this._items();return e.length>0&&t.push({name:"appliances",selector:{select:{multiple:!0,mode:"list",options:e}}}),t}static _label(t){return{title:"Titolo",header:"Mostra titolo e riepilogo",columns:"Colonne (0 = automatico)",appliances:"Elettrodomestici da mostrare (nessuno = tutti)"}[t.name]??t.name}static _help(t){return{header:"Disattivalo per inserire la scheda dentro un'altra senza intestazione.",columns:"Numero massimo di colonne: si riduce da solo se la scheda \xE8 stretta (vista a sezioni o piccola).",appliances:"Per mostrare solo alcuni elettrodomestici in questa scheda; le dimensioni si regolano dalla scheda \xABLayout\xBB di Home Assistant."}[t.name]??""}render(){if(!this.hass)return d;let t={title:this._config.title??"",header:this._config.header!==!1,columns:this._config.columns??0,appliances:this._config.appliances??[]};return l`
      <div class="wrap">
        <ha-form .hass=${this.hass} .data=${t} .schema=${this._schema()} .computeLabel=${st._label} .computeHelper=${st._help} @value-changed=${e=>this._onForm(e)}></ha-form>
        <div class="sec">Elettrodomestici e preferenze</div>
        <div class="hint">Elenco, sensori, soglie, prezzo dell'energia e notifiche. Sono salvate nell'integrazione (valgono per tutte le schede) e hanno il loro pulsante di salvataggio.</div>
        ${this._error?l`<div class="errbox">${this._error}</div>`:d}
        ${this._info?l`<elettro-prefs-panel .hass=${this.hass} .info=${this._info} @saved=${()=>void this._reloaded()}></elettro-prefs-panel>`:this._error?d:l`<div class="hint">Carico…</div>`}
      </div>`}static{this.styles=R`
    :host { display: block; }
    .wrap { display: flex; flex-direction: column; gap: 4px; color: var(--primary-text-color, #212121); }
    .sec { font-weight: 600; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--secondary-text-color, #727272); margin: 18px 0 2px; }
    .hint { font-size: 0.82rem; color: var(--secondary-text-color, #727272); margin-bottom: 8px; line-height: 1.35; }
    .errbox { margin: 6px 0; padding: 10px; border-radius: 10px; background: rgba(220, 38, 38, 0.1); color: #b91c1c; font-size: 0.88rem; }
  `}};m([A({attribute:!1})],st.prototype,"hass",2),m([b()],st.prototype,"_config",2),m([b()],st.prototype,"_info",2),m([b()],st.prototype,"_error",2);var Pe=st;customElements.get("elettrodomestici-card-editor")||customElements.define("elettrodomestici-card-editor",Pe);var Dt=[{key:"oggi",label:"Oggi"},{key:"ieri",label:"Ieri"},{key:"settimana",label:"Settimana"},{key:"mese",label:"Mese"},{key:"anno",label:"Anno"},{key:"totale",label:"Totale"}],X=class extends T{constructor(){super(...arguments);this.openKey="";this._stats=null;this._error="";this._now=Date.now();this._onKey=t=>{t.key==="Escape"&&this._close()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._tick=window.setInterval(()=>this._now=Date.now(),1e3),this._poll=window.setInterval(()=>void this._load(),6e4),this._load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey),this._tick&&window.clearInterval(this._tick),this._poll&&window.clearInterval(this._poll)}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_go(t){this.dispatchEvent(new CustomEvent("open-dialog",{detail:{tag:t,key:this.openKey}})),this._close()}get _app(){return this.info.appliances.find(t=>t.key===this.openKey)}async _load(){try{let t=await this.hass.callWS({type:"elettrodomestici/stats",entry_id:this.info.entry_id,key:this.openKey});this._stats=t[this.openKey]??null,this._error=""}catch(t){this._error=`Impossibile leggere le statistiche: ${t instanceof Error?t.message:t?.message??String(t)}`}}async _maintDone(){await this.hass.callWS({type:"elettrodomestici/action",entry_id:this.info.entry_id,key:this.openKey,action:"reset_maintenance"}),await this._load()}render(){let t=this._app;if(!t)return d;let e=ie(t,this.hass.states,this.info.types,this._now),s=this.info.types[t.type],a=this._stats,o=!s?.has_finished&&t.type==="frigorifero";return l`
      <div class="backdrop" @click=${r=>r.target===r.currentTarget&&this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Statistiche ${t.name}`}>
          <div class="head">
            <div class="title">${t.name}${t.name!==_t[t.type]?l` <span class="sub">${_t[t.type]}</span>`:d}</div>
            <button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button>
          </div>
          <div class="body">
            <div class="now ${e.tone}">
              <span class="img">${tt(et(t.type,e.state))}</span>
              <div class="nowtxt">
                <div class="st">${yt[e.state]}${e.state==="in_funzione"?l` · <b>${e.phase}</b>`:e.state==="terminato"?l` · <b>${e.phase}</b>`:d}</div>
                <div class="big">${nt(e.power)}</div>
                ${e.state==="in_funzione"&&e.cycleKwh!==null?l`<div class="line">Questo ciclo: <b>${P(e.cycleKwh)}</b> · ${U(e.cycleEur)}${e.remainingText?l` · ${e.remainingText}`:d}</div>`:d}
                ${e.state==="in_funzione"&&t.inizio?l`<div class="line">Partita alle ${we(t.inizio)}</div>`:d}
                ${e.state==="terminato"?l`<div class="line">Finita alle ${we(t.fine)}.</div>`:d}
              </div>
            </div>

            ${e.extras.length?l`<div class="sec">Collegato al dispositivo</div><div class="kv">${e.extras.map(r=>l`<span>${r.label}</span><b>${r.value}</b>`)}</div>`:d}

            <div class="sec">Consumi</div>
            ${a?l`<div class="tblwrap"><table>
                  <thead><tr><th></th>${Dt.map(r=>l`<th>${r.label}</th>`)}</tr></thead>
                  <tbody>
                    <tr><th>Energia</th>${Dt.map(r=>l`<td>${P(a.periods[r.key].kwh)}</td>`)}</tr>
                    <tr><th>Costo</th>${Dt.map(r=>l`<td>${U(a.periods[r.key].eur)}</td>`)}</tr>
                    <tr><th>${o?"Avvii compressore":"Cicli"}</th>${Dt.map(r=>l`<td>${w(a.periods[r.key].cycles)}</td>`)}</tr>
                    <tr><th>Funzionamento</th>${Dt.map(r=>l`<td>${ye(a.periods[r.key].sec)}</td>`)}</tr>
                  </tbody></table></div>
                <div class="hint">Costo calcolato a ${w(a.price_kwh,3)} €/kWh. L'energia comprende anche i consumi a riposo.</div>`:this._error?d:l`<div class="muted">Carico…</div>`}

            ${a?.summary?l`<div class="sec">${o?"Compressore":"Ciclo medio"} <span class="sub">(ultimi ${a.summary.count})</span></div>
                <div class="kv">
                  <span>Durata media</span><b>${L(a.summary.avg_seconds)}</b>
                  <span>Più corto / più lungo</span><b>${L(a.summary.min_seconds)} / ${L(a.summary.max_seconds)}</b>
                  <span>Energia media</span><b>${P(a.summary.avg_kwh)} · ${U(a.summary.avg_eur)}</b>
                  <span>Energia massima</span><b>${P(a.summary.max_kwh)}</b>
                </div>`:d}

            ${s&&t.maint_cycles>0&&a?l`<div class="sec">Manutenzione</div>
                <div class="maint ${a.maintenance.due?"due":""}">
                  <div class="mrow"><span>${s.maint_label}</span><b>${a.maintenance.count} / ${a.maintenance.threshold} cicli</b></div>
                  <div class="bar"><i style="width:${a.maintenance.pct??0}%"></i></div>
                  <button class="btn" @click=${()=>void this._maintDone()}><ha-icon icon="mdi:check"></ha-icon>Manutenzione fatta</button>
                </div>`:d}

            ${a&&a.cycles.length?l`<div class="sec">Ultimi cicli</div>
                <div class="tblwrap"><table class="cyc">
                  <thead><tr><th>Quando</th><th>Durata</th><th>Energia</th><th>Costo</th><th>Picco</th></tr></thead>
                  <tbody>${a.cycles.slice(0,15).map(r=>l`<tr><td>${$t(Date.parse(r.s))}</td><td>${L((Date.parse(r.e)-Date.parse(r.s))/1e3)}</td><td>${P(r.kwh)}</td><td>${U(r.eur)}</td><td>${nt(r.pk)}</td></tr>`)}</tbody>
                </table></div>`:a?l`<div class="sec">Ultimi cicli</div><div class="muted">Nessun ciclo registrato.</div>`:d}

            <div class="sec">Come lo riconosco</div>
            <div class="kv small">
              <span>Presa (potenza)</span><b>${t.entity}</b>
              ${t.energy_entity?l`<span>Presa (energia)</span><b>${t.energy_entity}</b>`:d}
              <span>Parte sopra</span><b>${nt(t.start_w)} per ${t.start_delay} s</b>
              <span>Finisce sotto</span><b>${nt(t.stop_w)} per ${L(t.end_delay)}</b>
              ${s?.phases.length&&s.phases.length>1?l`<span>Fasi</span><b>${s.phases.join(" \u2192 ")}</b>`:d}
              <span>Cicli più brevi di</span><b>${L(t.min_cycle)} non contano</b>
            </div>
            ${this._error?l`<div class="err">${this._error}</div>`:d}
          </div>
          <div class="foot">
            <button class="btn primary" @click=${()=>this._go("elettro-charts-dialog")}><ha-icon icon="mdi:chart-line"></ha-icon>Grafici</button>
          </div>
        </div>
      </div>`}static{this.styles=[K,R`
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
    `]}};m([A({attribute:!1})],X.prototype,"hass",2),m([A({attribute:!1})],X.prototype,"info",2),m([A()],X.prototype,"openKey",2),m([b()],X.prototype,"_stats",2),m([b()],X.prototype,"_error",2),m([b()],X.prototype,"_now",2);customElements.get("elettro-stats-dialog")||customElements.define("elettro-stats-dialog",X);var Oe=[{id:"6h",label:"6 ore",ms:6*36e5},{id:"24h",label:"24 ore",ms:24*36e5},{id:"3d",label:"3 giorni",ms:3*864e5},{id:"7d",label:"7 giorni",ms:7*864e5}],zn=[{id:7,label:"7 giorni"},{id:30,label:"30 giorni"},{id:90,label:"90 giorni"}],B=220,F=10,H=44,Ti=22,ne=12,I=class extends T{constructor(){super(...arguments);this.openKey="";this._tab="potenza";this._range="24h";this._days=30;this._metric="kwh";this._loading=!1;this._error="";this._w=640;this._hover=null;this._values=[];this._segs=[];this._stats=null;this._t0=0;this._t1=0;this._n=240;this._raw=[];this._rawStates=[];this._wrapEl=null;this._seq=0;this._onKey=t=>{t.key==="Escape"&&this._close()}}get _app(){return this.info.appliances.find(t=>t.key===this.openKey)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._timer=window.setInterval(()=>void this._load(),6e4),this._load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey),this._ro?.disconnect(),this._timer&&window.clearInterval(this._timer)}updated(){let t=this.renderRoot.querySelector(".chartwrap");t&&t!==this._wrapEl&&(this._ro?.disconnect(),this._wrapEl=t,this._ro=new ResizeObserver(e=>{let s=Math.floor(e[0]?.contentRect.width??640);s>100&&Math.abs(s-this._w)>2&&(this._w=s,this._recompute())}),this._ro.observe(t))}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}_go(t){this.dispatchEvent(new CustomEvent("open-dialog",{detail:{tag:t,key:this.openKey}})),this._close()}async _history(t,e,s){return this.hass.callWS({type:"history/history_during_period",start_time:new Date(e).toISOString(),end_time:new Date(s).toISOString(),entity_ids:t,include_start_time_state:!0,significant_changes_only:!1,minimal_response:!0,no_attributes:!0})}async _load(){let t=this._app;if(!this.hass||!t)return;let e=++this._seq;this._loading=!0;try{if(this._tab==="consumi"){let s=await this.hass.callWS({type:"elettrodomestici/stats",entry_id:this.info.entry_id,key:t.key});if(e!==this._seq)return;this._stats=s[t.key]??null}else{let s=Oe.find(p=>p.id===this._range)??Oe[1],a=Date.now(),o=a-s.ms,r=t.entities.stato,c=await this._history(r?[t.entity,r]:[t.entity],o,a);if(e!==this._seq)return;this._t0=o,this._t1=a,this._raw=Nt(c[t.entity]),this._rawStates=r?c[r]??[]:[],this._recompute()}this._error=""}catch(s){e===this._seq&&(this._error=`Impossibile leggere i dati: ${s instanceof Error?s.message:s?.message??String(s)}`)}finally{e===this._seq&&(this._loading=!1)}}_recompute(){this._t1&&(this._n=Math.max(60,Math.min(480,Math.floor((this._w-H-8)/2))),this._values=Ut(this._raw,this._t0,this._t1,this._n,30*6e4),this._segs=Pt(this._rawStates,this._t0,this._t1))}_setTab(t){this._tab=t,this._hover=null,this._load()}_setRange(t){this._range=t,this._hover=null,this._load()}_move(t,e,s,a){let o=t.currentTarget.getBoundingClientRect(),r=Math.round((t.clientX-o.left-s)/a*(e-1));this._hover=r>=0&&r<e?r:null}_moveBar(t,e,s,a){let o=t.currentTarget.getBoundingClientRect(),r=Math.floor((t.clientX-o.left-s)/a*e);this._hover=r>=0&&r<e?r:null}_power(t){let e=this._values.filter(f=>f!==null),s=ke(this.hass.states[t.entity]),a=Math.max(t.start_w*1.5,...e.length?e:[0],s??0),o=wt(0,a,5),r=this._w,c=r-H-8,p=F+B+ne+Ti+6,u=f=>H+(this._n<=1?0:f/(this._n-1)*c),h=f=>F+B-(f-o.min)/(o.max-o.min||1)*B,_=f=>H+(f-this._t0)/(this._t1-this._t0||1)*c,g=[{v:t.start_w,c:it.in_funzione,l:"avvio"},...t.stop_w!==t.start_w?[{v:t.stop_w,c:it.spento,l:"fine"}]:[],...t.heat_w<o.max?[{v:t.heat_w,c:"#ef4444",l:"riscaldamento"}]:[]],$=this._hover,k=$!==null&&this._n>1?this._t0+$/(this._n-1)*(this._t1-this._t0):null,x=$!==null?this._values[$]:null,E=k!==null?Ot(this._segs,k):null;return l`
      <div class="ranges">
        ${Oe.map(f=>l`<button class=${f.id===this._range?"chip on":"chip"} @click=${()=>this._setRange(f.id)}>${f.label}</button>`)}
        ${this._loading?l`<span class="load">aggiorno…</span>`:d}
      </div>
      <div class="chartwrap">
        <div class="tip">
          ${k!==null?l`<b>${$t(k)}</b> · ${x!==null?`${w(x,0)} W`:"nessun dato"}${E?l` · <span style="color:${it[E]==="transparent"?"inherit":it[E]}">${yt[E]}</span>`:d}`:l`<span class="muted">Tocca il grafico per leggere i valori</span>`}
        </div>
        <svg width=${r} height=${p} viewBox="0 0 ${r} ${p}" @pointermove=${f=>this._move(f,this._n,H,c)} @pointerdown=${f=>this._move(f,this._n,H,c)} @pointerleave=${()=>this._hover=null}>
          ${o.ticks.map(f=>C`
            <line x1=${H} x2=${r-8} y1=${h(f)} y2=${h(f)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
            <text x=${H-6} y=${h(f)+4} text-anchor="end" class="ax">${w(f)}</text>`)}
          ${g.map((f,y)=>C`<line x1=${H} x2=${r-8} y1=${h(f.v)} y2=${h(f.v)} stroke=${f.c} stroke-width="1.2" stroke-dasharray="5 4" opacity="0.9" />
            ${y===0||Math.abs(h(g[y-1].v)-h(f.v))>=13?C`<text x=${r-10} y=${h(f.v)-3} text-anchor="end" class="th" fill=${f.c}>${f.l} ${w(f.v,f.v%1?1:0)} W${y<g.length-1&&Math.abs(h(g[y+1].v)-h(f.v))<13?` \xB7 ${g[y+1].l} ${w(g[y+1].v,g[y+1].v%1?1:0)} W`:""}</text>`:d}`)}
          <path d=${jt(this._values,u,h)} fill="none" stroke="var(--primary-color,#03a9f4)" stroke-width="1.8" stroke-linejoin="round" />
          ${$!==null&&x!==null?C`<line x1=${u($)} x2=${u($)} y1=${F} y2=${F+B} stroke="var(--secondary-text-color,#888)" stroke-width="1" /><circle cx=${u($)} cy=${h(x)} r="4" fill="var(--primary-color,#03a9f4)" />`:d}
          ${this._segs.map(f=>C`<rect x=${_(f.from)} y=${F+B+4} width=${Math.max(1,_(f.to)-_(f.from))} height=${ne} fill=${it[f.state]==="transparent"?"#9aa1ad":it[f.state]} opacity=${f.state==="non_disponibile"?.35:.9} />`)}
          ${qt(this._t0,this._t1).map(f=>C`
            <line x1=${_(f.t)} x2=${_(f.t)} y1=${F+B+ne+4} y2=${F+B+ne+8} stroke="var(--secondary-text-color,#888)" />
            <text x=${_(f.t)} y=${p-4} text-anchor="middle" class=${f.major?"ax maj":"ax"}>${f.label}</text>`)}
        </svg>
        <div class="legend">
          ${["spento","in_funzione","terminato"].map(f=>l`<span><i style="background:${it[f]}"></i>${yt[f]}</span>`)}
        </div>
      </div>
      ${!this._loading&&!this._error&&this._values.every(f=>f===null)?l`<div class="empty">Nessun dato di potenza nel periodo.</div>`:d}`}_consumi(){let t=this._stats;if(!t)return l`<div class="empty">${this._loading?"Carico\u2026":"Nessun dato."}</div>`;let e=t.series.slice(-this._days),s=this._metric,a=e.map(y=>y[s]),o=Math.max(...a,s==="cycles"?1:.01),r=wt(0,o,5),c=this._w,p=c-H-8,u=F+B+Ti+6,h=e.length,_=p/h,g=Math.max(2,Math.min(28,_-(_>6?2:0))),$=y=>F+B-(y-r.min)/(r.max-r.min||1)*B,k=y=>H+y*_+(_-g)/2,x=this._hover,E=fi(e,this._days),f=Math.max(1,Math.ceil(h/7));return l`
      <div class="ranges">
        ${zn.map(y=>l`<button class=${y.id===this._days?"chip on":"chip"} @click=${()=>(this._days=y.id,this._hover=null)}>${y.label}</button>`)}
        <span class="sep"></span>
        ${Object.keys(Ae).map(y=>l`<button class=${y===s?"chip on":"chip"} @click=${()=>(this._metric=y,this._hover=null)}>${Ae[y]}</button>`)}
        ${this._loading?l`<span class="load">aggiorno…</span>`:d}
      </div>
      <div class="totals"><span>Totale nel periodo</span><b>${P(E.kwh)}</b><b>${U(E.eur)}</b><b>${Ee("cycles",E.cycles)}</b></div>
      <div class="chartwrap">
        <div class="tip">
          ${x!==null&&e[x]?l`<b>${xe(e[x].date)}</b> · ${Ee(s,e[x][s])}${s!=="kwh"?l` · ${P(e[x].kwh)}`:d}${s!=="eur"?l` · ${U(e[x].eur)}`:d}`:l`<span class="muted">Tocca una barra per leggere il giorno</span>`}
        </div>
        <svg width=${c} height=${u} viewBox="0 0 ${c} ${u}" @pointermove=${y=>this._moveBar(y,h,H,p)} @pointerdown=${y=>this._moveBar(y,h,H,p)} @pointerleave=${()=>this._hover=null}>
          ${r.ticks.map(y=>C`
            <line x1=${H} x2=${c-8} y1=${$(y)} y2=${$(y)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
            <text x=${H-6} y=${$(y)+4} text-anchor="end" class="ax">${w(y,(s==="kwh"||s==="eur")&&r.max<5?1:0)}</text>`)}
          ${e.map((y,D)=>C`<rect x=${k(D)} y=${$(y[s])} width=${g} height=${Math.max(0,F+B-$(y[s]))} rx=${g>6?3:1} fill=${x===D?"var(--primary-color,#03a9f4)":"#f59e0b"} opacity=${x===null||x===D?1:.55} />`)}
          ${e.map((y,D)=>D%f===0?C`<text x=${k(D)+g/2} y=${u-4} text-anchor="middle" class="ax">${xe(y.date).replace(/^\w+ /,"")}</text>`:d)}
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
      </div>`:d}static{this.styles=[K,R`
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
    `]}};m([A({attribute:!1})],I.prototype,"hass",2),m([A({attribute:!1})],I.prototype,"info",2),m([A()],I.prototype,"openKey",2),m([b()],I.prototype,"_tab",2),m([b()],I.prototype,"_range",2),m([b()],I.prototype,"_days",2),m([b()],I.prototype,"_metric",2),m([b()],I.prototype,"_loading",2),m([b()],I.prototype,"_error",2),m([b()],I.prototype,"_w",2),m([b()],I.prototype,"_hover",2),m([b()],I.prototype,"_values",2),m([b()],I.prototype,"_segs",2),m([b()],I.prototype,"_stats",2);customElements.get("elettro-charts-dialog")||customElements.define("elettro-charts-dialog",I);var Mn=[{key:"pulisci",label:"Pulisci",icon:"mdi:robot-vacuum"},{key:"impostazioni",label:"Impostazioni",icon:"mdi:tune-variant"},{key:"base",label:"Base",icon:"mdi:home-lightning-bolt-outline"},{key:"manutenzione",label:"Manutenzione",icon:"mdi:wrench-clock"}],Ue=[["cleaning_mode","Modalit\xE0"],["suction_level","Aspirazione"],["mop_pad_humidity","Umidit\xE0 del panno"],["cleaning_route","Percorso"],["water_temperature","Temperatura dell'acqua"],["carpet_cleaning","Tappeti"]],Tn=[["auto_empty_mode","Svuotamento automatico"],["mop_wash_level","Lavaggio dei panni"],["drying_time","Durata dell'asciugatura"],["self_clean_frequency","Quando lavare i panni"]],Cn=[["clean_water_tank_status","Serbatoio acqua pulita",["low_water","not_installed","not_available"]],["dirty_water_tank_status","Serbatoio acqua sporca",["not_installed_or_full"]],["dust_bag_status","Sacchetto della polvere",["check","not_installed"]],["mop_pad","Panno",["not_installed"]],["self_wash_base_status","Lavaggio della base",[]],["auto_empty_status","Svuotamento",[]]],Rn=[["start_auto_empty","Svuota la polvere","mdi:delete-empty-outline"],["self_clean","Lava i panni","mdi:washing-machine"],["manual_drying","Asciuga i panni","mdi:hair-dryer-outline"],["clear_warning","Cancella avviso","mdi:alert-remove-outline"]],In=[["customized_cleaning","Pulizia personalizzata per stanza"],["resume_cleaning","Riprendi dopo la ricarica"],["carpet_boost","Pi\xF9 aspirazione sui tappeti"],["obstacle_avoidance","Evita gli ostacoli"],["auto_drying","Asciuga i panni da solo"],["self_clean","Lava i panni da solo"],["dnd","Non disturbare"],["child_lock","Blocco bambini"]],q=class extends T{constructor(){super(...arguments);this.openKey="";this._tab="pulisci";this._rooms=[];this._repeats=1;this._how=!1;this._confirm="";this._error="";this._onKey=t=>{t.key==="Escape"&&this._close()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey)}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}get _robot(){return this.info.robots?.find(t=>t.key===this.openKey)}_st(t){return t?this.hass.states[t]:void 0}_has(t,e){return!!this.hass.services?.[t]?.[e]}async _call(t,e,s){try{await this.hass.callService(t,e,s),this._error=""}catch(a){this._error=`Comando non riuscito: ${a instanceof Error?a.message:a?.message??String(a)}`}}_vacuum(t,e={}){let s=this._robot;s&&this._call("vacuum",t,{entity_id:s.entity,...e})}_press(t){this._call("button","press",{entity_id:t})}_selectOption(t,e){this._call("select","select_option",{entity_id:t,option:e})}_toggle(t,e){this._call("switch",e?"turn_on":"turn_off",{entity_id:t})}_chips(t,e){let s=this._st(t),a=s?.attributes.options;return!s||!Array.isArray(a)||["unavailable","unknown"].includes(s.state)?d:l`<div class="group"><div class="glab">${e}</div>
      <div class="chips">${a.map(o=>l`<button class=${s.state===o?"chip on":"chip"} aria-pressed=${s.state===o?"true":"false"} @click=${()=>this._selectOption(t,String(o))}>${Q(this.hass,t,String(o))||He(String(o))}</button>`)}</div></div>`}_selects(t,e){let s=e.map(([a,o])=>this._chips(S(t,`select.${a}`),o)).filter(a=>a!==d);return s.length?l`${s}`:d}_hero(t){let e=kt(t,this.hass),s=Q(this.hass,S(t,"sensor.state")),a=e.battery;return l`<div class="hero ${e.tone}">
      <span class="himg">${tt(et("aspirapolvere",e.state))}</span>
      <div class="htxt">
        <div class="hst">${e.statusLine}</div>
        ${s&&s!==e.statusLine?l`<div class="hline">${s}</div>`:d}
        <div class="hbat">${e.charging?l`<ha-icon icon="mdi:lightning-bolt"></ha-icon>`:d}<b>${a===null?"\u2013":`${w(a,0)} %`}</b>
          ${a!==null?l`<span class="bbar"><i class=${a<=20?"low":""} style=${`width:${Math.min(100,Math.max(0,a))}%`}></i></span>`:d}</div>
        ${e.room||e.area!==null||e.minutes!==null?l`<div class="hline">${[e.room,e.area!==null?`${w(e.area,0)} m\xB2`:"",e.minutes!==null?L(e.minutes*60):""].filter(Boolean).join(" \xB7 ")}</div>`:d}
      </div></div>
      ${e.error?l`<div class="err"><ha-icon icon="mdi:alert-circle-outline"></ha-icon> ${e.error}${this._has("button","press")&&S(t,"button.clear_warning")?l` <button class="btn s" @click=${()=>this._press(S(t,"button.clear_warning"))}>Cancella</button>`:d}</div>`:d}
      `}_map(t){let e=S(t,"camera.map"),s=this._st(e),a=s&&typeof s.attributes.entity_picture=="string"?s.attributes.entity_picture:"";if(!a)return d;let o=`${a}${a.includes("?")?"&":"?"}t=${encodeURIComponent(s?.state??"")}`;return l`<div class="sec">Mappa</div><div class="map"><img src=${o} alt="Mappa della casa" loading="lazy" /></div>`}_shortcuts(t){let e=zi(this._st(t.entity));return!e.length||!this._has("dreame_vacuum","vacuum_start_shortcut")?d:l`<div class="sec">Scorciatoie</div><div class="chips">${e.map(s=>l`<button class=${s.running?"chip on":"chip"} @click=${()=>void this._call("dreame_vacuum","vacuum_start_shortcut",{entity_id:t.entity,shortcut_id:s.id})}><ha-icon icon="mdi:lightning-bolt-outline"></ha-icon>${s.name}</button>`)}</div>`}_live(t){let e=kt(t,this.hass);return!e.canPause&&!(e.canStart&&e.activity==="paused")&&!e.canStop?d:l`<div class="cmds live">
      ${e.canPause?l`<button class="cmd" @click=${()=>this._vacuum("pause")}><ha-icon icon="mdi:pause"></ha-icon>Pausa</button>`:d}
      ${e.activity==="paused"?l`<button class="cmd go" @click=${()=>this._vacuum("start")}><ha-icon icon="mdi:play"></ha-icon>Riprendi</button>`:d}
      ${e.canStop?l`<button class="cmd" @click=${()=>this._vacuum("stop")}><ha-icon icon="mdi:stop"></ha-icon>Stop</button>`:d}
      ${e.canHome?l`<button class="cmd" @click=${()=>this._vacuum("return_to_base")}><ha-icon icon="mdi:home-import-outline"></ha-icon>Alla base</button>`:d}
    </div>`}_start(t,e){e.segments?this._call("dreame_vacuum","vacuum_clean_segment",{entity_id:t.entity,segments:e.segments,repeats:e.repeats}):this._vacuum("start")}_howSummary(t){return Ue.slice(0,3).map(([e])=>Q(this.hass,S(t,`select.${e}`))).filter(Boolean).join(" \xB7 ")}_tabClean(t){let e=kt(t,this.hass),s=this._st(S(t,"select.selected_map"))?.state??"",a=Ai(this._st(t.entity),s),o=this._has("dreame_vacuum","vacuum_clean_segment")&&a.length>0,r=this._rooms.filter(g=>a.some($=>$.id===g)),c=Ei(a,r,this._repeats,o),p=e.activity==="cleaning"||e.activity==="returning",u=e.activity==="unavailable",h=this._selects(t,Ue.slice(0,3)),_=this._howSummary(t);return l`${this._hero(t)}${this._live(t)}
      <div class="sec">Cosa vuoi pulire</div>
      <div class="chips">
        <button class=${r.length===0?"chip on":"chip"} aria-pressed=${r.length===0?"true":"false"} @click=${()=>this._rooms=[]}><ha-icon icon="mdi:home-outline"></ha-icon>Tutta la casa</button>
        ${a.map(g=>l`<button class=${r.includes(g.id)?"chip on":"chip"} aria-pressed=${r.includes(g.id)?"true":"false"} @click=${()=>this._rooms=r.includes(g.id)?r.filter($=>$!==g.id):[...r,g.id]}><ha-icon icon=${g.icon}></ha-icon>${g.name}</button>`)}
      </div>
      ${a.length&&!this._has("dreame_vacuum","vacuum_clean_segment")?l`<div class="hint">Questo robot non permette di scegliere le stanze da qui.</div>`:d}
      ${a.length===0&&this._has("dreame_vacuum","vacuum_clean_segment")?l`<div class="hint">Nessuna stanza trovata: creale dall'app del costruttore per pulirle una alla volta.</div>`:d}
      ${o?l`<div class="inline"><span class="glab">Passate</span><div class="chips">${[1,2,3].map(g=>l`<button class=${this._repeats===g?"chip on sq":"chip sq"} aria-pressed=${this._repeats===g?"true":"false"} @click=${()=>this._repeats=g}>${g}</button>`)}</div></div>`:d}
      ${h!==d?l`<button class="how" aria-expanded=${this._how?"true":"false"} @click=${()=>this._how=!this._how}>
          <ha-icon icon="mdi:tune-variant"></ha-icon><span class="hl">Come pulisce</span><span class="hs">${_}</span><ha-icon icon=${this._how?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon></button>
        ${this._how?l`<div class="howbox">${h}</div>`:d}`:d}
      <div class="cmds"><button class="cmd go big" ?disabled=${p||u} @click=${()=>this._start(t,c)}><ha-icon icon="mdi:play"></ha-icon>${p?"Pulizia in corso":c.label}</button></div>
      <div class="cmds">
        <button class="cmd" ?disabled=${u} @click=${()=>this._vacuum("locate")}><ha-icon icon="mdi:map-marker-radius-outline"></ha-icon>Trovalo</button>
        ${e.canHome&&!e.canStop?l`<button class="cmd" @click=${()=>this._vacuum("return_to_base")}><ha-icon icon="mdi:home-import-outline"></ha-icon>Alla base</button>`:d}
      </div>
      ${this._shortcuts(t)}${this._map(t)}`}_tabSettings(t){let e=this._selects(t,Ue);return l`${e===d?d:l`<div class="sec">Come pulisce</div>${e}`}${this._tabOther(t)}`}_tabBase(t){let e=Cn.map(([r,c,p])=>{let u=S(t,`sensor.${r}`),h=this._st(u);return!h||["unavailable","unknown",""].includes(h.state)?d:l`<div class="kv"><span>${c}</span><b class=${p.includes(h.state)?"bad":""}>${Q(this.hass,u)}</b></div>`}).filter(r=>r!==d),s=Y(this.hass.states,S(t,"sensor.drying_progress")),a=Rn.filter(([r])=>S(t,`button.${r}`)&&this._st(S(t,`button.${r}`))?.state!=="unavailable"),o=this._selects(t,Tn);return!e.length&&!a.length&&o===d?l`<div class="empty">Questo robot non ha una base con funzioni da gestire.</div>`:l`${e.length?l`<div class="sec">Stato della base</div>${e}${s!==null?l`<div class="kv"><span>Asciugatura</span><b>${w(s,0)} %</b></div>`:d}`:d}
      ${a.length?l`<div class="sec">Azioni</div><div class="cmds">${a.map(([r,c,p])=>l`<button class="cmd" @click=${()=>this._press(S(t,`button.${r}`))}><ha-icon icon=${p}></ha-icon>${c}</button>`)}</div>`:d}
      ${o===d?d:l`<div class="sec">Impostazioni della base</div>${o}`}`}_stats(t){let e=_=>Y(this.hass.states,S(t,`sensor.${_}`)),s=e("cleaning_count"),a=e("total_cleaned_area"),o=e("total_cleaning_time"),r=S(t,"sensor.cleaning_history"),c=this._st(r),p=c&&c.state&&!["unknown","unavailable"].includes(c.state)?Date.parse(c.state):NaN,u=Date.parse(this._st(S(t,"sensor.first_cleaning_date"))?.state??""),h=_=>new Date(_).toLocaleDateString("it-IT",{day:"numeric",month:"short",year:"numeric"});return s===null&&a===null&&o===null?d:l`<div class="sec">Statistiche</div>
      ${s!==null?l`<div class="kv"><span>Pulizie fatte</span><b>${w(s,0)}</b></div>`:d}
      ${a!==null?l`<div class="kv"><span>Superficie pulita</span><b>${w(a,0)} m²</b></div>`:d}
      ${o!==null?l`<div class="kv"><span>Tempo di pulizia</span><b>${w(o/60,1)} h</b></div>`:d}
      ${Number.isNaN(p)?d:l`<div class="kv"><span>Ultima pulizia</span><b>${h(p)}</b></div>`}
      ${Number.isNaN(u)?d:l`<div class="kv"><span>Prima pulizia</span><b>${h(u)}</b></div>`}`}_tabMaint(t){let e=Ne(t,this.hass.states),s=this._stats(t);return e.length?l`<div class="sec">Consumabili</div>
      ${e.map(a=>l`<div class="cons">
        <div class="ctop"><span>${a.label}</span><b class=${a.low?"bad":""}>${a.pct===null?"\u2013":`${w(a.pct,0)} %`}${a.hoursLeft!==null?l` <span class="mut">· ${w(a.hoursLeft,a.hoursLeft<10?1:0)} h</span>`:d}</b></div>
        <div class="bbar wide"><i class=${a.low?"low":""} style=${`width:${Math.min(100,Math.max(0,a.pct??0))}%`}></i></div>
        ${a.reset?l`<button class=${this._confirm===a.key?"btn s warn":"btn s"} @click=${()=>{this._confirm===a.key?(this._press(a.reset),this._confirm=""):this._confirm=a.key}}>${this._confirm===a.key?"Tocca ancora per confermare":"Segna come sostituito"}</button>`:d}
      </div>`)}
      <div class="hint">Segna come sostituito solo dopo aver cambiato o pulito il pezzo: il contatore riparte da 100 %.</div>
      ${s}`:s===d?l`<div class="empty">Questo robot non comunica lo stato dei consumabili.</div>`:s}_tabOther(t){let e=In.map(([r,c])=>{let p=S(t,`switch.${r}`),u=this._st(p);if(!u||u.state==="unavailable")return d;let h=u.state==="on";return l`<div class="row"><span class="rl">${c}</span>
        <button class=${h?"sw on":"sw"} role="switch" aria-checked=${h?"true":"false"} aria-label=${c} @click=${()=>this._toggle(p,!h)}><span class="knob"></span></button></div>`}).filter(r=>r!==d),s=S(t,"number.volume"),a=Y(this.hass.states,s),o=[Q(this.hass,S(t,"time.dnd_start")),Q(this.hass,S(t,"time.dnd_end"))].filter(Boolean);return l`${e.length?l`<div class="sec">Opzioni</div>${e}`:d}
      ${o.length===2?l`<div class="hint">Non disturbare: dalle ${o[0]?.slice(0,5)} alle ${o[1]?.slice(0,5)}.</div>`:d}
      ${a!==null&&s?l`<div class="sec">Volume della voce</div>
        <div class="vol"><ha-icon icon="mdi:volume-low"></ha-icon><input type="range" min="0" max="100" step="5" .value=${String(a)} aria-label="Volume" @change=${r=>void this._call("number","set_value",{entity_id:s,value:Number(r.target.value)})} /><ha-icon icon="mdi:volume-high"></ha-icon><b>${w(a,0)}</b></div>`:d}
      ${e.length===0&&a===null?l`<div class="empty">Nessuna opzione disponibile per questo robot.</div>`:d}`}render(){let t=this._robot;if(!t)return d;let e=this._tab==="impostazioni"?this._tabSettings(t):this._tab==="base"?this._tabBase(t):this._tab==="manutenzione"?this._tabMaint(t):this._tabClean(t);return l`
      <div class="backdrop" @click=${s=>s.target===s.currentTarget&&this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Gestisci ${t.name}`}>
          <div class="head"><div class="title">${t.name}</div><button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button></div>
          <div class="tabs" role="tablist">${Mn.map(s=>l`<button role="tab" aria-selected=${this._tab===s.key?"true":"false"} class=${this._tab===s.key?"tab on":"tab"} @click=${()=>this._tab=s.key}><ha-icon icon=${s.icon}></ha-icon>${s.label}</button>`)}</div>
          <div class="body">${this._error?l`<div class="err">${this._error}</div>`:d}${e}</div>
        </div>
      </div>`}static{this.styles=[K,R`
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
    `]}};m([A({attribute:!1})],q.prototype,"hass",2),m([A({attribute:!1})],q.prototype,"info",2),m([A()],q.prototype,"openKey",2),m([b()],q.prototype,"_tab",2),m([b()],q.prototype,"_rooms",2),m([b()],q.prototype,"_repeats",2),m([b()],q.prototype,"_how",2),m([b()],q.prototype,"_confirm",2),m([b()],q.prototype,"_error",2);customElements.get("elettro-robot-dialog")||customElements.define("elettro-robot-dialog",q);var qe=[{id:"6h",label:"6 ore",ms:6*36e5},{id:"24h",label:"24 ore",ms:24*36e5},{id:"3d",label:"3 giorni",ms:3*864e5},{id:"7d",label:"7 giorni",ms:7*864e5}],at=190,se=130,j=10,O=44,je=10,Ci=22;function Ri(n){return(n??[]).map(i=>{let t=i.s??i.state??"";return{...i,s:t==="on"?"in_funzione":t==="off"?"spento":"non_disponibile",state:void 0}})}var N=class extends T{constructor(){super(...arguments);this.openKey="";this._range="24h";this._loading=!1;this._error="";this._w=640;this._hover=null;this._hum=[];this._temp=[];this._fan=[];this._light=[];this._t0=0;this._t1=0;this._n=240;this._rawHum=[];this._rawTemp=[];this._rawFan=[];this._rawLight=[];this._wrapEl=null;this._seq=0;this._onKey=t=>{t.key==="Escape"&&this._close()}}get _app(){return(this.info.humidistats??[]).find(t=>t.key===this.openKey)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKey),this._timer=window.setInterval(()=>void this._load(),6e4),this._load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKey),this._ro?.disconnect(),this._timer&&window.clearInterval(this._timer)}updated(){let t=this.renderRoot.querySelector(".chartwrap");t&&t!==this._wrapEl&&(this._ro?.disconnect(),this._wrapEl=t,this._ro=new ResizeObserver(e=>{let s=Math.floor(e[0]?.contentRect.width??640);s>100&&Math.abs(s-this._w)>2&&(this._w=s,this._recompute())}),this._ro.observe(t))}_close(){this.dispatchEvent(new CustomEvent("closed")),this.remove()}async _load(){let t=this._app;if(!this.hass||!t)return;let e=++this._seq;this._loading=!0;try{let s=qe.find(p=>p.id===this._range)??qe[1],a=Date.now(),o=a-s.ms,r=[t.entity,t.temp_entity,t.fan_entity,t.light_entity].filter(p=>!!p),c=await this.hass.callWS({type:"history/history_during_period",start_time:new Date(o).toISOString(),end_time:new Date(a).toISOString(),entity_ids:r,include_start_time_state:!0,significant_changes_only:!1,minimal_response:!0,no_attributes:!0});if(e!==this._seq)return;this._t0=o,this._t1=a,this._rawHum=Nt(c[t.entity]),this._rawTemp=t.temp_entity?Nt(c[t.temp_entity]):[],this._rawFan=Ri(t.fan_entity?c[t.fan_entity]:void 0),this._rawLight=Ri(t.light_entity?c[t.light_entity]:void 0),this._recompute(),this._error=""}catch(s){e===this._seq&&(this._error=`Impossibile leggere i dati: ${s instanceof Error?s.message:s?.message??String(s)}`)}finally{e===this._seq&&(this._loading=!1)}}_recompute(){this._t1&&(this._n=Math.max(60,Math.min(480,Math.floor((this._w-O-8)/2))),this._hum=Ut(this._rawHum,this._t0,this._t1,this._n,30*6e4),this._temp=Ut(this._rawTemp,this._t0,this._t1,this._n,30*6e4),this._fan=Pt(this._rawFan,this._t0,this._t1),this._light=Pt(this._rawLight,this._t0,this._t1))}_setRange(t){this._range=t,this._hover=null,this._load()}_move(t,e,s){let a=t.currentTarget.getBoundingClientRect(),o=Math.round((t.clientX-a.left-e)/s*(this._n-1));this._hover=o>=0&&o<this._n?o:null}_strip(t,e,s,a){return t.map(o=>C`<rect x=${s(o.from)} y=${e} width=${Math.max(1,s(o.to)-s(o.from))} height=${je} rx="2" fill=${o.state==="in_funzione"?a:"var(--divider-color,#ccc)"} opacity=${o.state==="non_disponibile"?.25:o.state==="in_funzione"?.95:.55} />`)}render(){let t=this._app;if(!t)return d;let e=this._w,s=e-O-8,a=!!t.temp_entity,o=!!t.light_entity,c=(1+(o?1:0))*(je+4),p=j+at+c+Ci+6,u=v=>O+(v-this._t0)/(this._t1-this._t0||1)*s,h=v=>O+(this._n<=1?0:v/(this._n-1)*s),_=this._hum.filter(v=>v!==null),g=wt(Math.max(0,Math.floor(Math.min(..._,t.hum.off_below)-8)),100,5),$=v=>j+at-(v-g.min)/(g.max-g.min||1)*at,k=[{v:t.hum.on_above,c:"#f59e0b",l:`accende ${w(t.hum.on_above,t.hum.on_above%1?1:0)} %`},{v:t.hum.off_below,c:"#16a34a",l:`spegne ${w(t.hum.off_below,t.hum.off_below%1?1:0)} %`}],x=this._hover,E=x!==null&&this._n>1?this._t0+x/(this._n-1)*(this._t1-this._t0):null,f=x!==null?this._hum[x]:null,y=x!==null?this._temp[x]:null,D=E!==null?Ot(this._fan,E):null,mt=E!==null?Ot(this._light,E):null,Wt=this._temp.filter(v=>v!==null),ft=wt(Math.floor(Math.min(...Wt.length?Wt:[15])-1),Math.ceil(Math.max(...Wt.length?Wt:[25])+1),4),St=v=>j+se-(v-ft.min)/(ft.max-ft.min||1)*se,ae=j+se+Ci+6,Ii=t.temp_entity&&String(this.hass.states[t.temp_entity]?.attributes?.unit_of_measurement)||"\xB0C";return l`
      <div class="backdrop" @click=${v=>v.target===v.currentTarget&&this._close()}>
        <div class="panel wide" role="dialog" aria-modal="true" aria-label=${`Grafici ${t.name}`}>
          <div class="head">
            <div class="title">Grafici · ${t.name}</div>
            <button class="x" aria-label="Chiudi" @click=${()=>this._close()}>✕</button>
          </div>
          <div class="body">
            <div class="ranges">
              ${qe.map(v=>l`<button class=${v.id===this._range?"chip on":"chip"} @click=${()=>this._setRange(v.id)}>${v.label}</button>`)}
              ${this._loading?l`<span class="load">aggiorno…</span>`:d}
            </div>
            <div class="sec">Umidità</div>
            <div class="chartwrap">
              <div class="tip">
                ${E!==null?l`<b>${$t(E)}</b> · ${f!==null?`${w(f,1)} %`:"nessun dato"}${a&&y!==null?` \xB7 ${w(y,1)} ${Ii}`:""}${D?l` · ventilatore <b>${D==="in_funzione"?"acceso":"spento"}</b>`:d}${mt?l` · luce ${mt==="in_funzione"?"accesa":"spenta"}`:d}`:l`<span class="muted">Tocca il grafico per leggere i valori</span>`}
              </div>
              <svg width=${e} height=${p} viewBox="0 0 ${e} ${p}" @pointermove=${v=>this._move(v,O,s)} @pointerdown=${v=>this._move(v,O,s)} @pointerleave=${()=>this._hover=null}>
                ${g.ticks.map(v=>C`
                  <line x1=${O} x2=${e-8} y1=${$(v)} y2=${$(v)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
                  <text x=${O-6} y=${$(v)+4} text-anchor="end" class="ax">${w(v)}</text>`)}
                ${k.map(v=>C`<line x1=${O} x2=${e-8} y1=${$(v.v)} y2=${$(v.v)} stroke=${v.c} stroke-width="1.2" stroke-dasharray="5 4" opacity="0.9" />
                  <text x=${e-10} y=${$(v.v)+(v.v===t.hum.off_below?12:-3)} text-anchor="end" class="th" fill=${v.c}>${v.l}</text>`)}
                <path d=${jt(this._hum,h,$)} fill="none" stroke="var(--primary-color,#03a9f4)" stroke-width="1.8" stroke-linejoin="round" />
                ${x!==null&&f!==null?C`<line x1=${h(x)} x2=${h(x)} y1=${j} y2=${j+at} stroke="var(--secondary-text-color,#888)" stroke-width="1" /><circle cx=${h(x)} cy=${$(f)} r="4" fill="var(--primary-color,#03a9f4)" />`:d}
                ${this._strip(this._fan,j+at+4,u,"#38bdf8")}
                ${o?this._strip(this._light,j+at+4+je+4,u,"#fbbf24"):d}
                ${qt(this._t0,this._t1).map(v=>C`
                  <line x1=${u(v.t)} x2=${u(v.t)} y1=${j+at+c} y2=${j+at+c+4} stroke="var(--secondary-text-color,#888)" />
                  <text x=${u(v.t)} y=${p-4} text-anchor="middle" class=${v.major?"ax maj":"ax"}>${v.label}</text>`)}
              </svg>
              <div class="legend">
                <span><i style="background:#38bdf8"></i>Ventilatore acceso</span>
                ${o?l`<span><i style="background:#fbbf24"></i>Luce accesa</span>`:d}
              </div>
            </div>
            ${!this._loading&&!this._error&&this._hum.every(v=>v===null)?l`<div class="empty">Nessun dato di umidità nel periodo.</div>`:d}
            ${a?l`<div class="sec">Temperatura</div>
                <div class="chartwrap">
                  <svg width=${e} height=${ae} viewBox="0 0 ${e} ${ae}" @pointermove=${v=>this._move(v,O,s)} @pointerdown=${v=>this._move(v,O,s)} @pointerleave=${()=>this._hover=null}>
                    ${ft.ticks.map(v=>C`
                      <line x1=${O} x2=${e-8} y1=${St(v)} y2=${St(v)} stroke="var(--divider-color,#ddd)" stroke-width="1" />
                      <text x=${O-6} y=${St(v)+4} text-anchor="end" class="ax">${w(v,ft.max-ft.min<6?1:0)}</text>`)}
                    <path d=${jt(this._temp,h,St)} fill="none" stroke="#ef4444" stroke-width="1.8" stroke-linejoin="round" />
                    ${x!==null&&y!==null?C`<line x1=${h(x)} x2=${h(x)} y1=${j} y2=${j+se} stroke="var(--secondary-text-color,#888)" stroke-width="1" /><circle cx=${h(x)} cy=${St(y)} r="4" fill="#ef4444" />`:d}
                    ${qt(this._t0,this._t1).map(v=>C`<text x=${u(v.t)} y=${ae-4} text-anchor="middle" class=${v.major?"ax maj":"ax"}>${v.label}</text>`)}
                  </svg>
                </div>`:d}
            ${this._error?l`<div class="err">${this._error}</div>`:d}
          </div>
        </div>
      </div>`}static{this.styles=[K,R`
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
    `]}};m([A({attribute:!1})],N.prototype,"hass",2),m([A({attribute:!1})],N.prototype,"info",2),m([A()],N.prototype,"openKey",2),m([b()],N.prototype,"_range",2),m([b()],N.prototype,"_loading",2),m([b()],N.prototype,"_error",2),m([b()],N.prototype,"_w",2),m([b()],N.prototype,"_hover",2),m([b()],N.prototype,"_hum",2),m([b()],N.prototype,"_temp",2),m([b()],N.prototype,"_fan",2),m([b()],N.prototype,"_light",2);customElements.get("elettro-hum-charts-dialog")||customElements.define("elettro-hum-charts-dialog",N);var J=class extends T{constructor(){super(...arguments);this._config={type:"custom:elettrodomestici-card"};this._info=null;this._error="";this._now=Date.now();this._width=0;this._loadedAt=0;this._loading=!1;this._syncers=new Set}setConfig(t){this._config={...t},this._info=null,this._loadedAt=0}getCardSize(){let t=this._visibleCount(),e=Se(this._width,this._config.columns)??Math.max(1,Math.floor((this._width+12)/312));return hi(t,e,this._config.header!==!1)}getGridOptions(){return{columns:12,rows:"auto",min_columns:3,min_rows:2}}static getStubConfig(){return{type:"custom:elettrodomestici-card"}}static getConfigElement(){return document.createElement("elettrodomestici-card-editor")}_visibleCount(){let t=this._info;if(!t)return 1;let e=Array.isArray(this._config.appliances)?this._config.appliances:null,s=[...t.appliances,...t.robots??[],...t.humidistats??[]];return Math.max(1,e?s.filter(a=>e.includes(a.key)).length:s.length)}connectedCallback(){super.connectedCallback(),this._tick=window.setInterval(()=>this._now=Date.now(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._tick&&window.clearInterval(this._tick),this._ro?.disconnect(),this._ro=void 0}firstUpdated(){this._ro=new ResizeObserver(t=>{let e=Math.floor(t[0]?.contentRect.width??0);e>0&&Math.abs(e-this._width)>1&&(this._width=e)}),this._ro.observe(this)}willUpdate(){for(let t of this._syncers)t()}updated(){let t=(this._info?.humidistats?.length??0)>0?15e3:3e5;this.hass&&!this._loading&&(!this._info||Date.now()-this._loadedAt>t)&&this._loadInfo()}async _loadInfo(){this._loading=!0;try{let t={type:"elettrodomestici/info"};this._config.entry_id&&(t.entry_id=this._config.entry_id),this._info=await this.hass.callWS(t),this._error=""}catch(t){let e=t instanceof Error?t.message:t?.message??String(t);this._error=`Elettrodomestici non configurato o integrazione non caricata (${e}).`}finally{this._loadedAt=Date.now(),this._loading=!1}}async _open(t,e=""){if(!this._info)return;for(;this._loading;)await new Promise(o=>setTimeout(o,50));if(await this._loadInfo(),!this._info)return;let s=document.createElement(t);s.hass=this.hass,s.info=this._info,s.openKey=e,s.addEventListener("open-dialog",o=>{let r=o.detail;this._open(r.tag,r.key)}),s.addEventListener("saved",()=>{this._loadedAt=0,this._loadInfo()}),document.body.appendChild(s);let a=()=>{s.isConnected&&(s.hass=this.hass)};this._syncers.add(a),s.addEventListener("closed",()=>this._syncers.delete(a))}_ack(t){this.hass.callWS({type:"elettrodomestici/action",entry_id:this._info?.entry_id,key:t,action:"acknowledge"})}_robotCall(t,e,s){this.hass.callService(t,e,{entity_id:s})}_humCall(t,e){t.fan_entity&&this.hass.callService("homeassistant",e?"turn_on":"turn_off",{entity_id:t.fan_entity})}_humAuto(t,e){this.hass.callWS({type:"elettrodomestici/action",entry_id:this._info?.entry_id,key:t.key,action:e?"auto_on":"auto_off"}).then(()=>{this._loadedAt=0,this._loadInfo()})}_humTile(t,e){return l`
      <div class="tile ${e.tone}">
        <button class="main" aria-label=${`Grafici di ${e.name}`} @click=${()=>void this._open("elettro-hum-charts-dialog",t.key)}>
          <span class="img">${tt(et("umidostato",e.state))}</span>
          <span class="info">
            <span class="n">${e.name}</span>
            <span class="badge ${e.tone}">${e.statusLine}</span>
            <span class="pw ${e.fanOn?"on":""}">${e.humidity===null?"\u2013":`${w(e.humidity,0)} %`}${e.temperature===null?d:l`<span class="tmp">${w(e.temperature,1)} ${e.tempUnit}</span>`}</span>
            <span class="row">${e.rule}</span>
            ${e.waitText?l`<span class="row"><b>${e.waitText}</b></span>`:d}
          </span>
        </button>
        <div class="acts hum">
          ${e.fanOn===null?d:l`<button class=${e.fanOn?"a":"a ok"} @click=${()=>this._humCall(t,!e.fanOn)}><ha-icon icon=${e.fanOn?"mdi:fan-off":"mdi:fan"}></ha-icon>${e.fanOn?"Spegni":"Accendi"}</button>`}
          <button class=${e.auto?"a ok":"a"} role="switch" aria-checked=${e.auto?"true":"false"} @click=${()=>this._humAuto(t,!e.auto)}><ha-icon icon="mdi:auto-fix"></ha-icon>Auto ${e.auto?"s\xEC":"no"}</button>
          <button class="a" aria-label=${`Grafici di ${e.name}`} @click=${()=>void this._open("elettro-hum-charts-dialog",t.key)}><ha-icon icon="mdi:chart-line"></ha-icon>Grafici</button>
        </div>
      </div>`}_robotTile(t,e){let s=e.room||e.area!==null||e.minutes!==null?[e.room,e.area!==null?`${w(e.area,0)} m\xB2`:"",e.minutes!==null?`${w(e.minutes,0)} min`:""].filter(Boolean).join(" \xB7 "):e.charging?"In carica":"";return l`
      <div class="tile ${e.tone}">
        <button class="main" aria-label=${`Gestisci ${e.name}`} @click=${()=>void this._open("elettro-robot-dialog",t.key)}>
          <span class="img">${tt(et("aspirapolvere",e.state))}</span>
          <span class="info">
            <span class="n">${e.name}</span>
            <span class="badge ${e.tone}">${e.statusLine}</span>
            <span class="pw ${e.activity==="cleaning"?"on":""}">${e.battery===null?"\u2013":l`${e.charging?l`<ha-icon icon="mdi:lightning-bolt"></ha-icon>`:d}${w(e.battery,0)} %`}</span>
            <span class="row">${s||"Batteria"}</span>
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
          <span class="img">${tt(et(t.type,t.state))}</span>
          <span class="info">
            <span class="n">${t.name}</span>
            <span class="badge ${t.tone}">${t.statusLine}</span>
            <span class="pw ${t.state==="in_funzione"?"on":""}">${nt(t.power)}</span>
            <span class="row">${t.state==="in_funzione"&&t.cycleKwh!==null?l`Questo ciclo <b>${P(t.cycleKwh)}</b> · ${U(t.cycleEur)}`:l`Oggi <b>${P(t.todayKwh)}</b> · ${U(t.todayEur)}`}</span>
            <span class="row">${t.todayCycles===1?"1 ciclo oggi":`${w(t.todayCycles)} cicli oggi`}${t.state==="in_funzione"&&t.cycleKwh!==null?l` · oggi ${P(t.todayKwh)}`:d}</span>
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
      </div>`}render(){if(!this.hass)return d;let t=this._config.title??this._info?.title??"Elettrodomestici";if(this._error&&!this._info)return l`<ha-card><div class="pad"><div class="title">${t}</div><div class="errbox">${this._error}</div></div></ha-card>`;if(!this._info)return l`<ha-card><div class="pad"><div class="title">${t}</div><div class="muted">Carico…</div></div></ha-card>`;let e=Array.isArray(this._config.appliances)?this._config.appliances:null,a=(e?this._info.appliances.filter(u=>e.includes(u.key)):this._info.appliances).map(u=>ie(u,this.hass.states,this._info?.types,this._now)),o=(this._info.robots??[]).filter(u=>!e||e.includes(u.key)),r=(this._info.humidistats??[]).filter(u=>!e||e.includes(u.key)),c=(this._now-this._loadedAt)/1e3,p=l`<div class="grid" style=${`grid-template-columns:${ui(this._config.columns,this._width)}`}>${a.map(u=>this._tile(u))}${o.map(u=>this._robotTile(u,kt(u,this.hass)))}${r.map(u=>this._humTile(u,Mi(u,this.hass,c)))}</div>`;return this._config.header===!1?l`<ha-card><div class="pad compact">${p}</div></ha-card>`:l`
      <ha-card>
        <div class="pad">
          <div class="head">
            <div>
              <div class="title">${t}</div>
              <div class="sum">${mi(a)}</div>
            </div>
          </div>
          ${a.length+o.length+r.length===0?l`<div class="empty"><ha-icon icon="mdi:cog-outline"></ha-icon>Nessun elettrodomestico: apri «Modifica scheda» e aggiungi il primo.</div>`:p}
        </div>
      </ha-card>`}static{this.styles=R`
    :host { display: block; height: 100%; color: var(--primary-text-color, #212121); }
    ha-card { overflow: hidden; height: 100%; box-sizing: border-box; }
    .pad { height: 100%; box-sizing: border-box; overflow: auto; }
    .pad { padding: 14px 16px 16px; }
    .pad.compact { padding: 8px; }
    .head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
    .title { font-size: 1.15rem; font-weight: 600; }
    .sum { font-size: 0.85rem; color: var(--secondary-text-color, #727272); margin-top: 2px; }
    .muted { color: var(--secondary-text-color, #727272); font-size: 0.85rem; }
    .errbox { margin-top: 8px; padding: 10px; border-radius: 10px; background: rgba(220, 38, 38, 0.1); color: #b91c1c; font-size: 0.9rem; }
    .ib { flex: none; width: 44px; height: 44px; border-radius: 22px; border: 1px solid var(--divider-color, #ccc); background: var(--secondary-background-color, #f4f4f4); color: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
    ha-icon { --mdc-icon-size: 20px; }
    .empty { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 64px; justify-content: center; text-align: center; border: 2px dashed var(--divider-color, #ccc); border-radius: 14px; color: var(--secondary-text-color, #727272); font-size: 0.95rem; padding: 8px; box-sizing: border-box; }
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
    .tmp { margin-left: 10px; font-size: 1rem; font-weight: 500; color: var(--secondary-text-color, #727272); white-space: nowrap; }
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
    .acts.hum .a { min-width: 72px; padding: 0 6px; font-size: 0.8rem; }
    .a.ok { background: #16a34a; border-color: transparent; color: #fff; }
  `}};m([A({attribute:!1})],J.prototype,"hass",2),m([b()],J.prototype,"_config",2),m([b()],J.prototype,"_info",2),m([b()],J.prototype,"_error",2),m([b()],J.prototype,"_now",2),m([b()],J.prototype,"_width",2);customElements.get("elettrodomestici-card")||customElements.define("elettrodomestici-card",J);window.customCards=window.customCards||[];window.customCards.push({type:"elettrodomestici-card",name:"Elettrodomestici",description:"Lavatrice, lavastoviglie, asciugatrice, forno, frigorifero, microonde, robot aspirapolvere e umidostato: stato, consumi, costi, statistiche, grafici e controllo."});console.info("%c ELETTRODOMESTICI %c v0.6.0 ","color: white; background: #0f766e; font-weight: 700;","color: #0f766e; background: white; font-weight: 700;");export{J as ElettrodomesticiCard};
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
