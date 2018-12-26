import { fromEvent, merge, pipe, subscribe } from "rxjs";
import { mapTo, scan, startWith } from "rxjs/operators";
import "./Counter.css";

function Counter() {
    const display = Display(0);
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

function run(display, incButton, decButton, rstButton) {
    const initialValue = 0;
    merge(
        fromEvent(incButton, "click").pipe(mapTo(counter => ({ value: counter.value + 1 }))),
        fromEvent(decButton, "click").pipe(mapTo(counter => ({ value: counter.value - 1 }))),
        fromEvent(rstButton, "click").pipe(mapTo(counter => ({ value: 0 })))
    )
        .pipe(
            startWith({ value: initialValue }),
            scan((acc, update) => update(acc))
        )
        .subscribe(counter => {
            display.value = counter.value;
        });
}

function Display(initialValue) {
    const display = document.createElement("input");
    display.placeholder = initialValue;
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
