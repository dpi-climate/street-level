import React, { useRef, useEffect, useCallback, useState, createElement } from "react"
import LeafletMap from "../leaflet-map/LeafletMap"
import D3Plot from "../d3-plot/D3Plot"
import * as d3 from "d3"
import { Canvg } from 'canvg'

const SpatialView: React.FC = () => {
  const canvasRef = useRef(null)
  const svgRef = useRef(null)

  const data = [3, 4, 6, 8, 10]
  const margin = {top: 10, right: 10, bottom: 20, left: 20}

  const contentHeight = 150//d3.select('.analyses-content-2')._groups[0][0].clientHeight
    const contentWidth  = 230//d3.select('.analyses-content-2')._groups[0][0].clientWidth

  const width  = contentWidth - margin.left - margin.right
  const height = contentHeight - margin.top - margin.bottom


  useEffect(() => {

    if(svgRef.current && canvasRef.current) {
      const svg = d3.select(svgRef.current)
        // .attr("id", "my-svg")
        // .attr("width", width)
        // .attr("height", height)
      
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
    }


    // if(svgRef.current) {
    //   const svg = d3.select(svgRef.current)
    //     .attr("id", "myplot-1")
  
    //     // Bind D3 data
    //     const update = svg
    //       .append('g')
    //       .selectAll('text')
    //       .data(data);
  
    //     // Enter new D3 elements
    //     update.enter()
    //         .append('text')
    //         .attr('x', (d, i) => i * 25)
    //         .attr('y', 40)
    //         .style('font-size', 24)
    //         .text((d: number) => d)
  
    //     // Update existing D3 elements
    //     update
    //         .attr('x', (d, i) => i * 40)
    //         .text((d: number) => d)
  
    //     // Remove old D3 elements
    //     update.exit()
    //         .remove()

    //   // setSvg(svg)
    // }
  },[data, svgRef.current, canvasRef.current])

  return (
    <div className="d3-plot">
      <svg className="d3-plot-svg" width={contentWidth} height={contentHeight} ref={svgRef}></svg>
      <canvas className="d3-plot-svg" width={contentWidth} height={contentHeight} ref={canvasRef}></canvas>
    </div>
  )
}

export default SpatialView