function getPromise(url)
{
  
  return new Promise(function(resolve, reject)
{
  
  let xhr = new XMLHttpRequest();
  
  xhr.open("GET", url, true);
  
  xhr.onload = function(){
   
    if(xhr.status === 200){
      resolve(JSON.parse(xhr.response));
    }
    else
    {
      reject(xhr.statusText +', Status: '+xhr.status); 
    } 
};
  
    xhr.onerror = function(){
    reject(xhr.statusText);  
 };
 
  xhr.send();

});
}

let url = 'http://jsonplaceholder.typicode.com/users';
let url2 = 'http://jsonplaceholder.typicode.com/posts';

let promise = getPromise(url);

// we create varaible 

let ArrayName = [];
let userArray = [];
let adress = [];
let ids = [];
let postArray = [];
let StreetArray = [];
let productArray = [];

// we create object 
let postObj = {
  title : ''
}
  
let userObj = {
  name : '',
  id : '',
  city : '',
  zipcode : ''
}

let product = {
  
 id: '',
 bs: '' 
}

let addressStreet = {
  
  street: '',
  zipcode: ''    
  
}

promise.then(function(data){
 
    //List of objects having the following user attributes:

   for(let c=0; c < data.length; c++)
  {
    
    userObj.name = JSON.stringify(data[c].name);
    userObj.id = JSON.stringify(data[c].id);
    userObj.city = JSON.stringify(data[c].address.city);
    userObj.zipcode = JSON.stringify(data[c].address.zipcode);
    
    userArray.push(JSON.stringify(userObj));
    
    document.getElementById("userdetails").innerHTML += userArray +'</a><br>';
    
  }
    
    //**Show the number of users having only zipcodes starting with the number 2 or the number 5

   for(let q=0; q < data.length; q++)
  {
  
    addressStreet.street = JSON.stringify(data[q].address.street);
    addressStreet.zipcode = JSON.stringify(data[q].address.zipcode);
    
   let check = data[q].address.zipcode;
   
   // will check of zipcode starts with the digit 5 or 2
   if(check[0] === '5' || check[0] === '2')
  {  
    adress[q] = data[q].address.zipcode;
  }
   
  StreetArray.push(JSON.stringify(addressStreet));
    
  document.getElementById("StreetName").innerHTML += StreetArray +'</a><br>';

  }
  
//Didn't get to finish this...
    
});
