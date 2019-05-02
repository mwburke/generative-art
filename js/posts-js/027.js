var m = 10;
var n = 10;
var elements = [];
var heights = [];
var widths = [];
var cumul_heights;
var cumul_widths;
var t = 0;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz027');
    background(247, 247, 247);

    var constant_color;

    if (Math.random() < 0.5) {
        constant_color = true;
    } else {
        constant_color = false;
    }

    var base_color = [40, 40, 40];

    if (Math.random() < 0.5) {
        base_color = color(d3.interpolateRainbow(Math.random())).levels.slice(0, 3);
    }

    var square_color;

    for (var i = 0; i < m; i++) {
        elements[i] = [];
        heights[i] = [];
        widths[i] = CANVAS_WIDTH / n;

        for (var j = 0; j < n; j++) {
            heights[i][j] = CANVAS_HEIGHT / m;

            square_color = base_color;

            if (!constant_color) {
                square_color[0] = square_color[0] + (Math.random() - 0.5) * 20;
                square_color[1] = square_color[1] + (Math.random() - 0.5) * 20;
                square_color[2] = square_color[2] + (Math.random() - 0.5) * 20;
            }

            elements[i][j] = new square_element(color(square_color));
        }
    }
}

function draw() {
    // calculate changes to widths and heights
    // normalize those values and re-apply to the elements
    // redraw everything

    t += 0.01;
    background(247, 247, 247);

    cumul_heights = [];
    cumul_widths = [];

    for (var i = 0; i < n; i++) {
        widths[i] = max(widths[i] + noise(i, t) * n, 10);
        cumul_widths[i] = [];
        cumul_heights[i] = [];

        temp_heights = heights[i];
        for (var j = 0; j < m; j++) {
            // temp_heights[j] = temp_heights[j] + Math.random() * m;
            temp_heights[j] = temp_heights[j] + noise(i, j, t) * m;
        }
        heights[i] = normalize(temp_heights, CANVAS_HEIGHT);

        cumul_heights[i][0] = 0;
        for (var j = 1; j < m; j++) {
            cumul_heights[i][j] = heights[i][j - 1] + cumul_heights[i][j - 1];
        }
    }

    widths = normalize(widths, CANVAS_WIDTH);
    cumul_widths[0] = 0;

    for (var i = 1; i < m; i++) {
        cumul_widths[i] = widths[i - 1] + cumul_widths[i - 1];
    }

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            elements[i][j].draw(
                cumul_widths[i],
                cumul_heights[i][j],
                widths[i],
                heights[i][j]
            );
        }
    }
}

function getSum(total, num) {
  return total + num;
}

function normalize(arr, value) {
    var total = arr.reduce(getSum);

    normalized = arr.map(function(v) {
        return v / total * value;
    })

    return normalized;
}

function square_element(c) {
    this.c = c;

    if (Math.random() < 0.5) {
        this.fill = true;
    } else {
        this.fill = false;
    }

    this.draw = function(x, y, width, height) {

        strokeWeight(5);
        stroke(this.c);

        if (this.fill) {
            fill(this.c);
        } else {
            noFill();
        }

        rect(width * 0.1 + x, height * 0.1 + y, width * 0.8, height * 0.8, 5);
    }
}
