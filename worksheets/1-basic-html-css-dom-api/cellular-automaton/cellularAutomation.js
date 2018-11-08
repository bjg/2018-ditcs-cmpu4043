var totalCols = 102;
var totalRows = 51;

var initialised = [];

for (var i = 0; i < totalRows; i++) {
    // creating array of arrays, i.e. 2d array to hold the state of each cell
    initialised[i] = [];
    for (var j = 0; j < totalCols; j++) {
        if (i == 0) {
            // randomly assigning the state of each cell in first row
            initialised[i][j] = getRandomInt(2);
        }
        else {
            // calling method containing rules for assigning states of all other cells
            initialiseChildCells(i, j);
        }
        // calling method to create and add style to DOM elements
        createCells(i, j);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function initialiseChildCells(row, col) {
    // assigning names up, left, middle and right to cells to make code more readable
    var up = row-1;
    var middle = col;
    if (col == 0) {
        var left = totalCols-1;
        var right = col+1;
    }
    else if (col == totalCols-1) {
        var left = col-1;
        var right = 0;
    }
    else {
        var left = col-1;
        var right = col+1;
    }

    if (initialised[up][left] == 1 && initialised[up][middle] == 1 && initialised[up][right] == 1) {
            initialised[row][col] = 0;
    }
    else if (initialised[up][left] == 1 && initialised[up][middle] == 1 && initialised[up][right] == 0) {
        initialised[row][col] = 0;
    }
    else if (initialised[up][left] == 1 && initialised[up][middle] == 0 && initialised[up][right] == 1) {
        initialised[row][col] = 1;
    }
    else if (initialised[up][left] == 1 && initialised[up][middle] == 0 && initialised[up][right] == 0) {
        initialised[row][col] = 1;
    }
    else if (initialised[up][left] == 0 && initialised[up][middle] == 1 && initialised[up][right] == 1) {
        initialised[row][col] = 1;
    }
    else if (initialised[up][left] == 0 && initialised[up][middle] == 1 && initialised[up][right] == 0) {
        initialised[row][col] = 1;
    }
    else if (initialised[up][left] == 0 && initialised[up][middle] == 0 && initialised[up][right] == 1) {
        initialised[row][col] = 0;
    }
    else if (initialised[up][left] == 0 && initialised[up][middle] == 0 && initialised[up][right] == 0) {
        initialised[row][col] = 0;
    }
}

function createCells(row, col) {
    var cell = document.createElement('div');
    cell.style.width='8px';
    cell.style.height='8px';
    cell.style.border='1px solid Black';
    // inactive cells set to white
    if (initialised[row][col] === 0) {
        cell.style.backgroundColor="White";
    }
    // active cells set to black
    else {
        cell.style.backgroundColor="Black";
    }

    if (col != totalCols - 1) {
        cell.style.cssFloat="left";
    }
    else {
        cell.style.display="block";
    }
    document.body.appendChild(cell);
}