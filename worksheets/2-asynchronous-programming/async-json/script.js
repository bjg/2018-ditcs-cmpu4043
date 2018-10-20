/*-------------------------------------------*\
    script.js
    Javascript in response to Lab Question 2.2

    Author: Ciarán O'Brien
    Lecture: Brian Gillespie
    Student Number: C15765215
    Date: 04/10/18
\*-------------------------------------------*/

fetch('https://jsonplaceholder.typicode.com/users')
  .then(function response(response) {
    return response.json();
  })
  .then(function userDetailsLite(myJson) {
    
    // using Spread rest syntax to return myJson, but with selected map filters.
    let newAddressJson = myJson.map(({...myJson}) => [[myJson.username],[myJson.address.city],[myJson.address.zipcode]])
    console.log(newAddressJson)
    return myJson
  })
  .then(function zipcodes2and5(myJson) {
    let filtered = myJson.filter(myJson => (/^[2 5]/.test(myJson.address.zipcode)))
    console.log(
     "There are " + 
     filtered.length + 
     " users who's zipcode begins with 2 or 5")
    console.log("\n",filtered)
  return myJson
  });
  
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(function response(response){
  return response.json()
}) .then(function titleMoreThanSix(myJson){
  let filtered = myJson.filter(myJson => (myJson.title.split(" ").length > 6 ))
  let newArray = filtered.map(({...filtered}) => [filtered.title])
  console.log(newArray)
  return myJson
})
.then(function wordFreq(myJson) {
  var freqMap = {}
  bodyPosts = myJson.map(({...myJson}) => myJson.body.replace(/\n\r/, '')).toString().split(" ")
    bodyPosts.forEach(function(word) {
        if (!freqMap[word]) {
            freqMap[word] = 0
        }
        freqMap[word] += 1
    });
  console.log(freqMap)
});