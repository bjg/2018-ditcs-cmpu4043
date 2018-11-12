import { Rx } from 'rxjs/Rx'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import '../css/style.css';

const buttons = document.getElementsByClassName("button");
const inputStream = Observable.from(buttons)
    .map(btn => Observable.fromEvent(btn, 'click')
    .mapTo(btn.textContent))
    .mergeAll()
    .merge(Observable.fromEvent(document, 'keypress')
    .pluck('key'));

let screen_output = document.getElementById("calculator_screen_value");
let expression = "";

inputStream.subscribe(key => {
  if(key === 'C' || key ==='c') {
    clear_screen();
  }

  else if(key === 'x' || key === 'x') {
    key = key.replace(key, "*");
    take_input(key)
  }

  else if(key === '÷'){
    key = key.replace(key, "/");
    take_input(key)
  }

  else if(key === '±'){
    make_negative()
  }

  else if (key === '='|| key === 'Enter') {
    equal_press();
  }

  else {
    take_input(key)
  }
});

//Add the input into the expression.
function take_input(input)
{
  expression += String(input);
  screen_output.innerHTML = expression;
}

//After equals is pressed calculate the result of the expression, give an error
//if necessary.
function equal_press()
{
  try
  {
      screen_output.innerHTML = String(eval(expression));
      expression = "";
  }
  catch(err)
  {
      screen_output.innerHTML = "Error";
      expression = "";
  }
}

//Making use of the negative button, only to be used at the start of an expression.
function make_negative()
{
  if(expression == "")
  {
    expression += '-';
  }
}

//Clears the screen.
function clear_screen()
{
  expression = ""
  screen_output.innerHTML = "0";
}
