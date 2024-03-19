import React, { useRef, useEffect, useCallback, useState } from "react"
// import LeafletMap from "../leaflet-map/LeafletMap"
// import D3Plot from "../d3-plot/D3Plot"
import * as d3 from "d3"
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Canvg } from "canvg"

const margin = { top: 10, bottom: 10, left: 10, right: 10 }
  
interface ICanvasLayerProps {
  canvasElement: HTMLCanvasElement
  svgElement: SVGSVGElement
}

const CanvasLayer = (svgElement: any, canvasElement: any) => {
  const map = useMap()
  useEffect(() => {
    const margin = {top: 10, right: 10, bottom: 20, left: 20}
    const width = 100 - margin.left - margin.right
    const height = 100 - margin.top - margin.bottom

    const data = [4, 8, 15, 16, 23, 42]

    const p1 = [[41.88461455979, -87.6279943111182],[41.88210642924351, -87.62464691457575]]

    if(svgElement && canvasElement) {
      
      const svg = d3.select(svgElement)
        .attr("width", 100)
        .attr("height", 100)

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

      const canvas: HTMLCanvasElement = canvasElement
      const ctx = canvas.getContext('2d')
      
      const svgData = new XMLSerializer().serializeToString(svgElement)
      
      const v = Canvg.fromString(ctx, svgData)

      svg.remove()
      v.start()

      
      const canvasLayer = L.layerGroup().addTo(map)
      // const mynodes: [number, number][] = myfunc(p1)
      
      canvasLayer.addLayer(L.imageOverlay(canvas.toDataURL(), p1))

    }
  }, [svgElement, canvasElement, map])

  return null
}

const SpatialView: React.FC = () => {
  const canvasRef = useRef(null)
  const svgRef = useRef(null)

  return (
    <React.Fragment>
      <canvas width={100} height={100} ref={canvasRef}></canvas>
      <svg id="mysvg" width={100} height={100} ref={svgRef}></svg>
      <MapContainer center={[41.8781, -87.6298]} zoom={12} style={{ height:"100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            
          />
          {CanvasLayer(svgRef.current, canvasRef.current)}
        </MapContainer>
    </React.Fragment>
  )
}

export default SpatialView