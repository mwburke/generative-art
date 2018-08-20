var cellSize = 20;
var xOffset = 40;
var yOffset = 40;
var cols = Math.ceil((CANVAS_WIDTH - xOffset) / cellSize);
var rows = Math.ceil((CANVAS_HEIGHT - yOffset) / cellSize);
var gap_ratio = 0.7;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz017');
    background(247, 247, 247);

}


function draw() {
    blendMode(BLEND);
    background(247, 247, 247);
    noStroke();

    blendMode(DIFFERENCE);

    generate_red();
    generate_blue();
    generate_green();
}


function generate_red() {
    var grid = [];

    for (j = -2; j < rows; j++) {
        for (i = -2; i < cols; i++) {
            tempXOffset = xOffset * (frameCount % 90) / 90;
            var cell = new Cell(i, j, cellSize, tempXOffset, yOffset, red_generator(), stroke_generator(i, j), false, gap_ratio);
            grid.push(cell);
        }
    }

    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}


function generate_blue() {
    var grid = [];

    for (j = -2; j < rows; j++) {
        for (i = -2; i < cols; i++) {
            tempXOffset = xOffset * (frameCount % 30) / 30;
            tempYOffset = yOffset * (frameCount % 30) / 30 * 1.7;
            var cell = new Cell(i, j, cellSize, tempXOffset, tempYOffset, blue_generator(), stroke_generator(i, j), false, gap_ratio);
            grid.push(cell);
        }
    }

    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

function generate_green() {
    var grid = [];

    for (j = -2; j < rows; j++) {
        for (i = -2; i < cols; i++) {
            tempXOffset = -xOffset * (frameCount % 30) / 30;
            tempYOffset = -yOffset * (frameCount % 30) / 30 * 1.7;
            var cell = new Cell(i, j, cellSize, tempXOffset, tempYOffset, green_generator(), stroke_generator(i, j), false, gap_ratio);
            grid.push(cell);
        }
    }

    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}


function red_generator() {
    return color(255, 0, 0);
}

function blue_generator() {
    return color(0, 0, 255);

}

function green_generator() {
    return color(0, 255, 0);
}

function stroke_generator(i, j) {
    return color(0, 0, 0, 0);
}
