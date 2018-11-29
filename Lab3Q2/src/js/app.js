import {Observable, interval, fromEvent} from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import '../css/style.css';


window.onload = function () {
    
	// global variables
    let trigger = false;
    let time = 0;
    let limit = 0;
	let max = 14;
	
	// getting the id from html
    const timer = document.getElementById('timer_display');
	const split_display = document.getElementById('split_display');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const split = document.getElementById('split');
    const reset = document.getElementById('reset');
 

    const source = interval(100);
  
    
    const subscription = source.subscribe(
        x => {
        if(!trigger) return;
        time++;
        clock(time);
        timer.innerHTML =  Math.floor(time/10/60 %60) + "m:" + Math.floor((time / 10) % 60) + "s:" + (time % 10) + "0ms";
    });
	
    function clock(time_val) {

        // definition area
        let canvas = document.getElementById('canvas');
        let con = canvas.getContext('2d');       
		let secHandLength = 60;
        let ang;

        con.clearRect(0, 0, canvas.width, canvas.height);
		// clearing and redrawing the elements

		
		// call function area
        outsideCircle();
        centerPoint();
        hourMarks();
        secondsMarks();
        secondsHand(time_val);
        minutesHand(time_val);

		
		
        function outsideCircle() {
            con.beginPath();
            con.arc(canvas.width / 2, canvas.height / 2, secHandLength + 10, 0, Math.PI * 2);
            con.strokeStyle = '#000';
            con.stroke();
        }
		
		
        function centerPoint() {
            con.beginPath();
            con.arc(canvas.width / 2, canvas.height / 2, 2, 0, Math.PI * 2);
            con.lineWidth = 3;
            con.fillStyle = '#444444';
            con.strokeStyle = '#000000';
            con.stroke();
        }

		
        function hourMarks() {

            for (let i = 0; i < 12; i++) {
                ang = (i - 3) * (Math.PI * 2) / 12;
				// getting the angles
                con.lineWidth = 1;
                con.beginPath();

                let x1 = (canvas.width / 2) + Math.cos(ang) * (secHandLength);
                let y1 = (canvas.height / 2) + Math.sin(ang) * (secHandLength);
                let x2 = (canvas.width / 2) + Math.cos(ang) * (secHandLength - (secHandLength / 7));
                let y2 = (canvas.height / 2) + Math.sin(ang) * (secHandLength - (secHandLength / 7));

                con.moveTo(x1, y1);
                con.lineTo(x2, y2);

                con.strokeStyle = '#111';
                con.stroke();
            }
        }

		
        function secondsMarks() {

            for (let i = 0; i < 60; i++) {
                ang = (i - 3) * (Math.PI * 2) / 60;
				// getting the angles
                con.lineWidth = 1;
                con.beginPath();

                let x1 = (canvas.width / 2) + Math.cos(ang) * (secHandLength);
                let y1 = (canvas.height / 2) + Math.sin(ang) * (secHandLength);
                let x2 = (canvas.width / 2) + Math.cos(ang) * (secHandLength - (secHandLength / 30));
                let y2 = (canvas.height / 2) + Math.sin(ang) * (secHandLength - (secHandLength / 30));

                con.moveTo(x1, y1);
                con.lineTo(x2, y2);

                con.strokeStyle = '#111';
                con.stroke();
            }
        }

		
        function secondsHand(t) {

            let sec = time / 10 / 60;
            ang = ((Math.PI * 2) * (sec) ) - ((Math.PI * 2) / 4);
            con.lineWidth = 0.8;

            con.beginPath();
            con.moveTo(canvas.width / 2, canvas.height / 2);   
            // transposing to the center
			
            con.lineTo((canvas.width / 2 + Math.cos(ang) * secHandLength),
                canvas.height / 2 + Math.sin(ang) * secHandLength);
			// length of hand
			

            con.strokeStyle = '#222';
            con.stroke();
        }

		
        function minutesHand(t) {

            let min = (t / 600 / 60 );
            ang = ((Math.PI * 2) * min ) - ((Math.PI * 2) / 4);
            con.lineWidth = 1.5;

            con.beginPath();
            con.moveTo(canvas.width / 2, canvas.height / 2);
			// transposing to the center
 
            con.lineTo((canvas.width / 2 + Math.cos(ang) * secHandLength / 0.5),      
                canvas.height / 2 + Math.sin(ang) * secHandLength / 1.1);
			// length of hand

				
            con.strokeStyle = '#555';  // COLOR OF THE HAND.
            con.stroke();
        }


    }
	// end of function ShowClock
	
	
    function splitRecords(t){
        if(trigger){
            if(limit<max){
                limit++;
                split_display.innerHTML+="<br>" + Math.floor(time/10/60 %60) + "m:" + Math.floor((time / 10) % 60) + "s:" + (time % 10) + "0ms";
            }else if(limit==max){
                limit++;
            }
        }
            
    }
	
    clock(0); 
	// Initial set-up of the clock

	
	// event declaration area
    const start$= fromEvent(start,'click');
    const stop$= fromEvent(stop,'click');
    const split$= fromEvent(split,'click');
    const reset$= fromEvent(reset,'click');

	
	
	// subscribe/event area
    start$.subscribe(
    ev=>{
        trigger = true;
		}
    );
	
	
    stop$.subscribe(
    ev=>{
        trigger = false;
		}
    );
	
	
    split$.subscribe(
    ev=>{
        splitRecords(time);
		}
    );
	
	
    reset$.subscribe(
    ev=>{
        time=0;
        trigger = false;
        limit=0;
        clock(time);
        timer.innerHTML =  Math.floor(time/10/60 %60) + "m:" + Math.floor((time / 10) % 60) + "s:" + (time % 10) + "0ms";
        split_display.innerHTML="";
		}
    );
}

