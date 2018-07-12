var palette_num = 0;
var cols = 20;
var color_palettes = [
    ["#661246","#ae1357","#f9247e","#d7509f","#f9897b"],
    ["#FF6AD5","#C774E8","#AD8CFF","#8795E8","#94D0FF"],
    ["#fbcff3","#f7c0bb","#acd0f4","#8690ff","#30bfdd","#7fd4c1"],
    ["#532e57","#a997ab","#7ec488","#569874","#296656"],
    ["#7BD4CC", "#BEA42E", "#7B895B", "#037367", "#00281F"],
    ["#91B3BC", "#5B7D87", "#45415E", "#2B4251", "#2E323C"],
    ["#D0D3C5", "#56B1BF", "#08708A", "#D73A31", "#032B2F"]
];
var circle_prob = 0.6;
var second_circle_prob = 0.2;

var side_length = CANVAS_WIDTH / cols;

var directions = ["left", "right", "top", "bottom"];

var directions_opposite = {
    "left": "right",
    "right": "left",
    "top": "bottom",
    "bottom": "top"
}

function setup() {

    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz011');
    background(247, 247, 247);

    rectMode(CENTER);
    regenerate();
}


function regenerate() {
    for (i = side_length / 2; i < CANVAS_WIDTH; i += side_length) {
        for (j = side_length / 2; j < CANVAS_HEIGHT; j += side_length) {
            make_square(i, j);
        }
    }
}


function make_square(x, y) {
    colors = color_palettes[palette_num];
    noStroke();
    fill(get_color(colors));
    rect(x, y, side_length, side_length);

    if (random(1) < circle_prob) {
        direction = directions[Math.floor(random(directions.length))];
        fill(get_color(colors));
        make_semi_circle(x, y, direction);
        if (random(1) < second_circle_prob) {
            fill(get_color(colors));
            make_semi_circle(x, y, directions_opposite[direction]);
        }
    }

}


function make_semi_circle(x, y, direction) {
    if (direction == "left") {
        arc(x + -side_length / 2, y, side_length, side_length, radians(270), radians(450))
    } else if (direction == "right") {
        arc(x + side_length / 2, y , side_length, side_length, radians(90), radians(270));
    } else if (direction == "top") {
        arc(x, y + -side_length / 2, side_length, side_length, radians(0), radians(180));
    } else if (direction == "bottom") {
        arc(x, y + side_length / 2, side_length, side_length, radians(180), radians(360));
    }
}

function get_color(colors) {
    return color(colors[Math.floor(random(colors.length))])
}


function mousePressed() {
    palette_num = Math.floor(random(color_palettes.length));
    regenerate();
}
