/***
 *	Name: Gabriel Grimberg
 *	Module: Rich Web Applications
 *	Lab: 1
 *	Question: 3
 *	Type: JavaScript for "cellular-automation.html"
 *	
 *	Instructions: 
 *	
 *	Provide the Javascript ES6 to implement a 1D, 2-colour cellular automaton based on the following description and steps:
 *
 *	a. 
 *		- Generate a row having 101 cells across made from ​<div>​ tags of size 8px by 8px. 
 *		- Each cell will have a randomly initialised state of ‘active’ or ‘inactive’. 
 *		- If active, give it one fill color of your choice. 
 *		- If inactive give it another fill color of your choice.
 *	b. 
 *		- Generate the next row of cells based on the state of the ancestors in the previous row according to the following rule.
 *		- For example, ​if​ the direct ancestor is active ​and​ the direct ancestor’s 
 *		  left sibling is active ​and​ the direct ancestor’s right sibling is active, 
 *		  then make the corresponding  cell in the new row active.
 *		- The first cell in a row doesn’t have a left sibling to use the row’s last cell’s state in this case.
 *		- The last cell in a row doesn’t have a right sibling to use the row’s first cell’s state in this case.
 *		- The last cell in a row doesn’t have a right sibling to use the row’s first cell’s state in this case.
 *		
 *	c. - Repeat the process until you have created 50 generations (rows) of cells, 
 *	     with each row being created from the previous role according to the rule above.
 *	
 ***/

// Global Variables that never change and used in every scope.
// Using "const" instead of "let" as const is used for when variables are never changed.
const rows = 50; 
const columns = 101;

// Array to keep hold of state.
let state = new Array();

/*
	Function to setup the width and size.
*/
function setup() {
	
	let pixelSize = 8;
	let frameHeight = pixelSize * rows;
	let frameWidth = pixelSize * columns;
	
	document.body.style.width = frameWidth + "px";
	document.body.style.height = frameHeight + "px";
	
}

/*
	Function to kick of the program with the random cell generation on the first row.
*/
function main() {
		
	// To start with the process, the first row must be random in order for this to work upon.
	for(let c = 0; c < columns; c++ ) {
		
		state[c] = Math.round(Math.random() );
		
	}
	
	// Draw the rest of the 49 rows based on the rules. (First row was auto generated).
	for(let r = 1; r < rows; r++ ) { generateCells(); }
	
}

/* 
	Function to either colour the cell black or grey based on the state set from the ruleSystem() function.
*/
function generateCells() {
	
	ruleSystem();
	
	for (let i = 0; i < columns; i++ ) {
		
		let cell = document.createElement('div');
		
		if (state[i] == 1 ) { // If the Cell contains 1 which is Active then colour it black.
			
			cell.style.backgroundColor = "black";
			cell.style.width = "8px";
			cell.style.height = "8px";
			cell.style.float = "left";
			
		} else { // If the Cell contains 0 which is Inactive then colour it light grey.
			
			cell.style.backgroundColor = "lightgrey";
			cell.style.width = "8px";
			cell.style.height = "8px";
			cell.style.float = "left";
		}
		
		document.body.appendChild(cell);
	}
	
}

/* 
	Function to fill the cell colours based on the rules for Rule 60.
	
	Diagram below to illustrate the use of variables in this program.
	
	 leftAncestor
	 |
	 |	 middleAncestor
	 |   |	
	 |	 |   rightAncestor
	 |	 |	 |
	[ ]	[ ]	[ ]
	    [ ] <- nextState
	
	While looping through the columns:
		- Put the Current Column into the Middle Ancestor.
		
		- If the Current Column is 0 which is the start of the column: 
			- The Left Ancestor will take the last Column from the Last Row.
			- The Right Ancestor will be to the right of the Middle Ancestor.
		
		- If the Current Column is on the Last Column:
			- The Left Ancestor will be to the left of the Middle Ancestor.
			- The Right Ancestor will be the first Cell in the next row.
			
		- If we are not dealing with first and last Cells:
			- The Left Ancestor will be to the left of the Middle Ancestor.
			- The Right Ancestor will be to the right of the Middle Ancestor.
			
		Now we have the current positions of the Left, Middle and Right Ancestor:
			- Follow the 8 rules applied.
			
*/
function ruleSystem() {
	
	let leftAncestor;
	let middleAncestor;
	let rightAncestor;
	
	// Array to be used as a temporary Array for state.
	let nextState = new Array();
	
	for (let currentCol = 0; currentCol < columns; currentCol++ ) {
		
		// Put the current state into the middleAncestor as we will be able to use this to:
		// Set the state for the right side and left side of the middleAncestor for work against the rules.
		middleAncestor = state[currentCol];
		
		if (currentCol == 0) { // If middleAncestor is on first column.
			
			leftAncestor = state[state.length - 1];
			rightAncestor = state[currentCol + 1];
			
		} else if (currentCol == state.length - 1) { // If middleAncestor is on last column.
			
			leftAncestor = state[currentCol - 1];
			rightAncestor = state[0];
			
		} else { // Else middleAncestor is neither last or first column.
			
			leftAncestor = state[currentCol - 1];
			rightAncestor = state[currentCol + 1];
		}
		
		/* Rules Section with 8 Possabilities */
		if (leftAncestor == 1 && middleAncestor == 1 && rightAncestor == 1) { nextState[currentCol] = 0; } 
		else if (leftAncestor == 1 && middleAncestor == 1 && rightAncestor == 0) { nextState[currentCol] = 0; } 
		else if (leftAncestor == 1 && middleAncestor == 0 && rightAncestor == 1) { nextState[currentCol] = 1; } 
		else if (leftAncestor == 1 && middleAncestor == 0 && rightAncestor == 0) { nextState[currentCol] = 1; } 
		else if (leftAncestor == 0 && middleAncestor == 1 && rightAncestor == 1) { nextState[currentCol] = 1; } 
		else if (leftAncestor == 0 && middleAncestor == 1 && rightAncestor == 0) { nextState[currentCol] = 1; } 
		else if (leftAncestor == 0 && middleAncestor == 0 && rightAncestor == 1) { nextState[currentCol] = 0; } 
		else if (leftAncestor == 0 && middleAncestor == 0 && rightAncestor == 0) { nextState[currentCol] = 0; }
		
	}
	
	state = nextState
	
}

/* Setup for the Program */
setup()

/* Start of the Program */
main()