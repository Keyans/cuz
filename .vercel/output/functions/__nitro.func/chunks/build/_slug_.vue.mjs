import{d as e,u as t,e as r,v as i,f as s,g as a,s as o,_ as n}from"./server.mjs";import{_ as d}from"./nuxt-link.mjs";import{m as l,w as c,n as u,o as p,y as m,z as g,A as h}from"../nitro/nitro.mjs";import"source-map-js";import"lodash-unified";import"../routes/renderer.mjs";import"unhead/server";import"unhead/plugins";import"unhead/utils";import"@vue/compiler-dom";import"@vue/runtime-dom";import"@vue/shared";import"@vue/server-renderer";import"devalue";import"node:stream";import"node:http";import"node:https";import"node:events";import"node:buffer";import"node:fs";import"node:path";import"node:crypto";import"node:url";import"ipx";const f={__name:"AppSeo",__ssrInlineRender:!0,props:{title:{type:String,default:""},description:{type:String,default:"Create and sell custom products with print-on-demand"},keywords:{type:String,default:"cuzcuz, print-on-demand, custom products, merchandise"},ogImage:{type:String,default:"/assets/og-image.jpg"},ogType:{type:String,default:"website"},twitterCard:{type:String,default:"summary_large_image"},canonicalUrl:{type:String,default:""}},setup(s){const a=s;e({title:a.title||"cuzcuz",ogTitle:a.title||"cuzcuz",description:a.description,ogDescription:a.description,ogImage:a.ogImage,ogType:a.ogType,twitterCard:a.twitterCard,keywords:a.keywords}),t({link:[a.canonicalUrl?{rel:"canonical",href:`https://your-domain.com${a.canonicalUrl||r().path}`}:null].filter(Boolean)});const o=i.computed((()=>({"@context":"https://schema.org","@type":"WebSite",name:a.title||"cuzcuz",description:a.description,url:`https://your-domain.com${a.canonicalUrl||r().path}`})));return t({script:[{type:"application/ld+json",innerHTML:JSON.stringify(o.value)}]}),(e,t,r,i)=>{}}},v=f.setup;async function imageMeta(e,t){const r=await async function(e){{const t=(await import("image-meta").then((e=>e.imageMeta)))(await fetch(e).then((e=>e.buffer())));if(!t)throw new Error(`No metadata could be extracted from the image \`${e}\`.`);const{width:r,height:i}=t;return{width:r,height:i,ratio:r&&i?r/i:void 0}}}(t).catch((e=>(console.error("Failed to get image meta for "+t,e+""),{width:0,height:0,ratio:0})));return r}function createMapper(e){return t=>t?e[t]||t:e.missingValue}function parseSize(e=""){return"number"==typeof e?e:"string"==typeof e&&e.replace("px","").match(/^\d+$/g)?Number.parseInt(e,10):void 0}function createImage(e){const t={options:e},getImage=(e,r={})=>resolveImage(t,e,r),$img=(e,t={},r={})=>getImage(e,{...r,modifiers:l(t,r.modifiers||{})}).url;for(const t in e.presets)$img[t]=(r,i,s)=>$img(r,i,{...e.presets[t],...s});return $img.options=e,$img.getImage=getImage,$img.getMeta=(e,r)=>async function(e,t,r){const i=resolveImage(e,t,{...r});return"function"==typeof i.getMeta?await i.getMeta():await imageMeta(0,i.url)}(t,e,r),$img.getSizes=(e,r)=>function(e,t,r){var i,s,a,o,n;const d=parseSize(null==(i=r.modifiers)?void 0:i.width),l=parseSize(null==(s=r.modifiers)?void 0:s.height),c=function(e){const t={};if("string"==typeof e)for(const r of e.split(/[\s,]+/).filter((e=>e))){const e=r.split(":");2!==e.length?t["1px"]=e[0].trim():t[e[0].trim()]=e[1].trim()}else Object.assign(t,e);return t}(r.sizes),u=(null==(a=r.densities)?void 0:a.trim())?function(e=""){if(void 0===e||!e.length)return[];const t=new Set;for(const r of e.split(" ")){const e=Number.parseInt(r.replace("x",""));e&&t.add(e)}return Array.from(t)}(r.densities.trim()):e.options.densities;!function(e){if(0===e.length)throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)")}(u);const p=d&&l?l/d:0,m=[],g=[];if(Object.keys(c).length>=1){for(const i in c){const s=getSizesVariant(i,String(c[i]),l,p,e);if(void 0!==s){m.push({size:s.size,screenMaxWidth:s.screenMaxWidth,media:`(max-width: ${s.screenMaxWidth}px)`});for(const i of u)g.push({width:s._cWidth*i,src:getVariantSrc(e,t,r,s,i)})}}!function(e){var t;e.sort(((e,t)=>e.screenMaxWidth-t.screenMaxWidth));let r=null;for(let t=e.length-1;t>=0;t--){const i=e[t];i.media===r&&e.splice(t,1),r=i.media}for(let r=0;r<e.length;r++)e[r].media=(null==(t=e[r+1])?void 0:t.media)||""}(m)}else for(const i of u){const s=Object.keys(c)[0];let a=s?getSizesVariant(s,String(c[s]),l,p,e):void 0;void 0===a&&(a={size:"",screenMaxWidth:0,_cWidth:null==(o=r.modifiers)?void 0:o.width,_cHeight:null==(n=r.modifiers)?void 0:n.height}),g.push({width:i,src:getVariantSrc(e,t,r,a,i)})}!function(e){e.sort(((e,t)=>e.width-t.width));let t=null;for(let r=e.length-1;r>=0;r--){const i=e[r];i.width===t&&e.splice(r,1),t=i.width}}(g);const h=g[g.length-1],f=m.length?m.map((e=>`${e.media?e.media+" ":""}${e.size}`)).join(", "):void 0,v=f?"w":"x",y=g.map((e=>`${e.src} ${e.width}${v}`)).join(", ");return{sizes:f,srcset:y,src:null==h?void 0:h.src}}(t,e,r),t.$img=$img,$img}function resolveImage(e,t,r){var i,s;if(t&&"string"!=typeof t)throw new TypeError(`input must be a string (received ${typeof t}: ${JSON.stringify(t)})`);if(!t||t.startsWith("data:"))return{url:t};const{provider:a,defaults:o}=function(e,t){const r=e.options.providers[t];if(!r)throw new Error("Unknown provider: "+t);return r}(e,r.provider||e.options.provider),n=function(e,t){if(!t)return{};if(!e.options.presets[t])throw new Error("Unknown preset: "+t);return e.options.presets[t]}(e,r.preset);if(t=u(t)?t:c(t),!a.supportsAlias)for(const r in e.options.alias)if(t.startsWith(r)){const i=e.options.alias[r];i&&(t=p(i,t.slice(r.length)))}if(a.validateDomains&&u(t)){const r=m(t).host;if(!e.options.domains.find((e=>e===r)))return{url:t}}const d=l(r,n,o);d.modifiers={...d.modifiers};const g=d.modifiers.format;(null==(i=d.modifiers)?void 0:i.width)&&(d.modifiers.width=parseSize(d.modifiers.width)),(null==(s=d.modifiers)?void 0:s.height)&&(d.modifiers.height=parseSize(d.modifiers.height));const h=a.getImage(t,d,e);return h.format=h.format||g||"",h}function getSizesVariant(e,t,r,i,s){const a=s.options.screens&&s.options.screens[e]||Number.parseInt(e),o=t.endsWith("vw");if(!o&&/^\d+$/.test(t)&&(t+="px"),!o&&!t.endsWith("px"))return;let n=Number.parseInt(t);if(!a||!n)return;o&&(n=Math.round(n/100*a));return{size:t,screenMaxWidth:a,_cWidth:n,_cHeight:i?Math.round(n*i):r}}function getVariantSrc(e,t,r,i,s){return e.$img(t,{...r.modifiers,width:i._cWidth?i._cWidth*s:void 0,height:i._cHeight?i._cHeight*s:void 0},r)}f.setup=(e,t)=>{const r=i.useSSRContext();return(r.modules||(r.modules=new Set)).add("components/AppSeo.vue"),v?v(e,t):void 0};const y=function({formatter:e,keyMap:t,joinWith:r="/",valueMap:i}={}){e||(e=(e,t)=>`${e}=${t}`),t&&"function"!=typeof t&&(t=createMapper(t));const s=i||{};return Object.keys(s).forEach((e=>{"function"!=typeof s[e]&&(s[e]=createMapper(s[e]))})),(i={})=>Object.entries(i).filter((([e,t])=>void 0!==t)).map((([r,a])=>{const o=s[r];return"function"==typeof o&&(a=o(i[r])),r="function"==typeof t?t(r):r,e(r,a)})).join(r)}({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(e,t)=>h(e)+"_"+h(t)}),b=Object.freeze({__proto__:null,getImage:(e,{modifiers:t={},baseURL:r}={},i)=>{t.width&&t.height&&(t.resize=`${t.width}x${t.height}`,delete t.width,delete t.height);const s=y(t)||"_";return r||(r=p(i.options.nuxt.baseURL,"/_ipx")),{url:p(r,s,g(e))}},supportsAlias:!0,validateDomains:!0}),x={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{product:{modifiers:{format:"webp",quality:80,width:500,height:500}},thumbnail:{modifiers:{format:"webp",quality:60,width:200,height:200}}},provider:"ipx",domains:["your-domain.com"],alias:{},densities:[1,2],format:["webp","avif","jpg","png","webp"],quality:80};x.providers={ipx:{provider:b,defaults:{}}};const useImage=()=>{const e=a(),t=s();return t.$img||t._img||(t._img=createImage({...x,nuxt:{baseURL:e.app.baseURL},runtimeConfig:e}))},w={src:{type:String,required:!1},format:{type:String,required:!1},quality:{type:[Number,String],required:!1},background:{type:String,required:!1},fit:{type:String,required:!1},modifiers:{type:Object,required:!1},preset:{type:String,required:!1},provider:{type:String,required:!1},sizes:{type:[Object,String],required:!1},densities:{type:String,required:!1},preload:{type:[Boolean,Object],required:!1},width:{type:[String,Number],required:!1},height:{type:[String,Number],required:!1},alt:{type:String,required:!1},referrerpolicy:{type:String,required:!1},usemap:{type:String,required:!1},longdesc:{type:String,required:!1},ismap:{type:Boolean,required:!1},loading:{type:String,required:!1,validator:e=>["lazy","eager"].includes(e)},crossorigin:{type:[Boolean,String],required:!1,validator:e=>["anonymous","use-credentials","",!0,!1].includes(e)},decoding:{type:String,required:!1,validator:e=>["async","auto","sync"].includes(e)},nonce:{type:[String],required:!1}},S={...w,placeholder:{type:[Boolean,String,Number,Array],required:!1},placeholderClass:{type:String,required:!1},custom:{type:Boolean,required:!1}},$=i.defineComponent({__name:"NuxtImg",__ssrInlineRender:!0,props:S,emits:["load","error"],setup(e,{emit:r}){const a=e,n=i.useAttrs(),d=!0,l=useImage(),c=(e=>{const t=i.computed((()=>({provider:e.provider,preset:e.preset}))),r=i.computed((()=>({width:parseSize(e.width),height:parseSize(e.height),alt:e.alt,referrerpolicy:e.referrerpolicy,usemap:e.usemap,longdesc:e.longdesc,ismap:e.ismap,crossorigin:!0===e.crossorigin?"anonymous":e.crossorigin||void 0,loading:e.loading,decoding:e.decoding,nonce:e.nonce}))),s=useImage();return{options:t,attrs:r,modifiers:i.computed((()=>({...e.modifiers,width:parseSize(e.width),height:parseSize(e.height),format:e.format,quality:e.quality||s.options.quality,background:e.background,fit:e.fit})))}})(a),u=i.ref(!1),p=i.ref(),m=i.computed((()=>l.getSizes(a.src,{...c.options.value,sizes:a.sizes,densities:a.densities,modifiers:{...c.modifiers.value,width:parseSize(a.width),height:parseSize(a.height)}}))),g=i.computed((()=>{const e={...c.attrs.value,"data-nuxt-img":""};return a.placeholder&&!u.value||(e.sizes=m.value.sizes,e.srcset=m.value.srcset),e})),h=i.computed((()=>{let e=a.placeholder;if(""===e&&(e=!0),!e||u.value)return!1;if("string"==typeof e)return e;const t=Array.isArray(e)?e:"number"==typeof e?[e,e]:[10,10];return l(a.src,{...c.modifiers.value,width:t[0],height:t[1],quality:t[2]||50,blur:t[3]||3},c.options.value)})),f=i.computed((()=>a.sizes?m.value.src:l(a.src,c.modifiers.value,c.options.value))),v=i.computed((()=>h.value?h.value:f.value));if(a.preload){const e=Object.values(m.value).every((e=>e));t({link:[{rel:"preload",as:"image",nonce:a.nonce,...e?{href:m.value.src,imagesizes:m.value.sizes,imagesrcset:m.value.srcset}:{href:v.value},..."boolean"!=typeof a.preload&&a.preload.fetchPriority?{fetchpriority:a.preload.fetchPriority}:{}}]})}return s().isHydrating,(e,t,r,s)=>{e.custom?o.ssrRenderSlot(e.$slots,"default",{...i.unref(d)?{onerror:"this.setAttribute('data-error', 1)"}:{},imgAttrs:{...g.value,...i.unref(n)},isLoaded:u.value,src:v.value},null,t,r):t(`<img${o.ssrRenderAttrs(i.mergeProps({ref_key:"imgEl",ref:p,class:h.value&&!u.value?e.placeholderClass:void 0},{...i.unref(d)?{onerror:"this.setAttribute('data-error', 1)"}:{},...g.value,...i.unref(n)},{src:v.value},s))}>`)}}}),z=i.defineComponent({__name:"OptimizedImage",__ssrInlineRender:!0,props:{src:{type:String,required:!0},alt:{type:String,default:""},width:{type:[Number,String],default:void 0},height:{type:[Number,String],default:void 0},placeholder:{type:String,default:void 0},quality:{type:Number,default:80},loading:{type:String,default:"lazy"},sizes:{type:String,default:"(max-width: 768px) 100vw, 50vw"},imgClass:{type:String,default:""},wrapperClass:{type:String,default:""},provider:{type:String,default:void 0},preset:{type:String,default:void 0}},setup:e=>(t,r,s,a)=>{const n=$;r(`<div${o.ssrRenderAttrs(i.mergeProps({class:e.wrapperClass},a))}>`),r(o.ssrRenderComponent(n,{src:e.src,alt:e.alt,width:e.width,height:e.height,placeholder:e.placeholder,quality:e.quality,loading:e.loading,sizes:e.sizes,class:e.imgClass,format:"webp",provider:e.provider,preset:e.preset},null,s)),r("</div>")}}),C={__name:"LazyLoadSection",__ssrInlineRender:!0,setup(e){const t=i.ref(null),r=i.ref(!1);return(e,s,a,n)=>{s(`<div${o.ssrRenderAttrs(i.mergeProps({ref_key:"lazyLoadRef",ref:t},n))} data-v-f3a87fed>`),r.value?(s("<div data-v-f3a87fed>"),o.ssrRenderSlot(e.$slots,"default",{},null,s,a),s("</div>")):(s('<div class="min-h-[100px] skeleton-loading" data-v-f3a87fed>'),o.ssrRenderSlot(e.$slots,"placeholder",{},(()=>{s('<div class="animate-pulse flex flex-col space-y-4 h-full" data-v-f3a87fed><div class="h-4 bg-gray-200 rounded-md w-3/4" data-v-f3a87fed></div><div class="h-4 bg-gray-200 rounded-md w-1/2" data-v-f3a87fed></div><div class="h-4 bg-gray-200 rounded-md w-5/6" data-v-f3a87fed></div></div>')}),s,a),s("</div>")),s("</div>")}}},R=C.setup;C.setup=(e,t)=>{const r=i.useSSRContext();return(r.modules||(r.modules=new Set)).add("components/common/LazyLoadSection.vue"),R?R(e,t):void 0};const _=n(C,[["__scopeId","data-v-f3a87fed"]]),q=i.defineComponent({__name:"[slug]",__ssrInlineRender:!0,setup(e){r().params.slug;const s=i.ref({id:1,name:"Custom Printed T-Shirt",slug:"custom-printed-tshirt",description:"Premium quality custom printed t-shirt made with 100% cotton. Perfect for your brand or special event.",fullDescription:"Our premium quality custom printed t-shirts are made with 100% combed ring-spun cotton, providing exceptional comfort and durability. These shirts feature a modern fit that flatters any body type and are pre-shrunk to ensure your design stays looking great wash after wash. Perfect for brand merchandise, special events, or personal expression, our t-shirts offer a canvas for your creativity with vibrant, long-lasting prints that won't crack or fade.",image:"/assets/products/tshirt.png",price:24.99,category:"Clothing",subcategory:"T-Shirts",rating:4.5,reviewCount:127,specifications:["100% ring-spun cotton","Pre-shrunk","Shoulder-to-shoulder taping","Quarter-turned to avoid crease down the center","Double-needle sleeve and bottom hem"],specTable:{Material:"100% Combed Ring-Spun Cotton",Weight:"4.3 oz/yd² (145.8 g/m²)","Fabric Thickness":"Medium","Printing Method":"DTG (Direct to Garment)","Sizes Available":"XS, S, M, L, XL, 2XL, 3XL","Care Instructions":"Machine wash cold, inside-out, gentle cycle with mild detergent"},colors:[{name:"White",hex:"#ffffff"},{name:"Black",hex:"#000000"},{name:"Navy",hex:"#000080"},{name:"Red",hex:"#ff0000"},{name:"Green",hex:"#008000"}],sizes:["XS","S","M","L","XL","2XL","3XL"],reviews:[{author:"John D.",date:"2025-02-15",rating:5,title:"Great quality shirt!",comment:"The print quality is excellent and the shirt is very comfortable. Highly recommend!"},{author:"Sarah L.",date:"2025-01-20",rating:4,title:"Good shirt, runs a bit small",comment:"The quality is good but I found it runs a bit small. Order a size up if you're unsure."},{author:"Mike T.",date:"2024-12-10",rating:5,title:"Perfect for our team",comment:"We ordered these for our company event and everyone loved them. Great quality and fast shipping."}]}),a=i.ref([{id:2,name:"Custom Hoodie",slug:"custom-hoodie",image:"/assets/products/hoodie.png",price:39.99},{id:3,name:"Custom Mug",slug:"custom-mug",image:"/assets/products/mug.png",price:14.99},{id:4,name:"Custom Tote Bag",slug:"custom-tote-bag",image:"/assets/products/bags.png",price:19.99},{id:5,name:"Custom Sweatshirt",slug:"custom-sweatshirt",image:"/assets/products/sweatshirt.png",price:34.99}]),n=i.ref("White"),l=i.ref("M"),c=i.ref(1),u=[{id:"details",name:"详情"},{id:"specifications",name:"规格"},{id:"reviews",name:"评价"}],p=i.ref("details");return t({script:[{type:"application/ld+json",innerHTML:JSON.stringify({"@context":"https://schema.org/","@type":"Product",name:s.value.name,image:[s.value.image],description:s.value.description,brand:{"@type":"Brand",name:"cuzcuz"},sku:`PRD-${s.value.id}`,offers:{"@type":"Offer",url:`https://your-domain.com/products/${s.value.slug}`,priceCurrency:"USD",price:s.value.price,priceValidUntil:"2026-12-31",availability:"https://schema.org/InStock",itemCondition:"https://schema.org/NewCondition"},aggregateRating:{"@type":"AggregateRating",ratingValue:s.value.rating,reviewCount:s.value.reviewCount},review:s.value.reviews.map((e=>({"@type":"Review",reviewRating:{"@type":"Rating",ratingValue:e.rating,bestRating:"5"},author:{"@type":"Person",name:e.author},datePublished:e.date,reviewBody:e.comment,name:e.title})))})}]}),(e,t,r,m)=>{const g=f,h=d;t(`<div${o.ssrRenderAttrs(m)}>`),t(o.ssrRenderComponent(g,{title:`${s.value.name} - cuzcuz 产品详情`,description:`${s.value.name} - ${s.value.description.substring(0,150)}...`,keywords:`cuzcuz, 定制${s.value.name}, 按需印刷, 定制产品, ${s.value.category}`,ogImage:s.value.image,ogType:"product"},null,r)),t('<div class="container-app py-8 md:py-12"><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="bg-white rounded-lg shadow overflow-hidden">'),t(o.ssrRenderComponent(z,{src:s.value.image,alt:s.value.name,class:"w-full h-auto object-contain",width:"500",height:"500",format:"webp",preset:"product",loading:"eager",imgClass:"w-full h-auto object-contain aspect-square"},null,r)),t(`</div><div><h1 class="text-2xl md:text-3xl font-bold text-primary mb-2">${o.ssrInterpolate(s.value.name)}</h1><div class="flex items-center mb-4"><div class="flex">\x3c!--[--\x3e`),o.ssrRenderList(5,(e=>{t(`<span class="text-yellow-400"><svg class="${o.ssrRenderClass([e<=s.value.rating?"text-yellow-400":"text-gray-300","w-5 h-5"])}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></span>`)})),t(`\x3c!--]--\x3e<span class="text-sm text-gray-600 ml-2">${o.ssrInterpolate(s.value.reviewCount)} 条评价</span></div></div><div class="text-2xl font-bold text-primary mb-4">$${o.ssrInterpolate(s.value.price.toFixed(2))}</div><div class="mb-6"><h2 class="font-bold text-lg mb-2">描述</h2><p class="text-gray-700">${o.ssrInterpolate(s.value.description)}</p></div><div class="mb-6"><h2 class="font-bold text-lg mb-2">规格</h2><ul class="list-disc list-inside text-gray-700">\x3c!--[--\x3e`),o.ssrRenderList(s.value.specifications,((e,r)=>{t(`<li>${o.ssrInterpolate(e)}</li>`)})),t('\x3c!--]--\x3e</ul></div><div class="mb-6"><h2 class="font-bold text-lg mb-2">选择颜色</h2><div class="flex space-x-2">\x3c!--[--\x3e'),o.ssrRenderList(s.value.colors,(e=>{t(`<button class="${o.ssrRenderClass([n.value===e.name?"border-primary":"border-transparent","w-8 h-8 rounded-full border-2"])}" style="${o.ssrRenderStyle({backgroundColor:e.hex})}"></button>`)})),t('\x3c!--]--\x3e</div></div><div class="mb-6"><h2 class="font-bold text-lg mb-2">选择尺寸</h2><div class="flex flex-wrap gap-2">\x3c!--[--\x3e'),o.ssrRenderList(s.value.sizes,(e=>{t(`<button class="${o.ssrRenderClass([l.value===e?"bg-secondary border-primary text-primary":"border-gray-300 hover:border-primary","px-3 py-1 border rounded"])}">${o.ssrInterpolate(e)}</button>`)})),t(`\x3c!--]--\x3e</div></div><div class="flex items-center mb-6"><div class="mr-4"><label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">数量</label><div class="flex"><button class="px-2 py-1 border border-gray-300 rounded-l"> - </button><input id="quantity"${o.ssrRenderAttr("value",c.value)} type="number" min="1" class="w-12 text-center border-t border-b border-gray-300"><button class="px-2 py-1 border border-gray-300 rounded-r"> + </button></div></div></div><div class="flex flex-col sm:flex-row gap-3"><button class="btn-primary px-6 py-2">定制设计</button><button class="btn-secondary px-6 py-2">添加到购物车</button></div></div></div><div class="mt-12"><div class="border-b border-gray-200"><nav class="flex -mb-px space-x-8">\x3c!--[--\x3e`),o.ssrRenderList(u,(e=>{t(`<button class="${o.ssrRenderClass([p.value===e.id?"border-primary text-primary":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300","py-4 px-1 border-b-2 font-medium text-sm"])}">${o.ssrInterpolate(e.name)}</button>`)})),t('\x3c!--]--\x3e</nav></div><div class="py-6">'),"details"===p.value?t(`<div class="prose max-w-none"><h3 class="text-xl font-bold mb-4">产品详情</h3><p>${o.ssrInterpolate(s.value.fullDescription)}</p></div>`):t("\x3c!----\x3e"),"specifications"===p.value?(t('<div class="prose max-w-none"><h3 class="text-xl font-bold mb-4">规格</h3><ul>\x3c!--[--\x3e'),o.ssrRenderList(s.value.specifications,((e,r)=>{t(`<li class="mb-2">${o.ssrInterpolate(e)}</li>`)})),t('\x3c!--]--\x3e</ul><table class="w-full mt-4 border-collapse"><thead><tr class="bg-gray-100"><th class="border border-gray-300 px-4 py-2 text-left">规格</th><th class="border border-gray-300 px-4 py-2 text-left">值</th></tr></thead><tbody>\x3c!--[--\x3e'),o.ssrRenderList(s.value.specTable,((e,r)=>{t(`<tr><td class="border border-gray-300 px-4 py-2 font-medium">${o.ssrInterpolate(r)}</td><td class="border border-gray-300 px-4 py-2">${o.ssrInterpolate(e)}</td></tr>`)})),t("\x3c!--]--\x3e</tbody></table></div>")):t("\x3c!----\x3e"),"reviews"===p.value?(t('<div class="prose max-w-none"><h3 class="text-xl font-bold mb-4">客户评价</h3>'),0===s.value.reviews.length?t('<div class="text-gray-500"> 暂无评价 </div>'):(t("<div>\x3c!--[--\x3e"),o.ssrRenderList(s.value.reviews,((e,r)=>{t('<div class="mb-6 pb-6 border-b border-gray-200 last:border-0"><div class="flex items-center mb-2"><div class="flex">\x3c!--[--\x3e'),o.ssrRenderList(5,(r=>{t(`<span class="text-yellow-400"><svg class="${o.ssrRenderClass([r<=e.rating?"text-yellow-400":"text-gray-300","w-4 h-4"])}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></span>`)})),t(`\x3c!--]--\x3e</div><span class="font-bold ml-2">${o.ssrInterpolate(e.title)}</span></div><p class="text-gray-700 mb-2">${o.ssrInterpolate(e.comment)}</p><div class="flex items-center text-sm text-gray-500"><span class="font-medium mr-2">${o.ssrInterpolate(e.author)}</span><span>${o.ssrInterpolate(e.date)}</span></div></div>`)})),t("\x3c!--]--\x3e</div>")),t("</div>")):t("\x3c!----\x3e"),t("</div></div>"),t(o.ssrRenderComponent(_,null,{default:i.withCtx(((e,t,r,s)=>{if(!t)return[i.createVNode("div",{class:"mt-12"},[i.createVNode("h2",{class:"text-2xl font-bold text-primary mb-6"},"相关产品"),i.createVNode("div",{class:"grid grid-cols-2 md:grid-cols-4 gap-4"},[(i.openBlock(!0),i.createBlock(i.Fragment,null,i.renderList(a.value,(e=>(i.openBlock(),i.createBlock("div",{key:e.id,class:"bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"},[i.createVNode(h,{to:`/products/${e.slug}`,class:"block"},{default:i.withCtx((()=>[i.createVNode(z,{src:e.image,alt:e.name,width:"200",height:"200",format:"webp",preset:"thumbnail",loading:"lazy",imgClass:"w-full h-40 object-contain"},null,8,["src","alt"]),i.createVNode("div",{class:"p-4"},[i.createVNode("h3",{class:"font-bold text-primary mb-1 truncate"},i.toDisplayString(e.name),1),i.createVNode("p",{class:"text-gray-700 font-bold"},"$"+i.toDisplayString(e.price.toFixed(2)),1)])])),_:2},1032,["to"])])))),128))])])];t(`<div class="mt-12"${s}><h2 class="text-2xl font-bold text-primary mb-6"${s}>相关产品</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-4"${s}>\x3c!--[--\x3e`),o.ssrRenderList(a.value,(e=>{t(`<div class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"${s}>`),t(o.ssrRenderComponent(h,{to:`/products/${e.slug}`,class:"block"},{default:i.withCtx(((t,r,s,a)=>{if(!r)return[i.createVNode(z,{src:e.image,alt:e.name,width:"200",height:"200",format:"webp",preset:"thumbnail",loading:"lazy",imgClass:"w-full h-40 object-contain"},null,8,["src","alt"]),i.createVNode("div",{class:"p-4"},[i.createVNode("h3",{class:"font-bold text-primary mb-1 truncate"},i.toDisplayString(e.name),1),i.createVNode("p",{class:"text-gray-700 font-bold"},"$"+i.toDisplayString(e.price.toFixed(2)),1)])];r(o.ssrRenderComponent(z,{src:e.image,alt:e.name,width:"200",height:"200",format:"webp",preset:"thumbnail",loading:"lazy",imgClass:"w-full h-40 object-contain"},null,s,a)),r(`<div class="p-4"${a}><h3 class="font-bold text-primary mb-1 truncate"${a}>${o.ssrInterpolate(e.name)}</h3><p class="text-gray-700 font-bold"${a}>$${o.ssrInterpolate(e.price.toFixed(2))}</p></div>`)})),_:2},r,s)),t("</div>")})),t("\x3c!--]--\x3e</div></div>")})),_:1},r)),t("</div></div>")}}}),I=q.setup;q.setup=(e,t)=>{const r=i.useSSRContext();return(r.modules||(r.modules=new Set)).add("pages/products/[slug].vue"),I?I(e,t):void 0};export{q as default};
//# sourceMappingURL=_slug_.vue.mjs.map
