let buttons = document.getElementsByClassName("button");
let input = document.getElementById("input");
let entries = [];
let size = 0;
let lastNumIndex = 0;
let buttonValues = [buttons.length];
let wholeNumberCount = 0;
let wholeNumberIndexes = [];

for (i = 0; i < buttons.length; i++)
{
  buttonValues[i] = buttons[i].innerHTML;

  if (buttons[i].innerHTML === 'C')
  {
    buttons[i].onclick = reset;
  }
  else if (buttons[i].innerHTML === '=')
  {
    buttons[i].onclick = equals;
  }
  else
  {
    let value = buttons[i].innerHTML;
    buttons[i].onclick = function() {addToScreen(value);}
  }
}

document.addEventListener('keydown', function(event)
{
  if (event.keyCode === 8 && size > 1)
  {
    if (lastNumIndex === size-1)
    {
      wholeNumberIndexes.splice(wholeNumberCount, 1);
      wholeNumberCount--;
      lastNumIndex = wholeNumberIndexes[wholeNumberCount];
    }

    entries.splice(size-1, 1);
    size--;
    input.innerHTML = entries.join("");
  }
  else if (event.keyCode === 8 && size === 1)
  {
    reset();
  }
});

document.addEventListener('keypress', function(event)
{
  let keyInput = String.fromCharCode(event.keyCode);

  if(keyInput === '=' || event.keyCode === 13)
  {
    equals();
  }
  else if(keyInput === 'c')
  {
    reset();
  }
  else if(buttonValues.includes(keyInput))
  {
    addToScreen(keyInput);
  }
});

function addToScreen(symbol)
{
  //if the last entry is a not a number and not the ± symbol; then the last symbol entered was a number (or brackets)
  if ((entries[size-1] === '+' || entries[size-1] === '-' || entries[size-1] === 'x' || entries[size-1] === '÷' || entries[size-1] === '(' || entries[size-1] === ')') && symbol !== '±')
  {
    wholeNumberIndexes[wholeNumberCount] = lastNumIndex;
    wholeNumberCount++;
    lastNumIndex = size;
  }

  //code to handle the ± symbol, I'm not sure if I overcomplicated the implementation of it, but this is how I think it works
  //if the symbol entered is the ± symbol and the last entry in the number index are not any mathematical operator or either brackets
  if (symbol === '±' && !(entries[lastNumIndex] === '+' || entries[lastNumIndex] === '-' || entries[lastNumIndex] === 'x' || entries[lastNumIndex] === '÷' || entries[lastNumIndex] === '(' || entries[lastNumIndex] === ')'))
  {
    //if there is only one number entered
    if (lastNumIndex === 0)
    {
      //if there is no input from the user and the ± is clicked, then just exit the function
      if (input.innerHTML === '0')
      {
        return 0;
      }
      else
      {
        //add in a minus symbol at the last number index, increase the size counter and last number index
        entries.splice(lastNumIndex, 0, '-');
        size++;
        lastNumIndex++;
      }
    }
    //if there is one number entered but it is negative
    else if (lastNumIndex === 1)
    {
      //if the symbol behind the last number is a minus
      if (entries[lastNumIndex-1] === '-')
      {
        //remove the minus, reduce the size counter by 1 and set the last number index to 0
        entries.splice(lastNumIndex-1, 1);
        size--;
        lastNumIndex = 0;
      }
      else
      {
        entries.splice(lastNumIndex, 0, '-');
        size++;
        lastNumIndex++;
      }
    }
    //any other scenario when the ± symbol is entered
    else
    {
      //if the symbol before the last number was a +
      if (entries[lastNumIndex-1] === '+')
      {
        //replace it with a minus
        entries[lastNumIndex-1] = '-';
      }
      //if the symbol before the last number was a -
      else if (entries[lastNumIndex-1] === '-')
      {
        //if the symbol before the last symbol was a x, ÷ or either brackets
        if (entries[lastNumIndex-2] === 'x' || entries[lastNumIndex-2] === '÷' || entries[lastNumIndex-2] === '(' || entries[lastNumIndex-2] === ')')
        {
          //remove the minus, reduce the size counter by 1 and set the last number index to 0
          entries.splice(lastNumIndex-1, 1);
          lastNumIndex--;
          size--;
        }
        //else replace with a +
        else
        {
          entries[lastNumIndex-1] = '+';
        }
      }
      else
      {
        entries.splice(lastNumIndex, 0, '-');
        size++;
        lastNumIndex++;
      }
    }
  }
  else
  {
    //if entered symbol is ± and it wasn't handled by the previous if statement (because brackets were used), we ignore it and don't add it to the array of entries
    if(symbol !== '±')
    {
      entries[size] = symbol;
      size++;
    }
  }

  input.innerHTML = entries.join("");
}

//if equals button is clicked
function equals()
{
  if (size > 0)
  {
    let expression = entries.join("");
    expression = expression.replace("x", "*");
    expression = expression.replace("÷", "/");

    entries = [];

    //evaluate maths expression, if syntax error, display on screen
    try
    {
      input.innerHTML = eval(expression);

      entries = input.innerHTML.split('');
      size = entries.length;
    }
    catch (err)
    {
      console.log(err);
      input.innerHTML = "Syntax Error";
      size = 0;
    }
    lastNumIndex = 0;
    let wholeNumberCount = 0;
    let wholeNumberIndexes = [];
  }
}

//if clear button is clicked
function reset()
{
  console.log("reset");
  //set size to 0, clear the entries array, put 0 in the input box and set the last number index before an operation to 0
  size = 0;
  entries = [];
  lastNumIndex = 0;
  input.innerHTML = 0;
  let wholeNumberCount = 0;
  let wholeNumberIndexes = [];
}
