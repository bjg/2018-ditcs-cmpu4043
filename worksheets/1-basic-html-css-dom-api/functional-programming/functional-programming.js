const userData = fetch('https://jsonplaceholder.typicode.com/users');
const postData = fetch('http://jsonplaceholder.typicode.com/posts');


userData
  .then(data => data.json())
  .then(data => {
    //Part one List of objects having the following user attributes: Username, City, Zipcode
      Object.keys(data).forEach(function(key) { //foreach and object keys to access the key value pair of the JSON.
      console.log("Username: "+data[key].username+", City: "+data[key].address.city+", Zipcode: "+data[key].address.zipcode);
    })
    //part two show the number of users having only zipcodes starting with numbers 2 or 5
    let filtered=data.filter(zipCode =>
      {
        if(zipCode.address.zipcode.startsWith(2)||(zipCode.address.zipcode.startsWith(5)))
        {
          return zipCode.address.zipcode;
        }
      })
      console.log("");
      console.log("The number of users having only zipcodes starting with numbers 2 or 5 is "+filtered.length);
  });

postData
  .then(data => data.json())
  .then(data => {
    let i =0;
    //part three of lab, List all of the post titles having more than six words
    Object.keys(data).forEach(function(key) {

      let numOfWords=(data[key].title).split(" ").length;
      if(numOfWords > 6)
      {
        console.log(data[key].title);
        i++;
      }
    });

    console.log("The number of tiltes that have more than 6 words: "+i);
    console.log("");

    //part four Show a word frequency map for all of the body contents of the posts
    let wordsArray;  
  });
