import { siteCopyPaste } from "../storageController/copyPasteRemoveController/siteController.js";
import { textCopyPaste } from "../storageController/copyPasteRemoveController/textController.js";
import { slide } from "../../animations/transitions/slides/slide.js";
import { GetSetRemoveTemplateHelper } from "../../helper/storageHelper/GetSetRemoveTemplateHelper.js";
import { selectDomElement } from "../../utils/selectDomElement.js";

async function createNewSite(/*destination, from, to, direction, callback*/) {
    let destination = "body";
    let from = ".container2";
    let to = ".imprintAndPrivacyPolicy"; 
    let direction = "up";
    let callback = true;
    await siteCopyPaste(to, destination, "true");
    await textCopyPaste(to, "");
    await slide(from, to, direction);
    
    const remove = new GetSetRemoveTemplateHelper;

    console.log(" Ausgewählte From: " + from);
    

    //++_$_text_$_++
   

    setTimeout( async function() {
        if (callback === true) {
            try {
                let toElement = await selectDomElement(to);
                let childElment = toElement.querySelector('.++_$_close_$_++');
                console.log(childElment + " ist das Kind von " + toElement);
            } catch (error) {
                
            }
            
        } else {
            await remove.remove(from);
        }
    }, 750)
    triggerEvents();
}
export { createNewSite };
