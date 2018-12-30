import {Observable} from 'rxjs/Rx';

//for logic of the clock
//https://www.w3schools.com/graphics/tryit.asp?filename=trycanvas_clock_start

const canvas = document.getElementById('stopwatch-canvas');
const splits = document.getElementById('split-container');
const digital = document.getElementById('digital');
let time = 0;
let startTimer = false

//start timer 
Observable.fromEvent(document.getElementById('start'), 'click').subscribe(ev =>{
	startTimer = true;
});

//stop timer
Observable.fromEvent(document.getElementById('stop'), 'click').subscribe(ev =>{
	startTimer = false;
});

//record the splits
Observable.fromEvent(document.getElementById('split'), 'click').subscribe(ev => {
	let splitTime = document.createElement("P");
	let val = document.createTextNode(digital.innerHTML);
	splitTime.appendChild(val);
	splits.appendChild(splitTime);
});

//reset the timer
Observable.fromEvent(document.getElementById('reset'), 'click').subscribe(ev =>{
	startTimer = false;
	time = 0;
	drawWatch(time);
	digital.innerHTML = "00:00:00";

	//clear the split times
	while (splits.hasChildNodes()) {
    	splits.removeChild(splits.lastChild);
	}
});

const stream$ = Observable
	.interval(100)

//Drawing stream	
const subs = stream$.subscribe(t =>{	
	if(startTimer === false)return;
	time ++;
	drawWatch(time);
	digital.innerHTML = ("0" + (parseInt(time/600))).slice(-2) + ":" + ("0" + (parseInt((time/10) % 60))).slice(-2) + ":" + (time % 10) +  "0";
});



//drawing the minute and second hands of the watch
function drawHand(ctx, angle, arms_length, size){
	//setting the one line to the center
	ctx.moveTo(size, size);
	//Dto each point on the line drawing a outerline  
	ctx.lineTo(size + arms_length * Math.cos(angle), size + arms_length * Math.sin(angle));
}

//Watch drawing 
const drawWatch = (time) => {
	
	//https://www.w3schools.com/graphics/tryit.asp?filename=trycanvas_clock_start was used for clock

	if (canvas.getContext){

		const ctx = canvas.getContext('2d');
		const size = 200;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		//Middle of the watch
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.arc(size, size, 2, 0, 2 * Math.PI, false);
		ctx.stroke();

		//create the outer line of the watch
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.arc(size, size, size, 0, Math.PI * 2, false);
		ctx.stroke();

		//need to draw the 12 long lines on the clock
		for (let i = 0; i < 12; i++){
			const longLines = size * 0.2;
			let angle = i * (Math.PI * 2 / 12);
			ctx.moveTo(size + size * Math.cos(angle) * 1.0, size + size * Math.sin(angle) * 1.0);
			ctx.lineTo(size + (size - longLines) * Math.cos(angle) * 1.0, size + (size - longLines) * Math.sin(angle) * 1.0);
		}
		
		//need to draw the 60 short lines on the clock
		for (let i = 0; i < 60; i++){
			const shortLines = size * 0.1;
			let angle = i * (Math.PI * 2 / 60);
			ctx.moveTo(size + size * Math.cos(angle) * 1.0, size + size * Math.sin(angle) * 1.0);
			ctx.lineTo(size + (size - shortLines) * Math.cos(angle) * 1.0, size + (size - shortLines) * Math.sin(angle) * 1.0);
		}

		//draw the minute arm
		let minutes_hand_angle  = (time / 600 / 60 - 0.25) * (Math.PI * 2);  
		let minutes_hand_lenght = size * 0.6; 
		drawHand(ctx, minutes_hand_angle , minutes_hand_lenght, size);

		//This draws the seconds arm
		let second_hand_angle  = (time / 10 / 60 - 0.25) * (Math.PI * 2);
		let second_hand_lenght = size * 0.85;
		drawHand(ctx, second_hand_angle , second_hand_lenght, size);
		ctx.stroke();

	}
}

//calls our drawing function
drawWatch();


