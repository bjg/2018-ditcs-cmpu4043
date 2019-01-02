let app;
let width = 50;
let height = 100;
let cells = [];

function main(){
	app = document.getElementById('app');
	drawGrid();
}

function drawGrid(){

	for(let y=0; y<height; y++) {
		let row = document.createElement('div');
		row.classList.add('row');
		app.appendChild(row);
		cells[y] = [];

		for(let x=0; x<width; x++) {
			let cell = document.createElement('div');
			cell.classList.add('cell');

			if(Math.random() >= 0.5) {
				cell.classList.add('active');	
			}

			cell.dataset.x = x;
			cell.dataset.y = y;
			row.appendChild(cell);
			cells[y][x] = cell;
		}
	}

	// var grid = document.createElement('div');
	// grid.classList.add('cell');
	// grid.classList.add('active');
	// app.appendChild(grid);
}

function checkNeighbours() {

	function checkTopLeft() {

	}

	function checkTop() {

	}

	function checkTopRight() {

	}

	// if left + top + right then dead
	// if left + top then dead
	// if left + right then alive
	// if only left then alive
	// if top + right then alive
	// if only top then dead
	// if right then dead
	// if none then dead

}

addEventListener('DOMContentLoaded', main);