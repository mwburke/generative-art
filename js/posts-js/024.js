var center = CANVAS_WIDTH / 2;
var hex_radius = 15;
var x = center;
var y = center;
var color_value;


function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz024');
    background(247, 247, 247);

    color_value = random();
    noStroke();
}

function draw() {

    if (frameCount % 5 == 0) {
        new_values = hex_random_walk(x, y, color_value);
        x = new_values[0];
        y = new_values[1];
        color_value = new_values[2];
    }
}

function hex_random_walk(x, y, color_value) {
    show_color = color(d3.interpolateRainbow(color_value));
    hexagon(x, y, hex_radius, 0, show_color);

    r = random() * 6;
    color_value += (random() * 0.05);

    if (color_value < 0) {
        color_value += 1;
    } else if (color_value > 1) {
        color_value -= 1;
    }

    // top, top right, bottom right, bottom, bottom left, top left
    if (r <= 1) {
        y = y - hex_radius * 2;
    } else if (r <= 2) {
        x += hex_radius * 3**0.5;
        y -= hex_radius;
    } else if (r <= 3) {
        x += hex_radius * 3**0.5;
        y += hex_radius;
    } else if (r <= 4) {
        y += hex_radius * 2;
    } else if (r <= 5) {
        x -= hex_radius * 3**0.5;
        y += hex_radius;
    } else {
        x -= hex_radius * 3**0.5;
        y -= hex_radius;
    }

    return [x, y, color_value]
}
