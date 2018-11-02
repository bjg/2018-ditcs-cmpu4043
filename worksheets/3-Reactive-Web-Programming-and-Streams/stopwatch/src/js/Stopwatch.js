export class Stopwatch {

    constructor(context, canvas_width, canvas_height, ax, ay, dx, dy, sx, sy, radius) {
        this.context = context;
        this.analogue_x = ax;
        this.analogue_y = ay; 
        this.digital_x = dx;
        this.digital_y = dy;
        this.splits_x = sx;
        this.splits_y = sy;
        this.radius = radius;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.start_angle = 0;
        this.end_angle = Math.PI *2;
        this.counter_clockwise = false;
        this.tenth_seconds = 0;
        this.running = false;
        this.splits = [];
    }

    tick(){ return this.tenth_seconds+=1; }
    get_tenths(){ return this.tenth_seconds % 10; }
    get_seconds(){ return Math.floor((this.tenth_seconds / 10) % 60); }
    get_mins(){ return Math.floor((this.tenth_seconds / 600) % 61); }
    display_tenths(){ return "0"+this.get_tenths().toString(); }
    display_seconds(){ return this.get_seconds() < 10? "0"+this.get_seconds().toString() : this.get_seconds().toString(); }
    display_mins(){ return this.get_mins() < 10? "0"+this.get_mins().toString() : this.get_mins().toString(); }
    display_time(){ return this.display_mins()+":"+this.display_seconds()+":"+this.display_tenths(); }

    analogue_display_hand(x1, y1, angle, length, width, colour) {
        this.context.translate(x1, y1);
        let x2 = Math.cos(angle);
        let y2 = Math.sin(angle); 
        this.context.rotate(angle);
        this.context.beginPath();
        this.context.moveTo(0,0);
        this.context.lineTo(x2, y2-length);
        this.context.line_width = width;
        this.context.strokeStyle = colour;
        this.context.stroke();
        this.context.rotate(-angle);
        this.context.translate(-x1,-y1);
    }
    
    //starting at top center of watch face perimeter, roataes about an angle for a given number of iterations, increasing the size of the angle by a factor of iteration index, for every iteration, drawing the interval lines at their appropriate positions and angles relative to the center of the watch face
    analogue_display_intervals(angle_of_rotation, num_iterations, line_length, line_width, colour, center_x, center_y) {
        this.context.translate(center_x, center_y);
        for(let i= 1; i <= num_iterations; i++){
            let angle = i * angle_of_rotation;
            let x1 = Math.cos(angle);
            let y1 = Math.sin(angle);
            this.context.rotate(angle);
            this.context.translate(0, -this.radius*0.85);
            this.context.beginPath();
            this.context.moveTo(x1,y1-line_length);
            this.context.lineTo(x1,y1+line_length/2);
            this.context.lineWidth = line_width;
            this.context.strokeStyle = colour;
            this.context.stroke();
            this.context.translate(0, this.radius*0.85);
            this.context.rotate(-angle);
        }
        this.context.translate(-center_x,-center_y);
    }//end analogue_display_intervals()
    

    //draws a circular perimeter for a given radius and draws interval markers for minutes, seconds and half seconds
    analogue_display() {
        this.context.beginPath();
        this.context.arc(this.analogue_x, this.analogue_y, this.radius, this.start_angle, this.end_angle, this.counter_clockwise);
        this.context.lineWidth = 10;
        this.context.strokeStyle = '#FF9F00';
        this.context.stroke(); 
        this.analogue_display_intervals(Math.PI / 60, 120, 6, 1, 'red', this.analogue_x, this.analogue_y); //half second
        this.analogue_display_intervals(Math.PI / 30, 60, 10, 3, '#E0A800', this.analogue_x, this.analogue_y); //second
        this.analogue_display_intervals(Math.PI / 6, 12, 20, 5, '#AC6B00', this.analogue_x, this.analogue_y); //minute
        let tenth_angle = (Math.PI / 60)*this.tenth_seconds%121;
        let sec_angle = (Math.PI / 30)*this.get_seconds();
        let min_angle = (Math.PI / 30)*this.get_mins();
        this.analogue_display_hand(this.analogue_x, this.analogue_y, tenth_angle, this.radius, 1, '#985B00');
        this.analogue_display_hand(this.analogue_x, this.analogue_y, sec_angle, this.radius, 2, '#DAB500');
        this.analogue_display_hand(this.analogue_x, this.analogue_y, min_angle, this.radius*0.9, 3, '#AC6B00'); 
        this.context.arc(this.analogue_x, this.analogue_y, 10, this.start_angle, this.end_angle);
        this.context.fillStyle = '#B87900';
        this.context.fill();
    }
    
    digital_display() {
        let watch_val = this.display_time();
        this.context.font = '80px Arial';
        this.context.strokeStyle = '#800E0E';
        this.context.strokeText(watch_val, this.digital_x, this.digital_y, 1000, 1000);
    }

    display_splits() {
        console.log(this.splits);
        if(this.splits.length > 0) {
            for(let i=0; i<this.splits.length; i++) {
                this.context.font = '80px Arial';
                this.context.strokeStyle = '#800E0E';
                this.context.strokeText(i+1, this.splits_x, this.splits_y+(i*100), 1000, 1000);
                this.context.strokeText(this.splits[i], this.splits_x+100, this.splits_y+(i*100), 1000, 1000);
            }
        }
    }

    add_split() {
        if(this.running) {
            if(this.splits.length < 5) {
                this.splits.push(this.display_time());
            }
            else {
                this.splits = this.splits.splice(1, 5);
                this.splits.push(this.display_time());
            }
        }
    }
    
    draw_frame() {
        this.context.clearRect(0, 0, this.canvas_width, this.canvas_height);
        this.analogue_display();
        this.digital_display();
        this.display_splits();
    }

    animate_watch(){ if(this.running){ this.tick(); this.draw_frame();} }
    start_watch(){ this.running = true; }
    stop_watch(){ this.running = false; }
    reset_watch(){ this.tenth_seconds = 0; this.splits=[]; this.draw_frame(); }

}//end class
