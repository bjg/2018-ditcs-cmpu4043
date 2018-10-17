
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

			var names = data.map(nameFunc);

			console.log(names);

		})
		.catch((error) => {
			console.log('Error: ' + error.message);
		});
}

function nameFunc(obj)
{
	let ans = obj.username + " " + obj.address.city + " " + obj.address.zipcode;
	return ans;
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
			console.log(data.reduce(addition))
		})
		.catch((error) => {
			console.log('Error: ' + error.message);
		});
}

function addition(accum, currentVal)
{
	return accum + currentVal;
	// if(obj.address.zipcode.charAt(0) == 2 || obj.address.zipcode.charAt(0) == 5)
	// {
	// 	return accum + currentVal;
	// }
	// else
	// {
	// 	return accum;
	// }
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