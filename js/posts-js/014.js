var degree_jump = 10;
var min_width = 20;
var max_width = 250;

var big_degree_jump = 30;
var big_min_width = 320;
var big_max_width = 350;

var j = 0;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz014');
    noLoop();
}

function draw() {
    translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    generate();
    j++;
}


function generate() {
    strokeWeight(2);
    for (var i = 0; i < 180; i += degree_jump) {

        rotate(radians(degree_jump));
        fill(0, 0, 0, 0);
        stroke(generate_color(i));
        ellipse(0, 0, min_width, max_width);
    }

    for (var i = 0; i < 180; i += big_degree_jump) {
        strokeWeight(1);
        rotate(radians(big_degree_jump));
        fill(0, 0, 0, 0);
        stroke(generate_color(i));
        ellipse(0, 0, big_min_width, big_max_width);
    }
}


function generate_color(degree) {
    ellipse_color = color(d3.interpolateRainbow(degree / 180)).levels;
    ellipse_color[3] = 150;
    return color(ellipse_color);
}

function keyPressed() {
    if (key == ' ') {
        if ((j % 2) == 0) {
            background(247, 247, 247);
        } else {
            background(50, 50, 50);
        }
        generate();
        j++;
    }
}
