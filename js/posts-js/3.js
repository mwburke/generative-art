function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz3');
    background(247,247,247);

    noLoop();
}

function draw() {
    background(247,247,247);
    hex_radius = 75;
    radius = 35;
    layers = 4;
    for (k = 0; k < layers; k++) {
        for (i = 0; i < 6; i++) {
            rot = i * 60;
            rot_angle = TWO_PI * (360 - rot) / 360
            sx = CANVAS_WIDTH / 2 + cos(rot_angle) * (radius + radius * k);
            sy = CANVAS_WIDTH / 2 + sin(rot_angle) * (radius + radius * k);
            hexagon(sx, sy, hex_radius, 0, generate_color(i))
        }
    }
}

palette = ["#FF6AD5","#C774E8","#AD8CFF","#8795E8","#94D0FF","#f9247e"]

generate_color = function(i) {
    color_values = color(palette[i]).levels;
    color_values[3] = 100;
    return color(color_values)
}
