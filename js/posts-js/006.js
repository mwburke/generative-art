var circles = [];

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz006');

    var circle_radius = 50;
    var arm_length = 120;

    for (var i = 0; i < 8; i++) {
        circles.push(new looping_circle(circle_radius, arm_length, i * 60));
    }
}

function draw() {
    background(247,247,247, 200);

    for (var i = 0; i < circles.length; i++) {
        circles[i].move();
        circles[i].display();
    }
}

looping_circle = function(radius, arm_length, offset) {

    this.radius = radius;
    this.arm_length = arm_length;
    this.offset = offset;

    this.move = function() {
        this.x = CANVAS_WIDTH / 2 + sin((frameCount - this.offset) / 240 * TWO_PI) * this.arm_length;
        this.y = CANVAS_HEIGHT / 2 + sin((frameCount - this.offset) / 480 * TWO_PI) * this.arm_length;
    }

    this.display = function() {
        if (frameCount >= this.offset) {
            circle_color = generate_color(frameCount, this.offset);
            fill(circle_color);
            noStroke();
            ellipse(this.x, this.y, this.radius, this.radius);
        }

    }
}


function generate_color(frameCount, offset) {
    color_values = color(d3.interpolateViridis(abs(sin((frameCount - offset) / 720 * TWO_PI)))).levels;
    color_values[3] = 255;
    return color(color_values)
}
