// Inspired by mandalapy
// https://github.com/CarlosFocil/mandalapy
// This is the original R version:
// https://fronkonstin.com/2018/02/14/mandalas/
let myCanvas;

function setup() {
    myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    // var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);
    myCanvas.parent('viz047');
    // translate(-width / 2, -height / 2);
    // setAttributes('antialias', true);
    generate();
}

const palettes = [
    'https://coolors.co/78c0e0-449dd1-192bc2-150578-0e0e52',
    'https://coolors.co/201e1f-ff4000-faaa8d-feefdd-50b2c0',
    'https://coolors.co/ea7af4-b43e8f-6200b3-3b0086-290628',
    'https://coolors.co/2f4b26-3e885b-85bda6-bedcfe-c0d7bb',
    'https://coolors.co/2176ae-57b8ff-b66d0d-fbb13c-fe6847',
    'https://coolors.co/ec91d8-ffaaea-ffbeef-ffd3da-e9d3d0',
    'https://coolors.co/555b6e-89b0ae-bee3db-faf9f9-ffd6ba',
    'https://coolors.co/32cbff-00a5e0-89a1ef-ef9cda-fecef1',
    'https://coolors.co/3a405a-f9dec9-99b2dd-e9afa3-685044',
    'https://coolors.co/f9dbbd-ffa5ab-da627d-a53860-450920'
];

function get_palette(url) {
    slash_split = url.split("/");
    color_text = slash_split[slash_split.length - 1];
    color_values = color_text.split("-");

    palette = []

    color_values.forEach(function (value) {
        palette.push(color("#" + value))
    });

    return palette;
}


function generate() {
    background(247)

    const num_iter = getRandomInt(3, 5);
    let num_points_list = [];
    if (Math.random() <= 0.3) {
        num_points_list = [getRandomInt(3, 7)];
    } else {
        for (let i = 0; i < num_iter; i++) {
            num_points_list.push(getRandomInt(3, 7));
        }
    }

    let radius_list = [];
    if (Math.random() <= 0.4) {
        radius_list = [0.5 + Math. random() * 2];
    } else {
        for (let i = 0; i < num_iter; i++) {
            radius_list.push(0.5 + Math.random() * 2);
        }
    }
    const keep_all_points = Math.random() < 0.6;

    console.log({
        'num_iter': num_iter,
        'num_points_list': num_points_list,
        'radius_list': radius_list,
        'keep_app_points': keep_all_points
    })

    let points = generate_points(num_iter, num_points_list, radius_list, keep_all_points);

    const polygons = generate_voronoi_vertices(points);


    let new_polygons = [];

    for (let i = 0; i < polygons.length; i++) {
        let x_values = polygons[i].map(e => e[0]);
        let y_values = polygons[i].map(e => e[1]);
        const x_max = Math.max(...x_values);
        const y_max = Math.max(...y_values);
        if ((y_max < height * 1.7) & (x_max < width * 1.7)) {
            new_polygons.push(polygons[i])
        }
    }

    const palette = get_palette(rand(palettes));

    const draw_function = rand(draw_functions);

    draw_polygons(new_polygons, draw_function, palette, num_points_list)
}


function draw_polygons(polygons, draw_function, palette, num_points_list) {
    const c = rand(palette);
    for (let i = 0; i < polygons.length; i++) {
        draw_function(polygons[i], palette, num_points_list, c);
    }
}


