import{w as e,b as t,u as n,g as r,a as o,d as s,p as i,c as a,e as c,f as l,h as d,r as u,i as p}from"../nitro/nitro.mjs";import{createHead as f,propsToString as m,renderSSRHead as h}from"unhead/server";import{FlatMetaPlugin as y,DeprecationsPlugin as g,PromisesPlugin as b,TemplateParamsPlugin as _,AliasSortingPlugin as j}from"unhead/plugins";import{walkResolver as w}from"unhead/utils";import*as v from"@vue/compiler-dom";import*as x from"@vue/runtime-dom";import*as C from"@vue/shared";import{renderToString as S}from"@vue/server-renderer";import{stringify as T,uneval as R}from"devalue";function getModuleDependencies(e,t){if(t._dependencies[e])return t._dependencies[e];const n=t._dependencies[e]={scripts:{},styles:{},preload:{},prefetch:{}},r=t.manifest[e];if(!r)return n;r.file&&(n.preload[e]=r,(r.isEntry||r.sideEffects)&&(n.scripts[e]=r));for(const e of r.css||[])n.styles[e]=n.preload[e]=n.prefetch[e]=t.manifest[e];for(const e of r.assets||[])n.preload[e]=n.prefetch[e]=t.manifest[e];for(const e of r.imports||[]){const r=getModuleDependencies(e,t);Object.assign(n.styles,r.styles),Object.assign(n.preload,r.preload),Object.assign(n.prefetch,r.prefetch)}const o={};for(const e in n.preload){const t=n.preload[e];t.preload&&(o[e]=t)}return n.preload=o,n}function getRequestDependencies(e,t){if(e._requestDependencies)return e._requestDependencies;const n=function(e,t){const n=Array.from(e).sort().join(",");if(t._dependencySets[n])return t._dependencySets[n];const r={scripts:{},styles:{},preload:{},prefetch:{}};for(const n of e){const e=getModuleDependencies(n,t);Object.assign(r.scripts,e.scripts),Object.assign(r.styles,e.styles),Object.assign(r.preload,e.preload),Object.assign(r.prefetch,e.prefetch);for(const e of t.manifest[n]?.dynamicImports||[]){const n=getModuleDependencies(e,t);Object.assign(r.prefetch,n.scripts),Object.assign(r.prefetch,n.styles),Object.assign(r.prefetch,n.preload)}}const o={};for(const e in r.prefetch){const t=r.prefetch[e];t.prefetch&&(o[e]=t)}r.prefetch=o;for(const e in r.preload)delete r.prefetch[e];for(const e in r.styles)delete r.preload[e],delete r.prefetch[e];return t._dependencySets[n]=r,r}(new Set(Array.from([...t._entrypoints,...e.modules||e._registeredComponents||[]])),t);return e._requestDependencies=n,n}function renderStyles(e,t){const{styles:n}=getRequestDependencies(e,t);return Object.values(n).map((e=>renderLinkToString({rel:"stylesheet",href:t.buildAssetsURL(e.file),crossorigin:""}))).join("")}function getResources(e,t){return[...getPreloadLinks(e,t),...getPrefetchLinks(e,t)]}function renderResourceHints(e,t){return getResources(e,t).map(renderLinkToString).join("")}function renderResourceHeaders(e,t){return{link:getResources(e,t).map(renderLinkToHeader).join(", ")}}function getPreloadLinks(e,t){const{preload:n}=getRequestDependencies(e,t);return Object.values(n).map((e=>({rel:e.module?"modulepreload":"preload",as:e.resourceType,type:e.mimeType??null,crossorigin:"style"===e.resourceType||"font"===e.resourceType||"script"===e.resourceType||e.module?"":null,href:t.buildAssetsURL(e.file)})))}function getPrefetchLinks(e,t){const{prefetch:n}=getRequestDependencies(e,t);return Object.values(n).map((e=>({rel:"prefetch",as:e.resourceType,type:e.mimeType??null,crossorigin:"style"===e.resourceType||"font"===e.resourceType||"script"===e.resourceType||e.module?"":null,href:t.buildAssetsURL(e.file)})))}function renderScripts(e,t){const{scripts:n}=getRequestDependencies(e,t);return Object.values(n).map((e=>{return n={type:e.module?"module":null,src:t.buildAssetsURL(e.file),defer:e.module?null:"",crossorigin:""},`<script${Object.entries(n).map((([e,t])=>null===t?"":t?` ${e}="${t}"`:" "+e)).join("")}><\/script>`;var n})).join("")}function createRenderer(t,n){const r=function({manifest:t,buildAssetsURL:n}){const r={buildAssetsURL:n||e,manifest:void 0,updateManifest:updateManifest,_dependencies:void 0,_dependencySets:void 0,_entrypoints:void 0};function updateManifest(e){const t=Object.entries(e);r.manifest=e,r._dependencies={},r._dependencySets={},r._entrypoints=t.filter((e=>e[1].isEntry)).map((([e])=>e))}return updateManifest(t),r}(n);return{rendererContext:r,async renderToString(e){e._registeredComponents=e._registeredComponents||new Set;const o=await Promise.resolve(t).then((e=>"default"in e?e.default:e)),s=await o(e),wrap=t=>()=>t(e,r);return{html:await n.renderToString(s,e),renderResourceHeaders:wrap(renderResourceHeaders),renderResourceHints:wrap(renderResourceHints),renderStyles:wrap(renderStyles),renderScripts:wrap(renderScripts)}}}}function renderLinkToString(e){return`<link${Object.entries(e).map((([e,t])=>null===t?"":t?` ${e}="${t}"`:" "+e)).join("")}>`}function renderLinkToHeader(e){return`<${e.href}>${Object.entries(e).map((([e,t])=>"href"===e||null===t?"":t?`; ${e}="${t}"`:`; ${e}`)).join("")}`}function getDefaultExportFromNamespaceIfNotNamed(e){return e&&Object.prototype.hasOwnProperty.call(e,"default")&&1===Object.keys(e).length?e.default:e}var O={exports:{}},$={};const k=getDefaultExportFromNamespaceIfNotNamed(v),A=getDefaultExportFromNamespaceIfNotNamed(x),L=getDefaultExportFromNamespaceIfNotNamed(C);!function(e){Object.defineProperty(e,"__esModule",{value:!0});var t=k,n=A,r=L;function _interopNamespaceDefault(e){var t=Object.create(null);if(e)for(var n in e)t[n]=e[n];return t.default=e,Object.freeze(t)}var o=_interopNamespaceDefault(n);const s=Object.create(null);function compileToFunction(e,n){if(!r.isString(e)){if(!e.nodeType)return r.NOOP;e=e.innerHTML}const i=r.genCacheKey(e,n),a=s[i];if(a)return a;if("#"===e[0]){const t=document.querySelector(e);e=t?t.innerHTML:""}const c=r.extend({hoistStatic:!0,onError:void 0,onWarn:r.NOOP},n);c.isCustomElement||"undefined"==typeof customElements||(c.isCustomElement=e=>!!customElements.get(e));const{code:l}=t.compile(e,c),d=new Function("Vue",l)(o);return d._rc=!0,s[i]=d}n.registerRuntimeCompiler(compileToFunction),e.compile=compileToFunction,Object.keys(n).forEach((function(t){"default"===t||Object.prototype.hasOwnProperty.call(e,t)||(e[t]=n[t])}))}($),O.exports=$;var H=O.exports;const VueResolver=(e,t)=>H.isRef(t)?H.toValue(t):t,N="usehead";function injectHead(){if(H.hasInjectionContext()){const e=H.inject(N);if(!e)throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");return e}throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.")}function useHead(e,t={}){const n=t.head||injectHead();return n.ssr?n.push(e||{},t):function(e,t,n={}){const r=H.ref(!1);let o;H.watchEffect((()=>{const s=r.value?{}:w(t,VueResolver);o?o.patch(s):o=e.push(s,n)}));H.getCurrentInstance()&&(H.onBeforeUnmount((()=>{o.dispose()})),H.onDeactivated((()=>{r.value=!0})),H.onActivated((()=>{r.value=!1})));return o}(n,e,t)}function useSeoMeta(e={},t={}){(t.head||injectHead()).use(y);const{title:n,titleTemplate:r,...o}=e;return useHead({title:n,titleTemplate:r,_flatMeta:o},t)}function createHead(e={}){const t=f({...e,propResolvers:[VueResolver]});return t.install=function(e){return{install(t){t.config.globalProperties.$unhead=e,t.config.globalProperties.$head=e,t.provide(N,e)}}.install}(t),t}const P={meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{name:"description",content:"cuzcuz - 创建和销售自定义产品，无需库存"},{name:"format-detection",content:"telephone=no"},{name:"theme-color",content:"#afe468"},{name:"robots",content:"index, follow"},{property:"og:title",content:"cuzcuz - 按需定制产品平台"},{property:"og:description",content:"创建和销售自定义产品，无需库存"},{property:"og:type",content:"website"},{property:"og:locale",content:"zh_CN"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:"cuzcuz - 按需定制产品平台"},{name:"twitter:description",content:"创建和销售自定义产品，无需库存"}],link:[{rel:"icon",type:"image/png",href:"/assets/favicon.png"},{rel:"dns-prefetch",href:"//fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossorigin:""},{rel:"manifest",href:"/manifest.json"}],style:[],script:[{type:"application/ld+json",innerHTML:'{"@context":"https://schema.org","@type":"WebSite","name":"cuzcuz","url":"https://your-domain.com","potentialAction":{"@type":"SearchAction","target":"https://your-domain.com/search?q={search_term_string}","query-input":"required name=search_term_string"}}'}],noscript:[],title:"cuzcuz",htmlAttrs:{lang:"zh-CN"}},M="div",D={id:"teleports"},E=`<${M}${m({id:"app"})}>`,z=`</${M}>`,getClientManifest=()=>import("../build/client.manifest.mjs").then((e=>e.default||e)).then((e=>"function"==typeof e?e():e)),I=lazyCachedFunction((()=>import("../build/styles.mjs").then((e=>e.default||e)))),U=lazyCachedFunction((async()=>{const e=await getClientManifest();if(!e)throw new Error("client.manifest is not available");const n=await import("../build/server.mjs").then((function(e){return e.R})).then((e=>e.default||e));if(!n)throw new Error("Server bundle is not available");return createRenderer(n,{manifest:e,renderToString:async function(e,t){const n=await S(e,t);return E+n+z},buildAssetsURL:t})})),q=lazyCachedFunction((async()=>{const e=await getClientManifest(),r=await import("../virtual/_virtual_spa-template.mjs").then((e=>e.template)).catch((()=>"")).then((e=>E+e+z)),o=createRenderer((()=>()=>{}),{manifest:e,renderToString:()=>r,buildAssetsURL:t}),s=await o.renderToString({});return{rendererContext:o.rendererContext,renderToString:e=>{const t=n(e.event);return e.modules||=new Set,e.payload.serverRendered=!1,e.config={public:t.public,app:t.app},Promise.resolve(s)}}}));function lazyCachedFunction(e){let t=null;return()=>(null===t&&(t=e().catch((e=>{throw t=null,e}))),t)}function renderPayloadJsonScript(e){const t={type:"application/json",innerHTML:e.data?T(e.data,e.ssrContext._payloadReducers):"","data-nuxt-data":"nuxt-app","data-ssr":!e.ssrContext.noSSR,id:"__NUXT_DATA__"};e.src&&(t["data-src"]=e.src);return[t,{innerHTML:`window.__NUXT__={};window.__NUXT__.config=${R(e.ssrContext.config)}`}]}function splitPayload(e){const{data:t,prerenderedAt:n,...r}=e.payload;return{initial:{...r,prerenderedAt:n},payload:{data:t,prerenderedAt:n}}}const F={disableDefaults:!0,disableCapoSorting:!1,plugins:[g,b,_,j]},W={omitLineBreaks:!1};globalThis.__buildAssetsURL=t,globalThis.__publicAssetsURL=i;const B=/\.json(\?.*)?$/;const J=!!D.id,X=J?`<div${m(D)}>`:"",V=J?"</div>":"",G=/^[^?]*\/_payload.json(?:\?.*)?$/,K=new RegExp(`^<${M}[^>]*>([\\s\\S]*)<\\/${M}>$`),Y=s((async e=>{const s=d(),i=e.path.startsWith("/__nuxt_error")?a(e):null;if(i&&i.statusCode&&(i.statusCode=Number.parseInt(i.statusCode)),i&&!("__unenv__"in e.node.req))throw c({statusCode:404,statusMessage:"Page Not Found: /__nuxt_error"});const f=e.path.startsWith("/__nuxt_island"),m=f?await async function(e){const t=(e.path||"").substring(15).replace(B,"").split("_"),n=t.length>1?t.pop():void 0,r=t.join("_"),o="GET"===e.method?a(e):await u(e);return{url:"/",...o,id:n,name:r,props:p(o.props)||{},slots:{},components:{}}}(e):void 0;let y=i?.url||m?.url||e.path;const g=!f&&G.test(y);g&&(y=y.substring(0,y.lastIndexOf("/"))||"/",e._path=y,e.node.req.url=y);const b=l(e),_=createHead(F),j={mode:"server"};f||_.push(P,j);const v={url:y,event:e,runtimeConfig:n(e),noSSR:e.context.nuxt?.noSSR||!1===b.ssr&&!f||!1,head:_,error:!!i,nuxt:void 0,payload:i?{error:i}:{},_payloadReducers:Object.create(null),modules:new Set,islandContext:m},x=v.noSSR?await q():await U();if(!f)for(const e of await getClientManifest().then((e=>Object.values(e).filter((e=>e._globalCSS)).map((e=>e.src)))))v.modules.add(e);const C=await x.renderToString(v).catch((async e=>{if(v._renderResponse&&"skipping render"===e.message)return{};const t=!i&&v.payload?.error||e;throw await(v.nuxt?.hooks.callHook("app:error",t)),t}));if(await(v.nuxt?.hooks.callHook("app:rendered",{ssrContext:v,renderResult:C})),v._renderResponse)return v._renderResponse;if(v.payload?.error&&!i)throw v.payload.error;if(g){const e=function(e){return{body:T(splitPayload(e).payload,e._payloadReducers),statusCode:o(e.event),statusMessage:r(e.event),headers:{"content-type":"application/json;charset=utf-8","x-powered-by":"Nuxt"}}}(v);return e}const S=await async function(e){const t=await I(),n=new Set;for(const r of e)if(r in t&&t[r])for(const e of await t[r]())n.add(e);return Array.from(n).map((e=>({innerHTML:e})))}(v.modules??[]),R=b.noScripts,{styles:O,scripts:$}=getRequestDependencies(v,x.rendererContext);if(v._preloadManifest&&_.push({link:[{rel:"preload",as:"fetch",fetchpriority:"low",crossorigin:"anonymous",href:t(`builds/meta/${v.runtimeConfig.app.buildId}.json`)}]},{...j,tagPriority:"low"}),S.length&&_.push({style:S}),!f){const e=[];for(const t of Object.values(O))e.push({rel:"stylesheet",href:x.rendererContext.buildAssetsURL(t.file),crossorigin:""});e.length&&_.push({link:e},j)}if(f&&m){const t={};for(const e of _.entries.values())for(const[n,r]of Object.entries((k=e.input,w(k,VueResolver)))){const e=t[n];Array.isArray(e)&&e.push(...r),t[n]=r}t.link||=[],t.style||=[];const n={id:m.id,head:t,html:getServerComponentHTML(C.html),components:getClientIslandResponse(v),slots:getSlotIslandResponse(v)};await s.hooks.callHook("render:island",n,{event:e,islandContext:m});return{body:JSON.stringify(n,null,2),statusCode:o(e),statusMessage:r(e),headers:{"content-type":"application/json;charset=utf-8","x-powered-by":"Nuxt"}}}var k;R||(_.push({link:getPreloadLinks(v,x.rendererContext)},j),_.push({link:getPrefetchLinks(v,x.rendererContext)},j),_.push({script:renderPayloadJsonScript({ssrContext:v,data:v.payload})},{...j,tagPosition:"bodyClose",tagPriority:"high"})),b.noScripts||_.push({script:Object.values($).map((e=>({type:e.module?"module":null,src:x.rendererContext.buildAssetsURL(e.file),defer:!e.module||null,tagPosition:"head",crossorigin:""})))},j);const{headTags:A,bodyTags:L,bodyTagsOpen:H,htmlAttrs:N,bodyAttrs:M}=await h(_,W),E={island:f,htmlAttrs:N?[N]:[],head:normalizeChunks([A]),bodyAttrs:M?[M]:[],bodyPrepend:normalizeChunks([H,v.teleports?.body]),body:[replaceIslandTeleports(v,C.html),X+(J?joinTags([v.teleports?.[`#${D.id}`]]):"")+V],bodyAppend:[L]};await s.hooks.callHook("render:html",E,{event:e});var z;return{body:(z=E,`<!DOCTYPE html><html${joinAttrs(z.htmlAttrs)}><head>${joinTags(z.head)}</head><body${joinAttrs(z.bodyAttrs)}>${joinTags(z.bodyPrepend)}${joinTags(z.body)}${joinTags(z.bodyAppend)}</body></html>`),statusCode:o(e),statusMessage:r(e),headers:{"content-type":"text/html;charset=utf-8","x-powered-by":"Nuxt"}}}));function normalizeChunks(e){return e.filter(Boolean).map((e=>e.trim()))}function joinTags(e){return e.join("")}function joinAttrs(e){return 0===e.length?"":" "+e.join(" ")}function getServerComponentHTML(e){const t=e.match(K);return t?.[1]||e}const Q=/^uid=([^;]*);slot=(.*)$/,Z=/^uid=([^;]*);client=(.*)$/,ee=/^island-slot=([^;]*);(.*)$/;function getSlotIslandResponse(e){if(!e.islandContext||!Object.keys(e.islandContext.slots).length)return;const t={};for(const[n,r]of Object.entries(e.islandContext.slots))t[n]={...r,fallback:e.teleports?.[`island-fallback=${n}`]};return t}function getClientIslandResponse(e){if(!e.islandContext||!Object.keys(e.islandContext.components).length)return;const t={};for(const[n,r]of Object.entries(e.islandContext.components)){const o=e.teleports?.[n]?.replaceAll("\x3c!--teleport start anchor--\x3e","")||"";t[n]={...r,html:o,slots:getComponentSlotTeleport(n,e.teleports??{})}}return t}function getComponentSlotTeleport(e,t){const n=Object.entries(t),r={};for(const[t,o]of n){const n=t.match(ee);if(n){const[,t,s]=n;if(!s||e!==t)continue;r[s]=o}}return r}function replaceIslandTeleports(e,t){const{teleports:n,islandContext:r}=e;if(r||!n)return t;for(const e in n){const r=e.match(Z);if(r){const[,o,s]=r;if(!o||!s)continue;t=t.replace(new RegExp(` data-island-uid="${o}" data-island-component="${s}"[^>]*>`),(t=>t+n[e]));continue}const o=e.match(Q);if(o){const[,r,s]=o;if(!r||!s)continue;t=t.replace(new RegExp(` data-island-uid="${r}" data-island-slot="${s}"[^>]*>`),(t=>t+n[e]))}}return t}const te=Object.freeze({__proto__:null,default:Y});export{useSeoMeta as a,N as h,te as r,useHead as u};
//# sourceMappingURL=renderer.mjs.map
