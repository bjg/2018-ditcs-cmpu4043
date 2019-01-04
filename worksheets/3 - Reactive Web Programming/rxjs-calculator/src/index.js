//Had to make a stream only for keyboard input as the html buttons have caused me
//No end of issues that lasted hours

import {fromEvent, merge} from 'rxjs';
import {map, filter} from 'rxjs/operators';
import './style.css'
//Declare variables for displayed value in calculator and expression
let display;
let expression;

//Event handler for loading of window
window.onload = function()
{
	display = document.getElementById("currentScreen");
	expression = "";
}

//Clearing screen of values
function clearScreen()
{
	expression = "";
	display.value = expression;
}

//Appending expression typed to the calculator text field
function append(char)
{
	expression += char;
	display.value = expression;
}

//Evaluating expression in textbox
function evalScreen()
{
	expression = eval(expression);
	
	display.value = expression;
}
//Pipe checking and filtering all keyboard input and passing result as key
const keyPress = fromEvent(document, 'keypress').pipe(map(event => event.key)).pipe(filter(key => "0123456789-+/*0.()".indexOf(key) != -1 || key == 'c' || key == 'C' || key == '='));
//Mouse related input doesn't work
const mouseClick = fromEvent(document, 'click').pipe(map(event => event.target.id));
//SHOULD merge mouse and keyboard input
const input = merge(keyPress, mouseClick);
input.subscribe(function(key) 
{
	//If any of the numbers or operators below are typed, append to calculator screen
    "0123456789-+/*0.()".indexOf(key) != -1? append(key): null;
	//If the key is c or C then clear screen
    if (key == 'c' || key == 'C')
	{
		clearScreen();
	}
	//If key pressed is equal to = then evaluate the calculator screen
    if (key == '=')
	{
		evalScreen();
	}
}); 