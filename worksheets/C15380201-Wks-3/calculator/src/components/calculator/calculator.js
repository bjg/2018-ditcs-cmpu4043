/*
Faoilean Fortune
Lab 3 Streams
Calculator
C15380201
*/

import "./style.css";
import { fromEvent, from, merge, pipe, subscribe, of } from "rxjs";
import { mapTo, scan, startWith } from "rxjs/operators";

function Calculator() {
    const buttons = ['(', ')', '±', '÷', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
    const cancel = Item("c");
    const display = Display();

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    gridContainer.appendChild(display);

    const create = buttons.map((button) => {
      const newBtn = Item(button);
      gridContainer.appendChild(newBtn);
      gridContainer.appendChild(cancel);
      run(newBtn, display, cancel);
    });


    const calculator = document.createElement('div');
    calculator.appendChild(gridContainer);
    calculator.classList.add('calculator');
    return calculator;

}
var num = " ";
function run(btnArr, display, cancel){

      merge(
       fromEvent(btnArr, "click").pipe(mapTo(calc => ({value: btnArr.innerHTML}))),
       fromEvent(cancel, "click").pipe(mapTo(calc => ({value: num = ""}))),
      )
       .pipe(
         startWith({value: ""}),
         scan((acc,update) => update(acc))
            )
           .subscribe(calc => {
             const ans = calculate(calc.value);
             display.textContent =ans;
           })
}


function Display(){
    const screen = document.createElement('div');
    screen.classList.add('grid-item2');
    return screen;
}

function Item(label){
  const item = document.createElement('div');
  item.innerHTML = label;
  item.classList.add('grid-item');
  return item;
}


function calculate(val){
  var answer;
  if(val === "="){
    try{
      answer = eval(num);
      num=answer;
    }catch{
      answer="Invalid Entry";
      num=" ";
    }
    return answer;
  }
  else if(val === "±"){
    try{
      answer = eval(num);
      num=answer*(-1);
    }catch{
      num="Invalid Entry";
    }
    return num;
  }
  else if(val === "÷"){
    num+="/";
    return num;
  }
  else if(val === "X"){
    num+="*";
    return num;
  }
  else{
      num+=val;
      return num;
  }
}


export default Calculator;
