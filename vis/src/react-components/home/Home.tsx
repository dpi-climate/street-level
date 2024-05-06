import "./Home.css"
import React, { useEffect, useState } from 'react'
import Grammar from '../grammar/Grammar'
import Views from "../views/Views"
import { DataLoader } from "../../data-logic/data-loader"
import MapLayer from "../../map-layer"
// import $ from "jquery"

import { Spinner } from 'react-bootstrap'

const Home: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false)
  
  const [activeGrammarId, setGrammarId] = useState<string>("")
  const [grammarContent, setGrammarContent] = useState<any>(null)

  const [map, setMap] = useState<any>(null)

  const [elements, setElements] = useState<any>([])
  const [mapData, setMapData] = useState<any>({ mapId: null, geojson: null})
  const[newMapData, setNewMapData] = useState<any>([])
  const [grammarGrid, setGrammarGrid] = useState<any>({})
  const [mainDiv, setMainDiv] = useState<any>(null)

  const getElements = async () => {
    const _elements = await DataLoader.getElements()
    const elementsTsx:any = []

    for (const element of _elements) {
      if (element.type === "map") {
        // const { dropdown:_, ...obj } = element

        const obj = { ...element }
        obj.dropdown = {}
        
        for (const groupName in element.dropdown) {
          obj.dropdown[groupName] = []

          for(const layer of element.dropdown[groupName]) {
            const mapLayer = new MapLayer(layer)
            obj.dropdown[groupName].push(mapLayer)

          }
        }
        elementsTsx.push(obj)
      } else if (element.type === "map_plot") {
        const obj = { ...element }
        elementsTsx.push(obj)
      }
    }

    setElements(elementsTsx)
  }
  
  const updateGrammarId = async (grammarId : string) => {
    const grammar = await DataLoader.getGrammar(grammarId)
    
    if (grammarId === "master") { setGrammarGrid(grammar.grid) }
    
    setGrammarContent(grammar)
    setGrammarId(grammarId)
    
  }

  const applyGrammar = async (strGrammar: string) => {
    setLoading(true)
    await DataLoader.postGrammar(strGrammar)

    setNewMapData([])
    getElements()
    setLoading(false)

  }

  const renderSpinner = () => {
    const left = window.innerWidth / 2
    const top  = window.innerHeight / 2
    
    if(loading) {
      return (
        <div style={{zIndex:1001, position:"absolute", left, top}}>
          <Spinner animation="grow" variant="info"/>
        </div>
    )
    } else {
      return null
    }
  }

  const render = () => {
    
    if(grammarContent && mainDiv){
      return (
        <React.Fragment>
          {renderSpinner()}
          <div className='component' style={{padding: 0, width: "100vw", height:"100vh"}}>
            <Views 
              mainDiv={mainDiv}
              elements={elements}
              grammarGrid={grammarGrid}
              newMapData={newMapData}
              mapData={mapData}
              map={map}   
              updateGrammarId={updateGrammarId}
              updateMapData={updateNewMapData}
              />
          </div>
            <Grammar 
              content={grammarContent} 
              updateGrammar={applyGrammar} 
              updateGrammarId={updateGrammarId}
            />
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  const updateNewMapData = async (mapId: string, itemObj: any) => {
    console.log(itemObj)
    const newElements = [...elements]
    
    const mapIdx = newElements.findIndex((elem: any) => elem.id === mapId)
    const mapElement = newElements[mapIdx]

    const groupItemIdx = mapElement.dropdown[itemObj.group].findIndex((l: any) => l.id === itemObj.id)

    let _newMapData = [...newMapData]
    
    const sameGeoDataLayerIdx = _newMapData.findIndex((d: any) => d.mapId === mapId && d.geoDataId === itemObj.geoDataId)
    
    if(!mapElement.dropdown[itemObj.group][groupItemIdx].visible) {

      if( sameGeoDataLayerIdx > -1) {        
        const sameGeoDataLayerGroup = _newMapData[sameGeoDataLayerIdx].group
        const sameGeoDataDropdownIdx = mapElement.dropdown[sameGeoDataLayerGroup].findIndex((elem: any) => elem.id === _newMapData[sameGeoDataLayerIdx].layerId)
        
        mapElement.dropdown[sameGeoDataLayerGroup][sameGeoDataDropdownIdx].visible = false
        
        _newMapData = _newMapData.filter((d: any) => {
          if(d.mapId === mapId) {
            if(d.geoDataId !== itemObj.geoDataId) {
              return true
            } else {
              return false
            }
          } else {
            return true
          }
          // d.mapId === mapId && d.geoDataId !== itemObj.geoDataId
        })
      }
      const _mapData: any = await DataLoader.getMapData(mapId, itemObj.geoDataId, itemObj.thematicId, itemObj.id) //{mapId:""} //
      _newMapData.push(_mapData)
      
    } else {
      _newMapData = _newMapData.filter((m:any) => m.mapId !== mapId || m.layerId !== itemObj.id)
    }
    
    mapElement.dropdown[itemObj.group][groupItemIdx].visible = !mapElement.dropdown[itemObj.group][groupItemIdx].visible
    
    setNewMapData(_newMapData)
    setElements(newElements)

  }

  useEffect(() => {
    // $("#home").empty()
    const m = document.querySelector("#home")
    setMainDiv(m)
    updateGrammarId("master")
    getElements()
  }, [])
  
  
  
  return <div className="home" id="home">{ render() }</div>


}

export default Home