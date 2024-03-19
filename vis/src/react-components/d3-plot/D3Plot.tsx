import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

interface IProps {
  data?: number[]
  id: string
  canvasRef:any
  bbox:number[][]
  generateCanvas:Function
}

const D3Plot: React.FC<IProps> = (props) => {

  const margin = {top: 10, right: 10, bottom: 20, left: 20}
  
  const contentWidth = 230
  const contentHeight = 150
  
  const width  = contentWidth - margin.left - margin.right
  const height = contentHeight - margin.top - margin.bottom

  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    
      // const svg = d3.select(svgRef.current)
      const svgElement = document.createElement("svg")
      
      const svg = d3.select(svgElement)
      
      svg.attr("width" , contentWidth.toString())
      svg.attr("height", contentHeight.toString())
      
      const x = d3.scaleLinear()
            .domain([0, 10])
            .range([0, width-20])

      const y = d3.scaleBand()
          .range([0, height-20])
          // .domain(props.data.map((d, i) => i.toString()))
          .domain(props.data.map((d, i) => i))
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
        .data(props.data)
        .enter().append("rect")
        .attr("x", x(0))
        .attr("y", (d, i) => y(i))
        .attr("width", d => x(d))
        .attr("height", y.bandwidth())
        // .attr("fill", "#69B3A2");
        .attr("fill", "red")
 
    // props.generateCanvas(svgRef.current, props.bbox, props.canvasRef.current, props.id)
    props.generateCanvas(svgElement, props.bbox, props.canvasRef.current, props.id)

    // // Clean up function
    // return () => {
    //   const currentSvg = svg.selectAll("*")

    //   if(!currentSvg.empty()) currentSvg.remove()

    //   console.log("D3 before remove")
    //   // svg.selectAll("*").remove(); // Remove all child elements
    // }

  },[props.data, props.bbox, props.canvasRef.current, props.generateCanvas, props.id])

  return "" //<svg ref={svgRef}></svg>
}



// const D3Plot: React.FC<IProps> = (props) => {

//   const svgRef = useRef(null)
   
//   const margin = {top: 10, right: 10, bottom: 20, left: 20}
  
//   const contentHeight = 150
//   const contentWidth = 230
  
//   const width  = contentWidth - margin.left - margin.right
//   const height = contentHeight - margin.top - margin.bottom

//   useEffect(() => {

//     if(svgRef.current) {
//       const svg = d3.select(svgRef.current)
      
//       const x = d3.scaleLinear()
//             .domain([0, 10])
//             .range([0, width-20])

//       const y = d3.scaleBand()
//           .range([0, height-20])
//           // .domain(data.map((d, i) => i.toString()))
//           .domain(props.data.map((d, i) => i))
//           .padding(.1)
  
//       const barChartGroup = svg.append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`)

//       const xAxisG = barChartGroup.append("g")
//         .attr("transform", `translate(0,${height-20})`)
      
//       xAxisG.call(d3.axisBottom(x))

//       barChartGroup.append("g")
//         .call(d3.axisLeft(y))

//       barChartGroup.exit()
//         .remove()

//       barChartGroup.selectAll("rect")
//         .data(props.data)
//         .enter().append("rect")
//         .attr("x", x(0))
//         .attr("y", (d, i) => y(i))
//         .attr("width", d => x(d))
//         .attr("height", y.bandwidth())
//         // .attr("fill", "#69B3A2");
//         .attr("fill", "red")

//     // props.setSvg(svgRef.current)
//     // props.generateCanvas(svgRef.current)

//     }

//   },[props.data, svgRef.current, props.setSvg, props.generateCanvas])

//   return <svg className="d3-plot-svg" id={props.id} width={contentWidth} height={contentHeight} ref={svgRef}></svg>
// }

export default D3Plot
