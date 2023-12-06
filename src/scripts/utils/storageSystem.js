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
        value = JSON.stringify(value);
        storage.setItem(saveVariable, value);
    }

    getStorage(theStorage, saveVariable) {
        const storage = this.storageConst(theStorage);
        let value = storage.getItem(saveVariable);
        try {
            value = JSON.parse(value);
        } catch (e) {
            // Wert konnte nicht geparst werden, also lassen wir es als String
        }
        return value;
    }

    delStorage(theStorage, saveVariable) {
        const storage = this.storageConst(theStorage);
        storage.removeItem(saveVariable);
    }
}



