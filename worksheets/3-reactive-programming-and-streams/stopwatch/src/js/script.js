import { interval, merge, fromEvent, pipe, from } from 'rxjs';
import {map,mapTo, mergeAll, pluck } from 'rxjs/operators';
import '../css/stylesheet.css';

const display = document.getElementsByTagName("input")[0];
const buttons = document.getElementsByClassName("btn");
const splitTime = document.getElementById("timeList");
const clockTimer = interval(100);
let timeTracker =0;
let timeStarted =false;
let counter =0;
display.value = "00:00:00";
displayClock(timeTracker);
const btnStream = fromEvent(buttons, "click").pipe(map(btn => btn.path[0].defaultValue));

btnStream.subscribe(val => {
  if (val === 'start')
  {
    console.log("start clicked");
     timeStarted = true;
  }
  if (val === 'stop')
  {
    console.log("stop clicked");
     timeStarted =false;
  }
  if (val === 'split')
  {
    if(timeStarted){
      counter ++;
      console.log("split clicked");
      var liname =document.createElement("li");
      liname.setAttribute("id", "times");
      let timeValue =document.createTextNode("Lap "+counter+" "+display.value);
      liname.appendChild(timeValue);
      splitTime.appendChild(liname);
    }
  }
  if (val === 'reset')
  {
    console.log("reset clicked");
     timeStarted =false;
     display.value = "00:00:00";
     timeTracker = 0;
     counter = 0;
     var ul = document.getElementById("timeList");
     while(ul.firstChild) ul.removeChild(ul.firstChild);
     displayClock(timeTracker);
  }
});

clockTimer.subscribe(time =>{
  if(!timeStarted){
    return;
  }
  else {
    timeTracker++;
    let minutes = Math.floor(timeTracker / 600);
    let seconds = Math.floor((timeTracker / 10) % 60);
    let milliseconds= timeTracker%10


    display.value  = padIt(minutes)+":"+padIt(seconds) +":"+milliseconds+"0";
    displayClock(timeTracker);
  }
})
//padding for the leading 0's, if the number is less then 10 add a 0 to the start
function padIt(n){
  return (n < 10 ? "0" : "") + n;
}

function displayClock(time){
  const canvas = document.getElementById('canvas');
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const faceSize = 90;
  const contentSize = 1;
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();

  // Outer circle
  ctx.fillStyle = "#111111"; //black
  ctx.lineWidth=1;
  ctx.beginPath();
  ctx.arc(faceSize, faceSize, faceSize, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fcfc0a"; //yellow
  ctx.beginPath();
  ctx.arc(faceSize, faceSize, faceSize - 10, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 12 longer lines

  ctx.strokeStyle = "#fc0909";
  ctx.fillStyle = "#fc0909";
  ctx.beginPath();
  ctx.lineWidth=1;
  for (let i = 0; i < 12; i++) {
    let angle = i * (Math.PI * 2 / 12);
    const armLength = faceSize * 0.15;
    ctx.moveTo(faceSize + faceSize * Math.cos(angle) * contentSize, faceSize + faceSize * Math.sin(angle) * contentSize);
    ctx.lineTo(faceSize + (faceSize - armLength) * Math.cos(angle) * contentSize, faceSize + (faceSize - armLength) * Math.sin(angle) * contentSize);
  }

  // 60 shorter lines
  for (let i = 0; i < 60; i++) {
    let angle = i * (Math.PI * 2 / 60);
    const armLength = faceSize * 0.05;
    ctx.moveTo(faceSize + faceSize * Math.cos(angle) * contentSize, faceSize + faceSize * Math.sin(angle) * contentSize);
    ctx.lineTo(faceSize + (faceSize - armLength) * Math.cos(angle) * contentSize, faceSize + (faceSize - armLength) * Math.sin(angle) * contentSize);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Longer hand (minute), each minute goes one step
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.fillStyle = "green";
  let angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
  let armLength = faceSize * 0.5;
  ctx.lineCap = "round";
  ctx.moveTo(faceSize, faceSize);
  ctx.lineTo(faceSize + armLength * Math.cos(angle), faceSize + armLength * Math.sin(angle));

  // Shorter hand (second), each second goes one step
  angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
  armLength = faceSize * 0.8;
  ctx.moveTo(faceSize, faceSize);
  ctx.lineCap = "round";
  ctx.lineWidth=8;
  ctx.lineTo(faceSize + armLength * Math.cos(angle), faceSize + armLength * Math.sin(angle));

  ctx.stroke();
}
