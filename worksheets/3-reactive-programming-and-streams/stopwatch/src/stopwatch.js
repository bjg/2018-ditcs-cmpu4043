import {fromEvent, Observable, subscribe} from "rxjs/Rx";
import "./style.css";

const container = document.createElement("div");
const split_list = document.createElement("div");
const time_text = document.createElement("div");
const clock = document.createElement("canvas");
clock.width = "200";
clock.height = "200";
var time = 0.0;

function Stopwatch(){

  time_text.innerText = "0:00:00";
  container.className = "container";

  const start = Button("Start");
  const stop = Button("Stop");
  const split = Button("Split");
  const reset = Button("Reset");

  for (let component of [clock, time_text, start, stop, split, reset, split_list]) {
      container.appendChild(component);
  }

  const ticks = Observable.interval(100).timeInterval();
  var started = false;

  ticks.subscribe(val=>{
    if(started==true){
      time++;
      draw(time);
      time_text.innerText = Math.floor(time/600)+":"+Math.floor((time/10)%60)+":"+(time%10)+"0";
    }
  });

  Observable.fromEvent(start,"click").subscribe(event=>{started=true;});
  Observable.fromEvent(stop,"click").subscribe(event=>{started=false;});
  Observable.fromEvent(split,"click").subscribe(event=>{split_list.innerHTML += time_text.innerHTML + "</br>";});
  Observable.fromEvent(reset,"click").subscribe(event=>{
    started = false;
    time = 0.0;
    split_list.innerText = " ";
    time_text.innerText="0:00:00";
    draw(time);});

  return container;
}

function Button(label){
  const button = document.createElement("button");
  button.className = "button";
  button.innerText = label;
  return button;
}

function draw(time){
  if (clock.getContext){
    const clockCtx = clock.getContext("2d");
    const clockSize = 100;
    const twoPi = Math.PI * 2;

    clockCtx.clearRect(0, 0, clock.width, clock.height);
    clockCtx.beginPath();
    clockCtx.arc(clockSize, clockSize, clockSize, 0, twoPi, true);

    // Hour lines
    for(let i = 0; i < 12; i++){
      let theta = i*(twoPi/12);
      const handSize = clockSize * 0.15;
      clockCtx.moveTo(clockSize + clockSize * Math.cos(theta) * 0.95, clockSize + clockSize * Math.sin(theta) * 0.95);
      clockCtx.lineTo(clockSize +(clockSize - handSize) * Math.cos(theta) * 0.95, clockSize +(clockSize - handSize) * Math.sin(theta) * 0.95);
    }

    // Minute lines
    for(let i = 0; i < 60; i++){
      let theta = i * (twoPi/60);
      const handSize = clockSize * 0.05;
      clockCtx.moveTo(clockSize + clockSize * Math.cos(theta) * 0.95, clockSize + clockSize * Math.sin(theta) * 0.95);
      clockCtx.lineTo(clockSize + (clockSize - handSize) * Math.cos(theta) * 0.95, clockSize + (clockSize - handSize) * Math.sin(theta) * 0.95);
    }

    let theta = (time/600/60 - 0.25) * twoPi;
    let handSize = clockSize * 0.5;
    clockCtx.moveTo(clockSize, clockSize);
    clockCtx.lineTo(clockSize + handSize * Math.cos(theta), clockSize + handSize * Math.sin(theta));

    theta = (time/10/60 - 0.25) * twoPi;
    handSize = clockSize * 0.7;
    clockCtx.moveTo(clockSize, clockSize);
    clockCtx.lineTo(clockSize + handSize * Math.cos(theta), clockSize + handSize * Math.sin(theta));

    clockCtx.stroke();
  }
}

draw(time);
export default Stopwatch;
