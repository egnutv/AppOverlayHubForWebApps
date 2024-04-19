import { DefaultsController } from "../controller/storageController/copyPasteRemoveController/DefaultsController.js";
import { LaterAddController } from "../controller/storageController/copyPasteRemoveController/LaterAddController.js";
import { SiteController } from "../controller/storageController/copyPasteRemoveController/SiteController.js"
import { TextController } from "../controller/storageController/copyPasteRemoveController/TextController.js";
import { GetSetRemoveUrlHelper } from "../helper/parameterHelper/GetSetRemoveUrlHelper.js";

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
        await this.builder(indexEntry, d);
        await this.fadeIn();
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

        supportedSites = supportedSites["index"];
        console.log(supportedSites);
        supportedSites = Object.keys(supportedSites);
        console.log(supportedSites);

        //supportedSites.toUpperCase()).includes(adressSite.toUpperCase())
        if ((supportedSites.map(element => element.toUpperCase())).includes(adressSite.toUpperCase())) {
            
        } else {
            console.log("Seite wird versucht zu setzen.");
            let standardSite = valueOfDefaults.default["site"]; 
            console.log(standardSite);
            standardSite = standardSite[0];
            console.log(standardSite);
            console.log("Sprache Anweisung 1 wurde erfolgreich überwunden!");
            try {
                await this.adress.overwrite(1, standardSite);
                console.log("Sprache Anweisung 2 wurde erfolgreich überwunden!");
            } catch (error) {
                await this.adress.set(standardSite);
                console.log("Sprache Anweisung 3 wurde erfolgreich überwunden!");
            }
        }


        await this.site.getSet(indexEntry, destination);

        await this.text.getSet(indexEntry);
        try {
            await this.laterAdd.getSet(indexEntry);
        } catch (error) {
        }


    }
    
    
    async fadeIn() {
        console.log("A fadeIn was not written")
    }
}

export { SiteLoadInit }