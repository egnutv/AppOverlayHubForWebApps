import { readServerFile } from "../../manager/storageManagement/reader/readServerFile.js";
import { GetSetRemoveSessionStorageHelper } from "./clientStorage/GetSetRemoveSessionStorageHelper.js"

class GetSetRemoveServerToClientHelper extends GetSetRemoveSessionStorageHelper{
    async getStorage(valueName, path) {
        let value;
        value = await this.storage.getItem(valueName); 
        if (value === null) {
            value = await readServerFile(path);
        } 
        return value;
    }
}

export { GetSetRemoveServerToClientHelper };