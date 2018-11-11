import "./style.css";

import { Observable } from 'rxjs/Rx';

const canvas = document.querySelector('canvas');
const list = document.getElementById('list');
const buttons = document.getElementsByClassName('button')

canvas.width = window.innerWidth /2
canvas.height = window.innerHeight /2

const ctx = canvas.getContext('2d');

let centerX = canvas.width /2
let centerY = canvas.height /2

let started = false;
let time = 0;

const observer = {
  next: (tenthOfSecond) => {
    if(!started) return;
    time++;
    runClock(time);
  }
}

const eventObserver = {
  next: (id) => {
    console.log(id)
    switch(id){
      case 'start':
        started = true
        break;
      case 'stop':
        started = false
        break;
      case 'split':
        let splitTime = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0" + "<br/>"
        list.innerHTML += `<div class="split_item">
                                ${splitTime}    
                                </div>
                                <hr>`
        break;
      case 'reset':
        started = false;
        time = 0;
        runClock(time);
        list.innerHTML = "";
        break;
    }
  }
}

const runClock = (time) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const size = 100;

  ctx.beginPath();
  ctx.arc(centerX, centerY , size -5 , 0, Math.PI * 2);

  ctx.lineWidth = .25;

  // 12 longer lines
  Observable.range(0, 12)
              .subscribe({
                next: (val) => {
                  drawTicks(30, 15, val, size)
              }})

  Observable.range(0, 60)
              .subscribe({
                next: (val) => {
                  drawTicks(6, 5, val, size)
                }
              })
  
  // second
  let angle = time / 10 * 6;
  let handLength = size * 0.8;
  drawHand(handLength, angle)

  // minute
  angle = time / 60 / 10 * 6;
  handLength = size * 0.6;
  drawHand(handLength, angle)

  // hour
  angle = time / 10 / 60 / 60 * 30;
  handLength = size * 0.4;
  drawHand(handLength, angle)
  
  let digitalClock = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
  if(digitalClock.includes('NaN')){
      digitalClock = '0:0:00'
  }
  
  ctx.beginPath();
  ctx.fillText(digitalClock, centerX - centerX/12, centerY + centerY/ 12)
  ctx.fillText('Rolex', centerX - centerX/12, centerY + centerY/ 5)

}

const drawTicks = (degreePerTick, length, i, size) => {
  ctx.save()
  ctx.translate(centerX, centerY);
  let angle = degree_to_rad(i*degreePerTick)
  ctx.rotate(angle);
  ctx.translate(0, size/2 * 1.85);
  
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.restore();
}

const drawHand = (length, angle) => {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(degree_to_rad(-180)); 
  ctx.rotate(degree_to_rad(angle)); 
  ctx.moveTo(0, 0); 
  ctx.lineTo(0, length);
  ctx.stroke();
  ctx.restore(); 
}

const degree_to_rad = (degree) => {
	var factor = Math.PI/180;
	return degree*factor;
}


const source = Observable
  .interval(100)

const subscription = source.subscribe(observer);

Observable.fromEvent(buttons, 'click')
            .map((event) => event.target.id)
            .subscribe(eventObserver)
    
runClock();
