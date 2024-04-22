import { SiteLoadInit } from "./SiteLoadInit";

class SiteOnLoadInit extends SiteLoadInit {
    async init() {
        console.log("ICH BIN DA")
    }
}

export { SiteOnLoadInit };