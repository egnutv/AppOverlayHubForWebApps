

import { GetSetRemoveUrlHelper } from "./scripts/helper/parameterHelper/GetSetRemoveUrlHelperNew.js";

async function testSet() {
    const site = new GetSetRemoveUrlHelper();

    site.setUrl("XY/XX/YY")

}
async function testGet() {
    const site = new GetSetRemoveUrlHelper();

    let getting = await site.getUrl("lang", "XX");

    let output = document.getElementById("output");
    output.innerHTML = "Ausgelesener Wert: " + getting;
    console.log("Ausgelesener Wert: " + getting);
}

async function testRemove() {
    const site = new GetSetRemoveUrlHelper();
    
}

export { testGet, testSet, testRemove}