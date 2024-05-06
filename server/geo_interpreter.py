import geopandas
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from shapely.geometry import Point
from consts import geoDataPath
from termcolor import colored

class GeoInterpreter(object):
    def __init__(self) -> None:
        self.__className = self.__class__.__name__
        self.__geoDataArr = []
          
    def __buildPointArr(self, data):
        pointArr = []
        sorted = data.sort_values(by="timestamp")
        grouped = sorted.groupby(["latitude", "longitude"])

        idx = 0

        for (lat, lon), group in grouped:

            point = {
                "latitude": lat,
                "longitude": lon,
                "values": group.sort_values(by='timestamp')['value'].tolist(),
                "index": idx
            }

            pointArr.append(point)

            idx += 1
        
        return pointArr
    
    def __calculateCorrelation(self, geojson1, geojson2):
        values1 = np.array(geojson1['values'])
        values2 = np.array(geojson2['values'])

        # for i in range(len(values2)):
        #     if isinstance(values2[i], list):
        #         values2[i] = values2[i] * len(values1[0])

        # Ensure values2 has the same shape as values1 for correlation calculation
        values2 = np.repeat(values2, len(values1), axis=0)

        correlations = np.corrcoef(values1, values2, rowvar=False)

        new_geojson = {
            "type": "FeatureCollection",
            "features": []
        }

        for i, feature in enumerate(geojson1['features']):
            new_feature = {
                "type": "Feature",
                "properties": feature.get('properties', {}),  # Copy existing properties
                "geometry": feature.get('geometry', {})  # Copy existing geometry
            }
            new_feature['properties']['correlation'] = correlations[i, -1]
            new_geojson['features'].append(new_feature)

        return new_geojson

    def __join_wrong(self, gdf, csv_data, operation, featureId, onlyValues=False):
        finalData = None
        pointsGdf = geopandas.GeoDataFrame(csv_data, geometry=geopandas.points_from_xy(csv_data.longitude, csv_data.latitude))
        
        if pointsGdf.crs is None:
            pointsGdf.crs = gdf.crs

        # Projecting to the same CRS as gdf
        pointsGdf = pointsGdf.to_crs(gdf.crs)

        # Performing spatial join
        joinedData = geopandas.sjoin(gdf, pointsGdf, how="inner", predicate="contains")

        if operation == "AVG":
            if len(joinedData) == 0:
                print("No points found within any feature.")
                return None

            # Calculate area of each grid cell
            grid_area = gdf.area

            # Initialize a dictionary to store aggregated values for each feature
            aggregated_values = {}

            for idx, row in gdf.iterrows():
                feature_id = row[featureId]
                
                if feature_id not in joinedData[featureId].values:  # Only proceed if the feature is empty
                    intersection_area = row.geometry.intersection(pointsGdf.geometry.unary_union).area

                    # Calculate the proportion of the feature within the grid cell
                    proportion = intersection_area / grid_area[idx]

                    # Update aggregated values dictionary
                    aggregated_values[feature_id] = [proportion]
            
            # Calculate the average value for each empty feature
            avg_values = {}
            for feature_id, values in aggregated_values.items():
                total_proportion = sum(values[1:])
                sum_value = sum(value for timestamp, value in values[1:])
                avg_value = sum_value / total_proportion
                avg_values[feature_id] = avg_value

            # Prepare final data
            final_data = []
            for feature_id, avg_value in avg_values.items():
                final_data.append({
                    featureId: feature_id,
                    "timestamp": joinedData["timestamp"].iloc[0],  # Taking any timestamp from the joined data
                    "average_value": avg_value
                })

            finalData = geopandas.GeoDataFrame(final_data)

        return finalData

    
    def __join(self, gdf, csv_data, operation, featureId, onlyValues=False):
        finalData = None
        pointsGdf = geopandas.GeoDataFrame(csv_data, geometry=geopandas.points_from_xy(csv_data.longitude, csv_data.latitude))
        
        if pointsGdf.crs is None:
            pointsGdf.crs = gdf.crs

        # Projecting to the same CRS as gdf
        pointsGdf = pointsGdf.to_crs(gdf.crs)

        # Performing spatial join
        joinedData = geopandas.sjoin(gdf, pointsGdf, how="inner", predicate="contains")

        regions_without_data = gdf[~gdf[featureId].isin(joinedData[featureId])]

        if operation == "AVG":
            values = joinedData.groupby([featureId, "timestamp"])["value"].mean().reset_index()
            aggValues = values.groupby(featureId)["value"].apply(list).reset_index(name="values")
            # values = joinedData.groupby([featureId, "timestamp"])["value"].mean().reset_index()

            if onlyValues:
             finalData = aggValues["values"].tolist()
             finalData = [] if len(finalData) == 0 else finalData[0]
                
            else:
                
                # # For regions without data
                # for index, region in regions_without_data.iterrows():
                #     total_area = region.geometry.area
                #     interpolated_value = 0

                #     # Get grid cells intersecting with the region
                #     intersecting_cells = pointsGdf[pointsGdf.intersects(region.geometry)]

                #     # Calculate the proportion of each intersecting grid cell covering the region
                #     for grid_index, grid_cell in intersecting_cells.iterrows():
                #         intersection_area = region.geometry.intersection(grid_cell.geometry).area
                #         weight = intersection_area / total_area
                #         interpolated_value += weight * grid_cell["value"]

                #     # Assign the interpolated value to the region
                #     gdf.loc[index, 'value'] = interpolated_value

                finalData = gdf.merge(aggValues, on=featureId, how="left")
        return finalData
  
    def __join_right(self, gdf, csv_data, operation, featureId, onlyValues=False):
        finalData = None
        pointsGdf = geopandas.GeoDataFrame(csv_data, geometry=geopandas.points_from_xy(csv_data.longitude, csv_data.latitude))
        
        if pointsGdf.crs is None:
            pointsGdf.crs = gdf.crs

        # Projecting to the same CRS as gdf
        pointsGdf = pointsGdf.to_crs(gdf.crs)

        # Performing spatial join
        joinedData = geopandas.sjoin(gdf, pointsGdf, how="inner", predicate="contains")

        if operation == "AVG":
            values = joinedData.groupby([featureId, "timestamp"])["value"].mean().reset_index()
            aggValues = values.groupby(featureId)["value"].apply(list).reset_index(name="values")
            # values = joinedData.groupby([featureId, "timestamp"])["value"].mean().reset_index()

            if onlyValues:
             finalData = aggValues["values"].tolist()
             finalData = [] if len(finalData) == 0 else finalData[0]
                
            else:
                finalData = gdf.merge(aggValues, on=featureId, how="left")

        return finalData
        
    def buildGeoDataArr(self, geoDataArr):
        for item in geoDataArr:
            obj = { k: item[k] for k in item.keys() }
            
            if "source" in item:
                obj["geojson"] = geopandas.read_file(f"{geoDataPath}/{item["source"]}")
            
            self.__geoDataArr.append(obj)
    
    def buildPlotData(self, lat, lon, layer, data):
        msg = f"[{self.__className}] buildPlotData(...)"
        print(colored(msg, "blue"))
        
        values = []
        point = Point(lon, lat)

        geoData = [geoItem for geoItem in self.__geoDataArr if geoItem["id"] == layer["geoDataId"]][0]

        if geoData["type"] == "point":
            sortedData = data.sort_values(by="timestamp")
            filteredData = sortedData[(sortedData['latitude'] == float(lat)) & (sortedData['longitude'] == float(lon))]
            
            if not filteredData.empty:
                values = filteredData.sort_values(by='timestamp')['value'].tolist()
                
        else:
            geojson = geoData["geojson"]
            featureId = layer["featureId"]
            
            specificFeature = None

            for _, feature in geojson.iterrows():
                if point.within(feature.geometry):
                    print("Point is within the feature:", feature[featureId])
                    specificFeature = feature[featureId]
                    break
            
            if specificFeature:
                gdfSpecific = geojson[geojson[featureId] == specificFeature]
                values = self.__join(gdfSpecific, data, layer["operation"], featureId, True)

        return values
    
    def getGeoObj(self, geoId, data, layer):
        geoData = [geoItem for geoItem in self.__geoDataArr if geoItem["id"] == geoId][0]

        obj = {  "type": geoData["type"]  }

        if geoData["type"] == "point":
            obj["data"] = self.__buildPointArr(data)
        
        elif geoData["type"] == "area":
            geojson = None if "geojson" not in geoData else geoData["geojson"]
            
            if geojson is not None:
                joinedData = self.__join(geojson, data, layer["operation"], layer["featureId"])
                obj["geojson"] = joinedData.to_json()

        return obj
    
    def getGeoObjAnalysis(self, geoId, dataArr, layer):
        geoData = [geoItem for geoItem in self.__geoDataArr if geoItem["id"] == geoId][0]
        joinedData = []
        obj = {  "type": geoData["type"]  }

        if geoData["type"] == "area":
            geojson = None if "geojson" not in geoData else geoData["geojson"]

            if geojson is not None:

                for i, data in enumerate(dataArr):
                    result = self.__join(geojson, data["content"], layer["operation"][0], layer["featureId"])
                    joinedData.append(result)
                    # obj["geojson"] = joinedData.to_json()
                    
        
                self.__calculateCorrelation(joinedData[0], joinedData[1])
        
        return obj

    
    def resetGeoDataArr(self):
        self.__geoDataArr = []