import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';

import '../css/main.css';

// Let us first create the buttons
const buttons = ['(', ')', '&plusmn;', '&divide;', 7,
    8, 9, 'x', 4, 5,
    6, '-', 1, 2, 3,
    '+', 0, '.', 'C', '='];

// And the calcualtion object
var expression = '';

// Get the button div
const buttonDiv = document.getElementById('buttons');

// Create an observable looking for input
var input = Observable.create(o => {
    // Map through the buttons, create them and add event listeners.
    buttons.map((currElement, index) => {
        var button = document.createElement('button');

        button.setAttribute('class', 'button');
        button.id = index;
        button.innerHTML += '<h3>' + buttons[index] + '</h3>';

        // Append it to the buttons div
        buttonDiv.appendChild(button);

        // Now create the event listener
        button.addEventListener('click', () => {
            o.next(buttons[index]);
        });
    })

    // Add a listener for key down for keyboard input
    document.addEventListener('keydown', (event) => {
        o.next(event);
    });
});

// Subscribe to our input observable
input.subscribe((value) => {
    // When we get a value here we need to add it to our calculation

    // Let's first check if it's a keyboard event
    if(value instanceof KeyboardEvent) {
        // Deal with the keyboard event
        if (!isNaN(value.key) || value.key == '+' || value.key == '-' || value.key == '*' || value.key == '/') {
            // Add whatever is entered to the expression
            expression += value.key
            // Update the screen
            document.getElementById('screen').innerHTML = '<h1 class="screen-text">' + expression + '</h1>';
        }

        // IF enter is pressed
        if (value.key == 'Enter') {
            // Evaluate the expression using the calculate function
            expression = calculate(expression);
        }

        // If we are backspacing
        if (value.key == 'Backspace') {
            // Slice the last character from the expression
            expression = expression.slice(0, -1);
            // Update the screen
            document.getElementById('screen').innerHTML = '<h1 class="screen-text">' + expression + '</h1>';
        }
    } else {
        // If it is not a KeyboardEvent
        // If we are clearing
        if(value == 'C') {
            expression = '';
            document.getElementById('screen').innerHTML = '<h1 class="screen-text">0</h1>';
        } else if (value != '=') {
            // If any other value other than =
            expression += value;
            document.getElementById('screen').innerHTML = '<h1 class="screen-text">' + expression + '</h1>';
        } else {
            // If it is = then run the calculation
            expression = calculate(expression);
        }
    }
    // If we are clearing the screen
    
    /*

    if(value == 'C') {
        expression = '';
        document.getElementById('screen').innerHTML = '<h1 class="screen-text">0</h1>';
    } else if (!isNaN(value) || value == '+' || value == '-' || value == '*' || value == '/') {
        expression += value;
        document.getElementById('screen').innerHTML = '<h1 class="screen-text">' + expression + '</h1>';
    } else if(value == 'Enter') {
        expression = calculate(expression);
    } else if(value == 'Backspace') {
        expression = expression.slice(0, -1);
        document.getElementById('screen').innerHTML = '<h1 class="screen-text">' + expression + '</h1>';
    } else {
        expression = calculate(expression);
    }
    */
});

// Function for calculating the expression
const calculate = exp => {
    exp = exp.replace('x', '*');
    exp = exp.replace('&divide;', '/');

    try {
        exp = eval(exp);
        document.getElementById('screen').innerHTML = '<h1 class="screen-text">' + exp + '</h1>';

        return exp;
    } catch(err) {
        if (err instanceof SyntaxError) {
            document.getElementById('screen').innerHTML = '<p class="screen-text">SyntaxError</p>';
        }
    }
}