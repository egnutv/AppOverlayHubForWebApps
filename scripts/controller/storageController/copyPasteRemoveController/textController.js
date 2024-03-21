import { GetSetRemoveTemplateHelper } from "../../../helper/storageHelper/GetSetRemoveTemplateHelper.js";
import { selectDomElement } from "../../../utils/selectDomElement.js";
import { GetSetRemoveUrlHelper } from "../../../helper/parameterHelper/GetSetRemoveUrlHelper.js";

async function textCopyPaste(area, file) {
    const language = new GetSetRemoveTemplateHelper;
    const adress = new GetSetRemoveUrlHelper;
    //let area = "body"
    //let file = ".moreOptions";
    if (file === "") {
        file = area;
    }

    let supportedLang = await language.getTemplate("data/configs/main.json", "default/lang-support");
    let adressLang = await adress.getUrl("lang");
    let docLang = document.getElementsByTagName("html")[0].getAttribute("lang");

    
    let defaultLang = await language.getTemplate("data/configs/main.json", "default/lang");
    defaultLang = defaultLang.toString();

    
    
    let langIsSuported = false;
    for (let i = 0; i < supportedLang.length; i++) {
        
        if (supportedLang[i] == adressLang.toUpperCase()){
            langIsSuported = true;
        } 
    }
    if (adressLang == null || langIsSuported === false){
        await adress.setUrl("lang", defaultLang);
        adressLang === await adress.getUrl("lang");
    }
   

    

    let lang;
    if (langIsSuported === false){
        console.error("Not supported lang. We use the default.");
        console.warn("We set: " + lang);
        lang = lang.toLowerCase();
        document.documentElement.lang = defaultLang;
        lang = defaultLang.toUpperCase();

        await adress.setUrl("lang", defaultLang);


    } else {
        console.log(adressLang.toUpperCase() + " is an supported lang")

        document.documentElement.lang = adressLang.toLowerCase();
        lang = adressLang.toUpperCase();
    }

    
    


    

    const text = new GetSetRemoveTemplateHelper;

    let aArea = await selectDomElement(area);
    let selectAll = Array.from(aArea.querySelectorAll('*'));


    let destinations = [];
const startMarker = "++_$_";
const endMarker = "_$_++";

for (let i = 0; i < selectAll.length; i++) {
    let aDestination = selectAll[i];

    let getClassNames = Array.from(aDestination.classList);
    getClassNames.forEach(className => {
        if (className.startsWith(startMarker) && className.endsWith(endMarker)) {
            destinations.push(className);
        }
    });
}

    
    
    for (let i = 0; i < destinations.length; i++) {
        
        let Destination = selectDomElement("." + destinations[i]);
        let getClassNames = Array.from(Destination.classList);
        let relevantClasses = getClassNames.filter(className => className.startsWith(startMarker) && className.endsWith(endMarker));
        relevantClasses = relevantClasses.toString();


        
        let aDestination = selectDomElement("." + relevantClasses)

        let textEntry = relevantClasses;
        textEntry = textEntry.replace(startMarker, '');
        textEntry = textEntry.replace(endMarker, '')
        
        let middleMarker = textEntry.indexOf(":");
        let valueOfText;
    
        if (middleMarker !== -1){
            textEntry = textEntry.replace(':', '/');
            try {
                valueOfText = await text.getTemplate("data/packs/texts/" + lang + "/config.json", textEntry);
            } catch (error) {
                console.error("We cant find " + lang.toUpperCase() +". We get the defaul translation.");
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
                console.error("We cant find " + lang.toUpperCase() +". We get the defaul translation.");
                valueOfText = await text.getTemplate("data/packs/texts/"  + defaultLang + "/specific/" + file + ".json", textEntry);
            }
        }
   
            if (aDestination.nodeName === "INPUT"){
                aDestination.value = valueOfText;
            } else {
                aDestination.innerHTML = valueOfText;
            }
            
            
        
    }
    

}

export { textCopyPaste };
