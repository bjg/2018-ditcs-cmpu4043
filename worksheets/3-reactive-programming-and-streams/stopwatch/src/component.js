import Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

var canvas = document.getElementById("canvas");
var digital = document.getElementById("digitalClock");
var splits = document.getElementById("splits");

var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;

var start = false;
var time=0;
var splitcount = 0;

drawClock();
initFunctions();

function initFunctions(){
	
	//check observable every 100 milliseconds
	const src = Observable
		.interval(100 /* ms */ )
		.timeInterval();
	  
	//checks if start is true or false
	//if true, it updates the timer and digital clock every 100 milliseconds
	const subscription = src.subscribe(
		x => {
			if(start == false) return;
			time++;
			drawClock();
			digital.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
	});
  
	//when the start button is pressed, set start to true
	Observable.fromEvent(document.getElementById('start'), 'click')
	  .subscribe(e => {
		start = true;
	  });

	//when the stop button is pressed, set start to false
	Observable.fromEvent(document.getElementById('stop'), 'click')
	  .subscribe(e => {
		start = false;
	  });

	//when the split button is pressed, check if the split count is less than 5
	//if split count is less than 5, add current time to a list under the digital clock
	//increment splitcount
	Observable.fromEvent(document.getElementById('split'), 'click')
	  .subscribe(e => {
		if(splitcount==5){
			return;
		} else{
			splits.innerHTML += digital.innerHTML + "<br/>";
		}
		splitcount++;
	  });

	//when the reset buton is hit, set start to false and reset all the variables back to 0 or empty
	Observable.fromEvent(document.getElementById('reset'), 'click')
	  .subscribe(e => {
		start = false;
		time = 0;
		splitcount = 0;
		drawClock();
		digital.innerHTML = "0:0:00";
		splits.innerHTML = "";
	  });
}

//function which will draw the clock itself
//this function primary draws the clocks face and then it calls
//the drawTime function which draws the clock hands at 1000 millisecond intervals
function drawClock() {
	var grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.05;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius*0.05, 0, 2*Math.PI);
    ctx.fillStyle = 'gray';
    ctx.fill();
	
	var ang;
    var num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
	
	//draws numbers around the clock face
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num, 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
	
	//draws clock hands every 1000 milliseconds
	setInterval(drawTime(ctx,radius),1000);
}

//function which draws the clocks hands based on the minutes and seconds
function drawTime(ctx, radius){
    var minute = time / 600 ;
    var second = time / 10 ;
    //minute
	minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.03);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.01);
}

//function to draw the clock hands
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
	ctx.strokeStyle = 'gray';
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

export default drawClock;