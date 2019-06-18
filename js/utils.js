FRAMERATE = 60
CANVAS_WIDTH = 500
CANVAS_HEIGHT = 500





function polygon(x, y, radius, npoints, rot=0) {
  var angle = TWO_PI / npoints;
  var rot_angle = TWO_PI * (360 - rot) / 360

  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a + rot_angle) * radius;
    var sy = y + sin(a + rot_angle) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function hexagon(x, y, radius, rot=0, hex_color) {
    if (typeof hex_color == "function") {
      hex_color = hex_color(x, y, radius, rot);
    }
    fill(hex_color);
    noStroke();
    polygon(x, y, radius, 6, rot);
}

function hexagon_outline(x, y, radius, rot=0, hex_color, opacity, stroke_weight) {
      if (typeof hex_color == "function") {
      hex_color = hex_color(x, y, radius, rot);
    }

    hex_color = hex_color.levels;
    hex_color[3] = opacity;
    hex_color = color(hex_color);
    stroke(hex_color);
    strokeWeight(stroke_weight);
    fill(247, 247, 247, 0);
    polygon(x, y, radius, 6, rot);
}


function hex_ring(ring_radius, ring_rot, radius, rot, color) {
    var angle = TWO_PI / 6;
    var rot_angle = TWO_PI * (360 - ring_rot / 360)
    var x = width / 2
    var y = height / 2;

    for (var a = 0; a < TWO_PI - angle; a += angle) {
        var sx = x + cos(a + rot_angle) * ring_radius;
        var sy = y + sin(a + rot_angle) * ring_radius;
        hexagon(sx, sy, radius, rot, color)
    }
}

/* This is a general function for creating sets of hexagon rings
 * of 6 hexagons that are able to move in/out from the center,
 * rotate in a circle, and change colors/opacity. All hexagons must
 * have the same properties in terms of colors/size. The moving values
 * are generated from the 60 frames per second framerate.
 *
 * Inputs:
 * radius_speed: number of seconds to travel from edge of canvas to
 *               the side. so it's kind of unintuitive but lower
 *               numbers result in higher speed. negative numbers
 *               have the same effect but move from outside in.
 *               UPDATE: it's not quite this but close enough lol
 * initial_radius: value from 0 to 1 where 0 is in the center and 1
 *                 is at the edge of the canvas
 * hex_radius: hexagon radius value in pixels
 * rotation_speed: number of seconds to rotate 360 degrees,
 *                 positive creates clockwise movement, negative
 *                 creates counter-clockwise movement
 * hex_rotation_speed: number of seconds for each hexagon to rotate
 *                     360 degrees, positive creates clockwise movement,
 *                     negative creates counter-clockwise movement
 * initial_rotation: initial rotation in degrees, with 0 being straight up
 * hex_initial_rotation: initial rotation in degrees, with 0 being straight up
 * color_generator: function that generates valid color string

 */
function moving_hex_ring(radius_speed,
                         initial_radius,
                         hex_radius,
                         rotation_speed,
                         hex_rotation_speed,
                         initial_rotation,
                         hex_initial_rotation,
                         color_generator,
                         color_func=false) {

	initial_radius = (CANVAS_WIDTH + hex_radius * 2) / 2 * initial_radius;
	if (radius_speed == 0) {
		radius = initial_radius;
	} else {
		radius = (initial_radius + frameCount * (CANVAS_WIDTH / 2 + hex_radius * 2) / radius_speed / FRAMERATE) % (CANVAS_WIDTH / 2 + hex_radius * 2);
	}
	if (rotation_speed == 0) {
		rot = initial_rotation;
	} else {
		rot = (initial_rotation + frameCount / FRAMERATE * 360 / rotation_speed) % 360;
	}
	if (hex_rotation_speed == 0) {
		hex_rot = hex_initial_rotation
	} else {
		hex_rot = (hex_initial_rotation + frameCount / FRAMERATE * 360 / hex_rotation_speed) % 360;
	}
  if (color_func) {
    colors = color_generator(frameCount, radius / (CANVAS_WIDTH / 2 + hex_radius * 2));
  } else {
    colors = color_generator;
  }
	hex_ring(radius, rot, hex_radius, hex_rot, colors);
}


function constant_color(r, g, b, opactiy) {
	return color(r, g, b, opactiy)
}

