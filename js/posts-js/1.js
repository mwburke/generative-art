
function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz1');
    background(247,247,247);

    frameRate(FRAMERATE);
}

function draw() {
    background(247,247,247);
    moving_hex_ring(3, 0.4, 50, 4, 6, 0, 0, generate_red);
    moving_hex_ring(3, 0  , 50, 4, 6, 0, 0, generate_blue);
    moving_hex_ring(3, 0.8, 50, 4, 6, 0, 0, generate_green);
}


function generate_red(frameCount, distance) {
    return color(255, 0, 0, 200)
}

function generate_blue(frameCount, distance) {
    return color(30, 94, 220, 200)
}

function generate_green(frameCount, distance) {
    return color(0, 250, 0, 200)
}