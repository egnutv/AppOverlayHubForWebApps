import { GetSetRemoveServerToClientHelper } from "../../../helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { selectDomElement } from "../../../utils/selectDomElement.js";

class DefaultsController {

    constructor() {
        this.storage = new GetSetRemoveServerToClientHelper;
        this.defaultConf = "data/configs/main.json";
        this.defaultConfName = "defaultConf";
    }

    async getDefaults() {
        let d = await this.get();
        return d;
    }
    async get() {
        let valueOfDefault = await this.getEntryOf(this.defaultConfName, this.defaultConf);
        return valueOfDefault;
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
}

export { DefaultsController }