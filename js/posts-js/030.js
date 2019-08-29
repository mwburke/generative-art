var num_squares = 5;
var tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];


var white = "#f7f7f7";
var dark_blue = "#022982";
var dark_red = "#681108";
var light_green_blue = "#1daf9a";

var color_palettes = [
    [dark_blue, white, light_green_blue],
    [dark_blue, white, dark_red],
    [dark_red, white, null],
    [dark_blue, white, null],
    ["#C96467", "#E1C68E", "#E77C6E"],
    ["#C96467", "#E1C68E", null],
    ["#34434B", "#D9D8D7", "#0E1423"],
    ["#F7F0C5", "#603E40", "#DBA844"],
    ["#9B0E17", "#D79E5F", null]
];


function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz030');
    background(247, 247, 247);

    noLoop();
}

function draw() {

    var first_tile_index = Math.floor(Math.random()*tiles.length);
    var second_tile_index = Math.floor(Math.random()*tiles.length);

    while(second_tile_index == first_tile_index) {
        second_tile_index = Math.floor(Math.random()*tiles.length);
    }

    var first_tile = tiles[first_tile_index];
    var second_tile = tiles[second_tile_index];

    var palette = color_palettes[Math.floor(Math.random()*color_palettes.length)];

    var background_ = palette[0];
    var primary_ = palette[1];
    var secondary_ = palette[2];

    for (var i = 0; i < num_squares; i++) {
        push();
        translate(CANVAS_HEIGHT / num_squares / 2, CANVAS_HEIGHT / num_squares / 2 + CANVAS_HEIGHT / num_squares * i);
        if ((i % 2) == 1) {
            translate(CANVAS_WIDTH / num_squares, 0);
        }
        for (var j = 0; j < num_squares / 2; j++) {
            noFill();
            noStroke();
            first_tile(CANVAS_WIDTH / num_squares,
                       background_,
                       primary_,
                       secondary_);
            translate(CANVAS_WIDTH / num_squares * 2, 0);
        }
        pop();
    }
    for (var i = 0; i < num_squares; i++) {
        push();
        translate(CANVAS_HEIGHT / num_squares / 2, CANVAS_HEIGHT / num_squares / 2 + CANVAS_HEIGHT / num_squares * i);
        if ((i % 2) == 0) {
            translate(CANVAS_WIDTH / num_squares, 0);
        }
        for (var j = 0; j < num_squares / 2; j++) {
            noFill();
            noStroke();
            second_tile(CANVAS_WIDTH / num_squares,
                       background_,
                       primary_,
                       secondary_);
            translate(CANVAS_WIDTH / num_squares * 2, 0);
        }
        pop();
    }
}


function tile1(side_length, background_color, primary_color, secondary_color = null) {
    rectMode(CENTER);
    ellipseMode(CENTER);

    // strokeWeight(side_length * 0.04);
    // stroke(primary_color)

    fill(primary_color)
    rect(0, 0, side_length, side_length);
    fill(background_color);
    rect(0, 0, side_length * 0.92, side_length * 0.92);

    noFill();
    strokeWeight(side_length * 0.04);
    stroke(primary_color);
    ellipse(0, 0, side_length * 0.85, side_length * 0.85);

    noStroke();
    fill(primary_color);
    ellipse(0, 0, side_length * 0.70, side_length * 0.70);
    fill(background_color);
    ellipse(0, 0, side_length * 0.50, side_length * 0.50)

    noFill();
    strokeWeight(side_length * 0.04);
    stroke(primary_color);
    ellipse(0, 0, side_length * 0.15, side_length * 0.15);


    noStroke();
    if (secondary_color == null) {
        fill(primary_color)
    } else {
        fill(secondary_color)
    }
    ellipse(0, 0, side_length * 0.05, side_length * 0.05);

    push();
    for (var i = 0; i < 8; i++) {
        rotate(TWO_PI / 8);
        noStroke();
        fill(background_color);
        ellipse(0, side_length * 0.28, side_length * 0.22, side_length * 0.17);
    }
    pop();

    push();
    for (var i = 0; i < 8; i++) {
        rotate(TWO_PI / 8);

        var points = [
            [side_length * 0.4, side_length * 0.60],
            [0,   side_length * 0.40],
            [0,   side_length * 0.08],
            [side_length * 0.4, -side_length * 0.15]
        ];

        noFill();
        strokeWeight(side_length * 0.04);
        stroke(primary_color);
        curve(points[0][0], points[0][1],
              points[1][0], points[1][1],
              points[2][0], points[2][1],
              points[3][0], points[3][1]);

        curve(-points[0][0], points[0][1],
              -points[1][0], points[1][1],
              -points[2][0], points[2][1],
              -points[3][0], points[3][1]);

    }
    pop();

    push();
    rotate(TWO_PI / 16);
    for (var i = 0; i < 8; i++) {
        rotate(TWO_PI / 8);
        noStroke();
        if (secondary_color != null) {
            fill(secondary_color);
        } else {
            fill(primary_color);
        }
        triangle(-side_length * 0.059, side_length * 0.345, 0, side_length * 0.4, side_length * 0.059, side_length * 0.345);
    }
    pop();

    noFill();
    if (secondary_color != null) {
        stroke(secondary_color);
    } else {
        stroke(primary_color);
    }
    ellipse(0, 0, side_length * 0.5);

    push();
    rotate(QUARTER_PI);
    for (var i = 0; i < 4; i++) {
        noStroke();
        if (secondary_color != null) {
            fill(secondary_color);
        } else {
            fill(primary_color);
        }
        triangle(-side_length * 0.115, side_length * 0.54,
                 0, side_length * 0.45,
                  side_length * 0.115, side_length * 0.54)
        rotate(HALF_PI);
    }
    pop();
}

