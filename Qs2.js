// URL containing JSON data
root = "http://jsonplaceholder.typicode.com/";
userpath = "users";

// XMLHttpRequest class
const http = new XMLHttpRequest();
http.onreadystatechange = () => {
    if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
            let response = JSON.parse(http.responseText);
            console.log(response);
            // User name Array
            let usernameArray = Object.keys(response).map(function(key) {
                return response[key].username;
            });
            console.log(usernameArray);

            // Geo objects Array
            let geoArray = Object.keys(response).map(function(key) {
                let lat = {lat: response[key].address.geo.lat + ', ' + response[key].address.geo.lng};
                return lat;
            });
            console.log(geoArray);

            // User details Array
            let userArray = Object.keys(response).map(function(key) {
                let user = [{name: response[key].name}, {id: response[key].id},
                    {companyname: response[key].company.name}, {zip: response[key].address.zipcode}];
                return user;
            });
            console.log(userArray);

            // Location Array
            let addressZip5 = Object.keys(response).filter(function(key) {
                return response[key].address.zipcode.charAt(0) === '5';
            }).map(function(key) {
                return response[key].address;
            });
            console.log(addressZip5);

            // Product Array
            let total = Object.keys(response).reduce(function(total, num, key) {
                return total * response[key].id;
            }, 1);
            console.log(total);
        } else {
            console.log('Error ' + http.statusText);
        }
    }
};
http.open("GET", root + userpath);
http.send();
