function getUser() {
    var searchString = document.getElementById("search").value;

    fetch('https://api.github.com/users/' + searchString)
    .then(response => response.json())
    .then(function(data) {
        if (data.message == "Not Found") {
            var searchBar = document.getElementById("search");
            searchBar.value = "";
            searchBar.placeholder = "Username Not Found.";
            searchBar.classList.add('searchError'); 
        }
        else {
            document.getElementById("profilePic").src = data.avatar_url;
            if (data.name == null) {
                document.getElementById("name").textContent = "n/a";
            }
            else {
                document.getElementById("name").textContent = data.name;
            }
            if (data.login == null) {
                document.getElementById("username").textContent = "n/a";
            }
            else {
                document.getElementById("username").textContent = data.login;
            }
            if (data.email == null) {
                document.getElementById("email").textContent = "n/a";
            }
            else {
                document.getElementById("email").textContent = data.email;
            }
            if (data.location == null) {
                document.getElementById("location").textContent = "n/a";
            }
            else {
                document.getElementById("location").textContent = data.location;
            }
            if (data.public_gists == null) {
                document.getElementById("gists").textContent = "n/a";
            }
            else {
                document.getElementById("gists").textContent = data.public_gists;
            }

            fetch('https://api.github.com/users/' + searchString + '/repos')
            .then(response => response.json())
            .then(function(repoData) {
                var table = document.getElementById("repos");
                table.innerHTML = "";
                repoData.map(obj => {
                    var nameRow = table.insertRow(-1);
                    nameRow.style.borderBottom = "none";

                    var nameHeader = nameRow.insertCell(0);
                    nameHeader.textContent = "Name";
                    nameHeader.style.fontWeight = "Bold";
                    nameHeader.style.padding = "5%";

                    var nameData = nameRow.insertCell(1);
                    nameData.textContent = obj.name;

                    var descRow = table.insertRow(-1);
                    descRow.style.borderTop = "none";

                    var descHeader = descRow.insertCell(0);
                    descHeader.textContent = "Description";
                    descHeader.style.fontWeight = "Bold";
                    descHeader.style.padding = "5%";

                    var descData = descRow.insertCell(1);
                    if (obj.description == null) {
                        descData.textContent = "n/a";
                    }
                    else {
                        descData.textContent = obj.description;
                    }
                });
                if (data.public_repos > 5) {
                    document.getElementById("repoDiv").style.maxHeight = document.getElementById("profile").clientHeight + "px";
                    document.getElementById("repoDiv").style.overflow = "scroll";
                }
            })
        }
    })
}

document.getElementById("search").addEventListener('keydown', function(event) {
    if (event.key == "Enter") {
        getUser();
    }
});