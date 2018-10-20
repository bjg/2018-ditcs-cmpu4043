//fetch user data
fetch('https://jsonplaceholder.typicode.com/users').then(response =>
{
  return response.json();
})
.then(data =>
{
  let users = [data.length];

  //create users array, using classes is not necessary for this solution, as the information can be printed directly
  //this is just a clean visual way of storing the information
  data.forEach(function(item, index)
  {
    users[index] = new User(item.username, item.address.city, item.address.zipcode);
  });

  //list all required user info
  users.map(user => console.log("Username: "+user.username+"\nCity: "+user.city+"\nZipcode: "+user.zipcode+"\n"));

  //list the count of users where aving only zipcodes starting with the number 2 or the number 5
  let zeroOrFiveCount = users.filter(user => user.zipcode.charAt(0) === '2' || user.zipcode.charAt(0) === '5').length;
  console.log(zeroOrFiveCount+" users have only zipcodes starting with the number 2 or the number 5\n");
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
  let wordMap = new Map();

  //print post titles that have a length greater than 6
  data.map(post => post.title.split(" ")).filter(title => title.length > 6).map(title => console.log(title.join(" ")));

  //get every word from every body from every post, splitting by newline and space, flatting the array in the end
  let wordArray = data.map(post => post.body.split(/[\n\s]+/)).flat();

  //check if each word is in the map or not, if not, set value to 1, else increase current value by 1
  wordArray.map(word => {
    if(wordMap.get(word) !== undefined)
    {
      wordMap.set(word, wordMap.get(word)+1);
    }
    else
    {
      wordMap.set(word, 1);
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
