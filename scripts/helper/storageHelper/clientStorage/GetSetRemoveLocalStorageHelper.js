import {GetSetRemoveSessionStorageHelper } from './GetSetRemoveSessionStorageHelper.js'

class GetSetRemoveLocalStorageHelper extends GetSetRemoveSessionStorageHelper{
    constructor() {
        super();
        this.storage = localStorage;
    }
}

export {GetSetRemoveLocalStorageHelper};