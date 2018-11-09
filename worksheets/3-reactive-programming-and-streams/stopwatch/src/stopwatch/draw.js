import './style.css'

let canvas, ctx, radius;

function InitDraw() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    radius = canvas.height / 2;
    ctx.translate(radius * 2, radius);
    radius = radius * 0.9;
    ctx.translate(-canvas.width/2, -canvas.height/2);
    draw({value: 0, splitNo: 1});
}

function draw(obj) {
    const deciseconds = obj.value;
    const seconds = Math.floor(deciseconds / 10) % 60;
    const minutes = Math.floor((deciseconds / 10) / 60);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let time = minutes + ':' + seconds + ':' + deciseconds % 10;
    drawDigital(time);
    if (obj.reset){
        document.getElementById('splits').innerHTML = '';
    }
    drawSplit(time, obj.splitNo);
    drawFace();
    drawHours();
    drawHand(seconds, radius * 0.7);
    drawHand(minutes, radius * 0.75);
    drawHand(deciseconds, radius * 0.65)
}

function drawDigital(time) {
    ctx.textAlign = 'center';
    ctx.fillText(time,canvas.width/2,canvas.height/1.5);
}

function drawSplit(time, splitNo) {
    const parent = document.getElementById('splits');
    const splits = document.getElementsByClassName('split');


    if (splits.length <= 0){
        createNewSplit(parent, time, splitNo);
    } else {
        const latest = document.getElementsByClassName('split')[splits.length-1];
        const currentSplit = latest.getElementsByClassName('splitNo')[0].innerHTML;
        if(currentSplit < splitNo){
            createNewSplit(parent, time, splitNo);
        } else if (splitNo < 1){

        } else {
            latest.getElementsByClassName('time')[0].innerHTML = time;
        }
    }
}

function createNewSplit(parent, time, splitNo) {
    const latest = document.createElement('div');
    latest.classList.add('split');

    const splitDiv = document.createElement('div');
    splitDiv.classList.add('splitNo');
    splitDiv.style.display = 'inline-block';
    splitDiv.style.marginRight = '0.5vw';
    splitDiv.innerHTML = splitNo;
    latest.appendChild(splitDiv);

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time');
    timeDiv.style.display = 'inline-block';
    timeDiv.innerHTML = time;
    latest.appendChild(timeDiv);

    parent.appendChild(latest)
}

function drawFace() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 1, 0, Math.PI * 2);
    ctx.stroke();
}

function drawHours() {
    let length = radius * 0.9;
    for (let i = 0; i < 12; i++) {
        const angle = i * (Math.PI * 2) / 12;
        ctx.beginPath();

        const x1 = (canvas.width / 2) + Math.cos(angle) * length;
        const y1 = (canvas.height / 2) + Math.sin(angle) * length;
        const x2 = (canvas.width / 2) + Math.cos(angle) * (length - (length / 10));
        const y2 = (canvas.height / 2) + Math.sin(angle) * (length - (length / 10));

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

function drawHand(time, length) {
    let angle = ((Math.PI * 2) * (time / (60))) - ((Math.PI * 2) / 4);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo((canvas.width / 2 + Math.cos(angle) * length), canvas.height / 2 + Math.sin(angle) * length);
    ctx.stroke();
}


export {InitDraw, draw}