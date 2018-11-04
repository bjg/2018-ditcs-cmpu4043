import {Observable} from 'rxjs/Rx';
import '../css/style.css';

const buttons = document.getElementById("keypad").children;

const input$ = Observable.from(buttons)
               .map(buttons => Observable.fromEvent(buttons, 'click')
               .mapTo(buttons.textContent))
               .mergeAll()
               .merge(Observable.fromEvent(document, 'keypress').pluck('key'));

let output = '';

input$.subscribe(key => {
    
    const validKeys = "1234567890-=+/*()cC±.";
    
    // validate key
    if(!validKeys.includes(key)) {
       key = '';
    }
    
    // clear output
    if(key === 'c' || key === 'C') {
        output = '';
        key = '';
        document.getElementById('output').innerHTML = '0';
    }
    
    // swap sign
    if(key === '±' && output !== '') {
        
        key = '';
        
        if(output[0] !== '-') {
            output = '-' + output;
        } else {
            output = output.slice(1, output.length);
        }
        
    }
    
    // evalute expression
    if(key === '=' && output !== '') {
        output = eval(output).toString();
        key = '';
    }
    
    output += key;
    
    document.getElementById('output').value = output;
        
});