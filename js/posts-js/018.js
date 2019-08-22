var num_color_points = 3;
var num_squares_side = 100;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz018');

    noStroke();
    generate();
}


function gen_color_points(n) {
    var points = [];
    for (var k=0; k < n; k++) {
        points[k] = [Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT];
    }
    return points
}


function get_closest_distance(base_point, points) {
    distances = []
    for (var i=0; i < points.length; i++) {
        distances[i] = distance(base_point[0], points[i][0], base_point[1], points[i][1])
    }
    return Math.min(...distances)
}


function distance(x1, x2, y1, y2) {
    return ((x1-x2)**2 + (y1-y2)**2)**0.5
}

function generate() {

    var red_points = gen_color_points(num_color_points);
    var green_points = gen_color_points(num_color_points);
    var blue_points = gen_color_points(num_color_points);

    for (var i=0; i < num_squares_side; i++) {
        for (var j=0; j < num_squares_side; j++) {
            x = i * width / num_squares_side;
            y = j * height / num_squares_side;
            r = get_closest_distance([x, y], red_points);
            g = get_closest_distance([x, y], green_points);
            b = get_closest_distance([x, y], blue_points);

            fill(color(r, g, b, 150));
            rect(x, y, CANVAS_WIDTH / num_squares_side, CANVAS_WIDTH / num_squares_side);
        }
    }
}


function keyPressed() {
  if (key == 'R') {
    // num_squares = 20 - Math.floor(Math.random() * 2) * 10
    background(247, 247, 247);
    generate();
  }
}
