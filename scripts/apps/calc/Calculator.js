import { selectDomElement } from "../../utils/selectDomElement.js"

class Calculator {
    constructor() {
        //this.valueButton = "bigButton"
    }

    async copyToNumbar() {
        let rawValue = this.#select(); 
        rawValue = rawValue.toString();
        console.log(rawValue);
        console.log(rawValue.length)
    
        if (rawValue.length === 1) {
            let resultBar = await selectDomElement(".result");
            let addResultBar = resultBar.value;
            
            console.log(resultBar)
            if (!isNaN(rawValue)) {
                addResultBar += rawValue
                resultBar.value = addResultBar;
            } else if (addResultBar[addResultBar.length - 1] != rawValue){
                addResultBar += rawValue
                resultBar.value = addResultBar;
            }
        }
    }
    #select() {
        let valueButton = document.querySelectorAll(".hover");
        valueButton = valueButton[0]; let value = valueButton.value;
        return value;
    }
    

    async result() {
        let destination = await selectDomElement(".result");
        let rawValue = destination.value;
        let result = eval(rawValue);
        destination.value = result;
    }

    async copy() {
        let entry = await selectDomElement(".result");
        let entryVal = entry.value;

        navigator.clipboard.writeText(entryVal);
    }
    testOut() {
        console.log("HALLO ICH BIN GELADEN"); }
}

export { Calculator };
