import { ApplySettingsController } from "../../controller/storageController/applyController/ApplySettingsController.js";
import { SiteLoadInit } from "./SiteLoadInit.js";

class SiteOnLoadInit extends SiteLoadInit {
    constructor() {
        super();  // Fügen Sie diese Zeile hinzu
        this.applySettings = new ApplySettingsController;
    }
    async init(/*indexEntry, destination*/) {
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
            //console.log("Ich Treffe ein: try")
        /*} catch (error) {
            console.log("Ich Treffe ein: error")*/
            //super.init(site , "content_holder");
            await this.fade("Out", ["content_holder", "background_holder"]);
            this.builder(site , ".content_holder");
            setTimeout(async () => { // Verwende Arrow Function
                
                await this.fade("In", ["content_holder", "background_holder"]);
                backgroundHolder.style.visibility = "visible";
                triggerEvents();
            }, 600);
            /*
            
        }*/
        //console.log(settings);
        //await super.init(indexEntry, destination);
    }
    
}

export { SiteOnLoadInit };
