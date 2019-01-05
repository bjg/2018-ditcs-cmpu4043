function setup() {
	const buttons = ['(', ')', '&plusmn;', '&divide;', 7, 
	8, 9, 'x', 4, 5, 
	6, '-', 1, 2, 3, 
	'+', 0, '.', 'C', '='];

	var new_calc = '';

	// Add event listener to Keydown
	document.addEventListener('keydown', (event) => {
		console.log(new_calc);

		if(!isNaN(event.key) || event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') {
			console.log(event.key);
			// Add whatever is entered to the new_calc
			new_calc += event.key

			document.getElementById('screen').innerHTML = '<h1 class="screen-text">'+new_calc+'</h1>';
		}

		if(event.key == 'Enter') {
			new_calc = calculate(new_calc);
		}

		if(event.key == 'Backspace') {
			new_calc = new_calc.slice(0,-1);
			document.getElementById('screen').innerHTML = '<h1 class="screen-text">'+new_calc+'</h1>';
		}
	});	

	// Get the buttons div
	buttonDiv = document.getElementById('buttons');

	// Map the array to display the buttons
	buttons.map((currElement, index) => {
		// Create the button, set the styling and add the text.
		var button = document.createElement('button');
		button.setAttribute('class', 'button');
		button.id = index;
		button.innerHTML += '<h3>'+buttons[index]+'</h3>';

		// Append it to the buttons div
		buttonDiv.appendChild(button);

		// Add listener to this button
		button.addEventListener('click', () => {

			if(buttons[button.id] == 'C') {
				new_calc = '';
				document.getElementById('screen').innerHTML ='<h1 class="screen-text">0</h1>';
			} else if(buttons[button.id] != '=') {
				new_calc += buttons[button.id];
				document.getElementById('screen').innerHTML = '<h1 class="screen-text">'+new_calc+'</h1>';
			} else {
				new_calc = calculate(new_calc);
			}
			console.log(calculation);
		});
	});
};

function calculate(new_calc) {
	new_calc = new_calc.replace('x', '*');
	new_calc = new_calc.replace('&divide;', '/');

	try {
		new_calc = eval(new_calc);
		document.getElementById('screen').innerHTML = '<h1 class="screen-text">'+new_calc+'</h1>';
		
		return new_calc;
	} catch(err) {
		if(err instanceof SyntaxError) {
			document.getElementById('screen').innerHTML = '<p class="screen-text">SyntaxError</p>';
		}
	}
};

window.onload = setup;