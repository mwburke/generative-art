

const frames = 90;

function setup() {
    myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz045');
}


function draw() {
  background(247);


  const const_x = width / 2;
  const const_y = height / 2;

  const r = 200;
  const sides = 6;

  let shape_lines = [];

  const shape_offset = PI / 6;
  // const shape_offset = 0;


  for (let i = 0; i < sides; i++) {
    shape_lines.push([
      [
        const_x + cos(shape_offset + PI * 2 * i / sides) * r,
        const_y + sin(shape_offset + PI * 2 * i / sides) * r
      ],
      [
        const_x + cos(shape_offset + PI * 2 * (i + 1) / sides) * r,
        const_y + sin(shape_offset + PI * 2 * (i + 1) / sides) * r
      ]
    ]);
    // shape_lines.push([
    //   [
    //     const_x + cos(PI * 2 * (i + 0.5) / sides) * r * 0.3,
    //     const_y + sin(PI * 2 * (i + 0.5) / sides) * r * 0.3
    //   ],
    //   [
    //     const_x + cos(PI * 2 * (i + 1.5) / sides) * r * 0.3,
    //     const_y + sin(PI * 2 * (i + 1.5) / sides) * r * 0.3
    //   ]
    // ]);
  }

  const num_lines = 10;
  // const ratios = [0.3, 0.4, 0.5, 0.6, 0.6, 0.5, 0.4, 0.3];
  const ratios = [0.4, 0.35, 0.25, 0.35];
  // const ratios = [0.3];
  const colors = [color(191, 8, 2), color(58, 11, 186), color(43, 156, 227), color(58, 11, 186)];

  const c1 = color(26, 240, 225, 100);
  const c2 = color(112, 231, 255, 100);

//   const colors = [
//     lerpColor(c1, c2, 0),
//     lerpColor(c1, c2, 0.25),
//     lerpColor(c1, c2, 0.5),
//     lerpColor(c1, c2, 0.75),
//     lerpColor(c1, c2, 1.0),
//     lerpColor(c1, c2, 0.75),
//     lerpColor(c1, c2, 0.5),
//     lerpColor(c1, c2, 0.25)
//   ];
  // const colors = [color(0), color(0), color(0), color(0)];
  // const colors = [color(0), color(245, 194, 66), color(0), color(245, 194, 66)];
  // const colors = [color(0)]
  const weights = [4, 3, 4, 3];
  // const weights = [10, 10, 10, 10, 10, 10, 10, 10];
  // const weights = [4];

  // strokeCap(SQUARE);

  // const offset = 0;
  // const offset = PI / 3;
  const offset = frameCount / 120;

  shape_circle_lines(shape_lines, num_lines, offset, ratios, weights, colors);

  // shape_circle_lines(shape_lines, num_lines, -offset, ratios, weights, colors);


  stroke(0);
  strokeWeight(5);
  shape_lines.forEach(function(shape_line) {
    line(shape_line[0][0], shape_line[0][1], shape_line[1][0], shape_line[1][1]);
  });

  shape_lines = [];

  for (let i = 0; i < sides; i++) {
    shape_lines.push([
      [
        const_x + cos(PI * 2 * i / sides) * r * 1.4,
        const_y + sin(PI * 2 * i / sides) * r * 1.4
      ],
      [
        const_x + cos(PI * 2 * (i + 1) / sides) * r * 1.4,
        const_y + sin(PI * 2 * (i + 1) / sides) * r * 1.4
      ]
    ]);
  }
  // shape_circle_lines(shape_lines, num_lines, offset, [0.8, 0.8, 0.8, 0.8], [4, 4, 4, 4], colors);



//   noStroke();
//   fill(color(245, 194, 66))
//   ellipse(width / 2, height / 2, r * 0.4)

//   noFill()
//   stroke(color(0))
//   ellipse(width / 2, height / 2, r * 0.45)
//   ellipse(width / 2, height / 2, r * 0.3)


}



function shape_circle_lines(lines, num_lines, global_offset, ratios, weights=null, colors=null) {
  let total_x = 0;
  let total_y = 0;

  lines.forEach(function(shape_line) {
    total_x += shape_line[0][0] + shape_line[1][0];
    total_y += shape_line[0][1] + shape_line[1][1];
  });
  const center = [total_x / lines.length / 2, total_y / lines.length / 2];

  let max_radius = 0;
  // let min_radius = 1000000;

  lines.forEach(function(shape_line) {
    const d = distance(center, shape_line[0]);
    if (d > max_radius) {
      max_radius = d;
    }
  });

  const offset = PI * 2 / num_lines / ratios.length;

  for (let i = 0; i < ratios.length; i++) {
    const min_radius = max_radius * ratios[i];
    let line_color;
    if (colors == null) {
      line_color = color(0);
    } else {
      line_color = colors[i];
    }
    let line_weight;
    if (weights == null) {
      line_weight = 1;
    } else {
      line_weight = weights[i];
    }

    strokeWeight(line_weight);
    draw_circle_lines_in_shape(min_radius, max_radius, center, offset * i + global_offset, lines, num_lines, line_color);
  }

}


function draw_circle_lines_in_shape(min_r, max_r, center, offset, lines, num_lines, color) {
  for (let i = 0; i < num_lines; i++) {
    const theta = offset + PI * 2 / num_lines * i;
    const p1 = [center[0] + cos(theta) * min_r, center[1] + sin(theta) * min_r];
    const p2 = [center[0] + cos(theta) * max_r, center[1] + sin(theta) * max_r];

    stroke(color);
    draw_intersect_line(p1, p2, lines);
  }
}


function draw_intersect_line(p1, p2, shape_lines) {
  let min_radius = 100000;
  let p3;
  shape_lines.forEach(function(shape_line) {
    const intersect = intersect_point(p1, p2, shape_line[0], shape_line[1]);
    const d = distance(p1, intersect);
    if (d < min_radius) {
      min_radius = d;
      p3 = intersect;
    }
  });

  line(p1[0], p1[1], p3[0], p3[1]);
}


function distance(v1, v2) {
    return ((v1[0]-v2[0])**2 + (v1[1]-v2[1])**2)**0.5;
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

  return [x, y]
}
