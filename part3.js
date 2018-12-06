function fetchData() {
  let item = document.getElementById('search').value;
  const url = 'https://api.github.com/users/';
  const userURL = 'https://api.github.com/users/' + item;
  const repoURL = userURL + '/repos';
  const gistURL = userURL + '/gists';
  let x = 0;

  // Retrieve's user's details
  fetch(userURL)
  .then(response => response.json())
  .then(function(data) {
    console.log(data.login);
    document.getElementById("picture").src = data.avatar_url;
    document.getElementById("name").innerHTML = "Name: " + data.name;
    document.getElementById("username").innerHTML = "Username: " + data.login;
    document.getElementById("email").innerHTML = "E-mail: " + data.email;
    document.getElementById("location").innerHTML = "Location: " + data.location;
  }); 

  // Number of gist
  fetch(gistURL)
  .then(response => response.json())
  .then(data => {
    data.forEach(data => {
      x++;
    });
    document.getElementById("gist").innerHTMl = "No. of Gists: " + x;
    console.log('gist');
  });

  // Fetching repository of user
  fetch(repoURL)
  .then(response => response.json())
  .then(data =>
    data.forEach(data => {
      let repo = document.getElementById('repo');
      let repoEntry = document.createElement("div");

      if (repo == null) {
        repoEntry.innerHTML = "There's no repos!<br>";
      }
      
      repoEntry.innerHTML = "Name: " + data.name + "<br>" + "Description: " + data.description + "<br>";
      repo.appendChild(repoEntry);
      console.log('repo works!')
      })
    );

  //Remove the previous repo to display a new one
  while(repo.firstChild) {
    repo.removeChild(repo.firstChild);

  }

}
