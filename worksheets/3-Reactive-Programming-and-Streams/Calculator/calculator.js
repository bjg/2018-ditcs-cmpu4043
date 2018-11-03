import {fromEvent, merge} from 'rxjs';
import {map, filter} from 'rxjs/operators';

import '../calculator-skin.css'

let display;
let expression;

window.onload = function(){
    display = document.getElementById("screen_contents");
    expression = display.value;
}

function append(char){
    expression += char;
    display.value = expression;
}

function clearScreen(){
    expression = " ";
    display.value = expression;
}

function evalScreen(){
    try{
        expression = eval(expression);
    }
    catch(e){
        console.log("Expression is incorrect");
    }
    display.value = expression;
}

const keyPress = fromEvent(document, 'keypress').pipe(map(event => event.key)).pipe(filter(key => "0123456789-+/*0.()".indexOf(key) != -1 || key == 'c' || key == 'C' || key == '='));

const mouseClick = fromEvent(document, 'click').pipe(map(event => event.target.id));

const input = merge(keyPress, mouseClick);

input.subscribe(function(key) {
    "0123456789-+/*0.()".indexOf(key) != -1? append(key): null;
    key == 'c' || key == 'C' ? clearScreen() : null;
    key == '='? evalScreen(): null;
});