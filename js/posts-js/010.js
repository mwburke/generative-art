var cellSize = 20;
var grid = [];
var xOffset = 0;
var yOffset = 15;
var cols = Math.ceil((CANVAS_WIDTH - xOffset) / cellSize);
var rows = Math.ceil((CANVAS_HEIGHT - yOffset) / cellSize);


function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz010');
    background(247, 247, 247);

    for (j = 0; j < rows; j++) {
        for (i = 0; i < cols; i++) {
            var cell = new Cell(i, j, cellSize, xOffset, yOffset, fill_generator(i, j), stroke_generator(i, j));
            grid.push(cell);
        }
    }

    noLoop();
}


function draw() {
    background(247, 247, 247);

    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}


function fill_generator(i, j) {
    color_values = color(d3.interpolateSpectral(i / rows * 2)).levels;
    for (i = 0; i < color_values.length; i++) {
        color_values[i] += random(-1, 1) * abs(cols/2 - i);
    }
    return color(color_values);
}

function stroke_generator(i, j) {
    return color(0, 0, 0, 0);
}
