let screen_output = document.getElementById("calculator_screen_value");
let expression = "";

function take_input(input)
{
	expression += String(input);
	screen_output.innerHTML = expression;
}

function equal()
{
	try
	{
		screen_output.innerHTML = String(eval(expression));
		expression = "";
	}
	catch(err)
	{
		screen_output.innerHTML = "Error!";
		expression = "";
	}
}

function clear(input)
{
	expression += String(input);
	screen_output.innerHTML = "";
}

function subtract()
{
	return '-'
}

function add()
{
	return '+'
}

function mult()
{
  return '*'
}

function div()
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