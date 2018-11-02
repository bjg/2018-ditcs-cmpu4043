let cells = [];
const rows = 50;
const cols = 101;

for (let i = 0; i < rows; i++) {
    cells.push([0])
    for (let j = 0; j < cols; j++) {
        cells[i][j] = 0;
    }
}

window.onload = function() {
    let maxWidth = (cols * 8);
    let maxHeight = (rows * 8);

    document.body.style.width  = maxWidth + "px";
    document.body.style.height  = maxHeight + "px";

    for (let i = 0; i < cols; i++) {
        cells[0][i] = Math.round((Math.random()));
        renderCell(cells[0][i]);
    }
    
    for (let i = 1; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            cells[i][j] = createCell(i, j);    
            renderCell(cells[i][j]);
        }
    }
}

function renderCell(active) {
    let cell = document.createElement("div");
	cell.style.width = "8px";
	cell.style.height = "8px";
    cell.style.float = "left";
    
	if (active == 1) {
		cell.style.background = "gray";
	}
	else {
		cell.style.background = "beige";
	}

	document.body.appendChild(cell);
}

function createCell(r, c) {
    let left, right;
    let mid = c;
    let prevRow = r-1;

    let cellStatus = 0;

    if (c==0) {
        left = cols-1;
        right = c + 1;
    }
    else if (c==cols-1) {
        right = 0;
        left = c - 1;
    }
    else {
        right = c + 1;
        left = c - 1;
    }

    if (cells[prevRow][left]==1 && cells[prevRow][mid]==1 && cells[prevRow][right]==1) {
        cellStatus = 0;
    }
    else if (cells[prevRow][left]==1 && cells[prevRow][mid]==1 && cells[prevRow][right]==0) {
        cellStatus = 0;
    }
    else if (cells[prevRow][left]==1 && cells[prevRow][mid]==0 && cells[prevRow][right]==1) {
        cellStatus = 1;
    }
    else if (cells[prevRow][left]==1 && cells[prevRow][mid]==0 && cells[prevRow][right]==0) {
        cellStatus = 1;
    }
    else if (cells[prevRow][left]==0 && cells[prevRow][mid]==1 && cells[prevRow][right]==1) {
        cellStatus = 1;
    }
    else if (cells[prevRow][left]==0 && cells[prevRow][mid]==1 && cells[prevRow][right]==0) {
        cellStatus = 1;
    }
    else if (cells[prevRow][left]==0 && cells[prevRow][mid]==0 && cells[prevRow][right]==1) {
        cellStatus = 0;
    }
    else if (cells[prevRow][left]==0 && cells[prevRow][mid]==0 && cells[prevRow][right]==0) {
        cellStatus = 0;
    }

    return cellStatus;
}