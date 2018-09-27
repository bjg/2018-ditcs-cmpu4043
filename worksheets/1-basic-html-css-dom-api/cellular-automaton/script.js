var active='black';
var inactive='white';
var max = 100;
var min = 1;
var grid = [];
var parent = document.getElementById('grid');
var width = 101;
var height = 50;

function drawCells() {
	console.log(grid);
	for(var i = 0; i < grid.length; i++){
		var row = document.createElement("div");
		parent.appendChild(row);
		for (var j = 0; j < width; j++) { 
	    	var div = document.createElement("div");
			div.classList.add('cell');
			if (grid[i][j] == 1)
				div.style.backgroundColor = active;
			else 
				div.style.backgroundColor = inactive;
			row.appendChild(div);
		}
	}
	
}

function generateRows(){
	for (var i = 0; i < height; i++) { 
		grid[i] = new Array();
		for(var j = 0; j < width; j++){
			if (i == 0) {
				grid[i].push(randomInteger());
			} else {
				left = (j - 1 < 0) ? width - 1 : j - 1;
				right = (j + 1 > width - 1) ? 0 : j + 1; 
				if 	(grid[i-1][left] == 1 && grid[i-1][j] == 1 && grid[i-1][right] == 1) {
					grid[i].push(0);
				} else if (grid[i-1][left] == 1 && grid[i-1][j] == 1 && grid[i-1][right] == 0) {
					grid[i].push(0);
				} else if (grid[i-1][left] == 1 && grid[i-1][j] == 0 && grid[i-1][right] == 1) {
					grid[i].push(1);
				} else if (grid[i-1][left] == 1 && grid[i-1][j] == 0 && grid[i-1][right] == 0) {
					grid[i].push(1);
				} else if (grid[i-1][left] == 0 && grid[i-1][j] == 1 && grid[i-1][right] == 1) {
					grid[i].push(1);
				} else if (grid[i-1][left] == 0 && grid[i-1][j] == 1 && grid[i-1][right] == 0) {
					grid[i].push(1);
				} else if (grid[i-1][left] == 0 && grid[i-1][j] == 0 && grid[i-1][right] == 1) {
					grid[i].push(0);
				} else if (grid[i-1][left] == 0 && grid[i-1][j] == 0 && grid[i-1][right] == 0) {
					grid[i].push(0);
				}
			}
		}
	}
}

function randomInteger(){
	return Math.floor(Math.random() * 20) % 2;
}

generateRows();
drawCells();