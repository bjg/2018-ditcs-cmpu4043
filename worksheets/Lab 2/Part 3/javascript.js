

function search()
{
	
	let x;
	x = document.getElementById("search_bar").value;
	//x = "chooolie";
	let site= 'https://api.github.com/users/'+x;
	let repo_site = 'https://api.github.com/users/'+x+'/repos';
	let request = new XMLHttpRequest();

 
	//Puts the data from website into a variable
	request.open('GET', site);
	request.responseType = 'json';
	request.send();
	alert(site);
	let name, username, email, location, gists, avatar;
	
	

  request.onload = function() 
  {
	let data;
    data = request.response;
    // user_name(data.login);
    username = data.login;
    name = data.name; 
    email = data.email;
    location = data.location;
    gists = data.public_gists;
	avatar= data.avatar_url;
    //console.log(username,name,email,location);
    users_name(name);
    users_email(email);
    users_username(username);
    users_location(location) ;
    no_of_gists(gists);
	users_avatar(avatar);
	
	
			function users_name(name) 
		{
		  //console.log(name);
		  document.getElementById("fill_name").innerHTML = "Name: " + name;
		}
		  
		function users_username(username)
		{
		  //console.log(username);
		  document.getElementById("fill_username").innerHTML = "Username: " + username;
		}
		function users_email(email) 
		{
		  document.getElementById("fill_email").innerHTML = "Email: " + email;
		}
		function users_location(location) 
		{
		  document.getElementById("fill_location").innerHTML = "Location: " + location;
		}
		function no_of_gists(gists)
		{
		  document.getElementById("fill_gists").innerHTML = "Number of Gists: " + gists;
		}  

		function users_avatar(avatar) 
		{
		  //console.log(name);
		  var x = document.createElement("IMG");	
		  document.getElementById("fill_avatar").src = avatar;
		}
		
		 
   }

		
		let site2 = 'https://api.github.com/users/'+x+'/repos';
		console.log(site2);
		let request2 = new XMLHttpRequest();
		request2.open('GET', site2);
		request2.responseType = 'json';
		request2.send();
		let names;
		old_cols = document.getElementById("container1");
		old_cols.innerHTML= "";
		
		request2.onload = function() 
		{
			
			let data;
			
			data = request2.response;
			// user_name(data.login);
			//get and display usernames
			// user_name(data.login);
			 let get_usernames = data.map(function(obj) { 
				let names = [];
				names = [obj.name];
				console.log(names);
			
			 let description = [];
				description = [obj.description];
				console.log(description);
				repo_name_desc(names,description);
				
			});
		
			function repo_name_desc(name,description) 
		{
			
			let where = document.getElementById('fill_repos');
  			let item = document.createElement("li");
			var linebreak = document.createElement("div");
			linebreak.style.clear = "both";
			item.style.border = "1px solid black";
			item.style.width = "100%";
			item.style.height = "50px";
			//item.style.float = "right";
			item.style.listStyleType = "none";
			let create_div = document.createElement("div"); 
			//create_div.id = "right_side";
			let text1 = document.createTextNode("Name:"+ name ); 
			let text2 = document.createTextNode(" Desciption:"+ description); 
			
			item.appendChild(text1);
			item.appendChild(linebreak);
			item.appendChild(linebreak);
			item.appendChild(text2);
			where.style.float="right";
			where.appendChild(item);
			//document.body.insertBefore(item, where);

		}
		
	}


}

