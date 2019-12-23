const poisson_radius = 90;
let points;

const strip_width = 10;
const egg_curve_width = 5;
const egg_max_curve = 0.3;
const egg_min_curve = 0.1;
const max_yolk_offset = 10;
const yolk_radius = 25;

let delaunay;
let sides_visited;

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz042');
  generate();
}

function generate() {
    points = sample_method_2(CANVAS_WIDTH, CANVAS_HEIGHT, poisson_radius);
    delaunay = new Delaunator.from(points);

    sides_visited = []
    let vertices = generate_voronoi_vertices(points);

    background(219, 255, 253);
    vertices.forEach(function(points) {
        draw_cell(points);
        draw_egg(points);
    });
}


function keyPressed() {
  if (key == 'r') {
    generate();
  }
}

function sample_method_2(width, height, radius) {
    let points = [];
    let sampler = poissonDiscSampler(width * 1.5,
                                     height * 1.5,
                                     radius);
    let sample;

    while ((sample = sampler())) {
        sample = [sample[0] - width * 0.25, sample[1] - height * 0.25]
        points.push(sample);
    }
    return points;
}



function generate_voronoi_vertices(points) {
    const seen = new Set();
    const voronoi_vertices = [];
    const delaunay = new Delaunator.from(points);
    // delaunay.update();

    for (let e = 0; e < delaunay.triangles.length; e++) {
        const p = delaunay.triangles[nextHalfedge(e)];
        if (!seen.has(p)) {
            seen.add(p);
            const edges = edgesAroundPoint(delaunay, e);
            const triangles = edges.map(triangleOfEdge);
            const vertices = triangles.map(t => triangleCenter(points, delaunay, t));
            voronoi_vertices.push(vertices);
        }
    }
    return voronoi_vertices;
}

function draw_egg(points) {
    if (points.length > 2) {
        push();

        center = get_center(points);

        curveTightness(-0.2)
        stroke(0);
        strokeWeight(3);
        beginShape();
        start_end = [lerp(lerp(points[0][0], points[1][0], 0.5), center[0], egg_max_curve),
                     lerp(lerp(points[0][1], points[1][1], 0.5), center[1], egg_max_curve)];

        curveVertex(start_end[0], start_end[1]);

        for (let i = 0; i < points.length; i++) {
            if (distance(points[i % points.length], points[(i + 1) % points.length]) >= 30) {
                point1 = [
                    lerp(lerp(points[i % points.length][0], points[(i + 1) % points.length][0], 0.5), center[0], egg_max_curve),
                    lerp(lerp(points[i % points.length][1], points[(i + 1) % points.length][1], 0.5), center[1], egg_max_curve)
                ];
                point2 = [
                    lerp(lerp(points[(i + 1) % points.length][0], points[(i + 2) % points.length][0], 0.5), center[0], egg_max_curve),
                    lerp(lerp(points[(i + 1) % points.length][1], points[(i + 2) % points.length][1], 0.5), center[1], egg_max_curve)
                ];

                curveVertex(
                    point1[0],
                    point1[1]
                );

                curveVertex(
                    lerp(lerp(point1[0], point2[0], 0.5), center[0], egg_min_curve),
                    lerp(lerp(point1[1], point2[1], 0.5), center[1], egg_min_curve)
                );
            }
        }

        const add_one = distance(points[0], points[1]) <= 30;

        point1 = [
            lerp(lerp(points[0 + add_one * 1][0], points[1 + add_one * 1][0], 0.5), center[0], egg_max_curve),
            lerp(lerp(points[0 + add_one * 1][1], points[1 + add_one * 1][1], 0.5), center[1], egg_max_curve)
        ];
        point2 = [
            lerp(lerp(points[1 + add_one * 1][0], points[2 + add_one * 1][0], 0.5), center[0], egg_max_curve),
            lerp(lerp(points[1 + add_one * 1][1], points[2 + add_one * 1][1], 0.5), center[1], egg_max_curve)
        ];

        curveVertex(
            point1[0],
            point1[1]
        );

        curveVertex(
            lerp(lerp(point1[0], point2[0], 0.5), center[0], egg_min_curve),
            lerp(lerp(point1[1], point2[1], 0.5), center[1], egg_min_curve)
        );

        endShape();
        pop();
    }

    draw_yolk(points);
}

function draw_yolk(points) {
    // TODO
    push();
    center = get_center(points);
    center[0] += (Math.random() - 0.5) * max_yolk_offset;
    center[1] += (Math.random() - 0.5) * max_yolk_offset;

    // noStroke()
    stroke(0)
    strokeWeight(3)
    fill(255, 239, 8)
    circle(center[0], center[1], yolk_radius)
    pop();
}

function draw_bacon(points, strip_width) {

    let v1 = createVector(points[0][0], points[0][1]);
    let v2 = createVector(points[1][0], points[1][1]);
    const l = v1.dist(v2);
    const wiggle = l / 25;

    v2 = v2.sub(v1);

    push();
    // start at first point and rotate towards second
    // this makes calculations a lot easier
    strokeCap(SQUARE);
    translate(points[0][0], points[0][1]);

    const angle = atan2(v2.y, v2.x) - PI / 2;

    rotate(angle);

    // main bacon piece
    noFill();
    stroke(179, 74, 29);
    strokeWeight(strip_width);
    draw_strip(l, wiggle, 0);
    stroke(255, 247, 219);
    strokeWeight(strip_width / 5);
    draw_strip(l, wiggle, strip_width * 0.25);
    draw_strip(l, wiggle, -strip_width * 0.25);

    pop();
}

function draw_strip(l, wiggle, offset) {
    beginShape();
    vertex(0 + offset,
           lerp(0, l, 0.1));
    curveVertex(
        -wiggle + offset,
        lerp(0, l, 0.1)
    );
    curveVertex(
        wiggle + offset,
        lerp(0, l, 0.3)
    );
    curveVertex(
        -wiggle + offset,
        lerp(0, l, 0.5)
    );
    curveVertex(
        wiggle + offset,
        lerp(0, l, 0.7)
    );
    curveVertex(
        -wiggle + offset,
        lerp(0, l, 0.9)
    );
    vertex(0 + offset,
           lerp(0, l, 0.9));
    endShape();
}


function get_center(points) {
    const num_points = points.length;
    const x = points.reduce((s, el) => s + el[0], 0) / num_points;
    const y = points.reduce((s, el) => s + el[1], 0) / num_points;

    return [x, y];
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}


function draw_cell(points) {
    for (let i = 0; i < points.length - 1; i++) {
        if ((points[i][0] > -width * 0.2) &
            (points[i][0] < width * 1.2) &
            (points[i][1] > -height * 0.2) &
            (points[i][1] < height * 1.2) &
            (points[i + 1][0] > -width * 0.2) &
            (points[i + 1][0] < width * 1.2) &
            (points[i + 1][1] > -height * 0.2) &
            (points[i + 1][1] < height * 1.2)) {

            if (points[i][0] < points[i + 1][0]) {
                point1 = points[i];
                point2 = points[i + 1]
            } else {
                point1 = points[i + 1];
                point2 = points[i]
            }

            if (~containsObject([point1, point2], sides_visited)) {
                draw_bacon([point1, point2], strip_width);
                sides_visited.push([point1, point2]);
            }
        }

        // noFill()
        // stroke(0)
        // line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1])
    }
}


