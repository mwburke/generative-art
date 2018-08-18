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
    fill(255, 255, 255, 0);
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


