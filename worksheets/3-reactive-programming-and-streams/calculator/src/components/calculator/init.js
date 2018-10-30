import "./style.css";
import {Observable} from 'rxjs/Rx'
import {divisionSign, plusminus, doPressed, setDisplay} from "./calculator";


function Calculator() {
    Observable.fromEvent(document, 'keypress').subscribe(keyBoardEvent => doPressed(keyBoardEvent.key));
    const calculator = document.createElement("div");
    calculator.id = "calculator";
    const display = Display();
    calculator.appendChild(display);
    calculator.appendChild(ButtonRow(['(', ')', plusminus, divisionSign]));
    calculator.appendChild(ButtonRow(['1', '2', '3', 'x']));
    calculator.appendChild(ButtonRow(['4', '5', '6', '-']));
    calculator.appendChild(ButtonRow(['7', '8', '9', '+']));
    calculator.appendChild(ButtonRow(['0', '.', 'C', '=']));
    return calculator;
}

function Display() {
    const display = document.createElement("div");
    display.id = 'display';
    const number = document.createElement("div");
    number.id = 'number';
    number.innerHTML = '0';

    display.appendChild(number);
    return display;
}

function ButtonRow(values){
    const row = document.createElement("div");
    row.classList.add('buttonsRow');
    values.forEach(function(value, index, array){
        row.appendChild(Button(value))
    });
    return row;
}

function Button(value) {
    const button = document.createElement("button");
    button.innerHTML = value;
    Observable.fromEvent(button, 'click').subscribe(mouseEvent => doPressed(mouseEvent.srcElement.innerHTML));
    return button;
}

export {Calculator};