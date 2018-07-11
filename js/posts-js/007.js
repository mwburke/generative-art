function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz007');
    background(247,247,247);
}

function draw() {
    background(247,247,247);
    hex_radius = 25;
    moving_hex_ring(0, 0, hex_radius, 24, 24, 0, 0, generate_color(0));
    moving_hex_ring(0, 0.2, hex_radius, 12, 12, 0, 0, generate_color(0.2));
    moving_hex_ring(0, 0.4, hex_radius, 4, 4, 0, 0, generate_color(0.4));
    moving_hex_ring(0, 0.4, hex_radius, 3, 3, 0, 0, generate_color(0.4));
    moving_hex_ring(0, 0.6, hex_radius, 6, 6, 0, 0, generate_color(0.6));
    moving_hex_ring(0, 0.8, hex_radius, 12, 12, 0, 0, generate_color(0.8));
    moving_hex_ring(0, 1, hex_radius, 10, 10, 30, 0, generate_color(1));
}

function generate_color(radius) {
    return color(d3.interpolateInferno(radius));
}
