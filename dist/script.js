const colors = [
    "#2dd88e",
    "#83ecb7",
    "#c8d2d5",
    "#fab1f3",
    "#ffacf9",
    "#ffacfc",
    "#faafff",
    "#cad2ff",
    "#84eeff",
    "#56fafb"
];

const rgbColors = [
  "rgb(45,216,142)",
  "rgb(131,236,183)",
  "rgb(200,210,213)",
  "rgb(250,177,243)",
  "rgb(255,172,249)",
  "rgb(255,172,252)",
  "rgb(250,175,255)",
  "rgb(202,210,255)",
  "rgb(132,238,255)",
  "rgb(86,250,251)"
]

let circles = [];
let circleSize = 100;

function drawColorPalette() {
  for (let i = 0; i < colors.length; i++) {
    let color = colors[i];
    fill(color);
    circle(50 + i * 50, 50, 50);
  }
}

function initializeRandomCircles(){
    for (let i = 0; i < 100; i++) {
      circles.push(new CircleFriend());
    }
}


function setup() {
  background(random(colors));
  createCanvas(windowWidth,windowHeight);
  drawColorPalette();
  initializeRandomCircles();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for (let i = 0; i< circles.length; i ++){
    let circle = circles[i];
    circle.renderCircle()
  }
}

class CircleFriend {
  constructor() {
    this.position = createVector(random(50, windowWidth - 50), random(50, windowHeight - 50));
    this.size = circleSize;
    this.color = random(colors)
    this.velocity = createVector(randomGaussian(0.5, 2), randomGaussian(0.5, 2));
  }
  renderCircle() {
    fill(this.color);
    this.position.add(this.velocity)
    const width = window.innerWidth
    const height = window.innerHeight

    if (this.position.x > width - 50 || this.position.x < 50) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.position.y > height - 50 || this.position.y < 50) {
      this.velocity.y = this.velocity.y * -1;
    }
    circle(this.position.x, this.position.y, this.size)
  }
}
