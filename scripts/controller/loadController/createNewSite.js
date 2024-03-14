import { siteCopyPaste } from "../storageController/copyPasteRemoveController/siteController.js";
import { textCopyPaste } from "../storageController/copyPasteRemoveController/textController.js";
import { slide } from "../../animations/transitions/slides/slide.js";
import { GetSetRemoveTemplateHelper } from "../../helper/storageHelper/GetSetRemoveTemplateHelper.js";
import { selectDomElement } from "../../utils/selectDomElement.js";
import { GetSetRemoveUrlHelper } from "../../helper/parameterHelper/GetSetRemoveUrlHelper.js";

async function createNewSite(destination, from, to, direction, setNewURL, callback) {
    /*let destination = "body";
    let from = ".container2";
    let to = ".imprintAndPrivacyPolicy"; 
    let direction = "up";
    let callback = true;*/
    await siteCopyPaste(to, destination, "true");
    await textCopyPaste(to, "");
    await slide(from, to, direction);

    
    if (setNewURL === "setNewURL") {
        let wantedURL;
        if (to.charAt(0) == "."){
            wantedURL = to.replace(".", "");
        } else if (to.charAt(0) == "#") {
            wantedURL = to.replace("#", "");
        }
        const adress = new GetSetRemoveUrlHelper();
        await adress.setUrl("site", wantedURL);
    }
    
    
    const remove = new GetSetRemoveTemplateHelper;

    console.log(" Ausgewählte From: " + from);
    

    //++_$_text_$_++

    setTimeout( async function() {
        await remove.remove(from);
        if (callback === true) {
            try {
                let toElement = await selectDomElement(to);
                let childElement = toElement.getElementsByClassName('++_$_interaction:close_$_++');
                if (childElement.length > 0) {
                    switch (direction) {
                        case "down":
                            direction = "up";
                        break;
                        case "up":
                            direction = "down";
                        break;
                        case "right":
                            direction = "left";
                        break;
                        case "left":
                            direction = "right";
                        break;
                    }
                    childElement[0].setAttribute('onclick', 'createNewSite(\'' + destination + '\', \'' + to + '\', \'' + from + '\', \'' + direction + '\', \'' + setNewURL + '\', false)');

                    console.log(childElement[0] + " ist das Kind von " + toElement);
                    
                }
            } catch (error) {
                
            }
        
        }
        
    }, 750)
    
    triggerEvents();
}
export { createNewSite };
