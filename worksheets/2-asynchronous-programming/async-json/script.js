/*-------------------------------------------*\
    script.js
    Javascript in response to Lab Question 2.2

    Author: Ciarán O'Brien
    Lecture: Brian Gillespie
    Student Number: C15765215
    Date: 04/10/18
\*-------------------------------------------*/

// Fetch promise to return a http response
// Follow this are nested then promises for each required elemnt of the lab 
fetch('https://jsonplaceholder.typicode.com/users')
    .then(function response(response) {
        return response.json();
    })
    .then(function userDetailsLite(myJson) {
        // using Spread rest syntax to return myJson, but with selected map filters.
        let newAddressJson = myJson.map(({ ...myJson }) => [
            [myJson.username],
            [myJson.address.city],
            [myJson.address.zipcode]
        ])
        console.log(newAddressJson)
        return myJson
    })
    .then(function zipcodes2and5(myJson) {
        // Making use of regex text method to ensure only zipcodes starting with 2&5 rae returned
        let filtered = myJson.filter(myJson => (/^[2 5]/.test(myJson.address.zipcode)))
        console.log("There are " + filtered.length + " users who's zipcode begins with 2 or 5")
        console.log("\n", filtered)
        return myJson
    });

// Same as previous fetch promise but for the posts api request
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function response(response) {
        return response.json()
    }).then(function titleMoreThanSix(myJson) {
        let filtered = myJson.filter(myJson => (myJson.title.split(" ").length > 6))
        let newArray = filtered.map(({ ...filtered }) => [filtered.title])
        console.log(newArray)
        return myJson
    })
    .then(function wordFreq(myJson) {
        // First we return all body posts as one large array of each word
        let freqMap = []
        bodyPosts = myJson.map(({ ...myJson }) => myJson.body.replace(/[\n\r\]+[]/ig, '')).toString().split(" ")
        freqMaps = bodyPosts.map(obj => { // Create  frequency count array
            if (!freqMap[obj]) {
                freqMap[obj] = 0
            }
            freqMap[obj] += 1
            return freqMap
        })
        singleFrequencyMap = freqMaps[0]
        // Sorting the freuency map
        // There's no easy solution to sort objects, so I sorted the object by coverting it to an array and 
        // sorting it in a nested FXN 
        function sort(obj) {
            return Object.keys(obj).sort(function(a, b) {
                return obj[b] - obj[a]
            });
        }
        var sorted = sort(singleFrequencyMap)
        // Here I then take that sorted array and conert it back to an object
        sorted = sorted.map(function(key) {
            return {
                [key]: singleFrequencyMap[key] }
        });
        console.log(sorted)
    });