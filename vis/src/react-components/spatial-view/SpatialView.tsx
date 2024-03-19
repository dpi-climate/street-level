import React, { useRef, useEffect, useCallback, useState, createElement } from "react"
import LeafletMap from "../leaflet-map/LeafletMap"
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

import D3Plot from "../d3-plot/D3Plot"
import { IMap } from "../../data-logic/interfaces"
import * as d3 from "d3"
import { Canvg } from 'canvg'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface ISpatialView {
  map: IMap
  data: number[][]
}


const SpatialView: React.FC<ISpatialView> = (props) => {

  // const [canvasRef = useRef<HTMLCanvasElement>(null)]
  
  // const center:[number, number] = [41.88199188922012, -87.62778901271656]

  // const multipleData = [[3, 4, 6, 8, 10], [6, 9, 23, 12, 21], [1, 2, 0, 3, 1]]
  const mapRef = useRef(null)
  const startCenter = [41.88199188922012, -87.62778901271656] as L.LatLngTuple

  const [map, setMap] = useState<L.Map | null>(null)
  const [zoom, setZoom] = useState(15)

  // const CanvasLayer = () => {
  //   const _map = useMap()
  //   setMap(_map)
    
  //   useEffect(() => {
  //     canvasLayer.addTo(_map)
      
  //   }, [_map, canvasLayer])
    
  //   return null
  // }

  useEffect(() => {
    if(map) {
      const ct: L.LatLngTuple = props.map.center ? props.map.center : startCenter
      const zm: number = props.map.zoom ? props.map.zoom : 15
      
      map.flyTo(ct, zm)  
      setZoom(zm)

      // to do --> update the grammar
      // map.leafletElement.getZoom()

    }

  }, [map, props.map.center, props.map.zoom])


  const margin = {top: 10, right: 10, bottom: 20, left: 20}

  const contentHeight = 150
  const contentWidth  = 230

  const width  = contentWidth - margin.left - margin.right
  const height = contentHeight - margin.top - margin.bottom

  const bboxes = [
    [[41.88461455979, -87.6279943111182],[41.88210642924351, -87.62464691457575]],
    [[41.87931051549818, -87.63681394296815], [41.87813694959114, -87.63530628471732]],
    [[41.884448600685275, -87.63536822725949], [41.883213512478704, -87.63387220995287]]
  ]

  const [data, setData] = useState(props.data)

  // const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cleanMap, setCleanMap] = useState<boolean>(false)
  
  const canvasLayer = L.layerGroup()
  const generateCanvas = (svg:SVGSVGElement, bbox:number[][], currentCanvas:any, svgId:string) => {

    if(svg && currentCanvas && canvasLayer) {
      
      const canvas: HTMLCanvasElement = currentCanvas
      const ctx = currentCanvas.getContext('2d')  
      const svgData = new XMLSerializer().serializeToString(svg)
        
      const v = Canvg.fromString(ctx, svgData)
  
      v.start()

      d3.select(svg).remove()
      
      // d3.select(svg).remove()
      
      const canvasDataURL = canvas.toDataURL()

      const corner1 = L.latLng(bbox[0][0], bbox[0][1])
      const corner2 = L.latLng(bbox[1][0], bbox[1][1])
      const bounds = L.latLngBounds(corner1, corner2)
  
      canvasLayer.addLayer(L.imageOverlay(canvasDataURL, bounds))
      // d3.select(currentCanvas).selectAll("*").remove()
      d3.select(currentCanvas).remove()
      setCleanMap(false)

    }

    return null
  }

  // const renderLeafletMap = () => {
  //   return (
  //     <React.Fragment>
  //     <MapContainer ref={mapRef} center={startCenter} zoom={zoom} style={{ height:"100%" }}>
  //         <TileLayer
  //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
  //         />
  //         <CanvasLayer/>
  //     </MapContainer>
  //   </React.Fragment>
  //   )
  // }

  const renderPlots = () => { 
      let canvasRef = useRef<HTMLCanvasElement>(null)

      return (
        <React.Fragment>
          {
          props.data.map((d, i) => {
              if(i === 0) {
                canvasRef = useRef<HTMLCanvasElement>(null)
                const canvas = d3.select(canvasRef.current)
        
                canvas.attr("width" , contentWidth.toString())
                canvas.attr("height", contentHeight.toString()) 
              }

              const svgId = `svg-id-${i}`
              const bbox = bboxes[i]
              
              return(
                <React.Fragment key={`d3-plot-${svgId}`}>
                  <D3Plot data={d} id={svgId} generateCanvas={generateCanvas} bbox={bbox} canvasRef={canvasRef}/>
                </React.Fragment>
              )
            })
          }
          <canvas ref={canvasRef}></canvas>
        </React.Fragment>
      )    
  }


  // useEffect(() => {
  //   if(data !== props.data) {
  //     setData(props.data)
  //     setNewData(true)
  //     canvasLayer.eachLayer(layer => {
  //     canvasLayer.removeLayer(layer)
  //     })
  //     // setCanvasLayer(L.layerGroup())
  //   }
  // }, [canvasLayer, props.data])

  // useEffect(() => {
  //   if(newData) {
  //     setCanvasLayer(L.layerGroup())
  //     setNewData(false)
  //   }

  // }, [newData, setCanvasLayer])

  return (
    <React.Fragment> 
      <LeafletMap center={props.map.center} zoom={props.map.zoom} canvasLayer={canvasLayer} cleanMap={cleanMap} setCleanMap={setCleanMap}/>
      {renderPlots()}
    </React.Fragment>
  )
}

export default SpatialView