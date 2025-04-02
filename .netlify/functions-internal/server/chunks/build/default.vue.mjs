import{_ as e}from"./nuxt-link.mjs";import{v as t,h as s,s as r}from"./server.mjs";import{_ as a}from"./virtual_public.mjs";import{u as o}from"./auth2.mjs";import{_ as d}from"./_plugin-vue_export-helper.mjs";import{p as c}from"../nitro/nitro.mjs";import"source-map-js";import"../routes/renderer.mjs";import"unhead/server";import"unhead/plugins";import"unhead/utils";import"@vue/compiler-dom";import"@vue/runtime-dom";import"@vue/shared";import"@vue/server-renderer";import"devalue";import"node:stream";import"node:http";import"node:https";import"node:events";import"node:buffer";import"node:fs";import"node:path";import"node:crypto";import"node:url";import"ipx";const n=t.defineComponent({__name:"AppHeader",__ssrInlineRender:!0,setup(d){const c=t.ref(!1),n=s(),isActive=e=>n.path===e||n.path.startsWith(`${e}/`),i=o(),l=t.computed((()=>i.isAuthenticated)),m=[{name:"选品中心",href:"/products",icon:"products",hasDropdown:!0,dropdownItems:[{name:"热门产品",href:"/products/popular"},{name:"新品上架",href:"/products/new"},{name:"定制服装",href:"/products/clothing"},{name:"家居用品",href:"/products/home"}]},{name:"网站设计",href:"/design",icon:"design"},{name:"创意图库",href:"/gallery",icon:"gallery"}],p=t.ref(""),closeDropdowns=()=>{p.value=""},v=t.ref("zh"),u=t.ref(!1),x=[{code:"zh",name:"中文"},{code:"en",name:"English"}];return(s,o,d,n)=>{const i=e;o(`<header${r.ssrRenderAttrs(t.mergeProps({class:"bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm shadow-sm sticky top-0 z-40"},n))} data-v-3dc5cb6c><div class="container-app" data-v-3dc5cb6c><div class="flex justify-between items-center h-16" data-v-3dc5cb6c><div class="flex-shrink-0" data-v-3dc5cb6c>`),o(r.ssrRenderComponent(i,{to:"/",class:"flex items-center"},{default:t.withCtx(((e,s,o,d)=>{if(!s)return[t.createVNode("img",{src:a,alt:"Printify",class:"h-8 w-auto"})];s(`<img${r.ssrRenderAttr("src",a)} alt="Printify" class="h-8 w-auto" data-v-3dc5cb6c${d}>`)})),_:1},d)),o('</div><nav class="hidden md:flex space-x-4" data-v-3dc5cb6c>\x3c!--[--\x3e'),r.ssrRenderList(m,(e=>{o('<div class="relative" data-v-3dc5cb6c>'),e.hasDropdown?o(`<div class="${r.ssrRenderClass([{"text-primary":isActive(e.href)||p.value===e.name},"flex items-center cursor-pointer text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"])}" data-v-3dc5cb6c><svg class="h-5 w-5 mr-1" data-v-3dc5cb6c><use${r.ssrRenderAttr("href",`/assets/nav-icons.svg#icon-${e.icon}`)} data-v-3dc5cb6c></use></svg> ${r.ssrInterpolate(e.name)} <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3dc5cb6c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-3dc5cb6c></path></svg></div>`):o(r.ssrRenderComponent(i,{to:e.href,class:["flex items-center text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium",{"text-primary":isActive(e.href)}]},{default:t.withCtx(((s,a,o,d)=>{if(!a)return[(t.openBlock(),t.createBlock("svg",{class:"h-5 w-5 mr-1"},[t.createVNode("use",{href:`/assets/nav-icons.svg#icon-${e.icon}`},null,8,["href"])])),t.createTextVNode(" "+t.toDisplayString(e.name),1)];a(`<svg class="h-5 w-5 mr-1" data-v-3dc5cb6c${d}><use${r.ssrRenderAttr("href",`/assets/nav-icons.svg#icon-${e.icon}`)} data-v-3dc5cb6c${d}></use></svg> ${r.ssrInterpolate(e.name)}`)})),_:2},d)),e.hasDropdown&&p.value===e.name?(o('<div class="absolute z-10 left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" data-v-3dc5cb6c><div class="py-1" data-v-3dc5cb6c>\x3c!--[--\x3e'),r.ssrRenderList(e.dropdownItems,(e=>{o(r.ssrRenderComponent(i,{key:e.name,to:e.href,class:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",onClick:closeDropdowns},{default:t.withCtx(((s,a,o,d)=>{if(!a)return[t.createTextVNode(t.toDisplayString(e.name),1)];a(`${r.ssrInterpolate(e.name)}`)})),_:2},d))})),o("\x3c!--]--\x3e</div></div>")):o("\x3c!----\x3e"),o("</div>")})),o(`\x3c!--]--\x3e</nav><div class="flex items-center space-x-4" data-v-3dc5cb6c><div class="hidden sm:flex items-center relative" data-v-3dc5cb6c><div class="relative" data-v-3dc5cb6c><input type="text" placeholder="搜索..." class="pl-8 pr-4 py-1 w-48 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"${r.ssrRenderAttr("value",s.searchQuery)} data-v-3dc5cb6c><svg class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3dc5cb6c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-3dc5cb6c></path></svg></div></div><div class="hidden sm:block relative" data-v-3dc5cb6c><button class="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary hover:bg-secondary hover:bg-opacity-10 rounded-md px-2 py-1 transition-colors" data-v-3dc5cb6c><span data-v-3dc5cb6c>${r.ssrInterpolate("zh"===v.value?"中文":"English")}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3dc5cb6c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-3dc5cb6c></path></svg></button>`),u.value?(o('<div class="absolute z-10 right-0 mt-1 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" data-v-3dc5cb6c><div class="py-1" data-v-3dc5cb6c>\x3c!--[--\x3e'),r.ssrRenderList(x,(e=>{o(`<button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-v-3dc5cb6c>${r.ssrInterpolate(e.name)}</button>`)})),o("\x3c!--]--\x3e</div></div>")):o("\x3c!----\x3e"),o("</div>"),l.value?(o('<div class="hidden sm:flex items-center space-x-2" data-v-3dc5cb6c>'),o(r.ssrRenderComponent(i,{to:"/dashboard",class:"flex items-center space-x-2 text-sm text-primary hover:text-primary hover:bg-secondary hover:bg-opacity-10 rounded-md transition-colors"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createVNode("span",{class:"flex items-center"},[(t.openBlock(),t.createBlock("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t.createVNode("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})])),t.createTextVNode(" 工作台 ")])];s(`<span class="flex items-center" data-v-3dc5cb6c${a}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3dc5cb6c${a}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-3dc5cb6c${a}></path></svg> 工作台 </span>`)})),_:1},d)),o("</div>")):(o('<div class="hidden sm:flex items-center space-x-3" data-v-3dc5cb6c>'),o(r.ssrRenderComponent(i,{to:"/login",class:"text-sm text-primary hover:text-secondary"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("登录")];s("登录")})),_:1},d)),o(r.ssrRenderComponent(i,{to:"/register",class:"text-sm bg-secondary text-primary px-3 py-1 rounded hover:bg-opacity-80"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("注册")];s("注册")})),_:1},d)),o("</div>")),o(`<button class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden" data-v-3dc5cb6c><span class="sr-only" data-v-3dc5cb6c>Open main menu</span><svg class="${r.ssrRenderClass([{hidden:c.value,block:!c.value},"h-6 w-6"])}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-3dc5cb6c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-3dc5cb6c></path></svg><svg class="${r.ssrRenderClass([{block:c.value,hidden:!c.value},"h-6 w-6"])}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" data-v-3dc5cb6c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-3dc5cb6c></path></svg></button></div></div></div><div class="${r.ssrRenderClass([{block:c.value,hidden:!c.value},"md:hidden"])}" data-v-3dc5cb6c><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3" data-v-3dc5cb6c><div class="mb-3" data-v-3dc5cb6c><div class="relative" data-v-3dc5cb6c><input type="text" placeholder="搜索..." class="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"${r.ssrRenderAttr("value",s.searchQuery)} data-v-3dc5cb6c><svg class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3dc5cb6c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-3dc5cb6c></path></svg></div></div>\x3c!--[--\x3e`),r.ssrRenderList(m,(e=>{o('<div class="relative" data-v-3dc5cb6c>'),e.hasDropdown?(o(`<div class="space-y-1" data-v-3dc5cb6c><div class="${r.ssrRenderClass([{"bg-secondary bg-opacity-20 text-primary":isActive(e.href)||p.value===e.name},"flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 cursor-pointer"])}" data-v-3dc5cb6c><span data-v-3dc5cb6c>${r.ssrInterpolate(e.name)}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3dc5cb6c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-3dc5cb6c></path></svg></div>`),p.value===e.name?(o('<div class="pl-4 space-y-1" data-v-3dc5cb6c>\x3c!--[--\x3e'),r.ssrRenderList(e.dropdownItems,(e=>{o(r.ssrRenderComponent(i,{key:e.name,to:e.href,class:"block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50",onClick:e=>c.value=!1},{default:t.withCtx(((s,a,o,d)=>{if(!a)return[t.createTextVNode(t.toDisplayString(e.name),1)];a(`${r.ssrInterpolate(e.name)}`)})),_:2},d))})),o("\x3c!--]--\x3e</div>")):o("\x3c!----\x3e"),o("</div>")):o(r.ssrRenderComponent(i,{to:e.href,class:["block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50",{"bg-secondary bg-opacity-20 text-primary":isActive(e.href)}],onClick:e=>c.value=!1},{default:t.withCtx(((s,a,o,d)=>{if(!a)return[t.createTextVNode(t.toDisplayString(e.name),1)];a(`${r.ssrInterpolate(e.name)}`)})),_:2},d)),o("</div>")})),o(`\x3c!--]--\x3e<div class="border-t border-gray-200 pt-2 mt-2" data-v-3dc5cb6c><button class="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" data-v-3dc5cb6c><span data-v-3dc5cb6c>${r.ssrInterpolate("zh"===v.value?"中文":"English")}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3dc5cb6c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-3dc5cb6c></path></svg></button>`),u.value?(o('<div class="pl-4 space-y-1" data-v-3dc5cb6c>\x3c!--[--\x3e'),r.ssrRenderList(x,(e=>{o(`<button class="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50" data-v-3dc5cb6c>${r.ssrInterpolate(e.name)}</button>`)})),o("\x3c!--]--\x3e</div>")):o("\x3c!----\x3e"),o('</div><div class="border-t border-gray-200 pt-2 mt-2" data-v-3dc5cb6c>'),l.value?(o("<div data-v-3dc5cb6c>"),o(r.ssrRenderComponent(i,{to:"/dashboard",class:"block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-50 flex items-center",onClick:e=>c.value=!1},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[(t.openBlock(),t.createBlock("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t.createVNode("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})])),t.createTextVNode(" 进入工作台 ")];s(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3dc5cb6c${a}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-3dc5cb6c${a}></path></svg> 进入工作台 `)})),_:1},d)),o('<button class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50 flex items-center" data-v-3dc5cb6c><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3dc5cb6c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-3dc5cb6c></path></svg> 退出登录 </button></div>')):(o('<div class="flex flex-col space-y-1" data-v-3dc5cb6c>'),o(r.ssrRenderComponent(i,{to:"/login",class:"block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-50",onClick:e=>c.value=!1},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode(" 登录 ")];s(" 登录 ")})),_:1},d)),o(r.ssrRenderComponent(i,{to:"/register",class:"block px-3 py-2 rounded-md text-base font-medium bg-secondary bg-opacity-20 text-primary",onClick:e=>c.value=!1},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode(" 注册 ")];s(" 注册 ")})),_:1},d)),o("</div>")),o("</div></div></div></header>")}}}),i=n.setup;n.setup=(e,s)=>{const r=t.useSSRContext();return(r.modules||(r.modules=new Set)).add("components/AppHeader.vue"),i?i(e,s):void 0};const l=d(n,[["__scopeId","data-v-3dc5cb6c"]]),m=c("/assets/logo-white.svg"),p=t.defineComponent({__name:"AppFooter",__ssrInlineRender:!0,setup:s=>(s,a,o,d)=>{const c=e;a(`<footer${r.ssrRenderAttrs(t.mergeProps({class:"bg-primary text-white py-8 md:py-12"},d))}><div class="container-app"><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"><div>`),a(r.ssrRenderComponent(c,{to:"/",class:"flex items-center justify-center sm:justify-start mb-4"},{default:t.withCtx(((e,s,a,o)=>{if(!s)return[t.createVNode("img",{src:m,alt:"Printify",class:"h-6 md:h-8"})];s(`<img${r.ssrRenderAttr("src",m)} alt="Printify" class="h-6 md:h-8"${o}>`)})),_:1},o)),a('<div class="flex space-x-4 mt-4 justify-center sm:justify-start"><a href="#" class="text-white hover:text-secondary"><span class="sr-only">Facebook</span><svg class="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path></svg></a><a href="#" class="text-white hover:text-secondary"><span class="sr-only">Instagram</span><svg class="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path></svg></a><a href="#" class="text-white hover:text-secondary"><span class="sr-only">Twitter</span><svg class="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a></div></div><div class="text-center sm:text-left"><h3 class="font-bold text-base md:text-lg mb-3 md:mb-4">Products</h3><ul class="space-y-2 md:space-y-3"><li>'),a(r.ssrRenderComponent(c,{to:"/products/tshirts",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("T-shirts")];s("T-shirts")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/products/hoodies",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Hoodies")];s("Hoodies")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/products/mugs",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Mugs")];s("Mugs")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/products/posters",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Posters")];s("Posters")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/products/phone-cases",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Phone Cases")];s("Phone Cases")})),_:1},o)),a('</li></ul></div><div class="text-center sm:text-left"><h3 class="font-bold text-base md:text-lg mb-3 md:mb-4">Company</h3><ul class="space-y-2 md:space-y-3"><li>'),a(r.ssrRenderComponent(c,{to:"/about",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("About Us")];s("About Us")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/pricing",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Pricing")];s("Pricing")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/blog",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Blog")];s("Blog")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/careers",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Careers")];s("Careers")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/contact",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Contact")];s("Contact")})),_:1},o)),a('</li></ul></div><div class="text-center sm:text-left"><h3 class="font-bold text-base md:text-lg mb-3 md:mb-4">Resources</h3><ul class="space-y-2 md:space-y-3"><li>'),a(r.ssrRenderComponent(c,{to:"/help",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Help Center")];s("Help Center")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/guides",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Guides")];s("Guides")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/api",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("API Documentation")];s("API Documentation")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/terms",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Terms of Service")];s("Terms of Service")})),_:1},o)),a("</li><li>"),a(r.ssrRenderComponent(c,{to:"/privacy",class:"hover:text-secondary text-sm md:text-base"},{default:t.withCtx(((e,s,r,a)=>{if(!s)return[t.createTextVNode("Privacy Policy")];s("Privacy Policy")})),_:1},o)),a(`</li></ul></div></div><div class="mt-8 md:mt-12 border-t border-gray-700 pt-6 md:pt-8 text-center sm:text-left"><p class="text-xs md:text-sm text-gray-300"> © ${r.ssrInterpolate((new Date).getFullYear())} Printify Clone. All rights reserved. </p></div></div></footer>`)}}),v={};const u=v.setup;v.setup=(e,s)=>{const r=t.useSSRContext();return(r.modules||(r.modules=new Set)).add("layouts/default.vue"),u?u(e,s):void 0};const x=d(v,[["ssrRender",function(e,s,a,o){const d=l,c=p;s(`<div${r.ssrRenderAttrs(t.mergeProps({class:"min-h-screen flex flex-col"},o))}>`),s(r.ssrRenderComponent(d,null,null,a)),s('<main class="flex-grow">'),r.ssrRenderSlot(e.$slots,"default",{},null,s,a),s("</main>"),s(r.ssrRenderComponent(c,null,null,a)),s("</div>")}]]);export{x as default};
//# sourceMappingURL=default.vue.mjs.map
