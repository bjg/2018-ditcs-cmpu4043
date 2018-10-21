//builds a new array of js objects by mapping attributes from every object fed through the data pipe
const part_one = data => {
    return data.map(object => {return {"Username":object.username, "City":object.address.city, "Zipcode":object.address.zipcode}});
}
//uses length of array created with filter to determine number of users who meet the requirements
const part_two = data => {
    return "The number of users with zipcodes starting with 2 or 5 is "+String(
        data.filter(object => object.address.zipcode.charAt(0) === '2' || object.address.zipcode.charAt(0) === '5').length
        );
}
//uses filter to build an array of objects that meet the requirements, then calls map to return the title parameter of every object in the new array
const part_three = data => {
    return data.filter(object => object.title.split(" ").length > 6).map(post => {return post.title});
}
//need to fix this
const part_four = data => {
    let word_frequencies = {};
    data.map(object => {
        object.body.split(/\s+/g).map(word => {
            word in word_frequencies ? word_frequencies[word] = 1 : word_frequencies[word]++;
        })
    })
    return word_frequencies;
}
//takes a url and a function as arguments. fetches data from and feeds it through the function parameter, logging the return value to the console
function handle_api_call(url, callback) {
    return fetch(url)
    .then(response => response.json())
    .then(body => {
        console.log(callback(body));
    })
    .catch(error => {
        console.log("Error: "+error.message);
    });
}
//set up arrays for final calls
const user_functions = [part_one, part_two];
const post_functions = [part_three, part_four];
//call handle_api function for the functions
user_functions.map(user_function => handle_api_call('https://jsonplaceholder.typicode.com/users', user_function));
post_functions.map(post_function => handle_api_call('https://jsonplaceholder.typicode.com/posts', post_function));
