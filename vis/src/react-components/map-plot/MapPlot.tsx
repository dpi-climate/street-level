import React, { useRef, useState, useEffect } from "react"
import Draggable from "react-draggable"
import { Resizable } from "react-resizable"
import VegaLitePlot from "../vega-lite-plot/VegaLitePlot"
import { CloseButton } from "react-bootstrap"
import CodeBtn from "../code-btn/CodeBtn"
import ResizeObserver from 'resize-observer-polyfill'

interface IMapPlot {
    topLeft: any
    sizes: any
    element: any
    dataObj :any
    setPlotData: any
    updateGrammarId: any
}

const MapPlot: React.FC<IMapPlot> = (props) => {

  const myRef = useRef<HTMLDivElement>(null)

  // const [width, setWidth] = React.useState<number>(200)
  // const [height, setHeight] = React.useState<number>(200)

  // const handleResize = (event: any, { size }: any) => {
  //   setWidth(size.width)
  //   setHeight(size.height)
  // }

  const renderMeasures = () => {
    if ("measures" in props.dataObj) {
      return (
        <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
            {
              Object.keys(props.dataObj.measures).map((k:any) => {
                return (
                  <span style={{ fontWeight: "bold", padding: "5px"}}>
                    {k.toUpperCase()}: {props.dataObj.measures[k]}
                  </span>
                )

              })
            }          
        </div>
      )
    } else {
      return null
    }
  }

  const renderPlot = () => {
    return(
      <div
      ref={myRef}
      id={props.element.id}
      key={props.element.id}
      style={{
        padding: "0px",
        backgroundColor: "white",
        zIndex: 1001,
        left: props.topLeft.left,
        top: props.topLeft.top,
        width: props.sizes.width,
        height: props.sizes.height,
        position: "absolute",
        borderRadius: "8px",
        border: "1px solid #dadce0",
        opacity: 0.9,
        boxShadow: "0 2px 8px 0 rgba(99,99,99,.2)",
        overflow: "hidden", // Ensure content doesn't overflow
      }}
    >
      <div style={{ padding: "10px", height: "100%", position: "relative" }}>
        <div className="d-flex justify-content-end">
          <CloseButton onClick={() => props.setPlotData([])} />
        </div>
        <div style={{ flex: 1 }}>
          <VegaLitePlot schema={props.dataObj.schema}/>
        </div>
        {renderMeasures()}
        <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
          <CodeBtn element={props.element} updateGrammarId={props.updateGrammarId} />
        </div>
      </div>
    </div>
    )
  }

  const render = () => {
    if (props.element.draggable) {
      return (
        <Draggable nodeRef={myRef}>
          {renderPlot()}
        </Draggable>
        )
    
    } else {
      return renderPlot()
    }

  }


  return render()

}

export default MapPlot