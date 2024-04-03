import { GetSetRemoveServerToClientHelper } from "../../../helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { selectDomElement } from "../../../utils/selectDomElement.js";

class SiteController{
    constructor() {
        this.storage = new GetSetRemoveServerToClientHelper;
        this.indexName = "indexOfSites";
        this.indexPath = "data/packs/templates/sites/index.json";
        this.pathToFile = "data/packs/templates/sites/%file%";
    }
    async getSet(indexEntry, destination) {
        let arrayOfEntrys = await this.get(indexEntry);
        await this.set(indexEntry, arrayOfEntrys, destination);
    }
    async set(className, arrayOfEntrys, destination) {
        let pathsToFiles = this.pathToFile;
        
        let d = await selectDomElement(destination);

        
        await this.#createDivIn("tempDiv", destination);
        let tempDiv = await selectDomElement(".tempDiv");

        for (let i = 0; i < arrayOfEntrys.length; i++) {
            let pathToFile = pathsToFiles.replace("%file%", arrayOfEntrys[i]);
            let value = await this.storage.get(className, pathToFile);
            tempDiv.insertAdjacentHTML('beforeend', value);
            tempDiv.children[i].classList.add(className);
        }
        while (tempDiv.childNodes.length > 0) {
            d.appendChild(tempDiv.childNodes[0]);
        }
        d.removeChild(tempDiv);
    }
    async #createDivIn(divName, destination) {
        let d = await selectDomElement(destination); destination = d;
        let Div = document.createElement('div'); 
        Div.className = divName;
        destination.appendChild(Div);
    }
    async get(indexEntry) {
        let valueOfEntry = await this.getEntryOf(this.indexName, this.indexPath);
        console.log(valueOfEntry)
        indexEntry = await this.convertToPath(indexEntry);
        console.log(indexEntry)
        let value = valueOfEntry.index[indexEntry];
        console.log(value)
        return value;
    }
    async convertToPath(innerPathValue){
        if (innerPathValue.includes(".")) {
            innerPathValue = innerPathValue.replace(".", "/");
        }
        return innerPathValue;
    }
    async getEntryOf(valueName, pathToFile){
        let valueOfEntry;
        let valuesOfIndex = await this.storage.get(valueName, pathToFile);
        if (await this.storage.exists(valueName) === false) {
            this.storage.set(valueName, valuesOfIndex);
        }
        valueOfEntry = await JSON.parse(valuesOfIndex);
        return valueOfEntry;
    }
    async remove(destination) {
        let d = await selectDomElement(destination);
        d.remove();
    }
}
export { SiteController }