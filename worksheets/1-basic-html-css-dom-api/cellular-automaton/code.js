var rows = 50, cols = 101;

var firstRow = [];
var nextRow = [];

var i,j;

//1,1,1,0 1,1,0,0 1,0,1,1 1,0,0,1 0,1,1,1 0,1,0,1 0,0,1,0 0,0,0,0

function createGrids() {

    //creates the first row
    for(i = 0; i <  cols; i++){
        firstRow[j] = (Math.round(Math.random()));
    }
    //pushes the first row in the nextRow array
    nextRow.push(firstRow);

    for ( i = 0; i < rows; i ++){
        var current = [];
        for( j = 0; j < cols; j++){
            
            //vars for the columns above the current one
            var left = j - 1;
            var middle = j;
            var right = j + 1;

            //if first col check the prev one as it doesn’t have a left 
            //sibling to use the row’s last cell’s state in this case
            if (j == 0){
                left = cols - 1;
            }
            if (j == cols - 1){
                right = 0;
            }
            if((
                nextRow[i - 1]
                [middle] === 1) && 
            (nextRow[i - 1][left] == 1) && 
            (nextRow[i - 1][right] == 1)){
                current[j] = 1;
            }    
            if ((nextRow[i - 1][middle] === 1) &&  (nextRow[i - 1][left] == 1) && (nextRow[i - 1][right] == 0)){
                current[j] = 0;
              }
            if ((nextRow[i - 1][topColumn] === 0) &&  (nextRow[i - 1][left] == 1) && (nextRow[i - 1][right] == 1)){
                current[j] = 1;
            }
            if ((nextRow[i - 1][topColumn] === 0) &&  (nextRow[i - 1][left] == 1) && (nextRow[i - 1][right] == 0)){
                current[j] = 1;
            }
            if ((nextRow[i - 1][topColumn] == 1) &&  (nextRow[i - 1][left] == 0) && (nextRow[i - 1][right] == 1)){
                current[j] = 0;
            }
            if ((nextRow[i - 1][topColumn] == 1) &&  (nextRow[i - 1][left] == 0) && (nextRow[i - 1][right] == 0)){
                current[j] = 1;
            }
            if ((nextRow[i - 1][topColumn] === 0) &&  (nextRow[i - 1][left] == 0) && (nextRow[i - 1][right] == 1)){
                current[j] = 1;
            }
            if ((nextRow[i - 1][topColumn] === 0) &&  (nextRow[i - 1][left] == 0) && (nextRow[i - 1][right] == 0)){
                current[j] = 0;
            }
        }
        nextRow.push(current);
    }

    for (i = 0; i < rows; i ++){
        var gridContainer = document.createElement('div');

        for (j = 0; j < cols; j++){
            var cells = document.createElement('div');
            cells.style.height = "8px";
            cells.style.width = "8px";

            if(nextRow[x][y].toString() == "1"){
                cells.style.backgroundColor = "black";
                gridContainer.appendChild(cells);
            }
            else{
                cells.style.backgroundColor = "white";
                gridContainer.appendChild(cells);
            }
        }
        document.body.appendChild(gridContainer);
    }
}



//     var gridContainer = document.getElementById("grid");
//     var table = document.createElement("table");
//         for ( var i = 0; i < rows; i ++){
//             var tr = document.createElement("tr");
//             for ( var j = 0; j < cols; j++ ){
//                 var div = document.createElement("td");
//                 div.setAttribute("id", i + "_" + j);

//                 var active = Math.round(Math.random() * 2);
//                 if ( active == 1){
//                     div.style.backgroundColor = "black";
//                     div.setAttribute("active", 1);

//                 } else {
//                     div.style.backgroundColor = "white";
//                     div.setAttribute("active", 0)
//                 }

//                 var left = document.getElementById( [i-1] + "_" + [j-1]);
//                 var mid = document.getElementById( [i-1] + "_" + [j]);
//                 var right = document.getElementById ([i-1] + "_" + [j+1]);
            
//                 leff = left.getAttribute("active");
//                 midd = mid.getAttribute("active");
//                 rightt = right.getAttribute("active");
//                 console.log(rightt);
                

//                 //nextdiv.setAttribute("active", "no");
                
//                 arr.push[leff,midd,rightt,active];
//                 //console.log(arr[1]);

//                 div.style.height = "8px";
//                 div.style.width = "8px";
//                 tr.appendChild(div);

//             }
//             table.appendChild(tr);

//         }
//     gridContainer.appendChild(table);


// }



// // function setRules(){
// //     for ( i = 1; i < rows; i++){
// //         for (var j = 0; j < cols; j ++){
// //             var nextdiv = document.getElementById( [i] + "_" + [j]);
// //             nextdiv.getAttribute("active");
// //             arr.push
// //             console.log(div.getAttribute("id"));
// //         }
// //     }
// // }


// // Lay out the board
// function createGrids2() {
//     var gridContainer = document.getElementById('grid');

//     var table = document.createElement("table");
    
//     for (var i = 0; i < 1; i++) {
//         var tr = document.createElement("tr");
//         for (var j = 0; j < cols; j++) {
//             div = document.createElement("td");
//             div.setAttribute("id", i + "_" + j);
//             var active = Math.round(Math.random()*2);
//             if (active == 1){
//                 div.style.backgroundColor = "white";
//                 div.setAttribute("active","no");
//             }
//             else{
//                 div.style.backgroundColor = "black";
//                 div.setAttribute("active", "yes");
//             }
//             //console.log(div.getAttribute("id"));
//             //console.log(div.getAttribute("active"));
//             div.style.height = "8px";
//             div.style.width = "8px";
//             tr.appendChild(div);
//         }
//         table.appendChild(tr);
//     }
//     gridContainer.appendChild(table);

