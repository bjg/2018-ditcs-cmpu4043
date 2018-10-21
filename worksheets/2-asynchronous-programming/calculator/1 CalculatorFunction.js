//Due to poor time management I didn't get the front end of the calculator finished, 
//an example function prints to the console to demonstrate the calculation for the calculator
function initialisation()
{
	var numButtons = document.getElementsByClassName("numberInput");
	for (var i = 0; i < numButtons.length; i++) 
	{
		numButtons[i].onclick = numInput;
	}

	var opButtons = document.getElementsByClassName("operatorInput");
	for (var i = 0; i < opButtons.length; i++) 
	{
		opButtons[i].onclick = opInput;
	}

	var actButtons = document.getElementsByClassName("actionInput");
	for (var i = 0; i < actButtons.length; i++) 
	{
		actButtons[i].onclick = actInput;
	}

	display = document.getElementById("numberDisplay");
	currentNumber = 0;
}

function addNum(num)
{
	log("num " + num);
}

function addOp(op)
{
	log("op " + op);
}

function addAct(act)
{
	log("act " + act);
}

function numInput()
{
	addNum(this.value);
}

function opInput()
{
	addOp(this.value);
}

function actInput()
{
	addAct(this.value);
}

function keyboardInput(event) 
{
    var char = event.which || event.keyCode;
    log(char);
}

//Calculation
function isNumeric(number)
{
	return !isNaN(number);
}

function log(text)
{
	console.log(text)
	// var logDiv = document.createElement("div");

	// logDiv.innerHTML = text;

	// body.appendChild(logDiv);
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
	  	else if(operators.indexOf(token) > -1)
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

	  		opStack.pop();//Pop the left bracket to discard it 
	  	}
	  	else
	  	{
	  		console.log("Invalid token in input array")
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
	var stack = [];
	tokens.forEach(function(token) 
	{
		log(stack);
		if(operators.indexOf(token) > -1)
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

initialisation();
var body = document.getElementById("main");

var operators = ["+","-","*","/"];

var tokens = [];
tokens = ["4", "+", "18", "/", "(", "9", "-", "3", ")"];

rpn = getRPN(tokens);
log(rpn);

answer = evaluateRPN(rpn);
log("Answer = " + answer);