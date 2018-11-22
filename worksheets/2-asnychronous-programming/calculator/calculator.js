const allowedOperands = ['+', '-', '*', '/', '(', ')', '.'];
let allowedChars = allowedOperands;

function getCaclulatorDisplay() {
    return document.querySelector('.display');
}

function typeKey(value) {
    const display = getCaclulatorDisplay();
    display.innerHTML += value;
}

function clearCalc() {
    const display = getCaclulatorDisplay();
    display.innerHTML = '';
    display.classList.remove('error');
}

function keyPressedEventHandler(value) {
    if (value === 'c') {
      clearCalc();
    }
    else if (value === '=') {
        const display = getCaclulatorDisplay();
        const expression = display.innerHTML;

        try {
          display.innerHTML = eval(expression);
        } catch(error) {
            display.classList.add('error');
            console.log(error);
        };
    }
    else if (allowedChars.indexOf(value) > -1 || !isNaN(value)) {
        typeKey(value);
    }
    else {
        console.log(value);
    }
}

window.addEventListener("keypress", (e) => keyPressedEventHandler(e.key))
