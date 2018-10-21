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
    try{
        expression = eval(expression);
    }
    catch(e){
        
    }
    display.value = expression;
}

var keyPress = Rx.Observable.fromEvent(document, 'keypress').filter(event => "0123456789-+/*0.".indexOf(event.key) != -1 || event.key == 'c' || event.key == 'C' || event.key == '=');
var click = Rx.Observable.fromEvent(document, 'click').map(function(event){
    event.key = event.target.id;
    return event;
});

var input = Rx.Observable.merge(keyPress, click);

input.subscribe(function(event) {
    "0123456789-+/*0.".indexOf(event.key) != -1? append(event.key): null;
    event.key == 'c' || event.key == 'C' ? clearScreen() : null;
    event.key == '='? evalScreen(): null;
});