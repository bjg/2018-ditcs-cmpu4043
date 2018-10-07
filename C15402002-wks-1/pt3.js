(function(window, document, math){
    // setup 
    var size      = 3; //cell pixel size
    //window size
    var width     = window.innerWidth;
    var height    = window.innerHeight;
    //active, green/ inactive, yellow colours
    var colors    = ["white", "black"];
    
    // set first line
    
        var line = new Array(width);
    
    //var randomline = line[math.floor(math.random()/101)] = 1;
    
    // create canvas
    var canvas    = document.createElement('canvas');
    canvas.width  = width * size;
    canvas.height = height * size;
    var context   = canvas.getContext("2d");
    document.body.appendChild(canvas);

    // set next row
    var row = function(line){
        var row = new Array(width);
        //set initial random
        var randomnext = line[math.floor(math.random()*line.length)] = 1;
        //set rule 60
        for(var x = 0; x < width; x++){
            var top   = line[x ];
            var right = line[ x ];
            var left  = line[x - 1];

            row[x] = (!top && !right) ? left : !left;
        }
        return row;
    }

    // draw cell
    var draw_cell = function(line, y){
        for(var x = 0; x < width; x++){
            context.fillStyle = line[x] ? colors[0] : colors[1];
            context.fillRect(x * size , y*size , size, size);
        }
    }


    // draw next cell
    var frame = function(y){
        line = row(line);
        draw_cell(line, y);
        if(y < height - 1)
            window.requestAnimationFrame(function() { frame( y + 1) });
    }

    window.requestAnimationFrame(function(){ frame(0) });
})(window, document, Math);