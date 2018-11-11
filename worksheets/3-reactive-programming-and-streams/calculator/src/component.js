import * as Observable from "rxjs";
import "./style.css";

function Calculator() {
    const calculator = drawCalculator();
    const container = document.createElement("div");
    container.appendChild(calculator);
    run(calculator);
    container.classList.add("container");
    return container;
}

function run(calculator) {
    //Loop through all the numeral and operator buttons, and subscribe to their onclick streams
    for(let i=1;i<19;i++) {
        let button=calculator.children[i];
        let buttonObservable = Observable.fromEvent(button, 'click');
        buttonObservable.subscribe(
            function(){
                main(button.value);
            });
    }
    //Create two different streams for the Clear button and equals button.
    let equalsButton = calculator.children[20];
    let clearButton = calculator.children[19];
    equalsButton = Observable.fromEvent(equalsButton, 'click');
    equalsButton.subscribe(
        function(){
            equals(buffer1);
        });
    clearButton = Observable.fromEvent(clearButton, 'click');
    clearButton.subscribe(
        function(){
            clearAll()
        });

    /* Create an observable for any keypresses in document
    Subscribe to the stream and call the functions based on the key pressed*/
    let keyPressed=Observable.fromEvent(document, 'keypress');
    keyPressed.subscribe(
        function(){
            let key = event.keyCode;
            console.log(key);
            if(String.fromCharCode(key) === "=")
            {
                equals(buffer1);
            }
            else if(String.fromCharCode(key) === "c" || String.fromCharCode(key) === "C")
            {
                clearAll();
            }
            else
            {
                main(String.fromCharCode(key));
            }
        });
}

function drawCalculator() {
    const outerDiv = document.createElement("div");
    outerDiv.id="outer";
    outerDiv.innerHTML=
        "\t<div id=\"screen\">\n" +
        "\t\t<h1 id=\"display\">0</h1>\n" +
        "\t</div>\n" +
        "\t\n" +
        "\t<button id=\"button1\" value=\"(\"> <p>(</p> </button>\n" +
        "\t<button id=\"button2\" value=\")\"> <p>)</p> </button>\n" +
        "\t<button id=\"button3\" value=\"+-\"> <p>±</p> </button>\n" +
        "\t<button id=\"button4\" value=\"/\"> <p>÷</p> </button>\n" +
        "\n" +
        "\t<button id=\"button5\" value=\"7\"> <p>7</p> </button>\n" +
        "\t<button id=\"button6\" value=\"8\"> <p>8</p> </button>\n" +
        "    <button id=\"button7\" value=\"9\"> <p>9</p> </button>\n" +
        "\t<button id=\"button8\" value=\"*\"> <p>x</p> </button>\n" +
        "\n" +
        "\t<button id=\"button9\" value=\"4\"> <p>4</p> </button>\n" +
        "\t<button id=\"button10\" value=\"5\"> <p>5</p> </button>\n" +
        "\t<button id=\"button11\" value=\"6\"> <p>6</p> </button>\n" +
        "\t<button id=\"button12\" value=\"-\"> <p>-</p> </button>\n" +
        "\n" +
        "\t<button id=\"button13\" value=\"1\"> <p>1</p> </button>\n" +
        "\t<button id=\"button14\" value=\"2\"> <p>2</p> </button>\n" +
        "\t<button id=\"button15\" value=\"3\"> <p>3</p> </button>\n" +
        "\t<button id=\"button16\" value=\"+\"> <p>+</p> </button>\n" +
        "\n" +
        "\t<button id=\"button17\" value=\"0\"> <p>0</p> </button>\n" +
        "\t<button id=\"button18\" value=\".\"> <p>.</p> </button>\n" +
        "\t<button id=\"button19\" value=\"clear\"> <p>C</p> </button>\n" +
        "\t<button id=\"button20\" value=\"equals\"> <p>=</p> </button>";

    return outerDiv;
}

let buffer1="";

//See which value was pressed and then add it to the buffer
function main(value)
{
    buffer1+=value;
    update(buffer1);
}

//Function to equate whats in the buffer, with a try/catch for error checking
function equals(buffer) {
    try
    {
        document.getElementById("display").innerText = eval(buffer);
        buffer1=eval(buffer);
    }
    catch(err){
        document.getElementById("display").innerHTML = "0";
        buffer1="";
    }
}

//Update the screen HTML with the buffer data
function update(buffer) {
    document.getElementById("display").innerHTML = buffer;
}

//Clear the buffer
function clearAll() {
    buffer1="";
    document.getElementById("display").innerHTML = "0";
}

export default Calculator;
