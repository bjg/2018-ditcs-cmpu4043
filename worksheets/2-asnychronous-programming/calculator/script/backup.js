let stored = 0;
let singleDigit = true;
let activeString = "";
let ansDisplay = false;
let arthemeticCalc = false;

/*
function valueCalc(value) {
	x = parseFloat(value);

	if ((value == "(" || value == ")") && !arthemeticCalc) {
		document.getElementById("numberbox").value = value;
		arthemeticCalc = true;
	}
	else if (value == "C") {
		activeString = "";
		document.getElementById("numberbox").value = 0;
		singleDigit = true;
		arthemeticCalc = false;
	}
	else if (arthemeticCalc == false) {
		if (value == "." && ansDisplay == false) {
			document.getElementById("numberbox").value += ".";
			singleDigit = false;
		}
		else if (Number.isFinite(x)) {
			if ((singleDigit == true || ansDisplay == true) && document.getElementById("numberbox").value == "-") {
				document.getElementById("numberbox").value += x;
				singleDigit = false;
				ansDisplay = false;
			}
			else if (singleDigit == true || ansDisplay == true) {
				document.getElementById("numberbox").value = x;
				singleDigit = false;
				ansDisplay = false;
			}
			else {
				document.getElementById("numberbox").value += x;
			}
		}
		else {
			arthSymbol(value);
		}
	}
	else {
		if (value == "=") {
			activeString = document.getElementById("numberbox").value
			calcAnswer();
		}
		else {
			document.getElementById("numberbox").value += value;
		}
	}
}
*/

/*
function arthSymbol(arthSymbol) {
	switch (arthSymbol) {
		case ".":
			if (ansDisplay == false) {
				document.getElementById("numberbox").value += arthSymbol
			}
			else {
				document.getElementById("numberbox").value = arthSymbol
				ansDisplay = false;
			}
			break;
		case "±":
			if (singleDigit == true && document.getElementById("numberbox").value == "0") {
				document.getElementById("numberbox").value = "-";
			}
			else if (ansDisplay == true) {
				document.getElementById("numberbox").value = "-";
			}
			break;
		case "(":
			document.getElementById("numberbox").value += arthSymbol
			break;
		case ")":
			document.getElementById("numberbox").value += arthSymbol
			break;
		default: 
			boxValue = document.getElementById("numberbox").value;
			if (activeString == "") {
				activeString = "(" + boxValue + arthSymbol;
				singleDigit = true;
			}
			else if (arthSymbol == "=") {
				activeString += boxValue + ")";
				// String replace
				calcAnswer();
			}
			break;
	}
}

function calcAnswer() {
	activeString = activeString.replace("X", "*");
	activeString = activeString.replace("÷", "/");
	console.log("Active: " + activeString);
	try {
		document.getElementById("numberbox").value = eval(activeString);
		ansDisplay = true;
	} catch (e) {
		if (e instanceof SyntaxError) {
			document.getElementById("numberbox").value = "Error";
		}
	}
	singleDigit = true;
	arthemeticCalc = false;
	singleDigit == true;
	ansDisplay == true;
	activeString = "";
}
*/

function addToInput(input) {
	buffer = document.getElementById("numberbox").value;
	buffer = buffer.replace("X", "*");
	buffer = buffer.replace("÷", "/");

	if (input == "=") {
		try {
			document.getElementById("numberbox").value = eval(document.getElementById("numberbox").value);
		} catch (e) {
			if (e instanceof SyntaxError) {
				document.getElementById("numberbox").value = "Error";
			}
		}
	}
	else (input == "C") {
		document.getElementById("numberbox").value = 0;
	}
	else if (document.getElementById("numberbox").value == 0) {
		document.getElementById("numberbox").value = input;
	}
	else {
		document.getElementById("numberbox").value += input;
	}
}

function buttonClick(buttonName) {
	// valueCalc(buttonName.innerHTML);
	addToInput(buttonName.innerHTML);
}

document.onkeypress = function(keyPress) {
    // valueCalc(keyPress.keyCode);
    validKeys = [1,2,3,4,5,6,7,8,0,")","(","C", "c", "+", "-", "=", "."];
    keyString = String.fromCharCode(keyPress.keyCode);
    console.log(keyPress.keyCode);
    if (keyString == "/") {
    	addToInput("÷");
    	// valueCalc("÷");
    }
    else if (keyString == "*" || keyString == "x" || keyString == "X") {
    	addToInput("X");
    	// valueCalc("X");
    }
    else if (keyPress.keyCode == 13) {
    	addToInput("X");
    	// valueCalc("=");
    }
    else {
    	for (i = 0; i < validKeys.length; i++) {
	    	if (keyString == validKeys[i]) {
	    		console.log(validKeys[i]);
	    		addToInput(validKeys[i]);
	    		// valueCalc(validKeys[i]);
	    	}
	    }
    }
};