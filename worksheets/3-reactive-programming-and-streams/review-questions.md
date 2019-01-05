### Lecture Review Questions

Part 7 of Week's 3's lab.

---

**Part 1**

Stream abstraction is a method of taking data sources and abstracting them to use streams. For example a function that calls a particular API endpoint and returns it's data, normally would return the entire block of data in a single block. However with a stream, the data is continually fed to the consumer by the producer. There is a contract between the two saying that data will be passed between the two, however it may not be now, it may not be in a few seconds time, or it may not happen at all, but there will be some stream of data.

The observer pattern has a one to many relationship with all of it's subscribers. The observer maintains a list of all of it's subscribers and each time the observer gets some sort of information it will pass it to it's subscribers in the form of a stream. The data flow can happen instantly or in some point in the future. What's more, by using streams, we don't have a defined block size meaning that the incoming data can be any length.

In Rich Web, streams are particularly useful for loading content and data. For example if I have a single page application running using Angular or React, a user could request particular information like their Posts. Whilst the server goes and get's this information the page is not locked in a "loading" state. This allows the user to continue using the site, whilst the data is being retrieved. This data will be presented to the user sometime in the future but it allows the site to stay free, and it let's it do other things while the data is being retrieved. If a user is asking for a large portion of data, without streams or asynchronous techniques, the site would be in a "loading" state to other visitors while the data is being retrieved. Only when it is retrieved can normal operations continue.



**Part 2**

With React, you can create services which are specifically used to get data. Using this similar technique, a services folder with individual services could be created. Each service looks at getting a certain piece of data. These observables could be used in the applications components and subscribed to when necessary. Another huge benefit of observables is that the data is being streamed in the current moment. For example, if I made an observable that either contacts my database every 10-20 seconds looking for comments on a particular post, or notifications on a website, this information could be sent using a stream to all subscribers. This could be used to update a users notifications on a website without them needing to refresh the page.

The main difference between a promise and an observable is that promises only handle single events whereas observables stream 0 or more events. Observables can do and provide everything that a promise does, however it can 0 or more events.

I feel that when writing reactive web applications it is good to use observables anywhere if possible, however I feel observables can overcomplicate some easy and simple tasks that can be achieved with other synchronous methods.