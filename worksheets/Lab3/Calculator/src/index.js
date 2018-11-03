import Component from "./component";
import "./style.css";

import {Observable} from 'rxjs/Rx';

let allowed_keys = ["1", "2", "3", "4", "5", "6", "7","8", "9", "0",
                       "(", ")","±", "/", "*", "-","+","=","C","c", "."];

const buttons = document.querySelectorAll("button");
const read_input = Observable.merge (
  Observable.fromEvent(buttons, 'click')
    .map(e => e.target.innerHTML),
  Observable.fromEvent(document, 'keyup')
    .map(e => e.key)
)
var screen = document.getElementById("screen");

const getting_value = read_input
  .scan((previous_input,current_input) => 
  {
    if(allowed_keys.includes(current_input)) 
	{
	  if (current_input == '=') 
	  {
        try 
		{
          return eval(previous_input);
        } catch (err) 
		{
          return 'Error';
        }
      }
	else if (current_input == 'C' || current_input == 'c' ) 
	  {
        return '';
      }	  
	  else if (current_input == '±')  
	  {
        return previous_input * -1;
      }
	    else 
	  {
        return previous_input+current_input;
      }
    }
	else 
	{
      return previous_input;
    }
  });

  
 
getting_value.subscribe(function(value) 
{
  if (value === 'Error') 
  {
	screen.value = '';
    console.log('Error');
  }
  else
  {
	screen.value = value;
  }
  }
);


//document.querySelector("#calculator").appendChild(Component());

