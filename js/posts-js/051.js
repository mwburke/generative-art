// Inspiration: https://sasj.tumblr.com/post/161626679055/geometric-shapes-170609


const total_canvas_width = CANVAS_HEIGHT;
const total_canvas_height = CANVAS_WIDTH;

let hex_mode = false;
let rand_triangles_mode;
let line_draw_mode;
let triangles;
let neighbors;
let lines;
let dedup_lines;
let num_rows;
let side_length;
let tri_height;
let weight;
let blank_prob;


let palettes = [
    ["#f0e5cf", "#f7f6f2", "#c8c6c6", "#4b6587"],
    ["#4a3933", "#f0a500", "#e45826", "#e6d588"],
    ["#eeebdd", "#810000", "#630000", "#1b1717"],
    ["#f8f5f1", "#f8a488", "#5aa897", "#45526c"],
    ["#faf3f3", "#e1e5ea", "#a7bbc7", "#da7f8f"],
    // ["#de897a", "#7bd079", "#a7d0cd", "#ff39d6"],
    ["#eba8ea", "#bb371a", "#fff8d9", "#d5dbb3"],
    ["#cee5d0", "#fef0d7", "#d8b384", "#5e454b"],
    ["#161616", "#346751", "#c84b31", "#ecdbba"],
    ["#f3f4ed", "#536162", "#424642", "#c06014"],
    ["#da8c2f", "#d7bc8a", "#e4eccf", "#8fdccd", "#51c8be", "#d16a65"]
];

let curr_palette = null;
let bg = null;



function setup() {
    frameRate(30);
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);
    myCanvas.parent('viz051');
    translate(-width / 2, -height / 2);
    init_params();
    init_triangles();
    draw_triangles();
}

function draw() { }



function init_params() {
    const palette_num = Math.floor(Math.random() * palettes.length);
    console.log(palette_num);
    curr_palette = palettes[palette_num].slice();
    shuffle_arr(curr_palette);

    bg = curr_palette.pop();
    num_rows = 3 + int(Math.floor(Math.random() * 6));
    side_length = width / 100 * 3 + width / 100 * Math.random() * 3;
    tri_height = side_length * (3 ** 0.5) / 2;
    const line_draw_mode_num = Math.random();
    if (line_draw_mode_num < 0.33) {
        line_draw_mode = 'none';
    } else if (line_draw_mode_num < 0.66) {
        line_draw_mode = 'dedup';
    } else {
        line_draw_mode = 'all';
    }
    weight = side_length / 20 + side_length / 20 * Math.random();
    blank_prob = 0.10 + Math.random() * 0.8;
    console.log(line_draw_mode);
    rand_triangles_mode = Math.random() > 0.5;
}



function init_triangles() {
    triangles = [];
    // neighbors = [];
    neighbors = Array(num_rows ** 2).fill([]);
    lines = [];
    dedup_lines = [];

    let global_tri_count = 0;
    for (let row_num = 0; row_num < num_rows; row_num++) {
        let x_offset = -side_length / 2 * row_num;
        let y_offset = -tri_height * row_num;
        let up_direction = false;
        for (let col_num = 0; col_num <= row_num * 2; col_num++) {
            let fill_color = color(bg);
            if (Math.random() > blank_prob) {
                fill_color = curr_palette[Math.floor(Math.random() * curr_palette.length)]
            }
            let temp_tri = { points: create_triangle(side_length, tri_height, x_offset, y_offset, up_direction), fill: fill_color };
            let tri_lines = get_ordered_tri_lines(temp_tri);

            for (let i = 0; i < 3; i++) {
                // This works but it doesn't do what I want... oops
                // if (!dedup_lines.some(r => r.join(" ") === tri_lines[i].join(" "))) {
                //   dedup_lines.push(tri_lines[i]);
                // }
                lines.push(tri_lines[i]);
            }

            triangles.push(temp_tri);
            x_offset += side_length / 2;
            up_direction = !up_direction;

            // Assign neighbors
            if ((col_num != 0) & (col_num != row_num * 2)) {
                if (!neighbors[global_tri_count - 1].includes(global_tri_count)) {
                    neighbors[global_tri_count - 1].push(global_tri_count);
                }
                if (!neighbors[global_tri_count + 1].includes(global_tri_count)) {
                    neighbors[global_tri_count + 1].push(global_tri_count);
                }
            }

            if (row_num > 0) {
                if ((col_num % 2) == 1) {
                    neighbors[global_tri_count].push(global_tri_count - row_num * 2);
                    neighbors[global_tri_count - row_num * 2].push(global_tri_count);
                }
            }

            global_tri_count += 1;
        }
    }

    var counts = {};
    for (var i = 0; i < lines.length; i++) {
        counts[lines[i]] = 1 + (counts[lines[i]] || 0);
    }

    for (const line in counts) {
        if (counts[line] == 1) {
            let line_arr = line.split(",").map(Number);
            let temp_line = [[line_arr[0], line_arr[1]], [line_arr[2], line_arr[3]]];
            dedup_lines.push(temp_line);
        }
    }

}



