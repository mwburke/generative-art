var num_hexes = 4;
var base_radius = 20;
var radius_multiplier = 80;
var rgb_colors;
var speeds;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz016');
}

function draw() {
    blendMode(BLEND);
    background(247, 247, 247);

    noStroke();

    var rgb_colors = [
        constant_color(255, 0, 0, 255),
        constant_color(0, 255, 0, 255),
        constant_color(0, 0, 255, 255)
    ];
    var speeds = [12, 8, -8];

    blendMode(DIFFERENCE);

    for (var i=0; i < rgb_colors.length; i++) {
        for (var j=0; j < num_hexes; j++) {
            moving_hex_ring(
                radius_speed=0,
                initial_radius=(radius_multiplier+radius_multiplier*j) / CANVAS_WIDTH,
                hex_radius=base_radius + base_radius * j * 0.5,
                rotation_speed=speeds[i],
                hex_rotation_speed=speeds[i],
                initial_rotation=0,
                hex_initial_rotation=0,
                color_generator=rgb_colors[i],
                color_func=false
            );
        }
    }
}
