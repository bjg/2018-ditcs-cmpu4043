import { fromEvent, merge, pipe, subscribe, interval } from "rxjs";
import { mapTo, scan } from "rxjs/operators";

let time = interval(100);

let totalTime = 0;
let timeRunning = false;
let splitsArray = [];

let start = document.getElementById("start");
let stop = document.getElementById("stop");
let split = document.getElementById("split");
let reset = document.getElementById("reset");
let digital = document.getElementById("digital");
let clock = document.getElementById("clock");

var ctx = clock.getContext("2d");
var radius = clock.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;


function digiWatch(start, stop, split, reset, digital)
{
	const button$ = merge(
		 	fromEvent(start, "click").pipe(mapTo("Start")),
		 	fromEvent(stop, "click").pipe(mapTo("Stop")),
		 	fromEvent(split, "click").pipe(mapTo("Split")),
		 	fromEvent(reset, "click").pipe(mapTo("Reset"))
	);

	const sub = time.subscribe(
        function(x)
        { 
            if(timeRunning == false)
            {
                return;
            }
            totalTime++;
            drawEntireClock();
            digital.innerHTML = Math.floor(totalTime / 600) + ":" + Math.floor((totalTime / 10) % 60) + ":" + (totalTime % 10); 
        }
    )

	button$.subscribe(val =>
	{
	    if(val == "Start")
	    {
	    	timeRunning = true;
	    }
	    if(val == "Stop")
	    {
	    	timeRunning = false;
	    }
	    if(val == "Split")
	    {
	    	let splits = document.getElementById("splitsList");
	    	if(splitsArray.length < 5)
	    	{
	    		splits.innerHTML = "";
	    		splitsArray.push(Math.floor(totalTime / 600) + ":" + Math.floor((totalTime / 10) % 60) + ":" + (totalTime % 10)); 
	    		printSplits(splits);
	    	}
	    	else
	    	{
	    		splitsArray.pop();
	    		splits.innerHTML = "";
	    		splitsArray.unshift(Math.floor(totalTime / 600) + ":" + Math.floor((totalTime / 10) % 60) + ":" + (totalTime % 10)); 
	    		printSplits(splits);
	    	}
	    }
	    if(val == "Reset")
	    {
	    	drawClockReset();
	    	timeRunning = false;
	    	digital.innerHTML = "0:0:0";
	    	totalTime = 0;
	    	document.getElementById("splitsList").innerHTML = "";
	    	splitsArray.length = 0;

	    }
	})
}

function printSplits(splits)
{
	splitsArray.forEach(x => 
	{
		split = document.createElement("div");
	    split.innerHTML = x;
	    splits.appendChild(split);
	}
	);
}

function drawEntireClock()
{
	drawClockFace();
	//sec hand
	drawHand(totalTime * Math.PI / 300, radius * 0.85, radius * 0.01);
	//min hand
	drawHand(totalTime * Math.PI / (300 * 60), radius * 0.7, radius * 0.02);
}

function drawClockFace()
{
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	ctx.fillStyle = "white";
	ctx.fill()
	ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    numbers(radius);
}

function numbers(radius)
{
	let ang;
	ctx.font = radius * 0.15;
	ctx.textBaseline= "middle";
	ctx.textAlign= "center";

	for(var num= 1; num < 13; num++)
	{
		ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * 0.85);
		ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
       	ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
    for(var num= 1; num < 60; num++)
    {
        ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(".", 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }

}

function drawHand(pos, length, width)
{
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.moveTo(0,0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.rotate(-pos); 
}

function drawClockReset()
{
	drawClockFace();
	drawHand(0,radius * 0.8, radius * 0.01);
}

drawEntireClock();
digiWatch(start, stop, split, reset, digital);
