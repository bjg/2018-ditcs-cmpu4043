/**
 * Philip Butler - C15742551
 */

 import {Observable} from 'rxjs/RX';
 import css from '../css/style.css';

 //global variable manipulated by almost every function
let display_string = '0';
//use to handle start new expression or append new expression to answer
let display_is_answer = false;

//true if function parameter is operator 
const is_operator = value =>  value === 'x' || value === '÷' || value === '+' || value === '-'; 
//true if function parameter is single digit 
const is_digit = value => value >= '0' && value <= '9';
//true if function parameter is decimal point
const is_decimal_point = value => value === '.';
//true if new display (for new equation)
const is_new_display = () => display_string === "0" || display_is_answer;
//used to display error message if display text goes beyond display div width
const wider_than = (el1, el2) => parseFloat(getComputedStyle(el1).width) > parseFloat(getComputedStyle(el2).width);
//used to handle multiplication by brackets.
const push_mult_symbol = char => '*'+char;
//regex pattern to return last number in the display string. includes sign value
const last_num_in_display = () => display_string.match(/(-)?(\+)?\d+(\.)?(\d+)?(?=\D*$)/g)[0];
//returns true if regex matches decimal point for a given value
const contains_decimal = number => number.match(/\./g) !== null;
//fix decimal point answers to 4 places
const format_decimal_answer = answer => String(parseFloat(answer).toFixed(4));
//returns the last char of display
const end_of_display = () => display_string.charAt(display_string.length-1);


//called when amendments made to display_string. ensures new string value is not longer than display screen (if it is then display error), else updates innerHTML of the display div
const update_display = () => {
  var display = document.querySelector("#display");
  var display_text = document.querySelector("#display-text");
  display_text.innerHTML = display_string;
  display_text.innerHTML = wider_than(display_text, display) ? display_string ="error" : display_string;
}//end update_display()


//called when plus/minus button pressed
const handle_sign_operator = (val) => {
  //usually last character of the display string determines how sign function should be implemented (exception for case 0)
  switch(val) {
    //if mult, divide or brackets simply append the minus symbol
    case 'x':
    case "÷":
    case '(':
    case ')':
      display_string += '-';
      break;
    //if plus change to minus
    case "+":
      display_string = display_string.replace(end_of_display(), '-');
      break;
    //if minus change to plus
    case '-':
      display_string = display_string.replace(end_of_display(), '+');
      break;
    //if 0 switch from positive to negative
    case '0':
      //recursive call nessecary in case number with multiple digits ending in 0 (e.g 100, 250 etc.)
      last_num_in_display().length === 1 ? display_string = "-" : handle_sign_operator(last_num_in_display());
      break;
    //else if last char of display is a digit, change sign of last number on display
    default:
      if(is_digit(end_of_display())) {
        //convert last number in display string to float, multiply it by -1, convert back to String, replace last number in display_string with this value
        let new_val = parseFloat(last_num_in_display()) * -1;
        new_val = new_val > 0 ? "+"+String(new_val) : String(new_val);
        display_string = display_string.replace(last_num_in_display(), new_val);
      }
      break;
  }//end switch()
}//end handle_sign_operator()


//appends innerHTML value of button to display and handles error cases
const append_to_display = (value) => {
  if(typeof(value) === 'undefined') {
    return;
  }
  else if(value === '±') 
  {
    handle_sign_operator(end_of_display()); //took this code out of here to clean things up a bit
  }
  else if((is_operator(value) || is_decimal_point(value)) && value === end_of_display()) 
  {
    return; //ensure nothing happens if user tries to sidechain identical operators or decimal points
  }
  else if(is_decimal_point(value) && contains_decimal(last_num_in_display()) && !is_new_display() && !is_operator(end_of_display())) 
  {
    return; //ensure nothing happens if user tries to put 2 decimal points in same number. if value is decimal point and the last number in the expression is a decimal number where this is not a new expression and last char of the display is not an operator
  }
  else if(is_operator(value) && is_operator(end_of_display())) 
  {
    display_string = display_string.replace(end_of_display(), value);//switch to last inputed operator value
  }
  else if(is_decimal_point(value) &&  !is_digit(end_of_display())) 
  {
    display_string += "0."; //fractions of one as decimals should always start with a 0
  }
  else if(display_string == "error" || (is_new_display() && is_digit(value))) 
  { 
    display_string = value;
    display_is_answer = false; //start of a new equation. display string should just be assigned the given value.
  }
  else 
  {
    display_string += value; //if no user error, just append the value to the display string
    display_is_answer = false; //need to also ensure this gets switched off here in case of appending expression to answer (else next number value after operator will trigger line 111)
  }//end if-else chain
  update_display();
}//end append_to_display()


