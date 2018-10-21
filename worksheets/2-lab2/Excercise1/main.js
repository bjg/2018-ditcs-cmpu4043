let screen_output = document.getElementById("calculator_screen_value");
let expression = "";

//Add the input into the expression.
function take_input(input)
{
  expression += String(input);
  screen_output.innerHTML = expression;
}

//After equals is pressed calculate the result of the expression, give an error
//if necessary.
function equal_press()
{
  try
  {
      screen_output.innerHTML = String(eval(expression));
      expression = "";
  }
  catch(err)
  {
      screen_output.innerHTML = "Error";
      expression = "";
  }
}

//Making use of the negative button, only to be used at the start of an expression.
function make_negative()
{
  if(expression == "")
  {
    expression += '-';
  }
}

//Clears the screen.
function clear_screen()
{
  expression = ""
  screen_output.innerHTML = "0";
}

//The following function takes input from the keyboard and if it is a number or
//valid operator add it to the expression.
window.onkeypress = function(key_press)
{
    let x = key_press.which || key_press.keyCode;
    let key = String.fromCharCode(x);

    if(key == '-') {take_input('-');}
    else if(key == '+') {take_input('+');}
    else if(key == '*') {take_input('*');}
    else if(key == '/') {take_input('/');}
    else if(key == '(') {take_input('(');}
    else if(key == ')') {take_input(')');}
    else if(key == '.') {take_input('.');}
    else if(key == '=') {equal_press();}
    else if(!isNaN(key)) {take_input(key);}
    else {console.log("Input not taken.");}
}

//The following functions are for returning operators to the take input function
//when clicking on a button the the actual calculator.
function subtract()
{
  return '-'
}

function add()
{
  return '+'
}

function multiply()
{
  return '*'
}

function divide()
{
  return '/'
}

function left_bracket()
{
  return '('
}

function right_bracket()
{
  return ')'
}

function decimal_point()
{
  return '.'
}
