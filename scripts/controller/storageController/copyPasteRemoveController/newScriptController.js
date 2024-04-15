import { SiteController } from "./newSiteController";

class ScriptController extends SiteController {
    constructor() {
        super();
        this.indexPath = "data/configs/addScripts.json"
        this.indexName = "ImportedScripts"
    }

    async get(indexENtry) {
        let valueOfEntry;
    }

}

export { ScriptController }