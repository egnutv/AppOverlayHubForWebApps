import { ApplySettingsController } from "../../controller/storageController/applyController/ApplySettingsController.js";
import { SiteLoadInit } from "./SiteLoadInit.js";

class SiteOnLoadInit extends SiteLoadInit {
    constructor() {
        super();
        this.applySettings = new ApplySettingsController;
    }
    async init() {
        console.log("TEST MESSAGE")
        let settings;
        //try {
            settings = await this.applySettings.init();
            console.log(settings);
            let site;
            try {
                site = settings[1];
            } catch (error) {
                site = "NoSite";
            }
            console.log(site);
            await this.fade("Out", ["content_holder", "background_holder"]);
            this.builder(site , ".content_holder");
            setTimeout(async () => {
                
                await this.fade("In", ["content_holder", "background_holder"]);
                triggerEvents();
            }, 600)
    }
    
}

export { SiteOnLoadInit };
