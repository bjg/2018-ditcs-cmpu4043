import Rx from 'rxjs/Rx';
// import { Subject, ReplaySubject, from, of, range } from 'rxjs';
import {Observable} from 'rxjs/Observable';
// import { map, filter, switchMap } from 'rxjs/operators';
import { Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver, switchMap } from 'rxjs';
import { map, filter, scan , mapTo } from 'rxjs/operators';
import '../css/style.css';

// Select the elements that will need to manipulate
const canvas = document.getElementById('canvas');
const display = document.getElementById('digitalClock');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const splitBtn = document.getElementById('split');
const splits = document.getElementById('splits');

//Create one stream for each button
const start$ = fromEvent(startBtn,'click');
const stop$ = fromEvent(stopBtn,'click');
const reset$ = fromEvent(resetBtn,'click');
const split$ = fromEvent(splitBtn,'click');
/*Create a stream with an interval tha executes every 100 miliseconds.
This streams gets completed once the stop stream is executed*/
const interval$ = interval(100).takeUntil(stop$);
// time variable
let time = 0;


const buttons$ = merge(//merge creates and observabke that emits the values of both observables merged.
  start$.switchMap(event => { return interval$.map(() => 1)}),//switchMap helps to switch two observables and cancel old subscriptions
  //taking only the values from the most recently projected inner Observable.
  reset$.map(()=>0)) //project function to each value emitted by the source
  .scan((acc, n) => n === 0 ? 0 : acc + n );//Scan applies an accumulator function over the Observable and returns each intermediate result,.

  //Subcribe the stream to a function that will draw the digital and the analogue version of the clock.
  buttons$.subscribe(time => {
    //console.log(time)
    drawClock(time);//Call to the function that prints the clock
    //minutes
    let m = parseInt(time/600);//dividing the current time in miliseconds by 600
    //seconds
    let s = parseInt((time/10) % 60)//dividing time by ten and mod 60
    //miliseconds
    let ms = (time % 10);//mod 10 make the miliseconds change 10 by 10.

    m =checkTime(m);
    s= checkTime(s);

    // function that adds a zero at the start of the string if the number passed is less than 10
    function checkTime(i) {
      if (i < 10){
        i = "0" + i
      }// add zero in front of numbers < 10
      return i;
    }
    //Display the time on the digital clock
    display.innerHTML = m + ":" + s + ":" + ms + "0";
  });
  //Execute function for the stream that controls the splits
  split$.subscribe(event =>{
    // create a new p element
    var splitsList = document.createElement("P");
    // and give it some content
    var newContent = document.createTextNode(display.innerHTML);
    // add the text node to the newly created div
    splitsList.appendChild(newContent);
    //Count the number of childs of the div element split
    var childs = splits.childElementCount;
    //Support 5 recorded split times
    if(childs<5){
      //add the new p element to the div split
      splits.appendChild(splitsList);
    }
  });
  //Execute function for the stream that controls the splits
  reset$.subscribe(event =>{
    // Set time variable to 0
    time = 0;
    // Draw the clock again
    drawClock(time);
    // Reset the digital clock to 0
    display.innerHTML = "00:00:00";
    // Remove all the splits
    splits.innerHTML = "";
  });

  //Function that draws a clock using canvas
  function drawClock(time){
    //get the context of the canvas
    const ctx = canvas.getContext('2d');
    var angle;
    var radius = 100;

    /*Clearing all the canvas every time this function gets call
    enables the hand of the clock to move withouth leaving a trail behind*/
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Drawing the inner circle
    ctx.beginPath();
    /* the arc function takes x and y as the parameter to center the circle,
    the radius,
    the starting angle and the end of the angle to be printed*/
    ctx.arc(canvas.width / 2, canvas.height / 2, radius + 10, 0, Math.PI * 2);
    ctx.strokeStyle = 'grey';
    ctx.stroke();
    // Drawing the outside circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius + 7, 0, Math.PI * 2);
    ctx.strokeStyle = 'grey';
    ctx.stroke();
    // Drawing the circle in the centre
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 1, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.stroke();

    //Drawing twelve lines to indicate the hours
    for (var i = 0; i < 12; i++) {
      angle = i * (Math.PI * 2) / 12;
      ctx.lineWidth = 1;
      ctx.beginPath();

      var x1 = (canvas.width / 2) + Math.cos(angle) * (radius);
      var y1 = (canvas.height / 2) + Math.sin(angle) * (radius);
      var x2 = (canvas.width / 2) + Math.cos(angle) * (radius - (radius / 7));
      var y2 = (canvas.height / 2) + Math.sin(angle) * (radius - (radius / 7));

      //moves the starting point of a new sub-path to the specified (x, y) coordinates.
      ctx.moveTo(x1, y1);
      //connects the last point in the sub-path to the x, y coordinates with a straight line
      ctx.lineTo(x2, y2);

      ctx.strokeStyle = '#466B76';
      ctx.stroke();
    }
    //Drawing 60 lines to indicate the minutes
    for (var i = 0; i < 60; i++) {
      angle = i * (Math.PI * 2) / 60;
      ctx.lineWidth = 1;
      ctx.beginPath();

      var x1 = (canvas.width / 2) + Math.cos(angle) * (radius);
      var y1 = (canvas.height / 2) + Math.sin(angle) * (radius);
      var x2 = (canvas.width / 2) + Math.cos(angle) * (radius - (radius / 30));
      var y2 = (canvas.height / 2) + Math.sin(angle) * (radius - (radius / 30));

      //moves the starting point of a new sub-path to the specified (x, y) coordinates.
      ctx.moveTo(x1, y1);
      //connects the last point in the sub-path to the x, y coordinates with a straight line
      ctx.lineTo(x2, y2);

      ctx.strokeStyle = '#C4D1D5';
      ctx.stroke();
    }

    //Drawing the hand that indicates the seconds
    // Angle to start at 0 (12) is calculated by 2PI * TIME * quarter of the circle
    angle = ((Math.PI * 2) * (time / 10/ 60)) - ((Math.PI * 2) / 4);
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    // starting from the center
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // Drawing the line of the hand
    ctx.lineTo((canvas.width / 2 + Math.cos(angle) * radius),
    canvas.height / 2 + Math.sin(angle) * radius);
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    //Drawing the hand that indicates the minutes
    // Angle to start at 0 (12) is calculated by 2PI * TIME * quarter of the circle
    angle = (Math.PI * 2) * (time / 600 / 60 )  - ((Math.PI * 2) / 4);;
    ctx.lineWidth = 0.5;
    //Drawing the line that hand that indicates the minutes
    ctx.beginPath();
    // starting from the center
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // Drawing the line of the hand
    ctx.lineTo((canvas.width / 2 + Math.cos(angle) * radius),
    canvas.height / 2 + Math.sin(angle) * radius + 5);
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    var i = 12;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    //Draw the hour numbers inside the clock
    while (i > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      var angle = (i * 30) * Math.PI / 180;
      ctx.rotate(angle);
      ctx.translate(0, -radius / 2);
      ctx.fillText(i, -3, -25);
      ctx.restore();

      i--;
    }
  }
  //First call to the function that draws the clock on canvas with time set to 0
  drawClock(0);
