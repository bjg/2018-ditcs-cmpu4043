/* Author: Nicola Mahon C15755031 */

// RxJS Imports
import { pluck } from "rxjs/operators";
import { pipe, merge, fromEvent, interval } from "rxjs";

// CSS Import
import '../css/clock.css';

/* VARIABLES */
let canvas = document.getElementById('clock');
canvas.style.border = '1px solid black';
//let btns = document.getElementsByClassName('button');


//const source = interval(100);
//.timeInterval();




//const digital = document.getElementById('digital');
//let started = true;
//let time = 0; // 1/10 seconds

/*
const input$ = fromEvent(btns, 'click')
	.pipe(pluck('target', 'innerHTML'));

// subscribe to the stream to observe inputs
input$.subscribe(input => {
	if(input === 'Start')
	{
		started = True;
		console.log("started");
	}});
*/

if(canvas.getContext)
{
        const clock = canvas.getContext('2d');
        clock.strokeStyle = '#808080';
        clock.beginPath();
        clock.arc(250, 180, 2, 0, Math.PI * 2, true);
        clock.stroke();

        clock.beginPath();
        clock.arc(250, 180, 125, 0, Math.PI * 2, true);
        clock.stroke();

        clock.beginPath();
        clock.arc(250, 180, 120, 0, Math.PI * 2, true);
        clock.stroke();
}

/*
const subscription = source.subscribe(
  x => {
    if(!started) return;
    time++;
    draw(time);
    digital.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
  });


*/

/*
function draw(time)
{
	const canvas = document.getElementById('clock');
	canvas.style.border = '1px solid black';

	if(canvas.getContext)
	{
		const clock = canvas.getContext('2d');
		clock.strokeStyle = '#808080';

		/*

                clock.beginPath();
                clock.arc(250, 180, 2, 0, Math.PI * 2, true);
                clock.stroke();

		clock.beginPath();
	    	clock.arc(250, 180, 125, 0, Math.PI * 2, true);
		clock.stroke();

		clock.beginPath();
	    	clock.arc(250, 180, 120, 0, Math.PI * 2, true);
		clock.stroke();
		*/
		/*
		let circle0 = new Path2D();
		circle0.arc(250, 180, 2, 0, Math.PI * 2, true);

		let circle1 = new Path2D();
		circle1.arc(250, 180, 125, 0, Math.PI * 2, true);

		let circle2 = new Path2D();
		circle2.arc(250, 180, 120, 0, Math.PI * 2, true);

		clock.fill(circle0);
		clock.stroke(circle1);
		clock.stroke(circle2);
		*/
/*	}

        /*
	clock.clearRect(0, 0, canvas.width, canvas.height);

	const watchSize = 96;
	const contentSize = 0.92;

	// Center doc
	clock.fillStyle = "#13414E";
	clock.beginPath();
	clock.arc(watchSize, watchSize, 2, 0, 2 * Math.PI, true);
	clock.fill();

	clock.strokeStyle = "DimGray";
	clock.beginPath();
	// Outer circle
	clock.arc(watchSize, watchSize, watchSize, 0, Math.PI * 2, true);
	clock.arc(watchSize, watchSize, watchSize - 2, 0, Math.PI * 2, true);

	// 12 longer lines
	for (let i = 0; i < 12; i++) {
	  let angle = i * (Math.PI * 2 / 12);
	  const armLength = watchSize * 0.15;
	  clock.moveTo(watchSize + watchSize * Math.cos(angle) * contentSize, watchSize + watchSize * Math.sin(angle) * contentSize);
	  clock.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * contentSize, watchSize + (watchSize - armLength) * Math.sin(angle) * contentSize);
	}

	// 60 shorter lines
	for (let i = 0; i < 60; i++) {
	  let angle = i * (Math.PI * 2 / 60);
	  const armLength = watchSize * 0.05;
	  clock.moveTo(watchSize + watchSize * Math.cos(angle) * contentSize, watchSize + watchSize * Math.sin(angle) * contentSize);
	  clock.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * contentSize, watchSize + (watchSize - armLength) * Math.sin(angle) * contentSize);

	}

	// Longer hand (minute), each minute goes one step
	let angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
	let armLength = watchSize * 0.5;
	clock.moveTo(watchSize, watchSize);
	clock.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

	// Shorter hand (second), each second goes one step
	angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
	armLength = watchSize * 0.8;
	clock.moveTo(watchSize, watchSize);
	clock.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

	clock.stroke();
}
*/
