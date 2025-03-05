import React, { useState } from 'react';
import P5Sketch from './P5Sketch.tsx';
import './App.css';

function App() {
    const [showSketch, setShowSketch] = useState(true);

    return (
        <div className="App">
            <P5Sketch />
        </div>
    );
}

export default App;
