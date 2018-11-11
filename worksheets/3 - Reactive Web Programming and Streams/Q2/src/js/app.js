import {Observable,Subject, ReplaySubject, interval,from, fromEvent, of, range,  } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';


import '../css/style.css'; // Import CSS -> ADDED IN THIS STEP


window.onload = function () {
    
/*
    second == /10 %60
    minute == /10 /60 %60
    hours == /10 /60 /60 %60
    Math.floor(time / 10/60/60 % 60) + "h:" +
*/

    //setInterval(showClock, 1000);
    let trigger = false;
    let time = 0; // 1 == one 10th of a second
    let split_limit = 0;

    const digital = document.getElementById('digital_display');
    const start= document.getElementById('start');
    const stop= document.getElementById('stop');
    const split= document.getElementById('split');
    const reset= document.getElementById('reset');
    const splits_area= document.getElementById('splits_area');

    const source = interval(100 /* ms */ );
  
    
    const subscription = source.subscribe(
        x => {
        if(!trigger) return;
        time++;
        showClock(time);
        digital.innerHTML =  Math.floor(time/10/60 %60) + "min:" + Math.floor((time / 10) % 60) + "s:" + (time % 10) + "0ms";
    });
    function showClock(time_val) {

        // DEFINE CANVAS AND ITS CONTEXT.
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        
        //let date = new Date;
        let angle;
        let secHandLength = 120;

        // CLEAR EVERYTHING ON THE CANVAS. RE-DRAW NEW ELEMENTS EVERY SECOND.
        ctx.clearRect(0, 0, canvas.width, canvas.height);        

        OUTER_DIAL1();
        OUTER_DIAL2();
        CENTER_DIAL();
        MARK_THE_HOURS();
        MARK_THE_SECONDS();

        SHOW_SECONDS(time_val);
        SHOW_MINUTES(time_val);
        SHOW_HOURS(time_val);

        function OUTER_DIAL1() {
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, secHandLength + 10, 0, Math.PI * 2);
            ctx.strokeStyle = '#92949C';
            ctx.stroke();
        }
        function OUTER_DIAL2() {
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, secHandLength + 7, 0, Math.PI * 2);
            ctx.strokeStyle = '#929BAC';
            ctx.stroke();
        }
        function CENTER_DIAL() {
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, Math.PI * 2);
            ctx.lineWidth = 3;
            ctx.fillStyle = '#353535';
            ctx.strokeStyle = '#0C3D4A';
            ctx.stroke();
        }

        function MARK_THE_HOURS() {

            for (let i = 0; i < 12; i++) {
                angle = (i - 3) * (Math.PI * 2) / 12;       // THE ANGLE TO MARK.
                ctx.lineWidth = 1;            // HAND WIDTH.
                ctx.beginPath();

                let x1 = (canvas.width / 2) + Math.cos(angle) * (secHandLength);
                let y1 = (canvas.height / 2) + Math.sin(angle) * (secHandLength);
                let x2 = (canvas.width / 2) + Math.cos(angle) * (secHandLength - (secHandLength / 7));
                let y2 = (canvas.height / 2) + Math.sin(angle) * (secHandLength - (secHandLength / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = '#466B76';
                ctx.stroke();
            }
        }

        function MARK_THE_SECONDS() {

            for (let i = 0; i < 60; i++) {
                angle = (i - 3) * (Math.PI * 2) / 60;       // THE ANGLE TO MARK.
                ctx.lineWidth = 1;            // HAND WIDTH.
                ctx.beginPath();

                let x1 = (canvas.width / 2) + Math.cos(angle) * (secHandLength);
                let y1 = (canvas.height / 2) + Math.sin(angle) * (secHandLength);
                let x2 = (canvas.width / 2) + Math.cos(angle) * (secHandLength - (secHandLength / 30));
                let y2 = (canvas.height / 2) + Math.sin(angle) * (secHandLength - (secHandLength / 30));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = '#C4D1D5';
                ctx.stroke();
            }
        }

        function SHOW_SECONDS(t) {

            let sec = time / 10 / 60  ;//date.getSeconds();
            angle = ((Math.PI * 2) * (sec) ) - ((Math.PI * 2) / 4);
            ctx.lineWidth = 0.5;              // HAND WIDTH.

            ctx.beginPath();
            // START FROM CENTER OF THE CLOCK.
            ctx.moveTo(canvas.width / 2, canvas.height / 2);   
            // DRAW THE LENGTH.
            ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secHandLength),
                canvas.height / 2 + Math.sin(angle) * secHandLength);

            // DRAW THE TAIL OF THE SECONDS HAND.
            ctx.moveTo(canvas.width / 2, canvas.height / 2);    // START FROM CENTER.
            // DRAW THE LENGTH.
            ctx.lineTo((canvas.width / 2 - Math.cos(angle) * 20),
                canvas.height / 2 - Math.sin(angle) * 20);

            ctx.strokeStyle = '#586A73';        // COLOR OF THE HAND.
            ctx.stroke();
        }

        function SHOW_MINUTES(t) {

            let min = (t / 600 / 60 );//date.getMinutes();
            angle = ((Math.PI * 2) * min ) - ((Math.PI * 2) / 4);
            ctx.lineWidth = 1.5;              // HAND WIDTH.

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);  // START FROM CENTER.
            // DRAW THE LENGTH.
            ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secHandLength / 1.1),      
                canvas.height / 2 + Math.sin(angle) * secHandLength / 1.1);

            ctx.strokeStyle = '#999';  // COLOR OF THE HAND.
            ctx.stroke();
        }

        function SHOW_HOURS(t) {

            let hour = (t /10 /60 /60 %60); //date.getHours();
            let min = (t / 600 / 60 ) ;//date.getMinutes();

            angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
           
        }
    }// end of function ShowClock
    function show_split(t){
        if(trigger){
            if(split_limit<5){
                split_limit++;
                splits_area.innerHTML+="<br>" + Math.floor(time/10/60 %60) + "min:" + Math.floor((time / 10) % 60) + "s:" + (time % 10) + "0ms";
            }else if(split_limit==5){
                split_limit++;
                splits_area.innerHTML+="<br> MAXIMUM 5 SPLITS ALLOWED";
            }
        }
            
    }
    showClock(0); // Initial setup of the clock

    const start$= fromEvent(start,'click');
    const stop$= fromEvent(stop,'click');
    const split$= fromEvent(split,'click');
    const reset$= fromEvent(reset,'click');

    start$.subscribe(
    ev=>{
        trigger = true;
    },
    error=>{window.alert("Error");},
    ()=>{window.alert("Complete");}
    );
    stop$.subscribe(
    ev=>{
        trigger = false;
    },
    error=>{window.alert("Error");},
    ()=>{window.alert("Complete");}
    );
    split$.subscribe(
    ev=>{
        show_split(time);
    },
    error=>{window.alert("Error");},
    ()=>{window.alert("Complete");}
    );
    reset$.subscribe(
    ev=>{
        time=0;
        trigger = false;
        split_limit=0;
        showClock(time);
        digital.innerHTML =  Math.floor(time/10/60 %60) + "min:" + Math.floor((time / 10) % 60) + "s:" + (time % 10) + "0ms";
        splits_area.innerHTML="";
    },
    error=>{window.alert("Error");},
    ()=>{window.alert("Complete");}
    );
}

