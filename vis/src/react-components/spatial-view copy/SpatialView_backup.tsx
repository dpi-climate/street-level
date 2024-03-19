import React, { useRef, useEffect, useCallback, useState } from "react"
import LeafletMap from "../leaflet-map/LeafletMap"
import D3Plot from "../d3-plot/D3Plot"
import * as d3 from "d3"
import { Canvg } from 'canvg'

const SpatialView: React.FC = () => {
  const margin = { top: 10, bottom: 10, left: 10, right: 10 }
  
  const canvasRef = useRef(null)

  const [currentSvg, setSvg] = useState(null)
  
  const renderLeafletMap = () => {
    return <LeafletMap center={[41.8781, -87.6298]}/>
  }

  const renderPlots = () => {
    return <D3Plot data={[2, 5, 8, 10]} setSvg={setSvg}/>
  }
  // console.log("Spatial View currentSvg", currentSvg)
  return (
    <React.Fragment>
      <canvas width={100} height={100} ref={canvasRef}></canvas>
      {renderLeafletMap()}
      {renderPlots()}
    </React.Fragment>
  )
}

export default SpatialView