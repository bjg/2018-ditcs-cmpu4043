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

document.addEventListener('keypress', function(event) {
    "0123456789-+/*0.".indexOf(event.key) != -1? append(event.key): null;
    event.key == 'c' || event.key == 'C' ? clearScreen() : null;
    event.key == '='? evalScreen(): null;
});