// set the max width of the body to 101 divs at 8px each
// this pushes the 102nd div to the next row
document.body.style.width = '808px';

// variables for for loops in making the rows/cols
let width = 101;
let height = 50;

// global variables for holding the status of the ancestors in previous rows
let leftParent = '';
let directParent = '';
let rightParent = '';

// declare array to track status of each div/block
let descendants = [width];

// make the first row, with randomized statuses for each div
makeFirstRow();

// after first row is made, make other rows, using descendants array as guide
buildOtherRows();


// make first row, values for active/inactive cells are randomised
function makeFirstRow()
{
  // for 101 blocks
  for (let i = 0; i < width; i++)
  {
    // build a single random block
    let firstBlock = buildBlock(true);

    // update the descendants array with the randomised value from the new block
    descendants[i] = firstBlock.text;

    // append the block to body
    document.body.appendChild(firstBlock);
  }
  // update the global descendants array to the new values for next row
  updateArray();
}

// after first row is built, build the other rows based on the descendants array values
function buildOtherRows()
{
  // for 49 more rows
  for (let i = 0; i < height-1; i++)
  {
    // for 101 cols
    for (let j = 0; j < width; j++)
    {
      // build a blank block of 8x8 px
      let firstBlock = buildBlock(false);

      // if the descendants array value is 1, then this block should be active/black
      if(descendants[j] === 1)
      {
        // udate background colour of the new block
        firstBlock.style.backgroundColor = 'black';
      }

      // append the new block to body
      document.body.appendChild(firstBlock);

    } // end inner for loop for cols

    // update the global descendants array to the new values for next row
    updateArray();

  } // end out for loop for rows

} // end function buildOtherRows()


// update the descendants array with new values for next row
function updateArray()
{
  // create a temporary array to store the new values
  let tempArray = [];

  // loop over the current values in the descendants array
  for (var i = 0; i < descendants.length; i++)
  {
    // check if it is the first block in the row
    if(i===0) // first block
    {
      leftParent = descendants[descendants.length-1];  // last element in previous row
      rightParent = descendants[i+1];
    }
    // check if it is the last block in the row
    else if (i === descendants.length-1) // last block
    {
      rightParent = descendants[0]; // first element in the same row
      leftParent = descendants[i-1];
    }
    // otherwise it is a standard block in the row, neither first nor last
    else // mid-row block
    {
      leftParent = descendants[i-1];
      rightParent = descendants[i+1];
    }

    // directParent is always directly above in previous row
    directParent = descendants[i];

    // check what ancestory rules apply to the new block
    // and add the resulting value to the tempArray at that index

    // if all 3 ancestor cells are active
    if(leftParent === 1 && directParent === 1 && rightParent === 1)
    {
      tempArray[i] = 0;
    }
    // if 1st and 2nd ancestor cells are active
    else if (leftParent === 1 && directParent === 1 && rightParent === 0)
    {
      tempArray[i] = 0;
    }
    // if 1st and 3rd ancestor cells are active
    else if (leftParent === 1 && directParent === 0 && rightParent === 1)
    {
      tempArray[i] = 1;
    }
    // if only 1st ancestor cell is active
    else if (leftParent === 1 && directParent === 0 && rightParent === 0)
    {
      tempArray[i] = 1;
    }
    // if 2nd and 3rd ancestor cells are active
    else if (leftParent === 0 && directParent === 1 && rightParent === 1)
    {
      tempArray[i] = 1;
    }
    // if only 2nd ancestor cell is active
    else if (leftParent === 0 && directParent === 1 && rightParent === 0)
    {
      tempArray[i] = 1;
    }
    // if only 3rd ancestor cell is active
    else if (leftParent === 0 && directParent === 0 && rightParent === 1)
    {
      tempArray[i] = 0;
    }
    // if NO ancestor cells are active
    else if (leftParent === 0 && directParent === 0 && rightParent === 0)
    {
      tempArray[i] = 0;
    }
    // if something went wrong
    else
    {
        // output an error msg
        console.log("WARNING: Error with setting status of block at index: " + i);
    }

  } // end the loop over the descendants array, that set new values in tempArray

  // overwrite the global descendants array with the values in the local tempArray
  descendants = tempArray.slice();

} // end function updateArray()

// function to build a randomised block for the first row
function buildBlock(flag)
{
  // create the div element
  let div = document.createElement("div");

  // set the attributes for a standard div
  div.style.height = '8px';
  div.style.width = '8px';
  div.style.float = 'left';

  // if row is ramdomised row i.e. the first row
  if (flag)
  {
    // get a random value
    let random = Math.round(Math.random());

    // set the backgroundColor of the
    // div depending on the random value
    if (random === 1)
    {
      div.style.backgroundColor = 'black';
      div.text = random;  // set status to active
    }
    else
    {
      div.text = 0;       // set status to inactive
    }
  } // otherwise is not a randomised value


  // return the new div
  return div;
}
