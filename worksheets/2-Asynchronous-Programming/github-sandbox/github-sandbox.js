const user_profile_div = document.querySelector("#user-profile");
const user_repos_div = document.querySelector("#user-repos");
const search_button = document.querySelector("#s-btn");

search_button.addEventListener('click', show_user_info);

const display_error = message => {
    let error_div = document.querySelector("#error-message");
    error_div.innerHTML = message;
}

const get_user_object = (user) => {
    return {"avatar":user.avatar_url, "Name":user.name, "Username":user.login, "Email":user.email, "Location":user.location, "numGists":user.public_gists, "repos":user.repos_url};
}

const get_repo_object = repo => {
    return {"name":repo.name, "description":repo.description};
}

function build_user_profile_div(object) {
    return `<h2>User Profile</h2>
            <img src="${object.avatar}" alt="Profile Picture" id="avatar">
            <h4>Name</h4>
            <p>${object.Name}</p>
            <h4>Username</h4>
            <p>${object.Username}</p>
            <h4>Email</h4>
            <p>${object.Email}</p>
            <h4>Location</h4>
            <p>${object.Location}</p>
            <h4>Number of gists</h4>
            <p>${object.numGists}</p>`;
}


function build_user_repo_div(array_of_repo_objects) {
    let temp_str = ``;
    array_of_repo_objects.forEach(object => {
            temp_str += `<li class="repo-item"><h4>Name</h4><p>${object.name}</p><hr><h4>Description</h4><p>${object.description}</p></li>`;
    })
    let final_str = `<h2>User Repos</h2><ul class="repos">`+temp_str+`</ul>`;
    return final_str;
}


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


async function get_user_repos(url) {
    let query = await fetch(url);
    let data = await query.json();
    return data;
}


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
            console.log(r_data);
            r_objects = r_data.map(repo => {return get_repo_object(repo)});
            console.log(r_objects);
            user_repos_div.innerHTML = build_user_repo_div(r_objects);
        })
        console.log(repos);
    });
}