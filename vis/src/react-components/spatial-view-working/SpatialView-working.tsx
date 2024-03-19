import React, { useRef, useEffect, useCallback, useState, createElement } from "react"
// import LeafletMap from "../leaflet-map/LeafletMap"
import D3Plot from "../d3-plot/D3Plot"
import * as d3 from "d3"
import { Canvg } from 'canvg'

import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


const SpatialView: React.FC = () => {
  const canvasRef = useRef(null)
  const svgRef = useRef(null)

  const center:[number, number] = [41.8781, -87.6298]

  const data = [3, 4, 6, 8, 10]
  const margin = {top: 10, right: 10, bottom: 20, left: 20}

  const contentHeight = 150//d3.select('.analyses-content-2')._groups[0][0].clientHeight
    const contentWidth  = 230//d3.select('.analyses-content-2')._groups[0][0].clientWidth

  const width  = contentWidth - margin.left - margin.right
  const height = contentHeight - margin.top - margin.bottom


  const CanvasLayer = () => {
    const map = useMap()

    useEffect(() => {

      if(canvasRef.current) {
        const canvasLayer = L.layerGroup().addTo(map)
        const canvas = canvasRef.current
        const canvasDataURL = canvas.toDataURL()
        canvasLayer.addLayer(L.imageOverlay(canvasDataURL, [[41.88461455979, -87.6279943111182],[41.88210642924351, -87.62464691457575]]))

        // return () => {
        //   canvasLayer.remove()
        // }
      }

      d3.select(canvasRef.current).remove()
    }, [map, canvasRef.current])

    return null
  }

  useEffect(() => {

    if(svgRef.current && canvasRef.current) {
      const svg = d3.select(svgRef.current)
      
      const x = d3.scaleLinear()
            .domain([0, 10])
            .range([0, width-20])

      const y = d3.scaleBand()
          .range([0, height-20])
          // .domain(data.map((d, i) => i.toString()))
          .domain(data.map((d, i) => i))
          .padding(.1)
  
      const barChartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

      const xAxisG = barChartGroup.append("g")
        .attr("transform", `translate(0,${height-20})`)
      
        xAxisG.call(d3.axisBottom(x))

      barChartGroup.append("g")
        .call(d3.axisLeft(y))

      barChartGroup.exit()
        .remove()

      barChartGroup.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", x(0))
        .attr("y", (d, i) => y(i))
        .attr("width", d => x(d))
        .attr("height", y.bandwidth())
        // .attr("fill", "#69B3A2");
        .attr("fill", "red")
      
      const canvas: HTMLCanvasElement = canvasRef.current
      const ctx = canvas.getContext('2d')  
      const svgData = new XMLSerializer().serializeToString(svgRef.current)
        
      const v = Canvg.fromString(ctx, svgData)
  
      v.start()
      d3.select(svgRef.current).remove()
    }

  },[data, svgRef.current, canvasRef.current])

  return (
    <React.Fragment>
      <svg className="d3-plot-svg" width={contentWidth} height={contentHeight} ref={svgRef}></svg>
      <canvas className="d3-plot-svg" width={contentWidth} height={contentHeight} ref={canvasRef}></canvas>
      <MapContainer center={center} zoom={15} style={{ height:"100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <CanvasLayer />
      </MapContainer>
      </React.Fragment>
  )
}

export default SpatialView