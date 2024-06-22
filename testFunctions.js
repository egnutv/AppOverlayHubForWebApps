

import { GetSetRemoveUrlHelper } from "./scripts/helper/parameterHelper/GetSetRemoveUrlHelper.js";
import { GetSetRemoveServerToClientHelper } from "./scripts/helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { SiteController } from "./scripts/controller/storageController/copyPasteRemoveController/SiteController.js"
//import { TextController } from "./scripts/controller/storageController/copyPasteRemoveController/TextController.js"
//import { DefaultsController } from "./scripts/controller/storageController/copyPasteRemoveController/DefaultsController.js";
import { LaterAddController } from "./scripts/controller/storageController/copyPasteRemoveController/LaterAddController.js";
//import { SiteLoadInit } from "./scripts/initializations/loading/SiteLoadInit.js";
import { SiteOnLoadInit } from "./scripts/initializations/loading/SiteOnLoadInit.js";
import { MediaController } from "./scripts/controller/storageController/copyPasteRemoveController/media/MediaController.js";

function testOutput(input)  {
    let output = document.getElementById("output");

    output.innerHTML = input;
}

async function testSet() {
    const site = new GetSetRemoveUrlHelper();

    site.set("DCC/YY")

}
async function testGet() {
    const site = new GetSetRemoveUrlHelper();

    let getting = await site.get(0);

    testOutput(getting);
}
async function testOverwrite() {
    const site = new GetSetRemoveUrlHelper();

    await site.overwrite(0, "XXX")
}

async function testRemove() {
    const site = new GetSetRemoveUrlHelper();
    await site.remove();
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
    const theStorage = new SiteController();
    await theStorage.remove(".xxx");

}

async function testSiteControllerGetSet(){
    const theStorage = new SiteController();
    await theStorage.getSet("start", ".xxx");
}

async function testTextControllerGetSet() {
    /*const theStorage = new TextController();
    await theStorage.getSet("xxx")*/
    /*let xyz = new SiteOnLoadInit;
    await xyz.init();*/
    console.log("TEST TEXT");
}

let count; count = 0;
async function testLaterAddControllerGetSet() {
    console.warn("count: " + count);
    const theStorage = new LaterAddController;
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
async function testDefaults() {
    let newSite = new SiteOnLoadInit;

    await newSite.init("start", "xxx");
        
}
async function testPlaceController() {
    
    let Placeholde = new MediaController;

    await Placeholde.getSet();
}
export { testPlaceController, testOverwrite, testDefaults, testGet, testSet, testRemove, testSiteControllerSet, testSiteControllerGet, testSiteControllerRemove, testSiteControllerGetSet, testTextControllerGetSet, testLaterAddControllerGetSet}