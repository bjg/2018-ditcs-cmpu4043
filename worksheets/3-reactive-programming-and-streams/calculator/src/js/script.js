import {merge, fromEvent, pipe, from} from 'rxjs';
import {map,mapTo, mergeAll, pluck } from 'rxjs/operators';
import '../css/stylesheet.css';

let calculation ='';
//new! changed to get the first iput element i.e the screen.
let display = document.getElementsByTagName('input')[0];
//new! get all the buttons store them in an array
const buttons = document.getElementsByClassName("btn");
//new! using Streams to get the buttons and map the values of them to an array
const btnStream = fromEvent(buttons, 'click').pipe(map(btn =>btn.path[0].defaultValue));
//new! using streams to get the keypress.
const keyStream = fromEvent(document, 'keypress').pipe(pluck('key'));
//new! merge both streams for single use of subscribe.
const stream = merge(btnStream,keyStream);

stream.subscribe(key => {

//if C button is hit empty calculator screen and stored calculation
  if (key === 'C'){
    display.value='0';
    calculation ='';
    key ='';
  }
//if x key is pressed replace with *
  if(key === 'x'|| key === 'X')
  {
    key = key.replace(key, "*")
  }
//if ÷ key is pressed replace with /
  if(key === '÷') {
    key = key.replace(key, "/")
  }
//if the ± change the last + or minus to the oppoister
  if (key === '±'){
      key ='';
      //find the location of the last plus or minus and change it the opposite.
      let minusIndex =calculation.lastIndexOf('-');
      let plusIndex = calculation.lastIndexOf('+');
      if(minusIndex > plusIndex){
        replaceAt(minusIndex, '+');
      }else{
        replaceAt(plusIndex ,'-');
      }
  }
  if (key === '='|| key === 'Enter')
  {
    console.log(key);
    console.log(calculation);
    try{
      doCalculation();
    }
    catch{
      display.value="Invalid input";
    }
  }else{
        calculation += key;
        display.value =calculation;
      }
});


//Function to take care of the calculation.
function doCalculation(){
    console.log("inside Calc");
    console.log(eval(calculation));
    let answer = eval(calculation);
    console.log("The answer is :"+answer);
    display.value ='';
    display.value =answer;
    calculation ='';
}
//function that swaps the minus and plus operator
function replaceAt(index, operator){
  let string = calculation.substring(0,index)+operator+calculation.substring(index+1);
  calculation = string;
}
