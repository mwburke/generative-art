var HEX_RADIUS, OPACITY, CENTER;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz009');
    background(0, 0, 0, 0);

    var HEX_RADIUS;
    var OPACITY;

    var CENTER;

    noLoop();
}

function draw() {
    HEX_RADIUS = 50;
    OPACITY = 100;
    CENTER = CANVAS_WIDTH / 2;

    background(0, 0, 0, 0);
    for (var x = -25; x < CANVAS_WIDTH + 25; x += 25) {
        for (var y = 0; y < CANVAS_WIDTH; y += 25) {
            hexagon(x, y, HEX_RADIUS, 0, generate_color(x, y, OPACITY));
        }
    }
}

function generate_color(x, y, opacity) {
    //value = (x + y) / CANVAS_WIDTH / 2;
    value = (x * 1.05) / CENTER / 2 + (y % CANVAS_HEIGHT / 2) / CENTER / 2;
    color_values = color(d3.interpolateCubehelixDefault(value)).levels;
    color_values[3] = opacity;
    return color(color_values);
}
