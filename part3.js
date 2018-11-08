function fetchData(search) {
  let item = document.getElementById('search').value;
  let url = 'https://api.github.com/users/';
  let userURL = 'https://api.github.com/users/' + item;
  let repoURL = userURL + '/repos';
  let gistURL = url + '/gists';

  fetch(userURL)
  .then(response => response.json())
  user.then(data =>
    document.getElementById("picture").src = data.avatar_url;
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("username").innerHTML = data.login;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("location").innerHTML = data.location;
    console.log('It works!!');

  fetch(gistURL)
  .then(response => response.json())
  .then(data => {
    let x = 0;
    forEach(data => {
      x++;
    });
    document.getElementById("gists").innerHTMl = "No. of Gists: </br> " + x;
    console.log('gists works');
  });

  fetch(repoURL)
  .then(response => response.json())
  .then(data =>
    data.forEach(data => {
      let repo = document.getElementById("repo");
      let repoEntry = document.createElement("div");

      if (repo == null) {
        repoEntry.innerHTML = "There's no repos!<br>";
      }
      
      repoEntry.innerHTML = "Name: " + data.name + "<br>" + "Description: " + data.description + "<br>";
      repo.appendChild(repoEntry);
      console.log('repo works!')
      })
    );

}
