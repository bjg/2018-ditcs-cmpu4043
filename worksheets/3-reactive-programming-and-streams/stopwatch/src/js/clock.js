/**
 *
 * @param ctx - canvas context
 * @param r - radius of clock
 * @param options - takes in options for circle. such as which fill and border color
 */
const drawCircle = (ctx, r, options) => {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0 , 2*Math.PI);
    ctx.lineWidth = 2

    if (options.fill){
        ctx.fillStyle = options.fill;
        ctx.fill();
    }

    if (options.border) {
        ctx.strokeStyle = options.border;
        ctx.stroke();
    }
}

/**
 * Draw lines around circle
 * Every 4 line we draw a big line
 */
const drawLinesAroundClock = (ctx, radius) => {
    let smallHands = 4

    for (var i = 0; i < 60; i++) {
        let width;
        let length;
        if (smallHands === 4){
            width = 2;
            length = 20
            smallHands = 0
        }else {
            width = 1;
            length = 3;
            smallHands++
        }
        const startX = ( radius * Math.cos(2 * Math.PI * i / 60));
        const startY = (radius * Math.sin(2 * Math.PI * i / 60));
        const endX = ((radius - length) * Math.cos(2 * Math.PI * i / 60));
        const endY = ((radius - length) * Math.sin(2 * Math.PI * i / 60));
        drawLine(ctx, startX, startY, endX, endY, width)
    }
}

/**
 * Taking the time for seconds and minutes we will position the clock hands
 * @param ctx - canvas context
 * @param radius - radius of clock
 * @param seconds - second duration
 * @param minutes - minutes duration
 */
const positionClockHands = (ctx, radius, seconds, minutes) => {
    const secs=(seconds*Math.PI/30);
    drawClockHand(ctx, secs, radius*0.7, 1);

    const mins=(minutes*Math.PI/30)+(seconds*Math.PI/(30*60));
    drawClockHand(ctx, mins, radius*0.8, 2);
}


/**
 * 
 * @param ctx - canvas context
 * @param startX - starting X cord for line
 * @param startY - starting Y cord for line
 * @param endX - ending Y cord for line
 * @param endY - ending Y cord for line
 * @param width - width of the line
 */
const drawLine = (ctx, startX, startY, endX, endY, width) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

/**
 * 
 * @param ctx - canvas context
 * @param pos - position of hand in degrees
 * @param length - length of the line
 * @param width - width of the line
 */
const drawClockHand = (ctx, pos, length, width) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

/**
 * Draw the clock, with hands positioned according to the times
 * @param ctx - canvas context 
 * @param radius - radius of clock
 * @param seconds - second duration
 * @param minutes - minutes duration
 */
export const drawClock = (ctx, radius, seconds, minutes) => {
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawCircle(ctx, radius*0.98, {border: '#a4a6ab', fill: 'white'});
    drawCircle(ctx, radius*0.95, {border: '#a6adbc', fill: 'white'});
    drawCircle(ctx, 5, {fill: 'white'});
    drawLinesAroundClock(ctx, radius*0.85);
    positionClockHands(ctx, radius, seconds, minutes);
}