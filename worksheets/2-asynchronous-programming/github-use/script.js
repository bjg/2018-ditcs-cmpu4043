function getUser() {
	let username = document.getElementById('usernameSearch').value;
	const url = 'https://api.github.com/users/' + username;
	const user = fetch(url);
	const repos = fetch(url + '/repos');

	user.then(response => response.json())
		.then(data => {
    		document.getElementById("avatar").src = data.avatar_url;
    		if (data.name != null) {
				document.getElementById("name").innerHTML = data.name;
			}
			else{
				document.getElementById("name").innerHTML = data.login;
			}
			
			document.getElementById("username").innerHTML = data.login;

			if (data.email != null) {
				document.getElementById("email").innerHTML = data.email;
			}
			else {
				document.getElementById("email").innerHTML = '[No email]';
			}

			if (data.location != null) {
				document.getElementById("location").innerHTML = data.location;
			}
			else {
				document.getElementById("location").innerHTML = '[No location]';
			}
			document.getElementById("num gists").innerHTML = data.public_gists;
		});
		  
	repos.then(response => response.json())
		.then(data => {
			let list = document.getElementById('repo-list');
			list.innerHTML = "";
			data.map(element => {
				let list_item = document.createElement('div');
				list_item.innerHTML = '<strong>' + "<a href='" + element.html_url + "'>" + element.name + "</a></strong></br>" + element.description;
				list.appendChild(list_item);
			});
	});


}