import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { interval } from 'rxjs';

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const splitButton = document.getElementById('split')
const resetButton = document.getElementById('reset')

let minutesView = document.getElementById('minutes')
let secondsView = document.getElementById('seconds')
let millisecondView = document.getElementById('milliseconds')
let splitTime = document.getElementById('splitList')

let minutes = 0
let seconds = 0
let milliseconds = 0

const start$ = fromEvent(startButton, 'click')
const stop$ = fromEvent(stopButton, 'click')
const split$ = fromEvent(splitButton, 'click')
const reset$ = fromEvent(resetButton, 'click')

let startTime = false
const source$ = interval(10)

start$.subscribe(ev => {
    if (startTime) return increaseTime()

    startTime = source$.subscribe((val => {
        increaseTime()
    }))
})

const increaseTime = () =>{
    milliseconds ++
    console.log(minutes, seconds, milliseconds)
    if (((milliseconds + 1) % 100) === 0) {
        milliseconds = 0
        seconds++
    }
    if (((seconds + 1) % 60) === 0){
        seconds = 0
        minutes ++
    }
    view()
}

const view = () => {
    if (minutesView.toString().length === 1) minutesView.innerText = '0' + minutes.toString()
    else minutesView.innerText = minutes.toString()

    if (secondsView.toString().length === 1) secondsView.innerText = '0' + seconds.toString()
    else secondsView.innerText = seconds.toString()

    if (milliseconds.toString().length === 1) millisecondView.innerText = '0' + milliseconds.toString()
    else millisecondView.innerText = milliseconds.toString()
}

stop$.subscribe(ev => {
    startTime.unsubscribe()
    startTime = false
})

split$.subscribe(ev => {
    const p = document.createElement('p')
    p.innerText = minutes + ":" + seconds + ':' + milliseconds
    splitTime.appendChild(p)
})

reset$.subscribe(ev => {
    minutes = 0
    seconds = 0
    milliseconds = 0
    console.log(minutes, seconds, milliseconds)
    splitTime.innerHTML = ''
    view()
})

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90

setInterval(drawClock);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    //Circle circumference
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();

    //drawing the numbers on
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    let smallHands = 4

    for (var i = 0; i < 60; i++) {
        let width;
        let length;
        if (smallHands === 4){
            width = 2;
            length = 20
            smallHands = 0
        }else {
            width = 1;
            length = 3;
            smallHands++
        }
        const startX = ( radius * Math.cos(2 * Math.PI * i / 60));
        const startY = (radius * Math.sin(2 * Math.PI * i / 60));
        const endX = ((radius - length) * Math.cos(2 * Math.PI * i / 60));
        const endY = ((radius - length) * Math.sin(2 * Math.PI * i / 60));
        drawLine(startX, startY, endX, endY, width)
    }
}

function drawLine(startX, startY, endX, endY, width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawTime(ctx, radius){
    const secs=(seconds*Math.PI/30);
    drawHand(ctx, secs, radius*0.7, 1);

    const mins=(minutes*Math.PI/30)+(seconds*Math.PI/(30*60));
    drawHand(ctx, mins, radius*0.8, 2);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

