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

/** Function to take in a N x N array of pixel
 *  and return the truchet tile number along with
 *  the rotation amount.
 *  Identifies which tile to use based on the overall
 *  brightness compared to the threshold in each quarter.
 */
function truchify(x_lb, x_ub, y_lb, y_ub, threshold) {
  var brightnesses;
  var ul, ur, bl, br;

  brightnesses = [];

  for (var i = (y_ub - y_lb) / 2 + y_lb; i < y_ub; i++) {
    for (var j = x_lb; j <= (x_ub - x_lb) / 2 + x_lb; j++) {
      brightnesses.push(get_pixel_brightness(j, i))
    }
  }
  ul = is_dark(brightnesses, threshold);

  brightnesses = [];
  for (var i = (y_ub - y_lb) / 2 + y_lb; i < y_ub; i++) {
    for (var j = (x_ub - x_lb) / 2 + x_lb; j < x_ub; j++) {
      brightnesses.push(get_pixel_brightness(j, i))
    }
  }
  ur = is_dark(brightnesses, threshold);

  brightnesses = [];
  for (var i = y_lb; i < (y_ub - y_lb) / 2 + y_lb; i++) {
    for (var j = x_lb; j < (x_ub - x_lb) / 2 + x_lb; j++) {
      brightnesses.push(get_pixel_brightness(j, i))
    }
  }
  bl = is_dark(brightnesses, threshold);

  brightnesses = [];
  for (var i = y_lb; i < (y_ub - y_lb) / 2 + y_lb; i++) {
    for (var j = (x_ub - x_lb) / 2 + x_lb; j < x_ub; j++) {
      brightnesses.push(get_pixel_brightness(j, i))
    }
  }
  br = is_dark(brightnesses, threshold);

  if ((ul + ur + bl + br) == 0) {
    return [2, 0];
  } else if ((ul + ur + bl + br) == 1) {
    if (ul) {
      return [4, PI];
    } else if (ur) {
      return [4, PI + HALF_PI];
    } else if (bl) {
      return [4, HALF_PI];
    } else {
      return [4, 0];
    }
  } else if ((ul + ur + bl + br) == 2) {
    if (ul + ur) {
      return [5, 0];
    } else if (ur + br) {
      return [5, HALF_PI];
    } else if (br + bl) {
      return [5, PI];
    } else if (bl + ul) {
      return [5, PI + HALF_PI];
    } else if (ur + bl) {
      return [0, 0];
    } else {
      return [0, HALF_PI];
    }
  } else {
    return [3, 0];
  }

}

function get_pixel_brightness(x, y) {
    let d = pixelDensity();
    var total_brightness = 0;
    var counts = 0;
    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) {
        // loop over
        counts += 1;
        index = 4 * ((y * d + j) * width * d + (x * d + i));
        total_brightness = (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
      }
    }

    return total_brightness / counts;
}

function is_dark(brightnesses, threshold) {
  return (sum(brightnesses) / brightnesses.length) < threshold;
}

