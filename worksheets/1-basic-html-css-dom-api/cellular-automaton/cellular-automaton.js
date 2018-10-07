let cellsState = []

const createCell = (active = false) => {
    const cell = document.createElement('div')
    cell.style.width = '8px'
    cell.style.height = '8px'
    cell.style.border = '0.1px solid'
    cell.style.display = 'inline-block'
    if (active) cell.style.backgroundColor = 'black'
    return cell;
}

const createRowContainer = () => {
    const rowContainer = document.createElement('div')
    rowContainer.style.height = '8px';
    document.body.appendChild(rowContainer)
    return rowContainer
}

const randomlyPickIfActive = () => ((Math.floor(Math.random() * 2) + 1) === 2)

const checkIfCellShouldBeActiveBasedOnAncestorCells = (row, column) => {
    const leftCell = (column === 0) ? cellsState[row - 1][100] : cellsState[row - 1][column - 1]
    const middleCell = cellsState[row - 1][column]
    const rightCell = (column === 100) ?  cellsState[row - 1][0] : cellsState[row - 1][column + 1]
    return ((leftCell && !middleCell && rightCell) || (leftCell && !middleCell && !rightCell) || (!leftCell && middleCell && rightCell) || (!leftCell && middleCell && !rightCell))
}

(() => {
    for (let i = 0; i < 50; i++){
        cellsState.push([])
        const rowContainer = createRowContainer()
        for (let j = 0; j < 101; j++){
            const activeCell = (i === 0) ? randomlyPickIfActive() : checkIfCellShouldBeActiveBasedOnAncestorCells(i, j)
            rowContainer.appendChild(createCell(activeCell))
            cellsState[i].push(activeCell)
        }
    }
})()
