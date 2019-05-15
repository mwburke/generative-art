var inner_radius = 235;
var outer_radius = 100;
var circle_width = 85;
var rect_length = 355;
var dark_red = '#6b1126';

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz028');
  background(247, 247, 247);
}

function draw() {
  translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  rectMode(CENTER);
  ellipseMode(CENTER);
  //rectangle
  push();
  noStroke();
  rotate(radians(45));
  fill(color(dark_red));
  rect(0, 0, rect_length, rect_length);
  pop();

  push();
  rotate(radians((frameCount / 5)));

  stroke(dark_red)
  fill(color(247, 247, 247));
  ellipse(0, 0, inner_radius, inner_radius);

  var adjustment = -10;

  strokeWeight(5);
  for (var i = 0; i < 4; i++) {
    rotate(radians(90));

    //outer circles
    stroke(dark_red)
    fill(color(247, 247, 247));
    ellipse(inner_radius - outer_radius + adjustment, 0, outer_radius, outer_radius);
    noStroke();

    fill(color(247, 247, 247));
    arc(0, 0, inner_radius, inner_radius, 0, PI / 4);
    // fill(color(dark_red));
    // arc(0, 0, inner_radius - circle_width, inner_radius - circle_width, 0, PI / 4);
    fill(color(dark_red));
    ellipse(inner_radius - outer_radius + adjustment, 0, outer_radius - circle_width, outer_radius - circle_width);

    noFill();
    stroke(color(dark_red));
    arc(0, 0, inner_radius + 5, inner_radius + 5, 0, PI / 4);
  }

  fill(color(dark_red));
  ellipse(0, 0, inner_radius - circle_width, inner_radius - circle_width);
  
  pop();

  noStroke();
  fill(color(247, 247, 247));
  ellipse(0, 0, 105, 105);
  fill(color(dark_red));
  ellipse(0, 0, 90, 90);
  fill(color(247, 247, 247));
  rect(0, 0, 50, 50);
  push()
  rotate(radians(45));
  fill(color(dark_red));
  rect(0, 0, 45, 45);
  pop();

  fill(color(247, 247, 247));
  ellipse(0, 0, 25, 25);

}