import { fromEvent, merge, Observable, pipe, subscribe, interval, unsubscribe } from "rxjs";
import { mapTo, scan, startWith, takeUntil } from "rxjs/operators";

let time = interval(100);

let totalTime = 0;
let timeRunning = false;
let splitsArray = [];

let start = document.getElementById("start");
let stop = document.getElementById("stop");
let split = document.getElementById("split");
let reset = document.getElementById("reset");
let digital = document.getElementById("digital");

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
	splitsArray.forEach(x => {
		split = document.createElement("div");
	    split.innerHTML = x;
	    splits.appendChild(split);
	}
	);
}

function drawClock()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var radius = canvas.height / 2;
	ctx.translate(radius, radius);
	radius = radius * 0.90;
	ctx.arc(0, 0, radius, 0 , 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}



digiWatch(start, stop, split, reset, digital);