import { SiteLoadInit } from "./SiteLoadInit.js";

class SiteOnLoadInit extends SiteLoadInit {
    async init(indexEntry, destination) {
        await super.init(indexEntry, destination);
    }
    
}

export { SiteOnLoadInit };