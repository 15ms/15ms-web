(()=>{"use strict";var e={196:e=>{e.exports=ReactDOM}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const e=React;var t=r.n(e);function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var u=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(s,e);var r,n,u,f,l=(u=s,f=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=c(u);if(f){var r=c(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return a(this,e)});function s(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),e=l.call(this);var t=window.epii.state;return e.state={model:{server:t.server},stage:""},e}return r=s,(n=[{key:"componentDidMount",value:function(){var e=new URL(window.location.href).hash.slice(1);this.changeStage(e)}},{key:"changeStage",value:function(e){if(e){this.setState({stage:e});var t=new URL(window.location.href);t.hash!==e&&(t.hash=e,window.history.pushState(null,e,t.toString()))}}},{key:"render",value:function(){var e=this.state,r=e.model;return e.stage,t().createElement("div",{className:"container"},t().createElement("div",{className:"block header"},t().createElement("h1",null,"15ms")),t().createElement("div",{className:"block footer"},t().createElement("p",null,r.server.version,".",r.server.buildId)))}}])&&o(r.prototype,n),s}(e.Component);if("undefined"!=typeof window&&window){var f=u;if(!f)throw new Error("target epii.entry not provided");window.epii||(window.epii={}),window.epii.entry=f;var l=r(196),s=document.getElementById("app");if(!s)throw new Error("holder app not provided");l.render(t().createElement(f),s)}})()})();