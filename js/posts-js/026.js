var center = CANVAS_WIDTH / 2;
var num_triangles = 10;
var min_triangle_height = 5;
var triangle_height_diff = 40;
var time_to_reset = 4;
var max_circle_radius = min_triangle_height + (num_triangles - 1) * triangle_height_diff * 2;
var triangles = [];
var circles = [];

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz026');
    background(247, 247, 247);

    triangles = []
    for (var i = 0; i < num_triangles; i++) {
        height = min_triangle_height + i * triangle_height_diff;
        t = new Triangle(center, center + height / 3, height);
        triangles.push(t);
    }


}

function draw() {
    blendMode(BLEND);
    background(247, 247, 247);

    blendMode(DIFFERENCE);
    noFill();
    strokeWeight(8);
    stroke(240, 240, 240);

    for (var i = 0; i < triangles.length; i++) {
        triangles[i].draw();
    }

    if ((((frameCount - 1) % 20) == 0) && frameCount < 222) {
        c = new expanding_circle(center, center, frameCount, max_circle_radius);
        circles.push(c);
    }

    for (var i = 0; i < circles.length; i++) {
        circles[i].draw();
    }

    blendMode(BLEND);
    noStroke();
    fill(247, 247, 247);
    rect(0, 375, CANVAS_HEIGHT, 300);
    quad(0, 0, CANVAS_WIDTH / 2, 0, 32, 375, 0, 375);
    quad(CANVAS_WIDTH / 2, 0, CANVAS_WIDTH, 0, CANVAS_WIDTH, 375, CANVAS_WIDTH - 32, 375);

}


