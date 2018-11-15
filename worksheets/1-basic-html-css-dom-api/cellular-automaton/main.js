let body = document.getElementById('body');
var breakElement = document.createElement("br");
var tempCellArray = [];

//The following two functions define the active and inactive cells.
function createActiveCell()
{
  let activeCell = document.createElement("div");
  activeCell.style.height = "8px";
  activeCell.style.width = "8px";
  activeCell.style.background = "#4d00b2";
  activeCell.style.float = "left";

  return activeCell;
}

function createInActiveCell()
{
  let inActiveCell = document.createElement("div");
  inActiveCell.style.height = "8px";
  inActiveCell.style.width = "8px";
  inActiveCell.style.background = "#414854";
  inActiveCell.style.float = "left";

  return inActiveCell;
}

//Creation of the first row of cells randomly.
function createInitialCells()
{
  body.style.width = "808px";
  let htmlContent = '';
  var cellArray = [];

  for(var i = 0; i < 101; i++)
  {
    if(Math.round(Math.random()) === 0)
    {
      body.appendChild(createInActiveCell())
      cellArray[i] = 0;
    }
    else
    {
      body.appendChild(createActiveCell())
      cellArray[i] = 1;
    }
  }

  createCells(htmlContent, cellArray);
}

//This function creates the rest of the rows based on the defined rules, by iterating through each row.
function createCells(htmlContent, cellArray)
{
  var result;
  var checkCellArray = [];

  for(var i = 0; i <= 50; i++)
  {
    checkCellArray[0] = cellArray[100];
    checkCellArray[1] = cellArray[0];
    checkCellArray[2] = cellArray[1];

    appendCell(checkCellStatus(checkCellArray), 0);

    for(var j = 1; j < 100; j++)
    {
      checkCellArray[0] = cellArray[j-1];
      checkCellArray[1] = cellArray[j];
      checkCellArray[2] = cellArray[j+1];

      appendCell(checkCellStatus(checkCellArray), j);
    }

    checkCellArray[0] = cellArray[99];
    checkCellArray[1] = cellArray[100];
    checkCellArray[2] = cellArray[0];

    appendCell(checkCellStatus(checkCellArray), 100);

    cellArray = tempCellArray;
  }
}

//Function to append the cell to the body based on the result of the rule check.
function appendCell(result, j)
{
  if(result == 0)
  {
    body.appendChild(createInActiveCell())
    tempCellArray[j] = 0;
  }
  else
  {
    body.appendChild(createActiveCell())
    tempCellArray[j] = 1;
  }
}

//The following function is used to check the relavant cells of the previous row to decide
//the output of the next row.
function checkCellStatus(checkCellArray)
{
  var result;

  if(checkCellArray[0] == 1 && checkCellArray[1] == 1 && checkCellArray[2] == 1)
  {
    result = 0;
  }
  else if(checkCellArray[0] == 1 && checkCellArray[1] == 1 && checkCellArray[2] == 0)
  {
    result = 0;
  }
  else if(checkCellArray[0] == 1 && checkCellArray[1] == 0 && checkCellArray[2] == 1)
  {
    result = 1;
  }
  else if(checkCellArray[0] == 1 && checkCellArray[1] == 0 && checkCellArray[2] == 0)
  {
    result = 1;
  }
  else if(checkCellArray[0] == 0 && checkCellArray[1] == 1 && checkCellArray[2] == 1)
  {
    result = 1;
  }
  else if(checkCellArray[0] == 0 && checkCellArray[1] == 1 && checkCellArray[2] == 0)
  {
    result = 1;
  }
  else if(checkCellArray[0] == 0 && checkCellArray[1] == 0 && checkCellArray[2] == 1)
  {
    result = 0;
  }
  else
  {
    result = 0;
  }

  return result;
}
