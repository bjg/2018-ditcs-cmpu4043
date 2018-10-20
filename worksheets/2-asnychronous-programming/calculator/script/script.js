/*
	Name: Robert Vaughan
	StudentNo: C15341261

	Why is this code massive? I thought
	that just using eval was cheating. So I made this have
	classic calculator behaviour
*/

let ansDisplay = false;
let bracketCalc = false;
let arethCheck = false;

let areth = ["+", "-", "÷", "X"];

let storeString = "";

/*
	Function that clears calculator data
*/
function clearData() {
	ansDisplay = false;
	bracketCalc = false;
	arethCheck = false;
	storedString = "";
	document.getElementById("numberbox").value = "0";
}

/*
	Function that evaulates a users calculator input
*/
function evaluateInput(input) {
	// Try catch to handle poor input syntax
	try {
		storedString = storedString.replace("X", "*");
		storedString = storedString.replace("÷", "/");
		
		storedString = eval(storedString);
		document.getElementById("numberbox").value = eval(storedString);
	} catch (e) {
		if (e instanceof SyntaxError) {
			document.getElementById("numberbox").value = "Error";
		}
	}
	ansDisplay = true;
	arethCheck = false;
	storedString = "0";
}

/*
	Function that generates the calculations for "bracket mode"
	If a user inputs a "(", they can perform a full calculation
	in one line, rather than the classic calculator mode
*/
function bracketCalculations(input, buffer) {
	if (input == "=" && !ansDisplay) {
		storedString = document.getElementById("numberbox").value;
		evaluateInput(input);
		bracketCalc = false;
	}
	else if (input != "±" && input != "C") {
		if (buffer == "0") {
			document.getElementById("numberbox").value = input;
		}
		else {
			document.getElementById("numberbox").value += input;
		}
	}
	else if (input == "±") {
		if (document.getElementById("numberbox").value.charAt(0) == "-") {
			document.getElementById("numberbox").value = buffer.substring(1, document.getElementById("numberbox").value.length);
		}
		else {
			document.getElementById("numberbox").value = "-" + document.getElementById("numberbox").value;
		}
	}
}

/*
	This function handles the calculators input in a classic simplic style.
	If a user enters 1, the value will display, if they then enter an arithmetic value,
	it is stored in the input buffer but not displayed on the input bar. When they enter
	the next value, they the current value in the input bar is replaced with the value
	just entered while also being added to the input buffer
*/
function classicCalc(input, buffer) {
	value_num = parseFloat(input);

	if (input == "=" && !ansDisplay) {
		evaluateInput(input);
	}
	//Handling when value is number or "."
	else if (Number.isFinite(value_num) || input == ".") {
		if (buffer == "0") {
			document.getElementById("numberbox").value = input;
			storedString = input;
		}
		else if (arethCheck) {
			document.getElementById("numberbox").value = input;
			storedString += input;
			arethCheck = false;
		}
		else if (ansDisplay) {
			document.getElementById("numberbox").value = input;
			storedString = input;
			ansDisplay = false;
		}
		else {
			document.getElementById("numberbox").value += input;
			storedString += input;
		}
	}
	// Plus-minus handling
	else if (input == "±") {
		currentValPos = storedString.length - buffer.length;

		console.log("Current Pos: " + currentValPos);
		
		// Handles each edge case of the calculator
		if (ansDisplay) {
			ansDisplay = false;
			arethCheck = false;
			if (buffer.charAt(0) == "-") {
				storedString = buffer.substring(1, buffer.length);
				document.getElementById("numberbox").value = storedString;
			}
			else {
				storedString = "-" + buffer;
				document.getElementById("numberbox").value = storedString
			}
		}
		else if (buffer.charAt(currentValPos) == "-") {
			storedString = storedString.substring(0, currentValPos);
			storedString += "-" + buffer;
			document.getElementById("numberbox").value = storedString;
		}
		else {
			if (storedString == "0") {
				storedString = "-";
				document.getElementById("numberbox").value = storedString;
			}
			else {
				storedString = storedString.substring(0, currentValPos);
				storedString += "-" + buffer;
				document.getElementById("numberbox").value = "-" + buffer;
			}
		}
		ansDisplay = false
	}

	// Loop to check if the users input was an arithmetic
	// keypress/button
	for (i = 0; i < areth.length; i++) {
		if (input == areth[i]) {
			if (ansDisplay == true) {
				storedString = document.getElementById("numberbox").value;
				storedString = buffer + input;
				arethCheck = true;
				ansDisplay = false;
				break;
			}
			if (arethCheck == false) {
				storedString = storedString + input;
				arethCheck = true;
				break;
			}
			console.log(storedString);
		}
	}
}

/*
	This function is to handle the whether the user
	is performing a bracket mode or classic calculator operation
*/
function addToInput(input) {
	buffer = document.getElementById("numberbox").value;
	buffer = buffer.replace("X", "*");
	buffer = buffer.replace("÷", "/");

	// Clears the calculator
	if (input == "C") {
		clearData();
		console.log("Clear");
	}

	// Checks if a bracket case is made
	if (input == "(" && !bracketCalc) {
		bracketCalc = true;
		storedString = "";
		ansDisplay = false;
		document.getElementById("numberbox").value = storedString;
	}

	// Performs bracket logic
	if (bracketCalc) {
		bracketCalculations(input, buffer);
	}

	if (!bracketCalc) {
		classicCalc(input, buffer);
	}
}

// When a button is pressed, this function
// extracts the buttons label (innerHTML)
function buttonClick(buttonName) {
	// valueCalc(buttonName.innerHTML);
	addToInput(buttonName.innerHTML);
}

/*
	Listening
*/
document.onkeypress = function(keyPress) {
	validKeys = ["1","2","3","4","5","6","7","8","9","0",
		")","(", "C", "+", "-", "=", "."];
	keyString = String.fromCharCode(keyPress.keyCode);
	
	// Conditions to ensure the the users input
	// a valid key press 
	if (keyString == "/") {
		addToInput("÷");
	}
	else if (keyString == "*" || keyString == "x" || keyString == "X") {
		addToInput("X");
	}
	else if (keyPress.keyCode == 13) {
		keyPress.preventDefault();
		addToInput("=");
	}
	else {
		// Loop to iterator over valid keys
		for (i = 0; i < validKeys.length; i++) {
			if (keyString == validKeys[i]) {
				console.log(validKeys[i]);
				addToInput(validKeys[i]);
				break;
			}
		}
	}
};