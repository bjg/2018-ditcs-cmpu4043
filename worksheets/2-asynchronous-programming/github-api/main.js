'use strict';

function main() {
    
    const username = document.getElementById('search').value;
    
    // do nothing if the user hasnt entered a name to search for
    if(username == '') {
        return;
    }
    
    const users_endpoint = 'https://api.github.com/users/' + username;
    const repos_endpoint = users_endpoint + '/repos';
    
    // fetch the users profile
    fetch(users_endpoint)
        .then((resp) => resp.json())
        .then(function(user) {
        
            document.getElementById('name').innerHTML = 'Name: ' + user.name;
            document.getElementById('username').innerHTML = 'Username: ' + user.login;
            
            if(user.email == null) {
                document.getElementById('email').innerHTML = 'Email: The users email is private.';
            } else {
                document.getElementById('email').innerHTML = 'Email: ' + user.email;
            }
        
            document.getElementById('location').innerHTML = 'Location: ' + user.location;
            document.getElementById('gists').innerHTML = 'Number of Gists: ' + user.public_gists;
            document.getElementById('avatar').src = user.avatar_url;
            
    })
       
    var repos_list = document.getElementById("repos_list");
    
    // remove previous users repos
    if(repos_list.hasChildNodes) {
        while(repos_list.firstChild) {
            repos_list.removeChild(repos_list.firstChild);
        }
    }
    
    // fetch the users repos
    fetch(repos_endpoint)
        .then((resp) => resp.json())
        .then(function(repos) {
        
            repos.forEach(function(repo) {
                
                const list_item = document.createElement('li');
                
                list_item.innerHTML = '<b>Name:</b> ' + repo.name + '<br><br> <b>Description:</b> <br>' + repo.description;
                
                repos_list.appendChild(list_item);
                
            })
        
        
    })
    
}