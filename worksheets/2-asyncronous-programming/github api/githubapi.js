//get input box and search button
let searchBox = document.getElementById("input");
let searchButton = document.getElementById("search");

//get image and all p tags that are in the left hand div
let profileImage = document.getElementById("profileImage");
let name = document.getElementById("name");
let username = document.getElementById("username");
let email = document.getElementById("email");
let loc = document.getElementById("loc");
let numbersOfGists = document.getElementById("numbersOfGists");

//get the right hand inner div
let rightInnerDiv = document.getElementsByClassName("right-inner");

//call method and pass true which will fill the div that displays the repos with 5 empty repos
fetchRepos(0, true);


searchButton.onclick = function()
{
	fetch('https://api.github.com/users/'+searchBox.value).then(response => 
	{
		if (response.status === 404)
		{
			alert("User Doesn't Exist!");
			throw new Error("404");
		}
		else
		{
			return response.json();
		}
	})
	.then(data => 
	{	
		//replace null values if present
		for (item in data)
		{
			if(data[item] === null)
			{
				data[item] = "Not Available";
			}
		}

		profileImage.src = data.avatar_url;
		name.innerHTML = name.innerHTML.split("	")[0] + "	"+ data.name;
		username.innerHTML = username.innerHTML.split("	")[0] + "	"+ data.login;
		email.innerHTML = email.innerHTML.split("	")[0] + "	"+ data.email;
		loc.innerHTML = loc.innerHTML.split("	")[0] + "	"+ data.location;
		numbersOfGists.innerHTML = numbersOfGists.innerHTML.split("	")[0] + "	"+ data.public_gists;

		fetchRepos(searchBox.value, false);
	})
	.catch(err => 
	{
		console.log(err);
	});
}

function fetchRepos(user, firstScreen)
{
	//if the first (blank) screen, create 5 empty repos
	if(firstScreen)
	{
		clearRepos();

		for(i = 0; i < 5; i++)
		{
			createRepoElement({name: " ", description: " "});
		}
		//remove last HR tag
		rightInnerDiv[0].removeChild(rightInnerDiv[0].childNodes[rightInnerDiv[0].childNodes.length-1]);
	}
	//else fetch repo information
	else
	{
		fetch('https://api.github.com/users/'+user+"/repos").then(response => 
		{
			return response.json();
		})
		.then(data => 
		{	
			if(data.length !== 0)
			{
				clearRepos();

				data.forEach(function(item)
				{ 
					createRepoElement(item);
				});

				//remove last HR tag
				rightInnerDiv[0].removeChild(rightInnerDiv[0].childNodes[rightInnerDiv[0].childNodes.length-1]);
			}
			else
			{
				fetchRepos(0, true);
			}
		})
		.catch(err => 
		{
			console.log(err);
		});
	}
}

//draws a repo element based on a JSON repo param
function createRepoElement(repo)
{
	//replace null values if present
	if(repo.name === null)
	{
		repo.name = "Not Available";
	}
	else if(repo.description === null)
	{
		repo.description = "Not Available";
	}

	let repoName = document.createElement("p");
	repoName.appendChild(document.createTextNode("Name: "+repo.name));
	rightInnerDiv[0].appendChild(repoName);

	rightInnerDiv[0].appendChild(document.createElement("BR"));

	let repoDescription = document.createElement("p");
	repoDescription.appendChild(document.createTextNode("Description: "+repo.description));
	rightInnerDiv[0].appendChild(repoDescription);

	rightInnerDiv[0].appendChild(document.createElement("HR"));
}

function clearRepos()
{
	while (rightInnerDiv[0].firstChild) 
	{
		rightInnerDiv[0].removeChild(rightInnerDiv[0].firstChild);
	}
}