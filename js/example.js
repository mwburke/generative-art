var rainButton;
var shineButton;
var dayToNight;
var opacity = 0;
var noiseScale1=0.015;
var noiseScale2=0.02;
var noiseScale3=0.03;
var range1 = 120;
var range2 = 100;
var range3 = 80;
var rainDrops = [];
var xpos = 0;
var ypos = 0;
var starStep = 10;
var sunY;
var sunX;
var sunSet = 0;
var lastLightOpac;

function setup() { 
  createCanvas(500, 400);
  background(120,180,255);
  // rainButton = createButton("RAIN");
  // rainButton.style("font-size:18px");
  // rainButton.mousePressed(greyDay);
  // shineButton = createButton("SHINE");
  // shineButton.style("font-size:18px");
  // shineButton.mousePressed(clearDay);
  dayToNight = createSlider(0,220,0);
} 

function draw() { 
  background(120,180,255);
  sun(sunX,sunY);
  lastLight();
  drawMounts(220, range3,90,noiseScale3);
  drawMounts(230, range2,95, noiseScale2);
  drawMounts(250,range1,100, noiseScale1);
  dayNight();
  opacity = dayToNight.value();
  sunY = dayToNight.value()*2 + 40;
  sunX = dayToNight.value()/2 + 40;
  if (dayToNight.value() > 25) {
  	sunSet = dayToNight.value()/2;
  }  else {
  	sunSet = 0;
  }
  if (dayToNight.value() > 35) {
  	lastLightOpac = dayToNight.value();	
  } else if (dayToNight.value() > 175) {
  	lastLightOpac = 350 - dayToNight.value();
  }
  else {
  	lastLightOpac = 0;
  }
  
}

function dayNight() {
  fill(10,20,40, opacity);
	rect(0,0,width,height);
}

function drawMounts(peak,range,scale,noiseScale) {
  for (var x=0; x < width; x++) {
    var noiseVal = noise((200+x)*noiseScale, 100*noiseScale);
    stroke(60,range,90);
    line(x, (peak)+noiseVal*scale, x, height);
  }
}

function stars() {
	fill(225);
  ellipse(xPos,yPos,diameter,diameter);
}

function greyDay() {
  if (dayToNight.value < 190) {
	opacity = dayToNight.value() + 20;
  } 
}

function clearDay() {
	background(120,180,255);
}	

function sun(sunX,sunY) {
	push();
  translate(sunX,sunY);
  noStroke();
  noStroke();
  ellipse(0,0,20,20);
  for (i = 0; i < 350; i++) {
    fill(255,159,128,sunSet*10/i);
  	ellipse(0,0,20+i,20+i);
  }
	fill(255,250,205);
  ellipse(0,0,20,20);
  pop();
}

function lastLight() {
	for (i = 0; i < 350; i++) {
    stroke(255,230,185,lastLightOpac*50/i);
  	line(0,height-100-i,width,height-100-i);
  }
}