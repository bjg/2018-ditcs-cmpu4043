
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
	// fetch('https://jsonplaceholder.typicode.com/')
	// 	.then(response => response.json())
	// 	.then(json => console.log(json))
	// 	;

	var foo = fetch('https://jsonplaceholder.typicode.com/users/')
			  .then(response => response.json())
			  .then(json => console.log(json))
			  ;

	
	// var bar = foo.filter(response => response.json.Username)
	// 			.map(ans => console.log(ans))
	// 			 ;
}

//part 2
function twoOrFive()
{
	//Show users having Zipcodes that start with 2 or 5

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