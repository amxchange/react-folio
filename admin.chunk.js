"use strict";(self.webpackChunkamx_ui_components=self.webpackChunkamx_ui_components||[]).push([[328],{72507:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_});var r=n(67294),a=n(5977),l=n(98595),o=n(73727),c=n(45697),i=n(53999),m=n(98008),s=n(9544),u=n(36992),p=n(20627),f=n(10267),b=n(51252),d=n(15538),g=n(69618),h=n(609),y=n(88822),E=n(51566),v=n(77243);function O(){return O=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},O.apply(this,arguments)}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var Z=function(e){var t,n,a,c=(n=(0,r.useState)(),a=2,function(e){if(Array.isArray(e))return e}(n)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l=[],o=!0,c=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(e){c=!0,a=e}finally{try{o||null==n.return||n.return()}finally{if(c)throw a}}return l}}(n,a)||function(e,t){if(e){if("string"==typeof e)return k(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?k(e,t):void 0}}(n,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),Z=c[0],x=c[1],j=function(){x((function(e){return!e}))},N=e.bgColor,w=void 0===N?"white":N,P=e.routes,T=e.logo;return T&&T.innerLink?t={to:T.innerLink,tag:o.rU}:T&&T.outterLink&&(t={href:T.outterLink,target:"_blank"}),r.createElement(s.Z,{className:"navbar-vertical fixed-left navbar-light bg-".concat(w),expand:"md"},r.createElement(l.Z,{fluid:!0},r.createElement("button",{className:"navbar-toggler",type:"button",onClick:j},r.createElement("span",{className:"navbar-toggler-icon"})),T?r.createElement(u.Z,O({className:"pt-0"},t),r.createElement("img",{style:{background:"black"},alt:T.imgAlt,className:"navbar-brand-img",src:T.imgSrc})):null,r.createElement(p.Z,{navbar:!0,isOpen:Z},r.createElement("div",{className:"navbar-collapse-header d-md-none"},r.createElement(f.Z,null,T?r.createElement(b.Z,{className:"collapse-brand",xs:"6"},T.innerLink?r.createElement(o.rU,{to:T.innerLink},r.createElement("img",{alt:T.imgAlt,src:T.imgSrc})):r.createElement("a",{href:T.outterLink},r.createElement("img",{alt:T.imgAlt,src:T.imgSrc}))):null,r.createElement(b.Z,{className:"collapse-close",xs:"6"},r.createElement("button",{className:"navbar-toggler",type:"button",onClick:j},r.createElement("span",null),r.createElement("span",null))))),r.createElement(d.Z,{className:"mt-4 mb-3 d-md-none"},r.createElement(g.Z,{className:"input-group-rounded input-group-merge"},r.createElement(h.Z,{"aria-label":"Search",className:"form-control-rounded form-control-prepended",placeholder:"Search",type:"search"}),r.createElement(y.Z,{addonType:"prepend"},r.createElement(E.Z,null,r.createElement("span",{className:"fa fa-search"}))))),r.createElement(v.Z,{navbar:!0},function(t){return t.filter((function(e){return!1!==e.sidebar})).map((function(t,n){return r.createElement(i.Z,{key:n},r.createElement(m.Z,{to:e.match.path+t.path,tag:o.OL,activeClassName:"active"},r.createElement("i",{className:t.icon}),t.name))}))}(P)))))};Z.defaultProps={routes:[{}]},Z.propTypes={routes:c.PropTypes.arrayOf(c.PropTypes.object),logo:c.PropTypes.shape({innerLink:c.PropTypes.string,outterLink:c.PropTypes.string,imgSrc:c.PropTypes.string.isRequired,imgAlt:c.PropTypes.string.isRequired})};const x=Z,j=function(e){return r.createElement(r.Fragment,null,r.createElement(s.Z,{className:"navbar-top navbar-dark",expand:"md",id:"navbar-main"},r.createElement(l.Z,{fluid:!0},r.createElement(o.rU,{className:"h4 mb-0 text-white text-uppercase d-none d-lg-inline-block",to:e.location.pathname},e.brandText))))},N=function(){return r.createElement("footer",{className:"footer"},r.createElement(f.Z,{className:"align-items-center justify-content-xl-between"},r.createElement(b.Z,{xl:"6"},r.createElement("div",{className:"copyright text-center text-xl-left text-muted"},"© ",(new Date).getFullYear()," ",r.createElement("a",{className:"font-weight-bold ml-1",href:"",rel:"noopener noreferrer",target:"_blank"},"AMX UI"))),r.createElement(b.Z,{xl:"6"},r.createElement(v.Z,{className:"nav-footer justify-content-center justify-content-xl-end"},r.createElement(i.Z,null,r.createElement(m.Z,{href:"",rel:"noopener noreferrer",target:"_blank"},"About Us")),r.createElement(i.Z,null,r.createElement(m.Z,{href:"",rel:"noopener noreferrer",target:"_blank"},"Blog")),r.createElement(i.Z,null,r.createElement(m.Z,{href:"",rel:"noopener noreferrer",target:"_blank"},"MIT License"))))))};function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var T=[{path:"/dashboard",name:"Dashboard",icon:"ni ni-tv-2 text-primary",component:(0,r.lazy)((function(){return n.e(966).then(n.bind(n,85457))})),layout:"/admin"},{path:"/template-editor",name:"Template Editor",icon:"ni ni-tv-2 text-primary",component:(0,r.lazy)((function(){return Promise.all([n.e(83),n.e(679)]).then(n.bind(n,77140))})),layout:"/admin"},{path:"/i18",name:"I18",icon:"ni ni-tv-2 text-primary",component:(0,r.lazy)((function(){return n.e(390).then(n.bind(n,3394))})),layout:"/admin"},{path:"/user-profile",name:"User Profile",icon:"ni ni-single-02 text-yellow",component:(0,r.lazy)((function(){return n.e(845).then(n.bind(n,87122))})),layout:"/admin",sidebar:!1}],S={};T.forEach((function(e){S[e.name.toLowerCase()]=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){P(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e)}));const A=T;function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},L.apply(this,arguments)}const _=function(e){var t=r.useRef(null),o=(0,a.TH)();return r.useEffect((function(){document.documentElement.scrollTop=0,document.scrollingElement.scrollTop=0,t.current.scrollTop=0}),[o]),r.createElement(r.Fragment,null,r.createElement(x,L({},e,{routes:A,logo:{innerLink:"".concat(e.match.path).concat(S.dashboard.path),imgSrc:n(5137),imgAlt:"..."}})),r.createElement("div",{className:"main-content",ref:t},r.createElement(j,L({},e,{brandText:function(){for(var t=0;t<A.length;t++)if(-1!==e.location.pathname.indexOf(A[t].layout+A[t].path))return A[t].name;return"Brand"}()})),r.createElement(a.rs,null,function(t){return t.map((function(t,n){return"/admin"===t.layout?r.createElement(a.AW,{path:e.match.path+t.path,component:t.component,key:n}):null}))}(A),r.createElement(a.l_,{from:"/",to:"".concat(e.match.path).concat(S.dashboard.path)})),r.createElement(l.Z,{fluid:!0},r.createElement(N,null))))}},5137:(e,t,n)=>{e.exports=n.p+"ef76c7920ca30c5a47a9.png"}}]);
//# sourceMappingURL=admin.chunk.js.map