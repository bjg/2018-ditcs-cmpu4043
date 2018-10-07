//page styles

var body = document.getElementsByTagName()


//declare variables

const rowNumber = 50;
const colNumber =101;
var cellSize = "8px";

//call function to generate first rows
generateFirstRow();

//loop to  create rows of cellSize
for (let i = 0; i < rows; i++)
{
  generateCells();

	}

}

function generateCells()
{
    cell = document.createElement('div');
    cell.style.border = '1px solid';
    cell.style.width = cellSize;
    cell.style.height = cellSize;
    cell.style.display = 'inline-block';
    return cell;
}

//state of active 1
function generateActiveCells()
{

}

function generateFirstRow()
{

}

//state of inactive 0
function inActiveCells()
{

}

//based on the state of the ancestors in the previous row
function generateNextRowOfCells()
{

}