function get_ordered_tri_lines(tri) {
    let tri_lines = [];

    for (let i = 0; i < 3; i++) {
        let p1 = tri.points[i];
        let p2 = tri.points[(i + 1) % 3];

        if (p1[0] == p2[0]) {
            if (p1[1] > p2[1]) {
                tri_lines.push([p2, p1]);
            } else {
                tri_lines.push([p1, p2]);
            }
        } else {
            if (p1[0] > p2[0]) {
                tri_lines.push([p2, p1]);
            } else {
                tri_lines.push([p1, p2]);
            }
        }
    }
    return tri_lines;
}



function create_triangle(side_length, tri_height, x_offset, y_offset, up_direction = true) {
    let points = [];
    if (up_direction) {
        points.push([x_offset, y_offset]);
        points.push([x_offset - side_length / 2, y_offset + tri_height]);
        points.push([x_offset + side_length / 2, y_offset + tri_height]);
    } else {
        points.push([x_offset, y_offset + tri_height]);
        points.push([x_offset - side_length / 2, y_offset]);
        points.push([x_offset + side_length / 2, y_offset]);
    }

    return points;
}


function draw_base_triangles() {
    noStroke();
    for (let i = 0; i < triangles.length; i++) {
        fill(triangles[i].fill)
        beginShape();
        vertex(triangles[i].points[0][0], triangles[i].points[0][1]);
        vertex(triangles[i].points[1][0], triangles[i].points[1][1]);
        vertex(triangles[i].points[2][0], triangles[i].points[2][1]);
        endShape(CLOSE);
    }

    noFill();
    stroke(bg);
    strokeWeight(weight);
    if (line_draw_mode == 'all') {
        for (let i = 0; i < lines.length; i++) {
            line(lines[i][0][0], lines[i][0][1], lines[i][1][0], lines[i][1][1]);
        }
    } else if (line_draw_mode == 'dedup') {
        for (let i = 0; i < dedup_lines.length; i++) {
            line(dedup_lines[i][0][0], dedup_lines[i][0][1], dedup_lines[i][1][0], dedup_lines[i][1][1]);
        }
    }
}


function draw_triangles() {
    background(bg);
    const small_side_length = side_length;
    const small_tri_height = tri_height * (3 ** 0.5) / 2;

    const big_side_length = small_side_length * num_rows;
    const big_tri_height = big_side_length * (3 ** 0.5) / 2;

    if (!hex_mode) {
        push();
        noStroke();
        //Up/down triangles tiling
        // Move back to the top left corner
        translate(-width / 2, -height / 2);
        for (let i = 0; i < Math.ceil(height / big_tri_height) * 2 + 1; i++) {
            push();
            translate(-big_side_length / 2 * (i % 2), big_tri_height * i);
            for (let j = 0; j < Math.ceil(width / big_side_length) * 2 + 3; j++) {
                if (rand_triangles_mode) {
                    init_triangles();
                }
                if (j % 2 == 0) {
                    draw_base_triangles();
                } else {
                    push();
                    translate(0, -big_tri_height * ((num_rows - 2)) / num_rows);
                    rotate(PI);
                    draw_base_triangles();
                    pop();
                }
                translate(big_side_length / 2, 0);
            }
            pop();
        }
        pop();
    } else {
        push();
        translate(-width / 2 - big_side_length, -height / 2);
        noStroke();
        // Hexagon tiling: pointy top
        for (let i = 0; i < height / big_side_length + 1; i++) {
            push();
            translate(-big_tri_height * (i % 2), big_side_length * i * 1.5);
            for (let j = 0; j < width / big_tri_height * 2 + 1; j++) {
                if (rand_triangles_mode) {
                    init_triangles();
                }
                translate(big_tri_height * 2, 0);
                push();
                rotate(PI / 6);
                for (let k = 0; k < 6; k++) {
                    rotate(PI / 3);
                    push();
                    //not sure why this is tbh
                    translate(0, -small_tri_height * 1.155);
                    draw_base_triangles();
                    pop();
                }
                pop();
            }
            pop();
        }
    }
}



function keyPressed() {
    if (key == 'h') {
        hex_mode = !hex_mode;
        draw_triangles();
    }
    if (key == 's') {
        save('random_palette_equilateral_triangles.png')
    }
    if (key == 'r') {
        init_params();
        init_triangles();
        draw_triangles();
    }
}



function sign(p1, p2, p3) {
    return (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);
}

function point_in_triangle(pt, v1, v2, v3) {
    let d1, d2, d3;
    let has_neg, has_pos;

    d1 = sign(pt, v1, v2);
    d2 = sign(pt, v2, v3);
    d3 = sign(pt, v3, v1);

    has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(has_neg && has_pos);
}


function shuffle_arr(arr) {
    var currentIndex = arr.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}
