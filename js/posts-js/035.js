let first_color;
let second_color;
let include_color;

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz035');
  generate();
}

function draw() {

}


function generate() {
	include_color = true; // (Math.random() < 0.70) ? true : false;
	console.log(include_color);
	first_color = Math.random();
	second_color = Math.random();

	push();
	translate(-width * 0.2, -height * 0.2);
    background(247);
    const circle_radius = 40;
    const num_points = 600;
    // let points = sample_method_1(width, height, num_points);
    let points = sample_method_2(width, height, circle_radius);

    const min_threshold = 80;
    // if sample_method_1 is used:
    // remove_close_points(points, min_threshold);

    const vertices = generate_voronoi_vertices(points);

    vertices.forEach(function(points) {
        draw_voronoi_cell(points);
    });
    pop();
}

function sample_method_1(width, height, num_points) {
    let points = [];
    for (let i = 0; i < num_points; i++) {
        points.push(
            [Math.random() * width,
             Math.random() * height
            ]
        );
    }
    return points;
}

function sample_method_2(width, height, radius) {
    let points = [];
    let sampler = poissonDiscSampler(width * 1.5,
                                     height * 1.5,
                                     radius);
    let sample;

    while ((sample = sampler())) {
        points.push(sample);
    }
    return points;
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

function generate_voronoi_vertices(points) {
    const seen = new Set();
    const delaunay = new Delaunator.from(points);
    const voronoi_vertices = [];

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

function draw_shape(points) {
    beginShape();
    points.forEach(function(point) {
        vertex(point[0], point[1]);
    })
    vertex(points[0][0], points[0][1]);
    endShape();
}

function get_center(points) {
    const num_points = points.length;
    const x = points.reduce((s, el) => s + el[0], 0) / num_points;
    const y = points.reduce((s, el) => s + el[1], 0) / num_points;

    return [x, y];
}


function draw_voronoi_cell(points) {
    push();

    const center = get_center(points);
    if (include_color) {
		colorMode(HSB, 1);
		const ratio = center[1] / height;
		const color1 = first_color;
		const color2 = second_color;
		const draw_color = lerp(color1, color2, ratio);
		colorMode(HSB, 1);
		stroke(draw_color, 0.9, 0.7);
	} else {
		colorMode(RGB);
		stroke(0);
	}
    noFill();
    strokeWeight(3);
    const new_points = [];
    points.forEach(function(point) {
        const new_x = lerp(point[0], center[0], 0.15);
        const new_y = lerp(point[1], center[1], 0.15);
        new_points.push([new_x, new_y]);
    })
    draw_angled_lines(new_points, 10, Math.random() * TWO_PI);
    draw_shape(new_points);
    pop();
}



function keyPressed() {
  if (key == 'R') {
    // num_squares = 20 - Math.floor(Math.random() * 2) * 10
    generate();
  }
}
