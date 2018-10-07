let cols = 100;
let rows = 50;
var prevRow = [];
var curRow = [];
document.body.style.width = "808px";
pattern = document.createElement('div');



setUp();

function setUp() {

	var i, state, div, rowBody, active;
	rowBody = document.createElement('div');

	for(i = 0; i < cols; i++)
	{
		div = document.createElement('div');
		div.style.width = "8px";
		div.style.height = "8px";

		div.style.float = "left";

		state = Math.random();
		if(state > 0.5)	{
			div.style.background = "#000000";
			active = 1;
		}
		else	{
			div.style.background = "#D3D3D3";
			active = 0;
		}
		rowBody.appendChild(div);
		prevRow.push(active);
	}
	pattern.appendChild(rowBody);

	patternGen();
}


function patternGen() {
	var div, rowBody, i, j, active;
	var left, center, right, use;

	for(i = 0; i < rows; i++)
	{
		rowBody = document.createElement('div');
		for(j = 0; j < cols; j++)
		{
			div = document.createElement('div');
			div.style.width = "8px";
			div.style.height = "8px";
			div.style.float = "left";

			left = 0;
			left = prevRow[j-1];

			center = 0;
			center = prevRow[j];

			right = 0;
			right = prevRow[j+1];

			if(isNaN(right))
			{
				right = prevRow[0];
			}
			if(isNaN(left))
			{
				left = prevRow[prevRow.length - 1];
			}

			use = left + right + center;
			
			// Main piece of logic for determining whether a cell is on or not.
			// If a cell has three corresponding cells on the above line that are on, the cell in question is off
			// Or if the three cells above are all off, the cell in question is also off
			// Or if the total number of cells above include two that are on and the right most is off, the cell in question is off
			// Or if the cell has one total above cells one and it is also the right cell, the cell in question is off
			// ALL other cases, the cell in question is on.
			
			if( use === 3 || use === 0 || (use === 2 && right === 0) || (use === 1 && right === 1) )
			{
				div.style.background = "#D3D3D3";
				active = 0;
			}
			else
			{
				div.style.background = "#000000";
				active = 1;
			}


			rowBody.appendChild(div);
			curRow.push(active);
		}
		pattern.appendChild(rowBody);
		arrayCleanup();
	}

	pattern.style.display = "inline-block";
	document.body.appendChild(pattern);
}

function arrayCleanup()	{
	var i;
	for(i = 0; i < prevRow.length; i++)
	{
		prevRow[i] = curRow[i];
	}

	while(curRow.length > 0)
	{
		curRow.pop();
	}
}

