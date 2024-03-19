
from consts import grammarPath, mainPath, gridCsv
import json

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

import geopandas

class Structure(object):
    def __init__(self) -> None:
        self.__className = "Structure"
        self.__grammar = {}

        self.grid()

    def readGrammar(self):
        with open(grammarPath, "r", encoding="utf-8") as f:
            self.__grammar = json.load(f)

        return self.__grammar
    
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
