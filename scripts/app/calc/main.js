// Fixed code snippet:

import { selectDomElement } from "../../utils/selectDomElement";

class Calculator {
    constructor() {}

    async copyToNumbar() {
        let button = await selectDomElement(".click");
        let destination = await selectDomElement(".result");

        let b = button.value;
        let d = destination.value;

        if (b.length <= 1 || (d.charAt(d.length - 1) !== b && d[0] && d[d.length])) {
            if (isNaN(d)) {
                destination.value += b;
            }
        }
    }

    async result() {
        let destination = await selectDomElement(".result");
        let raw = destination.value;

        let result = eval(raw);
        destination.value = result;
    }

    async copy() {
        let entry = await selectDomElement(".result");
        let entryVal = entry.value;

        navigator.clipboard.writeText(entryVal);
    }
}

function testOut() {
    console.log("HALLO ICH BIN GELADEN");
}
