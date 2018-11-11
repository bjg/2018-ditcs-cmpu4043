import { Rx } from 'rxjs/Rx'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import '../css/styles.css';

const btns = document.getElementsByClassName("button");
const result = document.getElementById("result");

const stream$ = Observable.from(btns)
    .map(btn => Observable.fromEvent(btn, 'click')
    .mapTo(btn.textContent))
    .mergeAll()
    .merge(Observable.fromEvent(document, 'keypress')
    .pluck('key'));

stream$.subscribe(key => {
    if (key == "=") {
        calculate();
    }
    else if (key == "C" || key == "c") {
        clearScreen();
    }
    else if (isNaN(key) && !isAlpha(key)){
        addToScreenOps(key);
    }
    else {
        addToScreen(key);
    }
});


function clearScreen() {
    result.innerText = 0;
}

function checkScreen() {
    if (result.innerText == "0") {
        return true;
    }
    return false;
}

// Evaluate inputted string
function calculate() {
    try {
        result.innerText = eval(result.innerText);
    } catch (error) {
        result.innerText = "Error";
    }
}

// If a number is pressed
function addToScreen(key) {
    if (!isAlpha(key)) {
        if (checkScreen()) {
            result.innerText = "";
            result.innerText += key;
        }
        else {
            result.innerText += key;
        }
    }
}

// If an Operator is pressed
function addToScreenOps(key) {
    if (!isAlpha(key)) {
        if (checkScreen()) {
            result.innerText = "";
            result.innerText += key;
        }
        else {
            result.innerText += key;
        }
    }    
};

// Check if string is a letter
function isAlpha(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 64 && code < 91) && !(code > 96 && code < 123)) {
            return false;
        }
    }
    return true;
};