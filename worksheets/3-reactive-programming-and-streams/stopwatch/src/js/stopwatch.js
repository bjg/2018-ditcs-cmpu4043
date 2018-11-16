/* Author: Nicola Mahon C15755031 */

// RxJS Imports
import { pluck } from "rxjs/operators";
import { pipe, merge, fromEvent, interval } from "rxjs";

// CSS Import
import '../css/stopwatch.css';

/* VARIABLES */
let canvas = document.getElementById('clock');
const mins = document.getElementById('min');
const secs = document.getElementById('sec');
const millis = document.getElementById('ms');
const splits = document.getElementById('splits');

let started = false;
let time = 0; 
let split_count = 0;

// create an interval stream to observe
const watch$ = interval(100); // 0.1 seconds

// draw a static clock when the window loads
window.onload = function()
{
	draw();
};

// subscribe to the interval stream
watch$.subscribe(function (x)
{
	if (started) 
	{
		// every interval observed increments time
		time++;

		// animate the stopwatch hands with the new time value
		draw(time);
		
		// update the digital clock display 
		mins.innerHTML = Math.floor(time / 600);
		secs.innerHTML = Math.floor(time / 10 % 60); 
		millis.innerHTML = time % 10 + "0";	
	}
		
});

// observe DOM elements for clicks
const action$ = fromEvent(document, 'click')
	.pipe(pluck('target', 'innerHTML'));

// when a click is observed, decide on the action to take
// OPTIONS: Start, Stop, Split, Reset
action$.subscribe(input =>
	{
		if(input === "Start")
		{
			// start the clock
			started = true;
		}
		else if (input === "Stop")
		{
			// stop the clock
			started = false;
		}
		else if (input === "Split")
		{
			// only split when clock is running and only display 5 split times
			if(started === true && split_count < 5)
			{
				// increment the split count
				split_count += 1;

				// create new div elements to append the split data to the document
				let split_title = document.createElement("div");
				let split_div = document.createElement("div");
				let newline = document.createElement("br");

				// set the class value for the divs, to ensure CSS styling is applied
				split_title.classList.add('split_title');
				split_div.classList.add('split');
				newline.classList.add('breaks');

				// add the split details to the innerHTML of the divs
				split_title.innerHTML = "Split " + split_count;
				split_div.innerHTML = mins.innerHTML + " : " + secs.innerHTML + " : " + millis.innerHTML;

				// append the new divs to the document
				splits.appendChild(split_title);
				splits.appendChild(split_div);
				splits.appendChild(newline);
			}
		}
		else if (input === "Reset")
		{
			// reset the variables
			started = false;
			time = 0;
			split_count = 0;

			// update the clock back to the start position
			draw(time);

			// update the digital display to ZERO
			mins.innerHTML = "0";
			secs.innerHTML = "0";
			millis.innerHTML = "00";

			// clear the previous split values
			resetSplits();
		}
	});	// end function action$.subscribe


// function to draw the clock
let draw = function draw(time)
{
	// check that the canvas drawing context identifier is supported
	if (canvas.getContext)
	{
		// get the 2D context identifier for the canvas
		const clock = canvas.getContext('2d');

		// clear the previous clock
		clock.clearRect(0, 0, canvas.width, canvas.height);

		// variables for displaying the clock
		const clockSize = 96;
		const multi = 0.93; // multiplier for adjusting clock elements inside the clock face
		let tick = 0;	// angle representing the passing of time on the clock face
		let handSize = 0;	// variable to hold length of the hand, whether big or small

		// draw centre dot of the clock, where clock hands will extend from.
		clock.fillStyle = "#13414E";
		clock.beginPath();
		clock.arc(clockSize, clockSize, 2, 0, 2 * Math.PI, true);
		clock.fill();

		// draw nested circles of clock face
		clock.strokeStyle = "#808080";
		clock.beginPath();
		clock.arc(clockSize, clockSize, clockSize - 2, 0, Math.PI * 2, true); // outer
		clock.arc(clockSize, clockSize, clockSize - 4, 0, Math.PI * 2, true); // inner

		/* draw the time slots on the clock */

		// draw 5 second / long lines
		for (let i = 0; i < 12; i++)
		{
			let angle_fiveseconds = i * (Math.PI * 2 / 12);
			let big_hand = clockSize * 0.15;
			clock.moveTo(clockSize + clockSize * Math.cos(angle_fiveseconds) * multi, clockSize + clockSize * Math.sin(angle_fiveseconds) * multi);
			clock.lineTo(clockSize + (clockSize - big_hand) * Math.cos(angle_fiveseconds) * multi, clockSize + (clockSize - big_hand) * Math.sin(angle_fiveseconds) * multi);
		}

		// draw 1 second / short lines
		for (let _i = 0; _i < 60; _i++)
		{
			let angle_onesecond = _i * (Math.PI * 2 / 60);
			let small_hand = clockSize * 0.05;
			clock.moveTo(clockSize + clockSize * Math.cos(angle_onesecond) * multi, clockSize + clockSize * Math.sin(angle_onesecond) * multi);
			clock.lineTo(clockSize + (clockSize - small_hand) * Math.cos(angle_onesecond) * multi, clockSize + (clockSize - small_hand) * Math.sin(angle_onesecond) * multi);
		}

		/* animate time passing */

		if(time > 0)
		{
			// minute hand - moves once in 60 seconds
			tick = (time / 600 / 60 - 0.25) * (Math.PI * 2);
			handSize = clockSize * 0.5;
			clock.moveTo(clockSize, clockSize);
			clock.lineTo(clockSize + handSize * Math.cos(tick), clockSize + handSize * Math.sin(tick));
		}
		else    // draw the big_hand, even if clock has not been started yet
		{
			clock.moveTo(clockSize, clockSize);
			clock.lineTo(clockSize, clockSize * 0.1);
		}

		if(time > 0)
		{
			// second hand - moves once every second
			tick = (time / 10 / 60 - 0.25) * (Math.PI * 2);
			handSize = clockSize * 0.8;
			clock.moveTo(clockSize, clockSize);
			clock.lineTo(clockSize + handSize * Math.cos(tick), clockSize + handSize * Math.sin(tick));
		}
		else    // draw the small_hand, even if clock has not been started yet
		{
			clock.moveTo(clockSize, clockSize);
			clock.lineTo(clockSize, clockSize * 0.5);
		}

		
		// draw the clock
		clock.stroke();

	}	// end canvas.getContext

};	// end function draw()

// function to clear the splits data from the document on click of RESET button
function resetSplits()
{
	// get all the repo class elements; returns HTMLCollection
	let split_values = document.getElementsByClassName("split");
	let split_titles = document.getElementsByClassName("split_title");
	let breaks = document.getElementsByClassName("breaks");

	// convert the HTMLCollections to arrays
	split_values = Array.from(split_values);
	split_titles = Array.from(split_titles);
	breaks = Array.from(breaks);

	// loop through each split element
	split_values.map(split =>
		{
			// remove the element
			split.parentNode.removeChild(split);
		}
	);	// end split_values.map()

	// loop through each split_title element
	split_titles.map(title =>
		{
			// remove the element
			title.parentNode.removeChild(title);
		}
	);	// end split_titles.map()

	// loop through each break elements
	breaks.map(brk =>
		{
			// remove the element
			brk.parentNode.removeChild(brk);
		}
	);	// end breaks.map()

}	// end function resetSplits();
