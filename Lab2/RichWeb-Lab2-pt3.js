
function getuser() {
    var username = document.getElementById("searchinput").value;

    //this fetches the github data
    const user = fetch("https://api.github.com/users/" + username);
    document.getElementById("title-username").innerHTML = "Username:<br>" + username;
    //this runs when the promise is returned
    user.then(data => data.json()).then(data => {
        
        //this fills out the user info
        var pictureurl = data.avatar_url;
        var username_name = data.name;
        var useremail = data.email;
        var userlocation = data.location;

        document.getElementById("userpic").src = pictureurl;
        document.getElementById("username-name").innerHTML = "Name:<br>" + username_name;
        document.getElementById("username-email").innerHTML = "Email:<br>" + useremail;
        document.getElementById("username-location").innerHTML = "Location:<br>" + userlocation;


    });

    //this fetch is for the gists
    const user_gist = fetch("https://api.github.com/users/" + username + "/gists");
    user_gist.then(data => data.json()).then(data => {
        //this calculates the amount of gists and displays the number
        data.forEach(item => {
            let count = 0;
            count++;

            document.getElementById("username-gists").innerHTML = "No. of Gists:<br>" + count;
        });
    });


    //this fills out the repos of the searched user
    const user_repos = fetch("https://api.github.com/users/" + username + "/repos");
    user_repos.then(data => data.json()).then(data => {

        //this fills out the name and description of each repo
        data.forEach(item => {

            var list = document.getElementById('grid-container2');
            var div = document.createElement("div");

            div.className = "list-group";

            div.innerHTML = "<p id='reponame'>Repo Name:</p><br>" + "<p id='indivname'>" + item.name + "</p><br>" + "<p id='descname'>Description:</p><br>" + "<p id='indivdesc'>" + item.description + "</p><br>";

            list.appendChild(div);

        });

    });


}