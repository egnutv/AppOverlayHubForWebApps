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
    async getSet(/*indexEntry*/) {
        
        let indexEntry = "start"
        let arrayOfEntrys = await this.get(indexEntry);
        console.log("Der Eintrag : " + arrayOfEntrys);
        await this.set(arrayOfEntrys)
    }
    async get(indexEntry) {
        let a = await super.get(indexEntry);
        a = a.toString();
        if (a.includes(".html") ) {
            return indexEntry;
        } else {
            return console.error(null);
        }
    }

    async set(destination) {
        let d = destination;
        destination = "." + d;
    }
}
export { TextController }