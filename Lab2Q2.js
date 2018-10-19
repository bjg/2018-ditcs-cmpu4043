let user_url = 'https://jsonplaceholder.typicode.com/users'
let post_url = 'http://jsonplaceholder.typicode.com/posts'
// putting the urls into variables

let usersList = [ fetch(user_url)
.then(response => response.json())
.then( (list) => {
    list.map( (user) => {
                          console.log("Username: "  + user["username"]);
                          console.log("City: " + user["address"]["city"]);
                          console.log("Zipcode: " + user["address"]["zipcode"]);
                          console.log("");
                        }
              )
	// displaying the users, city and zipcode		  
	
    let zipNumber = list.filter( (user, zipNo) => {
                              zipNo = user["address"]["zipcode"].charAt(0);     // starting from 0
                              if(zipNo === "2" || zipNo === "5") {
                                  return zipNo;
                                }
                             }
                    )

	// Q2: filter so see how many people have the zipcode starting from two and five
	
    console.log("Users with zipcodes starting between two and five: " + zipNumber.length)
      })
]	


let postList = [ fetch(post_url)
.then(response => response.json())
.then( (list) => {
    list.filter( (post, title) => {
                            title = post["title"].split(' ');
                            if(title.length > 6) {
                            console.log("Post titles: " + title);
                          }
                        }
                )

	// Q3: listing all of the post titles having more than six words
				
    let frequency = list.map( (post, body, word, freqMap) => {
                               body = post["body"];
                               word = body.split(/\s/);    // pulls out any word matched by a space
                               freqMap = {};

                              word.map((freqWord) => {
                                if(freqMap[freqWord]) {
                                    freqMap[freqWord] += 1;
                                 }
                                else {
                                  freqMap[freqWord] = 1;
                                 }

                               })

                               return freqMap;
                          }
                )

	// Q4: checks each object, and checks how frequent a word is for each object
				
    console.log(frequency);

      })

]
