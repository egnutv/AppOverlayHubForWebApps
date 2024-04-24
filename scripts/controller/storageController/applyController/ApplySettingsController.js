import { GetSetRemoveUrlHelper } from "../../../helper/parameterHelper/GetSetRemoveUrlHelper.js";
import { DefaultsController } from "../copyPasteRemoveController/DefaultsController.js";
import { TextController } from "../copyPasteRemoveController/TextController.js";

class ApplySettingsController extends DefaultsController{
    constructor() {
        super();
        this.lang = new TextController;
        this.adress = new GetSetRemoveUrlHelper;
    }
    async init() {
        
        let output = [];
        //let arrayOfDefaults = await this.get();
        let value;
    
        value = await this.checkAndSetLang();
        output.push(value);
    
        value = await this.checkAndSetSite();
        output.push(value);
    
        return output;
    }
    async checkAndSetLang() {
        
        let valueOfDefaults = await this.getDefaults();
        let supportedLangs = valueOfDefaults.default["lang-support"];
        let adressLang;
        try {
            adressLang = await this.adress.get(0); adressLang = adressLang.toLowerCase();
        } catch (error) {
            adressLang = "NoLang"
        }
        console.log("Die SPrache: " + adressLang)
        //let l = await this.lang.findLang(adressLang);
        if (supportedLangs.includes(adressLang)) {
        } else {
            let standardLang = valueOfDefaults.default["lang"]; standardLang = standardLang[0]; standardLang = standardLang.toUpperCase();
            standardLang = adressLang;
            
        }
        document.documentElement.lang = adressLang;
        
        
        return adressLang;

    }
    async checkAndSetSite() {
        let adressSite;
        try {
            adressSite = await this.adress.get(1); adressSite = adressSite.toLowerCase();
        } catch (error) {
            adressSite = "NoSite";
        }
        
        return adressSite;
    }

}

export { ApplySettingsController }