
import '../css/style.css';
import 'rxjs/add/observable/fromEvent';
import { merge} from 'rxjs';
import { Observable } from 'rxjs/Rx';

//get all buttons
const buttons = document.getElementsByClassName("button");

//put the buttons in a stream
const buttons$ =  Observable.fromEvent(buttons, 'click').pluck('srcElement','value');
//put keydowns in a stream
const keys$ =  Observable.fromEvent(document, 'keydown').pluck('key');

//merge into one stream so we dont have to do two same functions
const stream$ = merge(buttons$,keys$);
// use subscribe on a stream of input data
stream$.subscribe(value => {

  //do the calculations using eval
  if(value >= 0 && value <= 9){
    document.getElementById("ans").value+=value;
  } else{
  switch(value){
  case '(':
    document.getElementById("ans").value+='(';
    break;
  case ')':
    document.getElementById("ans").value+=')';
    break;
  case '&#x2213;':
    document.getElementById("ans").value='*-1';
    break;
  case '/':
    document.getElementById("ans").value+='/';
    break;
  case 'x':
    document.getElementById("ans").value+='*';
    break;
  case '-':
    document.getElementById("ans").value+='-';
    break;
  case '+':
    document.getElementById("ans").value+= '+';
    break;
  case '.':
    document.getElementById("ans").value+= '.';
    break;
  case 'C':
    document.getElementById("calculator").reset();
    break;
  case '=':
    var input = document.getElementById("ans").value;
    console.log(input);
    //using eval to calculate
    document.getElementById("ans").value = eval(input);
  break;
  }
  }

});
