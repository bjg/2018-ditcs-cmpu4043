let user_url = 'https://jsonplaceholder.typicode.com/users'
let post_url = 'http://jsonplaceholder.typicode.com/posts'

let userList = [ fetch(user_url)
.then(response => response.json())
.then( (list) => {
    list.map( (user) => {
                          console.log("Username: "  + user["username"]);
                          console.log("City: " + user["address"]["city"]);
                          console.log("Zipcode: " + user["address"]["zipcode"]);
                          console.log("");
                        }
              )
    let zip_Num = list.filter( (user, zipNo) => {
                              zipNo = user["address"]["zipcode"].charAt(0);
                              if(zipNo === "2" || zipNo === "5") {
                                  return zipNo;
                                }
                             }
                    )

    console.log("Number of Users having only zipcodes starting with the number 2 or the number 5: " + zip_Num.length + " users in total.")
      })
]


let postList = [ fetch(post_url)
.then(response => response.json())
.then( (list) => {
    list.filter( (post, title) => {
                            title = post["title"];
                            if(title.length > 6) {
                            console.log("Post titles: " + title);
                          }
                        }
                )

    let frequency = list.map( (post, body, word, freq_Map) => {
                               body = post["body"];
                               word = body.split(/\s/);
                               freq_Map = {};

                              word.map((freq_Word) => {
                                if(freq_Map[freq_Word]) {
                                    freq_Map[freq_Word] += 1;
                                 }
                                else {
                                  freq_Map[freq_Word] = 1;
                                 }

                               })

                               return freq_Map;
                          }
                )

    console.log(frequency);

      })

]
