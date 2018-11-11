import "./style.css";

import { Observable } from 'rxjs/Rx';

let buttons = document.getElementsByClassName("button");
let screen = document.querySelector('#screen span');
let specialOperations = ['=', 'C', '±']
let result;

/* ================ SPECIAL OPERATIONS */
/* if its a minus number get the absolute value
    hence changing it to a plus ... otherwise 
    append a '-' string to it 
*/

let plusMinusOperation = () => {
    let state = screen.innerHTML.indexOf('-')
    if(state == 0){
        screen.innerHTML = Math.abs(screen.innerHTML)
    }else{
        screen.innerHTML = '-' + screen.innerHTML
    }
}

let clear = () => {
    screen.innerHTML = '0'
    result = '';
}

/* .replace only returns first result hence why i searching using a global modifier ...
    https://www.w3schools.com/jsref/jsref_regexp_g.asp
     eval function does all calculations for me ...
    https://www.w3schools.com/jsref/jsref_eval.asp
*/

let doCalculation = () => {
    let input = screen.innerHTML
    let newInput = input.replace(new RegExp("x", "g"), '*')
                        .replace(new RegExp("÷", "g"), '/')
    result = eval(newInput)
    screen.innerHTML = result;
}

/* ================ SPECIAL OPERATIONS END */
/* ================ IF SIGN VALUES */

let categoriseSpecialOperation = (signVal) => {
    if(specialOperations.includes(signVal)){
        switch(signVal){
            case '±':
                plusMinusOperation()
                break;
            case 'C':
                clear()
                break;
            case '=':
                doCalculation()
                break;
            default:
                break;
        }
    }
    else{
        screen.innerHTML += signVal
    }
}
 
let signCalc = (signVal) => {
    if(specialOperations.includes(signVal)){
        categoriseSpecialOperation(signVal)
    }else if(screen.innerHTML == '0'){
        screen.innerHTML = signVal
    }else{
        screen.innerHTML +=signVal
    }
}

/* ================ IF SIGN VALUES END */
/* ================ IF NUMBER VALUES */

let numberCalc = (stringVal) => {
    let numberVal = Number(stringVal)
    if(screen.innerHTML == '0'){
        screen.innerHTML = numberVal
    }else{
        screen.innerHTML +=numberVal
    }
}

/* ================ IF NUMBER VALUES END */
/* ================ CLASSIFICATION AND EVENT HANDLERS*/

let identifyElement = (element) => {
    let currentValue = element.target.innerHTML;
    let operationOrOther = [')', '(', '±', '÷', 'x', '-', '+', '=', 'C', '.'];
    if(operationOrOther.includes(currentValue)){
        signCalc(currentValue)
    }else{
        numberCalc(currentValue)
    }
}
/* add an event to each button with a class of 'button' ...
    hence ... all buttons*/

/* call the observer on observable ... since click Events dont
   have an error or completed event, I wont call them in the observer 
*/

let observer = {
    next: (event) => identifyElement(event)
}

let callFromEvent = (element) => {
    Observable.fromEvent(element, 'click')
                 .subscribe(observer)
}

Array.from(buttons).forEach(callFromEvent);

/* ================ CLASSIFICATION AND EVENT HANDLERS END*/ 