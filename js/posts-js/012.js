var step_size = 100;
var step_rate = 2;
var stroke_weight = 3;
var steps = []

var ball_radius = 30;
var ball;


function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz012');
    var step_color = color(50, 50, 50);
    for (j = CANVAS_HEIGHT; j > -1; j -= step_size) {
        steps.push(new step(CANVAS_HEIGHT - j, j, step_color));
    }
    var ball_color = color(250, 10, 10);
    ball = new bouncy_ball(ball_radius, CANVAS_WIDTH + step_size, 0 - step_size, ball_color, step_size);
}

function draw() {
  background(247, 247, 247);

  strokeWeight(stroke_weight);

  for (i = 0; i < steps.length; i++) {
    steps[i].move();
    steps[i].display();
  }

  ball.move();
  ball.draw();
}

// Step that starts at x, y and moves x, y up to the right over step_rate seconds
function step(x, y, step_color) {
  this.start_x = x;
  this.start_y = y;
  this.x = x;
  this.y = y;
  this.step_rate = step_rate;
  this.step_color = step_color;

  this.move = function() {
    if (frameCount / step_rate % 60 == 0) {
      this.x = this.start_x;
      this.y = this.start_y;
    } else {
      this.x += step_size / FRAMERATE / step_rate;
      this.y -= step_size / FRAMERATE / step_rate;
    }
  }

  this.display = function() {
    stroke(this.step_color);
    line(this.x, this.y, this.x, this.y + step_size);
    line(this.x, this.y, this.x + step_size, this.y);
  }
}

// Ball that bounces down the steps steps_bounce at a time and repeats from the top repeatedly?
function bouncy_ball(radius, x, y, ball_color, steps_bounce) {
  this.radius = radius;
  this.start_x = x;
  this.start_y = y;
  this.dx = -2.4;
  this.dy = -310;
  this.x = x;
  this.y = y;
  this.step = -1;
  this.ball_color = ball_color;
  this.steps_bounce = steps_bounce;

  this.move = function() {

    if ((frameCount > 0) & (frameCount % 360 == 0)) {
      this.x = this.start_x;
      this.y = this.start_y;
      this.dy = -310;
    } else {
      if (frameCount % 60 == 0) {
        this.dy = -292;
      } else {
        this.dy += 15;
      }
    }

    this.x += this.dx;
    this.y += this.dy * 1 / FRAMERATE;
  }

  this.draw = function() {
    // fix this later to do the little squishing action when it lands on a step
    // can implement this using framecount since we want it to land on seconds
    modifier = 0


    noStroke();
    fill(this.ball_color);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
