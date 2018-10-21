let username,userDetails,userDetailsJSON, gitName;
//Event listener for the search button
document.addEventListener('click', function (event) {
	//if the button is clicked call getUser function
	if (event.target.matches('.styled')){
    username=document.getElementById('usernameSearch').value;
    userDetails=getUser(username);
  }}, false);

//async function to implement the await expression to wait for the promise to return.
async function getUser(name) {
  //fetch the usersname using the name entered by the user. using the await expression to wait for the return of the promise
	//before executing any of the information.
  userDetails = await fetch("https://api.github.com/users/" + name);
  userDetailsJSON = await userDetails.json();
      //setting the github image.
      let img = document.getElementById('avatar');
      img.src = userDetailsJSON.avatar_url;

      //set the rest of the profile details
			//has to be esier way to do this.
      gitName = document.getElementById('name');
      gitUname = document.getElementById('username');
      gitEmail = document.getElementById('email');
      gitLocation= document.getElementById('location');
      gitGists = document.getElementById('gists');
      gitName.innerHTML = "Name : "+userDetailsJSON.name;
      gitUname.innerHTML= "Username : "+ userDetailsJSON.login;
      gitEmail.innerHTML= "Email : "+   userDetailsJSON.email;
      gitLocation.innerHTML="Location : "+  userDetailsJSON.location;
      gitGists.innerHTML="Number of Gists : "+  userDetailsJSON.public_gists;

      //fecth the users repos using the awai function again to wait for the promise to return
      repoDetails = await fetch("https://api.github.com/users/" + name+"/repos")
      repoDetailJSON = await repoDetails.json();
      //Getting the users repos and  storing them into gitRepolist
      gitRepoList = document.getElementById("repoList");
			//mapping just the name and description to NewArray
      let newArray =repoDetailJSON.map(({name,description})=>({name,description}));
			//removing the list of repos that is currently on screen.
      var ul = document.getElementById("repoList");
      while(ul.firstChild) ul.removeChild(ul.firstChild);

			//adding the new list of repos to the screen
      newArray.forEach(function(item) {
        var liname =document.createElement("li");
        var lidesc =document.createElement("li");
				//adding attibutes to elements for styling and identification purposes.
        liname.setAttribute("id", "repoName");
        lidesc.className ="repoDesc";
        lidesc.setAttribute("id","repoDesc");
        let textname = document.createTextNode("Name : "+item.name);
        let textdesc = document.createTextNode("Description : "+item.description);
        liname.appendChild(textname);
        lidesc.appendChild(textdesc);
        gitRepoList.appendChild(liname);
        gitRepoList.appendChild(lidesc);
			})
		}
