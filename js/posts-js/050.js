/** Kaleidoscope type polygon generator based on triangles
  * Need to figure out if we are going to do it by merging,
  * or removing/adding lines and figuring out polygons aftewards.
  */

function setup() {
    myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);
    myCanvas.parent('viz050');
    generate();
}




// TODO: move the adjacency assignment to the initial loop
// since I'm not assigning the objects and only the IDs that I know will exist
// I can get away with this

// let palette = ['#d8dbe2', '#a9bcd0', '#58a4b0', '#373f51'];  //, '#1b1b1e'];
// let palette = ["#0b2027", "#40798c", "#70a9a1", "#cfd7c7", "#f6f1d1"];
// let palette = ["#ed6a5a", "#f4f1bb", "#9bc1bc", "#5ca4a9", "#e6ebe0"];
// let palette = ["#b3954", "#087e8b", "#bfd7ea", "#ff5a5f", "#c81d25"];

let palette = ["#370617", "#6a040f", "#9d0208", "#d00000", "#dc2f02", "#e85d04", "#f48c06", "#faa307", "#ffba08",];


// let palette = ["#d8f3dc", "#b7e4c7", "#95d5b2", "#74c69d", "#52b788", "#40916c", "#2d6a4f", "#1b4332", "#081c15"];

const canvas_size = 700;
let all_triangles = [];
let n_rows = 15;
let remove_sides = true;
let vertical_side_length = canvas_size / 2 / n_rows;
let horizontal_side_length = canvas_size / 2 / n_rows;


function generate() {
  let draw_diag = false;
  let draw_vertical = false;
  //   all_triangles = init_triangles(n_rows, horizontal_side_length, vertical_side_length, draw_diag, draw_vertical);

  //   assign_neighbors(n_rows, all_triangles);

  //   // console.log(all_triangles);
  //   background(220);
  //   push();
  //   draw_triangles(all_triangles);
  //   rotate(PI / 2);
  //   draw_triangles(all_triangles);
  //   rotate(PI / 2);
  //   draw_triangles(all_triangles);
  //   rotate(PI / 2);
  //   draw_triangles(all_triangles);
  //   pop();

  //   push();
  //   draw_triangles(all_triangles);
  //   rotateX(PI);
  //   draw_triangles(all_triangles);
  //   rotateZ(PI / 2);
  //   draw_triangles(all_triangles);
  //   rotateZ(PI / 2);
  //   draw_triangles(all_triangles);
  //   rotateZ(PI / 2);
  //   draw_triangles(all_triangles);
  //   pop();

  draw_diag = true;
  draw_vertical = false;

  all_triangles = init_triangles(n_rows, horizontal_side_length, vertical_side_length, draw_diag, draw_vertical);
  assign_neighbors(n_rows, all_triangles);

  push();
  draw_triangles(all_triangles);
  rotateZ(PI)
  draw_triangles(all_triangles);
  rotateX(PI);
  rotateZ(PI);
  draw_triangles(all_triangles);
  rotateZ(PI);
  draw_triangles(all_triangles);
  pop();

  all_triangles = init_triangles(n_rows, horizontal_side_length, vertical_side_length, draw_diag, draw_vertical);
  assign_neighbors(n_rows, all_triangles);

  push();
  rotateZ(PI / 2)
  draw_triangles(all_triangles);
  rotateZ(PI)
  draw_triangles(all_triangles);
  rotateX(PI);
  rotateZ(PI);
  draw_triangles(all_triangles);
  rotateZ(PI);
  draw_triangles(all_triangles);
  pop();

}


class Triangle50 {
  constructor(id, lines, dir, center, fill_color, stroke_color, line_draw_flags) {
    this.id = id;
    this.lines = lines;
    this.dir = dir;
    this.center = center;
    this.fill_color = fill_color;
    this.stroke_color = stroke_color;
    this.neighbor_ids = [];
    this.line_draw_flags = line_draw_flags;
  }

}


function random_color(palette) {
  return palette[Math.floor(Math.random() * palette.length)];
}

