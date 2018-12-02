import { fromEvent, merge, pipe, subscribe } from "rxjs";
import { mapTo, scan, startWith } from "rxjs/operators";
import "./Counter.css";


function Counter({ initialValue }) {
    const display = Display(initialValue);
    const incButton = Button("⬆️");
    const decButton = Button("⬇️");
    const rstButton = Button("⏹");
    const container = document.createElement("div");
    for (let component of [display, incButton, decButton, rstButton]) {
        container.appendChild(component);
    }
    container.classList.add("counter");
    run(display, incButton, decButton, rstButton);
    return container;
}

/*
 * Solution:
 * 1. Map idividual button click events to literal functions using the mapto() operator
 * 2. Initialize the stream with a counter value with the startWith() operator
 * 3. Update the counter with appropriate function (from step 1)
 * 4. Subscribe to the stream and update the DOM for each event
 */

 function run(display, incButton, decButton, rstButton) {
    merge(
        fromEvent(incButton, "click").pipe(mapTo(counter => ({ value: counter.value + 1 }))),
        fromEvent(decButton, "click").pipe(mapTo(counter => ({ value: counter.value - 1 }))),
        fromEvent(rstButton, "click").pipe(mapTo(counter => ({ value: 0 })))
    )
        .pipe(
            startWith({ value: Number(display.value) }),
            scan((acc, update) => update(acc)),
        )
        .subscribe(counter => {
            display.value = counter.value;
        });
}


function Display(initialValue) {
    const display = document.createElement("input");
    display.value = initialValue;
    display.readonly = "readonly";
    display.style.width = "80px";
    display.style.textAlign = "right";
    return display;
}

function Button(label) {
    const button = document.createElement("button");
    button.innerText = label;
    return button;
}

export default Counter;
