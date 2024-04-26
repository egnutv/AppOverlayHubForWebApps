import { GetSetRemoveServerToClientHelper } from "../../../helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { selectDomElement } from "../../../utils/selectDomElement.js";
import { DefaultsController } from "./DefaultsController.js";

class SiteController extends DefaultsController {
    constructor() {
        super();
        this.indexName = "indexOfSites"; this.indexPath = "data/packs/templates/sites/index.json"; this.pathToFile = "data/packs/templates/sites/%file%";  
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
            //let value = await this.storage.get(className, pathToFile);
            let value = await this.storage.fetchData(pathToFile);
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
    async getIndex() {
        let value = await this.getEntryOf(this.indexName, this.indexPath);
        return value;
    }
    async get(indexEntry) {
        console.log("IndexName: " + this.indexName + " indexPath: " + this.indexPath)
        let valueOfEntry = await this.getIndex();
        //let a = await super.get(indexEntry);
        let valueOfDefault = await super.get();
        console.log(valueOfEntry)
        indexEntry = await this.convertToPath(indexEntry);
        console.log(indexEntry)
        let value;
        try {
            let key = indexEntry.toUpperCase();
            let upperCaseKeysObject = {};
            for (let k in valueOfEntry.index) {
                upperCaseKeysObject[k.toUpperCase()] = valueOfEntry.index[k];
            }
            value = upperCaseKeysObject[key];
        } catch (error) {
            value = valueOfDefault.default["site"];
            value += ".html"
        }
        
        /*let capValueOfEntry = valueOfEntry["index"];

        capValueOfEntry = Object.keys(capValueOfEntry);
        capValueOfEntry = capValueOfEntry.map(element => element.toUpperCase());
        if (capValueOfEntry.includes(indexEntry.toUpperCase())){
            console.log("YES")
            let i = capValueOfEntry.indexOf(indexEntry);
            console.log(i);
            console.log(capValueOfEntry[i])
        } else {
            console.log("NO")
        }
        console.log(capValueOfEntry)*/
        console.log(value)
        return value;
    }
    async convertToPath(innerPathValue){
        if (innerPathValue.includes(".")) {
            innerPathValue = innerPathValue.replace(".", "/");
        }
        return innerPathValue;
    }
    async remove(destination) {
        let d = await selectDomElement(destination);
        d.remove();
    }
}
export { SiteController }