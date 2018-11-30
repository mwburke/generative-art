var rotate_speed = 0.5;
var pink = '#d12b9c';
var lightblue = '#4AD6E0';
var center = CANVAS_WIDTH / 2;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz020');
    background(247, 247, 247);
    //rectMode(CENTER);

}

function draw() {
    background(247, 247, 247);
    var x, y;

    //pointLight(150, 100, 0, 500, 0, 200);

    // Center
    hexagon_outline(center, center, 15, frameCount * -rotate_speed, color(lightblue), 255, 2);

    // Circle 1
    noFill();
    stroke(color(pink));
    ellipse(center, center, 45, 45);

    stroke(color(lightblue));
    for(var i=0; i<TWO_PI; i += TWO_PI / 6) {
      x = center + cos(i) * 36;
      y = center + sin(i) * 36;

      //quad(x, y, 15, 10);
      polygon(x, y, 7, 4, 180 - i / TWO_PI * 360);
      //ellipse(x, y, 15, 15);
    }

    stroke(color(lightblue));
    for(var i=TWO_PI / 4.5; i<TWO_PI + TWO_PI / 4.5; i += TWO_PI / 6) {
      arc(center, center, 78, 78, i, i + TWO_PI / 18);
      arc(center, center, 72, 72, i, i + TWO_PI / 18);
    }

    //Circle 2
    noFill();
    stroke(color(pink));
    for(var i=0; i<TWO_PI; i += TWO_PI / 36) {
      arc(center,center, 100, 100, i, i + TWO_PI / 72);
    }

    for(var i=0; i < TWO_PI; i += TWO_PI / 24) {
      x1 = center + cos(i + frameCount * rotate_speed / 64) * 60;
      y1 = center + sin(i + frameCount * rotate_speed / 64) * 60;
      x2 = center + cos(i + frameCount * rotate_speed / 64) * 72;
      y2 = center + sin(i + frameCount * rotate_speed / 64) * 72;
      x3 = center + cos(i + TWO_PI / 48 + frameCount * rotate_speed / 64) * 66;
      y3 = center + sin(i + TWO_PI / 48 + frameCount * rotate_speed / 64) * 66;

      stroke(color(pink));
      line(x1, y1, x2, y2);
      stroke(color(lightblue));
      ellipse(x3, y3, 6, 6);
    }

    // Circle 3
    noFill();
    stroke(color(pink));
    strokeWeight(1);
    ellipse(center, center, 160, 160);
    strokeWeight(2);
    ellipse(center, center, 168, 168);

    stroke(color(lightblue));
    for(var i=0; i<TWO_PI; i += TWO_PI / 12) {
      // arc(center, center, 78, 78, i, i + TWO_PI / 18);
      // arc(center, center, 72, 72, i, i + TWO_PI / 18);
      x1 = center + cos(i + TWO_PI / 108) * 110;
      y1 = center + sin(i + TWO_PI / 108) * 110;
      x2 = center + cos(i - TWO_PI / 108) * 100;
      y2 = center + sin(i - TWO_PI / 108) * 100;

      x3 = center + cos(i - TWO_PI / 108) * 110;
      y3 = center + sin(i - TWO_PI / 108) * 110;
      x4 = center + cos(i + TWO_PI / 108) * 100;
      y4 = center + sin(i + TWO_PI / 108) * 100;

      line(x1, y1, x2, y2);
      line(x3, y3, x4, y4);

      x5 = center + cos(i + TWO_PI / 24) * 105;
      y5 = center + sin(i + TWO_PI / 24) * 105;
      stroke(color(lightblue));
      ellipse(x5, y5, 16, 16);
      stroke(color(pink));
      ellipse(x5, y5, 10, 10);
      stroke(color(lightblue));
      ellipse(x5, y5, 4, 4);

    }


    // Circle 4
    noFill();
    stroke(color(pink));
    for(var i=0; i<TWO_PI; i += TWO_PI / 24) {
      arc(center, center, 245, 245, i, i + TWO_PI / 60);
    }


}
