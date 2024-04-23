import { GetSetRemoveUrlHelper } from "../../../helper/parameterHelper/GetSetRemoveUrlHelper.js";
import { DefaultsController } from "../copyPasteRemoveController/DefaultsController.js";
import { TextController } from "../copyPasteRemoveController/TextController.js";

class ApplySettingsController extends DefaultsController{
    constructor() {
        this.lang = new TextController;
        this.adress = new GetSetRemoveUrlHelper;
    }
    async init() {
        let arrayOfDefaults = await this.get();
        await setLang();
        console.log(defaultValue);
    }
    async setLang() {
        let adressLang;
        try {
            adressLang = await this.adress.get(0); adressLang = adressLang.toLowerCase();
        } catch (error) {
            adressLang = "NoLang"
        }
        let l = await this.lang.findLang(adressLang); adressLang = l;
        document.documentElement.lang = adressLang;

    }
}

export { ApplySettingsController }