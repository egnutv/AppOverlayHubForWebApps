import { GetSetRemoveSessionStorageHelper } from "./clientStorage/GetSetRemoveSessionStorageHelper.js"

class GetSetRemoveServerToClientHelper extends GetSetRemoveSessionStorageHelper{
    async get(valueName, path) {
        let value = this.storage.getItem(valueName);
        if (value === null) {
            try {
                
                value = await fetch(path)
                    .then(response => response.text())
                    .catch(error => console.error('Error:', error));
                    this.storage.setItem(valueName, value);
            } catch (error) { 
    
            }
        }
        return value;
    }
    
}

export { GetSetRemoveServerToClientHelper };
