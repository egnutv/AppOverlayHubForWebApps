import { selectDomElement } from "../../utils/selectDomElement"

function testOut() {
    console.log("HALLO ICH BIN GELADEN")
}

class Calculator {
    constructor() {

    }
    async copyToNumbar() {
        let button = await selectDomElement(".click");
        let destination = await selectDomElement(".result");

        let b = button.value;
        let d = destination.value;
        let allowed = false;
        if (b.length <= 1 || d.charAt(d.length - 1) != b) {
            if(isNaN(d)){
                destination.value += b;
            }
        }
    }
    async result() {
        let trigger = await selectDomElement(".resultTrigger");
        let destination = await selectDomElement(".result");
        let d = destination; let t = trigger;

        if (d.value != null) {
            
        }
    }
}
