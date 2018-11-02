import Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver, switchMap} from 'rxjs';
import { mapTo } from 'rxjs/operators';
import '../css/style.css';

//First we get the element of the button class.
const btns = document.getElementsByClassName("button");
//Create one stream for each event: clik and keypress
const btnsStream$ =  fromEvent(btns, 'click')
const keyDowns$ =  fromEvent(document, 'keypress')
//merge both streams into one
const stream$ = merge(btnsStream$,keyDowns$);
// subscribe stream$
stream$.subscribe(x => {
  let input;
  //This stream returns and object , its type is either click or keypress
  if(x.type == 'click'){
    //Extract the value of the stream triggered when the buttons are cliked
    input= x['srcElement'].value;
  }else if(x.type == 'keypress'){
    //Extract the value of the stream triggered when the buttons pressed
    input= x['key'];
  }
  // Passing the value to the function that prints the number on the calculator's screen
  typeIn(input);
});

let result;
//The following function has been cleaned up from the previous lab (2)
function typeIn(value) {
  //Get the value on screen
  let input = document.getElementById("screen").value
  parseInt(value);//Convert the value passed into integer
  // Allow number between 0 and 10
  if(value >=0 && value <=10){
    document.getElementById("screen").value += value;
  }
  // Allow the following operators with a switch statement
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
    // Find the  minus operator on the string
    var n = input.indexOf("-");
    // If is 0, allow inserting a minus at the start of the number change its positive sign and viceversa
    if(n==0){
      document.getElementById("screen").value = Math.abs(input);
    }else{
      document.getElementById("screen").value='-' + input;
    }
    break;
    default:
  }//end of switch
  //If the equal operator is selected
  if(value === '='){
    calc();//call to the function that calculates the result
  }else if (value.toLowerCase() == 'c'){
    clearScreen();//Clear screen and set result to 0
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
