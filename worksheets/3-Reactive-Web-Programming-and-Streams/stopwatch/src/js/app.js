import {Observable} from 'rxjs/Rx';
import digitalClockFont from '../assets/digital-7.ttf';

let canvas = document.querySelector('canvas');
let header = document.querySelector('#heading');
header.style.height = "36px";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (parseFloat(header.style.height)+50); 

/** ###################################    WATCH FACE LOGIC ################################################*/
let context = canvas.getContext('2d');
var analogue_display_x = canvas.width /2;
var analogue_display_y = canvas.height / 2;
const radius = 200;
const start_angle = 0;
const end_angle = 2 * Math.PI;
const counter_clockwise = false;

function analogue_display_hand(x1, y1, angle, length, width, colour) {
    let x2 = Math.cos(angle);
    let y2 = Math.sin(angle); 
    context.translate(x1, y1);
    context.rotate(angle);
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(x2, y2-length);
    context.line_width = width;
    context.strokeStyle = colour;
    context.stroke();
    context.rotate(-angle);
    context.translate(-x1, -y1);
}

//starting at top center of watch face perimeter, roataes about an angle for a given number of iterations, increasing the size of the angle by a factor of iteration index, for every iteration, drawing the interval lines at their appropriate positions and angles relative to the center of the watch face
function analogue_display_intervals(angle_of_rotation, num_iterations, line_length, line_width, colour, center_x, center_y) {
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
}//end analogue_display_intervals()

//draws a circular perimeter for a given radius and draws interval markers for minutes, seconds and half seconds
function analogue_display(x,y,radius,start_angle,end_angle,counter_clockwise) {
    context.beginPath();
    context.arc(x, y, radius, start_angle, end_angle, counter_clockwise);
    context.lineWidth = 10;
    context.strokeStyle = '#FF9F00';
    context.stroke(); 
    analogue_display_intervals(Math.PI / 60, 120, 6, 1, 'red', x, y); //half second
    analogue_display_intervals(Math.PI / 30, 60, 10, 3, '#E0A800', x, y); //second
    analogue_display_intervals(Math.PI / 6, 12, 20, 5, '#AC6B00', x, y); //minute
    let tenth_angle = (Math.PI / 60)*tenth_seconds%121;
    let sec_angle = (Math.PI / 30)*get_seconds();
    let min_angle = (Math.PI / 30)*get_mins();
    analogue_display_hand(x,y, tenth_angle, radius, 1, '#985B00');
    analogue_display_hand(x,y, sec_angle, radius, 2, '#DAB500');
    analogue_display_hand(x,y, min_angle, radius*0.9, 3, '#AC6B00'); 
    context.arc(x,y,10,start_angle,end_angle);
    context.fillStyle = '#B87900';
    context.fill();
}


/**#####################################################  BUTTONS AND DIGITAL DISPLAY LOGIC ########################################## */
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const split = document.querySelector('#split');
const reset = document.querySelector('#reset');
let tenth_seconds = 0;

const tick = () => tenth_seconds+=1;
const get_tenths = () => tenth_seconds % 10;
const get_seconds = () => Math.floor((tenth_seconds / 10) % 60);
const get_mins = () => Math.floor((tenth_seconds / 600) % 61);
const display_tenths = () => get_tenths() < 10? "0"+get_tenths().toString() : get_tenths().toString();
const display_seconds = () => get_seconds() < 10? "0"+get_seconds().toString() : get_seconds().toString();
const display_mins = () => get_mins() < 10? "0"+get_mins().toString() : get_mins().toString();

const digital_display = () => {
    let digital_display_x = 50;
    let digital_display_y = 300;
    let watch_val = display_mins()+":"+display_seconds()+":"+display_tenths();
    context.font = '80px Arial';
    context.strokeStyle = '#800E0E';
    context.strokeText(watch_val, digital_display_x, digital_display_y, 1000, 1000);
}

const draw_frame = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    digital_display();
    analogue_display(analogue_display_x, analogue_display_y, radius, start_angle, end_angle, counter_clockwise);
}

let running = false;
const animate_watch = () => { if(running){ tick(); draw_frame();} }
const start_watch = () => running = true;
const stop_watch = () => running = false;
const reset_watch = () => {
    tenth_seconds = 0;
    draw_frame();
}

//init frame
draw_frame();
//create event and time interval streams
const observables$ = Observable.merge(
    Observable.fromEvent(start, 'click').map(e => start_watch()),
    Observable.fromEvent(stop, 'click').map(e => stop_watch()),
    Observable.fromEvent(reset, 'click').map(e => reset_watch()),
    Observable.interval(100).map(e => animate_watch())
);

observables$
    .subscribe();


