/* Inspiration:
 * https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/
 */
var num_squares = 20;

function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz032');
  background(247, 247, 247);
  smooth(8);

  var color_1 = color(0);
  var color_2 = color(255);

  var first_tile_index = Math.floor(Math.random()*trunchets.length);
    var second_tile_index = Math.floor(Math.random()*trunchets.length);

    while(second_tile_index == first_tile_index) {
        second_tile_index = Math.floor(Math.random()*trunchets.length);
    }

    var first_tile = trunchets[first_tile_index];
    var second_tile = trunchets[second_tile_index];

    for (var i = 0; i < num_squares; i++) {
        push();
        translate(CANVAS_HEIGHT / num_squares / 2, CANVAS_HEIGHT / num_squares / 2 + CANVAS_HEIGHT / num_squares * i);
        if ((i % 2) == 1) {
            translate(CANVAS_WIDTH / num_squares, 0);
        }
        for (var j = 0; j < num_squares / 2; j++) {
            noFill();
            noStroke();
            // first_tile(CANVAS_WIDTH / num_squares,
            //            color_1,
            //            color_2);
            push();
            rotate(HALF_PI * Math.floor(Math.random() * 4));
            trunchets[Math.floor(Math.random()*trunchets.length)](
              CANVAS_WIDTH / num_squares,
              color_1,
              color_2

            );
            pop();
            translate(CANVAS_WIDTH / num_squares * 2, 0);
        }
        pop();
    }
    for (var i = 0; i < num_squares; i++) {
        push();
        translate(CANVAS_HEIGHT / num_squares / 2, CANVAS_HEIGHT / num_squares / 2 + CANVAS_HEIGHT / num_squares * i);
        if ((i % 2) == 0) {
            translate(CANVAS_WIDTH / num_squares, 0);
        }
        for (var j = 0; j < num_squares / 2; j++) {
            noFill();
            noStroke();
            // second_tile(CANVAS_WIDTH / num_squares,
            //            color_1,
            //            color_2);
            push();
            rotate(HALF_PI * Math.floor(Math.random() * 4));
            trunchets[Math.floor(Math.random()*trunchets.length)](
              CANVAS_WIDTH / num_squares,
              color_1,
              color_2
            );
            pop();
            translate(CANVAS_WIDTH / num_squares * 2, 0);
        }
        pop();
    }
}
