/***
 *	Name: Gabriel Grimberg
 *	Module: Rich Web Applications
 *	Lab: 3
 *	Question: 2
 *	Type: Stopwatch Functionality in React."
 ***/

import * as Observable from "rxjs";

// Elements from HTML page.
const displayTimer = document.getElementById('displayTime');
const splitNumber = document.getElementById('splitNumberID');
const myCanvas = document.getElementById('canvasID');

let hasStartedFlag = false; // Boolean flag to be used for.
let time = 0; 				// Variable to be used for displaying the current time.

// https://stackoverflow.com/questions/44165893/how-do-i-make-an-observable-interval-start-immediately-without-a-delay
// Interval used to start time without delay.
const x = Observable.interval(100).subscribe( x => {

	// If the flag is set to false return.
	if (!hasStartedFlag) 
	{ 
		return; 

	} else { // Else we increment the time, call the clock function and update the timer on the HTML.

		time++;
		displayTimer.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
		drawClock(time);
	}
	
});

// Functionality for when Start is Pressed.
const startEvent = Observable.fromEvent(document.getElementById('btn-startID'), 'click' );

startEvent.subscribe( () => {

	hasStartedFlag = true; 
	console.log(hasStartedFlag);
});

// Functionality for when Stop is Pressed.
const stopEvent = Observable.fromEvent(document.getElementById('btn-stopID'), 'click' );

stopEvent.subscribe( () => {

	hasStartedFlag = false; 
	console.log(hasStartedFlag);
});

// Functionality for when Split is Pressed.
const splitEvent = Observable.fromEvent(document.getElementById('btn-splitID'), 'click' );

splitEvent.subscribe( () => {
	
	splitNumber.innerHTML += displayTimer.innerHTML + "<br>"; // Take current time and display on screen. 
	//console.log(splitNumber);
});

// Functionality for when Reset is Pressed.
const resetEvent = Observable.fromEvent(document.getElementById('btn-resetID'), 'click' );

resetEvent.subscribe( () => {
	
	displayTimer.innerHTML = "0:0:00";	// Set the timer back to it's original state.
	splitNumber.innerHTML = "";				// Empty the split numbers displayed on the page.
	hasStartedFlag = false;					// Set the start flag back to false.
	time = 0; 								// Reset the time variable.
	drawClock(time);
});

// Functionality to draw and handle each second, minute and hour of the stop watch.
const drawClock = (time) => {

	if (myCanvas.getContext)
	{
		// https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_clearrect
		let c = myCanvas.getContext('2d');
		c.clearRect(0, 0, myCanvas.width, myCanvas.height); // To make sure arcs don't overlap.

		let watchContent = 200; // Radius of watch
		let radiusFromCircle = 1; // Radius for the time arcs between the watch radius.
		
		/* arc(x-coordinate of the center of the circle, 
			   y-coordinate of the center of the circle, 
			   Radius of the circle, 
			   Starting angle,
			   Ending angle, 
			   Optional - Whether the drawing should be counterclockwise or clockwise - False is default); 
		*/
		
		// The middle dot for the circle.
		c.beginPath();
		c.arc(watchContent, watchContent, 2, 0, 2 * Math.PI, true);
		c.fill();
		c.beginPath();

		// Drawing the circle.
		c.arc(watchContent, watchContent, watchContent, 0, Math.PI * 2, true);

		// Every minor seconds intervals.
		for (let i = 0; i < 12; i++) {

			let subArc = i * (Math.PI * 2 / 12);
			let mainArc = watchContent * 0.15;
			
			/* 
				moveTo(x-coordinate of where to move the path to,
						y-coordinate of where to move the path to);
			*/
			c.moveTo(watchContent + watchContent * Math.cos(subArc) * radiusFromCircle, 
						watchContent + watchContent * Math.sin(subArc) * radiusFromCircle);
			
			/* 
				lineTo(x-coordinate of where to create the line to,
						y-coordinate of where to create the line to);
			*/				
			c.lineTo(watchContent + (watchContent - mainArc) * Math.cos(subArc) * radiusFromCircle, 
						watchContent + (watchContent - mainArc) * Math.sin(subArc) * radiusFromCircle);
		}

		// Every bigger second intervals.
		for (let i = 0; i < 60; i++) {
			
			let subArc = i * (Math.PI * 2 / 60); // Variable for spacing betweens intervals.
			let mainArc = watchContent * 0.05; // Size of intervals
			
			c.moveTo(watchContent + watchContent * Math.cos(subArc) * radiusFromCircle, 
						watchContent + watchContent * Math.sin(subArc) * radiusFromCircle);
					
			c.lineTo(watchContent + (watchContent - mainArc) * Math.cos(subArc) * radiusFromCircle, 
						watchContent + (watchContent - mainArc) * Math.sin(subArc) * radiusFromCircle);
		}

		let subArc = (time / 600 / 60 - 0.25) * (Math.PI * 2); // The minutes arc.
		let mainArc = watchContent * 0.5; // The hour arc.
		
		/* Line movement for both of the arcs in sync */
		
		c.moveTo(watchContent, watchContent); // Line update movement.
		
		c.lineTo(watchContent + mainArc * Math.cos(subArc), 
						watchContent + mainArc * Math.sin(subArc));
		
		subArc = (time / 10 / 60 - 0.25) * (Math.PI * 2); // Movement of seconds arc
		
		mainArc = watchContent * 0.9; // Movement of hour arc.
		
		c.moveTo(watchContent, watchContent); // Line update movement.
		
		c.lineTo(watchContent + mainArc * Math.cos(subArc), 
						watchContent + mainArc * Math.sin(subArc));

		c.stroke(); // Update changes.

	}

}

// Display the clock on start.
(function () {
	
	drawClock();
	
})();



