const colors = [
  "#070606",
  "#3a3639",
  "#8d838b",
  "#ebd9e8",
  "#d5ceea",
  "#afb7e1",
  "#91a3d6",
  "#b9a5c3",
  "#daa6b0",
  "#ecaeaa"
];

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
    this.velocity = createVector(random(-0.5,0.5), random(-0.5,0.5));
  }
  renderCircle() {
    fill(this.color);
    this.position.add(this.velocity)
    width = window.innerWidth
    height = window.innerHeight
    
    // keeps within bounds of window   
    if (this.position.x > width - 50 || this.position.x < 50) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.position.y > height - 50 || this.position.y < 50) {
      this.velocity.y = this.velocity.y * -1;
    }
    circle(this.position.x, this.position.y, this.size)
  }
}