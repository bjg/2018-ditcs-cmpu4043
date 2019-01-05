function log(text)
{
	console.log(text)
	var logDiv = document.createElement("div");

	logDiv.innerHTML = text;

	body.appendChild(logDiv);
}

function setInnerHtml(id, text)
{
	document.getElementById(id).innerHTML = text;
}

function clearPage()
{
	document.getElementById("profileAvatar").src = "";
	setInnerHtml("profileName","");
	setInnerHtml("profileUsername","");
	setInnerHtml("profileEmail","");
	setInnerHtml("profileLocation","");
	setInnerHtml("profileNumberOfGists","");

	var reposParent = document.getElementById("reposParent");
	while (reposParent.firstChild) 
	{
    	reposParent.removeChild(reposParent.firstChild);
	}
}

async function getJsonData(url)
{
	var returnData = null
	await fetch(url)
	.then((resp) => resp.json())
	.then(function(data) 
	{
		returnData = data;
		
	})
	.catch(function(error) 
	{
		console.log(error);
	}); 

	return returnData;
}


async function userInfo(user)
{
	var url = 'https://api.github.com/users/'
	var request = url + user;//Validate request, no slashes and existing user
	let userData = await getJsonData(request);
	
	return userData;
}

async function reposInfo(user)
{
	var url = 'https://api.github.com/users/';
	var reposLabel = '/repos';
	var request = url + user + reposLabel;//Validate request, no slashes and existing user
	let reposData = await getJsonData(request);
	
	return reposData;
}

async function searchUserInfo()
{
	clearPage();
	var username = document.getElementById("searchTextbox").value;

	let userData = await userInfo(username);

	if(typeof(userData.login) === "undefined")
	{
    	document.getElementById("reposParent").appendChild(getFormattedLine("Error: ", "User not found"))
	}
	else
	{
	    document.getElementById("profileAvatar").src = userData.avatar_url;
		setInnerHtml("profileName",userData.name);
		setInnerHtml("profileUsername",userData.login);
		setInnerHtml("profileEmail",userData.email);
		setInnerHtml("profileLocation",userData.location);
		setInnerHtml("profileNumberOfGists",userData.public_gists);

		let reposData = await reposInfo(username);

		reposData.map(r => insertRepo("reposParent",r));
	}	
}

function insertRepo(parentId,repoData) 
{
	var parent = document.getElementById(parentId);
	var repoElement = document.createElement("div");
	repoElement.className = "gridBox";

	repoElement.appendChild(getFormattedLine("Name ", repoData.name));
	repoElement.appendChild(getFormattedLine("Description ", repoData.description));

	parent.appendChild(repoElement);
}

function getFormattedLine(label,content)
{
	var containerElement = document.createElement("div");


	var labelElement = document.createElement("div");
	labelElement.className = "gridLabel";
	labelElement.innerHTML = label;
	containerElement.appendChild(labelElement);

	var contentElement = document.createElement("div");
	contentElement.className = "gridContent";
	contentElement.innerHTML = content;
	containerElement.appendChild(contentElement);

	return containerElement;
}

var body = document.getElementById("main");