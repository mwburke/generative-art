/** Line generation

*/

const sqrt3 = Math.sqrt(3);
let base_hex_rotation;
let radius;

function setup() {
    myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz049');
    base_hex_rotation = PI / 6;
    generate();
}

// Last color in the palette is the accent color
const raw_palettes = [
    'https://coolors.co/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529-000000',
    'https://coolors.co/f1faee-a8dadc-457b9d-1d3557-e63946',
    'https://coolors.co/577590-f3ca40-f2a541-f08a4b-d78a76-c5e7e2',
    'https://coolors.co/b39c4d-768948-607744-34623f-1e2f23-9fbbcc',
    'https://coolors.co/ccc9a1-f0ffce-a53f2b-4c230a-280004-545775',
    'https://coolors.co/815e5b-685155-7a6f9b-8b85c1-d4cdf4-bcedf6',
    'https://coolors.co/fff07c-80ff72-7ee8fa-eec0c6-e58c8a-bd9391',
    'https://coolors.co/ff6978-fffcf9-b1ede8-6d435a-352d39-4b296b',
    'https://coolors.co/eff9f0-ddc8c4-896a67-6b4d57-13070c-1e1e24',
    'https://coolors.co/af4d98-d66ba0-e5a9a9-f4e4ba-9df7e5-011627',
    'https://coolors.co/2f323a-77567a-c47ac0-e39ec1-debac0-72e1d1',
    'https://coolors.co/eadeda-998888-bfb8ad-823329-8a3033-14342b',
    'https://coolors.co/3f84e5-f0e2e7-b20d30-c17817-3f784c-e7e247',
    'https://coolors.co/32292f-99e1d9-f0f7f4-70abaf-705d56-9c914f',
]

function get_random_palette() {
    let url = rand(raw_palettes);
    let palette = get_palette(url);
    return palette;
}



function get_palette(url) {
    slash_split = url.split("/");
    color_text = slash_split[slash_split.length - 1];
    color_values = color_text.split("-");

    palette = []

    color_values.forEach(function (value) {
        palette.push(color("#" + value))
    });

    return palette;
}


function generate() {
    clear();
    // Generate parameters first??
    // Or do we want to push the everything into the functions themselves?
    lines_func = rand(lines_funcs);
    lines = lines_func();
    console.log('generated lines')
    // console.log(lines);
    line_draw_func = rand(line_draw_funcs);
    line_draw_func(lines);
    console.log('drew lines');
}



