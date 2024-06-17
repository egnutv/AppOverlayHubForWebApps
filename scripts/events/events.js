//import { initSite } from "../controller/loadController/initSite.js";
//import { textCopyPaste } from "../controller/storageController/copyPasteRemoveController/textController.js"
//import { SiteLoadInit } from "../initializations/loading/SiteLoadInit.js";
import { SiteOnLoadInit } from "../initializations/loading/SiteOnLoadInit.js";
import { selectDomElement } from "../utils/selectDomElement.js";
document.addEventListener("DOMContentLoaded", function() {
    createFontSize();
    const site = new SiteOnLoadInit;
    site.init("start", "content_holder")
    //initSite();
    //AutoZIndex();
    //site.init();
    triggerEvents();
    //textCopyPaste(".start", "");
});
window.addEventListener('resize', createFontSize);
async function triggerEvents() {
    let interval = 500;
    //await removeFocusEvent();
    addTransition();
    ActiveEvent();
    setInterval(interval, async function updates() {

    })

}
var stepCounter = 0;
async function createFontSize() {
    let factor = 1.05;
    let maxFontSizeIfSmallerThanStandardSize = 1.5;
    let standardSize = ((1920 * 1080) / 1000);
    let screenSize = ((screen.width * screen.height) / 1000);
    
    let fontSize = 0;

    console.log(standardSize);
    console.log(screenSize);

    if (standardSize === screenSize) {
        fontSize = factor;
    }
    if (standardSize < screenSize) {}
    console.log("standardSize is larger than screenSize");
        fontSize = (factor / standardSize) * screenSize;
    if (standardSize > screenSize) {
        fontSize = (factor + (factor - ((factor / standardSize) * screenSize)));
        if (fontSize > maxFontSizeIfSmallerThanStandardSize) {
            fontSize = maxFontSizeIfSmallerThanStandardSize;
        }
    }
    console.log(fontSize);
    const cssRule = `* { font-size: ${fontSize}rem; }`;
let styleTag = document.getElementById('dynamicFontSize');
if (styleTag) {
    styleTag.textContent = cssRule;
} else {
    styleTag = document.createElement('style');
    styleTag.id = 'dynamicFontSize';
    styleTag.textContent = cssRule;
    const head = document.head;
    head.insertBefore(styleTag, head.firstChild);
}
}
/*function AutoZIndex() {

    let body = document.querySelector("body");

    let children = body.children;

    for (let i = 0; i < children.length; i++) {

        children[i].style.zIndex = i + 1;
    }
}*/

function addTransition() {
    let buttons = document.querySelectorAll("input[type='button']");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.transition = "500ms";
    }
};

function ActiveEvent() {
    let buttons = document.querySelectorAll("input, button");

    buttons.forEach(button => {
        let events = [];
        button.addEventListener('click', function() {
            events.push('click');
            this.classList.add('click');
            setTimeout(() => {
                this.classList.remove('click');
            }, 500);
        })
        button.addEventListener('mouseover', function() {
            events.push('mouseover');
            this.classList.add('hover');
        })
        button.addEventListener('mouseout', function() {
            events = [];
            this.classList.remove('hover');
        })
    });
}

export { triggerEvents };
window.triggerEvents = triggerEvents;