/*
	Name: Robert Vaughan
	StudentNo: C15341261
*/

/*
	Function to convert null values
*/
function nullCheck(value) {
	let returnString;
	value == null ? returnString = "Not Accessible" : returnString = value;
	return returnString;
}

/*
	Function to convert null descriptions
*/
function descNullCheck(value) {
	let returnString;
	value == null ? returnString = "No description present" : returnString = value;
	return returnString;
}

/*
	Function that retrieves attributes from the passed data set
	to fill information on the page
*/
function parseProfile(data) {
	document.getElementById("avatar").src = data.avatar_url;
	document.getElementById("name").innerHTML = "Name: " + nullCheck(data.name);
	document.getElementById("username").innerHTML = "Username: " + data.login;
	document.getElementById("email").innerHTML = "Email: " + nullCheck(data.email);
	document.getElementById("location").innerHTML = "Location: " + nullCheck(data.location);
	document.getElementById("gist").innerHTML = "Number of Gists: " + data.public_gists;
}

/*
	Function that that parses repo information and converts and
	wraps relavent info into a <span>, which is is appended to
	a div
*/
function parseRepo(data) {
	console.log(JSON.stringify(data));

	const dataSize = Object.keys(data).length;
	const scrollNode = document.getElementById("user-repos");
	const right = document.getElementById("content-right");

	// Setting visibility depending on number of repos if there are any
	dataSize > 0 ? right.style.visibility = "visible" : right.style.visibility = "hidden";
	dataSize > 5 ? scrollNode.style.overflowY = "scroll" : scrollNode.style.overflowY = "hidden";

	const div = document.getElementById("user-repos");
	
	// Map to get each piece of data
	data.map(item => {
		console.log(item.name);
		console.log(item.description);
		
		const name = document.createElement("SPAN");
		name.id = "repo-name";
		name.className = "repo-details";
		name.appendChild(document.createTextNode(item.name));
		div.appendChild(name);

		const desc = document.createElement("SPAN");
		desc.id = "repo-desc";
		desc.className = "repo-details";
		desc.appendChild(document.createTextNode(descNullCheck(item.description)));
		div.appendChild(desc);
	});
}

/*
	A listener for when a user clicks the search button. Fetches will be performed
	to extract data from the username the user has entered.
*/
document.getElementById("search").addEventListener("click", function(){
	const url = "https://api.github.com/users/" + document.getElementById("searchbox").value;
	document.getElementById("user-repos").innerHTML = "";
	document.getElementById("user-repos").style.overflowY = "hidden";
	document.getElementById("content-right").style.visibility = "hidden";
	
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json_obj) {
		parseProfile(json_obj);
		return fetch(json_obj.repos_url);
	}).then(function(response) {
		return response.json();
	}).then(function(json_obj) {
		return parseRepo(json_obj);
	}).then(function() {
		document.getElementById("content-container").style.visibility = "visible";
	})
});

/*
	Handles search if a user hits the enter
	key on the input bar rather than typing search
*/
document.getElementById("searchbox").addEventListener("keydown", function(keyPress) {
	if (keyPress.keyCode === 13) {
		document.getElementById("search").click();
	}
});