import { Calculator } from "./Calculator.js";

const calc = new Calculator;
window.calc = calc;

window.calc.testOutput = calc.testOut;

window.calc.copyToNumbar = calc.copyToNumbar;
window.calc.result = calc.result;
window.calc.copy = calc.copy;