let ancestors = [];
let row;
let children = [];

row = document.createElement("div");
row.style.float = "left";
document.getElementById("cells").appendChild(row)
for (let i = 0; i < 101; i++) {
    ancestors[i] = document.createElement("div");
    ancestors[i].style.width = "8px";
    ancestors[i].style.height = "8px";
    ancestors[i].style.border = "1px solid black";
    ancestors[i].style.float = "left";
    if (Math.random() < 0.2) {
        ancestors[i].setAttribute("active", true);
        ancestors[i].style.backgroundColor = "#ff0000";
    } else {
        ancestors[i].setAttribute("active", false);
    }
    row.appendChild(ancestors[i]);
}

for (let i = 0; i < 50; i++) {
    row = document.createElement("div");
    row.style.float = "left";
    document.getElementById("cells").appendChild(row);
    for (let j = 0; j < 101; j++) {

        children[j] = document.createElement("div");
        children[j].style.width = "8px";
        children[j].style.height = "8px";
        children[j].style.border = "1px solid black";
        children[j].style.float = "left";
        //console.log(ancestors[j].getAttribute("active"));
        if (j === 0) {
            if (ancestors[100].getAttribute("active") === 'false' && ancestors[j].getAttribute("active") === 'true' && ancestors[j + 1].getAttribute("active") === 'false') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else if (ancestors[100].getAttribute("active") === 'false' && ancestors[j].getAttribute("active") === 'true' && ancestors[j + 1].getAttribute("active") === 'true') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else if (ancestors[100].getAttribute("active") === 'true' && ancestors[j].getAttribute("active") === 'false' && ancestors[j + 1].getAttribute("active") === 'false') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else if (ancestors[100].getAttribute("active") === 'true' && ancestors[j].getAttribute("active") === 'false' && ancestors[j + 1].getAttribute("active") === 'true') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else {
                children[j].setAttribute("active", false);
            }
        } else if (j == 100) {
            if (ancestors[j - 1].getAttribute("active") === 'false' && ancestors[j].getAttribute("active") === 'true' && ancestors[0].getAttribute("active") === 'false') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else if (ancestors[j - 1].getAttribute("active") === 'false' && ancestors[j].getAttribute("active") === 'true' && ancestors[0].getAttribute("active") === 'true') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else if (ancestors[j - 1].getAttribute("active") === 'true' && ancestors[j].getAttribute("active") === 'false' && ancestors[0].getAttribute("active") === 'false') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else if (ancestors[j - 1].getAttribute("active") === 'false' && ancestors[j].getAttribute("active") === 'false' && ancestors[0].getAttribute("active") === 'true') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else {
                children[j].setAttribute("active", false);
            }
        } else {
            if (ancestors[j - 1].getAttribute("active") === 'false' && ancestors[j].getAttribute("active") === 'true' && ancestors[j + 1].getAttribute("active") === 'false') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else if (ancestors[j - 1].getAttribute("active") === 'false' && ancestors[j].getAttribute("active") === 'true' && ancestors[j + 1].getAttribute("active") === 'true') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else if (ancestors[j - 1].getAttribute("active") === 'true' && ancestors[j].getAttribute("active") === 'false' && ancestors[j + 1].getAttribute("active") === 'false') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else if (ancestors[j - 1].getAttribute("active") === 'true' && ancestors[j].getAttribute("active") === 'false' && ancestors[j + 1].getAttribute("active") === 'true') {
                children[j].setAttribute("active", true);
                children[j].style.backgroundColor = "#ff0000";
            } else {
                children[j].setAttribute("active", false);
            }
        }
        row.appendChild(children[j]);
    }
    ancestors = children.slice(0);
    children =[];
}


