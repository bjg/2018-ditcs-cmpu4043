import {interval, fromEvent, merge} from 'rxjs';
import { mapTo, map } from "rxjs/operators";
import "./style.css";

let timer = 0;
let running = false;
const display = document.createElement("div");
display.id = 'Display';
var ctx;

function Clock() {
    display.innerHTML = "00:00:00";

    DisplayClock();
    MoveHands(0);
    const strButton = Button('Start');
    const stpButton = Button('Stop');
    const rstButton = Button('Reset');
    const splButton = Button('Split');
    const container = document.createElement("div");

    for (let component of [display, strButton, stpButton, rstButton, splButton]) {
        container.appendChild(component);
    }
    run(display, strButton, stpButton, rstButton, splButton);
    return container;
}

const interval$ = interval(100);

    interval$.subscribe(x =>{

        if(running){
            timer++;
            let min = ('0' + Math.floor(timer / 600)).slice(-2);
            let secs = ('0' + Math.floor((timer / 10) % 60)).slice(-2);
            let mill = (timer % 10)

            display.innerHTML = min + ":" + secs + ":" + mill + "0";
            MoveHands(timer);

        }
        else{return;}
    });

function run(display, strButton, stpButton, rstButton, splButton) {


     merge(
         fromEvent(strButton, "click").pipe(mapTo(true)),
         fromEvent(stpButton, "click").pipe(mapTo(false))
     )
     .subscribe(x => running = x);

      merge(
         fromEvent(rstButton, "click").pipe(map(x => ResetTimer())),
         fromEvent(splButton, "click").pipe(map(x => Split(display.innerHTML))),
     )
     .subscribe();
}

function ResetTimer(){
    timer = 0;
    display.innerHTML = "00:00:00";
    DeleteSplits();
    MoveHands(timer);
}


let splits = 0;
function Split(currTime){

    if( splits < 5 && running) {

        let split = document.createElement("div");
        split.innerHTML = currTime;
        split.classList.add('Split');
        document.body.querySelector("#app").appendChild(split);
        splits++;
    }

}

function DeleteSplits(){

    var list = document.getElementsByClassName('Split');
    var length = list.length - 1;

    for( var j = length; j >= 0; j--) {
        list[j].remove();
    }
    splits = 0;
}

function DisplayClock() {
    
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(300, 175, 105, 0, Math.PI * 2);
    ctx.moveTo(400,175);
    ctx.arc(300, 175, 100, 0, Math.PI * 2);
    ctx.moveTo(305,175);
    ctx.arc(300, 175, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.translate(300, 175);

    for (var i = 0; i < 12; i++) {
        
        ctx.beginPath();
        ctx.moveTo(95, 0);
        ctx.lineTo(75, 0);
        ctx.stroke();

        ctx.rotate(Math.PI / 6);
    }

    for (i = 0; i < 60; i++) {

        if (i % 5!= 0) {
          ctx.beginPath();
          ctx.moveTo(95, 0);
          ctx.lineTo(90, 0);
          ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
      }
    
}

function MoveHands(timer){

    // Shorter hand (second), each second goes one step
    ctx.clearRect(-300, -175, canvas.width, canvas.height);
    DisplayClock();
    
    ctx.save();
    ctx.rotate((timer / 600 / 60 - 0.25) * (Math.PI * 2));
    ctx.moveTo(0,0);
    ctx.lineTo(45, 0);
    ctx.stroke();
    ctx.restore();

    ctx.rotate((timer / 60 / 10 - 0.25) * (Math.PI * 2));
    ctx.moveTo(0,0);
    ctx.lineTo(95, 0);
    ctx.stroke();

}

function Button(label) {
    const button = document.createElement("button");
    button.innerText = label;
    button.id = label;
    return button;
}

export default Clock;

