//Creates a cell that is marked as active or inactive by colour
function createCell(active)
{
	var cell = document.createElement("div");
	cell.style.display = 'inline-block';
	cell.style.width = '8px';
	cell.style.height = '8px';

	if(active)
	{
		cell.style.background = 'black';
	}
	else
	{
		cell.style.background = 'white';
	}
	
	return cell;
}

//Inserts cell as child of passed in object
function insertCell(row,active) 
{
	cell = createCell(active);
	row.appendChild(cell);
}

//Creates a div for holding a row of cells
function insertNewRow() 
{
	var row = document.createElement("div");
	row.className = "row";
	row.style.height = '8px';
	body.appendChild(row);
	return row;
}

//Function that should return true 1/2 the time
function randomBool()
{
	var rand = Math.random();
	if(rand < 0.5)
	{
		bool  = true;
	}
	else
	{
		bool = false;
	}

	return bool;
}

//Returns the result based off the given rules
function ruleResult(index,array)
{
	result = false;

	number = getThreeBitNumber(index, array);

	if(number > 1 && number < 6)
	{
		result = true;
	}

	return result;
}

//Breaks the three above bools into a single number
function getThreeBitNumber(index,array)
{
	var threeBitNumber = 0;

	if( array[(index - 1 + width) % width] )
	{
		threeBitNumber += 4;
	}

	if( array[index])
	{
		threeBitNumber += 2;
	}

	if( array[(index + 1) % width] )
	{
		threeBitNumber += 1;
	}

	return threeBitNumber;
}

var body = document.getElementById("main");

var aboveArray = [];
var mainArray = [];

var width = 101;
var height = 50;

//Generate first row with random states
currentRow = insertNewRow();
for (i = 0; i < width; i++) 
{ 
	state = randomBool();
    insertCell(currentRow,state);
    mainArray.push(state);
}

//Generate remaining rows based of above cells
for (i = 1; i < height; i++) 
{
	currentRow = insertNewRow();

	//Sets up arrays for next row to be generated
	aboveArray = mainArray.slice();
	mainArray = [];

	for (j = 0; j < width; j++) 
	{
		state = ruleResult(j,aboveArray);
		insertCell(currentRow,state);
    	mainArray.push(state);
	}
}