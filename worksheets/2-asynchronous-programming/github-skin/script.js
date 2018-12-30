/*-------------------------------------------*\
    script.js
    Javascript in response to Lab Question 2.3

    Author: Ciarán O'Brien
    Lecture: Brian Gillespie
    Student Number: C15765215
    Date: 04/10/18
\*-------------------------------------------*/
// Onlaod FXN to assign an event listner to the userSearch button
window.onload=function(){
	document.getElementById('userSearch').addEventListener('click', function() {
  getDetails(document.getElementById('search-username').value)
});    
}

// FXN to get main user details
// Error checking inlcludes if the return data not found: 404/505 etc, reload page.
function getDetails (username) {
return fetch('https://api.github.com/users/' + username)
.then(async (data) => {
    if (data.ok) {
        return await data.json()
    }
    else{
        location.reload()
        return false
    }
})
.then(details  => {document.getElementById('name').value = "Name: " + details.name; return details;})
.then(details  => {document.getElementById('username').value = "Username: " + details.login; return details;})
.then(details  => {document.getElementById('email').value = "Email: " + details.email; return details;})
.then(details  => {document.getElementById('location').value = "Location: " + details.location; return details;})
.then(details  => {document.getElementById('num_of_gists').value = "Number of Gists: " + details.public_gists; return details;})
.then(details  => {document.getElementById("profile_image").src = details.avatar_url; return details;})
.then(getRepos(username))
}

// FXn to get user's repos 
// Checking number of repos, if 5 or more, increase the size of the div to allow for a scoll bar
function getRepos (username) {
  return fetch("https://api.github.com/users/" + username + "/repos")
    .then(response => response.json())
    .then(details => {
    	let inputs = []
    	let div = document.getElementById("repos-info-container")
    	let grid_row = 6;
    	div.innerHTML = ""
		for (let i = 0; i <details.length;i++){
			inputs[i] = document.createElement("textarea")
			inputs[i].cols = "100"
			inputs[i].rows = "3"
    		inputs[i].value = details[i].name + "\n\n" + details[i].description
			inputs[i].className = "repoDescriptor"
			inputs[i].dissabled = ""
			inputs[i].readonly = ""
			inputs[i].style.height = "50px"
			div.appendChild(inputs[i]) 
			if(i >= 4){ div.style.height = "600px"}
		}
	})
}