var parent = document.getElementsByTagName("BODY")[0]
var display = document.getElementsByTagName("NUMBER")[0]
var buttons = document.getElementsByTagName("BUTTONS")[0]
var allButtons = buttons.getElementsByTagName("BUTTON")
var list = ['0']
var divisionSign = '÷'
var plusminus = '±'
var leftBracketPlaced = false
parent.addEventListener("keypress", doKeyPressed)

for (var i = 0; i < allButtons.length; i ++) {
	allButtons[i].addEventListener("click", doButtonPressed)
}

function doKeyPressed(keypressed) {
	doPressed(keypress.key)
}

function doButtonPressed(mouseEvent) {
	doPressed(mouseEvent.srcElement.innerHTML)
}

function doPressed(value){

	if (list[0] == 'NaN') {
		list = ['0']
	}

	value = buttonMappings(value)

	if (isValidDisplay(value)) {
		append(value)
	} else if (value == 'C') {
		leftBracketPlaced = false
		list = ['0']
	} else if (value == '=') {
		//doCalculation()
		if (isValueSpecial(list[list.length-1])){
			removeFromEnd()
		}

		if (list.length != 1)
			doCalculation()
	} else if (value == plusminus ) {
		flipSign()
	}

	if (list.length == 0)
		list = ['0']
	updateDisplay()
}

function flipSign() {
	var pos = list.length-1

	if(isNaN(list[pos]))
		return

	if(list[pos-1] == '+')
		list[pos-1] = '-'
	else if (list[pos-1] == '-')
		list[pos-1] = '+'
	else 
		list[pos] = list[pos] - (list[pos] * 2)
}

function append(value) {
	if (list[0] == '0')
		replaceStart(value)
	else 
		appendToEnd(value)
}

function appendToEnd(value) {
	var lastElement = list[list.length-1]

	if (list[list.length-1] === list[0] && list[list.length-1] == '-')
		list[list.length-1] += value
	else if (isValueBracket(value))
		placeBracket(value)
	else if (isValueSpecial(value)) {
		if (isValueSpecial(lastElement))
			removeFromEnd()
			list.push(value)
	} else if (isValueSpecial(lastElement) || isValueBracket(lastElement))
		list.push(value)
	else
		list[list.length-1] += value
}

function replaceStart(value) {
	// If the value to be placed is not special or the value is a minus symbol -> pop top value (list[0])
	if (!isValueSpecial(value) || value == '-')
		list.pop()
	
	if(isValueBracket(value))
		placeBracket(value)
	else if (value == '-')
		list.push(value)
	else if (list.length <= 0)
		list.push(value)
}

function placeBracket(value) {
	var lastElement = list[list.length-1]
	if (!leftBracketPlaced && value == '(') {
		leftBracketPlaced = true
		list.push(value)
	} else if (leftBracketPlaced && value == ')' && !isValueBracket(lastElement) && !isValueSpecial(lastElement) ) {
		leftBracketPlaced = false
		list.push(value)
	}
}

function removeFromEnd() {
	list.pop()
	if (list.length <= 0) {
		list = ['0']
	}
}
    

function updateDisplay() {
	display.innerHTML = null;
	for(var i = 0; i < list.length; i++)
		display.innerHTML += list[i]
}

function isValueBracket(value) {
	if (value == '(' || value == ')') {
		return true
	}
	return false
}

function isValueSpecial(value) {
	if ((value == '+') || 
		(value == '-') ||
		(value == 'x') ||
		(value == divisionSign)){
		return true
	} 
	return false
}

function isValidDisplay(value) {
	if(value >= 0 || value <= 9) {
		return true
	}

	switch(value) {
		case 'x':
			return true
		case divisionSign:
			return true
		case '+':
			return true
		case '-':
			return true
		case '(':
			return true
		case ')':
			return true
		case '.':
			return true
		default: 
			return false
	}
}

function buttonMappings(value) {
	switch(value) {
		case 'Enter':
			return '='
		case 'c':
			return 'C'
		case '*':
			return 'x'
		case '/':
			return divisionSign
		default:
			return value
	}
}

function doCalculation() {
	var brackets = false
	var newList = []
	var bracketPosition = 0
	while(list.length > 0) {
		if (list[0] == '(') {
			newList.push(equateBracket())
		} else { 
			newList.push(list[0])
		}

		if(!isNaN(list[0]) && list[1] == '(') {
			newList.push('x')
		}

		list.splice(0, 1)
	}
	
	if (newList.length == 1) {
		list = newList 
		return
	}

	var result = bomdas(newList);
	list = []
	list.push(result)
}

function equateBracket() {
	list.splice(0, 1)
	var expression = []
	while(list[0] != ')') {
		expression.push(list[0])
		list.splice(0, 1)
	}
	console.log(expression)
	return (expression.length == 1) ? expression : bomdas(expression);
}

function bomdas(expression) {
	var result = 0
	var i = 0;
	while (expression.length > 1) {
		i = (i % (expression.length-1)) + 1

		var left = expression[i-1]
		var right = expression[i+1]
		
		if(isNaN(expression[i])) {
			if (expression[i] == 'x') {
				result = parseFloat(left) * parseFloat(right)
			} else if (expression[i] == divisionSign) {
				if (right == 0)
					return 'NaN'
	
				result = parseFloat(left) / parseFloat(right)
			} else if (expression[i] == '+') { 
				result = parseFloat(left) + parseFloat(right)
			} else if (expression[i] == '-') {
				result = parseFloat(left) - parseFloat(right)
			}
			expression[i] = result
			expression.splice(i-1, 1)
			expression.splice(i, 1)
			i--
		}
	}

	return expression[0]
}
