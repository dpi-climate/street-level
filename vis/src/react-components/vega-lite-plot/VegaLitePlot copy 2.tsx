import React from 'react'
import { Vega, VegaLite } from 'react-vega'
import { VisualizationSpec } from 'vega-embed'

const vega = require('vega')
const lite = require('vega-lite')

interface IVegaLitePlotProps {
  width?: any
  height?:any
  schema?:any
}
// let vegaspec = lite.compile(elem.plot).spec;
// vega.parse(vegaspec)

// const myspec = {
  //   "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  //   "description": "Stock prices of 5 Tech Companies over Time.",
  //   "data": {"values": data},
  //   "mark": "line",
  //   "encoding": {
    //     "x": {
      //       "field": "x",
      //       "type": "temporal",
      //       "axis": {"title": "Time Stamps"}
      //     },
      //     "y": {
        //       "field": "y",
        //       "type": "quantitative",
        //       "axis": {"title": "Temperature"}
        //     },
        //     "color": {"field": "assembly", "type": "nominal"}
        //   }
        // }
        // let vegaspec = lite.compile(myspec).spec
        // let final = vega.parse(vegaspec)
        // console.log(final)
        
        // const VegaLitePlot: React.FC<IVegaLitePlotProps> = (props) => {
          //   const spec: VisualizationSpec = { final }
          
          //   return <VegaLite spec={spec} actions={false} renderer={'svg'}/>
          // }
          

const VegaLitePlot: React.FC<IVegaLitePlotProps> = (props) => {

  // function transformKeysToStrings(obj: any): any {
  //   const transformedObj: any = {};
  //   for (const key in obj) {
  //       if (Object.prototype.hasOwnProperty.call(obj, key)) {
  //           const value = obj[key];
  //           if (typeof value === 'object' && value !== null) {
  //               transformedObj[String(key)] = transformKeysToStrings(value);
  //           } else {
  //               transformedObj[String(key)] = value;
  //           }
  //       }
  //   }
  //   return transformedObj;
  // }

  // const transformedObject = transformKeysToStrings(props.schema)


  // console.log(transformedObject)
  // const spec:  VisualizationSpec = transformedObject  as VisualizationSpec

  const myschema = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": "container",
    "mark": {"type": "line"},
    "data": { "values": [
            {"x": "2024-01-01", "y": 100.0, "assembly": "AAPL"},
            {"x": "2024-01-02", "y": 102.5, "assembly": "AAPL"},
            {"x": "2024-01-03", "y": 105.2, "assembly": "AAPL"},
            {"x": "2024-01-01", "y": 200.0, "assembly": "GOOGL"},
            {"x": "2024-01-02", "y": 205.5, "assembly": "GOOGL"},
            {"x": "2024-01-03", "y": 208.2, "assembly": "GOOGL"},
            {"x": "2024-01-01", "y": 50.0, "assembly": "MSFT"},
            {"x": "2024-01-02", "y": 52.5, "assembly": "MSFT"},
            {"x": "2024-01-03", "y": 54.2, "assembly": "MSFT"},
            {"x": "2024-01-01", "y": 75.0, "assembly": "AMZN"},
            {"x": "2024-01-02", "y": 77.5, "assembly": "AMZN"},
            {"x": "2024-01-03", "y": 80.2, "assembly": "AMZN"},
            {"x": "2024-01-01", "y": 150.0, "assembly": "FB"},
            {"x": "2024-01-02", "y": 152.5, "assembly": "FB"},
            {"x": "2024-01-03", "y": 155.2, "assembly": "FB"}
        ] },
    "encoding": {
        "x": {"field": "x", "typee": "ordinal", "axis": { "labelAngle": 0 }},
        "y": {"field": "y", "typee": "quantitative", "axis": { "title": "Temperature" }},
        "color": {"field": "assembly", "typee": "nominal"}
    }
}
  // console.log(spec)
  // const myspec = lite.compile(myschema).spec
  const myspec:  VisualizationSpec = myschema  as VisualizationSpec
  // console.log(myspec)
  // return <VegaLite spec={spec} actions={false} renderer={'svg'}/>
  // return <Vega spec={props.data} actions={false} renderer={'svg'}/>
  // return <Vega spec={myspec} renderer={'svg'}/>
  return <VegaLite spec={myspec} renderer={'svg'}/>
}

export default VegaLitePlot




 