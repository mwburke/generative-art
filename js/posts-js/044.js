let circle_height_diff = 0.7;
let circle_radius;
const num_triangles = 9;
let tri_side = 10;
const seashell_ridges = 9;
const seashell_up_frac = 0.15;
const num_mini_rings = 9;
const num_internal_rings = 20;
const num_arc_layers = 11;
const arc_length = 30;

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


function setup() {
  myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz044');
  generate();
}

function generate() {
  background(255);
  circle_radius = 100 + Math.random() * 100;
  tri_side = circle_radius / 10;
  circle_height_diff = 0.4 + Math.random() * 0.3;
  let palette = get_palette(rand(palettes));
  palette = shuffle_arr(palette);
  const circle_func = rand(circle_funcs);
  draw_circles(palette, circle_func);
}

function draw_circles(palette, circle_func) {
  for (let j = height / circle_radius * 2 + 10.7; j > -10; j--) {
    for (let i = -3; i < width / circle_radius + 3; i++) {
      circle_func((i + (j % 2) / 2) * circle_radius, j * circle_radius / 2 * circle_height_diff, color(255), color(0), palette);
    }
  }
}

function get_palette(url) {
  slash_split = url.split("/");
  color_text = slash_split[slash_split.length - 1];
  color_values = color_text.split("-");

  palette = []

  color_values.forEach(function(value) {
    palette.push(color("#" + value))
  });

  return palette;
}

function rand(items) {
    return items[~~(items.length * Math.random())];
}

const circle_funcs = [
  function triangles(x, y, base, outline, palette) {
    push();
    translate(x, y);
    fill(base);
    stroke(outline);
    ellipse(0, 0, circle_radius);
    rotate(-PI / 3.33333333);
    for (let i = 0; i < num_triangles; i++) {

      const tri_fill = rand(palette);
      fill(tri_fill);
      triangle(
        -tri_side / 2,
        circle_radius / 2,
        tri_side / 2,
        circle_radius / 2,
        0,
        circle_radius / 2 + tri_side * sqrt(3) / 2
      );
      rotate(PI / 3 * 2 / num_triangles);
    }
    pop();
  },
  function circle_color(x, y, base, outline, palette) {
    push();
    translate(x, y);
    noStroke();
    for (let i = 0; i < palette.length - 1; i++) {
      fill(color(palette[i]));
      ellipse(0, 0, (palette.length - i) / palette.length * circle_radius);
    }
    pop();
  },
  function seashell(x, y, base, outline, palette) {
    circle_height_diff = 0.5;
    palette = shuffle_arr(palette);
    push();
    translate(x, y + circle_radius * seashell_up_frac);
    rotate(PI / 2);
    let total_rotate_amt = 0;
    let ridge_width = PI / 18;
    fill(base);
    strokeWeight(circle_radius / 40);
    stroke(palette[0]);
    let shell_radius = circle_radius * (1 + seashell_up_frac);
    for (let i = 0 ; i < seashell_ridges; i++) {
      if (i == 0) {
        arc(0, 0, shell_radius, shell_radius / 3, -ridge_width / 2, ridge_width / 2, PIE);
        total_rotate_amt += ridge_width / 2;
      } else {
        const rot_ridge = total_rotate_amt + ridge_width / 2;
        rotate(-rot_ridge);
        arc(0, 0, shell_radius, shell_radius / 3, -ridge_width / 2, ridge_width / 2, PIE);
        rotate(rot_ridge * 2);
        arc(0, 0, shell_radius, shell_radius / 3, -ridge_width / 2, ridge_width / 2, PIE);
        rotate(-rot_ridge);
        total_rotate_amt += ridge_width;
      }
      shell_radius *= (1 - i / 100);
      ridge_width *= 0.9;
    }

    pop();
  },
  function mini_circle_rings(x, y, base, outline, palette) {
    palette = shuffle_arr(palette);
    const c1 = palette[0];
    const c2 = palette[1];
    const ring_width = circle_radius / num_mini_rings;
    push();
    noStroke();
    translate(x, y);
    for (let i = 0; i < num_mini_rings; i++) {
      if (i % 2 == 0) {
        fill(c1);
        ellipse(0, 0, circle_radius * (num_mini_rings - i) / num_mini_rings);
      } else {
        fill(c2);
        ellipse(0, 0, circle_radius * (num_mini_rings - i) / num_mini_rings);

        const mini_circle_radius = ring_width * 0.8;
        const circumference = circle_radius * (num_mini_rings - i - 0.5) / num_mini_rings * 2 * PI;
        const num_mini_circles = Math.floor(circumference / (mini_circle_radius * 1.5));

        push();
        fill(c1);
        rotate(PI * Math.random());
        for (let j = 0; j < num_mini_circles; j++) {
          ellipse(
            0,
            circle_radius * (num_mini_rings - i - 0.5) / num_mini_rings / 2,
            ring_width * 0.8 / 2
          );
          rotate(PI * 2 / num_mini_circles);
        }
        pop();
      }
    }
    pop();
  },
  function internal_rings(x, y, base, outline, palette) {
    push();
    translate(x, y);
    palette = shuffle_arr(palette);
    const c1 = palette[0];
    const c2 = palette[1];
    fill(c1);
    noStroke();
    ellipse(0, 0, circle_radius);
    noFill();
    strokeWeight(circle_radius / 40);
    stroke(c2);
    for (let i = 0; i < num_internal_rings; i++) {
      ellipse(0, circle_radius / 4, circle_radius / 2);
      rotate(PI * 2 / num_internal_rings);
    }
    pop();
  },
//   function mini_arcs(x, y, base, outline, palette) {
//     palette = shuffle_arr(palette);
//     const c1 = palette[0];
//     const c2 = palette[1];
//     const ring_width = circle_radius / num_mini_rings;
//     push();
//     noStroke();
//     translate(x, y);
//     fill(c1);
//     ellipse(0, 0, circle_radius);

//     for (let i = 0; i < num_arc_layers; i++) {

//         const circumference = circle_radius * (num_arc_layers - i - 0.5) / num_arc_layers * 2 * PI;
//         const num_arcs = Math.floor(circumference / (arc_length * 1.3));

//         push();
//         noFill();
//         strokeWeight(circle_radius / 30);
//         stroke(c2);
//         const start_angle = PI * Math.random();

//         for (let j = 0; j < num_arcs; j++) {
//           arc(
//             0,
//             0,
//             circle_radius * (num_arc_layers - i - 0.2) / num_arc_layers,
//             circle_radius * (num_arc_layers - i - 0.2) / num_arc_layers,
//             start_angle + PI * 2 * j / num_arcs,
//             start_angle + PI * 2 * (j + 0.5) / num_arcs
//           );
//         }
//         pop();
//     }
//     pop();
//   },
];

function shuffle_arr(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function keyPressed() {
  if (key == 'r') {
    generate();
  }
}
