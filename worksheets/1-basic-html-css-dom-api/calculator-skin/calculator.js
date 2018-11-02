var buttons = document.getElementsByTagName('button');
var displayText = document.getElementById('displayValue');

let calculation = "";
var newText;

for (var i = 0; i < buttons.length; i++) {
    var val = buttons[i].textContent;
    if (Number.isInteger(parseInt(val)) || val == '.') {
        buttons[i].setAttribute('onclick', 'appendText(\''+val+'\')');
    }
    else if (val == 'C') {
        buttons[i].setAttribute('onclick', 'reset()');
    }
    else if (val == 'DEL') {
        buttons[i].setAttribute('onclick', 'backspace()');
    }
    else if (val == '+' || val == '-' || val == '÷' || val == '×' || val == '=') {
        buttons[i].setAttribute('onclick', 'calculate(\''+val+'\')');
    }
    else if (val == '√') {
        buttons[i].setAttribute('onclick', 'squareRoot()');
    }
    else if (val == "x²") {
        buttons[i].setAttribute('onclick', 'squared()');
    }
}

document.addEventListener('keydown', (event) => {
    if ((event.key >= 0 && event.key <= 9) || event.key == '.') {
        appendText(event.key);
    }
    else if (event.key == "Backspace") {
        backspace();
    }
});

function appendText(text) {
    var decimalCount = 0;
    for (var i = 0; i < displayText.textContent.length; i++) {
        if (displayText.textContent.charAt(i) == '.') {
            decimalCount++;
        }
    }
    if (displayText.textContent == '0' || newText) {
        if (text == '.') {
            displayText.textContent = '0' + text;
        }
        else {
            displayText.textContent = text;
        }
        newText = false;
    }
    else if (decimalCount < 1 || (decimalCount == 1 && text != '.')) {
        displayText.textContent += text;
    }
}

function calculate(operator) {
    if (operator == '÷') {
        operator = '/';
    }
    else if (operator == '×') {
        operator = '*';
    }

    if (calculation == "" || calculation.charAt(calculation.length - 1) == '=') {
        calculation = displayText.textContent;
    }
    else {
        calculation += displayText.textContent;
    }

    displayText.textContent = eval(calculation);
    calculation = displayText.textContent + operator;
    newText = true;
}

function squareRoot() {
    displayText.textContent = Math.sqrt(displayText.textContent);
}

function squared() {
    displayText.textContent = Math.pow(displayText.textContent, 2);
}

function reset() {
    displayText.textContent = 0;
}

function backspace() {
    var text = displayText.textContent;
    displayText.textContent = text.substring(0, text.length - 1);
    if (displayText.textContent == "") {
        displayText.textContent = 0;
    }
}