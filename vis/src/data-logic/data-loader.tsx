import axios from "axios"
import paths from "../consts/route-paths"
import { IMasterGrammar } from "./interfaces"

export abstract class DataLoader {
    
  static async getJsonData(url: string) {

    const response = await fetch(url, {
      headers: {
        'Accept-Encoding': 'gzip',
        'Accept': 'application/json'
      }
    })

    if(!response.ok) return null

    let json = {}
    let jsonString = ''

    const contentEncoding = response.headers.get('Content-Encoding')

    if (contentEncoding && contentEncoding.includes('gzip')) { // if the response is encoded

      const blob = await response.blob()

      await new Promise((resolve, reject) => {
        const addFunc = (value: any) => {
          jsonString += value
        }

        parseFile(blob, {add: addFunc, done: resolve}) // Read in chunks
      })

      json = JSON.parse(jsonString)
    
    } else {

      json = await response.json()
    }

    return json

    function parseFile(file: any, callback: any) {
      const fileSize = file.size
      const chunkSize = 64 * 1024 // bytes
      let offset = 0
      let chunkReaderBlock: any = null

      const readEventHandler = function(evt: any) {
          if (evt.target.error == null) {
              offset += evt.target.result.length
              callback.add(evt.target.result) // callback for handling read chunk
          } else {
              console.log("Read error: " + evt.target.error)
              return
          }
          if (offset >= fileSize) {
              callback.done(undefined)
              return
          }

          // of to the next chunk
          chunkReaderBlock(offset, chunkSize, file)
      }

      chunkReaderBlock = function(_offset: any, length: any, _file: any) {
          var r = new FileReader()
          var blob = _file.slice(_offset, length + _offset)
          r.onload = readEventHandler
          r.readAsText(blob)
      }

      // now let's start the read with the first block
      chunkReaderBlock(offset, chunkSize, file)
    }
  }

  static async getInput(url: string, fileName:string) {
    const method = 'get'
    const data = { params: {fileName} }
    const resp = await axios[method](url, data)

    return resp.data
    
  } 

  static async postGrammar(grammar: string) {

    const url = `${paths.serverUrl}/updateGrammar`
    const method = 'post'
    const data = { grammar }
    
    await axios[method](url, data)

  }
}