//used to add closing brackets to display_string where nessecary
const add_missing_brackets = (string, num_missing) => {
  for(var i=0; i<num_missing; i++) {
    string += ')';
  }
  return string;
}//end add_missing_parenth()


//allows bracket multiplication. e.g 4(5) will be converted to 4*(5)
const handle_bracket_multiplication = (string) => {
  var string_builder = '';
  for(var i=0; i<string.length; i++) {
    var char = string.charAt(i);
    var char_before_bracket = (char === '(' && i !== 0) ? string.charAt(i-1) : '';
    string_builder += is_digit(char_before_bracket) ? push_mult_symbol(char) : char;
  }
  return string_builder;
}//end handle_bracket_multiplication()


//ensures equal number of closing and opening brackets (error if more closing than opening as placement too ambigeous), parses for bracket multiplication
const validate_brackets = (string) => {
  var openP = string.match(/\(/g);
  var closeP = string.match(/\)/g);
  var num_openP = openP !== null ? openP.length : 0;
  var num_closeP = closeP !== null ? closeP.length : 0;
  if(num_openP > num_closeP){
    string = add_missing_brackets(string, (num_openP - num_closeP));
  }
  if(num_closeP > num_openP) {
    string = "error";
  }
  string = handle_bracket_multiplication(string);
  return string;
}//end validate_brackets()


//formats multiplication and division symbols, missing brackets and bracket multiplication
function format_equation(compute_string) {
  compute_string = compute_string.replace(/x/g, '*');
  compute_string = compute_string.replace(/÷/g, '/');
  compute_string = validate_brackets(compute_string);
  return compute_string;
}//end format_equation()


//parses display_string, checks for errors and if none, evaluates expression, updates display
const solve = (none) => {
  display_string= format_equation(display_string);
  if(display_string !== "error") {
    //convert to string to compute length
    display_string = String(eval(display_string));
    //handle long decimal or recurring decimal answers e.g 1/9 
    if(display_string.length > 10 && contains_decimal(display_string)) {
          display_string = format_decimal_answer(display_string);
    }
  }
  display_is_answer = true;
  update_display();
}//end solve()


//resets display
const clear = (none) => {
  display_string = "0";
  update_display();
}//end clear()

/**####################################################### MOST OF THE UPDATES TO CODE START HERE ############################################## */

const process_input = value => {
  let input_vals = ['0','1','2','3','4','5','6','7','8','9','.', '+', '-', 'x', '(', ')','*', '/', '=', 'Enter', 'c', 'C', 'Backspace', '÷', '±'];
  if(input_vals.includes(value)) {
    switch(value) {
      case 'Enter':
        return '=';
      case 'c':
        return 'C';
      case '*':
        return 'x';
      case '/':
        return '÷';
      default:
        return value;
    }
  }
}


const process_value = value => {
  switch(value) {
    case '=':
      solve();
      break;
    case 'C':
      clear();
      break;
    case 'Backspace':
      display_string = display_string.slice(0,display_string.length-1);
      update_display();
      break;
    default:
      append_to_display(value);
      break;
  }
}


const keyStream$ = Observable.fromEvent(document, 'keyup').map(e => process_input(e.key)).map(x => process_value(x));
const mounseStream$ = Observable.fromEvent(document, 'click').map(e => process_input(e.target.innerHTML)).map(x => process_value(x));
const observables$ = Observable.merge(keyStream$, mounseStream$);

//runs code. Had forgotten in css to set display overflow to hidden so handle it here
function go() {
  var display = document.querySelector('#display');
  display.style.overflow = 'hidden';
  observables$.subscribe();
}//end go

//run the program
go();