function listen(search)
{
    let url = "https://api.github.com/users/" + search;
 
    let list = document.getElementById("theList");
    
    while(list.firstChild)
    {
        list.removeChild(list.firstChild);
    }

    let basicInfo = fetch(url)
    .then(response => {

        return response.json();
    })
    .then(data => {
        //change basic elements here
        if(data.message == "Not Found")
        {
            //no such user
            alert("Sorry! A user by that name could not be found.");
        }
        else
        {
             //user exists so print their details
            document.getElementById("uUserName").innerHTML = "Username: " + element(data.login, "username");
            document.getElementById("uEmail").innerHTML = "Email: " + element(data.email, "email");
            document.getElementById("uLoc").innerHTML = "Location: " + element(data.location, "location");
            document.getElementById("uName").innerHTML = "Name: " + element(data.name, "name");
            document.getElementById("uGist").innerHTML = "Number of Gists: " + element(data.public_gists, "gists");

            document.getElementById("theImg").src = data.avatar_url;

            return fetch(url + '/repos')
        }

        return 0;
    })
    .catch((error) => {
        console.log('Error: ' + error.message);
    });


    basicInfo.then(function(response)
    {
        return response.json();
    })
    .then(data => {

        let repo = data.map(obj =>
        {
            //add + create elements to/for the description list
            var dl = document.getElementById("theList");
            var dt = document.createElement("dt");
            var dd = document.createElement("dd");

            dd.appendChild(document.createTextNode(obj.description));
            dt.appendChild(document.createTextNode(obj.name));
            dt.appendChild(dd);
            dl.appendChild(dt);
        });
    })
    .catch((error) => {
        console.log('Error: ' + error.message);
    });
}

function element(ele, value)
{
    if(ele == null)
    {
        return "No " + value + " provided.";
    }
    else
    {
        return ele;
    }
}