import { initializePeer } from "./networking.js";

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
  "#56fafb",
];

console.log("initialize peer");
initializePeer();
console.log("done initializing peer");

let circles = [];
let circleSize = 100;
let draggingCircle = null;
let offsetX, offsetY;
let circleText = ["hello", "world"];
function drawColorPalette() {
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    circle(50 + i * 50, 50, 50);
  }
}

function initializeRandomCircles() {
  for (let i = 0; i < circleText.length; i++) {
    circles.push(new CircleFriend());
  }
}

function setup() {
  input = createInput("");
  input.position(50, 50);
  // Create a button and place it beneath the canvas.
  let button = createButton("click me");
  button.position(200, 50);

  // Call repaint() when the button is pressed.
  button.mousePressed(() => {
    circles.push(new CircleFriend());
    circleText.push(input.value());
  });
  createCanvas(windowWidth, windowHeight);
  drawColorPalette();
  initializeRandomCircles();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // Draw circles in order
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    if (circleText.length > i) {
      circle.renderCircle(circleText[i]);
    } else {
      circle.renderCircle();
    }
  }
}

function mouseDragged() {
  if (draggingCircle) {
    draggingCircle.position.x = mouseX - offsetX;
    draggingCircle.position.y = mouseY - offsetY;
  }
}

function mousePressed() {
  let topmostCircle = null;

  // Iterate in reverse order to find the topmost circle
  for (let i = circles.length - 1; i >= 0; i--) {
    if (circles[i].contains(mouseX, mouseY)) {
      topmostCircle = circles[i];
      break;
    }
  }

  if (topmostCircle) {
    draggingCircle = topmostCircle;
    draggingCircle.isDragged = true;
    offsetX = mouseX - draggingCircle.position.x;
    offsetY = mouseY - draggingCircle.position.y;

    // Bring the dragged circle to the front by reordering the array
    circles.splice(circles.indexOf(draggingCircle), 1);
    circles.push(draggingCircle);
  }
}

function mouseReleased() {
  if (draggingCircle) {
    // Resume movement after dragging
    draggingCircle.velocity = createVector(
      randomGaussian(0.5, 2),
      randomGaussian(0.5, 2)
    );
    draggingCircle.isDragged = false;
    draggingCircle = null;
  }
}

class CircleFriend {
  constructor() {
    this.position = createVector(
      random(50, windowWidth - 50),
      random(50, windowHeight - 50)
    );
    this.size = circleSize;
    this.color = random(colors);
    this.velocity = createVector(
      randomGaussian(0.5, 2),
      randomGaussian(0.5, 2)
    );
    this.isDragged = false;
  }

  renderCircle(circleText) {
    fill(this.color);
    if (!this.isDragged) {
      this.position.add(this.velocity);
      this.bounceOffWalls();
    }
    circle(this.position.x, this.position.y, this.size);

    if (circleText) {
      fill("cornflowerblue");
      text(circleText, this.position.x, this.position.y);
      textSize(12);
      textAlign(CENTER, CENTER);
    }
  }

  bounceOffWalls() {
    if (this.position.x > width - 50 || this.position.x < 50) {
      this.velocity.x *= -1;
    }
    if (this.position.y > height - 50 || this.position.y < 50) {
      this.velocity.y *= -1;
    }
  }

  contains(px, py) {
    return dist(px, py, this.position.x, this.position.y) < this.size / 2;
  }
}