function apply_truchets(w) {
    loadPixels();
    var color_1 = color(0);
    var color_2 = color(247);

    for (var i = 0; i < height / w; i++) {
        for (var j = 0; j < width / w; j++) {
            var res = truchify(j * w, (j + 1) * w, height - (i + 1) * w, height - i * w, threshold);
            push();
                translate(j * w + w / 2, height - i * w - w / 2);
                rotate(res[1]);
                trunchets[res[0]](w, color_1, color_2);
            pop();
        }
    }
    // updatePixels();
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

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

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


// Delaunay helper functions

function edgesOfTriangle(t) { return [3 * t, 3 * t + 1, 3 * t + 2]; }
function triangleOfEdge(e)  { return Math.floor(e / 3); }
function nextHalfedge(e) { return (e % 3 === 2) ? e - 2 : e + 1; }
function prevHalfedge(e) { return (e % 3 === 0) ? e + 2 : e - 1; }
function forEachTriangleEdge(points, delaunay, callback) {
    for (let e = 0; e < delaunay.triangles.length; e++) {
        if (e > delaunay.halfedges[e]) {
            const p = points[delaunay.triangles[e]];
            const q = points[delaunay.triangles[nextHalfedge(e)]];
            callback(e, p, q);
        }
    }
}
function edgesOfTriangle(t) { return [3 * t, 3 * t + 1, 3 * t + 2]; }

function pointsOfTriangle(delaunay, t) {
    return edgesOfTriangle(t)
        .map(e => delaunay.triangles[e]);
}

function forEachTriangle(points, delaunay, callback) {
    for (let t = 0; t < delaunay.triangles.length / 3; t++) {
        callback(t, pointsOfTriangle(delaunay, t).map(p => points[p]));
    }
}
function triangleOfEdge(e)  { return Math.floor(e / 3); }
function trianglesAdjacentToTriangle(delaunay, t) {
    const adjacentTriangles = [];
    for (const e of edgesOfTriangle(t)) {
        const opposite = delaunay.halfedges[e];
        if (opposite >= 0) {
            adjacentTriangles.push(triangleOfEdge(opposite));
        }
    }
    return adjacentTriangles;
}
function circumcenter(a, b, c) {
    const ad = a[0] * a[0] + a[1] * a[1];
    const bd = b[0] * b[0] + b[1] * b[1];
    const cd = c[0] * c[0] + c[1] * c[1];
    const D = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
    return [
        1 / D * (ad * (b[1] - c[1]) + bd * (c[1] - a[1]) + cd * (a[1] - b[1])),
        1 / D * (ad * (c[0] - b[0]) + bd * (a[0] - c[0]) + cd * (b[0] - a[0])),
    ];
}
function triangleCenter(points, delaunay, t) {
    const vertices = pointsOfTriangle(delaunay, t).map(p => points[p]);
    return circumcenter(vertices[0], vertices[1], vertices[2]);
}
function forEachVoronoiEdge(points, delaunay, callback) {
    for (let e = 0; e < delaunay.triangles.length; e++) {
        if (e < delaunay.halfedges[e]) {
            const p = triangleCenter(points, delaunay, triangleOfEdge(e));
            const q = triangleCenter(points, delaunay, triangleOfEdge(delaunay.halfedges[e]));
            callback(e, p, q);
        }
    }
}
function edgesAroundPoint(delaunay, start) {
    const result = [];
    let incoming = start;
    do {
        result.push(incoming);
        const outgoing = nextHalfedge(incoming);
        incoming = delaunay.halfedges[outgoing];
    } while (incoming !== -1 && incoming !== start);
    return result;
}
function forEachVoronoiCell(points, delaunay, callback) {
    const seen = new Set();  // of point ids
    for (let e = 0; e < delaunay.triangles.length; e++) {
        const p = delaunay.triangles[nextHalfedge(e)];
        if (!seen.has(p)) {
            seen.add(p);
            const edges = edgesAroundPoint(delaunay, e);
            const triangles = edges.map(triangleOfEdge);
            const vertices = triangles.map(t => triangleCenter(points, delaunay, t));
            callback(p, vertices);
        }
    }
}
// Handling for infinite
// function forEachVoronoiCell(points, delaunay, callback) {
//     const index = new Map(); // point id to half-edge id
//     for (let e = 0; e < delaunay.triangles.length; e++) {
//         const endpoint = delaunay.triangles[nextHalfedge(e)];
//         if (!index.has(endpoint) || delaunay.halfedges[e] === -1) {
//             index.set(endpoint, e);
//         }
//     }
//     for (let p = 0; p < points.length; p++) {
//         const incoming = index.get(p);
//         const edges = edgesAroundPoint(delaunay, incoming);
//         const triangles = edges.map(triangleOfEdge);
//         const vertices = triangles.map(t => triangleCenter(points, delaunay, t));
//         callback(p, vertices);
//     }
// }

function distance(v1, v2) {
    return ((v1[0]-v2[0])**2 + (v1[1]-v2[1])**2)**0.5
}

function bounding_box(points) {
  const min_x = points.reduce((min, p) => p[0] < min ? p[0] : min, points[0][0]);
  const max_x = points.reduce((max, p) => p[0] > max ? p[0] : max, points[0][0]);
  const min_y = points.reduce((min, p) => p[1] < min ? p[1] : min, points[0][1]);
  const max_y = points.reduce((max, p) => p[1] > max ? p[1] : max, points[0][1]);

  return [min_x, min_y, max_x, max_y];
}


function intersect_point(point1, point2, point3, point4) {
   const ua = ((point4[0] - point3[0]) * (point1[1] - point3[1]) -
             (point4[1] - point3[1]) * (point1[0] - point3[0])) /
            ((point4[1] - point3[1]) * (point2[0] - point1[0]) -
             (point4[0] - point3[0]) * (point2[1] - point1[1]));

  const ub = ((point2[0] - point1[0]) * (point1[1] - point3[1]) -
             (point2[1] - point1[1]) * (point1[0] - point3[0])) /
            ((point4[1] - point3[1]) * (point2[0] - point1[0]) -
             (point4[0] - point3[0]) * (point2[1] - point1[1]));

  const x = point1[0] + ua * (point2[0] - point1[0]);
  const y = point1[1] + ua * (point2[1] - point1[1]);

  let out_of_bounds = false;
  if ((ua < 0) | (ua > 1) | (ub < 0) | (ub > 1)) {
    out_of_bounds = true;
  }

  return [x, y, out_of_bounds]
}

function find_min_intersect_segment(point1, point2, points) {
  let dist = 100000000000000;
  let draw_points, res, intersect1, intersect2, intersect_dist;

  for (let i = 0; i < points.length; i++) {
    res = intersect_point(point1, point2, points[i], points[(i + 1) % points.length]);
    if (res[2]) {
      continue;
    } else {
      intersect1 = [res[0], res[1]];
    }
    for (let j = i + 1; j < points.length; j++) {
      res =  intersect_point(point1, point2, points[(j) % points.length], points[(j + 1) % points.length]);
      if (res[2]) {
      continue;
      } else {
        intersect2 = [res[0], res[1]];
      }
      intersect_dist = distance(intersect1, intersect2);
      if (intersect_dist <= dist) {

        dist = intersect_dist;
        draw_points = [intersect1, intersect2];
      }
    }
  }
  return draw_points;
}


function polygon_points(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  let points = [];
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;

    points.push([sx, sy]);
  }
  return points;
}

