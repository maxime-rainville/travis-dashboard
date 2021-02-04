(this["webpackJsonpcreate-react-app-typescript-redux"]=this["webpackJsonpcreate-react-app-typescript-redux"]||[]).push([[0],{146:function(e,t,r){e.exports=r(252)},252:function(e,t,r){"use strict";r.r(t);var n={};r.r(n),r.d(n,"BuildActions",(function(){return A})),r.d(n,"initBuildData",(function(){return G}));var a={};r.r(a),r.d(a,"Actions",(function(){return S})),r.d(a,"initFavourite",(function(){return F})),r.d(a,"toggleFavourite",(function(){return C}));var c={};r.r(c),r.d(c,"Actions",(function(){return be})),r.d(c,"toggleFilter",(function(){return je})),r.d(c,"setTerm",(function(){return ye})),r.d(c,"setCategoryFilter",(function(){return xe}));var o={};r.r(o),r.d(o,"MergeupActions",(function(){return jt})),r.d(o,"initMergeupData",(function(){return Dt}));var i=r(0),u=r(10),l=r(37),s=r(12),d=r(118),m=r(8),f=r(60),p=r(305),b=r(311),g=r(306),v=r(307),E=r(255),h=r(134),O=r.n(h),j=r(256),y=r(67),x=r(285),T=r(138),I=r(284),D=Object(T.a)({palette:{primary:{light:"#e5e5e5",main:"#727272",dark:"#363839",contrastText:"#fff"},secondary:{light:"#005AE1",main:"#0F3287",dark:"#051E2D",contrastText:"#fff"},type:"dark"}});var A,w=r(139),N=r(16);function L(e,t){var r=Object(s.b)();return Object(i.useMemo)((function(){return Array.isArray(e)?e.map((function(e){return Object(N.bindActionCreators)(e,r)})):Object(N.bindActionCreators)(e,r)}),t?[r].concat(Object(w.a)(t)):t)}function k(e,t,r){return function(){return function(n){n({type:t}),fetch("/travis-dashboard"+"/".concat(e,".json"),{method:"GET"}).then((function(e){return e.json().then((function(t){return{json:t,lastModified:e.headers.has("last-modified")?e.headers.get("last-modified"):void 0}}))})).then((function(e){return n({type:r,payload:e})}))}}}!function(e){e.LOADING_BUILDS="LOADING_BUILDS",e.BUILD_LOADED="BUILD_LOADED"}(A||(A={}));var S,G=k("buildData",A.LOADING_BUILDS,A.BUILD_LOADED);!function(e){e.INIT_FAV="INIT_FAV"}(S||(S={}));function _(){var e=localStorage.getItem("FAVOURITES");return(null===e||void 0===e?void 0:e.split(","))||[]}function F(){return{type:S.INIT_FAV,payload:_()}}function C(e){var t=_(),r=t.indexOf(e);return-1===r?t.push(e):t.splice(r,1),localStorage.setItem("FAVOURITES",t.join(",")),console.dir(t),{type:S.INIT_FAV,payload:t}}var R=r(14),B=r(290),M=r(291),U=r(254),P=r(288),H=r(289),V=r(292),z=r(122),Y=r.n(z),W=r(124),q=r.n(W),J=r(125),$=r.n(J),K=r(123),Q=r.n(K),X=r(126),Z=r.n(X),ee=r(287),te=r(119),re={failed:"#FE6B8B",errored:"#FE6B8B",passed:"#61b047",running:"#fede6b",created:"#fede6b",started:"#fede6b",expired:"#6b8bfe",canceled:"#ad495e"},ne={errored:"contained",failed:"contained",passed:"outlined",created:"contained",started:"contained",running:"contained"};function ae(e){var t=e.module,r=e.branch,n=e.build,a=n.id,c=n.state,o=ce({state:c});return i.createElement(ee.a,{href:"https://travis-ci.com/github/".concat(t,"/builds/").concat(a),variant:ne[c],className:o.branchBtn},r)}var ce=Object(te.a)({branchBtn:function(e){var t=function(e,t,r){return r[t[e]]}("state",e,re);return{margin:"0 8px 8px 0",flexGrow:1,background:t,textDecoration:"none","&:hover":{background:t}}}}),oe=r(42),ie=r(39),ue=r.n(ie);function le(e){var t=e.Icon,r=e.route,n=e.title,a=se(),c=Object(oe.f)(),o={onClick:function(){return c.push(r)},className:ue()(Object(m.a)({},a.active,c.location.pathname===r))};return i.createElement(U.a,Object.assign({button:!0},o),i.createElement(P.a,null,i.createElement(t,null)),i.createElement(H.a,{primary:n}))}var se=Object(j.a)((function(e){return{active:{background:e.palette.secondary.main,"&:hover":{background:e.palette.secondary.light}}}})),de=["failed","canceled","expired","running","passed"],me=function(e,t,r){return r[t[e]]},fe=Object(j.a)({legend:function(e){return{background:me("state",e,re),width:24,height:24,borderRadius:3}}});function pe(e){var t=ge(),r=Object(s.c)((function(e){return e.builds.lastModified})),n=r?"Fetched ".concat(Math.round(((new Date).getTime()-new Date(r).getTime())/1e3/60)," min ago"):"";return i.createElement("div",{className:t.root},i.createElement("div",{className:t.drawerHeader},i.createElement(l.a,{variant:"h6"},"CMS Squad Dashboard")),i.createElement(B.a,null),i.createElement(M.a,null,i.createElement(le,{route:"/",Icon:Y.a,title:"Builds"}),i.createElement(le,{route:"/mergeups",Icon:Q.a,title:"Merge ups"}),i.createElement(le,{route:"/stats",Icon:q.a,title:"Stats"}),i.createElement(U.a,{component:"a",button:!0,href:"https://github.com/maxime-rainville/travis-dashboard/"},i.createElement(P.a,null,i.createElement($.a,null)),i.createElement(H.a,{primary:"View Source"})),i.createElement(U.a,{component:"a",button:!0,href:"https://github.com/maxime-rainville/travis-dashboard/actions?query=workflow%3A%22Build+and+Deploy%22"},i.createElement(P.a,null,i.createElement(Z.a,null)),i.createElement(H.a,{primary:"Refresh data",secondary:n}))),i.createElement("div",{className:t.drawerSpacer}),i.createElement(M.a,null,i.createElement(V.a,null,"Legend"),de.map((function(e){return i.createElement(U.a,{key:e},i.createElement(P.a,null,i.createElement("span",{className:fe({state:e}).legend})),i.createElement(H.a,{primary:e}))}))))}var be,ge=Object(j.a)((function(e){return{drawerHeader:Object(R.a)({},e.mixins.toolbar,{background:e.palette.primary.main,display:"flex",justifyContent:"center",alignItems:"center"}),drawerPaper:Object(m.a)({width:250,backgroundColor:e.palette.background.default},e.breakpoints.up("md"),{width:240,position:"relative",height:"100%"}),root:{minHeight:"100%",display:"flex",flexDirection:"column"},drawerSpacer:{flexGrow:1}}})),ve=r(297),Ee=r(314),he=r(298),Oe=r(299);function je(){return{type:be.TOGGLE_FILTER}}function ye(e){return function(t){var r=setTimeout((function(){t({type:be.TRIGGER_SEARCH,payload:void 0})}),500);t({type:be.SET_TERM,payload:{term:e,triggerSearchTimeout:r}})}}function xe(e){return{type:be.SET_CATEGORY_FILTER,payload:{categoryFilters:e}}}!function(e){e.LOADING_BUILDS="LOADING_BUILDS",e.BUILD_LOADED="BUILD_LOADED",e.TOGGLE_FILTER="TOGGLE_FILTER",e.SET_TERM="SET_TERM",e.TRIGGER_SEARCH="TRIGGER_SEARCH",e.SET_CATEGORY_FILTER="SET_CATEGORY_FILTER"}(be||(be={}));var Te=r(293),Ie=r(312),De=r(308),Ae=r(294),we=r(296),Ne=r(310),Le={core:"Core",supported:"Supported",unsupported:"Unsupported",nonmodule:"Non-module"};function ke(e){var t=e.className,r=L(c).setCategoryFilter,n=Object(s.c)((function(e){return e.filters})).categoryFilters,a=Se();return n?i.createElement(Te.a,{className:ue()(t,a.root)},i.createElement(Ie.a,{id:"demo-mutiple-checkbox-label",color:"secondary"},"Category"),i.createElement(De.a,{labelId:"demo-mutiple-checkbox-label",id:"demo-mutiple-checkbox",multiple:!0,value:n,onChange:function(e){return r(e.target.value)},input:i.createElement(Ae.a,null),renderValue:function(e){return e.map((function(e){return Le[e]})).join(", ")}},Object.keys(Le).map((function(e){return i.createElement(we.a,{key:e,value:e},i.createElement(Ne.a,{checked:n.indexOf(e)>-1}),i.createElement(H.a,{primary:Le[e]}))})))):null}var Se=Object(te.a)((function(e){return{root:{margin:e.spacing(1),width:200}}}));function Ge(e){var t=e.className,r=L(c),n=r.toggleFilter,a=r.setTerm,o=Object(s.c)((function(e){return e.filters})),u=o.filter,l=o.partialTerm,d=_e();return i.createElement(ve.a,{row:!0,className:"".concat(t," ").concat(d.root)},i.createElement(Ee.a,{label:"Filter by name",variant:"filled",color:"secondary",onChange:function(e){return a(e.target.value)},className:d.term,value:l}),i.createElement(ke,{className:d.cat}),i.createElement(he.a,{control:i.createElement(Oe.a,{checked:"latestStable"===u,onChange:n}),label:"Latest only",color:"secondary"}))}var _e=Object(te.a)({term:{flexGrow:.7},cat:{flexGrow:.3},root:{}}),Fe=r(25),Ce=r(300),Re=r(315),Be=r(301),Me=r(302),Ue=r(303);var Pe=r(129),He=r.n(Pe),Ve=r(130),ze=r.n(Ve);function Ye(e){var t=e.name,r=We(),n=function(e){var t=Object(s.c)((function(e){return e.favourites})),r=L(a).toggleFavourite;return{toggle:function(){return r(e)},isFavourite:-1!==t.indexOf(e)}}(t),c=n.isFavourite,o=n.toggle,u=c?He.a:ze.a;return i.createElement(ee.a,{className:r.root,onClick:function(e){e.preventDefault(),o()}},i.createElement(u,{fontSize:"small"}))}var We=Object(te.a)((function(e){return{root:{minWidth:0}}})),qe=r(76);function Je(e){var t=e.name,r=e.children,n=e.url,a=e.className,c=$e(),o=t.match(/(.+)\/.+/),u=Object(f.a)(o,2)[1],l=qe.a.find((function(e){return e.repo===t})),s=(null===l||void 0===l?void 0:l.name)||t,d=s.match(/(.+)\/(.+)/),m=Object(f.a)(d,3),p=m[1],b=m[2],g={avatar:i.createElement(Re.a,{src:"https://github.com/".concat(u,".png"),alt:s,variant:"rounded",className:c.avatar},s.substring(0,1).toUpperCase()),action:i.createElement(Ye,{name:t}),subheader:p,title:b,className:c.header};return i.createElement(Ce.a,{item:!0,xs:6,sm:4,md:3},i.createElement("a",{href:n,style:{textDecoration:"none"}},i.createElement(Be.a,{className:ue()(c.box,a)},i.createElement(Me.a,g),i.createElement(Ue.a,null,r))))}var $e=Object(te.a)((function(e){return{header:{textAlign:"left"},box:{borderRadius:8,textDecoration:"none"},text:{color:"white"},modTitle:{display:"flex",alignItems:"flex-start",textAlign:"left","& > :first-child":{flexGrow:1}},avatar:{background:"white"}}}));function Ke(e){var t=e.name,r=e.branches,n=e.state,a=Qe({state:n});return i.createElement(Je,{name:t,url:"https://travis-ci.com/github/".concat(t,"/branches"),className:a.box},"passed"!==n&&i.createElement("div",{className:a.cardActions},Object.keys(r).map((function(e){return i.createElement(ae,{module:t,branch:e,key:e,build:r[e]})}))))}var Qe=Object(te.a)((function(e){return{box:function(e){return{background:"passed"===e.state?re.passed:void 0}},branchBtn:{margin:"0 8px 8px 0",flexGrow:1},cardActions:{flexWrap:"wrap",display:"flex"}}})),Xe=r(304),Ze=r(132),et=r.n(Ze);function tt(){return i.createElement(l.a,{variant:"h1",style:{textAlign:"center"}},i.createElement(et.a,{style:{fontSize:"6rem"}}),i.createElement("br",null),"Oh no! There's no results.")}function rt(e){var t=e.loading,r=e.children,n=e.results,a=nt(),c=Array.isArray(n)?0===n.length:!n;return i.createElement(i.Fragment,null,t||c?i.createElement("div",{className:a.root},t?i.createElement(Xe.a,{size:100}):i.createElement(tt,null)):r)}var nt=Object(j.a)({root:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}});function at(e,t){if(4===t.length)return!0;var r=qe.a.find((function(t){return t.repo===e}));return r?t.includes("core")&&r.core||t.includes("supported")&&r.supported||t.includes("unsupported")&&!r.supported:t.includes("nonmodule")}var ct=function(e){return null!=e&&void 0!==e};function ot(e,t){var r={};e.includes("master")?r.nextMajor="master":e.includes("main")&&(r.nextMajor="main");var n=e.filter((function(e){return e.match(/^\d+$/)})).map((function(e){return parseInt(e)})).reduce((function(e,t){return Math.max(e,t)}),0);if(n){r.nextMinor=n.toString();var a=e.filter((function(e){return e.match(new RegExp("^".concat(n,"\\.\\d+$")))})).map((function(e){return e.replace("".concat(n,"."),"").trim()})).map((function(e){return parseInt(e)})).sort().slice(-2).map((function(e){return"".concat(n,".").concat(e)}));2===a.length?(r.nextPatch=a[1],r.previousPatch=a[0]):1===a.length&&(r.nextPatch=a[0])}return Object.values(r).filter(ct)}var it=[["errored","failed"],["canceled"],["expired"],["running","created","started"],["passed"]];function ut(e,t){if(e===t)return 0;var r=!0,n=!1,a=void 0;try{for(var c,o=it[Symbol.iterator]();!(r=(c=o.next()).done);r=!0){var i=c.value;if(i.indexOf(e)>-1)return-1;if(i.indexOf(t)>-1)return 1}}catch(u){n=!0,a=u}finally{try{r||null==o.return||o.return()}finally{if(n)throw a}}return 0}function lt(e,t){return ot(Object.keys(e)).reduce((function(t,r){return void 0===r?t:Object(R.a)({},t,Object(m.a)({},r,e[r]))}),{})}function st(e,t){var r=t.state;return ut(e,r)>0?r:e}function dt(e,t,r,n){return e.filter((function(e){return at(e.name,r)})).filter((function(e){return-1!==e.name.indexOf(n)})).map((function(e){var r=e.branches,n=Object(Fe.a)(e,["branches"]);return Object(R.a)({branches:"latestStable"===t?lt(r,n.name):r},n)})).map((function(e){return Object(R.a)({},e,{state:Object.values(e.branches).reduce(st,"passed")})})).sort((function(e,t){return function(e,t){if(e===t)return 0;var r=ut(e.state,t.state);return 0!==r?r:e.name.localeCompare(t.name)}(e,t)}))}function mt(){var e=Object(s.c)((function(e){return e})),t=e.filters,r=t.categoryFilters,n=t.filter,a=t.term,c=e.builds;return Object(R.a)({},c,{modules:Object(i.useMemo)((function(){return dt(c.modules,n,r,a)}),[c.modules,r,n,a])})}function ft(){var e=Object(s.c)((function(e){var t=e.filters;return{partialTerm:t.partialTerm,term:t.term}}));return e.partialTerm!==e.term}function pt(){var e=bt(),t=mt(),r=t.modules,n=t.loading,a=ft(),c=Object(s.c)((function(e){return{favourites:e.favourites}})).favourites,o=r.filter((function(e){var t=e.name;return c.includes(t)})),u=r.filter((function(e){var t=e.name;return!c.includes(t)}));return i.createElement(rt,{loading:n||a,results:r},i.createElement("div",{className:e.root},o.length>0&&i.createElement(Ce.a,{className:e.centerContainer,container:!0,direction:"row",justify:"center",alignItems:"stretch",spacing:3},o.map((function(e){var t=e.name,r=Object(Fe.a)(e,["name"]);return i.createElement(Ke,Object.assign({key:t,name:t},r))}))),u.length>0&&i.createElement(Ce.a,{className:e.centerContainer,container:!0,direction:"row",justify:"center",alignItems:"stretch",spacing:3},u.map((function(e){var t=e.name,r=Object(Fe.a)(e,["name"]);return i.createElement(Ke,Object.assign({key:t,name:t},r))})))))}var bt=Object(j.a)({root:{textAlign:"center",paddingTop:20,paddingLeft:15,paddingRight:15},centerContainer:{justifyContent:"flex-start",marginBottom:60},button:{marginTop:20}}),gt=r(133);var vt=["failed","canceled","expired","running","passed"],Et=vt.map((function(e){return re[e]}));function ht(e){return{labels:vt,datasets:[{data:vt.map((function(t){return e[t]})),backgroundColor:Et}]}}function Ot(){var e=yt(),t=function(){var e=mt(),t=e.loading;return{stats:e.modules.reduce((function(e,t){return Object.values(t.branches).forEach((function(t){return e[t.state]++})),e}),{passed:0,errored:0,failed:0,running:0,expired:0,canceled:0,created:0,started:0}),loading:t}}(),r=t.stats,n=t.loading,a=void 0!==Object.values(r).find((function(e){return e>0}));return i.createElement(rt,{loading:n,results:a},i.createElement("div",{className:e.root},i.createElement(gt.Doughnut,{data:ht(r),legend:!1})))}var jt,yt=Object(j.a)({root:{textAlign:"center",paddingTop:20,paddingLeft:15,paddingRight:15},centerContainer:{},button:{marginTop:20}});function xt(e,t){var r=ot(e.map((function(e){return e.base})));return e.filter((function(e){var t=e.base;return r.includes(t)}))}function Tt(e,t){if(0!==e.compares.length&&0===t.compares.length)return-1;if(0===e.compares.length&&0!==t.compares.length)return 1;var r=void 0===e.compares.find((function(e){return e.ahead_by>0})),n=void 0===t.compares.find((function(e){return e.ahead_by>0}));return r&&!n?1:!r&&n?-1:e.repo.localeCompare(t.repo)}function It(){var e=Object(s.c)((function(e){return e})),t=e.filters,r=t.categoryFilters,n=t.filter,a=t.term,c=e.mergeups,o=c.mergeups;return{loading:c.loading,mergeups:Object(i.useMemo)((function(){return function(e,t,r,n){return e.filter((function(e){return at(e.repo,r)})).filter((function(e){return e.repo.includes(n)})).map((function(e){var r=e.compares,n=e.repo;return{compares:"latestStable"===t?xt(r):r,repo:n}})).sort(Tt)}(o,n,r,a)}),[o,r,n,a])}}!function(e){e.LOADING="LOADING_MERGEUP",e.LOADED="MERGEUP_LOADED"}(jt||(jt={}));var Dt=k("mergeup",jt.LOADING,jt.LOADED);function At(e){var t=e.repo,r=e.head,n=e.base,a=e.ahead_by,c=wt(),o=0===a,u=o?"up-to-date":"ahead by ".concat(a," commit").concat(a>1?"s":"");return i.createElement(ee.a,{href:"https://github.com/".concat(t,"/compare/").concat(n,"...").concat(r),className:ue()(c.root,Object(m.a)({},c.expired,!o)),variant:o?"outlined":void 0},i.createElement("span",{className:c.range},n,"...",r),i.createElement("span",null,u))}var wt=Object(te.a)({root:{margin:"0 8px 8px 0",flexGrow:1,textDecoration:"none",width:"100%"},expired:{background:re.expired,"&:hover":{background:re.expired}},range:{flexGrow:1,textAlign:"left"}});function Nt(e){var t=e.repo,r=e.compares,n=Lt({});return i.createElement(Je,{name:t,url:"https://github.com/".concat(t),className:n.box},i.createElement("div",{className:n.cardActions},r.map((function(e){return i.createElement(At,Object.assign({key:e.base,repo:t},e))}))))}var Lt=Object(te.a)((function(e){return{box:function(e){return{}},branchBtn:{margin:"0 8px 8px 0",flexGrow:1},cardActions:{flexWrap:"wrap",display:"flex"}}}));function kt(){var e=L(o).initMergeupData;i.useEffect(e,[]);var t=St(),r=ft(),n=It(),a=n.loading,c=n.mergeups,u=Object(s.c)((function(e){return{favourites:e.favourites}})).favourites,l=c.filter((function(e){var t=e.repo;return u.includes(t)})),d=c.filter((function(e){var t=e.repo;return!u.includes(t)}));return i.createElement(rt,{loading:a||r,results:c},i.createElement("div",{className:t.root},l.length>0&&i.createElement(Ce.a,{className:t.centerContainer,container:!0,direction:"row",justify:"center",alignItems:"stretch",spacing:3},l.map((function(e){var t=e.repo,r=Object(Fe.a)(e,["repo"]);return i.createElement(Nt,Object.assign({key:"repo",repo:t},r))}))),d.length>0&&i.createElement(Ce.a,{className:t.centerContainer,container:!0,direction:"row",justify:"center",alignItems:"stretch",spacing:3},d.map((function(e){var t=e.repo,r=Object(Fe.a)(e,["repo"]);return i.createElement(Nt,Object.assign({key:"repo",repo:t},r))})))))}var St=Object(j.a)({root:{textAlign:"center",paddingTop:20,paddingLeft:15,paddingRight:15},centerContainer:{justifyContent:"flex-start",marginBottom:60},button:{marginTop:20}});function Gt(){var e=_t();return i.createElement("div",{className:e.root},i.createElement(oe.c,null,i.createElement(oe.a,{exact:!0,path:"/",component:pt}),i.createElement(oe.a,{path:"/home",component:pt}),i.createElement(oe.a,{path:"/mergeups",component:kt}),i.createElement(oe.a,{path:"/stats",component:Ot})))}var _t=Object(j.a)((function(e){return{root:Object(m.a)({backgroundColor:e.palette.background.default,overflow:"auto",width:"100%",height:"calc(100% - 56px)",marginTop:56},e.breakpoints.up("sm"),{height:"calc(100% - 64px)",marginTop:64})}}));var Ft,Ct=Object(j.a)((function(e){return{root:{width:"100%",height:"100%",zIndex:1,overflow:"hidden"},appFrame:{position:"relative",display:"flex",width:"100%",height:"100%"},appBar:Object(m.a)({zIndex:e.zIndex.drawer+1,position:"absolute"},e.breakpoints.up("md"),{width:"calc(100% - 240px)"}),appForm:{flexGrow:1},navIconHide:Object(m.a)({},e.breakpoints.up("md"),{display:"none"}),drawerPaper:Object(m.a)({width:250,backgroundColor:e.palette.background.default},e.breakpoints.up("md"),{width:240,position:"relative",height:"100%"})}})),Rt=(Ft=function(){var e=L(n),t=L(a).initFavourite;i.useEffect((function(){e.initBuildData(),t()}),[]);var r=Ct(),c=i.useState(!1),o=Object(f.a)(c,2),u=o[0],l=o[1],s=Object(p.a)((function(e){return e.breakpoints.down("sm")}));return i.createElement(y.a,{basename:"/travis-dashboard"},i.createElement("div",{className:r.root},i.createElement("div",{className:r.appFrame},i.createElement("nav",{className:""},i.createElement(b.a,{variant:s?"temporary":"permanent",open:!s||u,onClose:function(){return l(!1)},classes:{paper:r.drawerPaper},ModalProps:{keepMounted:!0}},i.createElement(pe,null))),i.createElement(g.a,{className:r.appBar},i.createElement(v.a,null,i.createElement(E.a,{color:"inherit","aria-label":"open drawer",onClick:function(){l(!u)},className:r.navIconHide},i.createElement(O.a,null)),i.createElement(Ge,{className:r.appForm}))),i.createElement(Gt,null))))},function(e){return i.createElement(I.a,{theme:D},i.createElement(x.a,null),i.createElement(Ft,e))}),Bt=r(20),Mt=r(135),Ut=(r(136),r(137)),Pt=r(92),Ht=r(91);function Vt(e,t){return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,n=arguments.length>1?arguments[1]:void 0;return t.hasOwnProperty(n.type)?t[n.type](r,n):r}}var zt,Yt={modules:[],loading:!0};function Wt(e){if(!e||"passed"!==e.state)return e;var t=new Date(e.started_at),r=new Date,n=new Date;return n.setDate(r.getDate()-30),t<n?Object(R.a)({},e,{state:"expired"}):e}var qt,Jt,$t=Vt(Yt,(zt={},Object(m.a)(zt,A.LOADING_BUILDS,(function(){return Yt})),Object(m.a)(zt,A.BUILD_LOADED,(function(e,t){var r,n=t.payload,a=n.json,c=n.lastModified;return Object(R.a)({},e,{modules:(r=a,Object.keys(r).map((function(e){return{branches:r[e],name:e}})).map((function(e){var t=e.branches,r=Object(Fe.a)(e,["branches"]);for(var n in t)t[n]=Wt(t[n]);return Object(R.a)({branches:t},r)}))),lastModified:c,loading:!1})})),zt)),Kt=Vt({filter:"latestStable",term:"",partialTerm:"",categoryFilters:["core","nonmodule","supported","unsupported"]},(qt={},Object(m.a)(qt,be.TOGGLE_FILTER,(function(e){var t=e.filter,r=Object(Fe.a)(e,["filter"]);return Object(R.a)({},r,{filter:"latestStable"===t?"all":"latestStable"})})),Object(m.a)(qt,be.SET_TERM,(function(e,t){e.triggerSearchTimeout&&clearTimeout(e.triggerSearchTimeout);var r=t.payload,n=r.term,a=r.triggerSearchTimeout;return Object(R.a)({},e,{partialTerm:n.toLocaleLowerCase(),triggerSearchTimeout:a})})),Object(m.a)(qt,be.TRIGGER_SEARCH,(function(e){return Object(R.a)({},e,{term:e.partialTerm})})),Object(m.a)(qt,be.SET_CATEGORY_FILTER,(function(e,t){var r=t.payload.categoryFilters;return Object(R.a)({},e,{categoryFilters:r})})),qt)),Qt={mergeups:[],loading:!0},Xt=Vt(Qt,(Jt={},Object(m.a)(Jt,jt.LOADING,(function(){return Qt})),Object(m.a)(Jt,jt.LOADED,(function(e,t){var r=t.payload,n=r.json,a=r.lastModified;return Object(R.a)({},e,{mergeups:n,lastModified:a,loading:!1})})),Jt)),Zt=Vt([],Object(m.a)({},S.INIT_FAV,(function(e,t){return t.payload||[]}))),er={key:"root",version:1,storage:Mt,blacklist:[]},tr=(Object(Ut.createLogger)(),Object(Bt.a)(),Object(N.applyMiddleware)(Ht.a));var rr=Object(Pt.a)(er,Object(N.combineReducers)({builds:$t,filters:Kt,favourites:Zt,mergeups:Xt})),nr=function(){var e=Object(N.createStore)(rr,{},tr);return{store:e,persistor:Object(Pt.b)(e)}}(),ar=nr.persistor,cr=nr.store;var or=document.getElementById("root");u.render(i.createElement((function(){return i.createElement(s.a,{store:cr},i.createElement(d.a,{loading:i.createElement(l.a,null,"Loading..."),persistor:ar},i.createElement(Rt,null)))}),null),or)}},[[146,1,2]]]);
//# sourceMappingURL=main.186f39bb.chunk.js.map