var input, button, base_color, hex_pattern;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz4');
    background(5, 5, 5, 0);

    input = createInput("#FF6AD5");
    input.position(50, 20);

    //input.value("#FF6AD5");
    base_color = color("#FF6AD5");
    hex_pattern = RegExp("#[0-9a-fA-F]{6}");

    button = createButton('generate color palette');
    button.position(50, 40);
    button.style("position", "relative");
    button.mousePressed(generate_palette);


    textAlign(CENTER);
    textSize(50);

    generate_palette();
}



function generate_palette() {
    var input_color = input.value();
    if (hex_pattern.test(input_color)) {
        base_color = color(input_color);
        for (var i=0; i<5; i++) {
            rect_color = base_color.levels;
            rect_color[0] += random(-40, 40);
            rect_color[1] += random(-40, 40);
            rect_color[2] += random(-40, 40);
            fill(rect_color);
            noStroke();
            rect(0, i * (CANVAS_WIDTH / 5), CANVAS_WIDTH, (i + 1) * (CANVAS_WIDTH / 5));
        }
    }
}
