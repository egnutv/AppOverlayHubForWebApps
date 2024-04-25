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
        let adressLang;
        try {
            adressLang = await this.adress.get(0); adressLang = adressLang.toLowerCase();
        } catch (error) {
            adressLang = "NoLang"
        }
        
        //await this.adressBuilder(standardValues, defaultValue, position);
        if (supportedLangs.includes(adressLang)) {
        } else {
            console.log("Sprache wird versucht zu setzen.");
            let standardLang = valueOfDefaults.default["lang"]; standardLang = standardLang[0]; standardLang = standardLang.toUpperCase();
            try {
                await this.adress.overwrite(0, standardLang);
            } catch (error) {
                await this.adress.set(standardLang);
            }
        }

        let supportedSites = await this.site.getIndex();
        let adressSite;
    

        try {
            adressSite = await this.adress.get(1);
        } catch (error) {
            adressSite = "NoSite";
        }

        console.log(adressSite);

        supportedSites = supportedSites["index"];
        console.log(supportedSites);
        supportedSites = Object.keys(supportedSites);
        console.log(supportedSites);

        if ((supportedSites.map(element => element.toUpperCase())).includes(adressSite.toUpperCase())) {
            
        } else {
            let standardSite = valueOfDefaults.default["site"]; 
            console.log(standardSite);
            standardSite = standardSite[0]; 
            console.log(standardSite);
            try {
                await this.adress.overwrite(1, standardSite);
                console.log("Sprache Anweisung 2 wurde erfolgreich überwunden!");
            } catch (error) {
                await this.adress.set(standardSite);
                console.log("Sprache Anweisung 3 wurde erfolgreich überwunden!");
            }
            indexEntry = standardSite;
        }


        await this.site.getSet(indexEntry, destination);
        console.log("TEST site");
        await this.text.getSet(indexEntry);
        console.log("TEST text");
        //try {
            await this.laterAdd.getSet(indexEntry);
        //} catch (error) {
        //}


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