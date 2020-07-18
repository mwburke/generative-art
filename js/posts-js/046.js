const bg_line_thickness = 0.5;
let bg_line_positions = [];
let bg_line_colors = [];
let bg_line_alpha = 100;


let start_color;
let end_color;
let light_color_chance = 0.05;
let light_color_jump = 0.10;
let random_color_jump = 0.2; // 0.04

let wave_lines_offsets = [];
let wave_lines_thickness = 10;
let wave_lines_height_distance = 45;
let wave_lines_amplitude = 7;
let wave_lines_period = 200;
let alternate_waves_reverse = true;
let wave_noise_magnitude = 5;
let wave_lines_point_frequency = 15;

let t;
let cnv;

function setup() {
  // frameRate(5);
  // randomSeed(1);
  // noiseSeed(1);
  t = 0;
  cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  cnv.parent('viz046');

  start_color = color(0, 0, 51);
  end_color = color(118, 185, 204);

  initialize_bg_lines()

  // noLoop();
}

let frame_count = 0;

function draw() {

  draw_bg_lines()
  draw_wave_lines()
  draw_lines_for_diamonds()
  // draw_spray_noise()

//   noFill()
//   stroke(247, 0, 0)
//   line(width/ 2, 0, width / 2, height);
//   line(0, height / 2, width, height / 2);

  t += PI / 200;

  // if (frameCount < 201) {
  //   save('frame_' + nf(frameCount, 3, 0) + '.png')
  // }
}


function easeInOut(x){
  return x > 0.5 ? 4*Math.pow((x-1),3)+1 : 4*Math.pow(x,3);
}

function initialize_bg_lines() {
  const num_lines = (height / bg_line_thickness) + 20;
  for (let i = 0; i < num_lines; i++) {

    const left = bg_line_thickness * i +
                 bg_line_thickness * (random() - 0.5) * 0.2 -
                 bg_line_thickness * 10;

    const right = bg_line_thickness * i +
                  bg_line_thickness * (random() - 0.5) * 0.2 -
                  bg_line_thickness * 10;

    bg_line_positions.push([left, right]);

    let ratio = easeInOut(i / ((height / bg_line_thickness) + 20));
    if (random() < light_color_chance) {
      ratio = max(min(ratio - light_color_jump, 1.0), 0);
    } else {
      ratio += (random() - 0.5) * random_color_jump * bg_line_thickness;
    }
    bg_line_colors.push(lerpColor(start_color, end_color, 1 - ratio));
  }
}


function draw_bg_lines() {
    for (let i = 0; i < bg_line_positions.length; i++) {
    noFill();
    let line_color = bg_line_colors[i];
    line_color.setAlpha(bg_line_alpha);
    strokeWeight(bg_line_thickness * 4);
    stroke(line_color);
    let line_positions = bg_line_positions[i];
    line(-10, line_positions[0], width + 10, line_positions[1]);
  }
}

function sine_wave_value(x, reverse=false) {
  t_temp = t
  if (reverse) {
    t_temp = -t_temp
  }
  return abs(sin(x * TWO_PI / wave_lines_period + t_temp) * wave_lines_amplitude, 0);
}


function draw_wave_lines() {
  let count = 1;
  for (let i = -wave_lines_height_distance; i < height + wave_lines_height_distance; i += wave_lines_height_distance) {
    let random_offset;
    if (wave_lines_offsets.length < count) {
      random_offset = wave_lines_period * random();
      wave_lines_offsets.push(random_offset)
    } else {
      random_offset = wave_lines_offsets[count - 1];
    }

    if (i % 2 == 0) {
      reverse_line = false;
    } else {
      reverse_line = true;
    }
    noFill();
    stroke(247);
    strokeWeight(wave_lines_thickness);
    beginShape();
    vertex(-10, i + sine_wave_value(-10 + random_offset, reverse_line));
    for (x = -10; x < width + 30; x += wave_lines_point_frequency) {
      curveVertex(x, i + sine_wave_value(x + random_offset, reverse_line) + noise(x, i) * wave_noise_magnitude); // noise(x, i, t)
    }
    vertex(x, i + sine_wave_value(x + random_offset, reverse_line));
    endShape()

    count += 1;
  }
}



function draw_lines_for_diamonds() {
  noStroke();
  fill(247);

  // beginShape();
  // endShape();

  for (let i = 0; i < 10; i++) {
    push();
    translate(-width * 1.06 + i * width * 0.6, -width * 0.1);
    rotate(-PI / 4);
    rect(0, 0, width * 0.09, height * 4);
    pop();
    push();
    translate(-width * 1.06 + i * width * 0.6,  -width * 0.1);
    rotate(PI / 4);
    rect(0, 0, width * 0.09, height * 4);
    pop();
  }
}


function draw_spray_noise() {
  const points_row = 1000;
  noStroke();
  fill(247, 247, 247, 100);
  for (let i = 0; i < points_row; i += width / points_row) {
    for (let j = 0; j < points_row; j += height / points_row) {
      let noise_val = noise(i * 0.0001, j * 0.0001);
      // noise_val = min(noise_val, 0.7);
      noise_val *= 0.4;

      if (random() < noise_val) {
        ellipse(i, j, 1);
      }
    }
  }
}


