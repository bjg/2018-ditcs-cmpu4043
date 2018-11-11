import * as Observable from "rxjs";
import "./style.css";

function Stopwatch() {
    const stopwatch = createCanvas();
    const startBtn = Button("Start");
    const stopBtn = Button("Stop");
    const splitBtn = Button("Split");
    const resetBtn = Button("Reset");
    const display = timerDisplay();
    const split = splitDiv();
    const container = document.createElement("div");
    for (let component of [stopwatch, display, startBtn, stopBtn, splitBtn, resetBtn, split]) {
        container.appendChild(component);
    }
    run(startBtn, stopBtn, splitBtn, resetBtn);
    container.classList.add("container");
    return container;
}

function run(startBtn, stopBtn, splitBtn, resetBtn)  {
    let s;
    let time;
    const clickStartBtn = Observable.fromEvent(startBtn, 'click');
    clickStartBtn.subscribe(() => {
        if(time===undefined)
        {
            s=startTimer(0,0,0);
        }
        else {

            s=startTimer(parseInt(time["0"], 10),parseInt(time["1"], 10),parseInt(time["2"], 10));
        }
    });

    const clickStopBtn = Observable.fromEvent(stopBtn, 'click');
    clickStopBtn.subscribe(() => {
        s.unsubscribe();
        time=getTime();
    });

    const clickSplitBtn = Observable.fromEvent(splitBtn, 'click');
    clickSplitBtn.subscribe(() => {
        timerSplit();
    });

    const clickResetBtn = Observable.fromEvent(resetBtn, 'click');
    clickResetBtn.subscribe(() => {
        s.unsubscribe();
        time=undefined;
        reset();
    });

}
function startTimer(minute,second,millisecond) {

    let timing = Observable
        .interval(100);

    //Calculate minutes and seconds from milliseconds
    return timing.subscribe(
        function () {
            millisecond += 1;
            if (millisecond === 10) {
                second += 1;
                millisecond = 0;
            }
            if (second === 60) {
                minute += 1;
                second = 0;
            }
            document.getElementById('timer').innerHTML = "<h1>" + minute + ":" + second + "." + millisecond + "</h1>";
            drawWatch(second, minute);
        });
}
//Get the current time from the timer element in the document
function getTime() {
    let time=document.getElementById('timer').innerHTML.replace("<h1>", "").replace("</h1>", "");
    time.toString();
    return time.split(":").join(",").split(".").join(",").split(",");
}
//Reset the timer and splits, redraw watch
function reset() {
    document.getElementById("timer").innerHTML="<h1>"+ "0:0.0" + "</h1>";
    document.getElementById("split").innerHTML="";
    drawWatch(0,0);
}

function timerSplit() {
   let split = document.getElementById('timer').innerHTML.replace('<h1>'||'</h1>','');
   document.getElementById("split").innerHTML+= "Split: " + split +"<BR>";
}

function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "stopwatch";
    canvas.height = 300;
    canvas.width = 300;
    drawWatch(0,0,canvas);
    return canvas;
}

function drawWatch(second,minute,canvas) {
    if(canvas===undefined)
    {
        canvas = document.getElementById("stopwatch")
    }
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let width = 2;
    let height = 12;

    //ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
    //Draw the outside of the stopwatch
    ctx.beginPath();
    ctx.arc(150, 150, 125, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(150, 150, 128, 0, 2 * Math.PI);
    ctx.stroke();

    //Draw the 'seconds' hand based on the passed down seconds variable.
    ctx.save();
    ctx.beginPath();
    let ang = second;
    ctx.translate(150.5, 150.5);
    ctx.rotate((ang * 6 * Math.PI/180));
    ctx.rect(-1/2, 0, 1, -120);
    ctx.fillStyle="grey";
    ctx.fill();
    ctx.restore();

    //Draw the 'minute' hand based on the passed down seconds variable.
    ctx.save();
    ctx.beginPath();
    let ang2 = minute;
    ctx.translate(150.5, 150.5);
    ctx.rotate((ang2 * 6 * Math.PI/180));
    ctx.rect(-1/2, 0, 1, -100);
    ctx.fillStyle="black";
    ctx.fill();
    ctx.restore();

    //Draw the second denominations
    for(let i = 0; i < 60; i++){
        ctx.save();
        ctx.beginPath();
        let ang = i * ((Math.PI * 2) / 60);
        let x = Math.cos(ang) * 115 + 150;
        let y = Math.sin(ang) * 115 + 144;
        ctx.translate(x + width/2, y + height/2 );
        ctx.rotate((i * 360/60 * Math.PI/180) + (90 * Math.PI/180));
        ctx.rect(-width/2, -height/2, width-1, height-6);
        ctx.fillStyle="grey";
        ctx.fill();
        ctx.restore();
    }

    //Draw the minute denominations
    for(let i = 0; i < 12; i++){
        ctx.save();
        ctx.beginPath();
        let ang = i * ((Math.PI * 2) / 12);
        let x = Math.cos(ang) * 115 + 150;
        let y = Math.sin(ang) * 115 + 144;
        ctx.translate(x + width/2, y + height/2);
        ctx.rotate((i * 360/12 * Math.PI/180) + (90 * Math.PI/180));
        ctx.rect(-width/2, -height/2, width, height);
        ctx.fillStyle="black";
        ctx.fill();
        ctx.restore();
    }
    ctx.rect(148, 148, 5, 5);
    ctx.fillStyle="black";
    ctx.fill();
    return canvas;
}

function timerDisplay() {
    const display = document.createElement("div");
    display.id = "timer";
    display.innerHTML="<h1>"+ "0:0.0" + "</h1>";
    return display;
}

function Button(label) {
    const button = document.createElement("button");
    button.innerText = label;
    return button;
}

function splitDiv() {
    const div = document.createElement("div");
    div.id = "split";
    return div;
}

export default Stopwatch;
