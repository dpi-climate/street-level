import React, { useRef, useState, useEffect } from "react"
import "./MainView.css"
import SpatialView from "../spatial-view/SpatialView"
import { IMap } from "../../data-logic/interfaces"

interface IMainViewProps {
  map: IMap
  data: number[][]
}

const MainView: React.FC<IMainViewProps> = (props) => {

  return (
    <React.Fragment>
      <div style={{paddingLeft: 475, width: "100%", height: "100%"}}>
        <div className="graphical-displays">
          <SpatialView map={props.map} data={props.data}/>
        </div>
    </div>
    </React.Fragment>
  )
}

// const MainView: React.FC = () => {
//   return (
//     <React.Fragment>
//       <div style={{paddingLeft: 0, width: "100%", height: "100%"}}>
//         <div className="graphical-displays">
//           <SpatialView/>
//         </div>
//     </div>
//     </React.Fragment>
//   )
// }

export default MainView