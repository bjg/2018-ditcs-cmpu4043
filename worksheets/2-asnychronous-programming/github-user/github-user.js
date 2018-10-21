/* Author: Nicola Mahon C15755031 */

// variables for input, search and fetch
let search_button = document.getElementById("search");
let input = '';
let search_string = '';
let fetch_str = '';

// variables for getting div elements for displaying results from search
let name = document.getElementById("name");
let uname = document.getElementById("uname");
let email = document.getElementById("email");
let locate = document.getElementById("location");
let gists = document.getElementById("gists");
let userRepos = document.getElementById("repos");

// search parameters for testing
console.log("Search: nicolamahon banana raulalhi bjg");

// listener to handle keydown: enter (in case user hits the enter key to search)
document.addEventListener('keydown', function(event)
{
	// if the keydown is the 'enter' button
	if (event.code === 'Enter')
	{
		// try to fetch the user's data
		tryFetch();
	}
});	// end keydown

// listener to handle clicks: search_button
document.onclick = function(event)
{
  // get the clicked element
	let target = event.target || event.srcElement;

	// if the clicked element is the search_button
  if(target.innerHTML === search_button.innerHTML)
  {
		// try to fetch the user's data
    tryFetch();
  }
};  // end onclick

// function to try fetch user's data
function tryFetch()
{
	// find the search input box
	input = document.getElementById("input_box");

	// get the user's inputted value
  search_string = input.value;

	// create the argument for the fetch method
  fetch_str = "https://api.github.com/users/" + search_string;

	// fetch the data associated with the username entered as search parameter; check the response
  const userData = fetch(fetch_str).then(function(response)
	{
		// ensure that fetch returns OK i.e. not an error
		if(!response.ok)
		{
			// alert that there is no username matching the search parameter
			alert("User Not Found");
		}
		else  // a username has been found that matches the search parameter
		{
			// return the response parsed as JSON data
			return response.json();
		}
	});	// end fetch(user)

	userData
    .then(data =>	// start parsing the returned data
      {
				// handle undefined values
				for(value in data)
				{
					// if a value is null
					if(data[value] === null)
					{
						// change its value to explain to the user
						data[value] = "Not Available";
					}
				}

        // display the user's avatar
        document.getElementById("avatar").src = data.avatar_url;

				// display the user's information
				name.innerHTML = data.name;
        uname.innerHTML = data.login;
        email.innerHTML = data.email;
        locate.innerHTML = data.location;
        gists.innerHTML = data.public_gists;

				// clear the divs from the original html to make room for the user's repos
				resetRepos();

        // fetch the user's repos
        const repoData = fetch(data.repos_url);

        repoData
          .then(repo_data => repo_data.json())	// parse returned value as JSON data
          .then(repo_data =>										// parse the JSON data
            {
							// filter the user's repos one at a time
              repo_data.map(repo =>
                {
                  // create a new div element
                  let div = document.createElement("div");

									// set the class value for the div, to ensure CSS styling is applied
                  div.classList.add('repo');

									// set the div height to adjust dynamically depending on the length of the repo's details
									div.style.height = 'auto';

									// add the repo details to the innerHTML of the div
                  div.innerHTML = "Name: " + repo.name + "<br /><br />Description: " + repo.description;

									// append the new div to the document
                  userRepos.appendChild(div);

									// check if the number of repos is > 5
									if(repo_data.length > 5)
									{
										// if true, set the new div's parent element to scroll vertically
										userRepos.style.overflowY = 'scroll';
									}

                });  //end repo.map()
            }); // end data parsing
      });  // end JSON parsing
}	// end function tryFetch()

// function to clear the initial blank divs from the document
// - they will be replaced dynamically by divs containing data from the repo_url
function resetRepos()
{
  // get all the repo class elements; returns HTMLCollection
  let repos = document.getElementsByClassName("repo");

	// convert the HTMLCollection to an array
  repos = Array.from(repos);

	// loop through each repo element
  repos.map(old_repo =>
    {
			// remove the repo element
      old_repo.parentNode.removeChild(old_repo);
    }
  );	// end repos.map()
}	// end function resetRepos();
