function main(){
    part1();
    part2();
    part3();
    part4();
}

function part1(){
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(function(response) {
        response.json().then(function(json){
            result = json.map(function(x){
                user = {username:x.username, city:x.address.city, zipcode: x.address.zipcode};
                return user;
            })
            return result
        }).then(function(result){
                console.log("part1")
                result.forEach(function(x){
                console.log(x.username + " " + x.city + " " + x.zipcode);
            })
        })

    })  
}

function part2(){
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(function(response) {
        response.json().then(function(json){
            result = json.map(function(x){
                user = {username:x.username, city:x.address.city, zipcode: x.address.zipcode};
                return user;
            })
            return result
        }).then(function(result){
                result = result.filter(user => user.zipcode[0] == 5 || user.zipcode[0] == 2)
                console.log("part2")
                console.log(result.length)
        })

    })  
}

function part3(){
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
        response.json().then(function(json){
            result = json.filter(post => post.title.split(" ").length > 6)
            console.log("part3")
            result.forEach(post => console.log(post.title + "\n\n" + post.body + "\n\n\n"))
        })

    })  
}

function part4(){
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then(response => response.json().then(function(json){
        words = {}
        json.forEach(post => post.body.split(" ").map(x => words[x] == null? words[x]=1: words[x]++))
        
        console.log("part4")
        console.log(words);
    }))
}