import { Observable } from 'rxjs/Rx';

import './lab3q2.css';

// setting up canvas to draw clock
const draw = document.getElementById('drawClock');
var cx = draw.getContext('2d');
draw.width
    = draw.height
    = document.body.clientHeight;

const clockDisplay = document.getElementById('clockDisplay');
const digitalClock = document.getElementById('digitalClock');
clockDisplay.style.width = digitalClock.style.width 
							= clockDisplay.style.height
							= digitalClock.style.height 
							= document.body.clientHeight + "px";
							
// centre of the clock
let ctr = draw.width / 2;

let angle = -90;
let radians = 0;
let x1, x2, y1, y2 = 0;

const listSplits = document.getElementById('timer');
const millis = document.getElementById('millis');
const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');

const start = document.getElementById('start');
const start$ = Observable.fromEvent(start, 'click');

const stop = document.getElementById('stop');
const stop$ = Observable.fromEvent(stop, 'click');

const split = document.getElementById('split');
const split$ = Observable.fromEvent(split, 'click');

const rst = document.getElementById('reset');
const rst$ = Observable.fromEvent(rst, 'click');

const count$ = Observable.interval(100).takeUntil(stop$.merge(rst$));

// number of splits to berecorded
let numSplits = 0;

// angles for second/minute hands
let sAngle = -90;
let sRadians = 0;
let mAngle = -90;
let mRadians = 0;

let secs = 0;
let mins = 0;
let mSecs = 0;

// drawing features of clock
function createClock() 
{
   
    for (var i = 0; i < 12; i++) 
	{
		// drawing outline of the clock
        cx.strokeStyle = 'Blue';
        cx.lineWidth = "2";
        cx.beginPath();
        cx.arc(ctr, ctr, ctr - 1, (i/6)*Math.PI, ((i+1)/6)*Math.PI);
        cx.stroke();

        // lines connected to clock numbers
        radians = angle * (Math.PI / 180);
        x1 = ctr + (ctr - 1) * Math.cos(radians);
        x2 = ctr + (ctr - 25) * Math.cos(radians);
        y1 = ctr + (ctr - 1) * Math.sin(radians);
        y2 = ctr + (ctr - 25) * Math.sin(radians);
        cx.beginPath();
        cx.moveTo(x1, y1);
        cx.lineTo(x2, y2);
        cx.stroke();

        // draw numbers of the clock plus some customisation
        cx.font = "40px Calibri";
        cx.strokeStyle = 'Blue';
        cx.textAlign = "center";
        cx.textBaseline = "middle";
        cx.fillStyle = 'Blue';
        let nX = ctr + (ctr - 50) * Math.cos(radians);
        let nY = ctr + (ctr - 50) * Math.sin(radians);
        if (i == 0) 
		{
            cx.fillText("12", nX, nY);
        }
        else 
		{
            cx.fillText(i+"", nX, nY);
        }
        angle += 30;
    }

    angle = -90;
    // smaller minute lines
    for (var i = 0; i < 60; i++) 
	{	
        cx.strokeStyle = 'Blue';
        cx.lineWidth = "1";
        radians = angle * (Math.PI / 180);
        x1 = ctr + (ctr - 1) * Math.cos(radians);
        x2 = ctr + (ctr - 11) * Math.cos(radians);
        y1 = ctr + (ctr - 1) * Math.sin(radians);
        y2 = ctr + (ctr - 11) * Math.sin(radians);
        cx.beginPath();
        cx.moveTo(x1, y1);
        cx.lineTo(x2, y2);
        cx.stroke();
        angle += 6;
    }

    // center dot
    cx.strokeStyle = 'DimGray';
    cx.fillStyle = 'Blue';
    cx.beginPath();
    cx.arc(ctr, ctr, 5, 0, Math.PI*2);
    cx.fill();
    cx.stroke();
}
createClock();

// draw second hand
function secHand(x, y) 
{
    cx.beginPath();
    cx.lineWidth = "2";
    cx.moveTo(ctr, ctr);
    cx.lineTo(x, y);
    cx.stroke();
}
secHand(ctr, 25);

// draw minute hand
function minHand(x, y) 
{
    cx.beginPath();
    cx.lineWidth = "4";
    cx.moveTo(ctr, ctr);
    cx.lineTo(x, y);
    cx.stroke();
}

minHand(ctr, 45);

start$.switchMapTo(count$)
    .subscribe(s => 
	{
		// when ten milliseconds is reached, increase seconds
        millis.textContent = mSecs % 10;
        if (mSecs > 9 && mSecs % 10 == 0) 
		{
            cx.clearRect(0, 0, draw.width, draw.height);
            createClock();
            sAngle += 6;
            sRadians = sAngle * (Math.PI / 180);
            mRadians = mAngle * (Math.PI / 180);
            secHand(ctr + (ctr - 25) * Math.cos(sRadians), ctr + (ctr - 25) * Math.sin(sRadians));
            minHand(ctr + (ctr - 45) * Math.cos(mRadians), ctr + (ctr - 45) * Math.sin(mRadians));
            secs = parseInt(seconds.textContent);
            secs++;
            if (secs % 60 < 10) 
			{
                seconds.textContent = "0" + secs % 60;
            }
            else 
			{
                seconds.textContent = secs % 60;
            }
            
            // when 60 seconds is reached, increase minute
            if (mSecs > 599 && mSecs % 600 == 0) 
			{
                cx.clearRect(0, 0, draw.width, draw.height);
                createClock();
                mAngle += 6;
                sRadians = sAngle * (Math.PI / 180);
                mRadians = mAngle * (Math.PI / 180);
                secHand(ctr + (ctr - 25) * Math.cos(sRadians), ctr + (ctr - 25) * Math.sin(sRadians));
                minHand(ctr + (ctr - 45) * Math.cos(mRadians), ctr + (ctr - 45) * Math.sin(mRadians));
                mins = parseInt(minutes.textContent);
                mins++;
                if (mins % 60 < 10) 
				{
                    minutes.textContent = "0" + mins % 60;
                }
                else 
				{
                    minutes.textContent = mins % 60;
                }
            }
        }
        mSecs++;
    })

// set up reset stream
rst$.subscribe(() => 
{
	// reset clock and timer
    millis.textContent = "0";
    seconds.textContent = "00";
    minutes.textContent = "00";
    cx.clearRect(0, 0, draw.width, draw.height);
    createClock();
    secHand(ctr, 25);
    minHand(ctr, 45);
	
    secs = 0;
    mins = 0;
    mSecs = 0;
    numSplits = 0;
	
	// reset clock hands
	sAngle = -90;
    sRadians = 0;
    mAngle = -90;
    mRadians = 0;
	
	// delete all recorded splits
    for (var i = listSplits.rows.length - 1; i > 0; i--) 
	{
        listSplits.deleteRow(i);
    }
})

// set up split stream
split$.subscribe(() => 
{
    if (numSplits < 5 && mSecs > 0) 
	{
        numSplits++;
        var newSplit = listSplits.insertRow(numSplits);
    }
    else if (numSplits >= 5) 
	{
		// if five splits have been recorded, delete first split and make room for new one
        numSplits++;
        listSplits.deleteRow(1);
        var newSplit = listSplits.insertRow(5);
    }
    if (mSecs > 0) 
	{
		// can record splits after timer has started
        newSplit.textContent = numSplits + "\t" 
                                + minutes.textContent + ":"
                                + seconds.textContent + ":"
                                + millis.textContent;
								
    }
})