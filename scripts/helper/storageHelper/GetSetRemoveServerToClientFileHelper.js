import { GetSetRemoveSessionStorageHelper } from "./clientStorage/GetSetRemoveSessionStorageHelper.js"

class GetSetRemoveServerToClientHelper extends GetSetRemoveSessionStorageHelper{
    async get(valueName, path) {
        console.log("SendPath === " + valueName +  " " + path)
        let value;
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
