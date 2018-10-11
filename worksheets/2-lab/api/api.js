function api() {
	// 1 & 2. List of user objects with Username, City and Zipcode in each.
	httpRequest('GET', 'http://jsonplaceholder.typicode.com/users').then((data) => {
		var num_users = 0;
		// Loop through users
		data.map((user, index) => {
			console.log('User: '+index);
			console.log('Username: '+user['username']);
			console.log('City: '+user['address']['city']);
			console.log('Zipcode: '+user['address']['zipcode']);
			console.log('');

			if(user['address']['zipcode'].charAt(0) == '2' || user['address']['zipcode'].charAt(0) == '5') {
				num_users += 1;
			}
		});

		console.log('Num of users with zipcode starting with 2 or 5: '+num_users);
	});

	// 3. List all posts with titles having more than 6 characters
	httpRequest('GET', 'http://jsonplaceholder.typicode.com/posts').then((data) => {
		// Loop through posts
		data.map((post) => {
			if(post['title'].split(' ').length > 6) {
				console.log(post);
				
				console.log(getFrequencyMap(post['body']));
			}
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