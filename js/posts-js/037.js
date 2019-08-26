let min_dist;
let num_edges;
let num_random_points;
let num_layer_points;
let num_layers;
let point_strategy;
let line_thickness;
let draw_lines = null;
let background_color;
let color_1;
let color_2;

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz037');

  textAlign(LEFT);

  num_edges = createSlider(3, 10, 6, 1);
  num_edges.position(myCanvas.position().x + 10, myCanvas.position().y + 20);
  num_edges.style('width', '100px');

  min_dist = createSlider(0, 40, 16, 1);
  min_dist.position(myCanvas.position().x + 10, myCanvas.position().y + 50);
  min_dist.style('width', '100px');

  num_layers = createSlider(1, 10, 8, 1);
  num_layers.position(myCanvas.position().x + 10, myCanvas.position().y + 80);
  num_layers.style('width', '100px');

  num_layer_points = createSlider(0, 50, 25,  1);
  num_layer_points.position(myCanvas.position().x + 10, myCanvas.position().y + 110);
  num_layer_points.style('width', '100px');

  num_random_points = createSlider(0, 200, 10, 1);
  num_random_points.position(myCanvas.position().x + 10, myCanvas.position().y + 140);
  num_random_points.style('width', '100px');

  line_thickness = createSlider(0.1, 3, 1.5, 0.1);
  line_thickness.position(myCanvas.position().x + 10, myCanvas.position().y + 170);
  line_thickness.style('width', '100px');

  textAlign(CENTER);
  point_strategy = createSelect();
  point_strategy.position(myCanvas.position().x + 10, myCanvas.position().y + 200);
  point_strategy.option('closest');
  point_strategy.option('furthest');
  point_strategy.option('random');


  color_1 = createColorPicker(color(64, 111, 255));
  color_1.position(myCanvas.position().x + 10, myCanvas.position().y + 230);
  color_2 = createColorPicker(color(203, 0, 43));
  color_2.position(myCanvas.position().x + 10, myCanvas.position().y + 260);
  background_color = createColorPicker(247);
  background_color.position(myCanvas.position().x + 10, myCanvas.position().y + 290);

  generate();
}

function draw() {
}


function generate() {
    background(background_color.color());
    text("")
    text("Number of edges", 165, 33);
    text("Min dist between points", 180, 63);
    text("Number of layers", 162, 93);
    text("Number of layer points", 178, 123);
    text("Number of random points", 183, 153);
    text("Line thickness", 155, 183);
    text("Point ordering", 155, 213);
    text("First color", 90, 243);
    text("Second color", 100, 273);
    text("Background color", 112, 303);

    const vertices = polygon_points(width / 2, height / 2, 180, num_edges.value());

    let points = [];

    for (let i = 0; i < num_random_points.value(); i++) {
        let new_point = [Math.random() * width, Math.random() * height];
        while (!coordsAreInside(new_point, vertices)) {
            new_point = [Math.random() * width, Math.random() * height];
        }
        points.push(new_point);
    }

    const center = [width / 2, height / 2];

    for (let i = 0; i < num_layers.value(); i++) {

        let new_vertices = [];
        vertices.forEach(function(vertex) {
            const new_x = lerp(vertex[0], center[0], (i / num_layers.value()));
            const new_y = lerp(vertex[1], center[1], (i / num_layers.value()));

            new_vertices.push([new_x, new_y]);
        })

        for (let j = 0; j < num_layer_points.value() / (1 - i / num_layers.value()); j++) {
            const angle = Math.random() * TWO_PI;
            const angle_point = [width / 2 + 300 * cos(angle), height / 2 + 300 * sin(angle)];

            for (let m = 0; m < num_edges.value(); m++) {
                const res = intersect_point(center, angle_point, new_vertices[m], new_vertices[(m + 1) % num_edges.value()])
                if (!res[2]) {
                    points.push([res[0], res[1]]);
                }
            }
        }
    }

    remove_close_points(points, min_dist.value())

    // TODO: remove after testing
    // points.forEach(function(point) {
    //     fill(0);
    //     ellipse(point[0], point[1], 5)
    // });

    if (point_strategy.value() == 'random') {
        shuffle(points);
    } else if (point_strategy.value() == 'closest') {
        let temp_point_array = [points.pop()];
        while (points.length > 0) {
            let min_dist = distance(temp_point_array[temp_point_array.length - 1], points[0]);
            let index = 0;
            for (let i = 1; i < points.length - 1; i++) {
                if (distance(temp_point_array[temp_point_array.length - 1], points[i]) < min_dist) {
                    min_dist = distance(temp_point_array[temp_point_array.length - 1], points[i])
                    index = i;
                }
            }
            temp_point_array.push(points.splice(index, 1)[0])
        }
        points = temp_point_array;
    } else if (point_strategy.value() == 'furthest') {
        let temp_point_array = [points.pop()];
        while (points.length > 0) {
            let max_dist = distance(temp_point_array[temp_point_array.length - 1], points[0]);
            let index = 0;
            for (let i = 1; i < points.length - 1; i++) {
                if (distance(temp_point_array[temp_point_array.length - 1], points[i]) > max_dist) {
                    max_dist = distance(temp_point_array[temp_point_array.length - 1], points[i])
                    index = i;
                }
            }
            temp_point_array.push(points.splice(index, 1)[0])
        }
        points = temp_point_array;
    }


    for (let i = 0; i < points.length - 1; i++) {
        draw_line_segment(points[i], points[i + 1], i / points.length);
    }
}

function draw_line_segment(point1, point2, ratio) {
    push();
    translate(width / 5, 0);
    noFill();
    stroke(lerpColor(color_1.color(), color_2.color(), ratio));
    strokeWeight(line_thickness.value());
    line(point1[0], point1[1], point2[0], point2[1]);
    pop();
}

// Taken from: https://stackoverflow.com/questions/1119627/how-to-test-if-a-point-is-inside-of-a-convex-polygon-in-2d-integer-coordinates
function Vec2(x, y) {
  return [x, y]
}
Vec2.nsub = function (v1, v2) {
  return Vec2(v1[0]-v2[0], v1[1]-v2[1])
}
// aka the "scalar cross product"
Vec2.perpdot = function (v1, v2) {
  return v1[0]*v2[1] - v1[1]*v2[0]
}

// Determine if a point is inside a polygon.
//
// point     - A Vec2 (2-element Array).
// polyVerts - Array of Vec2's (2-element Arrays). The vertices that make
//             up the polygon, in clockwise order around the polygon.
//
function coordsAreInside(point, polyVerts) {
  var i, len, v1, v2, edge, x
  // First translate the polygon so that `point` is the origin. Then, for each
  // edge, get the angle between two vectors: 1) the edge vector and 2) the
  // vector of the first vertex of the edge. If all of the angles are the same
  // sign (which is negative since they will be counter-clockwise) then the
  // point is inside the polygon; otherwise, the point is outside.
  for (i = 0, len = polyVerts.length; i < len; i++) {
    v1 = Vec2.nsub(polyVerts[i], point)
    v2 = Vec2.nsub(polyVerts[i+1 > len-1 ? 0 : i+1], point)
    edge = Vec2.nsub(v1, v2)
    // Note that we could also do this by using the normal + dot product
    x = Vec2.perpdot(edge, v1)
    // If the point lies directly on an edge then count it as in the polygon
    if (x < 0) { return false }
  }
  return true
}




function keyPressed() {
  if (key == 'r') {
    // num_squares = 20 - Math.floor(Math.random() * 2) * 10
    generate();
  }
}
