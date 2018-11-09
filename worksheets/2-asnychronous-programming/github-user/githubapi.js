const githubApi = ('https://api.github.com/users');

//All the elements that need to be populated
var nDiv = document.getElementById('name');
var uDiv = document.getElementById('username');
var eDiv = document.getElementById('email');
var lDiv = document.getElementById('location');
var gDiv = document.getElementById('gists');
var avImg = document.getElementById('avatar');
var repoList = document.getElementById('repoList');

//Get the username from the input box and populates the data in the HTML
function findUser() {

  var username = document.getElementById('input').value;

  //404 Error handling, end function early if the user is not found
  var userFetched = fetch(githubApi + '/' + username).then( response => {
    if (!response.ok) {
      alert('User not Found!');
      return;
    }
    return response
  });


  userFetched.then((response) => {
    response.json().then((usr) => {

      var user = replaceNulls(usr);

      avImg.src = user.avatar_url;
      nDiv.innerHTML = "Name: " + user.name;
      uDiv.innerHTML = "Username: " + user.login;
      eDiv.innerHTML = "Email: " + user.email;
      lDiv.innerHTML = "Location: " + user.location;
      gDiv.innerHTML = "Number of Gists: " + user.public_gists;

      clearList();

      //Get repos for the user requested
      fetch(githubApi + '/' + username + '/repos').then((response) => {
        response.json().then((repos) => {

          repos.forEach(function(rpo) {
            var li = document.createElement('li');
            var p = document.createElement('p');

            var repo = replaceNulls(rpo);

            li.appendChild(document.createTextNode('Name: ' + repo.name));
            li.appendChild(p);
            li.appendChild(document.createTextNode('Description: ' + repo.description))
            repoList.appendChild(li);

          })
        })
      });
    }); //.then((user)
  }); //.then((response))
}

//Clears the list of repos
function clearList() {
  while (repoList.hasChildNodes()) {
    repoList.removeChild(repoList.firstChild);
  }
}

//Replaces null values by converting the JSON to a string, replacing the null value with "Not Foubd"
//and converting it back to JSON
function replaceNulls(data){
  return JSON.parse(JSON.stringify(data).replace(/null/g, '"Not Found"'))
}
