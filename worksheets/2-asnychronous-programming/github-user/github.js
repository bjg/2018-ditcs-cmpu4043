const url="https://api.github.com/users/";

function fetchUserInfo(username)
{
    hideUserProfile();
    document.getElementById("repoTable").innerHTML="";
    //check to make sure username has something entered and is not null
    if(username && username!=null)
    {
        //Fetch request to get user data
        fetch(url + username)
            .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    alert("User not found!");
                    throw Error(`Request rejected with status ${response.status}`);
                }
            })
            .then(response => response.json())
            .then(data => {
                //Fill the user profile data
                document.getElementById("userAvatar").src=data.avatar_url;
                document.getElementById("userName").innerHTML="<b>" + "Name: " + "</b>" + isDataNull(data.name);
                document.getElementById("userUsername").innerHTML="<b>" + "Username: " + "</b>" + isDataNull(data.login);
                document.getElementById("userEmail").innerHTML="<b>" + "Email: " + "</b>" + isDataNull(data.email);
                document.getElementById("userLocation").innerHTML="<b>" + "Location: " + "</b>" + isDataNull(data.location);
                document.getElementById("userGistNo").innerHTML="<b>" + "Number of gists: " + "</b>" + isDataNull(data.public_gists);
            })
            .then(response => {
                //Repo fetch is nested to make sure its not carried out if the searched up user doesnt exist
                fetch(url + username + "/repos")
                    .then(response => response.json())
                    .then(data => {
                        let repos = data;
                        //Use a loop to go through each element in the repo object and add the info tho the repo table
                        if(repos.length>5)
                        {
                            document.getElementById("userRepos").style.overflowY= "auto";
                        }
                        else
                        {
                            document.getElementById("userRepos").style.overflowY= "hidden";
                        }
                        for (let repo in repos) {
                            document.getElementById("repoTable").innerHTML += "<tr>" + "<td>" + "<b>" +
                                "Repo Name: " + "</b>" + repos[repo].name + "<br>" + "<br>"
                                + "<b>" + "Description: " + "</b>" + isDataNull(repos[repo].description) + "</td>" + "</tr>";
                        }
                        showUserProfile();
                    });
            });
    }
}

//Function to check if data is null and give a more formatted output
function isDataNull(data)
{
    if(data==null)
    {
        return "Not available";
    }
    else return data;
}

//Functions used to hide and show the Profile and Repo tables inbetween loading & error checking
function showUserProfile()
{
    document.getElementById("userProfile").style.display = "inline-block";
    document.getElementById("userRepos").style.display = "inline-block";
}

function hideUserProfile()
{
    document.getElementById("userProfile").style.display = "none";
    document.getElementById("userRepos").style.display = "none";
}