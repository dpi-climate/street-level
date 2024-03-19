import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const center:[number, number] = [41.8781, -87.6298]; // Chicago's latitude and longitude

function CanvasLayer() {
  const map = useMap();

  useEffect(() => {
    const canvasLayer = L.layerGroup().addTo(map);
    // Add any additional setup for your canvasLayer here

    return () => {
      canvasLayer.remove();
    };
  }, [map]);

  return null;
}

function MyMap() {
  return (
    <MapContainer center={center} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <CanvasLayer />
    </MapContainer>
  );
}

export default MyMap;
