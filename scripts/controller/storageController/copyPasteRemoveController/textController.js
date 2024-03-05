import { GetSetRemoveTemplateHelper } from "../../../helper/storageHelper/GetSetRemoveTemplateHelper.js";
import { selectDomElement } from "../../../utils/selectDomElement.js";

async function textCopyPaste() {
    const language = new GetSetRemoveTemplateHelper;

    const usedLang = "EN";
    //^^^^^^^^^^^^^^^^^^^^ - Dieser Wert soll aus Cookie gelesen werden
    const area = ".x"
    //^^^^^^^^^^^^^^^^^^^^ - Dieser Wert wird aus dem HTML gelesen werden

    let supportedLang = await language.getTemplate("data/configs/main.json", "default/lang-support");
    let defaultLang = await language.getTemplate("data/configs/main.json", "default/lang");

    defaultLang = defaultLang.toString();
    let findSupportedLang = supportedLang.find(lang => lang === usedLang);

    let lang;
    if (findSupportedLang !== usedLang){
        console.error("Not supported lang. We use the default.");
        lang = defaultLang;
    } else {
        
        lang = usedLang;
    }

    
    console.warn("We set: " + lang);

    let docLang = document.getElementsByTagName("html")[0].getAttribute("lang");
    if (docLang !== usedLang) {
        console.error("Not supported lang in header. We replace that.");

        lang = lang.toLowerCase();

        document.documentElement.lang = lang;
    }

    const text = new GetSetRemoveTemplateHelper;

    let aArea = await selectDomElement(area);
    let selectAll = Array.from(aArea.querySelectorAll('*'));


    console.log("Die Elemente: " + selectAll);
    let destinations = [];
    const startMarker = "++_$_";
    const endMarker = "_$_++";

    for (let i = 0; i < selectAll.length; i++) {
        let aDestination = selectAll[i];

        let getClassName = Array.from(aDestination.classList);
        if (getClassName.some(getClassName => getClassName.startsWith(startMarker) && getClassName.endsWith(endMarker))) {
            destinations.push(aDestination);
        }

    }

    console.log("Unsere Elmente sind: " + destinations + " Und die Länmge unseres Array: " + destinations.length)

    for (let i = 0; i < destinations.length; i++) {
        let aDestination = destinations[i];
        let textEntry = aDestination.className;
        textEntry = textEntry.replace(startMarker, '');
        textEntry = textEntry.replace(endMarker, '')
        
        console.log(textEntry);
        let valueOfText;
        valueOfText = await text.getTemplate("data/packs/texts/DE/config.json", "interaction/changeColor");
        let x = "x";
        
        aDestination.innerHTML = valueOfText;
    }
    
    



   /* for (let i = 0; i < selectAll.length; i++) {

    }
    //let entry = await text.getTemplate
*/

}

export { textCopyPaste };
