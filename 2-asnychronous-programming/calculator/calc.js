
document.getElementById("0").addEventListener("click", btnZero);
document.getElementById("1").addEventListener("click", btnOne);
document.getElementById("2").addEventListener("click", btnTwo);
document.getElementById("3").addEventListener("click", btnThree);
document.getElementById("4").addEventListener("click", btnFour);
document.getElementById("5").addEventListener("click", btnFive);
document.getElementById("6").addEventListener("click", btnSix);
document.getElementById("7").addEventListener("click", btnSeven);
document.getElementById("8").addEventListener("click", btnEight);
document.getElementById("9").addEventListener("click", btnNine);

document.getElementById(".").addEventListener("click", dot);
document.getElementById("C").addEventListener("click", clear);
document.getElementById("±").addEventListener("click", plusMinus);
document.getElementById("(").addEventListener("click", openBrack);
document.getElementById(")").addEventListener("click", closeBrack);

document.getElementById("+").addEventListener("click", addition);
document.getElementById("-").addEventListener("click", subtract);
document.getElementById("x").addEventListener("click", multiply);
document.getElementById("÷").addEventListener("click", divide);
document.getElementById("=").addEventListener("click", equals);

// Variables Listed Here:
var number =0;
var firstNum = 0;
var secNum = 0;
var total = 0;
var operator;

//Displays number
btnResult.innerHTML = number;

// Button Mechanics Section
function btnZero()
{
  number += this.getAttribute("data-num");
  btnResult.innerHTML = number;
}

function btnOne()
{
  number += this.getAttribute("data-num"); //Attatches to string
  btnResult.innerHTML = number;
}

function btnTwo()
{
  number += this.getAttribute("data-num"); //Attatches to string
  btnResult.innerHTML = number;
}

function btnThree()
{
  number += this.getAttribute("data-num"); //Attatches to string
  btnResult.innerHTML = number;
}

function btnFour()
{
  number += this.getAttribute("data-num"); //Attatches to string
  btnResult.innerHTML = number;
}

function btnFive()
{
  number += this.getAttribute("data-num"); //Attatches to string
  btnResult.innerHTML = number;
}

function btnSix()
{
  number += this.getAttribute("data-num"); //Attatches to string
  btnResult.innerHTML = number;
}

function btnSeven()
{
  number += this.getAttribute("data-num"); //Attatches to string
  btnResult.innerHTML = number;
}

function btnEight()
{
  number += this.getAttribute("data-num");
  btnResult.innerHTML = number;
}

function btnNine()
{
  number += this.getAttribute("data-num");
  btnResult.innerHTML = number;
}

//Operator Section
function plusMinus()
{
  number = number * -1;
  btnResult.innerHTML = number;
}

function openBrack()
{
  number += this.getAttribute("data-num");
  btnResult.innerHTML = number;
}

function closeBrack()
{
  number += this.getAttribute("data-num");
  btnResult.innerHTML = number;
}

function dot()
{
  number += this.getAttribute("data-num"); //Attatches to string
  btnResult.innerHTML = number;
}

// These parts are divided into a SWITCH statement later
function divide()
{
  operator = this.getAttribute("data-op");
  //Store first number on click
  if(firstNum === 0)
    {
      firstNum = number;
      number = 0;
    }
  else
  {
    secNum = equals();
    secNum = 0;
    number = 0;
  }
}

function addition()
{
  operator = this.getAttribute("data-op");
  //Store first number on click
  if(firstNum === 0)
    {
      firstNum = number;
      number = 0;
    }
  else
  {
    secNum = equals();
    secNum = 0;
    number = 0;
  }
}

function multiply()
{
  operator = this.getAttribute("data-op");
  
  //Store first number on click
  if(firstNum === 0)
    {
      firstNum = number;
      console.log("Fir is: " + firstNum);
      number = 0;
    }
  else
  {
    secNum = equals();
    //console.log("Sec is: " + secNum);
    secNum = 0;
    number = 0;
  }
}

function subtract()
{
  operator = this.getAttribute("data-op");
  
  //Store first number on click
  if(firstNum === 0)
    {
      firstNum = number;
      console.log("Fir is: " + firstNum);
      number = 0;
    }
  else
  {
    secNum = equals();
    //console.log("Sec is: " + secNum);
    secNum = 0;
    number = 0;
  }
  
}

//Final Section
function equals()
{
    //Last button pressed is stored
    secNum = number;
  
    console.log("Sec is: " + secNum);
  
    // Convert string input to numbers
    firstNum = parseFloat(firstNum);
    secNum = parseFloat(secNum);
  
  
    //Switch statement needed
    switch (operator)
    {
      case "add":
        firstNum += secNum;
        break;

      case "sub":
        firstNum -= secNum;
        break;
      
      case "mult":
        firstNum *= secNum;
        break;
        
      case "div":
        firstNum /= secNum;
        break;
    }
    
    console.log("Total is: " + firstNum);
    btnResult.innerHTML = firstNum;
    
    //Reset numbers 
    firstNum = 0;
    secNum = 0;
    number = 0;
    total = 0;
  
}

function clear()
{
   //Reset numbers so next calculation is clear
    firstNum = 0;
    secNum = 0;
    number = 0;
    total = 0;
    btnResult.innerHTML = 0;
}
  

