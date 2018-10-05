window.onload = function() {
    let buttons_numbers = document.getElementsByClassName('button_numbers');
    let buttons_operators = document.getElementsByClassName('button_operators');
    let result = document.getElementById('result');

    for(let i = 0; i < buttons_numbers.length; i++) {
        let button = buttons_numbers[i];
        button.onclick = function() {
            if (checkScreen()) {
                result.innerText = "";
            }
            result.innerText += buttons_numbers[i].innerText;
        }
    }

    for(let i = 0; i < buttons_operators.length; i++) {
        let button = buttons_operators[i];

        button.onclick = function() {
            if (checkScreen()) {
                result.innerText = "";
            }
            let result_text = result.innerText;
            let length = result.innerText.length;

            let last_char = result_text.charAt(length - 1);

            if (isNaN(last_char)) {
                if (last_char == "(" || last_char == ")") {
                    result.innerText += buttons_operators[i].innerText;
                }
                else {
                    if (buttons_operators[i].innerText == "(" || buttons_operators[i].innerText == ")") {
                        result.innerText += buttons_operators[i].innerText;
                    }
                    else {
                        result.innerText = result.innerText.slice(0, length-1) + buttons_operators[i].innerText;
                    }
                }
            }
            else {
                result.innerText += buttons_operators[i].innerText;
            }
        }
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

function calculate() {
    try {
        result.innerText = eval(result.innerText);
    } catch (error) {
        result.innerText = "Error";
    }
}