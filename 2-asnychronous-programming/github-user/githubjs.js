var data
var data2
var user

console.log("Start");

//Searches users data
function searchUser()
{
  //Grab the users name from input bar
  user = document.getElementById("usernameInput").value;

  var userSite = 'https://api.github.com/users/' + user; //For user info
  var repoSite = 'https://api.github.com/users/' + user + '/repos'; //For user info
  var request = new XMLHttpRequest();
  var request2 = new XMLHttpRequest(); //for repo
  
  //USER SITE FOR USER PROFILE SECTION
  //Request to open the site and get the Data
  request.open('GET', userSite);
  request.responseType = 'json';
  request.send();
  
  // Create Variables
 // var githubImg;
  var githubName;
  var githubUsername;
  var githubEmail;
  var githubLocation;
  var githubGists;
  var repoName;
  var repoDesc;
  
  //Now manipulate Data
  request.onload = function() 
  {
    data = request.response;
    
    //Now get all of the required data 
    //githubImg = data.avatar_url;
    githubName = data.login;
    githubUsername = data.name;
    githubEmail = data.email;
    githubLocation = data.location;
    githubGists = data.public_gists;
    
    //Call function to fill table
    fillUserProfile(githubName,githubUsername,githubEmail,githubLocation,githubGists)
    
  }
  
  //REPO SITE FOR REPO PROFILE SECTION
  //Request to open the site and get the Data
  request2.open('GET', repoSite);
  request2.responseType = 'json';
  request2.send();
  
  //Now manipulate Data
  request2.onload = function() 
  {
    data2 = request2.response;
    
    //Now get all of the required data 
    repoName = data2.full_name;
    repoDesc = data2.description;

    //Call function to fill table
    fillRepoProfile(repoName, repoDesc)
    
  }
  
  
} //End searchUser

function fillRepoProfile(repoName, repoDesc)
{
  document.getElementById("repoName").innerHTML =  "Name : " + repoName;
  document.getElementById("repoDesc").innerHTML =  "Description : " + repoDesc;
}


//Functions that display data
function fillUserProfile(githubName,githubUsername,githubEmail,githubLocation,githubGists)
{
  //document.getElementById("userImg").innerHTML = githubImg;
  document.getElementById("name").innerHTML = "Name : " + githubName;
  document.getElementById("username").innerHTML = "Username : " + githubUsername;
  document.getElementById("email").innerHTML = "Email : " + githubEmail;
  document.getElementById("location").innerHTML = "Location : " + githubLocation;
  document.getElementById("gists").innerHTML =  "Gists : " + githubGists;
}
  