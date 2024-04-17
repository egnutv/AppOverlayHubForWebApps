

import { GetSetRemoveUrlHelper } from "./scripts/helper/parameterHelper/GetSetRemoveUrlHelperNew.js";
import { GetSetRemoveServerToClientHelper } from "./scripts/helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { SiteController } from "./scripts/controller/storageController/copyPasteRemoveController/newSiteController.js"
import { TextController } from "./scripts/controller/storageController/copyPasteRemoveController/newTextController.js"
import { ScriptController } from "./scripts/controller/storageController/copyPasteRemoveController/newScriptController.js";


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
async function testSiteControllerSet(){
    const theStorage = new GetSetRemoveServerToClientHelper();
    await theStorage.set("EinName", getValue);

}
async function testSiteControllerGet(){
    const theStorage = new SiteController();
    getValue = await theStorage.get("start");
    testOutput(getValue);
}
async function testSiteControllerRemove(){
    const theStorage = new GetSetRemoveServerToClientHelper();
    await theStorage.remove("EinName");

}

async function testSiteControllerGetSet(){
    const theStorage = new SiteController();
    await theStorage.getSet("start", ".xxx");
}

async function testTextControllerGetSet() {
    const theStorage = new TextController();
    await theStorage.getSet("start")
}

let count; count = 0;
async function testScriptControllerGetSet() {
    console.warn("count: " + count);
    const theStorage = new ScriptController;
    switch (count) {
        case 0:
            
            await theStorage.getSet("calc");
            count++;
            break;
        case 1:
            await theStorage.getSet("start");
            count = 0;
            break;
    }
}
export { testGet, testSet, testRemove, testSiteControllerSet, testSiteControllerGet, testSiteControllerRemove, testSiteControllerGetSet, testTextControllerGetSet, testScriptControllerGetSet}