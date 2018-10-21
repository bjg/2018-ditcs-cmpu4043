
function clear(){
  let remImage = document.getElementById('pic');
  while (remImage.firstChild) {
    remImage.removeChild(remImage.firstChild);
  }

  let remUser = document.getElementById('gdCont');
  while(remUser.firstChild){
    remUser.removeChild(remUser.firstChild);
  }
}

function search(){
  clear();
  let userName = document.getElementById('usernameInp').value;
  const reqUrl = 'https://api.github.com/users/'+ userName;
  fetch(reqUrl)
    .then(response => response.json())
    .then(function(data){
        createpFile(data);
        createRepos(data);
    })
}


function createpFile(login){

    let profPic = document.getElementById('pic').src = login.avatar_url;

    let nameEl = document.getElementById('name');
    nameEl.innerHTML = login.name;

    let emailEl = document.getElementById('email');
    email.innerHTML = login.email;

    let location = document.getElementById('location');
    location.innerHTML =  login.location;

    let gistEl = document.getElementById('gists');
    gistEl.innerHTML = login.gists_url;
}

    function createRepos(login){
      let grid = document.getElementById('gdCont');
      let repos = login.repos_url;
      fetch(repos)
        .then(response => response.json())
        .then(function(data){
          let reposNames = data.map(d => {
            let item = document.createElement('DIV');
            item.setAttribute('class', 'item2');
            let nameEl = document.createElement('P');
            nameEl.innerHTML = d.name;
            let descEl = document.createElement('P');
            descEl.innerHTML = d.description;
            item.appendChild(nameEl);
            item.appendChild(descEl);
            grid.appendChild(item);

          });
        })
    }
