import { scan, takeWhile } from 'rxjs/operators';
import { interval, fromEvent } from 'rxjs';

const splitButton = document.querySelector("#splitButton");
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const resetButton = document.querySelector("#resetButton");

var stop = true;

var tenthSecondsClock = interval(100).pipe(scan((acc, val) => acc + 1));
var secondsClock = interval(1000).pipe(scan((acc1, val1) => acc1 + 1));
var minutesClock = interval(60000).pipe(scan((acc2, val2) => acc2 + 1));

var tenthSecondsSub;
var secondsSub;
var minutesSub;

fromEvent(splitButton, "click").subscribe( val => addSplit() );
fromEvent(resetButton, "click").subscribe( val => resetSplits() );
fromEvent(stopButton, "click").subscribe( val => stopClock() );
fromEvent(startButton, "click").subscribe( val => startClock() );

var minutesSpan = document.querySelector("#minutes");
var secondsSpan = document.querySelector("#seconds");
var tenthSecondsSpan = document.querySelector("#tenth-seconds");

var splits = [];
var minutes = 0;
const maxSplits = 5;
var cs = document.getElementById("clock-canvas").getContext("2d");

function stopClock()
{
    if(stop === true)
        return;
    
    console.log("Stopped");
    tenthSecondsSub.unsubscribe();
    secondsSub.unsubscribe();
    minutesSub.unsubscribe();
    
    minutesSpan.innerHTML = "00";
    secondsSpan.innerHTML = "00";
    tenthSecondsSpan.innerHTML = "00";
    
    stop = true;
    clearCanvas();
    drawClockEdge();
    drawClockNotches();
    drawSecondsHand(0);
    drawMinutesHand(0);
    
    minutes = 0;
}

function startClock()
{
    if(stop === false)
        return;
    
    tenthSecondsSub = tenthSecondsClock.subscribe(tenthSeconds => setTenthSeconds(tenthSeconds % 10));
    secondsSub = secondsClock.subscribe(seconds => 
        { 
            if(seconds === 60)
                minutes++; 
            
            setSeconds(seconds % 60); 
            clearCanvas();
            drawClockEdge();
            drawClockNotches();
            drawSecondsHand(seconds % 60);
            drawMinutesHand(minutes) % 60;
        });
    minutesSub = minutesClock.subscribe(minutes => {
        setMinutes(minutes % 60); 
        drawMinutessHand(minutes % 60);
    });
    
    stop = false;
    
    drawClockEdge();
    drawClockNotches();
    drawMinutesHand(0);
}

function resetSplits()
{
    splits.splice(0, splits.length - 1);
    var splitContainer = document.querySelector("#splits");
    
    while(splitContainer.firstChild)
        splitContainer.removeChild(splitContainer.firstChild);
    
}

function addSplit()
{
    if(splits.length >= maxSplits || stop)
        return;
    
    splits.push(
        {
            minutes: minutesSpan.innerHTML,
            seconds: secondsSpan.innerHTML,
            tenthSeconds: tenthSecondsSpan.innerHTML
        }
    );
    
    const splitSpan = document.createElement("SPAN");
    splitSpan.className = 'split';
    const currSplit = splits[splits.length - 1];
    splitSpan.innerHTML = currSplit.minutes + ':' + currSplit.seconds + " (" + currSplit.tenthSeconds + ")";
    
    var splitContainer = document.querySelector("#splits");
    splitContainer.append(splitSpan);
}

function setMinutes(minutes)
{
    minutesSpan.innerHTML = (minutes < 10) ? '0' + minutes : minutes;;
}

function setSeconds(seconds)
{
    secondsSpan.innerHTML = (seconds < 10) ? '0' + seconds : seconds;
}

function setTenthSeconds(time)
{
    tenthSecondsSpan.innerHTML = time;
}


function clearCanvas()
{
    cs.clearRect(0, 0, 200, 200);
}

function drawSecondsHand(seconds)
{
    cs.lineWidth = 2;  
    cs.beginPath();
    cs.moveTo(100, 100); // middle
    
    seconds = seconds % 60;
    
    var notchRadius = 10;
    var halfWidth = 100;
    const numNotches = 360;
    var angle = (seconds / 60) * (Math.PI * 2);   
    
    var endX = (halfWidth) + Math.cos(angle) * (notchRadius - (notchRadius / (numNotches / 2)));
    var endY = (halfWidth) + Math.sin(angle) * (notchRadius - (notchRadius / (numNotches / 2)));

    var endX = 100 + 70 * Math.cos((seconds / 60 - 0.25) * (Math.PI * 2));
    var endY = 100 + 70 * Math.sin((seconds / 60 - 0.25) * (Math.PI * 2));
    
    cs.lineTo(endX, endY);

    cs.stroke();
}

function drawMinutesHand(minutes)
{
    cs.lineWidth = 2;  
    cs.beginPath();
    cs.moveTo(100, 100); // middle
    
    minutes = minutes % 60;
    
    var notchRadius = 10;
    var halfWidth = 100;
    const numNotches = 360;
    var angle = (minutes / 60) * (Math.PI * 2);   
    
    var endX = (halfWidth) + Math.cos(angle) * (notchRadius - (notchRadius / (numNotches / 2)));
    var endY = (halfWidth) + Math.sin(angle) * (notchRadius - (notchRadius / (numNotches / 2)));

    var endX = 100 + 50 * Math.cos((minutes / 60 - 0.25) * (Math.PI * 2));
    var endY = 100 + 50 * Math.sin((minutes / 60 - 0.25) * (Math.PI * 2));
    
    cs.lineTo(endX, endY);

    cs.stroke();
}

function drawClockNotches()
{
    var notchRadius = 95;
    var halfWidth = 100;
    const numNotches = 12;
    
    var startX;
    var startY;
    var endX;
    var endY;
    
    for (var i = 0; i < numNotches; i++)
    {
        var angle = i * (Math.PI * 2) / numNotches;      
        cs.lineWidth = 1;  
        cs.beginPath();

        startX = (halfWidth) + Math.cos(angle) * (notchRadius);
        startY = (halfWidth) + Math.sin(angle) * (notchRadius);
        endX = (halfWidth) + Math.cos(angle) * (notchRadius - (notchRadius / (numNotches / 2)));
        endY = (halfWidth) + Math.sin(angle) * (notchRadius - (notchRadius / (numNotches / 2)));

        cs.moveTo(startX, startY);
        cs.lineTo(endX, endY);

        cs.stroke();
    }
}

function drawClockEdge()
{
    cs.beginPath();
    cs.arc(100, 100, 100, 0, 2 * Math.PI);
    cs.stroke();
}