// Color palettes for various uses
var color_palettes = {
    "vaporwave" : ["#94D0FF","#8795E8","#966bff","#AD8CFF","#C774E8","#c774a9","#FF6AD5","#ff6a8b","#ff8b8b","#ffa58b","#ffde8b","#cdde8b","#8bde8b","#20de8b"],
    "cool" : ["#FF6AD5","#C774E8","#AD8CFF","#8795E8","#94D0FF"],
    "crystal_pepsi" : ["#FFCCFF","#F1DAFF","#E3E8FF","#CCFFFF"],
    "mallsoft" : ["#fbcff3","#f7c0bb","#acd0f4","#8690ff","#30bfdd","#7fd4c1"],
    "jazzcup" : ["#392682","#7a3a9a","#3f86bc","#28ada8","#83dde0"],
    "sunset" : ["#661246","#ae1357","#f9247e","#d7509f","#f9897b"],
    "macplus" : ["#1b4247","#09979b","#75d8d5","#ffc0cb","#fe7f9d","#65323e"],
    "seapunk" : ["#532e57","#a997ab","#7ec488","#569874","#296656"]
}


/* Use the left and right arrows keys to navigate through the
 * different posts on the site.
 */
function leftArrowPressed() {
  var leftarrow = document.getElementById("leftarrow");
  if (leftarrow != null) {
    leftarrow.click();
  }
}

function rightArrowPressed() {
  var rightarrow = document.getElementById("rightarrow");
  if (rightarrow != null) {
    rightarrow.click();
  }
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};


function Triangle(x, y, height) {
  this.x = x;
  this.y = y;
  this.height = height;

  this.draw = function() {
    triangle(this.x-this.height/Math.sqrt(3), this.y,
             this.x, this.y-this.height,
             this.x+this.height/Math.sqrt(3), this.y);
  }
}


function Cell(i, j, cellSize, xOffset, yOffset, fill_color, stroke_color, no_gaps=false, gap_ratio=1) {
  this.i = i;
  this.j = j;

  if (j % 2 == 0) {
    this.x = this.i * cellSize * 2 + xOffset;
  } else {
    this.x = this.i * cellSize * 2 + cellSize + xOffset;
  }

  this.y = this.j * cellSize * 1.7 + yOffset;

  this.show = function() {
    stroke(stroke_color);
    fill(fill_color);

    push();
    translate(this.x, this.y);
    if (no_gaps) {
      polygon(0, 0, cellSize * 1.15, 6, 30);
    } else {
      polygon(0, 0, cellSize * gap_ratio, 6, 30);
    }

    pop();
  }

}


  function expanding_circle(x, y, start_frame, max_circle_radius) {
      this.start_frame = start_frame;

      this.draw = function() {
          radius = ((frameCount - start_frame) % (time_to_reset * 60)) / (time_to_reset * FRAMERATE) * max_circle_radius;
          ellipse(center, center, radius, radius);
      }

  }

// p is the time between 0 and 1
// g is the strength of the easing
// muptiply times whatever thing you want to ease
function ease(p, g) {
  if (p < 0.5) {
    return 0.5 * pow(2*p, g);
  } else {
    return 1 - 0.5 * pow(2*(1 - p), g);
  }
}

// removed trunchet 5, the straight cross one
// adds some inorganic straight lines I wasn't liking on the small ones
var trunchets = [trunchet1, trunchet2, trunchet3, trunchet4, trunchet6, trunchet7];


function trunchet1(w, color_1, color_2) {
  rectMode(CENTER);
  noStroke();
  fill(color_2);
  rect(0, 0, w, w);

  fill(color_1);
  arc(-w / 2, -w / 2, w * 4 / 3, w * 4 / 3, 0, HALF_PI);
  arc(w / 2, w / 2, w * 4 / 3, w * 4 / 3, PI, PI + HALF_PI);

  fill(color_2);
  arc(-w / 2, -w / 2, w * 2 / 3, w * 2 / 3, 0, HALF_PI);
  arc(w / 2, w / 2, w * 2 / 3, w * 2 / 3, PI, PI + HALF_PI);
}

function trunchet2(w, color_1, color_2) {
  rectMode(CENTER);
  noStroke();
  fill(color_2);
  rect(0, 0, w, w);

  fill(color_1);
  rect(0, 0, w, w / 3);

  arc(0, -w / 2, w / 3, w / 3, 0, PI);
  arc(0, w / 2, w / 3, w / 3, PI, TWO_PI);
}

