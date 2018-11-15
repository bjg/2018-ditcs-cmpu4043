/***
 *	Name: Gabriel Grimberg
 *	Module: Rich Web Applications
 *	Lab: 2
 *	Question: 2
 *	Type: Main JavaScript for file "functional-programming.html"
 ***/

/* Function to display list of objects with: Username, City and Zipcode. */
function userAttributes() {
	
	// Where we get the data from.
	let relevantAPILink = "https://jsonplaceholder.typicode.com/users";
	
	// Fetch the data from the API.
	fetch(relevantAPILink).then(response => {
		
		return response.json();
			
	}).then(data => { // Work with the data.
	
		let dataToGoThrough = data; // Create new variable to store the JSON data into to be mapped.
		
		// Map users.
		let userData = dataToGoThrough.map(item => {
			
			let userDataNew = {
				
				"Name": item.username,
				"City": item.address.city,
				"Zipcode": item.address.zipcode
			};
			
			return userDataNew
			
		});
		
		console.log("### Users with 3 Attributes Specified ###");
		console.log(userData);
	
		
	}).catch(error => { console.log(error); });
		
}

/* Function to display the amount of users with zipcodes that start with 2 or 5. */
function usersZipcodeTwoOrFive() {
	
	// Where we get the data from.
	let relevantAPILink = "https://jsonplaceholder.typicode.com/users";
	
	// Fetch the data from the API.
	fetch(relevantAPILink).then(response => {
		
		return response.json();
			
	}).then(data => { // Work with the data.
		
		let dataToGoThrough = data; // Create new variable to store the JSON data into to be mapped.
		
		let userZip = dataToGoThrough.filter(item => item.address.zipcode[0] === '2' || item.address.zipcode[0] === '5');
		
		console.log("### Number of Users with Zipcodes that Start with 5 or 2 ###");
		console.log(userZip);
		
	}).catch(error => { console.log(error); });
	
}

/* Function to display all post title with more than six words. */
function postTitlesMoreThanSixWords() {

	// Where we get the data from.
	let relevantAPILink = "http://jsonplaceholder.typicode.com/posts";
		
	// Fetch the data from the API.
	fetch(relevantAPILink).then(response => {
		
		return response.json();
			
	}).then(data => { // Work with the data.
				
	let dataToGoThrough = data; // Create new variable to store the JSON data into to be mapped.
	
	// Filter the posts that contains 6 or more words.	
	let mapPosts = dataToGoThrough.filter(item => item.title.split(" ").length > 6);
	
	console.log("### Posts with more than 6 words. ###");
	console.log(mapPosts);
	
	}).catch(error => { console.log(error); });
	
}

/* Function to display word frequency map for all the body contents of the posts. */
function wordFrequencyPosts() {
	
	// Where we get the data from.
	let relevantAPILink = "http://jsonplaceholder.typicode.com/posts";
			
	// Fetch the data from the API.
	fetch(relevantAPILink).then(response => {
			
		return response.json();
				
	}).then(data => { // Work with the data.
					
	let dataToGoThrough = data; // Create new variable to store the JSON data into to be mapped.
	
	let wordFrequencyResult = dataToGoThrough.map(singleWord => { // Go through everything in posts and store it in wordFrequencyResult.
		
		// Splitting the words from spaces.
		let wordFrequencyObject = singleWord.body.split(" ");
		
		// Reduce wordFrequencyObject to a single value.
		return wordFrequencyObject.reduce( (wordFrequencyObject, word) => {
			
			if (word in wordFrequencyObject) { // If the word has been visited before, increment the value.
				
				wordFrequencyObject[word]++;
				
			} else { // If the word has not been visited before, give it a value of 1. So we can increment it if it is ever visited again.
				
				wordFrequencyObject[word] = 1;
			}
			
			return wordFrequencyObject;
			
		}, {});
		
	});
		
	console.log("### Word Frequency Map. ###");
	console.log(wordFrequencyResult);
		
	}).catch(error => { console.log(error); });
	
	
}

// Run all functions.
(function () {
	
	userAttributes();
	usersZipcodeTwoOrFive();
	postTitlesMoreThanSixWords();
	wordFrequencyPosts();
	
})();