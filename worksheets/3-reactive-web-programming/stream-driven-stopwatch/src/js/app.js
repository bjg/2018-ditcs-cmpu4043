import {Observable as Observe} from 'rxjs/Rx';
import '../css/style.css';

const canvas = document.getElementById('canvas');
const digital = document.getElementById('digital');
const splits = document.getElementById('splits');
let begin = false;
let t = 0;

const timer$ = Observe.interval(100).timeInterval();

const sub$ = timer$.subscribe(x => {
    if(!begin) return;
    t++;
    render(t);
    digital.innerHTML = Math.floor(t / 600) + ":" + Math.floor((t / 10) % 60) + ":" + (t % 10) + "0";
});

Observe.fromEvent(document.getElementById('start'), 'click').subscribe(e => {begin = true;});

Observe.fromEvent(document.getElementById('stop'), 'click').subscribe(e => {begin = false;});

Observe.fromEvent(document.getElementById('split'), 'click').subscribe(e => {
    splits.innerHTML += digital.innerHTML + "<br/>";
    splits.style.cssText = 'border: solid 1px green;';
});

Observe.fromEvent(document.getElementById('reset'), 'click').subscribe(e => {
    begin = false;
    t = 0;
    render(0);
    digital.innerHTML = "0:0:00";
    splits.innerHTML = "";
    splits.style.cssText = 'border: none;';
});

const render = (t) => {
    
    if (canvas.getContext) {
        
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        const watchSize = 96;
        const contentSize = 0.92;

        context.fillStyle = "#13414E";
        context.beginPath();
        context.arc(watchSize, watchSize, 2, 0, 2 * Math.PI, true);
        context.fill();


        context.strokeStyle = "Green";
        context.beginPath();

        context.arc(watchSize, watchSize, watchSize, 0, Math.PI * 2, true);
        context.arc(watchSize, watchSize, watchSize - 2, 0, Math.PI * 2, true);

        for (let i = 0; i < 12; i++) {
            let angle = i * (Math.PI * 2 / 12);
            const armLength = watchSize * 0.15;
            context.moveTo(watchSize + watchSize * Math.cos(angle) * contentSize, watchSize + watchSize * Math.sin(angle) * contentSize);
            context.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * contentSize, watchSize + (watchSize - armLength) * Math.sin(angle) * contentSize);
        }

        // Minute hand
        let angle = (t / 600 / 60 - 0.25) * (Math.PI * 2);
        let armLength = watchSize * 0.5;
        context.moveTo(watchSize, watchSize);
        context.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

        // Seconds hand
        angle = (t / 10 / 60 - 0.25) * (Math.PI * 2);
        armLength = watchSize * 0.8;
        context.moveTo(watchSize, watchSize);
        context.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));
        
        for (let i = 0; i < 60; i++) {
            let angle = i * (Math.PI * 2 / 60);
            const armLength = watchSize * 0.05;
            context.moveTo(watchSize + watchSize * Math.cos(angle) * contentSize, watchSize + watchSize * Math.sin(angle) * contentSize);
            context.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * contentSize, watchSize + (watchSize - armLength) * Math.sin(angle) * contentSize);
        }


        context.stroke();
    }
    
}

render();