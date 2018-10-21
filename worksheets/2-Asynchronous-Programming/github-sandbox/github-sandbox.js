const user_profile_div = document.querySelector("#user-profile");
const user_repos_div = document.querySelector("#user-repos");
const search_button = document.querySelector("#s-btn");

search_button.addEventListener('click', show_user_info);

const display_error = message => {
    let error_div = document.querySelector("#error-message");
    error_div.innerHTML = message;
}
//returns grabs a js object from a json object, conains user data
const get_user_object = (user) => {
    return {"avatar":user.avatar_url, "Name":user.name, "Username":user.login, "Email":user.email, "Location":user.location, "numGists":user.public_gists, "repos":user.repos_url};
}
//same as above but for repo call. returns a single instance. used in loop below
const get_repo_object = repo => {
    return {"name":repo.name, "description":repo.description};
}
//builds the html string for user profile display. takes a js object as a parameter
function build_user_profile_div(object) {
    return `<h2>User Profile</h2>
            <img src="${object.avatar}" alt="Profile Picture" id="avatar">
            <div class="user-item">
            <h4>Name</h4>
            <p>${object.Name}</p>
            </div>
            <div class="user-item">
            <h4>Username</h4>
            <p>${object.Username}</p>
            </div>
            <div class="user-item">
            <h4>Email</h4>
            <p>${object.Email}</p>
            </div>
            <div class="user-item">
            <h4>Location</h4>
            <p>${object.Location}</p>
            </div>
            <div class="user-item">
            <h4>Number of gists</h4>
            <p>${object.numGists}</p>
            </div>`;
}

//builds the html for the repo column. takes an array of json objects as a parameter
function build_user_repo_div(array_of_repo_objects) {
    let temp_str = ``;
    array_of_repo_objects.forEach(object => {
            temp_str += `<li class="list-item"><h4>Name</h4><p>${object.name}</p><hr><h4>Description</h4><p>${object.description}</p></li>`;
    })
    let final_str = `<h2>User Repos</h2><ul class="repos">`+temp_str+`</ul>`;
    return final_str;
}

//returns a promise containing json data for the requested user
async function get_user_info() {
    let user_name = document.querySelector("#s-input").value;
    let url = "https://api.github.com/users/"+user_name;
    let user_query = await fetch(url);
    if(String(user_query.status).match(/4\d\d/) !== null) {
        display_error("User Not Found");
    }
    else{
        display_error("");
    }
    let data = await user_query.json();
    return data;
}

//returns a promis comtaining json data on requested user's repos
async function get_user_repos(url) {
    let query = await fetch(url);
    let data = await query.json();
    return data;
}

//called when search button clicked (also works for carraige return on most browsers)
//makes the requests, parses the data and appends data to html document
function show_user_info(e) {
    e.preventDefault();
    let user_data = get_user_info(); 
    user_data
    .then(data => {
        let info = get_user_object(data);
        Object.keys(info).map(element => {if(info[element] === null) { info[element] = "No Info";}});
        user_profile_div.innerHTML = build_user_profile_div(info);
        let repos = get_user_repos(info.repos);
        repos.then(r_data => {
            r_objects = r_data.map(repo => {return get_repo_object(repo)});
            user_repos_div.innerHTML = build_user_repo_div(r_objects);
        })
    });
}