//Declartion of variables
let cols = 101;
let rows = 50;
var currentRow = [];
var previousRow = [];
var color = ["white", "black"];

initalizeCells();

//Function to randomly activate cells and use this ruleset to activate the following rows 
function initalizeCells() {
    for (var i = 0; i < cols; i++) {
        currentRow[i] = [Math.floor(Math.random() * (1 - 0 + 1)) + 0];
        document.body.appendChild(cellAttributes(currentRow[i]));
    }

    document.body.appendChild(document.createElement("BR"));

    for (var j = 1; j < rows; j++) {
        previousRow = currentRow;

        for (var i = 0; i < cols; i++) {
            currentRow[i] = cellStatus(i);
            document.body.appendChild(cellAttributes(currentRow[i]));
        }

        document.body.appendChild(document.createElement("BR"));
    }

}

//Function to check if the values assigned to the cell match the ruleset or 
function cellStatus(i) {
    if (i == 0) {
        left = previousRow[previousRow.length - 1];
        middle = previousRow[i];
        right = previousRow[i + 1];
    } else if (i == cols - 1) {
        left = previousRow[i - 1];
        middle = previousRow[i];
        right = previousRow[0];
    } else {
        left = previousRow[i - 1];
        middle = previousRow[i];
        right = previousRow[i + 1];
    }

    if (left == 1 && middle == 1 && right == 1) return 0;
    else if (left == 1 && middle == 1 && right == 0) return 0;
    else if (left == 1 && middle == 0 && right == 1) return 1;
    else if (left == 1 && middle == 0 && right == 0) return 1;
    else if (left == 0 && middle == 1 && right == 1) return 1;
    else if (left == 0 && middle == 1 && right == 0) return 1;
    else if (left == 0 && middle == 0 && right == 1) return 0;
    else if (left == 0 && middle == 0 && right == 0) return 0;
}

//Funtion to assign style attributes to the cell and color, depending on active state
function cellAttributes(active) {
    let cell = document.createElement("div");
    cell.style.width = "8px";
    cell.style.height = "8px";
    cell.style.borderWidth = "1px";
    cell.style.borderStyle = "solid";
    cell.style.display = "inline-block";

    if (active == 0) {
        cell.style.backgroundColor = color[0];
    } else if (active == 1) {
        cell.style.backgroundColor = color[1];
    }

    return (cell);
}
