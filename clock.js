import Rx from 'rxjs/Rx';

// Document object model elements
const display = document.getElementById("display");

const splitList = document.getElementById("ul_splits");


// disable the split button
document.getElementById("split").disabled = true;



// setup 100 ms interval stream
const source$ = Rx.Observable 
  .interval(100)
  .timeInterval();


let stopwatch = false;
  

let seconds = 0;
let minutes = 0;
let hours = 0;


let number_of_splits = 0;
  

// set stopwatch to true if start is pressed
Rx.Observable.fromEvent(document.getElementById('start'), 'click')
  .subscribe(e => {
    stopwatch = true;
});

// set stopwatch to false if stop is pressed
Rx.Observable.fromEvent(document.getElementById('stop'), 'click')
  .subscribe(e => {
    stopwatch = false;
});




// set stopwatch to false if stop is pressed
Rx.Observable.fromEvent(document.getElementById('reset'), 'click')
  .subscribe(e => {
	stopwatch = false;
	
	// disable the split button
	document.getElementById("split").disabled = true;
	
	// reset time
    seconds = 0;
	minutes = 0;
	hours = 0;
	display.value = "00:00:00";
	number_of_splits = 0;
	splitList.style.overflowY = "hidden";
	
	// call animate again to reset the stopwatch
	animateClock();

	
	// clear split list
	while (splitList.firstChild) {
        splitList.removeChild(splitList.firstChild);
    }
	
	
});


// set stopwatch to false if stop is pressed
Rx.Observable.fromEvent(document.getElementById('split'), 'click')
  .subscribe(e => {
	//	split_button.disabled = false;
	number_of_splits++;
	
	var parentNode = document.createElement("li");
    var childNodeName = document.createElement("div");

    childNodeName.innerHTML = number_of_splits + " : " + display.value;
    
    parentNode.appendChild(childNodeName);
    
	// add to split list
    splitList.appendChild(parentNode);
	
	// add scroll after 10 splits
	if(number_of_splits >= 10){
		splitList.style.overflowY = "scroll";
	}
	
});





const stopwatch$ = source$.subscribe( e => {
	
	// return if stopwatch is false
	if(!stopwatch) return;
	
	// enable the split button
	document.getElementById("split").disabled = false;
	
	// increment seconds 
	seconds++;

	if(seconds >= 60){
		
		seconds = 0;
		minutes++;
	
		if(minutes >= 60){
			minutes = 0;
			hours++;
		}
	}
	
	// animate and draw clock hands
	animateClock();
		
    display.value = ( hours ? (hours > 9 ? hours : "0" + hours) : "00")
					+ ":" 
					+ (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") 
					+ ":" 
					+ (seconds > 9 ? seconds : "0" + seconds);
					
});





const clock_canvas = document.getElementById("canvas"); 
const ctx = canvas.getContext('2d');


animateClock();


function animateClock() {
	
    let theta;
	let clock_width = 60;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawClock();
    drawSeconds();
    drawMinutes();

    function drawSeconds() {
        theta = ((Math.PI * 2) * (seconds / 60)) - ((Math.PI * 2) / 4);
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        ctx.moveTo(canvas.width /2, canvas.height / 2);
        ctx.lineTo((canvas.width /2 + Math.cos(theta) * clock_width), canvas.height / 2 + Math.sin(theta) * clock_width);

        ctx.strokeStyle = 'grey';
        ctx.stroke();
    }

    function drawMinutes() {
        theta = ((Math.PI * 2) * (minutes / 60)) - ((Math.PI * 2) / 4);
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(canvas.width /2, canvas.height / 2);
        ctx.lineTo((canvas.width /2 + Math.cos(theta) * clock_width / 1.1), canvas.height / 2 + Math.sin(theta) * clock_width / 1.1);

        ctx.strokeStyle = 'grey';
        ctx.stroke();
    }
	
}


function drawClock() {

	let clock_width = 60;

	// draw outer clock face
	ctx.beginPath();
	// x , y, size, The starting angle, in radians, The ending angle, in radians
	ctx.arc(clock_canvas.width / 2, clock_canvas.height / 2, clock_width + 12, 0, Math.PI * 2);
	ctx.strokeStyle = 'black';
	ctx.stroke();

	// draw inner clock face
	ctx.beginPath();
	ctx.arc(clock_canvas.width / 2, clock_canvas.height / 2, clock_width + 8, 0, Math.PI * 2);
	ctx.strokeStyle = 'grey';
	ctx.stroke();

	// draw centre dot
	ctx.beginPath();
	ctx.arc(clock_canvas.width / 2, clock_canvas.height / 2, 2, 0, Math.PI * 2);
	ctx.lineWidth = 1;
	ctx.fillStyle="black";
	ctx.fill();

	let theta;

	// draw minute markers
	for (let i = 0; i < 12; i++) {
		
		theta = (i - 3) * (Math.PI * 2) / 12;
		
		ctx.lineWidth = 1;
		ctx.beginPath();

		let x1 = (canvas.width / 2) + Math.cos(theta) * (clock_width + 5);
		let y1 = (canvas.height / 2) + Math.sin(theta) * (clock_width + 5);
		
		let x2 = (canvas.width / 2) + Math.cos(theta) * (clock_width + 5 - (clock_width / 7));
		let y2 = (canvas.height / 2) + Math.sin(theta) * (clock_width + 5 - (clock_width / 7));

		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);

		ctx.stroke();
	}

	// draw second markers
	for (let i = 0; i < 60; i++) {

		theta = (i - 3) * (Math.PI * 2) / 60
		
		ctx.lineWidth = 1;
		ctx.beginPath();

		let x1 = (canvas.width / 2) + Math.cos(theta) * (clock_width);
		let y1 = (canvas.height / 2) + Math.sin(theta) * (clock_width);
		
		let x2 = (canvas.width / 2) + Math.cos(theta) * (clock_width - (clock_width / 30));
		let y2 = (canvas.height / 2) + Math.sin(theta) * (clock_width - (clock_width / 30));

		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);

		ctx.strokeStyle = 'grey';
		ctx.stroke();
	}

}