/* Author: Nicola Mahon C15755031 */

const userData = fetch('https://jsonplaceholder.typicode.com/users');

userData
  .then(data => data.json())
  .then(data =>
    {
      // blank line for easy reading
      console.log('');

      // Question 1:
      console.log("Q1. List of users: ");

      // List of objects having the following user attributes:
      // a. Username
      // b. City
      // c. Zipcode
      data.map(user =>
        {
          console.log('Username: ' + user.username + ', City: ' + user.address.city + ', Zipcode: ' + user.address.zipcode);
        }
      );

      // blank line for easy reading
      console.log('');

      // Question 2:
      console.log("Q2. Number of users with zipcodes starting with the number 2 or the number 5: ");

      // Show the number of users having only zipcodes starting
      // with the number 2 or the number 5
      data.map(user =>
        {
          const result = data.filter(user => user.address.zipcode[0] === '2' || user.address.zipcode[0] === '5');
          console.log("Answer: " + result.length);
        }
      );

      // blank line for easy reading
      console.log('');
    });

const postData = fetch('https://jsonplaceholder.typicode.com/posts');

postData
  .then(post_data => post_data.json())
  .then(post_data =>
    {
            // Question 3:
            console.log("Q3. List of post titles having more than six words: ");

            // to number the post titles
            let count = 1;

            // List all of the post titles having more than six words
            post_data.map(post =>
                    {
                            // check the title is not empty
                            if (post.title !== '')
                            {
                                    // get a single title string
                                    let title = post.title;

                                    // split the string into temp_arr
                                    let temp_arr = title.split(' ');

                                    // get the length of temp_arr i.e. how many words are in the title
                                    let result = temp_arr.length;

                                    // if there are more than 6 words in the title
                                    if (result > 6)
                                    {
                                            // print the title
                                            console.log(count + ": " + post.title + " ; No.Words: " + result);

                                            // increment the post counter
                                            count = count + 1;
                                    }
                            }
                            else    // title is blank
                            {
                                    // print feedback
                                    console.log("Title attribute is empty.");
                            }
                });

                // blank line for easy reading
                console.log('');

                // Question 4:
                console.log("Q4. Word frequency map for all of the body contents of the posts: ");

                //new Map object
                let myMap = new Map();

                // array to store each unique key
                let unique = [];

                // map to parse the post body and clean it up
                post_data.map(post =>
                        {
                                if (post.body !== '')
                                {
                                        // get the title for each post
                                        let xbody = post.body;

                                        // clean the newline char (\n) from the body
                                        let body = xbody.replace(/\n/g, '')

                                        // value to be added to the map as the key-value pair
                                        let value = 0;

                                        // split the title into an array
                                        let temp_arr = body.split(' ');

                                        // filter the temp_arr array
                                        temp_arr.filter(post =>
                                                {
                                                        // if the key is not in the array already
                                                        if(!unique.includes(post))
                                                        {
                                                                // add the (string) key to the array
                                                                unique.push(post);

                                                                // initial value for the first occurence is 1
                                                                value = 1;
                                                        }
                                                        else   // the key is not unique
                                                        {
                                                                // get the current value from the Map
                                                                let key_value = myMap.get(post);

                                                                // increment the value for the key
                                                                value = key_value + 1;
                                                        }

                                                        // add the (string) key and (occurence) value to the Map
                                                        myMap.set(post, value);

                                                });  // temp_array.filter
                                        }   // if (post_data[key].title !== '')
                                });  // post_data.map

                                // print the map
                                console.log(myMap);
                        });  // post_data.JSON - outer bracket - okay
