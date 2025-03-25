import{_ as e}from"./nuxt-link.mjs";import{v as t,g as o,s as a,n as s}from"./server.mjs";import{_ as r}from"./virtual_public.mjs";import{u as n}from"./auth2.mjs";import{_ as d}from"./_plugin-vue_export-helper.mjs";import"../nitro/nitro.mjs";import"node:http";import"node:https";import"node:events";import"node:buffer";import"node:fs";import"node:path";import"node:crypto";import"node:url";import"ipx";import"source-map-js";import"../routes/renderer.mjs";import"unhead/server";import"unhead/plugins";import"unhead/utils";import"@vue/compiler-dom";import"@vue/runtime-dom";import"@vue/shared";import"@vue/server-renderer";import"devalue";import"node:stream";const i=t.defineComponent({__name:"DashboardSidebar",__ssrInlineRender:!0,props:{isMobileOpen:{type:Boolean,default:!1}},emits:["close"],setup(d,{emit:i}){const l=n(),c=t.computed((()=>l.currentUser)),v=t.computed((()=>{var e;return(null==(e=c.value)?void 0:e.name)||"User"})),p=t.computed((()=>v.value.split(" ").map((e=>e.charAt(0))).join("").toUpperCase().substring(0,2))),m=[{name:"Overview",href:"/dashboard",icon:"IconHome"},{name:"Workspace",href:"/dashboard/workspace",icon:"IconWorkspace"},{name:"Products",href:"/dashboard/products",icon:"IconBox"},{name:"Orders",href:"/dashboard/orders",icon:"IconShoppingCart"},{name:"Customers",href:"/dashboard/customers",icon:"IconUsers"},{name:"Analytics",href:"/dashboard/analytics",icon:"IconChart"},{name:"Settings",href:"/dashboard/settings",icon:"IconSettings"}],u=[{name:"New Design",icon:"IconWorkspace",action:()=>s("/dashboard/workspace")},{name:"Add Product",icon:"IconBox",action:()=>s("/dashboard/products/new")},{name:"View Shop",icon:"IconStore",action:()=>(void 0).open("/","_blank")},{name:"Get Help",icon:"IconHelp",action:()=>{}}],h=o();return t.defineComponent({template:'\n    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />\n    </svg>\n  '}),t.defineComponent({template:'\n    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />\n    </svg>\n  '}),t.defineComponent({template:'\n    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />\n    </svg>\n  '}),t.defineComponent({template:'\n    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />\n    </svg>\n  '}),t.defineComponent({template:'\n    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />\n    </svg>\n  '}),t.defineComponent({template:'\n    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />\n    </svg>\n  '}),t.defineComponent({template:'\n    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />\n    </svg>\n  '}),t.defineComponent({template:'\n    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />\n    </svg>\n  '}),t.defineComponent({template:'\n    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n  '}),(o,s,n,i)=>{const l=e;s(`<div${a.ssrRenderAttrs(i)} data-v-4822e66b><div class="md:hidden" data-v-4822e66b>`),a.ssrRenderSlot(o.$slots,"toggle-button",{},null,s,n),s("</div>"),d.isMobileOpen?s('<div class="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden" data-v-4822e66b></div>'):s("\x3c!----\x3e"),s(`<aside class="${a.ssrRenderClass([[d.isMobileOpen?"translate-x-0":"-translate-x-full"],"fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 shadow-lg md:shadow-none overflow-hidden flex flex-col h-full"])}" data-v-4822e66b><div class="h-full flex flex-col overflow-y-auto" data-v-4822e66b><div class="p-4 md:p-6" data-v-4822e66b><div class="flex items-center justify-between mb-6" data-v-4822e66b><div class="flex items-center" data-v-4822e66b><img${a.ssrRenderAttr("src",r)} alt="Printify Logo" class="h-8 w-auto mr-2" data-v-4822e66b><h2 class="text-lg md:text-xl font-bold text-primary" data-v-4822e66b>Dashboard</h2></div><button class="md:hidden text-gray-500 hover:text-primary p-1 rounded-full hover:bg-gray-100" aria-label="Close sidebar" data-v-4822e66b><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4822e66b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-4822e66b></path></svg></button></div><nav class="mt-4 space-y-1" data-v-4822e66b>\x3c!--[--\x3e`),a.ssrRenderList(m,(e=>{var r;s(a.ssrRenderComponent(l,{key:e.name,to:e.href,class:["flex items-center py-2 px-3 rounded-lg transition-colors text-gray-600 hover:bg-secondary hover:text-primary hover:bg-opacity-20",{"bg-secondary bg-opacity-20 text-primary font-medium":(r=e.href,"/dashboard"===r&&"/dashboard"===h.path||h.path.startsWith(r)&&"/dashboard"!==r)}],onClick:e=>o.$emit("close")},{default:t.withCtx(((o,s,r,n)=>{if(!s)return[t.createVNode("span",{class:"mr-3 flex-shrink-0"},[(t.openBlock(),t.createBlock(t.resolveDynamicComponent(e.icon),{class:"h-5 w-5"}))]),t.createVNode("span",{class:"text-sm"},t.toDisplayString(e.name),1)];s(`<span class="mr-3 flex-shrink-0" data-v-4822e66b${n}>`),a.ssrRenderVNode(s,t.createVNode(t.resolveDynamicComponent(e.icon),{class:"h-5 w-5"},null),r,n),s(`</span><span class="text-sm" data-v-4822e66b${n}>${a.ssrInterpolate(e.name)}</span>`)})),_:2},n))})),s('\x3c!--]--\x3e</nav></div><div class="px-4 md:px-6 mt-6" data-v-4822e66b><h3 class="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3" data-v-4822e66b>Quick Actions</h3><div class="grid grid-cols-2 gap-2" data-v-4822e66b>\x3c!--[--\x3e'),a.ssrRenderList(u,((e,o)=>{s('<button class="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-secondary hover:bg-opacity-20 transition-colors" data-v-4822e66b><span class="text-primary mb-1" data-v-4822e66b>'),a.ssrRenderVNode(s,t.createVNode(t.resolveDynamicComponent(e.icon),{class:"h-5 w-5"},null),n),s(`</span><span class="text-xs text-gray-700" data-v-4822e66b>${a.ssrInterpolate(e.name)}</span></button>`)})),s(`\x3c!--]--\x3e</div></div><div class="mt-auto p-4 md:p-6 border-t border-gray-200" data-v-4822e66b><div class="flex items-center" data-v-4822e66b><div class="flex-shrink-0" data-v-4822e66b><div class="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm" data-v-4822e66b>${a.ssrInterpolate(p.value)}</div></div><div class="ml-3 min-w-0 flex-1" data-v-4822e66b><p class="text-sm font-medium text-gray-700 truncate" data-v-4822e66b>${a.ssrInterpolate(v.value)}</p><div class="flex items-center mt-1" data-v-4822e66b><button class="text-xs text-gray-500 hover:text-primary mr-3" data-v-4822e66b> Settings </button><button class="text-xs text-primary hover:text-secondary" data-v-4822e66b> Sign out </button></div></div></div></div></div></aside></div>`)}}}),l=i.setup;i.setup=(e,o)=>{const a=t.useSSRContext();return(a.modules||(a.modules=new Set)).add("components/DashboardSidebar.vue"),l?l(e,o):void 0};const c=d(i,[["__scopeId","data-v-4822e66b"]]),v=t.defineComponent({__name:"dashboard",__ssrInlineRender:!0,setup(o){const s=t.ref(!1),d=n(),i=t.computed((()=>d.currentUser)),l=t.computed((()=>{var e;return(null==(e=i.value)?void 0:e.name)||"User"})),v=t.computed((()=>{var e;return(null==(e=i.value)?void 0:e.avatar)||null})),p=t.computed((()=>l.value.split(" ").map((e=>e.charAt(0))).join("").toUpperCase().substring(0,2)));return(o,n,d,i)=>{const m=e,u=c;n(`<div${a.ssrRenderAttrs(t.mergeProps({class:"min-h-screen flex flex-col bg-background"},i))} data-v-f902b657><div class="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200" data-v-f902b657><div class="container-app" data-v-f902b657><div class="flex items-center justify-between h-16" data-v-f902b657><div class="flex items-center" data-v-f902b657><button class="p-2 rounded-md text-primary hover:bg-secondary hover:bg-opacity-20 transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50" aria-label="Toggle sidebar" data-v-f902b657><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-f902b657><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-f902b657></path></svg></button>`),n(a.ssrRenderComponent(m,{to:"/",class:"flex items-center ml-3 md:ml-0"},{default:t.withCtx(((e,o,s,n)=>{if(!o)return[t.createVNode("img",{src:r,alt:"Printify",class:"h-8 w-auto hidden md:block"}),t.createVNode("span",{class:"font-bold text-primary text-lg md:hidden"},"Printify")];o(`<img${a.ssrRenderAttr("src",r)} alt="Printify" class="h-8 w-auto hidden md:block" data-v-f902b657${n}><span class="font-bold text-primary text-lg md:hidden" data-v-f902b657${n}>Printify</span>`)})),_:1},d)),n(`</div><div class="flex items-center space-x-3" data-v-f902b657><div class="hidden md:block" data-v-f902b657><div class="relative" data-v-f902b657><input type="text" placeholder="搜索..." class="w-64 bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" data-v-f902b657><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-f902b657><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-f902b657></path></svg></div></div><div class="hidden sm:flex items-center" data-v-f902b657><span class="text-sm text-gray-600 mr-2" data-v-f902b657>${a.ssrInterpolate(l.value)}</span>`),v.value?n(`<div class="h-8 w-8 rounded-full overflow-hidden" data-v-f902b657><img${a.ssrRenderAttr("src",v.value)} alt="User Avatar" class="h-full w-full object-cover" data-v-f902b657></div>`):n(`<div class="h-8 w-8 rounded-full bg-secondary flex items-center justify-center" data-v-f902b657><span class="text-primary font-bold text-sm" data-v-f902b657>${a.ssrInterpolate(p.value)}</span></div>`),n('</div><button class="p-2 rounded-full hover:bg-gray-100 relative" data-v-f902b657><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-f902b657><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-f902b657></path></svg><span class="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center" data-v-f902b657>3</span></button><button class="p-2 rounded-full hover:bg-gray-100 hidden sm:block" data-v-f902b657><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-f902b657><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-f902b657></path></svg></button></div></div></div></div><div class="flex-grow flex relative" data-v-f902b657>'),n(a.ssrRenderComponent(u,{"is-mobile-open":s.value,onClose:e=>s.value=!1},{"toggle-button":t.withCtx(((e,t,o,a)=>{if(!t)return[]})),_:1},d)),n('<main class="flex-grow p-4 md:p-6 overflow-auto" data-v-f902b657>'),a.ssrRenderSlot(o.$slots,"default",{},null,n,d),n('</main></div><div class="fixed bottom-4 right-4 md:hidden z-30" data-v-f902b657><button class="w-14 h-14 rounded-full bg-secondary shadow-lg flex items-center justify-center text-primary hover:bg-opacity-90 transition-colors" data-v-f902b657><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-f902b657><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-f902b657></path></svg></button></div></div>')}}}),p=v.setup;v.setup=(e,o)=>{const a=t.useSSRContext();return(a.modules||(a.modules=new Set)).add("layouts/dashboard.vue"),p?p(e,o):void 0};const m=d(v,[["__scopeId","data-v-f902b657"]]);export{m as default};
//# sourceMappingURL=dashboard.vue.mjs.map