const lines_funcs = [
    // function straight_lines_horizontal_vertical() {
    //     const num_lines_side = getRandomInt(5, 20);
    //     const max_width = width * 0.8;
    //     const max_height = height * 0.8;
    //     let lines = [];
    //     for (let i = 0; i <= num_lines_side; i++) {
    //         lines.push([
    //             createVector(
    //                 width * 0.1 + max_width / num_lines_side * i,
    //                 height * 0.1
    //             ),
    //             createVector(
    //                 width * 0.1 + max_width / num_lines_side * i,
    //                 height * 0.9
    //             )
    //         ]);
    //         lines.push([
    //             createVector(
    //                 width * 0.1,
    //                 height * 0.1 + max_height / num_lines_side * i
    //             ),
    //             createVector(
    //                 width * 0.9,
    //                 height * 0.1 + max_height / num_lines_side * i
    //             )
    //         ]);
    //     }
    //     return lines;
    // },
    // function fully_random() {
    //     const num_lines = getRandomInt(10, 100);
    //     const min_length = height * 0.02;
    //     let lines = [];
    //     for (let i = 0; i <= num_lines; i++) {
    //         let line = [
    //             createVector(
    //                 width * Math.random(),
    //                 height * Math.random()
    //             ),
    //             createVector(
    //                 width * Math.random(),
    //                 height * Math.random()
    //             )
    //         ];
    //         while (line[0].dist(line[1]) < min_length) {
    //             line = [
    //                 createVector(
    //                     width * Math.random(),
    //                     height * Math.random()
    //                 ),
    //                 createVector(
    //                     width * Math.random(),
    //                     height * Math.random()
    //                 )
    //             ];
    //         }
    //         lines.push(line);
    //     }
    //     return lines;
    // },
    // function circle_ends_shrink_to_center() {
    //     let num_lines = getRandomInt(30, 70);
    //     let lines = [];
    //     for (let i = 0; i < num_lines; i++) {
    //         let ang1 = 2 * PI * random();
    //         // let ang2 = ang1 + PI / 3 + PI * random();
    //         let ang2 = ang1 + PI * random();
    //         let radius = (1 - i / num_lines) * width;
    //         new_line = [
    //             createVector(width / 2 + radius * cos(ang1), height / 2 + radius * sin(ang1)),
    //             createVector(width / 2 + radius * cos(ang2), height / 2 + radius * sin(ang2))
    //         ];

    //         let intersections = [];
    //         let intersect_distances = [];
    //         let backwards_intersect_distances = [];

    //         if (lines.length > 1) {
    //             lines.forEach(function (line) {
    //                 if ((new_line[0].x != line[0].x) | (new_line[0].y != line[0].y)) {
    //                     intersect = intersect_point(new_line[0], new_line[1], line[0], line[1]);

    //                     if (intersect != null) {
    //                         intersect_dist = new_line[0].dist(intersect);
    //                         intersections.push(intersect);
    //                         intersect_distances.push(intersect_dist);

    //                         intersect_dist = new_line[1].dist(intersect);
    //                         backwards_intersect_distances.push(intersect_dist);
    //                     }
    //                 }
    //             })
    //         } else {
    //             num_lines -= 1;
    //         }

    //         intersections = intersections.concat(intersections);
    //         intersect_distances = intersect_distances.concat(backwards_intersect_distances);
    //         console.log(intersections,  intersect_distances);

    //         if (intersections.length > 0) {
    //             const sorted_intersections = sort_array_by_other_array(intersections, intersect_distances);
    //             const intersect_num_to_take = 0;
    //             // = Math.min(getRandomInt(1, 3), sorted_intersections.length - 1);
    //             new_line = [
    //                 new_line[0],
    //                 sorted_intersections[intersect_num_to_take]
    //             ];
    //         }

    //         lines.push(new_line);

    //     }
    //     return lines;
    // },
    function hex_angles() {
        let num_lines = getRandomInt(30, 70);
        radius = width / (Math.random() * 10);
        const base_height = -radius * sqrt3 / 2;
        const base_width = -radius;
        let lines = [];

        while (num_lines > 0) {
            let i = getRandomInt(1, Math.floor(width / (radius + 2) - 1));
            let j = getRandomInt(1, Math.floor(height / (radius + 2) - 1));
            let x = base_width + i * radius * 1.5;
            let y = base_height + j * radius * sqrt3 - (i % 2) * radius * sqrt3 / 2;
            // let x = base_width + j * radius * sqrt3 - (i % 2) * radius * sqrt3 / 2;
            // let y = base_height + i * radius * 1.5;
            const line_length = width * 1.5;
            const angle = base_hex_rotation * getRandomInt(0, 5);

            let new_line = [
                createVector(x, y),
                createVector(x + line_length * cos(angle), y + line_length * sin(angle))
            ];

            let intersections = [];
            let intersect_distances = [];

            if (lines.length > 1) {
                lines.forEach(function (line) {
                    if ((new_line[0].x != line[0].x) | (new_line[0].y != line[0].y)) {
                        intersect = intersect_point(new_line[0], new_line[1], line[0], line[1]);

                        if (intersect != null) {
                            intersect_dist = new_line[0].dist(intersect);
                            intersections.push(intersect);
                            intersect_distances.push(intersect_dist);
                        }
                    }
                })
            } else {
                num_lines -= 1;
            }

            if (intersections.length > 0) {
                const sorted_intersections = sort_array_by_other_array(intersections, intersect_distances);
                const intersect_num_to_take = Math.min(getRandomInt(1, 3), sorted_intersections.length - 1);
                new_line = [
                    new_line[0],
                    sorted_intersections[intersect_num_to_take]
                ];


            }
            lines.push(new_line);
            num_lines -= 1;
        }
        return lines;
    }
];


