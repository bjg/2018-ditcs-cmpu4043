/* main event handler which kicks off the api calls see line 81 for first api call */
document.getElementById('getGit').addEventListener('submit', getGit)

let image = document.getElementById('image');
let disname = document.getElementById('disname');
let username = document.getElementById('username');
let email = document.getElementById('email');
let loc = document.getElementById('loc');
let repos = document.getElementById('repos');
let noGist = document.getElementById('noGist');

function getGit(event){
    event.preventDefault();

    let name = document.getElementById('name').value;

    /* update main details */

    let updateDetails = (userData) =>{
        let emailString = userData.email;
        
        if( emailString == null){
            emailValue = `<div style="color:red">Email: no value</div>`
        }else{
            emailValue = `<div>Email: ${emailString}</div>`
        }

        disname.innerHTML = `Name: ${userData.name}`
        username.innerHTML = `Username: ${userData.login}`
        email.innerHTML = `${emailValue}`
        loc.innerHTML = `Location: ${userData.location}`
    }

    /* updates number of gists */

    let updateNoGist = (arrayOfGists) => noGist.innerHTML = `Number of Gists: ${arrayOfGists.length}`

    /* updates the repository details for one user */

    let updateRepoFields = (repoArray) => {
        let totalOutput = ''
        repoArray.forEach(function(repoData){
            let singleOutput =
            `<div> 
                <b>Name:</b> ${repoData.name} 
                </br></br>
                <b>Description:</b> ${repoData.description}
                <hr>
            </div>
            </br>
            `;

            totalOutput += singleOutput
        })
        repos.innerHTML = totalOutput
    }

    /* handlers for fetching different data for one user */

    let getXDetails = (url, callback) => {
        fetch(url)
            .then((json) => json.json())
            .then((repoData) => callback(repoData))
    }

    let doAPICalls = (user) => {
        image.src = user.avatar_url
        getXDetails(`https://api.github.com/users/${user.login}`, updateDetails)
        getXDetails(`https://api.github.com/users/${user.login}/gists`, updateNoGist)
        getXDetails(`https://api.github.com/users/${user.login}/repos`,updateRepoFields)
    }

    /* here is the main api fetch */

    let checkUser = (user) => {
        if(user.login == name){
            return user
        }        
    }
    
    fetch('https://api.github.com/users')
        .then((json) => json.json())
        .then((data) => data.filter(checkUser))
        .then((user) => {
            doAPICalls(user[0])
        })

    /* below code was a test to see if any user had an email ... 
    turns out none of them did ... I thus included a alternative to 
    have null in web page ... see line 19-25 */   

    /* fetch('https://api.github.com/users')
    .then((json) => json.json())
    .then((data) => data.forEach(function(person){
        let name = person.login
        fetch(`https://api.github.com/users/${name}`)
        .then((json) =>json.json())
        .then((data) => console.log(data.email))
    })) */
}