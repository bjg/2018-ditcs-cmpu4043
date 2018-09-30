window.onload = function() {
    var container = document.getElementById('container');
    document.getElementById("container").style.display = "inline-block";
    document.getElementById("container").style.whiteSpace = "nowrap"; 
    document.getElementById("container").style.overflow = "hidden"; 

    
    for (let row = 0; row < 50; row++) {
        for (let col = 0; col < 101; col++) {
            var para = document.createElement("div");
            var node = document.createTextNode("");
            para.classList.add("cell");
            para.appendChild(node);

            container.appendChild(para);
        }
        linebreak = document.createElement("br");
        container.appendChild(linebreak);
        linebreak.style.display = 'block';
        linebreak.style.marginTop = '-11.5px';
    }
    var br = document.getElementsByName('br');
    
    var all = document.getElementsByClassName('cell');
    
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'inline-flex';
        all[i].style.width = '8px';
        all[i].style.height = '8px';
        if (i%2 == 0) {
            all[i].style.background = 'red';
        }
        else {
            all[i].style.background = 'blue';
        }
    }
}