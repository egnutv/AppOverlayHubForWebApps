class Storage {

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