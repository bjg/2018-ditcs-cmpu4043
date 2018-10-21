/* VARIABLES */

// global variables
let operator = '';				// most recent operator
let equation = [];				// the equation to be calculated
let result = '';					// result of calculation
let error_flag = false;		// check for errors in calculation

// array to store buttons.innerHTML
let buttons = [];
let operators = [];
let symbols = [];

// main display/input element
let input = document.getElementById("input");

// arrays to store the various buttons
let btns = document.getElementsByClassName("num");
let syms = document.getElementsByClassName("sym");
let ops = document.getElementsByClassName("op");

// variables to store single elements
let equal = document.getElementById("eq");
let clear = document.getElementById("clr");
let change = document.getElementById("change");

// populate the buttons array
for (let i = 0; i < btns.length; i++)
{
	buttons[i] = btns[i].innerHTML;
}
// TESTING
console.log(buttons);

// populate the operators array
for (let i = 0; i < ops.length; i++)
{
	operators[i] = ops[i].innerHTML;
}
// TESTING
console.log(operators);

// populate the symbols array
for (let i = 0; i < syms.length; i++)
{
	symbols[i] = syms[i].innerHTML;
}
// TESTING
console.log(symbols);

/* LISTENERS */

// listener to handle keypresses
document.addEventListener('keypress', function(event)
{
	let pressed = String.fromCharCode(event.keyCode);

	if(pressed === '=')
	{
		equals();
	}
	else if (pressed === 'c')
	{
		clearDisplay();
	}
	else if (buttons.includes(pressed))
	{
		displayInput(pressed);
	}
});

// listener to handle keydown: backspace / clear()
document.addEventListener('keydown', function(event)
{
	if (event.code === 'Backspace')
	{
		clearDisplay();
	}
	else if (event.code === 'Enter')
	{
		equals();
	}
});

// listener to handle clicks
document.onclick = function(event)
{
	// get the clicked element
	let target = event.target || event.srcElement;

	// get the element's innerHTML value to decide how to proceed
	let clicked = target.innerHTML;

	// if its an operator
	if (operators.includes(clicked))
	{
		displayOperator(clicked);
	}
	// if its a number
	else if (buttons.includes(clicked))
	{
		displayInput(clicked);
	}
	// if its a symbol
	else if (symbols.includes(clicked))
	{
		displayInput(clicked);
	}
	// if its the CLEAR button
	else if (clicked === clear.innerHTML)
	{
		clearDisplay();
	}
	// if its the EQUALS button
	else if (clicked === equal.innerHTML)
	{
		equals();
	}
	// if its the changeSign button
	else if (clicked === change.innerHTML)
	{
		changeSign();
	}
};

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
		// check if the symbol is a number
		if(buttons.includes(symbol))
		{
			// convert it to an Integer
			symbol = symbol * 1;
		}
		// push the symbol to the array
		equation.push(symbol);

		// update display
		input.innerHTML = input.innerHTML + symbol;
	}

}

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

// function to handle the mathematical operators
function displayOperator(symbol)
{
	// fix font size for display purposes
  symbol = symbol.toLowerCase();

  // update the global operator
  operator = symbol;

	// add the operator to the equation
	equation.push(operator);

  // add the operator to the input box display
	input.innerHTML = input.innerHTML + symbol;
}

// function to perform the calculation
function equals()
{
	// get the equation as a string
	let eq = equation.join('');

	// handle the expected values for multiply and divide
	eq = eq.replace('x', '*');
	eq = eq.replace('÷', '/');

	try
	{
		// calculate the equation
		float_result = eval(eq);

		// check result for float values
		if (Number.isInteger(float_result))
		{
			result = float_result;
		}
		else
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
	catch(err)
	{
		// give feedback
    input.innerHTML = "ERROR";

		// clear the global variables
		clearVariables();

		// set the error flag
		error_flag = true;
	}
}

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
