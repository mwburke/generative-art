function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz005');
    background(247,247,247);
}

function draw() {
    background(247,247,247);
    hex_radius = 82.5;
    moving_hex_ring(0, 0.5, hex_radius, 10, 10, 0, 0, generate_color);
}

function generate_color(x, y, radius, rot) {
    color_values = color(d3.interpolateSpectral(sin(y / (CANVAS_HEIGHT / 2)))).levels;
    color_values[3] = 255;
    return color(color_values)
}
