let hexagons = [];
let hex_locations = [];
let color_1;
let color_2;
const color_ratio = 0.7;
const radius = 40;

function setup() {
    var myCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent('viz038');

    color_1 = color(0);
    color_2 = color(95, 218, 232);

    generate();
}


function draw() {
}


// TODO: one three loop one in the center surrounded by
// six around it that have the same one but rotated??

function generate() {
   background(247);
   hexagons = [];

   const sqrt3 = Math.sqrt(3);
   let base_rotation = PI / 6;

   const base_height = -radius * sqrt3 / 2;
   const base_width = -radius;

   const select_type = Math.random();
   let connections = [];
   let num_reps;

   if (select_type <= 0.3) {
      // random
      console.log('random');
   } else if (select_type <= 0.7) {
      // diagonal
      num_reps = Math.floor(2 + Math.random() * 4);
      for (let i = 0; i < num_reps; i++) {
         connections.push(makeConnections());
      }
      console.log('diagonal', num_reps)
   } else if (select_type <= 1.0) {
      // blocks
      num_reps = Math.floor(2 + Math.random() * 3);
      for (let i = 0; i < num_reps; i++) {
         connections[i] = [];
         for (j = 0; j < num_reps; j++) {
            connections[i].push(makeConnections());
         }
      }
      console.log('block', num_reps);
   }

   for (j = 0; j < height / (radius + 2); j++) {
      for (i = 0; i < width / (radius + 2); i++) {
         let x = base_width + j * radius * sqrt3 - (i % 2) * radius * sqrt3 / 2;
         let y = base_height + i * radius * 1.5;
         hex_locations.push([x, y]);

         let connection;

         if (select_type <= 0.3) {
            const connection = null;
         } else if (select_type <= 0.7) {
            // diagonal
            connection = connections[(i + j) % connections.length];
         } else if (select_type <= 1.0) {
            // blocks
            connection = connections[i % connections.length][j % connections.length];
         }

         hexagons.push(new ConnectionHexagon(x, y, base_rotation, radius, color_1, color_2, color_ratio, connection));
      }
   }


   hexagons.forEach(function(hexagon) {
      hexagon.draw();
   })
}

function keyPressed() {
  if (key == 'r') {
    generate();
  }
}


function makeConnections() {
   const connections = shuffle([0, 1, 2, 3, 4, 5]);
   return [[connections[0], connections[1]],
          [connections[2], connections[3]],
          [connections[4], connections[5]]
         ];
}

function mousePressed() {
   const mouse_location = [mouseX, mouseY];
   let min_dist = 10000000;
   let min_index = null;
   for (let i = 0; i < hex_locations.length; i++) {
      if (distance(mouse_location, hex_locations[i]) < min_dist) {
         min_dist = distance(mouse_location, hex_locations[i]);
         min_index = i;
      }
   }

   hexagons[min_index].spinRight();

   background(247);
   hexagons.forEach(function(hexagon) {
      hexagon.draw();
   })
}
