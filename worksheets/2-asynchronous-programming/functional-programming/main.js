'strict'

function main() {
    
    const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';
    const POSTS_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';
    
    fetch(USERS_ENDPOINT)
        .then(response => response.json())
        .then(function(users) {
        
            // list of objects containing username, city and zipcode
            const user_locations = users.map(function(location) {
                return {username: location.username, city: location.address.city, zip: location.address.zipcode}
            })
            
            console.log('----- List of objects containing username, city and zipcode -----');
            console.log(user_locations);
            
            // locations with zipcodes starting with 2 or 5
            const zipcodes = user_locations.filter(function(location) {
                if(location.zip[0] == '2' || location.zip[0] == '5') {
                    return location;
                }
            })
            
            console.log('----- Locations with zipcodes starting with 2 or 5 -----');
            console.log(zipcodes);


        })
    
    fetch(POSTS_ENDPOINT)
        .then(response => response.json())
        .then(function(posts) {

            // posts with titles that have more than 6 words
            const titles = posts.filter(function(post) {
                if(post.title.split(' ').length > 6) {
                    return post;
                }
            })
            
            console.log('----- Posts with titles containing more than 6 words -----');
            console.log(titles);
        
            // get each individual word in all body sections
            const words = posts.map(function(post) { return post.body.split(' '); }).flat();
        
            var word_freq = {};
        
            words.forEach(function(w) {
                if (!word_freq[w]) {
                    word_freq[w] = 0;
                }
                word_freq[w] += 1;
            });
        
            console.log('----- Words frequency map -----');
            console.log(word_freq);

        })

}