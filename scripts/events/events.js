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
}
var stepCounter = 0;
async function createFontSize() {
    let maxFontSize = 1.7;
    let minFontSize = 1.4;
    if (screen.height < screen.width) {
        maxFontSize = 1.4;
    }
    let fontSize = 1.4;
    let nextFontSize = 0.2;

    let standardScreenSize = [
        800 * 600,     // 15 Zoll
        1280 * 1024,   // 17 Zoll
        1600 * 900,    // 22 Zoll
        1920 * 1080,   // 24 Zoll
        2560 * 1440,   // 27 Zoll
        3840 * 2160,   // 32 Zoll
        3440 * 1440,    // 34 Zoll
    ];
    for (let i = 0; i < standardScreenSize.length; i++) {
        let standardScreenSizeValue = standardScreenSize[i] / 100 / 100 / 10;
        standardScreenSize[i] = standardScreenSizeValue;
    }
    standardScreenSize.sort(function (a, b) {return a - b;});
    let averageValue;
    if (standardScreenSize.length % 2 === 1) {
        averageValue = standardScreenSize[Math.floor(standardScreenSize.length / 2)];
    } else {
        let middlePart1 = standardScreenSize[standardScreenSize.length / 2 - 1];
        let middlePart2 = standardScreenSize[standardScreenSize.length / 2];
        averageValue = (middlePart1 + middlePart2) / 2;
    }
    let clientScreenSize = screen.width * screen.height;
    clientScreenSize = clientScreenSize / 100 / 100 / 10;
    let negativeValues = standardScreenSize.filter(value => value < averageValue);
    negativeValues = negativeValues.reverse();
    let positiveValues = standardScreenSize.filter(value => value > averageValue);
    let negativeIncreaseRate = negativeValues.map(value => {
        let rate = (averageValue - value) / averageValue * 100;
        return rate;
    });
    let positiveIncreaseRate = positiveValues.map(value => {
        let rate = (value - averageValue) / averageValue * 100;
        return rate;
    });
    let negativeFactors = negativeIncreaseRate.map(rate => rate / 100);
    let positiveFactors = positiveIncreaseRate.map(rate => rate / 100);
    let factors;
    let increaseRate;
    let clientIncreaseRate;
    let clientFactor;
    let negative = false;
    if (clientScreenSize === averageValue){
        clientIncreaseRate = 0;
        clientFactor = 0;
        increaseRate = [0];
        factors = [0];
    } else if (clientScreenSize > averageValue) {
        let clientSizeValue = clientScreenSize;
        let rate = (clientSizeValue - averageValue) / averageValue * 100;
        clientIncreaseRate = rate;
        clientFactor = [clientIncreaseRate].map(rate => rate / 100);
        increaseRate = positiveIncreaseRate;
        factors = positiveFactors;
    } else if (clientScreenSize < averageValue) {
        let clientSizeValue = clientScreenSize;
        let rate = (averageValue - clientSizeValue) / averageValue * 100;
        clientIncreaseRate = rate;
        clientFactor = [clientIncreaseRate].map(rate => rate / 100);
        increaseRate = negativeIncreaseRate
        factors = negativeFactors;
        negative = true;
    }
    if (factors.includes(0)) {
    } else {
        factors.unshift(0);
    }
    let fontSizes = [];
    for (let i = 0; i < factors.length; i++) {
        if (i !== 0) {
            fontSize = fontSize + nextFontSize;
        fontSize = parseFloat(fontSize.toFixed(2));
        }
        fontSizes.push(fontSize)
        
    }
    if (clientFactor === factors[0]) {
    fontSize = fontSize;
} else if (clientFactor < factors[factors.length - 1]) {
    let exist = factors.includes(clientFactor);
    if (exist) {
        let index = factors.indexOf(clientFactor);
        fontSize = fontSizes[index];
    } else {
        let index;
        for (let i = 0; i < factors.length - 1; i++) {
            if (clientFactor >= factors[i] && clientFactor < factors[i + 1]) {
                index = i;
                break;
            }
        }
        fontSize = (fontSizes[index] / factors[index + 1]) * clientFactor;
    }
} else if (clientFactor >= factors[factors.length - 1]) {
    fontSize = ((fontSizes[fontSizes.length - 1] / factors[factors.length - 1]) * clientFactor);
    }

if (negative && fontSize > maxFontSize) {
    fontSize = maxFontSize;
}

if (fontSize <= minFontSize) {
    fontSize = minFontSize;
}
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