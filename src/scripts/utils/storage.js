
//TESTING 2
class DOsaveSomething {

    constructor(saveMode, theStorage, saveVariable) {
         //saveMode ist der Modus der die Ein/Ausgabeart von saveVariabeln bestimmt.
         //theStorage ist die Art des Speicherzugriffs zB Local, Session oder Cookie
         //saveVariable ist die Variabel, die im jeweiligen Storagesystem gespeichert wird.
        
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

    setStorage(theStorage, saveVariable) {
        switch (theStorage) {
            case "sessionStorage":
                sessionStorage.setItem(saveVariable);
                break;
            case "localStorage":
                localStorage.setItem(saveVariable);
                break;
            case "tempCookie":

                break;
            case "durationCookie":

                break;
        }
    }
    getStorage(theStorage, saveVariable) {
        switch (theStorage) {
            case "sessionStorage":
                sessionStorage.getItem(saveVariable);
                break;
            case "localStorage":
                localStorage.getItem(saveVariable);
                break;
            case "tempCookie":

                break;
            case "durationCookie":

                break;
        }
    }
    delStorage(theStorage, saveVariable) {
        switch (theStorage) {
            case "sessionStorage":
                sessionStorage.removeItem(saveVariable);
                break;
            case "localStorage":
                localStorage.removeItem(saveVariable);
                break;
            case "tempCookie":

                break;
            case "durationCookie":

                break;
        }
    }
}