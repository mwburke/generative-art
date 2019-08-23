const frameRate = 20;
const poisson_radius = 40;
const points = sample_method_2(CANVAS_WIDTH, CANVAS_HEIGHT, poisson_radius);
const circle_radius = 200;
let t = 0.01;
let T = 1000;
const color_base = Math.random();

let delaunay;

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz036');
  background(247);

  delaunay = new Delaunator.from(points);

}

function draw() {

    // const point = [
    //     width / 2 + cos(frameCount / 120 * TWO_PI) * (circle_radius * (1 + 0.5 * (noise(t) - 0.5))),
    //     height / 2 + sin(frameCount / 120 * TWO_PI) * (circle_radius * (1 + 0.5 * (noise(t) - 0.5))),
    // ];

    x = noise(t);
    x = map(x, 0, 1, -width * 0.2, width * 1.2);
    y = noise(T);
    y = map(y, 0, 1, -height * 0.2, height * 1.2);
    t = t + 0.01;
    T = T + 0.01;

    const point = [x, y];

    points[points.length - 1] = point;

    const vertices = generate_voronoi_vertices(points);

    const color_value = (color_base + (1 + sin(frameCount / 240 * TWO_PI)) / 6) % 1;

    vertices.forEach(function(points) {
        draw_voronoi_cell(points, point, color_value);
    });

    t += 0.01;

    // background(247, 247, 247, 2);
}


function sample_method_2(width, height, radius) {
    let points = [];
    let sampler = poissonDiscSampler(width,
                                     height,
                                     radius);
    let sample;

    while ((sample = sampler())) {
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

function draw_shape(points) {

    beginShape();
    points.forEach(function(point) {
        vertex(point[0], point[1]);
    })
    vertex(points[0][0], points[0][1]);
    endShape();
}


function draw_voronoi_cell(points, point, color_value) {
    const center = get_center(points);

    if (distance(point, center) < 30) {
        push();
        colorMode(HSB, 1);
        noStroke();
        fill(color_value, 80, 80);
        draw_shape(points);
        pop();
    }
    // } else {
    //     noFill();
    //     noStroke();
    // }
    // draw_shape(points);
}

function get_center(points) {
    const num_points = points.length;
    const x = points.reduce((s, el) => s + el[0], 0) / num_points;
    const y = points.reduce((s, el) => s + el[1], 0) / num_points;

    return [x, y];
}
