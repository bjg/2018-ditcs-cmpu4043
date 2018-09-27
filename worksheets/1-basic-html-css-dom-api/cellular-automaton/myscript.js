var grid_width = 101;
var grid_height = 50;

function generateWhiteCell(){
    var cell = document.createElement("div");
    cell.style.width = "8px";
    cell.style.height = "8px";
    cell.style.background = "white";
    cell.style.border = "thin solid #000000";
    cell.style.display = "inline-block";
    return cell;

    
}

function generateBlackCell(){
    var cell = document.createElement("div");
    cell.style.width = "8px";
    cell.style.height = "8px";
    cell.style.background = "black";
    cell.style.border = "thin solid #000000";
    cell.style.display = "inline-block";
    return cell;
}

function generateDivs(){

    for(i = 0; i < grid_height; i++){  
        var x_row = document.createElement("div"); 
            
        for(j = 1; j <= grid_width; j++){
            var cell = generateWhiteCell();
            x_row.appendChild(cell);   
        }
        document.body.appendChild(x_row);
        

    }
}

generateDivs();