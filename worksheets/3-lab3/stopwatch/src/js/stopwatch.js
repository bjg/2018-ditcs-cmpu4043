import { interval } from 'rxjs';
import { Observable } from 'rxjs/Rx';

import '../css/style.css';

// DEFINE CANVAS AND ITS CONTEXT.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const buttons = document.getElementsByClassName("button");
const splitTimeList = document.getElementById("splitTimes");
const displayTime = document.getElementById("currentTime");

let timeStarted = false;
let curTime = 0;
let counter = 0;

let date = new Date;
let angle;
let secHandLength = 200;
let display = "00:00:00";
displayTime.innerHTML = display;

const timeInterval = interval(100);

runClock(0, 0, 0);

const eventObserver = {
  next: (id) => {
  if (id === 'start')
  {
    timeStarted = true;
  }
  if (id === 'stop')
  {
    timeStarted = false;
  }
  if (id === 'split')
  {
    if(timeStarted)
    {
      if(counter < 5) {
        let splitTime = document.createElement("li");
        splitTime.setAttribute("id", "times");
        let timeValue = document.createTextNode(display);
        splitTime.appendChild(timeValue);
        splitTimeList.appendChild(splitTime);
      }

      counter++;
    }
  }
  if (id === 'reset')
  {
    timeStarted = false;
    display = "00:00:00";
    displayTime.innerHTML = display;

    curTime = 0;
    counter = 0;

    while(splitTimeList.firstChild) splitTimeList.removeChild(splitTimeList.firstChild);
    runClock(curTime);
  }
}}

timeInterval.subscribe(time =>{
  if(!timeStarted){
    return;
  }
  else {
    curTime++;
    let minutes = Math.floor(curTime / 600);
    let seconds = Math.floor((curTime / 10) % 60);
    let millisecs= curTime % 10;

    display = padIt(minutes)+":"+padIt(seconds) +":"+millisecs+"0";
    displayTime.innerHTML = display;

    runClock(minutes, seconds, millisecs);
  }
});

function padIt(n){
  return (n < 10 ? "0" : "") + n;
}

function runClock(minutes, seconds, millisecs)
{
  //Start by clearing canvas.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Drawing the outer clock face.
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, secHandLength + 20, 0, Math.PI * 2);
  ctx.strokeStyle = '#92949C';
  ctx.stroke();

  //Drawing the inner clock face.
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, secHandLength + 15, 0, Math.PI * 2);
  ctx.strokeStyle = '#929BAC';
  ctx.stroke();

  //Drawing the centre circle.
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, Math.PI * 2);
  ctx.lineWidth = 3;
  ctx.fillStyle = '#353535';
  ctx.strokeStyle = '#0C3D4A';
  ctx.stroke();

  //Drawing the minute intervals
  for (let i = 0; i < 12; i++) {
    angle = (i - 3) * (Math.PI * 2) / 12;
    ctx.lineWidth = 1;
    ctx.beginPath();

    let x1 = (canvas.width / 2) + Math.cos(angle) * (secHandLength + 15);
    let y1 = (canvas.height / 2) + Math.sin(angle) * (secHandLength + 15);
    let x2 = (canvas.width / 2) + Math.cos(angle) * secHandLength;
    let y2 = (canvas.height / 2) + Math.sin(angle) * secHandLength;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = '#466B76';
    ctx.stroke();
  }

  //Drawing the second intervals
  for (let i = 0; i < 60; i++) {
    angle = (i - 3) * (Math.PI * 2) / 60;
    ctx.lineWidth = 1;
    ctx.beginPath();

    let x1 = (canvas.width / 2) + Math.cos(angle) * (secHandLength + 15);
    let y1 = (canvas.height / 2) + Math.sin(angle) * (secHandLength + 15);
    let x2 = (canvas.width / 2) + Math.cos(angle) * (secHandLength + 5);
    let y2 = (canvas.height / 2) + Math.sin(angle) * (secHandLength + 5);

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = '#C4D1D5';
    ctx.stroke();
  }

  //Drawing the seconds hand.
  angle = ((Math.PI * 2) * (seconds / 60)) - ((Math.PI * 2) / 4);
  ctx.lineWidth = 0.5;

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secHandLength),
      canvas.height / 2 + Math.sin(angle) * secHandLength);

  ctx.strokeStyle = '#586A73';
  ctx.stroke();

  //Drawing the minutes hand.
  angle = ((Math.PI * 2) * (minutes / 60)) - ((Math.PI * 2) / 4);
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secHandLength / 1.1),
      canvas.height / 2 + Math.sin(angle) * secHandLength / 1.1);

  ctx.strokeStyle = '#999';
  ctx.stroke();

}

Observable.fromEvent(buttons, 'click')
            .map((event) => event.target.id)
            .subscribe(eventObserver)
