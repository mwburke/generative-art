let circles = [];
const max_radius = 100;
const min_radius = 10;
const radius_decrease = 10;
const margin = 10;
let current_radius;
const maxLoops = 10000;

let colors;


function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz041');

  generateCircles()
}

function draw() {
}


function generateCircles() {
    clear();
    colors = [];

    if (Math.random() < 0.3) {
        colors.push(color(255, 0, 0));
        colors.push(color(0, 255, 0));
        colors.push(color(0, 0, 255));
    } else {
        let color_values = [];
        color_values.push([]);
        color_values.push([]);
        color_values.push([]);

        for (let i = 0; i < 3; i++) {
            const split1 = Math.random();
            const split2 = Math.random();
            const split3 = Math.random();
            const total = split1 + split2 + split3;
            let vals = [split1, split2, split3];
            shuffle(vals);

            color_values[0].push(vals[0] / total * 255);
            color_values[1].push(vals[1] / total * 255);
            color_values[2].push(vals[2] / total * 255);
        }

        colors.push(color(color_values[0][0], color_values[0][1], color_values[0][2]));
        colors.push(color(color_values[1][0], color_values[1][1], color_values[1][2]));
        colors.push(color(color_values[2][0], color_values[2][1], color_values[2][2]));
    }


    circles = [];
    let color_circles = [];
    color_circles.push([]);
    color_circles.push([]);
    color_circles.push([]);

    for (let i = 0; i < 3; i++) {
      current_radius = max_radius;
      let loopCycle = maxLoops;

      while (loopCycle > 0) {
        var circle = new Circle(random(width * 1.2) - width * 0.1, random(height * 1.2) - height * 0.1, current_radius);

        var available = true;
        for (var j = 0; j < color_circles[i].length; j++) {
          var other = color_circles[i][j];
          if (dist(circle.x, circle.y, other.x, other.y) < circle.r + other.r + margin) {
            available = false;
            break;
          }
        }

        if (available) {
          color_circles[i].push(circle);
        }

        loopCycle--;
        if (loopCycle === 0) {
          if (current_radius > min_radius) {
            current_radius -= radius_decrease;
            // console.log('Reduced Radius: ' + current_radius, 'Circles: ' + color_circles[i].length);
            loopCycle = maxLoops;
          }
        }
      }
    }

    blendMode(ADD);
    noStroke();
    for (let i = 0; i < 3; i++) {
        for (var j = 0; j < color_circles[i].length; j++) {
            fill(colors[i]);
            ellipse(color_circles[i][j].x,
                    color_circles[i][j].y,
                    color_circles[i][j].r * 2)
        }
    }

}

function Circle(x, y, r, fill_color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.fill_color = fill_color;
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



function keyPressed() {
  if (key == 'r') {
    generateCircles();
  }
}
