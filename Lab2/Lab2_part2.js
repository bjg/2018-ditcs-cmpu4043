/*
This funtion will collect the data depending on where the data is coming from
*/
async function Requset_func(request_str)
{
  var result = null;
  await fetch(request_str).then(response => {
      return response.json();
  }).then(data => {
      result = data;
  }).catch(err => {
      console.log("Theres an issue getting the data :/ ");
  });

  return result
}

/*
  This function will return the users who have a username, city and address attributes
*/
async function Call_func1()
{
  let data = await Requset_func('https://jsonplaceholder.typicode.com/users');
  console.log(data.filter(u => u.username)
                  .filter(u => u.address.city)
                  .filter(u => u.address.zipcode));
}

/*
  This function will return the number of users with a zipcode starting with 2 or 5 
*/
async function Call_func2()
{
  let data = await Requset_func('https://jsonplaceholder.typicode.com/users');
  //console.log(data[0].address.zipcode[0] === "9");
  x = data.filter(n => n.address.zipcode[0] === "2" || n.address.zipcode[0] === "5"); 
  num = x.length;
  console.log(num);
}

/*
  This function will list all post tiltles with more than 6 words
*/
async function Call_func3()
{
  let data = await Requset_func('http://jsonplaceholder.typicode.com/posts');
  //data.filter(t => t.title )
  x = data.filter(t => t.title.split(' ').length > 6);
  y = x.map(t => t.title);
  console.log(y);
}

/*
  This function will count the occuren
*/
async function Call_func4()
{
  let data = await Requset_func('http://jsonplaceholder.typicode.com/posts');
  x = data.map(b => b.body.split(" "));
  x = x.flat();
  x = x.map(b => b.split("\n"));
  x = x.flat();

  var freq = {};

  x.forEach(function(word)
  {
    if(word in freq)
    {
        var count  = freq[word];
        count ++;
        freq[word]=count;
    }

    else
    {
        freq[word]=1;
    }

  });

  console.log(freq);
}

/*
  These functions will call the function to run
*/
Call_func1();
Call_func2();
Call_func3();
Call_func4();
