

import { GetSetRemoveUrlHelper } from "./scripts/helper/parameterHelper/GetSetRemoveUrlHelperNew.js";

async function testSet() {
    const site = new GetSetRemoveUrlHelper();

}
async function testGet() {
    const site = new GetSetRemoveUrlHelper();

    let getting = site.getUrl(XY);


    let output = document.getElementById("output");
    output.innerHTML = "Ausgelesener Wert: " + getting;
    console.log();
}

async function testRemove() {
    const site = new GetSetRemoveUrlHelper();
    
}

export { testGet, testSet, testRemove}