//     for (var i = 1; i < rows; i++) {
//         var tr = document.createElement("tr");
//         for (var j = 0; j < cols; j++) {
//             div = document.createElement("td");
//             div.setAttribute("id", i + "_" + j);

            

//             //var get = leftabove.getAttribute("id");
            
//             //console.log(get);
                            
//             //rule 1
//             // if(leftabove.getAttribute("active" == "yes") &&  middleabove.getAttribute("active" == "yes") && rightabove.getAttribute("active" == "yes")){
//             //     var nextdiv = document.getElementById( [i] + "_" + [j]);
//             //     nextdiv.setAttribute("active", "no");
//             //     nextdiv.style.backgroundColor = "black";
//             // }
// //                         }

//             //console.log(div.getAttribute("id"));
//             //console.log(div.getAttribute("active"));
//             div.style.height = "8px";
//             div.style.width = "8px";
//             tr.appendChild(div);
//         }
//         table.appendChild(tr);
//     }
//     gridContainer.appendChild(table);

//     createOtherRows();

// function createOtherRows(){
//     for ( var i = 2; i < rows; i++){
//         for ( var j = 0; j < cols; j++){
//             div = document.getElementById([i-1]+"_"+ [j-1]);
//             var middleabove = document.getElementById([i-1]+"_"+[j]);
//             var rightabove = document.getElementById([i-1]+"_"+j+[1]);
            

//                 //console.log(div.getAttribute("id"));
//                 div.style.backgroundColor = "yellow";
//             //rule 1
//             // if(leftabove.getAttribute("active" == "yes") &&  middleabove.getAttribute("active" == "yes") && rightabove.getAttribute("active" == "yes")){
//             //     var nextdiv = document.getElementById( [i] + "_" + [j]);
//             //     nextdiv.setAttribute("active", "no");
                 
//             // }
            
//         }
        
//         //console.log(leftabove);
//     }
// }
//     //div.style.backgroundColor = "yellow";
//     // for (var i = 0; i < rows; i++) {
//     //     grid[i] = new Array(cols);
//     //     nextGrid[i] = new Array(cols);
//     // }
// //    var div;
// //     for (var i = 0; i < rows; i++) {
// //         for (var j = 0; j < cols; j++) {
// //             div = document.getElementById([i] + "_" + [j]);

// //                 if(div.getAttribute("active") == "yes"){
                    
//     //console.log(leftabove.getAttribute("id"));
//                     // div = document.getElementById(i + "_" + j + 1);
//                     // //if(div.getAttribute("active") == "yes"){
//                     //     div = document.getElementById ([i] + "_" + [j +2])
//                     //     //div.style.backgroundColor = "yellow";
//             //     }
//             //     alert(div.getAttribute("leftneigh"));
//             // }
//             // if(div.getAttribute("leftneigh" == "yes")){
//             //     div.style.backgroundColor = "yellow"
//             // }
//                 //div.setAttribute("active", i + "_" + j);
//                 //grid[i][j] = 1;
//                 // if (grid[2][j] == active){
//                 //     var div = document.getElementById(i + "_" + j+1);
//                 //     div.style.backgroundColor = "white";
//                 //     //div.setAttribute("inactive", i, "_" + j+1);
//                 // }
//                // }
//     //         }
//     //     }
//     // }
    

//     // for (var i = 1; i < rows; i++) {
//     //     for (var j = 0; j < cols; j++) {

//     //     }
//     // }

//     // for (var i = 0; i < rows; i++) {
//     //     for (var j = 0; j < cols; j++) {
//     //         applyRules(i, j);
//     //     }
//     // }
// }


// // Rules

// // function applyRules(row, col) {
// //     var numNeighbors = countNeighbors(row, col);
// //     if (grid[row][col] == 1) {
// //         if (numNeighbors < 2) {
// //             nextGrid[row][col] = 0;
// //         } else if (numNeighbors == 2 || numNeighbors == 3) {
// //             nextGrid[row][col] = 1;
// //         } else if (numNeighbors > 3) {
// //             nextGrid[row][col] = 0;
// //         }
// //     } else if (grid[row][col] == 0) {
// //             if (numNeighbors == 3) {
// //                 nextGrid[row][col] = 1;
// //             }
// //         }
// //     }
    
// // function countNeighbors(row, col) {
// //     var left = 0;
// //     var right = 0;
// //     var under = 0;

// //     if (row-1 >= 0) {
// //         if (grid[row-1][col] == 1) left++;
// //     }
// //     if (row-1 >= 0 && col-1 >= 0) {
// //         if (grid[row-1][col-1] == 1) count++;
// //     }
// //     if (row-1 >= 0 && col+1 < cols) {
// //         if (grid[row-1][col+1] == 1) count++;
// //     }
// //     if (col-1 >= 0) {
// //         if (grid[row][col-1] == 1) count++;
// //     }
// //     if (col+1 < cols) {
// //         if (grid[row][col+1] == 1) count++;
// //     }
// //     if (row+1 < rows) {
// //         if (grid[row+1][col] == 1) count++;
// //     }
// //     if (row+1 < rows && col-1 >= 0) {
// //         if (grid[row+1][col-1] == 1) count++;
// //     }
// //     if (row+1 < rows && col+1 < cols) {
// //         if (grid[row+1][col+1] == 1) count++;
// //     }
// //     return count;
// // }

// Start everything
window.onload = createGrids;