import {Observable} from 'rxjs/Rx';
import '../css/style.css';

//Get elements from html
const buttons = document.getElementsByClassName("stopWatchButton");
var digitalTimer = document.getElementById("digitalTimer");
const canvas = document.getElementById("stopWatch");

//Context for drawing circle
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.95

//Timer class used for storing variables
let timer = {
  isOn: false,
  micSec: 0,
  sec: 0,
  min: 0,
  currentSplit: 1
};

//Timer stream in charge of the timing itself
//Interval every mili second
const timer$ = Observable
.interval(10)
.map(function () {
  if (timer.isOn) {
    timer.micSec++;
    if (timer.micSec >= 100) {
      timer.micSec = 0;
      timer.sec++;
    } else if (timer.sec > 59) {
      timer.sec = 0;
      timer.min++;
    }
    drawClock();
  }
})

//Timer stream subsciption
//Updates the digital timer
timer$.subscribe(function () {
  digitalTimer.innerHTML =
  timer.min.toString() + ":" +
  timer.sec.toString() + ":" +
  timer.micSec.toString();
});

//Buttons stream which contains all buttons which can be pressed
const buttons$ = Observable.merge (
  Observable.fromEvent(buttons, 'click')
  .map(e => e.target.innerHTML)
)

//Input stream which handles the button clicks
const input$ = buttons$
  .scan((acc,cur) => {

    var splitsList = document.getElementById("splitsList");

    switch(cur) {
      case "Start Timer":{
        timer.isOn = true;
        break;
      }

      case "Stop Timer":{
        timer.isOn = false;
        break;
      }

      case "Reset Timer":{
        timer.micSec = 0;
        timer.sec = 0;
        timer.min = 0;
        timer.currentSplit = 1;
        while (splitsList.hasChildNodes()) {
          splitsList.removeChild(splitsList.lastChild);
        }
        drawClock();
        break;
      }

      case "Split Timer":{
        var splitItem = document.createElement('li');
        splitItem.innerHTML =
        "(" + timer.currentSplit++ + ") " +
        timer.min + ":" +
        timer.sec + ":" +
        timer.micSec;
        splitsList.appendChild(splitItem);
        break;
      }

      default:
        console.log(cur);
    }//End Switch
  });

//Input subscription (will just log errors)
input$.subscribe(function(x) {
  },
  function (err) {
    console.log('There was an error: ' + err);
  }
);

//Function which can be called to easily draw the clock
function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

//Draws the clock face and center circle
function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, radius*0.05, 0, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
}

//Draws the numbers on the clock
function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.05 + "px";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  for(num = 1; num < 61; num++){
    ang = num * Math.PI / 30;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

//Draws the current time
function drawTime(ctx, radius){
    var minute = timer.min;
    var second = timer.sec;

    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.05);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

//Draws the hands
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

//Used for drawing the first clock
drawClock();
