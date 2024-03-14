import { GetSetRemoveUrlHelper } from "../../helper/parameterHelper/GetSetRemoveUrlHelper.js";
import { GetSetRemoveTemplateHelper } from "../../helper/storageHelper/GetSetRemoveTemplateHelper.js";
import { siteCopyPaste } from "../storageController/copyPasteRemoveController/siteController.js";
import { textCopyPaste } from "../storageController/copyPasteRemoveController/textController.js";

async function initSite() {
    const adress = new GetSetRemoveUrlHelper;
    const defaults = new GetSetRemoveTemplateHelper();

    let site = await adress.getUrl("site");
    let lang = await adress.getUrl("lang");


    if (lang == null) {
        let language = await defaults.getTemplate("data/configs/main.json", "default/lang");
        console.log("Die Sprache: " + language);
        await adress.setUrl("lang", language);
        lang = await adress.getUrl("lang");
    }
    if (site == null) {
        let landing = await defaults.getTemplate("data/configs/main.json", "default/site")
        await adress.setUrl("site", landing);
        site = await adress.getUrl("site");
    }


    await siteCopyPaste(site, ".content_holder");
    
    await textCopyPaste("." + site, "");

    triggerEvents();
}

export { initSite };