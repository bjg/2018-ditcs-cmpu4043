function fetchURL()
  {
    //setting url to be used in fetch
    var username = document.getElementById("userNameInput").value;
    var userurl = "https://api.github.com/users/"+username;
    var repourl = userurl + "/repos";
    var gistsurl = userurl + "/gists";

//fetching the API urls for each needed
    const user = fetch(userurl);
    const repo = fetch(repourl);
    const gists = fetch(gistsurl);

    var divs = document.getElementsByClassName('repos');
    [].slice.call(divs).map(div =>{
      div.parentNode.removeChild(div);
    })
//function for the user unformation
    user.then(data => data.json())
    .then(data =>
      {
        console.log(data);
        //set each element to the coresponding data from API
        document.getElementById("picture").src = data.avatar_url;
        document.getElementById('name').innerHTML = data.name;
        document.getElementById('username').innerHTML = data.login;
        document.getElementById('email').innerHTML = data.email; //emails are always null on real accounts in the API
        document.getElementById('location').innerHTML = data.location;
      })
      //function for gists
        gists.then(data => data.json())
        .then(data =>
        {
          //gets gists and counts in a for loop then displays the count in the user info
          let count = 0;
          data.map(item => {count ++});
          document.getElementById('gists').innerHTML = count;
        }
      );

      //function to get and set the name and description of the repo
      repo.then(data => data.json())
      .then(data =>
        {
          data.map(item => { //for every repo, display name and description
            let element = document.getElementById("gdCont");
            let newrepo = document.createElement("div");
            newrepo.className = "repos";//gives new repo a class for the CSS
            if(item.description == null)//if description is null then displays no description
            {
              newrepo.innerHTML = item.name + "<br><br><p>No Description</p>";
              element.appendChild(newrepo);
            }
            else {
              newrepo.innerHTML = item.name + "<br><br>"+ item.description;
              element.appendChild(newrepo);
            }
          })
        })
}
