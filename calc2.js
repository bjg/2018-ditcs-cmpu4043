
let exp = '';


function insert(num) {
  console.log(num);
  let text = document.getElementById('text');
  
  text.value += num;
  exp += num;
  console.log(exp);
}

function equal() {
  let screen = document.getElementById('text');
  let x = eval(exp);
  text.value = x;
  exp = 0;
  console.log("VALLED");
  console.log(x);
  
}

function clr() {
  text.value = 0;
  exp = 0;
}


