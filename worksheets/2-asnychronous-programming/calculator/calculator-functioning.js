/***
 *	Name: Gabriel Grimberg
 *	Module: Rich Web Applications
 *	Lab: 2
 *	Question: 1
 *	Type: Main JavaScript for file "calculator-functioning.html"
 ***/

/* Variables to work the calculator. */
var currentCalculatorScreen = ""; 	// What gets shown on the calculator display.
var carryNumberOverFlag = false; 	// Flag if there is a carry over. 
var numberCarriedOver = ""; 		// Store the carried over number.
var firstNumberEntered = 0; 		// First number entered.
var secondNumberEntered = 0; 		// Second number entered.
var clearDisplayFlag; 				// Flag if cleared button was pressed.
var currentOperation = ""			// Last operator pressed.

/* Function for when a number is pressed on the calculator via the mouse. */
function numberPressed(buttonPressed) {
	
	// Check if the Clear button has been pressed.
	if (clearDisplayFlag) {
		
		currentCalculatorScreen = buttonPressed; // Store the number that was pressed into a variable.
		clearDisplayFlag = false; // Change flag.
		
	} else { // If number longer than a digit.
		
		currentCalculatorScreen = currentCalculatorScreen + buttonPressed;
		
	}
	
	// Change the value on the screen of the calcuator.
	calculator.theScreen.value = currentCalculatorScreen;
	
	
	// Flag to deal when an operation has been hit.
	if (carryNumberOverFlag) {
		
		firstNumberEntered = numberCarriedOver;
		secondNumberEntered = currentCalculatorScreen + buttonPressed;
		calculator.theScreen.value = currentCalculatorScreen;
		carryNumberOverFlag = false;
	}

}

var operations = {
	
	'+': function(a,b) { return parseFloat(a) + parseFloat(b) }, // Operation to Add.
	'-': function(a,b) { return parseFloat(a) - parseFloat(b) }, // Operation to Subtract.
	'*': function(a,b) { return parseFloat(a) * parseFloat(b) }, // Operation to Multiply.
	'/': function(a,b) { return parseFloat(a) / parseFloat(b) }, // Operation to Divide.
	'±': function(a,b) { return parseFloat(a) +- parseFloat(b) }, // Operation to Add/Subtract.	
};

/* Function for when an operation is pressed */
function operationPressed(pressedOpperation) {
	
	// Switch flag to false.
	clearDisplayFlag = false;
	
	// Show the operation that was pressed on the screen.
	calculator.theScreen.value = pressedOpperation;
	
	// Flag to determine if there is a continuation of operation after the first one.
	if (carryNumberOverFlag) {
		
		firstNumberEntered = 0;  // Reset the first number variable.
		secondNumberEntered = 0; // Reset the second number variable.
		
	} else { //If Flag is false put what's on the display into the first number variable.
		
		firstNumberEntered = currentCalculatorScreen
		secondNumberEntered = 0;
	}
	
	currentOperation = pressedOpperation; // The operation that was pressed, put it into the currentOperation variable.
	
	firstOrSecondNumberDecision();
	
	currentCalculatorScreen = ""; // Clear the calculator screen for the next entry.
}

/* Function for when the equals sign is pressed */
function showSum() {
	
	firstOrSecondNumberDecision();
	
	// If the first and second number variables have a number contained.
	if (firstNumberEntered !== 0 && secondNumberEntered !== 0) {
		
		// The result of the operation is assigned to first number variable.
		firstNumberEntered = operations[currentOperation](firstNumberEntered, secondNumberEntered);
	}
	
	// Set the carry over flag back to true, allowing to be entered again as there is another number for entry.
	carryNumberOverFlag = true;
	
	numberCarriedOver = firstNumberEntered; // The first number contains result of last operation, put it into carry over variable.
	calculator.theScreen.value = parseFloat(firstNumberEntered.toFixed(2)); // Display the result on the calculator screen up to 2 decimal places/
	firstNumberEntered = 0; // Reset first number variable.
	secondNumberEntered = 0; // Reset second number variable.
	currentCalculatorScreen = ""; // Reset the calculator screen variable, display still contains last result.
}

/* Function that when C is pressed all the variables are reset */
function screenClear() {
	
	calculator.theScreen.value = "0";
	currentCalculatorScreen = "";
	carryNumberOverFlag = false;
	numberCarriedOver = "";
	firstNumberEntered = 0;
	secondNumberEntered = 0;
	clearDisplayFlag;
	currentOperation = ""
}

/* Function created to stop repition of code */
function firstOrSecondNumberDecision() {
	
	// Putting the number that was last pressed into either the first or second number variable.
	if (firstNumberEntered === 0) {
			
		firstNumberEntered = currentCalculatorScreen;
			
	} else {
			
		secondNumberEntered = currentCalculatorScreen;
	}
	
}

/* Event Listner for Keyboard Functionality */
window.addEventListener('keypress', (event) => {
	
	let keyPress = String.fromCharCode(event.keyCode); // Convert the key pressed.
	
	// If whatever key was pressed pass it onto the relevant function.
	if (keyPress == 0) { numberPressed(keyPress); } 
	else if (keyPress == 1) { numberPressed(keyPress); }
	else if (keyPress == 2) { numberPressed(keyPress); }
	else if (keyPress == 3) { numberPressed(keyPress); }
	else if (keyPress == 4) { numberPressed(keyPress); }
	else if (keyPress == 5) { numberPressed(keyPress); }
	else if (keyPress == 6) { numberPressed(keyPress); }
	else if (keyPress == 7) { numberPressed(keyPress); }
	else if (keyPress == 8) { numberPressed(keyPress); }
	else if (keyPress == 9) { numberPressed(keyPress); }
	else if (keyPress == '.') { numberPressed(keyPress); }
	else if (keyPress == '(') { numberPressed(keyPress); }
	else if (keyPress == ')') { numberPressed(keyPress); }
	else if (keyPress == '+') { operationPressed(keyPress); }
	else if (keyPress == '-') { operationPressed(keyPress); }
	else if (keyPress == '*') { operationPressed(keyPress); }
	else if (keyPress == '/') { operationPressed(keyPress); }
	else if (keyPress == '±') { operationPressed(keyPress); }
	else if (keyPress == '=') { showSum(); }
	else if (keyPress == 'c' || keyPress == 'C') { screenClear(); }
});