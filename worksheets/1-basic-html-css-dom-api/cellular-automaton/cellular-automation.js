// C15523957 - David Kilroy 

// append a table to the body tag

let body = document.getElementsByTagName("body")[0];
let table = document.createElement("table");
body.appendChild(table);

/* 
    one array for keeping track of previous row and another for
    keeping track of current row 
*/
let previous_array = [];
let current_array =[];
const cellCount = 101;

/* 
   takes care of first iteration of the 50 rows, as this as a different functionality
   to the other function of adding the other 49 rows based on an algorithm I split it
   into another function 
*/

let addRandomFirstRow = () => {
    let firstRow = table.insertRow(0);
    for(let cellCounter = 0;cellCounter <cellCount; cellCounter++){
        let currentCell = firstRow.insertCell(cellCounter);
        let randomColor = Math.random();
        if(randomColor > .5){
            styleCell("black",currentCell);
            current_array.push("black");
        }else{
            styleCell("white",currentCell);
            current_array.push("white");
        }
    }

    /* the previous array now contains the current array values and
    the current array is ready to be reinitialised based on an alogrithm below */

    previous_array = current_array;
    current_array = [];
};

/* this function takes care of the other 49 iteration of rows,
   it calls the determineColor function which returns a white or
   black value depending on the values of the previous row
   and then calls the styleCell which paints the cell white 
   or black depending on the value returned from the determineColor
   funciton */

let addOtherRows = () =>{
    const rowCount = 50;

    // rowN starts at 1 because first row as alrady been randomly initialised

    for(let rowN = 1; rowN<= rowCount ; rowN++){
        let rowCurrent = table.insertRow(rowN);

        for(let cellCounter = 0;cellCounter <cellCount; cellCounter++){
            let currentCell = rowCurrent.insertCell(cellCounter);
            let color = determineColor(cellCounter);
            styleCell(color,currentCell);
            current_array.push(color);
        }
        previous_array = current_array;
        current_array = [];
    } 
};

// this function styles cells based on a color from the determineColor funciton

let styleCell = (color,cell) => {
    cell.style.backgroundColor=color;
    cell.style.border = "2px solid black";
    cell.style.width= "8px";
    cell.style.height= "8px";
};

/*
    this funciton takes in a position, and determines the new cell position based on previous array
*/

let determineColor = (pos)=> {

    let left = pos-1; 
    let current = pos; 
    let right = pos+1;

    // case of cell being on utmost left or right side of row 

    if(current === 0){
        left = 100;
    }else if(current === 100){
        right = 0;
    }

    // determine all cases where black is true, else return white
    if(
        (previous_array[left] == "black" && previous_array[current] === "white" && previous_array[right] === "black")
        ||
        (previous_array[left] == "black" && previous_array[current] === "white" && previous_array[right] === "white")
        ||
        (previous_array[left] == "white" && previous_array[current] === "black" && previous_array[right] === "black")
        ||
        (previous_array[left] == "white" && previous_array[current] === "black" && previous_array[right] === "white")
    ){
        return "black";
    }else{
        return "white";
    }
};

// main funciton calls itself and runs the first iteration and then the other 49 ones

(
    function main(){
        addRandomFirstRow();
        addOtherRows();
    }
)();