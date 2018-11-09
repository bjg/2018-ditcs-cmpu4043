import '../css/calculator.css';
import {fromEvent, merge} from 'rxjs';
import { map } from "rxjs/operators";

const buttons = document.body.getElementsByClassName('button');
const screen = document.body.getElementsByClassName('screen')[0];

var operation = '';

const btn$ = fromEvent(buttons, 'click').pipe(map(btn => btn.path[0].innerHTML));
const key$ = fromEvent(document,'keydown').pipe(map(keyPressed => keyPressed.key));
const input$ = merge(btn$, key$);

input$.subscribe(value =>{

  if( value == 'C'){
    clearScreen();
  }
  else if((value == 'Enter' || value == '=')){
    calculate();
  }
  else if(value == '±'){
    plusMinus();
  }
  else{
    getValue(value);
  }
});


//Protoype function that will allow the replacement of chars in a string, used in the plusMinus() function
String.prototype.replaceAt=function(index, newValue) {
    return this.substr(0, index) + newValue+ this.substr(index + newValue.length);
}

//Get the value of either the button or key pressed and append it to the operation
function getValue(num) {
  operation += num;
  screen.innerHTML = operation;
}

//Calculate the operation using the eval function
function calculate() {
  //if the operation contains a x or ÷ sign replace ut with * or / so the eval() function understand these symbols
  operation = operation.replace('x', '*');
  operation = operation.replace('X', '*');
  operation = operation.replace('÷', '/');

  try {
    operation = eval(operation);
    console.log(operation);
  } catch (err) {
    operation = 'Syntax Error'
    screen.innerHTML = operation;
    operation = '';
    return;
  }
  screen.innerHTML = operation;
}

//Clear the calculator Screen
function clearScreen() {
  screen.innerHTML = 0;
  operation = '';
}

//Change the last symbol from a + to a minus or viceversa
function plusMinus() {

  var changeSymbol = [2];

  //Gets the index and value of the last symbol to be replaced
  for(let i = 0; i < operation.length; i++){

    if(operation.charAt(i) == '+' || operation.charAt(i) == '-'){

    changeSymbol[0] = i;
    changeSymbol[1] = operation.charAt(i);
    }
    else if(operation.charAt(i) == 'x' && operation.charAt(i+1) != '-'){
      changeSymbol[0] = i + 1;
      changeSymbol[1] = operation.charAt(i);
    }
    else if(operation.charAt(i) == '(' && operation.charAt(i+1) != '-'){
      changeSymbol[0] = i + 1;
      changeSymbol[1] = operation.charAt(i);
    }
  }

  //Change the symbol
  if(changeSymbol[1] == '+'){
    operation = operation.replaceAt(changeSymbol[0], '-');
  }
  else if(changeSymbol[1] == '-'){
    operation = operation.replaceAt(changeSymbol[0], '+');
  }
  else if(changeSymbol[1] == 'x' || changeSymbol[1] == '('){
    operation = operation.slice(0, changeSymbol[0]) + '-' + operation.slice(changeSymbol[0]);
  }
  else {

    if (operation < 0) {
      operation = Math.abs(operation);
    } else {
      operation = -Math.abs(operation);
    }

    if (isNaN(operation)) {
      operation = 'Syntax Error';
      screen.innerHTML = operation;
      operation = '';
      return;
    }
  }
  screen.innerHTML = operation;
}
