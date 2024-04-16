import { SiteController } from "./newSiteController.js";

class ScriptController extends SiteController {
    constructor() {
        super();
        this.indexPath = "data/configs/addScripts.json"
        this.indexName = "ImportScript"
        this.footName = "foot"; this.headName = "head";
    }
    async getSet(indexEntry) {
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
            let destination = entry;
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
