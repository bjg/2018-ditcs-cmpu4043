document.addEventListener('DOMContentLoaded', () => 
{

    var rows = [];
    var rowNum = 50;
    var colNum = 101;
    var cellSize = 8;

    for(let i = 0; i < rowNum; i++) 
    {
        rows[i] = new Array(); // for every var in the row create a new array

        for(let j = 0; j < colNum; j++){ 
            if(i === 0){
                rows[i][j] = Math.random() < 0.5 ? true : false; 
            }
            else{
                if(j === 0) {
                    rows[i][j] = checkAncestors(i-1,j,j+100,j+1);
                }
                else if (j === 100){
                    rows[i][j] = checkAncestors(i-1,j,j-1,j-100);
                }
                else{
                    rows[i][j] = checkAncestors(i-1,j,j-1,j+1);
                }
            }
            console.log(rows[i][j]);
        }
    }


    block = document.createElement("div");
    block.style.width = `${colNum * cellSize}px`;
    block.style.height = `${rowNum * cellSize}px`;

    for(i = 0; i < rowNum; i++ ){
        for(j = 0; j < colNum; j++){
            blockChild = document.createElement("div");
            blockChild.style.width = `${cellSize}px`;
            blockChild.style.height = `${cellSize}px`;
            blockChild.style.float = "left";
            blockChild.style.background = rows[i][j] ? "black" : "white";
            block.appendChild(blockChild);
        }
    }

    document.body.appendChild(block);

   

    function checkAncestors(row, ancestor, left, right){
        if(rows[row][ancestor] === false &&
            rows[row][left] === false &&
            rows[row][right]=== false){
            return false;
        }
        else if(rows[row][ancestor]=== true &&
            rows[row][left]=== true &&
            rows[row][right]=== false){
            return false;
        }
        else if(rows[row][ancestor]=== true &&
            rows[row][left]=== false &&
            rows[row][right]=== true){
            return false;
        }
        else{
            return true;
        }
    }
});
