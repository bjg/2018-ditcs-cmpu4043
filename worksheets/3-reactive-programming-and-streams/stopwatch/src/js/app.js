import {interval, fromEvent} from 'rxjs';
import '../css/style.css';


let init = false;
let time = 0;
let splitMax = 0;

const canvas = document.getElementById('canvas');
const digital = document.getElementById('digital_display');
const splitList= document.getElementById('splitList');
const source = interval(100);  /* ms */ 


const start$= fromEvent(document.getElementById('start'),'click')
    .subscribe(e => {
      init = true;
    });
const stop$= fromEvent(document.getElementById('stop'),'click')
    .subscribe(e => {
      init = false;
    });
const split$= fromEvent(document.getElementById('split'),'click')
    .subscribe(e => {
      displaySplit(time);
    });
const reset$= fromEvent(document.getElementById('reset'),'click')
    .subscribe(e => {
        init = false;
        time = 0;
        splitMax = 0;
        drawClock(time);
        digital.innerHTML = "0:0:00";
        splitList.innerHTML="";
    });



const subscribe = source.subscribe(
    x => {
    if(!init) return;
    time++;
    drawClock(time);
    digital.innerHTML =  Math.floor(time/10/60 %60) + "min:" + Math.floor((time / 10) % 60) + "s:" + (time % 10) + "0ms";
});


drawClock(0); // Initial stage

//function for drawing the clock
function drawClock(timeValue) {
    let ctx = canvas.getContext('2d');
    let angle;
    const widthSize = 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function outerCircle() {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, widthSize + 10, 0, Math.PI * 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, widthSize + 13, 0, Math.PI * 2);
        ctx.stroke();
    }

    function centreFace() {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, Math.PI * 2);
        ctx.stroke();
    }

    function hourLines() {
        for (let i = 0; i < 12; i++) {
            angle = i * (Math.PI * 2 / 12);
            const armLength = widthSize * 0.15;
            ctx.beginPath();

            let x1 = (canvas.width / 2) + Math.cos(angle) * (widthSize);
            let y1 = (canvas.height / 2) + Math.sin(angle) * (widthSize);
            let x2 = (canvas.width / 2) + Math.cos(angle) * (widthSize - (widthSize / 7));
            let y2 = (canvas.height / 2) + Math.sin(angle) * (widthSize - (widthSize / 7));

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }

    function secondLines() {
        for (let i = 0; i < 60; i++) {
            angle = i * (Math.PI * 2 / 60);
            ctx.beginPath();

            let x1 = (canvas.width / 2) + Math.cos(angle) * (widthSize);
            let y1 = (canvas.height / 2) + Math.sin(angle) * (widthSize);
            let x2 = (canvas.width / 2) + Math.cos(angle) * (widthSize - (widthSize / 30));
            let y2 = (canvas.height / 2) + Math.sin(angle) * (widthSize - (widthSize / 30));

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }

    function handOfSecs(t) {
        let sec = time / 10 / 60;
        angle = ((Math.PI * 2) * (sec) ) - ((Math.PI * 2) / 4);

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo((canvas.width / 2 + Math.cos(angle) * widthSize), canvas.height / 2 + Math.sin(angle) * widthSize);

        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo((canvas.width / 2 - Math.cos(angle) * 20), canvas.height / 2 - Math.sin(angle) * 20);
        ctx.stroke();
    }

    function handOfMins(t) {
        let min = (t / 600 / 60 );
        angle = ((Math.PI * 2) * min ) - ((Math.PI * 2) / 4);

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo((canvas.width / 2 + Math.cos(angle) * widthSize / 1.1), canvas.height / 2 + Math.sin(angle) * widthSize / 1.1);
        ctx.stroke();
    }

    outerCircle();
    centreFace();
    secondLines();
    hourLines();
    handOfSecs(timeValue);
    handOfMins(timeValue);


}// end of function drawClock

//function that appends a split to the list and limits the lists for five items
function displaySplit(t){
    if(init){
        if(splitMax<5){
            splitMax++;
            splitList.innerHTML += digital.innerHTML + "<br/>";
        }else if(splitMax==5){
            splitMax++;
            splitList.innerHTML+="5 SPLITS ALREADY RECORDED.";
        }
    }
} // end of func displaySPlit
