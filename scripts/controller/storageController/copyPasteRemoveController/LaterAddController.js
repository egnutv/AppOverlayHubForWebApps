import { selectDomElement } from "../../../utils/selectDomElement.js";
import { SiteController } from "./SiteController.js";

class LaterAddController extends SiteController {
    constructor() {
        super();
        this.indexPath = "data/configs/laterAdd.json"
        this.indexName = "ImportScript"
        this.footName = "foot"; this.headName = "head";
        this.laterScriptName = "|||[[[---LaterAdd---]]]|||";
    }
    async getSet(indexEntry) {

        await this.remove();
        let value = await this.get(indexEntry);
        try {
            await this.set(value, indexEntry);
        } catch (error) {
            
        }
    }

    async remove() {
        let elements = document.getElementsByClassName(this.laterScriptName);

        if (elements.length > 0) {
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
    }

    async set(value, name) {
        let keys = Object.keys(value);
        let numOfEntrys = keys.length;
    
        for (let i = 0; i < numOfEntrys; i++) {
            let entry = keys[i];
            let destination = await selectDomElement(entry);
            let finalKeys = Object.keys(value[entry])
            let numOfFinalEntrys = finalKeys.length;
                for (let j = 0; j < numOfFinalEntrys; j++) {
                    let finalDestination = finalKeys[j];
                    let finalKeyValue = value[entry][finalDestination]; 
                    let destiObj = document.createElement("script");
                    destiObj.className = this.laterScriptName;
                    destiObj.src = finalKeyValue;
                    destiObj.defer = true;
                    destination.appendChild(destiObj);
                }
        }
    }
    async get(indexEntry) {
        let valueOfEntry = await this.getIndex();
        let value;
        
        if (valueOfEntry.add.hasOwnProperty(indexEntry)) {
            value = valueOfEntry.add[indexEntry];
        } else {
            value = null;
        }
        return value;
    }
}

export { LaterAddController }
