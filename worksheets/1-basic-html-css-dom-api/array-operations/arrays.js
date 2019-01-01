// Q2 users fetch
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(function(data) {

    // Q2 Part 1:
    var users = data.map(obj => { 
      var rObj = {};
      rObj["username"] = obj.username;
      rObj["city"] = obj.address.city;
      rObj["zipcode"] = obj.address.zipcode;
      return rObj;
    });
    console.log(users);

    // Q2 Part 2:
    var zipCodes = data.filter(obj => {
      if (obj.address.zipcode.charAt(0) == '2' || obj.address.zipcode.charAt(0) == '5') {
        return obj;
      }
    });
    console.log(zipCodes);
  })

// Q2 posts fetch
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(function(data) {
    // Part 2 Q3
    var titles = data.filter(obj => {
      if (obj.title.split(" ").length > 6) {
        return obj;
      }
    });
    console.log(titles);

    // Part 2 Q4
    var bodyWords = [];
    data.filter(obj => {
      var words = obj.body.replace(/\n/, " ");
      words = words.split(" ").join(",").split(/\n/).join(",").split(",");
      bodyWords.push(words);
    })
    bodyWords = bodyWords.flat();

    var wordOccurrences = bodyWords.reduce(function (allWords, word) {
      if (word in allWords) {
        allWords[word]++;
      }
      else {
        allWords[word] = 1;
      }
      return allWords;
    }, {});
    console.log(wordOccurrences);
      
  })