function trunchet3(w, color_1, color_2) {
  rectMode(CENTER);
  noStroke();
  fill(color_2);
  rect(0, 0, w, w);

  fill(color_1);
  arc(-w / 2, 0, w / 3, w / 3, HALF_PI + PI, HALF_PI);
  arc(w / 2, 0, w / 3, w / 3, HALF_PI, HALF_PI + PI);
  arc(0, -w / 2, w / 3, w / 3, 0, PI);
  arc(0, w / 2, w / 3, w / 3, PI, TWO_PI);
}

function trunchet4(w, color_1, color_2) {
  rectMode(CENTER);
  noStroke();
  fill(color_1);
  rect(0, 0, w, w);

  fill(color_2);
  arc(-w / 2, -w / 2, w * 2 / 3, w * 2 / 3, 0, HALF_PI);
  arc(w / 2, w / 2, w * 2 / 3, w * 2 / 3, PI, PI + HALF_PI);
  arc(-w / 2, w / 2, w * 2 / 3, w * 2 / 3, -HALF_PI, 0);
  arc(w / 2, -w / 2, w * 2 / 3, w * 2 / 3, HALF_PI, PI);
}

function trunchet5(w, color_1, color_2) {
  rectMode(CENTER);
  noStroke();
  fill(color_2);
  rect(0, 0, w, w);

  fill(color_1);
  rect(0, 0, w, w / 3);
  rect(0, 0, w / 3, w);
}

function trunchet6(w, color_1, color_2) {
  rectMode(CENTER);
  noStroke();
  fill(color_2);
  rect(0, 0, w, w);

  fill(color_1);
  arc(w / 2, w / 2, w * 4 / 3, w * 4 / 3, PI, PI + HALF_PI);

  fill(color_2);
  arc(w / 2, w / 2, w * 2 / 3, w * 2 / 3, PI, PI + HALF_PI);

  fill(color_1);
  arc(-w / 2, 0, w / 3, w / 3, HALF_PI + PI, HALF_PI);
  arc(0, -w / 2, w / 3, w / 3, 0, PI);
}

function trunchet7(w, color_1, color_2) {
  rectMode(CENTER);
  noStroke();
  fill(color_2);
  rect(0, 0, w, w);

  fill(color_1);
  rect(0, - w / 6, w, w * 2 / 3);

  fill(color_2);
  arc(-w / 2, -w / 2, w * 2 / 3, w * 2 / 3, 0, HALF_PI);
  arc(w / 2, -w / 2, w * 2 / 3, w * 2 / 3, HALF_PI, PI);

  fill(color_1);
  arc(0, w / 2, w / 3, w / 3, PI, TWO_PI);
}

function side_trunchet(w, color_1, color_2) {
  rectMode(CENTER);
  noStroke();
  fill(color_2);
  rect(0, 0, w, w);
  fill(color_1);
  arc(-w / 2, 0, w / 3, w / 3, -HALF_PI, HALF_PI);
  ellipse(0, w / 2, w / 3, w / 3);
  ellipse(0, -w / 2, w / 3, w / 3);
}

// Helpful statistics scripts
// https://observablehq.com/@nstrayer/javascript-statistics-snippets

function gen_expon(lambda){
  return -Math.log(1-Math.random())/lambda;
}

function gen_pois(lambda, max_its = 1000){
  let i = -1, cum_sum = 0;
  while(cum_sum < 1 && i < max_its){
    i++;
    cum_sum += -Math.log(1-Math.random())/lambda;  // Or use gen_expon()
  }
  return i;
}

function gen_discrete_unif(min = 0, max = 100){
  const range = max - min;

  return Math.round(Math.random()*range) + min;
}

// Array helpers

function copy_array(arr){
  return arr.map(obj => Object.assign({}, obj));
}

function weighted_sample(weights, values){
  const random_val = Math.random();
  let cumulative_prob = 0, i;
  for(i = 0; i < weights.length; i++){
    cumulative_prob += weights[i];
    if(cumulative_prob > random_val) break;
  }
  // If we have values, return which one, otherwise just return index
  return values ? values[i]: i;
}

function product(arr){
  return arr.reduce((p, d) => p*d, 1);
}

function sum(arr){
  return arr.reduce((s, el) => s + el, 0);
}

function normalize(arr){
  const total_size = arr.reduce((s, el) => s + el, 0);
  // or sum(arr);
  return arr.map(el => el/total_size);
}

function unique(vec){
  return [...new Set(vec)];
}


