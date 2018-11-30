var pink = '#f59ff9';
var lightblue = '#4AD6E0';
var triangle_radius = 300;
var base_weight = 10;
var weight_increase = 2;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz021');
    background(247, 247, 247);
}


function draw() {
    background(247, 247, 247);

    noStroke();
    fill(color('#7d5ee5'));
    rect(320, 420, 90, 80);


    // wiggler
    noFill();
    stroke(pink);
    strokeWeight(10);
    beginShape();
    for(var i=0; i < 8; i++) {
        curveVertex(380 + i * 15, 480 + 5 * sin(frameCount / 120 * TWO_PI / 2 + TWO_PI / 4 * i));
    }
    endShape();


    fill(pink);
    ellipse(70, 70, 100, 100);
    noStroke();
    fill(lightblue);
    ellipse(90, 90, 70, 70);

    noFill();

    stroke(lightblue);
    strokeWeight(50);
    line(-10, 400, 510, -50);
    strokeWeight(50);
    line(-10, 480, 510, 30);
    strokeWeight(40);
    line(-10, 550, 510, 100);

    for (var i=1; i < 10; i++) {
        strokeWeight(base_weight + i * weight_increase);
        color_levels = color(pink).levels;
        color_levels[3] = 15 + 15 * abs(sin(frameCount / 45));
        stroke(color(color_levels));
        var tri = new Triangle(CANVAS_WIDTH / 2, CANVAS_HEIGHT * 3 / 4, triangle_radius);
        tri.draw()
    }

    stroke(247, 247, 247);
    strokeWeight(base_weight);
    var tri = new Triangle(CANVAS_WIDTH / 2, CANVAS_HEIGHT * 3 / 4, triangle_radius);
    tri.draw()

}
