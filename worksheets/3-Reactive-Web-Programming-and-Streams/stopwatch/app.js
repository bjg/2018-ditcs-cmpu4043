let canvas = document.querySelector('canvas');
let header = document.querySelector('#heading');
header.style.height = "36px";
console.log(header);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (parseFloat(header.style.height)+50); 

let context = canvas.getContext('2d');
var x = canvas.width /2;
var y = canvas.height / 2;
var radius = 200;
var startAngle = 0;
var endAngle = 2 * Math.PI;
var counterClockwise = false;


function clock_face_intervals(angle_of_rotation, line_length, line_width, colour) {
    context.translate(x,y);
    for(i= 1; i < 120; i++){
        let ang = i * angle_of_rotation;
        let x1 = Math.cos(ang);
        let y1 = Math.sin(ang);
        context.rotate(ang);
        context.translate(0, -radius*0.85);
        context.beginPath();
        context.moveTo(x1,y1-line_length);
        context.lineTo(x1,y1+line_length/2);
        context.lineWidth = line_width;
        context.strokeStyle = colour;
        context.stroke();
        context.translate(0, radius*0.85);
        context.rotate(-ang);
    }
    context.translate(-x,-y);

}


function clockFace() {
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 10;
    // line color
    context.strokeStyle = 'black';
    context.stroke();   
    clock_face_intervals(Math.PI / 60, 6, 1, 'red');   
    clock_face_intervals(Math.PI / 30, 10, 3, 'black');   
    clock_face_intervals(Math.PI / 6, 20, 5, 'black');
}

clockFace();