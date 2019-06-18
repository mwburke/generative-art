/* Inspiration:
 * https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/
 */

var num_squares = 10; //20 - Math.floor(Math.random() * 2) * 10;

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz032');
  background(247, 247, 247);
  smooth(16);

  noLoop();
}

function draw() {
  var color_1 = color(0);
  var color_2 = color(247);

  var draw_choice = Math.random();

  if (draw_choice < 0.2) {
    draw_tile_groups(color_1, color_2);
  } else if (draw_choice < 0.5) {
    nested_squares_draw(color_1, color_2);
  } else if (draw_choice < 0.6) {
    random_draw(color_1, color_2);
  } else if (draw_choice < 0.75) {
    two_tiles_diagonal(color_1, color_2);
  } else if (draw_choice < 1.0) {
    three_tiles_diagonal(color_1, color_2);
  }

}


function dot_border(color_1, color_2) {
  fill(color_2);
  noStroke();
  rect(0, 0, CANVAS_WIDTH / num_squares, CANVAS_WIDTH / num_squares);
  rect(0, CANVAS_WIDTH - CANVAS_WIDTH / num_squares, CANVAS_WIDTH / num_squares, CANVAS_WIDTH / num_squares);
  rect(CANVAS_WIDTH - CANVAS_WIDTH / num_squares, 0, CANVAS_WIDTH / num_squares, CANVAS_WIDTH / num_squares);
  rect(CANVAS_WIDTH - CANVAS_WIDTH / num_squares, CANVAS_WIDTH - CANVAS_WIDTH / num_squares, CANVAS_WIDTH / num_squares, CANVAS_WIDTH / num_squares);
  push();
    translate(CANVAS_HEIGHT / num_squares / 2, CANVAS_HEIGHT / num_squares / 2);
    for (var i = 0; i < num_squares - 2; i++) {
      translate(CANVAS_HEIGHT / num_squares, 0);
      push();
        rotate(PI + HALF_PI);
        side_trunchet(CANVAS_WIDTH / num_squares, color_1, color_2);
      pop();
      push();
        translate(0, CANVAS_HEIGHT * (num_squares - 1) / num_squares);
        push();
          rotate(HALF_PI);
          side_trunchet(CANVAS_WIDTH / num_squares, color_1, color_2);
        pop();
      pop();
    }
  pop();
  push();
      translate(CANVAS_HEIGHT / num_squares / 2, CANVAS_HEIGHT / num_squares / 2);
      for (var i = 0; i < num_squares - 2; i++) {
        translate(0, CANVAS_HEIGHT / num_squares);
        push();
          rotate(PI);
          side_trunchet(CANVAS_WIDTH / num_squares, color_1, color_2);
        pop();
        push();
          translate(CANVAS_HEIGHT * (num_squares - 1) / num_squares, 0);
          push();
            // rotate();
            side_trunchet(CANVAS_WIDTH / num_squares, color_1, color_2);
          pop();
        pop();
      }
    pop();
}

function add_colors() {
  push();
  blendMode(DIFFERENCE);
  rectMode(CENTER);
  translate(width / 2, width / 2);
  rotate(QUARTER_PI);
  fill(color(4, 65, 163));
  rect(0, 0, CANVAS_WIDTH / 2, CANVAS_WIDTH / 2);
  pop();
}

function two_tiles_diagonal(color_1, color_2) {
  var first_tile_index = Math.floor(Math.random()*trunchets.length);
  var second_tile_index = Math.floor(Math.random()*trunchets.length);

  while(second_tile_index == first_tile_index) {
      second_tile_index = Math.floor(Math.random()*trunchets.length);
  }

  var first_tile = trunchets[first_tile_index];
  var second_tile = trunchets[second_tile_index];

  var do_rotate = Math.random() < 0.6;

  for (var i = 0; i < num_squares; i++) {
        push();
        translate(CANVAS_HEIGHT / num_squares / 2, CANVAS_HEIGHT / num_squares / 2 + CANVAS_HEIGHT / num_squares * i);
        if ((i % 2) == 1) {
            translate(CANVAS_WIDTH / num_squares, 0);
        }
        for (var j = 0; j < num_squares / 2; j++) {
            noFill();
            noStroke();
            push();
            if (do_rotate) {
              rotate(HALF_PI * Math.floor(Math.random() * 4));
            }
            first_tile(
              CANVAS_WIDTH / num_squares,
              color_1,
              color_2

            );
            pop();
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
            push();
            if (do_rotate) {
              rotate(HALF_PI * Math.floor(Math.random() * 4));
            }
            second_tile(
              CANVAS_WIDTH / num_squares,
              color_1,
              color_2
            );
            pop();
            translate(CANVAS_WIDTH / num_squares * 2, 0);
        }
        pop();
    }
    dot_border(color_1, color_2);
}

