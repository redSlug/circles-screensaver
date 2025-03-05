import p5 from 'p5';

const createSketch = (p: p5) => {


    p.setup = () => {
        let canvas = p.createCanvas(800, 800);
        canvas.parent('canvas-container');
        p.background("pink");
        p.circle(10, 10, 10)

    };

    p.draw = () => {
    console.log("hi")
    }
};

export default createSketch;
