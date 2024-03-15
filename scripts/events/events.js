import { initSite } from "../controller/loadController/initSite.js";
import { textCopyPaste } from "../controller/storageController/copyPasteRemoveController/textController.js"
import { selectDomElement } from "../utils/selectDomElement.js";
document.addEventListener("DOMContentLoaded", function() {
    
    initSite();
    //AutoZIndex();
    createFontSize();
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

function addClickClass() {
    const button = selectDomElement("button");
    const input = selectDomElement("input");


}
var stepCounter = 0;
    
/*async function createFontSize() {
    let screenWidth = screen.width;
    let screenHeight = screen.height;
    let areaSize = screenHeight + screenWidth;
    console.log(areaSize)
    let wantedLetterSize = areaSize / 100 / 10;

    let ratio;
    if (areaSize <= 921.6) {
        wantedLetterSize = 1.7;
    } else if (areaSize > 921.6 && areaSize <= 2073.6) {
        ratio = (areaSize - 921.6) / (2073.6 - 921.6);
        wantedLetterSize = 1.7 - (0.3 * ratio); // Sinkt von 1.7 auf 1.4
    } else if (areaSize > 2073.6 && areaSize <= 8294.4) {
        ratio = (areaSize - 2073.6) / (8294.4 - 2073.6);
        wantedLetterSize = 1.4 + (0.6 * ratio); // Steigt von 1.4 auf 2
    } else if (areaSize > 8294.4) {
        wantedLetterSize = 2;
    }

    // Erstelle die CSS-Regel
    const cssRule = `* { font-size: ${wantedLetterSize}rem; }`;

    // Überprüfe, ob das <style>-Element bereits existiert
    let styleTag = document.getElementById('dynamicFontSize');
    if (styleTag) {
        // Wenn das <style>-Element existiert, aktualisiere einfach seinen Inhalt
        styleTag.textContent = cssRule;
    } else {
        // Wenn das <style>-Element nicht existiert, erstelle es und füge es zum <head> hinzu
        styleTag = document.createElement('style');
        styleTag.id = 'dynamicFontSize';
        styleTag.textContent = cssRule;
        const head = document.head;
        head.insertBefore(styleTag, head.firstChild);
    }
}*/

async function createFontSize() {
    
        let standardScrennSizes = [
            800 * 600,     // 15 Zoll
            1280 * 1024,   // 17 Zoll
            1600 * 900,    // 22 Zoll
            1920 * 1080,   // 24 Zoll
            2560 * 1440,   // 27 Zoll
            3840 * 2160,   // 32 Zoll
            3440 * 1440    // 34 Zoll
        ];

        for (let i = 0; i < standardScrennSizes.length; i++) {
            let standardScreenSize = standardScrennSizes[i];
            console.log("Flächeninhalt: " + standardScreenSize)

            let standardScreenSizeValue = standardScreenSize / 100 / 100 / 10;

            console.log("standardScreenSizeValue: " + standardScreenSizeValue)

            standardScrennSizes[i] = standardScreenSizeValue;
            //standardScrennSizes[i] = standardScreenSize;
            
        }

        console.log("Der Array über die Screengröße: " +  standardScrennSizes);

        
        
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

async function removeFocusEvent() {
    let buttons = document.querySelectorAll("input[type='button']");

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            let start;
            const step = timestamp => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                if (progress > 500) {
                    this.blur();
                } else {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        });
    });
}

function delayOnClickForInputButtons() {
    let buttons = document.querySelectorAll("input[type='button']");
    buttons.forEach(function(button) {
        let oldOnClick = button.onclick;
        button.onclick = function(event) {
            setTimeout(function() {
                if (oldOnClick) oldOnClick(event);
            }, 500);
        };
    });
}





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