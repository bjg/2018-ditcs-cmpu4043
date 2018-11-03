//import Calculator from "./components/Calculator/Calculator";
import "./style.css";
import { fromEvent, merge, pipe, subscribe } from "rxjs";
import { mapTo, scan, startWith } from "rxjs/operators";
//document.querySelector("#calculator").appendChild(Calculator({initialValue:0}));

var display = document.getElementById('display');
//Numbers
const numbut0 = document.getElementById('0');
const numbut1 = document.getElementById('1');
const numbut2 = document.getElementById('2');
const numbut3 = document.getElementById('3');
const numbut4 = document.getElementById('4');
const numbut5 = document.getElementById('5');
const numbut6 = document.getElementById('6');
const numbut7 = document.getElementById('7');
const numbut8 = document.getElementById('8');
const numbut9 = document.getElementById('9');
const devbut = document.getElementById('dec');
//Operators
const lbracket = document.getElementById('lb');
const rbracket = document.getElementById('rb');
const neg = document.getElementById('neg');
const div = document.getElementById('divi');
const mult = document.getElementById('mult');
const sub = document.getElementById('sub');
const add = document.getElementById('add');
const eq = document.getElementById('eq');
const clr = document.getElementById('clr');

//This will show if the number has been negated or not
let n = 1 ;

function negatory()
{
	var nd;
	if(n === 1)
	{
		nd = display.value = '-' + display.value;
		n = 0 ;
	}
	else
	{
		nd = display.value = display.value.substring(1);
		n = 1 ;		
	}
	display.value = "";
	return nd;
}

function equals()
{
	let result = 0;
	var displayval;
	displayval = document.getElementById('display').value;
	if(displayval.charAt(0) == '0')
	{
		displayval = displayval.substring(1);
	}
	console.log((displayval));
	result = eval(displayval);
	display.value = "";
	return result;
}

function run(display, numbut0, numbut1, numbut2, numbut3, numbut4, numbut5, numbut6, numbut7, numbut8, numbut9, devbut, lbracket, rbracket, neg, div, mult, sub, add, eq, clr) 
{
	if(display.value.charAt(0) == '0')
	{
		display.value = display.value.substring(1);
	}
    merge(
    	//Numbers
    	fromEvent(numbut0, "click").pipe(mapTo(counter => ({ value: counter.value += "0" }))),
        fromEvent(numbut1, "click").pipe(mapTo(counter => ({ value: counter.value += "1" }))),
        fromEvent(numbut2, "click").pipe(mapTo(counter => ({ value: counter.value += "2" }))),
        fromEvent(numbut3, "click").pipe(mapTo(counter => ({ value: counter.value += "3" }))),
        fromEvent(numbut4, "click").pipe(mapTo(counter => ({ value: counter.value += "4" }))),
        fromEvent(numbut5, "click").pipe(mapTo(counter => ({ value: counter.value += "5" }))),
        fromEvent(numbut6, "click").pipe(mapTo(counter => ({ value: counter.value += "6" }))),
        fromEvent(numbut7, "click").pipe(mapTo(counter => ({ value: counter.value += "7" }))),
        fromEvent(numbut8, "click").pipe(mapTo(counter => ({ value: counter.value += "8" }))),
        fromEvent(numbut9, "click").pipe(mapTo(counter => ({ value: counter.value += "9" }))),
        fromEvent(devbut, "click").pipe(mapTo(counter => ({ value: counter.value += "." }))),
        //Operators
        fromEvent(lbracket, "click").pipe(mapTo(counter => ({ value: counter.value += "(" }))),
        fromEvent(rbracket, "click").pipe(mapTo(counter => ({ value: counter.value += ")" }))),
        fromEvent(neg, "click").pipe(mapTo(counter => ({ value: counter.value = negatory()}))),
        fromEvent(div, "click").pipe(mapTo(counter => ({ value: counter.value += "/" }))),
        fromEvent(mult, "click").pipe(mapTo(counter => ({ value: counter.value += "*" }))),
        fromEvent(sub, "click").pipe(mapTo(counter => ({ value: counter.value += "-" }))),
        fromEvent(add, "click").pipe(mapTo(counter => ({ value: counter.value += "+" }))),
        fromEvent(eq, "click").pipe(mapTo(counter => ({ value:  counter.value = equals() }))),
        fromEvent(clr, "click").pipe(mapTo(counter => ({ value: display.value = ""}))),
    )
        .pipe(
            startWith({ value: Number(display.value) }),
            scan((acc, update) => update(acc))
        )
        .subscribe(counter => {
            display.value += counter.value;
            counter.value = "";
        });
}
run(display, numbut0, numbut1, numbut2, numbut3, numbut4, numbut5, numbut6, numbut7, numbut8, numbut9, devbut, lbracket, rbracket, neg, div, mult, sub, add, eq, clr)