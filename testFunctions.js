

import { GetSetRemoveUrlHelper } from "./scripts/helper/parameterHelper/GetSetRemoveUrlHelperNew.js";
import { GetSetRemoveServerToClientHelper } from "./scripts/helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";

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
    await theStorage.setStorage("EinName", getValue);

}
async function testGetStorage(){
    const theStorage = new GetSetRemoveServerToClientHelper();
    getValue = await theStorage.getStorage("EinName", "data/packs/templates/sites/testCardGreen.html");
    testOutput(getValue);
}
async function testRemoveStorage(){
    const theStorage = new GetSetRemoveServerToClientHelper();
    await theStorage.removeStorage("EinName");

}


export { testGet, testSet, testRemove, testSetStorage, testGetStorage, testRemoveStorage}