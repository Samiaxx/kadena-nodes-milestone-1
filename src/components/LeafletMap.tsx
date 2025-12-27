"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { nodes } from "@/data/nodes";

export default function LeafletMap() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='© OpenStreetMap © Carto'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {nodes.map((node) => (
          <CircleMarker
            key={node.id}
            center={[node.lat, node.lng]}
            radius={8}
            pathOptions={{
              color: node.status === "online" ? "#2dd4bf" : "#ef4444",
              fillColor: node.status === "online" ? "#2dd4bf" : "#ef4444",
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <div style={{ fontSize: "0.85rem" }}>
                <strong>{node.name}</strong>
                <br />
                Region: {node.region}
                <br />
                Status: {node.status}
                <br />
                Latency:{" "}
                {node.status === "online" ? `${node.latency} ms` : "N/A"}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
