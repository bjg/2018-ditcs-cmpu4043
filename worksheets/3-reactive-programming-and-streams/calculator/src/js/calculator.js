import { Observable } from 'rxjs/Rx';
import '../css/calculator.css';

let decimalCount = 0;
let operator = '';
let calculation = "";
let previousCalc = "";
let newDisplay = false;

const buttons = document.getElementsByTagName("button");
const displayText = document.getElementById("displayValue");

const buttons$ = Observable.fromEvent(buttons, 'click').pluck('target', 'textContent');
const keyboard$ = Observable.fromEvent(document, 'keydown').pluck('key');

const input$ = buttons$.merge(keyboard$);
input$.subscribe(val => {
    // append display text
    if (Number.isInteger(parseInt(val)) || val == '.') {
        // clear previous calculation info
        if (newDisplay) {
            displayText.textContent = "";
            newDisplay = false;
        }
        if (val == '.') {
            decimalCount++;
            if (decimalCount < 2) {
                displayText.textContent += val;
            }
        }
        else {
            if (displayText.textContent == '0') {
                displayText.textContent = val;
            }
            else {
                displayText.textContent += val;
            }
        }
    }
    // clear text
    else if (val == 'C' || val == 'c') {
        displayText.textContent = 0;
        decimalCount = 0;
        calculation = "";
        operator = '';
    }
    // backspace
    else if (val == "DEL" || val == "Backspace") {
        displayText.textContent = displayText.textContent.substring(0, displayText.textContent.length - 1);
        if (displayText.textContent == "") {
            displayText.textContent = 0;
        }
    }
    // calculate
    else if (val == '+' || val == '-' || val == '÷' || val == '/' || val == '×' || val == '*' || val == '=' || val == "Enter") {
        if (val == '÷') {
            val = '/';
        }
        else if (val == '×') {
            val = '*';
        }
        else if (val == "Enter") {
            val = '=';
        }

        // if first calculation
        if (operator == '') {
            calculation += displayText.textContent;
        }
        // if equals is pressed twice in a row
        else if (operator == '=') {
            if (val == '=') {
                calculation = displayText.textContent + previousCalc;
            }
        }
        // save calculation
        else {
            calculation += operator + displayText.textContent;
            previousCalc = operator + displayText.textContent;
        }
        // perform calculation and assign values for follow up calculation
        displayText.textContent = eval(calculation);
        operator = val;
        newDisplay = true;
        calculation = displayText.textContent;
    }
    // squared
    else if (val == "x²") {
        displayText.textContent = Math.pow(displayText.textContent, 2);
    }
    // square root
    else if (val == '√') {
        displayText.textContent = Math.sqrt(displayText.textContent);
    }
});