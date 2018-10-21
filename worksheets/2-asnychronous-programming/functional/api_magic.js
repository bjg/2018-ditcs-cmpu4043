const API = {
    getUsers() {
        return fetch('http://jsonplaceholder.typicode.com/users');
    },
    getPosts() {
        return fetch('http://jsonplaceholder.typicode.com/posts');
    }
}

// 1. List of users with only "username", "city", and "zipcode" as attributes
API.getUsers()
    .then(response => response.json())
    .then(users => {
        const newList = users.map(({ username, address: { city, zipcode } }) => ({
            username,
            city,
            zipcode,
        }));

        console.log('Users:', newList);
  })

// 2. User count with zipcodes starting with 2 or 5
API.getUsers()
    .then(response => response.json())
    .then(users => {
        const count = users.filter(user => {
            const firstDigit = user.address.zipcode.toString()[1];
            return firstDigit == 2 || firstDigit == 5;
        }).length;
        console.log('Number of ZIP codes starting with 2 or 5:', count);
    })

// 3. Post titles with more than 6 words
API.getPosts()
    .then(response => response.json())
    .then(posts => {
        const longTitles = posts
            .filter(post => post.title.split(' ').length > 6)
            .map(post => post.title);
        console.log('Long Titles:', longTitles);
    });

// 4. Word frequency count
API.getPosts()
    .then(respoonse => respoonse.json())
    .then(posts => {
        const wordFrequency = {};

        posts.forEach(post => {
            const bodyWords = post.body.replace(/\n/g, ' ').split(' ');
            bodyWords.forEach(word => {
                wordFrequency[word] = wordFrequency[word] ? wordFrequency[word] + 1 : 1;
            });
        });

        console.log('Word Frequency:', wordFrequency);
    });
