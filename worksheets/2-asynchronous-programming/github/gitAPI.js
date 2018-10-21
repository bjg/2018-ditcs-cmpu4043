//Search funtion after a username is entered
function search() {
    var user = document.getElementById('input_user').value;

    //Crating the request to the API
    fetch('https://api.github.com/users/' + user).then(function (response) {
        return response.json();
    }).then(function (j) {

        document.getElementById("nameID").innerHTML = j.name;
        document.getElementById("usernameID").innerHTML = j.login;
        if (j.email == null) {
            document.getElementById("emailID").innerHTML = "null";
        } 
        else {
            document.getElementById("emailID").innerHTML = j.email;
        }
        if (j.location == null) {
            document.getElementById("locationID").innerHTML = "null";
        } 
        else {
            document.getElementById("locationID").innerHTML = j.location;
        }
        document.getElementById("numGists").innerHTML = j.public_gists;
        document.getElementById('img').src = j.avatar_url;
    });

    //Requst to the get the users repositories
    fetch('https://api.github.com/users/' + user + '/repos').then(function (response) {
        return response.json();
    }).then(function (j) {
        for (let i in j) {
            var repo = document.createElement("DIV");
            repo.innerHTML = '<b>' + j[i].name + '</b></br>' + j[i].description;
            document.getElementById('repositories').appendChild(repo);
        }
    });
}
