!function(n){var l={};function r(e){if(l[e])return l[e].exports;var t=l[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=n,r.c=l,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var l in t)r.d(n,l,function(e){return t[e]}.bind(null,l));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s="./src/blocks.js")}({"./src/block/block.js":function(e,t,n){"use strict";n("./src/block/style.scss"),n("./src/block/editor.scss");var l=wp.editor,u=l.MediaUpload,p=l.MediaPlaceholder,f=l.BlockControls,y=l.InspectorControls,r=wp.blocks.registerBlockType,a=wp.components,d=a.IconButton,g=a.RangeControl,b=a.ToggleControl,v=wp.i18n.__;r("ay/gallery",{title:v("AY Gallery","ay"),description:v("Only for nice images 😍","ay"),icon:"format-gallery",category:"common",supports:{align:["full"]},attributes:{images:{type:"array"},columns:{type:"number",default:"1"},fancy:{default:!1},fancyClass:{type:"string",default:""}},edit:function(e){var t=e.attributes,n=e.className,l=e.setAttributes,r=t.images,a=void 0===r?[]:r,c=a.map(function(e){return JSON.parse(e)}),o=t.columns,s=t.fancy,i=t.fancyClass;function m(e){l({images:e.map(function(e){return JSON.stringify({id:e.id,url:e.url,alt:e.alt})})})}return l(!0===s?{fancyClass:" fancy"}:{fancyClass:""}),0===a.length?wp.element.createElement("div",null,wp.element.createElement(p,{icon:"format-gallery",className:n,onSelect:m,accept:"image/*",allowedTypes:["image"],multiple:!0})):wp.element.createElement("div",null,wp.element.createElement(y,null,wp.element.createElement(g,{label:v("Columns","ay"),value:o,initialPosition:o,onChange:function(e){l({columns:e})},min:1,max:3,className:"components-panel__body is-opened"}),wp.element.createElement(b,{label:v("Fancybox","ay"),checked:s,onChange:function(e){l({fancy:e})}})),wp.element.createElement(f,null,!!a.length&&wp.element.createElement("div",{className:"components-toolbar"},wp.element.createElement(u,{type:"image",multiple:!0,gallery:!0,value:c.map(function(e){return e.id}),onSelect:m,render:function(e){var t=e.open;return wp.element.createElement(d,{className:"components-icon-button components-toolbar__control",icon:"edit",onClick:t})}}))),wp.element.createElement("div",{className:"ay-gallery col-"+o+i},c.map(function(e){return wp.element.createElement("figure",{className:"ay-gallery__item"},wp.element.createElement("img",{className:"ay-gallery__item-img",src:e.url,key:e.id}))})))},save:function(e){var t=e.attributes,n=t.images,l=(void 0===n?[]:n).map(function(e){return JSON.parse(e)}),r=t.columns,a=(t.fancy,t.fancyClass);return wp.element.createElement("div",null,wp.element.createElement("div",{className:"ay-gallery col-"+r+a},l.map(function(e){return wp.element.createElement("div",{className:"ay-gallery__item"},wp.element.createElement("img",{className:"ay-gallery__item-img",src:e.url,key:e.id}))})))}})},"./src/block/editor.scss":function(e,t){},"./src/block/style.scss":function(e,t){},"./src/blocks.js":function(e,t,n){"use strict";n("./src/block/block.js")}});