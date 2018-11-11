import Rx from 'rxjs/Rx';
import { interval } from 'rxjs';
import { Observable } from 'rxjs';
import "./style.css";

const canvas = document.getElementById('clock');
const digital = document.getElementById('timer');
const splitsList = document.getElementById('times');

//Gets a value every 1 second
const source = interval(100);
const subscribe = source.subscribe(val => console.log(val));

let started = false;
let time = 0; // 1/10 seconds

// Every second a function will be called and a new drawing takes place
const subscription = source.subscribe(x => 
	{
		if(!started) return;
		time++;
		draw(time);
		digital.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0"; // 0:0:00  Breakdown from minutes seconds miliseconds
	}
);

//Get START BUTTON working
const startObserv = Observable.fromEvent(document.getElementById('start'), 'click')
startObserv.subscribe(e => {started = true} ); 

//Get STOP BUTTON working
const stopObserv = Observable.fromEvent(document.getElementById('stop'), 'click')
stopObserv.subscribe(e => {started = false} ); 

//Get SPLIT BUTTON working
const splitObserv = Observable.fromEvent(document.getElementById('split'), 'click')
splitObserv.subscribe(e => {splitsList.innerHTML += digital.innerHTML + "<br/>"} );

//Get RESET BUTTON working
const resetObserv = Observable.fromEvent(document.getElementById('reset'), 'click')
resetObserv.subscribe(e => 
	{
		started = false;
		time = 0;
		draw(time);
		digital.innerHTML = "0:0:00";
		splitsList.innerHTML = "";
	}
);


//Draw Clock
const draw = (time) => {
  if (canvas.getContext) 
  {
    const clock = canvas.getContext('2d');
	canvas.width = 220;
	canvas.height = 200;
	
    clock.clearRect(0, 0, canvas.width, canvas.height);

    const watchSize = 96; //96
    const contentSize = 0.90; //0.92
	
	
    // Center dot
    clock.fillStyle = "#6219c1"; 
    clock.beginPath();
    clock.arc(watchSize, watchSize, 3, 0, 2 * Math.PI, true); //Dot moves relative to Clock
    clock.fill();

	//Outer Circle
    clock.strokeStyle = "#5c04ce"; 
    clock.beginPath();
    clock.arc(watchSize, watchSize, watchSize, 0, Math.PI * 2, true);

    //Put numbers on clock
	let radius = canvas.height/2; //Get number size
	clock.translate(radius - 5, radius);
	
	//radius = radius * 0.90
	let ang = 0;
    let num = 5;
	
    clock.font = radius*0.12 + "px arial";
    clock.textBaseline="middle";
    clock.textAlign="center";
	
    for(num = 5; num < 64; num ++)
	{
		if(num % 5 == 0)
		{
			//console.log("num: " + num);
			ang = num * Math.PI / 30; //Spread of nums
			clock.rotate(ang);
			clock.translate(-2, -radius*0.85);
			clock.rotate(-ang);
			clock.fillText(num.toString(), 0, 0);
			clock.rotate(ang);
			clock.translate(0, radius*0.85);
			clock.rotate(-ang);
		}
	}
	
	clock.translate(-radius + 5, -radius); //Reset
	
    // Longer hand (minute), each minute goes one step
	clock.lineWidth = 2;
    let angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
    let armLength = watchSize * 0.5;
    clock.moveTo(watchSize, watchSize);
    clock.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

    // Shorter hand (second), each second goes one step

    angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
    armLength = watchSize * 0.7;
    clock.moveTo(watchSize, watchSize);
    clock.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));
	
	// Shortest hand (mili-second), each mili-second goes one step
    angle = (time / 1 / 60 - 0.25) * (Math.PI * 2);
    armLength = watchSize * 0.9;
    clock.moveTo(watchSize, watchSize);
    clock.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

    clock.stroke();
  }
}

draw();
