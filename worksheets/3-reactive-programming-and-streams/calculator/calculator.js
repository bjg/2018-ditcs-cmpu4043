window.onload = function() {
    let buttons_numbers = document.getElementsByClassName('button_numbers');
    let buttons_operators = document.getElementsByClassName('button_operators');
    let result = document.getElementById('result');

    for(let i = 0; i < buttons_numbers.length; i++) {
        let button = buttons_numbers[i];
        button.onclick = function() {
            addToScreen(buttons_numbers[i].innerText);
        }
    }

    for(let i = 0; i < buttons_operators.length; i++) {
        let button = buttons_operators[i];

        button.onclick = function() {
            addToScreenOps(buttons_operators[i].innerText);
        }
    }
}

// Takes keyboard input
window.onkeypress = function(e) {
    let x = e.which || e.keyCode;
    let key = String.fromCharCode(x);

    if (x == 13) {
        calculate();
    }
    else if (x == 8) {
        clearScreen();
    }
    else if (isNaN(key) && !isAlpha(key)){
        addToScreenOps(key);
    }
    else {
        addToScreen(key);
    }
}

function clearScreen() {
    result.innerText = 0;
}

function checkScreen() {
    if (result.innerText == "0") {
        return true;
    }
    return false;
}

// Evaluate inputted string
function calculate() {
    try {
        result.innerText = eval(result.innerText);
    } catch (error) {
        result.innerText = "Error";
    }
}

// If a number is pressed
function addToScreen(key) {
    if (!isAlpha(key)) {
        if (checkScreen()) {
            result.innerText = "";
            result.innerText += key;
        }
        else {
            result.innerText += key;
        }
    }    
}

// If an Operator is pressed
function addToScreenOps(key) {
    if (!isAlpha(key)) {
        if (checkScreen()) {
            result.innerText = "";
            result.innerText += key;
        }
        else {
            let result_text = result.innerText;
            let length = result.innerText.length;

            let last_char = result_text.charAt(length - 1);

            if (isNaN(last_char)) {
                if (last_char == "(" || last_char == ")") {
                    result.innerText += key;
                }
                else {
                    if (key == "(" || key == ")") {
                        result.innerText += key;
                    }
                    else {
                        result.innerText = result.innerText.slice(0, length-1) + key;
                    }
                }
            }
            else {
                result.innerText += key;
            }
        }
    }    
}

// Check if string is a letter
function isAlpha(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 64 && code < 91) && !(code > 96 && code < 123)) {
            return false;
        }
    }
    return true;
  };