//Using the map function to create a new array that takes only the username, city and zipcode from each user's information.
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(json => console.log(json.map(user => "Username: "+ user.username + " City: " + user.address.city + " Zipcode: "+ user.address.zipcode)))


//Using the filter function to reduce the users to those only with zipcodes starting with 2 and 5, then mapping them to a new array of only zipcodes and finally getting its length,
//which portrays the number of users a zipcode beginning with 2 or 5.
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(json => console.log(json.filter(user => user.address.zipcode.startsWith("2") || user.address.zipcode.startsWith("5") ).map(user => user.address.zipcode).length))


//Using the filter function to first split the titles into seperate worlds using "split" and then checking if they are more
//than 6 words in length. Then mapping only the resulting titles to a new array.
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(json => console.log(json.filter(post => post.title.split(" ").length > 6).map(post => post.title)))


//Used a nested map function to check frequency for each word in each object.
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then( json => console.log(json.map( (post) => {
  word = post.body.split(" ");
  frequency = {};
  word.map((count) => {
    if(frequency[count]) {
      frequency[count] += 1;
    }
    else {
      frequency[count] = 1;
    }
  })
  return frequency;
})))
