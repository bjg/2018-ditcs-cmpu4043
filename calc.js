<!-- Calculator with rxjs -->
import {merge, fromEvent, subscribe} from 'rxjs';
import { Observable } from 'rxjs/Observable';

import '../src/style.css';

let result = 0;
let exp = '';
let num;

const btns = document.getElementsByClassName("grid-item");

function calculator() {


    const btnsStream$ = Observable.fromEvent(btns, 'click');
    const keysStream$ = Observable.fromEvent(document, 'keypress');

    const stream$ = merge(btnsStream$, keysStream$);

    stream$.subscribe(key => {
        if (x.type == 'click') {
            num = x['srcElement'].value;
        }
        else if (x.type == 'keypress') {
            num = x['key'];
        }

        display(num)

        // Display number input into text box
        function display(val) {
            console.log(num);
            let text = document.getElementById('text');

            text.value += val;
            exp += val;
            console.log(exp);
        }

        if (value === 'c') {
            clr();
        }

        if (value === '=') {
            let display = document.getElementById('text');
            let x = eval(exp);
            text.value = x;
            exp = 0;
            console.log(x);
        }
    });

}
function clr() {
    document.value = 0;
    result = "";
}

