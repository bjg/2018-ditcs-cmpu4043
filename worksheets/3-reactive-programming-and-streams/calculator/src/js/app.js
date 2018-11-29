import {from, merge, fromEvent} from 'rxjs';
import { mapTo } from 'rxjs/operators';
import '../css/style.css';

let total = 0;

const btns = document.getElementsByClassName("button");
const btnsStream$ =  fromEvent(btns, 'click')
const keyPress$ =  fromEvent(document, 'keypress')
const stream$ = merge(btnsStream$,keyPress$); // Merges the events click and keypress into one stream


stream$.subscribe(key => { // This stream allows user input by keyboard or by click
    let input;

    if(key.type == 'click'){
      input = key['srcElement'].value;
    }
    else if(key.type == 'keypress') {
      input= key['key'];
    }

    getVal(input);  // the value of the input is then passed down to getVal function
  }
);

function getVal(value) {
  let input = document.getElementById("calc-screen").value

  if(value == '') return;
  if(value >=0 && value <=9){
    document.getElementById("calc-screen").value += value;
  }

  switch (value) {
    case 'x':
    document.getElementById("calc-screen").value+='*';
    break;

    case '÷':
    document.getElementById("calc-screen").value+='/';
    break;

    case '+':
    document.getElementById("calc-screen").value+='+';
    break;

    case '-':
    document.getElementById("calc-screen").value+='-';
    break;

    case '.':
    document.getElementById("calc-screen").value+='.';
    break;

    case '(':
    document.getElementById("calc-screen").value+='(';
    break;

    case ')':
    document.getElementById("calc-screen").value+=')';
    break;

    case '=':
    if(value === '='){
      calculate();  // calls the function calculate() for the total
    }
    break;

    case '±':
    let num = input.indexOf("-");
    // If num is not 0, it will replace num into a negative, otherwise it will append '-' in front of the input
    if(num != 0){
      document.getElementById("calc-screen").value='-' + input;
    }
    break;

    default:
    if (value.toLowerCase() == 'c'){
      clrscr(); // calls the function clrscr() which clears any input in the screen
    }
  }//end of switch

}

//Function that evaluates the expression(equation) which returns a total
function calculate(){
  var input = document.getElementById("calc-screen").value;
  total = eval(input);
  document.getElementById("calc-screen").value="";
  document.getElementById("calc-screen").value = total;
}

//Function to clean calc-screen and total is set to 0
function clrscr(){
  document.getElementById("calc-screen").value='';
  total = 0;
}
