import{bj as Ee,c as m,d as R,r as D,aI as s,bz as Y,bA as Te,h as G,bB as Q,bC as Be,bD as ve,i as Pe,C as g,D as L,G as f,aH as i,F as B,aM as Z,aN as T,u as S,aE as w,aF as O,bE as ee,bF as me,Q as he,a$ as ge,bG as ye,bH as te,bI as ne,o as K,ba as Oe,E as oe,bi as ze,a2 as Fe,aS as se,aT as ae,w as W,b5 as Ae,aK as ce,aJ as ue,bJ as Ne,bK as Ue,b as Ve,aZ as je,bL as Ke,b3 as fe,bM as We,x as Je,bN as qe,bO as He,bP as Ge,bs as Qe,bQ as be,bR as xe,bS as V,n as Ze}from"./arco.fe595084.js";import{b as J,e as Xe,f as ke,d as E,l as Ye,u as et,g as Ce,h as tt,o as nt,_ as P,i as Me,M as q,I as ot,j as Se,k as st,m as le,R as at,D as ct,n as ut,p as lt,q as rt,s as it,t as _t,v as dt,x as $e,w as j,y as pt}from"./index.7fc30aee.js";import{g as z,u as U,i as Ie,j as we,k as ft,l as vt}from"./vue.35cde437.js";/* empty css              */import{_ as De}from"./logo.c0432b48.js";/* empty css               */function Le(){const t=z();return J(),{logout:async n=>{const d=t.currentRoute.value;Ee.success("\u767B\u51FA\u6210\u529F"),t.push({name:n&&typeof n=="string"?n:"login",query:{...t.currentRoute.value.query,redirect:d.name}})}}}const mt=[...Xe],ht=mt.map(t=>{const{name:e,path:n,meta:d,redirect:a,children:y}=t;return{name:e,path:n,meta:d,redirect:a,children:y}}),gt=ht;function yt(){const t=ke(),e=E(),n=m(()=>e.menuFromServer?e.appAsyncMenus:gt);return console.log(n.value),{menuTree:m(()=>{const a=Ye.exports.cloneDeep(n.value);a.sort((l,h)=>(l.meta.order||0)-(h.meta.order||0));function y(l,h){return l?l.map(v=>{var I,p;if(console.log(!t.accessRouter(v),"accessRouter"),!t.accessRouter(v))return null;if(((I=v.meta)==null?void 0:I.hideChildrenInMenu)||!v.children)return v.children=[],v;v.children=v.children.filter(x=>{var u;return((u=x.meta)==null?void 0:u.hideInMenu)!==!0});const C=y(v.children,h+1);return C.length||h>1?(v.children=C,v):((p=v.meta)==null?void 0:p.hideInMenu)===!1?v:null}).filter(Boolean):null}return y(a,0)})}}function bt(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!Te(t)}const xt=R({emit:["collapse"],setup(){et();const t=E(),e=z(),n=U(),{menuTree:d}=yt(),a=m({get(){return t.device==="desktop"?t.menuCollapse:!1},set(p){t.updateSettings({menuCollapse:p})}}),y=m(()=>t.topMenu),l=D([]),h=D([]),b=p=>{if(tt.test(p.path)){nt(p.path),h.value=[p.name];return}const{hideInMenu:x,activeMenu:u}=p.meta;if(n.name===p.name&&!x&&!u){h.value=[p.name];return}e.push({name:p.name})},v=p=>{const x=[];let u=!1;const o=(_,c)=>{var r;if(_.name===p){u=!0,x.push(...c);return}(r=_.children)!=null&&r.length&&_.children.forEach(k=>{o(k,[...c,k.name])})};return d.value.forEach(_=>{u||o(_,[_.name])}),x};Ce(p=>{const{requiresAuth:x,activeMenu:u,hideInMenu:o}=p.meta;if(x&&(!o||u)){const _=v(u||p.name),c=new Set([..._,...l.value]);l.value=[...c],h.value=[u||_[_.length-1]]}},!0);const C=p=>{t.device==="desktop"&&t.updateSettings({menuCollapse:p})},I=()=>{function p(x,u=[]){return x&&x.forEach(o=>{var M;const _=(M=o==null?void 0:o.meta)==null?void 0:M.icon,c=(_==null?void 0:_.substring(0,4).toLowerCase())==="icon",r=_?c?()=>G(Q(`<${_}/>`)):()=>G(Q(`<SvgIcon icon-class="${_}" :size="18" />`)):null,k=(o==null?void 0:o.children)&&(o==null?void 0:o.children.length)!==0?s(Be,{key:o==null?void 0:o.name},{default:()=>[p(o==null?void 0:o.children)],icon:r,title:()=>{var $;return G(Q((($=o==null?void 0:o.meta)==null?void 0:$.locale)||""))}}):s(ve,{key:o==null?void 0:o.name,onClick:()=>b(o)},{default:()=>{var $;return[(($=o==null?void 0:o.meta)==null?void 0:$.locale)||""]},icon:r});u.push(k)}),u}return p(d.value)};return()=>{let p;return s(Y,{mode:y.value?"horizontal":"vertical",collapsed:a.value,"onUpdate:collapsed":x=>a.value=x,"open-keys":l.value,"onUpdate:open-keys":x=>l.value=x,"show-collapse-button":!1,"auto-open":!1,"selected-keys":h.value,"auto-open-selected":!0,"level-indent":34,style:"height: 100%;width:100%;",onCollapse:C},bt(p=I())?p:{default:()=>[p]})}}});const X=P(xt,[["__scopeId","data-v-cc8cd2f4"]]),kt={class:"navbar"},Ct=["width"],Mt={class:"collapsez"},St={class:"center-side"},$t={class:"right-side"},It={style:{cursor:"pointer"}},wt=["src"],Dt={style:{color:"var(--color-text-2)"}},Lt=R({__name:"index",setup(t){const e=E(),n=J();Me();const{logout:d}=Le(),a=m(()=>n.avatar);new q;const y=m(()=>({name:n.name}));m(()=>e==null?void 0:e.theme);const l=m(()=>e.topMenu&&e.menu),h=m(()=>e.menuCollapse),b=Ie({selector:"body",attribute:"arco-theme",valueDark:"dark",valueLight:"light",storageKey:"arco-theme",onChanged(I){e.toggleTheme(I)}});we(b);const v=()=>{d()},C=Pe("toggleDrawerMenu");return(I,p)=>{const x=ee,u=me,o=he,_=ge,c=ot,r=ye,k=Se,M=te,$=ne;return g(),L("div",kt,[f("div",{class:"left-side",style:B({paddingLeft:(h.value?12:20)+"px"})},[s(_,{style:B({width:(h.value?48:S(e).menuWidth-8)-20+"px"})},{default:i(()=>[f("img",{alt:"logo",src:De,width:h.value?24:35},null,8,Ct),s(u,{style:B([{margin:0,fontSize:"18px",fontFamily:"syht Regular"},{"white-space":"nowrap"}]),heading:5},{default:i(()=>[s(x,{text:"beta",offset:[20,-4],"dot-style":{fontSize:"10px",borderBottomLeftRadius:0}},{default:i(()=>[Z(T(S(e).projectName),1)]),_:1})]),_:1}),!l.value&&S(e).device==="mobile"?(g(),w(o,{key:0,style:{"font-size":"22px",cursor:"pointer"},onClick:S(C)},null,8,["onClick"])):O("",!0)]),_:1},8,["style"]),f("div",Mt,[f("div",{onClick:p[0]||(p[0]=(...A)=>S(C)&&S(C)(...A)),style:B({transform:h.value?"rotate(180deg)":""})},[s(o)],4)])],4),f("div",St,[l.value?(g(),w(X,{key:0})):O("",!0)]),f("ul",$t,[f("li",null,[s($,{trigger:"click"},{content:i(()=>[s(M,null,{default:i(()=>[s(_,{onClick:v},{default:i(()=>[s(k),f("span",null,T(I.$t("messageBox.logout")),1)]),_:1})]),_:1})]),default:i(()=>[f("div",It,[s(r,{size:32,style:{marginRight:"8px"}},{default:i(()=>[a.value?(g(),L("img",{key:0,alt:"avatar",src:a.value},null,8,wt)):(g(),w(c,{key:1}))]),_:1}),f("span",Dt,T(y.value.name),1)])]),_:1})])])])}}});const Rt=P(Lt,[["__scopeId","data-v-b37db7f3"]]),Et={class:"version-icon"},Tt=R({__name:"version",setup(t){const e=E(),n=new q,d=m(()=>e.menuCollapse),a=D(1),y=()=>{a.value=0,n.setStorage("version",e.version)};return K(()=>{const l=n.getStorage("version");l&&l==e.version&&(a.value=0)}),(l,h)=>{const b=ee,v=st,C=Oe;return d.value?(g(),w(C,{key:1,position:"right"},{content:i(()=>[f("div",{class:"version-text",onClick:y},[s(b,{count:a.value,dot:"",offset:[5,-2]},{default:i(()=>[Z("v."+T(S(e).version),1)]),_:1},8,["count"])])]),default:i(()=>[f("div",Et,[s(v)])]),_:1})):(g(),L("div",{key:0,class:"version",onClick:y},[s(b,{count:a.value,dot:"",offset:[5,-2]},{default:i(()=>[Z("v."+T(S(e).version),1)]),_:1},8,["count"])]))}}});const Re=P(Tt,[["__scopeId","data-v-390f6c8f"]]),Bt=Object.freeze(Object.defineProperty({__proto__:null,default:Re},Symbol.toStringTag,{value:"Module"})),F=t=>(se("data-v-986a24a6"),t=t(),ae(),t),Pt={class:"tag-link"},Ot=F(()=>f("span",null,"\u91CD\u65B0\u52A0\u8F7D",-1)),zt=F(()=>f("span",null,"\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875",-1)),Ft=F(()=>f("span",null,"\u5173\u95ED\u5DE6\u4FA7\u6807\u7B7E\u9875",-1)),At=F(()=>f("span",null,"\u5173\u95ED\u53F3\u4FA7\u6807\u7B7E\u9875",-1)),Nt=F(()=>f("span",null,"\u5173\u95ED\u5176\u5B83\u6807\u7B7E\u9875",-1)),Ut=F(()=>f("span",null,"\u5173\u95ED\u5168\u90E8\u6807\u7B7E\u9875",-1)),Vt=R({__name:"tab-item",props:{itemData:{type:Object,default(){return[]}},index:{type:Number,default:0}},setup(t){const e=t,n=z(),d=U(),a=le(),y=u=>{n.push({...u})},l=m(()=>a.getTabList),h=m(()=>e.itemData.fullPath!==d.fullPath),b=m(()=>e.index===0),v=m(()=>[0,1].includes(e.index)),C=m(()=>e.index===l.value.length-1),I=(u,o)=>{if(a.deleteTag(o,u),e.itemData.fullPath===d.fullPath){const _=l.value[o-1];n.push({name:_.name})}},p=()=>l.value.findIndex(u=>u.fullPath===d.fullPath),x=async u=>{const{itemData:o,index:_}=e,c=[...l.value];if(u==="current")I(o,_);else if(u==="left"){const r=p();c.splice(1,e.index-1),a.freshTabList(c),r<_&&n.push({name:o.name})}else if(u==="right"){const r=p();c.splice(e.index+1),a.freshTabList(c),r>_&&n.push({name:o.name})}else if(u==="others"){const r=l.value.filter((k,M)=>M===0||M===e.index);a.freshTabList(r),n.push({name:o.name})}else u==="reload"?(a.deleteCache(o),await n.push({name:at,params:{path:d.fullPath}}),a.addCache(o.name)):(a.resetTabList(),n.push({name:ct}))};return(u,o)=>{const _=Fe,c=ut,r=te,k=lt,M=rt,$=it,A=_t,H=ne;return g(),w(H,{trigger:"contextMenu","popup-max-height":!1,onSelect:x},{content:i(()=>[s(r,{disabled:h.value,value:"reload"},{default:i(()=>[s(c),Ot]),_:1},8,["disabled","value"]),s(r,{class:"sperate-line",disabled:b.value,value:"current"},{default:i(()=>[s(_),zt]),_:1},8,["disabled","value"]),s(r,{disabled:v.value,value:"left"},{default:i(()=>[s(k),Ft]),_:1},8,["disabled","value"]),s(r,{class:"sperate-line",disabled:C.value,value:"right"},{default:i(()=>[s(M),At]),_:1},8,["disabled","value"]),s(r,{value:"others"},{default:i(()=>[s($),Nt]),_:1},8,["value"]),s(r,{value:"all"},{default:i(()=>[s(A),Ut]),_:1},8,["value"])]),default:i(()=>[f("span",{class:oe(["arco-tag arco-tag-size-medium arco-tag-checked",{"link-activated":t.itemData.fullPath===u.$route.fullPath}]),onClick:o[1]||(o[1]=N=>y(t.itemData))},[f("span",Pt,T(t.itemData.title),1),f("span",{class:"arco-icon-hover arco-tag-icon-hover arco-icon-hover-size-medium arco-tag-close-btn",onClick:o[0]||(o[0]=ze(N=>I(t.itemData,t.index),["stop"]))},[s(_)])],2)]),_:1})}}});const jt=P(Vt,[["__scopeId","data-v-986a24a6"]]),Kt=t=>(se("data-v-509db106"),t=t(),ae(),t),Wt={class:"tab-bar-container"},Jt={class:"tab-bar-box"},qt={class:"tab-bar-scroll"},Ht={class:"tags-wrap"},Gt=Kt(()=>f("div",{class:"tag-bar-operation"},null,-1)),Qt=R({__name:"index",setup(t){const e=E(),n=le(),d=D(),a=m(()=>n.getTabList),y=m(()=>e.navbar?60:0);return W(()=>e.navbar,()=>{d.value.updatePosition()}),Ce(l=>{!l.meta.noAffix&&!a.value.some(h=>h.fullPath===l.fullPath)&&n.updateTabList(l)},!0),Ae(()=>{dt()}),(l,h)=>{const b=Ne;return g(),L("div",Wt,[s(b,{ref_key:"affixRef",ref:d,"offset-top":y.value},{default:i(()=>[f("div",Jt,[f("div",qt,[f("div",Ht,[(g(!0),L(ce,null,ue(a.value,(v,C)=>(g(),w(jt,{key:v.fullPath,index:C,"item-data":v},null,8,["index","item-data"]))),128))])]),Gt])]),_:1},8,["offset-top"])])}}});const Zt=P(Qt,[["__scopeId","data-v-509db106"]]);function Xt(t,e,n,d=!1){t.addEventListener&&typeof t.addEventListener=="function"&&t.addEventListener(e,n,d)}function Yt(t,e,n,d=!1){t.removeEventListener&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n,d)}const en=992;function tn(){return document.body.getBoundingClientRect().width-1<en}function nn(t){const e=E();function n(){if(!document.hidden){const a=tn();e.toggleDevice(a?"mobile":"desktop"),e.toggleMenu(a)}}const d=ft(n,100);K(()=>{t&&d()}),Ue(()=>{Xt(window,"resize",d)}),Ve(()=>{Yt(window,"resize",d)})}const on=R({__name:"page-layout",setup(t){const e=le(),n=m(()=>e.getCacheList);return(d,a)=>{const y=je("router-view");return g(),w(y,null,{default:i(({Component:l,route:h})=>[s(Ke,{name:"fade",mode:"out-in",appear:""},{default:i(()=>[h.meta.ignoreCache?(g(),w(fe(l),{key:h.fullPath})):(g(),w(We,{key:1,include:n.value},[(g(),w(fe(l),{key:h.fullPath}))],1032,["include"]))]),_:2},1024)]),_:1})}}}),sn={key:0,class:"layout-navbar"},an={class:"menu-wrapper"},cn="60px",un=R({__name:"default-layout",setup(t){const e=D(!1),n=E(),d=J(),a=z(),y=U(),l=ke();nn(!0);const h=m(()=>n.navbar),b=m(()=>n.menu&&!n.topMenu),v=m(()=>n.hideMenu);m(()=>n.footer);const C=m(()=>n.menuCollapse?48:n.menuWidth),I=m(()=>n.menuCollapse),p=m(()=>{const _=b.value&&!v.value?{paddingLeft:`${C.value}px`}:{},c=h.value?{paddingTop:cn}:{};return{..._,...c}}),x=_=>{!e.value||n.updateSettings({menuCollapse:_})};W(()=>d.role,_=>{_&&!l.accessRouter(y)&&a.push({name:"notFound"})});const u=D(!1),o=()=>{u.value=!1};return Je("toggleDrawerMenu",()=>{u.value=!u.value,n.updateSettings({menuCollapse:!n.menuCollapse})}),K(()=>{e.value=!0}),(_,c)=>{const r=Ge,k=Qe,M=be,$=xe;return g(),w($,{class:oe(["layout",{mobile:S(n).hideMenu}])},{default:i(()=>[h.value?(g(),L("div",sn,[s(Rt)])):O("",!0),s($,null,{default:i(()=>[s($,null,{default:i(()=>[b.value?qe((g(),w(r,{key:0,class:"layout-sider",breakpoint:"xl",collapsed:I.value,collapsible:!0,width:C.value,style:B({paddingTop:h.value?"60px":""}),"hide-trigger":!0,onCollapse:x},{default:i(()=>[f("div",an,[s(X),s(Re)])]),_:1},8,["collapsed","width","style"])),[[He,!v.value]]):O("",!0),v.value?(g(),w(k,{key:1,visible:u.value,placement:"left",footer:!1,"mask-closable":"",closable:!1,onCancel:o},{default:i(()=>[s(X)]),_:1},8,["visible"])):O("",!0),s($,{class:"layout-content",style:B(p.value)},{default:i(()=>[S(n).tabBar?(g(),w(Zt,{key:0})):O("",!0),s(M,null,{default:i(()=>[s(on)]),_:1})]),_:1},8,["style"])]),_:1})]),_:1})]),_:1},8,["class"])}}});const ln=P(un,[["__scopeId","data-v-dcf59cec"]]);function re(){const{width:t}=vt(),e=m(()=>t.value>768);return{isMobile:m(()=>!e.value),isDesktop:e}}const rn=R({__name:"left-menu",props:{menus:{},menuStyle:{}},emits:["menu-item-click-after"],setup(t,{emit:e}){const n=t,d=V(()=>j(()=>import("./menu-item.2fd483f7.js"),["static/menu-item.2fd483f7.js","static/index.7fc30aee.js","static/arco.fe595084.js","static/chart.a6f8a910.js","static/vue.35cde437.js","static/index.0b2c67e6.css","static/logo.c0432b48.js","static/index.bf297ad8.css","static/index.df94bf0a.css"])),a=D([]),{isDesktop:y}=re(),l=U(),h=z(),b=E(),v=m(()=>n.menus?n.menus:[]),C=m(()=>["left","mix"].includes(b.layout)?"vertical":"horizontal"),I=m(()=>!!["default","mix"].includes(b.layout)),p=m(()=>[l.name]),x=()=>{var c;return[(c=l.matched[1])==null?void 0:c.name]},u=c=>{const r=$e.toTreeArray(v.value),k=r==null?void 0:r.find(M=>M.name===c);h.push({name:k==null?void 0:k.name}),e("menu-item-click-after")},o=c=>{a.value.indexOf(c)===-1?a.value.push(c):a.value.splice(a.value.indexOf(c),1)},_=c=>{b.layout==="mix"&&(b.menuCollapse=c)};return W(()=>l.name,()=>{a.value=x()},{immediate:!0}),(c,r)=>{const k=Y;return g(),w(k,{mode:C.value,"selected-keys":p.value,"open-keys":a.value,"auto-open-selected":I.value,accordion:S(b).menuAccordion,breakpoint:S(b).layout==="mix"?"xl":void 0,"trigger-props":{animationName:"slide-dynamic-origin"},collapsed:S(y)?S(b).menuCollapse:!0,style:B(c.menuStyle),onMenuItemClick:u,onSubMenuClick:o,onCollapse:_},{default:i(()=>[(g(!0),L(ce,null,ue(v.value,(M,$)=>(g(),w(S(d),{key:M.name,item:M},null,8,["item"]))),128))]),_:1},8,["mode","selected-keys","open-keys","auto-open-selected","accordion","breakpoint","collapsed","style"])}}}),_n=["width"],dn={class:"system-name"},pn=R({__name:"logo",setup(t){z();const e=E(),{isDesktop:n}=re(),d=m(()=>e.menuCollapse);return(a,y)=>{const l=ee,h=me;return g(),L("section",{class:oe(["system-logo",{collapsed:S(n)?d.value:!0}])},[f("img",{alt:"logo",src:De,width:d.value?24:35},null,8,_n),s(h,{style:B([{margin:0,fontSize:"18px",fontFamily:"syht Regular"},{"white-space":"nowrap"}]),heading:5},{default:i(()=>[s(l,{text:"beta",offset:[20,-4],"dot-style":{fontSize:"10px",borderBottomLeftRadius:0}},{default:i(()=>[f("span",dn,T(S(e).projectName),1)]),_:1})]),_:1})],2)}}});const fn=P(pn,[["__scopeId","data-v-52e7cdc6"]]),vn="/static/avatar.9418226e.png",mn=t=>(se("data-v-817f2b96"),t=t(),ae(),t),hn={class:"navbar"},gn={class:"right-side"},yn={style:{cursor:"pointer"},class:"flex align-center"},bn=["src"],xn=mn(()=>f("img",{src:vn,alt:""},null,-1)),kn={style:{color:"var(--color-text-2)"}},Cn=R({__name:"navbar",setup(t){const e=E(),n=J();Me();const{logout:d}=Le();D(!1);const a=m(()=>n.avatar);new q;const y=m(()=>({name:n.name}));m(()=>e==null?void 0:e.theme),m(()=>e.topMenu&&e.menu),m(()=>e.menuCollapse);const l=Ie({selector:"body",attribute:"arco-theme",valueDark:"dark",valueLight:"light",storageKey:"arco-theme",onChanged(b){e.toggleTheme(b)}});we(l);const h=()=>{d()};return(b,v)=>{const C=ye,I=Se,p=ge,x=te,u=ne;return g(),L("div",hn,[f("ul",gn,[f("li",null,[s(u,{trigger:"click"},{content:i(()=>[s(x,null,{default:i(()=>[s(p,{onClick:h},{default:i(()=>[s(I),f("span",null,T(b.$t("messageBox.logout")),1)]),_:1})]),_:1})]),default:i(()=>[f("div",yn,[s(C,{size:32,style:{marginRight:"8px"}},{default:i(()=>[a.value?(g(),L("img",{key:0,alt:"avatar",src:a.value},null,8,bn)):O("",!0),xn]),_:1}),f("span",kn,T(y.value.name),1)])]),_:1})])])])}}});const Mn=P(Cn,[["__scopeId","data-v-817f2b96"]]),Sn={class:"layout-mix"},$n={class:"layout-mix-left"},In={class:"layout-mix-right"},wn={class:"header flex flex-row-center"},Dn={class:"collapse"},Ln=R({__name:"layout-mix",setup(t){const e=V(()=>j(()=>import("./page-layout.b7f8f225.js"),["static/page-layout.b7f8f225.js","static/arco.fe595084.js","static/index.7fc30aee.js","static/chart.a6f8a910.js","static/vue.35cde437.js","static/index.0b2c67e6.css","static/logo.c0432b48.js","static/index.bf297ad8.css","static/index.df94bf0a.css"])),n=V(()=>j(()=>Promise.resolve().then(()=>Bt),void 0));V(()=>j(()=>import("./mobile-left-menu.81869dd1.js"),["static/mobile-left-menu.81869dd1.js","static/index.7fc30aee.js","static/arco.fe595084.js","static/chart.a6f8a910.js","static/vue.35cde437.js","static/index.0b2c67e6.css","static/logo.c0432b48.js","static/mobile-left-menu.edc35041.css","static/index.bf297ad8.css","static/index.df94bf0a.css"]));const d=U(),a=z(),y=E(),l=new q;re();const h=D(1),b=pt(y.serverMenu,c=>{var r;return((r=c.meta)==null?void 0:r.hideInMenu)===!1}),v=D([]);v.value=JSON.parse(JSON.stringify(b));const C=()=>{y.collapseMenu()},I=c=>{const r=c[0];return r.children?r.children[0].name:r.name},p=c=>{const r=v.value.find(k=>k.name===c);if(_(r==null?void 0:r.name),o.value){const k=I(o.value);a.push({name:k})}else a.push({name:"Workplace"}),u.value=["Dashboard"]},x=JSON.parse(JSON.stringify(b)),u=D(),o=D([]);function _(c){const r=$e.searchTree(x,$=>$.name===c,{children:"children"}),k=r.length?r[0].name:"",M=x.find($=>$.name===k);u.value=M?[M.name]:[""],o.value=M?M.children:[]}return W(()=>d.name,c=>{Ze(()=>{_(c)})},{immediate:!0}),K(()=>{const c=l.getStorage("version");c&&c==y.version&&(h.value=0)}),(c,r)=>{const k=he,M=ve,$=Y,A=be,H=xe;return g(),L("div",Sn,[f("section",$n,[s(fn),s(rn,{menus:o.value,"menu-style":{width:`${S(y).menuWidth}px`,flex:1}},null,8,["menus","menu-style"]),s(S(n))]),f("section",In,[f("header",wn,[f("div",Dn,[f("div",{onClick:C,style:B({transform:S(y).menuCollapse?"rotate(180deg)":""})},[s(k)],4)]),s($,{mode:"horizontal","selected-keys":u.value,"auto-open-selected":!1,"trigger-props":{animationName:"slide-dynamic-origin"},onMenuItemClick:p},{default:i(()=>[(g(!0),L(ce,null,ue(v.value,N=>(g(),w(M,{key:N.name},{default:i(()=>{var ie,_e,de,pe;return[f("span",null,T(((ie=N.meta)==null?void 0:ie.locale)||((pe=(de=(_e=N.children)==null?void 0:_e[0])==null?void 0:de.meta)==null?void 0:pe.locale)||""),1)]}),_:2},1024))),128))]),_:1},8,["selected-keys"]),s(Mn)]),s(H,{class:"layout-content"},{default:i(()=>[s(A,null,{default:i(()=>[s(S(e))]),_:1})]),_:1})])])}}});const Rn=P(Ln,[["__scopeId","data-v-579f294a"]]),En=R({name:"Layout",__name:"index",setup(t){const e=E();return(n,d)=>S(e).layout==="mix"?(g(),w(Rn,{key:0})):(g(),w(ln,{key:1}))}}),An=Object.freeze(Object.defineProperty({__proto__:null,default:En},Symbol.toStringTag,{value:"Module"}));export{on as _,An as i};
