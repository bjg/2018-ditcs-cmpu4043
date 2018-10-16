/*
1. List of objects having the following ​ user​​ attributes:
    a. Username
    b. City
    c. Zipcode
2. Show the number of ​ users​​ having only zipcodes starting with the number
    2 or the number 5
3. List all of the ​ post​​ titles having more than six words
4. Show a word frequency map for all of the body contents of the ​ posts

*/

//Users
fetch('http://jsonplaceholder.typicode.com/users')
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {
    
    let s = JSON.stringify(myJson);
    let arr = JSON.parse(s);
    console.log("USERS:");
    console.log(arr);

    //Question 1
    let arr2 = arr.filter(user => user.username)
                  .filter(user => user.address.city)
                  .filter(user => user.address.zipcode);
    console.log(arr2);

    /*
    //Question 2
    let arr3 = arr.filter(function(user){
        return user.address.zipcode.startsWith("2");
    });
    */

    //Question 2: Need to do 2 OR 5
    let arr3 = arr.filter(user => user.address.zipcode.startsWith("2"));
    console.log(arr3);  
  });

 
  //Posts
  fetch('http://jsonplaceholder.typicode.com/posts')
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {
    let s = JSON.stringify(myJson);
    let arr = JSON.parse(s);
    console.log("POSTS:");
    console.log(arr);

    let arr2 = arr.filter(post => {
        let words = post.title.split(" ");
        if(words.length >= 6) return post.title;
    });
    console.log(arr2);

    /*
    //Question 3
    let arr3 = arr.filter(post => {
        let words = post.body.split(" ");
        let arr4 = words.map
    });
    console.log(arr3);
    */
  });