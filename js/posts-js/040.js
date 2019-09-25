let circles = [];
const max_radius = 150;
const min_radius = 60;
const radius_decrease = 20;
let current_radius;
const maxLoops = 100000;

let color_1;
let color_2;


function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz040');

  color_1 = color(20, 0, 200);
  color_2 = color(247);

  generateCircles()
}

function draw() {
}


function generateCircles() {
  background(247);
  circles = [];
  current_radius = max_radius;
  let loopCycle = maxLoops;

  while (loopCycle > 0) {
    var circle = new Circle(random(width * 1.2) - width * 0.1, random(height * 1.2) - height * 0.1, current_radius);

    var available = true;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      if (dist(circle.x, circle.y, other.x, other.y) < circle.r + other.r) {
        available = false;
        break;
      }
    }

    if (available) {
      circles.push(circle);
    }

    loopCycle--;
    if (loopCycle === 0) {
      if (current_radius > min_radius) {
        current_radius -= radius_decrease;
        console.log('Reduced Radius: ' + current_radius, 'Circles: ' + circles.length);
        loopCycle = maxLoops;
      }
    }
  }
  for (var i = 0; i < circles.length; i++) {
    circles[i].draw();
  }
}

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
}

Circle.prototype.draw = function() {
  let circ_radius = this.r;
    const circ_decrease = 20;
    solid_layer(this.x, this.y, circ_radius, circ_radius - circ_decrease, color_1, color_2);
    circ_radius -= circ_decrease;
    while (circ_radius > 5) {
      layers[Math.floor(Math.random() * layers.length)](this.x, this.y, circ_radius, circ_radius - circ_decrease, color_1, color_2);
      circ_radius -= circ_decrease;
    }
    noStroke();
    fill(color_1);
    ellipse(this.x, this.y, circ_radius * 2);
}



let layers = [
  // solid_layer,
  solid_layer_2,
  // outer_lines_layer,
  five_lines_layer,
  outer_lines_spokes,
  wobbly_line,
  triangles,
  circle_layers
]
;

function circle_layers(x, y, outer_radius, inner_radius, color_1, color_2) {
  const num_circles = Math.max(8, Math.round(outer_radius / 10) * 2);

  push();
  translate(x, y);
  const offset = (outer_radius - inner_radius) * 0.3;
  noStroke();
  fill(color_1);
  for (let i = 0; i < num_circles; i++) {
    ellipse(0, (outer_radius - inner_radius) * 0.5 + inner_radius, (outer_radius - inner_radius) * 0.6);
    rotate(TWO_PI / num_circles);
  }

  pop();
}


function triangles(x, y, outer_radius, inner_radius, color_1, color_2) {
  const num_triangles = Math.max(8, Math.round(outer_radius / 15) * 2);

  push();
  translate(x, y);
  const offset = (outer_radius - inner_radius) * 0.3;
  noStroke();
  fill(color_1);
  for (let i = 0; i < num_triangles; i++) {
  push();
  beginShape();
    vertex(inner_radius * cos(TWO_PI / num_triangles / 2),
           inner_radius * sin(TWO_PI / num_triangles / 2));
    curveVertex(inner_radius * cos(TWO_PI / num_triangles / 2),
           inner_radius * sin(TWO_PI / num_triangles / 2));
    curveVertex(0,
           inner_radius);
    curveVertex(inner_radius * -cos(TWO_PI / num_triangles / 2),
           inner_radius * sin(TWO_PI / num_triangles / 2));
    vertex(inner_radius * -cos(TWO_PI / num_triangles / 2),
           inner_radius * sin(TWO_PI / num_triangles / 2));
    vertex(0, outer_radius * 0.8);
    endShape(CLOSE);
  pop();
    rotate(TWO_PI / num_triangles);
  }

  pop();
}
function wobbly_line(x, y, outer_radius, inner_radius, color_1, color_2) {
  const num_wobbles = Math.max(8, Math.round(outer_radius / 15) * 2);

  push();
  translate(x, y);
  curveTightness(-0.3);
  noFill();
  stroke(color_1);
  strokeWeight(4);
  beginShape();
  let offset = (outer_radius - inner_radius) * 0.3;
  for (let i = 0; i < num_wobbles + 4; i++) {
    const r = (outer_radius - inner_radius) / 2 + inner_radius + offset * sin(HALF_PI + PI * i);
    const angle = TWO_PI / num_wobbles * i;
    const x = r * cos(angle);
    const y = r * sin(angle);
    curveVertex(x, y);
  }
  endShape();

  offset = (outer_radius - inner_radius) * 0.1;
  for (let i = 0; i < num_wobbles + 4; i++) {
    const r = (outer_radius - inner_radius) / 2 + inner_radius + offset * sin(HALF_PI + PI * (i + 1));
    const angle = TWO_PI / num_wobbles * i;
    const x = r * cos(angle);
    const y = r * sin(angle);
    ellipse(x, y, 3);
  }
  pop();
}


