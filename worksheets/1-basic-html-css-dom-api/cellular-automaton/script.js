/*-------------------------------------------*\
    script.js
    JavaScript in response to Lab Question 1.3

    Author: Ciarán O'Brien
    Lecture: Brian Gillespie
    Student Number: C15765215
    Date: 20/09/18
\*-------------------------------------------*/
let row_length = 100;
let col_length = 50;
let colour_index_values = [];
let colour_index_new_values = [];

/**
  Function is called on page load
  Simply creates the first row based on a random set of values
*/
window.onload = function create_first_row () {
let x = 0;

    while (x < row_length) {
      let div = document.createElement("div");
      let colour_index = Math.floor(Math.random() * 2);
      colour_index_values.push(colour_index);
      if (colour_index == 1){
        div.style.background = "black";
      }else{
        div.style.background = "white";
      }
        div.style.border = "1px solid";
        div.style.width = "8px";
        div.style.height = "8px";
        div.style.margin = "1px";
        div.style.float = "left";
        document.body.appendChild(div);
        x++;
    }

  let j = 0;
  while(j<=col_length){
    add_row(colour_index_values);
    j++;
  }
}

/**
  Function that adds a new row of cells based on the prevous set of cells.
  @param {array} indexes -  An array of the previous cell colours.
 */
function add_row(indexes){
  let i = 0;
  let left_ancestor;
  let top_ancestor = indexes[0];
  let right_ancestor = indexes[1];
  // var linebreak = document.createElement("div");
  // linebreak.style.clear = "both";
  // document.body.appendChild(linebreak);
  let br = document.createElement("br");

  document.body.appendChild(br);  
  colour_index_new_values[0] = add_first_row_element(indexes, top_ancestor,right_ancestor);
  while(i<row_length-2){
    
    /** 
    Preparing the ancestor varaibles to be sent to function 
    @see set_cell_colour(left_ancestor,top_ancestor,right_ancestor)
    */ 
    let div = document.createElement("div");
    left_ancestor = indexes[i];
    top_ancestor = indexes[i+1];
    right_ancestor = indexes[i+2];

  let new_cell = set_cell_colour(left_ancestor,top_ancestor,right_ancestor);
    
    if (new_cell == 1){
        div.style.background = "black";
        colour_index_new_values[i+1]= new_cell;
      }else{
        div.style.background = "white";
        colour_index_new_values[i+1]= new_cell;
      }
      div.style.border = "1px solid";
      div.style.width = "8px";
      div.style.height = "8px";
      div.style.margin = "1px";
      div.style.float = "left";
      document.body.appendChild(div);
      i++;
  }
  
  /** 
  Preparing variable that'll be pased to functions
  @see add_last_row_element(left_ancestor,top_ancestor,indexes)
  */
  left_ancestor = indexes[indexes.length-2];
  top_ancestor = indexes[indexes.length-1];
  colour_index_new_values.push(add_last_row_element(left_ancestor,top_ancestor,indexes));
  colour_index_values = colour_index_new_values.slice();
  colour_index_new_values = [];
}

/**
  Function that sets the colour of the first element of the row based of the rules if missing left ancestor
  @param {array}    indexes       - An array of the previous cell colours used to set the left ancestor.
  @param {integer}  left_ancestor - Value of the left ancestor.
  @param {integer}  top_ancestor  - Value of the top ancestor.
  return {integer}  cell_value    - newly set cell value.
 */
function add_first_row_element(indexes, top_ancestor,right_ancestor){
  let div = document.createElement("div");
  let cell_value = 0;
  
  if(set_cell_colour(indexes.slice(-1)[0],top_ancestor,right_ancestor) === 0){
     div.style.background = "white";
  }
  else{
     div.style.background = "black";
    cell_value = 1;
  }
      div.style.border = "1px solid";
      div.style.width = "8px";
      div.style.height = "8px";
      div.style.margin = "1px";
      div.style.float = "left";
      document.body.appendChild(div);
  return cell_value;
}

/**
  Function that sets the colour of the last element of the row based of the rules if missing right ancestor
  @param {integer}  left_ancestor - Value of the left ancestor.
  @param {integer}  top_ancestor  - Value of the top ancestor.
  @param {array}    indexes       - An array of the previous cell colours used to set the right ancestor.
  return {integer}  cell_value    - newly set cell value.
 */
function add_last_row_element(left_ancestor, top_ancestor, indexes){
  let div = document.createElement("div");
  let cell_value = 0;
  if(set_cell_colour(left_ancestor,top_ancestor,indexes[0]) === 0){
     div.style.background = "white";
  }
  else{
     div.style.background = "black";
     cell_value = 1;
  }
      div.style.border = "1px solid";
      div.style.width = "8px";
      div.style.height = "8px";
      div.style.margin = "1px";
      div.style.float = "left";
      document.body.appendChild(div);
  return cell_value;
}
  
/**
  Function that sets the colour of the next cell based off the ancestors.
  @param {integer}    left_ancestor   - Value of the left ancestor.
  @param {integer}    top_ancestor    - Value of the top ancestor.
  @param {integer}    right_ancestor  - Value of the right ancestor.
  return {integer}    new_cell        - newly set cell value.
 */
function set_cell_colour(left_ancestor,top_ancestor,right_ancestor){
    let new_cell = 0;
    //Rule 1
    if (left_ancestor == 1 && top_ancestor == 1 && right_ancestor == 1){
      new_cell = 0;      
    }
    
    //Rule 2
   if (left_ancestor == 1 && top_ancestor === 1 && right_ancestor === 0){
      new_cell = 0;      
    }
    
    //Rule 3
    if (left_ancestor == 1 && top_ancestor ===0 && right_ancestor ==1){
      new_cell = 1;      
    }
    
    //Rule 4
    if (left_ancestor == 1 && top_ancestor === 0 && right_ancestor === 0){
      new_cell = 1;      
    }
    
    //Rule 5
    if (left_ancestor === 0 && top_ancestor == 1 && right_ancestor == 1){
      new_cell = 1;      
    }
    
    //Rule 6
    if (left_ancestor ===0 && top_ancestor == 1 && right_ancestor === 0){
      new_cell = 1;      
    }
    
    //Rule 7
    if (left_ancestor === 0 && top_ancestor ===0 && right_ancestor == 1){
      new_cell = 0;      
    }
    
    //Rule 8
    if (left_ancestor === 0 && top_ancestor === 0 && right_ancestor === 0){
      new_cell = 0;      
    }
    return new_cell;
}