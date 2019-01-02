function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function search(username){
    loadJSON('https://api.github.com/users', function(data){
        for(var i = 0; i < Object.keys(data).length; i++){
            if(data[i].login == username){
                loadJSON(data[i].url, function(data){
                    document.getElementById("avatar").src=data.avatar_url;
                    document.getElementById("name").innerHTML=data.name;
                    document.getElementById("username").innerHTML=data.login;
                    document.getElementById("email").innerHTML=data.email;
                    document.getElementById("location").innerHTML=data.location;
                    document.getElementById("gist").innerHTML=data.public_gists;

                    loadJSON(data.repos_url, function(data){
                        var repos = document.getElementById("repos");
                        while (repos.childElementCount > 1) {
                            repos.removeChild(repos.lastChild);
                        }
                        for(var i = 0; i < Object.keys(data).length; i++){
                            var item = document.createElement("li");
                            item.className="flex-item";
                            var name = document.createElement("span");
                            name.innerHTML="<strong>Name: </strong>" + data[i].name;
                            item.appendChild(name);
                            var br1 = document.createElement("br");
                            var br2 = document.createElement("br");
                            item.appendChild(br1);
                            item.appendChild(br2);
                            var desc = document.createElement("span");
                            desc.innerHTML="<strong>Description: </strong>" + data[i].description;
                            item.appendChild(desc);
                            repos.appendChild(item);
                        }
                        if(repos.childElementCount === 1){
                            var item = document.createElement("li");
                            item.className="flex-item";
                            var message = document.createElement("span");
                            message.innerHTML="<strong>No user repositories</strong>";
                            item.appendChild(message);
                            repos.appendChild(item);
                        }
                    },function(xhr){console.error(xhr)});
                },function(xhr){console.error(xhr);});
            }
        }
    },function(xhr){console.error(xhr);});
}