function insert(value) {
    if (document.getElementById("screen").value === "0") {
        document.getElementById("screen").value = ""
    }
    document.getElementById("screen").value += value
}

function clearAll() {
    document.getElementById("screen").value = "0"
}

function equals() {
    var equals = eval(document.getElementById("screen").value)
    document.getElementById("screen").value = ""
    document.getElementById("screen").value += equals
}

function plusminus() {
    document.getElementById("screen").value = document.getElementById("screen").value * -1
}

document.addEventListener('keydown', function (event) {
    if (document.getElementById("screen").value === "0") {
        document.getElementById("screen").value = ""
    }
    switch (event.keyCode) {
        case 48:
            document.getElementById("screen").value += "0";
            break;
        case 49:
            document.getElementById("screen").value += "1";
            break;
        case 50:
            document.getElementById("screen").value += "2";
            break;
        case 51:
            document.getElementById("screen").value += "3";
            break;
        case 52:
            document.getElementById("screen").value += "4";
            break;
        case 53:
            document.getElementById("screen").value += "5";
            break;
        case 54:
            document.getElementById("screen").value += "6";
            break;
        case 55:
            document.getElementById("screen").value += "7";
            break;
        case 56:
            document.getElementById("screen").value += "8";
            break;
        case 57:
            document.getElementById("screen").value += "9";
            break;
        case 106:
            document.getElementById("screen").value += "*";
            break;
        case 107:
            document.getElementById("screen").value += "+";
            break;
        case 109:
            document.getElementById("screen").value += "-";
            break;
        case 110:
            document.getElementById("screen").value += ".";
            break;
        case 111:
            document.getElementById("screen").value += "/";
            break;
        default:
            if (document.getElementById("screen").value.length > 0) {
                document.getElementById("screen").value += "";
            }
            else {
                document.getElementById("screen").value += "0";
            }
            break;
    }
});