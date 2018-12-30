import "./style.css";
import {Observable, fromEvent, merge } from 'rxjs';
import Rx from 'rxjs/Rx';



/*-------------------------------------------*\
    script.js
    Javascript in response to Lab Question 2.1

    Author: Ciarán O'Brien
    Lecture: Brian Gillespie
    Student Number: C15765215
    Date: 20/09/18
\*-------------------------------------------*/
let calculating = false
let negative = false

// Function that handles and preform the correct funciton for each button pressed
// Error Checking involves insuring no doulbe arithmetic symbols are added to the input
function btn_handler(btn_pressed) {
	console.log("btn_handler sees",btn_pressed)
    let screenValue = document.getElementById("calculation").value
    // Check that the value entered is a numeric value 
    if (Number.isInteger(parseInt(btn_pressed))) {
        calculating = false
        addToScreen(btn_pressed)
    }
    // If it's not an interger number, enter the switch cases
    else {
        switch (btn_pressed) { // Swtich about whichever button has been pressed/entered
            case "c":
            case "C": // Case to clear the screen
                document.getElementById("calculation").value = ''
                break
            case "+": // Addition case
                if (!calculating) {
                    addToScreen(btn_pressed)
                    calculating = true
                    break
                }
                break
            case "−": //Subtraction case
                if (!calculating) {
                    calculating = true
                    negative = true
                    addToScreen(btn_pressed)
                    break
                }
                break;
            case "×": // Multiplication case
            	console.log("hit")
                if (!calculating) {
                    calculating = true
                    addToScreen(btn_pressed)
                    break
                }
                break;
            case "÷": // Division case
                if (!calculating) {
                    calculating = true
                    addToScreen(btn_pressed)
                    break
                }
                break
            case "(": // Left bracket case
                addToScreen(btn_pressed)
                break
            case ")": // Right bracket case
                addToScreen(btn_pressed)
                break
            case ".": // Decimal point case
                addToScreen(btn_pressed)
                break
            case "=": // Evaluate equation case
                      // We must try execute the eval() fxn
                      // If there's an error in execusion, it'll be caught
                try {
                    negative = false
                    calculating = false
                    document.getElementById("calculation").value = calculate(document.getElementById("calculation").value)
                    break
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        alert(e.message)
                        break
                    }
                }
                break
            case "±": // Negation case
                pushToScreen()
                break
            default: // Default just in case
            	console.log("Broken")
                break

        }
    }
}

function addToScreen(value) { // FXN to update the calculators screen 
    document.getElementById("calculation").value += value
}
// FXN to push the negation to the front of the current value
// Does nothing if the system is currently exspecting a number, i.e. not an arithmic value
// Error checking evolved is checking if the last value on screen is already negative
// Mix of splice() and regex in order to change the last value, exploring different methods to do so  
function pushToScreen() { 
    if (calculating) {
    
    } else {
        let toNegateLocation = document.getElementById("calculation").value.length - 1
        let toNegate = document.getElementById("calculation").value[toNegateLocation]
        let val = document.getElementById("calculation").value
        if (negative) {
            valHolder = [...val]
            val = valHolder.splice(toNegateLocation - 1, 2, Math.abs(toNegate))
            val = valHolder.join('')
            document.getElementById("calculation").value = val
            negative = false;
        } else {
            document.getElementById("calculation").value = document.getElementById("calculation").value.replace(/.$/, -Math.abs(toNegate))
            negative = true;
        }
    }
}

// FXN simply evaluates the current input to the calculator
// Regex is used to replace multiply and divide values
function calculate(toEval) { // Evaluate the current equation 
    return eval(toEval.replace(/×/, '*').replace(/÷/, '/').replace(/−/,'-'))
}

let keyUp = fromEvent(document,'keyup')

keyUp.subscribe(function(value) {
    btn_handler(value.key)
});

const toggleButton = document.querySelector('.leftParam') 

let buttons = document.getElementsByTagName('button')
let clicked = fromEvent(buttons,'click')
clicked.subscribe((value) => {
	console.log(value["target"].innerHTML)
	btn_handler(value["target"].innerHTML)
})