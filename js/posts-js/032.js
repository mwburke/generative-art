
function setup() {
  var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  myCanvas.parent('viz032');
  background(247, 247, 247);

  noStroke();

  for (var i = 0; i < CANVAS_HEIGHT; i++) {
    for (var j = 0; j < CANVAS_WIDTH; j++) {
      var r = noise(0.01 * i, 0.01 * j, 1) * 255;
      var g = noise(0.01 * i, 0.01 * j, 100) * 255;
      var b = noise(0.01 * i, 0.01 * j, 300) * 255;
      // console.log(r, g, b);
      fill(color(r, g, b, 150));
      rect(i, j, 1, 1);
    }
  }
}

