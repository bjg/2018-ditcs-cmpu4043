//Users
fetch('http://jsonplaceholder.typicode.com/users')
  .then(function(response) {
      return response.json();
  })
  .then(function(myJson) {
    
    let s = JSON.stringify(myJson);
    let arr = JSON.parse(s);
    console.log("USERS:");
    console.log("Question 1:");
    
    //Question 1
    let arr2 = arr.filter(user => user.username)
                  .filter(user => user.address.city)
                  .filter(user => user.address.zipcode);
    console.log(arr2);

    console.log("Question 2:");
    //Question 2: 
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
    console.log("Question 3:");
    
    let arr2 = arr.filter(post => {
        let words = post.title.split(" ");
        if(words.length >= 6) return post.title;
    });
    console.log(arr2);
    
    console.log("Question 4: ");

    //returns an array of strings
    let arr4 = arr.filter(post => post.body)
   .map(post => post.body);

    let words = [];
    arr4.forEach(item => {
      //splits the strings into arrays of words
      let wordsSplit = item.split(" ");
      wordsSplit.forEach(word => {
        words.push(word);
      })
    })
    console.log(createWordMap(words));
});

function createWordMap(arr){
  var wordMap = arr.reduce(function (wordMapJson, word) { 
    console.log(wordMapJson);
    if (word in wordMapJson) {
      wordMapJson[word]++;
    }
    else {
      wordMapJson[word] = 1;
    }
    return wordMapJson;
  }, {});
  return wordMap;
}


