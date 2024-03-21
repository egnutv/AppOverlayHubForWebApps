class GetSetRemoveSessionStorageHelper {
    constructor() {
        this.storage = sessionStorage;
    }
    async setStorage(valueName, value){
        await this.storage.setItem(valueName, value);
    }
    async getStorage(valueName){
        let value = await this.storage.getItem(valueName);
        if (value === null) {
            throw new Error('Value is null');
        } else {
            return value;
        }
    }
    async replaceStorage(valueName, value) {
        await this.removeStorage(valueName);
        await this.setStorage(valueName, value)
    }
    async removeStorage(valueName){
        await this.storage.removeItem(valueName);
    }
    async clearStorage() {
        await this.storage.clear();
    }
}

export {GetSetRemoveSessionStorageHelper};