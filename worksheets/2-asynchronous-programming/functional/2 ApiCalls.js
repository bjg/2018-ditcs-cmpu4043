function log(text)
{
	console.log(text)
	// var logDiv = document.createElement("div");

	// logDiv.innerHTML = text;

	// body.appendChild(logDiv);
}

async function getJsonData(url)
{
	returnData = null
	await fetch(url)
	.then((resp) => resp.json())
	.then(function(data) 
	{
		returnData = data;
		
	})
	.catch(function(error) 
	{
		console.log(error);
	}); 

	return returnData;
}

async function part1()
{
	let users = await getJsonData('https://jsonplaceholder.typicode.com/users');
	
	result = users.filter(u => u.username && u.address.city && u.address.zipcode);
	
	log(result);
}

async function part2()
{
	let users = await getJsonData('https://jsonplaceholder.typicode.com/users');
	
	result = users.filter(u => u.address.zipcode[0] === '2' || u.address.zipcode[0] === '5').length;
	
	log(result);
}

async function part3()
{
	let posts = await getJsonData('https://jsonplaceholder.typicode.com/posts');
	
	filteredPosts = posts.filter(p => p.title.split(" ").length > 6);
	result = filteredPosts.map(p => p.title);
	
	log(result);
}

async function part4()
{
	let posts = await getJsonData('https://jsonplaceholder.typicode.com/posts');

	splitArray = posts.map(p => p.body.replace(/\n/g,' ').split(' '));
	flatArray = splitArray.flat();
	
	var wordFrequency = [];

	flatArray.map(
	function(obj, index)
	{
		index = wordFrequency.findIndex(w => w.word === obj);
		if(index === -1)
		{
			wordFrequency.push({word:obj,frequency:1});
		}
		else
		{
			wordFrequency[index].frequency += 1;
		}
	});

	var result = wordFrequency;

	log(result);
}

var body = document.getElementById("main");

part1();
part2();
part3();
part4();