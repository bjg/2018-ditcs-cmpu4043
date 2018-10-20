/*
	Name: Robert Vaughan
	StudentNo: C15341261
*/

/*
	Parses user information 
*/
function parseUserInfo(json_obj) {
	users = json_obj.map(item => {
		return {"x":item.username, "y":item.address.city, "zip":item.address.zipcode};
	});
	console.log(users);

	zips = users.filter(x => 
		x["zip"].charAt(0) === '2' || x["zip"].charAt(0) === '5');
	console.log("Users with zip codes starting with 2 or 5: " + zips.length);
}

/*
	Parses post information 
*/
function parsePosts(json_obj) {
	const listTitle = json_obj.filter(item => 
		item.title.split(" ").length > 6).map(json_obj => {
				return json_obj.title;
			});

	console.log(listTitle);

	let list = {};

	// Nested mapping with a string spilt
	// to get each word in a dictonary
	json_obj.map(item => 
		item.body).map((item) =>
			item.split(" ")).map(word => {
				// console.log(item2);
				word.map(x => {
					list[x] == null ? list[x]=1 : list[x]++;
				});
			});

	console.log(list);
}

fetch("http://jsonplaceholder.typicode.com/users").then(function(response) {
	return response.json();
}).then(function(json_obj) {
	// console.log(JSON.stringify(json_obj));
	parseUserInfo(json_obj);
	return fetch("http://jsonplaceholder.typicode.com/posts");
}).then(function(response) {
	return response.json();
}).then(function(json_obj) {
	return parsePosts(json_obj);
});