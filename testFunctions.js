

import { GetSetRemoveUrlHelper } from "./scripts/helper/parameterHelper/GetSetRemoveUrlHelperNew.js";
import { GetSetRemoveServerToClientHelper } from "./scripts/helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { SiteController } from "./scripts/controller/storageController/copyPasteRemoveController/newSiteController.js"
function testOutput(input)  {
    let output = document.getElementById("output");

    output.innerHTML = input;
}

async function testSet() {
    const site = new GetSetRemoveUrlHelper();

    site.setUrl("XY/XX/YY")

}
async function testGet() {
    const site = new GetSetRemoveUrlHelper();

    let getting = await site.getUrl("lang", "XX");

    testOutput(getting);
}

async function testRemove() {
    const site = new GetSetRemoveUrlHelper();
    
}

let getValue;
async function testSetStorage(){
    const theStorage = new GetSetRemoveServerToClientHelper();
    await theStorage.set("EinName", getValue);

}
async function testGetStorage(){
    const theStorage = new SiteController();
    getValue = await theStorage.get("start");
    testOutput(getValue);
}
async function testRemoveStorage(){
    const theStorage = new GetSetRemoveServerToClientHelper();
    await theStorage.remove("EinName");

}

async function testSiteController(){
    const theStorage = new SiteController();
    await theStorage.controller("start", ".xxx");

    
}


export { testGet, testSet, testRemove, testSetStorage, testGetStorage, testRemoveStorage, testSiteController}