function draw_angled_lines(points, num_lines, angle) {
  const bounds = bounding_box(points);
  const box_length = Math.abs(bounds[0] - bounds[2]);
  const angle_offset_length = box_length * sin(angle);
  let bottom_point, top_point, draw_points;
  if (angle_offset_length >= 0) {
    bottom_point = [bounds[0], bounds[1]];
    top_point = [bounds[0] - angle_offset_length, bounds[3]];
  } else {
    bottom_point = [bounds[0] + angle_offset_length, bounds[1]];
    top_point = [bounds[0], bounds[3]];
  }
  const total_length = box_length + Math.abs(angle_offset_length);
  const increment_length = total_length / num_lines;

  for (let i = 0; i < num_lines; i++) {
    bottom_point[0] += increment_length;
    top_point[0] += increment_length;
    draw_points = find_min_intersect_segment(bottom_point, top_point, points);
    if (draw_points != null) {
      line(draw_points[0][0], draw_points[0][1], draw_points[1][0], draw_points[1][1]);
      // noStroke();
      // fill(255,0,0);
      // for (var j = 0; j < 1; j += 0.05) {
      //   ellipse(lerp(draw_points[0][0], draw_points[1][0], j),
      //           lerp(draw_points[0][1], draw_points[1][1], j),
      //           5);
      // }
    }
  }
}

function remove_close_points(points, min_threshold) {
    let res = get_min_index(points);
    let index = res[0];
    let min_value = res[1];

    while ((points.length > 2) & (min_value < min_threshold)) {
        points.splice(index, 1);
        res = get_min_index(points)
        index = res[0];
        min_value = res[1];
    }

    return points
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function get_min_index(points) {
    let values = [];
    let min_values = [];

    for (let i = 0; i < points.length - 1; i++) {
        let col_points = [];
        for (let j = 0; j < points.length; j++) {
            if (j != i) {
                col_points.push(distance(points[i], points[j]));
            }
        }
        values.push(col_points);
        min_values.push(min(col_points));
    }

    const point_index = get_arr_min_index(min_values);
    return [point_index, min_values[point_index]];
}

function get_arr_min_index(arr) {
    return arr.reduce((iMax, x, i, arr) => x < arr[iMax] ? i : iMax, 0)
}
