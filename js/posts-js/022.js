var center = CANVAS_WIDTH / 2;
var base_hex_size = 15;
var min_hex_size = 5;
var num_hex_in_arm = 50;
var arm_length = 250;
var darkgrey = "#333333";
var angle_decrease_base_rate = 60;
var angle_decrease_rate;
FRAMERATE = 120;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz022');
    background(247, 247, 247);
}

function draw() {
    background(247, 247, 247);

    angle_decrease_rate = angle_decrease_base_rate + sin(frameCount * PI / 600 + PI / 2);

    for (var i = 0; i < 6; i++) {
        draw_hex_arm(i * PI / 3);
    }

    noStroke();
    hexagon(center, center, 15, 0, color(247, 247, 247), 255, 2);
}

function draw_hex_arm(angle) {
    var hex_radius, arm_radius;

    for (var i = 0; i < num_hex_in_arm; i++) {

        hex_radius = base_hex_size - i * (base_hex_size - min_hex_size) / num_hex_in_arm;
        arm_radius = i * arm_length / num_hex_in_arm;
        angle_value = i * PI / 12 * angle_decrease_rate + angle;

        hexagon_outline(center + sin(angle_value) * arm_radius,
                        center + cos(angle_value) * arm_radius,
                        hex_radius,
                        0,
                        color(darkgrey),
                        255,
                        2);
    }
}
