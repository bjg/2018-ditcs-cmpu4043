let user_url = 'https://jsonplaceholder.typicode.com/users'
let post_url = 'http://jsonplaceholder.typicode.com/posts'

userList();
postList();

// function for retrieving data from users and outputs the tasks required
function userList() {
fetch(user_url)
.then(response => response.json())
.then( (list) => {
    list.map( (user) => {
                          console.log("Username: "  + user["username"]);
                          console.log("City: " + user["address"]["city"]);
                          console.log("Zipcode: " + user["address"]["zipcode"]);
                          console.log("");
                        }
              )
    let zipNumber = list.filter( (user, zipNo) => {
                              zipNo = user["address"]["zipcode"].charAt(0);     // starting from 0
                              if(zipNo === "2" || zipNo === "5") {
                                  return zipNo;
                                }
                             }
                    )

    console.log("# of Users with zipcodes starting with 2 or 5: " + zipNumber.length + " users in total.")
      })
}

// function for retrieving data from posts and outputs the tasks required
function postList() {
fetch(post_url)
.then(response => response.json())
.then( (list) => {
    list.filter( (post, title) => {
                            title = post["title"].split(' ');
                            if(title.length > 6) {
                            console.log("Post titles: " + title);
                          }
                        }
                )

    let frequency = list.map( (post, body, word, freqMap) => {
                               body = post["body"];
                               word = body.split(/\s/);    // pulls each word out that are matched to any white space character
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

    console.log(frequency);

      })
}
