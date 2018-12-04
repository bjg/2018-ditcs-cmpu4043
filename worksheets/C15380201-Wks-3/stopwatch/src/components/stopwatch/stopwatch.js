/*
Faoilean Fortune
Lab 3 Streams
Stopwatch
C15380201
*/

import "./style.css";
import { fromEvent, interval, from, merge, pipe, subscribe } from "rxjs";
import { mapTo, scan, startWith } from "rxjs/operators";
import "rxjs-compat";

const canvas = document.getElementById('canvas');
const timer = document.getElementById('timer');
const splitsList = document.getElementById('splits-list');

const start1 = Button("Start", 1);
const stop1 = Button("Stop", 3);
const reset1 = Button("Reset", 2)
const split1 = Button("Split", 4);

const container = document.getElementById("btnC");
container.appendChild(start1);
container.appendChild(stop1);
container.appendChild(split1);
container.appendChild(reset1);

const source = interval(100);

var started = false;
var time = 0; // 1/10 seconds
var splitNum = 0;

const stopwatchf = source.subscribe(
  x => {
    if(!started) return;
    time++;
    draw(time);
    timer.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
  });

  merge(
    fromEvent(start1, "click").pipe(mapTo(str => ({value: 1 }))),
    fromEvent(stop1, 'click').pipe(mapTo(str => ({value: 0 }))),
    fromEvent(split1, 'click').pipe(mapTo(str => ({value: 2 }))),
    fromEvent(reset1, 'click').pipe(mapTo(str => ({value: 3 }))),
  )
  .pipe(
     startWith({value: 0}),
    scan((acc, update) => update(acc))
  )
  .subscribe( str => {
        console.log(str.value);
        if(str.value == 1){
          started = true;
          console.log(started);
        }
        else if(str.value == 0){
          started = false;
          console.log(started);
        }
        else if(str.value == 2){
          if(splitNum < 5){
          splitsList.innerHTML += timer.innerHTML + "<br/>";
          splitNum++;
        }
        }
        else if(str.value == 3){
          draw(time);
          started = false;
          time = 0;
          splitNum = 0;
          timer.innerHTML = "0:0:00";
          splitsList.innerHTML = "";
        }
      }
  )

function Button(label, num){
    const button = document.createElement("Button");
    button.innerText = label;
    button.classList.add("button" + num);
    console.log(button.className);
    return button;
}

const draw = (time) => {
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const watchSize = 96;
    const contentSize = 0.92;

    ctx.strokeStyle = "black";
    ctx.beginPath();

    // Outer circle
    ctx.arc(watchSize, watchSize, watchSize, 0, Math.PI * 2, true);
    ctx.arc(watchSize, watchSize, watchSize - 2, 0, Math.PI * 2, true);
    ctx.fillStyle = "#00ff00";
    ctx.fill();

    // Center doc
    ctx.beginPath();
    ctx.arc(watchSize, watchSize, 2, 0, 2 * Math.PI, true);
    ctx.fillStyle = "#f70909";
    ctx.fill();

    // 12 longer lines
    for (let i = 0; i < 12; i++) {
      let angle = i * (Math.PI * 2 / 12);
      const armLength = watchSize * 0.15;
      ctx.moveTo(watchSize + watchSize * Math.cos(angle) * contentSize, watchSize + watchSize * Math.sin(angle) * contentSize);
      ctx.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * contentSize, watchSize + (watchSize - armLength) * Math.sin(angle) * contentSize);

    }

    // 60 shorter lines
    for (let i = 0; i < 60; i++) {
      let angle = i * (Math.PI * 2 / 60);
      const armLength = watchSize * 0.05;
      ctx.moveTo(watchSize + watchSize * Math.cos(angle) * contentSize, watchSize + watchSize * Math.sin(angle) * contentSize);
      ctx.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * contentSize, watchSize + (watchSize - armLength) * Math.sin(angle) * contentSize);
    }

    // Minute hand
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
