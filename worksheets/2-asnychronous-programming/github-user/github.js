const getRequest = (link) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(link)
        if (response.ok){
            resolve(response.json())
        }else {
            reject('Error, make sure username is right')
        }
    })
}

const getUser = async (username) => await getRequest('https://api.github.com/users/' + username)
const getRepos = async (username) => await getRequest('https://api.github.com/users/' + username + '/repos')

const displayRepos = (repos) => {
    const reposContainer = document.getElementById('repos')
    reposContainer.innerHTML = ''

    for(let i = 0; i < repos.length ; i++){
        const repoWrapper = document.createElement('div')
        const name = document.createElement('p')
        const description = document.createElement('p')
        const descriptionHeading = document.createElement('h3')
        const nameHeading = document.createElement('h3')

        descriptionHeading.innerText = 'description'
        nameHeading.innerText = 'name'
        name.innerText = repos[i].name
        description.innerText = (repos[i].description) ? repos[i].description : 'No description available'

        repoWrapper.appendChild(nameHeading)
        repoWrapper.appendChild(name)
        repoWrapper.appendChild(descriptionHeading)
        repoWrapper.appendChild(description)
        reposContainer.appendChild(repoWrapper)
    }
}

const displayInfo = (name, username, email, location, gists) => {
    document.querySelector('#name > p').innerText = (name) ? name : 'Not available'
    document.querySelector('#username > p').innerText = (username) ? username : 'Not available'
    document.querySelector('#email > p').innerText = (email) ? email : 'Not available'
    document.querySelector('#location > p').innerText = (location) ? location : 'Not available'
    document.querySelector('#Number-of-Gists > p').innerText = (gists) ? gists : 'Not available'
}

const toggleSearchWindow = (enabled, message = 'Searching for user....') => {
    document.querySelector('#homeContainer > h1').innerText = message
    document.getElementById('homeContainer').style.display = (enabled) ? 'block' : 'none'
    document.getElementById('loader').style.display = (enabled) ? 'block' : 'none'
    document.getElementById('container').style.display = (enabled) ? 'none' : 'block'
}

const disyplayError = (errorMessage) => {
    document.querySelector('#homeContainer > h1').innerText = errorMessage
    document.getElementById('homeContainer').style.display = 'block'
    document.getElementById('loader').style.display = 'none'
    document.getElementById('container').style.display = 'none'
}

const displayResults = (res, repos) => {
    document.getElementById('profilePicture').src = res['avatar_url']
    displayRepos(repos)
    displayInfo(res.name, res.login, res.email, res.location, res['public_gists'])
    toggleSearchWindow(false)
}

const delay = async (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, milliseconds)
    })
}

//Only delaying to simulate slow connection to allow for the load to appear
const searchUsername = async () => {
    toggleSearchWindow(true)
    // await delay(1000)
    const input = document.getElementById('searchInput').value

    try{
        const result = await Promise.all([getUser(input), getRepos(input)])
        displayResults(result[0], result[1])
    }catch(err){
        disyplayError(err)
    }
}