import { interval, fromEvent, merge } from "rxjs";
import { mapTo } from "rxjs/operators";

import "./app.css";

const canvasSize = 200;
const center = canvasSize / 2;
const radius = (canvasSize / 2) - 10;
const minLength = radius - 10;
const secLength = radius - 20;

const time = interval(100);
let timeSub;

let currentTens = 0;
let currentSecs = 0;
let currentMins = 0;

let savedTimes = [];

function App() {
  const container = Container('container');
  const digitalTimer = Container('timer');
  const canvas = Canvas(canvasSize, canvasSize);
  const startBtn = Button("Start");
  const stopBtn = Button("Stop");
  const splitBtn = Button("Split");
  const resetBtn = Button("Reset");
  const splitTimes = SplitTimes();

  // Setup Canvas
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'grey';

  // Draw Clock
  drawCircle(ctx);
  drawMinutes(currentMins, ctx);
  drawSeconds(currentSecs, ctx);

  // Handle input
  merge(
    fromEvent(startBtn, "click").pipe(mapTo("start")),
    fromEvent(stopBtn, "click").pipe(mapTo("stop")),
    fromEvent(splitBtn, "click").pipe(mapTo("split")),
    fromEvent(resetBtn, "click").pipe(mapTo("reset")),
  ).subscribe(input => {
    switch(input) {
      case "start":
        startStopWatch(canvas, ctx, digitalTimer);
        return;
      case "stop":
        stopStopWatch();
        return;
      case "split":
        splitStopWatch(splitTimes);
        return;
      case "reset":
        stopStopWatch();
        resetStopWatch(canvas, ctx, digitalTimer, splitTimes);
        return;
    }
  });

  container.appendChild(startBtn);
  container.appendChild(stopBtn);
  container.appendChild(splitBtn);
  container.appendChild(resetBtn);
  container.appendChild(canvas);
  container.appendChild(digitalTimer);
  container.appendChild(splitTimes);
  
  return container;
}

function SplitTimes() {
  const div = document.createElement("div");
  return div;
}

function Button(label) {
  const button = document.createElement("button");
  button.innerText = label;
  return button;
}

function startStopWatch(canvas, ctx, digitalTimer) {
  timeSub = time.subscribe(time => {
    currentTens = time % 10;
    currentSecs = Math.floor(time / 10) % 60;
    currentMins = Math.floor(time / 600) % 60;
    digitalTimer.innerHTML = formatTime(currentMins, currentSecs, currentTens);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Clock
    drawCircle(ctx);
    drawMinutes(currentMins, ctx);
    drawSeconds(currentSecs, ctx);
  });
}

function stopStopWatch() {
  timeSub.unsubscribe();
}

function splitStopWatch(splitTimes) {
  const newTime = formatTime(currentMins, currentSecs, currentTens);
  savedTimes.push(newTime);
  updateSplits(splitTimes, newTime);
}

function resetStopWatch(canvas, ctx, digitalTimer, splitTimes) {
  savedTimes = [];
  currentTens = 0;
  currentSecs = 0;
  currentMins = 0;

  splitTimes.innerHTML = '';
  digitalTimer.innerHTML = '0 : 0 : 0'
  
  // Draw Clock
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle(ctx);
  drawMinutes(currentMins, ctx);
  drawSeconds(currentSecs, ctx);
}

function Canvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function Container(classes) {
  const container = document.createElement('div');
  container.classList.add(classes);
  return container;
}

function drawCircle(ctx) {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawMinutes(minutes, ctx) {
  const minRadians = Math.PI * (minutes * 6) / 180;
  const minutesX = center + minLength * Math.sin(minRadians);
  const minutesY = center - minLength * Math.cos(minRadians);
  
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.moveTo(center, center);
  ctx.lineTo(minutesX, minutesY);
  ctx.stroke();
}

function drawSeconds(seconds, ctx) {
  const secRadians = Math.PI * (seconds * 6) / 180;
  const secondsX = center + secLength * Math.sin(secRadians);
  const secondsY = center - secLength * Math.cos(secRadians);

  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.moveTo(center, center);
  ctx.lineTo(secondsX, secondsY);
  ctx.stroke();
}

function formatTime(mins, secs, tens) {
  return mins + ' : ' + secs + ' : ' + tens;
}

function updateSplits(splitTimes, newTime) {
  const div = document.createElement('div');
  div.innerHTML = newTime;
  splitTimes.appendChild(div);
}

document.querySelector('#app').appendChild(App());