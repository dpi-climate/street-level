import React, { useRef, useEffect, useCallback, useState, createElement } from "react"
import LeafletMap from "../leaflet-map/LeafletMap"
import D3Plot from "../d3-plot/D3Plot"
import * as d3 from "d3"
import { Canvg } from 'canvg'

const SpatialView: React.FC = () => {
  const margin = { top: 10, bottom: 10, left: 10, right: 10 }

  const contentHeight = 100//d3.select('.analyses-content-2')._groups[0][0].clientHeight
  const contentWidth  = 100//d3.select('.analyses-content-2')._groups[0][0].clientWidth

  const width  = contentWidth - margin.left - margin.right
  const height = contentHeight - margin.top - margin.bottom

  const myRef = useRef(null)
  
  const svg      = d3.select('.scatter-svg-group')
  const scatterG = d3.select('.scatter-group')
  const xAxisG   = d3.select('.scatter-x-axis')
  const yAxisG   = d3.select('.scatter-y-axis')


  const data = [
    {x: 5, y:8},
    {x: 2, y:4},
    {x: 9, y:2},
  ]

  const x = d3.scaleLinear()
      .range([0, width])

  const y = d3.scaleLinear()
      .range([height, 0])

  useEffect(() => {

    const xMax = d3.max(data, d => d.x)
    const yMax = d3.max(data, d => d.y)
    
    const xMin = d3.min(data, d => d.x > 0 ? 0 : d.x)
    const yMin = d3.min(data, d => d.y > 0 ? 0 : d.y)

    x.domain([xMin, xMax])
    y.domain([yMin, yMax])
            

    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y)

    xAxisG.call(xAxis)
    yAxisG.call(yAxis)
    
    const scatter = svg.selectAll('.scatter-data')
          .data(data)

    scatter.exit().remove()

    scatter
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('fill', "blue")
        .attr('r', 5)

    scatter.enter().append('circle')
        .attr('class', 'scatter-data')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 5)
        .attr('fill', "blue")
      
    // const svg = createElement("svg",
    //   { className: "my-svg",
    //     width: 100,
    //     height: 100 },
    //   )
    // console.log("svg", svg)
   

  },[])

  return (
    <React.Fragment>
      {/* <div className="spatial-view"> */}
      <svg className='scatter-svg' width={contentWidth} height={contentHeight} ref={myRef}>
        <g className='scatter-svg-group' width={width} height={height} transform={`translate(${margin.left}, ${margin.top})`}>
          <g className='scatter-x-axis' transform={`translate(0, ${height})`}></g>
          <g className='scatter-y-axis'></g>
          <g className='scatter-group'></g>
        </g>
      </svg>

      {/* </div> */}




    </React.Fragment>
  )
}

export default SpatialView