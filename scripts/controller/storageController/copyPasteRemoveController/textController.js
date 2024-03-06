import { GetSetRemoveTemplateHelper } from "../../../helper/storageHelper/GetSetRemoveTemplateHelper.js";
import { selectDomElement } from "../../../utils/selectDomElement.js";

async function textCopyPaste(area, file) {
    const language = new GetSetRemoveTemplateHelper;
    //let area = "body"
    //let file = ".moreOptions";
    if (file === "") {
        file = area;
    }
    //lang wird aus verschiedenen Quellen gelesen: 1x aus head. 1x aus der main.js
    // example: try textCopyPaste("area", LANGfilename)

    let supportedLang = await language.getTemplate("data/configs/main.json", "default/lang-support");
    let docLang = document.getElementsByTagName("html")[0].getAttribute("lang");
    let defaultLang = await language.getTemplate("data/configs/main.json", "default/lang");

    defaultLang = defaultLang.toString();
    let findSupportedLang = supportedLang.find(lang => lang === docLang);

    let lang;
    if (findSupportedLang !== docLang){
        console.error("Not supported lang. We use the default.");
        lang = defaultLang;
    } else {
        
        lang = docLang;
    }

    
    console.warn("We set: " + lang);

    if (docLang !== lang) {
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


    for (let i = 0; i < destinations.length; i++) {
        let aDestination = destinations[i];
        let textEntry = aDestination.className;
        textEntry = textEntry.replace(startMarker, '');
        textEntry = textEntry.replace(endMarker, '')
        
        let middleMarker = textEntry.indexOf(":");
        let valueOfText;
    
        if (middleMarker !== -1){
            textEntry = textEntry.replace(':', '/');
            try {
                valueOfText = await text.getTemplate("data/packs/texts/" + lang + "/config.json", textEntry);
            } catch (error) {
                valueOfText = await text.getTemplate("data/packs/texts/" + defaultLang + "/config.json", textEntry);
            }
            
        } else {

            try {
                file = file.replace('.', '');
            } catch (error) {}
            try {
                file = file.replace('#', '');
            } catch (error) {}
            try {
                valueOfText = await text.getTemplate("data/packs/texts/"  + lang + "/specific/" + file + ".json", textEntry);
            } catch (error) {
                valueOfText = await text.getTemplate("data/packs/texts/"  + defaultLang + "/specific/" + file + ".json", textEntry);
            }
        }
        console.log(textEntry);
            if (aDestination.nodeName === "INPUT"){
                aDestination.value = valueOfText;
            } else {
                aDestination.innerHTML = valueOfText;
            }
            
            
        
    }
    

}

export { textCopyPaste };
