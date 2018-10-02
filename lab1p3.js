//creating variable of button
var btn1 = document.querySelector('#B1');

//console.log("parent node is : ", btn1.parentNode); //To check parent node


//btn1.addEventListener('click', removeButton); //when button is clicked remove button
btn1.addEventListener('click', myFunction); //when button is clicked create grid



//func to remove the button
function removeButton(btn1) {
	
    btn1.parentNode.removechild(btn1);

    //Uncaught TypeError: Cannot read property 'removechild' of undefined
    //at HTMLButtonElement.removeButton 
    //error message
}

//function to create the grid
/*function createGrid() {

	var divArray = [];//create an array of 100 to be used to create divs
    var temp;
    var var1; //boolean
    
  for (i = 0; i < 101; i++) { //run through array using for loop, 
	  temp = document.createElement('div'); //create div element for each array value
	  temp.className = "divGrid"; //add class name to each div
	  temp.style.border = "thin solid black"; //style of divs
	  temp.style.width = "8px";
	  temp.style.height = "8px";
	  temp.style.position = "relative"
	  temp.innerHTML = divArray[i];*/


function myFunction() {

    var row = document.getElementById("myRow");

    for (i = 0; i < 101; i++) { 
    var x = row.insertCell(0);
    x.style.border = "thin solid black"; //style of divs
	  x.style.width = "8px";
	  x.style.height = "8px";

  
  var1 = Math.random(); //random number between 1 and 0

  if (var1 > 0.5) {
  	x.style.backgroundColor = "yellow";
}
 
 else {
 	x.style.backgroundColor = "green"
 }

}
  
 
	    
}



