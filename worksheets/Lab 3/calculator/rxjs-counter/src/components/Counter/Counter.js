import { fromEvent, merge, pipe, subscribe } from "rxjs";
import { mapTo, scan, startWith } from "rxjs/operators";
import "./Counter.css";

function Counter({ initialValue }) {
    const display = Display(initialValue);
    const Button_1 = Button("1");
    const Button_2 = Button("2");
    const Button_3 = Button("3");
    const Button_4 = Button("4");
    const Button_5 = Button("5");
    const Button_6 = Button("6");
    const Button_7 = Button("7");
    const Button_8 = Button("8");
    const Button_9 = Button("9");

    const Equals = Button("=");
    const Plus = Button("+");
    const Minus = Button("-");
    const Devide = Button("/");
    const Multiply = Button("*");
    const rstButton = Button("C");
    const container = document.createElement("div");
    for (let component of [display, Button_1, Button_2, Button_3, Button_4, Button_5, Button_6, Button_7, Button_8, Button_9, Plus, Minus, Devide, Multiply, Equals, rstButton]) {
        container.appendChild(component);
    }
    container.classList.add("counter");
    run(display, Button_1, Button_2, Button_3, Button_4, Button_5, Button_6, Button_7, Button_8, Button_9, Plus, Minus, Devide, Multiply, Equals, rstButton);
    return container;
}

/*
 * Solution:
 * 1. Map idividual button click events to literal functions using the mapto() operator
 * 2. Initialize the stream with a counter value with the startWith() operator
 * 3. Update the counter with appropriate function (from step 1)
 * 4. Subscribe to the stream and update the DOM for each event
 */
function run(display, Button_1, Button_2, Button_3, Button_4, Button_5, Button_6, Button_7, Button_8, Button_9, Plus, Minus, Devide, Multiply, Equals, rstButton) {
    merge(
        fromEvent(Button_1, "click").pipe(mapTo(acc => ({value: acc.value + "1"}))),
        fromEvent(Button_2, "click").pipe(mapTo(acc => ({value: acc.value + "2"}))),
        fromEvent(Button_3, "click").pipe(mapTo(acc => ({value: acc.value + "3"}))),
        fromEvent(Button_4, "click").pipe(mapTo(acc => ({value: acc.value + "4"}))),
        fromEvent(Button_5, "click").pipe(mapTo(acc => ({value: acc.value + "5"}))),
        fromEvent(Button_6, "click").pipe(mapTo(acc => ({value: acc.value + "6"}))),
        fromEvent(Button_7, "click").pipe(mapTo(acc => ({value: acc.value + "7"}))),
        fromEvent(Button_8, "click").pipe(mapTo(acc => ({value: acc.value + "8"}))),
        fromEvent(Button_9, "click").pipe(mapTo(acc => ({value: acc.value + "9"}))),
        fromEvent(Plus, "click").pipe(mapTo(acc => ({value: acc.value + "+"}))),
        fromEvent(Minus, "click").pipe(mapTo(acc => ({value: acc.value + "-"}))),
        fromEvent(Multiply, "click").pipe(mapTo(acc => ({value: acc.value + "*"}))),
        fromEvent(Devide, "click").pipe(mapTo(acc => ({value: acc.value + "/"}))),
        fromEvent(Equals, "click").pipe(mapTo(acc => ({value: acc.value = eval(display.value)}))),
        fromEvent(rstButton, "click").pipe(mapTo(acc => ({value: 0})))
    )
        .pipe(
            startWith({ value: String(display.value) }),
            scan((acc, update) => update(acc))
        )
        .subscribe(counter => {
            display.value = counter.value;
        });
}

function Display(initialValue) {
    const display = document.createElement("input");
    display.value = initialValue;
    display.readonly = "readonly";
    display.style.width = "900px";
    display.style.textAlign = "right";
    return display;
}



function Button(label) {
    const button = document.createElement("button");
    button.innerText = label;
    return button;
}

export default Counter;
