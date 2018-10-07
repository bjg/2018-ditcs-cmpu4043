//initialise page style
document.body.style.width  = "808px";
document.body.style.height  = "400px";


//declare variables
let cells = [];
var numberOfRows = 50;
var numberOfCols = 101;


CreateRowsAndColsOfCells(numberOfCols,numberOfRows);

//control first row(random) and calls functions to create a cell
function CreateRowsAndColsOfCells(){

  for (let i = 0; i < numberOfRows; i++) {
      cells.push([0])
      for (let j = 0; j < numberOfCols; j++) {
          cells[i][j] = 0;
      }
  }


  for (let i = 0; i < numberOfCols; i++) {
      cells[0][i] = Math.round((Math.random()));
      generateCell(cells[0][i]);
  }

  for (let i = 1; i < numberOfRows; i++) {
      for (let j = 0; j < numberOfCols; j++) {
          cells[i][j] = checkAncestor(i, j);
          generateCell(cells[i][j]);
      }
  }

}


//create rows of cells using div
function generateCell(active) {
  let cell = document.createElement("div");

	cell.style.width = "8px";
	cell.style.height = "8px";

  //cell.style.border = '1px solid';
  //cell.style.display = 'inline-block';

  cell.style.float = "left";

	if (active == 1) {
		cell.style.background = "blue";
	}
	else {
		cell.style.background = "pink";
	}

	document.body.appendChild(cell);
}

function checkAncestor(row, col) {
    var leftCell, rightCell;
    var mid = col;
    var ancestorRow = row-1;

    var ruleSet = 0;


    if (col==0) {
        leftCell = numberOfCols-1;
        rightCell = col + 1;
    }
    else if (col==numberOfCols-1) {
        rightCell = 0;
        leftCell = col - 1;
    }
    else {
        rightCell = col + 1;
        leftCell = col - 1;
    }

    //Wolfram's Rule 60[0,0,1,1,1,1,0,0]
    //Rule 60 is one of the eight additive elementary cellular automata

    if (cells[ancestorRow][leftCell]==1 && cells[ancestorRow][mid]==1 && cells[ancestorRow][rightCell]==1) {
        ruleSet = 0;
    }
    else if (cells[ancestorRow][leftCell]==1 && cells[ancestorRow][mid]==1 && cells[ancestorRow][rightCell]==0) {
        ruleSet = 0;
    }
    else if (cells[ancestorRow][leftCell]==1 && cells[ancestorRow][mid]==0 && cells[ancestorRow][rightCell]==1) {
        ruleSet = 1;
    }
    else if (cells[ancestorRow][leftCell]==1 && cells[ancestorRow][mid]==0 && cells[ancestorRow][rightCell]==0) {
        ruleSet = 1;
    }
    else if (cells[ancestorRow][leftCell]==0 && cells[ancestorRow][mid]==1 && cells[ancestorRow][rightCell]==1) {
        ruleSet = 1;
    }
    else if (cells[ancestorRow][leftCell]==0 && cells[ancestorRow][mid]==1 && cells[ancestorRow][rightCell]==0) {
        ruleSet = 1;
    }
    else if (cells[ancestorRow][leftCell]==0 && cells[ancestorRow][mid]==0 && cells[ancestorRow][rightCell]==1) {
        ruleSet = 0;
    }
    else if (cells[ancestorRow][leftCell]==0 && cells[ancestorRow][mid]==0 && cells[ancestorRow][rightCell]==0) {
        ruleSet = 0;
    }

    return ruleSet;
}
