function search_user(){


	let searched = document.getElementById("toSearch").value;

	let url = "https://api.github.com/users/" + searched;
	let users = fetch(url);
	let gists = fetch(url + "/gists");
	let repos = fetch(url + "/repos");
	let list = document.getElementById('list');
	

	users.then(response => response.json())
	.then(user => {
		document.getElementById("profilepic").src =  user.avatar_url;
			document.getElementById("name").innerHTML = "<h4>Name: " + user.name;
			document.getElementById("username").innerHTML =  "<h4>Username: " + user.login;
			document.getElementById("email").innerHTML =  "<h4>Email: " + user.email;
			document.getElementById("location").innerHTML =  "<h4>Location: " + user.location;

	});

	gists.then(response => response.json())
	.then(user => {
		let count = 0;
		user.forEach(user => {
			count ++;
		});
		document.getElementById("gists").innerHTML = "<h4>Number of Gists: " + count;
	});

	 while(list.firstChild)
    {
        list.removeChild(list.firstChild);
    }
	
	repos.then(response => response.json())
	.then(user => {
		user.forEach(user => {
             let list = document.getElementById('list');
            let details = document.createElement("div");
             
             details.innerHTML = "<h4>Name: "  + user.name + "<br><br>" + "Description: "  + user.description + "</h4><hr>";
             list.appendChild(details);
         });
		
	});

}


