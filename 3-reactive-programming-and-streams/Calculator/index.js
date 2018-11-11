//import Counter from "./components/Counter/Counter";
import "./style.css";
import { fromEvent, merge, pipe, subscribe } from "rxjs";
import { mapTo, scan, startWith } from "rxjs/operators";
import { Observable } from 'rxjs/Rx';
//import "./Counter.css";

const numbers = document.getElementById('btnResult');


//document.querySelector("#app").appendChild(Counter({initialValue:0}));

// NUMBER FIRST ///////////////////////////////////////////////////

//Get Button 0 working
const Btn0 = Observable.fromEvent(document.getElementById('0'), 'click')
Btn0.subscribe(e => {numbers.innerHTML += "0"} );

//Get Button 1 working
const Btn1 = Observable.fromEvent(document.getElementById("1"), 'click')
Btn1.subscribe(e => {numbers.innerHTML += "1"} );

//Get Button 2 working
const Btn2 = Observable.fromEvent(document.getElementById('2'), 'click')
Btn2.subscribe(e => {numbers.innerHTML += 2} );

//Get Button 3 working
const Btn3 = Observable.fromEvent(document.getElementById('3'), 'click')
Btn3.subscribe(e => {numbers.innerHTML += "3"} );

//Get Button 4 working
const Btn4 = Observable.fromEvent(document.getElementById('4'), 'click')
Btn4.subscribe(e => {numbers.innerHTML += "4"} );

//Get Button 5 working
const Btn5 = Observable.fromEvent(document.getElementById('5'), 'click')
Btn5.subscribe(e => {numbers.innerHTML += "5"} );

//Get Button 6 working
const Btn6 = Observable.fromEvent(document.getElementById('6'), 'click')
Btn6.subscribe(e => {numbers.innerHTML += "6"} );

//Get Button 7 working
const Btn7 = Observable.fromEvent(document.getElementById('7'), 'click')
Btn7.subscribe(e => {numbers.innerHTML += "7"} );

//Get Button 8 working
const Btn8 = Observable.fromEvent(document.getElementById('8'), 'click')
Btn8.subscribe(e => {numbers.innerHTML += "8"} );

//Get Button 9 working
const Btn9 = Observable.fromEvent(document.getElementById('9'), 'click')
Btn9.subscribe(e => {numbers.innerHTML += "9"} );

// GET FUNCTIONS WORKING /////////////////////////////////////////////////////

//Dot Function
const BtnDot = Observable.fromEvent(document.getElementById('.'), 'click')
BtnDot.subscribe(e => {numbers.innerHTML += "."} );

//Open Brack Function
const BtnOB = Observable.fromEvent(document.getElementById('('), 'click')
BtnOB.subscribe(e => {numbers.innerHTML += "("} );

//Close Brack Function
const BtnCB = Observable.fromEvent(document.getElementById(')'), 'click')
BtnCB.subscribe(e => {numbers.innerHTML += ")"} );

//CLEAR Function
const BtnClear = Observable.fromEvent(document.getElementById('C'), 'click')
BtnClear.subscribe(e => {numbers.innerHTML = ""} );

//PlusMinus Function
const BtnPlusMinus = Observable.fromEvent(document.getElementById('±'), 'click')
BtnPlusMinus.subscribe(e => {numbers.innerHTML = numbers.innerHTML * - 1} );

operators();
//GET OPERATORS WORKING //////////////////////////////////////////////////////////////

