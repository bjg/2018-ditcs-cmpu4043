import "./style.css";
import {Observable, fromEvent, merge, interval, subscribe } from 'rxjs';
import Rx from 'rxjs/Rx';

let started = false;//false when timer off - true when on
let time = 0;
let ctx; //for drawing the clock
let source = interval(100).timeInterval();

const buttons = document.querySelectorAll("button");
const screen = document.getElementById("screen");
const where = document.getElementById("list_splits");
const canvas = document.getElementById('canvas');

const subscription = source.subscribe(
  x =>
  {
    if(!started) return;
    time++;
    draw(time);
    screen.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
  });


  const read_input = Observable.merge (
    Observable.fromEvent(buttons, 'click')
      .map(e => e.target.innerHTML)
  );


  if (canvas.getContext)
  {
    ctx = canvas.getContext('2d');
  }


function draw()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);

const watch_size = 96;
const content_size = 0.92;

// Center doc
ctx.fillStyle = "Purple";
ctx.beginPath();
ctx.arc(watch_size, watch_size, 2, 0, 2 * Math.PI, true);
ctx.fill();

ctx.strokeStyle = "HOTPINK";
ctx.font = "20px Aeriel";

ctx.beginPath();
//Shape of stop watch
ctx.arc(watch_size, watch_size, watch_size, 0, Math.PI * 2, true);
ctx.arc(watch_size, watch_size, watch_size - 2, 0, Math.PI * 2, true);

    //second marks around the Stopwatch
  for (let i = 0; i < 60; i++)
  {
    let angle = i * (Math.PI * 2 / 60);
    const armLength = watch_size * 0.05;
    ctx.moveTo(watch_size + watch_size * Math.cos(angle) * content_size, watch_size + watch_size * Math.sin(angle) * content_size);
    ctx.lineTo(watch_size + (watch_size - armLength) * Math.cos(angle) * content_size, watch_size + (watch_size - armLength) * Math.sin(angle) * content_size);
  }
ctx.textAlign="start";
ctx.fillText("60",85,20);
ctx.fillText("5",130,30);
ctx.fillText("10",155,60);
ctx.fillText("15",165,100);
ctx.fillText("20",160,135);
ctx.fillText("25",135,165);
ctx.fillText("30",90,185);
ctx.fillText("35",50 ,175);
ctx.fillText("40",20,145);
ctx.fillText("45",10,100);
ctx.fillText("50",20,60);
ctx.fillText("55",50,30);
ctx.textAlign="end";


// Minutes hand
let arm_angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
let arm_length = watch_size * 0.5;
ctx.moveTo(watch_size, watch_size);
ctx.lineTo(watch_size + arm_length * Math.cos(arm_angle), watch_size + arm_length * Math.sin(arm_angle));

//seconds hand
arm_angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
arm_length = watch_size * 0.8;
ctx.moveTo(watch_size, watch_size);
ctx.lineTo(watch_size + arm_length * Math.cos(arm_angle), watch_size + arm_length * Math.sin(arm_angle));
ctx.stroke();
}

read_input.subscribe(e => {
  if(e == "Start")
  {
    started = true;
  }
  else if(e == "Stop")
  {
    started = false;
  }
  else if(e == "Reset")
  {
    time = 0;
    started = false;
    screen.innerHTML = "00:00:00";
    where.innerHTML =  " ";
    draw(time);

  }
  else
  {
    if(e == "Split" && started == true)
    {
      let item = document.createElement("li");
      let text1 = document.createTextNode(screen.innerHTML);
      item.appendChild(text1);
      where.appendChild(item);
    }
  }

}




);
draw();
