module.exports=function(e){function t(o){if(r[o])return r[o].exports;var n=r[o]={exports:{},id:o,loaded:!1};return e[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(3)},function(e,t){e.exports=require("prop-types")},function(e,t){e.exports=require("react")},function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){var r={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);return r}function i(e){var t=e.spinColor,r=void 0===t?"#fff":t,o=e.spinConfig,i=void 0===o?{length:4,lines:15,radius:3,width:2}:o,a=n(e,["spinColor","spinConfig"]),u={display:"inline-block",height:"11px",position:"relative",width:"16px"};return p.default.createElement("div",l({style:{display:"inline-block"}},a),p.default.createElement("div",{style:u},p.default.createElement(d.default,l({},i,{color:r,loaded:!1}))))}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},a=r(2),p=o(a),u=r(1),s=o(u),f=r(4),d=o(f),c={spinColor:s.default.string,spinConfig:s.default.object};i.propTypes=c,t.default=i},function(e,t){e.exports=require("react-loader")}]);