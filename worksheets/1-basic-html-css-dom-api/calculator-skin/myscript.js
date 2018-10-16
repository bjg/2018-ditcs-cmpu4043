let Buffer = new Array();
let numOne = 0;
let numTwo = 0;
let operand = "";
let RUNNING_TOTAL = 0;

//NOTE: Limit array to 9 digit
//USE A STACK?????

function calculateNumberFromBuffer(){
    var total = 0;
    var power = 1; //decimal
    for(i = Buffer.length -1; i >= 0;i--){
        //console.log(Buffer[i]);
        //console.log("Power: " + power);
        total += Buffer[i] * power;        
        power = power * 10;    
    }
    //reset Buffer
    Buffer = []
    console.log(total);
    return total;
}

function getInputNumbers(objButton){
    Buffer.push(objButton.value);
    let resultScreen = document.getElementById("result");
    resultScreen.textContent += objButton.value;
}


function handleOperand(objButton){
    let resultScreen = document.getElementById("result");
    operand = objButton.value;
    console.log(operand);
    resultScreen.textContent = operand;
    numOne = calculateNumberFromBuffer();
    
}


function equals(){
    let resultScreen = document.getElementById("result");

    numTwo = calculateNumberFromBuffer();
    switch(operand){
        case'+':
            RUNNING_TOTAL = numOne + numTwo;
            break;
        case'-':
            RUNNING_TOTAL = numOne - numTwo;
            break;
        case'/':
            RUNNING_TOTAL = numOne / numTwo;
            break;
        case'X':
            RUNNING_TOTAL = numOne * numTwo;
            break;
    }

    resultScreen.textContent = RUNNING_TOTAL;
    console.log(RUNNING_TOTAL);
    //reset total
    RUNNING_TOTAL = 0;
}


function handleKeyOperand(objButton){
    console.log(objButton.value);
}


function clearScreen(){
    document.getElementById("result").innerHTML = "0";
    //empty the array
    Buffer = [];
    console.log(Buffer);
}



