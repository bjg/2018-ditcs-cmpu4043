let site= 'http://jsonplaceholder.typicode.com/users';
let request = new XMLHttpRequest();
//Puts the data from website into a variable
request.open('GET', site);
request.responseType = 'json';
request.send();
request.onload = function() 
{
	//part 1
	let data;  
	data = request.response;
	//get and display usernames, city and zipcode
	let get_information = data.map(function(obj) 
	{ 
		let usernames = [];
		let city = {};
		let zipcode = {};
		usernames = [obj.username];
		city = [obj.address.city];
		zipcode = [obj.address.zipcode];
		return([usernames,city,zipcode]);
	});
	
	//console.log(get_information);
	//Part 2
	//Show the number of users having only zipcodes starting with the number 2 or the number 5
	const startswith2 = data.filter(data => (data.address.zipcode[0] == 2 || data.address.zipcode[0] ==5));
	//console.log(startswith2.length);
}



let site2 = 'http://jsonplaceholder.typicode.com/posts';
let request2 = new XMLHttpRequest();
request2.open('GET', site2);
request2.responseType = 'json';
request2.send();

request2.onload = function() 
{
	let data;
	// Part 3 List all of the post titles having more than six words
	data = request2.response;

	const filter_data = data.filter(data => (data.title.split(' ').length >6));
	
	let get_information = filter_data.map(function(obj) 
	{ 
		let title = [obj.title];
		//console.log(title);
		return(title); 
	});
	
	
	var title = get_information;
	//console.log(get_information);
	
	
	//Part 4 - Show a word frequency map for all of the body contents of the posts
	//let data2;
	//data2 = request2.response;
	//console.log(typeof data);
	let filter_data2 = data.map(data => (data.body.toString().split(" ")));
	//let filter_data2 = data.map(data => (data.body.toString()));
	filter_data2 = filter_data2.flat();
	console.log(filter_data2);
	//could not get to work
	let freqMap= [];
	
	filter_data2.forEach(function(word) {
             if (!freqMap[word]) {
                 freqMap[word] = 0
             }
             freqMap[word] += 1
        });
	console.log(freqMap);
	
}
	


 
 

 
