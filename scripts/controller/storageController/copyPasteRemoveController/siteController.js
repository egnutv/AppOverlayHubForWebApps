import { CopyPasteRemoveFromTemplate } from "../../../helper/storageHelper/CopyPasteDeleteFromTemplate.js";

async function siteCopyPaste(indexEntry, destination, hidden) {
    let pasteMode;
    //example:
    //const indexEntry = "imprintAndPrivacyPolicy";
    //const destination = "body";
    const index = new CopyPasteRemoveFromTemplate;
    let valueOfIndex = await index.copy("data/packs/templates/sites/index.json", "index/" + indexEntry);
    valueOfIndex = valueOfIndex.toString();
    //console.log("Der Wert im Index: " + valueOfIndex);
    const entry = new CopyPasteRemoveFromTemplate;
    let valueOfEntry = await entry.copy("data/packs/templates/sites/" + valueOfIndex,  "");
    //console.log("Der Wert des Eintrags: " + valueOfEntry);
    if (hidden === 'true') {
        pasteMode = "hiddenContainer";
    } else {
        pasteMode = "container";
    }

    entry.paste(valueOfEntry, pasteMode, indexEntry, destination);
    
}

export { siteCopyPaste };