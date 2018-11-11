/*
*Calculator App - Worksheet 3
* Author: Dimiter Dinkov
* Student Number: C15334276
* */
import {fromEvent, from, merge, pipe, subscribe} from "rxjs";
import {mapTo, map, mergeAll} from "rxjs/operators";

let buttons = document.getElementsByClassName("btn"); // combine all buttons of class btn into an array
let screen = document.getElementById("screenText"); // get a reference to the display of the calculator
let refresh = true; // variable that will be check in to see if the screen needs to be cleared before new values are inputed

let stream = from(buttons).pipe(map( btn => fromEvent(btn,"click")
    .pipe(
        mapTo(btn.textContent)
        )
)).pipe(mergeAll());

stream.subscribe(val => {
    console.log(val);
    if(refresh === true){
        screen.innerText = "";
        refresh = false;
    }

    if (val === "=") {
        try {
            screen.innerText = eval(screen.innerText.toString());
            refresh = true
        } catch {
            screen.innerText = "Error";
            refresh = true;
        }
    } else if (val === "C") {
        screen.innerText = "";
        console.log("value removed");
    } else {
        screen.innerText = screen.innerText.toString() + val;
    }
});