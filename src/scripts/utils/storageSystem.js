var saveCookies = false;
var saveForEver = false;

class StorageSystem {
    


    storageConst(theStorage) {
        if (!(saveCookies && saveForEver)){
            if (!(theStorage = "sessionStorage")) {
                theStorage = "sessionStorage";
            }
        } else if (saveCookies && !saveForEver) {
            if (theStorage = "localStorage") {
                theStorage = "durationCookie";
            }
        }
        switch (theStorage) {
            case "sessionStorage":
                return sessionStorage;
            case "localStorage":
                return localStorage;
            case "tempCookie":
                // Implementierung für temporäre Cookies
                break;
            case "durationCookie":
                // Implementierung für Cookies mit bestimmter Dauer
                break;
            default:
                throw new Error("Ungültiger Speichertyp: " + theStorage);
        }
    }

    setStorage(theStorage, saveVariable, value) {
        const storage = this.storageConst(theStorage);
        storage.setItem(saveVariable, value);
    }

    getStorage(theStorage, saveVariable) {
        const storage = this.storageConst(theStorage);
        return storage.getItem(saveVariable);
    }

    delStorage(theStorage, saveVariable) {
        const storage = this.storageConst(theStorage);
        storage.removeItem(saveVariable);
    }
}



