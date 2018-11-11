import {Observable, fromEvent, merge, pipe, subscribe} from "rxjs";
import {mapTo, scan, startWith, debounceTime, distinctUntilChanged} from "rxjs/operators";
import "./style.css";

// Array for creating calculator buttons
const buttonvals = ["(",")","±","÷","7","8","9","*","4","5","6","-","1","2","3","+","0","."];
var calcString = " ";

function Calculator() {

  const gridContainer = document.createElement("div"); // to be appended to "app" div in html
  const display = Display();
  const equal = Button("=");
  const clear = Button("C");
  var plusmin = document.createElement("button");

  gridContainer.className = "grid-container";
  gridContainer.appendChild(display);

  // Creating buttons from array of characters
  for(let i =0;i<buttonvals.length;i++)
  {
    // If statement places plusminus in the correct position
    if(buttonvals[i]=="±"){
      plusmin = Button(buttonvals[i]);
      gridContainer.appendChild(plusmin);
    }
    else {
      var btn = Button(buttonvals[i]);
      gridContainer.appendChild(btn);
    }
    run(display,btn,equal,clear,plusmin);
  }

  gridContainer.appendChild(clear);
  gridContainer.appendChild(equal);

  // Observable for keyboard input
  fromEvent(document,"keypress")
  .subscribe(key=>{
    if(key.keyCode == 13){  // If enter is pressed
      calcString = eval(calcString);
    }
    else if(key.keyCode == 99 || key.keyCode == 67){  // If lower or upper case C is pressed
      calcString = " ";
    }
    else{
      calcString+= String.fromCharCode(key.keyCode);
    }
    display.value = calcString;
  });

  // Observable for backspace. Uses keydown because backspace is not included in "keyup" Observable
  fromEvent(document,"keydown")
  .subscribe(key=>{
    if(key.keyCode==8){
      calcString = calcString.substring(0,calcString.length - 1);
      display.value = calcString;
    }});

  return gridContainer; // returns our div element to index.js, where it's appended to the document
}

function run(display,button,equal,clear,plusmin) {

  // Merging observables for buttons into a single observable
  merge(
    fromEvent(button, "click").pipe(mapTo(val => ({ value: calcString += button.value }))),
    fromEvent(equal,"click").pipe(mapTo(val => ({value: calcString = eval(calcString)}))),
    fromEvent(clear,"click").pipe(mapTo(val => ({value: calcString = ""}))),
    fromEvent(plusmin,"click").pipe(mapTo(val =>({value: calcString = eval(calcString)*(-1)})))
  )
  .pipe(
    scan((acc, update) => update(acc))
  )
  .subscribe(val => {
    display.value = calcString},
    error => {
      calcString = " ";
      alert("Error message: "+error);});
}

// Creates display element
function Display(initialValue) {
    const display = document.createElement("input");
    display.className = "display";
    display.type = "text";
    return display;
}

// Creates button element
function Button(label) {
    const button = document.createElement("button");
    button.className = "grid-item";
    button.innerText = label;
    button.id = label;
    button.value = label;
    return button;
}

export default Calculator;
