/*
	Name: Robert Vaughan
	Student Number: C15341261

	The following is a RxJs script that will use Obversable
	operators to generate a stop watch.

	Utilised LearnRXJS to discover operators and ways about
	solving the given task

	https://www.learnrxjs.io/

	Two mutable variables are used within the codebase. I wanted my solution to follow
	functional standards and be immutable as possible
*/

import "../css/style.css";
import { Observable, range, interval, fromEvent, merge, empty } from "rxjs";
import { map, mapTo, startWith, switchMap, scan } from "rxjs/operators"; 

// Buttons
const startButton = document.getElementById("Start");
const stopButton = document.getElementById("Stop");
const splitButton = document.getElementById("Split");
const resetButton = document.getElementById("Reset");

const startOb = fromEvent(document.getElementById("Start"), "click");
const stopOb = fromEvent(document.getElementById("Stop"), "click");
const splitOb = fromEvent(document.getElementById("Split"), "click");
const resetOb = fromEvent(document.getElementById("Reset"), "click");

const centre = 275;
const radius = 250;
const clockDrawNotch = 60;
const rangeVal = range(0, 60);
const notchAngle = 360 / clockDrawNotch;
const source = interval(10);

// Store splits and timer increment
let splits = [];
const totalTimer = 0;

const canvas = document.getElementById("canvas");
canvas.width="550";
canvas.height="550";

/*
	Rotates passed in ordinates to an angle
*/
function rotate(cx, cy, x, y, angle) {
	const radians = (Math.PI / 180) * angle;
	const newX = cx + (x-cx)*Math.cos(radians) - (y-cy)*Math.sin(radians);
	const newY = cy + (x-cx)*Math.sin(radians) + (y-cy)*Math.cos(radians);
	return [newX, newY];
}

/*
	Drawing of the minute and seconds hands
*/
function drawHands(val) {
	const minAngle = (360 / 60) * (Math.floor(val / 6000) % 60);
	const secAngle = (360 / 60) * (Math.floor(val / 100) % 60);

	ctx.beginPath();
	ctx.lineTo(centre, centre);
	const minHand = rotate(centre, centre, centre, 60, minAngle);
	ctx.lineTo(minHand[0], minHand[1]);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineTo(centre, centre);
	const secHand = rotate(centre, centre, centre, 60, secAngle);
	ctx.lineTo(secHand[0], secHand[1]);
	ctx.stroke();
}

/*
	Draws the individula notches on a clock
*/
function drawNotch(angle, centre, iterate) {
	ctx.beginPath();
	const start = (iterate % 5) ? 50 : 60;
	const end = (iterate % 5) ? 5 : 15;
	const point1 = rotate(centre, centre, centre, start, angle);
	const point2 = rotate(point1[0], point1[1], point1[0], point1[1] - end, angle);
	ctx.lineTo(point1[0], point1[1]);
	ctx.lineTo(point2[0],point2[1]);
	ctx.stroke();
}

/*
	Draws the default clock with the hands
*/
function drawBasicClock(ctx, centre, radius) {
	ctx.beginPath();
	ctx.arc(centre, centre, radius, 0, 2 * Math.PI);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(centre, centre, radius + 10, 0, 2 * Math.PI);
	ctx.stroke();

	rangeVal.subscribe(val => drawNotch(val * notchAngle, centre, val));
}

/*
	Draws the clock every interval
*/
function reDrawClock() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBasicClock(ctx, centre, radius);
}

/*
	Creates the format for the <span> containing the timer info
*/
function setDigitalTimer(val) {
	const valString = val.toString();
	const min = Math.floor(val / 6000) % 100;
	const sec = Math.floor(val / 100) % 60;
	const tenth = valString.slice(-2);

	return ((min.toString().length == 1) ? "0" + min : min) 
		+ ":"
		+ ((sec.toString().length == 1) ? "0" + sec : sec)
		+ ":"
		+ tenth;
}

/*
	Draws clock by a passed ticks value
*/
function constClock(ticks) {
	reDrawClock();
	document.getElementById("time").innerHTML = setDigitalTimer(ticks);
	drawHands(ticks);
}

/*
	Adds a splits to the timer
*/
function addSplit(split) {
	// console.log(split);
	splits.push(split);

	const spanTime = document.createElement("SPAN");
	spanTime.id = "time";
	document.getElementById("split-container").innerHTML="";
	document.getElementById("split-container").appendChild(spanTime);

	const displaySplits = splits.slice(Math.max(splits.length - 5, 0));
	displaySplits.map(val => {
		const br = document.createElement("BR");
		const spanSplit = document.createElement("SPAN");
		const textnode = document.createTextNode(val);
		spanSplit.appendChild(textnode);
		document.getElementById("split-container").appendChild(br);
		document.getElementById("split-container").appendChild(spanSplit);
	});
}

/*
	Erases past splits
*/
function resetSplit() {
	const span = document.createElement("SPAN");
	span.id = "time";
	document.getElementById("split-container").innerHTML="";
	document.getElementById("split-container").appendChild(span);

	startButton.disabled = false;
	stopButton.disabled = true;
	splitButton.disabled = true;
	resetButton.disabled = true;

	reDrawClock();
	splits = [];
}

/*
	Starts timer when user hits Start
*/
function startTimer(val) {
	startButton.disabled = true;
	stopButton.disabled = false;
	splitButton.disabled = false;
	resetButton.disabled = false;
	return val;
}

/*
	Stops timer when user hits Stop
*/
function stopTimer(val) {
	startButton.disabled = false;
	stopButton.disabled = true;
	splitButton.disabled = true;
	resetButton.disabled = false;
	return val;
}

/*
	Creates a new clock instance
*/
function resetTimer() {
	resetSplit();
	incrementer.unsubscribe();
	incrementer = null;
	incrementer = subscribeInit(start, stop);
	document.getElementById("time").innerHTML = "00:00:00";
}

/*
	Resets the subscriber for our Start and Stop streams
*/
function subscribeInit() {
	return merge(start, stop).pipe(
		startWith(false),
		switchMap(val => (val ? intervalSplit : empty())),
		scan((acc, curr) => curr + acc, totalTimer)
	).subscribe(ticks => constClock(ticks));
}

const ctx = canvas.getContext("2d");

// Initalise the clock
drawBasicClock(ctx, centre, radius);
rangeVal.subscribe(val => drawNotch(val * notchAngle, centre, val));

const intervalSplit = interval(10).pipe(mapTo(1));

// Obserables for each button
const start = fromEvent(startButton, "click").pipe(
	mapTo(true),
).pipe(
	map(val => startTimer(val))
);

const stop = fromEvent(stopButton, "click").pipe(
	mapTo(false),
).pipe(
	map(val => stopTimer(val))
);

const split = fromEvent(splitButton, "click");
const reset = fromEvent(resetButton, "click");

// Mutable so we ca reset the time (could think of a non-mutable solution)
let incrementer = subscribeInit(start, stop);

// Subscribers to the split and reset
split.subscribe(split => addSplit(String(document.getElementById("time").innerHTML)));
reset.subscribe(val => resetTimer());