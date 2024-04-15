import React, { useRef, useEffect, useCallback, useState, createElement } from "react"
import "./SpatialView.css"
import LeafletMap from "../leaflet-map/LeafletMap"
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { DataLoader } from "../../data-logic/data-loader"

import D3Plot from "../d3-plot/D3Plot"
import { IMap } from "../../data-logic/interfaces"
import * as d3 from "d3"
import { Canvg } from 'canvg'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { Row, Col, Button, Form } from 'react-bootstrap'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faCode, faLayerGroup,  faCaretDown, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import MapLegend from "../map-legend/MapLegend"
import CodeBtn from "../code-btn/CodeBtn"

interface ISpatialView {
  // map: IMap
  element: any
  data: number[][]
  updateGrammarId:any
  updateMapData: Function
  mapData: any
  newMapData:any
  updatePlotData: Function

}

const SpatialView: React.FC<ISpatialView> = (props) => {
  const mapRef = useRef(null)
  const startCenter = [41.0, -87.0] as L.LatLngTuple

  const margin = {top: 10, right: 10, bottom: 20, left: 20}

  const contentHeight = 150
  const contentWidth  = 230

  const width  = contentWidth - margin.left - margin.right
  const height = contentHeight - margin.top - margin.bottom

  const [activeTimeStamp, setTimeStamp] = useState<any>(0)

  const [map, setMap] = useState<L.Map | null>(null)
  const [zoom, setZoom] = useState(5)

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setTimeStamp(value)
  }

  const renderLayersDropdown = () => {
    return (
      <div id="layerBtn" style={{ cursor: "pointer", backgroundColor: "white",  margin: "5px", borderRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)" }}>
        <FontAwesomeIcon 
          id="layerBtn"
          size="2x" 
          style={{ color: "#696969", padding: 0, margin: "5px" }} 
          icon={faLayerGroup} 
          onClick={ handleLayersDropdownClick }
          />
      </div>
    )

    function handleLayersDropdownClick (e: any) {

      if(d3.select(`#layer-dropdown-elemId-${props.element.id}`).style("display") == "block"){
        d3.select(`#layer-dropdown-elemId-${props.element.id}`).style("display", "none")
    
      } else {
        d3.select(`#layer-dropdown-elemId-${props.element.id}`).style("display", "block")
      }

    }
  }

  const renderLayersDropdownItems = () => {
    if (props.element) {

      return (
        // <div className='component' id="layers-dropdown-items" style={{zIndex: 1001, left: 90, position: "absolute", borderRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)", display: "none"}}>
        <div className='component layer-dropdown-content' key={`layer-dropdown-elemId-${props.element.id}`} id={`layer-dropdown-elemId-${props.element.id}`} style={{zIndex: 1001, left: 45, position: "absolute", borderRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)", display: "none"}}>
          <div style={{overflowY: "auto", overflowX: "clip", height: "73%", padding: "10px"}} id={"toggle_widget_"}>
            <ul style={{listStyleType: "none", padding: 10, margin: 0}}>
              {renderItems()}
            </ul>
          </div>
        </div>
      )
    } else {
      return null
    }

    function renderItems() {
      return Object.keys(props.element.dropdown).map((groupName: string) => {
        const groupId = `layer-elemId-${props.element.id}-group-${groupName}`
        // const itemId = `layer-item-elemId-${props.element.id}-${groupId}`
        
        if(groupName === "Single") {
          return props.element.dropdown[groupName].map((item: any) => renderItem(item, props.element.id))
  
        } else {
          return (
            <li key={`layer-item-elemId-${props.element.id}-${groupId}`}>
              <div className="button layer-group" style={{cursor: "pointer"}} onClick={() => showHideSubitems(groupId)}>
                {groupName}
                <FontAwesomeIcon icon={faCaretDown} style={{color: "#696969", marginLeft: "5px", marginRight: "auto"}}/>
              </div>
              <ul id={groupId} style={{display: "none", cursor: "pointer"}}>
                {props.element.dropdown[groupName].map((item: any) => renderItem(item, props.element.id))}
              </ul>
            </li>
          )
        }
      })

      function showHideSubitems (itemId:string) {

        if(d3.select(`#${itemId}`).style("display") == "inline-block"){
            d3.select(`#${itemId}`).style("display", "none")
        }else{
          d3.select(`#${itemId}`).style("display", "inline-block")
        }
      }
  
      function renderItem(itemObj: any, mapId: string) {
        const checkId = `layer-item-elemId-${props.element.id}-${itemObj.id}`
        return(
          <div key={`layer-item-elemId-${props.element.id}-${itemObj.id}-check`} className={`layer-item`}>
            <Form.Check 
              type="checkbox" 
              label={itemObj.label} 
              id={checkId} 
              checked={itemObj.visible}
              onChange={() => { props.updatePlotData(); props.updateMapData(mapId, itemObj) }}
            />
          </div>
        )
      }
    }
  }

  const renderLegends = () => {
    const _display = props.newMapData.length > 0 ? "block" : "none"

    return (
      <div className='component' id="layers-legends" style={{zIndex: 1001, bottom:80, left: 10, position: "absolute", borderRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)", display: _display}}>
        <div style={{overflowY: "auto", overflowX: "clip", height: "73%", padding: "10px"}}>
            {props.newMapData.map((d: any) => {
              return (
                <Row key={`row-map-legend-${d.mapId}-${d.layerId}`} style={{ marginTop:"5px" }}>
                  <MapLegend 
                  colorScheme={d.colorScheme} 
                  legId={`${d.mapId}-${d.layerId}`} 
                  domain={d.domain}
                  label={d.label}
                  />
                </Row>
                )
            })}
        </div>
      </div>
    )
  }

  const renderNavContent = () => {
    return(
      <div style={{ height:55, background: "#132666"}} >
        {/* <Row xs="auto"> */}
        <Row>
          <Col id="layerBtn" xs="auto">{renderLayersDropdown()}</Col>
          <Col>{renderTimeStampBtn()}</Col>
          <Col xs="auto" className="ml-auto">
            <CodeBtn element={props.element} updateGrammarId={props.updateGrammarId}/>
          </Col>
        </Row>
      </div>
    )
  }

  const renderTimeStampBtn = () => {
    return (
      <div style={{ width: "270px", backgroundColor: "white",  padding: "5px", margin: "5px", borderRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)" }}>
        <div className="range-container">
          <Form.Range
            value={activeTimeStamp}
            onChange={handleRangeChange}
            min={0}
            max={24}
          />
          <Form.Text className="range-value">Time Stamp: {activeTimeStamp}</Form.Text>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if(map) {
      const ct: L.LatLngTuple = props.element.center ? props.element.center : startCenter
      const zm: number = props.element.zoom ? props.element.zoom : 5
      console.log(zm)
      map.flyTo(ct, zm)  
      setZoom(zm)

      // to do --> update the grammar
      // map.leafletElement.getZoom()

    }

  }, [map, props.element.center, props.element.zoom])


  return (
    <React.Fragment>
      {renderNavContent()}
      {renderLayersDropdownItems()}
      {renderLegends()}
      <LeafletMap elementId={props.element.id} center={props.element.center} zoom={zoom} activeTimeStamp={activeTimeStamp} layers={props.newMapData} updatePlotData={props.updatePlotData}/>
    </React.Fragment>
  )
}

export default SpatialView