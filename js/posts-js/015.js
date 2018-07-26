var radius = 100;
var jump_length = 150;
var poly_sides = 6;
var triangles = [];


function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz015');

    triangles.push(new jump_triangle(color(255, 0, 0, 255), 1, 1));
    triangles.push(new jump_triangle(color(0, 255, 0, 255), -1, 1));
    triangles.push(new jump_triangle(color(0, 0, 255, 255), 0, -1));
}

function draw() {
    blendMode(BLEND);
    background(247, 247, 247);
    strokeWeight(5);
    blendMode(DIFFERENCE);
    for (i = 0; i < triangles.length; i++) {
        triangles[i].move();
        triangles[i].display()
    }
}


function jump_triangle(triangle_color, jump_lr, jump_ud) {
    this.triangle_color = triangle_color;
    this.jump_lr = jump_lr;
    this.jump_up = jump_ud;
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    this.rot = 90;

    this.move = function() {
        if (((frameCount % 120) > 60) | (frameCount % 120 == 0)) {
            this.x = CANVAS_WIDTH / 2 + sin(radians((frameCount % 60) / 60 * 180)) * jump_length * jump_lr;
            this.y = CANVAS_WIDTH / 2 + sin(radians((frameCount % 60) / 60 * 180)) * jump_length * jump_ud;
            this.rot += 1;
        }
    }

    this.display = function() {
        stroke(triangle_color);
        fill(0, 0, 0, 0);
        polygon(this.x, this.y, radius, poly_sides, this.rot);
    }
}
