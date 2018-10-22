// C14413458 - Matas Nedzveckas
/*
<div>
    <div>
        <div></div> <div></div> ....
    </div>
    <div>
    </div>
</div>
*/

// I identify the div inside the rows with indexes and store the state of the divs inside the array element value


// Gen0 function generates the base row of divs. then genNext generates all the subsequent generations
const gen0 = () => {
    const firstRow = [];
    let max = 101;
    for( i = 0; i < max; i++){
        let div = document.createElement("div");
        div.style.width = "8px";
        div.style.height = "8px";
        div.style.float = "left";

        let cellState;
        if(Math.random() >= 0.5){
            // State active
            cellState = 1;
            div.style.backgroundColor = "#2E2FE3";
        } else {
            // State inactive 
            cellState = 0;
            div.style.backgroundColor = "#DDE3FD";
        }
        firstRow.push(cellState);
        root.appendChild(div);
    }
    return firstRow;
}


/* I pass the array to the @genNext function and stores the new the state values inside the nextGen array
   at the end I simply set the firstRow(which was the base div array) to be the nextGen array
*/
const genNext = (root, firstRow) => {
    let maxGen = 50;
    let max = 101;
    let cellState;

    for (j = 0; j < maxGen - 1; j++){

        const row = document.createElement("div");
        const nextGen = [];

        for(i = 0; i < max; i++){
            const div = document.createElement("div");
            div.style.width = "8px";
            div.style.height = "8px";
            div.style.float = "left";

            // First Cell
            // firstRow.forEach(function(firstRow){
            //     checkFirst(firstRow[i]);
            // });
            // firstRow.forEach(function(firstRow){
            //     checkLast(firstRow[i]);

            // First Cells check

            /* The reason for checking only 4 rules is because the other rules result in an inactive state
               which meants that those rules will be caught by the else code block
            */
            if(i == 0){
                if(firstRow[100] == 1 && firstRow[i] == 0 && firstRow[i+1] == 1){
                    cellState = 1;
                    div.style.backgroundColor = "#2E2FE3";
                }
        
                else if(firstRow[100] == 1 && firstRow[i] == 0 && firstRow[i+1] == 0){
                    cellState = 1;
                    div.style.backgroundColor = "#2E2FE3";
                }
        
                else if(firstRow[100] == 0 && firstRow[i] == 1 && firstRow[i+1] == 1){
                    cellState = 1;
                    div.style.backgroundColor = "#2E2FE3";
                }
        
                else if(firstRow[100] == 0 && firstRow[i] == 1 && firstRow[i+1] == 0){
                    cellState = 1;
                    div.style.backgroundColor = "#2E2FE3";
                }

                else{
                    cellState = 0;
                    div.style.backgroundColor = "#DDE3FD";
                }
                
            }

            // Last Cell check start
            if(i == 100){
                if(firstRow[i-1] == 1 && firstRow[i] == 0 && firstRow[0] == 1){
                    cellState = 1;
                    div.style.backgroundColor = "#2E2FE3";
                }
        
                else if(firstRow[i-1] == 1 && firstRow[i] == 0 && firstRow[0] == 0){
                    cellState = 1;
                    div.style.backgroundColor = "#2E2FE3";
                }
        
                else if(firstRow[i-1] == 0 && firstRow[i] == 1 && firstRow[0] == 1){
                    cellState = 1;
                    div.style.backgroundColor = "#2E2FE3";
                }
        
                else if(firstRow[i-1] == 0 && firstRow[i] == 1 && firstRow[0] == 0){
                    cellState = 1;
                    div.style.backgroundColor = "#2E2FE3";
                }
        
                else{
                    cellState = 0;
                    div.style.backgroundColor = "#DDE3FD";
                }
            }

            // All the divs inbetween 

            if(firstRow[i-1] == 1 && firstRow[i] == 0 && firstRow[i+1] == 1){
                cellState = 1;
                div.style.backgroundColor = "#2E2FE3";
            }

            else if(firstRow[i-1] == 1 && firstRow[i] == 0 && firstRow[i+1] == 0){
                cellState = 1;
                div.style.backgroundColor = "#2E2FE3";
            }

            else if(firstRow[i-1] == 0 && firstRow[i] == 1 && firstRow[i+1] == 1){
                cellState = 1;
                div.style.backgroundColor = "#2E2FE3";
            }

            else if(firstRow[i-1] == 0 && firstRow[i] == 1 && firstRow[i+1] == 0){
                cellState = 1;
                div.style.backgroundColor = "#2E2FE3";
            }

            else{
                cellState = 0;
                div.style.backgroundColor = "#DDE3FD";
            }
               
            // Pushing the cellState every time a new div is created then it gents appended to the HTML
            nextGen.push(cellState);
            row.appendChild(div);

            // console.log(nextGen);
            // console.log("Pushing state " + cellState + " to " + nextGen[i]);
        }
        root.appendChild(row);
        firstRow = nextGen;
    }
}

const root = document.body.appendChild(document.createElement("div"))
const firstRow = gen0();
genNext(root, firstRow);
