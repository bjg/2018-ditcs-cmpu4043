// JS for calculator

// Grab all the buttons
var buttons = document.querySelectorAll(".flex-item");
// var operators = ['+', '-', 'x', '÷', '±'];

//
buttons.forEach(function(button) {
    button.onclick = function(x) {
        var screen = document.getElementById("screen");
        var button_value = this.innerHTML;
        calculate(button_value, screen);
    }
});

// Calculator functionality
function calculate(btn_value, screen)
{
    // If cancel(c) has been pressed, clear the screen
    if(btn_value =="C" || btn_value =="c") {
        screen.value = '';
    }
    // If equal is pressed, solve the equation
    else if(btn_value == "=" || btn_value == "") {
        var equation = screen.value.replace(/x/g, '*').replace(/÷/g, '/');
        screen.value = eval(equation);
    }
    // Negates the value on screen
    else if (btn_value == '±') {
        screen.value = screen.value * -1;
    }
    // They key that is pressed will go onto the screen
    else {
        screen.value += btn_value;
    }
}

// Keyboard input functionality
// Uses keycodes of keyboard buttons to determine '=', no function button for the negate key but +, -, * and / work
document.getElementById("screen").addEventListener('keypress', ev => {
    var buttonVal = String.fromCharCode(ev.keyCode);
    var screen =  document.getElementById("screen");
    if(ev.keyCode == 187) {
        buttonVal = "=";
    }
    calculate(buttonVal, screen);
});
