import { GetSetRemoveUrlHelper } from "../../helper/parameterHelper/GetSetRemoveUrlHelper.js";
import { GetSetRemoveTemplateHelper } from "../../helper/storageHelper/GetSetRemoveTemplateHelper.js";
import { selectDomElement } from "../../utils/selectDomElement.js";
import { siteCopyPaste } from "../storageController/copyPasteRemoveController/siteController.js";
import { textCopyPaste } from "../storageController/copyPasteRemoveController/textController.js";

async function initSite() {
    const adress = new GetSetRemoveUrlHelper;
    const defaults = new GetSetRemoveTemplateHelper();

    let site = await adress.getUrl("site");
    let lang = await adress.getUrl("lang");
    let language = await defaults.getTemplate("data/configs/main.json", "default/lang");
    let landing = await defaults.getTemplate("data/configs/main.json", "default/site")


    if (lang == null) {
        
        console.log("Die Sprache: " + language);
        await adress.setUrl("lang", language);
        lang = await adress.getUrl("lang");
    }
    if (site == null) {
        
        await adress.setUrl("site", landing);
        site = await adress.getUrl("site");
    }


    await siteCopyPaste(site, ".content_holder");
    
    await textCopyPaste("." + site, "");

        try {
            let CLOSEDbutton = await selectDomElement(".++_$_interaction:close_$_++");
            CLOSEDbutton.setAttribute('onclick', 'createNewSite(\'' + ".content_holder" + '\', \'' + "." + site + '\', \'' + "." + landing + '\', \'' + "up" + '\', \'' + "setNewURL" + '\', false)');
            
        } catch (error) {
            
        }
        

        triggerEvents();


    
}

export { initSite };