function init_triangles(n_rows, horizontal_side_length, vertical_side_length, draw_diag, draw_vertical) {
  let triangles = [];

  let prior_in_row = 0;
  for (let i = 1; i <= n_rows; i++) {

    let num_in_row = 1 + (n_rows - i) * 2;
    let tri_row_count = 0;
    for (let j = prior_in_row + 1; j <= prior_in_row + num_in_row; j++) {
      let lines = [];
      let line_draw_flags = [true, true, true];
      let dir = '';
      // console.log(i, j);
      if (tri_row_count % 2 == 0) {
        lines = [
          [
            // Up
            [(i - 1) * horizontal_side_length, (i - 1) * vertical_side_length + tri_row_count / 2 * vertical_side_length],
            [(i - 1) * horizontal_side_length, (i - 1) * vertical_side_length + (tri_row_count / 2 + 1) * vertical_side_length]
          ],
          [
            // Right
            [(i - 1) * horizontal_side_length, (i - 1) * vertical_side_length + (tri_row_count / 2 + 1) * vertical_side_length],
            [i * horizontal_side_length, (i - 1) * vertical_side_length + (tri_row_count / 2 + 1) * vertical_side_length]
          ],
          [
            // Diagonal
            [i * horizontal_side_length, (i - 1) * vertical_side_length + (tri_row_count / 2 + 1) * vertical_side_length],
            [(i - 1) * horizontal_side_length, (i - 1) * vertical_side_length + tri_row_count / 2 * vertical_side_length]

          ]
        ];

        if ((tri_row_count == 0) & (!draw_diag)) {
          // console.log("don't draw diagonal")
          line_draw_flags[2] = false;
        }

        dir = 'bottom';
      } else {
        lines = [
          [
            // Diagonal
            [(i - 1) * horizontal_side_length, (i - 1) * vertical_side_length + (tri_row_count + 1) / 2 * vertical_side_length],
            [i * horizontal_side_length, (i - 1) * vertical_side_length + (tri_row_count + 3) / 2 * vertical_side_length],
          ],
          [
            // Down
            [i * horizontal_side_length, (i - 1) * vertical_side_length + (tri_row_count + 3) / 2 * vertical_side_length],
            [i * horizontal_side_length, (i - 1) * vertical_side_length + (tri_row_count + 1) / 2 * vertical_side_length]
          ],
          [
            // Right
            [i * horizontal_side_length, (i - 1) * vertical_side_length + (tri_row_count + 1) / 2 * vertical_side_length],
            [(i - 1) * horizontal_side_length, (i - 1) * vertical_side_length + (tri_row_count + 1) / 2 * vertical_side_length]

          ]
        ]
        dir = 'top';
      }

      if ((i == 1) & (!draw_vertical)) {
        // console.log("don't draw vertical")
        line_draw_flags[0] = false;
      }

      let center = [(lines[0][0][0] + lines[1][0][0] + lines[2][0][0]) / 3, (lines[0][0][1] + lines[1][0][1] + lines[2][0][1]) / 3];

      let center_vec = createVector(center[0], center[1]);

      let zero_vec = createVector(0, 0);

      let dist_to_center_ratio = center_vec.dist(zero_vec) / width / 4;
      // console.log(dist_to_center_ratio);

      let fill_color_ind = Math.min(palette.length - 1, Math.floor(Math.random() * palette.length * 10 * (dist_to_center_ratio)));
      // let fill_color_ind = Math.floor(Math.random() * palette.length);
      fill_color = palette[palette.length - fill_color_ind - 1];
      stroke_color = 0;

      triangles.push(new Triangle50(j, lines, dir, center, fill_color, stroke_color, line_draw_flags));

      tri_row_count += 1;
    }

    prior_in_row += num_in_row;
  }

  return triangles;
}


function assign_neighbors(n_rows, triangles) {
  let prior_in_row = 0;
  for (let i = 1; i <= n_rows; i++) {

    let num_in_row = 1 + (n_rows - i) * 2;
    let tri_row_count = 0;
    for (let j = prior_in_row + 1; j < prior_in_row + num_in_row; j++) {
      // console.log(j);
      triangles[j - 1].neighbor_ids.push(j + 1)
      triangles[j].neighbor_ids.push(j);

      if ((prior_in_row % 2) == (j % 2)) {
        triangles[j - 1].neighbor_ids.push(j + num_in_row - 1);
        triangles[j + num_in_row - 2].neighbor_ids.push(j);
      }
      tri_row_count += 1;
    }
    prior_in_row += num_in_row;
  }
}


function draw_triangles(all_triangles) {
  all_triangles.forEach(function (tri) {
    draw_triangle(tri, all_triangles)
  });
}


/** For each triangle, check its neighbors' colors.
  *
  */
function draw_triangle(triangle, all_triangles) {
  let draw_lines = triangle.lines.slice();
  let draw_flags = triangle.line_draw_flags.slice();
  for (let i = 0; i < triangle.neighbor_ids.length; i++) {
    const neighbor_id = triangle.neighbor_ids[i];
    if (triangle.fill_color == all_triangles[neighbor_id - 1].fill_color) {
      // console.log('fill colors match', triangle.id, neighbor_id)
      // need to decrement by one to lookup properly in array since
      // ids don't start by zero since I'm dumb and wrote pseudocode in a book
      tri_neighbor_lines = all_triangles[neighbor_id - 1].lines;
      tri_neighbor_lines.forEach(function (tri_line) {
        for (let j = 0; j < draw_lines.length; j++) {
          if (((arrayEquals(draw_lines[j][0], tri_line[0])) & (arrayEquals(draw_lines[j][1], tri_line[1]))) | ((arrayEquals(draw_lines[j][0], tri_line[1]) & (arrayEquals(draw_lines[j][1], tri_line[0]))))) {
            // console.log('removing line');
            draw_flags[j] = false;
          }
        }
      })
    }
  }

  noStroke();
  fill(color(triangle.fill_color));
  beginShape();
  vertex(triangle.lines[0][0][0], triangle.lines[0][0][1]);
  vertex(triangle.lines[1][0][0], triangle.lines[1][0][1]);
  vertex(triangle.lines[2][0][0], triangle.lines[2][0][1]);
  endShape(CLOSE);
  //     if (draw_lines.length > 0) {

  //       // console.log(draw_lines.length);
  //       for(let i = 0; i < draw_lines.length; i++) {
  //         if (draw_flags[i]) {
  //           noFill();
  //           stroke(color(triangle.stroke_color));
  //           strokeWeight(2);
  //           line(draw_lines[i][0][0], draw_lines[i][0][1], draw_lines[i][1][0], draw_lines[i][1][1]);
  //         }

  //       }
  //     }
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}



function keyPressed() {
  console.log('regenerating')
  if (key == 'r') {
    generate();
  }
}
