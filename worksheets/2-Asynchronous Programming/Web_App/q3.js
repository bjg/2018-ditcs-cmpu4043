function get_username(username){

    let user_url = 'https://api.github.com/users/'+username;
    let repo_url = user_url+'/repos';

    // User info
    fetch(user_url)
    .then(response => response.json())
    .then(data => {
        document.getElementById('username').innerHTML = data['login'];
        document.getElementById('name').innerHTML = data['name'];
        document.getElementById('profile_pic').src = data['avatar_url'];
        if(data['email'] == null) data['email'] = "null";
        document.getElementById('email').innerHTML = data['email'];
        document.getElementById('location').innerHTML = data['location'];
        document.getElementById('gists').innerHTML = data['public_gists'];

        console.log(data) // Prints result from `response.json()` in getRequest
    })
    .catch(error => console.error(error))
    //Repo info
    fetch(repo_url)
    .then(response => response.json())
    .then(data2 => {
        let repo_area= document.getElementById('repo-container');

        // removing the placeholders
        document.getElementById('repo_block1').parentNode.removeChild(document.getElementById('repo_block1'));
        document.getElementById('repo_block2').parentNode.removeChild(document.getElementById('repo_block2'));
        document.getElementById('repo_block3').parentNode.removeChild(document.getElementById('repo_block3'));
        document.getElementById('repo_block4').parentNode.removeChild(document.getElementById('repo_block4'));
        document.getElementById('repo_block5').parentNode.removeChild(document.getElementById('repo_block5'));
        document.getElementById('repo_block6').parentNode.removeChild(document.getElementById('repo_block6'));




        for(let i=0; i<data2.length; i++){
            // Creating the block to hold the two spans
            let index = i + 1;
            let element = document.createElement("div");
            element.classList +="block";
            element.id="block"+index;
            element.style.width = "100%";
            element.style.border = "1px solid black";
            repo_area.style.overflow = "scroll";
            repo_area.style.width = "300px";
            repo_area.style.height = "420px";
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

            if(data2[i]['description']){
                text1.innerHTML=data2[i]['name'];
                text2.innerHTML=data2[i]['description'];
            }else{
                text1.innerHTML=data2[i]['name'];
                text2.innerHTML="No description";
            }
        }

    })
    .catch(error => console.error(error))
}
function search_data(){
    let inputName= document.getElementById('inputUser').value;
    if(inputName){
        get_username(inputName);
    }else{
        alert("Write something");
    }
}
