// Part 3 of Lab 1

var cells = [];
var row = 101;
var ruleCheck = 0;

var ruleset = [0, 1, 0, 1, 1, 0, 1, 0];

// append the cells as divs onto the first div in the body
// creates the first set of rows
function setup() {

  var start = document.getElementById('cellular');

  for(let i=0; i<row; i++) {
    var cell = document.createElement('div');
    let rand = Math.round(Math.random());
    if (rand < 1) {
      cell.setAttribute('style', '  display:inline; float: left; width: 8px; height:8px; border: black solid; background-color:white');
      cells[i] = 0;
    }
    else {
      cell.setAttribute('style', ' display:inline; float: left; width: 8px; height:8px; border: black solid; background-color:green');
      cells[i] = 1;
    } //end if else

    start.appendChild(cell);
  } //end for

  var nextLine = document.createElement('br');
  start.appendChild(nextLine);
  newRow();
}

// new rows set according to the predecessor rows
function newRow() {
  nextCells = [];
  for (let i=0; i<50; i++) {
    for(let j=0; j<cells.length; j++) {
      var newCell = document.createElement('div');
      //console.log(j);

      if (j == 0) {
        ruleCheck = rules(cells[cells.length-1], cells[j], cells[j+1]);
      }
      else if (j == cells.length-1) {
        ruleCheck = rules(cells[j-1], cells[j], cells[0]);
      }

      ruleCheck = rules(cells[j-1], cells[j], cells[j+1]);

      if (ruleCheck == 0) {
        nextCells[j] = 0;
        newCell.setAttribute('style', '  display:inline; float: left; width: 8px; height:8px; border: black solid; background-color:white');
      }
      else {
        nextCells[j] = 1;
        newCell.setAttribute('style', '  display:inline; float: left; width: 8px; height:8px; border: black solid; background-color:green');
      }
      var initialDiv = document.getElementById('cellular');
      initialDiv.appendChild(newCell);
    } // end inner for
    cells = nextCells;
    nextCells = [];
    var nextLine = document.createElement('br');
    initialDiv.appendChild(nextLine);
  } //end outer for
}

function rules(a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}
