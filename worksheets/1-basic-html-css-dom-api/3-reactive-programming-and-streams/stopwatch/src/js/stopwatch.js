/*
* Stopwatch App - Worksheet 3
* Author: Dimiter Dinkov
* Student Number: C15334276
* */
import {fromEvent, merge, pipe, subscribe, interval} from "rxjs";
import {mapTo, mergeAll, takeUntil} from "rxjs/operators";


//Time Displaying in numbers
let btnDiv = document.getElementById("buttons");
let minSpan = document.getElementById("mins");
let secSpan = document.getElementById("secs")
let milliSpan = document.getElementById("milliSecs");

//displaying the stopwatch
let cnvs = document.getElementById("stopwatchCanvas");

//creating the buttons for the stopwatch
const startBtn = createButton("start", btnDiv);
const stopBtn = createButton("stop", btnDiv);
const splitBtn = createButton("split", btnDiv);
const resetBtn = createButton("reset", btnDiv);

//variables used
let secs = 0;
let min = 0;
let milliSeconds = 0;
let times = [];
let count = 0;

//Initial draw of the Stopwatch and create streams to buttons
cnvs.getContext("2d").translate(cnvs.height / 2, cnvs.width / 2);
drawStopwatch(cnvs, 0, 0);
setStream(startBtn, stopBtn, splitBtn, resetBtn);

function setStream(start, stop, split, reset) {
    //Creat a separate stream from the stop button to stop the interval
    let timer = fromEvent(stopBtn, "click").pipe(mapTo(stopBtn.textContent));
    //create a merged stream from the start,split and reset buttons
    merge(
        fromEvent(start, "click").pipe(mapTo(start.textContent)),
        fromEvent(split, "click").pipe(mapTo(split.textContent)),
        fromEvent(reset, "click").pipe(mapTo(reset.textContent))
    ).subscribe(//subscribe to stream
        ev => { //pass in string value representing which button was clicked
            if (ev === "start") { //if start button was clicked start a timer
                count = interval(100).pipe(takeUntil(timer));//create a new stream that returns a value every 10th of a second until the stop button is clicked
                count.subscribe(counter => {//subscribe to the interval stream
                    //Some formatting for minutes,seconds and milliseconds to display them properly
                    if (milliSeconds === 10) {
                        milliSeconds = 0;
                    } else {
                        milliSeconds++;
                    }

                    if (counter % 10 === 0 && secs !== 60) {
                        secs++;
                    } else if (secs === 60) {
                        secs = 0;
                        milliSeconds = 0;
                        min++;
                    }
                    //display minutes,seconds and milliseconds and update the stopwatch
                    minSpan.innerText = min;
                    secSpan.innerText = secs;
                    milliSpan.innerText = milliSeconds * 10;
                    drawStopwatch(cnvs, min, secs);
                })
            } else if (ev === "split") { //if the split button was clicked
                if (times.length === 5) {//check if the array that holds the split times doesn't have more than 5 entries
                    console.log("Maximum 5 Splits");//if it has more than 5 entries display error in console log
                } else { // otherwise push an object containing minutes,seconds and milliseconds to the array
                    times.push({min: min, sec: secs, mil: milliSeconds * 10});
                    addTimes(times);//display times
                }
            } else if (ev === "reset") {//if reset button is clicked reset the timer
                stopBtn.click();
                milliSeconds = 0;
                secs = 0;
                min = 0;
                times = [];
                minSpan.innerText = min;
                secSpan.innerText = secs;
                milliSpan.innerText = milliSeconds;
                drawStopwatch(cnvs, min, secs);
                addTimes(times);
            }
        }
    );
}

//draw the stopwatch face
function drawStopwatch(canvas, min, sec) {
    let context = canvas.getContext("2d");
    let radius = canvas.height / 2;
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();
    context.strokeStyle = "black";
    context.lineWidth = "1px";
    context.stroke();
    drawTime(context, radius, min, sec)
}

//drawTime in combination With draw hand draws the hands on the clock
function drawTime(ctx, radius, minute, second) {
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.04, "black");
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02, "red");
}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.rotate(-pos);
}

//Creates buttons and adds them to the DOM
function createButton(value, div) {
    let btn = document.createElement("button");
    btn.innerText = value;
    div.appendChild(btn);
    return btn;
}

//Displays the split times to the DOM
function addTimes(times) {
    let table = document.getElementById("tableTimes");

    //Empty table of already existing values
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }

    //add headers
    let rowHeaders = table.insertRow();
    let minHeader = rowHeaders.insertCell(0);
    let secHeader = rowHeaders.insertCell(1);
    let milHeader = rowHeaders.insertCell(2);

    minHeader.innerHTML = "<b>Minutes</b>";
    secHeader.innerHTML = "<b>Seconds</b>";
    milHeader.innerHTML = "<b>Milli Seconds</b>";

    //add times
    for (let t in times) {
        let row = table.insertRow();
        let minCell = row.insertCell(0);
        let secsCell = row.insertCell(1);
        let miliCell = row.insertCell(2);

        minCell.innerText = times[t].min;
        secsCell.innerText = times[t].sec;
        miliCell.innerText = times[t].mil;
    }
}
