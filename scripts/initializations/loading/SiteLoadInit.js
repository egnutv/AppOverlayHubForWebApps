import { DefaultsController } from "../../controller/storageController/copyPasteRemoveController/DefaultsController.js";
import { LaterAddController } from "../../controller/storageController/copyPasteRemoveController/LaterAddController.js";
import { SiteController } from "../../controller/storageController/copyPasteRemoveController/SiteController.js"
import { TextController } from "../../controller/storageController/copyPasteRemoveController/TextController.js";
import { GetSetRemoveUrlHelper } from "../../helper/parameterHelper/GetSetRemoveUrlHelper.js";
import { selectDomElement } from "../../utils/selectDomElement.js";

class SiteLoadInit {
    constructor() {
        
        this.adress = new GetSetRemoveUrlHelper;
        this.defaults = new DefaultsController;
        this.site = new SiteController;
        this.text = new TextController;
        this.laterAdd = new LaterAddController;
    }

    async init(indexEntry, destination) {
        let d = "." + destination;
        try {
            await this.adress.overwrite(1, indexEntry);
        } catch (error) {
            
        }
        setTimeout(async () => { // Verwende Arrow Function
            await this.fade("Out", ["content_holder"]);
            await this.destroy(d);
            await this.builder(indexEntry, d);
            await this.fade("In", ["content_holder"]);
            triggerEvents();
        }, 500);
    }
    
    async builder(indexEntry, destination) {
        /*let lang;
        try {
            lang = await this.adress.get(0);
        } catch {
            
        }*/

        let valueOfDefaults = await this.defaults.getDefaults();
        let supportedLangs = valueOfDefaults.default["lang-support"];
        let adressValue = await this.tryGetAdress(0);
        console.log(adressValue)
        let notSupportedLang = false;
        let standardLang; let adressLang;
        
        //await this.adressBuilder(standardValues, defaultValue, position);
        if (supportedLangs.includes(adressValue)) {
            console.log(adressValue);
            adressLang = adressValue;
            
        } else {
            console.log(adressValue);
            console.log("Sprache wird versucht zu setzen.");
            standardLang = valueOfDefaults.default["lang"]; standardLang = standardLang[0]; standardLang = standardLang.toUpperCase();
            console.log(standardLang);
            adressLang = standardLang;
            console.log(adressLang);
            notSupportedLang = true;
        }
        console.log(adressLang);

        let supportedSites = await this.site.getIndex();
        adressValue = await this.tryGetAdress(1);
        supportedSites = supportedSites["index"];
        supportedSites = Object.keys(supportedSites);
        let notSupportedSite = false;
        let standardSite; let adressSite;

        if ((supportedSites.map(element => element.toUpperCase())).includes(adressValue.toUpperCase())) {
            adressSite = adressValue;
        } else {
            standardSite = valueOfDefaults.default["site"]; 
            standardSite = standardSite[0];
            notSupportedSite = true;
            
            indexEntry = standardSite;
            
        }
        if (notSupportedLang === true && notSupportedSite === true) {
            console.log("Case01")
            await this.setAdress(0, standardLang + "/" + standardSite);
        } else if (notSupportedLang === true && notSupportedSite === false) {
            console.log("Case03")
            await this.setAdress(0, standardLang);
        } else if (notSupportedLang === false && notSupportedSite === true) {
            console.log("Case02")
            console.log(standardSite)
            await this.setAdress(1, standardSite);
        } 
        

        await this.site.getSet(indexEntry, destination);
        await this.text.getSet(indexEntry);
        await this.laterAdd.getSet(indexEntry);


    } async setAdress(position, value) {
        try {
            await this.adress.overwrite(position, value);
        } catch (error) {
            await this.adress.set(value);
        }

        console.log(value);
    } async tryGetAdress(position) {
        let value;
        try {
            value = await this.adress.get(position);
        } catch (error) {
            value = "undefinedValue";
        }
        console.log(value);
        return value;
    }
    
    
    async fade(mode, listOfObjects) {
        let contentHolder = await selectDomElement(".content_holder");
        let crossfade = await selectDomElement(".crossfade");
        let backgroundHolder = await selectDomElement(".background_holder");

        switch (mode) {
            case "In":
                try {
                    crossfade.classList.remove("active");

                } catch {}
                    setTimeout(async () => {
                        for (let i = 0; i < listOfObjects.length; i++) {
                            let element = listOfObjects[i];
                            let x = await selectDomElement("." + element);
                            x.style.visibility = "visible";

                            
                        }
                    }, 1);
                
                
                break;
            case "Out":
                try {
                    crossfade.classList.add("active");
                } catch {}
                
                setTimeout(async function() {
                    for (let i = 0; i < listOfObjects.length; i++) {
                        let element = listOfObjects[i];
                        let x = await selectDomElement("." + element);
                        x.style.visibility = "hidden";

                        
                    }
                    
                }, 1);
        
            default:
                break;
        }
    } 
    async destroy(destination) {
        let destroyChildsOf = await selectDomElement(destination);
        while (destroyChildsOf.lastChild) {
            destroyChildsOf.removeChild(destroyChildsOf.lastChild);
        }
    }
    
    /*async fadeOut(){
        
    }

    async #fade() {
        

        
    }*/
}

export { SiteLoadInit }