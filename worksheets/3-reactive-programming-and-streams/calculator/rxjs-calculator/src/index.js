import { fromEvent, merge, pipe, subscribe } from "rxjs";
import { map, scan, startWith } from "rxjs/operators";

import './calculator.css';

function Input() {
  const input = merge(
    fromEvent(document, 'click').pipe(map(event => event.target.value)),
    fromEvent(document, 'keypress').pipe(map(event => event.key))
  );
  input.subscribe(v => handleInput(v))
}

Input();



/*
 * utils
**/

const allowedOperands = ['+', '-', '*', '/', '(', ')', '.'];
let allowedChars = allowedOperands;

function getCaclulatorDisplay() {
   return document.querySelector('.display');
}

function typeKey(value) {
   const display = getCaclulatorDisplay();
   display.innerHTML += value;
}

function clearCalc() {
   const display = getCaclulatorDisplay();
   display.innerHTML = '';
   display.classList.remove('error');
}

function handleInput(value) {
  if (value === 'c') {
   clearCalc();
  }
  else if (value === '=' || value === 'Enter') {
   const display = getCaclulatorDisplay();
   const expression = display.innerHTML;

   try {
     display.innerHTML = eval(expression);
   } catch(error) {
     display.classList.add('error');
     console.log(error);
   };
  }
  else if (allowedChars.indexOf(value) > -1 || !isNaN(value)) {
   typeKey(value);
  }
  else {
   console.log(value);
 }
}
