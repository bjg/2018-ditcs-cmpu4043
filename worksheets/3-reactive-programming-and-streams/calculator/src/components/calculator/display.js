import {divisionSign} from "./calculator";

let display = document.getElementById('number');

function getDisplay() {
    if (display == null) {
        display = document.getElementById('number')
    }
}

function updateDisplay(list) {
    getDisplay();
    display.innerHTML = null;
    for(let i = 0; i < list.length; i++)
        display.innerHTML += list[i]
}

function isValidDisplay(value) {
    if(value >= 0 || value <= 9) {
        return true
    }

    switch(value) {
        case 'x':
            return true;
        case divisionSign:
            return true;
        case '+':
            return true;
        case '-':
            return true;
        case '(':
            return true;
        case ')':
            return true;
        case '.':
            return true;
        default:
            return false
    }
}

export {updateDisplay, isValidDisplay};