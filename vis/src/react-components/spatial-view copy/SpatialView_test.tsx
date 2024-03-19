import React, { useRef, useEffect } from 'react';
import { Canvg } from 'canvg';
// import SpatialView from './SpatialView_backup';

const SVGToCanvasDirect = ({ svg, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current
      // Ensure the canvas context is "2d"
      const ctx = canvas.getContext('2d');

      // Clear the canvas to ensure a clean state
      // ctx.clearRect(0, 0, width, height);

      // Use canvg to render the SVG directly onto the canvas
      const v = Canvg.fromString(ctx, svg);

      // Start rendering
      v.start();
    }
  }, [svg, width, height]); // Redraw when these props change

  return <canvas ref={canvasRef} width={width} height={height} />;
};

function App() {
  const svgMarkup = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  </svg>`;

  return (
    <div>
      <SVGToCanvasDirect svg={svgMarkup} width={100} height={100} />
    </div>
  );
}

export default App;