function tile2(side_length, background_color, primary_color, secondary_color = null) {
    rectMode(CENTER);
    ellipseMode(CENTER);

    fill(background_color);
    rect(0, 0, side_length, side_length);
    if (secondary_color != null) {
        fill(secondary_color);
    } else {
        fill(primary_color);
    }
    rect(0, 0, side_length * 0.85, side_length * 0.85);
    fill(background_color);
    rect(0, 0, side_length * 0.70, side_length * 0.70);
    fill(background_color);
    rect(0, 0, side_length * 0.55, side_length * 0.55);

    push();
    noFill();
    strokeWeight(side_length * 0.02);
    if (secondary_color != null) {
        stroke(secondary_color);
    } else {
        stroke(primary_color);
    }
    for (var i = 0; i < 4; i++) {
        line(0, side_length * 0.45 / 2, side_length * 0.45 / 2, 0);
        rotate(QUARTER_PI);
        line(0, 0, 0, side_length * 0.45 / 2 * 2**0.5);
        rotate(QUARTER_PI);
    }
    pop();


    push();
    stroke(primary_color);
    strokeWeight(side_length * 0.02);
    noFill();
    rotate(QUARTER_PI);
    for (var i = 0; i < 4; i++) {
        ellipse(0, side_length * 0.45 / 4 * 2**0.5, side_length * 0.45 / 4 * 2**0.5)
        rotate(HALF_PI);
    }
    pop();

    stroke(primary_color);
    strokeWeight(side_length * 0.05);
    noFill();
    rect(0, 0, side_length * 0.50, side_length * 0.50);
}

function tile3(side_length, background_color, primary_color, secondary_color = null) {
    rectMode(CENTER);
    ellipseMode(CENTER);

    fill(background_color);
    rect(0, 0, side_length, side_length);
    if (secondary_color != null) {
        fill(secondary_color);
    } else {
        fill(primary_color);
    }
    rect(0, 0, side_length * 0.85, side_length * 0.85);
    fill(background_color);
    rect(0, 0, side_length * 0.70, side_length * 0.70);
    fill(primary_color);
    rect(0, 0, side_length * 0.55, side_length * 0.55);
    fill(background_color)
    rect(0, 0, side_length * 0.48, side_length * 0.48);

    push();
    for (var i = 0; i < 8; i++) {

        strokeWeight(side_length * 0.028);
        if (secondary_color == null) {
            stroke(primary_color);
        } else {
            stroke(secondary_color);
        }
        noFill();

        if ((i % 2) == 0) {
            line(0, side_length * 0.1, 0, side_length * 0.25);
        } else {
            line(0, side_length * 0.1, 0, side_length * 0.35);
        }

        var points = [
            [side_length * 0.15, side_length * 0.60],
            [0,   side_length * 0.18],
            [0,   side_length * 0.07],
            [side_length * 0.15, -side_length * 0.15]
        ];

        noFill();
        strokeWeight(side_length * 0.028);
        stroke(primary_color);
        curve(points[0][0], points[0][1],
              points[1][0], points[1][1],
              points[2][0], points[2][1],
              points[3][0], points[3][1]);

        curve(-points[0][0], points[0][1],
              -points[1][0], points[1][1],
              -points[2][0], points[2][1],
              -points[3][0], points[3][1]);

        rotate(TWO_PI / 8);
    }
    pop();

    noFill();
    stroke(primary_color);
    strokeWeight(side_length * 0.03);
    rect(0, 0, side_length * 0.50, side_length * 0.50);

    noFill();
    stroke(primary_color);
    strokeWeight(side_length * 0.04);
    ellipse(0, 0, side_length * 0.4, side_length * 0.4);
    ellipse(0, 0, side_length * 0.1, side_length * 0.1);
}

