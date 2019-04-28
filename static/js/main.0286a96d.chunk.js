(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{155:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(19),s=n.n(i),o=n(20),c=(n(68),n(27)),u=n(28),l=n(31),m=n(29),h=n(17),d=n(30),f=(n(69),n(62)),w=n.n(f),p=n(32),v=n.n(p),y=n(33),b=n.n(y),j=Object(o.withStyles)(function(e){return{root:{display:"flex",justifyContent:"center",alignItems:"flex-end"},icon:{margin:1*e.spacing.unit}}})(function(e){var t=e.classes,n=e.increment,a=e.decrement,i=e.reset;return r.a.createElement("div",{className:"selector"},r.a.createElement(v.a,{variant:"contained",color:"default",onClick:a},r.a.createElement(b.a,{className:t.icon},"expand_less")),"\xa0\xa0",r.a.createElement(v.a,{variant:"contained",color:"default",onClick:i},r.a.createElement(b.a,{className:t.icon},"adjust")),"\xa0\xa0",r.a.createElement(v.a,{variant:"contained",color:"default",onClick:n},r.a.createElement(b.a,{className:t.icon},"expand_more")))}),k=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"wareki_str",value:function(e,t){var n=this.props.date.year,a=n.meijis,r=n.taishous,i=n.shouwas,s=n.heiseis,o=this.props.date.limit,c=o.meiji,u=o.taishou,l=o.shouwa;return e<=1867?"-":e<c?"\u660e\u6cbb".concat(a[t],"\u5e74"):e<u?"\u5927\u6b63".concat(r[t],"\u5e74"):e<l?"\u662d\u548c".concat(i[t],"\u5e74"):"\u5e73\u6210".concat(s[t],"\u5e74")}},{key:"reiwa_str",value:function(e){var t=this.props.date.year.reiwas;return t[e]<=0?"-":"\u4ee4\u548c".concat(t[e],"\u5e74")}},{key:"class_name",value:function(e){var t=this.props.date.thisYear,n="";return e%10===0?n="demilita":e===t&&(n="this_year"),n}},{key:"render",value:function(){var e=this,t=this.props.date.year.annos;return r.a.createElement("div",{className:"table"},r.a.createElement("table",null,r.a.createElement("tbody",null,t.map(function(t,n){return r.a.createElement("tr",{key:n},r.a.createElement("td",{className:e.class_name(t)},t,"\u5e74"),r.a.createElement("td",{className:e.class_name(t)},e.wareki_str(t,n)),r.a.createElement("td",{className:e.class_name(t)},e.reiwa_str(n)))}))))}}]),t}(a.Component),g=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={year:{annos:[],meijis:[],taishous:[],shouwas:[],heiseis:[],reiwas:[]},limit:{meiji:1912,taishou:1926,shouwa:1989,heisei:2019},thisYear:0},n.reset=n.reset.bind(Object(h.a)(n)),n.increment=n.increment.bind(Object(h.a)(n)),n.decrement=n.decrement.bind(Object(h.a)(n)),n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"makeDate",value:function(e){for(var t=new Array(16),n=new Array(16),a=new Array(16),r=new Array(16),i=new Array(16),s=new Array(16),o=0;o<16;o++)t[o]=e-8+o,n[o]=t[o]-1867,a[o]=t[o]-1911,r[o]=t[o]-1925,i[o]=t[o]-1988,s[o]=i[o]-30;this.setState({year:{annos:t,meijis:n,taishous:a,shouwas:r,heiseis:i,reiwas:s}})}},{key:"componentDidMount",value:function(){this.reset()}},{key:"reset",value:function(){var e=(new Date).getFullYear();this.setState({thisYear:e}),this.makeDate(e)}},{key:"increment",value:function(){var e=this.state.year,t=e.annos,n=e.meijis,a=e.taishous,r=e.shouwas,i=e.heiseis,s=e.reiwas;this.setState({year:{annos:t.map(function(e){return e+3}),meijis:n.map(function(e){return e+3}),taishous:a.map(function(e){return e+3}),shouwas:r.map(function(e){return e+3}),heiseis:i.map(function(e){return e+3}),reiwas:s.map(function(e){return e+3})}})}},{key:"decrement",value:function(){var e=this.state.year,t=e.annos,n=e.meijis,a=e.taishous,r=e.shouwas,i=e.heiseis,s=e.reiwas;this.setState({year:{annos:t.map(function(e){return e-3}),meijis:n.map(function(e){return e-3}),taishous:a.map(function(e){return e-3}),shouwas:r.map(function(e){return e-3}),heiseis:i.map(function(e){return e-3}),reiwas:s.map(function(e){return e-3})}})}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(w.a,{component:"h2",variant:"h3"},"\u548c\u66a6"),r.a.createElement(j,{date:this.state,increment:this.increment,decrement:this.decrement,reset:this.reset}),r.a.createElement(k,{date:this.state}))}}]),t}(a.Component),E=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var A=Object(o.createMuiTheme)({typography:{useNextVariants:!0}});s.a.render(r.a.createElement(o.MuiThemeProvider,{theme:A},r.a.createElement(g,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat(".","/service-worker.js");E?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):O(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):O(t,e)})}}()},63:function(e,t,n){e.exports=n(155)},68:function(e,t,n){},69:function(e,t,n){}},[[63,1,2]]]);
//# sourceMappingURL=main.0286a96d.chunk.js.map