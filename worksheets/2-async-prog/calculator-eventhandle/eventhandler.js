function c(val)
{
  document.getElementById("calc").value=val;
}

function v(val)
{
  document.getElementById("calc").value+=val;
}

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