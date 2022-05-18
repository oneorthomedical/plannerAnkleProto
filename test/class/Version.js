export let pathToLink = null;
export let browser = null;
export let bool = false;
export let boolLang = true;
//pathToLink = `../../../3din2_gestion/`;
if (bool) pathToLink = `../../../3din2_gestion/`;
else  pathToLink = `../../../../3din2_gestion/`;
// Opera 8.0+
let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
let isFirefox = typeof InstallTrigger !== 'undefined';
// Safari 3.0+ "[object HTMLElementConstructor]"
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
// Internet Explorer 6-11
let isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
let isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
let isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
/*let isBlink = (isChrome || isOpera) && !!window.CSS;*/
if(isOpera) browser = 'opera';
else if(isFirefox) browser ='firefox';
else if(isSafari) browser ='safari';
else if(isIE) browser ='ie';
else if(isEdge) browser ='edge';
else if(isChrome) browser ='chrome';

export const heightTibia  = 9;
export const heightTalaire  = 6;
export const widthTibia  = 0;
export const epaisseur = 5;
