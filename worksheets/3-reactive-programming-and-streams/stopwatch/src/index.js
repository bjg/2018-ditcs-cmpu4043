import { interval, fromEvent, merge, pipe, subscribe } from "rxjs";
import { mapTo, scan, startWith } from "rxjs/operators";
import "./style.css";

//Find the buttons
const startbut = document.getElementById("start");
const stopbut = document.getElementById("stop");
const resetbut = document.getElementById("reset");
const splitbut = document.getElementById("split");

//Array to store splits
let splits = [];

//Find the time in milliseconds
const source =  interval(100 /* ms */ );
const digital = document.getElementById('digi');

//Set variable to false so not triggered unless button clicked
let started = false;
let time = 0; // 1/10 seconds

//Add new split
function new_split()
{
	var para = document.createElement("h1");
	var node = document.createTextNode(digital.innerHTML);
	para.appendChild(node);
	var element = document.getElementById("splitters");
	element.appendChild(para);
}

//This funtion will remove the splits and reset the clock to zero
function resets()
{
	console.log("Mama mia")
	//Remove splits
	var myNode = document.getElementById("splitters");
	while (myNode.firstChild) 
	{
    	myNode.removeChild(myNode.firstChild);
	}

	//Change timer to 0
	time = 0 ;
	ticker();
}

//This funtion will be called to show the new time
function ticker()
{
	digital.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
}

//Subscribe to add time when started is true
const subscription = source.subscribe( x => 
{
	if(!started)
		return;
 	time++;
 	ticker();
    draw_clock(time);
 	//console.log("Mama mia");
});


//This will change the values and perform th task once the buttons are pressed
fromEvent(startbut, "click").subscribe(ticktoc => started = true);
fromEvent(stopbut, "click").subscribe(ticktoc => started = false);
fromEvent(splitbut, "click").subscribe(ticktoc => new_split());
fromEvent(resetbut, "click").subscribe(ticktoc => resets());

function degree_to_rad(degree)
{
	var factor = Math.PI/180;
	return degree*factor;
}


//This will draw he clock depending on how much time has been
const draw_clock = (time) =>
{
	const can = document.getElementById("clockface");

	if (can.getContext) 
	{
	    const ctx = can.getContext('2d');

	    ctx.clearRect(0, 0, can.width, can.height);

	    const watchSize = 100;
	    const contentSize = 0.92;


	    // Center doc
	    ctx.fillStyle = "#13414E";
	    ctx.beginPath();
	    ctx.arc(watchSize, watchSize, 2, 0, 2 * Math.PI, true);
	    ctx.fill();


	    ctx.strokeStyle = "#cc0099";
	    ctx.beginPath();

	    // Clock face outer ring
	    ctx.arc(watchSize, watchSize, watchSize, 0, Math.PI * 2, true);


	    // Draw the minute hand
	    let angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
	    let armLength = watchSize * 0.5;
	    ctx.moveTo(watchSize, watchSize);
	    ctx.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

	    // Draw the second hand
	    angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
	    armLength = watchSize * 0.8;
	    ctx.moveTo(watchSize, watchSize);
	    ctx.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

	    ctx.stroke();

	  
  }
}



draw_clock();