import {merge, fromEvent, pipe, from} from 'rxjs';
import {map,mapTo, mergeAll, pluck } from 'rxjs/operators';
import "./Calc.css";

let mathCalculation = '';
let display = document.getElementsByTagName('input')[0];

const buttons = document.getElementsByClassName("button");
const keymainStream = fromEvent(buttons, 'click').pipe(map(button => button.path[0].defaultValue));
const calculatorKeyStream = fromEvent(document, 'buttonpress').pipe(pluck('calcKey'));
const mainStream = merge(keymainStream, calculatorKeyStream);

mainStream.subscribe(calcKey => {

 function performMathCalculation() {

  console.log(eval(mathCalculation));
  let result = eval(mathCalculation);
  console.log(result);
  display.value = '';
  display.value = result;
  mathCalculation = '';
 }
 
 if (calcKey === '=') {
  performMathCalculation();
 } else {
  mathCalculation += calcKey;
  display.value = mathCalculation;
 }
});





