import React, { useRef, useEffect } from 'react';
import { Canvg } from 'canvg';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from "d3"

const SpatialView: React.FC = () => {
  const canvasRef = useRef(null)
  const svgRef = useRef(null)
  const center:[number, number] = [41.8781, -87.6298]

  const SVGToCanvasDirect = ({  }) => {
    const canvasRef = useRef(null);
    const data = [4, 8, 15, 16, 23, 42]
    // const map = useMap()
  
    useEffect(() => {
      if (svgRef.current && canvasRef.current) {
        
        const svg = d3.select(svgRef.current)
            
        // const data = [4, 8, 15, 16, 23, 42];

        const margin = {top: 10, right: 10, bottom: 20, left: 20}
        const width = 70
        const height = 70
        
        const barChartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        // X axis
        const x = d3.scaleLinear()
            .domain([0, 50])
            .range([0, width]);
        barChartGroup.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));
        // Y axis
        const y = d3.scaleBand()
            .range([0, height])
            .domain(data.map((d, i) => i))
            .padding(.1);
        barChartGroup.append("g")
            .call(d3.axisLeft(y));
        // Bars
        barChartGroup.selectAll("rect")
            .data(data)
            .enter().append("rect")
            .attr("x", x(0))
            .attr("y", (d, i) => y(i))
            .attr("width", d => x(d))
            .attr("height", y.bandwidth())
            // .attr("fill", "#69B3A2");
            .attr("fill", "red");
        
        
        
        
        
        
        
        // const canvas: HTMLCanvasElement = canvasRef.current
        // // Ensure the canvas context is "2d"
        // const ctx = canvas.getContext('2d');
  
        
  
        // // Use canvg to render the SVG directly onto the canvas
        // const v = Canvg.fromString(ctx, svg);
  
        // // Start rendering
        // v.start();
  
  
      }
    }, []); // Redraw when these props change
  
    // return <canvas id="my-canvas" ref={canvasRef} width={width} height={height} />
  }

  return (
    <React.Fragment>
      <canvas id="my-canvas" ref={canvasRef} width={100} height={100} />
      <svg ref={svgRef} width={100} height={100}></svg>
      <MapContainer center={center} zoom={10} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

    </MapContainer>
    </React.Fragment>
  )
}

export default SpatialView