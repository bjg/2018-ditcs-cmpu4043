//The following asynchronous programming makes use of promises to search a user
//on Git Hub by their user name and then parsing the resulting json and displaying
//that user's information.

//This function gets calls when the button search is clicked.
function query_user()
{
  //Clearing the repositories after each search.
  var user_repositories = document.getElementById('repositories');
  user_repositories.innerHTML = "";

  //Take in user input.
  var user= document.getElementById('input_user');

  //Fetching user info using the username provided.
  fetch('https://api.github.com/users/' + user.value )
  .then(function(response) { return response.json(); })
  .then(function(user_info) {

    document.getElementById("username").innerHTML= user_info.login;

    //The following if statements check if the user has the following information
    //on their profile, and if so print it out. Otherwise display Unknown.
    if(user_info.email == null)
    {
      document.getElementById("name").innerHTML = "Unknown";
    } else
    {
      document.getElementById("name").innerHTML = user_info.name;
    }

    if(user_info.email == null)
    {
      document.getElementById("email").innerHTML = "Unknown";
    } else
    {
      document.getElementById("email").innerHTML = user_info.email;
    }

    if(user_info.location == null) {
      document.getElementById("location").innerHTML = "Unknown";
    }
    else {
      document.getElementById("location").innerHTML = user_info.location;
    }

    document.getElementById("num_gists").innerHTML= user_info.public_gists;
    document.getElementById('img').src= user_info.avatar_url;
  });

  //Fetching user repositories using the username provided.
  fetch('https://api.github.com/users/' + user.value + '/repos' )
  .then(function(response) { return response.json(); })
  .then(function(repos) {
    for(let i in repos)
    {
      //Creating a container for each of the repositores the user has.
      var repository_container = document.createElement("div");

      //Filling the container with each repo's infromation and displaying it.
      repository_container.innerHTML= '<b><a href="' + repos[i].html_url + '">' + repos[i].name +'</a></b></br>' + repos[i].description;
      user_repositories.appendChild(repository_container);
    }
  });
}
