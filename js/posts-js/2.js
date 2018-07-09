function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz2');
    background(247,247,247);

    noLoop();
}

function draw() {
    background(247,247,247);
    hex_radius = 50;
    for (i = 0; i < 1; i += 0.01) {
        moving_hex_ring(0, i * 1.2, hex_radius, 3, 0, (i * 220) % 360, 0, generate_color, true);
    }
}

function generate_color(frameCount, distance) {
    color_values = color(d3.interpolateSpectral(distance * 1.2)).levels;
    color_values[3] = 25;
    return color(color_values)
}
