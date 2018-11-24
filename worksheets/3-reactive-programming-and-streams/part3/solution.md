# Rich Web Technology - Lab 3

####Exercise 3

(i) **Q**: Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern?  What are streams useful for modeling and when might you use them in Rich Web development?

**Answer**: In the stream abstraction, a stream is an ordered list of values(Numbers, events, etc) to be handled asynchronously as they appear. 

A stream usually has a function or piece of functionality that is interested in the values contained/generated within it. Ultimately each value in the stream will end up being processed in some way(Potentially after a bunch of transformations). We say that the function "subscribes" to the stream in which the values are contained. 

This is also how the observer pattern works, where you have some subjects, and observers attach to those subjects. When something changes in the subject, all of the observers attach to it will be notified. Here the observers are "interested" in the subject, so they "subscribe" to it. 

In relation to Reactivex, the streams(Observable) are the subject and  Observers subscribe to them.  To below demonstrate this.

	const subject = of(1, 2, 3);
	subject.subscribe(val => observer(val));

	function observer(val)
	{
		console.log(val)
	}
	
This abstraction is incredibly useful for dealing with events, etc that may or may not happen in the future and need to be handled asynchronously.

(ii) **Q**: Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?

**Answer**: To make a web api using rxjs, you could have a stream for each different type of network request, for example one for requesting users and another for general site information like statistics, metrics etc. This would allow you to write very clean code that doesn't block while it does processing. If the api is receiving many requests they will be stored in the stream and handled in a pipeline fashion. Promises would be more tricky as each request would need to be it's own promise, as opposed to multiple api requests being abstracted into a stream of requests. Streams would provide much more powerful functionality, for example, filtering out duplicate requests in a stream. 

The only potential downside is the fact that Rxjs isn't native to Javascript like promises are.  




