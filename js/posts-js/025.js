var t;
var hex_radius = 15;
var darkgrey = "#333333";

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz025');
    background(247, 247, 247);
    noStroke();
    t = 0;
}

function draw() {
    background(247, 247, 247);
    for (var x = 0; x < width; x+=hex_radius) {
        for (var y = 0; y < height; y+=hex_radius) {
            var c = noise(0.01 * x + t, 0.01 * y + t) * 1.3;
            color_value = color(d3.interpolateRainbow(c));
            hex_x = x
            if ((y % 2) == 0) {
                hex_x = x + (hex_radius / 2);
            }
            hexagon_outline(hex_x, y, c * hex_radius, rot=0, color_value, 200, c * 2)
        }
    }
    t += 0.01;
}
