const users = 'https://jsonplaceholder.typicode.com/users';
const posts = 'https://jsonplaceholder.typicode.com/posts';

const actOnData = (url, action) =>
{
    fetch(url).then(response => response.json()).then(json => 
    {
        action(json);
    });
}

const getUserAttributes = json =>
{
    let users = json.map(user => 
    {   
        return {
            "username" : user.username,
            "city" : user.address.city,
            "zipcode" : user.address.zipcode
        };
    });
    
    console.log(users);
}

const getNumZipcodes = json =>
{
    let users = json.filter(user => user.address.zipcode.charAt(0) === '2' || user.address.zipcode.charAt(0) === '5');
    
    console.log("The number of users with zipcodes starting with '2' or '5' is: " + users.length);
    console.log(users);
}

const getPostTitles = json =>
{
    let posts = json.filter(post => post.title.split(' ').length > 6).map(post => { return {"title" : post.title} });
    
    console.log(posts);
}

// Part 1
actOnData(users, getUserAttributes);

// Part 2
actOnData(users, getNumZipcodes);

// Part 3
actOnData(posts, getPostTitles);