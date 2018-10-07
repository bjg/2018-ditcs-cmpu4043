  /*<!--
      Student: Faoilean Fortune
      StudentNum: C15380201
      Lab1 exercise 2
     -->*/
  var cellObjArr = [];
//function to create the initial row
  function initialRow(){
    let rows = 101;

      for(let i = 0; i < rows; i++)
      {
        //cell object with field for active and the cell div
          let cellObj = {active: true, element: document.createElement("div")};
          let randNum = rando();
          //if randState is less than .5 cell is inactive
          if(randNum < 1){
            cellObj.active = false;
            cellObj.element.setAttribute("style", "display: inline; float: left; background-color: white; border: 0.5px solid black; width: 8px; height: 8px");
            cellObjArr[i] = cellObj.active;
          }
          else{
            cellObj.active = true;
            cellObj.element.setAttribute("style", "display: inline; float: left; background-color: blue; border: 0.5px solid black; width: 8px; height: 8px");
            cellObjArr[i] = cellObj.active;
          }
          //append the initialRow of cells to the document
          var currentDiv = document.getElementById("div1");
          currentDiv.appendChild(cellObj.element);
      }
      let newL = document.createElement("br");
      currentDiv.appendChild(newL);
      //create the other rows
      nextRow();
}

  //function for the rest of the rows
  function nextRow(){
      let nextCellArr = [];
      for(let i = 0; i<50; i++){

        for(let j = 0; j < cellObjArr.length; j++){

          //for the currentCell direct ancestor
          var nextCellObj = {active: true, element: document.createElement("div")};

          //pass the status of cells to the rule function to find the next cell status
          var check = rule(j-1, j, j+1, cellObjArr);
          if(check == false){
            nextCellObj.active = false;
            nextCellObj.element.setAttribute("style", "display: inline; float: left; background-color: white; border: 0.5px solid black; width: 8px; height: 8px");
            nextCellArr[j] = nextCellObj.active;
          }
          else{
            nextCellObj.active = true;
            nextCellObj.element.setAttribute("style", "display: inline; float: left; background-color: blue; border: 0.5px solid black; width: 8px; height: 8px");
            nextCellArr[j] = nextCellObj.active;
          }

          var currentDiv = document.getElementById("div1");
          currentDiv.appendChild(nextCellObj.element);
        }
        var newL = document.createElement("br");
        currentDiv.appendChild(newL);
        cellObjArr = nextCellArr;
        nextCellArr = [];
      }
    }
    //function for the rules
    function rule(leftAncestor, directAncestor, rightAncestor, cellObjArr){
      //if its the first element the row’s last cell’s state in this case
      if(leftAncestor < 0)
      {
        leftAncestor = cellObjArr.length-1;
      }
      //The last cell in a row doesn’t have a right sibling
      //to use the row’s first cell’s state in this case
      else if(rightAncestor > cellObjArr.length -1)
      {

        rightAncestor = 0;
      }

      //rule 1
      if(cellObjArr[directAncestor] == true && cellObjArr[leftAncestor] == true && cellObjArr[rightAncestor] == true){
        return false;
      }
      //rule 2
      else if(cellObjArr[directAncestor] == true && cellObjArr[leftAncestor] == true && cellObjArr[rightAncestor] == false){
        return false;
      }
      //rule 3
      else if (cellObjArr[directAncestor] == false && cellObjArr[leftAncestor] == true && cellObjArr[rightAncestor] == true){
        return true;
      }
      //rule 4
      else if(cellObjArr[directAncestor] == false && cellObjArr[leftAncestor] == true && cellObjArr[rightAncestor] == false){
        return true;
      }
      //rule 5
      else if(cellObjArr[directAncestor] == true && cellObjArr[leftAncestor] == false && cellObjArr[rightAncestor] == true){
        return true;
      }
      //rule 6
      else if(cellObjArr[directAncestor] == true && cellObjArr[leftAncestor] == false && cellObjArr[rightAncestor] == false){
          return true;
      }
      //rule 7
      else if(cellObjArr[directAncestor] == false && cellObjArr[leftAncestor] == false && cellObjArr[rightAncestor] == true){
        return false;
      }
      //rule 8
      else if(cellObjArr[directAncestor] == false && cellObjArr[leftAncestor] == false && cellObjArr[rightAncestor] == false){
        return false;
      }
    }

    function rando(){
      let randomNum = Math.round(Math.random());
      return randomNum;
    }
