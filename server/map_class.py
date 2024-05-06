import geopandas
from element_class import Element
import copy
from termcolor import colored

class Map(object):
    def __init__(self) -> None:
        self.__className = "Map"
        self.__id = None
        self.__center = [],
        self.__zoom = None,
        self.__layers = []
        self.__source = None
        self.__activeLayers = []
        self.__type     = None

        self.__position = {}

        self.__dropdown = {}
        
    def buildDropdown(self, thematicData):

        dpdwObj = {}

        for layerObj in self.__layers:

            if layerObj["group"] not in dpdwObj:
                dpdwObj[layerObj["group"]] = []
            
            dpdwObj[layerObj["group"]].append(layerObj)

        self.__dropdown = dpdwObj
    
    def buildDropdown2(self, thematicData):
        # dpdwObj = {}
        dpdwObj = []

        idx = 0

        for layer in self.__layers:
            for thematicId in layer["thematic_ids"]:                
                filtered = [thematic for thematic in thematicData if thematicId == thematic["id"]]
                groupName = "Analysis" if not filtered else filtered[0]["group"]

                itemObj = {}
                itemObj["id"] = idx
                itemObj["thematicId"] = thematicId
                itemObj["geoDataId"] = layer["geo_data_id"]
                itemObj["label"] = f"{thematicId} ({layer["geo_data_id"]})"
                itemObj["group"] = groupName

                dpdwObj.append(itemObj)

                idx += 1

                # if groupName not in dpdwObj:
                #     dpdwObj[groupName] = []
                
                # dpdwObj[groupName].append(itemObj)
            
        self.__dropdown = dpdwObj
    
    def buildDropdown1(self, thematicData):

        dpdwObj = {}

        idx = 0

        for layer in self.__layers:
            
            for thematicId in layer["thematic_ids"]:
                
                filtered = [thematic for thematic in thematicData if thematicId == thematic["id"]]
                groupName = "Analysis" if not filtered else filtered[0]["group"]

                if groupName not in dpdwObj:
                    dpdwObj[groupName] = []
                
                itemObj = {}
                itemObj["id"] = idx
                itemObj["thematicId"] = thematicId
                itemObj["geoDataId"]  = layer["geo_data_id"]
                itemObj["label"]      = f"{thematicId} ({layer["geo_data_id"]})"
                itemObj["group"] = groupName
                
                dpdwObj[groupName].append(itemObj)

                idx += 1
            
        self.__dropdown = dpdwObj
    
    def buildDropdown3(self, thematicData):

        dpdwObj = {}

        idx = 0

        for layer in self.__layers:
            for thematicObj in layer["thematic"]:
                groupName = ""

                itemObj = copy.deepcopy(thematicObj)

                if "type" in thematicObj:
                    pass # to do

                elif isinstance(thematicObj["thematic_data_id"], str):                    
                    filtered = [thematic for thematic in thematicData if thematicObj["thematic_data_id"] == thematic["id"]]
                    groupName = filtered[0]["group"]

                if groupName not in dpdwObj:
                    dpdwObj[groupName] = []
                
                itemObj["id"] = idx # f"{self.__id}-{idx}"
                itemObj["group"] = groupName

                itemObj["geoDataId"] = layer["geo_data_id"]
                itemObj["thematicId"] = itemObj.pop("thematic_data_id")
                
                dpdwObj[groupName].append(itemObj)

                idx += 1
            
        self.__dropdown = dpdwObj
    
    def exportElement(self):
        element = {
            "id": self.__id,
            "type": self.__type,
            "zoom": self.__zoom,
            "center": self.__center,
            "position": self.__position,
            "dropdown": self.__dropdown,
            "layers": self.__layers
        }

        return element
    
    def getActiveLayer(self):
        return self.__activeLayer
    
    def getCenter(self):
        return self.__center
    
    def getDropdown(self):
        return self.__dropdown
    
    def getId(self):
        return self.__id
    
    def getLayer(self, layerId):
        filtered = [layer for layer in self.__layers if layer["id"] == layerId][0]
        return filtered
    
    def getLayers(self):
        return self.__layers
    
    def getZoom(self):
        return self.__zoom
    
    def setCenter(self, center):
        self.__center = center
    
    def setZoom(self, zoom):
        self.__zoom = zoom

    def startElement(self, element):
        self.__id       = element["id"]
        self.__type     = element["type"]
        self.__source   = element["source"]
        self.__position = element["position"]
    
    def startMap(self, grammar, thematicData):       
        self.__center = grammar["content"]["center"]
        self.__zoom   = grammar["content"]["zoom"]

        layers = []

        idx = 0

        for layer in grammar["content"]["layers"]:
            for thematicObj in layer["thematic"]:
                groupName = ""
                interactions = None

                itemObj = copy.deepcopy(thematicObj)

                if "type" in thematicObj:
                    pass # to do

                elif isinstance(thematicObj["thematic_data_id"], str):                    
                    filtered = [thematic for thematic in thematicData if thematicObj["thematic_data_id"] == thematic["id"]]
                    groupName = filtered[0]["group"]
                
                # elif isinstance(thematicObj["thematic_data_id"], list):
                else:
                    groupName = "Analysis"

                if "interactions" in thematicObj:
                    interactions = thematicObj["interactions"] 
                
                if "feature_id" in thematicObj:
                    featureId = thematicObj["feature_id"]
                
                itemObj["id"] = thematicObj["id"]#f"{self.__id}-{idx}"
                itemObj["group"] = groupName

                itemObj["geoDataId"] = layer["geo_data_id"]
                itemObj["thematicId"] = itemObj.pop("thematic_data_id")
                itemObj["colorScheme"] = itemObj.pop("color_scheme")
                itemObj["interactions"]  = interactions
                itemObj["featureId"]     = featureId
                layers.append(itemObj)

                idx += 1

        self.__layers = layers