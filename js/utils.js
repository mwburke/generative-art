FRAMERATE = 60
CANVAS_WIDTH = 400
CANVAS_HEIGHT = 400

function polygon(x, y, radius, npoints, rot=0) {
  var angle = TWO_PI / npoints;
  var rot_angle = TWO_PI * (360 - rot / 360)

  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a + rot_angle) * radius;
    var sy = y + sin(a + rot_angle) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


function hexagon(x, y, radius, rot=0, r, g, b, opacity=200) {
    fill(r, g, b, opacity);
    noStroke();
    polygon(x, y, radius, 6, rot);
}


function hex_ring(ring_radius, ring_rot, radius, rot, r, g, b, opacity) {
    var angle = TWO_PI / 6;
    var rot_angle = TWO_PI * (360 - ring_rot / 360)
    var x = width / 2
    var y = height / 2;

    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a + rot_angle) * ring_radius;
        var sy = y + sin(a + rot_angle) * ring_radius;
        hexagon(sx, sy, radius, rot, r, g, b, opacity)
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
 * color_generator: function that generates four values: r, g, b, opacity

 */
function moving_hex_ring(radius_speed, 
                         initial_radius, 
                         hex_radius,
                         rotation_speed,
                         hex_rotation_speed,
                         initial_rotation,
                         hex_initial_rotation,
                         color_generator) {

	initial_radius = (CANVAS_WIDTH + hex_radius * 2) / 2 * initial_radius;
	if (radius_speed == 0) {
		radius = initial_radius;
	} else {
		radius = (initial_radius + frameCount * (CANVAS_WIDTH / 2 + hex_radius * 2) / radius_speed / FRAMERATE) % (CANVAS_WIDTH / 2 + hex_radius * 2);
	}
	if (rotation_speed == 0) {
		rot = 0
	} else {
		rot = (initial_rotation + frameCount / FRAMERATE * 360 / rotation_speed) % 360;
	}
	if (hex_rotation_speed == 0) {
		hex_rot = 0
	} else {
		hex_rot = (hex_initial_rotation + frameCount / FRAMERATE * 360 / hex_rotation_speed) % 360;
	}
	colors = color_generator();
	hex_ring(radius, rot, hex_radius, hex_rot, colors[0], colors[1], colors[2], colors[3]);
}


function constant_color(r, g, b, opactiy) {
	return [r, g, b, opactiy]
}