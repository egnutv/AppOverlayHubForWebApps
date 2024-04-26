import { GetSetRemoveSessionStorageHelper } from "./clientStorage/GetSetRemoveSessionStorageHelper.js"

class GetSetRemoveServerToClientHelper extends GetSetRemoveSessionStorageHelper{
    async get(valueName, path) {
        let value;
        try {
            value = this.storage.getItem(valueName);
        } catch (error) { 
            // Fehlerbehandlung
        } 
        if (value === null) {
            value = await this.fetchData(path);
            this.storage.setItem(valueName, value);
        }
        return value;
    }

    async fetchData(path) {
        let data = await fetch(path)
            .then(response => response.text())
            .catch(error => console.error('Error:', error));
        return data;
    }
}

export { GetSetRemoveServerToClientHelper };
