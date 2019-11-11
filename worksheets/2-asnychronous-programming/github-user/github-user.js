const getRequest = (link) => {
    return new Promise(async resolve => {
        const response = await fetch(link)
        resolve(response.json())
    })
}

const searchUser = async() => {
    const username = document.getElementById('searchBar').value

    const users = await getRequest('https://api.github.com/users/' + username)
    const repos = await getRequest('https://api.github.com/users/' + username + '/repos')
    document.getElementById('repos').innerText = ''

    document.getElementsByClassName('container')[1].style.display = 'block'

    document.getElementById('userImage').src = users.avatar_url
    document.getElementById('name').innerText = 'Name: ' + users.name
    document.getElementById('username').innerText = 'Username: ' + users.login
    document.getElementById('email').innerText = 'Email: ' + users.email
    document.getElementById('location').innerText = 'Location: ' + users.location
    document.getElementById('gist').innerText = 'Gist: ' + users.public_gists

    for (let i = 0; i < repos.length; i++) {
        const li = document.createElement('li')
        li.setAttribute('class', 'repos')

        const repoName = document.createElement('div')
        repoName.setAttribute('class', 'repoName')
        repoName.innerText = 'Name: ' + repos[i].name

        const repoDesc = document.createElement('div')
        repoDesc.setAttribute('class', 'repoDesc')
        repoDesc.innerText = 'Description: ' + repos[i].description

        li.appendChild(repoName)
        li.appendChild(repoDesc)
        document.getElementById('repos').appendChild(li)
    }
}