function operators()
{
	var firstNum = 0;
	var secNum = 0;
	
	var operator = "";
	
	var newFirstNum = 0;
	var newSecNum = 0;
	
	//Plus Function
	const BtnPlus = Observable.fromEvent(document.getElementById('+'), 'click')
	if(firstNum == 0)
	{
		//Store number and reset screen
		BtnPlus.subscribe(e => {firstNum = numbers.innerHTML} );
		BtnPlus.subscribe(e => {numbers.innerHTML = ""} ); // Reset Number on screen
		
		//Label with Operator
		BtnPlus.subscribe(e => {operator = "add"} );
		BtnPlus.subscribe(e => console.log("OP is " + operator) );
		
	}

	//Minus Function
	const BtnMinus = Observable.fromEvent(document.getElementById('-'), 'click')
	if(firstNum == 0)
	{
		//Store number and reset screen
		BtnMinus.subscribe(e => {firstNum = numbers.innerHTML} );
		BtnMinus.subscribe(e => {numbers.innerHTML = ""} ); // Reset Number on screen
		
		//Label with Operator
		BtnMinus.subscribe(e => {operator = "minus"} );
		BtnMinus.subscribe(e => console.log("OP is " + operator) );
	}

	//Multiply Function
	const BtnMult = Observable.fromEvent(document.getElementById('x'), 'click')
	if(firstNum == 0)
	{
		//Store number and reset screen
		BtnMult.subscribe(e => {firstNum = numbers.innerHTML} );
		BtnMult.subscribe(e => {numbers.innerHTML = ""} ); // Reset Number on screen
		
		//Label with Operator
		BtnMult.subscribe(e => {operator = "mult"} );
		BtnMult.subscribe(e => console.log("OP is " + operator) );
	}

	//Divide Function
	const BtnDivide = Observable.fromEvent(document.getElementById('÷'), 'click')
	if(firstNum == 0)
	{
		//Store number and reset screen
		BtnDivide.subscribe(e => {firstNum = numbers.innerHTML} );
		BtnDivide.subscribe(e => {numbers.innerHTML = ""} ); // Reset Number on screen
		
		//Label with Operator
		BtnDivide.subscribe(e => {operator = "div"} );
		BtnDivide.subscribe(e => console.log("OP is " + operator) );
	}

	//Equals Function
	const BtnEquals = Observable.fromEvent(document.getElementById('='), 'click')
	BtnEquals.subscribe(e => console.log("=") );
	
	BtnEquals.subscribe(e => {
		if(operator == "add")
		{
			secNum = numbers.innerHTML;
			
			//Parse String to Numbers
			newFirstNum = parseFloat(firstNum);
			newSecNum = parseFloat(secNum);
			
			
			console.log("NEWfirst = " + newFirstNum);
			console.log("NEWsec = " + newSecNum);
			
			numbers.innerHTML = newFirstNum + newSecNum;
			console.log("Answer :  " + numbers.innerHTML);
			
		}
		
		if(operator == "minus")
		{
			secNum = numbers.innerHTML;
			
			//Parse String to Numbers
			newFirstNum = parseFloat(firstNum);
			newSecNum = parseFloat(secNum);
			
			
			console.log("NEWfirst = " + newFirstNum);
			console.log("NEWsec = " + newSecNum);
			
			numbers.innerHTML = newFirstNum - newSecNum;
			console.log("Answer :  " + numbers.innerHTML);
		}
		
		if(operator == "mult")
		{
			secNum = numbers.innerHTML;
			
			//Parse String to Numbers
			newFirstNum = parseFloat(firstNum);
			newSecNum = parseFloat(secNum);
			
			
			console.log("NEWfirst = " + newFirstNum);
			console.log("NEWsec = " + newSecNum);
			
			numbers.innerHTML = newFirstNum * newSecNum;
			console.log("Answer :  " + numbers.innerHTML);
		}
		
		if(operator == "div")
		{
			secNum = numbers.innerHTML;
			
			//Parse String to Numbers
			newFirstNum = parseFloat(firstNum);
			newSecNum = parseFloat(secNum);
			
			
			console.log("NEWfirst = " + newFirstNum);
			console.log("NEWsec = " + newSecNum);
			
			numbers.innerHTML = newFirstNum / newSecNum;
			console.log("Answer :  " + numbers.innerHTML);
		}
		
	});
	
	
	

} //Operator func Ends


