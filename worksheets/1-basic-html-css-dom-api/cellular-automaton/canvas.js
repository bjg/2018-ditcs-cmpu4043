var canvas = document.querySelector("canvas");

//Make the canvas fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

//width for 101 rects
 
//from top left of screen
var start_x = 0;
var start_y = 0;
var rect_width = canvas.width / 101;


console.log(canvas.width);

function drawRow(x,y,w,h){
    //Draw Row
    for(i = 0; i < canvas.width;i++){
        context.rect(x,y, w,h);
        context.stroke();
        //The new starting x is current pos + rect_width
        x += h;
    }

}

drawRow(start_x,start_y,rect_width,rect_width);
