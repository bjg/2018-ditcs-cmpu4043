(function() {
  
  var i, j, mainCube, a, div, elements; //declare variables
  elements = document.querySelectorAll(".container"); //storing div from html in elements
  mainCube = []; //created array
  for (i = 0; i < elements.length; ++i) {
      mainCube[i] = a = []; //for every slot in array fill it with another array
      for (j = 0; j < 101; ++j) {
          // Create this div
          mainCube[i][j] = div = document.createElement('div');
		  
		  
		  var x = Math.floor((Math.random() * 4) + 1);
		  
		  //active (black)
		  if( x == 2){
          // Add class and such to div (from css)
				 div.className = "letterPix";
		  
		  }//inactive (red)
		  else {
			     div.className = "letterPix2";
		  }
			  

          // Append it to the mainCubeClass(canvas) element
          elements[i].appendChild(div);
      }
  }
  
  
/* function cellState(oldstate,
    	    	    nw, n  , ne,
            	    w, cell, e,
              	    sw, s  , se
              ) {
    var sum, newCellState = 0;
		
    sum = nw + n + ne + e + se + s + sw + w;
    
    switch (cell) {
        case 0:
            if (sum == 3) {
                newCellState = 1;
            } else {
                newCellState = 0;
            }
            break;

        case 1:
            if (sum == 2 || sum == 3) {
                newCellState = 1;
            } else {
                newCellState = 0;
            }
            break;
    }

    return newCellState;
}
}
  */
  
})();