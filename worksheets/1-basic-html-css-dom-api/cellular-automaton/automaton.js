// JS ES6 for Cellular Automaton

let cols = 101;
let rows = 50;
let cellSize = 8;
let ruleSet = [0, 0, 1, 1, 1, 1, 0, 0];
const grid = new Array(cols);

document.body.style.backgroundColor = "orange";
document.body.style.maxWidth = "808px";
document.body.style.maxHeight = "400px";
document.body.style.margin="auto";


storeGrid();
createRows();

function storeGrid() {
  // Storing the rows and columns in
  for(let i = 0; i < cols; i++) {
      grid[i] = [rows];
  }
}

function createRows() {
  //creating the initial set of grid in a row
  for (let i = 0; i < cols; i++)
  {
  	grid[i][0] = getRandomInt();
  	createCells(grid[i][0]);
  }

  //creating the rest of the rows with the rule implemented
  for (let i = 1; i < rows; i++)
  {
     for (let j = 0; j < cols; j++)
      {
          grid[j][i] = generateNextState(j, i);
          createCells(grid[j][i]);
      }
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * 2);
}


function generateNextState(cellCol, cellRow)
{
	if (cellCol === 0)     // checking first cell of the row
	{
		left = grid[cols-1][cellRow-1];
		middle = grid[cellCol][cellRow-1];
		right = grid[cellCol+1][cellRow-1];
	}
  else if(cellCol === cols-1)   // checking last cell of the row
	{
		left = grid[cellCol-1][cellRow-1];
		middle = grid[cellCol][cellRow-1];
		right = grid[0][cellRow];
	}
	else             // all of the cells apart from the first and the last
	{
		left = grid[cellCol-1][cellRow-1];
		middle = grid[cellCol][cellRow-1];
		right = grid[cellCol+1][cellRow-1];
	}

  // rule 60 that determines the generation of the cells
  if    	(left == 1 && middle == 1 && right == 1) return ruleSet[0];
  else if (left == 1 && middle == 1 && right == 0) return ruleSet[1];
  else if (left == 1 && middle == 0 && right == 1) return ruleSet[2];
  else if (left == 1 && middle == 0 && right == 0) return ruleSet[3];
  else if (left == 0 && middle == 1 && right == 1) return ruleSet[4];
  else if (left == 0 && middle == 1 && right == 0) return ruleSet[5];
  else if (left == 0 && middle == 0 && right == 1) return ruleSet[6];
  else if (left == 0 && middle == 0 && right == 0) return ruleSet[7];

}



function createCells(colour) {
  let cell = document.createElement("div");
  cell.style.width = (cellSize).toString() + "px";
  cell.style.height = (cellSize).toString() + "px";
  cell.style.display = "inline-block";
  cell.style.float = "right";

  if (colour === 1)
  {
    cell.style.background = "black";
  }
  else if (colour === 0)
  {
    cell.style.background = "orange";
  }

  document.body.appendChild(cell);
}
