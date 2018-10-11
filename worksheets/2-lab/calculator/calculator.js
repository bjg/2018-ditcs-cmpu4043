function setup() {
	const buttons = ['(', ')', '&plusmn;', '&divide;', 7, 
	8, 9, 'X', 4, 5, 
	6, '-', 1, 2, 3, 
	'+', 0, '.', 'C', '='];

	var calculation = {
		'first': '',
		'second': '',
		'operation': '',
	};

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

			if(!isNaN(buttons[button.id])) {
				if(!calculation['first'] || !calculation['operation']) {
					calculation['first'] += buttons[button.id];
					document.getElementById('screen').innerHTML ='<h1 class="screen-text">'+calculation['first']+'</h1>';
				} else {
					calculation['second'] += buttons[button.id];
					document.getElementById('screen').innerHTML = '<h1 class="screen-text">'+calculation['second']+'</h1>';
				}
			} else if(buttons[button.id] == 'C') {
				calculation['first'] = calculation['second'] = calculation['operation'] = '';
				document.getElementById('screen').innerHTML ='<h1 class="screen-text">0</h1>';
				console.log(calculation['operation']);
			} else if(buttons[button.id] != '=') {
				calculation['operation'] = buttons[button.id];
			} else {
				calculate(calculation['first'], calculation['second'], calculation['operation']);
			}
			console.log(calculation);
		});
	});
};

function calculate(first, second, operation) {
	
	if(operation == '&divide;') {
		operation = '/';
	} else if(operation == 'X') { 
		operation = '*';
	}

	document.getElementById('screen').innerHTML = '<h1 class="screen-text">'+eval(first+operation+second)+'</h1>';
};

window.onload = setup;