/* A web application for querying user information from the Github API */

/* Gets the data from the api and inserts it into the table*/
function getData(info) {
	document.getElementById("avatar").src = info.avatar_url;
	document.getElementById("name").innerHTML = "Name: " + info.name;
	document.getElementById("username").innerHTML = "Username: " + info.login;
	document.getElementById("email").innerHTML = "Email: " + info.email;
	document.getElementById("location").innerHTML = "Location: " + info.location;
	document.getElementById("gist").innerHTML = "No. of Gists: " + info.public_gists;
	document.getElementById("user_table");
	return [info.public_repos, info.repos_url];
}

/* Gets the repo data from the users and inserts it into the table */
function getRepo(info) {
	
	/*Didn't get the lab finished in time to finish this part */
	
}

	/* Used an AddEventListner so the user can press enter to search instead of click*/
	document.getElementById("user").addEventListener("keyup", function(keyPress) {
		//If statement for when the key is pressed (no.13 is the enter buttons number)
		if(keyPress.keyCode === 13) 
		{
			document.getElementById("search").click();
		}
	});

	/* 	Used an AddEventListener to attach a click event to the search button,
		once clicked, it will display the users profile in the table */
	document.getElementById("search").addEventListener("click", function(){
	webpage = "https://api.github.com/users/" + document.getElementById("user").value;
	
	/* Fetches the api so the profile data can be inserted */
	fetch(webpage).then(function(response) {
		return response.json();
	})
	.then(function(json_obj) {
		return getData(json_obj);
	});
});