/* THE MAIN FLOW OF THE 4 PARTS FOR QUESTION 2 WERE AS FOLLOWS: 
    1: get data from the api
    2: parse it to json
    3: use one of the higher order functions of reduce, map and filter
       to iterate through the returned data
    4: pass a callback function into one of the higher order functions 
       and make it display html and log to the console
*/

document.getElementById('getPosts').addEventListener('click', getUsersQ1);
document.getElementById('getPosts2').addEventListener('click', getUsersQ2);
document.getElementById('getPosts3').addEventListener('click', getPostsTitlesQ3);
document.getElementById('getPosts4').addEventListener('click', getWordFreqQ4);
let output = document.getElementById('output')



/* START OF QUESTION 2 PART 1 ****** ----- */

let makeHTMLQ1 = (sum, user) => {
    newvalue = `
    <div>
        <h3>${user.username}</h3>
        <h6>${user.address.city}</h6>
        <h6>${user.address.zipcode}</h6>
    </div>
    `
    return sum + newvalue
}

let logToConsoleQ1 = (data) => {
    data.forEach(function(obj){
        console.log("username: ",obj.username, "city: ",obj.address.city, "zipcode: " ,obj.address.zipcode)
    })
}

function getUsersQ1(){
    fetch('http://jsonplaceholder.typicode.com/users')
    .then((json) => json.json())
    .then( (data) => {
        output.innerHTML =  data.reduce(makeHTMLQ1, '')
        return data
    })
    .then((data) => logToConsoleQ1(data))
}

/* ---- ***** END OF QUESTION 2 PART 1 */




/* START OF QUESTION 2 PART 2 ****** ----- */

let getNumUsers = (sum, user) => {
    if(user.address.zipcode.startsWith('2') || user.address.zipcode.startsWith('5')  ){
        sum ++
    }
    return sum
}

function getUsersQ2(){
    fetch('http://jsonplaceholder.typicode.com/users')
    .then((json) => json.json())
    .then( (data) => {
        let answer;
        answer =  data.reduce(getNumUsers, 0)
        output.innerHTML = `The number of <b>users</b> having only zipcodes 
                            starting with the number 2 or the number 5 is <b> ${answer} </b> `
        console.log(answer)
    })
}


/* ---- ***** END OF QUESTION 2 PART 2 */




/* START OF QUESTION 2 PART 3  ****** ----- */

let getPostsOver6 = (post) => {
    let wordsArray = post.title.split(" ");
    if(wordsArray.length > 6){
        return post
    }

}

let makeHTMLFromPostsOver6 = (postOver6) => {

    output.innerHTML = `
        <h1> List of all titles</h1>
        <ul id= "insertTitle"></ul>
        `
    let insertTitle = document.getElementById('insertTitle')

    postOver6.forEach(function(post){
        console.log(post.title)
        let title = document.createElement('li')
        var textnode = document.createTextNode(`${post.title}`);
        title.appendChild(textnode) 
        insertTitle.appendChild(title)
    })

}

function getPostsTitlesQ3(){
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then((json) => json.json())
    .then( (data) => {
        let postOver6 = data.filter(getPostsOver6)
        return postOver6
    })
    .then((postOver6) => {
        makeHTMLFromPostsOver6(postOver6)
    })
}


/* ---- ***** END OF QUESTION 2 PART 3 */



/* START OF QUESTION 2 PART 4  ****** ----- */


// push the string hit to it, from there we can find the length hence word frequency 

let makeObjFrequency = (obj, element) => {
    obj[element] = obj[element] || []
    obj[element].push('hit')
    return obj
}

/* 1: globally remove \n from words, wihtout g flag 
    set it was only returning for 1st instance
    
    2: now we can split them up into an array
    
    3: aim to have a big array and then do our calculation from there
*/
let makeBigArr = (arr,data) => {
    let removedLineBreak = data.body.replace(new RegExp("\n", "g"), ' ')
    let smallArr = removedLineBreak.split(" ")
    arr.push.apply(arr, smallArr)
    return arr
}

let makeWordFrequencyHTML = (key, value) => {
    let wordFreqUl = document.getElementById('wordFreq')
    let wordAndWordfreq = document.createElement('li')
    let textnode = document.createTextNode(`${key} : ${value}`);
    wordAndWordfreq.appendChild(textnode) 
    wordFreqUl.appendChild(wordAndWordfreq)
    console.log(key, value)
}


function getWordFreqQ4(){
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then((json) => json.json())
    .then((data) => data.reduce(makeBigArr, []))
    .then((arr) => arr.reduce(makeObjFrequency, {}))
    .then((object) => {
        output.innerHTML = `
        <h1> Word Frequency </h1>
        <ul id="wordFreq"> </ul>
        `
        for(let key in object){
            let value = object[key]
            makeWordFrequencyHTML(key, value.length)
        }
    })
}


/* ---- ***** END OF QUESTION 2 PART 4 */