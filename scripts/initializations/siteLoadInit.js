import { ScriptController } from "../controller/storageController/copyPasteRemoveController/ScriptController";
import { SiteController } from "../controller/storageController/copyPasteRemoveController/SiteController";
import { TextController } from "../controller/storageController/copyPasteRemoveController/TextController";

class siteLoadInit {
    constructor() {
        const site = new SiteController;
        const text = new TextController;
        const script = new ScriptController;
    }
}

window.siteLoadInit = siteLoadInit;