// Clears the data from the screen
function c(val)
{
  document.getElementById("calc").value=val;
}

// Retrieves the value to be placed in the screen
function v(val)
{
  document.getElementById("calc").value+=val;
}

// This function uses the eval to evaluate an expression i.e. solving an equation
function e()
{
  try
  {
    c(eval(document.getElementById("calc").value))
  }
  catch(e)
  {
    c('Error')
  }
}
