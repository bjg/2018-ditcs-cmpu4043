// C14413458


// This function retrieves the user input from the HTML and passes it on to the next function
const getUser = () => {
    let input = document.querySelector('#searchuser').value;
    if(input){
        fetchData(input);
    }
    else {
        window.alert("INPUT USERNAME");
    }
}


// Main function for working with the data username is passesd from the getUser function
// THe fetch is made and data is processed 
const fetchData = (username) => {
    let url = fetch("https://api.github.com/users/" + username)
    .then(response => response.json())
    .then(data => {
        document.getElementById("profile").src = data.avatar_url;
        document.getElementById("name").innerHTML = "Name: " + data.name;
        document.getElementById("username").innerHTML = "Username: " + username;
        document.getElementById("email").innerHTML = "Email: " + data.email;
        if(data["email"] === null){
            document.getElementById("email").innerHTML = "Email: Apologies the email was not provided";
        }
        document.getElementById("location").innerHTML = "Location: " + data.location;
        if(data["location"] === null){
            document.getElementById("location").innerHTML = "Location: Apologies the location was not provided";
        }
        document.getElementById("public_gists").innerHTML = "Gists: Number of Gists " + data.public_gists;
        let repos = data.repos_url;


        // This for some reason doesn't work the result is always undefined.
        // I was  testing a bunch of things therefore I left it all in a forloop
            
        fetch(repos).then(response => response.json())
            .then( json => {
                    const listrepos = document.getElementById("listrepos");

                    for(let i = 0; i < 5; i++){
                        let reponame = document.createElement("div");
                        reponame.innerHTML = "Name: " + json['name'];
                        let repodesc = document.createElement("div");
                        repodesc.innerHTML = "Description: " + json['description'];
                        listrepos.appendChild(reponame);
                        listrepos.appendChild(repodesc);
                    }
                })

    })

    // Catches any fetch Errors

    .catch(err => console.log(err));
}

