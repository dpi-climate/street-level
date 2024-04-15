import React from 'react'
import { Vega, VegaLite } from 'react-vega'
import { VisualizationSpec } from 'vega-embed'

interface IVegaLitePlotProps {
  schema?:any
  chartWidth?:any
  chartHeight?:any
}

const VegaLitePlot: React.FC<IVegaLitePlotProps> = (props) => {
  const spec: VisualizationSpec = props.schema
  // return <VegaLite spec={spec} actions={false} renderer={'svg'}/>
  
  if(props.chartWidth && props.chartHeight) {
    return <VegaLite spec={spec} actions={false} renderer={'svg'} width={props.chartWidth} height={props.chartHeight}/>

  } else if(props.chartWidth){
    return <VegaLite spec={spec} actions={false} renderer={'svg'} width={props.chartWidth}/>
  
  } else if(props.chartHeight) {
    return <VegaLite spec={spec} actions={false} renderer={'svg'} height={props.chartHeight}/>
  } else {
    return <VegaLite spec={spec} actions={false} renderer={'svg'}/>
  }

}

export default VegaLitePlot
 