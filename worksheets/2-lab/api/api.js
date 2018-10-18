function api() {
	// 1 & 2. List of user objects with Username, City and Zipcode in each.
	httpRequest('GET', 'http://jsonplaceholder.typicode.com/users').then((data) => {
		// Loop through users
		data.map((user, index) => {
			console.log('User: '+index);
			console.log('Username: '+user['username']);
			console.log('City: '+user['address']['city']);
			console.log('Zipcode: '+user['address']['zipcode']);
			console.log('');
		});

		// After we have printed it, filter the data set so only zip codes that have 2 and 5 as the first char are left
		const resultZips = data.filter(user => user['address']['zipcode'].charAt(0) == '2' || user['address']['zipcode'].charAt(0) == '5');

		console.log('Num of users with zipcode starting with 2 or 5: '+resultZips.length);
	});

	// 3. List all posts with titles having more than 6 characters
	httpRequest('GET', 'http://jsonplaceholder.typicode.com/posts').then((data) => {

		// Filter the data set
		data.filter(data => data['title'].split(' ').length > 6).map((data) => {
			console.log(data);

			// Frequency map
			console.log(getFrequencyMap(data['body']));
		});
	});
}

function getFrequencyMap(string) {
	// Take in a string and convert it to a JSON object with each word and the occurance of each one
	var words = string.replace(/[.]/g, '').split(/\s/);

	var frequencyMap = {};

	// Map the values
	words.map((word) => {
		// If the word is not in the frequency map, add it and set the value to 0
		if(!frequencyMap[word]) {
			frequencyMap[word] = 0;
		}
		// then increment the count of that word
		frequencyMap[word] += 1;
	});

	return frequencyMap;
}


function httpRequest(type, url) {
	// Async promise
	return new Promise((resolve, reject) => {
		const xhttp = new XMLHttpRequest();
		xhttp.open(type, url);

		// If resolved
		xhttp.onload = () => resolve(JSON.parse(xhttp.responseText));

		// If rejected
		xhttp.onerror = () => reject(xhttp.statusText);

		// Send
		xhttp.send();
	});
}

window.onload = api;