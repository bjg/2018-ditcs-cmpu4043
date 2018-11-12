import {Observable} from 'rxjs/Rx';
import '../css/style.css';

//get the buttons
const buttons = document.getElementsByClassName("flex-item");
//Get display text
var displayText = document.getElementsByTagName("input");
//merge buttons and key presses into a stream
const input$ = Observable.merge (
  Observable.fromEvent(buttons, 'click')
    .map(e => e.target.innerHTML),
  Observable.fromEvent(document, 'keydown')
    .map(e => e.key)
)

const output$ = input$
  .scan((acc, cur) => {
    switch(cur) {
      case "(":
      case ")":
      case "-":
      case "+":
      case ".":{
        acc = acc + cur;
        break;
      }

      case "±":{
          //acc = acc + cur;
          break;
      }

      case "÷":
      case "/":{
          acc = acc + "/";
          break;
      }

      case "x":
      case "X":
      case "*":{
          acc = acc + "*";
          break;
      }

      case "C":
      case "c":{
          acc = "";
          break;
      }

      case "Backspace":
      case "backspace":{
          if (acc.length !== 0 ){
            acc = acc.substring(0,acc.length-1);
          }
          break;
      }

      case "=":{
        try {
          acc = math.eval(acc);
        } catch (e) {
            console.log(e.message);
            alert("Error with calculation, please try again!");
            acc = "";
        }
        break;
      }

      default:
          if(cur > -1 || cur < 10){
            acc = acc + cur;
          }
    }//End Switch

    return acc;
  });

output$.subscribe(function(x) {
    displayText[0].value = x;
  },
  function (err) {
    console.log('There was an error: ' + err);
  }
);
