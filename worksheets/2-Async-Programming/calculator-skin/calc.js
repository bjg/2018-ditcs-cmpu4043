var numStore = [];
var numDisplay = [];
var operator= [];
var displayNumber = 0;

decimalFlag = 0;

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(key) {
	let keyCode = key.keyCode;
	switch(keyCode)
	{
		case 48:
			listen(0);
			break;
		case 49:
			listen(1);
			break
		case 50:
			listen(2);
			break;
		case 51:
			listen(3);
			break;
		case 52:
			listen(4);
			break;
		case 53:
			listen(5);
			break;
		case 54:
			listen(6);
			break;
		case 55:
			listen(7);
			break;
		case 56:
			listen(8);
			break;
		case 57:
			listen(9);
			break;
		default:
			break;
	}
}

function listen(clickedId)
{

	var usedNumber = 0;
	var clickedCheck = parseInt(clickedId, 10);

	if(!(isNaN(clickedCheck)))
	{
		numDisplay.push(parseInt(clickedCheck, 10));	
		for(var i = 0; i < numDisplay.length; i++)
		{
			/*
			To display the appropriate number, multiply the number in the array element
			by 10 to the power of its  inverse element number with regards to the lenth of the array
			e.g. an array like ["4","1","2"] would look like
			displayNumber = (4 x 10^2) + (1 x 10^1) + (2 x 10^0)
			*/
			usedNumber += numDisplay[i] * Math.pow( 10, (numDisplay.length - ( i+1 )) );
		}
		displayNumber = usedNumber;
		usedNumber = 0;
		displayCurrentNum(displayNumber);
	}
	else
	{
		nonNumber(clickedId);
	}
}

function displayCurrentNum(num)
{
	document.getElementById("screen").innerHTML = num;
}


function nonNumber(clickedId)
{
	//Based on the mathemathical term BODMAS
		switch(clickedId)
		{
			case '-':
				operator.push(1);
				cleanUp();
				break;
			case "+":
				operator.push(2);
				cleanUp();
				break;
			case "x":
				operator.push(3);
				cleanUp();
				break;
			case "/":
				operator.push(4);
				cleanUp();
				break;
			case "=":
				cleanUp();
				equals();
				break;
			case "c":
				displayNumber = 0;
				displayCurrentNum(displayNumber);
				clearNumDisplay();
				clearNumStore();
				clearOperator();
				break;
			case "plusMinus":
				plusMinus();
				break;
			case "(":
				break;
			case ")":
				break;
			case ".":
				break;
			default:
				break;
		}
}
//numStore and operator
function equals()
{
	var answer = numStore[0];
	for(var i = 0; i < operator; i++)
	{
		switch(operator[i])
		{
			case 4:
				answer /= numStore[i+1];
				break;
			case 3:
				answer *= numStore[i+1];
				break;
			case 2:
				answer += numStore[i+1];
				break;
			case 1:
				answer -= numStore[i+1];
				break;
			default:
				break;
		}
		if(typeof useOper != "string")
		{
			displayCurrentNum(answer);
			clearNumDisplay();
			clearNumStore();
			clearOperator();
			displayNumber = answer;

		}
	}
}

//Needs to be used after the negative number is pressed
function plusMinus()
{
	//numStore[numStore.length - 1] *= -1;
	displayNumber *= -1;
	displayCurrentNum(displayNumber);
}

function cleanUp()
{
	displayCurrentNum(0);
	clearNumDisplay();
	numStore.push(displayNumber);
	displayNumber = 0;
}

function clearNumDisplay()
{
	while(numDisplay.length > 0)
	{
		numDisplay.pop();
	}
}

function clearOperator()
{
	while(operator.length > 0)
	{
		operator.pop();
	}
}

function clearNumStore()
{
	while(numStore.length > 0)
	{
		numStore.pop();
	}
}