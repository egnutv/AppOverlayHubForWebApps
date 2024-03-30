import { GetSetRemoveServerToClientHelper } from "../../../helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { SiteController } from "./newSiteController.js";

class TextController extends SiteController {
    constructor() {
        super();
        this.stroage = new GetSetRemoveServerToClientHelper;
        this.indexName = "indexOfSites";
        this.indexPath = "data/packs/templates/sites/index.json";
        this.pathToLang = "data/packs/texts/%lang%/";
        this.standardLangFile = "config.json";
        this.speceficLangFile = "specific/%file%.json";
    }
    async getSet(indexEntry, destination) {
        //let arrayOfEntrys = await this.get(indexEntry);
    }
    async get(indexEntry) {
        let valueOfEntry = await this.getEntryOf(this.indexName, this.indexPath); 
    }
    async set() {

    }
}