function myFunction() {
    var str1 = "https://api.github.com/users/";
    var str2 = document.getElementById("userSearch").value;;
    var res = str1.concat(str2);
    
// POST adds a random id to the object sent
fetch(res, {
    method: 'Get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(promise => promise.json())
  .then((data) => {

      
    document.getElementById("myImg").src = data.avatar_url;
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("username").innerHTML = data.login;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("location").innerHTML = data.location;
    document.getElementById("NumberofGists").innerHTML = data.public_gists;
/*
    var repos = "/repos";
    var res = res.concat(repos);

    document.getElementById("repo_name").innerHTML = data.name;
*/
  });

  



}


