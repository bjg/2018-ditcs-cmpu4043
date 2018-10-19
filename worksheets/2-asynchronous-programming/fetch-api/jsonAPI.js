main();

//Main to call all other functions 
function main() {
    placeholder();
    zipCode();
    postData();
}


function placeholder() {

    //Fethes the users data
    //List of user objets
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            return response.json();
        })

        .then(data => {
            data.map((user, index) => {
                console.log('User: ' + index);
                console.log('Username: ' + user['username']);
                console.log('City: ' + user['address']['city']);
                console.log('Zipcode: ' + user['address']['zipcode']);

            });

        });
}

//Filters thee data to only show users with zipcodes 2 or 5
function zipCode() {
    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => console.log(json.filter(element => element.address.zipcode.startsWith("5") || element.address.zipcode.startsWith("2")).map(element => element.address.zipcode)))
}

//Lists all posts that have more than 6 words in the title
function postData() {
    
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => console.log(json.filter(element => element.title.split(" ").length > 6).map(element => element.title)))
    
    //Creates wordmap
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => console.log(json.map((element) => {
            word = element.body.split(" ");
            frequency = {};
            word.map((count) => {
                if (frequency[count]) {
                    frequency[count] += 1;
                } else {
                    frequency[count] = 1;
                }
            })
            return frequency;
        })))

}