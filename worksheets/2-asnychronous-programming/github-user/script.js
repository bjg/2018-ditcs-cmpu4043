function fetchUser() {
	document.getElementById('errorMessage').innerHTML = null
	username = document.getElementById('search').value
	clearList()
	if (username !== ''){
		fetch('https://api.github.com/users/' + username)
			.then(handleErrors)
			.then(response => response.json())
			.then(user => this.createUserProfile(user))
			.catch(function(error) {
		        displayError(error)
		    })

		fetch('https://api.github.com/users/' + username + '/repos')
			.then(handleErrors)
			.then(response => response.json())
			.then(json => json.map(current => repo = {name: current.name, description: current.description}))
			.then(repos => this.createRepos(repos))
			.catch(function(error) {
		        displayError(error)
		    })

		
	} else { 
		displayError("Please enter a username")
	}
}

function displayError(message) {
	div = document.getElementById('errorMessage')
	div.innerHTML = message
}

function handleErrors(response){
	if (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}

function createUserProfile(user) {
	document.getElementById('userImage').src = user.avatar_url
	document.getElementById('name').innerHTML = (user.name !== null) ? user.name : 'Name not found'
	document.getElementById('username').innerHTML = (user.username !== null) ? user.login : 'Username not found'
	document.getElementById('email').innerHTML = (user.email !== null) ? user.email : 'Email not found'
	document.getElementById('location').innerHTML = (user.location !== null) ? user.location : 'Location not found'
	document.getElementById('publicGists').innerHTML = user.public_gists + ' gists'
}

function createRepos(repos) {
	container = document.getElementById('repos')
	repos.forEach(function(value, index, array) {
		container.appendChild(createRepo(value))
	})
}

function createRepo(repoDetails) {
	li = document.createElement('li')
	repo = createElement(li, 'div', [], 'repo', '')
	repoName = createElement(repo, 'div', [], 'repoName', repoDetails.name)
	repoDescription = createElement(repo, 'div', [], 'repoDescription', repoDetails.description)

	return li
}

function createElement(parent, elementType, classList, id, content) {
	element = document.createElement(elementType)

	if (id !== '')
		element.id = id
	
	if (classList.length !== 0)
		classList.forEach(function(item, index, array){
			element.classList.add(item)
		})

	if (content !== '')
		element.innerHTML = content
		

	parent.appendChild(element)

	return element
}

function clearList() {
	var list = document.getElementById('repos')
	list.innerHTML = ''
}
