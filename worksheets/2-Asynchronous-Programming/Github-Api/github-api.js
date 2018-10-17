function getUserCallback(){
    if(this.readyState == 4 && this.status == 200){
        var user = JSON.parse(this.responseText);
        var div = document.getElementById("name");
        div.innerHTML = user.name;
        div = document.getElementById("user_name");
        div.innerHTML = user.login
        div = document.getElementById("email");
        div.innerHTML = user.email != null? user.email : "Unkown";
        div = document.getElementById("location");
        div.innerHTML = user.location != null? user.location : "Unkown";
        div = document.getElementById("gists");
        div.innerHTML = user.public_gists
        div = document.getElementById("user_image");
        div.src = user.avatar_url
        alert(url + username + "/repos")
        repoRequest.open("GET", url + user.login + "/repos", true)
        repoRequest.send()

    }
    else if (this.readyState == 4 && this.status == 404){
        alert("User " + username + "Does not exist");
    }
}

function displayRepo(name, desc){
    var div = document.createElement("div");
    var nameDiv = document.createElement("div");
    nameDiv.innerHTML = "<b>Name</b> " + name;
    var descDiv = document.createElement("div");
    descDiv.innerHTML = "<b>Description</b> " + desc;
    div.appendChild(nameDiv);
    div.appendChild(descDiv);
    return div;
}

function getReposCallback(){
        if(this.readyState == 4 && this.status == 200){
            var userRepos = document.getElementById("user_repos");
            var repos = JSON.parse(this.responseText);
            for(var i = 0; i < repos.length; i++){
                userRepos.appendChild(displayRepo(repos[i].name, repos[i].description));
            }
    }
    else if (this.readyState == 4 && this.status == 404){
        alert("No Repositories Found");
    }
}

request = new XMLHttpRequest();
request.onreadystatechange = getUserCallback;
repoRequest = new XMLHttpRequest();
repoRequest.onreadystatechange = getReposCallback;
var url = 'https://api.github.com/users/'

function searchUser(){
    var searchString = document.getElementById("search_text").value;
    var username = encodeURI(searchString);
    request.open("GET", url + username, true);
    request.send();
}
