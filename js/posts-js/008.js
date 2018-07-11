function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz008');
    background(247,247,247);
    hex_radius_1 = 50;
    hex_radius_2 = 45;
    arm_length_2 = 60;
    hex_radius_3 = 80;
    arm_length_3 = 150;
    arm_length_4 = 260;
    hex_radius_5 = 60;
    arm_length_5 = 175;

    LIGHT_BLUE = '#94D0FF';

    CENTER = CANVAS_WIDTH / 2;


    noLoop();
}

function draw() {
    background(247,247,247);

    hexagon_outline(CENTER, CENTER, hex_radius_1, 0, color('black'), 200, 3);
    hexagon_outline(CENTER, CENTER, hex_radius_1, 30, color('black'), 200, 3);

    var angle = TWO_PI / 6;
    //var rot_angle = TWO_PI * (360 - rot) / 360

    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = CENTER + cos(a) * arm_length_2;
        var sy = CENTER + sin(a) * arm_length_2;
        hexagon_outline(sx, sy, hex_radius_2, 0, color(LIGHT_BLUE), 200, 3);
    }

    for (var a = angle / 2; a < TWO_PI + angle; a += angle) {
        var sx = CENTER + cos(a) * arm_length_3;
        var sy = CENTER + sin(a) * arm_length_3;
        hexagon_outline(sx, sy, hex_radius_3, 0, generate_color(sy), 200, 3);
    }

    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = CENTER + cos(a) * arm_length_4;
        var sy = CENTER + sin(a) * arm_length_4;
        hexagon_outline(sx, sy, hex_radius_3, 0, generate_color(sy), 200, 3);
    }

    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = CENTER + cos(a) * arm_length_5;
        var sy = CENTER + sin(a) * arm_length_5;
        hexagon_outline(sx, sy, hex_radius_5, 0, generate_color(sy), 200, 3);
    }


}

function generate_color(y) {
    return color(d3.interpolateSpectral(y / CANVAS_HEIGHT));
}
