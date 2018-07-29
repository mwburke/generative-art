var radius = 50;
var height_ratio = 0.75

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz016');
}

function draw() {
    noStroke();
    blendMode(BLEND);
    background(247, 247, 247);

    blendMode(DIFFERENCE);

    y1 = CANVAS_HEIGHT - sin(radians(frameCount % 120 / 240 * 360)) * CANVAS_WIDTH * height_ratio - radius;
    y2 = CANVAS_HEIGHT - sin(radians(2 + frameCount % 120 / 240 * 360)) * CANVAS_WIDTH * height_ratio - radius;
    y3 = CANVAS_HEIGHT - sin(radians(4 + frameCount % 120 / 240 * 360)) * CANVAS_WIDTH * height_ratio - radius;

    fill(color(255, 0, 0, 255));
    ellipse(CANVAS_WIDTH / 2, y1, radius, radius);

    fill(color(0, 255, 0 255));
    ellipse(CANVAS_WIDTH / 2, y2, radius, radius);

    fill(color(0, 0, 255 255));
    ellipse(CANVAS_WIDTH / 2, y3, radius, radius);
}
