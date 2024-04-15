import React, { useRef, useEffect, useCallback, useState, createElement } from "react"
import * as d3 from "d3"

interface IMapLegend {
  colorScheme: any
  legId: any
  domain: any
  label: any
}

type ColorInterpolator = (t: number) => string

interface D3 {
  [key: string]: any; // Define an indexer for the d3 object
}

const MapLegend: React.FC<IMapLegend> = (props) => {
  const margin = { top: 10, bottom: 10, left: 10, right: 10 }

  let direction = "h"

  const width   = direction === 'v' ? 50                               : 250 - margin.left - margin.right
  const height  = direction === 'v' ? 200 - margin.top - margin.bottom : 80  - margin.top - margin.bottom

  const width_leg   = direction === 'v' ? 15  : 155
  const height_leg  = direction === 'v' ? 100 : height/3

  const padding_unit = direction === 'v' ? 5 : 15

  const x0 = direction === 'v' ? 10 + margin.left : margin.left
  const y0 = direction === 'v' ? margin.top : height_leg

  // const y0_unit = direction === 'v' ? 3*(height - height_leg)/4 : y0 + padding_unit
  const y0_unit = direction === 'v' ? 0 : y0 + padding_unit
  const x0_unit = direction === 'v' ? width_leg + padding_unit : 0

  const x0_leg = 0
  const y0_leg = direction === 'v' ? margin.top : 0

  
  const mapRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const axisGroupRef = useRef<SVGSVGElement | null>(null)
  const linearGradientRef = useRef<SVGLinearGradientElement>(null)
  
  
  const [legId, setLegId] = useState(props.legId)
  const [xScale, setXScale] = useState<d3.ScaleLinear<number, number, never>>()
  const [yScale, setYScale] = useState<d3.ScaleLinear<number, number, never>>()

  
  const xScaleRef = useRef(xScale)
  const yScaleRef = useRef(yScale)
  
  const init = useCallback(() => {
    if(!linearGradientRef.current) return 

    // set xScale
    xScaleRef.current =d3.scaleLinear().range([0, width_leg])
    setXScale(xScaleRef.current)

    // set yScale
    yScaleRef.current = d3.scaleLinear().range([height_leg+y0, y0])
    setYScale(yScaleRef.current)

    const y1 = direction === "v" ? "100%" : "0%"
    const x2 = direction === "v" ? "0%"   : "100%"

    linearGradientRef.current.setAttribute("x1", "0%")
    linearGradientRef.current.setAttribute("y1" , y1)
    linearGradientRef.current.setAttribute("x2" , x2)
    linearGradientRef.current.setAttribute("y2" , "0%")


  }, [legId, direction, width_leg, height_leg, y0])

  const update = useCallback(() => {
    if(!svgRef.current  || !linearGradientRef.current || !axisGroupRef.current || !yScaleRef.current || !xScaleRef.current) return 

    const svg = d3.select(svgRef.current)
    const axisGroup = d3.select(axisGroupRef.current)

    const updateAxis = () => {
      if(!svgRef.current  || !linearGradientRef.current || !axisGroupRef.current || !yScaleRef.current || !xScaleRef.current) return 

      let axis = null
      const numTicks = 5

      if(direction === 'v') {
        yScaleRef.current.domain(props.domain)
        axis = d3.axisLeft(yScaleRef.current)
        .tickValues( yScaleRef.current.ticks(numTicks).concat(yScaleRef.current.domain()))
        

      } else {
        xScaleRef.current.domain(props.domain)
        axis = d3.axisTop(xScaleRef.current)
          .tickValues( xScaleRef.current.ticks(numTicks).concat(xScaleRef.current.domain()))
        
      }

      axisGroup.call(axis)
    }

    const addColors = () => {

      if(!linearGradientRef.current) return

      // const data: any = [
      //   {offset: "0%", color: "white"},
      //   { offset: "100%", color: "red"}
      // ]
      const d3Typed = d3 as D3

      // const colorInterpolator = typeof colorScheme === "string"
      // ? d3Typed[colorScheme] as ColorInterpolator
      // : d3.interpolate(colorScheme[0], colorScheme[1])

      const colorInterpolator = typeof props.colorScheme === "string"
        ? d3Typed[props.colorScheme]
        : d3.interpolateRgb(props.colorScheme[0], props.colorScheme[1])
      
      const colorScale = d3.scaleSequential(colorInterpolator)
        .domain(props.domain)

      const data: [{ offset: string, color: number }, { offset: string, color: number }] = [
        { offset: "0%"  , color: colorScale(props.domain[0])},
        { offset: "100%", color: colorScale(props.domain[1])}
      ]
      
      const color = d3.select(linearGradientRef.current)
        .selectAll(`#stop-${legId}`)
        .data(data)

      color.exit().remove()

      color.attr('offset', (d:any) => d.offset)
        .attr('stop-color', (d:any) => d.color)
        

      color.enter().append("stop")
        .attr('id', `stop-${legId}`)
        .attr("offset", (d:any) => d.offset)
        .attr("stop-color", (d:any) => d.color)
        .attr("stop-opacity", 1)
    }

    const updateRect = () => {

      const rect = svg.selectAll(`#legend-rect-${legId}`)
          .data(["myRect"])

      rect.exit().remove()

      rect.attr('x', x0_leg)
        .attr('y', y0_leg)
        .attr('width', width_leg)
        .attr('height', height_leg)
        .attr('fill', `url(#linear-gradient-${legId})`)
        .style("stroke", 'grey')

      rect.enter().append('rect')
        .attr('class', 'legend-rect')
        .attr('id', `legend-rect-${legId}`)
        .attr('x', x0_leg)
        .attr('y', y0_leg)
        .attr('width', width_leg)
        .attr('height', height_leg)
        .attr('fill', `url(#linear-gradient-${legId})`)
        .style("stroke", 'grey')
    }

    const updateLabel = () => {

      const rotate = direction === "v" 
        ? "translate(" + x0_unit + "," + y0_unit + ") rotate(90) translate(" + (-x0_unit) + "," + (-y0_unit) + ")"
        : ""
      
      const _unit = svg.selectAll(`#legend-unit-${legId}`)
        .data(['myRect'])

      _unit.exit().remove()

      _unit.text(`${props.label}`)
        .attr("transform", rotate)
        
      _unit.enter().append('text')
        .attr('class', 'legend-unit')
        .attr('id', `legend-unit-${legId}`)
        .attr('x', x0_unit)
        .attr('y', y0_unit)
        .attr('text-anchor', 'start')
        .attr('font-size', 12)
        .text(`${props.label}`)
    }

    updateAxis()
    addColors()
    updateRect()
    updateLabel()

  }, [props.domain, props.colorScheme, props.label, legId, direction])

  useEffect(() => { setLegId(props.legId) }, [props.legId])
  useEffect(() => { init() }, [init])
  useEffect(() => { update() }, [update])


  return (
    <div className="map-legend" ref={mapRef}>
      <svg className="map-legend-svg"          id={`map-legend-svg-${legId}`} width={width} height={height}>
      {/* <svg className="map-legend-svg"          id={`map-legend-svg-${legId}`} height={height}> */}
        <g className="map-legend-svg-group"    id={`map-legend-svg-group-${legId}`} transform={`translate (${x0}, ${y0})`} ref={svgRef}>
          <g className="map-legend-axis-group" id={`map-legend-axis-group-${legId}`} ref={axisGroupRef}></g>
          <defs>
            <linearGradient id={`linear-gradient-${legId}`} ref={linearGradientRef}></linearGradient>
          </defs>
        </g>
      </svg>
    </div>
  )
}

export default MapLegend