function tile4(side_length, background_color, primary_color, secondary_color = null) {
    rectMode(CENTER);
    ellipseMode(CENTER);

    noStroke();
    fill(background_color);
    rect(0, 0, side_length, side_length);
    if (secondary_color != null) {
        fill(secondary_color);
    } else {
        fill(primary_color);
    }
    rect(0, 0, side_length * 0.85, side_length * 0.85);
    fill(background_color);
    rect(0, 0, side_length * 0.70, side_length * 0.70);
    fill(primary_color);
    rect(0, 0, side_length * 0.55, side_length * 0.55);
    fill(background_color)
    rect(0, 0, side_length * 0.48, side_length * 0.48);

    push();
    fill(primary_color);
    rotate(QUARTER_PI);
    for (var i = 0; i < 4; i++) {
        // triangle(-side_length * 0.01, side_length * 0.1,
        //          0, 0,
        //          side_length * 0.01, side_length * 0.1)
        noStroke();
        fill(primary_color);
        beginShape();
        vertex(0, 0);
        vertex(-side_length * 0.01, side_length * 0.08);
        vertex(-side_length * 0.045, side_length * 0.05);
        vertex(0, side_length * 0.13);
        vertex(side_length * 0.045, side_length * 0.05);
        vertex(side_length * 0.01, side_length * 0.08);
        vertex(0, 0);
        endShape();

        if (secondary_color != null) {
            fill(secondary_color);
        } else {
            fill(primary_color);
        }
        beginShape();
        vertex(0, side_length * 0.26);
        vertex(-side_length * 0.01, side_length * 0.18);
        vertex(-side_length * 0.045, side_length * 0.21);
        vertex(0, side_length * 0.13);
        vertex(side_length * 0.045, side_length * 0.21);
        vertex(side_length * 0.01, side_length * 0.18);
        vertex(0, side_length * 0.26);
        endShape();

        noFill();
        strokeWeight(side_length * 0.01);
        stroke(primary_color);
        ellipse(0, side_length * 0.01 * (13 + (26 - 13) / 2), side_length * 0.13, side_length * 0.13);

        rotate(QUARTER_PI);

        strokeCap(PROJECT);
        beginShape();
        vertex(0, side_length * 0.23);
        vertex(-side_length * 0.01, side_length * 0.15);
        vertex(-side_length * 0.045, side_length * 0.18);
        vertex(0, side_length * 0.08);
        vertex(side_length * 0.045, side_length * 0.18);
        vertex(side_length * 0.01, side_length * 0.15);
        vertex(0, side_length * 0.23);
        endShape();

        rotate(QUARTER_PI);
    }
    pop();
}

