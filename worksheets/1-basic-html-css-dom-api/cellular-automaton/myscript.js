var grid_width = 101;
var grid_height = 50;

//0 not active 
//1 active
var current_row_values = [];


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


function drawRowFromArray(arr){

    for(i = 0; i < arr.length; i++){              
        if(arr[i] == 0){
            var cell = generateWhiteCell();
        }else{
            var cell = generateBlackCell();
        }
        document.body.appendChild(cell);
    }
    var br = document.createElement("BR");
    document.body.appendChild(br);
}

function generateFirstRow(){
    var randomNumber = 0;

    for(i = 0; i < grid_width; i++){
        randomNumber = Math.floor(Math.random() * 10);
        if(randomNumber <= 5){
            current_row_values[i] = 0;
        }
        else{
            current_row_values[i] = 1;
        }
    }
    
}

function generateNewRow(curr_arr){

    drawRowFromArray(curr_arr);
    //Take the global current_row_values which were randomly set and generates a new row. It then sets current_row_values to this new row
    var new_row_array = new Array(curr_arr.length)
    new_row_array.fill(1);

    var first_elem = 0;
    var last_elem = curr_arr.length - 1;
    //Determine 1st element and last element: There is a bug here for 000
    if((curr_arr[first_elem] == 1 && curr_arr[last_elem] == 1) || ((curr_arr[first_elem] == 0 && curr_arr[last_elem] == 0))){
        curr_arr[first_elem] = 0;
    }
    
    for(i = 1; i <= curr_arr.length - 1;i++){
        //if left and middle equal 1 then off!!!!   
        if((curr_arr[i - 1] == 1 && curr_arr[i] == 1) || (curr_arr[i - 1] == 0 && curr_arr[i] == 0)) {
            new_row_array[i] = 0;
        }
    }
    current_row_values = new_row_array;
    return new_row_array;
}

function printArrayValues(arr){
    var str = "";
    for(i = 0; i < arr.length; i++){
        str += arr[i];
    }
    console.log(str);
}


function drawGrid(){
    console.log(current_row_values);
    var row_to_draw = generateNewRow(current_row_values);
}


generateFirstRow();
var y_counter = 0;
while(y_counter < grid_height){
    drawGrid();
    y_counter++;
}
