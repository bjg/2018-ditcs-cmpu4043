
	// function to search by name
    function search_data()
	{
        let search_Name = document.getElementById('user-input').value;
        if(search_Name)
		{
            fetchgit_user(search_Name);
        }
	
    }
	
    function fetchgit_user(user_search)
	{
        
        let gituser_url = 'https://api.github.com/users/'+user_search;
        let repo_url = gituser_url+'/repos';
        
        // getting user json
        fetch(gituser_url)
        .then(response => response.json())
        .then(json => 
		{
            document.getElementById('username').innerHTML = json['login'];
            document.getElementById('name').innerHTML = json['name'];
            document.getElementById('profile-pic').src = json['avatar_url'];
			
            if(json['email'] == null) json['email'] = "null";
            document.getElementById('email').innerHTML = json['email'];
            document.getElementById('location').innerHTML = json['location'];
            document.getElementById('no_gists').innerHTML = json['public_gists'];
            
            console.log(json) // prints results
        })
        .catch(error => console.error(error))
		
		// gathers repo info
        fetch(repo_url)
        .then(response => response.json())
        .then(json2 => 
		{
            let repos_section = document.getElementById('repo_section');
            
			// gather name and description of user's repos
			
            document.getElementById('first_repo').parentNode.removeChild(document.getElementById('first_repo'));
            document.getElementById('second_repo').parentNode.removeChild(document.getElementById('second_repo'));
            document.getElementById('third_repo').parentNode.removeChild(document.getElementById('third_repo'));
            document.getElementById('fourth_repo').parentNode.removeChild(document.getElementById('fourth_repo'));
            document.getElementById('fifth_repo').parentNode.removeChild(document.getElementById('fifth_repo'));
            document.getElementById('sixth_repo').parentNode.removeChild(document.getElementById('sixth_repo'));
			
			
			// replace placeholders for user info based on username searched
			
            for( let i=0; i< json2.length; i++ ){
                
                let index = i + 1;
                let el = document.createElement("div");
                el.classList +="col_one";
                el.id="col_one"+index;
                repos_section.appendChild(el);
                
                let first_text = document.createElement("div");
                let scnd_text = document.createElement("div");
                first_text.classList.add("text");
                scnd_text.classList.add("text");
                first_text.id="name"+index;
                scnd_text.id="desc"+index;
				
                el.appendChild(first_text);
                el.appendChild(scnd_text);
                if(json2[i]['description'])
				{
                    innerHTML=json2[i]['name'];
                    scnd_text.innerHTML=json2[i]['description'];
                }
				else
				{
                    first_text.innerHTML=json2[i]['name'];
                    scnd_text.innerHTML="Description missing";
                }
				
            }
        })

    }
	