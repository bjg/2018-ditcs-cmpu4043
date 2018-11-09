import { interval, from, fromEvent, merge, mergeAll, pipe, subscribe } from "rxjs";
import { mapTo, scan, startWith } from "rxjs/operators";

function updateDisplay(inputString)
{
	display.value = inputString;
}

function attemptInput(value,inputString)
{
	let newString = inputString;

	if(numbers.includes(value))
	{
		if(value != "." || numbers.includes(newString.slice(-1)))
		{
			newString += value;
		}
	}
	else if(operators.includes(value))
	{
		if(!operators.includes(newString.slice(-1)))
		{
			newString += value;
		}
	}
	else if(value === "=")
	{
		newString = calulate(newString);
	}
	else if(value === "(")
	{
		if(numbers.includes(newString.slice(-1)) || newString.slice(-1) === "(" || newString.length === 0)
		{
			newString += value;
		}
	}
	else if(value === ")")
	{
		let openCount = countCharacter(newString,"(");
		let closeCount = countCharacter(newString,")");

		if(closeCount < openCount && (numbers.includes(newString.slice(-1)) || newString.slice(-1) === ")"))
		{
			newString += value;
		}
	}
	else if(value === "C")
	{
		newString = "";
	}
	else if(value === "_")
	{
		newString = plusMinus(newString);
	}

	return newString;
}

function setFunctionality(button)
{
	fromEvent(button, 'click').subscribe(mouseEvent => 
	{
		screen.displayString = attemptInput(mouseEvent.srcElement.value,screen.displayString);
		updateDisplay(screen.displayString);
	});
}

function countCharacter(inputString, character)
{
	let array = inputString.split('');
	let count = array.filter(x => x===character).length;
	return count;
}

function plusMinus(equationString)
{
	let str = equationString;

	if( str.slice(-1) === ")" )
	{
		let pos = -2

		while(str.length + pos > 0  &&   numbers.includes(str.slice(pos-1)[0]))
		{
			pos -= 1;
		}

		if( str.slice(pos-2,pos) === "(-" )
		{
			str = str.slice(0,pos-2) + str.slice(pos,-1)
		}
	}
	else if( numbers.includes(str.slice(-1)) )
	{
		let pos = -1;

		while(str.length + pos > 0  &&   numbers.includes(str.slice(pos-1)[0]))
		{
			pos -= 1;
		}

		str = str.slice(0,pos) + "(-" + str.slice(pos) + ")";
	}

	return str;
}

function isNumeric(number)
{
	return !isNaN(number);
}

function calulate(equationString)
{
	var tokens = getTokens(equationString);
	var rpn = getRPN(tokens);
	var answer = evaluateRPN(rpn);

	if(answer === null || isNaN(answer) )
	{
		return "";
	}
	else if(answer.toString()[0] === "-")
	{
		return "(" + answer.toString() + ")";
	}
	else
	{
		return answer.toString();
	}
}

function getTokens(input)
{
	var tokens = [];

	while(input.length > 0)
	{
		if(input.substring(0,2) === "(-")
		{
			let pos = 2;

			while(numbers.includes(input.substring(pos,pos+1)))
			{
				pos += 1;
			}

			if(input.substring(pos,pos+1) === ")")
			{
				tokens.push(input.substring(1,pos));
			}

			input = input.substring(pos+1);
		}
		else if(numbers.includes(input[0]))
		{
			let pos = 1;

			while(numbers.includes(input.substring(pos,pos+1)))
			{
				pos += 1;
			}

			tokens.push(input.substring(0,pos));
			input = input.substring(pos);
		}
		else
		{
			tokens.push(input[0]);
			input = input.substring(1);
		}
	}

	return tokens;
}

function getRPN(tokens)
{
	var opStack = [];
	var outQueue = [];

	tokens.forEach(function(token) 
	{
	  	if(isNumeric(token))
	  	{
	  		outQueue.push(token);
	  	}
	  	else if(operators.includes(token))
	  	{
	  		while(opStack.length > 0 && operators.indexOf(opStack[opStack.length-1]) > operators.indexOf(token))
	  		{
	  			var popValue = opStack.pop();
	  			outQueue.push(popValue);
	  		}
	  		opStack.push(token);
	  	}
	  	else if(token === "(")
	  	{
	  		opStack.push(token);
	  	}
	  	else if(token === ")")
	  	{
	  		while(opStack[opStack.length-1] != "(")
	  		{
	  			var popValue = opStack.pop();
	  			outQueue.push(popValue);
	  		}

	  		opStack.pop();
	  	}
	  	else
	  	{
	  		console.log("Invalid token in input array = " + token )
	  		return null;
	  	}
	});

	while(opStack.length > 0)
	{
		var popValue = opStack.pop();
	  	outQueue.push(popValue);
	}

	return outQueue;
}

function evaluateRPN(tokens)
{
	if(tokens === null)
	{
		return null;
	}
	var stack = [];
	tokens.forEach(function(token) 
	{
		if(operators.includes(token))
		{
			var num1 = stack.pop();
			var num2 = stack.pop();
			var result;

			switch(token)
			{
				case "*":
					result = num2 * num1;
					break;
				case "/":
					result = num2 / num1;
					break;
				case "+":
					result = num2 + num1;
					break;
				case "-":
					result = num2 - num1;
					break;
			}
			stack.push(result);
		}
		else
		{
			stack.push(parseFloat(token));
		}
	});
	return stack.pop();
}

var operators = ["+","-","*","/"];
var numbers = ["0","1","2","3","4","5","6","7","8","9","."];

var display = document.getElementById("display");

let screen = 
{
	displayString: ""
};

var buttons = document.getElementsByTagName("button");

for (let i = buttons.length - 1; i >= 0; i--) 
{
	setFunctionality(buttons[i]);
}

// document or div
fromEvent(document, 'keypress').subscribe(keyBoardEvent => 
{
	screen.displayString =  attemptInput(keyBoardEvent.key, screen.displayString);
	updateDisplay(screen.displayString);
});