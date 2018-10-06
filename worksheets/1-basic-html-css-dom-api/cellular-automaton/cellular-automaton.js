let ancestorRow = [];

const generateCell = (rowCell, active) => {
    const cell = document.createElement('div')
    cell.style.width = '8px'
    cell.style.height = '8px'
    cell.style.display = 'inline-block'
    cell.style.backgroundColor = (active) ? 'black' : 'white'
    cell.style.border = '0.1px solid'
    rowCell.appendChild(cell)
}

(generateCells = () => {
    for(let i = 0; i < 50; i++) {
        const tempRow = []
        const rowCell = document.createElement('div')
        rowCell.style.height = '8px'
        document.body.appendChild(rowCell)

        for (let j = 0; j < 101; j++) {
            let activeCell;

            //If first row, generate randomly
            if (i === 0){
                let random = Math.floor(Math.random() * 2) + 1;
                activeCell = (random === 1)

            //Else follow rules
            }else {
                let leftColour = (j === 0) ? ancestorRow[100] : ancestorRow[j-1]
                let rightColour = (j === 100)? ancestorRow[0] : ancestorRow[j+1]
                let middleColour =  ancestorRow[j]

                activeCell = !((leftColour && middleColour && !rightColour) || (!leftColour && !middleColour && rightColour)
                    || (leftColour && middleColour && rightColour) ||  (!leftColour && !middleColour && !rightColour))
            }

            generateCell(rowCell, activeCell);
            tempRow.push(activeCell)
        }
        ancestorRow = tempRow
    }
})()