const draw_functions = [
    function draw_outline(points, palette, num_points_list, c) {
        push();
        noFill();
        stroke(0);
        beginShape();
        for (let i = 0; i < points.length; i++) {
            vertex(points[i][0], points[i][1])
        }
        endShape(CLOSE);
    },
    function random_fill_from_palette(points, palette, num_points_list, c) {
        c = rand(palette);
        push();
        fill(c);
        // noStroke();
        beginShape();
        for (let i = 0; i < points.length; i++) {
            vertex(points[i][0], points[i][1])
        }
        endShape(CLOSE);
    },
    function random_stroke_from_palette(points, palette, num_points_list, c) {
        c = rand(palette);
        push();
        noFill();
        stroke(c);
        beginShape();
        for (let i = 0; i < points.length; i++) {
            vertex(points[i][0], points[i][1])
        }
        endShape(CLOSE);
    },
    // function random_stroke_from_palette(points, palette, num_points_list, c) {
    //     c = rand(palette);
    //     push();
    //     stroke(c);
    //     noFill();
    //     beginShape();
    //     for (let i = 0; i < points.length; i++) {
    //         vertex(points[i][0], points[i][1])
    //     }
    //     endShape(CLOSE);
    // },
    function random_symmetric(points, palette, num_points_list, c) {
        const num_points = num_points_list[0];
        // const centroid = get_polygon_centroid(points);
        const centroid = get_center(points);
        let ang = Math.atan2(height / 2 - centroid[1], width / 2 - centroid[0]);
        ang = ang % (PI * 2 / num_points);

        const radius = distance(centroid, [width / 2, height / 2]) / 20;

        if (isFinite(radius)) {
            const noise_val = noise(ang, radius);

            const c = palette[Math.floor(noise_val * palette.length)];

            push();
            fill(c);
            noStroke();
            beginShape();
            for (let i = 0; i < points.length; i++) {
                vertex(points[i][0], points[i][1])
            }
            endShape(CLOSE);
        }
    },
    function fill_white_to_color_distance(points, palette, num_points_list, c) {
        const centroid = get_center(points);
        const max_length = distance([0, 0], [width / 2, height / 2])
        push();
        beginShape();
        for (let i = 0; i < points.length; i++) {
            vertex(points[i][0], points[i][1])
            fill(lerpColor(color(247), c, distance([points[i][0], points[i][1]], [width / 2, height / 2]) / max_length));
        }
        endShape(CLOSE);
    },
    function fill_color_to_color_distance(points, palette, num_points_list, c) {
        const c1 = rand(palette);
        let c2 = rand(palette);
        while (c2 == c1) {
            c2 = rand(palette);
        }
        const centroid = get_center(points);
        const max_length = distance([0, 0], [width / 2, height / 2])
        push();
        beginShape();
        for (let i = 0; i < points.length; i++) {
            fill(lerpColor(c1, c2, distance([points[i][0], points[i][1]], [width / 2, height / 2]) / max_length));
            vertex(points[i][0], points[i][1])
        }
        endShape(CLOSE);
        pop();
    },
    function stroke_white_to_color_distance(points, palette, num_points_list, c) {
        const centroid = get_center(points);
        const max_length = distance([0, 0], [width / 2, height / 2])
        push();
        noStroke();
        beginShape();
        for (let i = 0; i < points.length; i++) {
            vertex(points[i][0], points[i][1])
            stroke(lerpColor(color(247), c, distance([points[i][0], points[i][1]], [width / 2, height / 2]) / max_length));
        }
        endShape(CLOSE);
    },
]

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 */
function generate_points(num_iter, num_points_list, radius_list, keep_all_points) {
    let points = [[0, 0]];
    for (let i = 0; i < num_iter; i++) {
        let new_points = [];
        let radius;
        let num_points;
        if (num_points_list.length == 1) {
            num_points = num_points_list[0]
        } else {
            num_points = num_points_list[i];
        }

        if (radius_list.length == 1) {
            radius = radius_list[0];
        } else {
            radius = radius_list[i];
        }

        let angles = [];
        for (let j = 0; j < num_points; j++) {
            angles.push(2 * PI / (num_points) * j);
        }

        for (let k = 0; k < points.length; k++) {
            for (let j = 0; j < angles.length; j++) {
                new_points.push([
                    points[k][0] + radius ** i * cos(angles[j]),
                    points[k][1] + radius ** i * sin(angles[j])

                ])
            }
        }

        if (keep_all_points) {
            points = points.concat(new_points);
        } else {
            points = new_points;
        }

    }

    let v = points.map(e => e[0]);

    const max_value = Math.max(...v) * 1;

    let new_points = [];

    for (let i = 0; i < points.length; i++) {

        new_points.push([
            (points[i][0] + max_value / 2) * width / max_value,
            (points[i][1] + max_value / 2) * width / max_value
        ])
    }

    return new_points;
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


function get_center(points) {
    const num_points = points.length;
    const x = points.reduce((s, el) => s + el[0], 0) / num_points;
    const y = points.reduce((s, el) => s + el[1], 0) / num_points;

    return [x, y];
}


function get_unique_clockwise_points(points, startAng = 0) {
    // get unique points, order them clockwise
    // direction is north, south, east, west??
    let unique_points = unique(points);
    const center = get_center(points);
    unique_points.forEach(point => {
        let ang = Math.atan2(point[1] - center[1], point[0] - center[0]);
        if (!startAng) { startAng = ang }
        else {
            if (ang < startAng) {  // ensure that all points are clockwise of the start point
                ang += Math.PI * 2;
            }
        }
        point.angle = ang; // add the angle to the point
    });


    // Sort clockwise;
    points.sort((a, b) => a.angle - b.angle);
    return unique(points)
}

function get_polygon_centroid(pts) {
    pts = get_unique_clockwise_points(pts);
    var first = pts[0],
        last = pts[pts.length - 1];
    if (first.x != last.x || first.y != last.y) pts.push(first);
    var twicearea = 0,
        x = 0,
        y = 0,
        nPts = pts.length,
        p1, p2, f;
    for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
        p1 = pts[i];
        p2 = pts[j];
        f = p1.x * p2.y - p2.x * p1.y;
        twicearea += f;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
    }
    f = twicearea * 3;
    return [x / f, y / f];
}


function rand(items) {
    return items[~~(items.length * Math.random())];
}


function keyPressed() {
    if (key == 'r') {
        generate();
    } else if (key == 's') {
        save(myCanvas, 'mandala.png')
    }
}


