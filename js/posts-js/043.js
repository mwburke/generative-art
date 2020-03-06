/*
Things to add
Fine tune available colors
*/

const circle_radius = 30;
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

let blendmodes;

let pg;
let cv;

function setup() {
  blendmodes = [
    DARKEST,
    SCREEN,
    DIFFERENCE,
    EXCLUSION,
    OVERLAY,
    HARD_LIGHT,
    SOFT_LIGHT,
    DODGE,
  ];
  generate();
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  pg.beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    pg.vertex(sx, sy);
  }
  pg.endShape(CLOSE);
}


function keyPressed() {
  if (key == 'r') {
    generate();
  }
}

function draw_layer(num_sides, ratio, rotation, x_offset, y_offset, bg, fl) {
  pg = createGraphics(CANVAS_WIDTH * 1.5, CANVAS_HEIGHT * 1.5);

  if (bg == null) {
    r = random(255);
    g = random(255);
    b = random(255);
    pg.background(r, g, b);
  } else {
    pg.background(bg);
  }
  if (fl == null) {
    r = random(255);
    g = random(255);
    b = random(255);
    pg.fill(r, g, b);
  } else {
    pg.fill(fl);
  }

  pg.noStroke();
  for (let i = -2; i < CANVAS_WIDTH / circle_radius / 2 + 4; i++) {
    for (let j = -2; j < CANVAS_HEIGHT / circle_radius / 2 + 4; j++) {
      pg.push();
      pg.translate(circle_radius * i * 2 + (j % 2) * circle_radius, circle_radius * j * 2);
      pg.rotate(rotation);
      if (num_sides < 3) {
        pg.ellipse(0, 0, circle_radius * ratio, circle_radius * ratio);
      } else {
        polygon(0, 0, circle_radius * ratio / 1.5, num_sides);
      }
      pg.pop();
    }
  }

  image(pg, x_offset, y_offset);
}


function generate() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz043');

  const ratio = 1.3 + Math.random() * 0.7;

  let bg, fl;

  if (Math.random() < 0.5) {
    r = random(255);
    g = random(255);
    b = random(255);
    bg = color(r, g, b);
    r = random(255);
    g = random(255);
    b = random(255);
    fl = color(r, g, b);
  } else {
    bg = null;
    fl = null;
  }

  let num_sides = Math.floor(Math.random() * 9);

  blendMode(BLEND);
  draw_layer(num_sides, ratio, 0, 0, 0, bg, fl);

  let rotation;
  let x_offset;
  let y_offset;
  blendMode(blendmodes[Math.floor(Math.random() * blendmodes.length)]);

  for (i = 0; i < 1 + Math.floor(Math.random() + 0.3); i++) {
    x_offset = -Math.random() * circle_radius * 2;
    y_offset = -Math.random() * circle_radius * 2;
    if (num_sides < 3) {
      rotation = 0;
    } else {
      if (Math.random() < 0.5) {
        rotation = Math.random() / num_sides * PI * 2;
      } else {
        rotation = 0;
      }
    }
    draw_layer(num_sides, ratio, rotation, x_offset, y_offset, bg, fl);
  }

}
