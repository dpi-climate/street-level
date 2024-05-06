from flask_cors import CORS
from flask import Flask, request, send_from_directory, jsonify

import json

from structure import Structure

app = Flask(__name__)
CORS(app)

app.debug  = True

mainPath = '../input/chicago'
grammarpath = f'{mainPath}/grammar.json'

structure = Structure()
structure.startServer()

@app.route("/grammar", methods=("GET", 'POST'))
def handleGrammar():
    if request.method == "GET":
        id = request.args["id"]
        grammar = structure.getGrammar(id)
        return json.dumps(grammar, indent=4)
    
    else:
        # structure.writeGrammar(json.loads(request.json['content']))
        structure.writeGrammar(request.json['content'])
        return ""

@app.route("/maps", methods=("GET", "POST"))
def handleMaps():
    if request.method == "GET":
        elements = structure.getElements()
        
        return json.dumps(elements)
    
@app.route("/geojson", methods=("GET",))
def handleShapefile():
    if request.method == "GET":
        mapId = request.args["mapId"]
        layerId = request.args["layerId"]
        geoDataId = request.args["geoDataId"]
        
        if "thematicId" in request.args.keys():
            thematicId = request.args["thematicId"]
        else:
            thematicId = request.args.getlist('thematicId[]')

        geojson = structure.getGeoData(mapId, layerId, geoDataId, thematicId)
        
        return jsonify(geojson)
    else:
        return ""
    
@app.route("/elements",  methods=("GET",))
def handleElements():
    if request.method == "GET":
        elements = structure.getElements()
        return json.dumps(elements)
    
@app.route("/plot")
def handlePlot():
    if request.method == "GET":
        elemId = request.args["elemId"]
        lat = request.args["lat"]
        lon = request.args["lon"]
        layerId = request.args["layerId"]

        obj = structure.handleClickLayer(elemId, lat, lon, layerId)

        return json.dumps(obj)