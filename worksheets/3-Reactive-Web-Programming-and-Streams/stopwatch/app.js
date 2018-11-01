let canvas = document.querySelector('canvas');
let header = document.querySelector('#heading');
header.style.height = "36px";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (parseFloat(header.style.height)+50); 
let context = canvas.getContext('2d');
var x = canvas.width /2;
var y = canvas.height / 2;
var radius = 200;
var start_angle = 0;
var end_angle = 2 * Math.PI;
var counterClockwise = false;


function clock_face_intervals(angle_of_rotation, num_iterations, line_length, line_width, colour) {
    context.translate(x,y);
    for(i= 1; i < num_iterations; i++){
        let angle = i * angle_of_rotation;
        let x1 = Math.cos(angle);
        let y1 = Math.sin(angle);
        context.rotate(angle);
        context.translate(0, -radius*0.85);
        context.beginPath();
        context.moveTo(x1,y1-line_length);
        context.lineTo(x1,y1+line_length/2);
        context.lineWidth = line_width;
        context.strokeStyle = colour;
        context.stroke();
        context.translate(0, radius*0.85);
        context.rotate(-angle);
    }
    context.translate(-x,-y);

}


function clockFace() {
    context.beginPath();
    context.arc(x, y, radius, start_angle, end_angle, counterClockwise);
    context.lineWidth = 10;
    context.strokeStyle = 'black';
    context.stroke();  
    clock_face_intervals(Math.PI / 60, 120, 6, 1, 'red'); //half second
    clock_face_intervals(Math.PI / 30, 60, 10, 3, 'black'); //second
    clock_face_intervals(Math.PI / 6, 24, 20, 5, 'black'); //minute
}

clockFace();