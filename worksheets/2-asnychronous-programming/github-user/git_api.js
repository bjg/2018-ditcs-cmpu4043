function retrieveUser(username){
    let user_url = 'https://api.github.com/users/'+username;
    let repo_url = user_url+'/repos';

    // Retrieval of User info
    fetch(user_url)
    .then(response => response.json())
    .then(profileList => {
        document.getElementById('profile_pic').src = profileList['avatar_url'];
        document.getElementById('name').innerHTML = "Name: " + profileList['name'];
        document.getElementById('username').innerHTML = "GitHub Account: " + profileList['login'];

        if(profileList['email'] == null) profileList['email'] = "null";
        document.getElementById('email').innerHTML = "Email: " + profileList['email'];
        document.getElementById('location').innerHTML = "Location: " + profileList['location'];
        document.getElementById('gists').innerHTML = profileList['public_gists'] + " repos";

        console.log(profileList)
    })
    .catch(error => console.error(error))


    //Retrieval of Repo info
    fetch(repo_url)
    .then(response => response.json())
    .then(repoList => {
        let repo_area= document.getElementById('repo-container');

        // the previous repo (old placeholder) is removed to be replaced by a new one below
        document.getElementById('repo1').parentNode.removeChild(document.getElementById('repo1'));
        document.getElementById('repo2').parentNode.removeChild(document.getElementById('repo2'));
        document.getElementById('repo3').parentNode.removeChild(document.getElementById('repo3'));
        document.getElementById('repo4').parentNode.removeChild(document.getElementById('repo4'));
        document.getElementById('repo5').parentNode.removeChild(document.getElementById('repo5'));
        document.getElementById('repo6').parentNode.removeChild(document.getElementById('repo6'));


        // for loop is implemented to go through the inner and outer span elements
        for(let i=0; i<repoList.length; i++){
            let index = i + 1;
            let element = document.createElement("div");
            element.classList +="repo";
            element.id="repo"+index;
            element.style.width = "100%";
            element.style.border = "1px solid black";
            repo_area.style.overflow = "scroll";
            repo_area.style.width = "320px";
            repo_area.style.height = "450px";
            repo_area.appendChild(element);

            let text1 = document.createElement("div");
            let text2 = document.createElement("div");
            text1.classList.add("text");
            text2.classList.add("text");
            text1.id="name"+index;
            text2.id="desc"+index;
            text1.style.display = "block";
						text1.style.fontWeight = "bold";
						text1.style.padding = "5px 0 0 5px";
            text2.style.display = "block";
            text2.style.padding = "5px 0 0 5px";
            element.appendChild(text1);
            element.appendChild(text2);

            if(repoList[i]['description']){
                text1.innerHTML=repoList[i]['name'];
                text2.innerHTML=repoList[i]['description'];
            }else{
                text1.innerHTML=repoList[i]['name'];
                text2.innerHTML="No description";
            }
        }
    })
    .catch(error => console.error(error))
}
function retrieveData(){
    let inputName= document.getElementById('inputUser').value;
    if(inputName){
        retrieveUser(inputName);
    }else{
        alert("Please enter the correct username.");
    }
}
