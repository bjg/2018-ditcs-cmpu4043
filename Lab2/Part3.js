//some names for testing
// mojombo
// defunkt
// wycats

let documnetHolder = document.createElement("div"); 

	documnetHolder.setAttribute("id", "documnetHolder");
	documnetHolder.style.display = "none";
	document.body.appendChild(documnetHolder);

function onClick(){
	
	let num = 1;
	let url = 'https://api.github.com/users'; 
	let username = document.getElementById("userSearch").value ;  // Get the search user input
	let promise = getPromise(url);  // it will be executed two functions: resolve and reject 
	let found = 'user not found';
	
	document.getElementById("documnetHolder").value = num ;
	
	
	//  The promise function will start to get the target user.
	promise.then(function(data){
		
		let users = Array.from(data);
		
		for(let i = 0 ; i < users.length ; i++)
		{
			//if user found in the url then will display in the page   
			if(users[i].login === username){  
				found = users[i].url;
			}
		}
		// if a wrong name entered in the search box which not found in url will display a message user not found 
			if(found !== 'user not found'){
			
	let userPromise = getPromise(found);
		// the function get the user's in the page
		userPromise.then(function(user)
											 
		{
		//  calling the promise to deal with the user repos  
    let repoPromise = getPromise(user.repos_url);
				
		//showing user information in the page
		document.getElementById("name").innerHTML = document.getElementById("name").innerHTML + ' ' + user.name;
		document.getElementById("username").innerHTML = document.getElementById("username").innerHTML + ' '+ user.login; 
		document.getElementById("email").innerHTML = document.getElementById("email").innerHTML + ' ' + user.email;
		document.getElementById("location").innerHTML = document.getElementById("location").innerHTML + ' ' + user.location;
		document.getElementById("gists").innerHTML =  document.getElementById("gists").innerHTML + ' ' + user.public_gists;
		document.getElementById("avatar").src = user.avatar_url;
				
		repoPromise.then(function(repos)
		{
			let repoArray = Array.from(repos);
				 
		//This function set repo table 
		setRepos(repoArray);
		setRepoTable(repoArray , num);
					
		}).catch(function(error){
					
			console.log(error)
		});
				
		}).catch(function(error){
				
			console.log(error)
		});
		}else{
		
			alert(found);
		}
		
			}).catch(function(error){
		
		console.log(error)
	});
}
// This function uses promise to preform tasks
function getPromise(url){
	
	 return new Promise(function(resolve, reject){
	
	// the http request 
	let obj = new XMLHttpRequest();
	// Do it in the background as Asynchronous task
	obj.open("GET", url, true);
		 
	obj.onload = function()
	{
	 // if the http request is good to go retrun response in the resolve(function)
	if(obj.status === 200)
		{
		resolve(JSON.parse(obj.response));
		}
	else
		{
		reject(obj.statusText +', Status: '+obj.status); 
		} 
	};
	
	// if the http request is wrong retrun the error message in the reject(function) 
	obj.onerror = function()
		{
		reject(obj.statusText);  
		};
		obj.send();
	});
}

 // we make global variable repo to store the repos

function setRepos(repos)
{  
	repo = repos ;
}

//This function will display the correct repo each time the user click button
function getRepo(move)
{
	UserReposTable();
	// To get the store value in documentHolder element 
	//in the beginning which has the position of the current shwoing repo
	let num = document.getElementById("documnetHolder").value ;
	
	if(move === 'Click')
	{
			num = num + 1;    
	}
	else
	{
			num = num - 1;  
	}
 
	setRepoTable(repo , num)
	
	document.getElementById("documnetHolder").value = num;
}

// This function will show the user details when press search 
function  UserProfileTable(){
	
	document.getElementById("name").innerHTML ='Name';
	document.getElementById("username").innerHTML = 'Usernmae'; 
	document.getElementById("email").innerHTML = 'Email: ';
	document.getElementById("location").innerHTML = 'Location';
	document.getElementById("gists").innerHTML =  'Number of Gists';
	document.getElementById("avatar").src = '';
}

// This fucntion for the button under the user repo  
function UserReposTable(){
	
	document.getElementById("reponame").innerHTML = 'Name';
	document.getElementById("des").innerHTML = 'Description';
	
	 
}
// This function will set data repos_url list
function setRepoTable(repoData , num){
	
	console.log(repoData);
	document.getElementById("reponame").innerHTML = document.getElementById("reponame").innerHTML + ' ' + repoData[num - 1].name;
	document.getElementById("des").innerHTML = document.getElementById("des").innerHTML + ' ' + repoData[num -1].description;
	document.getElementById("showrepo").innerHTML = num +' out of '+ (repoData.length - 1);

 	console.log(repoData);
	document.getElementById("repom").innerHTML = document.getElementById("repom").innerHTML + ' ' + repoData[num - 1].name;
	document.getElementById("dess").innerHTML = document.getElementById("dess").innerHTML + ' ' + repoData[num -1].description;
	document.getElementById("showrepo").innerHTML = num +' out of '+ (repoData.length - 1);
	
	 console.log(repoData);
	document.getElementById("repomm").innerHTML = document.getElementById("repomm").innerHTML + ' ' + repoData[num - 1].name;
	document.getElementById("desss").innerHTML = document.getElementById("desss").innerHTML + ' ' + repoData[num -1].description;
	document.getElementById("showrepo").innerHTML = num +' out of '+ (repoData.length - 1);
	
}