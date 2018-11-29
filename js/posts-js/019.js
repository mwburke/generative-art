

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz019');
    background(247, 247, 247);

}

function draw() {
    background(247, 247, 247);
    noFill();
    var triangle_radius = 8;
    var num_triangles = 25;
    var stroke_weight = 3;
    var red = 5;
    var blue = 250;
    var color_change_amount = 10;
    var increase_ratio = 1.1;
    var increase_amount = 10;
    var shift_amount = 8;
    var delay_amount = 5;
    var shift = 0;
    var delay = 0;

    for (var i = num_triangles; i > 0; i--) {
        if (i > 0) {
            triangle_radius *= increase_ratio;
            red += color_change_amount;
            blue -= color_change_amount;
            shift = shift_amount * i;
            delay = delay_amount * i;
        }
        strokeWeight(stroke_weight);
        stroke(color(red, 0, blue));
        draw_triangle(triangle_radius, shift, delay);
    }
}


function draw_triangle(radius, shift, delay) {
    x = CANVAS_WIDTH * 2 / 3 - shift;
    y = CANVAS_HEIGHT / 2 + sin((frameCount - delay) / 45) * 50;

    polygon(x, y, radius, 3, rot=-30 + frameCount / 2);
}
