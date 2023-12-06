var saveCookies = false;
var saveForEver = false;
var cookieDuration = 0;

var x = 0;
function testStorageSystem() {
    var storageSystem = new StorageSystem;
    var testVariable = "testValue";
    
    switch (x) {
        case 0:
            
            storageSystem.setStorage("sessionStorage", testVariable);
            x++;
            break;
        case 1:
            var value = storageSystem.getStorage("sessionStorage", "testVariable");
            console.log(value);  // Sollte "testValue" ausgeben
            x++;
            break;
        case 2:
            // Löschen des gespeicherten Werts
            storageSystem.delStorage("sessionStorage", "testVariable");

            x++;
            break;
        case 3:
            value = storageSystem.getStorage("sessionStorage", "testVariable");
            console.log(value);  // Sollte null ausgeben
            x = 0;
            break;
    }
}

class StorageSystem {
    constructor() {
        this.SaveAuthorization = 0; // Standardmäßig auf sessionStorage setzen
    }

    updateSaveAuthorization(saveCookies, saveForEver){
        const oldAuthorization = this.SaveAuthorization;
        const oldStorage = this.storageConst(oldAuthorization);
    
        this.saveCookies = saveCookies;
        this.saveForEver = saveForEver;
    
        if (!(this.saveCookies && this.saveForEver)){
            this.SaveAuthorization = 0;
        } else if (this.saveCookies && (!this.saveForEver)) {
            this.SaveAuthorization = 1;
        } else if ((!this.saveCookies) && this.saveForEver) {
            this.SaveAuthorization = 0;
        } else {
            this.SaveAuthorization = 2;
        }
    
        const newAuthorization = this.SaveAuthorization;
        const newStorage = this.storageConst(newAuthorization);
    
        if (oldAuthorization !== newAuthorization) {
            this.transferData(oldStorage, newStorage);
        }
    }
    
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

    getStorageType(theStorage) {
        switch (theStorage) {
            case "sessionStorage":
                return sessionStorage;
            case "localStorage":
                return localStorage;
            case "durationCookie":
                // Implementierung für Cookies mit bestimmter Dauer
                break;
            default:
                throw new Error("Ungültiger Speichertyp: " + theStorage);
        }
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
