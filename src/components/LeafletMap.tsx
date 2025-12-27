"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { NodeItem } from "@/data/nodes";

export default function LeafletMap({ nodes }: { nodes: NodeItem[] }) {
  return (
    <div style={{ height: "520px", width: "100%" }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {nodes.map((node) => (
          <CircleMarker
            key={node.id}
            center={[node.lat, node.lng]}
            radius={7}
            pathOptions={{
              color: node.status === "Online" ? "#4fd1c5" : "#ef4444",
              className: node.status === "Online" ? "pulse" : "",
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              <strong>{node.name}</strong>
              <br />
              {node.city}, {node.country}
              <br />
              {node.status} • {node.latency} ms
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
