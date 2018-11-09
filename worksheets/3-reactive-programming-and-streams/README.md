1) Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern?  What are streams useful for modeling and when might you use them in Rich Web development?

        Streams are an abstraction used to model asynchronous data sources and implement the observer pattern.
        They can be used as an abstraction of asynchronous events. Examples include keyboard events and network 
        responses/requests.

2) Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?
        
        An example of using RxJS to handle network responses would be when a user is searching for data using a search box. 
        First we would create a variable which holds the observable.fromEvent. Most likely this observable would also
        map to the data we are using to search with (searchbox value). Then we would map the request to the observable,
        then we subscribe the response handler.
        
        Pseudo code might look like
        var = Observable
                .fromEvent(button click)
                .map(get search boxes value)
                .map((value)=> make http request with value)
                .subscribe(handle http response)
                
        Streams provide a possible solution to synchronise problems. It provides to ability to merge, for example, button clicks
        with network requests and responses. 
        
        One of the downside to observables is that they can't be chained. you cant says observe this then observe that. 
        Whereas promises can return another promise allowing for chaining.