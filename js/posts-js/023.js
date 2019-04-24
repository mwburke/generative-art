var center = CANVAS_WIDTH / 2;
var base_hex_size = 15;
var num_hex_in_arm = 10;
var arm_length = 200;
var darkgrey = "#333333";

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz023');
    background(247, 247, 247);
}

function draw() {
    background(247, 247, 247);

    draw_hex_ring();

    for (var i = 0; i < 6; i++) {
        draw_hex_arm(i)
    }
}

function draw_hex_arm(arm_number) {
    var hex_radius, arm_radius;

    for (var i = 0; i < num_hex_in_arm + 1; i++) {

        arm_radius = i * arm_length / num_hex_in_arm;
        angle_value = i * PI / 12 + arm_number * PI / 3 + PI;
        actual_angle = -frameCount / 300 * 360 - i * PI / 3;

        color_values = color(d3.interpolateRainbow(arm_number / 6 + 1 / 12)).levels;
        color_values[3] = sin(frameCount * PI / 100 - i * PI / 3 + PI / 3) * 255;
        color_value = color(color_values);

        hexagon(center + sin(-angle_value) * arm_radius,
                center + cos(-angle_value) * arm_radius,
                base_hex_size,
                actual_angle,
                color_value);
    }
}

function draw_hex_ring() {

    for (var i = 0; i < 6; i++) {
        angle_value = -frameCount * PI / 600 + i * PI / 3;
        actual_angle = -frameCount / 300 * 360 - i * PI / 3;
        color_value = -angle_value / 2 / PI + PI * 4 / 3; // -angle_value / 6 + i * PI / 3;

        x = center + arm_length * sin(angle_value);
        y = center + arm_length * cos(angle_value);

        hexagon(x, y, base_hex_size, actual_angle, color(d3.interpolateRainbow(color_value)));

    }
}
