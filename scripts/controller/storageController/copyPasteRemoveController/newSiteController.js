import { GetSetRemoveServerToClientHelper } from "../../../helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { selectDomElement } from "../../../utils/selectDomElement.js";

class SiteController{
    constructor() {
        this.storage = new GetSetRemoveServerToClientHelper;
        this.indexName = "indexOfSites";
        this.indexPath = "data/packs/templates/sites/index.json";
        this.pathToFile = "data/packs/templates/sites/%file%";
    }

    async controller(indexEntry, value, destination) {
        arrayOfEntrys = await this.get(indexEntry);
        await this.set(indexEntry, arrayOfEntrys, destination);
    }

    async set(className, arrayOfEntrys, destination) {
        let pathToFile = this.pathToFile;
        let s = await selectDomElement(destination); destination = s;

        for (let i = 0; i < arrayOfEntrys.length; i++) {
            pathToFile = pathToFiles.replace("%file%", arrayOfEntrys[i]);



        } 
    }
/*
    let countDestinationElements = aDestination.childlength;
        console.log("Das ist die Anzahl: " + countDestinationElements + " mit dem Ziel: " + aDestination);
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
*/

    async get(indexEntry) {
        let test;
        let valueOfEntry = await this.#getEntryOf(this.indexName, this.indexPath); 
        
        console.log(valueOfEntry)

        indexEntry = await this.#convertToPath(indexEntry);
        console.log(indexEntry);
        let value = valueOfEntry.index[indexEntry];

        test = value;

        return test;
    }

    async #convertToPath(innerPathValue){
        if (innerPathValue.includes(".")) {
            innerPathValue = innerPathValue.replace(".", "/");
        }
        return innerPathValue;
        
    }
    async #getEntryOf(valueName, pathToFile){
        let valueOfEntry;
        let valuesOfIndex = await this.storage.get(valueName, pathToFile);
        

        if (await this.storage.exists(valueName) === false) {
            this.storage.set(valueName, valuesOfIndex);
        }
        valueOfEntry = await JSON.parse(valuesOfIndex);
        return valueOfEntry;
    }

    


}
export { SiteController }
