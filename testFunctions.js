

import { GetSetRemoveUrlHelper } from "./scripts/helper/parameterHelper/GetSetRemoveUrlHelper.js";
import { GetSetRemoveServerToClientHelper } from "./scripts/helper/storageHelper/GetSetRemoveServerToClientFileHelper.js";
import { SiteController } from "./scripts/controller/storageController/copyPasteRemoveController/SiteController.js"
import { TextController } from "./scripts/controller/storageController/copyPasteRemoveController/TextController.js"
import { DefaultsController } from "./scripts/controller/storageController/copyPasteRemoveController/DefaultsController.js";
import { LaterAddController } from "./scripts/controller/storageController/copyPasteRemoveController/LaterAddController.js";


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
    const theStorage = new TextController();
    await theStorage.getSet("start")
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
    const defaults = new DefaultsController;
    const adress = new GetSetRemoveUrlHelper;
    const site = new SiteController;

    let defaultsValues = await defaults.getDefaults();
    console.log(defaultsValues);

    let valueOfDefaults = await defaults.getDefaults();
        let supportedLangs = valueOfDefaults.default["lang-support"];
        
        let adressLang = await adress.get(0); adressLang = adressLang.toLowerCase();
        
        if (supportedLangs.includes(adressLang)) {
            console.log("YES")
        } else {
            console.log("NO");
            let standardLang = valueOfDefaults.default["lang"]; standardLang = standardLang[0]; standardLang = standardLang.toUpperCase();
            try {
                await adress.overwrite(0, standardLang);
            } catch (error) {
                await adress.set(standardLang);
            }
            console.log(standardLang);
        }

        let supportedSites = await site.getIndex();

        console.log(supportedSites);

        supportedSites = supportedSites["index"];
        console.log(supportedSites);
        supportedSites = Object.keys(supportedSites);
        console.log(supportedSites)
        

        if (supportedSites.includes("imprintAndPrivacyPolicy")) {
            console.log("YEAH IST COOL")
        }
        
}
export { testDefaults, testGet, testSet, testRemove, testSiteControllerSet, testSiteControllerGet, testSiteControllerRemove, testSiteControllerGetSet, testTextControllerGetSet, testLaterAddControllerGetSet}