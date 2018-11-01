function clock_face_intervals(angle_of_rotation, num_iterations, line_length, line_width, colour) {
    context.translate(x,y);
    for(i= 1; i <= num_iterations; i++){
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


function clock_face(x,y,radius,start_angle,end_angle,counter_clockwise, context) {
    context.beginPath();
    context.arc(x, y, radius, start_angle, end_angle, counter_clockwise);
    context.lineWidth = 10;
    context.strokeStyle = 'black';
    context.stroke();  
    clock_face_intervals(Math.PI / 60, 120, 6, 1, 'red', context); //half second
    clock_face_intervals(Math.PI / 30, 60, 10, 3, 'black', context); //second
    clock_face_intervals(Math.PI / 6, 12, 20, 5, 'black', context); //minute
}

export {clock_face};