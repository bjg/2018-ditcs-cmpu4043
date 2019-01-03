import Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { mapTo } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/operators';
import { mergeAll } from 'rxjs/operators';

var btns = document.getElementsByClassName("column");

var y;
var i;
var thisnum =0;
var result = 0;
var input = [];
var outputs = [];
var opencount = 0;
var closecount = 0;

//creating an observable from the calculator buttons
//and mapping the click events to a variable which then maps their innerHTML/textContext
//then merges the button events with keyboard events
const stream$ = Observable.from(btns)
	.map(btns => Observable.fromEvent(btns, 'click')
		.mapTo(btns.textContent))
	.mergeAll()
	.merge(Observable.fromEvent(document, 'keypress')
		.pluck('key'));

//subscribing to the button events and running the correct functions based on their values
stream$.subscribe(key => {
	 if (/\d/.test(key)) {
		y = key;
		numberPush(y);
	} else if ( key === '.'){
		decimal();
	} else if (key === 'C' || key ==='c') {
		clearView();
	} else if (key === '(' ) {
		openbracket();
	} else if(key === ')') {
		closebracket();
	} else if (key === '±' ) {
		plusorminus();
	} else {
		if (key === '+') {
			add();
		} else if (key === '-') {
			subtract();
		} else if (key === 'x' || key === '*') {
			multiply();
		} else if (key === '÷' || key === '/') {
			divide();
		} else  if (key === '=') {
			equals();
		}
	 }
});

function printToView(){
	var view = document.getElementById("view");
	view.innerHTML = null;
	for(var i =0; i<outputs.length ; i++){
		view.innerHTML += outputs[i];
	}
}

function clearView(){
	input.length = 0;
	outputs.length = 0;
	thisnum = 0;
	document.getElementById("view").innerHTML = "0";
}

function numberPush(y){
	outputs.push(y);
	thisnum += y;
	console.log(thisnum);
	console.log(outputs);
	printToView();
}

function decimal(){
	y = ".";
	var counter = 0;
	for(i=0;i<thisnum.length;i++){
		if(thisnum[i] == "."){
			counter = 1;
		}
	}
	if(outputs[outputs.length-1] == '.'){
		 outputs[outputs.length-1] = y;
	}
	else{
		if(counter == 0){
			outputs.push(y);
			thisnum += y;
			printToView();
		}
	}
}

function openbracket(){
	y = "(";
	opencount++;
	if(outputs[outputs.length-1] == '+' || outputs[outputs.length-1] == '-' ||  outputs[ outputs.length-1] =='x' ||  outputs[ outputs.length-1] == '%' ||  outputs[ outputs.length-1] == "±"){
		outputs[outputs.length-1] = "x";
		outputs.push(y);
		input[input.length-1] = "x";
		input.push(y);
		printToView();
	}
	else{
		outputs.push('x');
		outputs.push(y);
		input.push(parseFloat(thisnum));
		input.push('x');
		input.push(y);
		thisnum = 0;
		printToView();
	}
}

function closebracket(){
	y = ")";
	closecount++;
	outputs.push(y);
	input.push(parseFloat(thisnum));
	input.push(y);
	printToView();
}

function divide(){
	y = "%";
	operand(y);
}

function multiply(){
	y = "x";
	operand(y);
}

function add(){
	y = "+";
	operand(y);
}

function subtract(){
	y = "-";
	operand(y);
}	

function plusorminus(){
	y = "±";
	if(outputs[outputs.length-2] == '+'){
		outputs[outputs.length-2] = '-';
		input[input.length-2] = '-';
		console.log(outputs[outputs.length-2]);
		console.log(input[input.length-2]);
		printToView();
	}
	else if(outputs[outputs.length-2] == '-'){
		outputs[outputs.length-2] = '+';
		input[input.length-2] = '+';
		console.log(outputs[outputs.length-2]);
		console.log(input[input.length-2]);
		printToView();
	}
}

