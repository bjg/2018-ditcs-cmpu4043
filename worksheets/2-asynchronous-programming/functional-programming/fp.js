//  List of objects having the following user attributes: Username, City, Zipcode
fetch('https://jsonplaceholder.typicode.com/users')
	.then(response => response.json())
	.then(data => console.log(data.map(
        attribute => attribute.username + ', ' + attribute.address.city + 
        ', ' + attribute.address.zipcode))
    )


//  Show the number of users having only zipcodes starting with the number 2 or the number 5
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => console.log(data.filter(attribute => attribute.address.zipcode.startsWith('2') || attribute.address.zipcode.startsWith('5') )
        .map(attribute => attribute.address.zipcode).length)
    )


//  List all of the post titles having more than six words
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data.filter(attribute => attribute.title.split(' ').length > 6))
    )


//  Show a word frequency map for all of the body contents of the posts
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then()