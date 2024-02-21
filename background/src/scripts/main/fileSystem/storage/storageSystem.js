var saveCookies = false;
var saveForEver = false;
var cookieDuration = 0;

class StorageSystem {
    
    
    transferData(oldStorage, newStorage) {
        const oldStore = this.storageConst(oldStorage);
        const newStore = this.storageConst(newStorage);
    
        for (let i = 0; i < oldStore.length; i++) {
            let key = oldStore.key(i);
            let value = oldStore.getItem(key);
            newStore.setItem(key, value);
        }
    
        for (let i = 0; i < oldStore.length; i++) {
            let key = oldStore.key(i);
            oldStore.removeItem(key);
        }
    }
    
    storageConst(SaveAuthorization) {
        let theStorage;
        switch (SaveAuthorization) {
            case 0:
                theStorage = "sessionStorage";
                break;
            case 1:
                theStorage = "durationCookie";
                break;
            case 2:
                theStorage = "localStorage";
                break;
            default:
                theStorage = "sessionStorage";
                break;
        }
        return this.getStorageType(theStorage);
    }

    

    setStorage(saveVariable, value) {
        const storage = this.storageConst(this.SaveAuthorization);
        value = JSON.stringify(value);
        storage.setItem(saveVariable, value);
    }

    getStorage(saveVariable) {
        const storage = this.storageConst(this.SaveAuthorization);
        let value = storage.getItem(saveVariable);
        try {
            value = JSON.parse(value);
        } catch (e) {
            // Wert konnte nicht geparst werden, also lassen wir es als String
        }
        return value;
    }

    delStorage(saveVariable) {
        const storage = this.storageConst(this.SaveAuthorization);
        storage.removeItem(saveVariable);
    }
}
