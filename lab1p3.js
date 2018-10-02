//Lab 1 part 3 
//Anatasya O'Connell C13365696
//28/09/18



//creating variable of button
var btn1 = document.querySelector('#B1');


btn1.addEventListener('click', init_row); //when button is clicked create grid
btn1.addEventListener('click', removeButton); //when button is clicked remove button



//func to remove the button
function removeButton() {
    var elem = document.querySelector('#B1');
    elem.parentNode.removeChild(elem);
   }

//function to create first row of cells
function init_row() {

    var row = document.getElementById("myRow");
    var grid =[];

    for (i = 0; i < 101; i++) { 
      var x = row.insertCell(0);
      x.style.border = "thin solid black"; //style of divs
	  x.style.width = "8px";
	  x.style.height = "8px";
	  for(j = 0; j < 101; j++){
          grid[j] = x;
	  } 
	  determineState(x);
    }//end for
}//end init_row



   function determineState(x){
 	var1 = Math.random(); //random number between 1 and 0
 	var state;

      if (var1 > 0.5) {
     	x.style.backgroundColor = "black";
      }//end if
 
     else {
 	    x.style.backgroundColor = "white"
      }//end else
 }//end determineState


 function createGrid(grid){

        

 }


  
 
	    




