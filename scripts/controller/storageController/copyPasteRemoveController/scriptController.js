import { CopyPasteRemoveFromTemplate } from "../../../helper/storageHelper/CopyPasteDeleteFromTemplate.js";
async function scriptCopyPaste(scriptEntry, pasteAs, destination) {
    // examples:
    //const destination = "body";
    //const scriptEntry = "Script1";
    //const pasteAs = "script";
    const entry = new CopyPasteRemoveFromTemplate;
    let valueOfEntry = await entry.getTemplate("data/configs/addScripts.json", "add/" + scriptEntry);
    //console.log("Der Eintrag " + valueOfEntry);
    for (let i = 0; i < valueOfEntry.length; i++) {
        console.warn(i + " Nummer");
        let script = valueOfEntry[i].toString();
        console.log("Der gesuchte Eintrag ist der hier und ist nun ein Strang " + script);
        await entry.setTemplate(script, pasteAs, scriptEntry, destination);
    }


} 

export { scriptCopyPaste };