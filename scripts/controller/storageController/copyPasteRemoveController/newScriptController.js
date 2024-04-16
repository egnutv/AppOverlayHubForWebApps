import { selectDomElement } from "../../../utils/selectDomElement.js";
import { SiteController } from "./newSiteController.js";

class ScriptController extends SiteController {
    constructor() {
        super();
        this.indexPath = "data/configs/addScripts.json"
        this.indexName = "ImportScript"
        this.footName = "foot"; this.headName = "head";
        this.laterScriptName = "|||[[[---LaterAddScript---]]]|||"
    }
    async getSet(indexEntry) {
        /*try {
            let elements = document.querySelectorAll(this.laterScriptName);
            elements.forEach((element) => {
                element.remove();
            });
        } catch (error) {
            console.error(error);
        }*/
        await this.remove(this.laterScriptName);
        console.log("BY PASSED")
        
        let value = await this.get(indexEntry);
        console.log(value);
        
        await this.set(value, indexEntry);
    }
    
    async set(value, name) {
        console.log(value)
        let keys = Object.keys(value);
        let numOfEntrys = keys.length;
    
        for (let i = 0; i < numOfEntrys; i++) {
            let entry = keys[i]; // Ändern Sie numOfEntrys[i] in keys[i]
            console.log(entry);
            let destination = await selectDomElement(entry);
            console.log(destination)
            /*let destiObj = document.createElement("script"); // Änderung hier
            destiObj.className = this.laterScriptName;
            destination.appendChild(destiObj); // Änderung hier
            destination.appendChild(destiObj);*/

            console.log(value[entry])

            let finalKeys = Object.keys(value[entry])
            let numOfFinalEntrys = finalKeys.length;
            console.log(numOfFinalEntrys)

            /*let objKeys = Object.keys(value[destination]);
            let numOfObjKeys = objKeys.length;
            console.log(numOfObjKeys);*/
            
            for (let j = 0; j < numOfFinalEntrys; j++) {
                let finalDestination = finalKeys[j];
                let finalKeyValue = value[entry][finalDestination]; // Abrufen des Werts, der dem Schlüssel zugeordnet ist
                console.log("Key Value: " + finalKeyValue); // Ausgabe des zugeordneten Werts
                let destiObj = document.createElement("script");
                destiObj.className = this.laterScriptName;
                destiObj.src = finalKeyValue;
                destiObj.defer = true;
                destination.appendChild(destiObj);
            }
            
        }
    }

    async remove(className) {
        let rmDestination = document.getElementsByClassName(className);
        let rmDestinationSUM = rmDestination.length;
            for (let i = 0; i < rmDestinationSUM; i++) {
                let element = rmDestinationSUM[i];
                element.remove();
                
            }
        
    }

    

    async get(indexEntry) {
        let valueOfEntry = await this.getEntryOf(this.indexName, this.indexPath);
        
        console.log(valueOfEntry)
        let value;
        
        if (valueOfEntry.add.hasOwnProperty(indexEntry)) {
            value = valueOfEntry.add[indexEntry];
        } else {
            value = null; // Setzen Sie hier Ihren Standardwert
        }
        return value;
    }
}

export { ScriptController }
