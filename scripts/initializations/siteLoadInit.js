import { ScriptController } from "../controller/storageController/copyPasteRemoveController/ScriptController";
import { SiteController } from "../controller/storageController/copyPasteRemoveController/SiteController";
import { TextController } from "../controller/storageController/copyPasteRemoveController/TextController";
import { GetSetRemoveUrlHelper } from "../helper/parameterHelper/GetSetRemoveUrlHelper";

class siteLoadInit {
    constructor() {
        this.adress = new GetSetRemoveUrlHelper;
        this.site = new SiteController;
        this.text = new TextController;
        this.script = new ScriptController;
    }

    async start() {
        let adress;
        try {
            a
        }
    }
}