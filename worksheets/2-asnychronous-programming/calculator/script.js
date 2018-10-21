let buffer1="";

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

function main(value)
{
    buffer1+=value;
    update(buffer1);
}

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

function update(buffer)
{
    document.getElementById("display").innerHTML = buffer;
    document.getElementById("console").innerText="";
}

function clearAll()
{
    buffer1="";
    document.getElementById("display").innerHTML = "0";
}