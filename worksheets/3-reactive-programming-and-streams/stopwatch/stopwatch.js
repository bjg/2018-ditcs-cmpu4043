import {Observable, Subject, fromEvent, merge, interval} from 'rxjs';
import { map, filter, scan, mapTo, takeUntil, startWith, switchMap} from "rxjs/operators";

//button elements
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");
let splitButton = document.getElementById("split");

//elements for the minutes, seconds and tenths
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let tenths = document.getElementById("tenths");

//element for the splits
let splits = document.getElementById("splits");

let stopwatchMinSize = 50;
let stopwatchSize = 3*stopwatchMinSize;
let splitCount = 0;

//stopwatch canvas
let canvas = document.getElementById("stopwatch");

let x = canvas.width/2;
let y = canvas.height/2;

let radius = canvas.width/2.8;

let currentBigTickAngle = 0;
let currentSmallTickAngle = 0;

//draw watch face
let face = canvas.getContext("2d");
updateFace(currentBigTickAngle, currentSmallTickAngle);

let ticking = false;
let timer = 0;

let time = interval(10);

const startEvent = fromEvent(startButton, 'click').pipe(map(isTicking => true));
const stopEvent = fromEvent(stopButton, 'click').pipe(map(isTicking => false));
const resetEvent = fromEvent(resetButton, 'click').pipe(map(reset => resetValues()));
const splitEvent = fromEvent(splitButton, 'click').pipe(map(split => createSplit(minutes.innerHTML, seconds.innerHTML, tenths.innerHTML)));

//subscribe to splitEvent seperately, as we want to be able to split whether you are ticking or not
splitEvent.subscribe();

const startAndStop = merge(startEvent, stopEvent, resetEvent).subscribe(isTicking => ticking = isTicking);

const timerStream = time.subscribe(currentTime =>
	{
		if(ticking)
		{
			timer++;

			tenths.innerHTML = addZeroIfNeeded(timer % 100);
			seconds.innerHTML = addZeroIfNeeded(Math.floor((timer / 100) % 60));
			minutes.innerHTML = addZeroIfNeeded(Math.floor((timer / 6000) % 60));

			if (timer % 100 === 0)
			{
				currentBigTickAngle += (2 * Math.PI)/60;
				currentSmallTickAngle += (2 * Math.PI)/(60*60);
				updateFace(currentBigTickAngle, currentSmallTickAngle);
			}
		}
	}
);

function addZeroIfNeeded(value)
{
	return(value < 10 ? '0'+value : value);
}

//clear all the splits currently on the screen
function clearSplits()
{
	splitCount = 0;

	while (splits.firstChild)
	{
		splits.removeChild(splits.firstChild);
	}

	let splitCaption = document.createElement("p");
	splitCaption.appendChild(document.createTextNode("Splits:"));
	splitCaption.style = "margin-top: 0;";
	splits.appendChild(splitCaption);
}

//function to update the face with the new big and small hand positions
//it will clear the current canvas, draw the face, then the new big an small hand based on parameters
function updateFace(big, small)
{
	clearCanvas();

	drawFace();

	face.beginPath();
	face.setTransform(1,0,0,1, x, y);
	face.rotate(big);
	face.moveTo(0, 0);
	face.lineTo(0, -radius);
	face.strokeStyle="red";
	face.stroke();
	face.closePath();

	face.beginPath();
	face.setTransform(1,0,0,1, x, y);
	face.rotate(small);
	face.moveTo(0, 0);
	face.lineTo(0, -radius+30);
	face.strokeStyle="blue";
	face.stroke();
	face.closePath();
}

//functio to create a split, will add a p element to the splits div, using the hours, minutes and tenths
//text at the current time the split button was clicked
function createSplit(hrs, mins, tnths)
{
	if (splitCount < 5)
	{
		splitCount++;
		let newSplit = document.createElement("p");
		newSplit.appendChild(document.createTextNode("Split "+splitCount+" - "+hrs+":"+mins+":"+tnths));
		splits.appendChild(newSplit);
	}
}

//function to clear the canvas
function clearCanvas()
{
	face.setTransform(1,0,0,1,0,0);
	face.clearRect(0, 0, canvas.width, canvas.height);
}

//function to reset the minutes, seconds and tenths values, while also resetting the angle for the big and small hands
function resetValues()
{
	currentBigTickAngle = 0;
	currentSmallTickAngle = 0;
	timer = 0;
	ticking = false;
	tenths.innerHTML = '00';
	minutes.innerHTML = '00';
	seconds.innerHTML = '00';
	clearSplits();
	updateFace(currentBigTickAngle, currentSmallTickAngle);
	//false as ticking as stopped
	return false;
}

//functiion to draw the clock face (does not inclde the big and small hands)
function drawFace()
{
	face.setTransform(1,0,0,1, 0, 0);

	face.beginPath();
	face.arc(x, y, stopwatchSize, 0, 2 * Math.PI);
	face.strokeStyle="grey";
	face.stroke();


	face.beginPath();
	face.arc(x, y, stopwatchSize/50, 0, 2 * Math.PI);
	face.fillStyle ="black";
	face.fill();

	face.beginPath();

	for (let i = 0; i < 2 * Math.PI; i+=(2 * Math.PI)/60)
	{
		face.setTransform(1,0,0,1, x, y);
		face.rotate(i);

		face.moveTo(0, radius);

		face.lineTo(0, radius-5);
		face.strokeStyle="lightgrey";
		face.stroke();
	}

	face.beginPath();

	for (let i = 0; i < 2 * Math.PI; i+=(2 * Math.PI)/12)
	{
		face.setTransform(1,0,0,1, x, y);
		face.rotate(i);

		face.moveTo(0, radius);

		face.lineTo(0, radius-21.5);
		face.strokeStyle="grey";
		face.stroke();
	}
}