const line_draw_funcs = [
    function basic_black_lines(lines) {
        push();
        noFill();
        stroke(0);
        for (let i = 0; i < lines.length; i++) {
            line(lines[i][0].x, lines[i][0].y, lines[i][1].x, lines[i][1].y)
        }
        pop();
    },
    function random_from_palette(lines) {
        let palette = get_random_palette();
        const accent = palette.pop();
        palette = shuffle(palette);
        const bg = palette.pop();

        const lengths = [];
        for (let i = 0; i < lines.length; i++) {

        }

        push();
        background(bg);
        strokeWeight(2);
        noFill();
        for (let i = 0; i < lines.length; i++) {
            if (Math.random() < 0.01) {
                push();
                strokeWeight(5);
                stroke(accent);
                line(lines[i][0].x, lines[i][0].y, lines[i][1].x, lines[i][1].y)
                pop();
            } else {
                stroke(rand(palette));
                line(lines[i][0].x, lines[i][0].y, lines[i][1].x, lines[i][1].y)
            }
        }
        pop();
    },
    function larger_longer(lines) {
        let palette = get_random_palette();
        palette = shuffle_arr(palette)
        const bg = palette.pop();
        const c = palette.pop();

        let distances = [];
        for (let i= 0; i < lines.length; i++) {
            distances.push(lines[i][0].dist(lines[i][1]));
        }
        const max_length = Math.max(...distances);
        const min_length = Math.min(...distances);

        const min_sw = width / 500;
        const max_sw = width / 100;

        push();
        background(bg);
        noFill();
        for (let i = 0; i < lines.length; i++) {
            push();
            // console.log((lines[i][0].dist(lines[i][1]) - min_length) / (max_length - min_length));
            strokeWeight(lerp(min_sw, max_sw, (lines[i][0].dist(lines[i][1]) - min_length) / (max_length - min_length)));
            stroke(c);
            line(lines[i][0].x, lines[i][0].y, lines[i][1].x, lines[i][1].y)
        }
        pop();
    }

]


function keyPressed() {
    console.log('regenerating')
    if (key == 'r') {
        generate();
    }
}


function clockwise_lines(center, lines) {
    let angles = [];
    lines.forEach(function (l) {
        angles.push(center.sub(l).heading());
    })
    lines.slice().sort(function (a, b) {
        return angles.indexOf(a) - angles.indexOf(b);
    });
    return lines;
}



function intersect_point(p1, p2, p3, p4) {
    const ua = ((p4.x - p3.x) * (p1.y - p3.y) -
        (p4.y - p3.y) * (p1.x - p3.x)) /
        ((p4.y - p3.y) * (p2.x - p1.x) -
            (p4.x - p3.x) * (p2.y - p1.y));

    const ub = ((p2.x - p1.x) * (p1.y - p3.y) -
        (p2.y - p1.y) * (p1.x - p3.x)) /
        ((p4.y - p3.y) * (p2.x - p1.x) -
            (p4.x - p3.x) * (p2.y - p1.y));

    const x = p1.x + ua * (p2.x - p1.x);
    const y = p1.y + ua * (p2.y - p1.y);


    let intersection = createVector(x, y);

    if ((ua < 0) | (ua > 1) | (ub < 0) | (ub > 1)) {
        intersection = null;
    }

    return intersection;
}

function rand(items) {
    return items[~~(items.length * Math.random())];
}

function shuffle_arr(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sort_array_by_other_array(itemsArray, sortingArr) {
    sortedItems = itemsArray.slice().sort(function (a, b) {
        return sortingArr.indexOf(a) - sortingArr.indexOf(b);
    });

    return sortedItems
}
