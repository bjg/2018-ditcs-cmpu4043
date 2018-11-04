import Rx from 'rxjs/Rx';

// select input field
const inputField = document.querySelector("input[type=text]");

// select all buttons
const bttns = document.querySelectorAll(".flex-item");


// create stream from obervable
const stream$ = Rx.Observable.from(bttns)
	// map to stream array of obervable clicks
	.map(bttn => Rx.Observable.fromEvent(bttn, 'click')
	// map those to the button value
	.mapTo(bttn.textContent))
	// flatten all streams into 1 stream
	.mergeAll()
	// adding keyboard keys
	.merge(Rx.Observable.fromEvent(document, 'keypress')
	// pick out "key" attribute
    .pluck('key'));
	
	
stream$.subscribe(value => {
	
  var valueOfScreen = inputField.value;
  
  // catch any eval errors in try catch block
  try {
   
    // clear screen if C is pressed
    if(value == "C"){
        // clear screen value
        inputField.value = "";
     
    // inverse check
    } else if (value === "±") {
		
		inputField.value = inputField.value * -1;

    } else if(value === "=") {
      
      var equation = valueOfScreen;

      // replace ÷ and x with / and *, so we can calculate using eval
      if (equation.includes("÷") || equation.includes("x")) {
        equation = equation.replace(/÷/g, "/").replace(/x/g, "*");
      }
      
      inputField.value = eval(equation);

    } else {
      
      inputField.value = inputField.value + value;

    }
    
  } catch(err) {
    
    console.log("Error has occured: " + err);
    
    // clear input if error occurs 
    inputField.value = "";
  }
});