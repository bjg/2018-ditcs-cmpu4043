# Q1: Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern?  What are streams useful for modeling and when might you use them in Rich Web development?

```diff
- "Explain what is meant by the stream abstraction. "
```

Stream abstraction is yet another way of dealing with asynchronous data sources. It differs to other methods of dealing with 
aychronous sources such as callbacks or promises in the fact that it's solution solves the "State Synchronisation Problem" by 
reading in data in "chunks" then storing the "chunks" in a buffer before it's omitted to the application. Take the diagram 
below of a representation of how a potentially large amount of data can be passed in sizeable chunks to an application.

![streams and buffers](https://user-images.githubusercontent.com/23337553/48307984-e95b0180-e550-11e8-9c36-ac888e6816ab.png)

Below is a code representation of how we might read a stream with the help of the fs package.
```
let fs = require('fs')
let readStream = fs.createReadStream('largeTextData.txt)
readStream.on('data', function(chunk){
	console.log('new chunk')
	console.log(chunk)
})
```
Note the following code will write out chunks of data each time hence the console will also have 'new chunk' logged to it multiple times depending on the size of the data in the largeTextData.txt file.

```diff
- "What is the relationship between streams and the observer pattern?"
```

Rxjs provides an easy way to implement data being read in streams through it's observer pattern. It does this by providing a 
reactive style of programming by allowing you to represent asychronous data streams using observable sequences called observables.
These observables are implemented by observers in which you subscribe to via the ".subscribe" method. 

Below is some example code to represent how this is implemented by using the range observable. This code is simply a different 
way of iterating through a list of numbers however this time using obserables. 

```
let observer = {
	next: (val) => {
		console.log(val)
	}
}
Observable.range(0, 10).subscribe(observer)
```

```diff
- "What are streams useful for modeling and when might you use them in Rich Web development?"
```


Streams are an abstraction used to model asynchronous data sources and are useful in Rich Web development when you either 
don't know about the potential size of the data source or you don't know when it will arrive


