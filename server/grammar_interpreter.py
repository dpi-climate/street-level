from consts import grammarsPath, masterGrammarPath, thematicDataPath
import json
import sys
import os 
from termcolor import colored
from map_class import Map
from plot_class import Plot
import pandas as pd

class GrammarInterpreter(object):
    def __init__(self) -> None:
        self.__className = "GrammarInterpreter"
        self.__activeGrammar = ""
        self.__grammarList = []
    
    def __checkIfFileExists(self, filePath):
        if not os.path.isfile(filePath):
            msg = f"[{self.__className} - __checkIfFileExists] File {filePath} does not exist."
            print(colored(msg, "red"))
            sys.exit()
    
    def buildElements(self, thematicData):
        elements = []

        for i, grammar in enumerate(self.__grammarList[1:]):
            element = self.__grammarList[0]["content"]["elements"][i]

            if element["type"].upper() == "MAP":
                
                map = Map()
                map.startElement(element)
                map.startMap(grammar, thematicData)
                map.buildDropdown(thematicData)
                elements.append(map)

            elif element["type"].upper() == "MAP_PLOT":
                plot = Plot()
                plot.startElement(element)
                plot.startPlot(grammar, thematicData)
                elements.append(plot)
        
        return elements
    
    def getGrammar(self, id):
        grammar = [g["content"] for g in self.__grammarList if g["id"] == id][0]
        self.__activeGrammar = id

        return grammar
    
    def getGrammarList(self):
        return self.__grammarList
    
    def readGrammars(self):
        def read(filePath):
            with open(filePath, "r", encoding="utf-8") as f1:           
                _content = json.load(f1)
                # to do -- validate grammar
            return _content

        def buildObj(_content, _id=None, _element=None):
            _obj = {}

            if _id == "master":
                for elem in _content["elements"]: elem["type"].upper()
                
                _obj["id"] = _id
                _obj["content"] = _content
            
            else:
                _obj = { k: _element[k] for k in _element.keys() }
                _obj["content"] = _content
            
            return _obj

        """Read master grammar"""
        self.__checkIfFileExists(masterGrammarPath)

        masterContent = read(masterGrammarPath)
        masterObj = buildObj(masterContent, "master")
        
        self.__grammarList.append(masterObj)

        """Read secondary grammars"""
        for element in masterContent["elements"]:
            file = f"{grammarsPath}/{element['source']}"

            self.__checkIfFileExists(file)
            
            content = read(file)
            obj = buildObj(content, None, element)
            
            self.__grammarList.append(obj)
    
    def readThematicData(self):
        def read(filePath):
            _content = None
            
            _splitTup = os.path.splitext(filePath)
            _fileExtension = _splitTup[1]
            
            with open(filePath, "r", encoding="utf-8") as f:
                if _fileExtension == ".csv":
                    _content = pd.read_csv(filePath, index_col=0)

                elif _fileExtension == ".json":
                    _content = json.load(f)

            return _content

        finalThematicData = []
        
        masterGrammar = self.__grammarList[0]
        thematicData = masterGrammar["content"]["thematic_data"]

        for thematicItem in thematicData:
            thematicObj = { k: thematicItem[k] for k in thematicItem.keys() }

            file = f"{thematicDataPath}/{thematicItem['source']}" 
            self.__checkIfFileExists(file)
            content = read(file)
            
            thematicObj["content"] = content
            finalThematicData.append(thematicObj)

        return finalThematicData
    
    def resetGrammarList(self):
        self.__grammarList = []
    
    def writeGrammar(self, content):
        # validate grammar --> to do
        grammar = [g for g in self.__grammarList if g["id"] == self.__activeGrammar][0]
        grammar["content"] = content
        
        file = masterGrammarPath if self.__activeGrammar == "master" else f"{grammarsPath}/{grammar["source"]}"
        
        with open(file, "w", encoding="utf-8") as f:
            f.write(json.dumps(content, indent=4))

        # update parameters
    
        