let calculator, buttons, buttonsByKey, input, clear = false;

function handleValue(value){
  if (clear) {
    input.value = '';
    clear = false;
  }
  
  let isOperator = ['+', '/', '*', '-'].includes(value);
  
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
	calculator = document.querySelector('.calculator');
  buttons = calculator.querySelectorAll('button');
  input = calculator.querySelector('input');
  buttonsByKey = {};
  
  console.log(buttons);
      
  for (let button of buttons) {
    buttonsByKey[button.dataset.key] = button;
    
    button.addEventListener('click', function (event) {
    	event.preventDefault();
      handleValue(button.dataset.value);
    });
  }
  
  addEventListener('keypress', function (event) {
     if (!(event.code in buttonsByKey)) {
       return;
     }
     event.preventDefault();
     handleValue(buttonsByKey[event.code].dataset.value);
  })
}

addEventListener('DOMContentLoaded', main);