import { GetSetRemoveUrlHelper } from "../../helper/parameterHelper/GetSetRemoveUrlHelper.js";
import { siteCopyPaste } from "../storageController/copyPasteRemoveController/siteController.js";
import { textCopyPaste } from "../storageController/copyPasteRemoveController/textController.js";

async function initSite() {
    const adress = new GetSetRemoveUrlHelper;

    let site = await adress.getUrl("site");

    await siteCopyPaste(site, ".content_holder");
    await textCopyPaste("." + site, "");

    triggerEvents();
}

export { initSite };