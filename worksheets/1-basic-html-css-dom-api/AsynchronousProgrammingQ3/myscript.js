function searchUser(){
  var searchValue = document.getElementById("search").value;
  fetchUserDetails(searchValue);
 
}

function fetchUserDetails(userName){
  fetch('https://api.github.com/users/' + userName)
  .then(function(response) {
    return response.json();
  })
  .then(json => fillUserProfile(json))
  .then(json => setImage(json))
  .then(json => {
    //fetch repos
    return fetch(json.repos_url);
  })
  .then(response => response.json())
  .then(json => {
    getRepoDetails(json);
  })
  .then(json => {
    //fetch gists
    return fetch('https://api.github.com/users/' + userName + "/gists");
  })
  .then(response => response.json())
  .then(json => {
    console.log(json)
    countGists(json)
  })
  .catch(err => handleError(err)); 
}


function fillUserProfile(user_json){

  var nameElm = document.getElementById("userFullName");
  nameElm.innerText = user_json.name;

  var nameElm = document.getElementById("userName");
  nameElm.innerText = user_json.login;

  var nameElm = document.getElementById("userEmail");
  nameElm.innerText = user_json.email;

  var nameElm = document.getElementById("userLocation");
  nameElm.innerText = user_json.location;

  //pass the json onto the next .then
  return user_json;
}

function countGists(gist_json){
  var gist_size = gist_json.length;
  var nameElm = document.getElementById("userGistCount");
  nameElm.innerText = gist_size;
}

function setImage(user_json){
  document.getElementById("userPhoto").src = user_json.avatar_url;
  return user_json;
}

function getRepoDetails(repo_json){

  //clear list from previous data so new data isnt appended to the end
  document.getElementById("repoList").innerHTML = "";

  for(i = 0;i < repo_json.length;i++){
    console.log(repo_json[i].name);
    console.log(repo_json[i].description);

    var node = document.createElement("li");
    var textNodeName = document.createTextNode("Name: " + repo_json[i].name);
    var textNodeDescription = document.createTextNode("Description: " + repo_json[i].description);
    var br = document.createElement("br");
  
    node.appendChild(textNodeName);
    node.appendChild(br);
    node.appendChild(textNodeDescription);
    node.style.cssText = 'width:440px; height: 130px; border: 1px solid black; font-size: large;';
    document.getElementById("repoList").appendChild(node); 
  }
}

function handleError(err){
  console.log(err);
}


