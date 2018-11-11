import Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver, switchMap} from 'rxjs';
import { mapTo } from 'rxjs/operators';
import '../css/style.css';

//get the element of the button class.
const btns = document.getElementsByClassName("button");
//Create a stream for each event
const btnsStream$ =  fromEvent(btns, 'click')
const keyDowns$ =  fromEvent(document, 'keypress')
//merge both streams
const stream$ = merge(btnsStream$,keyDowns$);
// subscribe stream$
stream$.subscribe(x => {
  let input;
  //stream : returns an object type : either click or keypress
  if(x.type == 'click'){
    //gets the value of the stream triggered during buttons click
    input= x['srcElement'].value;
  }else if(x.type == 'keypress'){
    //gets the value of the stream triggered during buttons pressed
    input= x['key'];
  }
  // prints the number on the calculator's screen
  typeIn(input);
});

let result;

function typeIn(value) {
  //Get the value on screen
  let input = document.getElementById("screen").value
  //Convert value passed into integer
  parseInt(value);
  // valid values: between 0 and 10
  if(value >=0 && value <=10){
    document.getElementById("screen").value += value;
  }
//operators
  switch (value) {
    case '+':
    document.getElementById("screen").value+='+';
    break;
    case '-':
    document.getElementById("screen").value+='-';
    break;
    case '/':
    document.getElementById("screen").value+='/';
    break;
    case '÷':
    document.getElementById("screen").value+='/';
    break;
    case 'x':
    document.getElementById("screen").value+='*';
    break;
    case '*':
    document.getElementById("screen").value+='*';
    break;
    case '.':
    document.getElementById("screen").value+='.';
    break;
    case '(':
    document.getElementById("screen").value+='(';
    break;
    case ')':
    document.getElementById("screen").value+=')';
    break;
    case '±':
    // Find minus operator
    var n = input.indexOf("-");

    if(n==0){
      document.getElementById("screen").value = Math.abs(input);
    }else{
      document.getElementById("screen").value='-' + input;
    }
    break;
    default:
  }//end of switch

  // equal operator is selected
  if(value === '='){
    //function to calculate
    calc();
  }else if (value.toLowerCase() == 'c'){
    clearScreen();
  }

}
//Function to clean screen and result is set to 0
function clearScreen(){
  document.getElementById("screen").value="";
  result="";
}
//Function that calculates the operation typed on screen
function calc(){
  var input = document.getElementById("screen").value;
  result = eval(input);
  document.getElementById("screen").value="";
  document.getElementById("screen").value=result;
}
