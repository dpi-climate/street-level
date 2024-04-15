import React, { useRef, useEffect, useCallback, useState, createElement } from "react"
import LeafletMap from "../leaflet-map/LeafletMap"
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { DataLoader } from "../../data-logic/data-loader"

import D3Plot from "../d3-plot/D3Plot"
import { IMap } from "../../data-logic/interfaces"
import * as d3 from "d3"
import { Canvg } from 'canvg'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import {Row, Col, Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faCode, faLayerGroup,  faCaretDown, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

interface ISpatialView {
  // map: IMap
  map: any
  data: number[][]
  listLayers:any
  updateGrammarId:any
  updateMapData: Function
  mapData: any

}

const SpatialView: React.FC<ISpatialView> = (props) => {
  const mapRef = useRef(null)
  const startCenter = [41.0, -87.0] as L.LatLngTuple

  const margin = {top: 10, right: 10, bottom: 20, left: 20}

  const contentHeight = 150
  const contentWidth  = 230

  const width  = contentWidth - margin.left - margin.right
  const height = contentHeight - margin.top - margin.bottom

  const [data, setData] = useState(props.data)
  const [cleanMap, setCleanMap] = useState<boolean>(false)
  const [activeTimeStamp, setTimeStamp] = useState<any>(0)
  const [activeGeoDataIds, setGeoDataIds] = useState<any>([])

  const [map, setMap] = useState<L.Map | null>(null)
  const [zoom, setZoom] = useState(5)
  const [geojson, setGeojson] = useState<any>(null)


  useEffect(() => {
    if(map) {
      const ct: L.LatLngTuple = props.map.center ? props.map.center : startCenter
      const zm: number = props.map.zoom ? props.map.zoom : 5
      console.log(zm)
      map.flyTo(ct, zm)  
      setZoom(zm)

      // to do --> update the grammar
      // map.leafletElement.getZoom()

    }

  }, [map, props.map.center, props.map.zoom])

  useEffect(() => {
    setGeojson(props.mapData.geojson)
    // updateGeojson()

  }, [props.mapData.geojson])



  
  const canvasLayer = L.layerGroup()

  const handleCheckedItem = (itemObj: any, mapId: string) => {
    // if (itemObj.visible) {
    //   itemObj.visible = false

    // } else {
    //   itemObj.visible = true
    // }

    // console.log(itemObj.visible)
    props.updateMapData(mapId, itemObj)
    // update thematic and/or geojson --> send map Id
  
  }

  const renderGrammarBtn = () => {
    return (
      <div style={{ cursor: "pointer", backgroundColor: "white",  margin: "5px", borderRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)" }}>
        <FontAwesomeIcon 
        size="2x" 
        style={{ color: "#696969", padding: 0, margin: "5px" }} 
        icon={faCode} 
        onClick={ () => props.map ? props.updateGrammarId(props.map.id) : null }
        />
      </div>
    )
  }

  const renderLayersDropdown = () => {
    return (
      <div style={{ cursor: "pointer", backgroundColor: "white",  margin: "5px", borderRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)" }}>
        <FontAwesomeIcon 
          size="2x" 
          style={{ color: "#696969", padding: 0, margin: "5px" }} 
          icon={faLayerGroup} 
          onClick={ handleLayersDropdownClick }
          />
      </div>
    )

    function handleLayersDropdownClick (e: any) {

      if(d3.select("#layers-dropdown-items").style("display") == "block"){
          d3.select("#layers-dropdown-items").style("display", "none");
      
      } else {
        d3.select("#layers-dropdown-items").style("display", "block");
      }
    }
  }

  const renderLayersDropdownItems = () => {
    if (props.map) {
      return (
        // <div className='component' id="layers-dropdown-items" style={{position: "absolute", right: 100, top: 10, width: 250, borderRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)", display: "none"}}>
        <div className='component' id="layers-dropdown-items" style={{zIndex: 1001, left: 90, position: "absolute", borderRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)", display: "none"}}>
          {/* <div style={{overflowY: "auto", overflowX: "clip", height: "73%", padding: "10px"}} id={"toggle_widget_"+widgetIdx}> */}
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
      return Object.keys(props.map.dropdown).map((groupName: string) => {
        const groupId = `layer-group-${groupName}`
        
        if(groupName === "Single") {
          return props.map.dropdown[groupName].map((item: any) => renderItem(item, props.map.id))
  
        } else {
          return (
            <li key={groupId}>
              <div className="button layer-group" style={{cursor: "pointer"}} onClick={() => showHideSubitems(groupId)}>
                {groupName}
                <FontAwesomeIcon icon={faCaretDown} style={{color: "#696969", marginLeft:"5px"}}/>
                </div>
              <ul id={groupId} style={{display: "none", cursor: "pointer"}}>
                {props.map.dropdown[groupName].map((item: any) => renderItem(item, props.map.id))}
              </ul>
            </li>
          )
        }
      })

      function showHideSubitems (itemId:string) {

        if(d3.select(`#${itemId}`).style("display") == "inline-block"){
            d3.select(`#${itemId}`).style("display", "none");
        }else{
          d3.select(`#${itemId}`).style("display", "inline-block");
        }
      }
  
      function renderItem(itemObj: any, mapId: string) {
        // console.log("itemObj.visible", itemObj.visible)
        return(
          <div key={`layer-item-${itemObj.label}-check`}  className={`layer-item`}>
            <Form.Check 
              // checked={handleCheckedItem(itemObj)} 
              type="checkbox" 
              label={itemObj.label} 
              id={itemObj.label} 
              checked={itemObj.visible}
              onChange={() => { handleCheckedItem(itemObj, mapId) }}
            />
          </div>
        )
      }
    }
  }

  const renderNavContent = () => {
    return(
      <div style={{ height:55, background: "#132666"}} >
        {/* <Row xs="auto"> */}
        <Row>
          <Col xs="auto">{renderLayersDropdown()}</Col>
          <Col>{renderTimeStampBtn()}</Col>
          <Col xs="auto" className="ml-auto">{renderGrammarBtn()}</Col>
        </Row>
      </div>
    )
  }

  const renderTimeStampBtn = () => {
    return (
      <>
        <ButtonGroup aria-label="Basic example">
        <div style={{ cursor: "pointer", backgroundColor: "white",  marginTop: "5px", marginBottom: "5px", marginLeft: "5px", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)" }}>
          <FontAwesomeIcon 
          size="2x" 
          style={{ color: "#696969", padding: 0, margin: "5px" }} 
          icon={faMinus} 
          onClick={ () => setTimeStamp(activeTimeStamp - 1) }
          />
        </div>
        <div style={{ width:70 , cursor: "none", backgroundColor: "white",  marginTop: "5px", marginBottom: "5px", border: "1px solid white", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)" }}>
          {activeTimeStamp}
        </div>
        <div style={{ cursor: "pointer", backgroundColor: "white",  marginTop: "5px", marginBottom: "5px", marginRight: "5px", borderTopRightRadius: "8px", borderBottomRightRadius: "8px", border: "1px solid #dadce0", opacity: 0.9, boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)" }}>
          <FontAwesomeIcon 
          size="2x" 
          style={{ color: "#696969", padding: 0, margin: "5px" }} 
          icon={faPlus} 
          onClick={ () => setTimeStamp(activeTimeStamp + 1) }
          />
        </div>
          {/* <Button variant="secondary">Left</Button>
          <Button variant="secondary">Middle</Button>
          <Button variant="secondary">Right</Button> */}
        </ButtonGroup>
    </>
    )
  }

  return (
    <React.Fragment>
      {renderNavContent()}
      {renderLayersDropdownItems()}
      <LeafletMap center={props.map.center} zoom={zoom} activeTimeStamp={activeTimeStamp} canvasLayer={canvasLayer} cleanMap={cleanMap} setCleanMap={setCleanMap} geojson={geojson}/>
    </React.Fragment>
  )
}

export default SpatialView