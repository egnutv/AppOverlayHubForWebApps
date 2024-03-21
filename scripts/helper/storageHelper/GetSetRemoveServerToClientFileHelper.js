import { GetSetRemoveSessionStorageHelper } from "./clientStorage/GetSetRemoveSessionStorageHelper.js"

class GetSetRemoveServerToClientHelper extends GetSetRemoveSessionStorageHelper{
    async getStorage(valueName, path) {
        let value;
        value = await this.storage.getItem(valueName);
        if (value === null) {
            try {
                value = await fetch(path)
                    .then(response => response.text())
                    .catch(error => console.error('Error:', error));
            } catch (error) { 

            }
        } 
        return value;
    }
}

export { GetSetRemoveServerToClientHelper };
