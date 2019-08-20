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
    background(247);
    const point_options = ['simple_circle', 'random', 'sloping_field', 'even_jitter'];
    const point_method = point_options[Math.floor(Math.random() * point_options.length)];
    points = gen_points(point_method);
    // push();

    // draw_points(points);
    // pop();
    generate_delaunay_triangles(points);
    // create_dist_matrix();
    push();
    // translate(width / 2, height / 2);
    draw_merged_triangles();
    pop();
    // draw_delaunay_triangles(points);
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


function generate_delaunay_triangles(points) {
    delaunay = new Delaunator.from(points);
    dl_triangles = [];
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
    push();
    // translate(width / 2, height / 2);
    for (var i = 0; i < dl_triangles.length; i++) { // i < dl_triangles.length
        let t = dl_triangles[i];
        // console.log('about to check', t);
        if (!t.visited) {
            let adjacent = trianglesAdjacentToTriangle(delaunay, i);
            let closest = null;
            let closest_dist = 100000;
            adjacent.forEach(function(tri) {
                let tri_dist = distance(t.centroid, dl_triangles[tri].centroid);
                if ((tri_dist < closest_dist) & (!dl_triangles[tri].visited)) {
                    closest = tri;
                    closest_dist = tri_dist;
                }
            });

            if (closest == null) {
                draw_triangle(t.points);
                dl_triangles[i].visited = true;
            } else {
                let all_points = t.points.concat(dl_triangles[closest].points);
                let ordered_points = get_unique_clockwise_points(all_points, HALF_PI);
                draw_quadrilateral(ordered_points);
                dl_triangles[i].visited = true;
                dl_triangles[closest].visited = true;
            }
        }
    }
    pop();
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
                points.push([width / 2, height / 2]);
            } else {
                const start_rotation = Math.random() * QUARTER_PI;
                for (var j = 0; j < i * 4; j++) {
                    point_adjust = 0; //Math.random() * QUARTER_PI / 2;
                    points.push([width / 2 + cos(start_rotation + j / (i * 4) * TWO_PI + point_adjust) * i * dist_between_circles, // * (0.9 + Math.random() * 0.1),
                                 height / 2 + sin(start_rotation + j / (i * 4) * TWO_PI + point_adjust) * i * dist_between_circles]); // * (0.9 + Math.random() * 0.1)]);
                }
            }
        }
    } else if (type == 'random') {
        for (var i = 0; i < 300; i++) {
            points.push([width * Math.random(), height * Math.random()]);
        }
    } else if (type == 'sloping_field') {
        const num_points = 20;
        for (var i = 0; i < num_points + 5; i++) {
            for (var j = 0; j < num_points; j++) {
                points.push([
                    width / num_points * i * (1 - j / num_points / 6),
                    height / num_points * j
                ]);
            }
        }
    } else if (type == 'even_jitter') {
        const num_points = 20;
        for (var i = 0; i < num_points + 5; i++) {
            for (var j = 0; j < num_points; j++) {
                points.push([
                    (width * 1.2) / num_points * i + (width * 1.2) / num_points * Math.random() * 0.3,
                    (height * 1.2) / num_points * j + (height * 1.2) / num_points * Math.random() * 0.3
                ]);
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
        // this.centroid = circumcenter(points[0], points[1], points[2]);
        this.centroid = triangle_center(points[0], points[1], points[2]);
    }
}

function distance(v1, v2) {
    return ((v1[0]-v2[0])**2 + (v1[1]-v2[1])**2)**0.5
}

function triangle_center(p1, p2, p3) {
    let x = math.mean([p1[0], p2[0], p3[0]]);
    let y = math.mean([p1[1], p2[1], p3[1]]);
    return [x, y];
}

function quad_center(p1, p2, p3, p4) {
    const x = math.mean([p1[0], p2[0], p3[0], p4[0]]);
    const y = math.mean([p1[1], p2[1], p3[1], p4[1]]);
    return [x, y];
}

function draw_triangle(points) {
    // push();
    // colorMode(HSB, 1);
    // noStroke();
    // fill(Math.random(), 1, 1)
    // triangle(points[0][0], points[0][1],
    //          points[1][0], points[1][1],
    //          points[2][0], points[2][1]
    // );
    // pop();
}

function draw_quadrilateral(points) {
    push();
    // beginShape();
    // colorMode(HSB, 1);
    // noStroke();
    // fill(Math.random(), 1, 1);
    // points.forEach(function(point) {
    //     vertex(point[0], point[1]);
    // })
    // endShape();

    const new_points = [];

    points.forEach(function(point) {
        new_points.push(createVector(point[0], point[1]));
    });

    draw_leaf(new_points);
    draw_leaf([new_points[0], new_points[3], new_points[2], new_points[1]]);
    // draw_leaf2(new_points);

    pop();
}

function get_unique_clockwise_points(points, startAng=0) {
    // get unique points, order them clockwise
    // direction is north, south, east, west??
    let unique_points = unique(points);
    const center = quad_center(points[0], points[1], points[2], points[3]);
    unique_points.forEach(point => {
        let ang = Math.atan2(point[1] - center[1], point[0] - center[0]);
        if(!startAng){ startAng = ang }
        else {
             if(ang < startAng){  // ensure that all points are clockwise of the start point
                 ang += Math.PI * 2;
             }
        }
        point.angle = ang; // add the angle to the point
     });


 // Sort clockwise;
 points.sort((a,b)=> a.angle - b.angle);
 return unique(points)
}

function draw_leaf(points) {

  curveTightness(-0.3);
  strokeWeight(2);
  stroke(0);
  fill(0);

  let p1 = p5.Vector.lerp(points[1], points[2], 0.6);
  let p2 = p5.Vector.lerp(points[0], points[2], 0.9);
  let p3 = p5.Vector.lerp(points[1], points[3], 0.80)
  let p4 = p5.Vector.lerp(points[0], points[2], 0.06);

  beginShape();
  curveVertex(p1.x, p1.y);
  curveVertex(p2.x, p2.y);
  curveVertex(p3.x, p3.y);
  curveVertex(p4.x, p4.y);
  curveVertex(p4.x, p4.y);
  endShape();

}

function draw_leaf2(points) {
  // strokeCap(ROUND);
  curveTightness(-0.2);
  strokeWeight(2);
  stroke(0);
  fill(0);

  let p1 = p5.Vector.lerp(points[1], points[2], 0.5);
  let p1_reverse = p5.Vector.lerp(points[3], points[2], 0.5);
  let p2 = p5.Vector.lerp(points[0], points[2], 0.95);
  let p23 = p5.Vector.lerp(points[2], points[3], 0.75);
  let p23_reverse = p5.Vector.lerp(points[2], points[1], 0.75);
  let p3 = p5.Vector.lerp(points[1], p23, 0.95)
  let p3_reverse = p5.Vector.lerp(points[3], p23_reverse, 0.95);
  let p4 = p5.Vector.lerp(points[3], points[0], 0.8);
  let p4_reverse = p5.Vector.lerp(points[1], points[0], 0.8);
  let p_5 = p5.Vector.lerp(p4, points[1], 0.09);
  let p_5_reverse = p5.Vector.lerp(p4_reverse, points[3], 0.09);
  let p6 = p5.Vector.lerp(points[0], points[2], 0.05);

  beginShape();
  curveVertex(p1.x, p1.y);
  curveVertex(p2.x, p2.y);
  curveVertex(p3.x, p3.y);
  curveVertex(p_5.x, p_5.y);
  vertex(p6.x, p6.y);
  curveVertex(p_5_reverse.x, p_5_reverse.y);
  curveVertex(p3_reverse.x, p3_reverse.y);
  curveVertex(p2.x, p2.y);
  curveVertex(p1_reverse.x, p1_reverse.y);
  endShape();

}


function keyPressed() {
  if (key == 'R') {
    // num_squares = 20 - Math.floor(Math.random() * 2) * 10
    generate();
  }
}
