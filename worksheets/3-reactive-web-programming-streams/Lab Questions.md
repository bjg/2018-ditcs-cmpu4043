# Lecture Review Questions 

## Excercise 1

##### Explain what is meant by the stream abstraction. 
Streams can be simplified down into 4 fundemental types:
-Transform
-Duplex
-Writable
-Readale

The last two, Writable & Readable are the two that can be an abstraction from a source. This source can be anything, as anything can be _anything_ can be a stream of data.

##### What is the relationship between streams and the observer pattern? 
The observer pattern provides a subriber to an event _tigger_. In traditional JavaScript, an onclick event handler would be a clear comparison. However, as we move towards vast contaties of data potentially coming in from data sources, we need a method of dealing with the data. 

##### What are streams useful for modeling and when might you use them in Rich Web development?
Stream modelling can be compared to Business Layer Logic. We sparate out each separate task from each other, de-coupling, and easily manange each _component_ of our Rich Web Application. Each compement can be contained inside of a modlue. These modules will contain function specific code, say getters for API calls.
## Excercise 2

##### Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. 

Handling the api request, we need to first create a fromEvent Observer in order to kick things off. So either a button click, or keypress up event. From this, we can use a map function grab only the details we're interested in, or if our api call already had the details mapped out for us. From my research into the React Documentation, I have found that concatMap would be ideal for this interface. ConcatMap retains order in which a query may come down the pipeline for the subscribed hanlder.

Error handling:
Here I'd make use of debounce, this will allow me to set in miiliseconds the offset time for a user's keyboard inputs
Furthermore, we could use filter function to ensure only numericals, alphabeticle, or alphanumeric data is entered

Extras:
If there are two streams, or more, from the API call, we can make use of merge, to combine all streams into one.

##### In your opinion, what are the benefits to using a streams library for networking over, say, promises? 

The key advantage is the use of calling data asynchronously.
Using ReactiveX is composable, easily scalable, and more user friendly to read, when comparing to pure JS syntax.
With callbacks daisy chaining off each other, they can become tighly coupled on one another. 
```javascript 
function fetchCountries(){
  fetchJSON("/countries", (success, countries) => {
    if(success){
      try{
        // do some stuff
        fetchCities(countries[0].id);
      } catch(e){
          processError();
      }
    }else
      processError();
  });
}
function fetchCities(countryId){
  fetchJSON(`countries/{countryId}/cities`, (success, cities) => {
    if(success){
      try{
        // do some stuff
        fetchUniversities(cities[0].id);
      } catch(e){
          processError()
      }
    }else
      processError();
  });
}
function fetchUniversities(cityId){
  fetchJSON(`cities/{cityId}/universities`, (success, universities) => {
    if(success){
      try{
        // do some stuff
        fetchUniversityDetails(universities[0].id);
      }catch(e){
        processError();
      }
    }else
      processError();
  });
}
function fetchUniversityDetails(univId){
  fetchJSON(`/universities/{univId}`, (success, university) => {
    if(success){
      try{
        // do some stuff
        hideLoader();
      }catch(e){
        processError();
      }
    }else
      processError();
  });
}
```

Being compared to:

```javascript
get("/countries")
  .then(populateContDropdown)
  .then(countries =>  get(`countries/{countries[0].id}/cities`))
  .then(populateCitiesDropdown)
  .then(cities => get(`cities/{cities[0].id}/universities`))
  .then(populateUnivDropdown)
  .then(universities => get(`universities/{universities[0].id}`))
  .then(populateUnivDetails)
  .catch(showError)
  .then(hideLoader)
  ```  
##### And what do you think are the downsides?

Handling a stream input can be quite complex. When dealing with mulitple inputs, nested merge/map/filter/pipe functions, it can become cumbersome to figure out what's going on to your subcriber.
