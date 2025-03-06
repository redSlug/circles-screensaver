import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import createSketch from './Sketch';

const P5Sketch: React.FC = () => {
    const sketchRef = useRef<HTMLDivElement>(null);
    const p5Instance = useRef<p5 | null>(null);

    useEffect(() => {
        if (sketchRef.current && !p5Instance.current) {
            p5Instance.current = new p5(createSketch, sketchRef.current);
        }

        // Cleanup on unmount
        return () => {
            if (p5Instance.current) {
                p5Instance.current.remove();
                p5Instance.current = null;
            }
        };
    }, []);

    return (
        <div>
            <div ref={sketchRef} id="canvas-container"></div>
        </div>
    );
};

export default P5Sketch;
