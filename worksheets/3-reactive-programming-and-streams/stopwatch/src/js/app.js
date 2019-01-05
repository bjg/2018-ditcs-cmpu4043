import "../css/style.css";
import { Observable, range, interval, fromEvent, merge, empty } from "rxjs";
import { map, mapTo, startWith, switchMap, scan } from "rxjs/operators"; 


const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const splitButton = document.getElementById("split");
const resetButton = document.getElementById("reset");

const start = fromEvent(document.getElementById("start"), "click");
const stop = fromEvent(document.getElementById("stop"), "click");
const split = fromEvent(document.getElementById("split"), "click");
const reset = fromEvent(document.getElementById("reset"), "click");

const centre = 275;
const radius = 250;
const clockdrawMarks = 60;
const rangeVal = range(0, 60);
const notchAngle = 360 / clockdrawMarks;
const source = interval(10);
let splits = [];
const totalTimer = 0;

const canvas = document.getElementById("canvas");
canvas.width="550";
canvas.height="550";

//Rotate Function
function rotate(cx, cy, x, y, angle) {
	const radians = (Math.PI / 180) * angle;
	const newX = cx + (x-cx)*Math.cos(radians) - (y-cy)*Math.sin(radians);
	const newY = cy + (x-cx)*Math.sin(radians) + (y-cy)*Math.cos(radians);
	return [newX, newY];
}

// Draws clock
function drawClock(ctx, centre, radius) {
	ctx.beginPath();
	ctx.arc(centre, centre, radius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(centre, centre, radius + 10, 0, 2 * Math.PI);
	ctx.stroke();

	rangeVal.subscribe(val => drawMarks(val * notchAngle, centre, val));
}

//Draw marks inbetween
function drawMarks(angle, centre, iterate) {
	ctx.beginPath();
	const start = (iterate % 5) ? 50 : 60;
	const end = (iterate % 5) ? 5 : 15;
	const point1 = rotate(centre, centre, centre, start, angle);
	const point2 = rotate(point1[0], point1[1], point1[0], point1[1] - end, angle);
	ctx.lineTo(point1[0], point1[1]);
	ctx.lineTo(point2[0],point2[1]);
	ctx.stroke();
}

//Minute and second hand
function drawClockHands(val) {
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

function updateClock() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawClock(ctx, centre, radius);
}

// Creates the format for the <span> 
function digitalTimer(val) {
	const valString = val.toString();
	const min = Math.floor(val / 6000) % 100;
	const sec = Math.floor(val / 100) % 60;
	const tenth = valString.slice(-2);

	return ((min.toString().length == 1) ? "0" + min : min) 
		+ ":" + ((sec.toString().length == 1) ? "0" + sec : sec) + ":" + tenth;
}

// Adds split
function addSplit(split) {
	splits.push(split);

	const spanTime = document.createElement("SPAN");
	spanTime.id = "time";
	document.getElementById("split").innerHTML="";
	document.getElementById("split").appendChild(spanTime);
	const displaySplits = splits.slice(Math.max(splits.length - 5, 0));
	displaySplits.map(val => {
		const br = document.createElement("BR");
		const spanSplit = document.createElement("SPAN");
		const textnode = document.createTextNode(val);
		spanSplit.appendChild(textnode);
		document.getElementById("split").appendChild(br);
		document.getElementById("split").appendChild(spanSplit);
	});
}

function conClock(ticks) {
	updateClock();
	document.getElementById("time").innerHTML = digitalTimer(ticks);
	drawClockHands(ticks);
}



function startTimer(val) {
	startButton.disabled = true;
	stopButton.disabled = false;
	splitButton.disabled = false;
	resetButton.disabled = false;
	return val;
}


function stopTimer(val) {
	startButton.disabled = false;
	stopButton.disabled = true;
	splitButton.disabled = true;
	resetButton.disabled = false;
	return val;
}

// Resets previous splits
function resetSplits() {
	const span = document.createElement("SPAN");
	span.id = "time";
	document.getElementById("split").innerHTML="";
	document.getElementById("split").appendChild(span);

	startButton.disabled = false;
	stopButton.disabled = true;
	splitButton.disabled = true;
	resetButton.disabled = true;
	updateClock();
	splits = [];
}

function resetTimer() {
	resetSplits();
	incrementer.unsubscribe();
	incrementer = null;
	incrementer = subscribe(start, stop);
	document.getElementById("time").innerHTML = "00:00:00";
}

//Resets the subscriber for the start and stop streams
function subscribe() {
	return merge(start, stop).pipe(
		startWith(false),
		switchMap(val => (val ? intervalSplit : empty())),
		scan((acc, curr) => curr + acc, totalTimer)
	).subscribe(ticks => conClock(ticks));
}

const ctx = canvas.getContext("2d");

// Initalise the clock
drawClock(ctx, centre, radius);
rangeVal.subscribe(val => drawMarks(val * notchAngle, centre, val));
const intervalSplit = interval(10).pipe(mapTo(1));
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
let incrementer = subscribe(start, stop);
split.subscribe(split => addSplit(String(document.getElementById("time").innerHTML)));
reset.subscribe(val => resetTimer());