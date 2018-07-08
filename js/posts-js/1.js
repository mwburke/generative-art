function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz1');
    background(255);

    frameRate(FRAMERATE);
}

function draw() {
    background(255);
    // hexagon(width/2, height/2, 40, 30, 250, 0, 0);
    // hexagon(width/2, height/2, 20, 0, 0, 0, 250);
    // hex_ring(100, 0, 30, 0, 0, 250, 0);
    // hex_ring(160, 30, 50, 30, 94, 220, 255);
    moving_hex_ring(3, 0.4, 50, 4, 6, 0, 0, generate_red);
    moving_hex_ring(3, 0  , 50, 4, 6, 0, 0, generate_blue);
    moving_hex_ring(3, 0.8, 50, 4, 6, 0, 0, generate_green);
}


function generate_red() {
	return constant_color(255, 0, 0, 200)
}

function generate_blue() {
	return constant_color(30, 94, 220, 200)
}

function generate_green() {
	return constant_color(0, 250, 0, 200)
}