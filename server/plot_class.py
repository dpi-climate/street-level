

class Plot(object):
    def __init__(self) -> None:
        self.__className = "Plot"
        self.__id       = None
        self.__source   = None
        self.__position = {}
        self.__data = []
        self.__mapPlot = {}
        self.__draggable = False
    
    def exportElement(self):
        element = {
            "id": self.__id,
            "type": self.__type,
            "position": self.__position,
            "mapPlot": self.__mapPlot,
            "data": self.__data,
            "draggable": self.__draggable
        }
        
        return element
        
    def getData(self):
        return self.__data
    
    def getId(self):
        return self.__id
    
    def getMapPlot(self):
        return self.__mapPlot
    
    def getPosition(self):
        return self.__position
    
    def startElement(self, element):
        self.__id       = element["id"]
        self.__type     = element["type"]
        self.__source   = element["source"]
        self.__position = element["position"]

        if "draggable" in element:
            self.__draggable = element["draggable"]

    def startPlot(self, grammar, thematicData):
        self.__mapPlot = grammar["content"]["map_plot"]

        if "data" in grammar["content"]:
            self.__data = grammar["content"]["data"]


    
