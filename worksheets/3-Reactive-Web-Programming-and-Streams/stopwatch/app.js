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


function clockMinutes() {
    var ang;
    var num;
    context.font = radius*0.25 + "px arial";
    context.textBaseline="middle";
    context.textAlign="center";
    context.translate(x,y);
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        let x1 = Math.cos(ang);
        let y1 = Math.sin(ang);
        context.rotate(ang);
        context.translate(0, -radius*0.85);
        context.beginPath();
        context.moveTo(x1,y1-10);
        context.lineTo(x1,y1+10);
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        context.stroke();
        context.translate(0, radius*0.85);
        context.rotate(-ang);
    }
    context.translate(-x,-y);
}


function clockSeconds() {
    var ang;
    var num;
    context.translate(x,y);
    for(num= 1; num < 60; num++){
        ang = num * Math.PI / 30;
        let x1 = Math.cos(ang);
        let y1 = Math.sin(ang);
        context.rotate(ang);
        context.translate(0, -radius*0.85);
        context.beginPath();
        context.moveTo(x1,y1-10);
        context.lineTo(x1,y1);
        context.lineWidth = 3;
        context.strokeStyle = 'black';
        context.stroke();
        context.translate(0, radius*0.85);
        context.rotate(-ang);
    }
    context.translate(-x,-y);

}


function clockMiliSeconds() {
    var ang;
    var num;
    context.translate(x,y);
    for(num= 1; num < 120; num++){
        ang = num * Math.PI / 60;
        let x1 = Math.cos(ang);
        let y1 = Math.sin(ang);
        context.rotate(ang);
        context.translate(0, -radius*0.85);
        context.beginPath();
        context.moveTo(x1,y1-6);
        context.lineTo(x1,y1);
        context.lineWidth = 1;
        context.strokeStyle = 'black';
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
    clockMinutes();
    clockSeconds();
    clockMiliSeconds(); 
}

clockFace();