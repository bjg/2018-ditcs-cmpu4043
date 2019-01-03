/*
I Did not get the brackets implemented
*/

let Buffer = new Array();
let Stack = new Array();

function calculateTotalFromStack(){
    let resultScreen = document.getElementById("result");

    let total = Stack[0];

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

function getInputClick(input){
    let resultScreen = document.getElementById("result");

    //If Stack and Buffer are empty there has been an equals. This code stops the previous entered number staying on the screen
    if(Stack.length == 0 && Buffer.length == 0){
        resultScreen.textContent = "";
    }
    
    if(input.value == "+" ||input.value == "-" || input.value == "/" || input.value == "X"  || input.value == "(" || input.value == ")" || input.value =="=" || input.value =="."){
        console.log("operand");
 
        let inputString = Buffer.join("");
        let inputNumber = parseInt(inputString);
        Stack.push(inputNumber);
        Stack.push(input.value);
        console.log(Stack);
        Buffer = []

        

        if(input.value =="."){
            resultScreen.textContent = inputNumber + input.value; 
        }
        else{
            resultScreen.textContent = input.value;
        }

        if(input.value =="="){
            equals();
        }

    }else{
        Buffer.push(input.value);
        let resultScreen = document.getElementById("result");
        resultScreen.textContent += input.value;
    }
}

window.onkeypress = function(e) {
    let resultScreen = document.getElementById("result");
    
    //ensure its a number
    if(e.keyCode >= 48 && e.keyCode <=57) { 
        //If Stack and Buffer are empty there has been an equals. This code stops the previous entered number staying on the screen
        if(Stack.length == 0 && Buffer.length == 0){
            resultScreen.textContent = "";
        }
        var i = String.fromCharCode(e.keyCode);
        handleKeyInput(parseInt(i));
        
    }
    /*
        check the operand. 
        Ascii 
        / is 47:  
        + is 43: 
        - is 45: 
        * is 42 
        . is 46
    */
    if(e.keyCode == 47 || e.keyCode == 43 || e.keyCode == 45||e.keyCode == 42 || e.keyCode == 13 ||e.keyCode == 46){
        var operand = String.fromCharCode(e.keyCode);
        resultScreen.textContent = operand;

        let inputString = Buffer.join("");
        let inputNumber = parseInt(inputString);
        Stack.push(inputNumber);
        Stack.push(operand);
        console.log(Stack);
        Buffer = []

        if(e.keyCode == 46){
            resultScreen.textContent = inputNumber + "."; 
        }
        else{
            resultScreen.textContent = operand;
        }

        if(e.keyCode == 13){
            // enter key or equals
            equals();
        }

    }
    // delete or c to clear screen
    if(e.keyCode == 99 || e.keyCode == 127){
        clearScreen();
    }
}


function handleKeyInput(val){
    Buffer.push(val);
    let resultScreen = document.getElementById("result");
    resultScreen.textContent += val;
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
}








