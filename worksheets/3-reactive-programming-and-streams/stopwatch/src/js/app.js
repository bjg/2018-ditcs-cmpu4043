import Rx from 'rxjs/Rx'; // import library rx

// this document coinsder from html for canvas , timer, spilt_num 
const canvas = document.getElementById('canvas');
const timer = document.getElementById('timer');
const split_num = document.getElementById('spilt_num');

const source = Rx.Observable
  .interval(100)
  .timeInterval();

let start = false;
let time = 0; 

const x = source.subscribe(
  x => {
    if(!start) return;
    time++;
    draw(time);
    timer.innerHTML = Math.floor(time / 600) + ":" + Math.floor((time / 10) % 60) + ":" + (time % 10) + "0";
  });

//start count 
Rx.Observable.fromEvent(document.getElementById('start'), 'click')
  .subscribe(i => {
    start = true;
  });
  
//stop count
Rx.Observable.fromEvent(document.getElementById('stop'), 'click')
  .subscribe(i => {
    start = false;
  });

//click count split num
Rx.Observable.fromEvent(document.getElementById('split'), 'click')
  .subscribe(i => {
    split_num.innerHTML += timer.innerHTML + "<br/>";
  });

//click to reset again
Rx.Observable.fromEvent(document.getElementById('reset'), 'click')
  .subscribe(i => {
    start = false;
    time = 0;
    draw(time);
    timer.innerHTML = "0:0:00";
    split_num.innerHTML = "";
  });

// will draw with timer
const draw = (time) => {
  if (canvas.getContext) {
    const n = canvas.getContext('2d');

    n.clearRect(0, 0, canvas.width, canvas.height);

    const watch = 100;
    const content = 0.92;
    n.beginPath();
    n.arc(watch, watch, 4, 0, 4 * Math.PI, true);
    n.fill();
    n.beginPath();

    n.arc(watch, watch, watch, 0, Math.PI * 2, true);
    n.arc(watch, watch, watch - 2, 0, Math.PI * 2, true);

    for (let i = 0; i < 12; i++) {
      let corner = i * (Math.PI * 2 / 12);
      const Length = watch * 0.15;
      n.moveTo(watch + watch * Math.cos(corner) * content, watch + watch * Math.sin(corner) * content);
      n.lineTo(watch + (watch - Length) * Math.cos(corner) * content, watch + (watch - Length) * Math.sin(corner) * content);
    }

    for (let i = 0; i < 60; i++) {
      let corner = i * (Math.PI * 2 / 60);
      const Length = watch * 0.05;
      n.moveTo(watch + watch * Math.cos(corner) * content, watch + watch * Math.sin(corner) * content);
      n.lineTo(watch + (watch - Length) * Math.cos(corner) * content, watch + (watch - Length) * Math.sin(corner) * content);
    }

    let corner = (time / 600 / 60 - 0.25) * (Math.PI * 2);
    let Length = watch * 0.5;
    n.moveTo(watch, watch);
    n.lineTo(watch + Length * Math.cos(corner), watch + Length * Math.sin(corner));

    corner = (time / 10 / 60 - 0.25) * (Math.PI * 2);
    Length = watch * 0.8;
    n.moveTo(watch, watch);
    n.lineTo(watch + Length * Math.cos(corner), watch + Length * Math.sin(corner));

    n.stroke();
  }
}

draw(); // dispaly 