function outer_lines_spokes(x, y, outer_radius, inner_radius, color_1, color_2) {
     push();
    translate(x, y);
    noStroke();
    fill(color_1);
    ellipse(0, 0, outer_radius * 2);
    fill(color_2);
    ellipse(0, 0, (inner_radius + (outer_radius - inner_radius) * 0.8)  * 2);
  fill(color_1);
    ellipse(0, 0, (inner_radius + (outer_radius - inner_radius) * 0.6)  * 2);
  fill(color_2);
    ellipse(0, 0, (inner_radius + (outer_radius - inner_radius) * 0.4)  * 2);
  fill(color_1);
    ellipse(0, 0, (inner_radius + (outer_radius - inner_radius) * 0.2)  * 2);

    push();
    const num_spokes = 20;
    rotate(Math.floor(Math.random() * 2) * TWO_PI / num_spokes / 2);
    for (let i = 0; i < num_spokes; i++) {
      noFill();
      strokeCap(SQUARE);
      stroke(color_1);
      strokeWeight(4);
      line(0, inner_radius, 0, outer_radius);
      rotate(TWO_PI / num_spokes);
    }
    pop();

    pop();
}


function outer_lines_layer(x, y, outer_radius, inner_radius, color_1, color_2) {
    push();
    translate(x, y);
    noStroke();
    fill(color_1);
    ellipse(0, 0, outer_radius * 2);
    fill(color_2);
    ellipse(0, 0, (inner_radius + (outer_radius - inner_radius) * 0.8)  * 2);
  fill(color_1);
    ellipse(0, 0, (inner_radius + (outer_radius - inner_radius) * 0.2)  * 2);
    pop();
}

function five_lines_layer(x, y, outer_radius, inner_radius, color_1, color_2) {
     push();
    translate(x, y);
    noStroke();
    fill(color_1);
    ellipse(0, 0, outer_radius * 2);
    fill(color_2);
    ellipse(0, 0, (inner_radius + (outer_radius - inner_radius) * 0.8)  * 2);
  fill(color_1);
    ellipse(0, 0, (inner_radius + (outer_radius - inner_radius) * 0.6)  * 2);
  fill(color_2);
    ellipse(0, 0, (inner_radius + (outer_radius - inner_radius) * 0.4)  * 2);
  fill(color_1);
    ellipse(0, 0, (inner_radius + (outer_radius - inner_radius) * 0.2)  * 2);
    pop();
}


function solid_layer(x, y, outer_radius, inner_radius, color_1, color_2) {
    push();
    translate(x, y);
    noStroke();
    fill(color_1);
    ellipse(0, 0, outer_radius * 2);
    fill(color_2);
    ellipse(0, 0, inner_radius * 2);
    pop();
}

function solid_layer_2(x, y, outer_radius, inner_radius, color_1, color_2) {
    push();
    translate(x, y);
    noStroke();
    fill(color_2);
    ellipse(0, 0, outer_radius * 2);
    fill(color_1);
    ellipse(0, 0, inner_radius * 2);
    pop();
}


function keyPressed() {
  if (key == 'r') {
    generateCircles();
  }
}
