class StorageType {
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
}