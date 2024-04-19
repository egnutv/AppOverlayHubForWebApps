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
    async builder(indexEntry) {
        /*let lang;
        try {
            lang = await this.adress.get(0);
        } catch {
            
        }*/

        let valueOfDefaults = await this.defaults.getDefaults();
        let supportedLangs = valueOfDefaults.default["lang-support"];
        let adressLang = await this.adress.get(0); adressLang = adressLang.toLowerCase();
        
        //await this.adressBuilder(standardValues, defaultValue, position);
        if (supportedLangs.includes(adressLang)) {
        } else {
            let standardLang = valueOfDefaults.default["lang"]; standardLang = standardLang[0]; standardLang = standardLang.toUpperCase();
            try {
                await adress.overwrite(0, standardLang);
            } catch (error) {
                await adress.set(standardLang);
            }
        }

        let supportedSites = await this.site.getIndex();
        let adressSite = await this.adress.get(1);

        supportedSites = supportedSites["index"];
        console.log(supportedSites);
        supportedSites = Object.keys(supportedSites);
        console.log(supportedSites);

        if (supportedSites.toUpperCase().includes(adressSite.toUpperCase())) {
        } else {
            let standardSite = valueOfDefaults.default["site"]; standardSite = standardSite[0];
            try {
                await adress.overwrite(1, standardSite);
            } catch (error) {
                await adress.set(standardSite);
            }
        }


        await this.site.getSet(indexEntry, destination);

        await this.text.getSet(indexEntry);
        try {
            await this.laterAdd.getSet(indexEntry);
        } catch (error) {
            
        }


    }
    
    /*async adressBuilder(standardValues, position) {
        
    }*/

    //Muss noch weiter gemacht werden, um Code zu sparen:
    async adressBuilder(index, defaultKey, adress) {
        let valueOfDefaults = await this.defaults.getDefaults();
        let supportedValues = valueOfDefaults.default[defaultKey];
        let adressValue = await this.adress.get(index); adressValue = adressValue.toLowerCase();
    
        if (!supportedValues.includes(adressValue)) {
            let standardValue = valueOfDefaults.default[defaultKey]; standardValue = standardValue[0]; standardValue = standardValue.toUpperCase();
            try {
                await adress.overwrite(index, standardValue);
            } catch (error) {
                await adress.set(standardValue);
            }
        }
    }
    
    // Verwendung der neuen Methode
    //await checkAndSetDefault(0, "lang-support", this.adress);
    //await checkAndSetDefault(1, "site", this.adress);
    
    async fadeIn() {

    }
}

export { siteLoadInit }