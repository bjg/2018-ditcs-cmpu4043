// C14413458 

const getData = () => {
  fetch('https://jsonplaceholder.typicode.com/users/').then(response => response.json())
  .then(json => {

    // Question one returns all user objects that contain username, city and address
    let result = json.filter(person => {
      return person.username != undefined && person.address.city != undefined && person.address.zipcode != undefined;
    })
    console.log(result);
    // End of Question


    // Question Two returns a NUMBER of USERS that have a zipcode that starts with 2 or 5
    let questionTwo = json.filter(zipcodes => {
      return zipcodes.address.zipcode.startsWith("2") || zipcodes.address.zipcode.startsWith("5")
    })
    console.log(questionTwo.length);
    // End of Question


    // Question three
    // Defining fetch constant
    const postTitles = fetch('https://jsonplaceholder.typicode.com/posts/')

    postTitles
      .then(response => response.json())
      .then(json => { 

      // Question three I decided to only perform a single API call for both functions
        json.map(postTitle => {
        let result = postTitle.title.split(' ');
        if(result.length > 6){
          console.log("Post Title " + postTitle.title);
        }
      })


       let result = json.reduce(function (allwords, word){
          if ( word in allwords){
            allwords[word]++;
          }
          else {
            allwords[word] = 1;
          }
          return allwords;
        }, {} )
        return console.log(result);
      })
      // Doesn't fully work?

    })
    .catch(err => console.log(err));
}
getData();
  