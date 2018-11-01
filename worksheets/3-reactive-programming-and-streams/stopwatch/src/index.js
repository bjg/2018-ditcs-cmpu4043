import "./styles/styles.css";
import { Observable, of } from 'rxjs/Rx';

document.addEventListener("DOMContentLoaded", init, false);
let time = 0;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ctx2 = canvas.getContext("2d");

var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;


function init(){
    processInput();
    renderClockOutline();
    //Draw the hand at noon
    drawHand(0, radius*0.9, radius*0.01);
}

function drawEntireClock(){
    drawClockFace();
    //10ths of seconds
    drawHand(time*Math.PI/300, radius*0.9, radius*0.01);
    //Minutes
    drawHand(time*Math.PI/60000, radius*0.9, radius*0.02);
}

function drawClockFace(){
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill()
}
function renderClockOutline(){

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  
}

function drawHand(pos, length, width){

    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle="black";
    ctx.stroke();
    ctx.rotate(-pos); 
}

function drawSplitHand(pos,length,width){
    //Will be covered by redrawing clock face
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle="red";
    ctx.stroke();
    ctx.rotate(-pos); 
}

function drawClockReset(){
    drawClockFace();
    drawHand(0,radius*0.9, radius*0.01);
}




function processInput(){
    let running = false;
    //let time = 0;
    let splitsArray = [];

    function formatMilliseconds(t){
        return Math.floor(t / 600) + ":" + Math.floor((t / 10) % 60) + ":" + (t % 10) + "0";
    }

    const timeSource = Observable.interval(100).timeInterval();
    const clockSource = Observable.interval(1000).timeInterval();

    const sub = timeSource.subscribe(
        function(x){ 
            let display = document.getElementById("display");
            if(running == false){
                return;
            }
            time++;
            display.innerHTML = formatMilliseconds(time);
            
            
        }
    )

    const clockSub = clockSource.subscribe(
        function(x){ 
            if(running == false){
                return;
            }
            drawEntireClock();
        }

    )

    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const resetButton = document.getElementById("resetButton");
    const splitButton = document.getElementById("splitButton");


    const buttons$ = Observable.merge(
        Observable.fromEvent(startButton,'click'),
        Observable.fromEvent(stopButton,'click'),
        Observable.fromEvent(resetButton,'click'),
        Observable.fromEvent(splitButton,'click')

    )

    buttons$.subscribe(ev =>{
        console.log(ev.target.textContent);
        if(ev.target.textContent == "Start"){
            running = true;
        }
        if(ev.target.textContent == "Stop"){
            running = false;
        }
        if(ev.target.textContent == "Split"){
            let splits = document.getElementById("splits");
            if(splitsArray.length < 5){
                splitsArray.push(formatMilliseconds(time));
                splits.innerHTML += formatMilliseconds(time) + "\n";
                drawSplitHand(time*Math.PI/300, radius*0.9, radius*0.01);
            }else{
                console.log("Split full");
                document.getElementById("splitH3").innerHTML = "Splits Full!!";
            }
    
        }
        if(ev.target.textContent == "Reset"){
            let display = document.getElementById("display");
            let splits = document.getElementById("splits");
            document.getElementById("splitH3").innerHTML = "Splits:";

            //reset clock
            drawClockReset();
            
            running = false;
            time = 0;
            splitsArray = [];
            splits.innerHTML = " ";
            display.innerHTML = " ";

        }
    } )

}
