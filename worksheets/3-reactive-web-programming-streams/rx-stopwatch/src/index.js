import "./style.css";
import {Observable, fromEvent, merge, interval } from 'rxjs';
import Rx from 'rxjs/Rx';

// Get all the DOM elements required
const canvas = document.getElementById('canvas');
const timer = document.getElementById('timer');
const timerList = document.getElementById('time-container');

let source = interval(100).timeInterval();

let started = false;
let time = 0;

let elem = document.createElement("img")
elem.src = 'watchFace.png';
elem.class = "face"
document.getElementById("watchFace").appendChild(elem)

// Main subcriber FXN
const subscription = source.subscribe(
  x => {
    let seconds = Math.floor((time / 10) % 60)
    let minutes = Math.floor(time / 600)
    if(!started) return;
    time++;
    // Formatting for the second overflow, going from 09 -> 10 seconds
    if(minutes > 9){
        timer.innerHTML = minutes + ":" + "0" + seconds + ":" + (time % 10) + "0";
    }
    if(seconds> 9){
        timer.innerHTML = "0" + minutes + ":" + seconds + ":" + (time % 10) + "0";    
    }else{
        timer.innerHTML = "0" + minutes + ":" + "0" + seconds + ":" + (time % 10) + "0";    
    }
    draw(time);
  });

// Handling the start button click event
fromEvent(document.getElementById('start-button'), 'click')
  .subscribe(e => {
    started = true;
  });

// Handling the stop button click event
fromEvent(document.getElementById('stop-button'), 'click')
  .subscribe(e => {
    started = false;
  });

// Handling the stop button click event
fromEvent(document.getElementById('split-button'), 'click')
  .subscribe(e => {
    timerList.innerHTML += timer.innerHTML + "<br/>";
  });

// Handling the reset button click event
fromEvent(document.getElementById('reset-button'), 'click')
  .subscribe(e => {
    started = false;
    time = 0;
    draw(time);
    timer.innerHTML = "00:00:00";
    splitsList.innerHTML = "";
  });

// Draw each arm of the clock, and move them appropriately, relative to timeInterval
const draw = (time) => {
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    // Clear the path and the area about which the minute hands will be deplayed 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    const watchSize = 96;
    const contentSize = 0.92;

    ctx.strokeStyle = "Gray";
    

    // Longer hand (minute), each minute goes one step
    // The angle is found by dividing down to each minute
    // 0.25 is to ensure that the hnad starts at 0
    let angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
    let armLength = watchSize * 0.5;
    ctx.moveTo(watchSize, watchSize);
    ctx.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

    // Shorter hand (second), each second goes one step
    angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
    armLength = watchSize * 0.8;
    ctx.moveTo(watchSize, watchSize);
    ctx.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

    ctx.stroke();
  }
}

draw();