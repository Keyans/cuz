import{e as p,al as r,am as v,D as h,j as b,b as C,T as S,w as V,an as w,o as a,c as i,J as B,a as o,m as n,l as c,f as u,t as D,s as M,Q as T,_ as N}from"./BCXaO8k1.js";const _={key:0,class:"dialog-header"},$={class:"dialog-body"},j={key:2,class:"dialog-footer"},q=p({__name:"Dialog",props:r({title:{type:String,default:""},width:{type:String,default:"fit-content"},modelValue:{type:Boolean,default:!1}},{modelValue:{required:!0,type:Boolean},modelModifiers:{}}),emits:r(["confirm"],["update:modelValue"]),setup(t,{emit:f}){const l=v(t,"modelValue"),m=t;h(()=>m.modelValue,e=>{l.value=e});const s=()=>{l.value=!1},y=()=>{k("confirm"),s()},g=e=>{e.target===e.currentTarget&&s()},k=f;return(e,d)=>(a(),b(w,{to:"body"},[C(S,{name:"dialog-fade-slide"},{default:V(()=>[l.value?(a(),i("div",{key:0,class:"dialog-overlay",onClick:g},[o("div",{class:"dialog",onClick:d[0]||(d[0]=T(()=>{},["stop"])),style:M({width:t.width})},[("useSlots"in e?e.useSlots:c(u))().header?n(e.$slots,"header",{key:1},void 0,!0):(a(),i("div",_,[o("span",null,D(t.title),1),o("button",{class:"close-btn",onClick:s},"×")])),o("div",$,[n(e.$slots,"default",{},void 0,!0)]),("useSlots"in e?e.useSlots:c(u))().footer?n(e.$slots,"footer",{key:3},void 0,!0):(a(),i("div",j,[o("button",{class:"cancel-btn",onClick:s},"取消"),o("button",{class:"confirm-btn",onClick:y},"确认")]))],4)])):B("",!0)]),_:3})]))}}),E=N(q,[["__scopeId","data-v-153e40f1"]]);export{E as D};
