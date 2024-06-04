import { Calculator } from "./Calculator.js";

const calc = new Calculator;
window.calc = calc;

window.calc.testOutput = calc.testOut;

window.calc.copyToNumbar = calc.copyToNumbar;
window.calc.result = calc.result;
window.calc.copy = calc.copy;
window.calc.reset = calc.reset;
window.calc.anewCopyToNumbar = calc.anewCopyToNumbar;

window.addEventListener('keydown', function(event) {
    let key = event.key;
    
    switch (key) {
        case "=":
            calc.result();
            break;
        case "Backspace":
            calc.reset();
        break;
        default:
            calc.copyToNumbar(event.key);
            console.log(key);
            break;
    }
})
