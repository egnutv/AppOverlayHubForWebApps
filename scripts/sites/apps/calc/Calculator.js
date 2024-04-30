import { selectDomElement } from "../../../utils/selectDomElement.js"

class Calculator {
    constructor() {
        //this.valueButton = "bigButton"
    }

    async anewCopyToNumbar() {
        this.copyToNumbar("0");
        setTimeout(() => {
            this.copyToNumbar("0");
        }, 1);
    }
    async copyToNumbar(keyBoardsKey) {
        
        let rawValue;

        if (keyBoardsKey) {
            console.log(keyBoardsKey);
            let valuesArray = this.getCheckList();
            console.log(valuesArray)
            if(valuesArray.includes(keyBoardsKey)) {
                console.log("YES ITS INCLUDED")
                rawValue = keyBoardsKey;
            }
        } else {
            rawValue = this.getActive()
            
        }
        rawValue = rawValue.toString()
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
    
    getActive() {
        let valueButton = document.querySelectorAll(".hover");
        valueButton = valueButton[0]; let value = valueButton.value;
        
        return value;
    }
    getCheckList() {
        let elements = document.getElementsByClassName('bigButton');
        let valuesArray = Array.from(elements)
            .map(element => element.value)
            .filter(value => value.length <= 1);
        return valuesArray;
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
