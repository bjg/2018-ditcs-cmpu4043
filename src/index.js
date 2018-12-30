import Counter from "./components/Counter/Counter";
import "./style.css";

// Buttons & Clockface/Timer
const startB = document.getElementById("start");
const stopB = document.getElementById("stop");
const resetB = document.getElementById("reset");
const visual = document.getElementById('visual');
const timer = document.getElementById('timer');

let begin = false;
let time = 0;

//Functions to make the Timer work
function begin(time) {
	startB.disabled = true;
	stopB.disabled = false;
	resetB.disabled = false;
	return time;
}

function cease(time) {
	startB.disabled = false;
	stopB.disabled = true;
	resetB.disabled = false;
	return time;
}

function reset(time) {
	
}


//Observables 
const subscribe = source.subscribe(
  sub => {
    if(!begin) return;
    time++;
  });

const start.fromEvent(document.getElementById('start'), 'click')
  .subscribe(e => {
    started = true;
  });

const stop.fromEvent(document.getElementById('stop'), 'click')
  .subscribe(e => {
    started = false;
  });

const reset.fromEvent(document.getElementById('reset'), 'click')
  .subscribe(e => {
    started = false;
    time = 0;
  });
