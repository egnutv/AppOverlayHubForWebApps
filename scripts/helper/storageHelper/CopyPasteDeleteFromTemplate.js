import { selectDomElement } from "../../utils/selectDomElement.js";
import { readServerFile } from "../../manager/storageManagement/reader/readServerFile.js";

class CopyPasteRemoveFromTemplate {
    async copy(source, innerPathToEntry) {

        var sourceFormat = source.split(".");
        var format = sourceFormat[sourceFormat.length - 1];
        if (innerPathToEntry === "") {
            console.warn("No inner path was set");
        }
        
        let value
        await readServerFile(source) 
            .then(result => {
                //console.log(result);
                value = result;
                
            });
        if (innerPathToEntry !== "") {
            switch (format) {
                case ("json"):
                    //console.warn("The format is " + format);
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
        //console.log(rawValue);
        let keys = pathToEntry.split('/');
        for (let entry of keys) {
            if (rawValue[entry] !== undefined){
                rawValue = rawValue[entry];
            } else {
                console.error(entry + " not found");
                return null;
            }
        }
        let theValue = rawValue;
        //console.log("Der gesuchte Wert ist: " + theValue);

        return theValue;
        
    }
    

    async paste(value, pasteAs, className, destination) {
        let aDestination = selectDomElement(destination);
        if (!aDestination) {
            //console.log('Destination not found');
            return;
        } else {
            switch (pasteAs) {
                case ("container"):
                    this.#pasteAsContainer(value, className, aDestination);
                break;
                case ("script"):
                    this.#pasteAsScript(value, className, aDestination);
                break;
                case ("scriptModule"):
                    this.#pasteAsScriptModule(value, className, aDestination);
                break;
                case ("text"):
                break;
                default:
                    console.error("This pasteAs is not supported. Please use the parameter: container for divs or script for scripts or text for set texts.")
                break;
            }

            triggerEvents();
        }
        
        

        
    }

    async #pasteAsContainer(value, className, aDestination){
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

            
        } 
    }

    async #pasteAsScript(value, className, aDestination) {
        let script = document.createElement('script');
        script.classList.add(className);
        script.src = value;
        aDestination.appendChild(script);
    }
    
    
    
    async #pasteAsScriptModule(value, className, aDestination){
        await this.#pasteAsScript(value, className, aDestination);
        let script = selectDomElement(className);
        script.type = "module"; script.defer;
    }
    

    remove(className) {
        const aDestination = selectDomElement(className);

        aDestination.remove;

    }
}

export { CopyPasteRemoveFromTemplate };
    