function operand(y){
	if( outputs[ outputs.length-1] == '+' ||  outputs[ outputs.length-1] == '-' ||  outputs[ outputs.length-1] =='x' ||  outputs[ outputs.length-1] == '%'){
		outputs[outputs.length-1] = y;
		input[input.length-1] = y;
		printToView();
	}else{
		outputs.push(y);
		//operators.push(y);
		input.push(parseFloat(thisnum));
		input.push(y);
		thisnum = 0;
		printToView();
	}
}
			
function equals(){
	if( outputs[ outputs.length-1] == '+' ||  outputs[ outputs.length-1] == '-' ||  outputs[ outputs.length-1] =='x' ||  outputs[ outputs.length-1] == '%' ||  outputs[ outputs.length-1] == "±"){
		outputs.length =  outputs.length-1;
		printToView();
		result=getResult(input);
	}else{
		input.push(parseFloat(thisnum));
		result = getResult(input);
		outputs.length = 0;
		input.length = 0;
		thisnum = result;
		outputs.push(result);
		printToView();
	}
}

function getResult(sumarray){
	console.log(sumarray);
	var priority = 1;
	while(priority!=4){
		//console.log(input.length);
		for(i=0;i<sumarray.length;i++){
			console.log(i + ":" + sumarray[i]);
			if(sumarray[i] == 'x' && priority==2){
				sumarray[i] = sumarray[i-1] * sumarray[i+1];
				//console.log(sumarray[i]);
				sumarray.splice(i-1,1);
				sumarray.splice(i,1);
				break;
			}
			if(sumarray[i] == '%' && priority==2){
				sumarray[i] = sumarray[i-1] / sumarray[i+1];
				//console.log(sumarray[i]);
				sumarray.splice(i-1,1);
				sumarray.splice(i,1);
				break;
			}
			if(sumarray[i] == '+' && priority==3){
				sumarray[i] = sumarray[i-1] + sumarray[i+1];
				//console.log(sumarray[i]);
				sumarray.splice(i-1,1);
				sumarray.splice(i,1);
				break;
			}
			if(sumarray[i] == '-' && priority==3){
				sumarray[i] = sumarray[i-1] - sumarray[i+1];
				//console.log(sumarray[i]);
				sumarray.splice(i-1,1);
				sumarray.splice(i,1);
				break;
			}
			if(sumarray[i] == "(" && priority==1){
				var x=i+1;
				var brarray = [];
				while(sumarray[x]!=')'){
					//console.log(brarray[x]);
					brarray.push(sumarray[x]);
					sumarray.splice(x,1);
					
				}
				result = getResult(brarray);
				sumarray[x] = result;
				sumarray.splice(x-1,1);
				console.log(sumarray)
				break;
			}
			if(sumarray.length-1 == i){
				priority++;
			}
		}
	}
	return sumarray[0];
}
	/*Observable.fromEvent(document.getElementById("1"), 'click')
		.subscribe(e => {
			console.log('1');
	});
	Observable.fromEvent(document.getElementById("6"), 'click')
		.subscribe(e => {
			console.log('1');
	});
	Observable.fromEvent(document.getElementById("1"), 'click')
		.subscribe(e => {
			console.log('1');
	});
	Observable.fromEvent(document.getElementById("1"), 'click')
		.subscribe(e => {
			console.log('1');
	});
	Observable.fromEvent(document.getElementById("1"), 'click')
		.subscribe(e => {
			console.log('1');
	});
	Observable.fromEvent(document.getElementById("1"), 'click')
		.subscribe(e => {
			console.log('1');
	});
}

/*var thisnum =0;
var input = [];
var outputs = [];
var result = 0;
var opencount = 0;
var closecount = 0;

function plusorminus(){
	y = "±";
	if(outputs[outputs.length-2] == '+'){
		outputs[outputs.length-2] = '-';
		input[input.length-2] = '-';
		console.log(outputs[outputs.length-2]);
		console.log(input[input.length-2]);
		printToView();
	}
	else if(outputs[outputs.length-2] == '-'){
		outputs[outputs.length-2] = '+';
		input[input.length-2] = '+';
		console.log(outputs[outputs.length-2]);
		console.log(input[input.length-2]);
		printToView();
	}
}
}*/
	  
export default initFunction;