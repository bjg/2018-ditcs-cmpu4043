fetch('http://jsonplaceholder.typicode.com/users')
	.then(response => response.json())
	.then(json => json.map(data => user = {username: data.username, city: data.address.city, zipcode: data.address.zipcode}))
	.then(json => json.forEach(function(user, index, array){
		var div = document.createElement("div");
		div.classList.add('content');
		div.innerHTML = user.username + ' ' + user.city + ' ' + user.zipcode + ' ';
		document.getElementById("partOne").appendChild(div);
	}));

fetch('http://jsonplaceholder.typicode.com/users')
	.then(response => response.json())
	.then(json => json.map(data => user = {username: data.username, city: data.address.city, zipcode: data.address.zipcode}))
	.then(json => json.filter(user => user.zipcode[0] == 2 || user.zipcode[0] == 5))
	.then(json => displayLength(json));

function displayLength(json){
	div = document.createElement("div");
	div.classList.add('content');
	div.innerHTML = json.length;
	document.getElementById("partTwo").appendChild(div);
}

fetch('http://jsonplaceholder.typicode.com/posts')
	.then(response => response.json())
	.then(json => json.map(data => data.body))
	.then(json => json.filter(title => title.split(" ").length > 6))
	.then(json => json.forEach(function(title, index, array){
		var div = document.createElement("div");
		div.classList.add('content');
		div.innerHTML = title;
		document.getElementById("partThree").appendChild(div);
	}));

fetch('http://jsonplaceholder.typicode.com/posts')
	.then(response => response.json())
	.then(json => json.map(data => data.body))
	.then(json => json.reduce((accumulator, currentvalue) => accumulator + ' ' + currentvalue))
	.then(data => data.split('\n'))
	.then(data => data.reduce((accumulator, currentvalue) => accumulator + ' ' + currentvalue))
	.then(data => data.split(' '))
	.then(words => words.reduce((wordCount, currentWord) => {
		if(typeof wordCount[currentWord] !== "undefined"){
	      	wordCount[currentWord] += 1; 
	      	return wordCount;
	    } else {
	        wordCount[currentWord] = 1; 
	        return wordCount;
	    }
	}, {}))
	.then(wordCounts => Object.keys(wordCounts).forEach(function(key) {
	    var div = document.createElement("div");
		div.classList.add('content');
		div.innerHTML = key + ': ' + wordCounts[key];
		document.getElementById("partFour").appendChild(div);
	}));


