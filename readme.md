**_What is web component abstraction?_**
Web components are custom, re-usable elements which allow a developer to
create their own abstract functionality, including control of how they are
rendered in the DOM.

This means that a web components' features and functionality can be kept
separate from the regular DOM, which in turn means that they can
be accessed and processed onlywhen necessary through inclusion in dynamically 
generated content as part of templates.

**_What is JavaScript Object Notation (JSON)?_**
JSON is a data interchange format built on dictionaries/associative arrays and
ordered lists. It is actually language agnostic but very popular on the web,
since the format has an equivalent in many C-based languages.

The main difference between JSON and "regular" Javascript data is that all keys
must be quoted, and that it has less types. To convert from Javascript to JSON,
the simplest approach is setting up a dictionary in JS then converting it using
JSON.stringify(dictionary).

e.g

`let example = {
    some: "thing",
    foo: "bar"
};

let output = JSON.stringify(example);`

The opposite (JSON to JS) is `JSON.parse(output).`

**_In functional programming, what does the term functor mean?_**
A functor is some kind of mapping function or something that itself can be
mapped over. It can transform one thing into another when mapped over, and
behaves consistently when functioning.

`[40, 13, 0].map(x => x+9)
= [49, 22, 9]`

**_Briefly describe a bundler, loader and asset minimiser_**
A bundler is a tool used to package together all of the requirements to run a
project which includes libraries and their dependencies. They also tend to
integrate loaders and asset minimisers.

A loader allows you to transpile version-specific files, similar to how Android
Studio allows you to target specific versions of the operating system for your
app. 

An asset minimiser is one example of a preprocessor, which can be used to
reduce a file by removing all unnecessary spacing, automatically resizing image
files or replacing local library links with remote CDN equivalents.

**_Describe the process when a page is loaded into a browser_**
The first thing that happens when a page is loaded into a web browser is that
the domain name is processed to find the server it is mapped to, which then
begins a HTTP request. On an ordinary web page HTML is loaded first and is read
top to bottom.

This behaviour can be used to determine which CSS or JS files have priority
over others, the latter of which are safest to execute once the DOM has loaded.
You can control when JS is loaded by observing the state of the window or
container which is a necessary concern of asynchronously loading assets.

**_Mention an advantage and disadvantage of callsbacks, promises and streams_**


**_Why does try-catch not help with asynchronous errors, and what alternatives
are there?_**


**_Describe JSX using code fragments to illustrate your answer_**


**_Describe the Elm language architecture and the problems it is attempting to
solve_**


**_Describe the CSS Flex-Box model using code fragments to illustrate your
answer_**

