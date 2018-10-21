(function() {
    const search = document.querySelector("#search");
    search.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const username = document.querySelector("#username");
        fetch("https://api.github.com/users/" + username.value)
        .then(response => response.json())
        .then(data => 
        {
            let profile = document.getElementById("profile");
            profile = styleElement(profile, "left", "solid", "black", "45%", "100%");
            
            let img = document.createElement("img");
            img.src = data.avatar_url;
            
            profile.appendChild(img);
            profile.appendChild(detail("Name: " + data.name));
            profile.appendChild(detail("Username: " + data.login));
            profile.appendChild(detail("Email: " + data.email));
            profile.appendChild(detail("Location: " + data.location));
            profile.appendChild(detail("Number of Gists: " + data.public_gists));
            
            fetch(data.repos_url)
            .then(response => response.json())
            .then(data =>
            {
                let repos = document.getElementById("repos");
                repos = styleElement(repos, "right", "solid", "black", "45%", "100%");
                
                data.map(data =>
                {
                    let nameDiv = createDiv("none", "black", "0px", "100%", "25%", "Name: " + data.name);
                    let descriptionDiv = createDiv("none", "black", "0px", "100%", "25%", "Description: " + data.description);
                    let repoContent = createDiv("solid", "black", "1px", "100%", "25%", "");
                    repoContent.appendChild(nameDiv);
                    repoContent.appendChild(descriptionDiv);
                    
                    repos.appendChild(repoContent);
                });
            })
        })
    })
})();

const detail = data => createDiv("solid", "black", "1px", "100%", "25%", data);

const styleElement = (element, float, borderStyle, borderColor, width, height) =>
{
    element.style.float = float;
    element.style.borderStyle = borderStyle;
    element.style.borderColor = borderColor;
    element.style.width = width;
    element.style.height = height;
    
    return element;
}

const createDiv = (borderStyle, borderColor, borderWidth, width, height, innerHTML) =>
{
    let div = document.createElement("div");
    div.style.borderStyle = borderStyle;
    div.style.borderColor = borderColor;
    div.style.borderWidth = borderWidth;
    div.style.width = width;
    div.style.height = height;
    div.innerHTML = innerHTML;
    
    return div;
}