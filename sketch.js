// Initialize variables.
let num = 200;
let vecLocation = [];
let vecVelocity = [];
let R = [];
let G = [];
let B = [];
let t;
let mountainHeights = [];
let c1, c2;
let noiseDetailVal = 1; // Add noiseDetailVal.
var a = 0.0, x, y, n, step = 3;
let skyColor1, skyColor2;

// Initialization function: Set canvas and initial state.
function setup() {
createCanvas(900, 630);
background(23, 108, 177);
frameRate(60);
changeColors();  // Set the initial color.
for (let i = 0; i < num; i++) {
vecLocation[i] = createVector(random(0, width), random(height/2, height));
vecVelocity[i] = createVector(20, 1);
R[i] = 255;
G[i] = 165;
B[i] = 0;
}
init();
noStroke();
}

// Draw function.
function draw() {
    if (frameCount % 60 == 0) {  // Change color every 60 frames(every second).
        changeColors();
    }
    if (frameCount % 300 == 0) {  // Change color every 300 frames.
        skyColor1 = color(random(255), random(255), random(255));
    }
river();
shade();
mountain();
deepMountain();
castle();

// Sky gradient with cloud Layers.
for (y = 0; y < height / 2; y += step) {
   let interpColor = getColorForHeight(y);
   for (x = 0; x < width; x += step) {
   n = noise(x / 100., y / 25., t);
   if (n > 0.99) {
   fill('#c96902');
   } else {
   fill(interpColor.levels[0], interpColor.levels[1], interpColor.levels[2], n * map(y, 0, height / 2, 255, 50));
   }
   rect(x, y, step, step);
   }
}
a += 0.1;
}

// Function that randomly changes color.
function changeColors() {
    // Set random color of sky.
    skyColor1 = color(random(255), random(255), random(255));
    skyColor2 = color(random(255), random(255), random(255));
    
  }

// Function that drawing castle.
function castle(){
    //castle bottom
    fill(92,61,43); // Use new colors.
    triangle(40,320,80,320,80,260);
    triangle(180,300,180,320,200,320);
    triangle(350,320,200,220,220,320);
    
    //castle middle
    rect(100,200,140,100);
    rect(80,220,160,100);
    triangle(80,220,100,220,100,200);
    triangle(160,200,240,200,200,140);
    rect(100,160,60,40);
    quad(110,130,120,140,120,160,110,160);
    rect(120,80,40,80);
    triangle(140,20,160,80,120,80);
}

// Function that drawing initial river.
function river(){
   for (let i = 0; i < num; i++) {
       fill(R[i], G[i], B[i]);
       vecLocation[i].add(vecVelocity[i]);
       ellipse(vecLocation[i].x, vecLocation[i].y, 30, 2);
      
       if (vecLocation[i].x < 0 || vecLocation[i].x > width) {
       vecVelocity[i].x *= -1;
       if (vecLocation[i].x < 0) {
       if (
       abs(vecLocation[i].y) < height/2+height/2 / 4
       ) {
       // light yellow.
       R[i] = 224;
       G[i] = 210;
       B[i] = 201;
       } else if (
       abs(vecLocation[i].y) < height/2+height/2*2 / 4
       ){
       // Fuel yellow.
       R[i] = 234;
       G[i] = 170;
       B[i] = 48;
       } else if (
       abs(vecLocation[i].y) < height/2+height/2*3 / 4
       ){
       R[i] = 173;
       G[i] = 99;
       B[i] = 17;
       }else{
       // Dark blue.
       R[i] = 86;
       G[i] = 107;
       B[i] = 155;
       }
       } else {
       if (
       abs(vecLocation[i].y) < height/2+height/2 / 4
       ) {
       // Brown.
       R[i] = 177;
       G[i] = 121;
       B[i] = 64;
       } else if (
       abs(vecLocation[i].y) < height/2+height/2*2 / 4
       ){
       R[i] = 83;
       G[i] = 106;
       B[i] = 155;
       } else if (
       abs(vecLocation[i].y) < height/2+height/2*3 / 4
       ){
       // Orange.
       R[i] = 225;
       G[i] = 82;
       B[i] = 47;
       }else{
       // Purple
       R[i] = 99;
       G[i] = 44;
       B[i] = 159;
       }
       }
       } // Check boundaries.
       if (vecLocation[i].y < 0 || vecLocation[i].y > height) {
       vecVelocity[i].y *= -1;
       if (vecLocation[i].y < 0) {
       // Brown red.
       R[i] = 182;
       G[i] = 75;
       B[i] = 26;
       } else {
       // Haze blue.
       R[i] = 130;
       G[i] = 159;
       B[i] = 196;
       }
       }
       }
}

// Function of sky color gradient.
function getColorForHeight(y) {
    let h = height / 2;
    if (y < h * (1/8)) {
      return lerpColor(skyColor1, skyColor2, y / (h * (1/8)));
    } else if (y < h * (2/8)) {
      return lerpColor(skyColor2, skyColor1, (y - h * (1/8)) / (h * (1/8)));
    } else if (y < h * (3/8)) {
      return lerpColor(skyColor1, skyColor2, (y - h * (2/8)) / (h * (1/8)));
    } else if (y < h * (4/8)) {
      return lerpColor(skyColor2, skyColor1, (y - h * (3/8)) / (h * (1/8)));
    } else if (y < h * (5/8)) {
      return lerpColor(skyColor1, skyColor2, (y - h * (4/8)) / (h * (1/8)));
    } else if (y < h * (6/8)) {
      return lerpColor(skyColor2, skyColor1, (y - h * (5/8)) / (h * (1/8)));
    } else if (y < h * (7/8)) {
      return lerpColor(skyColor1, skyColor2, (y - h * (6/8)) / (h * (1/8)));
    } else {
      return lerpColor(skyColor2, skyColor1, (y - h * (7/8)) / (h * (1/8)));
    }
  }

// Function that drawing mountain height by using nosieSeed.
function init() {
t = 0;
noiseSeed(int(random(5)));
for (let x = 0; x < width; x++) {
let n = noise(t);
t += 0.01;
mountainHeights[x] = n * 100;
}
c1 = color(0);
c2 = color(0, 102, int(random(100, 255)));
}

// Function that drawing mountain.
function mountain() {
push();
stroke(105,105,105,random(0, 50)/3);
strokeWeight(10);
let rand = (0.1, 0.3)
for (let i = width ; i > 0; i--) {
line(width/3 +i , height / 2 , width /2 +i, height / 2 - (mountainHeights[i] * rand));
}
pop();
}

// Function that drawing deepMountain.
function deepMountain() {
push();
let rand = random(1.5,2)
stroke(92,61,43,random(100, 150)/3);
strokeWeight(10);
for (let x = width; x > 0; x--) {
line(width/ 2 - x, height / 2 , width/3 - x, height / 2 - (mountainHeights[x] * rand));
}
pop();
}

// Function that drawing the shade of castle.
function shade() {
let lenth = random(20, 80);
push();
for (t = 0; t<400; t+=2){
let s = t/12 + lenth / 3 + random(t/10, t/5);
stroke(97,66,54, t/40 + random(150, 200)/3);
strokeWeight(1 + t/60);
line(180 - s, t+height/2, 100 + s, t+height/2);
}
pop()
}