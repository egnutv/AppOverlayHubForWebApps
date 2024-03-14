import { GetSetRemoveTemplateHelper } from "../../../helper/storageHelper/GetSetRemoveTemplateHelper.js";
import { GetSetRemoveUrlHelper } from "../../../helper/parameterHelper/GetSetRemoveUrlHelper.js"
async function siteCopyPaste(indexEntry, destination, hidden) {
    let pasteMode;

    
    //example:
    //const indexEntry = "imprintAndPrivacyPolicy";
    //const destination = "body";
    try {
        indexEntry = indexEntry.replace('.', '');
    } catch (error) {}
    try {
        indexEntry = indexEntry.replace('#', '');
    } catch (error) {}
    
    console.log("Der Wert der des Indexes was eingegeben wurde: " + indexEntry);
    
    const index = new GetSetRemoveTemplateHelper;
    let valueOfIndex = await index.getTemplate("data/packs/templates/sites/index.json", "index/" + indexEntry);
    valueOfIndex = valueOfIndex.toString();
    //console.log("Der Wert im Index: " + valueOfIndex);
    const entry = new GetSetRemoveTemplateHelper;
    let valueOfEntry = await entry.getTemplate("data/packs/templates/sites/" + valueOfIndex,  "");
    //console.log("Der Wert des Eintrags: " + valueOfEntry);
    if (hidden === 'true') {
        pasteMode = "hiddenContainer";
    } else {
        pasteMode = "container";
    }

    entry.setTemplate(valueOfEntry, pasteMode, indexEntry, destination);
    
    
    
}

export { siteCopyPaste };