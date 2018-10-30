import '../css/main.css';
import { Observable, interval, switchMap } from 'rxjs';

// Stopwatch Started to prevent the stopwatch from starting and then stopping it again
let stopwatchStarted = false;

// Milliseconds counter used to only count time when the interval has started
let milliseconds = 0;

// Constant radians function for finding points on a circle
const toRadians = (angle) => {
    return angle * (Math.PI/180);
}

var timer = interval(100);

var start = document.getElementById('start');
var stop = document.getElementById('stop');
var split = document.getElementById('split');
var reset = document.getElementById('reset');

var input = Observable.create(o => {

    start.addEventListener('click', () => {
        stopwatchStarted = true;
    });

    stop.addEventListener('click', () => {
        o.next('stop');
    });

    split.addEventListener('click', () => {
        o.next('split');
    });

    reset.addEventListener('click', () => {
        o.next('reset');
    });
});

input.subscribe(value => console.log(value));


/* Subscribe for split
timer.subscribe(seconds => {
    input.subscribe(value => {
        if(value == 'split') {
            console.log('Split');
        }
    });
});
*/

// Subscribe for displaying everything
timer.subscribe(seconds => {
    
    // Draw the actual stopwatch
    var canvas = document.getElementById('canvas');

    const radius = 200;
    const centerx = canvas.width/2;
    const centery = 250;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 1;

        // Outer circle
        ctx.beginPath();
        ctx.arc(centerx, centery, radius, 0, Math.PI * 2, true);

        ctx.strokeStyle = '#000000';
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(centerx, centery, radius + 5, 0, Math.PI * 2, true);

        ctx.strokeStyle = '#000000';
        ctx.stroke();
        
        // The middle black circle
        ctx.beginPath();
        ctx.arc(centerx, centery, 5, 0, Math.PI * 2, true);
        ctx.fillStyle = '#000000';
        ctx.fill();

        /* Iterate and draw the hands for every 5 minutes by using sine and cosine to
        get the points on the circumfrence of the circle. 360 degrees in a circle so 360 iterations */
        for (var i = 0; i < 360; i++) {
            // Define a line height for each notch
            var lineHeight = 30;

            // If it's a second hand then make it smaller
            if (i % 6 == 0 && i % 30 != 0) {
                lineHeight = 15;
            }

            // Get the new x and y values using sine and cosine. (radius-4) so the notches aren't touching the circle.
            var newx_outer = centerx + (radius - 4) * Math.cos(toRadians(i));
            var newy_outer = centery + (radius - 4) * Math.sin(toRadians(i));

            /* Get values for the inner circle (i.e for points on an invisible smaller radius circle)
             so that the hands dont span to the origin */
            var newx_inner = centerx + (radius - lineHeight) * Math.cos(toRadians(i));
            var newy_inner = centery + (radius - lineHeight) * Math.sin(toRadians(i));

            // If the given degree mod 30 is 0, i.e 5 minutes every 30 degrees.
            if (i % 30 == 0) {
                ctx.beginPath();

                // Draw the line
                ctx.lineTo(newx_inner, newy_inner);
                ctx.lineTo(newx_outer, newy_outer);

                ctx.lineWidth = 3;
                ctx.stroke();
            }

            /* The above condition can execute without effecting the next. If the degrees mod 6 is 0
               we can assume we are looking at a second hand as there is 6 degrees between each second hand. 
            */
            if (i % 6 == 0) {
                ctx.beginPath();

                // Draw the line
                ctx.lineTo(newx_inner, newy_inner);
                ctx.lineTo(newx_outer, newy_outer);

                ctx.lineWidth = 1;
                ctx.stroke();
            }            
        }

        // If the stopwatch has not been started then set the value of everything to 0 and give the second and minute hand pointed at 12
        if(stopwatchStarted == false) {
            document.getElementById('time').innerHTML = "0:0:0";
            
            // Draw the seconds line
            ctx.beginPath();
            ctx.lineTo(centerx, centery);
            ctx.lineTo(centerx, (radius-40));

            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw the minute line
            ctx.beginPath();
            ctx.lineTo(centerx, centery);
            ctx.lineTo(centerx, (radius-80));

            ctx.lineWidth = 5;
            ctx.stroke();
        } else {
            milliseconds++;
            ctx.beginPath();

            // Draw the second hand
            var secx_location = centerx + (radius - 40) * Math.cos(toRadians(((milliseconds * 6) / 10) - 90));
            var secy_location = centery + (radius - 40) * Math.sin(toRadians(((milliseconds * 6) / 10) - 90));

            ctx.beginPath();

            // Draw the line
            ctx.lineTo(centerx, centery);
            ctx.lineTo(secx_location, secy_location);

            ctx.lineWidth = 1;
            ctx.stroke();

            // Set the minute hand locations to seconds % 60 (would be 1 if 90 seconds had elapsed)
            var minx_location = centerx + (radius - 80) * Math.cos(toRadians(((milliseconds * 0.1) / 10) - 90));
            var miny_location = centery + (radius - 80) * Math.sin(toRadians(((milliseconds * 0.1) / 10) - 90));

            ctx.beginPath();

            // Draw the line
            ctx.lineTo(centerx, centery);
            ctx.lineTo(minx_location, miny_location);

            ctx.lineWidth = 5;
            ctx.stroke();

            document.getElementById('time').innerHTML = Math.floor((milliseconds / 10) / 60) + ":" + (Math.floor(milliseconds / 10)) % 60 + ":" + (milliseconds % 100).toString().split('').pop();
        }
    }
});