var file = fetch('http://jsonplaceholder.typicode.com/users')
  .then(response => {return response.json()})
  .then(data => {var person = data

const result = person.map(details);
console.log("Username, City, Zipcode\n", result);

const zips = person.map(zipcodeCheck);
console.log("People with zipcodes of 2 and 5\n", zips);

//console.log(person);

})

function details(person){
  var details = [person.username, person.address.city, person.address.zipcode];
  return details
}

function zipcodeCheck(person){
  if(person.address.zipcode.charAt(0) == "5" || person.address.zipcode.charAt(0) == "2")
  { return person.address.zipcode;} else {return "No Match";}
}




var file = fetch('http://jsonplaceholder.typicode.com/posts')
  .then(response => {return response.json()})
  .then(data => {var posts = data

  
  
  //words.flat();
  //console.log("String", words);
  
  
  const titles = posts.filter(postTitles);
  const result = titles.map(postDetails);
  //const body = titles.map(details);
  //console.log("Body's\n", body);
  console.log("Titles more than 6 words\n", result);
  
  //const frequency = posts.filter(Freq);
  })

  function postDetails(titles){
    var details = [titles.body];
    return details
  }


  function postTitles(post){

    var num = post.title.split(' ');
    if(num.length >= 6)
    { return true;} else {return false;}
  }

