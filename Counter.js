//Stopwatch with RxJS

import { Observable, Rx, fromEvent, interval, subscribe } from 'rxjs/Rx';
import 'Counter.css';

const canvas = document.getElementById('canvas');
const digital = document.getElementById('digital');
const splitting = document.getElementById('splits');

const source = Rx.Observable
    .interval(100)
    .timeInterval();

let init = false;
let time = 0;

const subscription = source.subscribe(
    x => {

        if(!init) return;
        time++;
        drawTime(time);
        digital.innerHTML = Math.floor(time/600) + ':' + Math.floor((time/10) % 60) + ':' + (time%10) + '0';
    });

Rx.Observable.fromEvent(document.getElementById('start'), 'click')
    .subscribe(ev => {
        console.log('start clicked!');
        init = true;
    });

Rx.Observable.fromEvent(document.getElementById('stop'), 'click')
    .subscribe(ev => {
        console.log('stop clicked!');
        init = false;
    });

Rx.Observable.fromEvent(document.getElementById('split'), 'click')
    .subscribe(ev => {
        console.log('SPLIT');
        splitting.innerHTML += digital.innerHTML + '<br>';
    });

Rx.Observable.fromEvent(document.getElementById('reset'), 'click')
    .subscribe(ev => {
        console.log('reset');
        init = false;
        time = 0;
        drawTime(time);
        digital.innerHTML = '0:0:00';
        splitting.innerHTML = "";
    });

const drawTime = (time) => {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        const timeSize = 100;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(timeSize, timeSize, 2, 0, 2 * Math.PI, true);

        ctx.beginPath();

        ctx.arc(timeSize, timeSize, timeSize, 0, Math.PI * 2, true);
        ctx.arc(timeSize, timeSize, timeSize - 2, 0, Math.PI * 2, true);


        for (let i = 0; i < 12; i++) {
            let angle = i * (Math.PI * 2 / 12);
            const handLength = timeSize * 0.15;
            ctx.moveTo(timeSize + timeSize * Math.cos(angle) * 0.96, timeSize + timeSize * Math.sin(angle) * 0.96);
            ctx.lineTo(timeSize + (timeSize - handLength) * Math.cos(angle) * 0.96, timeSize + (timeSize - handLength) * Math.sin(angle) * 0.96);
        }

        // shorter lines
        for (let i = 0; i < 60; i++) {
            let angle = i * (Math.PI * 2 / 60);
            const handLength = timeSize * 0.05;

            ctx.moveTo(timeSize + timeSize * Math.cos(angle) * 0.96, timeSize + timeSize * Math.sin(angle) * 0.96);
            ctx.lineTo(timeSize + (timeSize - handLength) * Math.cos(angle) * timeSize, timeSize + (timeSize - handLength) * Math.sin(angle) * 0.96);
        }

        let angle = (time/600/60 - 0.25) * (Math.PI * 2);
        let handLength = timeSize * 0.5;
        ctx.moveTo(timeSize, timeSize);
        ctx.lineTo(timeSize + handLength * Math.cos(angle), timeSize + handLength * Math.sin(angle));

        angle = (time/10/60 - 0.25) * (Math.PI * 2);
        handLength = timeSize * 0.8;
        ctx.moveTo(timeSize, timeSize);
        ctx.lineTo(timeSize + handLength * Math.cos(angle), timeSize + handLength * Math.sin(angle));

        ctx.stroke();
    }
}

drawTime(time);
export default Counter;

