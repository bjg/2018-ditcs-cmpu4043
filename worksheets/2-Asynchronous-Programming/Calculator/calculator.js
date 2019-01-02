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
    expression = "";
    display.value = expression;
}

function evalScreen(){
    expression = eval(expression);
    display.value = expression;
}

document.addEventListener('keypress', function(event) {
    if("0123456789-+/*0.".indexOf(event.key) != -1) append(event.key);
    if(event.key == 'c' || event.key == 'C') clearScreen();
    if(event.key == '=') evalScreen();
});