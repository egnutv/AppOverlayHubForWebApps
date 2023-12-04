// Hier ein paar Gedanken dazu:
var testStep;
testStep = 0;
function testAuslöser() {
    if (testStep < 2) {
        switch (testStep) {
            case 0:
                testLöschen();
                break;
            case 1:
                testSpeichern();
                break;
        }
        testStep++;
    } else if (testAufruf = 2){
        testAufruf();
        testStep = 0;
    }
}
function testAufruf() {
    const storageSystem = new StorageSystem("read", "localStorage", exampleKey);

    console.log(storageSystem.getStorage("localStorage", exampleKey)); // Änderung hier

    return storageSystem;
}

function testSpeichern() {
    let exampleKey = "level";
    const storageSystem = new StorageSystem("save", "localStorage", exampleKey);

    let currentLevel = storageSystem.getStorage("localStorage", exampleKey) || 0;
    storageSystem.setStorage("localStorage", exampleKey, parseInt(currentLevel) + 1);
}

function testLöschen() {
    let exampleKey = "level";
    const storageSystem = new StorageSystem("delete", "localStorage", exampleKey);
}

/* Gedanken Ende ----------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
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