function three_tiles_diagonal(color_1, color_2) {
  var first_tile_index = Math.floor(Math.random()*trunchets.length);
  var second_tile_index = Math.floor(Math.random()*trunchets.length);

  while(second_tile_index == first_tile_index) {
      second_tile_index = Math.floor(Math.random()*trunchets.length);
  }

  var third_tile_index = Math.floor(Math.random()*trunchets.length);

  while ((third_tile_index == first_tile_index) & (third_tile_index == second_tile_index)) {
      third_tile_index = Math.floor(Math.random()*trunchets.length);
  }

  var first_tile = trunchets[first_tile_index];
  var second_tile = trunchets[second_tile_index];
  var third_tile = trunchets[third_tile_index];

  var draw_tiles = [first_tile, second_tile, third_tile];

  var do_rotate = Math.random() < 0.6;

  for (var i = 0; i < num_squares; i++) {
        push();
        var tile_index = i % 3;
        translate(CANVAS_HEIGHT / num_squares / 2, CANVAS_HEIGHT / num_squares / 2 + CANVAS_HEIGHT / num_squares * i);
        for (var j = 0; j < num_squares; j++) {
            noFill();
            noStroke();
            push();
            if (do_rotate) {
              rotate(HALF_PI * Math.floor(Math.random() * 4));
            }
            draw_tiles[tile_index](
              CANVAS_WIDTH / num_squares,
              color_1,
              color_2

            );
            pop();
            translate(CANVAS_WIDTH / num_squares, 0);
            tile_index = (tile_index + 1) % 3;
        }
        pop();
    }

    dot_border(color_1, color_2);
}

function random_draw(color_1, color_2) {

    for (var i = 0; i < num_squares; i++) {
        push();
        translate(CANVAS_HEIGHT / num_squares / 2, CANVAS_HEIGHT / num_squares / 2 + CANVAS_HEIGHT / num_squares * i);
        if ((i % 2) == 1) {
            translate(CANVAS_WIDTH / num_squares, 0);
        }
        for (var j = 0; j < num_squares / 2; j++) {
            noFill();
            noStroke();
            // first_tile(CANVAS_WIDTH / num_squares,
            //            color_1,
            //            color_2);
            push();
            rotate(HALF_PI * Math.floor(Math.random() * 4));
            trunchets[Math.floor(Math.random()*trunchets.length)](
              CANVAS_WIDTH / num_squares,
              color_1,
              color_2

            );
            pop();
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
            // second_tile(CANVAS_WIDTH / num_squares,
            //            color_1,
            //            color_2);
            push();
            rotate(HALF_PI * Math.floor(Math.random() * 4));
            trunchets[Math.floor(Math.random()*trunchets.length)](
              CANVAS_WIDTH / num_squares,
              color_1,
              color_2
            );
            pop();
            translate(CANVAS_WIDTH / num_squares * 2, 0);
        }
        pop();
    }

    dot_border(color_1, color_2);
}

function nested_squares_draw(color_1, color_2) {
  push();
  translate(width / 2, height / 2);
  for (var i = 2; i < num_squares; i = i + 2) {
    var draw_tile = trunchets[Math.floor(Math.random()*trunchets.length)];
    draw_tile_square(color_1, color_2, i, draw_tile);
  }
  pop();
  dot_border(color_1, color_2);
}

function draw_tile_square(color_1, color_2, edge_length, tile) {
  push();

  for (var i = 0; i < 4; i++) {
    push();
    translate(-width / num_squares * (edge_length / 2 - 0.5), - width / num_squares * (edge_length / 2 - 0.5));
    for (var j = 0; j < edge_length - 1; j++) {
      tile(CANVAS_WIDTH / num_squares,
            color_1,
            color_2
      );
      translate(CANVAS_WIDTH / num_squares, 0);
    }
    pop();
    rotate(HALF_PI);
  }
  pop();
}

