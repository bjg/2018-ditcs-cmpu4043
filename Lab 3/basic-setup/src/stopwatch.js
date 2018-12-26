import "./style.css";
import {Observable} from 'rxjs/Rx';

const container = document.createElement("div");
const canvas = document.createElement("canvas");
const digital = document.createElement('div');
const split = document.createElement('div');
canvas.width = "200";
canvas.height = "200";
const startbtn = document.createElement('button');
const stopbtn = document.createElement('button');
const splitbtn = document.createElement('button');
const resetbtn = document.createElement('button');

startbtn.innerText = "Start";
stopbtn.innerText = "Stop";
splitbtn.innerText = "Split";
resetbtn.innerText = "Reset";

container.className = "container";

container.appendChild(canvas);
container.appendChild(digital);
container.appendChild(split);
container.appendChild(startbtn);
container.appendChild(stopbtn);
container.appendChild(splitbtn);
container.appendChild(resetbtn);

const source = Observable
    .interval(100)
    .timeInterval();


let clock_start = false;
let time = 0;


//this function draws the clock
function draw(time) {

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const clockSize = 96;
    const size = 0.92;

    ctx.lineWidth = 1;

    //centre dot on the clock
    ctx.fillStyle = "#13414E";
    ctx.beginPath();
    ctx.arc(clockSize, clockSize, 2, 0, 2 * Math.PI, true);
    ctx.fill();

    //outline of the clock
    ctx.strokeStyle = "DimGray";
    ctx.beginPath();
    ctx.arc(clockSize, clockSize, clockSize, 0, Math.PI * 2, true);
    ctx.arc(clockSize, clockSize, clockSize - 2, 0, Math.PI * 2, true);


    //12 long lines around the outside of the clock
    for (let i = 0; i < 12; i++) {
        let angle = i * (Math.PI * 2 / 12);
        const handLength = clockSize * 0.15;
        ctx.moveTo(clockSize + clockSize * Math.cos(angle) * size,
            clockSize + clockSize * Math.sin(angle) * size);
        ctx.lineTo(clockSize + (clockSize - handLength) * Math.cos(angle) * size,
            clockSize + (clockSize - handLength) * Math.sin(angle) * size);
    }

    //60 short lines on the outside of the clock
    for (let i=0; i < 60; i++) {
        let angle = i*(Math.PI * 2 / 60);
        const handLength = clockSize * 0.08;
        ctx.moveTo(clockSize + clockSize * Math.cos(angle) * size,
            clockSize + clockSize * Math.sin(angle) * size);
        ctx.lineTo(clockSize + (clockSize - handLength) * Math.cos(angle) * size,
            clockSize + (clockSize - handLength) * Math.sin(angle) * size);
    }

    //minute hand
    let angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
    let handLength = clockSize * 0.7;
    ctx.moveTo(clockSize, clockSize);
    ctx.lineTo(clockSize + handLength * Math.cos(angle), clockSize + handLength * Math.sin(angle));

    //second hand
    angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
    handLength = clockSize *0.5;
    ctx.moveTo(clockSize, clockSize);
    ctx.lineTo(clockSize + handLength * Math.cos(angle), clockSize + handLength * Math.sin(angle));

    ctx.stroke();
}


function Stopwatch(){

    const sub = source.subscribe(
        x => {
            if (!clock_start) return;
            time++;
            draw(time);
            digital.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60)
                + ":" + (time % 10) + "0";
        });

    //the following 4 functions deal with the buttons
    Observable.fromEvent(startbtn, 'click')
        .subscribe(event => {
            clock_start = true;
        });

    Observable.fromEvent(stopbtn, 'click')
        .subscribe(event => {
            clock_start = false;
        });

    Observable.fromEvent(splitbtn, 'click')
        .subscribe(event => {
            split.innerHTML += digital.innerHTML + "<br/>";
        });

    Observable.fromEvent(resetbtn, 'click')
        .subscribe(event => {
            clock_start = false;
            time = 0;
            draw(time);
            digital.innerHTML = "0:0:00";
            split.innerHTML = "";
        });

    return container;

}

draw(time);

export default Stopwatch;




