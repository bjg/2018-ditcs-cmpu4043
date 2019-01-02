const getRequest = (link) => {
    return new Promise(async resolve => {
        const response = await fetch(link)
        resolve(response.json())
    })
}

(async () => {
    const users = await getRequest('http://jsonplaceholder.typicode.com/users')
    const posts = await getRequest('http://jsonplaceholder.typicode.com/posts')

    //*** Part 1 ***
    const limitedAttributes = users.map(function(user) {
        return {
            username: user.username,
            city: user.address.city,
            zipcode: user.address.zipcode
        };
    });
    console.log(limitedAttributes)

    //*** Part 2 ***
    console.log(users.filter(user => (user.address.zipcode[0] === '2' || user.address.zipcode[0] === '5' )))

    //*** Part 3 ***
    console.log(posts.filter(obj => obj.title.split(" ").length > 6))

    //*** Part 4 ***
    const bodyWordFrequency = posts.map(function(post) {
        const bodyWords = post.body.split(" ");

        return bodyWords.reduce(function (bodyWords, word) {
            if (word in bodyWords) bodyWords[word]++;
            else bodyWords[word] = 1;

            return bodyWords;
        }, {});
    });
    console.log(bodyWordFrequency)
})()