function draw_tile_groups(color_1, color_2) {
  var tile_group = new draw_tile_group(color_1, color_2, width / num_squares);

  push();
  translate(width / num_squares, 0);
  for (var i = 0; i < (num_squares / 2); i++) {
    push();
    translate(width / num_squares, width / num_squares * i * 2);
    for (var j = 0; j < (num_squares / 2); j++) {
      tile_group.draw();
      translate(width / num_squares * 2, 0);
    }
    pop();
  }
  pop();

  dot_border(color_1, color_2);

  push();
  translate(width / num_squares, width / num_squares * 2);
  for (var i = 0; i < (num_squares / 2) - 1; i++) {
    push();
    translate(width / num_squares, width / num_squares * i * 2);
    for (var j = 0; j < (num_squares / 2) - 1; j++) {
      tile_group.draw_small();
      translate(width / num_squares * 2, 0);
    }
    pop();
  }
  pop();
}

function draw_tile_group(color_1, color_2, edge_length, no_small=false) {
  this.tiles = [];
  this.small_tiles = new Set();

  for (var i = 0; i < 4; i++) {
    if ((num_squares == 10) && !no_small && (Math.random() < 0.2)) {
      this.tiles[i] = new draw_tile_group(color_2, color_1, edge_length / 2, true);
      this.small_tiles.add(i);
    } else {
      this.tiles[i] = trunchets[Math.floor(Math.random()*trunchets.length)];
    }
  }

  this.draw = function() {
    push();
    translate(-edge_length / 2, -edge_length / 2);
    if (!this.small_tiles.has(0)) {
      this.tiles[0](edge_length, color_1, color_2);
    }
    translate(edge_length, 0);
    if (!this.small_tiles.has(1)) {
      this.tiles[1](edge_length, color_1, color_2);
    }
    translate(0, edge_length);
    if (!this.small_tiles.has(2)) {
      this.tiles[2](edge_length, color_1, color_2);
    }
    translate(-edge_length, 0);
    if (!this.small_tiles.has(3)) {
      this.tiles[3](edge_length, color_1, color_2);
    }
    pop();
  }

  this.draw_small = function() {
    push();
      translate(-edge_length / 2, -edge_length / 2);
      if (this.small_tiles.has(0)) {
        this.tiles[0].draw();
        push();
          noStroke();
          fill(color_1);
          ellipse(-edge_length / 2, edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(edge_length / 2, edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(edge_length / 2, -edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(-edge_length / 2, -edge_length / 2, edge_length / 3, edge_length / 3);
        pop();
      }
      translate(edge_length, 0);
      if (this.small_tiles.has(1)) {
        this.tiles[1].draw();
        push();
          noStroke();
          fill(color_1);
          ellipse(-edge_length / 2, edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(edge_length / 2, edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(edge_length / 2, -edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(-edge_length / 2, -edge_length / 2, edge_length / 3, edge_length / 3);
        pop();
      }
      translate(0, edge_length);
      if (this.small_tiles.has(2)) {
        this.tiles[2].draw();
        push();
          noStroke();
          fill(color_1);
          ellipse(-edge_length / 2, edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(edge_length / 2, edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(edge_length / 2, -edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(-edge_length / 2, -edge_length / 2, edge_length / 3, edge_length / 3);
        pop();
      }
      // translate(-edge_length, 0);
      if (this.small_tiles.has(3)) {
        this.tiles[3].draw();
        push();
          noStroke();
          fill(color_1);
          ellipse(-edge_length / 2, edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(edge_length / 2, edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(edge_length / 2, -edge_length / 2, edge_length / 3, edge_length / 3);
          ellipse(-edge_length / 2, -edge_length / 2, edge_length / 3, edge_length / 3);
        pop();
      }
    pop();
  }
}

function keyPressed() {
  if (key == 'R') {
    // num_squares = 20 - Math.floor(Math.random() * 2) * 10
    draw();
  }
}
