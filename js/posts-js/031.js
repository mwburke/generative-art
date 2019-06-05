var big_radius = 250;
var num_circles = 25;
var swap = 0;

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz031');
  background(247, 247, 247);
  translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  ellipseMode(CENTER);

  noStroke();
  push();
  for (var i = 0; i < num_circles; i++) {
    rotate(radians(360 / num_circles));
    color_values = color(d3.interpolateRainbow(i / num_circles)).levels;
    color_values[3] = 75;
    fill(color_values);
    ellipse(0, big_radius / 2, big_radius, big_radius);
  }
  pop();

  strokeWeight(3);
  stroke(247, 247, 247);
  noFill();
  push();
  for (var i = 0; i < num_circles; i++) {
    rotate(radians(360 / num_circles));
    ellipse(0, big_radius / 2, big_radius, big_radius);
  }
  pop();
}

