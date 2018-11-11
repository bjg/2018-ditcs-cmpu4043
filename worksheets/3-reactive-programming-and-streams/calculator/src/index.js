import { map } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

const buttonElements = document.querySelectorAll(".column");
const buttonStream = fromEvent(buttonElements, 'click');
const keyboardStream = fromEvent(window, 'keypress');

merge(
    buttonStream.pipe(map(event => event.target.textContent)),
    keyboardStream.pipe(map(event => event.which))
).subscribe(keyCode => handleKey(keyCode));

function handleKey(keyCode)
{
    var inputBar = document.getElementById("input-bar");

    if(! inputBar)
    {
        console.log("Failed to get input bar");
        return;
    }

    switch(keyCode)
        {
            case 8: // backspace
                if(inputBar.value.length > 0)
                    inputBar.value = inputBar.value.slice(0, -1);
                break;
            case '0':
            case 48:
                inputBar.value += '0';
                break;
            case '1':
            case 49:
                inputBar.value += '1';
                break;
            case '2':
            case 50:
                inputBar.value += '2';
                break;
            case '3':
            case 51:
                inputBar.value += '3';
                break;
            case '4':
            case 52:
                inputBar.value += '4';
                break;
            case '5':
            case 53:
                inputBar.value += '5';
                break;
            case '6':
            case 54:
                inputBar.value += '6';
                break;
            case '7':
            case 55:
                inputBar.value += '7';
                break;
            case '8':
            case 56:
                inputBar.value += '8';
                break;
            case '9':
            case 57:
                inputBar.value += '9';
                break;
            case '(':
            case 40:
                inputBar.value += '(';
                break;
            case ')':
            case 41:
                inputBar.value += ')';
                break;
            case '÷':
            case 47:
                inputBar.value += '/'; 
                break;
            case 'x':
            case 42:
                inputBar.value += '*';
                break;
            case '=':
            case 13: // Enter
                inputBar.value = eval(inputBar.value).toString();
                break;
            case '+':
            case 43:
                inputBar.value += '+';
                break;
            case '-':
            case 45:
                inputBar.value += '-';
                break;
            case '.':
            case 46:
                inputBar.value += '.';
                break;
            case 'C':
            case 99:
                inputBar.value = '';
                break;
            case '±':
            case -1:
                inputBar.value += '±';
                break;
            default:
                console.log('Invalid key pressed: ' + keyCode);
                break;
        }
}
