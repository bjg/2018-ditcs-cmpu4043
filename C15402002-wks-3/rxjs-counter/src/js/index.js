import { fromEvent, interval } from 'rxjs';
import { map } from 'rxjs/operators';

import '../css/style.css'


const canvas = document.getElementById('stopwatch');
const size = 96;
const contentSize = 0.92;
const c = canvas.getContext('2d');

const digital = document.getElementById('digital');
const splitsList = document.getElementById('laps');
const timer = interval(100);

let started = false;
let time = 0; //counter

const stream = fromEvent(document, 'click').pipe(map(event =>event.target.innerHTML)); //listen for click

draw(time);

//listens for button action
 stream.subscribe( btn => {
    if(btn ==='Start' ){
       started = true;
       console.log("start timer");
    }

    if(btn === 'Stop'){
        started = false;
        console.log("stop timer");
    }

    if(btn === 'Lap'){
        if(started = true){
            time ++;
            splitsList.innerHTML +="Lap: " + digital.innerHTML + "<br/>";
            console.log("split time");
        }
    }

    if(btn === 'Reset'){
        started = false;
        time = 0;
        draw(time);
        digital.innerHTML = "0:0:00";
        splitsList.innerHTML = "";
        console.log("reset timer");
    }

});

//timer display increase when start
 timer.subscribe(time =>{
     if(!started){
         return;
     }else{
         time++;
         draw(time);
         digital.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
     }

 })


function draw(time){
        c.clearRect(0, 0, canvas.width, canvas.height);

        c.fillStyle = "#000";
        c.beginPath();
        c.arc(size, size, 2, 0, 2 * Math.PI, true);
        c.fill();


        c.strokeStyle = "#000";
        c.beginPath();
        c.arc(size, size, size, 0, Math.PI * 2, true);
        c.closePath();
        c.fill();

         c.fillStyle = "#fff";
         c.beginPath();
         c.arc(size, size, size - 2, 0, Math.PI * 2, true);
         c.closePath();
         c.fill();

        //ticks for minutes
        for (let i = 0; i < 12; i++) {
            let angle = i * (Math.PI * 2 / 12);
            const armLength = size * 0.15;
            c.moveTo(size + size * Math.cos(angle) * contentSize, size + size * Math.sin(angle) * contentSize);
            c.lineTo(size + (size - armLength) * Math.cos(angle) * contentSize, size + (size - armLength) * Math.sin(angle) * contentSize);
        }

        //ticks for seconds
        for (let i = 0; i < 60; i++) {
            let angle = i * (Math.PI * 2 / 60);
            const armLength = size * 0.05;
            c.moveTo(size + size * Math.cos(angle) * contentSize, size + size * Math.sin(angle) * contentSize);
            c.lineTo(size + (size - armLength) * Math.cos(angle) * contentSize, size + (size - armLength) * Math.sin(angle) * contentSize);
        }

        //minute hand
        let angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
        let armLength = size * 0.5;
        c.moveTo(size, size);
        c.lineTo(size + armLength * Math.cos(angle), size + armLength * Math.sin(angle));

        //seconds
        angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
        armLength = size * 0.8;
        c.moveTo(size, size);
        c.lineTo(size + armLength * Math.cos(angle), size + armLength * Math.sin(angle));
        c.stroke();

}

draw(time);

