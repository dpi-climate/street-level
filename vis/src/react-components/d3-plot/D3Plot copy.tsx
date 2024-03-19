import React, { useRef, useEffect } from "react"
import * as d3 from "d3"
import { Canvg } from 'canvg'

interface IProps {
  data?: number[],
  setSvg: Function,
  canvas:HTMLCanvasElement | null,
}

const D3Plot: React.FC<IProps> = (props) => {

  const svgRef = useRef(null)
  const margin = {top: 10, right: 10, bottom: 20, left: 20}
  const width = 100 - margin.left - margin.right
  const height = 100 - margin.top - margin.bottom

  useEffect(() => {

    if(props.data && props.canvas && svgRef.current) {
      const svg = d3.select(svgRef.current)
        .attr("id", "my-svg")
        .attr("width", width)
        .attr("height", height)
      
      const x = d3.scaleLinear()
            .domain([0, 50])
            .range([0, width])

      const y = d3.scaleBand()
          .range([0, height])
          // .domain(props.data.map((d, i) => i.toString()))
          .domain(props.data.map((d, i) => i))
          .padding(.1)
  
      const barChartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

      barChartGroup.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))

      barChartGroup.append("g")
        .call(d3.axisLeft(y))

      barChartGroup.exit()
        .remove()

      barChartGroup.selectAll("rect")
        .data(props.data)
        .enter().append("rect")
        .attr("x", x(0))
        .attr("y", (d, i) => y(i))
        .attr("width", d => x(d))
        .attr("height", y.bandwidth())
        // .attr("fill", "#69B3A2");
        .attr("fill", "red")

      const ctx = props.canvas.getContext('2d')
      const svgData = new XMLSerializer().serializeToString(svgRef.current)
      
      const v = Canvg.fromString(ctx, svgData)

      v.start()
    }
  },[props.data])

  useEffect(() => props.setSvg(svgRef.current), [svgRef.current])

  return <svg className="d3-plot-svg" ref={svgRef}></svg>
}

export default D3Plot

// interface IProps {
//   data?: number[],
//   setSvg: Function
// }

// const D3Plot: React.FC<IProps> = (props) => {

//   const svgRef = useRef(null)

//   useEffect(() => {

//     if(props.data && svgRef.current) {
//       const svg = d3.select(svgRef.current)
//         .attr("id", "myplot-1")
  
//         // Bind D3 data
//         const update = svg
//           .append('g')
//           .selectAll('text')
//           .data(props.data);
  
//         // Enter new D3 elements
//         update.enter()
//             .append('text')
//             .attr('x', (d, i) => i * 25)
//             .attr('y', 40)
//             .style('font-size', 24)
//             .text((d: number) => d)
  
//         // Update existing D3 elements
//         update
//             .attr('x', (d, i) => i * 40)
//             .text((d: number) => d)
  
//         // Remove old D3 elements
//         update.exit()
//             .remove()

//       // props.setSvg(svg)
//     }
//   },[props.data, svgRef.current, props.setSvg])

//   return (
//     <div className="d3-plot">
//       <svg className="d3-plot-svg" width={400} height={200} ref={svgRef}>
//       </svg>
//     </div>
//   )
// }

// export default D3Plot