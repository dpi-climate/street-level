class Element(object):
    def __init__(self) -> None:
        self.__id       = None
        self.__type     = None
        self.__source   = None
        self.__position = {}

    def startElement(self, element):
        self.__id       = element["id"]
        self.__type     = element["type"]
        self.__source   = element["source"]
        self.__position = element["position"]

    def getId(self):
        return self.__id
    
    def getType(self):
        return self.__type
    
    def getPosition(self):
        return self.__position
    
    def getSource(self):
        return self.__source