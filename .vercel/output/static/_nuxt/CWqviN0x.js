import{e as h,a7 as f,q as a,c as t,F as u,i as k,l as m,o as e,j as x,J as y,w as g,d as v,t as l,as as B}from"./BCXaO8k1.js";const C={class:"mb-4 flex items-center text-sm text-gray-500"},w={key:1,class:"text-gray-900"},F={key:2,class:"mx-2"},j=h({__name:"Breadcrumb",props:{items:{default:()=>[]}},setup(i){const s=i,p=f(),o=a(()=>p.meta),d=a(()=>o.value.breadcrumb?o.value.breadcrumb:[]),n=a(()=>s.items&&s.items.length>0?s.items:d.value);return(_,N)=>{const b=B("router-link");return e(),t("nav",C,[(e(!0),t(u,null,k(m(n),(r,c)=>(e(),t(u,{key:c},[r.path?(e(),x(b,{key:0,to:r.path,class:"hover:text-primary"},{default:g(()=>[v(l(r.title),1)]),_:2},1032,["to"])):(e(),t("span",w,l(r.title),1)),c<m(n).length-1?(e(),t("span",F,"/")):y("",!0)],64))),128))])}}});export{j as _};
