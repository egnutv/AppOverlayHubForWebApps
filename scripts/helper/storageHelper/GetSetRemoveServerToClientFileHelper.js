import { GetSetRemoveSessionStorageHelper } from "./clientStorage/GetSetRemoveSessionStorageHelper.js"

class GetSetRemoveServerToClientHelper extends GetSetRemoveSessionStorageHelper{
    async get(valueName, path) {
        let value;
            try {
                value = this.storage.getItem(valueName);
                
            } catch (error) { 
                
        } 
        if (value === null) {
            value = await fetch(path)
                    .then(response => response.text())
                    .catch(error => console.error('Error:', error));
                    this.storage.setItem(valueName, value);
            
        }
        return value;



        
    }
    
}

export { GetSetRemoveServerToClientHelper };
