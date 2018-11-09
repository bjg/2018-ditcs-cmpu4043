
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
				let ans = obj.username + " _ " + obj.address.city + " _  " + obj.address.zipcode;
				return ans;
			});

			names.every(console.log);
		})
		.catch((error) => {
			console.log('Error: ' + error.message)
		});
}

//part 2
function twoOrFive()
{
	//Show number of users having Zipcodes that start with 2 or 5
	const apiURL = 'https://jsonplaceholder.typicode.com/users/';
	fetch(apiURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			
			let zips = data.map(function(obj)
			{
				return obj.address.zipcode;
			});

			zips = Object.values(zips);
			zips = zips.map(ele => {
				if(ele[0] == 2 || ele[0] == 5)
				{
					return 1;
				} else {
					return 0;
				}
			});

			ans = zips.reduce(function(a, b) {
				return a + b;
			}, 0);

			console.log("Number of Zipcodes starting with 2 or 5: " + ans);
		})
		.catch((error) => {
			console.log('Error: ' + error.message);
		});
}

//part 3
function postTitleSix()
{
	//Show all post titles having 6 or more words
	const apiURL = 'https://jsonplaceholder.typicode.com/posts/';
	fetch(apiURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			let post = data.map( ele => {
				if(ele.title.split(' ').length >= 6) 
				{ 
					return ele.title;
				}
			});

			let ans = post.filter(ele => {

				return ele != null;
			});
			
			console.log(ans);

			})
		.catch((error) => {
			console.log('Error: ' + error.message);
		});
}

//part 4
function wordFreq()
{

	//word frequency map for all body contents of the posts
    const apiURL = 'https://jsonplaceholder.typicode.com/posts/';
    fetch(apiURL)
        .then(response => {
            return response.json();
        })
        .then(data => {
 
            let post = data.map(function(obj)
            {
                return JSON.stringify(obj.body);
            })

            let total = post.join(" ");
            let ans = words(total);

            console.log(ans);

        })
        .catch((error) => {
            console.log('Error: ' + error.message);
        });
 
}

function words(string)
{
    let use = string.split(/\s+/);
    
    var wordArray = {};
    
    use.forEach(ele => {
    	if(wordArray.hasOwnProperty(ele))
    	{
    		wordArray[ele]++;
    	}
    	else
    	{
    		wordArray[ele] = 1;
    	}
    });

    return wordArray;
}