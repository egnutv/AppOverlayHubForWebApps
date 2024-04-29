import { selectDomElement } from "../../../utils/selectDomElement.js"

class Calculator {
    constructor() {
        //this.valueButton = "bigButton"
    }

    async copyToNumbar() {
        let rawValue = this.get()
        console.log(rawValue); 
        rawValue = rawValue.toString();
        console.log(rawValue);
        console.log(rawValue.length)
    
        if (rawValue.length === 1 || rawValue[0] && rawValue[1] === 0) {
            let resultBar = await selectDomElement(".result");
            let addResultBar = resultBar.innerHTML;
            
            console.log(resultBar)
            if (!isNaN(rawValue)) {
                addResultBar += rawValue
                resultBar.innerHTML = addResultBar;
            } else if (addResultBar[addResultBar.length - 1] != rawValue){
                addResultBar += rawValue
                resultBar.innerHTML = addResultBar;
            }
        }
    }
    async get() {

    }
    get() {
        let valueButton = document.querySelectorAll(".hover");
        valueButton = valueButton[0]; let value = valueButton.value;
        
        return value;
    }
    

    async result() {
        let destination = await selectDomElement(".result");
        let rawValue = destination.innerHTML;
        let result = eval(rawValue);
        destination.innerHTML = result;
        if (!isNaN(result)) {
        } else {
            setTimeout(() => {
                this.reset();
            }, 2500);
        }
        
    } async reset(){
        let resultBar = await selectDomElement(".result");
        resultBar.innerHTML = "";
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
