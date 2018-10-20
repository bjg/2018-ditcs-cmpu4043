function fetchUser()
{
  var username = document.getElementById("username").value;
  var url = "https://api.github.com/users/"+username;
  const repos = fetch(url+"/repos");
  const user = fetch(url);
  const gists = fetch(url+"/gists");

  var divs = document.getElementsByClassName("repo");
  [].slice.call(divs).forEach(div => {
    div.parentNode.removeChild(div);
  });

  user.then(data=>data.json())
  .then(data=>{
    document.getElementById("pic").src = data.avatar_url;
    if(data.name != null){
      document.getElementById("name").innerHTML = "<b>Name:</b><br>" + data.name;
    }
    else{
      document.getElementById("name").innerHTML = "<b>Name:</b><br>" + data.login;
    }
    document.getElementById("userName").innerHTML = "<b>Username:</b><br>" + data.login;
    document.getElementById("email").innerHTML = "<b>Email:</b><br>" + data.email;
    document.getElementById("location").innerHTML = "<b>Location:</b><br>" + data.location;
  });

  gists.then(data=>data.json())
  .then(data=>{
    let count = 0;
    data.forEach(item=>{count++;});
    document.getElementById("gists").innerHTML = "<b>No. of Gists:</b><br>" + count;
  });

  repos.then(data=>data.json())
  .then(data=>{
    data.forEach(item=>{
      
      let div = document.getElementById("gridCont");
      let repoEntry = document.createElement("div");
      let link = "<a href=\"" + item.html_url + "\">"
      repoEntry.className = "repo";

      if(item.description==null){
        repoEntry.innerHTML = "<b>" + link + item.name + "</a></b>" + "<br><br>No description";
      }
      else {
        repoEntry.innerHTML = "<b>" + link + item.name + "</a></b>" + "<br><br>" + item.description;
      }
      div.appendChild(repoEntry);
    })
  });
}
