let display;
let expression;

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

const keyPress = Rx.Observable.fromEvent(document, 'keypress').map(event => event.key).filter(key => "0123456789-+/*0.()".indexOf(key) != -1 || key == 'c' || key == 'C' || key == '=');

const mouseClick = Rx.Observable.fromEvent(document, 'click').map(event => event.target.id);

const input = Rx.Observable.merge(keyPress, mouseClick);

input.subscribe(function(key) {
    "0123456789-+/*0.".indexOf(key) != -1? append(key): null;
    key == 'c' || key == 'C' ? clearScreen() : null;
    key == '='? evalScreen(): null;
});