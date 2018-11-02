import {Observable} from 'rxjs/Rx';
import {Stopwatch} from './Stopwatch.js';
import css from '../css/style.css';
//create variables
const canvas = document.querySelector('canvas');
const header = document.querySelector('#heading');
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const split = document.querySelector('#split');
const reset = document.querySelector('#reset');
const radius = 200;
//set canvas width and height
header.style.height = "36px";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (parseFloat(header.style.height)+50); 
const analogue_display_x = canvas.width /2;
const analogue_display_y = canvas.height / 2;
const digital_display_x = 100;
const digital_display_y = 350;
const splits_x = 1100;
const splits_y = 100;
const context = canvas.getContext('2d');
const stopwatch = new Stopwatch(context, canvas.width, canvas.height, analogue_display_x, analogue_display_y, digital_display_x, digital_display_y, splits_x, splits_y, radius);
//init frame
stopwatch.draw_frame();
//create event and time interval streams
const observables$ = Observable.merge(
    Observable.fromEvent(start, 'click').map(e => stopwatch.start_watch()),
    Observable.fromEvent(stop, 'click').map(e => stopwatch.stop_watch()),
    Observable.fromEvent(split, 'click').map(e => stopwatch.add_split()),
    Observable.fromEvent(reset, 'click').map(e => stopwatch.reset_watch()),
    Observable.interval(100).map(e => stopwatch.animate_watch())
);
observables$.subscribe();