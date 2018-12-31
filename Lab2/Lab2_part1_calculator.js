//Add the numbers to the screen
function getNumber(num)
{
	var display = document.getElementById('display');
	switch(num)
	{
		case 1 :
			display.value += 1 ;
			break;
		case 2 :
			display.value += 2 ;
			break;
		case 3 :
			display.value += 3 ;
			break;
		case 4 :
			display.value += 4 ;
			break;
		case 5 :
			display.value += 5 ;
			break;
		case 6 :
			display.value += 6 ;
			break;
		case 7 :
			display.value += 7 ;
			break;
		case 8 :
			display.value += 8 ;
			break;
		case 9 :
			display.value += 9 ;
			break;
		case 0 :
			display.value += 0 ;
			break;
		case '.' :
			display.value += '.' ;
	}

}
//This will show if the number has been negated or not
let n = 1 ;

//Get the operator
function getOperator(op)
{
	var display = document.getElementById('display');

	switch(op)
	{
		case '+' :
			display.value += '+' ;
			break;
		case '-' :
			display.value += '-' ;
			break;
		case '*' :
			display.value += '*' ;
			break;
		case '/' :
			display.value += '/' ;
			break;
		case '+/-' :
			if(n === 1)
			{
				display.value = '-' + display.value;
				n = 0 ;
			}
			else
			{
				display.value = display.value.substring(1);
				n = 1 ;		
			}
			break;
		case '(' :
			display.value += '(' ;
			break;
		case ')' :
			display.value += ')' ;
			break;
	}
}

function calculate()
{
	display = document.getElementById('display').value;
	document.getElementById('display').value = (eval(display));
}

//Clear the screen
function clearScreen()
{
	document.getElementById('display').value = "";
}