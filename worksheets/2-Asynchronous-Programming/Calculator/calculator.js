var display;
var expression;

function init(){
    display = document.getElementById("screen_contents");
    expression = display.value;
}

function append(char){
    expression += char;
    display.value = expression;
}

function clearScreen(){
    expression = " ";
    display.value = expression;
}

function evalScreen(){
    expression = eval(expression);
    display.value = expression;
}