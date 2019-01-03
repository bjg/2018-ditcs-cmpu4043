import "./styles/styles.css";
import { Observable, of } from 'rxjs/Rx';


//Buffers for calculations
let Buffer = new Array();
let Stack = new Array();

function calculateTotalFromStack(){
    let resultScreen = document.getElementById("result");

    let total = Stack[0]
    //check for decimals
    for(let i = 1; i < Stack.length;i++){
        if(Stack[i] == "."){
            let decimalVal = parseFloat(Stack[i-1].toString() + "." + Stack[i+1].toString());
            //Replace the first digit of the decimal value with the full decimal value and remove the point and the parts after the decimal place
            Stack[i - 1] = decimalVal;
            Stack.splice(i, 2);
        }
    }

    console.log(Stack);

    for(let i = 1; i < Stack.length;i++){
        if(Stack[i] == "+"){
            
            total += Stack[i + 1];
        
            
        }
        if(Stack[i] == "/"){
            total /= Stack[i + 1];
        }
        if(Stack[i] == "-"){
            total -= Stack[i + 1];
        }
        if(Stack[i] == "X" || Stack[i] == "*" ){
            total *= Stack[i + 1];
        }
    }
    console.log(total);
    resultScreen.textContent = total;
    Stack = [];
}

function processValueFromStream(input){
    let operands = ["+","-","/","X","*","(",")",".","C","c","Enter","=","Delete"];
    let resultScreen = document.getElementById("result");
    //If Stack and Buffer are empty there has been an equals. This code stops the previous entered number staying on the screen
    if(Stack.length == 0 && Buffer.length == 0){
        resultScreen.textContent = "";
    }
    
    if(operands.includes(input)){
 
        let inputString = Buffer.join("");
        let inputNumber = parseInt(inputString);
        Stack.push(inputNumber);
        Stack.push(input);
        console.log(Stack);
        Buffer = []

        if(input =="."){
            resultScreen.textContent = inputNumber + input; 
        }
        else{
            resultScreen.textContent = input;
        }

        if(input == "C" || input == "Delete"){
            clearScreen();
        }
        if(input =="=" || input =="Enter"){
            equals();
        }
    }else{
        Buffer.push(input);
        let resultScreen = document.getElementById("result");
        resultScreen.textContent += input;
    }
}


function equals(){
    let resultScreen = document.getElementById("result");
    calculateTotalFromStack();

}

function clearScreen(){
    document.getElementById("result").innerHTML = "0";
    //empty the array
    Buffer = [];
    Stack = [];
    console.log(Buffer);
    console.log(Stack);

}

const buttons = document.getElementsByTagName("button");

const input$ = Observable.merge(
    Observable.fromEvent(buttons,'click'),
    Observable.fromEvent(document, 'keydown')
)

input$.subscribe(ev =>{
    
    if(ev.type == "click"){
        processValueFromStream(ev.target.value);
    }
    if(ev.type == "keydown"){
        let allowedKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/","Enter","C","c","Delete"];
        if(allowedKeys.includes(ev.key)){
            console.log(ev.key)
            processValueFromStream(ev.key);
        }
        
    }
})

/////////////////////////////
// Testing another approach
////////////////////////////
/*
var observable = Observable.of('1','2','+','1','2','=');

observable
.scan((outputStr,currentValue)=> {
    //Buffer.push(currentValue);
    let operands = ['+','='];
    if(operands.includes(currentValue)){
        return currentValue;
    }
    else{
        return outputStr += currentValue;
    }
},"")
.subscribe({
	next: function(value) {
      //console.log(value);
      Buffer.push(value);
  }
});


console.log(Buffer);

*/




