import { Authorization } from '/authorization.js';
import { StorageSystem } from '/storageSystem.js';
import { StorageType } from '/storageType.js';

class StorageInit {
    constructor() {
        this.authorization = new Authorization();
        this.storageType = new StorageType();
        this.storageSystem = new StorageSystem(this.authorization, this.storageType);
    }

    initialize(saveCookies, saveForEver) {
        this.authorization.updateSaveAuthorization(saveCookies, saveForEver);
    }

    getStorageSystem() {
        return this.storageSystem;
    }
}
