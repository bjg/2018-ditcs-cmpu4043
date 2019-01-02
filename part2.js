function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function parse(data) {
    var usernames = [];
    var geo = [];
    var users = [];
    var streets = [];
    var totalIds = 0;
    for(var i =0; i <Object.keys(data).length;i++){
        usernames.push(data[i].username);
        geo.push(data[i].address.geo);
        users.push(new Array(data[i].name, data[i].id, data[i].company.name, data[i].address.zipcode));
        if(data[i].address.zipcode[0] == '5'){
            streets.push(data[i].address.street);
        }
        totalIds += data[i].id;
    }
    console.log(usernames,geo,users,streets,totalIds);
}