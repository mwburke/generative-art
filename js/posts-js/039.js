// Inspired by Instagram @veritablyverde's tape work from college

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz039');

  generate();
}

function generate() {
  background(247);
  push();
  translate(width / 2, height / 2);


  const num_wedges = Math.floor(2 + Math.random() * 3);
  const min_len = 100;
  const max_len = 300;
  const min_weight = 0.8;
  const max_weight = 2.5;
  const min_wedge_angle = TWO_PI * 0.05;
  const max_wedge_angle = TWO_PI * 0.15;

  let wedge_angle;
  let rot_angle;
  let len;
  let weight;

  for (let i = 0; i < num_wedges; i++) {
      if (Math.random() < 0.2) {
        rot_angle = 0;
      } else {
        rot_angle = QUARTER_PI;
      }
    // rot_angle = QUARTER_PI;

    wedge_angle = lerp(min_wedge_angle, max_wedge_angle, Math.random());
    const w_size = Math.random();
    len = lerp(min_len, max_len, w_size);
    weight = lerp(min_weight, max_weight, w_size);

    noFill();
    stroke(0);
    strokeWeight(weight);
    for (let j = 0; j < 4; j++) {
       draw_wedge(len, wedge_angle, rot_angle + j * HALF_PI)
    }
  }

  pop();
}


function draw_wedge(len, wedge_angle, rot_angle) {
  push();
  rotate(rot_angle);
  translate(0, len * 0.4);
  push();
  rotate(wedge_angle / 2);
  line(0, 0, 0, -len);
  pop();
  push();
  rotate(-wedge_angle / 2);
  line(0, 0, 0, -len);
  pop();
  pop();
}

function keyPressed() {
  if (key == 'r') {
    generate();
  }
}
