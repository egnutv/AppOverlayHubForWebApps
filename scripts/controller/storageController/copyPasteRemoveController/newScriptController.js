import { SiteController } from "./newSiteController";

class ScriptController extends SiteController {
    constructor() {
        super();
        this.indexPath = "data/configs/addScripts.json"
        this.indexName = "ImportScript"
        this.footName = "foot"; this.headName = "head";
    }

    async getSet(indexEntry) {
        let arrayOfEntrys = await this.get(indexEntry);
    }

    async get(indexEntry) {
        let valueOfEntry = await this.getEntryOf(this.indexName, this.indexPath);

        let headEntry, footEntry;
        try {
            headEntry = valueOfEntry.add[indexEntry]?.head || null;
            footEntry = valueOfEntry.add[indexEntry]?.foot || null;
        } catch (error) {
            console.error(error);
        }

        let value = "";
        if (headEntry || footEntry) {
            value += this.footName + ":" + footEntry + this.headName + ":" +  headEntry;
        }
        
        return value;
    }
    async set() {

    }

}

export { ScriptController }
