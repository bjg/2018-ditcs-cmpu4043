import Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver, switchMap } from 'rxjs';
import { map, filter, scan , mapTo } from 'rxjs/operators';

import '../css/styles.css';

const c = document.getElementById('stopwatch');
let digital = document.getElementById('digital');
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let splitBtn = document.getElementById('split');

//elements for the minutes, seconds and tenths
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let tenths = document.getElementById("tenths");
let splits = document.getElementById("splits");

//Create one stream for each button
const start$ = fromEvent(startBtn,'click');
const stop$ = fromEvent(stopBtn,'click');
const reset$ = fromEvent(resetBtn,'click');
const split$ = fromEvent(splitBtn,'click');

const timeInterval = interval(100);

const radius = c.height/2;

let timeStarted = false;
let display = "00:00:00";
digital.innerHTML = display;


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
    display.innerHTML = display;

    runClock(minutes, seconds, millisecs);
  }
});

function drawWatch(argument) {
	
	const ctx = c.getContext("2d");

	ctx.clearRect(0, 0, c.width, c.height);

	ctx.beginPath();
	ctx.arc(c.width/2, c.height/2, radius-1, 0, 2 * Math.PI);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(c.width/2, c.height/2, radius-5, 0, 2 * Math.PI);
	ctx.stroke();

	ctx.beginPath();
    ctx.arc(c.width/2, c.height/2, 2, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.stroke();
}

drawWatch(0);
