import {Observable} from 'rxjs/Rx';

let canvas = document.querySelector('canvas');
let header = document.querySelector('#heading');
header.style.height = "36px";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (parseFloat(header.style.height)+50); 

/** ###################################    WATCH FACE LOGIC ################################################*/
let context = canvas.getContext('2d');
var watch_face_x = canvas.width /2;
var watch_face_y = canvas.height / 2;
const radius = 200;
const start_angle = 0;
const end_angle = 2 * Math.PI;
const counter_clockwise = false;

//starting at top center of watch face perimeter, roataes about an angle for a given number of iterations, increasing the size of the angle by a factor of iteration index, for every iteration, drawing the interval lines at their appropriate positions and angles relative to the center of the watch face
function watch_face_intervals(angle_of_rotation, num_iterations, line_length, line_width, colour, center_x, center_y) {
    context.translate(center_x, center_y);
    for(let i= 1; i <= num_iterations; i++){
        let angle = i * angle_of_rotation;
        let x1 = Math.cos(angle);
        let y1 = Math.sin(angle);
        context.rotate(angle);
        context.translate(0, -radius*0.85);
        context.beginPath();
        context.moveTo(x1,y1-line_length);
        context.lineTo(x1,y1+line_length/2);
        context.lineWidth = line_width;
        context.strokeStyle = colour;
        context.stroke();
        context.translate(0, radius*0.85);
        context.rotate(-angle);
    }
    context.translate(-center_x,-center_y);
}//end watch_face_intervals()

//draws a circular perimeter for a given radius and draws interval markers for minutes, seconds and half seconds
function watch_face(x,y,radius,start_angle,end_angle,counter_clockwise) {
    context.beginPath();
    context.arc(x, y, radius, start_angle, end_angle, counter_clockwise);
    context.lineWidth = 10;
    context.strokeStyle = 'black';
    context.stroke();  
    watch_face_intervals(Math.PI / 60, 120, 6, 1, 'red', x, y); //half second
    watch_face_intervals(Math.PI / 30, 60, 10, 3, 'black', x, y); //second
    watch_face_intervals(Math.PI / 6, 12, 20, 5, 'black', x, y); //minute
}
//draw the watch face
watch_face(watch_face_x, watch_face_y, radius, start_angle, end_angle, counter_clockwise);


/**#####################################################  BUTTONS AND DIGITAL DISPLAY LOGIC ########################################## */
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const split = document.querySelector('#split');
const reset = document.querySelector('#reset');
let mins = 0;
let seconds = 0;
let tenths = 0;
var frame;

const tick = (value, max) => (value+1) % max;

const digital_watch = () => {
    let mins_text = mins < 10 ? "0"+mins.toString() : mins.toString();
    let secs_text = seconds < 10 ? "0"+seconds.toString() : seconds.toString();
    let tnth_text = tenths < 10 ? "0"+tenths.toString() : tenths.toString();
    let digital_watch_x = 50;
    let digital_watch_y = 300;
    let watch_val = mins_text+":"+secs_text+":"+tnth_text;
    context.font = '80px serif';
    context.strokeStyle = 'red';
    context.strokeText(watch_val, digital_watch_x, digital_watch_y, 1000, 1000);
}

digital_watch();

const animate_watch = () => {
    frame = window.requestAnimationFrame(animate_watch);
    context.clearRect(0, 0, canvas.width, canvas.height);
    mins = tick(mins, 60);
    digital_watch();
    watch_face(watch_face_x, watch_face_y, radius, start_angle, end_angle, counter_clockwise);
    
}

const stop_watch = () => {
    window.cancelAnimationFrame(frame);
    return;
}

const reset_watch = () => {
    mins = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    digital_watch();
    watch_face(watch_face_x, watch_face_y, radius, start_angle, end_angle, counter_clockwise);
}

let start$ = Observable.fromEvent(start, 'click').mapTo(animate_watch);
let stop$ = Observable.fromEvent(stop, 'click').mapTo(stop_watch);
let reset$ = Observable.fromEvent(reset, 'click').mapTo(reset_watch);

start$.subscribe();
stop$.subscribe();
reset$.subscribe();


