function main(){
	fetchingAll();
	filteringZipcodes();
	filteringPostWordCount();
	wordFrequency();
}
function fetchingAll()
{
	fetch('http://jsonplaceholder.typicode.com/users')
	.then(function(response) 
	{
		//Convert function to json then call json function to map array of objects
		response.json().then(function(getAll)
		{
			//Map result to user using function
			result = getAll.map(values =>
			{
				//Assign values read
				userData = 
						{
							username: values.username, 
							city: values.address.city, 
							zipcode: values.address.zipcode
						};
				return userData;
			});
			
			console.log("Listing the user info");
			console.log(result);
		});
	});
}

function filteringZipcodes()
{
	fetch('http://jsonplaceholder.typicode.com/users')
	.then(function(response) 
	{
		//Convert function to json then call json function to map array of objects
		response.json().then(function(getAll)
		{
			//Map result to user using function
			result = getAll.map(values =>
			{
				//Assign values read
				userData = 
						{
							username: values.username, 
							city: values.address.city, 
							zipcode: values.address.zipcode
						};
				return userData;
			});
		}).then(function(parsingZips)
		{
			//Use json.filter to parse the info fetched for zipcodes 2 and 5
			result = result.filter(user => user.zipcode[0] == 2 || user.zipcode[0] == 5);
			console.log("");
			console.log("Listing all values where zipcode is 2 or 5");
			console.log(result.length);
			console.log(result);
		})
	})  
}

function filteringPostWordCount()
{
	//Fetching posts instead this time
	fetch('http://jsonplaceholder.typicode.com/posts')
	.then(function(response) 
	{
		//Call function to split the post string up so that each word is separate then count
		response.json().then(function(wordCount)
		{
			//Post titles are all that is needed this time so no need to assign user array
			//Filtering json parsed for word length > 6 
			result = wordCount.filter(post => post.title.split(" ").length > 6);
			console.log("");
			console.log("Filtering by post titles of more than 6 words");
			
			console.log(result);
		})
	})  
}

function wordFrequency()
{
	//Fetching posts for word frequency
	fetch('http://jsonplaceholder.typicode.com/posts')
	.then(function(response)
	{
		response.json().then(function(mapping)
		{
			//variable to store the individual words
			wordFrequencyResult = mapping.map(oneWord =>
			{
				//Split the words from the spaces
				wordFrequencyCounter = oneWord.body.split(" ");
				
				//Reducing wordFrequencyCounter into a single value
				return wordFrequencyCounter.reduce( (wordFrequencyCounter, word) =>
				{
					//If word has been registered before it is incremented
					if (word in wordFrequencyCounter)
					{
						wordFrequencyCounter[word]++;
					//Else the words is incremented
					}else
					{
						wordFrequencyCounter[word] = 1;
					}
				
					return wordFrequencyCounter;
				}, {});
			});
			
			console.log("");
			console.log("Word frequency mapper");
			console.log(wordFrequencyResult);
		});
		
	});
}