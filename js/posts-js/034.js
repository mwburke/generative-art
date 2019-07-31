let points;
let delaunay;
let dl_triangles = [];
let dist_matrix;
const dist_between_circles = 35;
let global_merge_count = 0;

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz034');
  generate();
}

function draw() {

}

function generate() {
    points = gen_points('simple_circle');
    draw_points(points);
    generate_delaunay_triangles(points);
    draw_delaunay_triangles(points);
    create_dist_matrix();
}


function draw_points(points) {
    push();
    fill(0);
    ellipseMode(CENTER);
    translate(width / 2, height / 2);
    for (var i = 0; i < points.length; i++) {
        ellipse(points[i][0], points[i][1], 10, 10);
    }
    pop();
}

/* TODO: split out delaunay triangle creation
 * Create triangles as objects in array, track
 * points, centroids, visited or not
 * Generate distance array of all triangle centroids
 * to all others.
 * Use this to do all of the quadrilateral drawing
 * stuff. Loop through all triangles based on their
 * ids/order in the triangle array. Then for each,
 * find the closest triangle based on centroid,
 * (assuming these are touching, probably wrong
 * but this was the easiest heuristic to do this).
 * Draw whatever in the quadrilateral and then mark
 * both as visited.
 */

function generate_delaunay_triangles(points) {
    delaunay = new Delaunator.from(points);
    for (let triangle_id = 0; triangle_id < delaunay.triangles.length / 3; triangle_id++) {
        let triangle_points = [];
        for (var i = 0; i < 3; i++) {
            let halfedge_id = 3 * triangle_id + i;
            let point_id = delaunay.triangles[halfedge_id];
            triangle_points.push(points[point_id]);
            // const centroid = circumcenter(triangle_points[0], triangle_points[1], triangle_points[2]);
        }
        dl_triangles.push(new delaunayTriangle(triangle_id, triangle_points));
    }
}

function draw_merged_triangles() {
    for (var i = 0; i < dl_triangles.length; i++) {
        let t = dl_triangles[i];
        if (~t.visited) {

        }
    }
}


function draw_delaunay_triangles(points) {
    push();
    translate(width / 2, height / 2);

    for (var i = 0; i < dl_triangles.length; i++) {
        let triangle_points = dl_triangles[i].points;
        // fill(250 - triangle_id / 2, 0, 0);
        noFill();
        stroke(0);
        beginShape();
        vertex(triangle_points[0][0], triangle_points[0][1]);
        vertex(triangle_points[1][0], triangle_points[1][1]);
        vertex(triangle_points[2][0], triangle_points[2][1]);
        endShape(CLOSE);

        const centroid = dl_triangles[i].centroid;
        text(i, centroid[0] - 4, centroid[1] + 4);
    }
    pop();
}

function gen_points(type) {
    var points = [];

    if (type == 'simple_circle') {
        for (var i = 0; i < 8; i++) {
            if (i == 0) {
                points.push([0, 0]);
            } else {
                const start_rotation = Math.random() * QUARTER_PI;
                for (var j = 0; j < i * 4; j++) {
                    point_adjust = 0; //Math.random() * QUARTER_PI / 2;
                    points.push([cos(start_rotation + j / (i * 4) * TWO_PI + point_adjust) * i * dist_between_circles, // * (0.9 + Math.random() * 0.1),
                                 sin(start_rotation + j / (i * 4) * TWO_PI + point_adjust) * i * dist_between_circles]); // * (0.9 + Math.random() * 0.1)]);
                }
            }
        }
    }

    return points;
}

function create_dist_matrix() {
    dist_matrix = math.zeros(dl_triangles.length, dl_triangles.length);
    dist_matrix = dist_matrix.map(function(value, index, matrix) {
        return distance(dl_triangles[index[0]].centroid, dl_triangles[index[1]].centroid);
    })
}

class delaunayTriangle {
    constructor(id, points) {
        this.id = id;
        this.points = points;
        this.visited = false;
        this.centroid = circumcenter(points[0], points[1], points[2]);
    }
}

function distance(v1, v2) {
    return ((v1[0]-v2[0])**2 + (v1[1]-v2[1])**2)**0.5
}
