let canvas;
let canvas2d;
const tick_movement = (2 * Math.PI) / 60;
const resting_pos = (1.5 * Math.PI);
let circleCenteX;
let circleCentreY;
let radius = 100;
let time;
let subscription;

window.onload = function(){
    canvas = document.getElementById("stopwatch");
    canvas.width = "500";
    canvas.height= "500";
    canvas2d = canvas.getContext("2d");
    circleCenteX = canvas.width / 2;
    circleCentreY = canvas.height / 2;
    draw(0);
}

function drawSecondHand(ticks){
    canvas2d.beginPath();
    canvas2d.strokeStyle = 'red';
    canvas2d.lineWidth = 1;
    canvas2d.moveTo(circleCenteX,circleCentreY);
    canvas2d.lineTo(circleCenteX + ((radius - 5) * Math.cos(resting_pos + tick_movement * ticks)),
                    circleCentreY + ((radius - 5) * Math.sin(resting_pos+ tick_movement * ticks)));
    canvas2d.stroke();
}

function drawMinuteHand(minutes){
    canvas2d.beginPath();
    canvas2d.strokeStyle = 'red';
    canvas2d.lineWidth = 2;
    canvas2d.moveTo(circleCenteX,circleCentreY);
    canvas2d.lineTo(circleCenteX + ((radius-30) * Math.cos(resting_pos + tick_movement * minutes)),
                    circleCentreY + ((radius-30) * Math.sin(resting_pos+ tick_movement * minutes)));
    canvas2d.stroke();
}

function draw(ticks){
    canvas2d.clearRect( 0, 0, canvas.width, canvas.height);
    drawClock();
    drawSecondHand(Math.floor(ticks/10));
    drawMinuteHand(Math.floor(ticks/600));
    digitalTime(ticks);
}

function drawClock(){
    canvas2d.strokeStyle = 'black';
    canvas2d.beginPath();
    canvas2d.lineWidth = 5;
    canvas2d.arc(circleCenteX,circleCentreY,radius,0,2*Math.PI);
    canvas2d.stroke();

    canvas2d.lineWidth = 1;
    for(let i = 0; i < 12; i++){
        canvas2d.beginPath();
        canvas2d.moveTo(circleCenteX + ((radius-10) * Math.cos(resting_pos + ((2*Math.PI/12) * i))),
                        circleCentreY + ((radius-10) * Math.sin(resting_pos + ((2*Math.PI/12) * i))));
        canvas2d.lineTo(circleCenteX + (radius * Math.cos(resting_pos + ((2*Math.PI/12) * i))),
                        circleCentreY + (radius * Math.sin(resting_pos + ((2*Math.PI/12) * i))));
        canvas2d.stroke();
    }
}

function digitalTime(ticks){
    let div = document.getElementById("digital");
    let minutes = Math.floor(ticks / 600);
    let seconds = Math.floor(ticks / 10 % 60);
    let millis = ticks % 10;
    
    let digitalTime = minutes + ":" + (seconds < 10 ? "0": "") + seconds + ":" + millis;
    div.innerHTML = digitalTime;
}

function start(){
    if(time == null){
        time = Rx.Observable.interval(100);
        subscription = time.subscribe(t => draw(t));
    }
}

function stop(){
    if(subscription != null) subscription.dispose();
    time = null;
    draw(0);
}

function reset(){
    if(time != null){
        if(subscription != null) subscription.dispose();
        time = Rx.Observable.interval(100);
        subscription = time.subscribe(t => draw(t));
    }
    
    document.getElementById("splits").innerHTML = "";
}

function split(){
    let div = document.createElement("div");
    div.innerHTML = document.getElementById("digital").innerHTML;
    document.getElementById("splits").appendChild(div);
}