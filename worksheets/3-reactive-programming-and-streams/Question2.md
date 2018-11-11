# Q2: Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?

```diff
- "Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could 
- use the RxJS library to handle asynchronous network responses to API requests."
```

Rxjs and streams are highly useful when you don't know either the size or arriving time of the data into your 
application. You can thus use the observer pattern provided by rxjs to overcome this issue by creatin asychronous 
streams called obserables which subscribe to observers which implement the observables through its next, error 
and complete methods.

*Observables*

There is a hugh range of observables to choose from in the rxjs library which all hae different functionality 
such as the interval observable which fires a "chunk" every x amount of time passed into it's paramater eg

```
Observable.interval(1000) - a chunk will fire every one second or 1000 milliseconds
```

*Observers*

Observers then implement these "chunks" with the methods of next, error or complete. Next get given a paramter value which can be executed on the next value given by ther observable. Error also is given a paramter but doesn't log the next value given by the observable finally complete where no parameter is passed to its function stops and further calls to the observable. See the code below for how it is all implemented taking the interval example above on the execution of the observable at hand

```
observer = {
	next: (value) => console.log("Time lapsed:" + value + " seconds" ) 
	error: (value) => console.log("An error has occured")
	complete() => console.log("Complete called ... no more data will be recieved")
}
```

*Subscribe*

Subscribe is simply the link between the obseravble and the observer. By implementing this the observable can be executed.

```
Observable.interval(1000).subscribe(observer)
```

```diff
- In your opinion, what are the benefits to using a streams library for networking over, say, 
- promises? And what do you think are the downsides?"
```

The main benefit of using rxjs or another streams library is that it solves the state synchronisation problem by reading 
data in as chunks to the application. Streams provides this solution to the synchronization problem by modelling 
everything in the application architechure as a stream processing problem by modelling everything to a merged set of data streams. 


A possible drawback of a stream library to a promise is of course that these libraries are not built into javascript thus 
needing a cdn placed in the html code (which requires internet connection) or a module bundler like webpack to allow importing 
of packages from nodes "npm" package manager. Such module bundlers require a specified amount of learning  to implement.
