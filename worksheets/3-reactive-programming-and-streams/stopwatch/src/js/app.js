import '../css/main.css';

// Function to draw the stopwatch
const drawStopwatch = () => {
    var canvas = document.getElementById('canvas');

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        const radius = 200;
        const centerx = canvas.width/3;
        const centery = 250;

        ctx.beginPath();

        // Outer circle
        ctx.arc(centerx, centery, radius, 0, Math.PI * 2, true);
        ctx.arc(centerx, centery, radius+5, 0, Math.PI * 2, true);

        ctx.stroke();

        /* Iterate and draw the hands for every 5 minutes by using sine and cosine to
        get the points on the circumfrence of the circle. 360 degrees in a circle so 360 iterations */
        for(var i=0; i<360; i++) {

            // Get the new x and y values using sine and cosine. (radius-4) so the notches aren't touching the circle.
            var newx_outer = centerx + (radius-4) * Math.cos(toRadians(i));
            var newy_outer = centery + (radius-4) * Math.sin(toRadians(i));

            /* Get values for the inner circle (i.e for points on an invisible smaller radius circle)
             so that the hands dont span to the origin */
            var newx_inner = centerx + (radius - 20) * Math.cos(toRadians(i));
            var newy_inner = centery + (radius - 20) * Math.sin(toRadians(i));

            // If the given degree mod 30 is 0, i.e 5 minutes every 30 degrees.
            if(i%30 == 0) {
                ctx.beginPath();

                // Draw the line
                ctx.lineTo(newx_inner, newy_inner);
                ctx.lineTo(newx_outer, newy_outer);

                ctx.lineWidth = 5;
                ctx.stroke();

            }
            
            /* The above condition can execute without effecting the next. If the degrees mod 6 is 0
               we can assume we are looking at a second hand as there is 6 degrees between each second hand. 
            */
            if(i%6 == 0) {
                ctx.beginPath();

                // Draw the line
                ctx.lineTo(newx_inner, newy_inner);
                ctx.lineTo(newx_outer, newy_outer);

                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

    }
}

// Constant radians function for finding points on a circle
const toRadians = (angle) => {
    return angle * (Math.PI/180);
}

drawStopwatch();