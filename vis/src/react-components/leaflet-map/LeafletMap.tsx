import React, { MutableRefObject, useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, useMap, GeoJSON, CircleMarker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as d3 from "d3"
import D3Plot from "../d3-plot/D3Plot"

// https://react-leaflet.js.org/docs/api-components/

interface ILeafletMapProps {
  center: [number, number]
  zoom?: number
  activeTimeStamp:any
  layers:any
  updatePlotData: Function
  elementId:any
}

type ColorInterpolator = (t: number) => string

interface D3 {
  [key: string]: any; // Define an indexer for the d3 object
}

const d3Typed = d3 as D3

const LeafletMap: React.FC<ILeafletMapProps> = (props) => {

  const mapRef = useRef(null)

  const startCenter = [41.88199188922012, -87.62778901271656] as L.LatLngTuple

  const [map, setMap] = useState<L.Map | null>(null)
  const [zoom, setZoom] = useState(9)

  const mapStyle = (feature: any, colorScheme:any, domain: any) => {
    const colorScale = d3.scaleLinear().domain(domain).range([0, 1])

    const colorInterpolator = typeof colorScheme === "string"
      ? d3Typed[colorScheme] as ColorInterpolator
      : d3.interpolate(colorScheme[0], colorScheme[1])
    // if(feature.properties.values) console.log(feature.properties.values)
    
      const fillColor = feature.properties.values 
        ? props.activeTimeStamp < feature.properties.values.length
          ? colorInterpolator(colorScale(feature.properties.values[props.activeTimeStamp]))
          : "none"
        : "grey"

    const myStyle = {
      color: "#FEF9F8",
      weight: 0.8,
      fillColor: fillColor,
      fillOpacity: 0.8
    }

    return myStyle

  }

  const pointColor = (value: any, colorScheme:any, domain: any) => {
    const colorScale = d3.scaleLinear().domain(domain).range([0, 1])

    const colorInterpolator = typeof colorScheme === "string"
      ? d3Typed[colorScheme] as ColorInterpolator
      : d3.interpolate(colorScheme[0], colorScheme[1])
    
    const fillColor = value
      ?   colorInterpolator(colorScale(value))
      : "white"
    
      // const colorInterpolator = d3.interpolate("yellow", "blue")
    // const colorInterpolator = d3Typed[colorScheme] as ColorInterpolator
    
    return fillColor
  }

  useEffect(() => {
    if(map) {
      const ct: L.LatLngTuple = props.center ? props.center : startCenter
      const zm: number = props.zoom ? props.zoom : 8

      map.flyTo(ct, zm)  
      setZoom(zm)

      // to do --> update the grammar
      // map.leafletElement.getZoom()

    }

  }, [map, props.center, props.zoom])

  function whenClicked(e:any, l:any) {
    if(l.interactions) {
      const clickObj = l.interactions.filter((p:any) => p.type === "click")
     
      if (clickObj) {
        // console.log(clickObj[0].action)
        if(clickObj[0].action.type === "map_plot") {
          props.updatePlotData(props.elementId, e.latlng, l.layerId)
        }
      }
    }
    // props.updatePlotData(props.elementId, e.latlng)
  }

  const onEachFeatureGeoJson = (feature:any, layer:any, l: any) => {
    // if(feature.properties){
    //   layer.bindPopup("Your text or whatever")
    // }
    // const popupContent = "Line 1 <br /> Line 2 <br /> Line 3"
    // const popupContent = `Line 1 <br /> Line 2 <br /> Line 3`

    const popupContent = feature.properties.values 
          ? `<b>GEOID:</b> ${feature.properties["GEOID"]} <br /> <b>Value:</b>  ${parseFloat(feature.properties.values[props.activeTimeStamp]).toFixed(2)}`
          : `<b>GEOID:</b>: ${feature.properties["GEOID"]} <br /> <b>Value:</b>  null`
        
    layer.bindPopup(popupContent)
    
    layer.on({
      mouseover: (e: any) => layer.openPopup(),
      mouseout: (e: any) => layer.closePopup(),
      click: (e: any) => whenClicked(e, l)
    });
  }

  const renderLayers = () => {
    return props.layers.map((l:any) => {

      if(l.geojson) {
        return (
          <GeoJSON key={`geojson-${l.mapId}-${l.layerId}`}
            data={JSON.parse(l.geojson)} 
            onEachFeature={(feature: any, layer: any) => onEachFeatureGeoJson(feature, layer, l)}
            style={ (feature) => mapStyle(feature, l.colorScheme, l.domain)}
           />
        )

      } else {
        if(l.type === "point") {
          return l.data.map((dd:any, index:any) => {
            const value = dd.values[props.activeTimeStamp]

            return (
              <CircleMarker
                key={`circle-marker-${l.mapId}-${l.layerId}-${dd.index}`}
                center={[dd.latitude, dd.longitude]}
                radius={8}
                color="black"
                stroke={true}
                fillOpacity={1.0}
                pane="markerPane"
                eventHandlers={{
                  click: (e:any) => {
                    console.log(props.elementId, l.layerId)
                    props.updatePlotData(props.elementId, e.latlng, l.layerId)
                  }
                }}
                pathOptions={{ 
                fillColor: pointColor(value, l.colorScheme, l.domain),
                weight: 2 // Adjust the weight as needed for the stroke width

                }}
              />
            )
          })
        } else {
          return <></>
        }
      }
    })

  }
  
  return (
    <React.Fragment>
      <MapContainer ref={mapRef} center={startCenter} zoom={zoom} style={{ height:"100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {/* <CanvasLayer/> */}
          { renderLayers() }
      </MapContainer>
    </React.Fragment>
  )
}

export default LeafletMap