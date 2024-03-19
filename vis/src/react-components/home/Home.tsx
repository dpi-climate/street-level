import "./Home.css"
import React, { useEffect, useState } from 'react'
import Grammar from '../grammar/Grammar'
import MainView from "../main-view/MainView"
import DataManager from "../../data-logic/data-manager"
import { IMasterGrammar, IMap, ILayer } from "../../data-logic/interfaces"


const Home: React.FC = () => {

  const dataManager: DataManager = new DataManager()

  const [grammarContent, setGrammarContent] = useState<IMasterGrammar | null>(null)
  const [map, setMap] = useState<IMap | null>(null)
  const [layers, setLayers] = useState<ILayer | null>(null)
  const [data, setData] = useState<number[][]>([])

  const updateGrammar = async (strGrammar: string) => {
    await dataManager.applyGrammar(strGrammar)

    setGrammarContent(dataManager.getGrammarContent())
    setMap(dataManager.getMap())
    setData(dataManager.getData())
    
  }
  
  const handleGrammar = async () => {
    const _grammarContent = await dataManager.loadGrammarContent()
    
    setGrammarContent(_grammarContent)
    setMap(dataManager.getMap())
    setData(dataManager.getData())

  }

  useEffect(() => {
    handleGrammar()

  }, [])

  

  if(grammarContent &&  map) {
    return (
      <React.Fragment>
      <div className="home">
        <div className='component' style={{padding: 0, position: "absolute", left: "7px", top: "7px", width: "1800px", height: "800px"}}>
          <MainView map={map} data={data}/>
        </div>
        <div className='component grammar-wrapper grammar-wrapper--isOpen'>
          <Grammar content={grammarContent} updateGrammar={updateGrammar}/>
        </div>
      </div>
    </React.Fragment>
    )
  } else {
    return <></>
  }
}

// const Home: React.FC = () => {
//   return (
//     <React.Fragment>
//       <div className="home">
//         <div className='component' style={{padding: 0, position: "absolute", left: "7px", top: "7px", width: "1800px", height: "800px"}}>
//           <GraphicalDisplays/>
//         </div>
//       </div>
//     </React.Fragment>
//   )
// }

export default Home