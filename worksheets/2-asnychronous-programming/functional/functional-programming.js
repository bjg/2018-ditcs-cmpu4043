const userData = fetch('https://jsonplaceholder.typicode.com/users');
const postData = fetch('http://jsonplaceholder.typicode.com/posts');


userData
  .then(data => data.json())
  .then(body => {
    //Part one List of objects having the following user attributes: Username, City, Zipcode
    let filteredUsers = body.map(({username, address:{city,zipcode}})=> ({username, address:{city,zipcode}}));
    console.log("Filtered Users "+JSON.stringify(filteredUsers, undefined, 2));

    //part two show the number of users having only zipcodes starting with numbers 2 or 5
    //filter by zipcode using inbuilt function startsWith. Pretty print out to the screen.
    let filtered=body.filter(zipCode =>{
            if(zipCode.address.zipcode.startsWith(2)||(zipCode.address.zipcode.startsWith(5)))
        { return zipCode.address.zipcode; }})
      console.log("");
      console.log("The number of users having only zipcodes starting with numbers 2 or 5 is "+filtered.length);})
  .catch((error) => {
    // Request completely failed
    console.log('Error:' + error.message);
  });


postData
  .then(data => data.json())
  .then(post => {
    //Map object for part 4
    let myMap = new Map();
    //part three of lab, List all of the post titles having more than six words.
    //map a new array for titles and then filter the words by length.
    let numOfWords= post.map(({title})=>({title})).filter( words =>(words.title.split(" ").length) > 6);
    console.log("TITLES: "+JSON.stringify(numOfWords,undefined,2));
    console.log("")
    //part four Show a word frequency map for all of the body contents of the posts
    // spilt the words by new line and spaces. add all subarrays to one array
    let wordMap= post.map(data => data.body.split(/[\n\s]+/)).flat();
    //map function to check if the word exists in the array. if it doesn't add it and plus one.
    //otherwise just add one. using the .get and .set attributtes of the map oject for the key value pairs
    wordMap.map(word => {
      if(myMap.get(word) !== undefined)
      {
        myMap.set(word, (myMap.get(word)+1));
      }else {
        myMap.set(word, 1);
      }
    });
    console.log("This word "+myMap.key);
    console.log("")
  })
  .catch((error) => {
    // Request completely failed
    console.log('Error:' + error.message);
  });
