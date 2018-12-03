let row_size = 50;
let col_size = 101;

//create 2d array for storing Cell objects, will be stored at their respective x, y position in the grid
let cells = [col_size];
for (let i = 0; i < col_size; i++)
{
  cells[i] = [row_size];
}

//set max width and height of the grid based on row and column sizes
document.body.style.maxWidth  = ( (8*col_size) ).toString() + "px";
document.body.style.maxHeight  = ( (8*row_size) ).toString() + "px";

//create the first row of cells
for (let i = 0; i < col_size; i++)
{
	cells[i][0] = Math.round((Math.random()));
	drawCell(cells[i][0]);
}

//create the cells, for each column of a row
for (let i = 1; i < row_size; i++)
{
	for (let j = 0; j < col_size; j++)
	{
		cells[j][i] = calculateActive(j, i);
		drawCell(cells[j][i]);
	}
}

//function to draw a cell, it will create the div element and will colour it based on the active status
function drawCell(active)
{
	let element = document.createElement("div");
	element.style.width = "8px";
	element.style.height = "8px";
	element.style.float = "left";

	if (active === 1)
	{
		element.style.background = "black";
	}
	else
	{
		element.style.background = "white";
	}

	document.body.appendChild(element);
}

//function for calulcating the state of a cell
function calculateActive(x, y)
{
	//get cells for calculation
	//if first cell in row
	if (x === 0)
	{
		left = cells[col_size-1][y-1];
		middle = cells[x][y-1];
		right = cells[x+1][y-1];
	}
	//if last cell in row
	else if(x === col_size-1)
	{
		left = cells[x-1][y-1];
		middle = cells[x][y-1];
		right = cells[0][y];
	}
	//any other cell
	else
	{
		left = cells[x-1][y-1];
		middle = cells[x][y-1];
		right = cells[x+1][y-1];
	}

	//rules, can be done in one if else based on if its a 1 or 0, but written like this for readabiliy
	if (left && middle && right)
	{
		return 0;
	}
	else if (left && middle && !right)
	{
		return 0;
	}
	else if (left && !middle && right)
	{
		return 1;
	}
	else if (left && !middle && !right)
	{
		return 1;
	}
	else if (!left && middle && right)
	{
		return 1;
	}
	else if (!left && middle && !right)
	{
		return 1;
	}
	else if (!left && !middle && right)
	{
		return 0;
	}
	else if (!left && !middle && !right)
	{
		return 0;
	}
}
