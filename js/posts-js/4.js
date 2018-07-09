var i;
var color_values;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz4');
    background(247,247,247);
    i = 0;
    color_values = color(palette[i]).levels;
}

function draw() {
    if ((frameCount % 10) == 0) {
        background_color = update_color();
    } else {
        background_color = color(color_values);
    }
    background(background_color);
}

palette = color_palettes['cool'];

update_color = function() {
    color_values[0] += random(-5, 5);
    color_values[1] += random(-5, 5);
    color_values[2] += random(-5, 5);
    return color(color_values)
}

function mousePressed() {
    i++;
    color_values = color(palette[i % 5]).levels;
}
