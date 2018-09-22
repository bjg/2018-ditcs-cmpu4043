//Inits the first row of cells
//
function loadCells(){
    var cells = new Array()
    var row = document.createElement("div");
    row.id = "row0"
    document.getElementById("main").appendChild(row);
    for(i = 0; i < 101; i++){
        var div = document.createElement("div");
        div.style.width = "5px";
        div.style.height = "5px";
        
        if((Math.floor(Math.random() * 10) + 1) > 5){
            div.style.background = "black";
            cells[i] = 1;
        }
        else{
            div.style.background = "white";
            cells[i] = 0;
        }
        
        div.style.border= "1px solid black";
        div.style.float= "left";
        document.getElementById("row0").appendChild(div);
    }
    
    runCells(cells, 50)
}

function cellRules(cell1, cell2, cell3){
    if(cell1 == 1 && cell2 == 1 && cell3 == 1) return 0;
    else if(cell1 == 1 && cell2 == 1 && cell3 == 0) return 0;
    else if(cell1 == 1 && cell2 == 0 && cell3 == 1) return 1;
    else if(cell1 == 1 && cell2 == 0 && cell3 == 0) return 1;
    else if(cell1 == 0 && cell2 == 1 && cell3 == 1) return 1;
    else if(cell1 == 0 && cell2 == 1 && cell3 == 0) return 1;
    else if(cell1 == 0 && cell2 == 0 && cell3 == 1) return 0;
    else if(cell1 == 0 && cell2 == 0 && cell3 == 0) return 0;
    
}

function runCells(cells, rowNum){
    if(rowNum == 0) return;
    var row = document.createElement("div");
    row.id = "row" + rowNum;
    row.style.clear = "both";
    document.getElementById("main").appendChild(row);
    newCells = new Array()

    for(i = 0; i < 101; i++){
        var div = document.createElement("div");
        div.style.width = "5px";
        div.style.height = "5px";        
        div.style.border= "1px solid black";
        div.style.float= "left";
        newCells[i] = cellRules(cells[(((i - 1) % 101) + 101) % 101],
                               cells[i],
                               cells[(((i + 1) % 101) + 101) % 101]);
        
        if(newCells[i] == 1){
            div.style.background = "black";
        }
        else{
            div.style.background = "white";
        }
        document.getElementById("row" + rowNum).appendChild(div);
    }
    
    runCells(newCells, rowNum - 1);
}