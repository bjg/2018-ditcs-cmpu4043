// POST adds a random id to the object sent
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'Get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
})
.then(promise => promise.json())
.then((data) => 
{


    data.map((posts) => 
    {
        //part 3
        var pattern = /\w+/g,
        string = posts.body
        matchedWords = string.match( pattern );
        
        var counts = matchedWords.reduce(
            function ( stats, word )
            {
                if ( stats.hasOwnProperty( word ) )
                {
                    stats[ word ] = stats[ word ] + 1;
                } 
                else 
                {
                    stats[ word ] = 1;
                }
                return stats;

            }, {} );

            console.log( counts );
        

    });
    
});
