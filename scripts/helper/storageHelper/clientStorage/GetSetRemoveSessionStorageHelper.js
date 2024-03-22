class GetSetRemoveSessionStorageHelper {
    constructor() {
        this.storage = sessionStorage;
    }
    async set(valueName, value){
        await this.storage.setItem(valueName, value);
    }
    async get(valueName){
        let value = await this.storage.getItem(valueName);
        if (value === null) {
            throw new Error('Value is null');
        } else {
            return value;
        }
    }
    async exists(valueName){
        let value = await this.storage.getItem(valueName);
        if (value !== null) { return true; } else { return false; }
    }
    
    async replace(valueName, value) {
        await this.remove(valueName);
        await this.set(valueName, value)
    }
    async remove(valueName){
        await this.storage.removeItem(valueName);
    }
    async clear() {
        await this.storage.clear();
    }
}

export {GetSetRemoveSessionStorageHelper};