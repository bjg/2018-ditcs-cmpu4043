// Create and set the global variables needed in this program.
const cols = 101;
const rows = 50;
const totalWidth = 8 * cols;
const totalHeight = 8 * rows;
document.body.setAttribute("style", "width: " + totalWidth + "px; height: " + totalHeight + "px;");

let state = new Array();

start()

function start() {

  //Generate a random state for each cell in the first row
  for(var i = 0; i < cols; i++) {
    state[i] = Math.round(Math.random());
  }

  //Draw rows (50 times)
  for(var i = 0; i < rows; i++) {
    drawCells()
  }

}

/*  Function that draws the correct cell depending on the cell's state.
    Everytime a row is drawn, the function find the new state by calling findNewState. */
function drawCells() {

  for(var i = 0; i < cols; i++) {

    const cell = document.createElement('div');

    if (state[i] == 1){
      cell.setAttribute("style", "background-color: black; width: 8px; height: 8px; float: left;");
    }
    else {
      cell.setAttribute("style", "width: 8px; height: 8px; float: left;");
    }

    document.body.appendChild(cell);
  }

  findNewState()
}

/*  Gets the state from the array state[] and applies the necessary rules to find the new state.
    Each state that is necessary will be stored in a variable and a new temp Array is created.
    Once the new states are found, they will be copied to the global array state[] */
function findNewState(){

  let newState = new Array();
  let prev;
  let anc;
  let next;

  for(i = 0; i < cols; i++) {

    anc = state[i];

    if(i == 0){
      prev = state[state.length-1];
      next = state[i+1];
    }
    else if( i == state.length - 1) {
      prev = state[i-1];
      next = state[0];
    }
    else{
      prev = state[i-1];
      next = state[i+1];
    }

    if(prev == 1 && anc == 1 && next == 1) {
      newState[i] = 0;
    }
    else if (prev == 1 && anc == 1 && next == 0) {
      newState[i] = 0;
    }
    else if (prev == 1 && anc == 0 && next == 1) {
      newState[i] = 1;
    }
    else if (prev == 1 && anc == 0 && next == 0) {
      newState[i] = 1;
    }
    else if (prev == 0 && anc == 1 && next == 1) {
      newState[i] = 1;
    }
    else if (prev == 0 && anc == 1 && next == 0) {
      newState[i] = 1;
    }
    else if (prev == 0 && anc == 0 && next == 1) {
      newState[i] = 0;
    }
    else if (prev == 0 && anc == 0 && next == 0) {
      newState[i] = 0;
    }
  }
  state = newState.slice();
}
