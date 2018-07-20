var max_circles = 60;
var circle_frame_prob = 0.2
var base_radius = 125;
var circles = []
var new_circle;

var color_palettes = [
    ["#fbcff3","#f7c0bb","#acd0f4","#8690ff","#30bfdd","#7fd4c1"],
    ["#FF6AD5","#C774E8","#AD8CFF","#8795E8","#94D0FF"]
];

var color_palette;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz013');

    color_palette = color_palettes[Math.floor(random(color_palettes.length))];

    x = random(0, CANVAS_WIDTH);
    y = random(0, CANVAS_WIDTH);

    min_radius = 0;// base_radius * random(0.5, 1);
    max_radius = base_radius * random(1, 1.5);

    new_color = color(color_palette[Math.floor(random(color_palette.length))]).levels;
    new_color[3] = 50;
    new_color = color(new_color);
    new_circle = new circle(x, y, min_radius, max_radius, new_color);
    circles.push(new_circle);
}

function draw() {
  background(247, 247, 247);

  if (random(1) <= circle_frame_prob) {
    if (circles.length <= max_circles) {
      x = random(0, CANVAS_WIDTH);
      y = random(0, CANVAS_WIDTH);

      min_radius = 0; // base_radius * random(0.5, 1);
      max_radius = base_radius * random(1, 1.5);

      new_color = color(color_palette[Math.floor(random(color_palette.length))]).levels;
      new_color[3] = 50;
      new_color = color(new_color);
      new_circle = new circle(x, y, min_radius, max_radius, new_color);
      circles.push(new_circle);
    }
  }

  for (i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].grow();
  }
}

function circle(x, y, min_radius, max_radius, circle_color) {
  this.x = x;
  this.y = y;
  this.min_radius = min_radius;
  this.max_radius = max_radius;
  this.radius = min_radius;
  this.rad_x = this.min_radius * random(-0.3, 0.3);
  this.rad_y = this.min_radius * random(-0.3, 0.3);
  this.max_radius = max_radius;
  this.circle_color = circle_color;

  this.grow = function() {
    if (this.radius < this.max_radius) {
      this.radius += (this.max_radius - this.min_radius) / 120;
    }
  }

  this.display = function() {
    fill(this.circle_color);
    noStroke();
    ellipse(this.x, this.y, this.radius + this.rad_x, this.radius + this.rad_y);
  }
}

function mousePressed() {
    color_palette = color_palettes[Math.floor(random(color_palettes.length))];
    circles = [];
}
