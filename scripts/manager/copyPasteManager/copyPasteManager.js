import { readServerFile } from "../storageManagement/reader/readServerFile.js";
import { selectDomElement } from "../../utils/selectDomElement.js";
class copyPasteRemoveFromTemplate {
    async copy(source, innerPathToEntry) {

        var sourceFormat = source.split(".");
        var format = sourceFormat[sourceFormat.length - 1];
        if (innerPathToEntry === "") {
            console.error("No inner path was set");
        }
        
        let value
        await readServerFile(source) 
            .then(result => {
                console.log(result);
                value = result;
                
            });
        if (innerPathToEntry !== "") {
            switch (format) {
                case ("json"):
                    console.warn("The format is " + format);
                    value = await this.#findValueOfJson(innerPathToEntry, value);
                break;
                case ("html"):
                break;
                default:
                    console.error("Not supported Format is: " + format);
                break;
                }
        }
        
        return value;
    }


    async #findValueOfJson (pathToEntry, value) {
        let rawValue = JSON.parse(value);
        console.log(rawValue);
        let keys = pathToEntry.split('/');
        for (let entry of keys) {
            if (rawValue[entry] !== undefined){
                rawValue = rawValue[entry];
            } else {
                console.log(entry + " not found");
                return null;
            }
        }
        let theValue = rawValue;
        console.log("Der gesuchte Wert ist: " + theValue);

        return theValue;
        
    }
    
    
    
    
    
    
    
    
    

    paste(value, className, destination) {
        const aDestination = selectDomElement(destination);
        if (!aDestination) {
            console.log('Destination not found');
            return;
        }
        let tempDiv;
        let tempDivCount = document.getElementsByClassName('tempDiv');
        if (tempDivCount.length === 0) {
            tempDiv = document.createElement('div');
            tempDiv.className = 'tempDiv';
            aDestination.appendChild(tempDiv);
            tempDiv = document.getElementsByClassName('tempDiv')[0];
            tempDiv.insertAdjacentHTML('beforeend', value);

            for (let i = 0; i < tempDiv.children.length; i++) {
                tempDiv.children[i].classList.add(className);
            }
            
            
            let children = Array.from(tempDiv.children);
            for (let i = 0; i < children.length; i++) {
                aDestination.appendChild(children[i]);
            }

            


            aDestination.removeChild(tempDiv);

            triggerEvents();
            
        } 
        

        
    }
}
    


async function siteCopyPaste(indexEntry, destination) {
    const index = new copyPasteRemoveFromTemplate;
    let valueOfIndex = await index.copy("data/packs/templates/sites/index.json", "index/" + indexEntry);
    valueOfIndex = valueOfIndex.toString();
    console.log("Der Wert im Index: " + valueOfIndex);
    const entry = new copyPasteRemoveFromTemplate;
    let valueOfEntry = await entry.copy("data/packs/templates/sites/" + valueOfIndex,  "");
    console.log("Der Wert des Eintrags: " + valueOfEntry);
    entry.paste(valueOfEntry, indexEntry, destination);
}
async function scriptCopyPaste() {
    const scriptEntry = "Script1";
    const entry = new copyPasteRemoveFromTemplate;
    let valueOfEntry = await entry.copy("data/configs/addScripts.json", "add/" + scriptEntry);
    //Muss noch weiter geschrieben werden
    console.log("Der Eintrag " + valueOfEntry);

} 
async function textCopyPaste() {
    //Muss alternativerweise default-Einstellungen auslesen können
    //Muss getroffene Einstellungen durch Cookie von Usern auslesen können
    //setzt Text einfügen
}
async function cookieCopyPaste(){
    //Muss Cookies erstellen und localSpeicher
    //AUßerdem 
}



export  {siteCopyPaste, scriptCopyPaste};

window.siteCopyPaste = siteCopyPaste;
window.scriptCopyPaste = scriptCopyPaste;