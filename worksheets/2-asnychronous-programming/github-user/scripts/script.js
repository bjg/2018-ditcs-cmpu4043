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

	document.getElementById("content-left").style.visibility = "visible";

	return [data.public_repos, data.repos_url];
}

/*
	Function that that parses repo information and converts and
	wraps relavent info into a <span>, which is is appended to
	a div
*/
function parseRepo(data) {
	const div = document.getElementById("user-repos");
	data.map(datas => {
		datas.map(item => {
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
	});

	document.getElementById("content-right").style.visibility = "visible";
}

/*
	Function to that passes the pages into a promise
	so mulitple fetches can occur. It also does a check
	on the size of the users repo list to enable scroll or not
*/
function fetchPage(pages, noOfRepos) {
	console.log(noOfRepos);

	const scrollNode = document.getElementById("user-repos");
	const right = document.getElementById("content-right");

	noOfRepos > 0 ? right.style.visibility = "visible" : right.style.visibility = "hidden";
	noOfRepos > 5 ? scrollNode.style.overflowY = "scroll" : scrollNode.style.overflowY = "hidden";

	Promise.all(pages.map(page =>
		fetch(page).then(resp => resp.json())
	)).then(json => json).then(format => {
		parseRepo(format);
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
	document.getElementById("content-left").style.visibility = "hidden";
	
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json_obj) {
		return parseProfile(json_obj);
	}).then(function(repoData) {
		const pages = [];
		
		// Loop to construct the urls for each repo page
		for (let i = 0; i < Math.ceil(repoData[0] / 30); i += 1) {
			pages.push(repoData[1] + "?page=" + (i + 1) + "")
		}

		return fetchPage(pages, repoData[0]);
	});
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