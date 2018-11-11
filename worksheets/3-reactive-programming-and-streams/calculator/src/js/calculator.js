/* Author: Nicola Mahon C15755031 */

// RxJS Imports
import { pluck } from "rxjs/operators";
import { pipe, merge, fromEvent } from "rxjs";

// CSS Import
import '../css/calculator.css';

/* VARIABLES */

// global variables
let operator = '';		// most recent operator
let equation = [];		// the equation to be calculated
let result = '';		// result of calculation
let error_flag = false;		// check for errors in calculation
let operators = '+,-,*,x,/,÷';
let numbers = '0123456789';
let symbols = '().';
let last_sym = '';

// main display/input element
let input = document.getElementById("input");

// arrays to store the various buttons
let btns = document.getElementsByClassName("btn");

// create two streams for clicks and keypresses and merge them
const input$ = merge(
	fromEvent(btns, 'click')
	.pipe(pluck('target', 'innerHTML')),
	fromEvent(document, 'keypress')
	.pipe(pluck('key'))
);

// subscribe to the stream to observe inputs
input$.subscribe(input => {
	if(input === 'C' || input === 'c')
	{
		clearDisplay();
	}
	else if (input === '=' || input === 'Enter')
	{
		equals();
	}
	else if (input === '±')
	{
		changeSign();
	}
	else
	{
		// ignore all other inputs (i.e. non-calculator specific characters)
		if(numbers.includes(input) || operators.includes(input) || symbols.includes(input))
		{
			displayInput(input);
		}
	}
});


/* FUNCTIONS TO CONTROL CALCULATOR */

// to display numbers/characters and add to equation
function displayInput(symbol)
{
	// check there are no errors in the buffer
	if(error_flag)
	{
		input.innerHTML = "ERROR";
	}
	else
	{
		// convert it to an Integer
		let number = symbol * 1;

		// check if number is integer
		if(Number.isInteger(number))
		{
			// push the symbol to the array
			equation.push(number);
		}
		// if the sumbol is an operator
		else if (operators.includes(symbol))
		{
			// update global operator
			operator = symbol; // used for changeSign()
			// push the symbol to equation
			equation.push(symbol);
		}
		else
		{
			// push the symbol to equation
			equation.push(symbol);
		}

		// update display
		input.innerHTML = input.innerHTML + symbol;
	}

}	// end function displayInput()

// clear the global variables
function clearVariables()
{
	equation = [];
	operator = '';
	result = '';
	error_flag = false;
}

// function to clear the display
function clearDisplay()
{
	// clear the input box
	input.innerHTML = '';

	// clear global variables
	clearVariables();
}

// function to perform the calculation
function equals()
{
	// if the equation has brackets but no operator outside the brackets
	// we assume multiplication of values inside and outside the brackets
	for (let i = 1; i < equation.length-1; i++) 
	{
		// if the element left of the bracket is not an operator
		if(equation[i] === '(' && !operators.includes(equation[i-1]))
		{
			// insert a multiplier into the equation
			equation.splice(i, 0, 'x');
		}
		// if the element right of the bracket is not an operator
		else if(equation[i] === ')' && !operators.includes(equation[i+1]))
		{
			// insert a multiplier into the equation
			equation.splice(i+1, 0, 'x');
		}
	}

	// get the equation as a string
	let eq = equation.join('');
	
	// handle the expected values for multiply and divide
	eq = eq.replace('x', '*');
	eq = eq.replace('÷', '/');

	// to store the result of the calculated equation
	let float_result = 0;

	try    // try calculate the equation
	{
		// calculate the equation
		float_result = eval(eq);

		// check result for float values
		if (Number.isInteger(float_result))
		{
			// update result
			result = float_result;
		}
		else    // number is float
		{
			// set decimal values to 2 places
			result = float_result.toFixed(2);
		}

		// display the result
		input.innerHTML = result;

		// reset the arrays
		equation = [];

		// store the result in the equation to allow for further calculations
		equation.push(result);

	}
	catch(err)    // catch any weird stuff
	{
		// give feedback
		input.innerHTML = "ERROR";

		// clear the global variables
		clearVariables();

		// set the error flag
		error_flag = true;

		console.log(err);
	}
}	// end function equals()

// to switch the last number entered to positive/negative
function changeSign()
{
	// check if this is the first element
	if(operator === '')
	{
		// loop through the equation
		for (let j = 0; j < equation.length; j++)
		{
			// find the last integer entered
			if(Number.isInteger(equation[j]))
			{
				console.log("INSIDE check for integer: " + equation[0]);
				// switch the integer's sign to positive/negative
				equation[j] = equation[j] * -1;
				// update the display
				input.innerHTML = equation.join('');
				// number is found, dont search any further
				break;
			}
		}
	}
	else    // this is not the first number
	{
		// loop backwards through the equation
		console.log("not the first number");
		for (let i = equation.length-1; i > 0; i--)
		{
			// find the last known operator
			if(equation[i] === operator)
			{
				// now move forward in the array
				for (let k = i+1; k < equation.length; k++)
				{
					// find the first Integer entered after the operator
					if(Number.isInteger(equation[k]))
					{
						// switch the integer's sign to positive/negative
						equation[k] = equation[k] * -1;

						// handle a negative Integer when the operator is also minus
						if(equation[i] === '-')
						{
							// switch the integer's sign back to positive
							equation[k] = equation[k] * -1;
							// change the operator to a plus
							equation[i] = '+';
							// update the global operator
							operator = '+';
						}
						// for switching the Integer back to negative
						else if (equation[i] === '+')
						{
							// switch the integer's sign back to negative
							equation[k] = equation[k] * -1;
							// change the operator to a minus
							equation[i] = '-';
							// update the global operator
							operator = '-';
						}

						// update the display with the new equation
						input.innerHTML = equation.join('');
						// number is found, dont search any further
						break;
					}
				}
				// operator is found, dont search any further
				break;
			}
		}
	}
}
