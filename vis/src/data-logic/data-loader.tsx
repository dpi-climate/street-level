import axios from "axios"
import paths from "../consts/route-paths"
import { IMasterGrammar } from "./interfaces"

export abstract class DataLoader {

  static async getMapData(mapId: string, geoDataId: string, thematicId: string | string[], layerId: any) {
    const method = 'get'
    
    const url = `${paths.serverUrl}/geojson`
    const data = { params: { mapId, geoDataId, thematicId, layerId } }
    const response = await axios[method](url, data)

    const geojson = response.data 
      ? response.data
      : { mapId: null, geojson: null}

    return geojson
  }
  
  static async getElements() {
    const method = 'get'   
    const url = `${paths.serverUrl}/elements`
    const response = await axios[method](url)
    return response.data

  }
  
  static async getGeojson() {
    const method = 'get'   
    const url = `${paths.serverUrl}/geojson`
    const response = await axios[method](url)
    return response.data
  }
    
  static async getGrammar(id: string) {
    const url = `${paths.serverUrl}/grammar`
    const method = 'get'
    const data = { params: { id } }
    const response = await axios[method](url, data)

    return response.data

  }

  static async getPlotData(elemId: any, lat: any, lon: any, layerId:any) {
    const url = `${paths.serverUrl}/plot`
    const method = 'get'
    const data = { params: { elemId, lat, lon, layerId } }
    const response = await axios[method](url, data)

    return response.data

  }
  
  static loadMaps = async () => {
    const url = `${paths.serverUrl}/maps`
    const method = 'get'
    const response = await axios[method](url)

    return response.data
  }

  static async getInput(url: string, fileName:string) {
    const method = 'get'
    const data = { params: {fileName} }
    const resp = await axios[method](url, data)

    return resp.data
    
  } 

  static async postGrammar(content: string) {
    console.log("PostGrammar")
    const url = `${paths.serverUrl}/grammar`
    const method = 'post'
    const data = { content }
    
    await axios[method](url, data)

  }
}