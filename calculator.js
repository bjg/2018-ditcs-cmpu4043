// These are all of the variables initialised for the JS,
// starting out as false so they will or won't pass certain
// checks
let calculator, buttons, buttonsByKey, input, clear = false;

function handleValue(value){
    // This function checks if clear has been set to true,
    // in which case it changes the value to be blank and unsets
    // clear to be false again
  if (clear) {
    input.value = '';
    clear = false;
  }
 
    // isOperator is a list of the basic arithmetic operations,
    // appending the value passed to the handleValue function
  let isOperator = ['+', '/', '*', '-'].includes(value);
  
    // The switch case evaluates if the text is going to be cleared
    // or calculated (using eval()), and if not, appends the latest number
    // to the value through the use of a ternary if operator
  switch (value) {
    case 'C':
      input.value = '';
      break;
    case '=':
      input.value = eval(input.value);
      clear = true;
      break;
    default:
      input.value += isOperator ? ` ${value} ` : value;
      break;
  }
}

function main() {
    // querySelector is similar to findbyID except more elegant
    calculator = document.querySelector('.calculator');
    buttons = calculator.querySelectorAll('button');
    input = calculator.querySelector('input');
    buttonsByKey = {};
  
    // Simply keeps a lot of what's being pressed
    console.log(buttons);
      
    // Iterates through the list of buttons based on the dataset value,
    // and adds an event listener to them which fires handleValue(key)
    for (let button of buttons) {
        buttonsByKey[button.dataset.key] = button;
        button.addEventListener('click', function (event) {
    	event.preventDefault();
        handleValue(button.dataset.value);
    });
  }
  
    // Same thing as above, but for keyboard input
    addEventListener('keypress', function (event) {
        if (!(event.code in buttonsByKey)) {
            return;
        }
    event.preventDefault();
    handleValue(buttonsByKey[event.code].dataset.value);
  })
}

// Loads the JavaScript file once the main body content of the page is ready
addEventListener('DOMContentLoaded', main);
