class Authorization {
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
}