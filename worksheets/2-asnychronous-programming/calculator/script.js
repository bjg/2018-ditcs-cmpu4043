let display =document.getElementById('screen');
let calculation ='';
let value ='';

//function to detect key press
function detectKey(key){
  if (key == '='|| key == 'Enter')
  {
    //try catch to stop invlaid input from being executed. example a+b;
    try{
      doCalculation();
    }catch(err){
      displayToScreen("Invalid input");
    }
  } else {
    addToCalc(key);
    displayToScreen(calculation);
  }
}

//Function to take care of the calculation.
function doCalculation(){
    console.log("inside Calc");
    console.log(eval(calculation));
    let answer = eval(calculation);
    console.log("The answer is :"+answer);
    displayToScreen('');
    displayToScreen(answer);
    calculation ='';
}

//Button event listener to take in button clicks on then screen.
document.addEventListener('click', function (event) {
  //if the button click exists do the following
	if (event.target.matches('.btn')){
    displayToScreen('');
    //takes the value of the button clicked as the value input
    value = event.target.value;
    //checks the value and implements the corresponding function
    if (value === 'C'){
      displayToScreen('0');
      calculation ='';
      value ='';
    }
    if(value === 'x'|| value === 'X')
    {
      value = value.replace(value, "*")
    }
    if(value === '÷') {
      value = value.replace(value, "/")
    }
    if (value === '±'){
      value ='';
      //find the location of the last plus or minus and change it the opposite.
      let minusIndex =calculation.lastIndexOf('-');
      let plusIndex = calculation.lastIndexOf('+');
      if(minusIndex > plusIndex){
        replaceAt(minusIndex, '+');
      }else{
        replaceAt(plusIndex ,'-');
      }
    }
    if (value === '=')
    {
      console.log(calculation);
      try{
        doCalculation();
      }
      catch{
        displayToScreen("Invalid input");
      }
    }else{
          addToCalc(value);
          display.innerHTML += calculation;
        }
  }//end of even trigger
}, false);//end of button listener
//function that swaps the minus and plus operator
function replaceAt(index, operator){
  let string = calculation.substring(0,index)+operator+calculation.substring(index+1);
  calculation = string;
}
//fucntion to display to the textbox
function displayToScreen(output){
  display.innerHTML=output
}
//function to add number and operators to the calculator
function addToCalc(input){
  calculation += input;
}
