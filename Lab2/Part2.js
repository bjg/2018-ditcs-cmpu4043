
function getPromise(url)
{
	
	return new Promise(function(resolve, reject)
{
	
	let xhr = new XMLHttpRequest();
	
	xhr.open("GET", url, true);
	
	xhr.onload = function(){
	 
		if(xhr.status === 200){
			resolve(JSON.parse(xhr.response));
		}
		else
		{
			reject(xhr.statusText +', Status: '+xhr.status); 
		} 
	};
	
		xhr.onerror = function(){
		reject(xhr.statusText);  
 	};
 
	xhr.send();

	});
}

	let url = 'http://jsonplaceholder.typicode.com/users';

	let promise = getPromise(url);

	// we create varaible 

	let userArray = [];
	let address = [];
	let city = [];
	let ZipcodeArray = [];
	let postArray = [];

	// we create object 

	let user = {
	username: '',
	city : '',
	zipcode : ''
	}

	let addressZipcode = {
	zipcode: ''    
	}

	let post = {
 	title: '' 
	}

	promise.then(function(data){

	
		// Part 1 List of objects having the following user attributes:
		//Username
		// City
		//Zipcode

	 for(let c=0; c < data.length; c++)
	{
		
		user.username    = JSON.stringify(data[c].username);
		user.city        = JSON.stringify(data[c].address.city);
		user.zipcode     = JSON.stringify(data[c].address.zipcode);
		userArray.push(JSON.stringify(user));
		
		document.getElementById("userInfo").innerHTML += userArray +'</a><br>';
		
	}
	
	// Part 2 Show the number of users having only zipcodes starting with the number 2 or the number 5
 
	 for(let q=0; q < data.length; q++)
	{
	
		addressZipcode.zipcode = JSON.stringify(data[q].address.zipcode);
		
	 let check = data[q].address.zipcode;
	 
	 // will check of zipcode starts with the digit 2 and 5 
	 if(check[0] === '2' && '5')
	{  
		address[q] = data[q].address.zipcode;
	}
	 
	ZipcodeArray.push(JSON.stringify(addressZipcode));
		
	document.getElementById("ZipcodeNo").innerHTML += ZipcodeArray +'</a><br>';

	} 
	
	// Part 3
 	//	List all of the post titles having more than six words

	 for(let p=0; p < data.length; p++)
	{
		post.title = JSON.stringify(data[p].company.catchPhrase);
		postArray.push(JSON.stringify(post));
		document.getElementById("post").innerHTML += postArray +'</a><br>';
	
	}
		
});




 
	