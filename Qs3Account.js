
// GitHub users url
const userURL = "https://swapi.co";

// Search Button
var searchButton = document.querySelector("button[type=submit]");

// List of repositories
var repoList = document.getElementById("ul-repos");

// HTTP request fields
var options = {
    method : 'GET',
    headers:[
        {name: "Content-Type", value: "application/json"}
    ]
};

// Function to GET the users github profile and repos (used separately for each)
// Uses Promise() to determine if user exists or not
function get(url, options) {
    return new Promise(function(resolve, reject) {
        var http = new XMLHttpRequest();
        http.open(options.method, url);
        // Assign HTTP headers
        if ('headers' in options) {
            options.headers.forEach(function(header) {
                http.setRequestHeader(header.name, header.value);
            });
        }
        http.onload = function() {
            if (http.status === 200) {
                resolve(http.response);
            }
        };
        // Send request
        http.send();
    });
}

// Search for user in search box
searchButton.onclick = function(e) {
    // input is user's desired username to search, it will be added to end of the url
    var input = document.querySelector("input[type=text]").value;

    // If blank search after one user has been loaded, refresh the page
    if (input === '') {
        window.location = 'index.html';
    }

    // Clear the repo list so it doesn't stack after more than 1 search
    while (repoList.firstChild) {
        repoList.removeChild(repoList.firstChild);
    }
    // Use get() to get the user's github page
    //.then() is used for after a Promise(if successful)
    get(userURL + input, options).then(function(data) {
        // Retrieve all sections of the page
        var json = JSON.parse(data);
        setProfileImage(json.avatar_url);
        setProfileName(json.name);
        setProfileUsername(json.login);
        setProfileEmail(json.email);
        setProfileLocation(json.location);
        setProfileGists(json.public_gists);
        getRepos(json.repos_url);
    });
};

// Gets the list of repositories owned by the searched user
function getRepos(repoURL) {
    get(repoURL, options).then(function(data) {
        var json = JSON.parse(data);
        for (var i = 0; i < 20; i++) {
            addRepoRow(json[i].name, json[i].description)
        }
    });
}

// Creates list for repositories
function addRepoRow(name, description) {
    var newRepoItem = document.createElement("li");
    var nameEle = document.createElement("div");
    var descEle = document.createElement("div");
    repoList.appendChild(newRepoItem);
    newRepoItem.appendChild(nameEle);
    newRepoItem.appendChild(descEle);
    nameEle.innerHTML = "Name: " + name;
    descEle.innerHTML = "Description: " + description;
}

// Functions to get all details from the user
function setProfileImage(url) {
    document.getElementById("profile-image").src = url;
}
function setProfileName(name) {
    document.getElementById("li-name").innerHTML = "Name: " + name;
}
function setProfileUsername(username) {
    document.getElementById("li-username").innerHTML = "Username: " + username;
}
function setProfileEmail(email) {
    document.getElementById("li-email").innerHTML = "Email: " + email;
}
function setProfileLocation(location) {
    document.getElementById("li-location").innerHTML = "Location: " + location;
}
function setProfileGists(public_gists) {
    document.getElementById("li-no-of-gists").innerHTML = "Number of Gists: " + public_gists;
}

document.getElementById("search_box")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("search_button").click();
        }
    });