(()=>{"use strict";var e={516:(e,t,n)=>{function r(e,t){void 0===t&&(t=!1);var n=e.length,r=0,s="",l=0,u=16,c=0,f=0,d=0,p=0,g=0;function h(t,n){for(var o=0,i=0;o<t||!n;){var a=e.charCodeAt(r);if(a>=48&&a<=57)i=16*i+a-48;else if(a>=65&&a<=70)i=16*i+a-65+10;else{if(!(a>=97&&a<=102))break;i=16*i+a-97+10}r++,o++}return o<t&&(i=-1),i}function m(){if(s="",g=0,l=r,f=c,p=d,r>=n)return l=n,u=17;var t=e.charCodeAt(r);if(o(t)){do{r++,s+=String.fromCharCode(t),t=e.charCodeAt(r)}while(o(t));return u=15}if(i(t))return r++,s+=String.fromCharCode(t),13===t&&10===e.charCodeAt(r)&&(r++,s+="\n"),c++,d=r,u=14;switch(t){case 123:return r++,u=1;case 125:return r++,u=2;case 91:return r++,u=3;case 93:return r++,u=4;case 58:return r++,u=6;case 44:return r++,u=5;case 34:return r++,s=function(){for(var t="",o=r;;){if(r>=n){t+=e.substring(o,r),g=2;break}var a=e.charCodeAt(r);if(34===a){t+=e.substring(o,r),r++;break}if(92!==a){if(a>=0&&a<=31){if(i(a)){t+=e.substring(o,r),g=2;break}g=6}r++}else{if(t+=e.substring(o,r),++r>=n){g=2;break}switch(e.charCodeAt(r++)){case 34:t+='"';break;case 92:t+="\\";break;case 47:t+="/";break;case 98:t+="\b";break;case 102:t+="\f";break;case 110:t+="\n";break;case 114:t+="\r";break;case 116:t+="\t";break;case 117:var s=h(4,!0);s>=0?t+=String.fromCharCode(s):g=4;break;default:g=5}o=r}}return t}(),u=10;case 47:var m=r-1;if(47===e.charCodeAt(r+1)){for(r+=2;r<n&&!i(e.charCodeAt(r));)r++;return s=e.substring(m,r),u=12}if(42===e.charCodeAt(r+1)){r+=2;for(var b=n-1,y=!1;r<b;){var C=e.charCodeAt(r);if(42===C&&47===e.charCodeAt(r+1)){r+=2,y=!0;break}r++,i(C)&&(13===C&&10===e.charCodeAt(r)&&r++,c++,d=r)}return y||(r++,g=1),s=e.substring(m,r),u=13}return s+=String.fromCharCode(t),r++,u=16;case 45:if(s+=String.fromCharCode(t),++r===n||!a(e.charCodeAt(r)))return u=16;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return s+=function(){var t=r;if(48===e.charCodeAt(r))r++;else for(r++;r<e.length&&a(e.charCodeAt(r));)r++;if(r<e.length&&46===e.charCodeAt(r)){if(!(++r<e.length&&a(e.charCodeAt(r))))return g=3,e.substring(t,r);for(r++;r<e.length&&a(e.charCodeAt(r));)r++}var n=r;if(r<e.length&&(69===e.charCodeAt(r)||101===e.charCodeAt(r)))if((++r<e.length&&43===e.charCodeAt(r)||45===e.charCodeAt(r))&&r++,r<e.length&&a(e.charCodeAt(r))){for(r++;r<e.length&&a(e.charCodeAt(r));)r++;n=r}else g=3;return e.substring(t,n)}(),u=11;default:for(;r<n&&v(t);)r++,t=e.charCodeAt(r);if(l!==r){switch(s=e.substring(l,r)){case"true":return u=8;case"false":return u=9;case"null":return u=7}return u=16}return s+=String.fromCharCode(t),r++,u=16}}function v(e){if(o(e)||i(e))return!1;switch(e){case 125:case 93:case 123:case 91:case 34:case 58:case 44:case 47:return!1}return!0}return{setPosition:function(e){r=e,s="",l=0,u=16,g=0},getPosition:function(){return r},scan:t?function(){var e;do{e=m()}while(e>=12&&e<=15);return e}:m,getToken:function(){return u},getTokenValue:function(){return s},getTokenOffset:function(){return l},getTokenLength:function(){return r-l},getTokenStartLine:function(){return f},getTokenStartCharacter:function(){return l-p},getTokenError:function(){return g}}}function o(e){return 32===e||9===e||11===e||12===e||160===e||5760===e||e>=8192&&e<=8203||8239===e||8287===e||12288===e||65279===e}function i(e){return 10===e||13===e||8232===e||8233===e}function a(e){return e>=48&&e<=57}function s(e,t,n){var o,i,a,s,c;if(t){for(s=t.offset,c=s+t.length,a=s;a>0&&!u(e,a-1);)a--;for(var f=c;f<e.length&&!u(e,f);)f++;i=e.substring(a,f),o=function(e,t){for(var n=0,r=0,o=t.tabSize||4;n<e.length;){var i=e.charAt(n);if(" "===i)r++;else{if("\t"!==i)break;r+=o}n++}return Math.floor(r/o)}(i,n)}else i=e,o=0,a=0,s=0,c=e.length;var d,p=function(e,t){for(var n=0;n<t.length;n++){var r=t.charAt(n);if("\r"===r)return n+1<t.length&&"\n"===t.charAt(n+1)?"\r\n":"\r";if("\n"===r)return"\n"}return e&&e.eol||"\n"}(n,e),g=!1,h=0;d=n.insertSpaces?l(" ",n.tabSize||4):"\t";var m=r(i,!1),v=!1;function b(){return p+l(d,o+h)}function y(){var e=m.scan();for(g=!1;15===e||14===e;)g=g||14===e,e=m.scan();return v=16===e||0!==m.getTokenError(),e}var C=[];function k(t,n,r){!v&&n<c&&r>s&&e.substring(n,r)!==t&&C.push({offset:n,length:r-n,content:t})}var w=y();if(17!==w){var S=m.getTokenOffset()+a;k(l(d,o),a,S)}for(;17!==w;){for(var A=m.getTokenOffset()+m.getTokenLength()+a,x=y(),I="";!g&&(12===x||13===x);)k(" ",A,m.getTokenOffset()+a),A=m.getTokenOffset()+m.getTokenLength()+a,I=12===x?b():"",x=y();if(2===x)1!==w&&(h--,I=b());else if(4===x)3!==w&&(h--,I=b());else{switch(w){case 3:case 1:h++,I=b();break;case 5:case 12:I=b();break;case 13:I=g?b():" ";break;case 6:I=" ";break;case 10:if(6===x){I="";break}case 7:case 8:case 9:case 11:case 2:case 4:12===x||13===x?I=" ":5!==x&&17!==x&&(v=!0);break;case 16:v=!0}!g||12!==x&&13!==x||(I=b())}k(I,A,m.getTokenOffset()+a),w=x}return C}function l(e,t){for(var n="",r=0;r<t;r++)n+=e;return n}function u(e,t){return-1!=="\r\n".indexOf(e.charAt(t))}var c;function f(e,t,n){void 0===t&&(t=[]),void 0===n&&(n=c.DEFAULT);var r={type:"array",offset:-1,length:-1,children:[],parent:void 0};function o(e){"property"===r.type&&(r.length=e-r.offset,r=r.parent)}function i(e){return r.children.push(e),e}p(e,{onObjectBegin:function(e){r=i({type:"object",offset:e,length:-1,parent:r,children:[]})},onObjectProperty:function(e,t,n){(r=i({type:"property",offset:t,length:-1,parent:r,children:[]})).children.push({type:"string",value:e,offset:t,length:n,parent:r})},onObjectEnd:function(e,t){o(e+t),r.length=e+t-r.offset,r=r.parent,o(e+t)},onArrayBegin:function(e,t){r=i({type:"array",offset:e,length:-1,parent:r,children:[]})},onArrayEnd:function(e,t){r.length=e+t-r.offset,r=r.parent,o(e+t)},onLiteralValue:function(e,t,n){i({type:g(e),offset:t,length:n,parent:r,value:e}),o(t+n)},onSeparator:function(e,t,n){"property"===r.type&&(":"===e?r.colonOffset=t:","===e&&o(t))},onError:function(e,n,r){t.push({error:e,offset:n,length:r})}},n);var a=r.children[0];return a&&delete a.parent,a}function d(e,t){if(e){for(var n=e,r=0,o=t;r<o.length;r++){var i=o[r];if("string"==typeof i){if("object"!==n.type||!Array.isArray(n.children))return;for(var a=!1,s=0,l=n.children;s<l.length;s++){var u=l[s];if(Array.isArray(u.children)&&u.children[0].value===i){n=u.children[1],a=!0;break}}if(!a)return}else{var c=i;if("array"!==n.type||c<0||!Array.isArray(n.children)||c>=n.children.length)return;n=n.children[c]}}return n}}function p(e,t,n){void 0===n&&(n=c.DEFAULT);var o=r(e,!1);function i(e){return e?function(){return e(o.getTokenOffset(),o.getTokenLength(),o.getTokenStartLine(),o.getTokenStartCharacter())}:function(){return!0}}function a(e){return e?function(t){return e(t,o.getTokenOffset(),o.getTokenLength(),o.getTokenStartLine(),o.getTokenStartCharacter())}:function(){return!0}}var s=i(t.onObjectBegin),l=a(t.onObjectProperty),u=i(t.onObjectEnd),f=i(t.onArrayBegin),d=i(t.onArrayEnd),p=a(t.onLiteralValue),g=a(t.onSeparator),h=i(t.onComment),m=a(t.onError),v=n&&n.disallowComments,b=n&&n.allowTrailingComma;function y(){for(;;){var e=o.scan();switch(o.getTokenError()){case 4:C(14);break;case 5:C(15);break;case 3:C(13);break;case 1:v||C(11);break;case 2:C(12);break;case 6:C(16)}switch(e){case 12:case 13:v?C(10):h();break;case 16:C(1);break;case 15:case 14:break;default:return e}}}function C(e,t,n){if(void 0===t&&(t=[]),void 0===n&&(n=[]),m(e),t.length+n.length>0)for(var r=o.getToken();17!==r;){if(-1!==t.indexOf(r)){y();break}if(-1!==n.indexOf(r))break;r=y()}}function k(e){var t=o.getTokenValue();return e?p(t):l(t),y(),!0}return y(),17===o.getToken()?!!n.allowEmptyContent||(C(4,[],[]),!1):function e(){switch(o.getToken()){case 3:return function(){f(),y();for(var t=!1;4!==o.getToken()&&17!==o.getToken();){if(5===o.getToken()){if(t||C(4,[],[]),g(","),y(),4===o.getToken()&&b)break}else t&&C(6,[],[]);e()||C(4,[],[4,5]),t=!0}return d(),4!==o.getToken()?C(8,[4],[]):y(),!0}();case 1:return function(){s(),y();for(var t=!1;2!==o.getToken()&&17!==o.getToken();){if(5===o.getToken()){if(t||C(4,[],[]),g(","),y(),2===o.getToken()&&b)break}else t&&C(6,[],[]);(10!==o.getToken()?(C(3,[],[2,5]),0):(k(!1),6===o.getToken()?(g(":"),y(),e()||C(4,[],[2,5])):C(5,[],[2,5]),1))||C(4,[],[2,5]),t=!0}return u(),2!==o.getToken()?C(7,[2],[]):y(),!0}();case 10:return k(!0);default:return function(){switch(o.getToken()){case 11:var e=0;try{"number"!=typeof(e=JSON.parse(o.getTokenValue()))&&(C(2),e=0)}catch(e){C(2)}p(e);break;case 7:p(null);break;case 8:p(!0);break;case 9:p(!1);break;default:return!1}return y(),!0}()}}()?(17!==o.getToken()&&C(9,[],[]),!0):(C(4,[],[]),!1)}function g(e){switch(typeof e){case"boolean":return"boolean";case"number":return"number";case"string":return"string";case"object":return e?Array.isArray(e)?"array":"object":"null";default:return"null"}}function h(e,t,n){var r=m(e,t),o=t.offset,i=t.offset+t.content.length;if(0===t.length||0===t.content.length){for(;o>0&&!u(r,o-1);)o--;for(;i<r.length&&!u(r,i);)i++}for(var a=s(r,{offset:o,length:i-o},n),l=a.length-1;l>=0;l--){var c=a[l];r=m(r,c),o=Math.min(o,c.offset),i=Math.max(i,c.offset+c.length),i+=c.content.length-c.length}return[{offset:o,length:e.length-(r.length-i)-o,content:r.substring(o,i)}]}function m(e,t){return e.substring(0,t.offset)+t.content+e.substring(t.offset+t.length)}n.r(t),n.d(t,{applyEdits:()=>j,createScanner:()=>v,findNodeAtLocation:()=>k,findNodeAtOffset:()=>w,format:()=>O,getLocation:()=>b,getNodePath:()=>S,getNodeValue:()=>A,modify:()=>T,parse:()=>y,parseTree:()=>C,printParseErrorCode:()=>P,stripComments:()=>I,visit:()=>x}),function(e){e.DEFAULT={allowTrailingComma:!1}}(c||(c={}));var v=r,b=function(e,t){var n=[],r=new Object,o=void 0,i={value:{},offset:0,length:0,type:"object",parent:void 0},a=!1;function s(e,t,n,r){i.value=e,i.offset=t,i.length=n,i.type=r,i.colonOffset=void 0,o=i}try{p(e,{onObjectBegin:function(e,i){if(t<=e)throw r;o=void 0,a=t>e,n.push("")},onObjectProperty:function(e,o,i){if(t<o)throw r;if(s(e,o,i,"property"),n[n.length-1]=e,t<=o+i)throw r},onObjectEnd:function(e,i){if(t<=e)throw r;o=void 0,n.pop()},onArrayBegin:function(e,i){if(t<=e)throw r;o=void 0,n.push(0)},onArrayEnd:function(e,i){if(t<=e)throw r;o=void 0,n.pop()},onLiteralValue:function(e,n,o){if(t<n)throw r;if(s(e,n,o,g(e)),t<=n+o)throw r},onSeparator:function(e,i,s){if(t<=i)throw r;if(":"===e&&o&&"property"===o.type)o.colonOffset=i,a=!1,o=void 0;else if(","===e){var l=n[n.length-1];"number"==typeof l?n[n.length-1]=l+1:(a=!0,n[n.length-1]=""),o=void 0}}})}catch(e){if(e!==r)throw e}return{path:n,previousNode:o,isAtPropertyKey:a,matches:function(e){for(var t=0,r=0;t<e.length&&r<n.length;r++)if(e[t]===n[r]||"*"===e[t])t++;else if("**"!==e[t])return!1;return t===e.length}}},y=function(e,t,n){void 0===t&&(t=[]),void 0===n&&(n=c.DEFAULT);var r=null,o=[],i=[];function a(e){Array.isArray(o)?o.push(e):null!==r&&(o[r]=e)}return p(e,{onObjectBegin:function(){var e={};a(e),i.push(o),o=e,r=null},onObjectProperty:function(e){r=e},onObjectEnd:function(){o=i.pop()},onArrayBegin:function(){var e=[];a(e),i.push(o),o=e,r=null},onArrayEnd:function(){o=i.pop()},onLiteralValue:a,onError:function(e,n,r){t.push({error:e,offset:n,length:r})}},n),o[0]},C=f,k=d,w=function e(t,n,r){if(void 0===r&&(r=!1),function(e,t,n){return void 0===n&&(n=!1),t>=e.offset&&t<e.offset+e.length||n&&t===e.offset+e.length}(t,n,r)){var o=t.children;if(Array.isArray(o))for(var i=0;i<o.length&&o[i].offset<=n;i++){var a=e(o[i],n,r);if(a)return a}return t}},S=function e(t){if(!t.parent||!t.parent.children)return[];var n=e(t.parent);if("property"===t.parent.type){var r=t.parent.children[0].value;n.push(r)}else if("array"===t.parent.type){var o=t.parent.children.indexOf(t);-1!==o&&n.push(o)}return n},A=function e(t){switch(t.type){case"array":return t.children.map(e);case"object":for(var n=Object.create(null),r=0,o=t.children;r<o.length;r++){var i=o[r],a=i.children[1];a&&(n[i.children[0].value]=e(a))}return n;case"null":case"string":case"number":case"boolean":return t.value;default:return}},x=p,I=function(e,t){var n,o,i=r(e),a=[],s=0;do{switch(o=i.getPosition(),n=i.scan()){case 12:case 13:case 17:s!==o&&a.push(e.substring(s,o)),void 0!==t&&a.push(i.getTokenValue().replace(/[^\r\n]/g,t)),s=i.getPosition()}}while(17!==n);return a.join("")};function P(e){switch(e){case 1:return"InvalidSymbol";case 2:return"InvalidNumberFormat";case 3:return"PropertyNameExpected";case 4:return"ValueExpected";case 5:return"ColonExpected";case 6:return"CommaExpected";case 7:return"CloseBraceExpected";case 8:return"CloseBracketExpected";case 9:return"EndOfFileExpected";case 10:return"InvalidCommentToken";case 11:return"UnexpectedEndOfComment";case 12:return"UnexpectedEndOfString";case 13:return"UnexpectedEndOfNumber";case 14:return"InvalidUnicode";case 15:return"InvalidEscapeCharacter";case 16:return"InvalidCharacter"}return"<unknown ParseErrorCode>"}function O(e,t,n){return s(e,t,n)}function T(e,t,n,r){return function(e,t,n,r,o){for(var i,a=t.slice(),s=f(e,[]),l=void 0,u=void 0;a.length>0&&(u=a.pop(),void 0===(l=d(s,a))&&void 0!==n);)"string"==typeof u?((i={})[u]=n,n=i):n=[n];if(l){if("object"===l.type&&"string"==typeof u&&Array.isArray(l.children)){var c=d(l,[u]);if(void 0!==c){if(void 0===n){if(!c.parent)throw new Error("Malformed AST");var p=l.children.indexOf(c.parent),g=void 0,m=c.parent.offset+c.parent.length;return p>0?g=(w=l.children[p-1]).offset+w.length:(g=l.offset+1,l.children.length>1&&(m=l.children[1].offset)),h(e,{offset:g,length:m-g,content:""},r)}return h(e,{offset:c.offset,length:c.length,content:JSON.stringify(n)},r)}if(void 0===n)return[];var v=JSON.stringify(u)+": "+JSON.stringify(n),b=o?o(l.children.map((function(e){return e.children[0].value}))):l.children.length,y=void 0;return h(e,y=b>0?{offset:(w=l.children[b-1]).offset+w.length,length:0,content:","+v}:0===l.children.length?{offset:l.offset+1,length:0,content:v}:{offset:l.offset+1,length:0,content:v+","},r)}if("array"===l.type&&"number"==typeof u&&Array.isArray(l.children)){if(-1===u)return v=""+JSON.stringify(n),y=void 0,h(e,y=0===l.children.length?{offset:l.offset+1,length:0,content:v}:{offset:(w=l.children[l.children.length-1]).offset+w.length,length:0,content:","+v},r);if(void 0===n&&l.children.length>=0){var C=u,k=l.children[C];if(y=void 0,1===l.children.length)y={offset:l.offset+1,length:l.length-2,content:""};else if(l.children.length-1===C){var w,S=(w=l.children[C-1]).offset+w.length;y={offset:S,length:l.offset+l.length-2-S,content:""}}else y={offset:k.offset,length:l.children[C+1].offset-k.offset,content:""};return h(e,y,r)}throw new Error("Array modification not supported yet")}throw new Error("Can not add "+("number"!=typeof u?"index":"property")+" to parent of type "+l.type)}if(void 0===n)throw new Error("Can not delete in empty document");return h(e,{offset:s?s.offset:0,length:s?s.length:0,content:JSON.stringify(n)},r)}(e,t,n,r.formattingOptions,r.getInsertionIndex)}function j(e,t){for(var n=t.length-1;n>=0;n--)e=m(e,t[n]);return e}},800:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=t.loadMessageBundle=t.localize=t.format=t.setPseudo=t.isPseudo=t.isDefined=t.BundleFormat=t.MessageFormat=void 0;var r,o,i,a=n(926);function s(e){return void 0!==e}function l(e,n){return t.isPseudo&&(e="［"+e.replace(/[aouei]/g,"$&$&")+"］"),0===n.length?e:e.replace(/\{(\d+)\}/g,(function(e,t){var r=t[0],o=n[r],i=e;return"string"==typeof o?i=o:"number"!=typeof o&&"boolean"!=typeof o&&null!=o||(i=String(o)),i}))}(i=t.MessageFormat||(t.MessageFormat={})).file="file",i.bundle="bundle",i.both="both",(o=t.BundleFormat||(t.BundleFormat={})).standalone="standalone",o.languagePack="languagePack",function(e){e.is=function(e){var t=e;return t&&s(t.key)&&s(t.comment)}}(r||(r={})),t.isDefined=s,t.isPseudo=!1,t.setPseudo=function(e){t.isPseudo=e},t.format=l,t.localize=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];return l(t,n)},t.loadMessageBundle=function(e){return a.default().loadMessageBundle(e)},t.config=function(e){return a.default().config(e)}},926:(e,t)=>{var n;function r(){if(void 0===n)throw new Error("No runtime abstraction layer installed");return n}Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.install=function(e){if(void 0===e)throw new Error("No runtime abstraction layer provided");n=e}}(r||(r={})),t.default=r},472:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=t.loadMessageBundle=void 0;var r=n(622),o=n(747),i=n(926),a=n(800),s=n(800);Object.defineProperty(t,"MessageFormat",{enumerable:!0,get:function(){return s.MessageFormat}}),Object.defineProperty(t,"BundleFormat",{enumerable:!0,get:function(){return s.BundleFormat}});var l,u,c=Object.prototype.toString;function f(e){return"[object Number]"===c.call(e)}function d(e){return"[object String]"===c.call(e)}function p(e){return JSON.parse(o.readFileSync(e,"utf8"))}function g(e){return function(t,n){for(var r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];return f(t)?t>=e.length?void console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: "+new Error("").stack):a.format(e[t],r):d(n)?(console.warn("Message "+n+" didn't get externalized correctly."),a.format(n,r)):void console.error("Broken localize call found. Stacktrace is\n: "+new Error("").stack)}}function h(e,t){return l[e]=t,t}function m(e){try{return function(e){var t=p(r.join(e,"nls.metadata.json")),n=Object.create(null);for(var o in t){var i=t[o];n[o]=i.messages}return n}(e)}catch(e){return void console.log("Generating default bundle from meta data failed.",e)}}function v(e,t){var n;if(!0===u.languagePackSupport&&void 0!==u.cacheRoot&&void 0!==u.languagePackId&&void 0!==u.translationsConfigFile&&void 0!==u.translationsConfig)try{n=function(e,t){var n,i,a,s=r.join(u.cacheRoot,e.id+"-"+e.hash+".json"),l=!1,c=!1;try{return n=JSON.parse(o.readFileSync(s,{encoding:"utf8",flag:"r"})),i=s,a=new Date,o.utimes(i,a,a,(function(){})),n}catch(e){if("ENOENT"===e.code)c=!0;else{if(!(e instanceof SyntaxError))throw e;console.log("Syntax error parsing message bundle: "+e.message+"."),o.unlink(s,(function(e){e&&console.error("Deleting corrupted bundle "+s+" failed.")})),l=!0}}if(!(n=function(e,t){var n=u.translationsConfig[e.id];if(n){var o=p(n).contents,i=p(r.join(t,"nls.metadata.json")),a=Object.create(null);for(var s in i){var l=i[s],c=o[e.outDir+"/"+s];if(c){for(var f=[],g=0;g<l.keys.length;g++){var h=l.keys[g],m=c[d(h)?h:h.key];void 0===m&&(m=l.messages[g]),f.push(m)}a[s]=f}else a[s]=l.messages}return a}}(e,t))||l)return n;if(c)try{o.writeFileSync(s,JSON.stringify(n),{encoding:"utf8",flag:"wx"})}catch(e){if("EEXIST"===e.code)return n;throw e}return n}(e,t)}catch(e){console.log("Load or create bundle failed ",e)}if(!n){if(u.languagePackSupport)return m(t);var i=function(e){for(var t=u.language;t;){var n=r.join(e,"nls.bundle."+t+".json");if(o.existsSync(n))return n;var i=t.lastIndexOf("-");t=i>0?t.substring(0,i):void 0}if(void 0===t&&(n=r.join(e,"nls.bundle.json"),o.existsSync(n)))return n}(t);if(i)try{return p(i)}catch(e){console.log("Loading in the box message bundle failed.",e)}n=m(t)}return n}function b(e){if(!e)return a.localize;var t=r.extname(e);if(t&&(e=e.substr(0,e.length-t.length)),u.messageFormat===a.MessageFormat.both||u.messageFormat===a.MessageFormat.bundle){var n=function(e){for(var t,n=r.dirname(e);t=r.join(n,"nls.metadata.header.json"),!o.existsSync(t);){var i=r.dirname(n);if(i===n){t=void 0;break}n=i}return t}(e);if(n){var i=r.dirname(n),s=l[i];if(void 0===s)try{var c=JSON.parse(o.readFileSync(n,"utf8"));try{var f=v(c,i);s=h(i,f?{header:c,nlsBundle:f}:null)}catch(e){console.error("Failed to load nls bundle",e),s=h(i,null)}}catch(e){console.error("Failed to read header file",e),s=h(i,null)}if(s){var d=e.substr(i.length+1).replace(/\\/g,"/"),m=s.nlsBundle[d];return void 0===m?(console.error("Messages for file "+e+" not found. See console for details."),function(){return"Messages not found."}):g(m)}}}if(u.messageFormat===a.MessageFormat.both||u.messageFormat===a.MessageFormat.file)try{var b=p(function(e){var t;if(u.cacheLanguageResolution&&t)t=t;else{if(a.isPseudo||!u.language)t=".nls.json";else for(var n=u.language;n;){var r=".nls."+n+".json";if(o.existsSync(e+r)){t=r;break}var i=n.lastIndexOf("-");i>0?n=n.substring(0,i):(t=".nls.json",n=null)}u.cacheLanguageResolution&&(t=t)}return e+t}(e));return Array.isArray(b)?g(b):a.isDefined(b.messages)&&a.isDefined(b.keys)?g(b.messages):(console.error("String bundle '"+e+"' uses an unsupported format."),function(){return"File bundle has unsupported format. See console for details"})}catch(e){"ENOENT"!==e.code&&console.error("Failed to load single file bundle",e)}return console.error("Failed to load message bundle for file "+e),function(){return"Failed to load message bundle. See console for details."}}function y(e){return e&&(d(e.locale)&&(u.locale=e.locale.toLowerCase(),u.language=u.locale,l=Object.create(null)),void 0!==e.messageFormat&&(u.messageFormat=e.messageFormat),e.bundleFormat===a.BundleFormat.standalone&&!0===u.languagePackSupport&&(u.languagePackSupport=!1)),a.setPseudo("pseudo"===u.locale),b}!function(){if(u={locale:void 0,language:void 0,languagePackSupport:!1,cacheLanguageResolution:!0,messageFormat:a.MessageFormat.bundle},d(process.env.VSCODE_NLS_CONFIG))try{var e=JSON.parse(process.env.VSCODE_NLS_CONFIG),t=void 0;if(e.availableLanguages){var n=e.availableLanguages["*"];d(n)&&(t=n)}if(d(e.locale)&&(u.locale=e.locale.toLowerCase()),void 0===t?u.language=u.locale:"en"!==t&&(u.language=t),function(e){return!0===e||!1===e}(e._languagePackSupport)&&(u.languagePackSupport=e._languagePackSupport),d(e._cacheRoot)&&(u.cacheRoot=e._cacheRoot),d(e._languagePackId)&&(u.languagePackId=e._languagePackId),d(e._translationsConfigFile)){u.translationsConfigFile=e._translationsConfigFile;try{u.translationsConfig=p(u.translationsConfigFile)}catch(t){if(e._corruptedFile){var i=r.dirname(e._corruptedFile);o.exists(i,(function(t){t&&o.writeFile(e._corruptedFile,"corrupted","utf8",(function(e){console.error(e)}))}))}}}}catch(e){}a.setPseudo("pseudo"===u.locale),l=Object.create(null)}(),t.loadMessageBundle=b,t.config=y,i.default.install(Object.freeze({loadMessageBundle:b,config:y}))},73:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.provideWorkspaceTrustExtensionProposals=t.provideInstalledExtensionProposals=void 0;const r=n(549),o=n(472).loadMessageBundle(n(622).join(__dirname,"extensionsProposals.ts"));t.provideInstalledExtensionProposals=function(e,t,n,i){if(Array.isArray(e)){const a=(i?r.extensions.all:r.extensions.all.filter((e=>!(e.id.startsWith("vscode.")||"Microsoft.vscode-markdown"===e.id)))).filter((t=>-1===e.indexOf(t.id)));if(a.length)return a.map((e=>{const o=new r.CompletionItem(e.id),i=`"${e.id}"${t}`;return o.kind=r.CompletionItemKind.Value,o.insertText=i,o.range=n,o.filterText=i,o}));{const e=new r.CompletionItem(o(0,null));return e.insertText='"vscode.csharp"',e.kind=r.CompletionItemKind.Value,e.range=n,[e]}}},t.provideWorkspaceTrustExtensionProposals=function(e,t){if(Array.isArray(e)){const n=r.extensions.all.filter((e=>e.packageJSON.main)).filter((t=>-1===e.indexOf(t.id)));if(n.length)return n.map((e=>{const n=new r.CompletionItem(e.id),o=`"${e.id}": {\n\t"supported": false,\n\t"version": "${e.packageJSON.version}"\n}`;return n.kind=r.CompletionItemKind.Value,n.insertText=o,n.range=t,n.filterText=o,n}));{const e=new r.CompletionItem(o(1,null));return e.insertText='"vscode.csharp: {\n\t"supported": false,\n\t"version": "0.0.0"\n}`;"',e.kind=r.CompletionItemKind.Value,e.range=t,[e]}}}},229:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SettingsDocument=void 0;const r=n(549),o=n(516),i=n(472),a=n(73),s=i.loadMessageBundle(n(622).join(__dirname,"settingsDocumentHelper.ts")),l=/\[([^\[\]]*)\]/g;t.SettingsDocument=class{constructor(e){this.document=e}provideCompletionItems(e,t){const n=(0,o.getLocation)(this.document.getText(),this.document.offsetAt(e)),i=this.document.getWordRangeAtPosition(e)||new r.Range(e,e);if("window.title"===n.path[0])return this.provideWindowTitleCompletionItems(n,i);if("files.associations"===n.path[0])return this.provideFilesAssociationsCompletionItems(n,i);if("files.exclude"===n.path[0]||"search.exclude"===n.path[0])return this.provideExcludeCompletionItems(n,i);if("files.defaultLanguage"===n.path[0])return this.provideLanguageCompletionItems(n,i).then((e=>[this.newSimpleCompletionItem(JSON.stringify("${activeEditorLanguage}"),i,s(0,null)),...e]));if("settingsSync.ignoredExtensions"===n.path[0]){let e=[];try{e=(0,o.parse)(this.document.getText())["settingsSync.ignoredExtensions"]}catch(e){}return(0,a.provideInstalledExtensionProposals)(e,"",i,!0)}if("remote.extensionKind"===n.path[0]&&2===n.path.length&&n.isAtPropertyKey){let e=[];try{e=Object.keys((0,o.parse)(this.document.getText())["remote.extensionKind"])}catch(e){}return(0,a.provideInstalledExtensionProposals)(e,': [\n\t"ui"\n]',i,!0)}return"remote.portsAttributes"===n.path[0]&&2===n.path.length&&n.isAtPropertyKey?this.providePortsAttributesCompletionItem(i):this.provideLanguageOverridesCompletionItems(n,e)}provideWindowTitleCompletionItems(e,t){const n=[];return n.push(this.newSimpleCompletionItem("${activeEditorShort}",t,s(1,null))),n.push(this.newSimpleCompletionItem("${activeEditorMedium}",t,s(2,null))),n.push(this.newSimpleCompletionItem("${activeEditorLong}",t,s(3,null))),n.push(this.newSimpleCompletionItem("${activeFolderShort}",t,s(4,null))),n.push(this.newSimpleCompletionItem("${activeFolderMedium}",t,s(5,null))),n.push(this.newSimpleCompletionItem("${activeFolderLong}",t,s(6,null))),n.push(this.newSimpleCompletionItem("${rootName}",t,s(7,null))),n.push(this.newSimpleCompletionItem("${rootPath}",t,s(8,null))),n.push(this.newSimpleCompletionItem("${folderName}",t,s(9,null))),n.push(this.newSimpleCompletionItem("${folderPath}",t,s(10,null))),n.push(this.newSimpleCompletionItem("${appName}",t,s(11,null))),n.push(this.newSimpleCompletionItem("${remoteName}",t,s(12,null))),n.push(this.newSimpleCompletionItem("${dirty}",t,s(13,null))),n.push(this.newSimpleCompletionItem("${separator}",t,s(14,null))),Promise.resolve(n)}provideFilesAssociationsCompletionItems(e,t){const n=[];if(2===e.path.length){if(e.isAtPropertyKey&&""!==e.path[1])return this.provideLanguageCompletionItemsForLanguageOverrides(e,t);n.push(this.newSnippetCompletionItem({label:s(15,null),documentation:s(16,null),snippet:e.isAtPropertyKey?'"*.${1:extension}": "${2:language}"':'{ "*.${1:extension}": "${2:language}" }',range:t})),n.push(this.newSnippetCompletionItem({label:s(17,null),documentation:s(18,null),snippet:e.isAtPropertyKey?'"/${1:path to file}/*.${2:extension}": "${3:language}"':'{ "/${1:path to file}/*.${2:extension}": "${3:language}" }',range:t}))}return Promise.resolve(n)}provideExcludeCompletionItems(e,t){const n=[];return 1===e.path.length?(n.push(this.newSnippetCompletionItem({label:s(19,null),documentation:s(20,null),snippet:e.isAtPropertyKey?'"**/*.${1:extension}": true':'{ "**/*.${1:extension}": true }',range:t})),n.push(this.newSnippetCompletionItem({label:s(21,null),documentation:s(22,null),snippet:e.isAtPropertyKey?'"**/*.{ext1,ext2,ext3}": true':'{ "**/*.{ext1,ext2,ext3}": true }',range:t})),n.push(this.newSnippetCompletionItem({label:s(23,null),documentation:s(24,null),snippet:e.isAtPropertyKey?'"**/*.${1:source-extension}": { "when": "$(basename).${2:target-extension}" }':'{ "**/*.${1:source-extension}": { "when": "$(basename).${2:target-extension}" } }',range:t})),n.push(this.newSnippetCompletionItem({label:s(25,null),documentation:s(26,null),snippet:e.isAtPropertyKey?'"${1:name}": true':'{ "${1:name}": true }',range:t})),n.push(this.newSnippetCompletionItem({label:s(27,null),documentation:s(28,null),snippet:e.isAtPropertyKey?'"{folder1,folder2,folder3}": true':'{ "{folder1,folder2,folder3}": true }',range:t})),n.push(this.newSnippetCompletionItem({label:s(29,null),documentation:s(30,null),snippet:e.isAtPropertyKey?'"**/${1:name}": true':'{ "**/${1:name}": true }',range:t}))):(n.push(this.newSimpleCompletionItem("false",t,s(31,null))),n.push(this.newSimpleCompletionItem("true",t,s(32,null))),n.push(this.newSnippetCompletionItem({label:s(33,null),documentation:s(34,null),snippet:'{ "when": "$(basename).${1:extension}" }',range:t}))),Promise.resolve(n)}provideLanguageCompletionItems(e,t,n=(e=>JSON.stringify(e))){return r.languages.getLanguages().then((e=>e.map((e=>this.newSimpleCompletionItem(n(e),t)))))}async provideLanguageCompletionItemsForLanguageOverrides(e,t){const n=await r.languages.getLanguages(),o=[];for(const e of n){const n=new r.CompletionItem(JSON.stringify(e));n.kind=r.CompletionItemKind.Property,n.range=t,o.push(n)}return o}async provideLanguageOverridesCompletionItems(e,t){if(1===e.path.length&&e.previousNode&&"string"==typeof e.previousNode.value&&e.previousNode.value.startsWith("[")){const n=this.document.positionAt(e.previousNode.offset+1),o=n.translate(void 0,e.previousNode.value.length),i=[],a=[];let s,u=l.exec(e.previousNode.value);for(;u?.length;)s=new r.Range(this.document.positionAt(e.previousNode.offset+1+u.index),this.document.positionAt(e.previousNode.offset+1+u.index+u[0].length)),a.push(s),s.contains(t)||i.push(u[1].trim()),u=l.exec(e.previousNode.value);const c=s?s.end:n;c.isBefore(o)&&a.push(new r.Range(c,o));const f=a.find((e=>e.contains(t)));if(f&&!f.isEqual(a[0])){const e=await r.languages.getLanguages(),t=[];for(const n of e)if(!i.includes(n)){const e=new r.CompletionItem(`[${n}]`);e.kind=r.CompletionItemKind.Property,e.range=f,t.push(e)}return t}}return[]}providePortsAttributesCompletionItem(e){return[this.newSnippetCompletionItem({label:'"3000"',documentation:"Single Port Attribute",range:e,snippet:'\n  "${1:3000}": {\n    "label": "${2:Application}",\n    "onAutoForward": "${3:openPreview}"\n  }\n'}),this.newSnippetCompletionItem({label:'"5000-6000"',documentation:"Ranged Port Attribute",range:e,snippet:'\n  "${1:40000-55000}": {\n    "onAutoForward": "${2:ignore}"\n  }\n'}),this.newSnippetCompletionItem({label:'".+\\\\/server.js"',documentation:"Command Match Port Attribute",range:e,snippet:'\n  "${1:.+\\\\/server.js}": {\n    "label": "${2:Application}",\n    "onAutoForward": "${3:openPreview}"\n  }\n'})]}newSimpleCompletionItem(e,t,n,o){const i=new r.CompletionItem(e);return i.kind=r.CompletionItemKind.Value,i.detail=n,i.insertText=o||e,i.range=t,i}newSnippetCompletionItem(e){const t=new r.CompletionItem(e.label);return t.kind=r.CompletionItemKind.Value,t.documentation=e.documentation,t.insertText=new r.SnippetString(e.snippet),t.range=e.range,t}}},747:e=>{e.exports=require("fs")},622:e=>{e.exports=require("path")},549:e=>{e.exports=require("vscode")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.activate=void 0;const t=n(516),o=n(549),i=n(472),a=n(229),s=n(73),l=i.loadMessageBundle(n(622).join(__dirname,"configurationEditingMain.ts"));function u(e){return o.languages.registerCompletionItemProvider({language:"jsonc",pattern:e},{provideCompletionItems(e,n,r){const i=(0,t.getLocation)(e.getText(),e.offsetAt(n));if(!i.isAtPropertyKey&&i.previousNode&&"string"===i.previousNode.type){const t=e.lineAt(n.line).text.indexOf("$"),r=t>=0?new o.Position(n.line,t):n;return[{label:"workspaceFolder",detail:l(0,null)},{label:"workspaceFolderBasename",detail:l(1,null)},{label:"relativeFile",detail:l(2,null)},{label:"relativeFileDirname",detail:l(3,null)},{label:"file",detail:l(4,null)},{label:"cwd",detail:l(5,null)},{label:"lineNumber",detail:l(6,null)},{label:"selectedText",detail:l(7,null)},{label:"fileDirname",detail:l(8,null)},{label:"fileExtname",detail:l(9,null)},{label:"fileBasename",detail:l(10,null)},{label:"fileBasenameNoExtension",detail:l(11,null)},{label:"defaultBuildTask",detail:l(12,null)},{label:"pathSeparator",detail:l(13,null)}].map((e=>({label:"${"+e.label+"}",range:new o.Range(r,n),detail:e.detail})))}return[]}})}e.activate=function(e){e.subscriptions.push(o.languages.registerCompletionItemProvider({language:"jsonc",pattern:"**/settings.json"},{provideCompletionItems:(e,t,n)=>new a.SettingsDocument(e).provideCompletionItems(t,n)})),e.subscriptions.push(o.languages.registerCompletionItemProvider({pattern:"**/extensions.json"},{provideCompletionItems(e,n,r){const i=(0,t.getLocation)(e.getText(),e.offsetAt(n)),a=e.getWordRangeAtPosition(n)||new o.Range(n,n);if("recommendations"===i.path[0]){const n=(0,t.parse)(e.getText());return(0,s.provideInstalledExtensionProposals)(n&&n.recommendations||[],"",a,!1)}return[]}}),o.languages.registerCompletionItemProvider({pattern:"**/*.code-workspace"},{provideCompletionItems(e,n,r){const i=(0,t.getLocation)(e.getText(),e.offsetAt(n)),a=e.getWordRangeAtPosition(n)||new o.Range(n,n);if("extensions"===i.path[0]&&"recommendations"===i.path[1]){const n=(0,t.parse)(e.getText()).extensions;return(0,s.provideInstalledExtensionProposals)(n&&n.recommendations||[],"",a,!1)}return[]}})),e.subscriptions.push(u("**/launch.json")),e.subscriptions.push(u("**/tasks.json")),e.subscriptions.push(function(){const e=new Map([[{language:"jsonc",pattern:"**/keybindings.json"},[["*","when"]]],[{language:"json",pattern:"**/package.json"},[["contributes","menus","*","*","when"],["contributes","views","*","*","when"],["contributes","viewsWelcome","*","when"],["contributes","keybindings","*","when"],["contributes","keybindings","when"]]]]);return o.languages.registerCompletionItemProvider([...e.keys()],{async provideCompletionItems(n,r,i){const a=(0,t.getLocation)(n.getText(),n.offsetAt(r));if(a.isAtPropertyKey)return;let s=!1;for(const[t,r]of e)if(o.languages.match(t,n)&&r.some(a.matches.bind(a))){s=!0;break}if(!s)return;const l=n.getWordRangeAtPosition(r);if(!l||l.start.isEqual(r)||l.end.isEqual(r))return;let u;if(u=l.end.character-l.start.character==2||n.getWordRangeAtPosition(r,/\s+/)?new o.Range(r,r):n.getWordRangeAtPosition(r,/[a-zA-Z.]+/),!u)return;const c=u.with(void 0,r),f=await o.commands.executeCommand("getContextKeyInfo");if(i.isCancellationRequested||!f)return;const d=new o.CompletionList;for(const e of f){const t=new o.CompletionItem(e.key,o.CompletionItemKind.Constant);t.detail=e.type,t.range={replacing:u,inserting:c},t.documentation=e.description,d.items.push(t)}return d}})}())},o.languages.registerDocumentSymbolProvider({pattern:"**/launch.json",language:"jsonc"},{provideDocumentSymbols(e,n){const r=[];let i="",a="",s=0,l=0;return(0,t.visit)(e.getText(),{onObjectProperty:(e,t,n)=>{a=e},onLiteralValue:(e,t,n)=>{"name"===a&&(i=e)},onObjectBegin:(e,t)=>{l++,2===l&&(s=e)},onObjectEnd:(t,n)=>{i&&2===l&&r.push(new o.SymbolInformation(i,o.SymbolKind.Object,new o.Range(e.positionAt(s),e.positionAt(t)))),l--}}),r}},{label:"Launch Targets"})})();var o=exports;for(var i in r)o[i]=r[i];r.__esModule&&Object.defineProperty(o,"__esModule",{value:!0})})();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/8dfae7a5cd50421d10cd99cb873990460525a898/extensions/configuration-editing/dist/configurationEditingMain.js.map