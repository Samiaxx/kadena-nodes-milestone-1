"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { nodes } from "@/data/nodes";

export default function LeafletMap() {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {nodes.map((node) => (
        <CircleMarker
          key={node.id}
          center={[node.lat, node.lng]}
          radius={6}
          pathOptions={{ color: node.color }}
        >
          <Tooltip>
            <div>
              <strong>{node.name}</strong>
              <br />
              {node.region}
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
