//Hier ein paar Gedanken dazu:

function testAufruf() {
    const storageSystem = new StorageSystem("read", "localStorage", exampleKey);

    return storageSystem;

    console.log(storageSystem("exampleKey"));
    
}

function testSpeichern() {
    exampleKey = "level = 0"
    const storageSystem = new StorageSystem("save", "localStorage", exampleKey);
}

function testLöschen() {
    const storageSystem = new StorageSystem("delete", "localStorage", exampleKey);
}

//Gedanken Ende

class StorageSystem {

    constructor(saveMode, theStorage, saveVariable) {
        switch (saveMode) {
            case "save":
                this.setStorage(theStorage, saveVariable);
                break;
            case "read":
                this.getStorage(theStorage, saveVariable);
                break;
            case "delete":
                this.delStorage(theStorage, saveVariable);
                break;
        }
    }

    storageConst(theStorage) {
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


