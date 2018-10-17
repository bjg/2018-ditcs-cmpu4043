
//get things started
main();

function main()
{
	objectsNameCityZip();
	twoOrFive();
	postTitleSix();
	wordFreq();
}

//part 1
function objectsNameCityZip()
{
	//list objects with a Username, City and Zipcode
	const apiURL = 'https://jsonplaceholder.typicode.com/users/';

	fetch(apiURL)
		.then(response => {

		 return response.json();

		})
		.then(data => {

			var names = data.map(function(obj)
			{
				let ans = obj.username + " " + obj.address.city + " " + obj.address.zipcode;
				return ans;
			});

			names.every(console.log)
		})
		.catch((error) => {
			console.log('Error: ' + error.message);
		});
}

//part 2
function twoOrFive()
{
	//Show users having Zipcodes that start with 2 or 5
	const apiURL = 'https://jsonplaceholder.typicode.com/users/';
	fetch(apiURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			
			let zips = data.map(function(obj)
			{
				return obj.
			});
		})
		.catch((error) => {
			console.log('Error: ' + error.message);
		});
}

//part 3
function postTitleSix()
{
	//Show all post titles having 6 or more words

}

//part 4
function wordFreq()
{
	//word frequency map for all body contents of the posts

}