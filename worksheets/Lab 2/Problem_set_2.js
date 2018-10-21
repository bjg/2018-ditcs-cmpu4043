// POST adds a random id to the object sent
fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'Get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(promise => promise.json())
  .then((data) => {

      data.map((user) => {

        //part 1
        console.log(user.name , user.address.city, user.address.zipcode);

        //part 2
        if(user.address.zipcode[0] == 5 || user.address.zipcode[0] == 2)
        {
            console.log(user.name , user.address.city, user.address.zipcode);
        }

      });

  });
