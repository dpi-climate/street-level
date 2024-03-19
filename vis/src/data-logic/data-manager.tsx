import { DataLoader } from "./data-loader"
import { IMasterGrammar, IMap, ILayer, IEdges } from "./interfaces"
import paths from "../consts/route-paths"

class DataManager {
  // protected _rawGrammarContent: IMasterGrammar | null
  protected _grammarContent: IMasterGrammar
  protected _map: IMap
  protected _layers: ILayer[]
  protected _network: any
  protected _data: number[][]


  
  applyGrammar = async (strGrammar: string) => {
    await DataLoader.postGrammar(strGrammar)
    
    this._grammarContent = JSON.parse(strGrammar) as IMasterGrammar
    
    await this.update()

  }
  
  getData = () => this._data
  
  getGrammarContent = () => this._grammarContent
  
  getMap = () => this._map

  getNetwork = () => this._network

  handleNetwork = async (l: ILayer) => {

    // Load edges and nodes
    const url = `${paths.serverUrl}/input`
    const extension = l.edges.split('.').pop()
    this._network = {...l}

    if(extension === "json") {
      const edgesData = await DataLoader.getInput(url, l.edges)
      this._network.edges = edgesData.edges
      l.edges = edgesData.edges
      
    }    
  }

  loadGrammarContent = async () => {
    
    const url = `${paths.serverUrl}/grammar`
    this._grammarContent = await DataLoader.getJsonData(url) as IMasterGrammar

    // to do validate grammarContent
    await this.update()

    return this._grammarContent
    
  }

  update = async () => {

    this._map = {...this._grammarContent.physical_data.map }
    this._data = [...this._grammarContent.thematic_data.data]

    for(let layer of this._grammarContent.physical_data.layers){
      if(layer.type === "network") {
        await this.handleNetwork(layer)
      }
    }
  }
}

export default DataManager