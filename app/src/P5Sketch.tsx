import { useEffect, useRef } from "react";
import p5 from "p5";

const P5Sketch = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let circles: CircleFriend[] = [];
      let circleText: string[] = ["hello", "world"];
      let draggingCircle: CircleFriend | null = null;
      let offsetX = 0,
        offsetY = 0;

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

      class CircleFriend {
        position: p5.Vector;
        size: number;
        color: string;
        velocity: p5.Vector;
        isDragged: boolean;

        constructor() {
          this.position = p.createVector(
            p.random(50, p.width - 50),
            p.random(50, p.height - 50)
          );
          this.size = 100;
          this.color = p.random(colors);
          this.velocity = p.createVector(
            p.randomGaussian(0.5, 2),
            p.randomGaussian(0.5, 2)
          );
          this.isDragged = false;
        }

        renderCircle(text?: string) {
          p.fill(this.color);
          if (!this.isDragged) {
            this.position.add(this.velocity);
            this.bounceOffWalls();
          }
          p.circle(this.position.x, this.position.y, this.size);

          if (text) {
            p.fill("cornflowerblue");
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(12);
            p.text(text, this.position.x, this.position.y);
          }
        }

        bounceOffWalls() {
          if (this.position.x > p.width - 50 || this.position.x < 50) {
            this.velocity.x *= -1;
          }
          if (this.position.y > p.height - 50 || this.position.y < 50) {
            this.velocity.y *= -1;
          }
        }

        contains(px: number, py: number) {
          return (
            p.dist(px, py, this.position.x, this.position.y) < this.size / 2
          );
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(canvasRef.current!);
        p.background(255);

        const input = p.createInput("");
        input.position(50, 50);

        const button = p.createButton("click me");
        button.position(200, 50);
        button.mousePressed(() => {
          circles.push(new CircleFriend());
          circleText.push(input.value() as string);
        });

        // Initialize circles
        for (let i = 0; i < circleText.length; i++) {
          circles.push(new CircleFriend());
        }
      };

      p.draw = () => {
        p.background(255);

        for (let i = 0; i < circles.length; i++) {
          circles[i].renderCircle(circleText[i]);
        }
      };

      p.mousePressed = () => {
        let topmostCircle: CircleFriend | null = null;

        for (let i = circles.length - 1; i >= 0; i--) {
          if (circles[i].contains(p.mouseX, p.mouseY)) {
            topmostCircle = circles[i];
            break;
          }
        }

        if (topmostCircle) {
          draggingCircle = topmostCircle;
          draggingCircle.isDragged = true;
          offsetX = p.mouseX - draggingCircle.position.x;
          offsetY = p.mouseY - draggingCircle.position.y;

          circles.splice(circles.indexOf(draggingCircle), 1);
          circles.push(draggingCircle);
        }
      };

      p.mouseDragged = () => {
        if (draggingCircle) {
          draggingCircle.position.x = p.mouseX - offsetX;
          draggingCircle.position.y = p.mouseY - offsetY;
        }
      };

      p.mouseReleased = () => {
        if (draggingCircle) {
          draggingCircle.velocity = p.createVector(
            p.randomGaussian(0.5, 2),
            p.randomGaussian(0.5, 2)
          );
          draggingCircle.isDragged = false;
          draggingCircle = null;
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, []);

  return <div ref={canvasRef}></div>;
};

export default P5Sketch;