function tile5(side_length, background_color, primary_color, secondary_color = null) {
    rectMode(CENTER);
    ellipseMode(CENTER);

    noStroke();
    fill(primary_color);
    rect(0, 0, side_length, side_length);
    fill(background_color);
    rect(0, 0, side_length * 0.9, side_length * 0.9);

    fill(primary_color);
    ellipse(0, 0, side_length * 0.25, side_length * 0.25);

    push();
    if (secondary_color == null) {
        fill(background_color);
    } else {
        fill(secondary_color);
    }
    // fill(background_color);
    for (var i = 0; i < 8; i++) {
        ellipse(0, side_length * 0.12, side_length * 0.11, side_length * 0.11);
        rotate(QUARTER_PI);
    }
    pop();

    fill(background_color);
    ellipse(0, 0, side_length * 0.10, side_length * 0.10);
    fill(primary_color);
    ellipse(0, 0, side_length * 0.06, side_length * 0.06);
    noFill();
    stroke(background_color);
    strokeWeight(side_length * 0.08);
    ellipse(0, 0, side_length * 0.28, side_length * 0.28);
    stroke(primary_color);
    strokeWeight(side_length * 0.04);
    ellipse(0, 0, side_length * 0.24, side_length * 0.24);

    push();
    for (var i = 0; i < 16; i++) {
        noFill();
        stroke(primary_color);
        strokeWeight(side_length * 0.04);
        strokeCap(PROJECT);
        curve(
            side_length * 0.1, side_length * 0.05,
            -side_length * 0.01, side_length * 0.13,
            side_length * 0.05, side_length * 0.4,
            side_length * 0.3, side_length * 0.55,
        );
        strokeCap(PROJECT);
        line(side_length * 0.06, side_length * 0.405,
             side_length * 0.14, side_length * 0.38)

        rotate(QUARTER_PI / 2);
    }
    pop();

    push();
    rotate(QUARTER_PI);
    for (var i = 0; i < 4; i++) {
        noStroke();
        if (secondary_color == null) {
            fill(primary_color);
        } else {
            fill(secondary_color);
        }
        rect(0, side_length * 0.507, side_length * 0.13, side_length * 0.13);

        push();
        fill(background_color);
        translate(0, side_length * 0.507);
        rotate(QUARTER_PI);
        rect(0, 0, side_length * 0.08, side_length * 0.08);
        rotate(QUARTER_PI);
        if (secondary_color == null) {
            fill(primary_color);
        } else {
            fill(secondary_color);
        }
        rect(0, 0, side_length * 0.05, side_length * 0.05);
        pop();

        rotate(HALF_PI);
    }
    pop();
}

function tile6(side_length, background_color, primary_color, secondary_color = null) {
    rectMode(CENTER);
    ellipseMode(CENTER);

    noStroke();
    fill(primary_color);
    rect(0, 0, side_length, side_length);
    fill(background_color);
    rect(0, 0, side_length * 0.9, side_length * 0.9);

    push();
    rotate(QUARTER_PI);
    for (var i = 0; i < 4; i++) {
        push();
            translate(0, side_length * 0.3);
            stroke(primary_color);
            strokeWeight(side_length * 0.03);
            ellipse(0, 0, side_length * 0.38, side_length * 0.38);

            push();
                rotate(QUARTER_PI / 2);
                for (var j = 0; j < 8; j++) {
                    noFill();
                    stroke(primary_color);
                    strokeWeight(side_length * 0.02);
                    arc(0, side_length * 0.21, side_length * 0.15, side_length * 0.15, PI + QUARTER_PI - QUARTER_PI * 0.5, TWO_PI - QUARTER_PI + QUARTER_PI * 0.5);
                    rotate(QUARTER_PI);
                }
            pop();

            noStroke();
            if (secondary_color == null) {
                fill(primary_color);
            } else {
                fill(secondary_color);
            }

            ellipse(0, 0, side_length * 0.18, side_length * 0.18);

            // rotate(QUARTER_PI);
            fill(background_color);
            rect(0, 0, side_length * 0.07, side_length * 0.07);

        pop();
        rotate(HALF_PI);
    }
    pop();

    if (secondary_color == null) {
                fill(primary_color);
            } else {
                fill(secondary_color);
            }
    ellipse(0, 0, side_length * 0.18, side_length * 0.18);

    push();
        rotate(QUARTER_PI);
        fill(background_color);
        rect(0, 0, side_length * 0.07, side_length * 0.07);
    pop();

    for (var i = 0; i < 4; i++) {
        noFill();
        if (secondary_color == null) {
                fill(primary_color);
            } else {
                fill(secondary_color);
            }
        strokeWeight(side_length * 0.02);
        line(-side_length * 0.02, side_length * 0.21, side_length * 0.02, side_length * 0.21);

        noStroke();
        if (secondary_color == null) {
                fill(primary_color);
            } else {
                fill(secondary_color);
            }
        arc(0, side_length * 0.45, side_length * 0.18, side_length * 0.18, PI, TWO_PI);
        fill(background_color);
        triangle(-side_length * (0.07 / 2**0.5), side_length * 0.45,
                 0, side_length * 0.45 - side_length * (0.07 / 2**0.5),
                 side_length * (0.07 / 2**0.5), side_length * 0.45);

        rotate(HALF_PI);
    }
}

