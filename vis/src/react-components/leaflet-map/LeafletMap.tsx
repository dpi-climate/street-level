import React, { MutableRefObject, useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as d3 from "d3"

interface ILeafletMapProps {
  center: [number, number]
  zoom?: number
  canvasLayer: any
  cleanMap: boolean
  setCleanMap: Function

}
// [41.88199188922012, -87.62778901271656]
const LeafletMap: React.FC<ILeafletMapProps> = (props) => {

  const mapRef = useRef(null)

  const startCenter = [41.88199188922012, -87.62778901271656] as L.LatLngTuple

  const [map, setMap] = useState<L.Map | null>(null)
  const [zoom, setZoom] = useState(15)

  const CanvasLayer = () => {
    const _map = useMap()
    setMap(_map)
    
    useEffect(() => {
      props.canvasLayer.addTo(_map)
      
    }, [_map, props.canvasLayer])
    
    return null
  }

  useEffect(() => {
    if(map) {
      const ct: L.LatLngTuple = props.center ? props.center : startCenter
      const zm: number = props.zoom ? props.zoom : 15
      
      map.flyTo(ct, zm)  
      setZoom(zm)

      // to do --> update the grammar
      // map.leafletElement.getZoom()

    }

  }, [map, props.center, props.zoom])

  // useEffect(() => {
  //   if(map && props.cleanMap) {
  //     map.eachLayer(function (layer) {
  //       console.log(layer)
  //       map.removeLayer(layer)
  //     })

  //     props.setCleanMap(false)
  //   }

  // }, [map, props.cleanMap, props.setCleanMap])

  // useEffect(() => {
  //   props.canvasLayer.addTo(map)
    
  // }, [map, props.canvasLayer])

  return (
    <React.Fragment>
      <MapContainer ref={mapRef} center={startCenter} zoom={zoom} style={{ height:"100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <CanvasLayer/>
      </MapContainer>
    </React.Fragment>
  )
}


// const CanvasLayer = (canvas:any, setCanvasLayer:Function) => {
//   const map = useMap()

//   useEffect(() => {

//     if(canvas) {
//       const canvasLayer = L.layerGroup().addTo(map)
//       // const canvasDataURL = canvas.toDataURL()
//       // canvasLayer.addLayer(L.imageOverlay(canvasDataURL, [[41.88461455979, -87.6279943111182],[41.88210642924351, -87.62464691457575]]))
//       setCanvasLayer(canvasLayer)
//     }

//     // d3.select(canvas).remove()
//   }, [map, canvas, setCanvasLayer])

//   return null
// }


// const LeafletMap: React.FC<ILeafletMapProps> = (props) => {
//   const _zoom: number = props.zoom || 15

//   const CanvasLayer = () => {
//     const map = useMap()
  
//     useEffect(() => {
  
//       if(props.canvas) {
//         const canvasLayer = L.layerGroup().addTo(map)
//         // const canvasDataURL = canvas.toDataURL()
//         // canvasLayer.addLayer(L.imageOverlay(canvasDataURL, [[41.88461455979, -87.6279943111182],[41.88210642924351, -87.62464691457575]]))
//         props.setCanvasLayer(canvasLayer)
//       }
  
//       // d3.select(canvas).remove()
//     }, [map, props.canvas, props.setCanvasLayer])
  
//     return null
//   }

//   const renderMapContainer = () => {

//     if(props.center) {
//       return (
//         <MapContainer center={props.center} zoom={_zoom} style={{ height:"100%" }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//           />
//           <CanvasLayer/>
//         </MapContainer>
//       )
//     } else {
//       return null
//     }
//   }
  
//   return(
//     <React.Fragment>
//       {renderMapContainer()}
//     </React.Fragment>
//   )
// }

export default LeafletMap