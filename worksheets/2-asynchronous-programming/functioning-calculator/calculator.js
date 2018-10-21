var storeNumber = [];
var numDisplay = [];
var operator = [];
var displayNumber = 0;


//Display the number on the screen
function listen(clickedId) {

    var usedNumber = 0;
    var clickedCheck = parseInt(clickedId, 10);

    if (!(isNaN(clickedCheck))) {
        numDisplay.push(parseInt(clickedCheck, 10));
        for (var i = 0; i < numDisplay.length; i++) {
            usedNumber += numDisplay[i] * Math.pow(10, (numDisplay.length - (i + 1)));
        }
        displayNumber = usedNumber;
        usedNumber = 0;
        displayCurrentNum(displayNumber);
    } else {
        nonNumber(clickedId);
    }
}

//Function to display the current number 
function displayCurrentNum(num) {
    document.getElementById("screen").innerHTML = num;
}


function nonNumber(clickedId) {
    //Based on the mathemathical term BODMAS
    switch (clickedId) {
        case '-':
            operator.push(1);
            cleanUp();
            break;
        case "+":
            operator.push(2);
            cleanUp();
            break;
        case "x":
            operator.push(3);
            cleanUp();
            break;
        case "÷":
            operator.push(4);
            cleanUp();
            break;
        case "=":
            cleanUp();
            equals();
            break;
        case "c":
            displayNumber = 0;
            displayCurrentNum(displayNumber);
            clearNumDisplay();
            clearstoreNumber();
            clearOperator();
            break;
        case "(":
            break;
        case ")":
            break;
        case ".":
            break;
        default:
            break;
    }
}

//Number and operator store
function equals() {
    var answer = storeNumber[0];
    for (var i = 0; i < operator; i++) {
        switch (operator[i]) {
            case 4:
                answer /= storeNumber[i + 1];
                break;
            case 3:
                answer *= storeNumber[i + 1];
                break;
            case 2:
                answer += storeNumber[i + 1];
                break;
            case 1:
                answer -= storeNumber[i + 1];
                break;
            default:
                break;
        }

        if (typeof useOper != "string") {
            displayCurrentNum(answer);
            clearNumDisplay();
            clearstoreNumber();
            clearOperator();
            displayNumber = answer;
        }
    }
}

function cleanUp() {
    displayCurrentNum(0);
    clearNumDisplay();
    storeNumber.push(displayNumber);
    displayNumber = 0;
}

//Function to clear the number display
function clearNumDisplay() {
    while (numDisplay.length > 0) {
        numDisplay.pop();
    }
}

//Function to clear the operator
function clearOperator() {
    while (operator.length > 0) {
        operator.pop();
    }
}

//Fucntion to clear the stored numbers
function clearstoreNumber() {
    while (storeNumber.length > 0) {
        storeNumber.pop();
    }
}
