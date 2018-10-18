let display =document.getElementById('screen');
let calculation ='';
let value ='';

function detectKey(key){
  if (key == '='|| key == 'Enter')
  {
    doCalculation();
  }

  else {
    calculation += key;
    display.innerHTML = calculation;
  }
}

function doCalculation(){
  let answer = eval(calculation);
  display.innerHTML = "";
  display.innerHTML = answer;
  calculation = "";

}

document.addEventListener('click', function (event) {
	// If the clicked element doesn't have the right selector, bail
	if (event.target.matches('.btn')){

    display.innerHTML = '';
    let value = event.target.value;
    console.log(value);

    if (value === 'C'){
      display.innerHTML = '0';
      calculation = '';
      value ='';
    }

    if(value === 'x'|| value === 'X')
    {
      value = value.replace(value, "*")
    }

    if(value === '÷') {
      value = value.replace(value, "/")
    }

    if (value === '=')
    {

      console.log("the calculator is "+calculation)
      console.log(eval(calculation));
      doCalculation();

    }

    else{
          calculation += value;
          display.innerHTML += calculation;
        }
  }
}, false);
