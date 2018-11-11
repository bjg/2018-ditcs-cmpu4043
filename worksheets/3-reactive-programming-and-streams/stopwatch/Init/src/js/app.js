import { fromEvent, merge, pipe, subscribe, Observable } from "rxjs";
import { mapTo, scan, startWith, tap, pluck } from "rxjs/operators";
import '../css/style.css'; // importing css

var ctx = document.getElementById("canvas").getContext("2d");

                  // W   H
ctx.clearRect(0, 0, 150, 170);
// Moving canvas and its original x horizontally and y vertically on the canvas grid
ctx.translate(150, 70);
// Scalaing of the rect name
ctx.scale(0.5, 0.5);
ctx.rotate(-Math.PI / 2);
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;
ctx.lineCap = 'square';

// Hours x 12
ctx.save();
for (var i = 0; i < 12; i++) {
  // Begin line path
  ctx.beginPath();
  // Rotation Angle 360 / 12 = 30d
  ctx.rotate(2 * Math.PI / 12);
  // 2 points x & y
  ctx.moveTo(100, 0);
  // Connecting two points of moveTo with a stroke() 
  ctx.lineTo(120, 0);
  ctx.stroke();
}

// Mins x 60 same as with the hours just more divisions
ctx.save();
for (var i = 0; i < 60; i++){
  ctx.beginPath();
  ctx.rotate(2 * Math.PI / 60);
  ctx.moveTo(117, 0);
  ctx.lineTo(122, 0);
  ctx.lineWidth = 1;
  ctx.stroke();
}

// Encircle
ctx.save();
ctx.beginPath();
ctx.arc(1, 1, 130, 0, Math.PI *2, true);
ctx.arc(1, 1, 135, 0, Math.PI *2, true);
ctx.stroke();

let time = 0;

// TimerHand
ctx.save()
ctx.beginPath();
ctx.moveTo(-30, 0);
ctx.lineTo(75, 0);
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.stroke();

// TimerSecondHand
ctx.save()
ctx.beginPath();
ctx.rotate(2* Math.PI / 6);
ctx.moveTo(-30, 0);
ctx.lineTo(85, 0);
ctx.lineWidth = 1;
ctx.lineCap = 'round';
ctx.stroke();

// Start Stop Split Reset 
const buttonStart = document.getElementById("start");
const buttonStop = document.getElementById("stop");
const buttonSplit = document.getElementById("split");
const buttonReset = document.getElementById("reset");

const stream$ = (merge(buttonStart, buttonStop, buttonSplit, buttonReset));

stream$.subscribe(time =>{

});