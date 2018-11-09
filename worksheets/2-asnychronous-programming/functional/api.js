var usersFetched = fetch('https://jsonplaceholder.typicode.com/users');
var postFetched = fetch('https://jsonplaceholder.typicode.com/posts');

usersFetched.then((response) => {
  response.json().then((users) => {

    //Map the user information to the username, city and zipcode
    users.map(user =>
    console.log('Username:', user.username, 'City:' ,user.address.city, 'Zipcode:', user.address.zipcode));
    console.log('');

    //Filter the user's zipcode so it only gets the one starting with a 1 or a 5.
    var filtered = users.filter( user => user.address.zipcode.startsWith('2') || user.address.zipcode.startsWith('5'));
    console.log('Number of users with a Zipcode starting with 2 or 5: ', filtered.length);
    console.log('');
  })
});


postFetched.then((response) => {
  response.json().then((posts) => {

    //Post titles are splitted in words, filtered to take the oens with more than 6 words
    //and map it to print only the title
    posts.filter(post => post.title.split(' ').length > 6)
    .map(post => console.log(post.title));
    console.log('');

    //Get the bodies of all post and convert it to strings. Word are splitted if there is
    // a space, new line or coma.
    var bodies = posts.map(post => post.body).toString();
    var words = bodies.split(/[\n, ]/g);

    //Reduce all words to have the frequency of each of them. Every time a new word is found
    //is stored as a key in the object allWords with the value of one. Every time that word
    //appers again, the frequency value is increased.
    var wordMap = words.reduce(function (allWords, word) {
      if (word in allWords) {
        allWords[word]++;
      }
      else {
        allWords[word] = 1;
      }
      return allWords;
    }, {})
    console.log(wordMap);
  })
});
