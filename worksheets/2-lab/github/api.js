function api() {
	// Add a listener to the search button
	document.getElementById('submit-username').addEventListener('click', () => {
		var username = document.getElementById('github-username').value;
		// Get the value of the github username input
		if(username == '') {
			displayMessage('error', 'GitHub username cannot be empty.');
		} else {
				if(document.getElementById('profile').style.visibility == 'visible') {
					document.getElementById('left-side').innerHTML = '';
					document.getElementById('right-side').innerHTML = '';
				}

			// Make a request to the GitHub API
			httpRequest('GET', 'https://api.github.com/users/'+username).then((data) => {
				if(data.hasOwnProperty('message')) {
					// Throw a user not found error.
					throw('User not found.');
				} else {
					// Handle profile
					handleProfile(data);
				}
			}).catch((error) => {
				// Catch the user not found error and display the message.
				displayMessage('error', error)
			});
		}
	});
}

function handleProfile(profile) {
	// Get the profile div and unhide it
	var profileDiv = document.getElementById('profile');
	var leftSide = document.getElementById('left-side');
	var rightSide = document.getElementById('right-side');
	profileDiv.setAttribute('style', 'visibility: visible;');

	// Set their image
	leftSide.innerHTML += "<img class='profile-image' src='"+profile['avatar_url']+"'/>";

	leftSide.innerHTML += "<h1 class='title'>"+profile['name']+"<small class='grey'><br/>"+profile['login']+"</small></h1>";

	leftSide.innerHTML += "<p>"+profile['email']+"<br/>"+profile['location']+"<br/><i>Number of Gists: "+profile['public_gists']+"</i></p>";

	// Get the repos
	httpRequest('GET', 'https://api.github.com/users/'+profile['login']+'/repos').then((data) => {
		data.map((repo) => {
			rightSide.innerHTML += "<div class='repo'><h3>"+repo['full_name']+"</h3><p>"+repo['description']+"</p></div>";
		});
	});

}

function displayMessage(type, message) {
	document.getElementById('messages').innerHTML = '<div class="message '+type+'-message">'+message+'</div>';
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