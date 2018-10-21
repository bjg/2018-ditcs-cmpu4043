/***
 *	Name: Gabriel Grimberg
 *	Module: Rich Web Applications
 *	Lab: 2
 *	Question: 3
 *	Type: Main JavaScript for file "github-account-info.html"
 ***/

/* Function to capture the username the user has entered */
function captureUsername() {
		
	// Store whatever is in the text field in the variable.
	let getUsername = document.getElementById("inputID").value;
	
	// Return the variable for when the function gets called from else where.
	return getUsername;
}

/* Function for when user clicks submit "Search" Button */
function submitButtonPressed() {
		
	// Return the username entered from the function above and store it in a variable.
	let captureUser = captureUsername();
	
	// If the user didn't enter anything, show an error message.
	if (captureUser == null || captureUser == "") { alert("Username not entered, please enter a username."); return; }
	
	/* If success and we have a username */
	userInfoFromAPI(); // Call the function that retrieves user details.
	userReposFromAPI(); // Call the function that retrieves user repos.
	
	/* Clear the repos when the user searches again */
	let removeRepo = document.getElementById('userRepoID');
	
	while (removeRepo.firstChild) { removeRepo.removeChild(removeRepo.firstChild); }
	
}

/* Function to get the User Information from the API and set it on the HTML fields. */
function userInfoFromAPI() {
	
	let captureUser = captureUsername();
	
	// Where we get the data from.
	let relevantAPILink = 'https://api.github.com/users' + '/' + captureUser;
			
	// Fetch the data from the API.
	fetch(relevantAPILink).then(response => {
			
		return response.json();
				
	}).then(data => { // Work with the data.
					
		let dataToGoThrough = data; // Create new variable to store the JSON data into to be mapped.
		
		//console.log(dataToGoThrough); // Show the JSON file we got.
		
		setAvatar(dataToGoThrough);
		setName(dataToGoThrough);
		setUsername(dataToGoThrough);
		setUserEmail(dataToGoThrough);
		setUserLocation(dataToGoThrough);
		setUserGists(dataToGoThrough);
					
		}).catch(error => { 
			
			alert("Username not found, possibly not created.");
			console.log(error); 
		
		});
}

/* Function to set the Avatar for the user from the JSON data provided. */
function setAvatar(data) {
		
	let userAvatar = document.getElementById('profile-picture');
	userAvatar.setAttribute("src", data.avatar_url);
}

/* Function to set the Name for the user from the JSON data provided. */
function setName(data) {
			
	let userName = document.getElementById('nameID');
	
	if (data.name == null)
		{
			userName.innerHTML = "Name: " + "Not Set"; 
				
		} else {
				
			userName.innerHTML = "Name: " + data.name;
		}
}

/* Function to set the Username for the user from the JSON data provided. */
function setUsername(data) {
				
	let userUsername = document.getElementById('usernameID');
	userUsername.innerHTML = "Username: " + data.login;
}

/* Function to set the Email for the user from the JSON data provided. */
function setUserEmail(data) {
					
	let userUserEmail = document.getElementById('emailID');
		
	if (data.email == null)
	{
		userUserEmail.innerHTML = "Email: " + "Private or Not Set"; 
			
	} else {
			
		userUserEmail.innerHTML = "Email: " + data.email;
	}
}

/* Function to set the Location for the user from the JSON data provided. */
function setUserLocation(data) {
						
	let userUserLocation = document.getElementById('locationID');
		
	if (data.location == null)
	{
		userUserLocation.innerHTML = "Location: " + "Private or Not Set";
			
	} else {
			
		userUserLocation.innerHTML = "Location: " + data.location;
	}
}

/* Function to set the Number of Gists for the user from the JSON data provided. */
function setUserGists(data) {
		
	let userUserGists = document.getElementById('noOfGistID');
		
	if (data.public_gists == null)
	{
		userUserGists.innerHTML = "Number of Gists: No Data Available";
			
	} else {
			
		userUserGists.innerHTML = "Number of Gists: " + data.public_gists;	
	}
}

/* Function to set the Repos for the user from the JSON data provided. */
function userReposFromAPI() {
	
	// Get the Username inputed by the user.
	let captureUser = captureUsername();
		
	// Where we get the data from.
	let relevantAPILink = 'https://api.github.com/users' + '/' + captureUser + '/repos';
				
	// Fetch the data from the API.
	fetch(relevantAPILink).then(response => {
				
		return response.json();
					
	}).then(data => { // Work with the data.
						
		let dataToGoThrough = data; // Create new variable to store the JSON data into to be mapped.
			
		// Store the name and description of repos in an array.
		let repoInformation = dataToGoThrough.map(item => { return [item.name, item.description]; });
		
		let setRepos = document.getElementById('userRepoID');
		
		// For each repo found, create a div for it. Display the name and descirption for each repo.
		for (let i = 0; i < repoInformation.length; i++) {
			
			let repoSection = document.createElement('div');
			
			let repoName = repoInformation[i][0]; // Retrieve the name of the repo.
			let repoDescription = repoInformation[i][1]; // Retrieve the description for the repo.
			
			// If there is no description set it to an empty array if it is.
			repoDescription = repoDescription || "";
			
			repoSection.innerHTML += '<b>Name: </b> ' + repoName + '</br><br><b>Description: </b>' + repoDescription;
			
			setRepos.appendChild(repoSection); // Append each div created to the ID in the HTML where the repo section is.
			
		}
									
		}).catch(error => { 
				
			alert("Username does not exist.");
			console.log(error);
			
		});
		
}
