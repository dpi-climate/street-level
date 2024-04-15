import React, { useRef, useState, useEffect } from "react"
import "./Views.css"
import SpatialView from "../spatial-view/SpatialView"
import { IMap } from "../../data-logic/interfaces"
import { DataLoader } from "../../data-logic/data-loader"
import { Row, CloseButton } from "react-bootstrap"
import MapLegend from "../map-legend/MapLegend"
// import Plot from "../plot/Plot"
import VegaLitePlot from "../vega-lite-plot/VegaLitePlot"
import Draggable from 'react-draggable'
import MapPlot from "../map-plot/MapPlot"
import * as d3 from "d3"

interface IViewsProps {
  map: any //IMap[]
  // data: number[][]
  updateGrammarId:any
  elements:any
  updateMapData:Function
  mapData: any
  newMapData:any
  mainDiv:any
  grammarGrid:any
}

// left: getTopLeft(component.position).left, top: getTopLeft(component.position).top, width: getSizes(component.position).width, height: getSizes(component.position).height

const Views: React.FC<IViewsProps> = (props) => {

  const [plotData, setPlotData] = useState<any>([])

  const getSizes = (position: any) => {
    const widthPercentage = (position.width[1]+1-position.width[0])/props.grammarGrid.width
    const heightPercentage = (position.height[1]+1-position.height[0])/props.grammarGrid.height

    const margin = 14

    return {width: widthPercentage * props.mainDiv.offsetWidth-margin, height: heightPercentage * props.mainDiv.offsetHeight-margin}
  }
  
  const getTopLeft = (position: any) => {

    const leftPercentange = (position.width[0]-1)/props.grammarGrid.width
    const topPercentange = (position.height[0]-1)/props.grammarGrid.height

    const margin = 14

    return {top: topPercentange * props.mainDiv.offsetHeight+(margin/2), left: leftPercentange * props.mainDiv.offsetWidth+(margin/2)}
  }
   
  const renderSpatialView = (elem:any, data:any) => {
    return (
      <SpatialView
        key={`spatial-view-key-${elem.id}`}
        element={elem}
        mapData={props.mapData}
        newMapData={data}
        data={[]}  
        updateGrammarId={props.updateGrammarId}
        updateMapData={props.updateMapData}
        updatePlotData={updatePlotData}
      />  
    )
  }
  
  const renderViews = () => {
    return props.elements.map((elem: any) => {
      if(elem.type === "map") {
        const data = props.newMapData.filter((m: any) => m.mapId === elem.id)
        const topLeft = getTopLeft(elem.position)
        const sizes = getSizes(elem.position)

        if(sizes.width > 0 && sizes.height > 0) {
          return (
            <div className='component' id={elem.id} key={elem.id} style={{ padding: 0, position: "absolute", left: topLeft.left, top: topLeft.top, width: sizes.width, height: sizes.height }}>
              <React.Fragment>
                { renderSpatialView(elem, data) }
              </React.Fragment>
            </div>
            )

        } else {
          return null
        }
      } else if(elem.type === "map_plot"){
        const dataArr = plotData.filter((p:any) => p.mapPlotId === elem.id )

        if (dataArr.length > 0) {

          const topLeft = getTopLeft(elem.position)
          const sizes = getSizes(elem.position)
          const dataObj = dataArr[0]

          if(sizes.width > 0 && sizes.height > 0) {           
            return <MapPlot key={`map-plot-${dataObj.mapPlotId}`} element={elem} dataObj={dataObj} topLeft={topLeft} sizes={sizes} setPlotData={setPlotData} updateGrammarId={props.updateGrammarId}/>
          } else {
            return null
          }
        } else {
          return null
        }
        
      }
    })
  }

  const updatePlotData = async (elemId: any, latLonObj: any, layerId:any) => {

    if(!elemId && !latLonObj && !layerId) {
      setPlotData([])
    
    } else {
      // console.log("[SpatialView updatePlotData]")

      const obj = await DataLoader.getPlotData(elemId, latLonObj.lat, latLonObj.lng, layerId)
  
      const newPlotData = [...plotData]
      const plotIdx = newPlotData.findIndex((p:any) => p.mapId === elemId )
  
      if(plotIdx > -1) {
        newPlotData[plotIdx] = obj
  
      } else {
        newPlotData.push(obj)
      }
  
      setPlotData(newPlotData)
    }
  }

  return (
    <React.Fragment>
      <div className="views">
        {renderViews()}
      </div>
    </React.Fragment>
  )
}

export default Views