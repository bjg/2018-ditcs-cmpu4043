

// 1. List of objects having the attributes
fetch('http://jsonplaceholder.typicode.com/users')
	.then(response => response.json())
	.then(function(data) {
		let username = data.map( d => {
			console.log(d.username);
			console.log(d.address.city);
			console.log(d.address.zipcode);
			console.log('\n');
		});

		// 2. Show the number of users having only zipcodes starting w/ 2 or 5

		let zip = data.map( d => {

			return d.address.zipcode.startsWith('2') || d.address.zipcode.startsWith('5');
		});

		console.log(zip);
		console.log('\n');

		data.map(d => {
			if (zip === true) {
				console.log(d.username);
				console.log('\n');
			}
		});
	})


// 3. List all of the post titles having more than six words
fetch('http://jsonplaceholder.typicode.com/posts')
	.then(response => response.json())
	.then(function(data) {
		let title = data.filter( a => {
			if (a.title.split(' ').length > 6) {

				console.log(a.title);
				console.log('\n');
			}
		});

		// 4. Show a word frequency map for all of the body contents of the posts
		function wordFreq(data) {
			let words = data.split(/[\.\?!,\*'"] +/),
			freq = [], body;

			words.forEach(function (word) {
				body = newArray.filter(function (b) {
					return b.body == word;
				});
				if (body.length) {
					body[0].size += 1;
				}
				else {
					freq.push({body: word, size: 1});
				}
				return newArray;
			})
			console.log(freq);
		}
	});




	
	