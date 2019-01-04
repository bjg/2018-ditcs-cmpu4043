//Calculator using streams

//Importing style sheet and observable rxjs
import "./style.css";
import { Observable } from 'rxjs/Rx';
//Constant variables such as canvas (area for drawing) the split list and buttons
//Created (they dont change)
const canvas = document.querySelector('canvas');
const list = document.getElementById('list');
const buttons = document.getElementsByClassName('button')
//Making the drawing point for canvas in the middle of allocated screen space
canvas.width = window.innerWidth /2
canvas.height = window.innerHeight /2
//declaring constant variable for drawing clock
const drawingCanvas = canvas.getContext('2d');
//Center of canvas is equal to the canvas height and width / 2
let centerX = canvas.width /2
let centerY = canvas.height /2
let started = false;
let time = 0;

//constant observer to check if clock is running every tenth of a second
const observer = 
{
	next: (tenthOfSecond) => 
	{
		//If not started, return otherwise increment time and run the clock
		if(!started)
		{
			return;
		}//End if
		time++;
		runClock(time);
	}
}

//Constant event observer for checking if any of the buttons were clicked
const eventObserver = 
{
	next: (id) => 
	{
		console.log(id)
		switch(id)
		{
			case 'start':
				started = true
				break;
			case 'stop':
				started = false
				break;
			//Split is written on the right portion of the screen
			case 'split':
				let splitTime = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0" + "<br/>"
				list.innerHTML += `<div class="split_item">
										${splitTime}    
									</div>
									<hr>`
				break;
			case 'reset':
				started = false;
				time = 0;
				runClock(time);
				list.innerHTML = "";
				break;
		}//End switch
	}
}

//Constant variable for running the clock and keeping the clock drawn and logic for hands
const runClock = (time) => 
{
	//Prevents the hands from enlargening
	drawingCanvas.clearRect(0, 0, canvas.width, canvas.height);
	//Clock size
	const size = 150;
	drawingCanvas.beginPath();
	//Logic for circle around notches and clock hand
	drawingCanvas.arc(centerX, centerY , size -5 , 0, Math.PI * 2);
	drawingCanvas.lineWidth = .25;
	//Draw the larger notches on the clock
	Observable.range(0, 12)
		.subscribe(
		{
			next: (val) => 
			{
				drawTicks(30, 15, val, size)
			}
		})
	//Draw the smaller notches on the clock
	Observable.range(0, 60)
		.subscribe(
		{
			next: (val) => 
			{
				drawTicks(6, 5, val, size)
			}
		})
  
	// Logic for seconds appearing 
	let angle = time / 10 * 6;
	//Size of clock big hand
	let handLength = size * 0.8;
	//Second hand drawn
	drawHand(handLength, angle)
	// Logic for minutes appearing
	angle = time / 60 / 10 * 6;
	handLength = size * 0.6;
	//Minute hand drawn
	drawHand(handLength, angle)
	// Logic for hours appearing
	angle = time / 10 / 60 / 60 * 30;
	handLength = size * 0.4;
	//Hour hand drawn
	drawHand(handLength, angle)
  
	//Maths for digital seconds minutes and hours
	let digitalClock = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
	//Initial value for digital clock
	if(digitalClock.includes('NaN'))
	{
		digitalClock = '0:0:00'
	}
	//Clock begins moving hands / keeps moving hands
	drawingCanvas.beginPath();
	//Fills text in digital part with new seconds
	drawingCanvas.fillText(digitalClock, centerX,  centerY + centerY / 3)
}

//Constant for drawing the ticks on the clock
const drawTicks = (degreePerTick, length, i, size) => 
{
	drawingCanvas.save()
	drawingCanvas.translate(centerX, centerY);
	let angle = degree_to_radians(i*degreePerTick)
	drawingCanvas.rotate(angle);
	drawingCanvas.translate(0, size/2 * 1.85);
  
	drawingCanvas.moveTo(0, 0);
	drawingCanvas.lineTo(0, -length);
	drawingCanvas.stroke();
	drawingCanvas.restore();
}

//Constant for drawing the hands on the clock
const drawHand = (length, angle) => 
{
	drawingCanvas.save();
	drawingCanvas.translate(centerX, centerY);
	drawingCanvas.rotate(degree_to_radians(-180)); 
	drawingCanvas.rotate(degree_to_radians(angle)); 
	drawingCanvas.moveTo(0, 0); 
	drawingCanvas.lineTo(0, length);
	drawingCanvas.stroke();
	drawingCanvas.restore(); 
}

//Constant for logic on hands moving (degrees to radians)
const degree_to_radians = (degree) => 
{
	var factor = Math.PI/180;
	return degree*factor;
}

const source = Observable
.interval(100)
const subscription = source.subscribe(observer);
Observable.fromEvent(buttons, 'click')
	.map((event) => event.target.id)
	.subscribe(eventObserver)
    
runClock();