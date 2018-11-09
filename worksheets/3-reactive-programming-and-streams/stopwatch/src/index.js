import { interval, fromEvent, merge, pipe, subscribe } from "rxjs";
import { mapTo, scan, startWith } from "rxjs/operators";

function displayClock()
{
	if (clock.getContext) 
	{
  		const ctx = clock.getContext('2d');
  		ctx.beginPath();
  		ctx.clearRect(0, 0, clock.width, clock.height);
		
		ctx.strokeStyle = "#0044FF";

		var cx = clock.width/2;
		var cy = clock.height/2;
		var cr = clock.width*0.45;
		var twoRads = 2*Math.PI;

		//Clock Border
		ctx.arc(cx,cy,cr,	0,twoRads);

		//Marks around clock
		var markIncrements = 60;
		var markSize = 5;
		var markRadius = cr* 0.95;

		for(let i = 0; i < markIncrements;i++)
		{
			var markVector = getVector(cx,cy,cr* 0.95,i * twoRads / markIncrements);

			ctx.moveTo(markVector.x + markSize, markVector.y);
			ctx.arc(markVector.x,markVector.y,markSize,	0,twoRads);
		}

		//Second hand 
		var seconds = (stopwatch.time / 10 ) % 60;
		var secondAngle = twoRads * (seconds/60) - (twoRads*0.25);
		var secondVector = getVector(cx,cy,cr* 0.95,secondAngle);

		ctx.moveTo(cx,cy);
		ctx.lineTo(secondVector.x,secondVector.y)

		//Minute hand 
		var minutes = (stopwatch.time)/600;
		var minuteAngle = twoRads * (minutes/60) - (twoRads*0.25);
		var minuteVector = getVector(cx,cy,cr* 0.8,minuteAngle);

		ctx.moveTo(cx,cy);
		ctx.lineTo(minuteVector.x,minuteVector.y)

		ctx.stroke();
	}
}	

function getVector(cx,cy,radius,angle)
{
	var vector = 
	{
		x: cx + (radius * Math.cos(angle)),
		y: cy + (radius * Math.sin(angle))
	};
	return vector;
}


function timerTick()
{
	if(stopwatch.timerActive)
	{
		stopwatch.time += 1;
	}
	updateDisplay();
}

function updateDisplay()
{
	display.innerHTML = getTimeFormat();
	splits.innerHTML = getListFormat(stopwatch.splits);
	displayClock();
}

function getListFormat(array)
{
	var text = "";
	for (let i = 0; i < array.length; i++) 
	{ 
    	text += array[i] + "<br>";
	}
	return text;
}

function getTimeFormat()
{
	var tenth = stopwatch.time % 10;
	var second = ((stopwatch.time - tenth) / 10 ) % 60;
	var minute = (stopwatch.time - (second * 10) - tenth)/600;
	return 	String(minute) 
			+":" + String(second)
			+":" + String(tenth)+"0";
}

function getPushedArray(array, val)
{
	array.push(val);
	return array;
}

let stopwatch = 
{
	time: 0,
	timerActive: true,
	splits: []
};

const source = interval(100);
const subscribedInterval = source.subscribe(val => timerTick());

const clock = document.getElementById('clock');

const display = document.getElementById("display");
const splits = document.getElementById("splits");

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const splitButton = document.getElementById("split");
const resetButton = document.getElementById("reset");

const start = acc => 	( {time: acc.time, timerActive: true, splits: acc.splits} );
const stop = acc => 	( {time: acc.time, timerActive: false, splits: acc.splits} );
const split = acc => 	( {time: acc.time, timerActive: acc.timerActive, splits: getPushedArray(acc.splits,getTimeFormat())} );
const reset = acc => 	( {time: 0, timerActive: false, splits: []} );

const funcButtons = merge(
	fromEvent(startButton, 'click').pipe(mapTo(start)),
	fromEvent(stopButton, 'click').pipe(mapTo(stop)),
	fromEvent(splitButton, 'click').pipe(mapTo(split)),
	fromEvent(resetButton, 'click').pipe(mapTo(reset))
);

const mergedButtons = funcButtons.pipe(scan((acc,update) => update(acc), stopwatch));

mergedButtons.subscribe(watch => 
{
	stopwatch = watch;
})