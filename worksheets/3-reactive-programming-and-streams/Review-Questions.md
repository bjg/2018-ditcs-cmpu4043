# Lecture Review Questions

### Name: Gabriel Grimberg
### Module: Rich Web Applications
### Type: Lab 3 - Question 3

(1-2 paragraphs/bullets, etc) answers for the following. It is important that you have reviewed the module material in advance.

## Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern? What are streams useful for modeling and when might you use them in Rich Web development?

- When discussing what a stream abstraction is, it's basically a sequence of data, which is distributed in time. Sequences are usually known as arrays and lists. The way it works is first we load the whole sequence into memory and then we process the data, this allows us to process data piece by piece as it appears in the memory, then you pass it further and forget about it. 

- Streams are collections of data just like in arrays and strings. The difference between streams and the observer pattern is that streams might not be available all at once, they don't take up the memory all at once, this makes streams really useful when working with a large amount of data.

- The observer pattern is an object interface which provides a generalized mechanism for push-based notification which is also known as the observer design pattern. The observable object represents the object that sends these notifications to the provider and the observer object represents the class that receives them.

## Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?

- I would use the RxJS library just for monitoring a sequence of events from a running task. There are more benefits of RxJS which can be taken to the full advantage such as it can be used for asynchronously integrating any event-based process with any other process.

- Imports from the Rx library such as Observable, map and such are used to make asynchronous calls to a web service from let's say a button click or key that's pressed (a good example is my calculator).

- The benefits of using streams library for networking is that the API calls are almost a staple on with several advantages from offloading work to designing reliable network behavior.

- The downside to using streams would be debugging it, as the years progress, debuggers are improving, but even now, when you're stepping through stream code in a debugger it can be harder work than for example a loop because a simple loop is very close to the variables and code locations that a debugger would work with.