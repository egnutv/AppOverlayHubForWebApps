import { readServerFile } from "../storageManagement/reader/readServerFile.js";
import { selectDomElement } from "../../utils/selectDomElement.js";
class CopyPasteTemplate {
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
        if (innerPathToEntry != "") {

        }
        switch (format) {
            case ("json"):
                console.warn("The format is " + format);
                value = await this.#findValueOfJson(innerPathToEntry, value);
                console.log("Der Wert dieses Elements ist: " + value);
            break;
            case ("html"):
                
            break;
            default:
                console.error("Not supported Format is: " + format);
            break;
            }   
    
        /*switch (format) {
            case ("JSON"):
                console.warn("Es ist eine: " + format);
                //const rawValue = value .then( rawValue => this.#copyJsonValue(pathToEntry));
                console.log ("The RawVaue: " + rawValue)
            break;
            default:
                if ("" || "all" || "null"){
                    console.warn("Es ist eine: " + format);
                    
                } else {
                    console.error("Is not a Format to use");
                }
            break;
            
        }*/
        return value;
    }


    async #findValueOfJson (pathToEntry, value) {
        const rawValue = JSON.parse(value);
        console.log(rawValue);
       
    }
    
    
    
    
    
    
    

    paste(value, destination) {
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
        } 
        tempDiv = document.getElementsByClassName('tempDiv')[0];
        tempDiv.insertAdjacentHTML('beforeend', value);
    }
}
    


async function siteCopyPaste() {
    const index = new CopyPasteTemplate;
    
    const fileValue = await index.copy("data/packs/templates/sites/index.json", "index/start");

    console.log("X " + fileValue);

    console.log(fileValue);

    index.paste(fileValue, "body");
}



export  {siteCopyPaste};

window.siteCopyPaste = siteCopyPaste;