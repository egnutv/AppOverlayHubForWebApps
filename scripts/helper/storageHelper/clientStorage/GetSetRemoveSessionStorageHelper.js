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
    async existsStartsWith(valueNameStart){
        for (let i = 0; i < this.storage.length; i++){
            let key = await this.storage.key(i);
            if (key.startsWith(valueNameStart)) {
                return true;
            }
        }
        return false;
    }
    async getKeysStartsWith(valueNameStart){
        let keys = [];
        for (let i = 0; i < this.storage.length; i++){
            let key = await this.storage.key(i);
            if (key.startsWith(valueNameStart)) {
                keys.push(key);
            }
        }
        return keys;
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