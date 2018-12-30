// POST adds a random id to the object sent
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'Get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(promise => promise.json())
  .then((data) => {

      //part 3
      data.map((posts) => {
        
        var str = posts.title;
        var wordCount = str.match(/(\w+)/g).length;
        
        if(wordCount < 6)
        {
            console.log(posts);
        }

    


      });

  });
