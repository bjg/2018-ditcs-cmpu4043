var i = 0;
var j = 0;
var width = 101;
var height = 50;
var activity = [];
var pactivity = [];
var currentRow;

//This will generate either 1 or 2
function randnum()
{
  return Math.floor(Math.random() * Math.floor(2));
}

//Checks opposite side if at edge and will wrap around if so
function edge(index)
{
  if(index == -1)
  {
    index = width-1;
  }
  else if (index == width)
  {
    index = 0;
  }

  return index;
}

//This will generate the cell
function makecell()
{
  var active;

  var cell = document.createElement("div");
  cell.style.width = "8px";
  cell.style.height = "8px";
  cell.style.border = "1px solid gray";
  cell.style.display = "inline-block";
  //cell.style.background = "white";

  //This will generate a the first row if random
  if(j == 0)
  {
    active = randnum(); 
    if(active == 1)
    {
      cell.style.background = "white";
    }
    else
    {
      cell.style.background = " #7a00cc";

    }
  }
  //This will use the rules to correctly colour the remaining cells in every row
  else
  {
    //Rule implementation##
    if(   pactivity[edge(i-1)] == 1 && pactivity[i] == 0 && pactivity[edge(i+1)] == 1
      ||  pactivity[edge(i-1)] == 1 && pactivity[i] == 0 && pactivity[edge(i+1)] == 0
      ||  pactivity[edge(i-1)] == 0 && pactivity[i] == 1 && pactivity[edge(i+1)] == 1
      ||  pactivity[edge(i-1)] == 0 && pactivity[i] == 1 && pactivity[edge(i+1)] == 0
      )
    {
      cell.style.background = "white";
      active = 1;
    }
    else
    {
      cell.style.background = " #7a00cc";
      active = 0;
    }   
  }//end else

  //This will add the colour of the current cell to the array
  activity[i] = active;
  i++;
  return cell;
}

//This will add the cell to the row div
function insertcell()
{
  cell = makecell();
  currentRow.appendChild(cell);
}

//This will create a row div that will have cells added to it
function insertrow()
{
  currentRow = document.createElement("div");
  currentRow.style.height = "8px";

  //This will copy the current cell activity to the old one to check against the rules for the next row
  pactivity = activity.slice();
  activity = [];

  for(a=0 ; a < width; a++)
  {
    insertcell();
  }
  
  document.getElementById("demo").appendChild(currentRow);

  //This will add to the row count so that no other row will be randomly generated and will reset the cell count
  j++;
  i = 0;
}

for(count = 0; count < height; count++)
{
  insertrow();
}
