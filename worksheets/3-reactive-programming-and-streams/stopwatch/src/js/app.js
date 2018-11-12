import '../css/style.css';
import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Rx';

//gets the split list div to keep all the split times
const split = document.getElementById('split_list');

//buttons + its stream
const buttons = document.getElementsByClassName("button");
const buttons$ =  Observable.fromEvent(buttons, 'click').pluck('srcElement','id');

//observable that represents the timespan evry tenth of a second
//emit value in sequence every 1 second / 10
const time$ = Observable
  .interval(1000/10)
  .timeInterval();
var time = 0;
//init the stopwatch to be off
var timing = new Boolean(false);

//vars for digital clock funcs
var milliseconds,seconds,minutes;
var digital = document.getElementById('time');

//stream of time
time$.subscribe( value => {
  //if stopwatch is off breaks
  if(timing == false)
    return;
  //count time
  time++;
  //console.log(time);
  milliseconds = time % 10;
  seconds = Math.floor(time / 10 % 60);
  minutes = Math.floor(seconds / 60);
  setup();
  digital.innerHTML = (minutes + ":" + seconds + ":" + milliseconds);
  console.log(minutes,seconds,milliseconds);

})

function setup(){
//vars for analog clock
var canvas = document.getElementById('clock');
var ctx = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
//continusly using save & restore to seperate 
//each element so they wouldn't overwrite each other
ctx.save();
//clears canvas
ctx.clearRect(0, 0, 150, 150);
//sets the centerX and centerY as points 0,0 on the canvas
//to make it easy to work with
ctx.translate(centerX, centerY);
ctx.scale(0.5, 0.5);
ctx.rotate(-Math.PI / 2);
ctx.strokeStyle = 'black';
ctx.fillStyle = 'white';
ctx.lineWidth = 5;
ctx.lineCap = 'round';

//minutes
ctx.save();
for(var i = 0; i < 12; i++){
  ctx.beginPath();
  ctx.rotate(Math.PI / 6);
  //drawing lines point x point y
  ctx.moveTo(centerX + 30,0);
  ctx.lineTo(centerX + 60, 0);
  ctx.stroke();
}
ctx.restore();

//seconds
ctx.save();
ctx.lineWidth = 2;
for(i = 0; i < 60; i++){
  //prevents overwriting on the minutes lines
  if (i % 5!= 0){
    ctx.beginPath();
    //drawing lines point x point y
    ctx.moveTo(centerX + 50, 0);
    ctx.lineTo(centerX + 59, 0);
    ctx.stroke();
  }
  ctx.rotate(Math.PI / 30);
}
ctx.restore();

ctx.filleStyle = 'black';

//minutes hand
ctx.save();
ctx.rotate((Math.PI / 30) * minutes + (Math.PI / 1800) * seconds);
ctx.lineWidth = 7;
ctx.strokeStyle = 'black';
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(centerX + 15, 0);
ctx.stroke();
ctx.restore();

// milliseconds hand
ctx.save();
ctx.rotate(time * Math.PI / 60);
ctx.strokeStyle = 'grey';
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(centerX + 25, 0);
ctx.stroke();

//creates the circle in the center of the clock
ctx.beginPath();
ctx.fillStyle = 'black';
ctx.arc(0, 0, centerX * 0.10, 0, Math.PI * 2, true);
ctx.fill();
ctx.restore();

//creates the outline
ctx.beginPath();
ctx.lineWidth = 7;
ctx.strokeStyle = 'black';
ctx.arc(0,0,centerX *1.9,0,Math.PI* 2, true);
ctx.stroke();
//creates second outline
ctx.lineWidth = 3;
ctx.strokeStyle = 'grey';
ctx.arc(0,0,centerX *1.8,0,Math.PI* 2, true);
ctx.stroke();
ctx.restore();

}

//runs the stream of buttons against that switch statement
buttons$.subscribe(value => {
  switch(value){
    case 'start':
      timing = true;
      break;
    case 'stop':
      timing = false;
      break;
    case 'split':
      //makes sure watch has been run
      if(milliseconds > 0){
        //creates an element of type paragraph to show a time of split
      var list = document.createElement("P");
      list.innerHTML = (minutes + ":" + seconds + ":" + milliseconds);
      split.appendChild(list);
      break;
      }
    case 'reset':
      //resets analog/digital clocks
      setup();
      time = 0;
      timing = false;
      digital.innerHTML = ("Press start to use");
      split.innerHTML = "";
      minutes,seconds,milliseconds = 0;
      break;
  }
})

setup();

