var num1 = null;
var num2 = null;

var operator=0;

// to change the number in the screen
// document.getElementById("screen").innerHTML = clicked_id;


//displayNumber = displayNumberArray[i] * Math.pow(10, (displayNumberArray.Len-(i+1))) 

function listen(clicked_id)
{
	if(!(Number.isNaN(clicked_id)))
	{
		if(num1 == null)
		{
			num1 = parseInt(clicked_id, 10);	
			document.getElementById("screen").innerHTML = clicked_id;
		}
		else if(num2 == null)
		{
			num2 = parseInt(clicked_id, 10);
			document.getElementById("screen").innerHTML = clicked_id;
		}
		else
		{
			console.log(clicked_id + " hey guy");
			nonNumber(clicked_id);
		}
	}

}


function nonNumber(clicked_id)
{
	//Based on the mathemathical term BODMAS
		switch(clicked_id)
		{
			case '-':
				operator = 1;
				break;
			case "+":
				operator = 2;
				break;
			case "x":
				operator = 3;
				break;
			case "/":
				operator = 4;
				break;
			default:
		}

		console.log(operator);
}