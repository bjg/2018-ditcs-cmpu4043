//fetch user data
fetch('https://jsonplaceholder.typicode.com/users').then(response => 
{
  return response.json();
})
.then(data => 
{
  let users = [data.length];
  let zeroOrFiveCount = 0;

  data.forEach(function(item, index)
  { 
    users[index] = new User(item.username, item.address.city, item.address.zipcode);
  });

  users.forEach(function(item)
  { 
    console.log("Username: "+item.username);
    console.log("City: "+item.city);
    console.log("Zipcode: "+item.zipcode);
    console.log("");

    if(item.zipcode.charAt(0) === '2' || item.zipcode.charAt(0) === '5')
    {
      zeroOrFiveCount++;
    }
  });

  console.log(zeroOrFiveCount+" users have only zipcodes starting with the number 2 or the number 5");
  console.log("");
})
.catch(err => 
{
  console.log(err);
});

//fetch post data
fetch('https://jsonplaceholder.typicode.com/posts').then(response => 
{
  return response.json();
})
.then(data => 
{
  let wordMap = {};
  let wordArray = [];
  data.forEach(function(item)
  { 
    let words = item.title.split(" ");
    if(words.length > 6)
    {
      console.log(item.title);
    }
    //concat current array of words to the words array
    wordArray = wordArray.concat(words);
  });

  console.log("");
  
  //create wordmap
  wordArray.forEach(function (item) 
  {
    //if there is a key associated with this current word, increment the count
    if (wordMap[item] !== undefined) 
    {
      wordMap[item]++;
    } 
    //else, set it to one
    else 
    {
      wordMap[item] = 1;
    }
  });

  console.log(wordMap);
})
.catch(err => 
{
  console.log(err);
});

//User class
class User
{
  constructor(username, city, zipcode)
  {
    this._username = username;
    this._city = city;
    this._zipcode = zipcode;
  }

  get username()
  {
    return this._username;
  }

  get city()
  {
    return this._city;
  }

  get zipcode()
  {
    return this._zipcode;
  }
}