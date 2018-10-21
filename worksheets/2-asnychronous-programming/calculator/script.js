let buffer1="";

//Add a listener to get keyboard inputs
document.addEventListener('keypress', function(event)
{
    let key = event.keyCode;
    console.log(key);
    if(String.fromCharCode(key) == "=")
    {
        equals(buffer1);
    }
    else if(String.fromCharCode(key) == "c" || String.fromCharCode(key) == "C")
    {
        clearAll();
    }
    else
    {
        main(String.fromCharCode(key));
    }
});

//See which value was pressed and then add it to the buffer
function main(value)
{
    buffer1+=value;
    update(buffer1);
}

//Function to equate whats in the buffer, with a try/catch for error checking
function equals(buffer)
{
    try
    {
        document.getElementById("display").innerText = eval(buffer);
        buffer1=eval(buffer);
    }
    catch(err){
        document.getElementById("console").innerText+=err.toString();
        document.getElementById("display").innerHTML = "0";
        buffer1="";
    }
}

//Update the screen HTML with the buffer data
function update(buffer)
{
    document.getElementById("display").innerHTML = buffer;
    document.getElementById("console").innerText="";
}

//Clear the buffer
function clearAll()
{
    buffer1="";
    document.getElementById("display").innerHTML = "0";
}