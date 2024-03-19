

export interface IComponent {
    id: string
    position: { width: number[], height: number[] }
}

export interface IEdges {
    // edges: { nodes: { lat: number, lon: number }[], bearing: number, length: number }
    edges: [{ lat: number, lon: number }, { Bearing: number }, { Length: number }]
}

export interface IMap {
    center: [number, number]
    zoom: number
}


export interface IMasterGrammar {
    thematic_data: { data: number[][], }
    physical_data: { map: IMap, layers: ILayer[] }

}

export interface ILayer {
    id: string
    type: string
    edges: string
    radius: number
    orientation: {
        type: string
        reference: string
    },

    segment: {
        n_rows: number
        n_cols: number
        unit: IUnit
    },

    operation: string
}

export interface IPlot {
    values: { a: string, b: string }[]
    mark: { type: string, cornerRadius?: number }
    encoding: { 
        x: { field: string, type: string, axis: { labelAngle: number}}
        y: { field: string, type: string}
    }
}

export type IUnit = {
    type: "plot",
    properties: IPlot
} | {
    type: "weave",
    properties: IWeave
} | {
    type: "point" | "dash",
    properties: {}
}



export interface IWeave {
    color: string
}