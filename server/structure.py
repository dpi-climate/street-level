
from consts import mainPath, gridCsv
import json

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

import geopandas
from map_class import Map
from grammar_interpreter import GrammarInterpreter
from termcolor import colored
import os
import sys
from functools import reduce
from math import sqrt
from geo_interpreter import GeoInterpreter

class Structure(object):
    def __init__(self) -> None:
        self.__className = self.__class__.__name__
        self.__grammarInterpreter = GrammarInterpreter()
        self.__geoInterpreter = GeoInterpreter()
        self.__elements = []
        self.__thematicData = []
    
    def __calculateMe(self, forecast, obs):
        n = len(forecast)

        sub = [f - o for f, o in zip(forecast, obs)]

        sum = reduce(lambda a, b: a+b, sub)
        me = round(sum / n, 2)
        
        return me
    
    def __calculateRMSE(self, forecast, obs):
        n = len(forecast)
        # sum   = 0

        sub = [(f - o)**2 for f, o in zip(forecast, obs)]
        sum = reduce(lambda a, b: a+b, sub)
        rmse = round(sqrt(sum / n), 2)

        return rmse

    
    def buildThematicData(self):
        grammars = self.__grammarInterpreter.getGrammarList()
        for thematicData in grammars[0]["content"]["thematic_data"]:
            file = f"{mainPath}/{thematicData['source']}"

            if not os.path.isfile(file):
                msg = f"[{self.__className}] File {file} does not exist."
                print(colored(msg, "red"))
                sys.exit()
            
            with open(file, "r", encoding="utf-8") as f3:
                data = json.load(f3)            
                obj = { k: thematicData[k] for k in thematicData.keys() - {"source"} }
                obj["data"] = data
                self.__thematicData.append(obj)
    
    def getGeoData(self, mapId, layerId, geoId, thematicId):
        element = [elem for elem in self.__elements if elem.getId() == mapId][0]
        layer = element.getLayer(layerId)

        if isinstance(thematicId, str):
            thematicItem = [item for item in self.__thematicData if item["id"] == thematicId][0]
            geoObj = self.__geoInterpreter.getGeoObj(geoId, thematicItem["content"], layer)
        
        else:
            thematicItem = [item for item in self.__thematicData if item["id"] in thematicId]
            geoObj = self.__geoInterpreter.getGeoObjAnalysis(geoId, thematicItem, layer)
        
        geoObj["geoDataId"] = layer["geoDataId"]
        geoObj["mapId"] = mapId
        geoObj["domain"] = thematicItem["domain"]
        geoObj["layerId"] = layer["id"]
        geoObj["colorScheme"] = layer["colorScheme"]
        geoObj["group"] = layer["group"]
        geoObj["label"] = layer["label"]
        geoObj["interactions"] = layer["interactions"]
        
        return geoObj

    
    def getGrammar(self, id):
        return self.__grammarInterpreter.getGrammar(id)
    
    def handleClickLayer(self, elemId, lat, lon, layerId):
        msg = f"[{self.__className}] handleClickLayer(...)"
        print(colored(msg, "blue"))

        forecast = None
        obs = None
        me = None
        rmse = None
        
        element = [elem for elem in self.__elements if elem.getId() == elemId][0]
        clickedLayer = element.getLayer(layerId)

        interactionType = "click"

        obj = {}
        
        if clickedLayer["interactions"]:
            interaction = [interaction for interaction in clickedLayer["interactions"] if interaction["type"] == interactionType][0]

            if interaction["action"]["type"].upper() == "MAP_PLOT":
                mapPlotElementId = interaction["action"]["element"]["id"]
                dataId = interaction["action"]["element"]["data_id"]

                # Get map_plot element
                mapPlotElement = [elem for elem in self.__elements if elem.getId() == mapPlotElementId][0]
                mapPlot = mapPlotElement.getMapPlot().copy()
                mapPlotData = [data for data in mapPlotElement.getData() if data["id"] == dataId][0]

                layerIds = mapPlotData["layer_thematic_ids"].copy()
                layerArr = [element.getLayer(l) for l in layerIds]

                if "encoding" in mapPlotData:
                    mapPlot["encoding"] = mapPlotData["encoding"]
                
                data = []

                for layer in layerArr:

                    thematicItem = [item for item in self.__thematicData if item["id"] == layer["thematicId"]][0]
                    values = self.__geoInterpreter.buildPlotData(lat, lon, layer, thematicItem["content"])
                    assembly = layer["label"] if "nick" not in layer else layer["nick"]
                    for t, v in enumerate(values):
                        data.append({ "x": t, "y": v, "assembly": assembly })
                
                    if assembly == 'Temp. NCEI':
                        obs = values
                    else:
                        forecast = values
                
                # for d in data: print(d)
                mapPlot["data"] =  { "values": data }

                if obs and forecast:
                    me = self.__calculateMe(forecast, obs)
                    rmse = self.__calculateRMSE(forecast, obs)

                    obj = { "mapId": elemId, "mapPlotId": mapPlotElementId, "schema": mapPlot, "measures":  {"me": me, "rmse": rmse }}

                else:
                    obj = { "mapId": elemId, "mapPlotId": mapPlotElementId, "schema": mapPlot}
                  
        return obj
    
    def writeGrammar(self, content):
        self.__grammarInterpreter.writeGrammar(content)
        self.__grammarInterpreter.resetGrammarList()
        self.__geoInterpreter.resetGeoDataArr()
        
        self.__elements = []
        self.__thematicData = []
        
        self.startServer()
            
    def getElements(self):
        elements = []
        
        for element in self.__elements:      
            # if isinstance(element, Map):
            finalElement =  element.exportElement()
            elements.append(finalElement)

        return elements
    
    def grid(self):
        df = pd.read_csv(gridCsv, index_col=0)

        df = df.sort_values('y')
        # df = df.drop(columns="geometry")
        df.head()

        gdf = geopandas.GeoDataFrame(df, 
            geometry=geopandas.points_from_xy(df.x, df.y),
            crs="+proj=sinu +lon_0=0 +x_0=0 +y_0=0 +a=6371007.181 +b=6371007.181 +units=m +no_defs")
        
        gdf.head()

        gdf = gdf.drop(columns=['x', 'y'])
        gdf.tail()

        gdf.plot(markersize=.1, figsize=(8, 8))
    
    def startServer(self):
        self.__grammarInterpreter.readGrammars()
        masterGrammar = self.__grammarInterpreter.getGrammar("master")

        self.__geoInterpreter.buildGeoDataArr(masterGrammar["geo_data"])
        self.__thematicData = self.__grammarInterpreter.readThematicData()
        self.__elements = self.__grammarInterpreter.buildElements(self.__thematicData)