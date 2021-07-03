let row_size = 101;
let column_size = 50;
let ancestorArray=[];
let blockColour, rightSibling, parent, leftSibling;
document.body.style.width = 8*row_size;

initalRow();

function initalRow(){
//loop to create the first row of div's 8x8 coloured balck or white and stored in an array
for(let i = 0; i < row_size; i++ ){
  blockColour = Math.round(Math.random());
  drawBlock(blockColour);
  ancestorArray[i]=blockColour;
  }
subsequentRows();
}

function subsequentRows(){
  //doing the subsequent rows and columns after the inital row.
  for(let i = 0; i < column_size; i++ ){
    let childArray = [];
    for(let j = 0; j < row_size; j++){

      determineAncestors(j);
      blockColour=rules();
      drawBlock(blockColour);
      childArray[j]=blockColour;
      }
      //copy the child array back into the ancestory array
      ancestorArray = childArray.slice();
  }
}

//function to draw the divs with their corresponding colour
function drawBlock(blockColour){
  let block = document.createElement("DIV");
  block.style.height = "8px";
  block.style.width = "8px";
  block.style.float = "left";
  if(blockColour === 0){
    block.style.background = "black";
  }
  else if (blockColour === 1){
    block.style.background = "yellow";
  }
  document.body.appendChild(block);
}

//determine the rightSibling leftSibling and Parent stored in a gloabl variable
function determineAncestors(j){
  parent = ancestorArray[j];
  if(j === 0){
    leftSibling = ancestorArray[row_size-1];
  }
  else {
    leftSibling = ancestorArray[j-1];
  }
  if(j === row_size-1){
    rightSibling = ancestorArray[0];
  }
  else {
    rightSibling= ancestorArray[j +1];
  }
}

//determing the ancestors of the current block
function rules(){
//Rule 1 and 2
//If the Parent and the sibling to the left is active the child is active regardless of the state of the sibling to the right
if(parent === 1 && leftSibling === 1){
    blockColour = 0;
}
//Rule 7
//if the right sibling of the parent is active and the parent and sibling to the left inactive the child is active.
else if(parent === 0 && leftSibling === 0 && rightSibling === 1){
    blockColour = 0;
}
//Rule 8
//If all ancestors are inactive then the child will be inactive
else if(parent === 0 && leftSibling === 0 && rightSibling === 0){
    blockColour = 0;
}
else{
  blockColour =1;
}
return blockColour;
}
