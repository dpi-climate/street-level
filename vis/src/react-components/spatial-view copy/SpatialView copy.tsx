import React, { useRef, useEffect } from 'react';
import { Canvg } from 'canvg';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from "d3"

const center:[number, number] = [41.8781, -87.6298]

const SVGToCanvasDirect = ({ svg, width, height }) => {
  const canvasRef = useRef(null);
  const map = useMap()

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

      const p1 = [[41.88461455979, -87.6279943111182],[41.88210642924351, -87.62464691457575]]

      const canvasLayer = L.layerGroup().addTo(map);
  
      canvasLayer.addLayer(L.imageOverlay(canvas, p1))
      // Add any additional setup for your canvasLayer here


    }
  }, [svg, width, height, map]); // Redraw when these props change

  return <canvas id="my-canvas" ref={canvasRef} width={width} height={height} />
}

function App() {
  const svgMarkup = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  </svg>`;

  return (
    <React.Fragment>

    <div>
    </div>
    <MapContainer center={center} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
        <SVGToCanvasDirect svg={svgMarkup} width={100} height={100} />
      {/* <CanvasLayer /> */}
    </MapContainer>
    </React.Fragment>
  );
}

export default App;