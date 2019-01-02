let users = []

function main() {
	users = fetch('https://jsonplaceholder.typicode.com/users/')
	.then(response => response.json())
	.then(json => json.parse());
	console.log(users);
}

addEventListener('DOMContentLoaded', main);