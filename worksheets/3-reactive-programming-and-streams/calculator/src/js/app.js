import "../css/skin.css";
import { Observable, fromEvent } from "rxjs";
import { map, filter, merge } from "rxjs/operators";

const allValidKeys = ["1","2","3","4","5","6","7","8","9","0",
	")","(","C","+","-","*","/","=",".","±"];

let answerDis = false;
let bracketCal = false;
let operationsCheck = false;

let signs = ["+", "-", "÷", "X"];

let storedVal = "";

/*
	Clears calculator data
*/
function clearData() {
	answerDis = false;
	bracketCal = false;
	operationsCheck = false;
	storedVal = "";
	document.getElementById("numberbox").value = "0";
}

/*
	Evaulates a users calculator input
*/
function evaluateInput(input) {
	try {
		storedVal = storedVal.replace("÷", "/");
		storedVal = storedVal.replace("X", "*");
		storedVal = eval(storedVal);
		document.getElementById("numberbox").value = eval(storedVal);
	} 

	catch (e) {
		if (e instanceof SyntaxError) {
			document.getElementById("numberbox").value = "Error";
		}
	}
	answerDis = true;
	operationsCheck = false;
	storedVal = "0";
}

function cal(input, buffer) {
	let value_num = parseFloat(input);

	if (input == "=" && !answerDis) {
		evaluateInput(input);
	}

	else if (Number.isFinite(value_num) || input == ".") {
		if (buffer == "0") {
			document.getElementById("numberbox").value = input;
			storedVal = input;
		}
		else if (operationsCheck) {
			document.getElementById("numberbox").value = input;
			storedVal += input;
			operationsCheck = false;
		}
		else if (answerDis) {
			document.getElementById("numberbox").value = input;
			storedVal = input;
			answerDis = false;
		}
		else {
			document.getElementById("numberbox").value += input;
			storedVal += input;
		}
	}

function bracketCals(input, buffer) {
	if (input == "=" && !answerDis) {
		storedVal = document.getElementById("numberbox").value;
		evaluateInput(input);
		bracketCal = false;
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

	// Plus-minus handling
	else if (input == "±") {
		const currentValPos = storedVal.length - buffer.length;

		console.log("Current Pos: " + currentValPos);
		
		// Handles each edge case of the calculator
		if (answerDis) {
			answerDis = false;
			operationsCheck = false;
			if (buffer.charAt(0) == "-") {
				storedVal = buffer.substring(1, buffer.length);
				document.getElementById("numberbox").value = storedVal;
			}
			else {
				storedVal = "-" + buffer;
				document.getElementById("numberbox").value = storedVal
			}
		}
		else if (buffer.charAt(currentValPos) == "-") {
			storedVal = storedVal.substring(0, currentValPos);
			storedVal += "-" + buffer;
			document.getElementById("numberbox").value = storedVal;
		}
		else {
			if (storedVal == "0") {
				storedVal = "-";
				document.getElementById("numberbox").value = storedVal;
			}
			else {
				storedVal = storedVal.substring(0, currentValPos);
				storedVal += "-" + buffer;
				document.getElementById("numberbox").value = "-" + buffer;
			}
		}
		answerDis = false
	}

	for (let i = 0; i < signs.length; i++) {
		if (input == signs[i]) {
			if (answerDis == true) {
				storedVal = document.getElementById("numberbox").value;
				storedVal = buffer + input;
				operationsCheck = true;
				answerDis = false;
				break;
			}
			if (operationsCheck == false) {
				storedVal = storedVal + input;
				operationsCheck = true;
				break;
			}
			console.log(storedVal);
		}
	}
}

/*
	Enter keey pressed function 
*/
function enterPress(key) {
	let returnVal;
	(key.keyCode == "13") ? returnVal = "=" : returnVal = String.fromCharCode(key.keyCode);
	return returnVal;
}

const buttonClick = fromEvent(document, 'click')
	.pipe(
		map(key => String(key.target.innerHTML)
			.replace("÷", "/")
			.replace("X", "*"))
		).pipe(filter(formattedString => allValidKeys.includes(formattedString)));

const keyPress = fromEvent(document, 'keypress')
	.pipe(
		map(key => enterPress(key)
			.replace("÷", "/")
			.replace("X", "*"))
		).pipe(filter(formattedString => allValidKeys.includes(formattedString)));

const mergeObserv = buttonClick.pipe(merge(keyPress));
mergeObserv.subscribe(val => addToInput(String(val)));


function addToInput(input) {
	let buffer = document.getElementById("numberbox").value;
	if (input == "C") {
		clearData();
		console.log("Clear");
	}
	if (input == "(" && !bracketCal) {
		bracketCal = true;
		storedVal = "";
		answerDis = false;
		document.getElementById("numberbox").value = storedVal;
	}
	if (bracketCal) {
		bracketCals(input, buffer);
	}

	if (!bracketCal) {
		cal(input, buffer);
	}
}