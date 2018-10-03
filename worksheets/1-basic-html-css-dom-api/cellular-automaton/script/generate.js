/*
	Name: Robert Vaughan
	StudentNo: C15341261
*/

/*
	Function that generates blacks divs with inline-block
*/
function generateDiv(){
	let div = document.createElement("div");
	div.style.width = "8px";
	div.style.height = "8px";
	div.style.margin = "0";
	div.style.marginTop = "0";
	div.style.display = "inline-block";
	return div;
}

/*
	Function that calculates the colour of a div depending
	on the divs around it on the row above.

	If a div is on a left corner, the last div on the previous
	row is identifed as the div to the left of the current div.
	Whereas if a div is on the far right corner, the div at the beginning
	of the row will be assigned.

	The logic if the conditional statements are self-explatory but to ensure
	clarity, the logic follows as:
		IF
			The three divs have the same colour
		OR
			If the middle div is the same as the left but not the right
		THEN
			The active div is made white
		ELSE
			The active div is made black

	HOWEVER!!!
		Since we are evaulating if all are equal OR if right does not equal
		middle and left equals middle, we can remove the middle to right compaisons
		for really only middle and left are the true evaluators!!

		So our new condition is:
			IF
				The left is the same as the middle
			THEN
				The active div is made white
			ELSE
				The active div is made black
*/
function calculateColor(divs, prevRow, currCol) {
	let left;
	let middle;
	// let right;

	// Left
	if (currCol == 0) {
		left = divs[prevRow][divs[prevRow].length - 1].style.backgroundColor;
		// right = divs[prevRow][1].style.backgroundColor;
	}
	// Right
	else if (currCol == divs[prevRow].length - 1) {
		left = divs[prevRow][divs[prevRow].length - 2].style.backgroundColor;
		// right = divs[prevRow + 1][0].style.backgroundColor;
	}
	else {
		left = divs[prevRow][currCol-1].style.backgroundColor;
		// right = divs[prevRow][currCol+1].style.backgroundColor;
	}
	
	middle = divs[prevRow][currCol].style.backgroundColor;

	// Original Condition
	// if (((left == right) && (right == middle)) || ((right != middle) && (middle == left)))
	if (middle == left) {
		return "#FFFFFF";
	}
	else {
		return "#000000";
	}
}

// Removing deafulted margins from the body
document.body.style.margin = "0";

// Initalising 2-D array
let divs = new Array();
divs[0] = new Array();

/*
	Loop that creates the first line of cells
*/
for (let i = 0; i < 101; i++) {
	let div = generateDiv();
	divs[0].push(div);
	div.style.backgroundColor = "#000000";
	
	// Randomiser with a range of 1 to 2 (inclusive)
	if (Math.floor(Math.random() * 2) == 1) {
		div.style.backgroundColor = "#FFFFFF";
	}
	else {
		div.style.backgroundColor = "#000000";
	}

	document.body.appendChild(divs[0][i]);
}

// Adding a break after each row
document.body.appendChild(document.createElement("BR"));

/*
	Loop that generates divs and passes each div to a function
	that will calculate its colour
*/
for (let rows = 1; rows < 50; rows++) {
	divs[rows] = new Array();
	for (let cols = 0; cols < 101; cols++) {
		let div = generateDiv();
		div.style.backgroundColor = calculateColor(divs, rows - 1, cols);
		divs[rows].push(div);
		document.body.appendChild(divs[rows][cols]);
	}
	// Adding a break after each row
	document.body.appendChild(document.createElement("BR"));
}