import { readServerFile } from "../storageManagement/reader/readServerFile.js";
import { selectDomElement } from "../../utils/selectDomElement.js";
class CopyPasteTemplate {
    async copy(source) {
        let value
        await readServerFile(source) 
            .then(result => {
                console.log(result);
                value = result;
                
            })
        return value;
    }

    async copyJsonValue (source, pathToEntry) {
        let Avalue;
        await this.copy(source) 
            .then(rawValue => {
                // Konvertieren Sie die rohen Daten in ein JSON-Objekt und lesen Sie daraus
                const theValue = JSON.parse(rawValue);
                let keys = pathToEntry.split('/');
                let value = theValue
                for (let entry of keys) {
                    if (value[entry] !== undefined) {
                        value = value[entry];
                    } else {
                        console.log(entry + ' not found');
                        return null;
                    }
                }
                Avalue = value;
            })
        ;
        console.log(Avalue);
        
        return Avalue;
    }
    
    
    
    

    async paste(value, destination) {
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
    
    const fileValue = await index.copyJsonValue("data/packs/templates/sites/index.json", "index/start");

    console.log("X " + fileValue);

    console.log(fileValue);

    index.paste(fileValue, "body");
}



export  {siteCopyPaste};

window.siteCopyPaste = siteCopyPaste;