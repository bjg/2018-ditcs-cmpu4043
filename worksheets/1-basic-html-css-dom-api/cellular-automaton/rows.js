'use es6';

const cellCount = 101;
const rowCount = 50;
let rows = [];

function createCell() {
    cell = document.createElement('div');
    cell.style.border = '1px solid';
    cell.style.width = '8px';
    cell.style.height = '8px';
    cell.style.display = 'inline-block';
    return cell;
}

function activateCell(cell) {
    cell.style.backgroundColor = 'green';
}

function isActive(cell) {
    return cell.style.backgroundColor === 'green';
}

function generateFirstRow() {
    row = document.createElement('div');
    rows.push(row);
    
    document.body.appendChild(row);
  
    for (i = 0; i < cellCount; i++) {
        cell = createCell();
        
        if (Math.random() < 0.3) {
            activateCell(cell);
        }
        
        row.appendChild(cell);
    }
  }

function shouldBeActive(cellIndex, rowIndex) {
    previousRow = rows[rowIndex - 1];
    previousRowOfCells = previousRow.querySelectorAll('div');

    const rightCellIndex = (cellIndex + 1) % cellCount;
    const leftCellIndex = cellIndex === 0 ? cellCount - 1 : cellIndex - 1;

    const ancestorCell = previousRowOfCells[cellIndex];
    const rightCell = previousRowOfCells[rightCellIndex];
    const leftCell = previousRowOfCells[leftCellIndex];

    return !(
        isActive(leftCell) && isActive(ancestorCell)
        || isActive(rightCell) && !isActive(ancestorCell) && !isActive(leftCell)
        || !isActive(rightCell) && !isActive(ancestorCell) && !isActive(leftCell)
    );
}

function addRemainingRows() {
    for (rowIndex = 1; rowIndex < rowCount; rowIndex++) {
        currRow = document.createElement('div');
        rows.push(currRow);

        for (cellIndex = 0; cellIndex < cellCount; cellIndex++) {
            cell = cell = createCell();
            
            if (shouldBeActive(cellIndex, rowIndex)) {
              activateCell(cell);
            }
            
            currRow.appendChild(cell);
        }

        document.body.appendChild(currRow);        
    }
}

generateFirstRow();
addRemainingRows();
