import { SiteLoadInit } from "../initializations/loading/SiteLoadInit.js";
//import { SiteOnLoadInit } from "../initializations/loading/SiteOnLoadInit.js";
//import { selectDomElement } from "../utils/selectDomElement.js";
const siteLoader = new SiteLoadInit;
function siteLoad(indexEntry) {
    siteLoader.init(indexEntry, "content_holder")
}
export { siteLoad }


// Kommentar: Events soll später teilweise, zumindest was das Auslösen angeht, hier erstzt weden.

/*
const content = selectDomElement(".content");
const events = new Events; const siteOnLoad = new SiteLoadInit;

document.addEventListener("DOMContentLoaded", function() {
    events.createFontSize();
    
    siteOnLoad.init("start", "content_holder")
    //initSite();
    //AutoZIndex();
    //site.init();
    events.trigger();
    //textCopyPaste(".start", "");

});

window.addEventListener('resize', events.createFontSize());
/*
async function triggerEvents() {
    let interval = 500;
    //await removeFocusEvent();
    addTransition();
    ActiveEvent();
}*/