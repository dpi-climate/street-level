import React from 'react'
import { VegaLite } from 'react-vega'
import { VisualizationSpec } from 'vega-embed'

const data = [
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
  ]


const VegaLitePlot = () => {
  const spec: VisualizationSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Stock prices of 5 Tech Companies over Time.",
    "data": {"values": data},
    "mark": "line",
    "encoding": {
      "x": {
        "field": "x",
        "type": "temporal",
        "axis": {"title": "Time Stamps"}
      },
      "y": {
        "field": "y",
        "type": "quantitative",
        "axis": {"title": "Temperature"}
      },
      "color": {"field": "assembly", "type": "nominal"}
    }
  }

  return <VegaLite spec={spec} actions={false} renderer={'svg'}/>
}

export default VegaLitePlot




 