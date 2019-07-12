var explorers = [];
var line_len = 15;
var line_width = 3;
var jitter_width = 5;
var num_bases = 4;
var opacity = 3;
var bases = [];
var base_colors = [];
var goal_target_frac = 0.9;
var has_goal_frac = 0.9;
var goal_move_add = 8;
var goal_dist = 250;

var explorer;

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz033');
  background(247, 247, 247);

  colorMode(HSB, 100);

  bases.push([Math.random() * width / 4, Math.random() * height / 4]);
  bases.push([width / 2 + Math.random() * width / 4, Math.random() * height / 4]);
  bases.push([Math.random() * width / 4, width / 2 + Math.random() * height / 4]);
  bases.push([width / 2 + Math.random() * width / 4, width / 2 + Math.random() * height / 4]);

  base_goals = [];
  for (var i = 0; i < 4; i++) {
    var min_value = 1000;
    var base_min_value = null;
    for (var j = 0; j < 4; j++) {
      if (i != j) {
        var dist = distance(bases[i], bases[j]);
        if (dist < min_value) {
          min_value = dist;
          base_min_value = bases[j];
        }
      }
    }
    base_goals.push(base_min_value);
  }

  for (var i = 0; i < num_bases; i++) {
    base_colors.push(Math.random() * 100);
  }

}


function distance(v1, v2) {
    return ((v1[0]-v2[0])**2 + (v1[1]-v2[1])**2)**0.5
}

function draw() {

  if (frameCount < 600){
    for (var i = 0; i < num_bases; i++) {
      goal = null;
      if (Math.random() < has_goal_frac) {
        // var goal_base = i;
        // while (goal_base == i) {
        //   goal_base = gen_discrete_unif(0, 3);
        // }
        // goal = bases[goal_base];
        goal = base_goals[i];
      }
      var num_moves = Math.ceil(gen_expon(1.2));

      if (goal != null) {
        num_moves += gen_discrete_unif(goal_move_add - 2, goal_move_add + 2);
      }

      explorers.push(new hex_explorer(
        num_moves, // gen_discrete_unif(3, 10),
        line_len,
        jitter_width,
        color((Math.random() - 0.5) * 40 + base_colors[i], 85, 85, opacity),
        line_width,
        bases[i][0],
        bases[i][1],
        gen_discrete_unif(0, 5) / 3 * TWO_PI,
        goal
      ));
    }
  }

  if ((frameCount % 10) == 0) {
    for (var i = 0; i < explorers.length; i++) {
      explorers[i].step();
    }
  }
}


function hex_explorer(num_moves, len, jitter, line_color, line_width, x, y, rot, goal=null, goal_dist=null) {
  this.num_moves = num_moves;
  this.len = len;
  this.jitter = jitter;
  this.line_color = line_color;
  this.line_width = line_width;
  this.x = x;
  this.y = y;
  this.rot = rot;
  this.goal = goal;
  this.goal_dist = goal_dist;

  this.step = function() {
    if (this.num_moves > 0) {
      if (this.goal == null) {

        var new_rot;

        if (Math.random() < 0.5) {
          var new_rot = this.rot - TWO_PI / 6;
        } else {
          var new_rot = this.rot + TWO_PI / 6;
        }
      } else {
        if (Math.random() > goal_target_frac) {
          if (Math.random() < 0.5) {
            var new_rot = this.rot - TWO_PI / 6;
          } else {
            var new_rot = this.rot + TWO_PI / 6;
          }
        } else {
            var dist1 = Math.sqrt(((this.x + cos(this.rot - TWO_PI / 6) * this.len) - this.goal[0])**2
                    + ((this.y + sin(this.rot - TWO_PI / 6) * this.len) - this.goal[1])**2);
            var dist2 = Math.sqrt(((this.x + cos(this.rot + TWO_PI / 6) * this.len) - this.goal[0])**2
                              + ((this.y + sin(this.rot + TWO_PI / 6) * this.len) - this.goal[1])**2);

          if (Math.sqrt((this.x - this.goal[0])**2 + (this.y - this.goal[1])**2) < goal_dist) {
            if (dist1 < dist2) {
              var new_rot = this.rot - TWO_PI / 6;
            } else {
              var new_rot = this.rot + TWO_PI / 6;
            }
          } else {
            if (Math.random() < 0.5) {
              if (Math.random() < 0.5) {
                var new_rot = this.rot - TWO_PI / 6;
              } else {
                var new_rot = this.rot + TWO_PI / 6;
              }
            } else {
              if (dist1 < dist2) {
                var new_rot = this.rot - TWO_PI / 6;
              } else {
                var new_rot = this.rot + TWO_PI / 6;
              }
            }
          }
        }
      }

      const new_x = this.x + cos(new_rot) * this.len;
      const new_y = this.y + sin(new_rot) * this.len;


      push();
        translate(this.x, this.y);
        strokeWeight(this.line_width);
        stroke(this.line_color);
        rotate(new_rot - PI / 2);
        let x_jitter = this.jitter * (Math.random() - 0.5);
        line(x_jitter, 0, x_jitter, this.len);
      pop();

      this.x = new_x;
      this.y = new_y;
      this.rot = new_rot;
      this.num_moves -= 1;
    }
  }
}
