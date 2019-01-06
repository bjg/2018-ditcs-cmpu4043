import { fromEvent, merge, pipe, subscribe, Observable } from "rxjs";
import { mapTo, scan, startWith, tap, pluck } from "rxjs/operators";
import '../css/style.css'; // importing css

// Variable for screen
const display = document.getElementById("screen");

// 1 2 3 4 5 6 7 8 9 0 + C = - * / ( )
const buttonOne = document.getElementById("one");
const buttonTwo = document.getElementById("two");
const buttonThree = document.getElementById("three");
const buttonFour = document.getElementById("four");
const buttonFive = document.getElementById("five");
const buttonSix = document.getElementById("six");
const buttonSeven = document.getElementById("seven");
const buttonEight = document.getElementById("eight");
const buttonNine = document.getElementById("nine");
const buttonZero = document.getElementById("zero");
const buttonPlus = document.getElementById("plus");
const buttonC = document.getElementById("clear");
const buttonEq = document.getElementById("equals");
const buttonMin = document.getElementById("minus");
const buttonMulti = document.getElementById("mutiply");
const buttonDiv = document.getElementById("division");
const buttonLefB = document.getElementById("leftbracket");
const buttonRiB = document.getElementById("rightbracket");
const buttonPlusMinus = document.getElementById("plusminus");

// Constant for the observables
const buttons$ = 
    merge(
      fromEvent(buttonOne, "click").pipe(mapTo(buttonOne.textContent)),
      fromEvent(buttonTwo, "click").pipe(mapTo(buttonTwo.textContent)),
      fromEvent(buttonThree, "click").pipe(mapTo(buttonThree.textContent)),
      fromEvent(buttonFour, "click").pipe(mapTo(buttonFour.textContent)),
      fromEvent(buttonFive, "click").pipe(mapTo(buttonFive.textContent)),
      fromEvent(buttonSix, "click").pipe(mapTo(buttonSix.textContent)),
      fromEvent(buttonSeven, "click").pipe(mapTo(buttonSeven.textContent)),
      fromEvent(buttonEight, "click").pipe(mapTo(buttonEight.textContent)),
      fromEvent(buttonNine, "click").pipe(mapTo(buttonNine.textContent)),
      fromEvent(buttonZero, "click").pipe(mapTo(buttonZero.textContent)),
      fromEvent(buttonC, "click").pipe(mapTo(buttonC.textContent)),
      fromEvent(buttonPlus, "click").pipe(mapTo(buttonPlus.textContent)),
      fromEvent(buttonEq, "click").pipe(mapTo(buttonEq.textContent)),
      fromEvent(buttonMin, "click").pipe(mapTo(buttonMin.textContent)),
      fromEvent(buttonMulti, "click").pipe(mapTo(buttonMulti.textContent)),
      fromEvent(buttonDiv, "click").pipe(mapTo(buttonDiv.textContent)),
      fromEvent(buttonLefB, "click").pipe(mapTo(buttonLefB.textContent)),
      fromEvent(buttonRiB, "click").pipe(mapTo(buttonRiB.textContent)),
      fromEvent(buttonPlusMinus, "click").pipe(mapTo(buttonPlusMinus.textContent)),
      // Keyboard
      fromEvent(document, 'keydown').pipe(pluck('key')),

      )
      .subscribe(str => {
        if(str === "="){
          display.value = eval(display.value);
        } else {
           display.value = display.value + str;
        }
        if(str === "C"){
          display.value = "";
        }
        if(str ==="+/-"){
          display.value = str *-1;
        }
      });