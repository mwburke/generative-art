var big_radius = 250;
var num_circles = 20;
var swap = 0;

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz029');
  background(247, 247, 247);
  translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  ellipseMode(CENTER);
  blendMode(DIFFERENCE);

  color(3, 3, 3);
  noStroke();
  push();
  for (var i = 0; i < num_circles - 2; i++) {
    rotate(radians(num_circles));
    ellipse(0, big_radius / 2, big_radius, big_radius);
  }
  pop();

  ellipse(0, 0, 0.34 * big_radius, 0.34 * big_radius);
  ellipse(0, 0, 0.68 * big_radius, 0.68 * big_radius);
  ellipse(0, 0, big_radius, big_radius);
  ellipse(0, 0, 1.28 * big_radius, 1.28 * big_radius);
  ellipse(0, 0, 1.536 * big_radius, 1.536 * big_radius);
  ellipse(0, 0, 1.735 * big_radius, 1.735 * big_radius);
  ellipse(0, 0, 1.878 * big_radius, 1.878 * big_radius);
  blendMode(BLEND);
  noFill();
  stroke(247, 247, 247);
  strokeWeight(5);
  ellipse(0, 0, 2 * big_radius, 2 * big_radius);

  fill(247, 247, 247);
  noStroke();
  ellipse(0, 0, 0.34 * big_radius, 0.34 * big_radius);
  fill(3, 3, 3);
  push();
  rotate(radians(10));
  for (var i = 0; i < num_circles - 2; i++) {
    rotate(radians(num_circles));
    // curve(-5.2, 0.17 * big_radius, 0, 0.18 * big_radius, 0, 0.18 * big_radius, 5.2, 0.17 * big_radius)
    triangle(-5.2, 0.17 * big_radius, 5.2, 0.17 * big_radius, 0, 10)
  }
  pop();
}

function mousePressed() {
    // pixel re-coloring
    // d3.interpolateInferno
    loadPixels();
    for (var i = 0; i < CANVAS_HEIGHT; i++) {
        for (var j = 0; j < CANVAS_WIDTH; j++) {
            updatePixel(i, j);
        }
    }
    updatePixels();
}

function updatePixel(x, y) {
    let d = pixelDensity();
    distance = ((x - (CANVAS_WIDTH / 2)) ** 2 + (y - (CANVAS_HEIGHT / 2)) ** 2) ** 0.5;
    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) {
        // loop over
        index = 4 * ((y * d + j) * width * d + (x * d + i));
        if ((pixels[index] + pixels[index + 1] + pixels[index + 2]) < (247 * 3 - 1)) {
            new_color = color(d3.interpolateInferno(1 - distance / big_radius)).levels;
            pixels[index] = new_color[0];
            pixels[index + 1] = new_color[1];
            pixels[index + 2] = new_color[2];
        }
      }
    }
}
