import { Observable } from 'rxjs/Rx';

import '../css/stopwatch.css';

const clockAnalogue = document.getElementById('clockFace');
const digClock = document.getElementById('digiClock');
clockAnalogue.style.width 
    = digClock.style.width 
    = clockAnalogue.style.height = digClock.style.height 
    = (document.body.clientWidth / 2) + "px";

// draw clock
const canvas = document.getElementById('clockCanvas');
var ctx = canvas.getContext('2d');
canvas.width
    = canvas.height
    = (document.body.clientWidth / 2);
let centre = canvas.width / 2;

let angle = -90;
let angleRadians = 0;
let lineX1, lineX2, lineY1, lineY2 = 0;

// draw static elements of clock
function drawClock () {
    // outer circle and numbers
    for (var i = 0; i < 12; i++) {
        ctx.strokeStyle = 'Gray';
        ctx.lineWidth = "3";
        ctx.beginPath();
        ctx.arc(centre, centre, centre - 1, (i/6)*Math.PI, ((i+1)/6)*Math.PI);
        ctx.stroke();

        // number lines
        angleRadians = angle * (Math.PI / 180);
        lineX1 = centre + (centre - 1) * Math.cos(angleRadians);
        lineX2 = centre + (centre - 16) * Math.cos(angleRadians);
        lineY1 = centre + (centre - 1) * Math.sin(angleRadians);
        lineY2 = centre + (centre - 16) * Math.sin(angleRadians);
        ctx.beginPath();
        ctx.moveTo(lineX1, lineY1);
        ctx.lineTo(lineX2, lineY2);
        ctx.stroke();

        // numbers
        ctx.font = "30px Arial";
        ctx.strokeStyle = 'Black';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = 'Black';
        let numX = centre + (centre - 35) * Math.cos(angleRadians);
        let numY = centre + (centre - 35) * Math.sin(angleRadians);
        if (i == 0) {
            ctx.fillText("12", numX, numY);
        }
        else {
            ctx.fillText(i+"", numX, numY);
        }
        angle += 30;
    }

    angle = -90;
    // outer second lines
    for (var i = 0; i < 60; i++) {
        ctx.strokeStyle = 'Gray';
        ctx.lineWidth = "1";
        angleRadians = angle * (Math.PI / 180);
        lineX1 = centre + (centre - 1) * Math.cos(angleRadians);
        lineX2 = centre + (centre - 11) * Math.cos(angleRadians);
        lineY1 = centre + (centre - 1) * Math.sin(angleRadians);
        lineY2 = centre + (centre - 11) * Math.sin(angleRadians);
        ctx.beginPath();
        ctx.moveTo(lineX1, lineY1);
        ctx.lineTo(lineX2, lineY2);
        ctx.stroke();
        angle += 6;
    }

    // inner circle
    ctx.strokeStyle = 'DimGray';
    ctx.fillStyle = 'Black';
    ctx.beginPath();
    ctx.arc(centre, centre, 3, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
}
drawClock();

// second hand
function drawSecond(x, y) {
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.moveTo(centre, centre);
    ctx.lineTo(x, y);
    ctx.stroke();
}
drawSecond(centre, 25);

// minute hand
function drawMinute(x, y) {
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.moveTo(centre, centre);
    ctx.lineTo(x, y);
    ctx.stroke();
}
drawMinute(centre, 45);

const tableSplits = document.getElementById('timer');
const tenth = document.getElementById('tenth');
const second = document.getElementById('seconds');
const minute = document.getElementById('minutes');

const start = document.getElementById('start');
const start$ = Observable.fromEvent(start, 'click');

const stop = document.getElementById('stop');
const stop$ = Observable.fromEvent(stop, 'click');

const split = document.getElementById('split');
const split$ = Observable.fromEvent(split, 'click');

const reset = document.getElementById('reset');
const reset$ = Observable.fromEvent(reset, 'click');

// interval will continue until stop button clicked
const count$ = Observable.interval(100).takeUntil(stop$.merge(reset$));

let secAngle = -90;
let secAngleRadinas = 0;
let minAngle = -90;
let minAngleRadians = 0;
let sec = 0;
let min = 0;
let tSec = 0;
start$
    // will take the values emitted from count$ stream, and input
    // them into the source Observable, i.e. start$.
    .switchMapTo(count$)
    .subscribe(num => {
        tenth.textContent = tSec % 10;
        // increment seconds when ten tenths of a second is reached
        if (tSec > 9 && tSec % 10 == 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawClock();
            secAngle += 6;
            secAngleRadinas = secAngle * (Math.PI / 180);
            minAngleRadians = minAngle * (Math.PI / 180);
            drawSecond(centre + (centre - 25) * Math.cos(secAngleRadinas),
                        centre + (centre - 25) * Math.sin(secAngleRadinas));
            drawMinute(centre + (centre - 45) * Math.cos(minAngleRadians), 
                        centre + (centre - 45) * Math.sin(minAngleRadians));
            sec = parseInt(second.textContent);
            sec++;
            if (sec % 60 < 10) {
                second.textContent = "0" + sec % 60;
            }
            else {
                second.textContent = sec % 60;
            }
            
            // increment minute when 60 seconds reached
            if (tSec > 599 && tSec % 600 == 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawClock();
                minAngle += 6;
                secAngleRadinas = secAngle * (Math.PI / 180);
                minAngleRadians = minAngle * (Math.PI / 180);
                drawSecond(centre + (centre - 25) * Math.cos(secAngleRadinas),
                            centre + (centre - 25) * Math.sin(secAngleRadinas));
                drawMinute(centre + (centre - 45) * Math.cos(minAngleRadians), 
                        centre + (centre - 45) * Math.sin(minAngleRadians));
                min = parseInt(minute.textContent);
                min++;
                if (min % 60 < 10) {
                    minute.textContent = "0" + min % 60;
                }
                else {
                    minute.textContent = min % 60;
                }
            }
        }
        tSec++;
    })

reset$.subscribe(() => {
    tenth.textContent = "0";
    second.textContent = "00";
    minute.textContent = "00";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClock();
    drawSecond(centre, 25);
    drawMinute(centre, 45);
    secAngle = -90;
    secAngleRadinas = 0;
    minAngle = -90;
    minAngleRadians = 0;
    sec = 0;
    min = 0;
    tSec = 0;
    splitCount = 0
    for (var i = tableSplits.rows.length - 1; i > 0; i--) {
        tableSplits.deleteRow(i);
    }
})

let splitCount = 0;

split$.subscribe(() => {
    if (splitCount < 5 && tSec > 0) {
        splitCount++;
        var newSplit = tableSplits.insertRow(splitCount);
    }
    else if (splitCount >= 5) {
        splitCount++;
        tableSplits.deleteRow(1);
        var newSplit = tableSplits.insertRow(5);
    }

    if (tSec > 0) {
        newSplit.textContent = "Split " + splitCount + "\t" 
                                + minute.textContent + ":"
                                + second.textContent + ":"
                                + tenth.textContent;
    }
})