function tile7(side_length, background_color, primary_color, secondary_color = null) {
    rectMode(CENTER);
    ellipseMode(CENTER);

    noStroke();
    fill(background_color);
    rect(0, 0, side_length, side_length);
    fill(primary_color);
    rect(0, 0, side_length * 0.9, side_length * 0.9);

    push();
        noFill();
        stroke(background_color);
        strokeWeight(side_length * 0.04);
        rect(0, 0, side_length * 0.55, side_length * 0.55);
        rotate(QUARTER_PI);
        rect(0, 0, side_length * 0.55, side_length * 0.55);
    pop();

    if (secondary_color == null) {
        fill(background_color)
    } else {
        fill(secondary_color);
    }
    noStroke();
    ellipse(0, 0, side_length * 0.4, side_length * 0.4);
    fill(primary_color);
    ellipse(0, 0, side_length * 0.20, side_length * 0.20);
    fill(background_color);
    ellipse(0, 0, side_length * 0.10, side_length * 0.10);

    push();
        for (var i = 0; i < 16; i++) {
            noStroke();
            fill(primary_color);
            triangle(-side_length * 0.02, side_length * 0.12,
                     0, side_length * 0.19,
                     side_length * 0.02, side_length * 0.12);
            rotate(QUARTER_PI / 2);
        }
    pop();
}

function tile8(side_length, background_color, primary_color, secondary_color = null) {
    rectMode(CENTER);
    ellipseMode(CENTER);

    noStroke();
    fill(background_color);
    rect(0, 0, side_length, side_length);
    fill(primary_color);
    rect(0, 0, side_length * 0.9, side_length * 0.9);

    push();
        noFill();
        stroke(background_color);
        strokeWeight(side_length * 0.04);
        rect(0, 0, side_length * 0.55, side_length * 0.55);
        rotate(QUARTER_PI);
        rect(0, 0, side_length * 0.55, side_length * 0.55);
    pop();

    if (secondary_color == null) {
        fill(background_color)
    } else {
        fill(secondary_color);
    }
    noStroke();
    ellipse(0, 0, side_length * 0.10, side_length * 0.10);

    push();
        noStroke();
        fill(background_color);
        rotate(QUARTER_PI / 2);
        for (var i = 0; i < 8; i++) {
            triangle(-side_length * 0.02, side_length * 0.08,
                     0, side_length * 0.22,
                     side_length * 0.02, side_length * 0.08);
            rotate(QUARTER_PI);
        }
    pop();
}

function tile9(side_length, background_color, primary_color, secondary_color = null) {
    rectMode(CENTER);
    ellipseMode(CENTER);

    noStroke();
    fill(primary_color);
    rect(0, 0, side_length, side_length);
    fill(background_color);
    rect(0, 0, side_length * 0.95, side_length * 0.95);

    var radius = side_length / 2;
    var small_radius = side_length / 6;
    var tiny_radius = side_length / 50;

    noFill();
    strokeWeight(side_length * 0.02);
    stroke(primary_color);

    push();
    rotate(QUARTER_PI);
    for (var i = 0; i < 4; i++) {
        push();
            translate(0, side_length / 4 * (2**0.5));
            if (secondary_color == null) {
                stroke(primary_color);
            } else {
                stroke(secondary_color);
            }
            ellipse(0, 0, radius * 0.96, radius * 0.96);
            ellipse(0, 0, small_radius, small_radius);
            ellipse(0, 0, tiny_radius, tiny_radius);
            push();
                stroke(primary_color);
                strokeWeight(side_length * 0.03);
                for (var j = 0; j < 4; j++) {
                    point(0, radius / 2 * 0.96 * 0.7);
                    rotate(HALF_PI);
                }
            pop();
        pop();
        rotate(HALF_PI);
    }
    pop();

    push();
        noFill();
        strokeWeight(side_length * 0.02);
        stroke(primary_color);
        for (var i = 0; i < 4; i++) {
            arc(0, radius * 0.96, radius * 0.96, radius * 0.96, PI, TWO_PI);
            arc(0, radius * 0.96, small_radius, small_radius, PI, TWO_PI);
            rotate(HALF_PI);
        }
    pop();


    ellipse(0, 0, radius * 0.96, radius * 0.96);
    ellipse(0, 0, small_radius, small_radius);
    ellipse(0, 0, tiny_radius, tiny_radius);

}

function keyPressed() {
  if (key == 'r') {
    // num_squares = 20 - Math.floor(Math.random() * 2) * 10
    draw();
  }
}
