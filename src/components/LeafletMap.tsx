"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMap({
  nodes,
  theme,
}: {
  nodes: any[];
  theme: "dark" | "light";
}) {
  const tileUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%" }}>
      <TileLayer url={tileUrl} />

      {nodes.map((node) => (
        <CircleMarker
          key={node.id}
          center={[node.lat, node.lng]}
          radius={6}
          color={node.status === "online" ? "lime" : "red"}
        >
          <Tooltip>
            <strong>{node.name}</strong>
            <br />
            ID: {node.id}
            <br />
            Type: {node.type}
            <br />
            Status: {node.status}
            <br />
            Latency: {node.latency} ms
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
