//variables abstracted for code reusability
const num_cols = 101;
const num_rows = 50;
//cell dimensions are ints as used to calculate row dimensions
const cell_width = 8;
const cell_height = 8;
const active = "active";
//active color must be string value else code breaks
const active_color = "green";
const cell_border = "1px solid black";
const cell_margin = "0 1px 0 1px";
const cell_display = "inline-block";
sss

//creates and returns a new state coloured either green or white depending on the value of state (if the cell should be active or not)
function generate_cell(state) {
    var cell = document.createElement('div');
    cell.style.width = cell_width.toString()+"px";
    cell.style.height = cell_height.toString()+"px";
    cell.style.border = cell_border;
    cell.style.display = cell_display;
    cell.style.margin = cell_margin;
    if(state === active) {
        cell.style.backgroundColor = active_color;
    }
    return cell;
}//end generate_cell()


//determines if a cell is active or not depending on its background colour
function is_active(cell) {
    return cell.style.backgroundColor === active_color;
}//end is_active_cell()


//used to generate the first row. ~50% chance of generating an active cell. 
function get_random_state() {
    if(Math.random() < 0.5) {
        return active;
    }
    else return null;
}//end get_random_state()


//returns an empty div (row) to be populated with cells
function row_template() {
    var row = document.createElement('div');
    row.width = (num_cols * cell_width).toString()+"px";
    row.height = cell_height.toString()+"px";
    return row;
}//end row_template()


//generates the first row of cells whos active states are randomly generated
function init_row() {
    var row = row_template();
    for(i=0; i<num_cols; i++) {
        cell = generate_cell(get_random_state());
        row.appendChild(cell);
    }
    return row;
}//end init_row()


//determines if a new cell should be active or not based on the active state of the cells in the previous row at its index, its index-1 and its index+1
function get_new_cell_state(left_cell, middle_cell, right_cell) {
    if(
        ( is_active(left_cell) && !is_active(middle_cell) && is_active(right_cell) )
        ||
        ( is_active(left_cell) && !is_active(middle_cell) && !is_active(right_cell) )
        ||
        ( !is_active(left_cell) && is_active(middle_cell) && is_active(right_cell) ) 
        ||
        ( !is_active(left_cell) && is_active(middle_cell) && !is_active(right_cell) )
        ) 
    {
        return active;
    }
    else 
    {
        return null;
    }
}//end get_new_cell_state()


//gets the next row in the grid with cell active states depending on the active states of the cells in the previous rows
function get_next_row(prev_row) {
    //get all cells from previous row
    var prev_cells = prev_row.querySelectorAll('div');
    var new_row = row_template();
    var left_index, right_index;
    for(index=0; index<num_cols; index++) {
        if(index === 0) {
            var left_index = num_cols-1;
            var right_index = 1;
        }
        else if(index === num_cols-1) {
            right_index = 0;
            left_index = num_cols-2;
        }
        else {
            left_index = index-1;
            right_index = index+1;
        }
        //abstracted cell state here for readability and to reduce complexity
        var cell_state = get_new_cell_state(prev_cells[left_index], prev_cells[index], prev_cells[right_index]);
        var cell = generate_cell(cell_state);
        new_row.appendChild(cell);
    }
    return new_row;
}//end get_next_row()


//use recursion to generate final grid
function generate_grid(p_row, r_count) {
    if(r_count === num_rows) {
        return;
    }
    else {
        document.body.appendChild(p_row);
        var n_row = get_next_row(p_row);
        generate_grid(n_row, r_count+1);
    }
}//end generate_grid()


//draw the grid
generate_grid(init_row(), 0);