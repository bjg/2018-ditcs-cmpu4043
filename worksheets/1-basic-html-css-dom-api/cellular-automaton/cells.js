let cell = document.createElement("div");
let node = document.createTextNode("This is new.");
let body = document.getElementById('body');

cell.appendChild(node);
for (let row = 0; row < 50; row++) {
    for (let col = 0; col < 101; col++) {
        body.appendChild(cell);
        console.log(col);
    }
}